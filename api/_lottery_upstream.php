<?php
/**
 * ==========================================================================
 * Lottery Upstream Result Bridge — DhaniWin ka ASLI result source
 * ==========================================================================
 *
 * DhaniWin apne draw results ek upstream "webapi" provider se leta hai:
 *
 *     https://api.devlopedwithzayro.site/api/webapi?action=<Action>
 *
 * Live check (2026-10-06) par dhaniwin.club9.eu.cc aur ye bridge dono ek hi
 * result de rahe the (issue 51148 = 6, 51147 = 7, 51146 = 5 ...), yaani
 * dhaniwin ka result yahin se aa raha hai. Ab MaanWin bhi wahi source use
 * karta hai — isliye period ke saath-saath RESULT bhi exactly same aayega.
 *
 * Kaam kya karta hai:
 *   - GetHistoryIssuePage       -> history list + totalCount/totalPage (pager)
 *   - GetWinTheLotteryResult    -> ek issue ka result (settlement ke liye)
 *   - GetGameIssue              -> countdown/issue (diagnostics)
 *
 * Kya NAHI karta:
 *   - Balance, user, wallet, recharge, withdraw, bet, payout — sab 100%
 *     MaanWin ke apne database par hi chalta hai (bahar kuch nahi jaata).
 *
 * Settings (Admin > WinGo):
 *   lottery_upstream_url       default https://api.devlopedwithzayro.site/api/webapi
 *                              "off" / "local" likhne par upstream band, sab local.
 *   lottery_upstream_key       optional (bridge key maange to)
 *   lottery_upstream_enabled   "0" = band
 */

