import {b3 as _e, bC as Ue, bn as qe, r as o, bF as Ba, D as w, ao as Me, ak as ee, cx as Pa, bG as Sa, c as J, db as Aa, eS as mt, cA as Ct, cL as xa, ef as Da, bz as Na, cV as Ea, O as M, eE as La, eg as Fa, bp as Ra, bx as Wa, bq as Ua, cv as $a, eo as Ka, eT as _a, cP as qa, eI as Ma, eJ as Ga, bu as ja, u as za, a as Va, d as Ha, au as Ya, a9 as Za, k as Qa, w as Xa, cf as Ja, a6 as eo, c_ as to, c$ as We, aa as yt, ac as ht, Q as ao, eU as oo, X as so, l as g} from "./index-D4BxQHrC.js";
import {B as $e} from "./index-DCs4YBOu.js";
import {u as no} from "./use-placeholder-DqE8aSIJ.js";
import {u as ro, r as lo} from "./use-route-Cdlw3bum.js";
import {g as co, c as uo} from "./index-CBt8xq_i.js";
const [bt,wt] = qe("action-bar")
  , Ot = Symbol(bt)
  , io = {
    placeholder: Boolean,
    safeAreaInsetBottom: Ue
};
var fo = _e({
    name: bt,
    props: io,
    setup(a, {slots: n}) {
        const l = o()
          , u = no(l, wt)
          , {linkChildren: d} = Ba(Ot);
        d();
        const h = () => {
            var f;
            return w("div", {
                ref: l,
                class: [wt(), {
                    "van-safe-area-bottom": a.safeAreaInsetBottom
                }]
            }, [(f = n.default) == null ? void 0 : f.call(n)])
        }
        ;
        return () => a.placeholder ? u(h) : h()
    }
});
const vo = Me(fo)
  , [po,go] = qe("action-bar-button")
  , mo = ee({}, lo, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean
});
var yo = _e({
    name: po,
    props: mo,
    setup(a, {slots: n}) {
        const l = ro()
          , {parent: u, index: d} = Pa(Ot)
          , h = J( () => {
            if (u) {
                const i = u.children[d.value - 1];
                return !(i && "isButton"in i)
            }
        }
        )
          , f = J( () => {
            if (u) {
                const i = u.children[d.value + 1];
                return !(i && "isButton"in i)
            }
        }
        );
        return Sa({
            isButton: !0
        }),
        () => {
            const {type: i, icon: b, text: m, color: I, loading: T, disabled: S} = a;
            return w($e, {
                class: go([i, {
                    last: f.value,
                    first: h.value
                }]),
                size: "large",
                type: i,
                icon: b,
                color: I,
                loading: T,
                disabled: S,
                onClick: l
            }, {
                default: () => [n.default ? n.default() : m]
            })
        }
    }
});
const kt = Me(yo)
  , [ho,P,ve] = qe("dialog")
  , wo = ee({}, Fa, {
    title: String,
    theme: String,
    width: Ua,
    message: [String, Function],
    callback: Function,
    allowHtml: Boolean,
    className: Wa,
    transition: Ra("van-dialog-bounce"),
    messageAlign: String,
    closeOnPopstate: Ue,
    showCancelButton: Boolean,
    cancelButtonText: String,
    cancelButtonColor: String,
    cancelButtonDisabled: Boolean,
    confirmButtonText: String,
    confirmButtonColor: String,
    confirmButtonDisabled: Boolean,
    showConfirmButton: Ue,
    closeOnClickOverlay: Boolean
})
  , ko = [...Da, "transition", "closeOnPopstate"];
