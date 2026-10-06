import {
    b7 as F,
    by as k,
    cn as D,
    bn as L,
    bk as G,
    bH as K,
    bG as re,
    c as d,
    Q as $,
    X as Q,
    R as ve,
    S as fe,
    dh as de,
    O as U,
    ca as he,
    P as ge,
    cb as we,
    c0 as me,
    cq as be,
    r as V,
    N as A,
    cr as j,
    p as J,
    di as ye,
    bp as xe,
    dj as z,
    ap as R,
    aq as Z,
    cx as Se
} from "./index-xnhGKCfe.js";
const [ee, I] = G("swipe"), pe = {
    loop: k,
    width: L,
    height: L,
    vertical: Boolean,
    autoplay: D(0),
    duration: D(500),
    touchable: k,
    lazyRender: Boolean,
    initialSwipe: D(0),
    indicatorColor: String,
    showIndicators: k,
    stopPropagation: k
}, te = Symbol(ee);
var Te = F({
    name: ee,
    props: pe,
    emits: ["change", "dragStart", "dragEnd"],
    setup(a, {
        emit: y,
        slots: g
    }) {
        const u = V(),
            h = V(),
            t = Q({
                rect: null,
                width: 0,
                height: 0,
                offset: 0,
                active: 0,
                swiping: !1
            });
        let x = !1;
        const r = ye(),
            {
                children: w,
                linkChildren: s
            } = re(te),
            i = d(() => w.length),
            o = d(() => t[a.vertical ? "height" : "width"]),
            v = d(() => a.vertical ? r.deltaY.value : r.deltaX.value),
            b = d(() => t.rect ? (a.vertical ? t.rect.height : t.rect.width) - o.value * i.value : 0),
            M = d(() => o.value ? Math.ceil(Math.abs(b.value) / o.value) : i.value),
            O = d(() => i.value * o.value),
            S = d(() => (t.active + i.value) % i.value),
            B = d(() => {
                const e = a.vertical ? "vertical" : "horizontal";
                return r.direction.value === e
            }),
            ae = d(() => {
                const e = {
                    transitionDuration: `${t.swiping?0:a.duration}ms`,
                    transform: `translate${a.vertical?"Y":"X"}(${+t.offset.toFixed(2)}px)`
                };
                if (o.value) {
                    const l = a.vertical ? "height" : "width",
                        n = a.vertical ? "width" : "height";
                    e[l] = `${O.value}px`, e[n] = a[n] ? `${a[n]}px` : ""
                }
                return e
            }),
            ie = e => {
                const {
                    active: l
                } = t;
                return e ? a.loop ? R(l + e, -1, i.value) : R(l + e, 0, M.value) : l
            },
            X = (e, l = 0) => {
                let n = e * o.value;
                a.loop || (n = Math.min(n, -b.value));
                let f = l - n;
                return a.loop || (f = R(f, b.value, 0)), f
            },
            m = ({
                pace: e = 0,
                offset: l = 0,
                emitChange: n
            }) => {
                if (i.value <= 1) return;
                const {
                    active: f
                } = t, c = ie(e), C = X(c, l);
                if (a.loop) {
                    if (w[0] && C !== b.value) {
                        const _ = C < b.value;
                        w[0].setOffset(_ ? O.value : 0)
                    }
                    if (w[i.value - 1] && C !== 0) {
                        const _ = C > 0;
                        w[i.value - 1].setOffset(_ ? -O.value : 0)
                    }
                }
                t.active = c, t.offset = C, n && c !== f && y("change", S.value)
            },
            E = () => {
                t.swiping = !0, t.active <= -1 ? m({
                    pace: i.value
                }) : t.active >= i.value && m({
                    pace: -i.value
                })
            },
            ne = () => {
                E(), r.reset(), z(() => {
                    t.swiping = !1, m({
                        pace: -1,
                        emitChange: !0
                    })
                })
            },
            Y = () => {
                E(), r.reset(), z(() => {
                    t.swiping = !1, m({
                        pace: 1,
                        emitChange: !0
                    })
                })
            };
        let H;
        const T = () => clearTimeout(H),
            P = () => {
                T(), +a.autoplay > 0 && i.value > 1 && (H = setTimeout(() => {
                    Y(), P()
                }, +a.autoplay))
            },
            p = (e = +a.initialSwipe) => {
                if (!u.value) return;
                const l = () => {
                    var n, f;
                    if (!j(u)) {
                        const c = {
                            width: u.value.offsetWidth,
                            height: u.value.offsetHeight
                        };
                        t.rect = c, t.width = +((n = a.width) != null ? n : c.width), t.height = +((f = a.height) != null ? f : c.height)
                    }
                    i.value && (e = Math.min(i.value - 1, e), e === -1 && (e = i.value - 1)), t.active = e, t.swiping = !0, t.offset = X(e), w.forEach(c => {
                        c.setOffset(0)
                    }), P()
                };
                j(u) ? J().then(l) : l()
            },
            N = () => p(t.active);
        let W;
        const le = e => {
                !a.touchable || e.touches.length > 1 || (r.start(e), x = !1, W = Date.now(), T(), E())
            },
            oe = e => {
                a.touchable && t.swiping && (r.move(e), B.value && (!a.loop && (t.active === 0 && v.value > 0 || t.active === i.value - 1 && v.value < 0) || (xe(e, a.stopPropagation), m({
                    offset: v.value
                }), x || (y("dragStart", {
                    index: S.value
                }), x = !0))))
            },
            q = () => {
                if (!a.touchable || !t.swiping) return;
                const e = Date.now() - W,
                    l = v.value / e;
                if ((Math.abs(l) > .25 || Math.abs(v.value) > o.value / 2) && B.value) {
                    const f = a.vertical ? r.offsetY.value : r.offsetX.value;
                    let c = 0;
                    a.loop ? c = f > 0 ? v.value > 0 ? -1 : 1 : 0 : c = -Math[v.value > 0 ? "ceil" : "floor"](v.value / o.value), m({
                        pace: c,
                        emitChange: !0
                    })
                } else v.value && m({
                    pace: 0
                });
                x = !1, t.swiping = !1, y("dragEnd", {
                    index: S.value
                }), P()
            },
            se = (e, l = {}) => {
                E(), r.reset(), z(() => {
                    let n;
                    a.loop && e === i.value ? n = t.active === 0 ? 0 : e : n = e % i.value, l.immediate ? z(() => {
                        t.swiping = !1
                    }) : t.swiping = !1, m({
                        pace: n - t.active,
                        emitChange: !0
                    })
                })
            },
            ce = (e, l) => {
                const n = l === S.value,
                    f = n ? {
                        backgroundColor: a.indicatorColor
                    } : void 0;
                return A("i", {
                    style: f,
                    class: I("indicator", {
                        active: n
                    })
                }, null)
            },
            ue = () => {
                if (g.indicator) return g.indicator({
                    active: S.value,
                    total: i.value
                });
                if (a.showIndicators && i.value > 1) return A("div", {
                    class: I("indicators", {
                        vertical: a.vertical
                    })
                }, [Array(i.value).fill("").map(ce)])
            };
        return K({
            prev: ne,
            next: Y,
            state: t,
            resize: N,
            swipeTo: se
        }), s({
            size: o,
            props: a,
            count: i,
            activeIndicator: S
        }), $(() => a.initialSwipe, e => p(+e)), $(i, () => p(t.active)), $(() => a.autoplay, P), $([ve, fe, () => a.width, () => a.height], N), $(de(), e => {
            e === "visible" ? P() : T()
        }), U(p), he(() => p(t.active)), ge(() => p(t.active)), we(T), me(T), be("touchmove", oe, {
            target: h
        }), () => {
            var e;
            return A("div", {
                ref: u,
                class: I()
            }, [A("div", {
                ref: h,
                style: ae.value,
                class: I("track", {
                    vertical: a.vertical
                }),
                onTouchstartPassive: le,
                onTouchend: q,
                onTouchcancel: q
            }, [(e = g.default) == null ? void 0 : e.call(g)]), ue()])
        }
    }
});
const Ee = Z(Te),
    [Pe, Ce] = G("swipe-item");
