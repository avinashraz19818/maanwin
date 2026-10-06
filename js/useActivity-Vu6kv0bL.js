import {t as S, a as k, r as m, c as g, v as d, w as O, x as v, y as D, z as R} from "./index-xnhGKCfe.js";
import {j as P} from "./link.utils-C_KD8HUU.js";
import {u as j} from "./index-CExwpARe.js";
const J = 1440 * 60 * 1e3
  , h = m(!0);
function Y() {
    const u = S()
      , f = m([])
      , y = m([])
      , {userInfo: A} = R()
      , {newActivityInformationDays: T} = k()
      , w = g( () => !A.value.hasReceivedOpenPushGuideReward && h.value)
      , I = g( () => {
        const t = [...f.value, ...y.value];
        let n = [];
        if (t.length) {
            const i = t.filter(o => o.activityInquiryType === 2)
              , r = t.filter(o => o.activityInquiryType !== 2);
            w.value ? n = [...i, ...r] : n = [...r, ...i]
        }
        return n
    }
    )
      , {goServicePage: L} = j();
    function N(t, n=Date.now()) {
        if (Number(t == null ? void 0 : t.newActivityState) !== 1)
            return !1;
        const i = Number(t == null ? void 0 : t.lastUpdateTime);
        if (!i)
            return !1;
        const r = T.value;
        return n - i <= r * J
    }
    return {
        showActivityList: I,
        getActivityList: async () => {
            var i, r;
            v.get("activityList").then(o => {
                o && (y.value = o)
            }
            ),
            v.get("activityNewList").then(async o => {
                o && (f.value = o)
            }
            );
            const {code: t, data: n} = await D();
            if (t === 0) {
                const o = []
                  , p = []
                  , a = []
                  , l = Date.now();
                for (const e of n || []) {
                    if (!e.isShowTips && e.pageType === 19) {
                        const c = e.tipsDetail;
                        e.firstItem = ((i = c == null ? void 0 : c.pendingDayTask) == null ? void 0 : i[0]) || ((r = c == null ? void 0 : c.pendingWeekTask) == null ? void 0 : r[0])
                    }
                    const s = {
                        ...e,
                        isNew: N(e, l)
                    };
                    s.isShowTips ? p.push(s) : s.isNew ? o.push(s) : a.push(s)
                }
                f.value = [...p.sort( (e, s) => ((s == null ? void 0 : s.sort) ?? 0) - ((e == null ? void 0 : e.sort) ?? 0)), ...o.sort( (e, s) => ((s == null ? void 0 : s.sort) ?? 0) - ((e == null ? void 0 : e.sort) ?? 0))],
                y.value = a.sort( (e, s) => ((s == null ? void 0 : s.sort) ?? 0) - ((e == null ? void 0 : e.sort) ?? 0));
                try {
                    v.set("activityList", JSON.parse(JSON.stringify(y.value))),
                    v.set("activityNewList", JSON.parse(JSON.stringify(f.value)))
                } catch {}
            }
        }
        ,
        clickActivity: async (t, n) => {
            const {informationType: i, id: r, content: o, pageType: p} = t;
            if (i === 0 && P(o),
            i === 1 && await u.push({
                name: "activityDetail",
                query: {
                    id: r
                }
            }),
            i === 2 || i === 18) {
                const a = d[p].name;
                if (!a)
                    return;
                await u.push({
                    name: a
                })
            }
            if (i === 3 && Array.isArray(n)) {
                const a = n.find(l => l.workOrderTypeId === t.pageId);
                return a ? L(a) : u.push({
                    name: "workOrder"
                })
            }
        }
        ,
        getActivetyDetail: async t => {
            const {code: n, data: i} = await O({
                id: t
            });
            if (n === 0)
                return i || {}
        }
        ,
        jumpPageItem: t => {
            const n = d[t].name;
            n && u.push({
                name: n
            })
        }
        ,
        canReceiveReward: w,
        isReceiveReward: h
    }
}
export {Y as u};
