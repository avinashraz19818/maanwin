import {b3 as u, dH as t, be as i, b6 as m, c as o, aV as _, b5 as f} from "./index-D4BxQHrC.js";
const g = "/images/hot-C9IA1-rG.webp"
  , T = "/images/top-DTYVqZxu.webp"
  , b = "/images/new-Cv66dR3Z.webp"
  , B = ["src", "alt"]
  , v = u({
    __name: "index",
    props: {
        type: {
            default: t.None
        }
    },
    setup(c) {
        const l = c;
        function d(e) {
            if (typeof e == "number")
                return [t.HOT, t.TOP, t.NEW].includes(e) ? e : t.None;
            if (typeof e == "string") {
                const a = e.toLowerCase().trim();
                if (a === "hot")
                    return t.HOT;
                if (a === "top")
                    return t.TOP;
                if (a === "new")
                    return t.NEW
            }
            return t.None
        }
        const s = {
            [t.HOT]: {
                src: g,
                alt: "HOT"
            },
            [t.TOP]: {
                src: T,
                alt: "TOP"
            },
            [t.NEW]: {
                src: b,
                alt: "NEW"
            }
        }
          , n = o( () => d(l.type))
          , r = o( () => {
            var e;
            return ((e = s[n.value]) == null ? void 0 : e.src) ?? ""
        }
        )
          , p = o( () => {
            var e;
            return ((e = s[n.value]) == null ? void 0 : e.alt) ?? ""
        }
        );
        return (e, a) => r.value ? (_(),
        i("img", {
            key: 0,
            src: r.value,
            alt: p.value,
            class: "ar_badge_tag",
            loading: "lazy"
        }, null, 8, B)) : m("", !0)
    }
})
  , O = f(v, [["__scopeId", "data-v-1f2c5871"]]);
export {O as B};
