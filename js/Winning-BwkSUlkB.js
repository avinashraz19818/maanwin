const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/lottie_light-BvGKLhpb.js","js/index-B9u3BH9U.js","css/index-DXylt7AE.css"])))=>i.map(i=>d[i]);
import{aw as N,u as S,aJ as v,ak as o,aE as e,aT as $,aM as n,aC as y,D,aO as M,az as B,cJ as J,aj as T,aB as V,bM as x,aF as b,c as W,aI as E,al as P,dT as K,cF as O,cL as R,dB as H,bm as j,r as h,K as Q,aK as q,bG as G,bn as I,bA as U,bQ as X,dN as Y,an as Z}from"./index-B9u3BH9U.js";import{G as ee,w as ae,l as ne,L as se,W as te}from"./tips-DO6ThyEj.js";import{a as oe,u as le}from"./WingoSkeleton.vue_vue_type_style_index_0_scoped_cd4f34e3_lang-BNyaY0lL.js";/* empty css                                                             */import{a as ie}from"./BetRule-DnzMp4C6.js";const ce={class:"Wallet__C"},re={class:"Wallet__C-balance"},ue={class:"Wallet__C-balance-l1"},de={class:"Wallet__C-balance-l2"},me={class:"Wallet__C-balance-l3"},ve=N({__name:"Wallet",setup(w){const{balance:g,updateBalance:_}=oe(),t=S(),m=l=>{t.push({name:l})};return(l,s)=>{const i=M;return o(),v("div",ce,[e("div",re,[e("div",ue,[e("span",null,n(y(D)(y(g))),1),$(i,{onClick:y(_),name:"icon_refresh",iconClass:"refresh"},null,8,["onClick"])]),e("div",de,[$(i,{name:"icon_nva_wallet"}),e("div",null,n(l.$t("common.walletBalance")),1)]),e("div",me,[e("div",{onClick:s[0]||(s[0]=r=>m("withdraw"))},n(l.$t("common.withdraw")),1),e("div",{onClick:s[1]||(s[1]=r=>m("recharge"))},n(l.$t("common.recharge")),1)])])])}}}),_e=B(ve,[["__scopeId","data-v-38b9874f"]]),pe={class:"lottery-info"},fe={class:"more"},he=N({__name:"main",props:{wallte:{type:Boolean,default:!0},soundEffects:{type:Boolean,default:!0},navigation:{type:String,default:null}},emits:["switchSound"],setup(w,{emit:g}){const _=w,t=g,{lotteryInlineNavigation:m}=J(),{currentTheme:l}=O(),s=W(()=>K(l.value)),i=S(),r=W(()=>{switch(_.navigation){case"GameHeader":return ee;default:return null}}),u=W(()=>m.value?R("HeadNav"):_.navigation?r.value:null),C=()=>{i.go(-1)},c=()=>{t("switchSound")};return(d,p)=>{const f=M;return o(),v("div",pe,[e("div",{class:b(["bg",`bg--${s.value}`])},null,2),(o(),T(P(u.value),{fixed:!0,leftArrow:!0,headLogo:!0,onClickS:C},{end:E(()=>[e("div",fe,[$(f,{name:"icon_service"}),$(f,{name:w.soundEffects?"icon_voice":"icon_voice_disable",onClick:c},null,8,["name"])])]),_:1},32)),w.wallte?(o(),T(_e,{key:0})):V("",!0),x(d.$slots,"default",{},void 0,!0)])}}}),Ve=B(he,[["__scopeId","data-v-e57df526"]]),we={class:"winning"},ge={class:"winning-main"},Ce={class:"winning-wrap"},ye={key:1,class:"winning-wrap-l1"},be={key:2,class:"winning-wrap-l2"},$e={class:"winning-wrap-l3"},ke={key:0,class:"isLose"},We={class:"head"},Te={class:"bonus"},Ne={class:"gameDetail"},Be={class:"winning-wrap-l4"},Le=N({__name:"Winning",setup(w,{expose:g}){const{currentGame:_}=le(),{soundEffects:t}=ie(),m=h(),l=h(),s=h(!1),i=new H.Howl({src:[ae],loop:!1,preload:!1}),r=new H.Howl({src:[ne],loop:!1,preload:!1}),u=h(!1),C=h(null),c=Q({issueNumber:"",amount:0,result:null}),d=h(!1);let p=null,f=null;const F=Y(async()=>Z(()=>import("./lottie_light-BvGKLhpb.js").then(a=>a.l),__vite__mapDeps([0,1,2]))),L=()=>{u.value=!u.value,u.value?(clearTimeout(C.value),C.value=setTimeout(()=>{u.value=!1,s.value=!1,p&&p.stop&&p.stop(),f&&f.stop&&f.stop()},3e3)):clearTimeout(C.value)},z=async()=>{i.load(),r.load()};return g({open:async a=>{u.value=!1,s.value=!0,d.value=a.isWin,c.issueNumber=a.issueNumber,c.amount=a.amount,c.result=a.result,await z(),a.isWin?(t!=null&&t.value&&(i==null||i.play())):t!=null&&t.value&&(r==null||r.play()),L()}}),(a,k)=>(o(),T(X,{name:"van-fade"},{default:E(()=>{var A;return[j(e("div",we,[e("div",{class:b(["winning-body",{isWin:d.value,noWin:!d.value}])},[e("div",ge,[e("div",Ce,[d.value?(o(),v("div",{key:0,class:b(["winning-wrap-l1",{isWin:d.value}])},n(a.$t("common.winTips")),3)):(o(),v("div",ye,n(a.$t("common.loseTips")),1)),c.result?(o(),v("div",be,[x(a.$slots,"default",{data:c.result},void 0,!0)])):V("",!0),e("div",$e,[d.value?(o(),v(q,{key:1},[e("div",We,n(a.$t("common.bonus")),1),e("div",Te,n(y(D)(c.amount)),1)],64)):(o(),v("div",ke,n(a.$t("common.fail")),1)),e("div",Ne,[G(n(a.$t("common.issue"))+" "+n((A=y(_))==null?void 0:A.gameName)+" ",1),e("p",null,n(c.issueNumber),1)])])])]),e("div",Be,[e("div",{class:b(["acitveBtn",{active:u.value}]),onClick:I(L,["stop"])},null,2),G(" "+n(a.$t("common.autoClose")),1)]),e("div",{class:"closeBtn",onClick:k[0]||(k[0]=I(He=>s.value=!1,["stop"]))})],2)],512),[[U,s.value]])]}),_:3}))}}),xe=B(Le,[["__scopeId","data-v-04cd2b9c"]]);export{Ve as L,xe as W};
/* MAANWIN win-popup particles (DhaniWin parity) — self contained, no deps.
   Sirf winning popup khulne par chalta hai, aur particles SIRF popup ke apne
   area me rehte hain (dhaniwin jaisa) — poore game page par nahi. */