var It = _e({
    name: ho,
    props: wo,
    emits: ["confirm", "cancel", "keydown", "update:show"],
    setup(a, {emit: n, slots: l}) {
        const u = o()
          , d = M({
            confirm: !1,
            cancel: !1
        })
          , h = c => n("update:show", c)
          , f = c => {
            var y;
            h(!1),
            (y = a.callback) == null || y.call(a, c)
        }
          , i = c => () => {
            a.show && (n(c),
            a.beforeClose ? (d[c] = !0,
            La(a.beforeClose, {
                args: [c],
                done() {
                    f(c),
                    d[c] = !1
                },
                canceled() {
                    d[c] = !1
                }
            })) : f(c))
        }
          , b = i("cancel")
          , m = i("confirm")
          , I = Aa(c => {
            var y, v;
            if (c.target !== ((v = (y = u.value) == null ? void 0 : y.popupRef) == null ? void 0 : v.value))
                return;
            ({
                Enter: a.showConfirmButton ? m : mt,
                Escape: a.showCancelButton ? b : mt
            })[c.key](),
            n("keydown", c)
        }
        , ["enter", "esc"])
          , T = () => {
            const c = l.title ? l.title() : a.title;
            if (c)
                return w("div", {
                    class: P("header", {
                        isolated: !a.message && !l.default
                    })
                }, [c])
        }
          , S = c => {
            const {message: y, allowHtml: v, messageAlign: k} = a
              , A = P("message", {
                "has-title": c,
                [k]: k
            })
              , B = $a(y) ? y() : y;
            return v && typeof B == "string" ? w("div", {
                class: A,
                innerHTML: B
            }, null) : w("div", {
                class: A
            }, [B])
        }
          , x = () => {
            if (l.default)
                return w("div", {
                    class: P("content")
                }, [l.default()]);
            const {title: c, message: y, allowHtml: v} = a;
            if (y) {
                const k = !!(c || l.title);
                return w("div", {
                    key: v ? 1 : 0,
                    class: P("content", {
                        isolated: !k
                    })
                }, [S(k)])
            }
        }
          , F = () => w("div", {
            class: [_a, P("footer")]
        }, [a.showCancelButton && w($e, {
            size: "large",
            text: a.cancelButtonText || ve("cancel"),
            class: P("cancel"),
            style: {
                color: a.cancelButtonColor
            },
            loading: d.cancel,
            disabled: a.cancelButtonDisabled,
            onClick: b
        }, null), a.showConfirmButton && w($e, {
            size: "large",
            text: a.confirmButtonText || ve("confirm"),
            class: [P("confirm"), {
                [Ka]: a.showCancelButton
            }],
            style: {
                color: a.confirmButtonColor
            },
            loading: d.confirm,
            disabled: a.confirmButtonDisabled,
            onClick: m
        }, null)])
          , G = () => w(vo, {
            class: P("footer")
        }, {
            default: () => [a.showCancelButton && w(kt, {
                type: "warning",
                text: a.cancelButtonText || ve("cancel"),
                class: P("cancel"),
                color: a.cancelButtonColor,
                loading: d.cancel,
                disabled: a.cancelButtonDisabled,
                onClick: b
            }, null), a.showConfirmButton && w(kt, {
                type: "danger",
                text: a.confirmButtonText || ve("confirm"),
                class: P("confirm"),
                color: a.confirmButtonColor,
                loading: d.confirm,
                disabled: a.confirmButtonDisabled,
                onClick: m
            }, null)]
        })
          , R = () => l.footer ? l.footer() : a.theme === "round-button" ? G() : F();
        return () => {
            const {width: c, title: y, theme: v, message: k, className: A} = a;
            return w(Ea, Ct({
                ref: u,
                role: "dialog",
                class: [P([v]), A],
                style: {
                    width: Na(c)
                },
                tabindex: 0,
                "aria-labelledby": y || k,
                onKeydown: I,
                "onUpdate:show": h
            }, xa(a, ko)), {
                default: () => [T(), x(), R()]
            })
        }
    }
});
let Ke;
const Co = {
    title: "",
    width: "",
    theme: null,
    message: "",
    overlay: !0,
    callback: null,
    teleport: "body",
    className: "",
    allowHtml: !1,
    lockScroll: !0,
    transition: void 0,
    beforeClose: null,
    overlayClass: "",
    overlayStyle: void 0,
    messageAlign: "",
    cancelButtonText: "",
    cancelButtonColor: null,
    cancelButtonDisabled: !1,
    confirmButtonText: "",
    confirmButtonColor: null,
    confirmButtonDisabled: !1,
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnPopstate: !0,
    closeOnClickOverlay: !1
};
let bo = ee({}, Co);
function Oo() {
    ({instance: Ke} = Ma({
        setup() {
            const {state: n, toggle: l} = Ga();
            return () => w(It, Ct(n, {
                "onUpdate:show": l
            }), null)
        }
    }))
}
function Tt(a) {
    return qa ? new Promise( (n, l) => {
        Ke || Oo(),
        Ke.open(ee({}, bo, a, {
            callback: u => {
                (u === "confirm" ? n : l)(u)
            }
        }))
    }
    ) : Promise.resolve(void 0)
}
const ys = a => Tt(ee({
    showCancelButton: !0
}, a))
  , hs = Me(It)
  , Io = {
    0: "--",
    1: "t1246",
    2: "t126",
    3: "t128",
    4: "t266",
    5: "t126"
}
  , To = {
    text: "accountNo",
    value: "walletId"
}
  , Bo = ["ImageUpload", "FileUpload"]
  , Po = ["UsdtAddress", "BankAccountNumber", "PixAccount", "EWallet", "UpiWallet"]
  , So = ["PixType", "BankName"]
  , Ao = {
    walletDelete: [16, 20],
    bankDelete: [14, 18],
    USDTDelete: [13, 19],
    withdrawPwd: [22, 21]
}
  , xo = 1024 * 1024 * 10
  , Do = 1024 * 1024 * 100
  , No = ["video/mp4", "video/quicktime"]
  , Eo = ["image/jpg", "image/png", "image/jpeg", "application/pdf", "video/mp4", "video/quicktime"];
