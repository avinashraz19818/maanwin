(function(){
  'use strict';
  function showMaintenance(msg){
    if(document.getElementById('v24-maintenance-lock')) return;
    var d=document.createElement('div');
    d.id='v24-maintenance-lock';
    d.innerHTML='<div class="v24-lock-card"><div class="v24-logo"><b>Dhani Win</b> Maintenance</div><div class="v24-lock-title">System upgrade is running</div><p>'+String(msg||'Site is under maintenance. Please try again later.').replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c]})+'</p><button onclick="location.reload()">Refresh</button></div>';
    var st=document.createElement('style');
    st.textContent='#v24-maintenance-lock{position:fixed;z-index:2147483000;inset:0;background:radial-gradient(circle at 20% 10%,#fb3b2f33,transparent 30%),#060b16;display:flex;align-items:center;justify-content:center;color:#fff;font-family:Inter,Arial}.v24-lock-card{width:min(420px,92vw);background:linear-gradient(180deg,#121b2e,#080f1d);border:1px solid #263653;border-radius:26px;padding:28px;box-shadow:0 35px 120px #000}.v24-logo{font-size:22px;font-weight:900}.v24-logo b{color:#fb3b2f}.v24-lock-title{font-size:25px;font-weight:900;margin-top:18px}.v24-lock-card p{color:#b6c5d8;line-height:1.55}.v24-lock-card button{width:100%;border:0;border-radius:14px;background:linear-gradient(135deg,#fb3b2f,#ff7a18);color:#fff;padding:14px;font-weight:900}';
    document.head.appendChild(st); document.body.appendChild(d);
  }
  function check(){
    fetch('/api/Site/GetSettings?ts='+Date.now(),{credentials:'include'}).then(function(r){return r.json()}).then(function(j){
      var data=j && j.data || {};
      if(data.maintenanceEnabled) showMaintenance(data.maintenanceText);
    }).catch(function(){});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',check); else check();
  setInterval(check,60000);
})();
