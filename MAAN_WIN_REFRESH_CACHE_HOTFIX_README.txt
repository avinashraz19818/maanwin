MAAN WIN - FINAL AUTO-REFRESH/CACHE HOTFIX
===========================================

Problem confirmed on live domain:
- maanwin.club9.eu.cc was still serving the old js/index-B9u3BH9U.js.
- That live file still contained the blocking alert followed by window.location.reload().
- Reusing the same hashed filename allowed the old service-worker cache to keep serving it.

Fix in this patch:
- The currently loaded legacy file js/index-B9u3BH9U.js is overwritten directly.
- Automatic version-check worker startup is disabled in both entry bundles.
- index.html now loads a new unique bundle:
  js/index-MaanWinRefreshFix-20261006.js
- The new bundle contains no blocking "A new version is available" alert.
- The root service worker is registered with a revisioned URL.
- ar-sw.js uses a new cache revision and deletes superseded ar-pwa caches on activation.

INSTALL
-------
1. Upload this ZIP inside the domain's public_html folder.
2. Extract it directly in public_html and allow overwrite when asked.
3. Open https://maanwin.club9.eu.cc/ again.

Only these files are included:
- index.html
- ar-sw.js
- js/index-B9u3BH9U.js
- js/index-MaanWinRefreshFix-20261006.js
- MAAN_WIN_REFRESH_CACHE_HOTFIX_README.txt

The earlier DB/admin hotfix remains installed; this small patch only fixes the
remaining live popup/cache problem.
