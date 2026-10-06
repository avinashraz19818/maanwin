<?php
/**
 * ==========================================================================
 * Lottery engine (WinGo / TrxWinGo / K3 / 5D / MotoRace)
 * ==========================================================================
 *
 * Ye file ab DhaniWin-parity layer (`api/_core/lottery_dhaniwin.php`) ke upar
 * ek thin compatibility wrapper hai. Purane function naam (le_*) waise hi
 * kaam karte hain, isliye admin panel aur router ko badalna nahi pada —
 * lekin andar ka behaviour (issue numbers, results, history, settlement)
 * ab dhaniwin jaisa exact hai.
 *
 * NOTE: `le_issue_by_offset($code, 0)` = abhi khatam hua period (jiska result
 * publish ho chuka hai) — pehle ye "chal raha period" deta tha, jiski wajah se
 * result draw se pehle hi dikh jata tha.
 */

// ---------------------------------------------------------------------------
// Game metadata
// ---------------------------------------------------------------------------

function le_game_interval(string $gameCode): int
{
    return dwl_interval($gameCode);
}

function le_is_k3(string $gameCode): bool { return dwl_is_k3($gameCode); }
function le_is_d5(string $gameCode): bool { return dwl_is_d5($gameCode); }
function le_is_moto(string $gameCode): bool { return dwl_is_moto($gameCode); }
function le_is_wingo(string $gameCode): bool { return dwl_is_wingo($gameCode); }

function le_default_settings(): array
{
    return dwl_rates_defaults() + [
        'win_rate' => 45.0,
        'force_mode' => 'auto',
        'force_result' => '',
        'fee_percent' => 0.0,
        'immediate_settle' => 0,
    ];
}

function le_get_settings(string $gameCode): array
{
    return dwl_game_settings($gameCode);
}

// ---------------------------------------------------------------------------
// Issues
// ---------------------------------------------------------------------------

/** offset 0 = just finished period, 1 = usse pehle, ... */
function le_issue_by_offset(string $gameCode, int $offset = 0): string
{
    return dwl_issue_by_offset($gameCode, $offset);
}

function le_issue_is_closed(string $gameCode, string $issueNumber): bool
{
    return dwl_issue_closed($gameCode, $issueNumber);
}

function le_color_from_number(int $n): string
{
    if ($n === 0) return 'red,violet';
    if ($n === 5) return 'green,violet';
    return ($n % 2 === 0) ? 'red' : 'green';
}

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

function le_result_detail(string $gameCode, string $premium, string $issueNumber = ''): array
{
    $detail = dwl_result_from_premium($gameCode, $issueNumber, $premium);
    // Purane shape ke saath compatible aliases.
    return [
        'issueNumber' => (string)$issueNumber,
        'premium' => (string)$detail['premium'],
        'number' => (string)$detail['number_value'],
        'color' => (string)$detail['color'],
        'bigSmall' => (string)$detail['big_small'],
        'sum' => (int)$detail['sum_value'],
        'dice' => $detail['dice'] ?? [],
        'numberValue' => (string)$detail['number_value'],
        'big_small' => (string)$detail['big_small'],
        'sum_value' => (int)$detail['sum_value'],
    ];
}

function le_random_premium(string $gameCode): string
{
    return dwl_default_premium($gameCode, 'rnd-' . mt_rand() . '-' . microtime(true));
}

