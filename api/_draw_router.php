<?php
/**
 * ==========================================================================
 * Draw router — DhaniWin parity
 * ==========================================================================
 *
 * Ye wahi endpoints serve karta hai jo AR frontend (WinGo/K3/5D/TrxWinGo/
 * MotoRace) maangta hai:
 *
 *   /webapi/kv/issue/WinGo_30S                (same-domain countdown)
 *   /webapi/v/issue/WinGo_30S
 *   /WinGo/WinGo_30S.json                     (purane skin ka countdown)
 *   /WinGo/WinGo_30S/GetGameIssue.json
 *   /WinGo/WinGo_30S/GetHistoryIssuePage.json  (result history)
 *   /D5/D5_1M.json, /K3/K3_1M.json, /TrxWinGo/..., /MotoRace/...
 *
 * Response shape bilkul dhaniwin jaisa hai (issueNumber + current +
 * nextIssueNumber + seconds/isLocked + saare aliases), isliye period aur
 * result dono jagah same dikhte hain.
 */
require_once __DIR__ . '/_core/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    api_headers();
    exit;
}

$path = trim((string)($_GET['path'] ?? ''), "/ \t\n\r\0\x0B");
$gameCode = (string)($_GET['gameCode'] ?? $_GET['game_code'] ?? '');

if ($path !== '') {
    $path = str_replace('\\', '/', urldecode($path));
    $path = preg_replace('#\.\./#', '', $path);

    // 1. History / results: /WinGo/WinGo_30S/GetHistoryIssuePage.json
    if (preg_match('#^([^/]+)/([^/]+)/GetHistoryIssuePage(?:\.json)?$#i', $path, $m)) {
        $gameCode = dwl_normalize_game($m[2]);
        $pageNo = max(1, (int)($_GET['pageNo'] ?? $_GET['page_no'] ?? $_GET['page'] ?? 1));
        $pageSize = max(1, min(100, (int)($_GET['pageSize'] ?? $_GET['page_size'] ?? 10)));
        le_settle_pending_bets($gameCode);
        api_success(dwl_history_page($gameCode, $pageNo, $pageSize), 'Succeed', ['serviceTime' => now_ms(), 'serverTime' => now_ms()]);
    }

    // 2. Issue / timer: /WinGo/WinGo_30S.json, /WinGo/WinGo_30S/GetGameIssue.json
    if (preg_match('#^([^/]+)/([^/]+?)(?:/(?:GetGameIssue|issue))?(?:\.json|\.html)?$#i', $path, $m)) {
        $gameCode = dwl_normalize_game($m[2]);
        api_emit_json(dwl_issue_payload($gameCode));
    }

    // 3. /webapi/kv/issue/WinGo_30S ya /api/kv/issue/...
    if (preg_match('#(?:kv/issue|issue)/([A-Za-z0-9_]+)#i', $path, $m)) {
        $gameCode = dwl_normalize_game($m[1]);
        api_emit_json(dwl_issue_payload($gameCode));
    }
}

if ($gameCode === '') {
    $gameCode = 'WinGo_30S';
}

// Default: countdown / issue payload.
api_emit_json(dwl_issue_payload(dwl_normalize_game($gameCode)));

/** JSON output with CORS headers (echo ke bajaye, double output se bachne ke liye). */
function api_emit_json(array $payload): void
{
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    }
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
