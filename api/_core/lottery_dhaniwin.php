<?php
/**
 * ==========================================================================
 * MAAN WIN  x  DHANI WIN  ---  WinGo / lottery PARITY LAYER
 * ==========================================================================
 *
 * DhaniWin ka live WinGo (period, result, history, bet, settle) jo API deta
 * hai, wahi exact behaviour MaanWin me is file se implement hota hai. Sab kuch
 * MaanWin ke apne mysqli database + wallet par chalta hai, isliye MaanWin ka
 * admin panel / wallet / deposit / withdraw flow badalta nahi.
 *
 * Ye file sirf functions define karti hai (koi side effect nahi).
 *
 * Bahar ke provider se live draw result chahiye to api/_lottery_upstream.php
 * (Admin > WinGo settings me URL/key daal ke) enable kiya ja sakta hai; default
 * me result deterministic local hota hai (ek baar bana, dobara wahi milta hai).
 *
 * Naming: dwl_ = DhaniWin Lottery.
 */

// ---------------------------------------------------------------------------
// 1. Game catalogue (dhaniwin ke prefix/interval map ke barabar)
// ---------------------------------------------------------------------------

function dwl_game_table(): array
{
    static $table = null;
    if (is_array($table)) {
        return $table;
    }
    // code => [lotteryCode, interval(sec), prefix, name, sort]
    $table = [
        'WinGo_30S'      => ['WinGo', 30, '10005', 'WinGo 30sec', 44],
        'WinGo_1M'       => ['WinGo', 60, '10001', 'WinGo 1 Min', 43],
        'WinGo_3M'       => ['WinGo', 180, '10002', 'WinGo 3 Min', 42],
        'WinGo_5M'       => ['WinGo', 300, '10003', 'WinGo 5 Min', 41],
        'WinGo_10M'      => ['WinGo', 600, '10004', 'WinGo 10 Min', 40],
        'TrxWinGo_30S'   => ['TrxWinGo', 30, '20005', 'TrxWinGo 30sec', 15],
        'TrxWinGo_1M'    => ['TrxWinGo', 60, '20001', 'TrxWinGo 1 Min', 14],
        'TrxWinGo_3M'    => ['TrxWinGo', 180, '20002', 'TrxWinGo 3 Min', 13],
        'TrxWinGo_5M'    => ['TrxWinGo', 300, '20003', 'TrxWinGo 5 Min', 12],
        'TrxWinGo_10M'   => ['TrxWinGo', 600, '20004', 'TrxWinGo 10 Min', 11],
        'D5_1M'          => ['D5', 60, '30001', '5D 1 Min', 24],
        'D5_3M'          => ['D5', 180, '30002', '5D 3 Min', 23],
        'D5_5M'          => ['D5', 300, '30003', '5D 5 Min', 22],
        'D5_10M'         => ['D5', 600, '30004', '5D 10 Min', 21],
        'K3_1M'          => ['K3', 60, '40001', 'K3 1 Min', 34],
        'K3_3M'          => ['K3', 180, '40002', 'K3 3 Min', 33],
        'K3_5M'          => ['K3', 300, '40003', 'K3 5 Min', 32],
        'K3_10M'         => ['K3', 600, '40004', 'K3 10 Min', 31],
        'MotoRace_1M'    => ['MotoRace', 60, '50001', 'Moto Racing 1 Min', 10],
        'MotoRace_3M'    => ['MotoRace', 180, '50002', 'Moto Racing 3 Min', 9],
        'MotoRace_5M'    => ['MotoRace', 300, '50003', 'Moto Racing 5 Min', 8],
        'MotoRace_10M'   => ['MotoRace', 600, '50004', 'Moto Racing 10 Min', 7],
    ];
    return $table;
}

/** Purane / alag builds ke game codes ko canonical code me badalta hai. */
function dwl_normalize_game(string $gameCode): string
{
    $raw = trim($gameCode);
    if ($raw === '') {
        return 'WinGo_30S';
    }
    $table = dwl_game_table();
    if (isset($table[$raw])) {
        return $raw;
    }
    $key = strtolower(str_replace([' ', '-', '_'], '', $raw));
    $aliases = [
        'wingo30s' => 'WinGo_30S', 'wingo30sec' => 'WinGo_30S', 'wingo30' => 'WinGo_30S',
        'wingo1m' => 'WinGo_1M', 'wingo1min' => 'WinGo_1M', 'wingo1minute' => 'WinGo_1M',
        'wingo3m' => 'WinGo_3M', 'wingo3min' => 'WinGo_3M',
        'wingo5m' => 'WinGo_5M', 'wingo5min' => 'WinGo_5M',
        'wingo10m' => 'WinGo_10M', 'wingo10min' => 'WinGo_10M',
        'trxwingo1m' => 'TrxWinGo_1M', 'trxwingo1min' => 'TrxWinGo_1M',
        'trxwingo3m' => 'TrxWinGo_3M', 'trxwingo5m' => 'TrxWinGo_5M',
        'trxwingo10m' => 'TrxWinGo_10M', 'trxwingo30s' => 'TrxWinGo_30S',
        'd51m' => 'D5_1M', '5d1m' => 'D5_1M', 'd51min' => 'D5_1M', '5d1min' => 'D5_1M',
        'd53m' => 'D5_3M', '5d3m' => 'D5_3M', 'd55m' => 'D5_5M', '5d5m' => 'D5_5M',
        'd510m' => 'D5_10M', '5d10m' => 'D5_10M',
        'k31m' => 'K3_1M', 'k31min' => 'K3_1M', 'k33m' => 'K3_3M', 'k35m' => 'K3_5M', 'k310m' => 'K3_10M',
        'motorace1m' => 'MotoRace_1M', 'motoracing1m' => 'MotoRace_1M', 'motorbike1m' => 'MotoRace_1M',
        'motorace3m' => 'MotoRace_3M', 'motoracing3m' => 'MotoRace_3M',
        'motorace5m' => 'MotoRace_5M', 'motoracing5m' => 'MotoRace_5M',
        'motorace10m' => 'MotoRace_10M', 'motoracing10m' => 'MotoRace_10M',
    ];
    if (isset($aliases[$key])) {
        return $aliases[$key];
    }
    // Sirf lottery ka naam aaya ho (jaise "WinGo") to 30S default.
    if (in_array($key, ['wingo', 'trxwingo', 'k3', 'd5', '5d', 'motorace', 'motoracing'], true)) {
        return ['wingo' => 'WinGo_30S', 'trxwingo' => 'TrxWinGo_1M', 'k3' => 'K3_1M', 'd5' => 'D5_1M', '5d' => 'D5_1M', 'motorace' => 'MotoRace_1M', 'motoracing' => 'MotoRace_1M'][$key];
    }
    return 'WinGo_30S';
}

function dwl_interval(string $gameCode): int
{
    $code = dwl_normalize_game($gameCode);
    $table = dwl_game_table();
    return (int)($table[$code][1] ?? 60);
}

function dwl_prefix(string $gameCode): string
{
    $code = dwl_normalize_game($gameCode);
    $table = dwl_game_table();
    return (string)($table[$code][2] ?? '10001');
}

function dwl_lottery_code(string $gameCode): string
{
    $code = dwl_normalize_game($gameCode);
    $table = dwl_game_table();
    return (string)($table[$code][0] ?? 'WinGo');
}

function dwl_game_name(string $gameCode): string
{
    $code = dwl_normalize_game($gameCode);
    $table = dwl_game_table();
    return (string)($table[$code][3] ?? $code);
}

function dwl_game_sort(string $gameCode): int
{
    $code = dwl_normalize_game($gameCode);
    $table = dwl_game_table();
    return (int)($table[$code][4] ?? 50);
}

function dwl_is_k3(string $gameCode): bool { return dwl_lottery_code($gameCode) === 'K3'; }
function dwl_is_d5(string $gameCode): bool { return dwl_lottery_code($gameCode) === 'D5'; }
function dwl_is_moto(string $gameCode): bool { return dwl_lottery_code($gameCode) === 'MotoRace'; }
function dwl_is_wingo(string $gameCode): bool { return in_array(dwl_lottery_code($gameCode), ['WinGo', 'TrxWinGo'], true); }

// ---------------------------------------------------------------------------
// 2. Issue (period) number + timing  --- dhaniwin ke exact formula par
// ---------------------------------------------------------------------------

function dwl_now_ms(): int
{
    return (int)floor(microtime(true) * 1000);
}

/**
 * AR client countdown 0 hone ke turant baad request bhejta hai, jab hamari
 * clock boundary se kuch ms pehle hoti hai. Isliye chhota grace window aage
 * dekhte hain, taaki just-finished round usi response me aa jaye.
 */
function dwl_grace_ms(): int
{
    $ms = (int)dwl_setting('lottery_end_grace_ms', 1000);
    if ($ms < 0) $ms = 0;
    if ($ms > 10000) $ms = 10000;
    return $ms;
}

/**
 * Issue number = YYYYMMDD + prefix(5) + %04d periodIndex (UTC midnight se).
 * Ye dhaniwin ka exact format hai, isliye dono site ka period matching rakhta hai.
 */
function dwl_calculate_issue(string $gameCode, int $timestamp): string
{
    $code = dwl_normalize_game($gameCode);
    $interval = dwl_interval($code);
    $prefix = dwl_prefix($code);
    if ($interval <= 0) $interval = 60;

    $utcDayStart = strtotime(gmdate('Y-m-d 00:00:00', $timestamp) . ' UTC');
    $secondsSinceMidnight = $timestamp - $utcDayStart;
    $periodIndex = (int)floor($secondsSinceMidnight / $interval) + 1;
    if ($periodIndex < 1) $periodIndex = 1;

    return sprintf('%s%s%04d', gmdate('Ymd', $timestamp), $prefix, $periodIndex);
}