(function () {
  var W = window;
  if (W.__mnwWinFx) return;
  W.__mnwWinFx = 1;
  var COLORS = ["#FF7A2F", "#FFC93C", "#FF2D6F", "#FFF3D0", "#FFFFFF", "#FF9F1C", "#FF4D6D", "#B84DFF"];
  var cv = null, ctx = null, pts = [], raf = 0, pending = 0, seen = null;
  var box = { left: 0, top: 0, width: 0, height: 0 };

  function popupEl() { return document.querySelector(".winning"); }

  function ensureStyle() {
    if (document.getElementById("mnw-win-fx-style")) return;
    var s = document.createElement("style");
    s.id = "mnw-win-fx-style";
    s.textContent = "#mnw-win-fx{position:fixed;pointer-events:none;z-index:2147483000;left:0;top:0}";
    (document.head || document.documentElement).appendChild(s);
  }

  /* v-show popup ko display:none karta hai — sirf dikhte waqt chalo */
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

  function bodyRect() {
    var el = document.querySelector(".winning-body") || document.querySelector(".winning-main") || popupEl();
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) {
      el = popupEl();
      if (!el) return null;
      r = el.getBoundingClientRect();
    }
    return r.width > 2 ? r : null;
  }

  function ensureCanvas(rect) {
    if (!cv || !cv.isConnected) {
      ensureStyle();
      cv = document.createElement("canvas");
      cv.id = "mnw-win-fx";
      (document.body || document.documentElement).appendChild(cv);
      ctx = cv.getContext("2d");
    }
    var dpr = Math.min(2, W.devicePixelRatio || 1);
    box = rect;
    cv.style.left = rect.left + "px";
    cv.style.top = rect.top + "px";
    cv.style.width = rect.width + "px";
    cv.style.height = rect.height + "px";
    cv.width = Math.round(rect.width * dpr);
    cv.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(x, y, n, spread) {
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + (Math.random() - 0.5) * (spread || 2.2);
      var sp = 1.8 + Math.random() * 4.4;
      pts.push({
        x: x + (Math.random() - 0.5) * 34,
        y: y + (Math.random() - 0.5) * 18,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 1.2,
        g: 0.11 + Math.random() * 0.06,
        s: 2.4 + Math.random() * 4.6,
        r: Math.random() * 6.283,
        vr: (Math.random() - 0.5) * 0.3,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        life: 65 + Math.random() * 55,
        age: 0
      });
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function frame() {
    raf = 0;
    if (!ctx) return;
    ctx.clearRect(0, 0, box.width, box.height);
    for (var i = pts.length - 1; i >= 0; i--) {
      var p = pts[i];
      p.age++;
      if (p.age > p.life) { pts.splice(i, 1); continue; }
      p.vy += p.g;
      p.vx *= 0.99;
      p.vy *= 0.994;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      var k = 1 - p.age / p.life;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, k * 1.6));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      if (p.age % 3 === 0 || p.s > 5) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      else { ctx.beginPath(); ctx.arc(0, 0, p.s * 0.55, 0, 6.283); ctx.fill(); }
      ctx.restore();
    }
    if (pts.length) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, box.width, box.height);
  }

  /* popup ke apne area (thoda margin) me hi particles — poore page par nahi */
  function burst() {
    var r = bodyRect() || (popupEl() ? popupEl().getBoundingClientRect() : null);
    if (!r) return;
    var m = 26;
    var rect = {
      left: Math.max(0, r.left - m),
      top: Math.max(0, r.top - m),
      width: Math.min(W.innerWidth, r.width + 2 * m),
      height: Math.min(W.innerHeight - Math.max(0, r.top - m), r.height + 2 * m)
    };
    ensureCanvas(rect);
    pts.length = 0;
    var cx = rect.width / 2;
    spawn(cx, Math.max(40, rect.height * 0.24), 80, 2.2);
    setTimeout(function () {
      if (!ctx) return;
      spawn(cx, rect.height * 0.5, 42, 3.0);
    }, 220);
  }

  function scan() {
    var w = popupEl();
    if (!w || !popupVisible(w)) { seen = null; return; }
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
    burst();
  }

  function hide() { if (cv) { pts.length = 0; cv.style.display = "none"; } }
  function show() { if (cv) cv.style.display = "block"; }

  ensureStyle();
  setInterval(function () { scan(); check(); }, 200);
  W.addEventListener("resize", hide);
  W.addEventListener("orientationchange", function () { setTimeout(hide, 150); });
  if (document.readyState !== "loading") scan();
  else document.addEventListener("DOMContentLoaded", scan);
  show();
})();

