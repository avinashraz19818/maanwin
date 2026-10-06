import {u as y, L as u, w as i} from "./index-D4BxQHrC.js";
function l({source: o}={
    source: void 0
}) {
    const {t} = y()
      , {text: s, copy: p, copied: a, isSupported: n} = u({
        source: o,
        legacy: !0
    })
      , c = i();
    return {
        text: s,
        copy: async e => {
            await p(e || (o == null ? void 0 : o.value)),
            c.success(t("t1253"))
        }
        ,
        copied: a,
        isSupported: n
    }
}
export {l as u};
