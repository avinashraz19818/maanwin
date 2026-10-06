/* maanwin-win-particles: winning popup par dhaniwin jaise particles (confetti).
   index.php ise har page me load karta hai (defer). Self-contained, koi dependency nahi.
   Sirf tab chalta hai jab popup actually khula ho (v-show display:none se chhupata hai). */
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
        age: 0
      });
    }
    if (!raf) raf = requestAnimationFrame(frame);
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
      if (p.age % 3 === 0 || p.s > 5.2) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
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
