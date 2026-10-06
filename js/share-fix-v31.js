(function(){
  var FALLBACK_CODE = '37L3UFN';
  var FALLBACK_BANNER = '/img/6007/other/115317224-36312-file_20260415115317224.webp';
  function getCode(){
    try{
      var body = document.body && document.body.innerText || '';
      var m = body.match(/Invite\s*code\s*[:：]?\s*([A-Z0-9]{5,12})/i) || body.match(/Invitation\s*code\s*[:：]?\s*([A-Z0-9]{5,12})/i);
      if(m && m[1]) return m[1].toUpperCase();
      var ls = localStorage.getItem('userInfo') || localStorage.getItem('USER') || localStorage.getItem('user') || '';
      var j = ls && JSON.parse(ls);
      return (j.inviteCode || (j.data && j.data.inviteCode) || FALLBACK_CODE).toString().toUpperCase();
    }catch(e){return FALLBACK_CODE;}
  }
  function inviteLink(){ return location.origin + '/register?inviteCode=' + encodeURIComponent(getCode()) + '&from=web'; }
  function toast(msg){
    var el=document.createElement('div'); el.textContent=msg; el.style.cssText='position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:2147483647;background:rgba(0,0,0,.82);color:#fff;padding:10px 16px;border-radius:999px;font:600 13px Arial;box-shadow:0 8px 30px rgba(0,0,0,.35)';
    document.body.appendChild(el); setTimeout(function(){el.remove();},1600);
  }
  function copyText(t){
    t=String(t||'');
    if(navigator.clipboard && window.isSecureContext){ return navigator.clipboard.writeText(t).then(function(){toast('Copy successful');return true;}).catch(function(){return legacy(t);}); }
    return legacy(t);
  }
  function legacy(t){ try{ var ta=document.createElement('textarea'); ta.value=t; ta.readOnly=true; ta.style.cssText='position:fixed;left:-9999px;top:0;opacity:0'; document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0,t.length); var ok=document.execCommand('copy'); ta.remove(); toast(ok?'Copy successful':'Copy failed'); return ok; }catch(e){toast('Copy failed'); return false;} }
  document.addEventListener('click',function(e){
    var node=e.target && e.target.closest && e.target.closest('button,div,p,span,a,i');
    if(!node) return;
    var txt=(node.innerText||node.textContent||'').trim();
    var aria=(node.getAttribute('aria-label')||'').trim();
    if(/copy\s*link/i.test(txt+' '+aria)){
      e.preventDefault(); e.stopImmediatePropagation(); copyText(inviteLink());
    }
  },true);
  function isBadSrc(src){return !src || /1-Bpx|head|ear|icon_|default|avatar|undefined|null|blank/i.test(src);}
  function fixDom(){
    if(!/\/share(?:$|[?#])/.test(location.pathname) && !/share/i.test(location.hash)) return;
    var imgs=document.querySelectorAll('.bgPreview .preview-bg img, .preview-bg img');
    imgs.forEach(function(img,idx){ if(idx===0 && isBadSrc(img.getAttribute('src')||img.src)){ img.src=FALLBACK_BANNER; } });
    document.querySelectorAll('.bgPreview .invite span, .invite span').forEach(function(sp){ if(!sp.textContent.trim()) sp.textContent=getCode(); });
  }
  new MutationObserver(fixDom).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
  setInterval(fixDom,1500); if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fixDom); else fixDom();
})();
