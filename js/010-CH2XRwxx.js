const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["js/index-D4BxQHrC.js", "css/index-6toluGLT.css", "js/iosTip-BTTdgo08.js", "css/iosTip-CNofXnOn.css", "js/index-CWh-Pgc5.js", "js/currency-DTUBf2lI.js", "js/useWithdrawRejectPopup-CX6c39nt.js", "js/useHomeBasic-CB9CbxnG.js", "js/common-BU20caTd.js", "js/index-DnjnvyW-.js", "js/index-DCs4YBOu.js", "js/use-route-Cdlw3bum.js", "js/use-placeholder-DqE8aSIJ.js", "js/use-height-wpP9SCJe.js", "js/index-CBt8xq_i.js", "js/useRechargeGift-B8zmVjSj.js", "css/index-DnUUJRB2.css"]))) => i.map(i => d[i]);
import {b3 as Ce, E as we, r as d, bN as be, be as l, aV as a, bb as $e, c9 as Ye, b6 as r, c5 as Ke, c as v, d as Xe, dC as Qe, d5 as Ze, aq as et, a as tt, e as st, H as j, b9 as t, D as y, aU as S, b7 as n, cG as nt, k as ot, bf as p, z as at, bh as i, bw as lt, br as it, bd as z, bg as N, ba as me, c4 as se, aX as q, aY as F, F as ct, b5 as rt} from "./index-D4BxQHrC.js";
import {M as ne, P as oe} from "./platform_down-C6N1kCun.js";
import {B as fe} from "./index-DuLINWk7.js";
/* empty css              */
import {f as dt} from "./currency-DTUBf2lI.js";
import {r as ut, c as gt} from "./homeHeroPreload-WxgbV7nY.js";
import {u as vt} from "./useMessage-IZqrPUhZ.js";
import {S as _t, a as pt} from "./index-C4z6EloV.js";
import "./index-DnjnvyW-.js";
import "./index-DCs4YBOu.js";
import "./use-route-Cdlw3bum.js";
import "./use-placeholder-DqE8aSIJ.js";
import "./use-height-wpP9SCJe.js";
import "./index-CBt8xq_i.js";
import "./link.utils-BeN2DPOB.js";
const ae = Ce({
    name: "LazyRender",
    __name: "LazyRender",
    props: {
        minHeight: {
            default: "0px"
        },
        rootMargin: {
            default: "0px 0px -100px 0px"
        }
    },
    setup(x) {
        const J = x
          , $ = d(null)
          , I = d(!1);
        let _ = null
          , L = !1;
        return we( () => {
            if (!$.value || typeof IntersectionObserver > "u") {
                I.value = !0;
                return
            }
            requestAnimationFrame( () => {
                requestAnimationFrame( () => {
                    L || !$.value || (_ = new IntersectionObserver(U => {
                        var B;
                        (B = U[0]) != null && B.isIntersecting && (I.value = !0,
                        _ == null || _.disconnect(),
                        _ = null)
                    }
                    ,{
                        rootMargin: J.rootMargin
                    }),
                    _.observe($.value))
                }
                )
            }
            )
        }
        ),
        be( () => {
            L = !0,
            _ == null || _.disconnect(),
            _ = null
        }
        ),
        (U, B) => (a(),
        l("div", {
            ref_key: "root",
            ref: $,
            style: $e(I.value ? void 0 : {
                minHeight: x.minHeight
            })
        }, [I.value ? Ye(U.$slots, "default", {
            key: 0
        }) : r("", !0)], 4))
    }
})
  , ht = {
    class: "dark-purple-home"
}
  , yt = {
    class: "home-header"
}
  , mt = ["src"]
  , ft = {
    class: "header-right"
}
  , kt = ["src"]
  , Ct = {
    class: "amount"
}
  , wt = ["src"]
  , bt = {
    key: 0,
    class: "inmail-badge"
}
  , $t = {
    key: 1,
    class: "auth-actions"
}
  , It = ["src", "alt", "onClick", "fetchpriority", "loading"]
  , Lt = ["onClick"]
  , At = {
    key: 0,
    class: "hero-dots"
}
  , Pt = {
    class: "notice-icon-wrap"
}
  , Tt = ["src"]
  , St = {
    "aria-hidden": "true"
}
  , zt = {
    key: 1,
    class: "notice-line"
}
  , Nt = {
    class: "notice-btn"
}
  , Ut = {
    class: "banner-split"
}
  , Bt = ["src"]
  , Et = {
    class: "content-section popular-section side-distance"
}
  , Rt = {
    class: "section-head"
}
  , Mt = {
    class: "section-title"
}
  , Ot = ["src"]
  , Dt = {
    class: "section-text"
}
  , Vt = {
    class: "featured-games-row"
}
  , Gt = ["onClick"]
  , Wt = ["src"]
  , Ht = {
    key: 0,
    class: "game-placeholder-img"
}
  , jt = ["src", "alt"]
  , qt = {
    class: "reward-section side-distance"
}
  , Ft = {
    class: "content-section side-distance"
}
  , xt = {
    class: "section-head"
}
  , Jt = {
    class: "section-title"
}
  , Yt = ["src"]
  , Kt = ["src"]
  , Xt = {
    key: 0,
    class: "top-games-grid"
}
  , Qt = ["onClick"]
  , Zt = ["src"]
  , es = {
    key: 1,
    class: "game-placeholder-img"
}
  , ts = ["src", "alt"]
  , ss = {
    key: 1,
    class: "empty-box top-games-empty"
}
  , ns = {
    class: "content-section side-distance"
}
  , os = {
    class: "section-head"
}
  , as = {
    class: "section-title"
}
  , ls = ["src"]
  , is = {
    class: "category-tabs"
}
  , cs = ["onClick"]
  , rs = ["src"]
  , ds = {
    class: "category-panel"
}
  , us = {
    class: "section-head inner"
}
  , gs = {
    class: "section-title compact"
}
  , vs = ["src"]
  , _s = ["src"]
  , ps = {
    class: "category-grid"
}
  , hs = ["onClick"]
  , ys = ["src"]
  , ms = {
    key: 1,
    class: "game-placeholder-img"
}
  , fs = ["src"]
  , ke = "home-010"
  , ks = 2500
  , Cs = 900
  , ws = Ce({
    name: "home",
    __name: "010",
    props: {
        discountAmount: {
            type: Number
        }
    },
    setup(x) {
        Ke(e => ({
            v62b5cf50: De.value,
            ff1f6e3c: Ve.value,
            v79214428: Ge.value,
            v584c6ac3: Oe.value
        }));
        const J = q( () => F( () => import("./index-D4BxQHrC.js").then(e => e.fl), __vite__mapDeps([0, 1])))
          , $ = q( () => F( () => import("./iosTip-BTTdgo08.js"), __vite__mapDeps([2, 0, 1, 3])))
          , I = q( () => F( () => import("./index-D4BxQHrC.js").then(e => e.fm), __vite__mapDeps([0, 1])))
          , _ = q( () => F( () => import("./index-CWh-Pgc5.js"), __vite__mapDeps([4, 0, 1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])))
          , L = Xe()
          , {click: U, step: B, isShowIosPwaTip: Ie} = Qe()
          , {getImgVal: k, getBackgroundImgVal: O} = at()
          , {headerLogo: D} = Ze()
          , {totalBalance: Le, getARGameAndPlatWalletList: Ae} = et()
          , {isLoggedIn: Pe, authChecking: Te, userUnreadInmailCount: Se, userUnGrandMsgCount: ze} = ot()
          , Y = v( () => Number(Se.value || 0) + Number(ze.value || 0))
          , Ne = v( () => Y.value > 99 ? "99+" : Y.value)
          , {getActiveLanguage: Ue} = tt()
          , {banners: Be, getMessage: Ee, onJump: Re, noticeMessage: E} = vt()
          , {onGameJump: K, categoryList: A, hotGameList: le, popularGameList: ie, getCategoryList: Me, getGameStatusImg: h} = st()
          , ce = d(!1)
          , re = d(!1)
          , de = d(!0)
          , ue = d(0)
          , C = d(0)
          , V = d(new Set([0]))
          , X = e => {
            if (e < 0 || e >= m.value.length || V.value.has(e))
                return;
            const o = new Set(V.value);
            o.add(e),
            V.value = o
        }
          , Oe = v( () => O("notification_bg"))
          , Q = v( () => k("title_decoration"))
          , De = v( () => O("home_bg_stripe"))
          , m = v( () => {
            const e = Be.value.filter(o => o.type === 4 && o.imageUrl);
            return e.length ? e : []
        }
        );
        j( () => {
            var e;
            return [(e = m.value[0]) == null ? void 0 : e.imageUrl, D.value]
        }
        , ([e,o]) => {
            const u = [];
            e && u.push(e),
            o && !String(o).includes(".json") && u.push(String(o)),
            ut(ke, u)
        }
        , {
            immediate: !0
        });
        const Ve = v( () => O("login_awards"))
          , Ge = v( () => O("daily_rewards"))
          , We = v( () => String(Ue.value || "en").toUpperCase())
          , w = d(0)
          , P = d(!1)
          , ge = d(null)
          , ve = d(null)
          , R = d(16)
          , _e = d(0)
          , G = v( () => Array.isArray(E.value) ? E.value.map(e => typeof e == "string" ? e : (e == null ? void 0 : e.title) || (e == null ? void 0 : e.content) || (e == null ? void 0 : e.message) || "").filter(Boolean) : typeof E.value == "string" ? E.value ? [E.value] : [] : [])
          , b = v( () => G.value[w.value] || "")
          , He = v( () => ({
            "--notice-scroll-duration": `${R.value}s`
        }))
          , je = v( () => `${w.value}-${_e.value}-${b.value}`);
        let T = null;
        const Z = async () => {
            await ct();
            const e = ge.value
              , o = ve.value;
            if (!e || !o) {
                P.value = !1,
                R.value = 16;
                return
            }
            const u = Math.ceil(o.scrollWidth)
              , W = Math.floor(e.clientWidth);
            if (P.value = u > W,
            !P.value) {
                R.value = 16;
                return
            }
            R.value = Math.max(8, Math.ceil((u + W + 48) / 42))
        }
          , ee = () => {
            if (T && (clearInterval(T),
            T = null),
            G.value.length <= 1)
                return;
            const e = P.value ? R.value * 1e3 + Cs : ks;
            T = setInterval( () => {
                w.value = (w.value + 1) % G.value.length
            }
            , e)
        }
          , qe = () => {
            L.push({
                name: "home"
            })
        }
          , f = e => {
            L.push({
                name: e
            })
        }
          , pe = e => {
            e && (!e.messageJumpType && !e.jumpUrl && !e.customPopupId || Re(e))
        }
          , Fe = e => {
            ue.value = e,
            X(e),
            m.value.length > 1 && X((e + 1) % m.value.length)
        }
          , he = e => {
            var u;
            const o = (u = e.gameList) != null && u.length ? e.gameList[0] : e;
            L.push({
                name: "allGames",
                query: {
                    categoryCode: e.categoryCode,
                    vendorCode: o.vendorCode,
                    name: e.categoryName,
                    categoryType: o.categoryType
                }
            })
        }
          , xe = () => {
            window.open(window.location.origin, "_blank")
        }
          , Je = () => {
            U()
        }
        ;
        return we(async () => {
            try {
                await Promise.all([Me(), Ee(!0), Ae()])
            } catch {}
            ee(),
            Z();
            const e = () => {
                re.value = !0,
                m.value.length > 1 && X(1)
            }
              , o = window.requestIdleCallback;
            typeof o == "function" ? o(e, {
                timeout: 2e3
            }) : setTimeout(e, 1500)
        }
        ),
        j(G, e => {
            w.value >= e.length && (w.value = 0),
            Z()
        }
        , {
            deep: !0
        }),
        j(b, async () => {
            _e.value += 1,
            await Z(),
            ee()
        }
        ),
        j(P, () => {
            ee()
        }
        ),
        be( () => {
            T && clearInterval(T),
            gt(ke)
        }
        ),
        (e, o) => {
            var ye;
            const u = lt
              , W = it;
            return a(),
            l("div", ht, [t("header", yt, [t("div", {
                class: "logo",
                onClick: qe
            }, [(ye = n(D)) != null && ye.includes(".json") ? (a(),
            S(nt, {
                key: 0,
                "lottie-json": n(D)
            }, null, 8, ["lottie-json"])) : (a(),
            l("img", {
                key: 1,
                src: n(D),
                alt: "",
                decoding: "async",
                fetchpriority: "high",
                loading: "eager"
            }, null, 8, mt))]), t("div", ft, [n(Pe) ? (a(),
            l(p, {
                key: 0
            }, [t("div", {
                class: "balance-pill",
                onClick: o[0] || (o[0] = s => f("recharge"))
            }, [t("img", {
                src: n(k)("icon_coin"),
                alt: "",
                decoding: "async",
                fetchpriority: "low",
                loading: "eager"
            }, null, 8, kt), t("span", Ct, i(n(dt)(n(Le))), 1), t("img", {
                src: n(k)("bnt_deposit"),
                alt: "",
                decoding: "async",
                fetchpriority: "low",
                loading: "eager"
            }, null, 8, wt)]), t("div", {
                class: "inmail",
                onClick: o[1] || (o[1] = s => f("notification"))
            }, [y(u, {
                name: "icon_mailnot",
                iconClass: "inmail-icon"
            }), Y.value ? (a(),
            l("span", bt, i(Ne.value), 1)) : r("", !0)]), t("div", {
                class: "language-pill",
                onClick: o[2] || (o[2] = s => f("language"))
            }, [y(u, {
                name: "language_" + We.value.toLocaleLowerCase(),
                iconClass: "language",
                class: "language"
            }, null, 8, ["name"]), y(W, {
                size: "20",
                name: "arrow-down"
            })])], 64)) : n(Te) ? r("", !0) : (a(),
            l("div", $t, [t("button", {
                class: "auth-btn register btn_main_style text_shadow",
                onClick: o[3] || (o[3] = s => f("Register"))
            }, i(e.$t("t8")), 1), t("button", {
                class: "auth-btn login",
                onClick: o[4] || (o[4] = s => f("Login"))
            }, i(e.$t("t1")), 1)]))])]), y(n(pt), {
                class: "hero-section",
                autoplay: de.value ? 5e3 : 0,
                "indicator-color": "var(--main_color)",
                onChange: Fe,
                onDragEnd: o[5] || (o[5] = s => de.value = !1)
            }, {
                indicator: z( () => [m.value.length > 1 ? (a(),
                l("div", At, [(a(!0),
                l(p, null, N(m.value, (s, g) => (a(),
                l("span", {
                    key: g,
                    class: me(["hero-dot", {
                        active: g === ue.value
                    }])
                }, null, 2))), 128))])) : r("", !0)]),
                default: z( () => [(a(!0),
                l(p, null, N(m.value, (s, g) => (a(),
                S(n(_t), {
                    key: g
                }, {
                    default: z( () => [V.value.has(g) ? (a(),
                    l("img", {
                        key: 0,
                        src: s.imageUrl,
                        alt: s.title,
                        class: "banner-image",
                        onClick: M => pe(s),
                        fetchpriority: g === 0 ? "high" : "low",
                        loading: g === 0 ? "eager" : "lazy",
                        decoding: "async"
                    }, null, 8, It)) : (a(),
                    l("div", {
                        key: 1,
                        class: "banner-image banner-placeholder",
                        onClick: M => pe(s)
                    }, null, 8, Lt))]),
                    _: 2
                }, 1024))), 128))]),
                _: 1
            }, 8, ["autoplay"]), t("section", {
                onClick: o[6] || (o[6] = s => f("scrollNotification")),
                class: "notice-card side-distance"
            }, [t("div", Pt, [t("img", {
                src: n(k)("icon_message"),
                class: "notice-icon",
                alt: "",
                decoding: "async",
                fetchpriority: "low",
                loading: "eager"
            }, null, 8, Tt)]), t("div", {
                class: "notice-text",
                ref_key: "noticeTextWrap",
                ref: ge
            }, [b.value ? (a(),
            l("div", {
                key: w.value,
                class: "notice-vertical-item"
            }, [P.value ? (a(),
            l("div", {
                key: je.value,
                class: "notice-track",
                style: $e(He.value)
            }, [t("span", null, i(b.value), 1), t("span", St, i(b.value), 1)], 4)) : (a(),
            l("div", zt, i(b.value), 1))])) : r("", !0), t("span", {
                ref_key: "noticeMeasureRef",
                ref: ve,
                class: "notice-measure"
            }, i(b.value), 513)], 512), t("button", Nt, i(e.$t("t387")), 1)]), t("section", Ut, [t("img", {
                src: n(k)("banner_split"),
                alt: "",
                decoding: "async",
                fetchpriority: "low",
                loading: "lazy"
            }, null, 8, Bt)]), t("section", Et, [n(ie).length ? (a(),
            l(p, {
                key: 0
            }, [t("div", Rt, [t("div", Mt, [t("img", {
                class: "section-decoration",
                src: Q.value,
                alt: "",
                decoding: "async",
                fetchpriority: "low",
                loading: "lazy"
            }, null, 8, Ot), t("h2", Dt, i(e.$t("t1284")), 1)])]), t("div", Vt, [(a(!0),
            l(p, null, N(n(ie), s => (a(),
            l("div", {
                key: s.categoryCode || s.vendorCode || s.categoryName,
                class: "featured-game-card",
                onClick: g => n(K)(s, s.categoryCode)
            }, [t("img", {
                class: "game-img",
                src: s.img ?? s.imgUrl ?? s.gameImgUrl,
                draggable: "false",
                decoding: "async",
                fetchpriority: "low",
                loading: "lazy"
            }, null, 8, Wt), [1, 2].includes(n(h)(s)) ? (a(),
            l("div", Ht, [t("img", {
                src: n(h)(s) === 1 ? n(ne) : n(h)(s) === 2 ? n(oe) : s.img ?? s.imgUrl,
                alt: s.gameCode || s.name,
                decoding: "async",
                fetchpriority: "low",
                loading: "lazy"
            }, null, 8, jt)])) : r("", !0)], 8, Gt))), 128))])], 64)) : r("", !0)]), y(ae, {
                "min-height": "200px"
            }, {
                default: z( () => [t("section", qt, [t("div", {
                    onClick: o[7] || (o[7] = s => f("daily")),
                    class: "daily-bonnus"
                }, [t("div", null, i(e.$t("t1292")), 1), t("div", null, i(e.$t("t430")), 1), t("div", null, i(e.$t("t1293")), 1), t("div", null, i(e.$t("t859")), 1)]), t("div", {
                    onClick: o[8] || (o[8] = s => f("rechargeTurntable")),
                    class: "fortune-spin"
                }, [t("div", null, i(e.$t("t1294")), 1), t("div", null, i(e.$t("t1295")), 1), t("div", null, i(e.$t("t1296")), 1), t("div", null, i(e.$t("t859")), 1)])])]),
                _: 1
            }), y(ae, {
                "min-height": "200px"
            }, {
                default: z( () => [t("section", Ft, [t("div", xt, [t("div", Jt, [t("img", {
                    class: "section-decoration",
                    src: Q.value,
                    alt: "",
                    decoding: "async",
                    fetchpriority: "low",
                    loading: "lazy"
                }, null, 8, Yt), t("h2", null, i(e.$t("t757")), 1)]), t("button", {
                    class: "view-all",
                    onClick: o[9] || (o[9] = s => he("hot"))
                }, [se(i(e.$t("t1007")) + " ", 1), t("img", {
                    src: n(k)("Subtract"),
                    alt: "",
                    decoding: "async",
                    fetchpriority: "low",
                    loading: "lazy"
                }, null, 8, Kt)])]), n(le).length ? (a(),
                l("div", Xt, [(a(!0),
                l(p, null, N(n(le), (s, g) => (a(),
                l(p, {
                    key: s.gameCode || s.vendorCode || s.title
                }, [g < 3 ? (a(),
                l("div", {
                    key: 0,
                    class: "top-game-card",
                    onClick: M => n(K)(s, s.categoryCode)
                }, [t("img", {
                    class: "game-img",
                    src: s.img ?? s.imgUrl ?? s.gameImgUrl,
                    draggable: "false",
                    decoding: "async",
                    fetchpriority: "low",
                    loading: "lazy"
                }, null, 8, Zt), s.badge ? (a(),
                S(fe, {
                    key: 0,
                    type: s.badge,
                    class: "badge-corner"
                }, null, 8, ["type"])) : r("", !0), [1, 2].includes(n(h)(s)) ? (a(),
                l("div", es, [t("img", {
                    src: n(h)(s) === 1 ? n(ne) : n(h)(s) === 2 ? n(oe) : s.imgUrl,
                    alt: String((s == null ? void 0 : s.title) ?? s.name) ?? "",
                    decoding: "async",
                    fetchpriority: "low",
                    loading: "lazy"
                }, null, 8, ts)])) : r("", !0)], 8, Qt)) : r("", !0)], 64))), 128))])) : (a(),
                l("div", ss, i(e.emptyText), 1))])]),
                _: 1
            }), y(ae, {
                "min-height": "420px"
            }, {
                default: z( () => {
                    var s, g, M;
                    return [t("section", ns, [t("div", os, [t("div", as, [t("img", {
                        class: "section-decoration",
                        src: Q.value,
                        alt: "",
                        decoding: "async",
                        fetchpriority: "low",
                        loading: "lazy"
                    }, null, 8, ls), t("h2", null, i(e.$t("t1066")), 1)])]), t("div", is, [(a(!0),
                    l(p, null, N(n(A), (c, H) => (a(),
                    l("button", {
                        key: c.categoryCode || H,
                        class: me(["category-chip", H === C.value && "active"]),
                        onClick: te => C.value = H
                    }, [t("img", {
                        class: "category-icon",
                        src: c == null ? void 0 : c.categoryImg,
                        alt: "",
                        decoding: "async",
                        fetchpriority: "low",
                        loading: "lazy"
                    }, null, 8, rs), se(" " + i(c == null ? void 0 : c.categoryName), 1)], 10, cs))), 128))]), t("div", ds, [t("div", us, [t("div", gs, [t("img", {
                        class: "category-icon",
                        src: (s = n(A)[C.value]) == null ? void 0 : s.categoryImg,
                        alt: "",
                        decoding: "async",
                        fetchpriority: "low",
                        loading: "lazy"
                    }, null, 8, vs), t("h3", null, i((g = n(A)[C.value]) == null ? void 0 : g.categoryName), 1)]), t("button", {
                        class: "view-all",
                        onClick: o[10] || (o[10] = c => he(n(A)[C.value]))
                    }, [se(i(e.$t("t1007")) + " ", 1), t("img", {
                        src: n(k)("Subtract"),
                        alt: "",
                        decoding: "async",
                        fetchpriority: "low",
                        loading: "lazy"
                    }, null, 8, _s)])]), t("div", ps, [(a(!0),
                    l(p, null, N(((M = n(A)[C.value]) == null ? void 0 : M.gameList) || [], c => (a(),
                    l("div", {
                        key: c.name,
                        class: "category-game-card",
                        onClick: H => {
                            var te;
                            return n(K)(c, (te = n(A)[C.value]) == null ? void 0 : te.categoryCode)
                        }
                    }, [t("img", {
                        class: "game-img",
                        src: c.img ?? c.imgUrl ?? c.gameImgUrl,
                        draggable: "false",
                        decoding: "async",
                        fetchpriority: "low",
                        loading: "lazy"
                    }, null, 8, ys), c.badge ? (a(),
                    S(fe, {
                        key: 0,
                        type: c.badge,
                        class: "badge-corner"
                    }, null, 8, ["type"])) : r("", !0), [1, 2].includes(n(h)(c)) ? (a(),
                    l("div", ms, [t("img", {
                        src: n(h)(c) === 1 ? n(ne) : n(h)(c) === 2 ? n(oe) : c.img ?? c.imgUrl,
                        alt: "",
                        decoding: "async",
                        fetchpriority: "low",
                        loading: "lazy"
                    }, null, 8, fs)])) : r("", !0)], 8, hs))), 128))])])])]
                }
                ),
                _: 1
            }), re.value ? (a(),
            l(p, {
                key: 0
            }, [n(Ie) ? (a(),
            S(n($), {
                key: 0
            })) : r("", !0), ce.value ? (a(),
            S(n(J), {
                key: 1,
                step: n(B),
                onInstallPWAAPP: Je,
                onOpenPwa: xe,
                onClose: o[11] || (o[11] = s => ce.value = !1)
            }, null, 8, ["step"])) : r("", !0), y(n(_)), y(n(I))], 64)) : r("", !0)])
        }
    }
})
  , Os = rt(ws, [["__scopeId", "data-v-5b13e743"]]);
export {Os as default};