/** Currently RUNNING period (jiska countdown chal raha hai). */
/**
 * Chal rahe (running) period ka issue number.
 * DhaniWin me ye `api_lottery_issue_data()['nextIssueNumber']` hai — frontend
 * isi period par countdown dikhata hai.
 */
function dwl_running_issue(string $gameCode): string
{
    $interval = dwl_interval($gameCode);
    $now = time() + (int)floor(dwl_grace_ms() / 1000);
    $slot = intdiv($now, max(1, $interval));
    return dwl_calculate_issue($gameCode, $slot * $interval);
}

/**
 * "Current" issue = wahi jo issue API `issueNumber` me bhejti hai (ek period
 * ka lag) aur jiska result publish ho chuka hota hai. DhaniWin bhi isi ko
 * `current` maan kar bets settle karta hai (strcmp < 0 rule).
 */
function dwl_current_issue(string $gameCode): string
{
    return dwl_issue_by_offset($gameCode, 0);
}

/** Just-finished period = jiska result publish ho chuka hai (dhaniwin "current"). */
function dwl_display_issue(string $gameCode): string
{
    $interval = dwl_interval($gameCode);
    $now = time() + (int)floor(dwl_grace_ms() / 1000);
    $slot = intdiv($now, max(1, $interval)) - 1;
    return dwl_calculate_issue($gameCode, $slot * $interval);
}

/** Purane code ke liye: offset 0 = just finished, 1 = usse pehle wala, ... */
function dwl_issue_by_offset(string $gameCode, int $offset = 0): string
{
    $interval = dwl_interval($gameCode);
    $now = time() + (int)floor(dwl_grace_ms() / 1000);
    $slot = intdiv($now, max(1, $interval)) - 1 - max(0, $offset);
    return dwl_calculate_issue($gameCode, $slot * $interval);
}

/** Issue string ko todta hai: ['date','prefix','period','end_ts',...] ya null. */
function dwl_parse_issue(string $gameCode, string $issueNumber): ?array
{
    $issue = trim($issueNumber);
    if (!preg_match('/^(\d{8})(\d{5})(\d{1,6})$/', $issue, $m)) {
        return null;
    }
    $date = $m[1];
    $prefix = $m[2];
    $period = (int)$m[3];
    $interval = dwl_interval($gameCode);
    $dayStart = strtotime(substr($date, 0, 4) . '-' . substr($date, 4, 2) . '-' . substr($date, 6, 2) . ' 00:00:00 UTC');
    if (!$dayStart) {
        return null;
    }
    return [
        'date' => $date,
        'prefix' => $prefix,
        'period' => $period,
        'interval' => $interval,
        'end_ts' => $dayStart + ($period * $interval),
        'start_ts' => $dayStart + (($period - 1) * $interval),
    ];
}

/** Ek period aage ka issue (running round). */
function dwl_next_issue(string $gameCode, string $issueNumber): string
{
    $parsed = dwl_parse_issue($gameCode, $issueNumber);
    if (!$parsed) {
        return '';
    }
    return dwl_calculate_issue($gameCode, (int)$parsed['end_ts']);
}

/** Ek period peeche ka issue. */
function dwl_prev_issue(string $gameCode, string $issueNumber): string
{
    $parsed = dwl_parse_issue($gameCode, $issueNumber);
    if (!$parsed) {
        return '';
    }
    return dwl_calculate_issue($gameCode, max(0, (int)$parsed['start_ts'] - 1));
}

/** Result publish ho chuka hai? (running period se purana = closed) */
/**
 * Bet ke liye issue band ho chuka hai? (DhaniWin `api_lottery_issue_closed`)
 * Current issue ke bet ek period baad band hote hain, tabhi settle hote hain.
 */
function dwl_issue_closed(string $gameCode, string $issueNumber): bool
{
    $issue = trim($issueNumber);
    if ($issue === '') {
        return false;
    }
    return strcmp($issue, dwl_current_issue($gameCode)) < 0;
}

/** Result publish ho sakta hai? (current ya purane issue ka ho chuka hai) */
function dwl_issue_drawn(string $gameCode, string $issueNumber): bool
{
    $issue = trim($issueNumber);
    if ($issue === '') {
        return false;
    }
    return strcmp($issue, dwl_current_issue($gameCode)) <= 0;
}

/** Issue apne period ka window / end time (ms). */
function dwl_issue_window(string $gameCode, string $issueNumber): array
{
    $parsed = dwl_parse_issue($gameCode, $issueNumber);
    if ($parsed) {
        return [
            'startTime' => (int)$parsed['start_ts'] * 1000,
            'endTime' => (int)$parsed['end_ts'] * 1000,
            'openTime' => (int)$parsed['end_ts'] * 1000,
        ];
    }
    // Unknown format: current period par fallback (purane data ke liye).
    $interval = dwl_interval($gameCode);
    $slot = intdiv(time(), max(1, $interval));
    return [
        'startTime' => $slot * $interval * 1000,
        'endTime' => ($slot + 1) * $interval * 1000,
        'openTime' => ($slot + 1) * $interval * 1000,
    ];
}

/**
 * DhaniWin ka exact issue payload + extra aliases (purane MaanWin frontend
 * builds bhi isi ko padhte hain). Frontend `current` object par countdown
 * banata hai, isliye ye hamesha bhejna zaroori hai.
 */
function dwl_issue_data(string $gameCode): array
{
    $code = dwl_normalize_game($gameCode);
    $period = dwl_interval($code);
    $now = dwl_now_ms();
    $periodMs = $period * 1000;
    $boundaryNow = $now + dwl_grace_ms();
    $start = (int)(floor($boundaryNow / $periodMs) * $periodMs);
    $end = $start + $periodMs;

    // 1-period lag: jo period abhi khatam hua uska result pehle se publish hai.
    $lagStart = $start - $periodMs;
    $issue = dwl_calculate_issue($code, (int)($lagStart / 1000));
    $nextIssue = dwl_calculate_issue($code, (int)($start / 1000));
    $secondsLeft = max(0, (int)ceil(($end - $now) / 1000));
    $isLocked = $secondsLeft <= 5;
    $lotteryCode = dwl_lottery_code($code);

    return [
        // --- dhaniwin keys ---
        'startTime' => $start,
        'endTime' => $end,
        'openTime' => $end,
        'issueNumber' => $issue,
        'issue_number' => $issue,
        'nextIssueNumber' => $nextIssue,
        'next_issue_number' => $nextIssue,
        // Frontend is value ko 60 se multiply karta hai => minutes chahiye.
        'intervalMinute' => $period / 60,
        'intervalM' => $period / 60,
        'interval' => $period,
        'gameCode' => $code,
        'game_code' => $code,
        'lotteryCode' => $lotteryCode,
        'seconds' => $secondsLeft,
        'secondsLeft' => $secondsLeft,
        'countdown' => $secondsLeft,
        'isLocked' => $isLocked,
        'serverTime' => $now,
        'serviceTime' => $now,
        'serverTimestamp' => (int)($now / 1000),
        'serviceNowTime' => date('Y-m-d H:i:s', (int)($now / 1000)),
        'diif' => 0,
        'diff' => 0,
        'current' => [
            'issueNumber' => $issue,
            'issue_number' => $issue,
            'startTime' => $start,
            'endTime' => $end,
            'serverTime' => $now,
            'seconds' => $secondsLeft,
        ],
        'next' => [
            'issueNumber' => $nextIssue,
            'issue_number' => $nextIssue,
            'startTime' => $start,
            'endTime' => $end,
            'serverTime' => $now,
            'seconds' => $secondsLeft,
        ],
        'runningIssueNumber' => $nextIssue,
        // --- maanwin purane keys (backward compatibility) ---
        'intervalSecond' => $period,
        'duration' => $period,
        'remainTime' => $secondsLeft,
        'timeRemaining' => $secondsLeft,
        'currentTime' => $now,
        'isOpen' => true,
    ];
}

function dwl_issue_payload(string $gameCode): array
{
    $now = dwl_now_ms();
    return [
        'code' => 0,
        'data' => dwl_issue_data($gameCode),
        'msg' => 'Succeed',
        'msgCode' => 0,
        'serverTime' => $now,
        'serviceTime' => $now,
        'serviceNowTime' => date('Y-m-d H:i:s', (int)($now / 1000)),
    ];
}

// ---------------------------------------------------------------------------
// 3. Settings helpers (admin panel se control)
// ---------------------------------------------------------------------------

function dwl_setting(string $key, $default = null)
{
    static $cache = [];
    if (array_key_exists($key, $cache)) {
        return $cache[$key];
    }
    $value = $default;
    // 1) config.local.php / config.php me constant ho to wahi jeetega.
    $constant = 'DW_LOTTERY_' . strtoupper($key);
    if (defined($constant)) {
        $value = constant($constant);
    } else {
        // 2) site_settings json (admin panel).
        $settings = function_exists('site_settings') ? site_settings() : [];
        if (is_array($settings) && array_key_exists($key, $settings) && $settings[$key] !== '' && $settings[$key] !== null) {
            $value = $settings[$key];
        }
    }
    $cache[$key] = $value;
    return $value;
}

