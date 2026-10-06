<?php
/**
 * MAANWIN — WinGo / DhaniWin-parity fix: deployment check (READ-ONLY).
 * -------------------------------------------------------------------
 * Upload karne ke baad browser me kholein:
 *     https://<aapka-domain>/wingo-fix-check.php?key=<DIAG_KEY>
 * <DIAG_KEY> Admin > WinGo > "Diagnostics" page par diya hota hai.
 * Admin1 panel me logged-in ho to bina key bhi khul jata hai.
 *
 * Ye file kuch badalti nahi — sirf ye batati hai ki ZIP ke files server par
 * lage hain ya purane pade hain, aur DB tables/columns theek hain ya nahi.
 * Kaam khatam hone par is file ko DELETE kar dein.
 */

$key = isset($_GET['key']) ? (string)$_GET['key'] : '';

$bootOk = false;
$bootErr = '';
try {
    require_once __DIR__ . '/api/_core/bootstrap.php';
    $bootOk = true;
} catch (Throwable $e) {
    $bootErr = $e->getMessage();
}

if (!$bootOk) {
    header('Content-Type: text/html; charset=utf-8');
    echo '<h2>wingo-fix-check.php</h2><p style="color:#b00">Bootstrap load nahi hua: '
        . htmlspecialchars($bootErr, ENT_QUOTES) . '</p>'
        . '<p>Matlab ye file us folder me hai jahan app nahi hai. Isko usi folder me rakhein '
        . 'jisme <code>index.html</code> aur <code>api/</code> folder hai.</p>';
    exit;
}

/* ---------------- auth (wahi tarika jo /api/Diag/WinGo use karta hai) ---------------- */
$authorized = ($key !== '' && hash_equals(dwl_diag_key(), $key));
if (!$authorized) {
    if (session_status() !== PHP_SESSION_ACTIVE && PHP_SAPI !== 'cli') {
        @session_name('dhaniwin_admin');
        @session_start();
    }
    if (session_status() === PHP_SESSION_ACTIVE && !empty($_SESSION['dw_admin_id'])) {
        $authorized = true;
    }
}
if (!$authorized) {
    header('Content-Type: text/html; charset=utf-8');
    echo '<h2>wingo-fix-check.php</h2>'
        . '<p>Key chahiye. Admin panel (admin1) > WinGo > Diagnostics par jo key dikhti hai, '
        . 'wo is URL me lagayein:</p><pre>wingo-fix-check.php?key=&lt;DIAG_KEY&gt;</pre>'
        . '<p>Ya pehle admin1 me login karein, phir ye page bina key khul jayega.</p>';
    exit;
}

/* ---------------- helpers ---------------- */
/** File ke andar expected code marker hai? (purani file pakadne ke liye) */
function wfc_marker(string $rel, string $marker): array
{
    $abs = PUBLIC_ROOT . '/' . $rel;
    if (!is_file($abs)) {
        return ['state' => 'missing', 'size' => 0, 'time' => 0, 'sha' => ''];
    }
    $size = (int)filesize($abs);
    $src = (string)@file_get_contents($abs);
    $has = ($marker === '') ? ($size > 0) : (strpos($src, $marker) !== false);
    return [
        'state' => $has ? 'ok' : 'old',
        'size' => $size,
        'time' => (int)filemtime($abs),
        'sha' => substr(hash('sha256', $src), 0, 16),
    ];
}

$checks = [
    ['.htaccess', '_draw_router.php', 'draw-router rewrite (frozen issue json override)'],
    ['api/_router.php', 'dwl_trend_stats', 'naya router + trend stats + GetWingoLiveUrl'],
    ['api/_draw_router.php', 'Draw router — DhaniWin parity', 'naya /webapi/kv/issue/* + /WinGo/*.json router'],
    ['api/_lottery_upstream.php', 'lottery_upstream_url', 'optional live upstream client'],
    ['api/_core/bootstrap.php', 'dwl_diag_key', 'bootstrap (diag key + db reconnect + auto tables)'],
    ['api/_core/lottery_dhaniwin.php', 'function dwl_trend_stats', 'DhaniWin-parity engine'],
    ['api/_core/lottery_engine.php', 'function le_settle_pending_bets', 'settlement/wallet layer'],
    ['admin1/index.php', 'Diag/WinGo', 'admin WinGo tab + Diagnostics link'],
    ['js/record-BVIB9KLd.js', '', 'missing "Record" chunk (404 fix)'],
];

