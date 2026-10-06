import {
    b7 as V,
    c4 as S,
    Q as C,
    cd as c,
    r as B,
    c as $,
    O as D,
    aS as i,
    aT as a,
    bf as z,
    aY as l,
    b9 as o,
    bO as p,
    bd as w,
    a$ as g,
    bc as N,
    aZ as v,
    ba as E,
    m as P,
    a_ as d,
    b0 as u,
    N as F,
    b_ as L,
    ce as M,
    aX as O
} from "./index-xnhGKCfe.js";
const Z = ["src"],
    Q = {
        class: "dialog-body"
    },
    X = {
        key: 1,
        class: "dialog-footer"
    },
    Y = V({
        __name: "arDialog",
        props: {
            modelValue: {
                type: Boolean
            },
            title: {},
            mask: {
                type: Boolean
            },
            iconName: {},
            btnText: {},
            btn2Text: {},
            closeIconBtn: {
                type: Boolean
            },
            maskClosable: {
                type: Boolean,
                default: !0
            },
            contentClass: {},
            hiddenFoot: {
                type: Boolean,
                default: !1
            },
            isPromptDialog: {
                type: Boolean,
                default: !1
            },
            isBorder: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["update:modelValue", "commit", "close", "open", "promptEvent", "onclose"],
        setup(e, {
            emit: h
        }) {
            const {
                getImgVal: T
            } = P(), b = e, n = B(!1), f = S(document.body), m = B(1e3), k = $(() => b.modelValue);
            C(() => b.modelValue, t => {
                t ? (f.value = !0, c.value += 1, m.value = c.value, s("open")) : f.value = !1
            }, {
                immediate: !0
            });
            const s = h,
                r = () => {
                    s("update:modelValue", !1), s("close")
                };
            C(() => k.value, t => {
                t || s("onclose")
            });
            const x = () => {
                    n.value = !n.value, s("promptEvent", !n.value)
                },
                I = () => {
                    s("commit")
                };
            return D(() => {
                c.value += 1, m.value = c.value
            }), (t, y) => (a(), i(M, {
                name: "van-fade",
                appear: ""
            }, {
                default: z(() => [k.value ? (a(), l("div", {
                    key: 0,
                    class: "dialog",
                    style: w({
                        backgroundColor: e.mask ? "rgba(0, 0, 0, 0.6)" : "transparent",
                        zIndex: m.value
                    }),
                    onClick: y[0] || (y[0] = p(() => {
                        e.maskClosable && r()
                    }, ["self"]))
                }, [g("div", {
                    class: N(["dialog-content", [e.contentClass]])
                }, [v(t.$slots, "head", {}, () => [e.iconName === "icon_success_tip" ? (a(), l("img", {
                    key: 0,
                    src: E(T)("icon_success_tip"),
                    alt: "icon_success_tip",
                    class: "headIcon"
                }, null, 8, Z)) : e.iconName && e.iconName !== "icon_success_tip" ? (a(), i(d, {
                    key: 1,
                    name: e.iconName,
                    class: "headIcon"
                }, null, 8, ["name"])) : e.iconName ? (a(), i(d, {
                    key: 2,
                    name: e.iconName,
                    class: "headIcon"
                }, null, 8, ["name"])) : o("", !0)], !0), e.title ? (a(), l("div", {
                    key: 0,
                    class: N(["dialog-title", {
                        border: e.isBorder
                    }])
                }, u(e.title), 3)) : o("", !0), g("div", Q, [v(t.$slots, "default", {}, void 0, !0)]), e.hiddenFoot ? o("", !0) : (a(), l("footer", X, [v(t.$slots, "footer", {}, void 0, !0), e.btnText ? (a(), l("div", {
                    key: 0,
                    class: "subBtn btn_main_style",
                    onClick: I
                }, u(e.btnText), 1)) : o("", !0), e.btn2Text ? (a(), l("div", {
                    key: 1,
                    class: "subBtn2",
                    onClick: r
                }, u(e.btn2Text), 1)) : o("", !0)])), e.isPromptDialog ? (a(), l("div", {
                    key: 2,
                    class: "isNoTip",
                    onClick: x
                }, [F(d, {
                    name: n.value ? "icon_select" : "icon_noSelect",
                    iconClass: "selectIcon"
                }, null, 8, ["name"]), L(" " + u(t.$t("t833")), 1)])) : o("", !0), e.closeIconBtn ? (a(), i(d, {
                    key: 3,
                    name: "icon_close03",
                    iconClass: e.isPromptDialog ? "close close2" : "close",
                    onClick: r
                }, null, 8, ["iconClass"])) : o("", !0)], 2)], 4)) : o("", !0)]),
                _: 3
            }))
        }
    }),
    q = O(Y, [
        ["__scopeId", "data-v-0cbd78ae"]
    ]);
export {
    q as _
};