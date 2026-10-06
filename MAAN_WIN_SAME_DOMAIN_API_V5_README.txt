MAAN WIN - SAME DOMAIN API/DRAW ROUTING HOTFIX V5
================================================

LIVE ROOT CAUSE
---------------
The browser had an old ar_g_api_url value. The frontend used that value to
send API calls to api.55ak.xyz and draw calls to draw.55ak.xyz. Those requests
failed, while the same-domain WinGo endpoint on maanwin.club9.eu.cc returned valid
live history JSON.

V5 FIX
------
- API requests are forced to https://maanwin.club9.eu.cc/api/... at runtime by
  using the current page origin.
- Draw/history requests are forced to https://maanwin.club9.eu.cc/WinGo/... (and
  the equivalent current-domain paths for K3, 5D, MotoRace and TrxWinGo).
- The stale ar_g_api_url browser value is removed on the first V5 load.
- Old ar-pwa caches/root service workers are reset once.
- The single-runtime V4 screen-load fix remains included; no duplicate Vue
  or router runtime is loaded.
- The service-worker cache revision is bumped to maanwin-runtime-v5.

INSTALL
-------
1. Upload this ZIP inside maanwin.club9.eu.cc public_html.
2. Extract it directly in public_html and allow overwrite.
3. Open the website normally. Manual browser-cache clearing is not required.

FILES IN THIS PATCH
-------------------
- index.html
- ar-sw.js
- js/index-B9u3BH9U.js
- js/maan-win-bootstrap-v5.mjs
- MAAN_WIN_SAME_DOMAIN_API_V5_README.txt
