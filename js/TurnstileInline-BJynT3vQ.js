import {
    b7 as x,
    a as y,
    Q as b,
    O as k,
    ai as I,
    aY as m,
    aT as p,
    a$ as w,
    b9 as E,
    r as u,
    ch as C,
    ci as S,
    aX as V
} from "./index-xnhGKCfe.js";
const B = {
        class: "turnstile-inline"
    },
    F = {
        class: "turnstile-box"
    },
    W = {
        key: 0,
        class: "loading-text"
    },
    M = x({
        __name: "TurnstileInline",
        emits: ["verify", "error", "expired"],
        setup(N, {
            expose: h,
            emit: g
        }) {
            const {
                currentTheme: _
            } = S(), {
                turnstileSiteKey: l
            } = y(), c = g, s = u(null), t = u(null), r = u(!1), n = u(""), T = () => new Promise((e, o) => {
                if (window.turnstile) {
                    e();
                    return
                }
                if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
                    const a = setInterval(() => {
                        window.turnstile && (clearInterval(a), e())
                    }, 100);
                    setTimeout(() => {
                        clearInterval(a), o(new Error("Turnstile script load timeout"))
                    }, 1e4);
                    return
                }
                const i = document.createElement("script");
                i.src = "https://challenges.cloudflare.com/turnstile/v0/api.js", i.async = !0, i.onload = () => {
                    const a = setInterval(() => {
                        window.turnstile && (clearInterval(a), e())
                    }, 100);
                    setTimeout(() => {
                        clearInterval(a), o(new Error("Turnstile init timeout"))
                    }, 1e4)
                }, i.onerror = () => o(new Error("Failed to load Turnstile script")), document.head.appendChild(i)
            }), d = async () => {
                if (s.value) {
                    if (!l.value) {
                        n.value = "Verification is not configured";
                        return
                    }
                    t.value && f(), r.value = !0, n.value = "";
                    try {
                        if (await T(), !window.turnstile || !s.value) {
                            n.value = "Failed to load verification component";
                            return
                        }
                        t.value = window.turnstile.render(s.value, {
                            sitekey: l.value,
                            size: "flexible",
                            theme: C(_.value),
                            "refresh-timeout": "manual",
                            "refresh-expired": "manual",
                            language: "en",
                            callback: e => {
                                r.value = !1, c("verify", e)
                            },
                            "error-callback": e => {
                                r.value = !1, n.value = "Verification failed, please try again", c("error", e)
                            },
                            "expired-callback": () => {
                                r.value = !1, n.value = "Verification expired, please retry", c("expired"), v()
                            }
                        })
                    } catch (e) {
                        n.value = e instanceof Error ? e.message : "Failed to load verification component"
                    } finally {
                        r.value = !1
                    }
                }
            }, v = () => {
                t.value && window.turnstile && window.turnstile.reset(t.value)
            }, f = () => {
                t.value && window.turnstile && (window.turnstile.remove(t.value), t.value = null)
            };
            return b(() => l.value, e => {
                e && d()
            }), k(() => {
                l.value && d()
            }), I(() => {
                f()
            }), h({
                reset: v,
                render: d
            }), (e, o) => (p(), m("div", B, [w("div", F, [w("div", {
                ref_key: "turnstileContainer",
                ref: s,
                id: "turnstile-widget"
            }, null, 512)]), r.value ? (p(), m("p", W, "Loading...")) : E("", !0)]))
        }
    }),
    G = V(M, [
        ["__scopeId", "data-v-d8bba3fb"]
    ]);
export {
    G as T
};