const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/lottie_light-BvGKLhpb.js","js/index-B9u3BH9U.js","css/index-DXylt7AE.css"])))=>i.map(i=>d[i]);
import{aw as N,u as S,aJ as v,ak as o,aE as e,aT as $,aM as n,aC as y,D,aO as M,az as B,cJ as J,aj as T,aB as V,bM as x,aF as b,c as W,aI as E,al as P,dT as K,cF as O,cL as R,dB as H,bm as j,r as h,K as Q,aK as q,bG as G,bn as I,bA as U,bQ as X,dN as Y,an as Z}from"./index-B9u3BH9U.js";import{G as ee,w as ae,l as ne,L as se,W as te}from"./tips-DO6ThyEj.js";import{a as oe,u as le}from"./WingoSkeleton.vue_vue_type_style_index_0_scoped_cd4f34e3_lang-BNyaY0lL.js";/* empty css                                                             */import{a as ie}from"./BetRule-DnzMp4C6.js";const ce={class:"Wallet__C"},re={class:"Wallet__C-balance"},ue={class:"Wallet__C-balance-l1"},de={class:"Wallet__C-balance-l2"},me={class:"Wallet__C-balance-l3"},ve=N({__name:"Wallet",setup(w){const{balance:g,updateBalance:_}=oe(),t=S(),m=l=>{t.push({name:l})};return(l,s)=>{const i=M;return o(),v("div",ce,[e("div",re,[e("div",ue,[e("span",null,n(y(D)(y(g))),1),$(i,{onClick:y(_),name:"icon_refresh",iconClass:"refresh"},null,8,["onClick"])]),e("div",de,[$(i,{name:"icon_nva_wallet"}),e("div",null,n(l.$t("common.walletBalance")),1)]),e("div",me,[e("div",{onClick:s[0]||(s[0]=r=>m("withdraw"))},n(l.$t("common.withdraw")),1),e("div",{onClick:s[1]||(s[1]=r=>m("recharge"))},n(l.$t("common.recharge")),1)])])])}}}),_e=B(ve,[["__scopeId","data-v-38b9874f"]]),pe={class:"lottery-info"},fe={class:"more"},he=N({__name:"main",props:{wallte:{type:Boolean,default:!0},soundEffects:{type:Boolean,default:!0},navigation:{type:String,default:null}},emits:["switchSound"],setup(w,{emit:g}){const _=w,t=g,{lotteryInlineNavigation:m}=J(),{currentTheme:l}=O(),s=W(()=>K(l.value)),i=S(),r=W(()=>{switch(_.navigation){case"GameHeader":return ee;default:return null}}),u=W(()=>m.value?R("HeadNav"):_.navigation?r.value:null),C=()=>{i.go(-1)},c=()=>{t("switchSound")};return(d,p)=>{const f=M;return o(),v("div",pe,[e("div",{class:b(["bg",`bg--${s.value}`])},null,2),(o(),T(P(u.value),{fixed:!0,leftArrow:!0,headLogo:!0,onClickS:C},{end:E(()=>[e("div",fe,[$(f,{name:"icon_service"}),$(f,{name:w.soundEffects?"icon_voice":"icon_voice_disable",onClick:c},null,8,["name"])])]),_:1},32)),w.wallte?(o(),T(_e,{key:0})):V("",!0),x(d.$slots,"default",{},void 0,!0)])}}}),Ve=B(he,[["__scopeId","data-v-e57df526"]]),we={class:"winning"},ge={class:"winning-main"},Ce={class:"winning-wrap"},ye={key:1,class:"winning-wrap-l1"},be={key:2,class:"winning-wrap-l2"},$e={class:"winning-wrap-l3"},ke={key:0,class:"isLose"},We={class:"head"},Te={class:"bonus"},Ne={class:"gameDetail"},Be={class:"winning-wrap-l4"},Le=N({__name:"Winning",setup(w,{expose:g}){const{currentGame:_}=le(),{soundEffects:t}=ie(),m=h(),l=h(),s=h(!1),i=new H.Howl({src:[ae],loop:!1,preload:!1}),r=new H.Howl({src:[ne],loop:!1,preload:!1}),u=h(!1),C=h(null),c=Q({issueNumber:"",amount:0,result:null}),d=h(!1);let p=null,f=null;const F=Y(async()=>Z(()=>import("./lottie_light-BvGKLhpb.js").then(a=>a.l),__vite__mapDeps([0,1,2]))),L=()=>{u.value=!u.value,u.value?(clearTimeout(C.value),C.value=setTimeout(()=>{u.value=!1,s.value=!1,p.stop(),f.stop()},3e3)):clearTimeout(C.value)},z=async()=>{if(p)return p;i.load(),r.load();const a=await F();try{p=a.loadAnimation({container:m.value,renderer:"svg",loop:!1,autoplay:!1,path:se}),f=a.loadAnimation({container:l.value,renderer:"svg",loop:!0,autoplay:!1,path:te})}catch{}};return g({open:async a=>{u.value=!1,s.value=!0,d.value=a.isWin,c.issueNumber=a.issueNumber,c.amount=a.amount,c.result=a.result,await z(),a.isWin?(p.play(),f.play(),t!=null&&t.value&&(i==null||i.play())):t!=null&&t.value&&(r==null||r.play()),L()}}),(a,k)=>(o(),T(X,{name:"van-fade"},{default:E(()=>{var A;return[j(e("div",we,[e("div",{class:"winning-animation",ref_key:"animation",ref:m},null,512),e("div",{class:b(["winning-body",{isWin:d.value,noWin:!d.value}])},[e("div",ge,[e("div",Ce,[d.value?(o(),v("div",{key:0,class:b(["winning-wrap-l1",{isWin:d.value}])},n(a.$t("common.winTips")),3)):(o(),v("div",ye,n(a.$t("common.loseTips")),1)),c.result?(o(),v("div",be,[x(a.$slots,"default",{data:c.result},void 0,!0)])):V("",!0),e("div",$e,[d.value?(o(),v(q,{key:1},[e("div",We,n(a.$t("common.bonus")),1),e("div",Te,n(y(D)(c.amount)),1)],64)):(o(),v("div",ke,n(a.$t("common.fail")),1)),e("div",Ne,[G(n(a.$t("common.issue"))+" "+n((A=y(_))==null?void 0:A.gameName)+" ",1),e("p",null,n(c.issueNumber),1)])])])]),e("div",Be,[e("div",{class:b(["acitveBtn",{active:u.value}]),onClick:I(L,["stop"])},null,2),G(" "+n(a.$t("common.autoClose")),1)]),e("div",{class:"closeBtn",onClick:k[0]||(k[0]=I(He=>s.value=!1,["stop"]))})],2)],512),[[U,s.value]])]}),_:3}))}}),xe=B(Le,[["__scopeId","data-v-04cd2b9c"]]);export{Ve as L,xe as W};
/* MAANWIN win-popup particles (DhaniWin parity) — self contained, no deps.
   Sirf tab chalta hai jab winning popup actually VISIBLE ho (v-show), aur poora
   effect app container (#app) ke andar rehta hai. */
