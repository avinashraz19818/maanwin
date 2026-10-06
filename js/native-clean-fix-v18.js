(function () {
  "use strict";

  var VERSION = "18.0-clean";

  function text(el) {
    return (el && el.innerText ? el.innerText : "").replace(/\s+/g, " ").trim();
  }

  function goFallback(fromPath) {
    var p = (fromPath || location.pathname || "").toLowerCase();
    if (p.indexOf("/arupiv2") === 0) return "/wallet/recharge";
    if (p.indexOf("/wallet/rechargehistory") === 0) return "/wallet/recharge";
    if (p.indexOf("/wallet/rechargedetail") === 0) return "/wallet/recharge";
    if (p.indexOf("/wallet/recharge") === 0) return "/";
    if (p.indexOf("/wallet/withdraw") === 0) return "/";
    if (p.indexOf("/earn/") === 0) return "/earn";
    if (p.indexOf("/activity/") === 0) return "/activity";
    if (p.indexOf("/wingo/") === 0) return "/";
    return "/";
  }

  function patchBackButton() {
    document.addEventListener("click", function (ev) {
      var target = ev.target;
      if (!target || !target.closest) return;
      var btn = target.closest(".navbar__content-left, .van-nav-bar__left, [class*='navbar__content-left']");
      if (!btn) return;

      var before = location.pathname + location.search + location.hash;
      setTimeout(function () {
        var after = location.pathname + location.search + location.hash;
        if (before !== after) return;
        var fallback = goFallback(location.pathname);
        if (fallback && fallback !== location.pathname) {
          location.href = fallback;
        } else if (history.length > 1) {
          history.back();
        } else {
          location.href = "/";
        }
      }, 120);
    }, true);
  }

  function patchRechargeHistoryLayout() {
    if (!/\/wallet\/rechargeHistory/i.test(location.pathname)) return;
    document.querySelectorAll(".history-item").forEach(function (item) {
      var t = text(item).toLowerCase();
      var btn = Array.prototype.find.call(item.querySelectorAll(".remark-btn"), function (b) {
        return /submit\s*utr/i.test(text(b));
      });
      if (btn) {
        btn.style.marginLeft = "auto";
        btn.style.marginRight = "auto";
        btn.style.display = "block";
        btn.style.clear = "both";
      }
      // Native UI should not show submit UTR after fulfilled/payed orders.
      if (btn && (t.indexOf("fulfilled") !== -1 || t.indexOf("payed") !== -1 || t.indexOf("success") !== -1)) {
        btn.style.display = "none";
      }
    });
  }

  function start() {
    patchBackButton();
    patchRechargeHistoryLayout();
    var timer = null;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(patchRechargeHistoryLayout, 200);
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
    console.log("native clean fix loaded", VERSION);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
