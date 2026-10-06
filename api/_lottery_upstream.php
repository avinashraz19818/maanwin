<?php
/**
 * ==========================================================================
 * Lottery Upstream Result Bridge (DhaniWin jaisa, optional)
 * ==========================================================================
 *
 * DhaniWin apne live draw results ek upstream "webapi" provider se leta hai.
 * Wahi bridge MaanWin me bhi available hai — Admin > WinGo settings me
 * `lottery_upstream_url` (+ `lottery_upstream_key`) daal kar enable hota hai.
 *
 * Zaroori baat:
 *  - Ye sirf RESULT / HISTORY / COUNTDOWN fetch karta hai (read-only).
 *  - Balance, user, wallet, recharge, withdraw, betting, payout — sab 100%
 *    MaanWin ke apne database par hi chalta hai.
 *  - URL blank ho to kuch bhi call nahi hota; tab local deterministic engine
 *    result deta hai (dhaniwin ka bhi default wahi hai).
 */

if (!function_exists('dwl_upstream_url')) {

    function dwl_upstream_url(): string
    {
        $url = trim((string)dwl_setting('lottery_upstream_url', ''));
        if ($url === '' && defined('LOTTERY_UPSTREAM_URL')) {
            $url = trim((string)LOTTERY_UPSTREAM_URL);
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
        $url = dwl_upstream_url();
        if ($url === '' || !function_exists('curl_init')) {
            return false;
        }
        if (!preg_match('#^https://#i', $url)) {
            return false; // sirf https upstream allow
        }
        return true;
    }

    /**
     * Upstream ko ek API call (json body). Fail hone par null.
     */
    function dwl_upstream_call(string $action, array $input = [], string $method = 'POST'): ?array
    {
        $base = dwl_upstream_url();
        if ($base === '') {
            return null;
        }
        $url = $base . '?action=' . rawurlencode($action);
        $headers = [
            'Accept: application/json',
            'Content-Type: application/json',
            'X-Api-Key: ' . dwl_upstream_key(),
            'Origin: https://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'),
        ];
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 6,
            CURLOPT_CONNECTTIMEOUT => 3,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
        ]);
        if ($method !== 'GET') {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input, JSON_UNESCAPED_SLASHES));
        }
        $raw = curl_exec($ch);
        $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($httpCode !== 200 || !is_string($raw) || $raw === '') {
            return null;
        }
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : null;
    }

    /**
     * Ek issue ka premium upstream se laao. Null = kuch nahi mila.
     * Sab formats (wingo number / K3 dice / 5D digits / MotoRace ranks) support.
     */
    function dwl_upstream_fetch_result(string $gameCode, string $issueNumber): ?string
    {
        if (!dwl_upstream_enabled() || trim($issueNumber) === '') {
            return null;
        }
        $answer = dwl_upstream_call('GetWinTheLotteryResult', [
            'gameCode' => $gameCode,
            'issueNumber' => $issueNumber,
        ]);
        if (!is_array($answer)) {
            return null;
        }
        $row = null;
        if (isset($answer['data'])) {
            $data = $answer['data'];
            if (is_array($data) && isset($data[0])) {
                $row = $data[0];
            } elseif (is_array($data)) {
                $row = $data;
            }
        } elseif (isset($answer['list']) && is_array($answer['list']) && isset($answer['list'][0])) {
            $row = $answer['list'][0];
        } elseif (isset($answer['premium']) || isset($answer['number'])) {
            $row = $answer;
        }
        if (!is_array($row)) {
            return null;
        }
        // Wrong issue aa gaya to ignore karo.
        if (!empty($row['issueNumber']) && (string)$row['issueNumber'] !== (string)$issueNumber) {
            return null;
        }
        foreach (['premium', 'number', 'numberValue', 'result', 'openCode', 'dice'] as $key) {
            if (isset($row[$key]) && $row[$key] !== '' && $row[$key] !== null) {
                $value = $row[$key];
                if (is_array($value)) {
                    $value = implode(',', array_map('strval', $value));
                }
                return (string)$value;
            }
        }
        return null;
    }

    /**
     * Upstream se poori history page (available ho to maanwin usko use karta hai).
     */
    function dwl_upstream_fetch_history(string $gameCode, int $pageNo = 1, int $pageSize = 10): ?array
    {
        if (!dwl_upstream_enabled()) {
            return null;
        }
        $answer = dwl_upstream_call('GetHistoryIssuePage', [
            'gameCode' => $gameCode,
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
        $conn = function_exists('db') ? db() : null;
        $clean = [];
        foreach ($payload['list'] as $item) {
            if (!is_array($item)) {
                continue;
            }
            $issue = (string)($item['issueNumber'] ?? $item['issue_number'] ?? $item['issue'] ?? '');
            $premium = (string)($item['premium'] ?? $item['number'] ?? $item['numberValue'] ?? '');
            if ($issue === '' || $premium === '') {
                continue;
            }
            // Upstream ka result apne DB me cache karo, taaki settlement usi par ho.
            if ($conn && dwl_issue_closed($gameCode, $issue)) {
                $detail = dwl_result_from_premium($gameCode, $issue, $premium);
                $detail['source'] = 'upstream_live';
                dwl_store_result($conn, dwl_normalize_game($gameCode), $issue, $detail, 'upstream_live');
            }
            $detail = dwl_result_from_premium($gameCode, $issue, $premium);
            $detail['source'] = 'remote';
            $clean[] = $detail;
        }
        if (!$clean) {
            return null;
        }
        return [
            'list' => $clean,
            'pageNo' => (int)($payload['pageNo'] ?? $pageNo),
            'pageSize' => (int)($payload['pageSize'] ?? $pageSize),
            'totalPage' => (int)($payload['totalPage'] ?? 50),
            'totalCount' => (int)($payload['totalCount'] ?? 500),
        ];
    }

    /** Quick health check (admin diagnostics ke liye). */
    function dwl_upstream_status(): array
    {
        $url = dwl_upstream_url();
        $out = [
            'enabled' => dwl_upstream_enabled(),
            'url' => $url,
            'keySet' => dwl_upstream_key() !== '',
            'reachable' => false,
            'message' => '',
        ];
        if ($url === '') {
            $out['message'] = 'Upstream URL not set — local deterministic results are used.';
            return $out;
        }
        $answer = dwl_upstream_call('GetHistoryIssuePage', ['gameCode' => 'WinGo_30S', 'pageNo' => 1, 'pageSize' => 1]);
        if (is_array($answer)) {
            $out['reachable'] = true;
            $out['message'] = 'Upstream reachable.';
        } else {
            $out['message'] = 'Upstream call failed (URL/key/SSL check karein).';
        }
        return $out;
    }
}