function dwl_fee_rate(string $gameCode = ''): float
{
    // Admin panel > WinGo > "Fee %" (per game) priority, warna global
    // lottery_fee_rate (dhaniwin default 2%).
    if ($gameCode !== '') {
        $settings = dwl_game_settings($gameCode);
        $percent = (float)($settings['fee_percent'] ?? 0);
        if ($percent > 0) {
            return min(0.5, $percent / 100);
        }
    }
    $rate = (float)dwl_setting('lottery_fee_rate', 0.02);
    if ($rate < 0) $rate = 0.0;
    if ($rate > 0.5) $rate = 0.5;
    return $rate;
}

function dwl_rates_defaults(): array
{
    return [
        'payout_number' => 8.20,
        'payout_color' => 1.80,
        'payout_color_mix' => 1.80,
        'payout_violet' => 4.50,
        'payout_bigsmall' => 1.80,
        'payout_k3' => 2.00,
        'payout_5d' => 9.00,
        'payout_moto' => 9.00,
    ];
}

/** lottery_game_settings row (game specific, warna '*' default). */
function dwl_game_settings(string $gameCode): array
{
    static $cache = [];
    $code = dwl_normalize_game($gameCode);
    if (isset($cache[$code])) {
        return $cache[$code];
    }
    $out = dwl_rates_defaults() + [
        'win_rate' => 45.0,
        'force_mode' => 'auto',
        'force_result' => '',
        'fee_percent' => 0.0,
        'immediate_settle' => 0,
    ];
    $conn = function_exists('db') ? db() : null;
    if ($conn) {
        $stmt = @$conn->prepare('SELECT * FROM lottery_game_settings WHERE game_code=? OR game_code="*" ORDER BY (game_code="*") ASC LIMIT 1');
        if ($stmt) {
            $stmt->bind_param('s', $code);
            if ($stmt->execute()) {
                $row = $stmt->get_result()->fetch_assoc();
                if ($row) {
                    foreach ($out as $k => $v) {
                        if (array_key_exists($k, $row) && $row[$k] !== null && $row[$k] !== '') {
                            $out[$k] = is_numeric($v) ? (float)$row[$k] : $row[$k];
                        }
                    }
                }
            }
            $stmt->close();
        }
    }
    $cache[$code] = $out;
    return $out;
}

// ---------------------------------------------------------------------------
// 4. Result generation (deterministic + admin/upstream override)
// ---------------------------------------------------------------------------

function dwl_seed(string $seed): int
{
    $secret = defined('APP_SECRET') ? (string)APP_SECRET : 'maanwin-wingo';
    return (int)sprintf('%u', crc32($seed . '|' . $secret));
}

/** Deterministic fallback result (bina upstream ke bhi result kabhi nahi badlega). */
function dwl_default_premium(string $gameCode, string $issueNumber): string
{
    $code = dwl_normalize_game($gameCode);
    $seed = dwl_seed($code . ':' . $issueNumber);
    if (dwl_is_k3($code)) {
        return (string)(($seed % 6) + 1) . (string)((($seed >> 3) % 6) + 1) . (string)((($seed >> 6) % 6) + 1);
    }
    if (dwl_is_d5($code)) {
        $digits = '';
        for ($i = 0; $i < 5; $i++) {
            $digits .= (string)((($seed >> ($i * 4)) % 10));
        }
        return $digits;
    }
    if (dwl_is_moto($code)) {
        $cars = range(1, 10);
        // deterministic shuffle
        for ($i = 9; $i > 0; $i--) {
            $j = ($seed >> ($i % 16)) % ($i + 1);
            $tmp = $cars[$i];
            $cars[$i] = $cars[$j];
            $cars[$j] = $tmp;
            $seed = dwl_seed((string)$seed . $i);
        }
        return implode(',', $cars);
    }
    return (string)($seed % 10);
}

/** Premium -> number/color/bigSmall/sum/dice (sab lottery types). */
function dwl_result_from_premium(string $gameCode, string $issueNumber, string $premium): array
{
    $code = dwl_normalize_game($gameCode);
    $lotteryCode = dwl_lottery_code($code);
    $raw = trim($premium);
    $result = [
        'game_code' => $code,
        'gameCode' => $code,
        'lottery_code' => $lotteryCode,
        'issue_number' => $issueNumber,
        'issueNumber' => $issueNumber,
        'premium' => $raw,
        'number_value' => '',
        'number' => '',
        'color' => '',
        'colour' => '',
        'big_small' => '',
        'bigSmall' => '',
        'sum_value' => 0,
        'sum' => 0,
        'dice' => [],
        'source' => 'auto',
    ];

    if (dwl_is_k3($code)) {
        $parts = array_values(array_filter(array_map('trim', preg_split('/[,|\-\s]+/', $raw)), 'strlen'));
        if (count($parts) === 1 && preg_match('/^[1-6]{3}$/', $parts[0])) {
            $parts = str_split($parts[0]);
        }
        $valid = count($parts) === 3;
        foreach ($parts as $p) {
            if ((int)$p < 1 || (int)$p > 6) $valid = false;
        }
        if (!$valid) {
            $seed = dwl_seed($code . ':' . $issueNumber . ':k3');
            $parts = [(string)(($seed % 6) + 1), (string)((($seed >> 3) % 6) + 1), (string)((($seed >> 6) % 6) + 1)];
        }
        $sum = array_sum(array_map('intval', $parts));
        $result['dice'] = array_map('intval', $parts);
        // DhaniWin K3 row: premium = dice ("4,6,6"), number/numberValue = sum,
        // color khaali, sum = sum.
        $result['premium'] = implode(',', $parts);
        $result['number_value'] = (string)$sum;
        $result['number'] = (string)$sum;
        $result['sum_value'] = $sum;
        $result['sum'] = $sum;
        $result['color'] = '';
        $result['colour'] = '';
        $result['big_small'] = $sum >= 11 ? 'big' : 'small';
        $result['bigSmall'] = $result['big_small'];
        return $result;
    }

    if (dwl_is_d5($code)) {
        $digits = preg_replace('/\D+/', '', $raw);
        if (strlen($digits) < 5) {
            $seed = dwl_seed($code . ':' . $issueNumber . ':d5');
            $digits = str_pad($digits, 5, '0');
            for ($i = strlen($digits); $i < 5; $i++) {
                $digits[$i] = (string)(($seed >> ($i * 4)) % 10);
            }
        }
        $digits = substr($digits, 0, 5);
        $arr = array_map('intval', str_split($digits));
        $sum = array_sum($arr);
        // DhaniWin 5D row: premium = 5 digits ("87843"), number = sum, color khaali.
        $result['premium'] = $digits;
        $result['number_value'] = (string)$sum;
        $result['number'] = (string)$sum;
        $result['digits'] = $arr;
        $result['sum_value'] = $sum;
        $result['sum'] = $sum;
        $result['color'] = '';
        $result['colour'] = $result['color'];
        $result['big_small'] = $sum >= 23 ? 'big' : 'small';
        $result['bigSmall'] = $result['big_small'];
        return $result;
    }

    if (dwl_is_moto($code)) {
        $cars = array_values(array_filter(array_map('intval', preg_split('/\D+/', $raw)), function ($n) {
            return $n >= 1 && $n <= 10;
        }));
        if (count($cars) < 10) {
            $seed = dwl_seed($code . ':' . $issueNumber . ':moto');
            $all = range(1, 10);
            for ($i = 9; $i > 0; $i--) {
                $j = ($seed >> ($i % 16)) % ($i + 1);
                $tmp = $all[$i];
                $all[$i] = $all[$j];
                $all[$j] = $tmp;
                $seed = dwl_seed((string)$seed . $i);
            }
            $cars = $all;
        }
        $first = (int)$cars[0];
        // DhaniWin MotoRace row: premium = poori rank list, number = winner (1st),
        // sum bhi winner ke barabar, color khaali.
        $result['premium'] = implode(',', $cars);
        $result['number_value'] = (string)$first;
        $result['number'] = (string)$first;
        $result['firstNumber'] = $first;
        $result['ranks'] = $cars;
        $result['sum_value'] = $first;
        $result['sum'] = $first;
        $result['color'] = '';
        $result['colour'] = '';
        $result['big_small'] = $first >= 6 ? 'big' : 'small';
        $result['bigSmall'] = $result['big_small'];
        return $result;
    }

    // WinGo / TrxWinGo: 0-9
    $number = (int)preg_replace('/\D+/', '', $raw);
    if ($number < 0 || $number > 9) {
        $seed = dwl_seed($code . ':' . $issueNumber . ':wingo');
        $number = $seed % 10;
    }
    $result['premium'] = (string)$number;
    $result['number_value'] = (string)$number;
    $result['number'] = (string)$number;
    $result['sum_value'] = $number;
    $result['sum'] = $number;
    if ($number === 0) {
        $color = 'red,violet';
    } elseif ($number === 5) {
        $color = 'green,violet';
    } else {
        $color = $number % 2 === 0 ? 'red' : 'green';
    }
    $result['color'] = $color;
    $result['colour'] = $color;
    $result['big_small'] = $number > 4 ? 'big' : 'small';
    $result['bigSmall'] = $result['big_small'];
    return $result;
}

/**
 * Result ka single source of truth.
 *   1. DB me pehle se hai  -> wahi
 *   2. result_queue (agar table ho) -> manual
 *   3. admin force_result  -> usi hisaab se
 *   4. running bets par win/lose/win_rate control
 *   5. upstream live provider (agar configured)
 *   6. deterministic local fallback (kabhi nahi badlega)
 * Result hamesha DB me save hota hai; save fail ho tab bhi deterministic
 * fallback ki wajah se same issue par same result milta rehta hai.
 */