/* ------------------------------------------------------------------
   register / login page ka background (dhaniwin/maanwin jaisa casino room).
   Agar theme ya CSS ki wajah se background na lage to ye khud laga deta hai.
   ------------------------------------------------------------------ */
(function () {
  var W = window;
  if (W.__mnwAuthBg) return;
  W.__mnwAuthBg = 1;
  var FILE = "assets/ar_saas11/img_loginBG-c742cc33.webp";
  function url() {
    var b = (document.baseURI || W.location.href).split("?")[0].split("#")[0];
    return b.replace(/[^/]*$/, "") + FILE;
  }
  function apply() {
    if (!/^\/(login|register)/i.test(W.location.pathname)) return;
    var el = document.querySelector(".login-wrapper") || document.querySelector(".login-section");
    if (!el) return;
    var cs = null;
    try { cs = W.getComputedStyle(el); } catch (e) {}
    var bg = cs ? cs.backgroundImage : "";
    if (bg && bg !== "none" && bg.indexOf("url(") === 0 && bg.indexOf(FILE) !== -1) return;
    if (bg && bg !== "none" && bg.indexOf("url(") === 0 && bg.indexOf(FILE) === -1) return; /* koi aur bg set hai */
    var u = url();
    el.style.setProperty("--login-bg", "url('" + u + "')");
    if (!bg || bg === "none") {
      el.style.backgroundImage = "url('" + u + "')";
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      el.style.backgroundRepeat = "no-repeat";
    }
  }
  setInterval(apply, 400);
  document.addEventListener("DOMContentLoaded", apply);
  W.addEventListener("load", apply);
})();
