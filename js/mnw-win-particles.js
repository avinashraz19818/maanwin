/* maanwin-win-particles: winning popup par dhaniwin jaise particles.
   index.php ise har page me load karta hai (defer). Self-contained, koi dependency nahi. */
/* MAANWIN win-popup particles (DhaniWin parity) — self contained, no deps */
(function () {
  var W = window;
  if (W.__mnwWinFx) return;
  W.__mnwWinFx = 1;
  var COLORS = ["#FF7A2F", "#FFC93C", "#FF2D6F", "#FFF3D0", "#FFFFFF", "#FF9F1C", "#FF4D6D", "#B84DFF"];
  var cv = null, ctx = null, pts = [], raf = 0, pending = 0, seen = null;

  function ensureStyle() {
    if (document.getElementById("mnw-win-fx-style")) return;
    var s = document.createElement("style");
    s.id = "mnw-win-fx-style";
    s.textContent =
      ".winning-head{position:fixed!important;left:50%!important;transform:translate(-50%,-50%)!important;" +
      "pointer-events:none!important;z-index:2147482000;opacity:.97;height:150px;max-height:40vh;overflow:visible}" +
      ".winning-head svg{overflow:visible}" +
      "#mnw-win-fx{position:fixed;left:0;top:0;pointer-events:none;z-index:2147483000}";
    (document.head || document.documentElement).appendChild(s);
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
    var dpr = Math.min(2, W.devicePixelRatio || 1);
    cv.width = Math.round(W.innerWidth * dpr);
    cv.height = Math.round(W.innerHeight * dpr);
    cv.style.width = W.innerWidth + "px";
    cv.style.height = W.innerHeight + "px";
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
    ctx.clearRect(0, 0, W.innerWidth, W.innerHeight);
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
    else ctx.clearRect(0, 0, W.innerWidth, W.innerHeight);
  }

  function bodyRect() {
    var el = document.querySelector(".winning-body") || document.querySelector(".winning-main") || document.querySelector(".winning");
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) {
      el = document.querySelector(".winning");
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

  /* dhaniwin jaisa win burst — popup ke sath hamesha chalta hai */
  function burst() {
    var r = bodyRect();
    ensureCanvas();
    var cx = r ? r.left + r.width / 2 : W.innerWidth / 2;
    var cy = r ? Math.max(70, r.top + r.height * 0.2) : W.innerHeight * 0.28;
    spawn(cx, cy, 95, 2.6);
    setTimeout(function () {
      var r2 = bodyRect();
      if (r2) spawn(r2.left + r2.width / 2, r2.top + r2.height * 0.45, 55, 3.4);
      else spawn(W.innerWidth / 2, W.innerHeight * 0.5, 55, 3.4);
    }, 240);
    setTimeout(function () {
      var r3 = bodyRect();
      if (r3) spawn(r3.left + r3.width * 0.5, r3.top + r3.height * 0.12, 45, 3.0);
      else spawn(W.innerWidth / 2, W.innerHeight * 0.22, 45, 3.0);
    }, 620);
  }

  function scan() {
    var w = document.querySelector(".winning");
    if (!w) { seen = null; return; }
    placeHead();
    if (seen === w) return;
    seen = w;
    pts.length = 0;
    pending = Date.now() + 450;
  }

  function check() {
    if (!pending || Date.now() < pending) return;
    pending = 0;
    placeHead();
    burst();
  }

  ensureStyle();
  setInterval(function () { scan(); check(); }, 200);
  W.addEventListener("resize", resize);
  W.addEventListener("orientationchange", function () { setTimeout(resize, 200); });
  scan();
})();