function dwl_result_for_issue(string $gameCode, string $issueNumber, bool $save = true): array
{
    $code = dwl_normalize_game($gameCode);
    $issue = trim($issueNumber);
    if ($issue === '') {
        return dwl_result_from_premium($code, '', '');
    }
    if (!dwl_issue_drawn($code, $issue)) {
        // Abhi draw nahi hua (future/running period) — result publish nahi karte.
        $pending = dwl_result_from_premium($code, $issue, '');
        $pending['premium'] = '';
        $pending['number_value'] = '';
        $pending['number'] = '';
        $pending['color'] = '';
        $pending['colour'] = '';
        $pending['big_small'] = '';
        $pending['bigSmall'] = '';
        $pending['sum_value'] = 0;
        $pending['sum'] = 0;
        $pending['dice'] = [];
        $pending['pending'] = true;
        $pending['source'] = 'pending';
        return $pending;
    }

    $conn = db();

    // 1. Already stored result
    if ($conn) {
        $row = dwl_result_row($conn, $code, $issue);
        if ($row && trim((string)$row['premium']) !== '') {
            $detail = dwl_result_from_premium($code, $issue, (string)$row['premium']);
            $detail['source'] = 'stored';
            $detail['id'] = (int)$row['id'];
            return $detail;
        }
    }

    $premium = '';
    $source = 'auto';

    // 2. Manual queue (dhaniwin me result_queue table hota hai)
    if ($premium === '' && $conn) {
        $queue = @$conn->query("SELECT premium FROM result_queue WHERE game_code='" . $conn->real_escape_string($code) . "' AND issue_number='" . $conn->real_escape_string($issue) . "' LIMIT 1");
        if ($queue instanceof mysqli_result && ($qr = $queue->fetch_assoc())) {
            $premium = (string)$qr['premium'];
            $source = 'manual_queue';
        }
    }

    $settings = dwl_game_settings($code);

    // 3. Admin force result
    if ($premium === '' && trim((string)$settings['force_result']) !== '') {
        $premium = trim((string)$settings['force_result']);
        $source = 'manual';
    }

    // 4. Running bets ke hisaab se win/lose/win_rate
    if ($premium === '' && $conn) {
        $bet = dwl_first_pending_bet($conn, $code, $issue);
        if ($bet) {
            $choice = dwl_parse_content((string)$bet['bet_content']);
            $mode = strtolower((string)$settings['force_mode']);
            if ($mode === 'win') {
                $premium = dwl_premium_for_choice($code, $choice, true);
                $source = 'control_win';
            } elseif ($mode === 'lose') {
                $premium = dwl_premium_for_choice($code, $choice, false);
                $source = 'control_lose';
            } elseif ($mode === 'auto') {
                $winRate = (float)$settings['win_rate'];
                $shouldWin = (mt_rand(1, 10000) <= (int)round($winRate * 100));
                if ($shouldWin) {
                    $premium = dwl_premium_for_choice($code, $choice, true);
                    $source = 'control_auto_win';
                }
            }
        }
    }

    // 5. Upstream live provider (agar admin ne URL set kiya ho)
    if ($premium === '' && function_exists('dwl_upstream_fetch_result')) {
        $live = dwl_upstream_fetch_result($code, $issue);
        if ($live !== null && $live !== '') {
            $premium = (string)$live;
            $source = 'upstream_live';
        }
    }

    // 6. Deterministic local fallback
    if ($premium === '') {
        $premium = dwl_default_premium($code, $issue);
        $source = 'auto';
    }

    $detail = dwl_result_from_premium($code, $issue, $premium);
    $detail['source'] = $source;

    if ($conn && $save) {
        $stored = dwl_store_result($conn, $code, $issue, $detail, $source);
        if ($stored && trim((string)$stored['premium']) !== '') {
            $again = dwl_result_from_premium($code, $issue, (string)$stored['premium']);
            $again['source'] = $source;
            $again['id'] = (int)$stored['id'];
            return $again;
        }
    }
    return $detail;
}

function dwl_result_row($conn, string $code, string $issue): ?array
{
    if (!$conn) return null;
    $stmt = @$conn->prepare('SELECT * FROM lottery_results WHERE game_code=? AND issue_number=? ORDER BY id ASC LIMIT 1');
    if (!$stmt) return null;
    $stmt->bind_param('ss', $code, $issue);
    if (!$stmt->execute()) { $stmt->close(); return null; }
    $row = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    return $row ?: null;
}

/** Result DB me write (idempotent). Existing row ko overwrite nahi karta. */
function dwl_store_result($conn, string $code, string $issue, array $detail, string $source): ?array
{
    if (!$conn) return null;
    $premium = (string)$detail['premium'];
    $number = (string)$detail['number_value'];
    $color = (string)$detail['color'];
    $big = (string)$detail['big_small'];
    $sum = (int)$detail['sum_value'];
    if (function_exists('le_ensure_lottery_results_table')) {
        le_ensure_lottery_results_table($conn);
    }
    // `source` column (kis engine ne result decide kiya) bhi save karte hain;
    // agar purane DB me column na ho to bina source ke insert karte hain.
    $stmt = @$conn->prepare('INSERT IGNORE INTO lottery_results(game_code, issue_number, premium, number, color, big_small, sum_value, source, open_time, created_at) VALUES(?,?,?,?,?,?,?,?,NOW(),NOW())');
    if ($stmt) {
        $stmt->bind_param('ssssssis', $code, $issue, $premium, $number, $color, $big, $sum, $source);
        if (!$stmt->execute()) {
            $stmt->close();
            $stmt = null;
        } else {
            $stmt->close();
        }
    }
    if (!$stmt) {
        $stmt = @$conn->prepare('INSERT IGNORE INTO lottery_results(game_code, issue_number, premium, number, color, big_small, sum_value, open_time, created_at) VALUES(?,?,?,?,?,?,?,NOW(),NOW())');
        if ($stmt) {
            $stmt->bind_param('ssssssi', $code, $issue, $premium, $number, $color, $big, $sum);
            $stmt->execute();
            $stmt->close();
        }
    }
    return dwl_result_row($conn, $code, $issue);
}

function dwl_first_pending_bet($conn, string $code, string $issue): ?array
{
    if (!$conn) return null;
    $stmt = @$conn->prepare('SELECT bet_content, amount, bet_multiple, real_amount FROM lottery_bets WHERE game_code=? AND issue_number=? AND state=2 ORDER BY id ASC LIMIT 1');
    if (!$stmt) return null;
    $stmt->bind_param('ss', $code, $issue);
    if (!$stmt->execute()) { $stmt->close(); return null; }
    $row = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    return $row ?: null;
}

/** Bet ko haraane/jeetane ke liye premium banao (jab admin win/lose force kare). */
function dwl_premium_for_choice(string $gameCode, array $choice, bool $shouldWin): string
{
    $code = dwl_normalize_game($gameCode);
    $type = strtolower((string)($choice[0] ?? ''));
    $bet = strtolower((string)($choice[1] ?? ''));
    $seed = dwl_seed($code . ':' . microtime(true) . ':' . mt_rand());

    if (dwl_is_k3($code)) {
        $dice = [1 + ($seed % 6), 1 + (($seed >> 4) % 6), 1 + (($seed >> 8) % 6)];
        if (!$shouldWin) {
            return implode(',', $dice);
        }
        // Sum par bet ho to sum match karwao, warna 3 same dice jeet jaate hain.
        if ($type === 'sumnum' && is_numeric($bet)) {
            $target = (int)$bet;
            for ($a = 1; $a <= 6; $a++) {
                for ($b = 1; $b <= 6; $b++) {
                    $c = $target - $a - $b;
                    if ($c >= 1 && $c <= 6) {
                        return $a . ',' . $b . ',' . $c;
                    }
                }
            }
        }
        if ($type === 'sumbigsmall') {
            return in_array($bet, ['h', 'big', 'high'], true) ? '5,5,5' : '1,1,1';
        }
        if ($type === 'sumoddeven') {
            return in_array($bet, ['o', 'odd'], true) ? '1,1,3' : '1,1,2';
        }
        if ($type === 'numsame3all') {
            $d = 1 + ($seed % 6);
            return $d . ',' . $d . ',' . $d;
        }
        if (in_array($type, ['numsame3', 'numsame2', 'numsame2mult'], true)) {
            $d = (int)($choice[1] ?? 1);
            if ($d < 1 || $d > 6) $d = 1 + ($seed % 6);
            return $type === 'numsame3' ? ($d . ',' . $d . ',' . $d) : ($d . ',' . $d . ',' . (($d % 6) + 1));
        }
        if ($type === 'numdiff3') {
            return '1,3,5';
        }
        if ($type === 'numnear3all') {
            return '2,3,4';
        }
        if ($type === 'numdiff2') {
            return '1,4,6';
        }
        return implode(',', $dice);
    }

    if (dwl_is_d5($code)) {
        $digits = [];
        for ($i = 0; $i < 5; $i++) {
            $digits[$i] = ($seed >> ($i * 3)) % 10;
        }
        if (!$shouldWin) {
            return implode('', $digits);
        }
        $positions = ['first' => 0, 'second' => 1, 'third' => 2, 'fourth' => 3, 'fifth' => 4];
        foreach ($positions as $prefix => $index) {
            if (strpos($type, $prefix) === 0) {
                if (strpos($type, 'num') !== false && is_numeric($bet)) {
                    $digits[$index] = ((int)$bet) % 10;
                } elseif (strpos($type, 'bigsmall') !== false) {
                    $digits[$index] = in_array($bet, ['h', 'big', 'high'], true) ? 7 : 2;
                } elseif (strpos($type, 'oddeven') !== false) {
                    $digits[$index] = in_array($bet, ['o', 'odd'], true) ? 3 : 4;
                }
                return implode('', $digits);
            }
        }
        $sum = array_sum($digits);
        if ($type === 'sumbigsmall') {
            $wantBig = in_array($bet, ['h', 'big', 'high'], true);
            $target = $wantBig ? 23 : 22;
            $diff = $target - $sum;
            for ($i = 4; $i >= 0 && $diff > 0; $i--) {
                $add = min(9 - $digits[$i], $diff);
                $digits[$i] += $add;
                $diff -= $add;
            }
            return implode('', $digits);
        }
        if ($type === 'sumoddeven') {
            $wantOdd = in_array($bet, ['o', 'odd'], true);
            if (($sum % 2 === 1) !== $wantOdd) {
                $digits[0] = ($digits[0] + 1) % 10;
            }
            return implode('', $digits);
        }
        return implode('', $digits);
    }

    if (dwl_is_moto($code)) {
        $cars = range(1, 10);
        for ($i = 9; $i > 0; $i--) {
            $j = ($seed >> ($i % 16)) % ($i + 1);
            $tmp = $cars[$i];
            $cars[$i] = $cars[$j];
            $cars[$j] = $tmp;
            $seed = dwl_seed((string)$seed . $i);
        }
        if ($shouldWin) {
            $rank = 0;
            if (strpos($type, 'second') === 0) $rank = 1;
            elseif (strpos($type, 'third') === 0) $rank = 2;
            if (strpos($type, 'num') !== false && is_numeric($bet)) {
                $want = max(1, min(10, (int)$bet));
                $pos = array_search($want, $cars, true);
                if ($pos !== false && $pos !== $rank) {
                    $cars[$pos] = $cars[$rank];
                    $cars[$rank] = $want;
                } elseif ($pos === false) {
                    $cars[$rank] = $want;
                }
            } elseif (strpos($type, 'bigsmall') !== false) {
                $cars[$rank] = in_array($bet, ['h', 'big', 'high'], true) ? 8 : 3;
            } elseif (strpos($type, 'oddeven') !== false) {
                $cars[$rank] = in_array($bet, ['o', 'odd'], true) ? 7 : 4;
            }
        }
        return implode(',', $cars);
    }

    // WinGo / TrxWinGo
    if (!$shouldWin) {
        $digit = $seed % 10;
        return (string)$digit;
    }
    if ($type === 'num' && is_numeric($bet)) {
        return (string)(((int)$bet) % 10);
    }
    if ($type === 'color') {
        $map = ['green' => [1, 3, 7, 9], 'red' => [2, 4, 6, 8], 'violet' => [0, 5]];
        $pool = $map[$bet] ?? [1, 2, 3, 4, 6, 7, 8, 9];
        return (string)$pool[$seed % count($pool)];
    }
    if ($type === 'bigsmall') {
        $pool = in_array($bet, ['h', 'big', 'high'], true) ? [5, 6, 7, 8, 9] : [0, 1, 2, 3, 4];
        return (string)$pool[$seed % count($pool)];
    }
    if ($type === 'oddeven') {
        $pool = in_array($bet, ['o', 'odd'], true) ? [1, 3, 5, 7, 9] : [0, 2, 4, 6, 8];
        return (string)$pool[$seed % count($pool)];
    }
    return (string)($seed % 10);
}