var $e = F({
    name: Pe,
    setup(a, {
        slots: y
    }) {
        let g;
        const u = Q({
                offset: 0,
                inited: !1,
                mounted: !1
            }),
            {
                parent: h,
                index: t
            } = Se(te);
        if (!h) return;
        const x = d(() => {
                const s = {},
                    {
                        vertical: i
                    } = h.props;
                return h.size.value && (s[i ? "height" : "width"] = `${h.size.value}px`), u.offset && (s.transform = `translate${i?"Y":"X"}(${u.offset}px)`), s
            }),
            r = d(() => {
                const {
                    loop: s,
                    lazyRender: i
                } = h.props;
                if (!i || g) return !0;
                if (!u.mounted) return !1;
                const o = h.activeIndicator.value,
                    v = h.count.value - 1,
                    b = o === 0 && s ? v : o - 1,
                    M = o === v && s ? 0 : o + 1;
                return g = t.value === o || t.value === b || t.value === M, g
            }),
            w = s => {
                u.offset = s
            };
        return U(() => {
            J(() => {
                u.mounted = !0
            })
        }), K({
            setOffset: w
        }), () => {
            var s;
            return A("div", {
                class: Ce(),
                style: x.value
            }, [r.value ? (s = y.default) == null ? void 0 : s.call(y) : null])
        }
    }
});
const ke = Z($e);
export {
    ke as S, Ee as a
};