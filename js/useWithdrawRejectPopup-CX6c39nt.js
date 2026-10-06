import {a7 as h, a8 as j, H as R, r as u, c as l, a9 as W} from "./index-D4BxQHrC.js";
import {u as A} from "./useHomeBasic-CB9CbxnG.js";
const c = u(!1);
function x(o) {
    c.value = o
}
function y(o) {
    const {withdrawRejectQueue: r, dismissWithdrawRejectPopup: n} = A()
      , s = l( () => r.value[0] ?? null)
      , t = u(null)
      , v = l( () => t.value ?? s.value)
      , a = u(!1);
    let e;
    const i = u(!0);
    h( () => {
        i.value = !0
    }
    ),
    j( () => {
        i.value = !1
    }
    ),
    R([s, o, i, c], ([m,f,p,w]) => {
        if (!m || !f || !p || w) {
            a.value = !1,
            clearTimeout(e),
            e = void 0;
            return
        }
        !a.value && !e && (e = setTimeout( () => {
            e = void 0,
            t.value = s.value,
            a.value = !0
        }
        , 300))
    }
    , {
        immediate: !0
    }),
    W( () => {
        clearTimeout(e)
    }
    );
    function d() {
        a.value = !1,
        t.value && (n(t.value.orderNo),
        t.value = null)
    }
    return {
        currentWithdrawReject: v,
        showWithdrawRejectDialog: a,
        onWithdrawRejectDialogClosed: d
    }
}
export {x as s, y as u};
