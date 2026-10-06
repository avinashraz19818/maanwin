(function(){
  "use strict";
  function qsa(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
  function limitGameHistory(){
    var path=location.pathname.toLowerCase();
    if(!/wingo|k3|d5|moto|trx/.test(path)) return;
    var tables=qsa('table, .record, .history, [class*=record], [class*=history]');
    tables.forEach(function(box){
      var rows=qsa.call?[]:[];
      rows=Array.prototype.slice.call(box.querySelectorAll('tr, li, .item, [class*=row]')).filter(function(el){
        var t=(el.textContent||'').trim(); return /20\d{10,}/.test(t) || /\b(Big|Small)\b/i.test(t);
      });
      if(rows.length>10){ rows.forEach(function(r,i){ if(i>=10) r.style.display='none'; }); }
    });
  }
  function removeBadWheelImages(){
    if(location.pathname.toLowerCase().indexOf('rechargeturntable')<0) return;
    qsa('img').forEach(function(img){
      var src=img.getAttribute('src')||'';
      if(src.indexOf('/assets/darkRed/rechargeWheel/')>=0){ img.removeAttribute('src'); img.style.visibility='hidden'; }
    });
  }
  function featureOverlay(){
    fetch('/api/Site/GetSettings',{cache:'no-store'}).then(function(r){return r.json()}).then(function(j){
      var d=j.data||{}; if(d.maintenanceEnabled && !/login|register|license/i.test(location.pathname)){
        var old=document.getElementById('v25-maint'); if(old) old.remove();
        var div=document.createElement('div'); div.id='v25-maint'; div.innerHTML='<div><b>Site Maintenance</b><p>'+((d.maintenanceText||'Site is under maintenance. Please try again later.').replace(/[<>]/g,''))+'</p></div>';
        div.style.cssText='position:fixed;inset:0;z-index:2147483647;background:rgba(2,6,23,.96);display:grid;place-items:center;color:#fff;font-family:Arial';
        div.firstChild.style.cssText='max-width:360px;background:#111827;border:1px solid #334155;border-radius:22px;padding:24px;text-align:center;box-shadow:0 25px 80px #000'; document.body.appendChild(div);
      }
    }).catch(function(){});
  }
  setInterval(limitGameHistory,900); setInterval(removeBadWheelImages,900); setInterval(featureOverlay,15000);
  document.addEventListener('DOMContentLoaded',function(){limitGameHistory();removeBadWheelImages();featureOverlay();});
})();