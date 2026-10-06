import {c as V, r as a, C as n} from "./index-xnhGKCfe.js";
const g = 0
  , o = a({
    daysLeft: 0,
    monthBetAmount: 0,
    monthRechargeAmount: 0,
    upLevelBetAmount: 0,
    upLevelRechargeAmount: 0,
    vipLevel: g,
    weekBetAmount: 0,
    weekRechargeAmount: 0,
    receivedLevels: ""
})
  , $ = () => {
    const i = a(0)
      , r = a([])
      , p = a(!1)
      , v = a(0)
      , u = a(1)
      , c = a(0)
      , l = a([])
      , w = V( () => r.value.find(t => t.level == o.value.vipLevel))
      , f = V( () => {
        var e;
        return String(((e = o.value) == null ? void 0 : e.receivedLevels) ?? "").split(",").map(s => Number(s.trim())).filter(s => Number.isInteger(s)).includes(i.value)
    }
    )
      , d = async () => {
        const {code: t, data: e} = await R();
        t === 0 && (o.value = e)
    }
    ;
    return {
        activeLevel: i,
        vipDetail: o,
        nextVip: w,
        levelDetail: r,
        isShowReceive: p,
        receiveAmount: v,
        historyList: l,
        pageNo: u,
        total: c,
        canReceived: f,
        getVipDetail: d,
        getVipLevelConfig: async () => {
            const {code: t, data: e} = await m();
            t === 0 && (r.value = e,
            i.value = g)
        }
        ,
        pickVipReward: async (t, e) => {
            const {code: s, data: A} = await y({
                rewardType: t,
                rewardLevel: i.value
            });
            s === 0 && (v.value = e,
            p.value = !0,
            await d())
        }
        ,
        getUserVipHistoryList: async () => {
            const {code: t, data: e} = await L({
                pageNo: u.value,
                pageSize: 10
            });
            t === 0 && (l.value = e.list,
            c.value = e.totalCount)
        }
        ,
        getUserVipRewardsList: async t => {
            const {code: e, data: s} = await L(t);
            e === 0 && (l.value = s.list,
            c.value = s.totalCount)
        }
    }
}
  , m = () => n.post("/VipLevel/GetVipLevelConfig")
  , R = () => n.post("/VipLevel/GetUserVipInfo")
  , L = i => n.post("/VipLevel/GetUserVipRewardList", i)
  , y = i => n.post("/VipLevel/PickVipReward", i);
export {y as p, $ as u};
