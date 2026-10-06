import {
    c as d,
    r as B,
    X as ct,
    d_ as lt,
    d$ as kt,
    af as P,
    e0 as K,
    e1 as ft,
    ah as J,
    e2 as ht,
    e3 as H,
    z as dt,
    d4 as vt,
    b7 as Rt,
    br as V,
    O as gt,
    c0 as yt,
    Q as mt,
    aY as tt,
    aT as j,
    aZ as Dt,
    b9 as et,
    a$ as pt,
    b0 as at,
    aS as wt,
    b_ as $t,
    a_ as bt,
    aX as It
} from "./index-xnhGKCfe.js";

function S(k) {
    const c = k.toString().split(".");
    return c[1] ? c[1].length : 0
}

function Mt(k, c) {
    const l = Math.pow(10, Math.max(S(k), S(c)));
    return (Math.round(k * l) + Math.round(c * l)) / l
}

function At(k, c) {
    const l = Math.pow(10, Math.max(S(k), S(c)));
    return (Math.round(k * l) - Math.round(c * l)) / l
}

function St(k, c) {
    const l = Math.pow(10, S(k)),
        y = Math.pow(10, S(c));
    return Math.round(k * l) * Math.round(c * y) / (l * y)
}

function st(k, c) {
    if (c === 0) return 0;
    const l = Math.pow(10, S(k)),
        y = Math.pow(10, S(c));
    return Math.round(k * l) / Math.round(c * y) * (y / l)
}
class nt {
    constructor(c) {
        this._value = 0, this._value = c
    }
    get value() {
        return this._value
    }
    add(c) {
        return this._value = Mt(this._value, c), this
    }
    subtract(c) {
        return this._value = At(this._value, c), this
    }
    multiply(c) {
        return this._value = St(this._value, c), this
    }
    divide(c) {
        return this._value = st(this._value, c), this
    }
}
const t = ct({
    winOrderList: [],
    rankList: [],
    rank: void 0,
    history: void 0,
    user: void 0
});

