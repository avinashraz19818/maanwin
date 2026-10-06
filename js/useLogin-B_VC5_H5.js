import {
    t as Je,
    a as Ke,
    Z as je,
    _ as ze,
    u as Xe,
    X as Ye,
    r as i,
    $ as Ze,
    c as le,
    h as Qe,
    n as w,
    a0 as k,
    s as d,
    a1 as Re,
    z as ea,
    a2 as se,
    a3 as oe,
    a4 as ne,
    a5 as aa,
    a6 as ta,
    a7 as la,
    a8 as ie,
    B as sa,
    a9 as oa,
    aa as na,
    ab as ia,
    ac as ra,
    ad as ua
} from "./index-xnhGKCfe.js";
const {
    trackEvent: va
} = oa(), $ = Ye({
    isEmail: !0
}), G = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var re = (v => (v[v.Password = 0] = "Password", v[v.OTP = 1] = "OTP", v))(re || {});
const fa = v => {
    const ue = typeof v == "object" && v !== null && !("value" in v) ? v : {
            captchaRef: v
        },
        {
            captchaRef: l,
            phoneInputRef: A,
            initialMode: ve = 0,
            onLoginSuccess: U,
            isOnlyLogin: V
        } = ue,
        B = Je(),
        {
            set_token: ce,
            browserId: ge,
            getTransferConfig: de,
            turnstileSiteKey: fe,
            isOpenLoginTurnstileVerify: me
        } = Ke(),
        {
            getUserInfo: _,
            setCanBet: ye
        } = ea(),
        {
            emitFBToken: Ie
        } = sa(),
        {
            getPackInfo: x
        } = je(),
        {
            guestLogin: pe
        } = ze(),
        {
            onAnalyticsTrigger: H
        } = Qe(),
        {
            getFbp: we,
            getFbc: Pe,
            getTtcsid: Te
        } = ia(),
        {
            t: P
        } = Xe(),
        y = i(ve),
        f = i(!1),
        W = i(!1),
        u = i(""),
        T = i(!1),
        C = localStorage.getItem("loginType") || "Mobile";
    $.isEmail = C !== "Mobile";
    const a = i({
            loginType: C,
            userName: C === "Mobile" ? localStorage.getItem("PUM") : localStorage.getItem("EUM") || "",
            password: C === "Mobile" ? localStorage.getItem("PPWD") : localStorage.getItem("EPWD") || "",
            verifyCode: void 0,
            captchaId: void 0,
            googleCode: void 0,
            track: void 0
        }),
        c = i(localStorage.getItem("isRememberPwd") === "1"),
        E = i(""),
        o = i(""),
        I = i(""),
        h = i(""),
        L = i({
            Area: ""
        }),
        q = i(!1),
        O = i(!1),
        J = i(!1),
        K = i(!1),
        Ee = le(() => $.isEmail),
        {
            loadingText: he,
            getVerifyCode: j,
            disabled: Se,
            time: be
        } = Ze(ua),
        Ce = () => {
            y.value = y.value === 0 ? 1 : 0, o.value = "", I.value = "", h.value = "", u.value = ""
        },
        Ne = e => {
            y.value = e, o.value = "", I.value = "", h.value = "", u.value = ""
        },
        ke = e => {
            E.value = e, a.value.userName = ""
        },
        S = () => `${E.value}${a.value.userName}`.trim(),
        Ae = () => a.value.loginType === "Email" ? `${a.value.userName||""}`.trim() : S(),
        Le = async () => {
            let e = [];
            const t = se(),
                s = t == null ? void 0 : t.eventConfigId;
            !!t && s != null && s !== "" && s !== 0 && s !== "0" && (e = [{
                eventConfigId: t.eventConfigId,
                eventType: (t == null ? void 0 : t.analyticsEventType) || "",
                eventIdentityInfo: JSON.stringify({
                    PixelId: t.eventToken || "",
                    Fbp: await we() || "",
                    Fbc: Pe() || "",
                    Ttcsid: Te() || ""
                })
            }]);
            const n = await ra();
            return n != null && n.length && (e = n), {
                eventIdentity: e,
                eventInfo: t
            }
        },
        z = async () => {
            var s, r, n;
            const {
                eventIdentity: e,
                eventInfo: t
            } = await Le();
            return {
                deviceId: ((s = w) == null ? void 0 : s.getDeviceId()) || ((r = ne.readEventConfigFromUrl()) == null ? void 0 : r.deviceId) || "",
                browserId: ge.value || "",
                packageName: ((n = w) == null ? void 0 : n.getPackId()) || (t == null ? void 0 : t.channelPackageName) || "",
                eventIdentity: ie(e).length ? ie(e) : void 0
            }
        },
        Me = (e, t) => {
            e == "loginType" && ($.isEmail = t !== "Mobile", t == "Mobile" ? (a.value.userName = c.value && localStorage.getItem("PUM") || "", a.value.password = c.value && localStorage.getItem("PPWD") || "") : (a.value.userName = c.value && localStorage.getItem("EUM") || "", a.value.password = c.value && localStorage.getItem("EPWD") || ""), o.value = "", I.value = "", u.value = ""), a.value[e] = t
        },
        m = () => {
            a.value.captchaId = void 0, a.value.track = void 0, u.value = ""
        },
        X = le(() => y.value !== 0 || !me.value ? !1 : !!fe.value),
        De = async e => {
            if (!e) {
                d("Verification failed, please try again");
                return
            }
            u.value = e, W.value = !1, await M()
        },
        Fe = e => {
            u.value = e
        },
        Y = async e => {
            var t;
            sessionStorage.setItem(k.ActivityPopupShowKey, "false"), m(), ce(e), ye(e.canBet), e.packageTransferConfig && de(e.packageTransferConfig, !0), Ie(), await va(na.Login), (t = l == null ? void 0 : l.value) == null || t.setShowHiden(!1), await _(!0), await x(), H("login_success"), U && await U(e), await B.replace("/")
        },
        Z = async () => {
            var e, t;
            if (!ee()) return !1;
            if (X.value && !u.value) return d("Please complete the verification first"), !1;
            f.value = !0;
            try {
                const s = await z(),
                    r = a.value.loginType === "Email" ? "Email" : "Mobile",
                    n = { ...a.value,
                        loginType: r,
                        userName: r === "Email" ? `${a.value.userName||""}`.trim() : S(),
                        ...u.value ? {
                            turnstileToken: u.value
                        } : {},
                        ...s
                    };
                delete n.verifyCode;
                const {
                    msgCode: g,
                    code: p,
                    data: b,
                    msg: N
                } = await la(n);
                return g === 143 || g === 5008 ? (a.value.captchaId = void 0, a.value.track = void 0, T.value = !0, await R(), !1) : g === 5001 ? (d(P("m5001")), (e = l == null ? void 0 : l.value) == null || e.setShowHiden(!1), m(), T.value = !1, !1) : p === 0 ? (Be(), te(), T.value = !1, await Y(b), !0) : (u.value = "", d(N), _e(g), (t = l == null ? void 0 : l.value) == null || t.setShowHiden(!1), m(), T.value = !1, !1)
            } catch {
                return !1
            } finally {
                f.value = !1
            }
        },
        Q = async () => {
            var e, t, s, r, n, g;
            if (!ae()) return !1;
            f.value = !0;
            try {
                const p = await z(),
                    b = se(),
                    N = a.value.loginType === "Email" ? "Email" : "Mobile",
                    He = {
                        userName: N === "Email" ? `${a.value.userName||""}`.trim() : S(),
                        verifyCode: a.value.verifyCode,
                        registerDevice: ((e = w) == null ? void 0 : e.getDeviceId()) || ((t = ne.readEventConfigFromUrl()) == null ? void 0 : t.deviceId) || "",
                        registerFingerprint: p.browserId,
                        inviteCode: localStorage.getItem(oe.INVITE_CODE) || "",
                        packageName: ((s = w) == null ? void 0 : s.getPackId()) || (b == null ? void 0 : b.channelPackageName) || "",
                        ...((r = p.eventIdentity) == null ? void 0 : r.length) && {
                            eventIdentity: p.eventIdentity
                        },
                        ...V && {
                            isOnlyLogin: V
                        }
                    },
                    We = N === "Email" ? aa : ta,
                    {
                        code: qe,
                        data: Oe,
                        msgCode: D,
                        msg: F
                    } = await We(He);
                return D === 143 || D === 5008 ? (m(), d(F), !1) : D === 5001 ? (d(F), (n = l == null ? void 0 : l.value) == null || n.setShowHiden(!1), m(), !1) : qe === 0 ? (await Y(Oe), !0) : (u.value = "", d(F), (g = l == null ? void 0 : l.value) == null || g.setShowHiden(!1), m(), !1)
            } catch {
                return !1
            } finally {
                f.value = !1
            }
        },
        M = async e => (e && (a.value.track = e), y.value === 1 ? Q() : Z()),
        $e = async e => (a.value.track = e, M(e)),
        Ge = async e => {
            if ((a.value.loginType === "Email" ? "Email" : "Mobile") === "Mobile") {
                if (!(e || (() => {
                        var g;
                        const n = (g = A == null ? void 0 : A.value) == null ? void 0 : g.validPhone;
                        return typeof n == "function" ? !!n(a.value.userName) : !0
                    }))()) {
                    o.value = P("t783");
                    return
                }
                if (!a.value.userName) {
                    o.value = "Please enter your phone number";
                    return
                }
                await j({
                    verifyCodeType: 1,
                    phoneOrEmail: S(),
                    codeType: 18
                });
                return
            }
            const s = `${a.value.userName||""}`.trim();
            if (!s) {
                o.value = "Please enter the email";
                return
            }
            if (!G.test(s)) {
                o.value = "Please enter a valid email.";
                return
            }
            await j({
                verifyCodeType: 2,
                phoneOrEmail: s,
                codeType: 18
            })
        },
        Ue = async () => {
            f.value = !0;
            try {
                return await pe() ? (await x(), await _(!0), await B.replace({
                    name: "home"
                }), !0) : (localStorage.setItem(k.AutoLoginFailed, "true"), d("Guest login failed, please login with your account."), !1)
            } catch {
                return localStorage.setItem(k.AutoLoginFailed, "true"), d("Guest login failed, please login with your account."), !1
            } finally {
                f.value = !1
            }
        },
        Ve = () => (w.isEmbeddedApk() || w.isFullapk()) && !localStorage.getItem(k.AutoLoginFailed),
        Be = () => {
            if (localStorage.setItem("loginType", c.value ? a.value.loginType : ""), a.value.loginType == "Mobile") {
                const e = localStorage.getItem("quhao") || "";
                localStorage.setItem("PUM", c.value ? a.value.userName.replace(e, "") : ""), localStorage.setItem("PPWD", c.value ? a.value.password : "")
            } else localStorage.setItem("EUM", c.value ? a.value.userName : ""), localStorage.setItem("EPWD", c.value ? a.value.password : "")
        },
        _e = e => {
            [5004, 5002].includes(e) && (J.value = !0), [5003, 5009].includes(e) && (O.value = !0), e === 5016 && (q.value = !0), e === 5001 && (K.value = !0)
        },
        R = async () => {
            var s, r;
            (s = l == null ? void 0 : l.value) == null || s.startRequestGenerate();
            const {
                data: e,
                code: t
            } = await Re();
            t === 0 && (a.value.captchaId = e.captchaId, (r = l == null ? void 0 : l.value) == null || r.endRequestGenerate(e.backgroundImage, e.sliderImage))
        },
        ee = () => {
            var e;
            if (o.value = "", I.value = "", a.value.loginType === "Email") {
                const t = `${a.value.userName||""}`.trim();
                if (!t) return o.value = "Please enter the email", !1;
                if (!G.test(t)) return o.value = "Please enter a valid email.", !1
            } else if (!((e = a.value.userName) != null && e.toString().replace(L.value.Area, "").trim())) return o.value = P("t783"), !1;
            return a.value.password ? !0 : (I.value = "Please enter the password.", !1)
        },
        ae = () => {
            var e;
            if (o.value = "", h.value = "", a.value.loginType === "Email") {
                const t = `${a.value.userName||""}`.trim();
                if (!t) return o.value = "Please enter the email", !1;
                if (!G.test(t)) return o.value = "Please enter a valid email.", !1
            } else if (!((e = a.value.userName) != null && e.toString().replace(L.value.Area, "").trim())) return o.value = P("t783"), !1;
            return a.value.verifyCode ? !0 : (h.value = P("t1123"), !1)
        },
        xe = e => {
            L.value = e
        },
        te = () => {
            a.value.captchaId = void 0, a.value.googleCode = void 0, a.value.track = void 0, u.value = ""
        };
    return {
        loginForm: a,
        loginMode: y,
        loading: f,
        isEmail: Ee,
        isRememberPwd: c,
        phoneArea: E,
        loginAE: o,
        loginPE: I,
        verifyCodeError: h,
        googleDialog: q,
        banDialog: O,
        lockDialog: J,
        apDialog: K,
        showTurnstile: W,
        needTurnstileVerify: X,
        isAwaitingCaptcha: T,
        verifyCodeLoadingText: he,
        verifyCodeDisabled: Se,
        verifyCodeTime: be,
        setForm: Me,
        setPhoneArea: ke,
        setLoginMode: Ne,
        toggleLoginMode: Ce,
        changeArea: xe,
        closeGoogle: te,
        reset: m,
        initLastPhone: () => {
            const e = localStorage.getItem(oe.LASTPHONE);
            if (e && E.value) {
                const t = new RegExp(`^${E.value}`);
                a.value.userName = Number(e.replace(t, ""))
            }
        },
        login: Z,
        mobileLogin: Q,
        handleSubmit: M,
        captcheLogin: $e,
        handleGuestLogin: Ue,
        verify: ee,
        verifyOTP: ae,
        sendOTPCode: Ge,
        captcheRefresh: R,
        handleTurnstileVerify: De,
        setTurnstileToken: Fe,
        isShowGuestLogin: Ve,
        getFullPhoneNumber: S,
        getLoginAccount: Ae,
        triggerViewAuthPage: () => {
            H("view_auth_page", {
                page_type: "login"
            })
        },
        LoginMode: re
    }
};
export {
    re as L, fa as u
};