function le_ensure_lottery_results_table($conn) {
    static $ensured = false;
    if ($ensured) return;
    $ensured = true;
    if (!$conn) return;
    $conn->query("CREATE TABLE IF NOT EXISTS lottery_results (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      game_code VARCHAR(50) NOT NULL,
      issue_number VARCHAR(50) NOT NULL,
      premium VARCHAR(20) NOT NULL,
      number VARCHAR(20) NOT NULL,
      color VARCHAR(20) NOT NULL,
      big_small VARCHAR(20) NOT NULL,
      sum_value INT NOT NULL,
      open_time DATETIME NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_game_issue (game_code, issue_number)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    // Result ka source store karne ke liye (auto / manual / upstream_live ...).
    $hasSource = @$conn->query("SHOW COLUMNS FROM lottery_results LIKE 'source'");
    if (!($hasSource instanceof mysqli_result) || $hasSource->num_rows === 0) {
        @$conn->query("ALTER TABLE lottery_results ADD COLUMN source VARCHAR(40) NOT NULL DEFAULT 'auto'");
    }
}

/**
 * Result source of truth — dhaniwin flow:
 * stored result > manual queue > admin force > bet control > upstream > deterministic.
 */
function le_result_for_issue(string $gameCode, string $issueNumber, bool $save = true): array
{
    return dwl_result_for_issue($gameCode, $issueNumber, $save);
}

// ---------------------------------------------------------------------------
// Bet request parsing
// ---------------------------------------------------------------------------

/**
 * Frontend ke saare possible bet payload keys ko content list me badalta hai.
 * Ye array wale payload (["SumOddEven_Odd"]) ko bhi sahi handle karta hai.
 */
function le_bet_contents_from_request(array $d): array
{
    $raw = null;
    foreach (['betContent', 'bettingContent', 'content', 'betContentList', 'betList', 'betInfo', 'betDetail'] as $key) {
        if (isset($d[$key]) && $d[$key] !== '' && $d[$key] !== null) {
            $raw = $d[$key];
            break;
        }
    }
    if ($raw === null) {
        // playType/playBet jaisa single-selection payload.
        $type = '';
        foreach (['selectType', 'playType', 'betType', 'type'] as $k) {
            if (isset($d[$k]) && is_string($d[$k]) && $d[$k] !== '') { $type = trim($d[$k]); break; }
        }
        $val = '';
        foreach (['playBet', 'pick', 'number', 'color', 'bigSmall', 'select'] as $k) {
            if (isset($d[$k]) && (is_string($d[$k]) || is_numeric($d[$k])) && (string)$d[$k] !== '') { $val = trim((string)$d[$k]); break; }
        }
        if ($type !== '' && $val !== '') {
            if (in_array(strtolower($type), ['bigsmalleven', 'bsoe', 'size', 'bigsmall'], true) && !str_contains($val, '_')) {
                return ['BigSmall_' . $val];
            }
            if (in_array(strtolower($type), ['color', 'colour'], true) && !str_contains($val, '_')) {
                return ['Color_' . $val];
            }
            if (in_array(strtolower($type), ['num', 'number'], true)) {
                return ['Num_' . (int)preg_replace('/\D+/', '', $val)];
            }
            return [$type . '_' . $val];
        }
        return [];
    }
    return dwl_normalize_contents($raw);
}

/** Bet row ke liye single string: ek selection => "Num_3", multiple => JSON array. */
function le_bet_content_from_request(array $d): string
{
    $contents = le_bet_contents_from_request($d);
    if (!$contents) {
        return '';
    }
    if (count($contents) === 1) {
        return $contents[0];
    }
    return json_encode(array_values($contents), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

/**
 * [amount(per selection), betMultiple, totalStake]
 * DhaniWin formula: stake = amount * betMultiple * selectionCount
 */
function le_total_amount_from_request(array $d, int $selectionCount = 1): array
{
    $amount = (float)first_value($d, ['amount', 'betAmount', 'bettingAmount', 'singleAmount', 'money', 'baseAmount', 'selectAmount', 'contractMoney'], 0);
    $multiple = (int)first_value($d, ['betMultiple', 'multiple', 'quantity', 'bettingQuantity', 'betCount', 'count', 'contractCount'], 1);
    if ($amount <= 0 && isset($d['totalAmount'])) { $amount = (float)$d['totalAmount']; $multiple = 1; }
    if ($multiple <= 0) $multiple = 1;
    if ($selectionCount <= 0) $selectionCount = 1;
    return [$amount, $multiple, round($amount * $multiple * $selectionCount, 2)];
}

function le_extract_choice(string $gameCode, string $content): array
{
    return dwl_choice_from_content($content, $gameCode);
}

function le_result_matches(array $choice, array $result, string $gameCode): bool
{
    // Purane callers choice array bhejte hain; usko content string me wapas convert karke
    // naye (dhaniwin) winning rules use karte hain.
    $kind = strtolower((string)($choice['kind'] ?? 'number'));
    $value = (string)($choice['value'] ?? '0');
    $map = ['number' => 'Num', 'num' => 'Num', 'color' => 'Color', 'colour' => 'Color', 'bigsmall' => 'BigSmall'];
    $type = $map[$kind] ?? ucfirst($kind);
    return dwl_content_wins($gameCode, $type . '_' . $value, $result);
}

function le_premium_for_choice(string $gameCode, array $choice, bool $shouldWin): string
{
    $choiceTuple = [$choice['kind'] ?? 'Num', $choice['value'] ?? '0'];
    return dwl_premium_for_choice($gameCode, $choiceTuple, $shouldWin);
}

function le_payout_rate(string $gameCode, array $choice, array $settings = []): float
{
    $content = (string)($choice['content'] ?? '');
    if ($content === '') {
        $content = ucfirst((string)($choice['kind'] ?? 'Num')) . '_' . (string)($choice['value'] ?? '');
    }
    return dwl_content_rate($gameCode, $content);
}

// ---------------------------------------------------------------------------
// Records + settlement
// ---------------------------------------------------------------------------

function le_response_row(array $r): array
{
    return dwl_bet_row($r);
}

function le_settle_pending_bets(string $gameCode = '', string $issueNumber = '', int $userId = 0, string $orderNo = ''): int
{
    return dwl_settle_pending($gameCode, $issueNumber, $userId, $orderNo);
}
