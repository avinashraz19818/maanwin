import {
    b7 as q,
    as as I,
    d as V,
    dv as A,
    u as L,
    I as M,
    aY as m,
    aT as s,
    bc as y,
    a$ as n,
    aZ as f,
    b9 as o,
    c as C,
    ba as a,
    b0 as x,
    J as W,
    N as X,
    cX as H,
    a_ as l,
    aS as d,
    bO as z,
    aX as E
} from "./index-xnhGKCfe.js";
import {
    p as J
} from "./pre-D84pmYLY.js";
import {
    c as Y
} from "./currency-DTUBf2lI.js";
import {
    u as Z
} from "./useProtocol-DJp7lFWi.js";
const j = "/images/question-DynP9t_R.webp",
    F = "/images/gift-BPLBBdSP.webp",
    G = {
        class: "head-left"
    },
    K = {
        class: "route-name"
    },
    Q = {
        class: "extra"
    },
    U = ["src"],
    _ = ["src"],
    ee = {
        key: 0,
        class: "amount"
    },
    te = ["src"],
    se = q({
        __name: "index",
        props: {
            isTransparent: {
                type: Boolean,
                default: !1
            },
            extra: {},
            title: {
                type: Boolean,
                default: !0
            },
            showAmount: {
                type: Boolean
            },
            isOverfllow: {
                type: Boolean,
                default: !0
            },
            isBorder: {
                type: Boolean,
                default: !0
            },
            isBackHome: {
                type: Boolean,
                default: !1
            }
        },
        setup(t) {
            const T = I(),
                {
                    totalBalance: h
                } = V(),
                P = A(),
                {
                    t: k,
                    locale: S
                } = L(),
                $ = C(() => !P.title),
                {
                    richText: D,
                    getProtocol: O
                } = Z(4),
                N = C(() => (S.value, k("t230"))),
                v = M({
                    props: {
                        title: N,
                        isShowConfirmBtn: !0,
                        onConfirm: () => v.close()
                    },
                    slots: {
                        default: () => W("div", {
                            innerHTML: D.value || "",
                            class: "rich_div"
                        })
                    }
                });

            function i(r) {
                H.push({
                    name: r
                })
            }

            function R() {
                O(), v.open()
            }
            return (r, e) => (s(), m("div", {
                class: y(["page-wrapper", {
                    isOverfllow: !!t.isOverfllow
                }])
            }, [n("header", {
                class: y({
                    bg: !t.isTransparent,
                    hearder_bottom_border: t.isBorder
                })
            }, [n("div", G, [f(r.$slots, "left", {}, () => [X(l, {
                name: "icon_return_01",
                class: "back",
                onClick: e[0] || (e[0] = () => {
                    t.isBackHome ? i("home") : a(H).go(-1)
                })
            })], !0)]), n("div", {
                class: y({
                    "head-title": !0,
                    noTitle: $.value
                })
            }, [t.title ? f(r.$slots, "title", {
                key: 0
            }, () => {
                var u, c;
                return [n("div", K, x(a(k)((c = (u = a(T)) == null ? void 0 : u.meta) == null ? void 0 : c.pageTitle) || ""), 1)]
            }, !0) : o("", !0)], 2), n("div", Q, [f(r.$slots, "extra", {}, () => {
                var u, c, B, g, w, p, b;
                return [(u = t.extra) != null && u.includes("service") ? (s(), d(l, {
                    key: 0,
                    name: "icon_wa_service",
                    class: "icon",
                    onClick: e[1] || (e[1] = () => i("workOrder"))
                })) : o("", !0), (c = t.extra) != null && c.includes("question") ? (s(), m("img", {
                    key: 1,
                    src: a(j),
                    onClick: e[2] || (e[2] = z(() => R(), ["stop"]))
                }, null, 8, U)) : o("", !0), (B = t.extra) != null && B.includes("history") ? (s(), d(l, {
                    key: 2,
                    name: "icon_History",
                    class: "icon",
                    onClick: e[3] || (e[3] = () => i("turntableHistory"))
                })) : o("", !0), (g = t.extra) != null && g.includes("depositHistory") ? (s(), d(l, {
                    key: 3,
                    name: "icon_History",
                    class: "icon",
                    onClick: e[4] || (e[4] = () => i("DepositHistory"))
                })) : o("", !0), (w = t.extra) != null && w.includes("withdrawal") ? (s(), d(l, {
                    key: 4,
                    name: "icon_History",
                    class: "icon",
                    onClick: e[5] || (e[5] = () => i("WithdrawHistory"))
                })) : o("", !0), (p = t.extra) != null && p.includes("gift") ? (s(), m("img", {
                    key: 5,
                    src: a(F),
                    onClick: e[6] || (e[6] = () => i("home"))
                }, null, 8, _)) : o("", !0), (b = t.extra) != null && b.includes("records") ? (s(), d(l, {
                    key: 6,
                    name: "icon_History",
                    class: "icon",
                    onClick: e[7] || (e[7] = () => i("Records-Detail"))
                })) : o("", !0)]
            }, !0)]), t.showAmount ? (s(), m("div", ee, [n("img", {
                src: a(J)
            }, null, 8, te), n("span", null, x(a(Y)(a(h))), 1)])) : o("", !0)], 2), f(r.$slots, "default", {}, void 0, !0)], 2))
        }
    }),
    re = E(se, [
        ["__scopeId", "data-v-5a0a4930"]
    ]);
export {
    re as P
};