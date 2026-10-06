/* maanwin-win-particles: winning popup par dhaniwin jaise particles.
   index.php ise har page me load karta hai (defer). Self-contained, koi dependency nahi.
   Sirf tab chalta hai jab popup actually khula ho, aur sirf popup ke area me.
   Sath me login/register background ka fallback bhi hai. */
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