(function () {
  var W = window;
  if (W.__mnwWinFx) return;
  W.__mnwWinFx = 1;
  var COLORS = ["#FF7A2F", "#FFC93C", "#FF2D6F", "#FFF3D0", "#FFFFFF", "#FF9F1C", "#FF4D6D", "#B84DFF"];
  var cv = null, ctx = null, pts = [], raf = 0, pending = 0, seen = null;
  var host = { left: 0, top: 0, width: 0, height: 0 };

  function ensureStyle() {
    if (document.getElementById("mnw-win-fx-style")) return;
    var s = document.createElement("style");
    s.id = "mnw-win-fx-style";
    s.textContent =
      "#mnw-win-fx{position:fixed;pointer-events:none;z-index:2147483000}";
    (document.head || document.documentElement).appendChild(s);
  }

  function hostRect() {
    var app = document.getElementById("app");
    var r = app && app.getBoundingClientRect ? app.getBoundingClientRect() : null;
    if (r && r.width > 120 && (r.width < W.innerWidth - 24 || r.height < W.innerHeight - 24)) {
      var left = Math.max(0, r.left), top = Math.max(0, r.top);
      return {
        left: left,
        top: top,
        width: Math.max(1, Math.min(r.width, W.innerWidth - left)),
        height: Math.max(1, Math.min(r.height || W.innerHeight, W.innerHeight - top))
      };
    }
    return { left: 0, top: 0, width: W.innerWidth, height: W.innerHeight };
  }

  function ensureCanvas() {
    if (!cv || !cv.isConnected) {
      ensureStyle();
      cv = document.createElement("canvas");
      cv.id = "mnw-win-fx";
      (document.body || document.documentElement).appendChild(cv);
      ctx = cv.getContext("2d");
    }
    resize();
    return cv;
  }

  function resize() {
    if (!cv || !ctx) return;
    host = hostRect();
    var dpr = Math.min(2, W.devicePixelRatio || 1);
    cv.style.left = host.left + "px";
    cv.style.top = host.top + "px";
    cv.style.width = host.width + "px";
    cv.style.height = host.height + "px";
    cv.width = Math.round(host.width * dpr);
    cv.height = Math.round(host.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(x, y, n, spread) {
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + (Math.random() - 0.5) * (spread || 2.4);
      var sp = 2.5 + Math.random() * 8.5;
      pts.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 24,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1.6,
        g: 0.11 + Math.random() * 0.1,
        s: 2.5 + Math.random() * 5.5,
        r: Math.random() * 6.283,
        vr: (Math.random() - 0.5) * 0.34,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        life: 80 + Math.random() * 90,
        age: 0,
        star: Math.random() < 0.3
      });
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function star(g, s) {
    g.beginPath();
    for (var i = 0; i < 8; i++) {
      var rr = i % 2 ? s * 0.36 : s;
      var a = (i / 8) * 6.283;
      g[i ? "lineTo" : "moveTo"](Math.cos(a) * rr, Math.sin(a) * rr);
    }
    g.closePath();
    g.fill();
  }

  function frame() {
    raf = 0;
    if (!ctx) return;
    ctx.clearRect(0, 0, host.width, host.height);
    for (var i = pts.length - 1; i >= 0; i--) {
      var p = pts[i];
      p.age++;
      if (p.age > p.life) { pts.splice(i, 1); continue; }
      p.vy += p.g;
      p.vx *= 0.992;
      p.vy *= 0.995;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      var k = 1 - p.age / p.life;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, k * 1.6));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      if (p.star) star(ctx, p.s * 1.7);
      else if (p.age % 3 === 0 && p.s > 5) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      else { ctx.beginPath(); ctx.arc(0, 0, p.s * 0.55, 0, 6.283); ctx.fill(); }
      ctx.restore();
    }
    if (pts.length) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, host.width, host.height);
  }

  /* popup actually dikh raha hai? v-show sirf display:none lagata hai */
  function popupVisible(el) {
    if (!el || !el.isConnected) return false;
    var cs = null;
    try { cs = W.getComputedStyle(el); } catch (e) { cs = null; }
    if (cs) {
      if (cs.display === "none" || cs.visibility === "hidden" || cs.visibility === "collapse") return false;
      if (cs.opacity !== "" && parseFloat(cs.opacity) < 0.05) return false;
    }
    var r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2;
  }

  function popupEl() { return document.querySelector(".winning"); }

  function bodyRect() {
    var el = document.querySelector(".winning-body") || document.querySelector(".winning-main") || popupEl();
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) {
      el = popupEl();
      if (!el) return null;
      r = el.getBoundingClientRect();
    }
    return r;
  }

  function placeHead() {
    var head = document.querySelector(".winning-head");
    if (!head) return null;
    var r = bodyRect();
    if (r) {
      head.style.top = Math.round(Math.max(46, r.top + r.height * 0.24)) + "px";
      head.style.width = Math.round(Math.max(220, Math.min(r.width || 340, W.innerWidth))) + "px";
    }
    return head;
  }

  /* dhaniwin jaisa win burst — sirf popup khulne par */
  function burst() {
    var r = bodyRect();
    ensureCanvas();
    var gx = r ? r.left + r.width / 2 : host.left + host.width / 2;
    var gy = r ? Math.max(host.top + 60, r.top + r.height * 0.2) : host.top + host.height * 0.28;
    spawn(gx - host.left, gy - host.top, 95, 2.6);
    setTimeout(function () {
      var r2 = bodyRect(), h = hostRect();
      host = h;
      if (r2) spawn(r2.left + r2.width / 2 - h.left, r2.top + r2.height * 0.45 - h.top, 55, 3.4);
      else spawn(h.width / 2, h.height * 0.5, 55, 3.4);
    }, 240);
    setTimeout(function () {
      var r3 = bodyRect(), h = hostRect();
      host = h;
      if (r3) spawn(r3.left + r3.width * 0.5 - h.left, r3.top + r3.height * 0.12 - h.top, 45, 3.0);
      else spawn(h.width / 2, h.height * 0.22, 45, 3.0);
    }, 620);
  }

  function scan() {
    var w = popupEl();
    if (!w || !popupVisible(w)) { seen = null; return; } /* chhupa hua popup = kuch nahi */
    placeHead();
    if (seen === w) return;
    seen = w;
    pts.length = 0;
    pending = Date.now() + 300;
  }

  function check() {
    if (!pending || Date.now() < pending) return;
    pending = 0;
    var w = popupEl();
    if (!w || !popupVisible(w)) return;
    placeHead();
    burst();
  }

  ensureStyle();
  setInterval(function () { scan(); check(); }, 200);
  W.addEventListener("resize", resize);
  W.addEventListener("orientationchange", function () { setTimeout(resize, 200); });
  if (document.readyState !== "loading") scan();
  else document.addEventListener("DOMContentLoaded", scan);
})();
