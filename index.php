<?php
/**
 * SPA entry (index.php) — index.html ko serve karta hai.
 *
 * Do chhoti cheezein add ki gayi hain (DhaniWin parity):
 *   1) <base href="...">  — game page (/WinGo/WinGo_30S) refresh karne par
 *      bhi saare relative asset path (/js, /css, /assets, /img) sahi resolve hon.
 *   2) particles script    — winning popup ke particles (purana JS cache ho
 *      to bhi) hamesha load ho jayein.
 * Baaki behavior bilkul same: config + bootstrap, phir index.html ka output.
 */
require_once __DIR__ . '/api/_core/config.php';
require_once __DIR__ . '/api/_core/bootstrap.php';

$file = __DIR__ . '/index.html';
header('Content-Type: text/html; charset=utf-8');
// shell kabhi stale na mile (particles script + base tag hamesha fresh)
header('Cache-Control: no-cache, no-store, must-revalidate');

$html = @file_get_contents($file);
if ($html === false || $html === '') {
    readfile($file);
    return;
}

$base = str_replace('\\', '/', dirname((string)($_SERVER['SCRIPT_NAME'] ?? '/index.php')));
$base = rtrim($base, '/');
if ($base === '/' || $base === '.' ) {
    $base = '';
}
$baseHref = $base . '/';
$scriptSrc = $base . '/js/mnw-win-particles.js';

if (stripos($html, '<base ') === false) {
    $baseTag = '<base href="' . htmlspecialchars($baseHref, ENT_QUOTES) . '">';
    $html = preg_replace_callback('#<head[^>]*>#i', function ($m) use ($baseTag) {
        return $m[0] . "\n" . $baseTag;
    }, $html, 1);
}

if (strpos($html, 'mnw-win-particles.js') === false) {
    $tag = '<script src="' . htmlspecialchars($scriptSrc, ENT_QUOTES) . '" defer></script>';
    if (stripos($html, '</body>') !== false) {
        $html = preg_replace('#</body>#i', $tag . "\n</body>", $html, 1);
    } else {
        $html .= $tag;
    }
}

echo $html;