// ---------------------------------------------------------------------------
// 5. Bet content parsing / winning / payout rates
// ---------------------------------------------------------------------------

/**
 * AR frontend `betContent` ko array of strings me normalise karta hai.
 * Ye MaanWin ka sabse bada bug tha: jab frontend array bhejta hai
 * (betContent:["SumOddEven_Odd"]) to purana code usko string maan ke
 * ek "0" number bet samajh leta tha, jisse har bet loss ho jati thi.
 */
function dwl_normalize_contents($betContent): array
{
    if (is_array($betContent)) {
        $out = [];
        foreach ($betContent as $value) {
            if (is_array($value)) {
                if (isset($value['betContent'])) {
                    $out = array_merge($out, dwl_normalize_contents($value['betContent']));
                } elseif (isset($value['playType']) || isset($value['playBet'])) {
                    $type = (string)($value['playType'] ?? $value['type'] ?? '');
                    $bet = (string)($value['playBet'] ?? $value['bet'] ?? $value['value'] ?? '');
                    if ($type !== '' && $bet !== '') {
                        $out[] = $type . '_' . $bet;
                    }
                } else {
                    $out[] = json_encode($value);
                }
            } else {
                $trimmed = trim((string)$value);
                if ($trimmed !== '') {
                    $out[] = $trimmed;
                }
            }
        }
        return $out;
    }
    $text = trim((string)$betContent);
    if ($text === '') {
        return [];
    }
    if ($text[0] === '[' || $text[0] === '{') {
        $decoded = json_decode($text, true);
        if (is_array($decoded)) {
            return dwl_normalize_contents($decoded);
        }
    }
    return [$text];
}

/** "Color_Green" => ['Color','Green'] */
function dwl_parse_content(string $content): array
{
    $parts = explode('_', $content);
    $type = trim((string)array_shift($parts));
    $bet = trim(implode('_', $parts));
    return [$type, $bet];
}

function dwl_selected_numbers(string $bet, int $min = 0, int $max = 9): array
{
    preg_match_all('/\d+/', $bet, $m);
    $numbers = [];
    foreach ($m[0] as $raw) {
        $n = (int)$raw;
        if ($n >= $min && $n <= $max) {
            $numbers[] = $n;
        }
    }
    return array_values(array_unique($numbers));
}

/** Ye bet is result par jeeti ya nahi. */
function dwl_content_wins(string $gameCode, string $content, array $result): bool
{
    $code = dwl_normalize_game($gameCode);
    $lotteryCode = dwl_lottery_code($code);
    list($type, $bet) = dwl_parse_content($content);
    $typeLower = strtolower($type);
    $betLower = strtolower($bet);
    $premium = (string)($result['premium'] ?? '');

    if ($lotteryCode === 'K3') {
        preg_match_all('/[1-6]/', $premium, $m);
        $dice = array_slice(array_map('intval', $m[0]), 0, 3);
        if (count($dice) < 3) {
            return false;
        }
        $sum = array_sum($dice);
        $counts = array_count_values($dice);
        $nums = dwl_selected_numbers($bet, 1, 6);

        if ($typeLower === 'sumnum') return $sum === (int)$bet;
        if ($typeLower === 'sumbigsmall') return in_array($betLower, ['h', 'big', 'high'], true) ? $sum >= 11 : $sum <= 10;
        if ($typeLower === 'sumoddeven') return in_array($betLower, ['o', 'odd'], true) ? $sum % 2 === 1 : $sum % 2 === 0;
        if ($typeLower === 'numsame3all') return count($counts) === 1;
        if ($typeLower === 'numsame3') return count($nums) > 0 && count($counts) === 1 && (int)$dice[0] === (int)$nums[0];
        if ($typeLower === 'numsame2' || $typeLower === 'numsame2mult') {
            foreach ($nums as $n) {
                if (($counts[$n] ?? 0) >= 2) return true;
            }
            return false;
        }
        if ($typeLower === 'numdiff3') {
            if (count($counts) !== 3) return false;
            if (count($nums) < 3) return true;
            foreach ($nums as $n) {
                if (!in_array($n, $dice, true)) return false;
            }
            return true;
        }
        if ($typeLower === 'numnear3all') {
            sort($dice);
            return $dice[0] + 1 === $dice[1] && $dice[1] + 1 === $dice[2];
        }
        if ($typeLower === 'numdiff2') {
            if (count($nums) < 2) return count($counts) >= 2;
            return in_array($nums[0], $dice, true) && in_array($nums[1], $dice, true) && $nums[0] !== $nums[1];
        }
        return false;
    }

    if ($lotteryCode === 'D5') {
        preg_match_all('/\d/', $premium, $m);
        $digits = array_slice(array_map('intval', $m[0]), 0, 5);
        if (count($digits) < 5) {
            return false;
        }
        $positions = ['first' => 0, 'second' => 1, 'third' => 2, 'fourth' => 3, 'fifth' => 4];
        $sum = array_sum($digits);

        if ($typeLower === 'sumbigsmall') return in_array($betLower, ['h', 'big', 'high'], true) ? $sum >= 23 : $sum <= 22;
        if ($typeLower === 'sumoddeven') return in_array($betLower, ['o', 'odd'], true) ? $sum % 2 === 1 : $sum % 2 === 0;
        foreach ($positions as $prefix => $index) {
            if (strpos($typeLower, $prefix) === 0) {
                $value = $digits[$index];
                if (strpos($typeLower, 'num') !== false) return $value === (int)$bet;
                if (strpos($typeLower, 'bigsmall') !== false) return in_array($betLower, ['h', 'big', 'high'], true) ? $value >= 5 : $value <= 4;
                if (strpos($typeLower, 'oddeven') !== false) return in_array($betLower, ['o', 'odd'], true) ? $value % 2 === 1 : $value % 2 === 0;
            }
        }
        return false;
    }

    if ($lotteryCode === 'MotoRace') {
        $cars = array_values(array_filter(array_map('intval', preg_split('/\D+/', $premium)), function ($n) {
            return $n >= 1 && $n <= 10;
        }));
        if (count($cars) < 1) {
            return false;
        }
        $rank = 0;
        if (strpos($typeLower, 'second') === 0) $rank = 1;
        elseif (strpos($typeLower, 'third') === 0) $rank = 2;
        $value = $cars[$rank] ?? $cars[0];
        if (strpos($typeLower, 'num') !== false || $typeLower === 'num') return $value === (int)$bet;
        if (strpos($typeLower, 'bigsmall') !== false || $typeLower === 'bigsmall') return in_array($betLower, ['h', 'big', 'high'], true) ? $value >= 6 : $value <= 5;
        if (strpos($typeLower, 'oddeven') !== false || $typeLower === 'oddeven') return in_array($betLower, ['o', 'odd'], true) ? $value % 2 === 1 : $value % 2 === 0;
        return false;
    }

    // WinGo / TrxWinGo
    $number = (int)($result['number_value'] !== '' ? $result['number_value'] : 0);
    if ($typeLower === 'num') return $number === (int)$bet;
    if ($typeLower === 'bigsmall') return in_array($betLower, ['big', 'h', 'high'], true) ? $number >= 5 : $number <= 4;
    if ($typeLower === 'oddeven') return in_array($betLower, ['o', 'odd'], true) ? $number % 2 === 1 : $number % 2 === 0;
    if ($typeLower === 'color') {
        return strpos(',' . strtolower((string)$result['color']) . ',', ',' . $betLower . ',') !== false;
    }
    return false;
}