function Lo(a) {
    return {
        Account: {
            RegExp: "^.{1,64}$"
        },
        UserId: {
            RegExp: "^[0-9]{1,20}$"
        },
        UserName: {
            RegExp: "^.{1,35}$"
        },
        TextContent: {
            RegExp: "^.{1,40}$"
        },
        Captcha: {
            RegExp: "^[a-zA-Z0-9]{6}$"
        },
        BankAccountNumber: {
            RegExp: "^[0-9]{6,25}$"
        },
        IFSC: {
            RegExp: "^[A-Z]{4}0[A-Z0-9]{6}$"
        },
        BankName: {
            RegExp: "^.{1,30}$"
        },
        DepositOrderNo: {
            disabled: !0
        },
        UsdtAddress: {
            RegExp: "^T[1-9A-HJ-NP-Za-km-z]{33}$"
        },
        UTR: {
            RegExp: "^[0-9]{12}$"
        },
        WithdrawOrderNo: {
            disabled: !0
        },
        OrderAmount: {
            disabled: !0
        },
        WithdrawAmount: {
            disabled: !0
        },
        PhoneEmailCaptcha: {
            RegExp: "^[0-9]{6}$"
        },
        NewWithdrawPassword: {
            RegExp: "^[0-9]{6}$"
        },
        NewPassword: {
            RegExp: "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{8,30}$",
            errorMessage: a("formatPwdError")
        },
        LongText: {
            type: "textarea"
        },
        FileUpload: {
            type: "file",
            tipText: "Upload"
        }
    }
}
function Fo(a) {
    return /^[a-zA-Z0-9@.]{8,64}$/.test(a)
}
function Ro(a) {
    return /^[a-zA-Z0-9]{6}$/.test(a)
}
function Wo(a) {
    return ja(a).format("YYYY-MM-DD HH:mm:ss")
}
function Uo(a) {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(a)
}
function $o(a, n) {
    var l;
    return new RegExp(((l = n[a]) == null ? void 0 : l.RegExp) || ".*")
}
function Ko(a) {
    return a.filter(n => {
        if (a.filter(u => u.workOrderTypeId === n.workOrderTypeId).length > 1) {
            const u = Math.max(...a.filter(d => d.workOrderTypeId === n.workOrderTypeId).map(d => d.sort || 0));
            return n.sort === u
        }
        return !0
    }
    ).filter( (n, l, u) => {
        const d = u.filter(f => f.workOrderTypeId === n.workOrderTypeId);
        if (d.length === 1)
            return !0;
        const h = d.map(f => u.indexOf(f))[0];
        return l === h
    }
    )
}
function _o(a, n, l) {
    const u = []
      , d = new Map;
    for (const i of a)
        d.set(i.workOrderTypeId, i);
    const h = {};
    for (const i in n) {
        const b = n[i];
        h[i] = b.every(m => d.has(m))
    }
    const f = {};
    for (const i of a) {
        const b = i.workOrderTypeId
          , m = Object.keys(n).find(I => n[I].includes(b));
        m && h[m] ? (n[m].forEach(I => {
            const T = d.get(I);
            T && (l[T.id] = T)
        }
        ),
        f[m] || (u.push(i),
        f[m] = !0)) : u.push(i)
    }
    return u
}
function qo(a, n, l) {
    var u;
    return !n && (a.typeCode === "NewPassword" || a.typeCode === "NewWithdrawPassword") ? "password" : ((u = l[a.typeCode || ""]) == null ? void 0 : u.type) || "text"
}
const ws = () => {
    const {t: a} = za()
      , n = Xa()
      , {userInfo: l} = Qa()
      , {onAnalyticsTrigger: u} = ao()
      , {tenantCurrency: d} = Va()
      , h = J( () => d.value === "INR")
      , f = o(!1)
      , i = o(!1)
      , b = o([])
      , m = o(!1)
      , I = o(!1)
      , T = o(!1)
      , S = o(null)
      , x = o("")
      , F = o("")
      , G = o(!1)
      , R = o(!1)
      , c = o(0)
      , y = o(!1);
    let v = null;
    const k = o(null)
      , A = o(null)
      , B = o("")
      , pe = J( () => {
        var e;
        return (((e = S.value) == null ? void 0 : e.bankCode) || "").toLowerCase().includes("slice")
    }
    )
      , ge = Lo(a)
      , Bt = Io
      , Pt = To
      , Ge = Bo
      , me = Po
      , ye = So
      , j = Ao
      , St = e => Fo(String(e))
      , je = o({})
      , U = o()
      , he = o([])
      , te = J( () => {
        var s;
        const e = ((s = l.value) == null ? void 0 : s.userId) || ""
          , t = localStorage.getItem(so.TOKEN);
        return e && t
    }
    )
      , ae = o(!1)
      , ze = o(!1)
      , z = o(!1)
      , Ve = o(!1)
      , He = o([])
      , oe = o({})
      , se = o("")
      , Ye = o()
      , we = o(!0)
      , Ze = o()
      , $ = M({})
      , ke = M({
        account: "",
        pageSize: 10,
        pageNo: 1
    })
      , Ce = o("selfService")
      , Qe = o(!1)
      , D = o([])
      , W = M({
        id: "",
        captchaId: "",
        code: "",
        file: ""
    })
      , ne = o(!1)
      , be = o([])
      , Oe = o([])
      , Xe = o([])
      , Je = o(!1)
      , et = o()
      , tt = o(0)
      , re = o(10)
      , V = o(1)
      , Ie = o(!1)
      , H = o(new Map)
      , le = o("");
    let K = null;
    const Y = o(!1)
      , at = o([])
      , Te = o([])
      , Be = 60
      , ot = o([])
      , _ = o(!1)
      , st = o(!1)
      , N = o({})
      , nt = M({})
      , Z = M(new Map)
      , Pe = o()
      , E = Ha()
      , At = Ya();
    let {serviceId: q, typeId: C, amount: rt, orderNo: ce, payTypeId: lt, payName: xt} = At.query;
    const Q = o([])
      , Se = o([])
      , ct = o("")
      , Ae = o()
      , ue = o(!1)
      , ie = o(!1)
      , xe = o("")
      , De = o(!1)
      , Dt = (e, t) => _o(e, t, nt)
      , Nt = e => {
        E.push({
            name: e,
            query: {
                serviceId: q
            }
        })
    }
      , ut = () => {
        history.go(-1)
    }
      , Et = Uo
      , Lt = Wo
      , it = async (e=!1) => {
        e ? yt(["serviceListall"]).then(t => {
            U.value = (t == null ? void 0 : t.serviceListall) || []
        }
        ) : yt(["serviceList"]).then(t => {
            U.value = (t == null ? void 0 : t.serviceList) || []
        }
        );
        try {
            const {data: t, code: s} = await Go({});
            if (s === 0) {
                if (e) {
                    const r = Array.isArray(t) ? Ko(t) : [t];
                    U.value = r,
                    ht("serviceListall", r)
                } else {
                    const r = Array.isArray(t) ? Dt(t, j) : [t];
                    U.value = r,
                    ht("serviceList", r)
                }
                We()
            }
        } catch {
            We()
        }
    }
      , Ft = () => {
        E.push({
            name: "workOrderProgress"
        })
    }
      , Rt = e => {
        const t = Object.keys(j).find(s => j[s].includes(e.workOrderTypeId));
        if (t) {
            const s = j[t]
              , r = Object.values(nt).find(p => p.workOrderTypeId !== e.workOrderTypeId && s.includes(p.workOrderTypeId));
            if (r)
                return Z.set(0, t),
                Z.set(e.workOrderTypeId, e),
                Z.set(r.workOrderTypeId, r),
                z.value = !0
        }
        if (e.workOrderTypeId === 4)
            return E.push({
                name: "DepositHistory"
            });
        if (e.workOrderTypeId === 5)
            return E.push({
                name: "WithdrawHistory"
            });
        E.push({
            name: "selfService",
            query: {
                serviceId: e.id,
                typeId: e.workOrderTypeId
            }
        })
    }
      , Wt = e => {
        const t = Z.get(j[Z.get(0)][e]);
        !t.id || !t.workOrderTypeId || (E.push({
            name: "selfService",
            query: {
                serviceId: t.id,
                typeId: t.workOrderTypeId
            }
        }),
        z.value = !1)
    }
      , Ut = () => {
        E.push({
            name: "faqModules"
        })
    }
      , $t = async () => {
        const {data: e, code: t} = await es({});
        t === 0 && (je.value = e || {})
    }
      , de = e => {
        N.value[e] = [],
        H.value.delete(e)
    }
      , Kt = () => {
        D.value.sort( (e, t) => {
            const s = e.typeCode === "FileUpload" || e.typeCode === "ImageUpload"
              , r = t.typeCode === "FileUpload" || t.typeCode === "ImageUpload";
            if (s && !r)
                return 1;
            if (!s && r)
                return -1;
            const p = e.sort ?? 0
              , O = t.sort ?? 0;
            return p - O
        }
        )
    }
      , _t = async e => {
        const t = e === "PixType" ? "PIX" : "BankCard"
          , {code: s, data: r} = await co({
            withdrawType: t
        });
        s === 0 && Array.isArray(r) && (Te.value = r.map(p => ({
            accountNo: p.name,
            walletId: p.code
        })),
        Se.value = [...Te.value])
    }
      , qt = async e => {
        let t = "BankCard";
        e === "UsdtAddress" ? t = "USDT" : e === "EWallet" ? t = "EWallet" : e === "PixAccount" ? t = "PIX" : e === "UpiWallet" && (t = "UPI");
        const {data: s, code: r} = await uo({
            withdrawType: t
        });
        r === 0 && (at.value = Array.isArray(s) ? s : [])
    }
      , Mt = async e => {
        const t = Array.isArray(e) ? e[0] : e;
        if (!Eo.includes(t.type))
            return n.error("The uploaded file type is incorrect."),
            Promise.reject();
        if (No.includes(t.type)) {
            if (t.size > Do)
                return n.error("The size cannot exceed 100M"),
                Promise.reject()
        } else if (t.size > xo)
            return n.error("The size cannot exceed 10M"),
            Promise.reject();
        return Promise.resolve(e)
    }
    ;
    function Gt(e, t, s) {
        return async function(r) {
            if (!r.file)
                return de(e);
            to({
                duration: 5e4,
                message: "Loading"
            });
            let p = 0;
            Reflect.set($, e, {
                status: "uploading",
                message: p
            });
            const O = setInterval( () => {
                p < 80 && (p += 10,
                Reflect.set($, e, {
                    status: "uploading",
                    message: p
                }))
            }
            , 500);
            r.status = "uploading";
            const L = {
                file: r.file
            };
            try {
                const {code: gt, data: X, msg: Ia} = await as(L);
                if (We(),
                gt === 0 && (X != null && X.imagePath)) {
                    const Ta = {
                        typeCode: t,
                        fieldId: e,
                        fieldValue: `${X.imagePath}?${X.fileName}`
                    };
                    H.value.set(e, Ta),
                    r.status = "done",
                    Reflect.set($, e, {
                        status: "uploading",
                        message: 100
                    }),
                    setTimeout( () => {
                        Reflect.set($, e, {
                            status: "done",
                            message: 100
                        })
                    }
                    , 300)
                } else
                    de(e),
                    Reflect.set($, e, {
                        status: "failed",
                        message: 100
                    }),
                    r.status = "failed",
                    n.error(Ia || "Upload Failed")
            } catch {
                r.status = "failed",
                de(e),
                n.error("Upload Failed")
            } finally {
                clearInterval(O)
            }
        }
    }
    const jt = () => {
        D.value.forEach(e => {
            e.id !== void 0 && (["OrderAmount", "WithdrawAmount"].includes(e.typeCode) && rt ? N.value[e.id] = rt : (e.typeCode === "DepositOrderNo" && ce || e.typeCode === "WithdrawOrderNo" && ce) && (N.value[e.id] = ce))
        }
        )
    }
      , zt = async () => {
        const {data: e, code: t} = await zo({
            formId: Number(q)
        });
        t === 0 && (ot.value = (e == null ? void 0 : e.outLinkList) || [],
        Ce.value = (e == null ? void 0 : e.formTitle) || "outLinkService")
    }
      , Vt = async () => {
        const {data: e, code: t} = await jo({
            formId: Number(q)
        });
        t === 0 && (D.value = (e == null ? void 0 : e.formFields) || [],
        Ce.value = (e == null ? void 0 : e.displayName) || "selfService",
        Qe.value = !!(e != null && e.hasUserGuide) || !1,
        D.value.forEach(s => {
            s.typeCode === "Captcha" && (De.value = !0,
            W.id = String(s.id),
            Le()),
            s.typeCode && ye.includes(s.typeCode) && te.value && _t(s.typeCode),
            s.typeCode && me.includes(s.typeCode) && te.value && qt(s.typeCode)
        }
        ),
        Kt(),
        (C === "4" || C === "5") && D.value.length > 0 && jt())
    }
      , Ht = async () => {
        var e, t;
        if (C)
            if (C === "1")
                zt();
            else {
                if ((C === "4" || C === "5" || C === "2") && (await it(),
                q = (t = (e = U.value) == null ? void 0 : e.find(s => s.workOrderTypeId === Number(C))) == null ? void 0 : t.id,
                !q))
                    return n.error("The work order configuration could not be retrieved."),
                    ut();
                (C === "4" || C === "5") && Ee(),
                Vt()
            }
    }
      , Yt = e => qo(e, ue.value, ge)
      , Zt = e => Ro(String(e))
      , Qt = [{
        required: !0,
        message: a("t53")
    }, {
        validator: Zt,
        message: a("captchaError"),
        trigger: "onBlur"
    }]
      , Xt = e => $o(e, ge)
      , Jt = async () => {
        var s, r;
        const e = {
            verifyCodeType: 1,
            phoneOrEmail: (r = (s = l.value) == null ? void 0 : s.verifyMethods) == null ? void 0 : r.phone,
            codeType: 15
        };
        if (!e.phoneOrEmail)
            return n.error("No mobile number bound");
        (await eo(e)).code === 0 && (n.success(a("t52")),
        ea(Be),
        Ie.value = !0)
    }
      , ea = e => {
        let t = e;
        le.value = t,
        K = setInterval( () => {
            t--,
            le.value = t,
            t <= 0 && (clearInterval(K),
            Ie.value = !1,
            le.value = "")
        }
        , 1e3)
    }
      , ta = () => D.value.map(t => ({
        typeCode: t.typeCode,
        fieldId: t.id,
        fieldValue: t.id ? N.value[t.id] : ""
    })).filter(t => t.fieldValue && t.fieldValue !== "" && !Ge.includes(t.typeCode || ""))
      , aa = () => {
        ue.value = !ue.value
    }
      , oa = () => {
        ie.value = !1,
        xe.value = "",
        Q.value = Se.value
    }
      , sa = e => {
        la()
    }
      , na = e => {
        ye.includes(e.typeCode) ? Q.value = Te.value : me.includes(e.typeCode) && (Q.value = at.value),
        ie.value = !0,
        Ae.value = e
    }
      , ra = ({selectedValues: e, selectedOptions: t}) => {
        D.value.forEach(s => {
            var r, p, O, L;
            s.id === ((r = Ae.value) == null ? void 0 : r.id) && (s.name = (p = t[0]) == null ? void 0 : p.accountNo,
            N.value[s.id] = `${(O = t[0]) == null ? void 0 : O.walletId}|${(L = t[0]) == null ? void 0 : L.accountNo}`)
        }
        ),
        ie.value = !1
    }
      , la = Ja( () => {
        const e = [];
        Se.value.forEach(t => {
            t.accountNo.toUpperCase().indexOf(xe.value.toUpperCase()) > -1 && e.push(t)
        }
        ),
        Q.value = e
    }
    , 300)
      , ca = () => {}
      , ua = () => {
        const e = {
            formId: Number(q),
            workOrderTypeId: Number(C),
            formFields: [...ta(), ...H.value.values()]
        };
        return Number(C) === 4 && (e.payTypeId = lt ? Number(lt) : 0,
        e.payName = xt || ""),
        De.value && W.captchaId && (e.captchaId = W.captchaId),
        e
    }
      , Ne = async e => {
        if (!_.value) {
            _.value = !0;
            try {
                const t = await Yo(e);
                t.code === 0 ? (u("cs_ticket_submit", {
                    category: e.workOrderTypeId
                }),
                fe(),
                n.success(a("submitSuccessTip")),
                setTimeout( () => {
                    _.value = !1,
                    E.replace({
                        name: "workOrder"
                    })
                }
                , 3e3)) : (De.value && t.msgCode === 5019 && (N.value[Number(W.id)] = "",
                Le()),
                (t.msgCode === 14022 || t.msgCode === 14023) && (x.value = ""),
                setTimeout( () => {
                    _.value = !1
                }
                , 1500))
            } catch {
                _.value = !1
            }
        }
    }
      , ia = async () => {
        var e;
        _.value || (e = Pe.value) == null || e.validate().then(async () => {
            const t = ua();
            if ([4, 5].includes(Number(C)) && h.value && (i.value || await Ee(),
            f.value && b.value.length > 0)) {
                k.value = t,
                A.value = null,
                dt();
                return
            }
            await Ne(t)
        }
        )
    }
      , Ee = async () => {
        if (!h.value) {
            f.value = !1,
            i.value = !0;
            return
        }
        if (!m.value) {
            m.value = !0;
            try {
                const e = await os({});
                e.msgCode === 0 ? (f.value = !0,
                b.value = Array.isArray(e.data) ? e.data : []) : f.value = !1
            } catch {
                f.value = !1
            } finally {
                i.value = !0,
                m.value = !1
            }
        }
    }
      , dt = () => {
        var e, t;
        S.value = null,
        x.value = "",
        F.value = "",
        B.value = ((t = (e = l.value) == null ? void 0 : e.verifyMethods) == null ? void 0 : t.phone) || "",
        I.value = !0
    }
      , da = e => {
        S.value = e,
        x.value = "",
        F.value = "",
        T.value = !0
    }
      , fa = async () => {
        var t;
        if (R.value || G.value)
            return;
        if (!B.value)
            return n.error(a("t4"));
        const e = (t = S.value) == null ? void 0 : t.bankCode;
        if (e) {
            G.value = !0;
            try {
                const s = await ss({
                    phoneNumber: B.value,
                    bankCode: e
                });
                s.msgCode === 0 ? (n.success(a("t52")),
                ft(Be)) : s.msgCode === 14018 && ft(Be)
            } finally {
                G.value = !1
            }
        }
    }
      , ft = e => {
        R.value = !0,
        c.value = e,
        v && clearInterval(v),
        v = setInterval( () => {
            c.value--,
            c.value <= 0 && (clearInterval(v),
            v = null,
            R.value = !1,
            c.value = 0)
        }
        , 1e3)
    }
      , va = async () => {
        if (!k.value)
            return fe();
        await Ne(k.value)
    }
      , pa = async () => {
        var t;
        if (y.value)
            return;
        const e = ((t = S.value) == null ? void 0 : t.bankCode) || "";
        if (e) {
            if (!x.value)
                return n.error(a("t53"));
            if (pe.value && !F.value)
                return n.error(a("t1426"));
            y.value = !0;
            try {
                const s = await ns({
                    phoneNumber: B.value,
                    bankCode: e,
                    otpCode: x.value,
                    pin: pe.value ? F.value : ""
                });
                if (s.msgCode !== 0 || !s.data)
                    return;
                const r = s.data;
                if (A.value) {
                    const O = A.value
                      , L = await rs({
                        workOrderId: String((O == null ? void 0 : O.id) ?? (O == null ? void 0 : O.workOrderNo) ?? ""),
                        phoneNumber: B.value,
                        bankCode: e,
                        otpToken: r
                    });
                    L.msgCode === 0 ? (n.success(a("submitSuccessTip")),
                    fe()) : (L.msgCode === 14022 || L.msgCode === 14023) && (x.value = "");
                    return
                }
                const p = {
                    ...k.value || {},
                    kycBankCode: e,
                    kycPhoneNumber: B.value,
                    kycOtpToken: r
                };
                await Ne(p)
            } finally {
                y.value = !1
            }
        }
    }
      , ga = e => {
        k.value = null,
        A.value = e,
        dt()
    }
      , fe = () => {
        T.value = !1,
        I.value = !1,
        A.value = null,
        v && (clearInterval(v),
        v = null),
        R.value = !1,
        c.value = 0
    }
    ;
    Za( () => {
        v && (clearInterval(v),
        v = null),
        K && (clearInterval(K),
        K = null)
    }
    );
    const Le = async () => {
        if (!ne.value)
            try {
                ne.value = !0;
                const e = await ts({});
                e.code === 0 && (W.file = "data:image/png;base64," + e.data.imageFile,
                W.captchaId = e.data.captchaId)
            } catch {} finally {
                ne.value = !1
            }
    }
      , ma = () => {
        te.value ? Fe() : we.value = !1
    }
      , Fe = async () => {
        var e;
        try {
            Y.value = !0;
            const t = await Mo(ke);
            t.code === 0 && oo(t.data.list) ? (we.value = !0,
            he.value.push(...t.data.list),
            ae.value = he.value.length >= ((e = t.data) == null ? void 0 : e.totalCount)) : ae.value = !0
        } catch {} finally {
            Y.value = !1
        }
    }
      , ya = async () => {
        ae.value || (ke.pageNo += 1,
        await Fe())
    }
      , ha = async () => {
        var e;
        (e = Pe.value) == null || e.validate().then(async () => {
            ke.account = String(Ze.value),
            await Fe()
        }
        )
    }
      , wa = async (e, t=!0) => {
        if (!t) {
            Tt({
                className: "remind-dialog",
                message: a("remindText")
            });
            return
        }
        e.isBtnDisabled = !0;
        const {code: s} = await Qo({
            orderId: e.id,
            userId: e.userId ?? 0
        });
        s === 0 && (st.value = !0,
        window.setTimeout( () => {
            ze.value = !1
        }
        , 300 * 1e3))
    }
      , ka = async e => {
        const t = await Zo({
            orderId: e.workOrderNo,
            userId: e.userId ?? 0
        });
        t.code === 0 && (He.value = (t.data ?? []).slice().sort( (s, r) => (s.commentAt || 0) - (r.commentAt || 0)),
        Ve.value = !0)
    }
      , Ca = e => {
        oe.value = e,
        z.value = !0
    }
      , ba = async () => {
        var p;
        const e = (p = H.value.get("commit")) == null ? void 0 : p.fieldValue
          , t = {};
        if (!se.value && !e) {
            n.fail(a("inputMessage"));
            return
        }
        e && e.split("?").length > 1 && (t.attachmentName = e.split("?")[1],
        t.attachmentPath = e.split("?")[0]);
        const s = {
            orderId: oe.value.workOrderNo,
            userId: oe.value.userId ?? 0,
            commentContent: se.value,
            ...t
        };
        (await Ho(s)).code === 0 && (vt(),
        n.success(a("submitSuccess")))
    }
      , vt = () => {
        se.value = "",
        H.value.clear(),
        Ye.value = [],
        z.value = !1
    }
      , Oa = async () => {
        const {data: e, code: t} = await Xo({});
        t === 0 && (be.value = e,
        pt(0))
    }
      , pt = e => {
        var t;
        Oe.value = (t = be.value[e]) == null ? void 0 : t.questionTitle,
        Re()
    }
      , Re = () => {
        const e = (V.value - 1) * re.value
          , t = e + re.value;
        tt.value = Math.ceil(Oe.value.length / re.value),
        Xe.value = Oe.value.slice(e, t)
    }
    ;
    return {
        getServiceList: it,
        getHomeConfig: $t,
        serviceList: U,
        handleQueryProgress: Ft,
        goServicePage: Rt,
        formItemData: D,
        formData: N,
        captchaRules: Qt,
        initServiceData: Ht,
        handleSubmit: ia,
        formRef: Pe,
        serviceName: Ce,
        afterRead: Gt,
        beforeRead: Mt,
        smsCodeBtn: Ie,
        countdown: K,
        getSmsCode: Jt,
        codeText: le,
        fileTypes: Ge,
        fileDelete: de,
        initProgessPage: ma,
        loading: Y,
        goToFaq: Ut,
        getFaqData: Oa,
        faqDataList: be,
        faqContList: Xe,
        onClickTab: e => {
            const {name: t} = e;
            V.value = 1,
            pt(t)
        }
        ,
        showQuester: async e => {
            const {code: t, data: s} = await Jo({
                faqId: e
            });
            t === 0 && (et.value = s,
            Je.value = !0)
        }
        ,
        faqDialog: Je,
        faqAnswer: et,
        totalPage: tt,
        pageNo: V,
        pPage: () => {
            V.value--,
            Re()
        }
        ,
        nPage: () => {
            V.value++,
            Re()
        }
        ,
        pageSize: re,
        captchaObj: W,
        captchaLoading: ne,
        getCaptcode: Le,
        progressList: he,
        handleReminders: wa,
        finished: ae,
        isBtnDisabled: ze,
        fieldConfig: ge,
        checkMore: ka,
        showDialogForm: z,
        showPopover: Ve,
        commitList: He,
        getCoursePage: async e => {
            try {
                Y.value = !0;
                const t = {
                    formId: e
                }
                  , {code: s, data: r} = await Vo(t);
                s === 0 && (ct.value = r.userGuideContent)
            } catch {} finally {
                Y.value = !1
            }
        }
        ,
        courseContent: ct,
        homeConfig: je,
        pattern: Xt,
        handleConfirm: ba,
        currentData: oe,
        handleReply: Ca,
        messageText: se,
        commitImg: Ye,
        onBeforeClose: vt,
        workOrderStatus: Bt,
        typeId: C,
        outlinkData: ot,
        columnsData: Q,
        customFieldName: Pt,
        isVisible: ue,
        showPickerSearch: ie,
        keyWord: xe,
        changeI: aa,
        handleCancel: oa,
        handleSearch: sa,
        onConfirm: ra,
        openPopup: ca,
        hasUserGuide: Qe,
        goToRoute: Nt,
        checkAccount: St,
        progressSubmit: ha,
        showProgress: we,
        account: Ze,
        dateFormat: Lt,
        isImageUrl: Et,
        onLoad: ya,
        getFieldType: Yt,
        goB: ut,
        selectTypes: me,
        typeTypes: ye,
        selectPicker: na,
        userInfo: l,
        selectId: Ae,
        isLogin: te,
        showRemider: st,
        goAutoServicePage: Wt,
        fileStatus: $,
        isINR: h,
        kycAvailable: f,
        checkKycAvailable: Ee,
        kycBankList: b,
        kycBankLoading: m,
        showKycBankSelect: I,
        showKycOtpDialog: T,
        kycSelectedBank: S,
        kycOtpCode: x,
        kycPin: F,
        kycPinRequired: pe,
        kycPhone: B,
        kycOtpBtnDisabled: R,
        kycOtpCountdown: c,
        kycConfirmLoading: y,
        selectKycBank: da,
        sendKycOtp: fa,
        submitWithoutKyc: va,
        confirmKycOtp: pa,
        startKycReverify: ga,
        closeKycFlow: fe
    }
}
  , Mo = a => g.post("/WorkOrder/GetPageList", a)
  , Go = a => g.post("/WorkOrder/GetFormList", a)
  , jo = a => g.post("/WorkOrder/GetFormFieldList", a)
  , zo = a => g.post("/WorkOrder/GetOutLinkList", a)
  , Vo = a => g.post("/WorkOrder/GetFormTutorialInfo", a)
  , Ho = a => g.post("/WorkOrder/SubmitComment", a)
  , Yo = a => g.post("/WorkOrder/Submit", a)
  , Zo = a => g.post("/WorkOrder/GetCommentList", a)
  , Qo = a => g.post("/WorkOrder/SendReminder", a)
  , Xo = a => g.post("/WorkOrder/GetFaqList", a)
  , Jo = a => g.post("/WorkOrder/GetFaqDetail", a)
  , es = a => g.post("/WorkOrder/GetHomePageConfigs", a)
  , ts = a => g.post("/WorkOrder/GetCaptcha", a)
  , ks = a => g.post("/WorkOrder/DataCheckByOrderNo", a)
  , as = a => g.upload("/WorkOrder/UploadToOss", a)
  , os = a => g.post("/WorkOrder/GetKycBankList", a)
  , ss = a => g.post("/WorkOrder/SendKycOtpCode", a)
  , ns = a => g.post("/WorkOrder/VerifyKycOtpCode", a)
  , rs = a => g.post("/WorkOrder/ReVerifyKycOtpCode", a);
export {hs as D, Tt as a, ks as d, ys as s, ws as u};