function Bt(k = 0) {
    const {
        userId: c
    } = dt(), l = B(!1), y = B(!1), T = d(() => t.winOrderList), O = d(() => t.rankList), C = d(() => t.rankList.slice(0, 5)), $ = d(() => t.winOrderList.slice(0, 5)), s = B(k), L = d(() => {
        var r, u, i, f, h, v;
        const e = ((u = (r = t.rank) == null ? void 0 : r.userDayRankData) == null ? void 0 : u.currentIssue) || {},
            a = ((f = (i = t.rank) == null ? void 0 : i.userWeekRankData) == null ? void 0 : f.currentIssue) || {},
            n = ((v = (h = t.rank) == null ? void 0 : h.userMonthRankData) == null ? void 0 : v.currentIssue) || {};
        return [{
            name: "t1082",
            value: 0,
            time: e.rankEndDate || ""
        }, {
            name: "t1083",
            value: 1,
            time: a.rankEndDate || ""
        }, {
            name: "t1084",
            value: 2,
            time: n.rankEndDate || ""
        }]
    }), m = d(() => {
        var r, u, i, f, h, v;
        const e = ((u = (r = t.rank) == null ? void 0 : r.agentDayRankData) == null ? void 0 : u.currentIssue) || {},
            a = ((f = (i = t.rank) == null ? void 0 : i.agentWeekRankData) == null ? void 0 : f.currentIssue) || {},
            n = ((v = (h = t.rank) == null ? void 0 : h.agentMonthlyRankData) == null ? void 0 : v.currentIssue) || {};
        return [{
            name: "t1082",
            value: 0,
            time: e.rankEndDate || ""
        }, {
            name: "t1083",
            value: 1,
            time: a.rankEndDate || ""
        }, {
            name: "t1084",
            value: 2,
            time: n.rankEndDate || ""
        }]
    }), D = d(() => {
        var e, a, n;
        if (!t.rank) return {};
        switch (s.value) {
            case 0:
                return ((e = t.rank.userDayRankData) == null ? void 0 : e.currentIssue) || {};
            case 1:
                return ((a = t.rank.userWeekRankData) == null ? void 0 : a.currentIssue) || {};
            case 2:
                return ((n = t.rank.userMonthRankData) == null ? void 0 : n.currentIssue) || {};
            default:
                return {}
        }
    }), R = d(() => {
        var n, r, u;
        if (!t.rank) return [];
        let e = [];
        switch (s.value) {
            case 0:
                e = ((n = t.rank.userDayRankData) == null ? void 0 : n.rankRecords) || [];
                break;
            case 1:
                e = ((r = t.rank.userWeekRankData) == null ? void 0 : r.rankRecords) || [];
                break;
            case 2:
                e = ((u = t.rank.userMonthRankData) == null ? void 0 : u.rankRecords) || [];
                break
        }
        const a = H(D.value.bonusDistributionRatio);
        return e.map(i => ({ ...i,
            reward: A(i.rank, a)
        }))
    }), _ = d(() => {
        var a, n, r;
        if (!t.rank) return 0;
        let e = {};
        switch (s.value) {
            case 0:
                e = (a = t.rank.userDayRankData) == null ? void 0 : a.currentIssue;
                break;
            case 1:
                e = (n = t.rank.userWeekRankData) == null ? void 0 : n.currentIssue;
                break;
            case 2:
                e = (r = t.rank.userMonthRankData) == null ? void 0 : r.currentIssue;
                break;
            default:
                return 0
        }
        return Number((e == null ? void 0 : e.poolAmount) || 0) + Number((e == null ? void 0 : e.initPoolAmount) || 0)
    }), b = d(() => {
        var e, a, n;
        if (!t.rank) return 0;
        switch (s.value) {
            case 0:
                return ((e = t.rank.userDayRankData) == null ? void 0 : e.rankConfig.prizePoolRatioShow) || 0;
            case 1:
                return ((a = t.rank.userWeekRankData) == null ? void 0 : a.rankConfig.prizePoolRatioShow) || 0;
            case 2:
                return ((n = t.rank.userMonthRankData) == null ? void 0 : n.rankConfig.prizePoolRatioShow) || 0;
            default:
                return {}
        }
    }), o = d(() => {
        var e, a, n;
        if (!t.rank) return 0;
        switch (s.value) {
            case 0:
                return ((e = t.rank.agentDayRankData) == null ? void 0 : e.rankConfig.prizePoolRatioShow) || 0;
            case 1:
                return ((a = t.rank.agentWeekRankData) == null ? void 0 : a.rankConfig.prizePoolRatioShow) || 0;
            case 2:
                return ((n = t.rank.agentMonthlyRankData) == null ? void 0 : n.rankConfig.prizePoolRatioShow) || 0;
            default:
                return {}
        }
    }), g = d(() => {
        var a, n, r, u, i, f, h, v, w, q, X, Q;
        if (!t.rank) return 0;
        let e = 0;
        switch (s.value) {
            case 0:
                e = Math.floor(((n = (a = t.rank.agentDayRankData) == null ? void 0 : a.currentIssue) == null ? void 0 : n.initPoolAmount) + ((u = (r = t.rank.agentDayRankData) == null ? void 0 : r.currentIssue) == null ? void 0 : u.poolAmount)) || 0;
                break;
            case 1:
                e = Math.floor(((f = (i = t.rank.agentWeekRankData) == null ? void 0 : i.currentIssue) == null ? void 0 : f.initPoolAmount) + ((v = (h = t.rank.agentWeekRankData) == null ? void 0 : h.currentIssue) == null ? void 0 : v.poolAmount)) || 0;
                break;
            case 2:
                e = Math.floor(((q = (w = t.rank.agentMonthlyRankData) == null ? void 0 : w.currentIssue) == null ? void 0 : q.initPoolAmount) + ((Q = (X = t.rank.agentMonthlyRankData) == null ? void 0 : X.currentIssue) == null ? void 0 : Q.poolAmount)) || 0;
                break;
            default:
                e = 0
        }
        return e.toString().padStart(9, "0").split("").map(G => G === "0" ? "0" : G)
    }), M = d(() => {
        var r, u, i, f, h, v;
        if (!t.rank) return [];
        let e = [],
            a = {};
        switch (s.value) {
            case 0:
                e = ((r = t.rank.agentDayRankData) == null ? void 0 : r.rankRecords) || [], a = ((u = t.rank.agentDayRankData) == null ? void 0 : u.currentIssue) || {};
                break;
            case 1:
                e = ((i = t.rank.agentWeekRankData) == null ? void 0 : i.rankRecords) || [], a = ((f = t.rank.agentWeekRankData) == null ? void 0 : f.currentIssue) || {};
                break;
            case 2:
                e = ((h = t.rank.agentMonthlyRankData) == null ? void 0 : h.rankRecords) || [], a = ((v = t.rank.agentMonthlyRankData) == null ? void 0 : v.currentIssue) || {};
                break;
            default:
                e = [];
                break
        }
        const n = H(a.bonusDistributionRatio);
        return e.map(w => ({ ...w,
            reward: A(w.rank, n)
        }))
    }), I = d(() => {
        var r, u, i, f, h, v;
        if (!t.history) return [];
        let e = [],
            a = {};
        switch (s.value) {
            case 0:
                e = ((r = t.history) == null ? void 0 : r.rankRecords) || [], a = ((u = t.history) == null ? void 0 : u.currentIssue) || {};
                break;
            case 1:
                e = ((i = t.history) == null ? void 0 : i.rankRecords) || [], a = ((f = t.history) == null ? void 0 : f.currentIssue) || {};
                break;
            case 2:
                e = ((h = t.history) == null ? void 0 : h.rankRecords) || [], a = ((v = t.history) == null ? void 0 : v.currentIssue) || {};
                break;
            default:
                e = [];
                break
        }
        const n = H(a.bonusDistributionRatio);
        return e.map(w => ({ ...w,
            reward: A(w.rank, n)
        }))
    }), p = d(() => {
        var e, a, n, r, u, i;
        if (!t.history) return 0;
        switch (s.value) {
            case 0:
                return ((a = (e = t.history) == null ? void 0 : e.currentIssue) == null ? void 0 : a.poolAmount) || 0;
            case 1:
                return ((r = (n = t.history) == null ? void 0 : n.currentIssue) == null ? void 0 : r.poolAmount) || 0;
            case 2:
                return ((i = (u = t.history) == null ? void 0 : u.currentIssue) == null ? void 0 : i.poolAmount) || 0;
            default:
                return 0
        }
    }), W = d(() => {
        var r, u, i, f, h, v;
        if (!t.history) return [];
        let e = [],
            a = {};
        switch (s.value) {
            case 0:
                e = ((r = t.history) == null ? void 0 : r.rankRecords) || [], a = ((u = t.history) == null ? void 0 : u.currentIssue) || {};
                break;
            case 1:
                e = ((i = t.history) == null ? void 0 : i.rankRecords) || [], a = ((f = t.history) == null ? void 0 : f.currentIssue) || {};
                break;
            case 2:
                e = ((h = t.history) == null ? void 0 : h.rankRecords) || [], a = ((v = t.history) == null ? void 0 : v.currentIssue) || {};
                break;
            default:
                e = [];
                break
        }
        const n = H(a.bonusDistributionRatio);
        return e.map(w => ({ ...w,
            reward: A(w.rank, n)
        }))
    }), U = d(() => {
        var e, a, n, r, u, i;
        if (!t.history) return 0;
        switch (s.value) {
            case 0:
                return ((a = (e = t.history) == null ? void 0 : e.currentIssue) == null ? void 0 : a.poolAmount) || 0;
            case 1:
                return ((r = (n = t.history) == null ? void 0 : n.currentIssue) == null ? void 0 : r.poolAmount) || 0;
            case 2:
                return ((i = (u = t.history) == null ? void 0 : u.currentIssue) == null ? void 0 : i.poolAmount) || 0;
            default:
                return 0
        }
    }), E = d(() => {
        var e, a, n;
        if (!t.rank) return {};
        switch (s.value) {
            case 0:
                return ((e = t.rank.agentDayRankData) == null ? void 0 : e.currentIssue) || {};
            case 1:
                return ((a = t.rank.agentWeekRankData) == null ? void 0 : a.currentIssue) || {};
            case 2:
                return ((n = t.rank.agentMonthlyRankData) == null ? void 0 : n.currentIssue) || {};
            default:
                return {}
        }
    }), A = (e, a) => {
        if (!e || !a.length) return 0;
        let n = 0,
            r = 0;
        return a.forEach(u => {
            e >= u.Start && e <= u.End && (n = u.End - u.Start + 1, r = u.RewardRatio)
        }), st(r, n).toFixed(2)
    }, Y = d(() => t.rank ? t.rank.agentWeekRankData.rankRecords : []), x = d(() => t.rank && D.value.maxRank || 0), N = d(() => {
        const e = R.value.find(a => `${a.userId}`.endsWith(`${c.value}`));
        return e || null
    }), ot = d(() => N.value ? N.value : t.user), ut = async () => {
        var a, n;
        const e = await K();
        e.code === 0 && (t.winOrderList = ((a = e.data) == null ? void 0 : a.winOrderList) || [], t.rankList = ((n = e.data) == null ? void 0 : n.rankList) || [])
    }, it = async e => {
        try {
            if (l.value) return;
            l.value = !0, t.rank = void 0, t.history = void 0, e === "agent" && P(["AgentRank"]).then(r => {
                r.AgentRank && (t.rank = r.AgentRank)
            });
            let a, n;
            if (e === "user" ? a = await K() : a = await ft(), a.code !== 0) return;
            e === "user" ? t.rank = a.data : (t.rank = {
                agentWeekRankData: a.data
            }, J("AgentRank", {
                agentWeekRankData: a.data
            })), e === "user" && await F()
        } finally {
            l.value = !1
        }
    }, F = async () => {
        if (!N.value && !y.value) {
            await P(["ActivityRank"]).then(e => {
                if (e.ActivityRank) {
                    const a = `ActivityRankData${s.value+1}`;
                    t.user = e.ActivityRank[a]
                }
            });
            try {
                y.value = !0;
                const {
                    result: e,
                    data: a
                } = await ht({
                    rankType: s.value + 1
                });
                if (e) {
                    const n = H(D.value.bonusDistributionRatio),
                        r = A(a.rank || 0, n),
                        u = a.validBetAmount || 0,
                        i = 0;
                    if (u >= D.value.minValidBetAmount) {
                        const f = new nt(Number(_.value)),
                            h = new nt(Number(r));
                        a.bonusAmount = Math.floor(f.multiply(h.divide(1e3).value).value)
                    }
                    t.user = { ...a,
                        reward: r,
                        minBetAmount: i
                    }, P(["ActivityRank"]).then(f => {
                        const h = f.ActivityRank || {};
                        J("ActivityRank", { ...h,
                            [`ActivityRankData${s.value+1}`]: { ...a,
                                reward: r,
                                minBetAmount: i
                            }
                        })
                    })
                }
            } finally {
                y.value = !1
            }
        }
    };
    async function Z(e, a, n, r) {
        const u = await P([r]);
        let i;
        if (u[r] && u[r][a]) i = u[r][a];
        else {
            i = (await n({
                rankType: s.value + 1
            })).data;
            const h = u[r] || {};
            await J(r, { ...h,
                [a]: i
            })
        }
        return i.rankRecords = Array.isArray(i.rankRecords) ? i.rankRecords.map(f => ({ ...f
        })) : [], i
    }
    return {
        loading: l,
        winOrderList: T,
        rankList: O,
        winOrderTen: $,
        tabRankList: L,
        rankTop: C,
        currTab: s,
        rankingList: R,
        jekpot: _,
        historyRankList: W,
        historyJekpot: U,
        agenCurrentIssue: E,
        agentRankTabs: m,
        agenJekpot: g,
        agentRankList: M,
        agentRankingList: Y,
        agentHistoryRankList: I,
        agentHistoryJekpot: p,
        prizePoolRatio: b,
        currentUserRank: ot,
        maxRank: x,
        rankConfig: D,
        agentPrizePoolRatio: o,
        getRank: ut,
        getRankList: it,
        changeTab: async e => {
            s.value = e, await F()
        },
        clearRank: () => {
            t.rank = void 0, t.history = void 0, t.user = void 0
        },
        getHistoryRank: async e => {
            try {
                if (e === "user") {
                    const a = `UserHistoryRankData${s.value+1}`;
                    t.history = await Z(e, a, lt, "UserHistoryRank")
                } else {
                    const a = `AgentHistoryRankData${s.value+1}`;
                    t.history = await Z(e, a, kt, "AgentHistoryRank")
                }
            } catch {
                t.history = void 0
            }
        }
    }
}
var z = {
        exports: {}
    },
    Tt = z.exports,
    rt;