/** Is bet ka payout multiplier (admin settings se override ho sakta hai). */
function dwl_content_rate(string $gameCode, string $content, array $result = []): float
{
    $code = dwl_normalize_game($gameCode);
    $lotteryCode = dwl_lottery_code($code);
    $settings = dwl_game_settings($code);
    list($type, $bet) = dwl_parse_content($content);
    $typeLower = strtolower($type);
    $betLower = strtolower($bet);
    $resultNumber = isset($result['number_value']) && $result['number_value'] !== '' ? (int)$result['number_value'] : -1;

    if ($lotteryCode === 'K3') {
        if ($typeLower === 'sumnum') {
            $rates = [3 => 207.36, 4 => 69.12, 5 => 34.56, 6 => 20.74, 7 => 13.83, 8 => 9.88, 9 => 8.30, 10 => 7.68, 11 => 7.68, 12 => 8.30, 13 => 9.88, 14 => 13.83, 15 => 20.74, 16 => 34.56, 17 => 69.12, 18 => 207.36];
            return (float)($rates[(int)$bet] ?? (float)$settings['payout_k3']);
        }
        $map = [
            'numsame3' => 207.36, 'numsame2mult' => 69.12, 'numsame3all' => 34.56, 'numdiff3' => 34.56,
            'numsame2' => 13.83, 'numnear3all' => 8.64, 'numdiff2' => 6.91,
        ];
        foreach ($map as $key => $rate) {
            if ($typeLower === $key) return (float)$rate;
        }
        return (float)$settings['payout_k3'];
    }

    if ($lotteryCode === 'D5') {
        return strpos($typeLower, 'num') !== false ? (float)$settings['payout_5d'] : 2.00;
    }
    if ($lotteryCode === 'MotoRace') {
        return strpos($typeLower, 'num') !== false ? (float)$settings['payout_moto'] : 2.00;
    }

    // WinGo / TrxWinGo
    if ($typeLower === 'num') {
        return (float)$settings['payout_number'];
    }
    if ($typeLower === 'color') {
        if ($betLower === 'violet') return (float)$settings['payout_violet'];
        // 0 red+violet aur 5 green+violet par mix payout (dono color jeette hain).
        if (($betLower === 'red' && $resultNumber === 0) || ($betLower === 'green' && $resultNumber === 5)) {
            return (float)$settings['payout_color_mix'];
        }
        return (float)$settings['payout_color'];
    }
    if ($typeLower === 'bigsmall' || $typeLower === 'oddeven') {
        return (float)$settings['payout_bigsmall'];
    }
    return (float)$settings['payout_bigsmall'];
}

/** GetGameInfo ke liye full rate list (frontend display + payout dono same). */
function dwl_display_rates(string $gameCode): array
{
    $code = dwl_normalize_game($gameCode);
    $lotteryCode = dwl_lottery_code($code);
    $s = dwl_game_settings($code);
    $rates = [];
    $id = 50;

    if ($lotteryCode === 'K3') {
        $sumRates = [3 => 207.36, 4 => 69.12, 5 => 34.56, 6 => 20.74, 7 => 13.83, 8 => 9.88, 9 => 8.30, 10 => 7.68, 11 => 7.68, 12 => 8.30, 13 => 9.88, 14 => 13.83, 15 => 20.74, 16 => 34.56, 17 => 69.12, 18 => 207.36];
        foreach ($sumRates as $bet => $rate) {
            $rates[] = ['playTypeId' => $id++, 'playType' => 'SumNum', 'playBet' => (string)$bet, 'state' => 1, 'playRate' => $rate];
        }
        foreach ([
            ['SumBigSmall', 'H', 2.00], ['SumBigSmall', 'L', 2.00], ['SumOddEven', 'O', 2.00], ['SumOddEven', 'E', 2.00],
            ['NumSame2', '2TD', 13.83], ['NumSame2Mult', '2TF', 69.12], ['NumSame3', '3TD', 207.36],
            ['NumSame3All', '3TT', 34.56], ['NumDiff3', '3BT', 34.56], ['NumNear3All', '3LT', 8.64], ['NumDiff2', '2BT', 6.91],
        ] as $row) {
            $rates[] = ['playTypeId' => $id++, 'playType' => $row[0], 'playBet' => $row[1], 'state' => 1, 'playRate' => $row[2]];
        }
        return $rates;
    }

    if ($lotteryCode === 'D5') {
        foreach (['First', 'Second', 'Third', 'Fourth', 'Fifth'] as $name) {
            $rates[] = ['playTypeId' => $id++, 'playType' => $name . 'Num', 'playBet' => '0-9', 'state' => 1, 'playRate' => (float)$s['payout_5d']];
            $rates[] = ['playTypeId' => $id++, 'playType' => $name . 'BigSmall', 'playBet' => 'H', 'state' => 1, 'playRate' => 2.00];
            $rates[] = ['playTypeId' => $id++, 'playType' => $name . 'BigSmall', 'playBet' => 'L', 'state' => 1, 'playRate' => 2.00];
            $rates[] = ['playTypeId' => $id++, 'playType' => $name . 'OddEven', 'playBet' => 'O', 'state' => 1, 'playRate' => 2.00];
            $rates[] = ['playTypeId' => $id++, 'playType' => $name . 'OddEven', 'playBet' => 'E', 'state' => 1, 'playRate' => 2.00];
        }
        foreach ([['SumBigSmall', 'H'], ['SumBigSmall', 'L'], ['SumOddEven', 'O'], ['SumOddEven', 'E']] as $row) {
            $rates[] = ['playTypeId' => $id++, 'playType' => $row[0], 'playBet' => $row[1], 'state' => 1, 'playRate' => 2.00];
        }
        return $rates;
    }

    if ($lotteryCode === 'MotoRace') {
        foreach (['First', 'Second', 'Third'] as $rank) {
            $rates[] = ['playTypeId' => $id++, 'playType' => $rank . 'Num', 'playBet' => '1-10', 'state' => 1, 'playRate' => (float)$s['payout_moto']];
            $rates[] = ['playTypeId' => $id++, 'playType' => $rank . 'BigSmall', 'playBet' => 'H', 'state' => 1, 'playRate' => 2.00];
            $rates[] = ['playTypeId' => $id++, 'playType' => $rank . 'BigSmall', 'playBet' => 'L', 'state' => 1, 'playRate' => 2.00];
            $rates[] = ['playTypeId' => $id++, 'playType' => $rank . 'OddEven', 'playBet' => 'O', 'state' => 1, 'playRate' => 2.00];
            $rates[] = ['playTypeId' => $id++, 'playType' => $rank . 'OddEven', 'playBet' => 'E', 'state' => 1, 'playRate' => 2.00];
        }
        return $rates;
    }

    // WinGo / TrxWinGo — dhaniwin ke displayed rates
    $rates[] = ['playTypeId' => $id++, 'playType' => 'Color', 'playBet' => 'green', 'state' => 1, 'playRate' => (float)$s['payout_color']];
    $rates[] = ['playTypeId' => $id++, 'playType' => 'Color', 'playBet' => 'red', 'state' => 1, 'playRate' => (float)$s['payout_color']];
    $rates[] = ['playTypeId' => $id++, 'playType' => 'Color', 'playBet' => 'violet', 'state' => 1, 'playRate' => (float)$s['payout_violet']];
    $rates[] = ['playTypeId' => $id++, 'playType' => 'Num', 'playBet' => '0-9', 'state' => 1, 'playRate' => (float)$s['payout_number']];
    $rates[] = ['playTypeId' => $id++, 'playType' => 'BigSmall', 'playBet' => 'big', 'state' => 1, 'playRate' => (float)$s['payout_bigsmall']];
    $rates[] = ['playTypeId' => $id++, 'playType' => 'BigSmall', 'playBet' => 'small', 'state' => 1, 'playRate' => (float)$s['payout_bigsmall']];
    return $rates;
}

