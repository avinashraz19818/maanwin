import {d as A, a as J, e as O, c as g, p as T, aa as I, O as L, ab as S, ac as j} from "./index-D4BxQHrC.js";
import {u as b} from "./index-DnjnvyW-.js";
import {j as d} from "./link.utils-BeN2DPOB.js";
const i = "commonMessageList"
  , t = L({
    list: []
});
function E() {
    const {serviceList: c, getServiceList: y, goServicePage: f} = b()
      , o = A()
      , {getActiveLanguage: n} = J()
      , m = g( () => t.list.filter(e => [4, 5].includes(e.type) && e.sysLanguage === n.value))
      , v = g( () => t.list.filter(e => e.type === 2 && e.sysLanguage === n.value))
      , h = g( () => t.list.filter(e => e.type === 3 && e.sysLanguage === n.value))
      , w = g( () => t.list.filter(e => e.type === 1 && e.sysLanguage === n.value))
      , C = e => !!e.jumpUrl
      , {gameUrl: M} = O();
    return {
        banners: m,
        loginBefoMessage: v,
        loginAfterMessage: h,
        noticeMessage: w,
        isJump: C,
        getMessage: async (e=!1) => {
            let a = !1;
            const u = async () => {
                if (!e)
                    try {
                        const s = (await I([i]))[i];
                        s && Array.isArray(s) && s.length > 0 && !a && (t.list = s)
                    } catch {}
            }
              , p = async () => {
                try {
                    const r = await S();
                    if (r && r.code === 0) {
                        const s = r.data
                          , l = Array.isArray(s) ? s : [];
                        if (l.length > 0) {
                            t.list = l,
                            a = !0;
                            try {
                                j(i, JSON.parse(JSON.stringify(l)))
                            } catch {}
                        }
                    }
                } catch {}
            }
            ;
            await Promise.allSettled([u(), p()])
        }
        ,
        onJump: async e => {
            if (e.messageJumpType !== 0) {
                if (e.messageJumpType === 1) {
                    if (!e.jumpUrl)
                        return;
                    if (e.jumpUrl.startsWith("http"))
                        return d(e.jumpUrl)
                }
                if (e.messageJumpType === 2) {
                    const a = T[e.pageType];
                    if (!a)
                        return;
                    await o.push({
                        name: a.name
                    });
                    return
                }
                if (e.messageJumpType === 4) {
                    if (e.gameId && e.gameCode) {
                        await M({
                            vendorCode: e.vendorCode || "",
                            gameCode: e.gameCode || "",
                            gameId: Number(e.gameId) || ""
                        });
                        return
                    }
                    await o.push({
                        name: "allGames",
                        query: {
                            vendorCode: e.vendorCode || "",
                            gameCode: e.gameCode || "",
                            gameId: e.gameId || ""
                        }
                    });
                    return
                }
                if (e.messageJumpType === 5) {
                    await y(!0);
                    const a = e.customPopupId;
                    if (Array.isArray(c.value) && c.value.length !== 0) {
                        const u = c.value.find(p => p.workOrderTypeId === a);
                        if (u)
                            return f(u)
                    }
                    return o.push({
                        name: "workOrder"
                    })
                }
                await o.push({
                    path: e.jumpUrl
                })
            }
        }
        ,
        jumpOutLink: d
    }
}
export {E as u};