function Ct() {
    return rt || (rt = 1, (function(k, c) {
        (function(l, y) {
            k.exports = y()
        })(Tt, (function() {
            var l = "minute",
                y = /[+-]\d\d(?::?\d\d)?/g,
                T = /([+-]|\d\d)/g;
            return function(O, C, $) {
                var s = C.prototype;
                $.utc = function(o) {
                    var g = {
                        date: o,
                        utc: !0,
                        args: arguments
                    };
                    return new C(g)
                }, s.utc = function(o) {
                    var g = $(this.toDate(), {
                        locale: this.$L,
                        utc: !0
                    });
                    return o ? g.add(this.utcOffset(), l) : g
                }, s.local = function() {
                    return $(this.toDate(), {
                        locale: this.$L,
                        utc: !1
                    })
                };
                var L = s.parse;
                s.parse = function(o) {
                    o.utc && (this.$u = !0), this.$utils().u(o.$offset) || (this.$offset = o.$offset), L.call(this, o)
                };
                var m = s.init;
                s.init = function() {
                    if (this.$u) {
                        var o = this.$d;
                        this.$y = o.getUTCFullYear(), this.$M = o.getUTCMonth(), this.$D = o.getUTCDate(), this.$W = o.getUTCDay(), this.$H = o.getUTCHours(), this.$m = o.getUTCMinutes(), this.$s = o.getUTCSeconds(), this.$ms = o.getUTCMilliseconds()
                    } else m.call(this)
                };
                var D = s.utcOffset;
                s.utcOffset = function(o, g) {
                    var M = this.$utils().u;
                    if (M(o)) return this.$u ? 0 : M(this.$offset) ? D.call(this) : this.$offset;
                    if (typeof o == "string" && (o = (function(U) {
                            U === void 0 && (U = "");
                            var E = U.match(y);
                            if (!E) return null;
                            var A = ("" + E[0]).match(T) || ["-", 0, 0],
                                Y = A[0],
                                x = 60 * +A[1] + +A[2];
                            return x === 0 ? 0 : Y === "+" ? x : -x
                        })(o), o === null)) return this;
                    var I = Math.abs(o) <= 16 ? 60 * o : o;
                    if (I === 0) return this.utc(g);
                    var p = this.clone();
                    if (g) return p.$offset = I, p.$u = !1, p;
                    var W = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                    return (p = this.local().add(I + W, l)).$offset = I, p.$x.$localOffset = W, p
                };
                var R = s.format;
                s.format = function(o) {
                    var g = o || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                    return R.call(this, g)
                }, s.valueOf = function() {
                    var o = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                    return this.$d.valueOf() - 6e4 * o
                }, s.isUTC = function() {
                    return !!this.$u
                }, s.toISOString = function() {
                    return this.toDate().toISOString()
                }, s.toString = function() {
                    return this.toDate().toUTCString()
                };
                var _ = s.toDate;
                s.toDate = function(o) {
                    return o === "s" && this.$offset ? $(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : _.call(this)
                };
                var b = s.diff;
                s.diff = function(o, g, M) {
                    if (o && this.$u === o.$u) return b.call(this, o, g, M);
                    var I = this.local(),
                        p = $(o).local();
                    return b.call(I, p, g, M)
                }
            }
        }))
    })(z)), z.exports
}
var Lt = Ct();
const _t = vt(Lt),
    Ot = {
        class: "countdown-timer"
    },
    Ut = {
        key: 0
    },
    xt = Rt({
        __name: "index",
        props: {
            time: {
                type: String,
                default: ""
            },
            type: {
                type: Number,
                default: 0
            },
            showLabel: {
                type: Boolean,
                default: !0
            },
            showIcon: {
                type: Boolean,
                default: !0
            },
            label: {
                type: String,
                default: ""
            }
        },
        emits: ["activityEnd"],
        setup(k, {
            emit: c
        }) {
            const l = k,
                y = c,
                T = B({
                    days: 0,
                    hours: "00",
                    minutes: "00",
                    seconds: "00"
                });
            let O = null;
            V.extend(_t);

            function C() {
                const m = Date.now();
                let D;
                const R = l.time;
                if (typeof R == "number") D = R < 1e12 ? R * 1e3 : R;
                else if (typeof R == "string")
                    if (/^\d+$/.test(R)) {
                        const p = Number(R);
                        D = p < 1e12 ? p * 1e3 : p
                    } else R.includes("Z") || R.includes("T") ? D = V.utc(R).valueOf() : D = V.utc(R.replace("00:00:00", "23:59:59")).valueOf();
                else return {
                    days: 0,
                    hours: "00",
                    minutes: "00",
                    seconds: "00"
                };
                const _ = D - m,
                    b = Math.floor(_ / 1e3);
                if (b < 0) return y("activityEnd"), {
                    days: 0,
                    hours: "00",
                    minutes: "00",
                    seconds: "00"
                };
                const o = Math.floor(b / 86400),
                    g = String(Math.floor(b % 86400 / 3600)).padStart(2, "0"),
                    M = String(Math.floor(b % 3600 / 60)).padStart(2, "0"),
                    I = String(b % 60).padStart(2, "0");
                return {
                    days: o,
                    hours: g,
                    minutes: M,
                    seconds: I
                }
            }

            function $() {
                T.value = C()
            }
            const s = () => {
                l.time && ($(), O = setInterval($, 1e3))
            };
            gt(() => {
                s()
            }), yt(() => {
                clearInterval(O)
            }), mt(() => l.time, () => {
                s()
            });
            const L = d(() => {
                const m = T.value;
                return m.days === 0 ? `${m.hours}:${m.minutes}:${m.seconds}` : `${m.days}d ${m.hours}:${m.minutes}
      `
            });
            return (m, D) => (j(), tt("div", Ot, [Dt(m.$slots, "default", {
                label: k.label,
                time: L.value
            }, () => [k.showLabel ? (j(), tt("p", Ut, at(k.label), 1)) : et("", !0), pt("span", null, [k.showIcon ? (j(), wt(bt, {
                key: 0,
                name: "icon_time",
                class: "icon"
            })) : et("", !0), $t(at(L.value), 1)])], !0)]))
        }
    }),
    zt = It(xt, [
        ["__scopeId", "data-v-84d2e234"]
    ]);
export {
    zt as C, Bt as u
};