/** Deal with legacy maanwin choice format (le_extract_choice). */
function dwl_choice_from_content(string $content, string $gameCode = ''): array
{
    list($type, $bet) = dwl_parse_content($content);
    $typeLower = strtolower($type);
    $betLower = strtolower($bet);
    if (in_array($typeLower, ['color', 'colour'], true)) {
        if (in_array($betLower, ['10', 'g', 'green', '1'], true)) return ['kind' => 'color', 'value' => 'green'];
        if (in_array($betLower, ['20', 'v', 'violet', '2'], true)) return ['kind' => 'color', 'value' => 'violet'];
        if (in_array($betLower, ['30', 'r', 'red', '3'], true)) return ['kind' => 'color', 'value' => 'red'];
        return ['kind' => 'color', 'value' => $betLower];
    }
    if (in_array($typeLower, ['bigsmall', 'bsoe', 'size', 'bigsmalleven'], true)) {
        if (in_array($betLower, ['1', 's', 'small'], true)) return ['kind' => 'bigsmall', 'value' => 'small'];
        if (in_array($betLower, ['0', 'b', 'big'], true)) return ['kind' => 'bigsmall', 'value' => 'big'];
        return ['kind' => 'bigsmall', 'value' => $betLower];
    }
    if (in_array($typeLower, ['num', 'number'], true)) {
        return ['kind' => 'number', 'value' => (string)((int)preg_replace('/\D+/', '', $bet))];
    }
    return ['kind' => $typeLower, 'value' => $betLower];
}

// ---------------------------------------------------------------------------
// 6. History / records payloads (dhaniwin shape + maanwin aliases)
// ---------------------------------------------------------------------------

function dwl_history_item(string $gameCode, string $issueNumber, array $result, int $openTimeMs = 0): array
{
    $code = dwl_normalize_game($gameCode);
    $lotteryCode = dwl_lottery_code($code);
    $number = (string)($result['number_value'] ?? $result['number'] ?? '');
    $premium = (string)($result['premium'] ?? $number);
    $color = (string)($result['color'] ?? '');
    $sum = (int)($result['sum_value'] ?? $result['sum'] ?? 0);
    $tag = $lotteryCode === 'K3' ? $number : $premium;
    $hash = hash('sha256', $code . '|' . $issueNumber . '|' . $tag);
    if ($openTimeMs <= 0) {
        $window = dwl_issue_window($code, $issueNumber);
        $openTimeMs = (int)$window['openTime'];
    }
    $block = 84600000 + ((int)substr(preg_replace('/\D+/', '', $issueNumber) ?: '0', -7) % 900000);

    return [
        'issueNumber' => $issueNumber,
        'issueNo' => $issueNumber,
        'issue' => $issueNumber,
        'period' => $issueNumber,
        'gameCode' => $code,
        'lotteryCode' => $lotteryCode,
        'premium' => $premium,
        'number' => $number,
        'numberValue' => $number,
        'resultNumber' => $number,
        'result' => $lotteryCode === 'K3' ? $number : $premium,
        'openCode' => $lotteryCode === 'K3' ? $number : $premium,
        'dice' => $lotteryCode === 'K3' ? array_map('intval', str_split(preg_replace('/\D+/', '', $number) ?: '0')) : ($result['dice'] ?? []),
        'color' => $color,
        'colour' => $color,
        'bigSmall' => (string)($result['big_small'] ?? ''),
        'sum' => $sum,
        'sumValue' => $sum,
        'source' => (string)($result['source'] ?? 'auto'),
        'openTime' => $openTimeMs,
        'serviceTime' => dwl_now_ms(),
        'block' => $block,
        'blockNumber' => $block,
        'blockTime' => $openTimeMs,
        'blockTimeText' => date('H:i:s', (int)floor($openTimeMs / 1000)),
        'hash' => $hash,
        'hashValue' => $hash,
    ];
}

/** History page: page 1 ka first item = just finished period (dhaniwin jaisa). */
function dwl_history_page(string $gameCode, int $pageNo = 1, int $pageSize = 10): array
{
    $code = dwl_normalize_game($gameCode);
    $pageNo = max(1, $pageNo);
    $pageSize = max(1, min(100, $pageSize));
    $offset = ($pageNo - 1) * $pageSize;

    $list = [];
    for ($i = 0; $i < $pageSize; $i++) {
        $issue = dwl_issue_by_offset($code, $offset + $i);
        $result = dwl_result_for_issue($code, $issue, true);
        $list[] = dwl_history_item($code, $issue, $result);
    }

    $totalCount = dwl_history_total($code);

    return [
        'list' => $list,
        'pageNo' => $pageNo,
        'pageSize' => $pageSize,
        'totalPage' => (int)max(1, ceil($totalCount / $pageSize)),
        'totalCount' => $totalCount,
    ];
}

/**
 * Kitne issues ki history available hai (dhaniwin ki tarah lamba pager).
 * `lottery_history_start` setting se start date badli ja sakti hai.
 */
function dwl_history_total(string $gameCode): int
{
    $code = dwl_normalize_game($gameCode);
    $start = (string)dwl_setting('lottery_history_start', '2026-01-01 00:00:00');
    $startTs = strtotime($start . ' UTC');
    if (!$startTs) {
        $startTs = strtotime('2026-01-01 00:00:00 UTC');
    }
    $now = time() + (int)floor(dwl_grace_ms() / 1000);
    $periods = (int)floor(($now - $startTs) / max(1, dwl_interval($code)));
    return max(500, min(25000, $periods));
}

function dwl_trend(string $gameCode, int $pageSize = 100): array
{
    $code = dwl_normalize_game($gameCode);
    $pageSize = max(1, min(100, $pageSize));
    $list = [];
    $stats = [];
    for ($i = 0; $i <= 9; $i++) {
        $stats[(string)$i] = ['appear' => 0, 'missing' => 0, 'maxContinuous' => 0];
    }
    for ($i = 0; $i < $pageSize; $i++) {
        $issue = dwl_issue_by_offset($code, $i);
        $result = dwl_result_for_issue($code, $issue, true);
        $item = dwl_history_item($code, $issue, $result);
        $list[] = $item;
        $number = (string)$item['number'];
        if (isset($stats[$number])) {
            $stats[$number]['appear']++;
        }
    }
    return ['list' => $list, 'statistics' => $stats];
}

/**
 * Trend tab ka `statistics` payload.
 *
 * Dhaniwin ka naya frontend `data.statistics` (10 x {appear, missing,
 * maxContinuous}) padhta hai, lekin MaanWin ke build me trend component
 * `data.slice(0, 10)` chalata hai — yaani `data` khud ek 10-element array hona
 * chahiye jismein `missingCount / avgMissing / openCount / maxContinuous` ho.
 * Isliye yahan array bhejte hain aur dono naming conventions ke aliases
 * (appear = openCount, missing = missingCount) bhi rakh dete hain.
 *
 * Stats window = last $window issues (10..100). Har number/digit ke liye:
 *   openCount     -> window me kitni baar aaya
 *   maxContinuous -> sabse lamba lagataar aane ka run
 *   missingCount  -> latest issue se peeche ginte hue kitne miss (0 = abhi aaya)
 *   avgMissing    -> (window - openCount) / (openCount + 1)
 */
function dwl_trend_stats(string $gameCode, int $window = 100): array
{
    $code = dwl_normalize_game($gameCode);
    $window = max(10, min(100, $window));

    $seq = []; // newest -> oldest, har entry = digits ki list
    for ($i = 0; $i < $window; $i++) {
        $issue = dwl_issue_by_offset($code, $i);
        $result = dwl_result_for_issue($code, $issue, true);
        $item = dwl_history_item($code, $issue, $result);
        $number = (string)$item['number'];
        if (strlen($number) === 1) {
            $seq[] = [$number];
            continue;
        }
        // K3 / D5 / MotoRace: asli digits `premium` me hote hain (e.g. "4,6,6").
        $raw = preg_replace('/\D+/', '', (string)$item['premium']);
        $seq[] = $raw !== '' ? str_split($raw) : [substr($number, -1)];
    }

    $stats = [];
    for ($d = 0; $d <= 9; $d++) {
        $key = (string)$d;
        $open = 0;
        $run = 0;
        $maxRun = 0;
        foreach ($seq as $digits) {
            $hits = 0;
            foreach ($digits as $digit) {
                if ($digit === $key) {
                    $hits++;
                }
            }
            $open += $hits;
            if ($hits > 0) {
                $run++;
                if ($run > $maxRun) {
                    $maxRun = $run;
                }
            } else {
                $run = 0;
            }
        }
        $missing = 0;
        foreach ($seq as $digits) {
            if (in_array($key, $digits, true)) {
                break;
            }
            $missing++;
        }
        $avg = round(($window - $open) / ($open + 1), 2);
        $stats[] = [
            'number' => $key,
            'numberValue' => $key,
            'openCount' => $open,
            'appear' => $open,
            'maxContinuous' => $maxRun,
            'missingCount' => $missing,
            'missing' => $missing,
            'avgMissing' => $avg,
        ];
    }

    return $stats;
}

