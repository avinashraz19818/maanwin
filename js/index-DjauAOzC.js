import {r as t, br as i, bs as g, c as O, X as T, u as H, C as R} from "./index-xnhGKCfe.js";
const M = T({});
function $(e) {
    const s = t([])
      , y = t({})
      , u = t([])
      , c = t([])
      , f = t("")
      , r = t(1)
      , w = t(0)
      , m = t(0)
      , l = t([i(g().today.start * 1e3).valueOf(), i(g().today.end * 1e3).valueOf()])
      , v = {
        web: "/register",
        y1: ""
    }
      , d = O( () => M.myInviteCode || "")
      , h = O( () => {
        const a = e ? v[e] ?? v.web : v.web;
        return `${window.location.origin}${a}?inviteCode=${M.myInviteCode}`
    }
    )
      , x = async () => {
        const {code: a, data: p} = await z();
        a === 0 && Object.assign(M, p)
    }
      , S = async () => {
        const {code: a, data: p} = await U();
        a === 0 && (s.value = p)
    }
      , b = async () => {
        const {code: a, data: p} = await j()
          , A = ["lotteryList", "electronicList", "videoList", "chessCardList", "sportList"];
        if (a === 0) {
            const N = Object.keys(p).sort( (I, n) => {
                const P = A.indexOf(I)
                  , o = A.indexOf(n);
                return P === -1 && o === -1 ? 0 : P === -1 ? 1 : o === -1 ? -1 : P - o
            }
            );
            u.value = N,
            f.value = N[0] || "",
            y.value = p
        }
    }
      , D = async () => {
        const a = {
            pageNo: r.value,
            pageSize: 10,
            queryAllChild: !1,
            endDate: l.value[1],
            startDate: l.value[0]
        }
          , {code: p, data: A} = await G(a);
        p === 0 && (c.value = A.list,
        w.value = A.totalCount)
    }
    ;
    return {
        promotionHome: M,
        inviteCode: d,
        invitationLink: h,
        rebateLevelList: s,
        promotionRate: u,
        rebateLevelRateList: y,
        activeName: f,
        newSubList: c,
        newSubTotal: w,
        newSubPage: r,
        newDateType: m,
        getPromotionHome: x,
        getPromotionRule: S,
        getPromotionRate: b,
        getNewSub: D,
        setNewSubDate: a => {
            m.value !== a && (a === 0 && (l.value = [i(g().today.start * 1e3).valueOf(), i(g().today.end * 1e3).valueOf()]),
            a === 1 && (l.value = [i(g().yesterday.start * 1e3).valueOf(), i(g().yesterday.end * 1e3).valueOf()]),
            a === 2 && (l.value = [i(g().thisMonth.start * 1e3).valueOf(), i(g().thisMonth.end * 1e3).valueOf()]),
            m.value = a,
            r.value = 1,
            D())
        }
    }
}
function Q(e) {
    const {t: s} = H()
      , y = t([])
      , u = t()
      , c = t()
      , f = t(!1)
      , r = t(i(g().yesterday.start * 1e3).format("YYYY-MM-DD HH:mm:ss"))
      , m = t({
        profit: "TotalWinLoseAmount",
        dw: "RechargeAmount",
        sub: "Balance"
    }[e])
      , l = t("Desc")
      , v = t(1)
      , d = t(0)
      , h = t(s("t124"))
      , x = t([{
        text: s("t124"),
        value: void 0
    }, {
        text: s("t424") + "1",
        value: 1
    }, {
        text: s("t424") + "2",
        value: 2
    }, {
        text: s("t424") + "3",
        value: 3
    }, {
        text: s("t424") + "4",
        value: 4
    }, {
        text: s("t424") + "5",
        value: 5
    }, {
        text: s("t424") + "6",
        value: 6
    }])
      , S = {
        profit: [{
            text: "t420",
            value: "TotalBetOrderAmount"
        }, {
            text: "t417",
            value: "TotalWinLoseAmount"
        }, {
            text: "t421",
            value: "BetCommissionAmount"
        }],
        dw: [{
            text: "t56",
            value: "RechargeAmount"
        }, {
            text: "t108",
            value: "WithdrawAmount"
        }, {
            text: "t495",
            value: "NetAmount"
        }],
        sub: [{
            text: "t62",
            value: "Balance"
        }, {
            text: "t496",
            value: "FirstChildCount"
        }, {
            text: "t59",
            value: "LastLoginTime"
        }]
    }
      , b = {
        profit: F,
        dw: W,
        sub: k
    }
      , D = O( () => S[e])
      , C = O( () => b[e])
      , a = async () => {
        const n = {
            pageNo: v.value,
            pageSize: 10,
            orderBy: l.value,
            reportDate: r.value,
            hierarchy: c.value,
            sortField: m.value
        };
        u.value && (n.userId = Number(u.value));
        const {code: P, data: {list: o, totalCount: Y}} = await C.value(n);
        P === 0 && (y.value = o,
        d.value = Y)
    }
    ;
    return {
        userId: u,
        subordinates: y,
        showPicker: f,
        lvLabel: h,
        lvList: x,
        sortList: D,
        sortField: m,
        orderBy: l,
        pageNo: v,
        total: d,
        reportDate: r,
        setSort: n => {
            n === m.value ? l.value = l.value === "Desc" ? "Asc" : "Desc" : (m.value = n,
            l.value = "Desc"),
            v.value = 1,
            a()
        }
        ,
        setLv: ({selectedIndexes: n}) => {
            h.value = x.value[n[0]].text,
            c.value = x.value[n[0]].value,
            v.value = 1,
            a(),
            f.value = !1
        }
        ,
        getPageListTeam: a,
        setReportDate: n => {
            r.value = i(n.singleDateValue).format("YYYY-MM-DD HH:mm:ss"),
            v.value = 1,
            a()
        }
        ,
        setPageNo: n => {
            v.value = n,
            a()
        }
    }
}
function K() {
    const {t: e} = H()
      , s = {
        depositCount: 0,
        depositAmount: 0,
        bettorCount: 0,
        totalValidBetAmount: 0,
        firstDepositCount: 0,
        firstDepositAmount: 0
    }
      , y = () => i(g().yesterday.start * 1e3).format("YYYY-MM-DD")
      , u = t("")
      , c = t(void 0)
      , f = t(y())
      , r = t(!1)
      , w = t(e("t124"))
      , m = t([{
        text: e("t124"),
        value: void 0
    }, {
        text: e("t424") + "1",
        value: 1
    }, {
        text: e("t424") + "2",
        value: 2
    }, {
        text: e("t424") + "3",
        value: 3
    }, {
        text: e("t424") + "4",
        value: 4
    }, {
        text: e("t424") + "5",
        value: 5
    }, {
        text: e("t424") + "6",
        value: 6
    }])
      , l = t([])
      , v = t({
        ...s
    })
      , d = t(1)
      , h = t(10)
      , x = t(0)
      , S = t(!1)
      , b = t("")
      , D = t("Desc")
      , C = [{
        field: "DepositAmount",
        label: "t506"
    }, {
        field: "BetAmount",
        label: "t1349"
    }, {
        field: "Commission",
        label: "t421"
    }]
      , a = async () => {
        S.value = !0;
        const o = (u.value || "").replace(/\D/g, "");
        u.value = o;
        try {
            const {code: Y, data: L} = await q({
                queryDate: f.value,
                pageNo: d.value,
                pageSize: h.value,
                ...o && {
                    userId: Number(o)
                },
                ...c.value && {
                    hierarchy: c.value
                },
                ...b.value && {
                    sortField: b.value,
                    orderBy: D.value
                }
            });
            Y === 0 && (l.value = (L == null ? void 0 : L.list) || [],
            v.value = (L == null ? void 0 : L.summary) || {
                ...s
            },
            x.value = (L == null ? void 0 : L.totalCount) || 0)
        } finally {
            S.value = !1
        }
    }
    ;
    return {
        userId: u,
        hierarchy: c,
        queryDate: f,
        showPicker: r,
        lvLabel: w,
        lvList: m,
        list: l,
        summary: v,
        pageNo: d,
        pageSize: h,
        total: x,
        loading: S,
        sortField: b,
        orderBy: D,
        sortOptions: C,
        fetchData: a,
        setUserId: o => {
            u.value = (o || "").replace(/\D/g, "")
        }
        ,
        search: () => {
            d.value = 1,
            a()
        }
        ,
        setHierarchy: ({selectedIndexes: o}) => {
            const Y = m.value[o[0]];
            w.value = Y.text,
            c.value = Y.value,
            d.value = 1,
            r.value = !1,
            a()
        }
        ,
        setQueryDate: o => {
            f.value = i(o.singleDateValue).format("YYYY-MM-DD"),
            d.value = 1,
            a()
        }
        ,
        setPageNo: o => {
            d.value = o,
            a()
        }
        ,
        setSort: o => {
            b.value === o ? D.value = D.value === "Desc" ? "Asc" : "Desc" : (b.value = o,
            D.value = "Desc"),
            d.value = 1,
            a()
        }
    }
}
function X() {
    const e = t(i(g().today.start * 1e3).format("YYYY-MM-DD HH:mm:ss"))
      , {t: s} = H()
      , y = {
        0: s("t485"),
        1: s("t486"),
        2: s("t487"),
        3: s("t484"),
        4: s("t488")
    }
      , u = t(null)
      , c = async () => {
        const {code: r, data: w} = await B({
            reportDate: e.value
        });
        r === 0 && (u.value = w)
    }
    ;
    return {
        reportDate: e,
        commissionDetail: u,
        textList: y,
        getDetail: c,
        setReportDate: ({singleDateValue: r}) => {
            e.value = i(r).format("YYYY-MM-DD HH:mm:ss"),
            c()
        }
    }
}
const B = e => R.post("/AgentRebate/GetCommissionDetail", e)
  , G = e => R.post("/AgentRebate/GetPageListNewSub", e)
  , F = e => R.post("/AgentRebate/GetPageListTeamDayReport", e)
  , W = e => R.post("/AgentRebate/GetPageListTeamDayReportRechargeWithdrawDiff", e)
  , k = e => R.post("/AgentRebate/GetPageListSubList", e)
  , q = e => R.post("/AgentRebate/GetPageListSubordinateUserInfo", e)
  , z = () => R.post("/AgentRebate/GetPromotionData")
  , U = () => R.post("/AgentRebate/GetRebateLevelList")
  , j = () => R.post("/AgentRebate/GetRebateLevelRateList");
export {$ as a, K as b, Q as c, X as u};