$rows = [];
$allOk = true;
foreach ($checks as $c) {
    $r = wfc_marker($c[0], $c[1]);
    if ($r['state'] !== 'ok') {
        $allOk = false;
    }
    $r['file'] = $c[0];
    $r['note'] = $c[2];
    $rows[] = $r;
}

/* ---------------- DB status (read-only) ---------------- */
function wfc_db_report(): array
{
    $out = ['connected' => false, 'error' => '', 'tables' => [], 'columns' => []];
    if (!class_exists('mysqli')) {
        $out['error'] = 'mysqli extension PHP me enabled nahi hai';
        return $out;
    }
    // PHP 8.1+ par default mysqli mode exception throw karta hai — off kar do,
    // warna connection fail hone par ye page hi fatal ho jayega.
    if (function_exists('mysqli_report')) {
        mysqli_report(MYSQLI_REPORT_OFF);
    }
    try {
        $conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if (!$conn || $conn->connect_errno) {
            $out['error'] = 'connect failed: ' . ($conn->connect_error ?? 'unknown error');
            return $out;
        }
        $out['connected'] = true;
        foreach (['users', 'lottery_bets', 'lottery_results', 'lottery_game_settings', 'financial_records', 'result_queue', 'wallet_ledger'] as $t) {
            $res = @$conn->query("SHOW TABLES LIKE '" . $conn->real_escape_string($t) . "'");
            $out['tables'][$t] = ($res instanceof mysqli_result && $res->num_rows > 0);
        }
        // `lottery_results.source` column (parity engine isko likhta hai)
        $col = false;
        $res = @$conn->query("SHOW COLUMNS FROM lottery_results LIKE 'source'");
        if ($res instanceof mysqli_result && $res->num_rows > 0) {
            $col = true;
        }
        $out['columns']['lottery_results.source'] = $col;
        $cnt = @$conn->query('SELECT COUNT(*) AS c FROM lottery_results');
        if ($cnt instanceof mysqli_result && ($row = $cnt->fetch_assoc())) {
            $out['rows_lottery_results'] = (int)$row['c'];
        }
        @$conn->close();
    } catch (Throwable $e) {
        $out['error'] = $e->getMessage();
    }
    return $out;
}

$db = wfc_db_report();
$engine = dwl_issue_data('WinGo_30S');
$sample = dwl_history_item('WinGo_30S', $engine['issueNumber'], dwl_result_for_issue('WinGo_30S', $engine['issueNumber'], false));
$trend = function_exists('dwl_trend_stats') ? dwl_trend_stats('WinGo_30S', 10) : [];