/** Bet record row (records page + win/loss popup). */
function dwl_bet_row(array $r, int $feeRatePercent = 0, float $feeRate = 0.02): array
{
    $code = dwl_normalize_game((string)($r['game_code'] ?? ''));
    $contents = dwl_normalize_contents($r['bet_content'] ?? '');
    $first = $contents[0] ?? '';
    list($playType, $playBet) = $first !== '' ? dwl_parse_content($first) : ['', ''];
    $stake = (float)($r['amount'] ?? 0) * max(1, (int)($r['bet_multiple'] ?? 1)) * max(1, count($contents));
    $storedStake = (float)($r['real_amount'] ?? 0) + (float)($r['fee'] ?? 0);
    if ($storedStake > 0) {
        $stake = $storedStake;
    }
    $fee = (float)($r['fee'] ?? 0);
    if ($fee <= 0 && $feeRate > 0) {
        $fee = round($stake * $feeRate, 2);
    }
    $real = (float)($r['real_amount'] ?? 0);
    if ($real <= 0) {
        $real = max(0, round($stake - $fee, 2));
    }
    $state = (int)($r['state'] ?? 2);
    $premium = (string)($r['premium'] ?? '');
    $number = '';
    if ($premium !== '') {
        $detail = dwl_result_from_premium($code, (string)($r['issue_number'] ?? ''), $premium);
        $number = (string)$detail['number_value'];
    }
    // win_lose_amount me "net" store hota hai: jeet par profit, haar par -stake.
    // DhaniWin record row: winAmount = payout, winLoseAmount = profit/-stake.
    $winLose = (float)($r['win_lose_amount'] ?? 0);
    $payout = $state === 1 ? round($winLose + $stake, 2) : 0.0;
    $winAmount = $payout;
    $createdMs = !empty($r['created_at']) ? (int)strtotime((string)$r['created_at']) * 1000 : dwl_now_ms();
    $status = $state === 2 ? 'pending' : ($state === 1 ? 'won' : 'lost');

    return [
        'orderNo' => (string)($r['order_no'] ?? ''),
        'issueNumber' => (string)($r['issue_number'] ?? ''),
        'gameCode' => (string)($r['game_code'] ?? ''),
        'lotteryCode' => dwl_lottery_code($code),
        'playType' => $playType,
        'playBet' => $playBet,
        'betContent' => $first,
        'betContentList' => $contents,
        'amount' => (float)($r['amount'] ?? 0),
        'betMultiple' => (float)($r['bet_multiple'] ?? 1),
        'betCount' => max(1, count($contents)),
        'betAmount' => round($stake, 2),
        'realAmount' => round($real, 2),
        'fee' => round($fee, 2),
        'winAmount' => round($winAmount, 2),
        'profitAmount' => $state === 2 ? 0.0 : $winLose,
        'winLoseAmount' => $state === 2 ? 0.0 : $winLose,
        'status' => $status,
        'state' => $state,
        'isWin' => $state === 1,
        'isPending' => $state === 2,
        'premium' => $premium,
        'number' => $number,
        'result' => $premium,
        'betTime' => $createdMs,
        'createTime' => $createdMs,
        'createdTime' => (string)($r['created_at'] ?? ''),
    ];
}

// ---------------------------------------------------------------------------
// 7. Settlement (dhaniwin flow, maanwin wallet par)
// ---------------------------------------------------------------------------

/**
 * Result publish hone ke baad pending bets ko settle karta hai.
 *  - stake  = amount * betMultiple * betCount
 *  - fee    = stake * feeRate (default 2%)
 *  - payout = (stake - fee) * rate (sirf jeetne wali selections)
 *  - net    = payout - stake  => win_lose_amount
 */
function dwl_settle_pending(string $gameCode = '', string $issueNumber = '', int $userId = 0, string $orderNo = ''): int
{
    $conn = db();
    if (!$conn) {
        return 0;
    }
    $where = ["state=2"];
    if ($gameCode !== '') {
        $where[] = "game_code='" . $conn->real_escape_string(dwl_normalize_game($gameCode)) . "'";
    }
    if ($issueNumber !== '') {
        $where[] = "issue_number='" . $conn->real_escape_string($issueNumber) . "'";
    }
    if ($userId > 0) {
        $where[] = 'user_id=' . (int)$userId;
    }
    if ($orderNo !== '') {
        $where[] = "order_no='" . $conn->real_escape_string($orderNo) . "'";
    }
    $sql = 'SELECT * FROM lottery_bets WHERE ' . implode(' AND ', $where) . ' ORDER BY id ASC LIMIT 500';
    $rs = $conn->query($sql);
    if (!$rs) {
        return 0;
    }
    $settled = 0;
    while ($r = $rs->fetch_assoc()) {
        $betGame = dwl_normalize_game((string)$r['game_code']);
        $issue = (string)$r['issue_number'];
        if (!dwl_issue_closed($betGame, $issue)) {
            continue;
        }
        $result = dwl_result_for_issue($betGame, $issue, true);
        if ((string)$result['premium'] === '') {
            continue;
        }
        $contents = dwl_normalize_contents($r['bet_content'] ?? '');
        if (!$contents) {
            $contents = ['Num_' . (int)$r['bet_content']];
        }
        $settings = dwl_game_settings($betGame);
        $feeRate = dwl_fee_rate($betGame);
        $amount = (float)$r['amount'];
        $multiple = max(1, (int)$r['bet_multiple']);
        $unitStake = round($amount * $multiple, 2);
        $unitFee = round($unitStake * $feeRate, 2);
        $unitReal = max(0.0, round($unitStake - $unitFee, 2));

        $mode = strtolower((string)$settings['force_mode']);
        $won = false;
        $payout = 0.0;
        foreach ($contents as $content) {
            $isWin = dwl_content_wins($betGame, $content, $result);
            if ($mode === 'lose') {
                $isWin = false;
            }
            if ($isWin) {
                $won = true;
                $payout += round($unitReal * dwl_content_rate($betGame, $content, $result), 2);
            }
        }
        if ($mode === 'win' && !$won && count($contents) > 0) {
            $won = true;
            $payout = round($unitReal * dwl_content_rate($betGame, $contents[0], $result), 2);
        }
        $stakeTotal = round($unitStake * count($contents), 2);
        $payout = round($payout, 2);
        $net = round($payout - $stakeTotal, 2);
        $state = $won ? 1 : 0;
        $premium = (string)$result['premium'];
        $betId = (int)$r['id'];
        $uid = (int)$r['user_id'];
        $order = (string)$r['order_no'];
        $remark = $betGame . ' ' . implode(',', $contents) . ' result ' . $premium;

        @$conn->begin_transaction();
        $check = $conn->query('SELECT state FROM lottery_bets WHERE id=' . $betId . ' FOR UPDATE');
        $fresh = $check ? $check->fetch_assoc() : null;
        if (!$fresh || (int)$fresh['state'] !== 2) {
            @$conn->rollback();
            continue;
        }
        $stmt = $conn->prepare('UPDATE lottery_bets SET premium=?, state=?, win_lose_amount=? WHERE id=?');
        if (!$stmt) {
            @$conn->rollback();
            continue;
        }
        $stmt->bind_param('sidi', $premium, $state, $net, $betId);
        if (!$stmt->execute()) {
            @$conn->rollback();
            continue;
        }
        $stmt->close();

        $credit = 0.0;
        if ($payout > 0) {
            $credit = $payout;
        }
        $settlement = wallet_apply_delta(
            $conn,
            $uid,
            $credit,
            'GameEnd',
            $order,
            $remark,
            $won ? 'Win' : 'Loss',
            'ARLottery',
            ['gameCode' => $betGame, 'issueNumber' => $issue, 'premium' => $premium, 'isWin' => $won, 'net' => $net, 'payout' => $payout, 'stake' => $stakeTotal]
        );
        if (!$settlement) {
            @$conn->rollback();
            continue;
        }
        @$conn->commit();
        $settled++;
    }
    return $settled;
}

// ---------------------------------------------------------------------------
// 8. Game list (dhaniwin jaisa saare category ek hi response me)
// ---------------------------------------------------------------------------

function dwl_game_groups(): array
{
    $order = ['WinGo', 'MotoRace', 'D5', 'K3', 'TrxWinGo'];
    $sort = ['WinGo' => 1, 'MotoRace' => 2, 'TrxWinGo' => 3, 'D5' => 4, 'K3' => 5];
    $typeIds = ['WinGo' => 100, 'K3' => 101, 'D5' => 102, 'TrxWinGo' => 103, 'MotoRace' => 105];
    $names = ['WinGo' => 'WinGo', 'TrxWinGo' => 'Trx WinGo', 'K3' => 'K3', 'D5' => '5D', 'MotoRace' => 'Moto Racing'];

    $listed = [
        'WinGo' => ['WinGo_30S', 'WinGo_1M', 'WinGo_3M', 'WinGo_5M'],
        'MotoRace' => ['MotoRace_1M', 'MotoRace_3M', 'MotoRace_5M', 'MotoRace_10M'],
        'D5' => ['D5_1M', 'D5_3M', 'D5_5M', 'D5_10M'],
        'K3' => ['K3_1M', 'K3_3M', 'K3_5M', 'K3_10M'],
        'TrxWinGo' => ['TrxWinGo_1M', 'TrxWinGo_3M', 'TrxWinGo_5M', 'TrxWinGo_10M'],
    ];

    $grouped = [];
    foreach (dwl_game_table() as $code => $meta) {
        $lottery = $meta[0];
        if (!in_array($code, $listed[$lottery] ?? [], true)) {
            continue;
        }
        $grouped[$lottery][] = [
            'gameCode' => $code,
            'lotteryCode' => $lottery,
            'name' => $meta[3],
            'gameName' => $meta[3],
            'gameNameEn' => $meta[3],
            'gameTypeName' => $lottery,
            'status' => 1,
            'state' => 1,
            'intervalMinute' => $meta[1] / 60,
            'sort' => $meta[4],
            'isGameMaintenance' => false,
            'isPlatMaintenance' => false,
        ];
    }
    foreach ($grouped as $lottery => &$list) {
        usort($list, function ($a, $b) {
            return $b['sort'] <=> $a['sort'];
        });
    }
    unset($list);

    $groups = [];
    foreach ($order as $lottery) {
        if (empty($grouped[$lottery])) {
            continue;
        }
        $groups[] = [
            'gameType' => $typeIds[$lottery] ?? 100,
            'gameTypeName' => $names[$lottery] ?? $lottery,
            'lotteryCode' => $lottery,
            'gameCode' => $lottery,
            'categoryCode' => $lottery,
            'categoryName' => $names[$lottery] ?? $lottery,
            'name' => $names[$lottery] ?? $lottery,
            'sort' => $sort[$lottery] ?? 10,
            'gameList' => $grouped[$lottery],
        ];
    }
    return $groups;
}
