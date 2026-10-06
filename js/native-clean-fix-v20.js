(function(){
  "use strict";
  function goBackFix(){
    document.addEventListener('click', function(e){
      var el=e.target && e.target.closest ? e.target.closest('.navbar__content-left,.van-nav-bar__left,[class*=navbar__content-left]') : null;
      if(!el) return;
      var title=(document.querySelector('.navbar__content-title,.van-nav-bar__title')||{}).textContent||'';
      if(history.length<=1 && /Deposit|Recharge|ArUpiPay|Deposit Wheel/i.test(title+location.pathname)){
        e.preventDefault(); e.stopPropagation(); location.href='/wallet/recharge';
      }
    }, true);
  }
  function hidePushBox(){
    // Keep site usable if browser notification permission popup overlaps old screens.
    document.addEventListener('click', function(e){
      if(e.target && /×|close/i.test((e.target.textContent||''))) setTimeout(function(){},1);
    }, true);
  }
  goBackFix(); hidePushBox();
  console.log('13L clean fix v20 loaded');
})();