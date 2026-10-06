import {
    u as z,
    r as R
} from "./use-route-ooe9RtXE.js";
import {
    b7 as q,
    am as C,
    bk as I,
    bl as N,
    N as o,
    bm as l,
    bn as D,
    bo as p,
    bp as w,
    bq as L,
    aq as O
} from "./index-xnhGKCfe.js";
const [U, a] = I("button"), _ = C({}, R, {
    tag: l("button"),
    text: String,
    icon: String,
    type: l("default"),
    size: l("normal"),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: l("button"),
    loadingSize: D,
    loadingText: String,
    loadingType: String,
    iconPosition: l("left")
});
var E = q({
    name: U,
    props: _,
    emits: ["click"],
    setup(e, {
        emit: g,
        slots: t
    }) {
        const f = z(),
            b = () => t.loading ? t.loading() : o(L, {
                size: e.loadingSize,
                type: e.loadingType,
                class: a("loading")
            }, null),
            c = () => {
                if (e.loading) return b();
                if (t.icon) return o("div", {
                    class: a("icon")
                }, [t.icon()]);
                if (e.icon) return o(p, {
                    name: e.icon,
                    class: a("icon"),
                    classPrefix: e.iconPrefix
                }, null)
            },
            m = () => {
                let n;
                if (e.loading ? n = e.loadingText : n = t.default ? t.default() : e.text, n) return o("span", {
                    class: a("text")
                }, [n])
            },
            x = () => {
                const {
                    color: n,
                    plain: r
                } = e;
                if (n) {
                    const i = {
                        color: r ? n : "white"
                    };
                    return r || (i.background = n), n.includes("gradient") ? i.border = 0 : i.borderColor = n, i
                }
            },
            y = n => {
                e.loading ? w(n) : e.disabled || (g("click", n), f())
            };
        return () => {
            const {
                tag: n,
                type: r,
                size: i,
                block: S,
                round: B,
                plain: k,
                square: P,
                loading: T,
                disabled: s,
                hairline: d,
                nativeType: h,
                iconPosition: u
            } = e, v = [a([r, i, {
                plain: k,
                block: S,
                round: B,
                square: P,
                loading: T,
                disabled: s,
                hairline: d
            }]), {
                [N]: d
            }];
            return o(n, {
                type: h,
                class: v,
                style: x(),
                disabled: s,
                onClick: y
            }, {
                default: () => [o("div", {
                    class: a("content")
                }, [u === "left" && c(), m(), u === "right" && c()])]
            })
        }
    }
});
const A = O(E);
export {
    A as B
};