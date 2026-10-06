MAAN WIN - SINGLE RUNTIME SCREEN-LOAD + AUTO-REFRESH FIX V4
===========================================================

LIVE ROOT CAUSE
---------------
The V3 page loaded js/index-MaanWinRefreshFix-20261006.js, while lazy chunks
still imported js/index-B9u3BH9U.js. That created two Vue/router runtimes and
caused query/name/path/refs errors before #app could mount, leaving a blank page.

V4 FIX
------
- index.html loads a tiny V4 bootstrap module.
- The bootstrap performs a one-time cleanup of old ar-pwa/online-page caches.
- It unregisters only the old root ar-sw.js / pwa-sw.js workers.
- It preserves Firebase and other scoped service workers.
- It refreshes and imports the exact original js/index-B9u3BH9U.js URL.
- Lazy chunks and the page therefore share one Vue/router runtime.
- The original runtime keeps the blocking update popup and auto-version loop disabled.
- ar-sw.js uses the new maanwin-runtime-v4 cache revision.

INSTALL
-------
1. Upload this ZIP inside the domain's public_html folder.
2. Extract it directly in public_html and allow overwrite.
3. Open https://maanwin.club9.eu.cc/ normally.

No database import is required for this V4 frontend patch.

FILES IN THIS PATCH
-------------------
- index.html
- ar-sw.js
- js/index-B9u3BH9U.js
- js/maan-win-bootstrap-v4.mjs
- MAAN_WIN_SINGLE_RUNTIME_V4_README.txt
