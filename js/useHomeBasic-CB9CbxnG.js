import {r as i, f as h, H as f, a1 as w, bj as j, k as B, c as u, bk as I} from "./index-D4BxQHrC.js";
const v = "withdrawRejectQueue"
  , a = i([]);
function m(t) {
    if (!(t != null && t.length))
        return;
    const o = new Set(a.value.map(n => n.orderNo))
      , r = t.filter(n => !o.has(n.orderNo));
    r.length && (a.value = [...a.value, ...r].sort( (n, l) => l.withdrawTime - n.withdrawTime))
}
function y(t) {
    a.value = a.value.filter(o => o.orderNo !== t)
}
h.get(v).then(m).catch(t => {}
);
f(a, t => {
    h.set(v, JSON.parse(JSON.stringify(t))).catch(o => {}
    )
}
);
const {eventBus: W} = w()
  , {isLoggedIn: N} = B();
W.on(t => {
    t === j.LOGOUT && (a.value = [])
}
);
f(N, (t, o) => {
    o && !t && (a.value = [])
}
);
function T() {
    return {
        withdrawRejectQueue: a,
        mergeWithdrawRejectItems: m,
        dismissWithdrawRejectPopup: y
    }
}
const {eventBus: O} = w()
  , s = i(null)
  , d = i(0)
  , c = i(!1);
function Q() {
    const {withdrawRejectQueue: t, mergeWithdrawRejectItems: o, dismissWithdrawRejectPopup: r} = T()
      , n = async () => {
        if (!c.value)
            try {
                c.value = !0;
                const e = await I();
                e.code == 0 && e.data && (s.value = e.data,
                d.value = e == null ? void 0 : e.serverTime,
                e.data.isShowDownloadAppPopup && O.emit("show_download_app_popup"),
                o(e.data.withdrawRejectPopups))
            } finally {
                c.value = !1
            }
    }
      , l = u( () => {
        var e;
        return ((e = s.value) == null ? void 0 : e.cashRainInfo) || null
    }
    )
      , p = u( () => {
        var e;
        return ((e = s.value) == null ? void 0 : e.floatWindows) || null
    }
    )
      , g = u( () => {
        var e;
        return ((e = s.value) == null ? void 0 : e.rechargeDiscountAmount) || 0
    }
    )
      , D = u( () => {
        var e;
        return ((e = s.value) == null ? void 0 : e.activityInformationCount) || 0
    }
    )
      , R = u( () => {
        var e;
        return ((e = s.value) == null ? void 0 : e.homeFrontData) || {}
    }
    );
    return {
        homeBasicData: s,
        isLoading: c,
        serverTimeData: d,
        fetchHomeBasicData: n,
        cashRainInfoData: l,
        floatWindowsData: p,
        rechargeDiscountAmountData: g,
        activityCount: D,
        homeFrontData: R,
        withdrawRejectQueue: t,
        dismissWithdrawRejectPopup: r
    }
}
export {Q as u};
