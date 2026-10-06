import {b3 as I, bM as S, H as C, cb as c, r as B, c as D, E as z, aU as i, aV as a, bd as $, be as l, b6 as o, bU as w, bb as E, b9 as g, ba as h, c9 as b, b7 as p, z as M, bw as u, bh as d, D as P, c4 as F, cc as L, b5 as U} from "./index-D4BxQHrC.js";
const H = ["src"]
  , Z = {
    class: "dialog-body"
}
  , j = {
    key: 1,
    class: "dialog-footer"
}
  , q = I({
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
    setup(e, {emit: N}) {
        const {getImgVal: T} = M()
          , v = e
          , n = B(!1)
          , f = S(document.body)
          , m = B(1e3)
          , k = D( () => v.modelValue)
          , s = N;
        C( () => v.modelValue, t => {
            t ? (f.value = !0,
            c.value += 1,
            m.value = c.value,
            s("open")) : f.value = !1
        }
        , {
            immediate: !0
        });
        const r = () => {
            s("update:modelValue", !1),
            s("close")
        }
        ;
        C( () => k.value, t => {
            t || s("onclose")
        }
        );
        const V = () => {
            n.value = !n.value,
            s("promptEvent", !n.value)
        }
          , x = () => {
            s("commit")
        }
        ;
        return z( () => {
            c.value += 1,
            m.value = c.value
        }
        ),
        (t, y) => (a(),
        i(L, {
            name: "van-fade",
            appear: ""
        }, {
            default: $( () => [k.value ? (a(),
            l("div", {
                key: 0,
                class: "dialog",
                style: E({
                    backgroundColor: e.mask ? "rgba(0, 0, 0, 0.6)" : "transparent",
                    zIndex: m.value
                }),
                onClick: y[0] || (y[0] = w( () => {
                    e.maskClosable && r()
                }
                , ["self"]))
            }, [g("div", {
                class: h(["dialog-content", [e.contentClass]])
            }, [b(t.$slots, "head", {}, () => [e.iconName === "icon_success_tip" ? (a(),
            l("img", {
                key: 0,
                src: p(T)("icon_success_tip"),
                alt: "icon_success_tip",
                class: "headIcon"
            }, null, 8, H)) : e.iconName && e.iconName !== "icon_success_tip" ? (a(),
            i(u, {
                key: 1,
                name: e.iconName,
                class: "headIcon"
            }, null, 8, ["name"])) : e.iconName ? (a(),
            i(u, {
                key: 2,
                name: e.iconName,
                class: "headIcon"
            }, null, 8, ["name"])) : o("", !0)], !0), e.title ? (a(),
            l("div", {
                key: 0,
                class: h(["dialog-title", {
                    border: e.isBorder
                }])
            }, d(e.title), 3)) : o("", !0), g("div", Z, [b(t.$slots, "default", {}, void 0, !0)]), e.hiddenFoot ? o("", !0) : (a(),
            l("footer", j, [b(t.$slots, "footer", {}, void 0, !0), e.btnText ? (a(),
            l("div", {
                key: 0,
                class: "subBtn btn_main_style",
                onClick: x
            }, d(e.btnText), 1)) : o("", !0), e.btn2Text ? (a(),
            l("div", {
                key: 1,
                class: "subBtn2",
                onClick: r
            }, d(e.btn2Text), 1)) : o("", !0)])), e.isPromptDialog ? (a(),
            l("div", {
                key: 2,
                class: "isNoTip",
                onClick: V
            }, [P(u, {
                name: n.value ? "icon_select" : "icon_noSelect",
                iconClass: "selectIcon"
            }, null, 8, ["name"]), F(" " + d(t.$t("t833")), 1)])) : o("", !0), e.closeIconBtn ? (a(),
            i(u, {
                key: 3,
                name: "icon_close03",
                iconClass: e.isPromptDialog ? "close close2" : "close",
                onClick: r
            }, null, 8, ["iconClass"])) : o("", !0)], 2)], 4)) : o("", !0)]),
            _: 3
        }))
    }
})
  , G = U(q, [["__scopeId", "data-v-a24ce958"]]);
export {G as _};