function wfc_h($v): string { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); }
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MaanWin WinGo fix — deployment check</title>
<style>
  body{font:14px/1.5 system-ui,Segoe UI,Roboto,sans-serif;margin:24px;color:#17181c;background:#f6f7f9}
  h1{font-size:20px;margin:0 0 4px} h2{font-size:16px;margin:24px 0 8px}
  .wrap{max-width:960px;margin:0 auto}
  .card{background:#fff;border:1px solid #e3e5ea;border-radius:10px;padding:16px;margin-bottom:16px}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th,td{text-align:left;padding:6px 8px;border-bottom:1px solid #eef0f4;vertical-align:top}
  code,pre{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px}
  .ok{color:#0a7a35;font-weight:600}.bad{color:#b3261e;font-weight:600}.warn{color:#a35b00;font-weight:600}
  .big{font-size:15px;padding:12px 14px;border-radius:8px;margin-bottom:16px}
  .big.ok{background:#e7f6ec;border:1px solid #b7e2c4;color:#0a5f2b}
  .big.bad{background:#fdecea;border:1px solid #f5c2bd;color:#8f1d16}
  .muted{color:#6b7280}
</style>
</head>
<body><div class="wrap">
<h1>MaanWin — WinGo / DhaniWin parity fix: deployment check</h1>
<p class="muted">Ye page sirf padhta hai, kuch badalta nahi. Kaam ke baad is file ko delete kar dein.</p>

<div class="big <?= $allOk ? 'ok' : 'bad' ?>">
  <?= $allOk
        ? 'FILES: sab naye hain — fix server par lag chuka hai. ✅'
        : 'FILES: kuch files purani ya missing hain — ZIP extract poora nahi hua. ❌' ?>
</div>

<div class="card">
  <table>
    <tr><th>File</th><th>Status</th><th>Size</th><th>Modified</th><th>sha256 (16)</th><th>Kya check hua</th></tr>
    <?php foreach ($rows as $r): ?>
      <tr>
        <td><code><?= wfc_h($r['file']) ?></code></td>
        <td class="<?= $r['state'] === 'ok' ? 'ok' : 'bad' ?>">
          <?= $r['state'] === 'ok' ? 'NAYA' : ($r['state'] === 'old' ? 'PURANA' : 'MISSING') ?>
        </td>
        <td><?= (int)$r['size'] ?></td>
        <td class="muted"><?= $r['time'] ? wfc_h(gmdate('Y-m-d H:i', $r['time'])) . ' UTC' : '—' ?></td>
        <td><code><?= wfc_h($r['sha']) ?></code></td>
        <td class="muted"><?= wfc_h($r['note']) ?></td>
      </tr>
    <?php endforeach; ?>
  </table>
</div>

<div class="card">
  <h2 style="margin-top:0">Paths</h2>
  <table>
    <tr><td>Ye file yahan hai</td><td><code><?= wfc_h(__FILE__) ?></code></td></tr>
    <tr><td>App root (PUBLIC_ROOT)</td><td><code><?= wfc_h(PUBLIC_ROOT) ?></code></td></tr>
    <tr><td>config.php mila?</td><td class="<?= is_file(API_ROOT . '/_core/config.php') ? 'ok' : 'bad' ?>">
        <?= is_file(API_ROOT . '/_core/config.php') ? 'haan' : 'NAHI — api/_core/config.php check karein' ?></td></tr>
    <tr><td>PHP version</td><td><?= wfc_h(PHP_VERSION) ?></td></tr>
  </table>
</div>

<div class="card">
  <h2 style="margin-top:0">Engine (local, isi server par chala)</h2>
  <table>
    <tr><td>Aaj ka current issue</td><td><code><?= wfc_h($engine['issueNumber']) ?></code> &nbsp;(next: <code><?= wfc_h($engine['nextIssueNumber']) ?></code>)</td></tr>
    <tr><td>Interval / countdown</td><td><?= wfc_h($engine['interval'] . 's') ?> &nbsp;|&nbsp; bacha: <?= (int)$engine['seconds'] ?>s</td></tr>
    <tr><td>Latest settled result</td><td>number <b><?= wfc_h($sample['number']) ?></b>, color <code><?= wfc_h($sample['color']) ?></code>, premium <code><?= wfc_h($sample['premium']) ?></code></td></tr>
    <tr><td>Trend stats (naya function)</td><td class="<?= $trend ? 'ok' : 'bad' ?>">
        <?= $trend ? 'available (' . count($trend) . ' digits)' : 'NAHI — api/_core/lottery_dhaniwin.php purani hai' ?></td></tr>
  </table>
</div>

<div class="card">
  <h2 style="margin-top:0">Result source (dhaniwin wahi use karta hai)</h2>
  <?php $up = function_exists('dwl_upstream_status') ? dwl_upstream_status() : null; ?>
  <?php if (!$up): ?>
    <p class="bad">Upstream module load nahi hua (api/_lottery_upstream.php purani hai).</p>
  <?php else: ?>
    <table>
      <tr><td>Bridge URL</td><td><code><?= wfc_h($up['url'] !== '' ? $up['url'] : '(off)') ?></code></td></tr>
      <tr><td>Enabled</td><td class="<?= $up['enabled'] ? 'ok' : 'warn' ?>"><?= $up['enabled'] ? 'haan' : 'NAHI (local engine chal raha hai)' ?></td></tr>
      <tr><td>API key</td><td><?= $up['keySet'] ? 'set hai' : 'set nahi (bridge bina key bhi chalta hai)' ?></td></tr>
      <tr><td>Reachable</td><td class="<?= $up['reachable'] ? 'ok' : 'bad' ?>"><?= $up['reachable'] ? 'HAAN — result dhaniwin wale hi aayenge' : 'NAHI' ?></td></tr>
      <?php if (!empty($up['sample'])): ?>
      <tr><td>Sample (pichhla period)</td><td>issue <code><?= wfc_h($up['sample']['issue']) ?></code> → number <b><?= wfc_h($up['sample']['premium']) ?></b>, color <code><?= wfc_h($up['sample']['color']) ?></code></td></tr>
      <?php endif; ?>
      <?php if (!empty($up['totals'])): ?>
      <tr><td>Upstream totals</td><td>totalCount <?= (int)$up['totals']['totalCount'] ?> · totalPage <?= (int)$up['totals']['totalPage'] ?></td></tr>
      <?php endif; ?>
    </table>
    <p class="muted" style="margin-bottom:0"><?= wfc_h($up['message']) ?></p>
  <?php endif; ?>
</div>

<div class="card">
  <h2 style="margin-top:0">Database</h2>
  <?php if (!$db['connected']): ?>
    <p class="bad">Connection nahi hua: <?= wfc_h($db['error']) ?></p>
    <p class="muted">api/_core/config.php me DB_HOST / DB_USER / DB_PASS / DB_NAME check karein.</p>
  <?php else: ?>
    <table>
      <tr><th>Table</th><th>Status</th></tr>
      <?php foreach ($db['tables'] as $t => $exists): ?>
        <tr><td><code><?= wfc_h($t) ?></code></td>
            <td class="<?= $exists ? 'ok' : 'warn' ?>"><?= $exists ? 'hai' : 'nahi (auto-install se ban jayegi)' ?></td></tr>
      <?php endforeach; ?>
      <tr><td><code>lottery_results.source</code> column</td>
          <td class="<?= !empty($db['columns']['lottery_results.source']) ? 'ok' : 'warn' ?>">
            <?= !empty($db['columns']['lottery_results.source']) ? 'hai' : 'nahi (pehli API call par khud add ho jata hai)' ?></td></tr>
      <?php if (isset($db['rows_lottery_results'])): ?>
      <tr><td>lottery_results rows</td><td><?= (int)$db['rows_lottery_results'] ?></td></tr>
      <?php endif; ?>
    </table>
    <p class="muted" style="margin-bottom:0">Tables/column khud ban jaate hain — koi SQL import karne ki zaroorat nahi.</p>
  <?php endif; ?>
</div>

<div class="card">
  <h2 style="margin-top:0">Ab ye 3 URL browser me khol kar dekh lein</h2>
  <ol class="muted">
    <li><a href="/api/Lottery/GetBetLimit?gameCode=WinGo_30S">/api/Lottery/GetBetLimit?gameCode=WinGo_30S</a>
        — teen aane chahiye: <code>Num</code>, <code>Color</code>, <code>BigSmall</code></li>
    <li><a href="/api/Lottery/GetTrendStatistics?gameCode=WinGo_30S&amp;pageSize=10">/api/Lottery/GetTrendStatistics?gameCode=WinGo_30S&amp;pageSize=10</a>
        — <code>data</code> 10 digits ka list hona chahiye (0-9) missing/avg ke saath</li>
    <li><a href="/js/record-BVIB9KLd.js">/js/record-BVIB9KLd.js</a> — 404 nahi, JS file khulni chahiye</li>
  </ol>
  <p class="muted" style="margin-bottom:0">Aur game page par: countdown chale, result aaye, ek chhota ₹10 ka bet lagayein
    (balance turant kam ho, period band hone par win/loss popup aaye).</p>
</div>

<p class="muted">Key rotate karni ho to <code>DW_DIAG_KEY</code> ya <code>APP_SECRET</code> badal dein —
diag key usi se banti hai.</p>
</div></body></html>