if (!function_exists('dwl_upstream_url')) {

    /** Default bridge (dhaniwin wahi use karta hai). */
    function dwl_upstream_default_url(): string
    {
        return 'https://api.devlopedwithzayro.site/api/webapi';
    }

    function dwl_upstream_url(): string
    {
        $url = trim((string)dwl_setting('lottery_upstream_url', ''));
        if ($url === '' && defined('LOTTERY_UPSTREAM_URL')) {
            $url = trim((string)LOTTERY_UPSTREAM_URL);
        }
        if ($url === '') {
            $url = dwl_upstream_default_url();
        }
        // "off" likh kar upstream ko poori tarah band kiya ja sakta hai.
        if (in_array(strtolower($url), ['off', 'none', 'local', 'disable', 'disabled', '0', 'no'], true)) {
            return '';
        }
        return rtrim($url, '/');
    }

    function dwl_upstream_key(): string
    {
        $key = trim((string)dwl_setting('lottery_upstream_key', ''));
        if ($key === '' && defined('LOTTERY_UPSTREAM_KEY')) {
            $key = trim((string)LOTTERY_UPSTREAM_KEY);
        }
        return $key;
    }

    function dwl_upstream_enabled(): bool
    {
        if (!dwl_setting('lottery_upstream_enabled', 1)) {
            $flag = strtolower((string)dwl_setting('lottery_upstream_enabled', '1'));
            if (in_array($flag, ['0', 'off', 'false', 'no', 'disable', 'disabled'], true)) {
                return false;
            }
        }
        $url = dwl_upstream_url();
        if ($url === '') {
            return false;
        }
        if (!preg_match('#^https://#i', $url)) {
            return false; // sirf https upstream allow
        }
        if (!function_exists('curl_init') && !ini_get('allow_url_fopen')) {
            return false;
        }
        return true;
    }

    /** Request ke andar kitni baar upstream call hui (diagnostics ke liye). */
    function dwl_upstream_calls(): int
    {
        return (int)($GLOBALS['DWL_UPSTREAM_CALLS'] ?? 0);
    }

    /** Upstream fail hone par thodi der retry na karo (site slow na ho). */
    function dwl_upstream_backoff_active(): bool
    {
        return (int)($GLOBALS['DWL_UPSTREAM_FAIL_UNTIL'] ?? 0) > time();
    }

    /**
     * Ek upstream API call.
     *
     * DhaniWin POST bhejta hai, lekin bridge GET (+ query params) par bhi
     * bilkul same response deta hai — GET use karte hain kyunki wahi live
     * verify kiya gaya hai (curl/file_get_contents dono me simple).
     *
     * @return array|null decoded JSON ya null (fail)
     */
    function dwl_upstream_call(string $action, array $input = [], string $method = 'GET'): ?array
    {
        $base = dwl_upstream_url();
        if ($base === '' || $action === '') {
            return null;
        }
        if (dwl_upstream_backoff_active()) {
            return null;
        }

        $query = array_merge(['action' => $action], $input);
        $url = $base . '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986);
        $key = dwl_upstream_key();
        $headers = [
            'Accept: application/json',
            'X-Api-Key: ' . $key,
            'Origin: https://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'),
        ];

        $raw = null;
        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 5,
                CURLOPT_CONNECTTIMEOUT => 3,
                CURLOPT_SSL_VERIFYPEER => true,
                CURLOPT_SSL_VERIFYHOST => 2,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_MAXREDIRS => 2,
                CURLOPT_CUSTOMREQUEST => strtoupper($method) === 'POST' ? 'POST' : 'GET',
                CURLOPT_HTTPHEADER => $headers,
            ]);
            if (strtoupper($method) === 'POST') {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input, JSON_UNESCAPED_SLASHES));
            }
            $raw = curl_exec($ch);
            $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            if ($httpCode < 200 || $httpCode >= 300 || !is_string($raw) || $raw === '') {
                $raw = null;
            }
        }
        if ($raw === null && ini_get('allow_url_fopen')) {
            $ctx = stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'timeout' => 5,
                    'ignore_errors' => true,
                    'header' => implode("\r\n", $headers),
                ],
                'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
            ]);
            $fetched = @file_get_contents($url, false, $ctx);
            if (is_string($fetched) && $fetched !== '') {
                $raw = $fetched;
            }
        }

        $GLOBALS['DWL_UPSTREAM_CALLS'] = dwl_upstream_calls() + 1;

        if (!is_string($raw) || $raw === '') {
            // 30 second tak dobara try nahi (site par koi latency na aaye).
            $GLOBALS['DWL_UPSTREAM_FAIL_UNTIL'] = time() + 30;
            return null;
        }
        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            $GLOBALS['DWL_UPSTREAM_FAIL_UNTIL'] = time() + 30;
            return null;
        }
        $GLOBALS['DWL_UPSTREAM_FAIL_UNTIL'] = 0;
        return $decoded;
    }

    /** Upstream row ko MaanWin ke internal premium me badlo. */
    function dwl_upstream_row_premium(array $row): string
    {
        foreach (['premium', 'number', 'numberValue', 'result', 'openCode', 'drawNumber'] as $key) {
            if (isset($row[$key]) && $row[$key] !== '' && $row[$key] !== null) {
                $value = $row[$key];
                if (is_array($value)) {
                    $value = implode(',', array_map('strval', $value));
                }
                return (string)$value;
            }
        }
        return '';
    }

    function dwl_upstream_row_issue(array $row): string
    {
        foreach (['issueNumber', 'issue_number', 'issueNo', 'issue', 'period'] as $key) {
            if (isset($row[$key]) && (string)$row[$key] !== '') {
                return (string)$row[$key];
            }
        }
        return '';
    }

    /**
     * Ek issue ka result upstream se (poora row).
     * @return array|null ['premium'=>..,'number'=>..,'color'=>..,'source'=>..,'openTime'=>..]
     */
    function dwl_upstream_fetch_result_row(string $gameCode, string $issueNumber): ?array
    {
        if (!dwl_upstream_enabled() || trim($issueNumber) === '') {
            return null;
        }
        $answer = dwl_upstream_call('GetWinTheLotteryResult', [
            'gameCode' => $gameCode,
            'issueNumber' => $issueNumber,
        ]);
        if (!is_array($answer) || !isset($answer['data'])) {
            return null;
        }
        $data = $answer['data'];
        $row = null;
        if (is_array($data) && isset($data[0]) && is_array($data[0])) {
            $row = $data[0];
        } elseif (is_array($data) && !isset($data[0])) {
            $row = $data;
        }
        if (!is_array($row)) {
            return null;
        }
        $issue = dwl_upstream_row_issue($row);
        if ($issue !== '' && $issue !== (string)$issueNumber) {
            return null; // galat issue aa gaya
        }
        $premium = dwl_upstream_row_premium($row);
        if ($premium === '') {
            return null;
        }
        return [
            'premium' => $premium,
            'number' => (string)($row['number'] ?? $row['numberValue'] ?? ''),
            'color' => (string)($row['color'] ?? $row['colour'] ?? ''),
            'source' => strtolower((string)($row['source'] ?? 'remote')) === 'local' ? 'local' : 'remote',
            'openTime' => (int)($row['openTime'] ?? 0),
        ];
    }

    /** Back-compat: sirf premium string (settlement path isko use karta hai). */
    function dwl_upstream_fetch_result(string $gameCode, string $issueNumber): ?string
    {
        $row = dwl_upstream_fetch_result_row($gameCode, $issueNumber);
        return $row ? (string)$row['premium'] : null;
    }

    /**
     * Upstream history page. Ye hi dhaniwin ka result list hai.
     *
     * Side effect: jo rows upstream de raha hai unhe apne `lottery_results`
     * me likh dete hain (source = remote/local) — taaki settlement aur
     * history dono ek hi sach dikhayein.
     *
     * @return array|null ['list'=>[[..]..], 'head'=>'issue', 'totalCount'=>int, 'totalPage'=>int, 'pageNo'=>int, 'pageSize'=>int]
     */
    function dwl_upstream_fetch_history(string $gameCode, int $pageNo = 1, int $pageSize = 10): ?array
    {
        if (!dwl_upstream_enabled()) {
            return null;
        }
        $code = dwl_normalize_game($gameCode);
        $pageNo = max(1, $pageNo);
        $pageSize = max(1, min(100, $pageSize));

        $answer = dwl_upstream_call('GetHistoryIssuePage', [
            'gameCode' => $code,
            'pageNo' => $pageNo,
            'pageSize' => $pageSize,
        ]);
        if (!is_array($answer)) {
            return null;
        }
        $payload = isset($answer['data']) && is_array($answer['data']) ? $answer['data'] : $answer;
        if (!isset($payload['list']) || !is_array($payload['list']) || !$payload['list']) {
            return null;
        }

        $out = [];
        $head = '';
        foreach ($payload['list'] as $item) {
            if (!is_array($item)) {
                continue;
            }
            $issue = dwl_upstream_row_issue($item);
            $premium = dwl_upstream_row_premium($item);
            if ($issue === '' || $premium === '') {
                continue;
            }
            if ($head === '') {
                $head = $issue;
            }
            $row = [
                'issue' => $issue,
                'premium' => $premium,
                'number' => (string)($item['number'] ?? $item['numberValue'] ?? ''),
                'color' => (string)($item['color'] ?? $item['colour'] ?? ''),
                'sum' => isset($item['sum']) ? (int)$item['sum'] : (isset($item['sumValue']) ? (int)$item['sumValue'] : null),
                'source' => strtolower((string)($item['source'] ?? 'remote')) === 'local' ? 'local' : 'remote',
                'openTime' => (int)($item['openTime'] ?? 0),
            ];
            $out[] = $row;
        }
        if (!$out) {
            return null;
        }

        // DB me likh do (upstream authoritative hai — local galat value ko
        // overwrite kar deta hai, lekin admin ke manual/control result ko nahi).
        if (function_exists('dwl_store_result') && function_exists('db')) {
            $conn = db();
            if ($conn) {
                foreach ($out as $row) {
                    $detail = dwl_result_from_premium($code, $row['issue'], $row['premium']);
                    if ($row['color'] !== '') {
                        $detail['color'] = $row['color'];
                    }
                    dwl_store_result($conn, $code, $row['issue'], $detail, $row['source'], true);
                }
            }
        }

        $result = [
            'list' => $out,
            'head' => $head,
            'pageNo' => (int)($payload['pageNo'] ?? $pageNo),
            'pageSize' => (int)($payload['pageSize'] ?? $pageSize),
            'totalPage' => (int)($payload['totalPage'] ?? 0),
            'totalCount' => (int)($payload['totalCount'] ?? 0),
        ];
        $GLOBALS['DWL_UPSTREAM_TOTALS'][$code] = [
            'totalCount' => $result['totalCount'],
            'totalPage' => $result['totalPage'],
            'pageSize' => $result['pageSize'],
        ];
        $GLOBALS['DWL_UPSTREAM_HEAD'][$code] = $head;
        return $result;
    }

    /** Upstream ko abhi ka issue / countdown (diagnostics ke liye). */
    function dwl_upstream_fetch_issue(string $gameCode): ?array
    {
        if (!dwl_upstream_enabled()) {
            return null;
        }
        $answer = dwl_upstream_call('GetGameIssue', ['gameCode' => dwl_normalize_game($gameCode)]);
        if (!is_array($answer) || !isset($answer['data']) || !is_array($answer['data'])) {
            return null;
        }
        return $answer['data'];
    }

    /** Is request me upstream se mile totals (pager ke liye). */
    function dwl_upstream_totals(string $gameCode): ?array
    {
        return $GLOBALS['DWL_UPSTREAM_TOTALS'][dwl_normalize_game($gameCode)] ?? null;
    }

    /** Upstream list ka sabse naya issue. */
    function dwl_upstream_head(string $gameCode): string
    {
        return (string)($GLOBALS['DWL_UPSTREAM_HEAD'][dwl_normalize_game($gameCode)] ?? '');
    }

    /**
     * Sirf recent issues ke liye single-issue call (har request me max 3),
     * warna 100 issues par 100 HTTP calls ho jayengi.
     */
    function dwl_upstream_issue_lookup_allowed(string $gameCode, string $issueNumber): bool
    {
        if (!dwl_upstream_enabled() || dwl_upstream_backoff_active()) {
            return false;
        }
        if ((int)($GLOBALS['DWL_UPSTREAM_ISSUE_CALLS'] ?? 0) >= 3) {
            return false;
        }
        $head = dwl_upstream_head($gameCode);
        if ($head !== '') {
            // head se 2 period se zyada purana issue upstream me mil hi gaya hota
            // hai -> uske liye alag call ki zaroorat nahi.
            return strcmp($issueNumber, dwl_prev_period($gameCode, $head, 2)) >= 0;
        }
        return true;
    }

    function dwl_upstream_issue_lookup_done(): void
    {
        $GLOBALS['DWL_UPSTREAM_ISSUE_CALLS'] = (int)($GLOBALS['DWL_UPSTREAM_ISSUE_CALLS'] ?? 0) + 1;
    }

    /** head se N period peeche ka issue (helper). */
    function dwl_prev_period(string $gameCode, string $issueNumber, int $steps = 1): string
    {
        $issue = $issueNumber;
        for ($i = 0; $i < $steps; $i++) {
            $prev = function_exists('dwl_prev_issue') ? dwl_prev_issue($gameCode, $issue) : '';
            if ($prev === '') {
                return $issue;
            }
            $issue = $prev;
        }
        return $issue;
    }

    /** Admin diagnostics ke liye health check. */
    function dwl_upstream_status(): array
    {
        $url = dwl_upstream_url();
        $out = [
            'enabled' => dwl_upstream_enabled(),
            'url' => $url,
            'keySet' => dwl_upstream_key() !== '',
            'reachable' => false,
            'sample' => null,
            'totals' => null,
            'message' => '',
        ];
        if ($url === '') {
            $out['message'] = 'Upstream OFF hai — local deterministic results use ho rahe hain.';
            return $out;
        }
        $answer = dwl_upstream_call('GetWinTheLotteryResult', [
            'gameCode' => 'WinGo_30S',
            'issueNumber' => dwl_issue_by_offset('WinGo_30S', 1),
        ]);
        if (is_array($answer)) {
            $out['reachable'] = true;
            $row = is_array($answer['data'] ?? null) && isset($answer['data'][0]) ? $answer['data'][0] : ($answer['data'] ?? null);
            if (is_array($row)) {
                $out['sample'] = [
                    'issue' => dwl_upstream_row_issue($row),
                    'premium' => dwl_upstream_row_premium($row),
                    'color' => (string)($row['color'] ?? $row['colour'] ?? ''),
                ];
            }
            $hist = dwl_upstream_fetch_history('WinGo_30S', 1, 5);
            if (is_array($hist)) {
                $out['totals'] = ['totalCount' => $hist['totalCount'], 'totalPage' => $hist['totalPage']];
            }
            $out['message'] = 'Upstream reachable — results dhaniwin wale hi aayenge.';
        } else {
            $out['message'] = 'Upstream call fail hui (URL/key/SSL/hosting outbound check karein) — local engine chal raha hai.';
        }
        return $out;
    }
}
