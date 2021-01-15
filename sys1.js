function Sys$Enum$parse(n, t) {
    var i, r, h, f, e, o, s, u, c;
    if (t) {
        if (((i = this.__lowerCaseValues), !i)) {
            this.__lowerCaseValues = i = {};
            f = this.prototype;
            for (e in f) i[e.toLowerCase()] = f[e];
        }
    } else i = this.prototype;
    if (this.__flags) {
        for (
            o = (t ? n.toLowerCase() : n).split(","), s = 0, u = o.length - 1; u >= 0; u--
        ) {
            if (((c = o[u].trim()), (r = i[c]), typeof r != "number"))
                throw Error.argument(
                    "value",
                    String.format(
                        Sys.Res.enumInvalidValue,
                        n.split(",")[u].trim(),
                        this.__typeName
                    )
                );
            s |= r;
        }
        return s;
    }
    if (((h = t ? n.toLowerCase() : n), (r = i[h.trim()]), typeof r != "number"))
        throw Error.argument(
            "value",
            String.format(Sys.Res.enumInvalidValue, n, this.__typeName)
        );
    return r;
}

function Sys$Enum$toString(n) {
    var r, t, i, u, e, o, f;
    if (typeof n == "undefined" || n === null) return this.__string;
    if (((r = this.prototype), this.__flags && n !== 0)) {
        if (((i = this.__sortedValues), !i)) {
            i = [];
            for (t in r) i[i.length] = { key: t, value: r[t] };
            i.sort(function(n, t) {
                return n.value - t.value;
            });
            this.__sortedValues = i;
        }
        for (u = [], e = n, t = i.length - 1; t >= 0; t--)
            if (
                ((o = i[t]), (f = o.value), f !== 0) &&
                (f & n) === f &&
                ((u[u.length] = o.key), (e -= f), e === 0)
            )
                break;
        if (u.length && e === 0) return u.reverse().join(", ");
    } else
        for (t in r)
            if (r[t] === n) return t;
    return "";
}

function Sys$Component$_setProperties(n, t) {
    var u,
        c = Object.getType(n),
        e = c === Object || c === Sys.UI.DomElement,
        l = Sys.Component.isInstanceOfType(n) && !n.get_isUpdating(),
        r,
        i,
        f,
        o,
        s;
    l && n.beginUpdate();
    for (r in t)
        if (
            ((i = t[r]), (f = e ? null : n["get_" + r]), e || typeof f != "function")
        )
            (o = n[r]),
            i && typeof i == "object" && (!e || o) ?
            Sys$Component$_setProperties(o, i) :
            (n[r] = i);
        else if (((s = n["set_" + r]), typeof s == "function")) s.apply(n, [i]);
    else if (i instanceof Array) {
        u = f.apply(n);
        for (var h = 0, a = u.length, v = i.length; h < v; h++, a++) u[a] = i[h];
    } else
        typeof i == "object" &&
        Object.getType(i) === Object &&
        ((u = f.apply(n)), Sys$Component$_setProperties(u, i));
    l && n.endUpdate();
}

function Sys$Component$_setReferences(n, t) {
    var i, r, u;
    for (i in t)(r = n["set_" + i]), (u = $find(t[i])), r.apply(n, [u]);
}
var $create, $removeHandler, $get, $find;
!(function(n, t) {
    "object" == typeof module && "object" == typeof module.exports ?
        (module.exports = n.document ?
            t(n, !0) :
            function(n) {
                if (!n.document)
                    throw new Error("jQuery requires a window with a document");
                return t(n);
            }) :
        t(n);
})("undefined" != typeof window ? window : this, function(n, t) {
    function ir(n, t) {
        t = t || u;
        var i = t.createElement("script");
        i.text = n;
        t.head.appendChild(i).parentNode.removeChild(i);
    }

    function fi(n) {
        var t = !!n && "length" in n && n.length,
            r = i.type(n);
        return (
            "function" !== r &&
            !i.isWindow(n) &&
            ("array" === r ||
                0 === t ||
                ("number" == typeof t && t > 0 && t - 1 in n))
        );
    }

    function l(n, t) {
        return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase();
    }

    function oi(n, t, r) {
        return i.isFunction(t) ?
            i.grep(n, function(n, i) {
                return !!t.call(n, i, n) !== r;
            }) :
            t.nodeType ?
            i.grep(n, function(n) {
                return (n === t) !== r;
            }) :
            "string" != typeof t ?
            i.grep(n, function(n) {
                return ot.call(t, n) > -1 !== r;
            }) :
            er.test(t) ?
            i.filter(t, n, r) :
            ((t = i.filter(t, n)),
                i.grep(n, function(n) {
                    return ot.call(t, n) > -1 !== r && 1 === n.nodeType;
                }));
    }

    function ar(n, t) {
        while ((n = n[t]) && 1 !== n.nodeType);
        return n;
    }

    function ne(n) {
        var t = {};
        return (
            i.each(n.match(h) || [], function(n, i) {
                t[i] = !0;
            }),
            t
        );
    }

    function nt(n) {
        return n;
    }

    function pt(n) {
        throw n;
    }

    function vr(n, t, r, u) {
        var f;
        try {
            n && i.isFunction((f = n.promise)) ?
                f.call(n).done(t).fail(r) :
                n && i.isFunction((f = n.then)) ?
                f.call(n, t, r) :
                t.apply(void 0, [n].slice(u));
        } catch (n) {
            r.apply(void 0, [n]);
        }
    }

    function bt() {
        u.removeEventListener("DOMContentLoaded", bt);
        n.removeEventListener("load", bt);
        i.ready();
    }

    function ht() {
        this.expando = i.expando + ht.uid++;
    }

    function re(n) {
        return (
            "true" === n ||
            ("false" !== n &&
                ("null" === n ?
                    null :
                    n === +n + "" ?
                    +n :
                    te.test(n) ?
                    JSON.parse(n) :
                    n))
        );
    }

    function pr(n, t, i) {
        var r;
        if (void 0 === i && 1 === n.nodeType)
            if (
                ((r = "data-" + t.replace(ie, "-$&").toLowerCase()),
                    (i = n.getAttribute(r)),
                    "string" == typeof i)
            ) {
                try {
                    i = re(i);
                } catch (u) {}
                e.set(n, t, i);
            } else i = void 0;
        return i;
    }

    function kr(n, t, r, u) {
        var h,
            e = 1,
            l = 20,
            c = u ?

            function() {
                return u.cur();
            } :
            function() {
                return i.css(n, t, "");
            },
            s = c(),
            o = (r && r[3]) || (i.cssNumber[t] ? "" : "px"),
            f = (i.cssNumber[t] || ("px" !== o && +s)) && ct.exec(i.css(n, t));
        if (f && f[3] !== o) {
            o = o || f[3];
            r = r || [];
            f = +s || 1;
            do(e = e || ".5"), (f /= e), i.style(n, t, f + o);
            while (e !== (e = c() / s) && 1 !== e && --l);
        }
        return (
            r &&
            ((f = +f || +s || 0),
                (h = r[1] ? f + (r[1] + 1) * r[2] : +r[2]),
                u && ((u.unit = o), (u.start = f), (u.end = h))),
            h
        );
    }

    function ue(n) {
        var r,
            f = n.ownerDocument,
            u = n.nodeName,
            t = si[u];
        return t ?
            t :
            ((r = f.body.appendChild(f.createElement(u))),
                (t = i.css(r, "display")),
                r.parentNode.removeChild(r),
                "none" === t && (t = "block"),
                (si[u] = t),
                t);
    }

    function tt(n, t) {
        for (var e, u, f = [], i = 0, o = n.length; i < o; i++)
            (u = n[i]),
            u.style &&
            ((e = u.style.display),
                t ?
                ("none" === e &&
                    ((f[i] = r.get(u, "display") || null),
                        f[i] || (u.style.display = "")),
                    "" === u.style.display && kt(u) && (f[i] = ue(u))) :
                "none" !== e && ((f[i] = "none"), r.set(u, "display", e)));
        for (i = 0; i < o; i++) null != f[i] && (n[i].style.display = f[i]);
        return n;
    }

    function o(n, t) {
        var r;
        return (
            (r =
                "undefined" != typeof n.getElementsByTagName ?
                n.getElementsByTagName(t || "*") :
                "undefined" != typeof n.querySelectorAll ?
                n.querySelectorAll(t || "*") : []),
            void 0 === t || (t && l(n, t)) ? i.merge([n], r) : r
        );
    }

    function hi(n, t) {
        for (var i = 0, u = n.length; i < u; i++)
            r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"));
    }

    function iu(n, t, r, u, f) {
        for (
            var e,
                s,
                p,
                a,
                w,
                v,
                h = t.createDocumentFragment(),
                y = [],
                l = 0,
                b = n.length; l < b; l++
        )
            if (((e = n[l]), e || 0 === e))
                if ("object" === i.type(e)) i.merge(y, e.nodeType ? [e] : e);
                else if (tu.test(e)) {
            for (
                s = s || h.appendChild(t.createElement("div")),
                p = (gr.exec(e) || ["", ""])[1].toLowerCase(),
                a = c[p] || c._default,
                s.innerHTML = a[1] + i.htmlPrefilter(e) + a[2],
                v = a[0]; v--;

            )
                s = s.lastChild;
            i.merge(y, s.childNodes);
            s = h.firstChild;
            s.textContent = "";
        } else y.push(t.createTextNode(e));
        for (h.textContent = "", l = 0;
            (e = y[l++]);)
            if (u && i.inArray(e, u) > -1) f && f.push(e);
            else if (
            ((w = i.contains(e.ownerDocument, e)),
                (s = o(h.appendChild(e), "script")),
                w && hi(s),
                r)
        )
            for (v = 0;
                (e = s[v++]);) nu.test(e.type || "") && r.push(e);
        return h;
    }

    function gt() {
        return !0;
    }

    function it() {
        return !1;
    }

    function uu() {
        try {
            return u.activeElement;
        } catch (n) {}
    }

    function ci(n, t, r, u, f, e) {
        var o, s;
        if ("object" == typeof t) {
            "string" != typeof r && ((u = u || r), (r = void 0));
            for (s in t) ci(n, s, r, u, t[s], e);
            return n;
        }
        if (
            (null == u && null == f ?
                ((f = r), (u = r = void 0)) :
                null == f &&
                ("string" == typeof r ?
                    ((f = u), (u = void 0)) :
                    ((f = u), (u = r), (r = void 0))),
                f === !1)
        )
            f = it;
        else if (!f) return n;
        return (
            1 === e &&
            ((o = f),
                (f = function(n) {
                    return i().off(n), o.apply(this, arguments);
                }),
                (f.guid = o.guid || (o.guid = i.guid++))),
            n.each(function() {
                i.event.add(this, t, f, u, r);
            })
        );
    }

    function fu(n, t) {
        return l(n, "table") && l(11 !== t.nodeType ? t : t.firstChild, "tr") ?
            i(">tbody", n)[0] || n :
            n;
    }

    function ae(n) {
        return (n.type = (null !== n.getAttribute("type")) + "/" + n.type), n;
    }

    function ve(n) {
        var t = ce.exec(n.type);
        return t ? (n.type = t[1]) : n.removeAttribute("type"), n;
    }

    function eu(n, t) {
        var u, c, f, s, h, l, a, o;
        if (1 === t.nodeType) {
            if (
                r.hasData(n) &&
                ((s = r.access(n)), (h = r.set(t, s)), (o = s.events))
            ) {
                delete h.handle;
                h.events = {};
                for (f in o)
                    for (u = 0, c = o[f].length; u < c; u++) i.event.add(t, f, o[f][u]);
            }
            e.hasData(n) && ((l = e.access(n)), (a = i.extend({}, l)), e.set(t, a));
        }
    }

    function ye(n, t) {
        var i = t.nodeName.toLowerCase();
        "input" === i && dr.test(n.type) ?
            (t.checked = n.checked) :
            ("input" !== i && "textarea" !== i) ||
            (t.defaultValue = n.defaultValue);
    }

    function rt(n, t, u, e) {
        t = gi.apply([], t);
        var l,
            p,
            c,
            a,
            s,
            w,
            h = 0,
            v = n.length,
            k = v - 1,
            y = t[0],
            b = i.isFunction(y);
        if (b || (v > 1 && "string" == typeof y && !f.checkClone && he.test(y)))
            return n.each(function(i) {
                var r = n.eq(i);
                b && (t[0] = y.call(this, i, r.html()));
                rt(r, t, u, e);
            });
        if (
            v &&
            ((l = iu(t, n[0].ownerDocument, !1, n, e)),
                (p = l.firstChild),
                1 === l.childNodes.length && (l = p),
                p || e)
        ) {
            for (c = i.map(o(l, "script"), ae), a = c.length; h < v; h++)
                (s = l),
                h !== k &&
                ((s = i.clone(s, !0, !0)), a && i.merge(c, o(s, "script"))),
                u.call(n[h], s, h);
            if (a)
                for (w = c[c.length - 1].ownerDocument, i.map(c, ve), h = 0; h < a; h++)
                    (s = c[h]),
                    nu.test(s.type || "") &&
                    !r.access(s, "globalEval") &&
                    i.contains(w, s) &&
                    (s.src ?
                        i._evalUrl && i._evalUrl(s.src) :
                        ir(s.textContent.replace(le, ""), w));
        }
        return n;
    }

    function ou(n, t, r) {
        for (var u, e = t ? i.filter(t, n) : n, f = 0; null != (u = e[f]); f++)
            r || 1 !== u.nodeType || i.cleanData(o(u)),
            u.parentNode &&
            (r && i.contains(u.ownerDocument, u) && hi(o(u, "script")),
                u.parentNode.removeChild(u));
        return n;
    }

    function lt(n, t, r) {
        var o,
            s,
            h,
            u,
            e = n.style;
        return (
            (r = r || ni(n)),
            r &&
            ((u = r.getPropertyValue(t) || r[t]),
                "" !== u || i.contains(n.ownerDocument, n) || (u = i.style(n, t)), !f.pixelMarginRight() &&
                li.test(u) &&
                su.test(t) &&
                ((o = e.width),
                    (s = e.minWidth),
                    (h = e.maxWidth),
                    (e.minWidth = e.maxWidth = e.width = u),
                    (u = r.width),
                    (e.width = o),
                    (e.minWidth = s),
                    (e.maxWidth = h))),
            void 0 !== u ? u + "" : u
        );
    }

    function hu(n, t) {
        return {
            get: function() {
                return n() ?
                    void delete this.get :
                    (this.get = t).apply(this, arguments);
            },
        };
    }

    function be(n) {
        if (n in vu) return n;
        for (var i = n[0].toUpperCase() + n.slice(1), t = au.length; t--;)
            if (((n = au[t] + i), n in vu)) return n;
    }

    function yu(n) {
        var t = i.cssProps[n];
        return t || (t = i.cssProps[n] = be(n) || n), t;
    }

    function pu(n, t, i) {
        var r = ct.exec(t);
        return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || "px") : t;
    }

    function wu(n, t, r, u, f) {
        for (
            var o = 0,
                e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0; e < 4; e += 2
        )
            "margin" === r && (o += i.css(n, r + b[e], !0, f)),
            u ?
            ("content" === r && (o -= i.css(n, "padding" + b[e], !0, f)),
                "margin" !== r && (o -= i.css(n, "border" + b[e] + "Width", !0, f))) :
            ((o += i.css(n, "padding" + b[e], !0, f)),
                "padding" !== r &&
                (o += i.css(n, "border" + b[e] + "Width", !0, f)));
        return o;
    }

    function bu(n, t, r) {
        var o,
            e = ni(n),
            u = lt(n, t, e),
            s = "border-box" === i.css(n, "boxSizing", !1, e);
        return li.test(u) ?
            u :
            ((o = s && (f.boxSizingReliable() || u === n.style[t])),
                "auto" === u && (u = n["offset" + t[0].toUpperCase() + t.slice(1)]),
                (u = parseFloat(u) || 0),
                u + wu(n, t, r || (s ? "border" : "content"), o, e) + "px");
    }

    function s(n, t, i, r, u) {
        return new s.prototype.init(n, t, i, r, u);
    }

    function ai() {
        ti &&
            (u.hidden === !1 && n.requestAnimationFrame ?
                n.requestAnimationFrame(ai) :
                n.setTimeout(ai, i.fx.interval),
                i.fx.tick());
    }

    function gu() {
        return (
            n.setTimeout(function() {
                ut = void 0;
            }),
            (ut = i.now())
        );
    }

    function ii(n, t) {
        var r,
            u = 0,
            i = { height: n };
        for (t = t ? 1 : 0; u < 4; u += 2 - t)
            (r = b[u]), (i["margin" + r] = i["padding" + r] = n);
        return t && (i.opacity = i.width = n), i;
    }

    function nf(n, t, i) {
        for (
            var u,
                f = (a.tweeners[t] || []).concat(a.tweeners["*"]),
                r = 0,
                e = f.length; r < e; r++
        )
            if ((u = f[r].call(i, t, n))) return u;
    }

    function ke(n, t, u) {
        var f,
            y,
            w,
            c,
            b,
            s,
            o,
            l,
            k = "width" in t || "height" in t,
            v = this,
            p = {},
            h = n.style,
            a = n.nodeType && kt(n),
            e = r.get(n, "fxshow");
        u.queue ||
            ((c = i._queueHooks(n, "fx")),
                null == c.unqueued &&
                ((c.unqueued = 0),
                    (b = c.empty.fire),
                    (c.empty.fire = function() {
                        c.unqueued || b();
                    })),
                c.unqueued++,
                v.always(function() {
                    v.always(function() {
                        c.unqueued--;
                        i.queue(n, "fx").length || c.empty.fire();
                    });
                }));
        for (f in t)
            if (((y = t[f]), ku.test(y))) {
                if (
                    (delete t[f], (w = w || "toggle" === y), y === (a ? "hide" : "show"))
                ) {
                    if ("show" !== y || !e || void 0 === e[f]) continue;
                    a = !0;
                }
                p[f] = (e && e[f]) || i.style(n, f);
            }
        if (((s = !i.isEmptyObject(t)), s || !i.isEmptyObject(p))) {
            k &&
                1 === n.nodeType &&
                ((u.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    (o = e && e.display),
                    null == o && (o = r.get(n, "display")),
                    (l = i.css(n, "display")),
                    "none" === l &&
                    (o ?
                        (l = o) :
                        (tt([n], !0),
                            (o = n.style.display || o),
                            (l = i.css(n, "display")),
                            tt([n]))),
                    ("inline" === l || ("inline-block" === l && null != o)) &&
                    "none" === i.css(n, "float") &&
                    (s ||
                        (v.done(function() {
                                h.display = o;
                            }),
                            null == o && ((l = h.display), (o = "none" === l ? "" : l))),
                        (h.display = "inline-block")));
            u.overflow &&
                ((h.overflow = "hidden"),
                    v.always(function() {
                        h.overflow = u.overflow[0];
                        h.overflowX = u.overflow[1];
                        h.overflowY = u.overflow[2];
                    }));
            s = !1;
            for (f in p)
                s ||
                (e ?
                    "hidden" in e && (a = e.hidden) :
                    (e = r.access(n, "fxshow", { display: o })),
                    w && (e.hidden = !a),
                    a && tt([n], !0),
                    v.done(function() {
                        a || tt([n]);
                        r.remove(n, "fxshow");
                        for (f in p) i.style(n, f, p[f]);
                    })),
                (s = nf(a ? e[f] : 0, f, v)),
                f in e || ((e[f] = s.start), a && ((s.end = s.start), (s.start = 0)));
        }
    }

    function de(n, t) {
        var r, f, e, u, o;
        for (r in n)
            if (
                ((f = i.camelCase(r)),
                    (e = t[f]),
                    (u = n[r]),
                    Array.isArray(u) && ((e = u[1]), (u = n[r] = u[0])),
                    r !== f && ((n[f] = u), delete n[r]),
                    (o = i.cssHooks[f]),
                    o && "expand" in o)
            ) {
                u = o.expand(u);
                delete n[f];
                for (r in u) r in n || ((n[r] = u[r]), (t[r] = e));
            } else t[f] = e;
    }

    function a(n, t, r) {
        var e,
            o,
            s = 0,
            l = a.prefilters.length,
            f = i.Deferred().always(function() {
                delete c.elem;
            }),
            c = function() {
                if (o) return !1;
                for (
                    var s = ut || gu(),
                        t = Math.max(0, u.startTime + u.duration - s),
                        h = t / u.duration || 0,
                        i = 1 - h,
                        r = 0,
                        e = u.tweens.length; r < e; r++
                )
                    u.tweens[r].run(i);
                return (
                    f.notifyWith(n, [u, i, t]),
                    i < 1 && e ?
                    t :
                    (e || f.notifyWith(n, [u, 1, 0]), f.resolveWith(n, [u]), !1)
                );
            },
            u = f.promise({
                elem: n,
                props: i.extend({}, t),
                opts: i.extend(!0, { specialEasing: {}, easing: i.easing._default }, r),
                originalProperties: t,
                originalOptions: r,
                startTime: ut || gu(),
                duration: r.duration,
                tweens: [],
                createTween: function(t, r) {
                    var f = i.Tween(
                        n,
                        u.opts,
                        t,
                        r,
                        u.opts.specialEasing[t] || u.opts.easing
                    );
                    return u.tweens.push(f), f;
                },
                stop: function(t) {
                    var i = 0,
                        r = t ? u.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i < r; i++) u.tweens[i].run(1);
                    return (
                        t ?
                        (f.notifyWith(n, [u, 1, 0]), f.resolveWith(n, [u, t])) :
                        f.rejectWith(n, [u, t]),
                        this
                    );
                },
            }),
            h = u.props;
        for (de(h, u.opts.specialEasing); s < l; s++)
            if ((e = a.prefilters[s].call(u, n, h, u.opts)))
                return (
                    i.isFunction(e.stop) &&
                    (i._queueHooks(u.elem, u.opts.queue).stop = i.proxy(e.stop, e)),
                    e
                );
        return (
            i.map(h, nf, u),
            i.isFunction(u.opts.start) && u.opts.start.call(n, u),
            u
            .progress(u.opts.progress)
            .done(u.opts.done, u.opts.complete)
            .fail(u.opts.fail)
            .always(u.opts.always),
            i.fx.timer(i.extend(c, { elem: n, anim: u, queue: u.opts.queue })),
            u
        );
    }

    function k(n) {
        var t = n.match(h) || [];
        return t.join(" ");
    }

    function d(n) {
        return (n.getAttribute && n.getAttribute("class")) || "";
    }

    function pi(n, t, r, u) {
        var f;
        if (Array.isArray(t))
            i.each(t, function(t, i) {
                r || ge.test(n) ?
                    u(n, i) :
                    pi(
                        n + "[" + ("object" == typeof i && null != i ? t : "") + "]",
                        i,
                        r,
                        u
                    );
            });
        else if (r || "object" !== i.type(t)) u(n, t);
        else
            for (f in t) pi(n + "[" + f + "]", t[f], r, u);
    }

    function cf(n) {
        return function(t, r) {
            "string" != typeof t && ((r = t), (t = "*"));
            var u,
                f = 0,
                e = t.toLowerCase().match(h) || [];
            if (i.isFunction(r))
                while ((u = e[f++]))
                    "+" === u[0] ?
                    ((u = u.slice(1) || "*"), (n[u] = n[u] || []).unshift(r)) :
                    (n[u] = n[u] || []).push(r);
        };
    }

    function lf(n, t, r, u) {
        function e(s) {
            var h;
            return (
                (f[s] = !0),
                i.each(n[s] || [], function(n, i) {
                    var s = i(t, r, u);
                    return "string" != typeof s || o || f[s] ?
                        o ?
                        !(h = s) :
                        void 0 :
                        (t.dataTypes.unshift(s), e(s), !1);
                }),
                h
            );
        }
        var f = {},
            o = n === wi;
        return e(t.dataTypes[0]) || (!f["*"] && e("*"));
    }

    function ki(n, t) {
        var r,
            u,
            f = i.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
        return u && i.extend(!0, n, u), n;
    }

    function so(n, t, i) {
        for (var e, u, f, o, s = n.contents, r = n.dataTypes;
            "*" === r[0];)
            r.shift(),
            void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
        if (e)
            for (u in s)
                if (s[u] && s[u].test(e)) {
                    r.unshift(u);
                    break;
                }
        if (r[0] in i) f = r[0];
        else {
            for (u in i) {
                if (!r[0] || n.converters[u + " " + r[0]]) {
                    f = u;
                    break;
                }
                o || (o = u);
            }
            f = f || o;
        }
        if (f) return f !== r[0] && r.unshift(f), i[f];
    }

    function ho(n, t, i, r) {
        var h,
            u,
            f,
            s,
            e,
            o = {},
            c = n.dataTypes.slice();
        if (c[1])
            for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
        for (u = c.shift(); u;)
            if (
                (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)),
                    (e = u),
                    (u = c.shift()))
            )
                if ("*" === u) u = e;
                else if ("*" !== e && e !== u) {
            if (((f = o[e + " " + u] || o["* " + u]), !f))
                for (h in o)
                    if (
                        ((s = h.split(" ")),
                            s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]]))
                    ) {
                        f === !0 ?
                            (f = o[h]) :
                            o[h] !== !0 && ((u = s[0]), c.unshift(s[1]));
                        break;
                    }
            if (f !== !0)
                if (f && n.throws) t = f(t);
                else
                    try {
                        t = f(t);
                    } catch (l) {
                        return {
                            state: "parsererror",
                            error: f ? l : "No conversion from " + e + " to " + u,
                        };
                    }
        }
        return { state: "success", data: t };
    }
    var p = [],
        u = n.document,
        pf = Object.getPrototypeOf,
        w = p.slice,
        gi = p.concat,
        ui = p.push,
        ot = p.indexOf,
        vt = {},
        nr = vt.toString,
        yt = vt.hasOwnProperty,
        tr = yt.toString,
        wf = tr.call(Object),
        f = {},
        rr = "3.2.1",
        i = function(n, t) {
            return new i.fn.init(n, t);
        },
        bf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        kf = /^-ms-/,
        df = /-([a-z])/g,
        gf = function(n, t) {
            return t.toUpperCase();
        },
        y,
        ei,
        er,
        or,
        sr,
        hr,
        cr,
        lr,
        h,
        yr,
        wt,
        v,
        st,
        si,
        tu,
        ut,
        ti,
        ku,
        du,
        tf,
        ft,
        rf,
        uf,
        ff,
        vi,
        af,
        et,
        di,
        ri,
        vf,
        yf;
    i.fn = i.prototype = {
        jquery: rr,
        constructor: i,
        length: 0,
        toArray: function() {
            return w.call(this);
        },
        get: function(n) {
            return null == n ? w.call(this) : n < 0 ? this[n + this.length] : this[n];
        },
        pushStack: function(n) {
            var t = i.merge(this.constructor(), n);
            return (t.prevObject = this), t;
        },
        each: function(n) {
            return i.each(this, n);
        },
        map: function(n) {
            return this.pushStack(
                i.map(this, function(t, i) {
                    return n.call(t, i, t);
                })
            );
        },
        slice: function() {
            return this.pushStack(w.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(n) {
            var i = this.length,
                t = +n + (n < 0 ? i : 0);
            return this.pushStack(t >= 0 && t < i ? [this[t]] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: ui,
        sort: p.sort,
        splice: p.splice,
    };
    i.extend = i.fn.extend = function() {
        var e,
            f,
            r,
            t,
            o,
            s,
            n = arguments[0] || {},
            u = 1,
            c = arguments.length,
            h = !1;
        for (
            "boolean" == typeof n && ((h = n), (n = arguments[u] || {}), u++),
            "object" == typeof n || i.isFunction(n) || (n = {}),
            u === c && ((n = this), u--); u < c; u++
        )
            if (null != (e = arguments[u]))
                for (f in e)
                    (r = n[f]),
                    (t = e[f]),
                    n !== t &&
                    (h && t && (i.isPlainObject(t) || (o = Array.isArray(t))) ?
                        (o ?
                            ((o = !1), (s = r && Array.isArray(r) ? r : [])) :
                            (s = r && i.isPlainObject(r) ? r : {}),
                            (n[f] = i.extend(h, s, t))) :
                        void 0 !== t && (n[f] = t));
        return n;
    };
    i.extend({
        expando: "jQuery" + (rr + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(n) {
            throw new Error(n);
        },
        noop: function() {},
        isFunction: function(n) {
            return "function" === i.type(n);
        },
        isWindow: function(n) {
            return null != n && n === n.window;
        },
        isNumeric: function(n) {
            var t = i.type(n);
            return ("number" === t || "string" === t) && !isNaN(n - parseFloat(n));
        },
        isPlainObject: function(n) {
            var t, i;
            return (!(!n || "[object Object]" !== nr.call(n)) &&
                (!(t = pf(n)) ||
                    ((i = yt.call(t, "constructor") && t.constructor),
                        "function" == typeof i && tr.call(i) === wf))
            );
        },
        isEmptyObject: function(n) {
            var t;
            for (t in n) return !1;
            return !0;
        },
        type: function(n) {
            return null == n ?
                n + "" :
                "object" == typeof n || "function" == typeof n ?
                vt[nr.call(n)] || "object" :
                typeof n;
        },
        globalEval: function(n) {
            ir(n);
        },
        camelCase: function(n) {
            return n.replace(kf, "ms-").replace(df, gf);
        },
        each: function(n, t) {
            var r,
                i = 0;
            if (fi(n)) {
                for (r = n.length; i < r; i++)
                    if (t.call(n[i], i, n[i]) === !1) break;
            } else
                for (i in n)
                    if (t.call(n[i], i, n[i]) === !1) break;
            return n;
        },
        trim: function(n) {
            return null == n ? "" : (n + "").replace(bf, "");
        },
        makeArray: function(n, t) {
            var r = t || [];
            return (
                null != n &&
                (fi(Object(n)) ?
                    i.merge(r, "string" == typeof n ? [n] : n) :
                    ui.call(r, n)),
                r
            );
        },
        inArray: function(n, t, i) {
            return null == t ? -1 : ot.call(t, n, i);
        },
        merge: function(n, t) {
            for (var u = +t.length, i = 0, r = n.length; i < u; i++) n[r++] = t[i];
            return (n.length = r), n;
        },
        grep: function(n, t, i) {
            for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++)
                (u = !t(n[r], r)), u !== o && f.push(n[r]);
            return f;
        },
        map: function(n, t, i) {
            var e,
                u,
                r = 0,
                f = [];
            if (fi(n))
                for (e = n.length; r < e; r++)
                    (u = t(n[r], r, i)), null != u && f.push(u);
            else
                for (r in n)(u = t(n[r], r, i)), null != u && f.push(u);
            return gi.apply([], f);
        },
        guid: 1,
        proxy: function(n, t) {
            var u, f, r;
            if (
                ("string" == typeof t && ((u = n[t]), (t = n), (n = u)),
                    i.isFunction(n))
            )
                return (
                    (f = w.call(arguments, 2)),
                    (r = function() {
                        return n.apply(t || this, f.concat(w.call(arguments)));
                    }),
                    (r.guid = n.guid = n.guid || i.guid++),
                    r
                );
        },
        now: Date.now,
        support: f,
    });
    "function" == typeof Symbol && (i.fn[Symbol.iterator] = p[Symbol.iterator]);
    i.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
            " "
        ),
        function(n, t) {
            vt["[object " + t + "]"] = t.toLowerCase();
        }
    );
    y = (function(n) {
        function u(n, t, r, u) {
            try {
                document === document;
            } catch (nt) {
                document = window.document;
            }
            var s,
                w,
                l,
                a,
                d,
                y,
                g,
                p = t && t.ownerDocument,
                v = t ? t.nodeType : 9;
            if (
                ((r = r || []),
                    "string" != typeof n || !n || (1 !== v && 9 !== v && 11 !== v))
            )
                return r;
            if (!u &&
                ((t ? t.ownerDocument || t : c) !== i && b(t), (t = t || i), h)
            ) {
                if (11 !== v && (d = cr.exec(n)))
                    if ((s = d[1])) {
                        if (9 === v) {
                            if (!(l = t.getElementById(s))) return r;
                            if (l.id === s) return r.push(l), r;
                        } else if (p && (l = p.getElementById(s)) && et(t, l) && l.id === s)
                            return r.push(l), r;
                    } else {
                        if (d[2]) return k.apply(r, t.getElementsByTagName(n)), r;
                        if (
                            (s = d[3]) &&
                            e.getElementsByClassName &&
                            t.getElementsByClassName
                        )
                            return k.apply(r, t.getElementsByClassName(s)), r;
                    }
                if (e.qsa && !lt[n + " "] && (!o || !o.test(n))) {
                    if (1 !== v)(p = t), (g = n);
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for (
                            (a = t.getAttribute("id")) ?
                            (a = a.replace(vi, yi)) :
                            t.setAttribute("id", (a = f)),
                            y = ft(n),
                            w = y.length; w--;

                        )
                            y[w] = "#" + a + " " + yt(y[w]);
                        g = y.join(",");
                        p = (ni.test(n) && ri(t.parentNode)) || t;
                    }
                    if (g)
                        try {
                            return k.apply(r, p.querySelectorAll(g)), r;
                        } catch (tt) {} finally {
                            a === f && t.removeAttribute("id");
                        }
                }
            }
            return si(n.replace(at, "$1"), t, r, u);
        }

        function ti() {
            function n(r, u) {
                return (
                    i.push(r + " ") > t.cacheLength && delete n[i.shift()],
                    (n[r + " "] = u)
                );
            }
            var i = [];
            return n;
        }

        function l(n) {
            return (n[f] = !0), n;
        }

        function a(n) {
            var t = i.createElement("fieldset");
            try {
                return !!n(t);
            } catch (r) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null;
            }
        }

        function ii(n, i) {
            for (var r = n.split("|"), u = r.length; u--;) t.attrHandle[r[u]] = i;
        }

        function wi(n, t) {
            var i = t && n,
                r =
                i &&
                1 === n.nodeType &&
                1 === t.nodeType &&
                n.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (i)
                while ((i = i.nextSibling))
                    if (i === t) return -1;
            return n ? 1 : -1;
        }

        function ar(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return "input" === i && t.type === n;
            };
        }

        function vr(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === n;
            };
        }

        function bi(n) {
            return function(t) {
                return "form" in t ?
                    t.parentNode && t.disabled === !1 ?
                    "label" in t ?
                    "label" in t.parentNode ?
                    t.parentNode.disabled === n :
                    t.disabled === n :
                    t.isDisabled === n || (t.isDisabled !== !n && lr(t) === n) :
                    t.disabled === n :
                    "label" in t && t.disabled === n;
            };
        }

        function it(n) {
            return l(function(t) {
                return (
                    (t = +t),
                    l(function(i, r) {
                        for (var u, f = n([], i.length, t), e = f.length; e--;)
                            i[(u = f[e])] && (i[u] = !(r[u] = i[u]));
                    })
                );
            });
        }

        function ri(n) {
            return n && "undefined" != typeof n.getElementsByTagName && n;
        }

        function ki() {}

        function yt(n) {
            for (var t = 0, r = n.length, i = ""; t < r; t++) i += n[t].value;
            return i;
        }

        function pt(n, t, i) {
            var r = t.dir,
                u = t.next,
                e = u || r,
                o = i && "parentNode" === e,
                s = di++;
            return t.first ?

                function(t, i, u) {
                    while ((t = t[r]))
                        if (1 === t.nodeType || o) return n(t, i, u);
                    return !1;
                } :
                function(t, i, h) {
                    var c,
                        l,
                        a,
                        y = [v, s];
                    if (h) {
                        while ((t = t[r]))
                            if ((1 === t.nodeType || o) && n(t, i, h)) return !0;
                    } else
                        while ((t = t[r]))
                            if (1 === t.nodeType || o)
                                if (
                                    ((a = t[f] || (t[f] = {})),
                                        (l = a[t.uniqueID] || (a[t.uniqueID] = {})),
                                        u && u === t.nodeName.toLowerCase())
                                )
                                    t = t[r] || t;
                                else {
                                    if ((c = l[e]) && c[0] === v && c[1] === s)
                                        return (y[2] = c[2]);
                                    if (((l[e] = y), (y[2] = n(t, i, h)))) return !0;
                                }
                    return !1;
                };
        }

        function ui(n) {
            return n.length > 1 ?

                function(t, i, r) {
                    for (var u = n.length; u--;)
                        if (!n[u](t, i, r)) return !1;
                    return !0;
                } :
                n[0];
        }

        function yr(n, t, i) {
            for (var r = 0, f = t.length; r < f; r++) u(n, t[r], i);
            return i;
        }

        function wt(n, t, i, r, u) {
            for (var e, o = [], f = 0, s = n.length, h = null != t; f < s; f++)
                (e = n[f]) && ((i && !i(e, r, u)) || (o.push(e), h && t.push(f)));
            return o;
        }

        function fi(n, t, i, r, u, e) {
            return (
                r && !r[f] && (r = fi(r)),
                u && !u[f] && (u = fi(u, e)),
                l(function(f, e, o, s) {
                    var l,
                        c,
                        a,
                        p = [],
                        y = [],
                        w = e.length,
                        b = f || yr(t || "*", o.nodeType ? [o] : o, []),
                        v = !n || (!f && t) ? b : wt(b, p, n, o, s),
                        h = i ? (u || (f ? n : w || r) ? [] : e) : v;
                    if ((i && i(v, h, o, s), r))
                        for (l = wt(h, y), r(l, [], o, s), c = l.length; c--;)
                            (a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                    if (f) {
                        if (u || n) {
                            if (u) {
                                for (l = [], c = h.length; c--;)
                                    (a = h[c]) && l.push((v[c] = a));
                                u(null, (h = []), l, s);
                            }
                            for (c = h.length; c--;)
                                (a = h[c]) &&
                                (l = u ? nt(f, a) : p[c]) > -1 &&
                                (f[l] = !(e[l] = a));
                        }
                    } else(h = wt(h === e ? h.splice(w, h.length) : h)), u ? u(null, e, h, s) : k.apply(e, h);
                })
            );
        }

        function ei(n) {
            for (
                var o,
                    u,
                    r,
                    s = n.length,
                    h = t.relative[n[0].type],
                    c = h || t.relative[" "],
                    i = h ? 1 : 0,
                    l = pt(
                        function(n) {
                            return n === o;
                        },
                        c, !0
                    ),
                    a = pt(
                        function(n) {
                            return nt(o, n) > -1;
                        },
                        c, !0
                    ),
                    e = [
                        function(n, t, i) {
                            var r =
                                (!h && (i || t !== ht)) ||
                                ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                            return (o = null), r;
                        },
                    ]; i < s; i++
            )
                if ((u = t.relative[n[i].type])) e = [pt(ui(e), u)];
                else {
                    if (((u = t.filter[n[i].type].apply(null, n[i].matches)), u[f])) {
                        for (r = ++i; r < s; r++)
                            if (t.relative[n[r].type]) break;
                        return fi(
                            i > 1 && ui(e),
                            i > 1 &&
                            yt(
                                n
                                .slice(0, i - 1)
                                .concat({ value: " " === n[i - 2].type ? "*" : "" })
                            ).replace(at, "$1"),
                            u,
                            i < r && ei(n.slice(i, r)),
                            r < s && ei((n = n.slice(r))),
                            r < s && yt(n)
                        );
                    }
                    e.push(u);
                }
            return ui(e);
        }

        function pr(n, r) {
            var f = r.length > 0,
                e = n.length > 0,
                o = function(o, s, c, l, a) {
                    var y,
                        nt,
                        d,
                        g = 0,
                        p = "0",
                        tt = o && [],
                        w = [],
                        it = ht,
                        rt = o || (e && t.find.TAG("*", a)),
                        ut = (v += null == it ? 1 : Math.random() || 0.1),
                        ft = rt.length;
                    for (
                        a && (ht = s === i || s || a); p !== ft && null != (y = rt[p]); p++
                    ) {
                        if (e && y) {
                            for (
                                nt = 0, s || y.ownerDocument === i || (b(y), (c = !h));
                                (d = n[nt++]);

                            )
                                if (d(y, s || i, c)) {
                                    l.push(y);
                                    break;
                                }
                            a && (v = ut);
                        }
                        f && ((y = !d && y) && g--, o && tt.push(y));
                    }
                    if (((g += p), f && p !== g)) {
                        for (nt = 0;
                            (d = r[nt++]);) d(tt, w, s, c);
                        if (o) {
                            if (g > 0)
                                while (p--) tt[p] || w[p] || (w[p] = nr.call(l));
                            w = wt(w);
                        }
                        k.apply(l, w);
                        a && !o && w.length > 0 && g + r.length > 1 && u.uniqueSort(l);
                    }
                    return a && ((v = ut), (ht = it)), tt;
                };
            return f ? l(o) : o;
        }
        var rt,
            e,
            t,
            st,
            oi,
            ft,
            bt,
            si,
            ht,
            w,
            ut,
            b,
            i,
            s,
            h,
            o,
            d,
            ct,
            et,
            f = "sizzle" + 1 * new Date(),
            c = n.document,
            v = 0,
            di = 0,
            hi = ti(),
            ci = ti(),
            lt = ti(),
            kt = function(n, t) {
                return n === t && (ut = !0), 0;
            },
            gi = {}.hasOwnProperty,
            g = [],
            nr = g.pop,
            tr = g.push,
            k = g.push,
            li = g.slice,
            nt = function(n, t) {
                for (var i = 0, r = n.length; i < r; i++)
                    if (n[i] === t) return i;
                return -1;
            },
            dt =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            r = "[\\x20\\t\\r\\n\\f]",
            tt = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            ai =
            "\\[" +
            r +
            "*(" +
            tt +
            ")(?:" +
            r +
            "*([*^$|!~]?=)" +
            r +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
            tt +
            "))|)" +
            r +
            "*\\]",
            gt =
            ":(" +
            tt +
            ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            ai +
            ")*)|.*)\\)|)",
            ir = new RegExp(r + "+", "g"),
            at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
            rr = new RegExp("^" + r + "*," + r + "*"),
            ur = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"),
            fr = new RegExp("=" + r + "*([^\\]'\"]*?)" + r + "*\\]", "g"),
            er = new RegExp(gt),
            or = new RegExp("^" + tt + "$"),
            vt = {
                ID: new RegExp("^#(" + tt + ")"),
                CLASS: new RegExp("^\\.(" + tt + ")"),
                TAG: new RegExp("^(" + tt + "|[*])"),
                ATTR: new RegExp("^" + ai),
                PSEUDO: new RegExp("^" + gt),
                CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    r +
                    "*(even|odd|(([+-]|)(\\d*)n|)" +
                    r +
                    "*(?:([+-]|)" +
                    r +
                    "*(\\d+)|))" +
                    r +
                    "*\\)|)",
                    "i"
                ),
                bool: new RegExp("^(?:" + dt + ")$", "i"),
                needsContext: new RegExp(
                    "^" +
                    r +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    r +
                    "*((?:-\\d)?\\d*)" +
                    r +
                    "*\\)|)(?=[^-]|$)",
                    "i"
                ),
            },
            sr = /^(?:input|select|textarea|button)$/i,
            hr = /^h\d$/i,
            ot = /^[^{]+\{\s*\[native \w/,
            cr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ni = /[+~]/,
            y = new RegExp("\\\\([\\da-f]{1,6}" + r + "?|(" + r + ")|.)", "ig"),
            p = function(n, t, i) {
                var r = "0x" + t - 65536;
                return r !== r || i ?
                    t :
                    r < 0 ?
                    String.fromCharCode(r + 65536) :
                    String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
            },
            vi = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            yi = function(n, t) {
                return t ?
                    "\0" === n ?
                    "�" :
                    n.slice(0, -1) +
                    "\\" +
                    n.charCodeAt(n.length - 1).toString(16) +
                    " " :
                    "\\" + n;
            },
            pi = function() {
                b();
            },
            lr = pt(
                function(n) {
                    return n.disabled === !0 && ("form" in n || "label" in n);
                }, { dir: "parentNode", next: "legend" }
            );
        try {
            k.apply((g = li.call(c.childNodes)), c.childNodes);
            g[c.childNodes.length].nodeType;
        } catch (wr) {
            k = {
                apply: g.length ?

                    function(n, t) {
                        tr.apply(n, li.call(t));
                    } : function(n, t) {
                        for (var i = n.length, r = 0;
                            (n[i++] = t[r++]););
                        n.length = i - 1;
                    },
            };
        }
        e = u.support = {};
        oi = u.isXML = function(n) {
            var t = n && (n.ownerDocument || n).documentElement;
            return !!t && "HTML" !== t.nodeName;
        };
        b = u.setDocument = function(n) {
            var v,
                u,
                l = n ? n.ownerDocument || n : c;
            return l !== i && 9 === l.nodeType && l.documentElement ?
                ((i = l),
                    (s = i.documentElement),
                    (h = !oi(i)),
                    c !== i &&
                    (u = i.defaultView) &&
                    u.top !== u &&
                    (u.addEventListener ?
                        u.addEventListener("unload", pi, !1) :
                        u.attachEvent && u.attachEvent("onunload", pi)),
                    (e.attributes = a(function(n) {
                        return (n.className = "i"), !n.getAttribute("className");
                    })),
                    (e.getElementsByTagName = a(function(n) {
                        return (
                            n.appendChild(i.createComment("")), !n.getElementsByTagName("*").length
                        );
                    })),
                    (e.getElementsByClassName = ot.test(i.getElementsByClassName)),
                    (e.getById = a(function(n) {
                        return (
                            (s.appendChild(n).id = f), !i.getElementsByName || !i.getElementsByName(f).length
                        );
                    })),
                    e.getById ?
                    ((t.filter.ID = function(n) {
                            var t = n.replace(y, p);
                            return function(n) {
                                return n.getAttribute("id") === t;
                            };
                        }),
                        (t.find.ID = function(n, t) {
                            if ("undefined" != typeof t.getElementById && h) {
                                var i = t.getElementById(n);
                                return i ? [i] : [];
                            }
                        })) :
                    ((t.filter.ID = function(n) {
                            var t = n.replace(y, p);
                            return function(n) {
                                var i =
                                    "undefined" != typeof n.getAttributeNode &&
                                    n.getAttributeNode("id");
                                return i && i.value === t;
                            };
                        }),
                        (t.find.ID = function(n, t) {
                            if ("undefined" != typeof t.getElementById && h) {
                                var i,
                                    u,
                                    f,
                                    r = t.getElementById(n);
                                if (r) {
                                    if (((i = r.getAttributeNode("id")), i && i.value === n))
                                        return [r];
                                    for (f = t.getElementsByName(n), u = 0;
                                        (r = f[u++]);)
                                        if (((i = r.getAttributeNode("id")), i && i.value === n))
                                            return [r];
                                }
                                return [];
                            }
                        })),
                    (t.find.TAG = e.getElementsByTagName ?

                        function(n, t) {
                            return "undefined" != typeof t.getElementsByTagName ?
                                t.getElementsByTagName(n) :
                                e.qsa ?
                                t.querySelectorAll(n) :
                                void 0;
                        } :
                        function(n, t) {
                            var i,
                                r = [],
                                f = 0,
                                u = t.getElementsByTagName(n);
                            if ("*" === n) {
                                while ((i = u[f++])) 1 === i.nodeType && r.push(i);
                                return r;
                            }
                            return u;
                        }),
                    (t.find.CLASS =
                        e.getElementsByClassName &&
                        function(n, t) {
                            if ("undefined" != typeof t.getElementsByClassName && h)
                                return t.getElementsByClassName(n);
                        }),
                    (d = []),
                    (o = []),
                    (e.qsa = ot.test(i.querySelectorAll)) &&
                    (a(function(n) {
                            s.appendChild(n).innerHTML =
                                "<a id='" +
                                f +
                                "'></a><select id='" +
                                f +
                                "-\r\\' msallowcapture=''><option selected=''></option></select>";
                            n.querySelectorAll("[msallowcapture^='']").length &&
                                o.push("[*^$]=" + r + "*(?:''|\"\")");
                            n.querySelectorAll("[selected]").length ||
                                o.push("\\[" + r + "*(?:value|" + dt + ")");
                            n.querySelectorAll("[id~=" + f + "-]").length || o.push("~=");
                            n.querySelectorAll(":checked").length || o.push(":checked");
                            n.querySelectorAll("a#" + f + "+*").length || o.push(".#.+[+~]");
                        }),
                        a(function(n) {
                            n.innerHTML =
                                "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                            var t = i.createElement("input");
                            t.setAttribute("type", "hidden");
                            n.appendChild(t).setAttribute("name", "D");
                            n.querySelectorAll("[name=d]").length &&
                                o.push("name" + r + "*[*^$|!~]?=");
                            2 !== n.querySelectorAll(":enabled").length &&
                                o.push(":enabled", ":disabled");
                            s.appendChild(n).disabled = !0;
                            2 !== n.querySelectorAll(":disabled").length &&
                                o.push(":enabled", ":disabled");
                            n.querySelectorAll("*,:x");
                            o.push(",.*:");
                        })),
                    (e.matchesSelector = ot.test(
                        (ct =
                            s.matches ||
                            s.webkitMatchesSelector ||
                            s.mozMatchesSelector ||
                            s.oMatchesSelector ||
                            s.msMatchesSelector)
                    )) &&
                    a(function(n) {
                        e.disconnectedMatch = ct.call(n, "*");
                        ct.call(n, "[s!='']:x");
                        d.push("!=", gt);
                    }),
                    (o = o.length && new RegExp(o.join("|"))),
                    (d = d.length && new RegExp(d.join("|"))),
                    (v = ot.test(s.compareDocumentPosition)),
                    (et =
                        v || ot.test(s.contains) ?

                        function(n, t) {
                            var r = 9 === n.nodeType ? n.documentElement : n,
                                i = t && t.parentNode;
                            return (
                                n === i ||
                                !(!i ||
                                    1 !== i.nodeType ||
                                    !(r.contains ?
                                        r.contains(i) :
                                        n.compareDocumentPosition &&
                                        16 & n.compareDocumentPosition(i))
                                )
                            );
                        } :
                        function(n, t) {
                            if (t)
                                while ((t = t.parentNode))
                                    if (t === n) return !0;
                            return !1;
                        }),
                    (kt = v ?

                        function(n, t) {
                            if (n === t) return (ut = !0), 0;
                            var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
                            return r ?
                                r :
                                ((r =
                                        (n.ownerDocument || n) === (t.ownerDocument || t) ?
                                        n.compareDocumentPosition(t) :
                                        1),
                                    1 & r ||
                                    (!e.sortDetached && t.compareDocumentPosition(n) === r) ?
                                    n === i || (n.ownerDocument === c && et(c, n)) ?
                                    -1 :
                                    t === i || (t.ownerDocument === c && et(c, t)) ?
                                    1 :
                                    w ?
                                    nt(w, n) - nt(w, t) :
                                    0 :
                                    4 & r ?
                                    -1 :
                                    1);
                        } :
                        function(n, t) {
                            if (n === t) return (ut = !0), 0;
                            var r,
                                u = 0,
                                o = n.parentNode,
                                s = t.parentNode,
                                f = [n],
                                e = [t];
                            if (!o || !s)
                                return n === i ?
                                    -1 :
                                    t === i ?
                                    1 :
                                    o ?
                                    -1 :
                                    s ?
                                    1 :
                                    w ?
                                    nt(w, n) - nt(w, t) :
                                    0;
                            if (o === s) return wi(n, t);
                            for (r = n;
                                (r = r.parentNode);) f.unshift(r);
                            for (r = t;
                                (r = r.parentNode);) e.unshift(r);
                            while (f[u] === e[u]) u++;
                            return u ?
                                wi(f[u], e[u]) :
                                f[u] === c ?
                                -1 :
                                e[u] === c ?
                                1 :
                                0;
                        }),
                    i) :
                i;
        };
        u.matches = function(n, t) {
            return u(n, null, null, t);
        };
        u.matchesSelector = function(n, t) {
            if (
                ((n.ownerDocument || n) !== i && b(n),
                    (t = t.replace(fr, "='$1']")),
                    e.matchesSelector &&
                    h &&
                    !lt[t + " "] &&
                    (!d || !d.test(t)) &&
                    (!o || !o.test(t)))
            )
                try {
                    var r = ct.call(n, t);
                    if (
                        r ||
                        e.disconnectedMatch ||
                        (n.document && 11 !== n.document.nodeType)
                    )
                        return r;
                } catch (f) {}
            return u(t, i, null, [n]).length > 0;
        };
        u.contains = function(n, t) {
            return (n.ownerDocument || n) !== i && b(n), et(n, t);
        };
        u.attr = function(n, r) {
            (n.ownerDocument || n) !== i && b(n);
            var f = t.attrHandle[r.toLowerCase()],
                u = f && gi.call(t.attrHandle, r.toLowerCase()) ? f(n, r, !h) : void 0;
            return void 0 !== u ?
                u :
                e.attributes || !h ?
                n.getAttribute(r) :
                (u = n.getAttributeNode(r)) && u.specified ?
                u.value :
                null;
        };
        u.escape = function(n) {
            return (n + "").replace(vi, yi);
        };
        u.error = function(n) {
            throw new Error("Syntax error, unrecognized expression: " + n);
        };
        u.uniqueSort = function(n) {
            var r,
                u = [],
                t = 0,
                i = 0;
            if (
                ((ut = !e.detectDuplicates),
                    (w = !e.sortStable && n.slice(0)),
                    n.sort(kt),
                    ut)
            ) {
                while ((r = n[i++])) r === n[i] && (t = u.push(i));
                while (t--) n.splice(u[t], 1);
            }
            return (w = null), n;
        };
        st = u.getText = function(n) {
            var r,
                i = "",
                u = 0,
                t = n.nodeType;
            if (t) {
                if (1 === t || 9 === t || 11 === t) {
                    if ("string" == typeof n.textContent) return n.textContent;
                    for (n = n.firstChild; n; n = n.nextSibling) i += st(n);
                } else if (3 === t || 4 === t) return n.nodeValue;
            } else
                while ((r = n[u++])) i += st(r);
            return i;
        };
        t = u.selectors = {
            cacheLength: 50,
            createPseudo: l,
            match: vt,
            attrHandle: {},
            find: {},
            relative: {
                ">": { dir: "parentNode", first: !0 },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: !0 },
                "~": { dir: "previousSibling" },
            },
            preFilter: {
                ATTR: function(n) {
                    return (
                        (n[1] = n[1].replace(y, p)),
                        (n[3] = (n[3] || n[4] || n[5] || "").replace(y, p)),
                        "~=" === n[2] && (n[3] = " " + n[3] + " "),
                        n.slice(0, 4)
                    );
                },
                CHILD: function(n) {
                    return (
                        (n[1] = n[1].toLowerCase()),
                        "nth" === n[1].slice(0, 3) ?
                        (n[3] || u.error(n[0]),
                            (n[4] = +(n[4] ?
                                n[5] + (n[6] || 1) :
                                2 * ("even" === n[3] || "odd" === n[3]))),
                            (n[5] = +(n[7] + n[8] || "odd" === n[3]))) :
                        n[3] && u.error(n[0]),
                        n
                    );
                },
                PSEUDO: function(n) {
                    var i,
                        t = !n[6] && n[2];
                    return vt.CHILD.test(n[0]) ?
                        null :
                        (n[3] ?
                            (n[2] = n[4] || n[5] || "") :
                            t &&
                            er.test(t) &&
                            (i = ft(t, !0)) &&
                            (i = t.indexOf(")", t.length - i) - t.length) &&
                            ((n[0] = n[0].slice(0, i)), (n[2] = t.slice(0, i))),
                            n.slice(0, 3));
                },
            },
            filter: {
                TAG: function(n) {
                    var t = n.replace(y, p).toLowerCase();
                    return "*" === n ?

                        function() {
                            return !0;
                        } :
                        function(n) {
                            return n.nodeName && n.nodeName.toLowerCase() === t;
                        };
                },
                CLASS: function(n) {
                    var t = hi[n + " "];
                    return (
                        t ||
                        ((t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) &&
                            hi(n, function(n) {
                                return t.test(
                                    ("string" == typeof n.className && n.className) ||
                                    ("undefined" != typeof n.getAttribute &&
                                        n.getAttribute("class")) ||
                                    ""
                                );
                            }))
                    );
                },
                ATTR: function(n, t, i) {
                    return function(r) {
                        var f = u.attr(r, n);
                        return null == f ?
                            "!=" === t :
                            !t ||
                            ((f += ""),
                                "=" === t ?
                                f === i :
                                "!=" === t ?
                                f !== i :
                                "^=" === t ?
                                i && 0 === f.indexOf(i) :
                                "*=" === t ?
                                i && f.indexOf(i) > -1 :
                                "$=" === t ?
                                i && f.slice(-i.length) === i :
                                "~=" === t ?
                                (" " + f.replace(ir, " ") + " ").indexOf(i) > -1 :
                                "|=" === t &&
                                (f === i || f.slice(0, i.length + 1) === i + "-"));
                    };
                },
                CHILD: function(n, t, i, r, u) {
                    var s = "nth" !== n.slice(0, 3),
                        o = "last" !== n.slice(-4),
                        e = "of-type" === t;
                    return 1 === r && 0 === u ?

                        function(n) {
                            return !!n.parentNode;
                        } :
                        function(t, i, h) {
                            var p,
                                w,
                                y,
                                c,
                                a,
                                b,
                                k = s !== o ? "nextSibling" : "previousSibling",
                                d = t.parentNode,
                                nt = e && t.nodeName.toLowerCase(),
                                g = !h && !e,
                                l = !1;
                            if (d) {
                                if (s) {
                                    while (k) {
                                        for (c = t;
                                            (c = c[k]);)
                                            if (
                                                e ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType
                                            )
                                                return !1;
                                        b = k = "only" === n && !b && "nextSibling";
                                    }
                                    return !0;
                                }
                                if (((b = [o ? d.firstChild : d.lastChild]), o && g)) {
                                    for (
                                        c = d,
                                        y = c[f] || (c[f] = {}),
                                        w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                                        p = w[n] || [],
                                        a = p[0] === v && p[1],
                                        l = a && p[2],
                                        c = a && d.childNodes[a];
                                        (c = (++a && c && c[k]) || (l = a = 0) || b.pop());

                                    )
                                        if (1 === c.nodeType && ++l && c === t) {
                                            w[n] = [v, a, l];
                                            break;
                                        }
                                } else if (
                                    (g &&
                                        ((c = t),
                                            (y = c[f] || (c[f] = {})),
                                            (w = y[c.uniqueID] || (y[c.uniqueID] = {})),
                                            (p = w[n] || []),
                                            (a = p[0] === v && p[1]),
                                            (l = a)),
                                        l === !1)
                                )
                                    while ((c = (++a && c && c[k]) || (l = a = 0) || b.pop()))
                                        if (
                                            (e ?
                                                c.nodeName.toLowerCase() === nt :
                                                1 === c.nodeType) &&
                                            ++l &&
                                            (g &&
                                                ((y = c[f] || (c[f] = {})),
                                                    (w = y[c.uniqueID] || (y[c.uniqueID] = {})),
                                                    (w[n] = [v, l])),
                                                c === t)
                                        )
                                            break;
                                return (l -= u), l === r || (l % r == 0 && l / r >= 0);
                            }
                        };
                },
                PSEUDO: function(n, i) {
                    var e,
                        r =
                        t.pseudos[n] ||
                        t.setFilters[n.toLowerCase()] ||
                        u.error("unsupported pseudo: " + n);
                    return r[f] ?
                        r(i) :
                        r.length > 1 ?
                        ((e = [n, n, "", i]),
                            t.setFilters.hasOwnProperty(n.toLowerCase()) ?
                            l(function(n, t) {
                                for (var u, f = r(n, i), e = f.length; e--;)
                                    (u = nt(n, f[e])), (n[u] = !(t[u] = f[e]));
                            }) :
                            function(n) {
                                return r(n, 0, e);
                            }) :
                        r;
                },
            },
            pseudos: {
                not: l(function(n) {
                    var t = [],
                        r = [],
                        i = bt(n.replace(at, "$1"));
                    return i[f] ?
                        l(function(n, t, r, u) {
                            for (var e, o = i(n, null, u, []), f = n.length; f--;)
                                (e = o[f]) && (n[f] = !(t[f] = e));
                        }) :
                        function(n, u, f) {
                            return (t[0] = n), i(t, null, f, r), (t[0] = null), !r.pop();
                        };
                }),
                has: l(function(n) {
                    return function(t) {
                        return u(n, t).length > 0;
                    };
                }),
                contains: l(function(n) {
                    return (
                        (n = n.replace(y, p)),
                        function(t) {
                            return (t.textContent || t.innerText || st(t)).indexOf(n) > -1;
                        }
                    );
                }),
                lang: l(function(n) {
                    return (
                        or.test(n || "") || u.error("unsupported lang: " + n),
                        (n = n.replace(y, p).toLowerCase()),
                        function(t) {
                            var i;
                            do
                                if (
                                    (i = h ?
                                        t.lang :
                                        t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                )
                                    return (
                                        (i = i.toLowerCase()), i === n || 0 === i.indexOf(n + "-")
                                    );
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1;
                        }
                    );
                }),
                target: function(t) {
                    var i = n.location && n.location.hash;
                    return i && i.slice(1) === t.id;
                },
                root: function(n) {
                    return n === s;
                },
                focus: function(n) {
                    return (
                        n === i.activeElement &&
                        (!i.hasFocus || i.hasFocus()) &&
                        !!(n.type || n.href || ~n.tabIndex)
                    );
                },
                enabled: bi(!1),
                disabled: bi(!0),
                checked: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return (
                        ("input" === t && !!n.checked) || ("option" === t && !!n.selected)
                    );
                },
                selected: function(n) {
                    return n.parentNode && n.parentNode.selectedIndex, n.selected === !0;
                },
                empty: function(n) {
                    for (n = n.firstChild; n; n = n.nextSibling)
                        if (n.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(n) {
                    return !t.pseudos.empty(n);
                },
                header: function(n) {
                    return hr.test(n.nodeName);
                },
                input: function(n) {
                    return sr.test(n.nodeName);
                },
                button: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return ("input" === t && "button" === n.type) || "button" === t;
                },
                text: function(n) {
                    var t;
                    return (
                        "input" === n.nodeName.toLowerCase() &&
                        "text" === n.type &&
                        (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase())
                    );
                },
                first: it(function() {
                    return [0];
                }),
                last: it(function(n, t) {
                    return [t - 1];
                }),
                eq: it(function(n, t, i) {
                    return [i < 0 ? i + t : i];
                }),
                even: it(function(n, t) {
                    for (var i = 0; i < t; i += 2) n.push(i);
                    return n;
                }),
                odd: it(function(n, t) {
                    for (var i = 1; i < t; i += 2) n.push(i);
                    return n;
                }),
                lt: it(function(n, t, i) {
                    for (var r = i < 0 ? i + t : i; --r >= 0;) n.push(r);
                    return n;
                }),
                gt: it(function(n, t, i) {
                    for (var r = i < 0 ? i + t : i; ++r < t;) n.push(r);
                    return n;
                }),
            },
        };
        t.pseudos.nth = t.pseudos.eq;
        for (rt in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
            t.pseudos[rt] = ar(rt);
        for (rt in { submit: !0, reset: !0 }) t.pseudos[rt] = vr(rt);
        return (
            (ki.prototype = t.filters = t.pseudos),
            (t.setFilters = new ki()),
            (ft = u.tokenize = function(n, i) {
                var e,
                    f,
                    s,
                    o,
                    r,
                    h,
                    c,
                    l = ci[n + " "];
                if (l) return i ? 0 : l.slice(0);
                for (r = n, h = [], c = t.preFilter; r;) {
                    (!e || (f = rr.exec(r))) &&
                    (f && (r = r.slice(f[0].length) || r), h.push((s = [])));
                    e = !1;
                    (f = ur.exec(r)) &&
                    ((e = f.shift()),
                        s.push({ value: e, type: f[0].replace(at, " ") }),
                        (r = r.slice(e.length)));
                    for (o in t.filter)
                        (f = vt[o].exec(r)) &&
                        (!c[o] || (f = c[o](f))) &&
                        ((e = f.shift()),
                            s.push({ value: e, type: o, matches: f }),
                            (r = r.slice(e.length)));
                    if (!e) break;
                }
                return i ? r.length : r ? u.error(n) : ci(n, h).slice(0);
            }),
            (bt = u.compile = function(n, t) {
                var r,
                    u = [],
                    e = [],
                    i = lt[n + " "];
                if (!i) {
                    for (t || (t = ft(n)), r = t.length; r--;)
                        (i = ei(t[r])), i[f] ? u.push(i) : e.push(i);
                    i = lt(n, pr(e, u));
                    i.selector = n;
                }
                return i;
            }),
            (si = u.select = function(n, i, r, u) {
                var o,
                    f,
                    e,
                    l,
                    a,
                    c = "function" == typeof n && n,
                    s = !u && ft((n = c.selector || n));
                if (((r = r || []), 1 === s.length)) {
                    if (
                        ((f = s[0] = s[0].slice(0)),
                            f.length > 2 &&
                            "ID" === (e = f[0]).type &&
                            9 === i.nodeType &&
                            h &&
                            t.relative[f[1].type])
                    ) {
                        if (((i = (t.find.ID(e.matches[0].replace(y, p), i) || [])[0]), !i))
                            return r;
                        c && (i = i.parentNode);
                        n = n.slice(f.shift().value.length);
                    }
                    for (o = vt.needsContext.test(n) ? 0 : f.length; o--;) {
                        if (((e = f[o]), t.relative[(l = e.type)])) break;
                        if (
                            (a = t.find[l]) &&
                            (u = a(
                                e.matches[0].replace(y, p),
                                (ni.test(f[0].type) && ri(i.parentNode)) || i
                            ))
                        ) {
                            if ((f.splice(o, 1), (n = u.length && yt(f)), !n))
                                return k.apply(r, u), r;
                            break;
                        }
                    }
                }
                return (
                    (c || bt(n, s))(
                        u,
                        i, !h,
                        r, !i || (ni.test(n) && ri(i.parentNode)) || i
                    ),
                    r
                );
            }),
            (e.sortStable = f.split("").sort(kt).join("") === f),
            (e.detectDuplicates = !!ut),
            b(),
            (e.sortDetached = a(function(n) {
                return 1 & n.compareDocumentPosition(i.createElement("fieldset"));
            })),
            a(function(n) {
                return (
                    (n.innerHTML = "<a href='#'></a>"),
                    "#" === n.firstChild.getAttribute("href")
                );
            }) ||
            ii("type|href|height|width", function(n, t, i) {
                if (!i) return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
            }),
            (e.attributes &&
                a(function(n) {
                    return (
                        (n.innerHTML = "<input/>"),
                        n.firstChild.setAttribute("value", ""),
                        "" === n.firstChild.getAttribute("value")
                    );
                })) ||
            ii("value", function(n, t, i) {
                if (!i && "input" === n.nodeName.toLowerCase()) return n.defaultValue;
            }),
            a(function(n) {
                return null == n.getAttribute("disabled");
            }) ||
            ii(dt, function(n, t, i) {
                var r;
                if (!i)
                    return n[t] === !0 ?
                        t.toLowerCase() :
                        (r = n.getAttributeNode(t)) && r.specified ?
                        r.value :
                        null;
            }),
            u
        );
    })(n);
    i.find = y;
    i.expr = y.selectors;
    i.expr[":"] = i.expr.pseudos;
    i.uniqueSort = i.unique = y.uniqueSort;
    i.text = y.getText;
    i.isXMLDoc = y.isXML;
    i.contains = y.contains;
    i.escapeSelector = y.escape;
    var g = function(n, t, r) {
            for (var u = [], f = void 0 !== r;
                (n = n[t]) && 9 !== n.nodeType;)
                if (1 === n.nodeType) {
                    if (f && i(n).is(r)) break;
                    u.push(n);
                }
            return u;
        },
        ur = function(n, t) {
            for (var i = []; n; n = n.nextSibling)
                1 === n.nodeType && n !== t && i.push(n);
            return i;
        },
        fr = i.expr.match.needsContext;
    ei = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    er = /^.[^:#\[\.,]*$/;
    i.filter = function(n, t, r) {
        var u = t[0];
        return (
            r && (n = ":not(" + n + ")"),
            1 === t.length && 1 === u.nodeType ?
            i.find.matchesSelector(u, n) ? [u] : [] :
            i.find.matches(
                n,
                i.grep(t, function(n) {
                    return 1 === n.nodeType;
                })
            )
        );
    };
    i.fn.extend({
        find: function(n) {
            var t,
                r,
                u = this.length,
                f = this;
            if ("string" != typeof n)
                return this.pushStack(
                    i(n).filter(function() {
                        for (t = 0; t < u; t++)
                            if (i.contains(f[t], this)) return !0;
                    })
                );
            for (r = this.pushStack([]), t = 0; t < u; t++) i.find(n, f[t], r);
            return u > 1 ? i.uniqueSort(r) : r;
        },
        filter: function(n) {
            return this.pushStack(oi(this, n || [], !1));
        },
        not: function(n) {
            return this.pushStack(oi(this, n || [], !0));
        },
        is: function(n) {
            return !!oi(this, "string" == typeof n && fr.test(n) ? i(n) : n || [], !1)
                .length;
        },
    });
    sr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    hr = i.fn.init = function(n, t, r) {
        var f, e;
        if (!n) return this;
        if (((r = r || or), "string" == typeof n)) {
            if (
                ((f =
                    "<" === n[0] && ">" === n[n.length - 1] && n.length >= 3 ? [null, n, null] :
                    sr.exec(n)), !f || (!f[1] && t))
            )
                return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n);
            if (f[1]) {
                if (
                    ((t = t instanceof i ? t[0] : t),
                        i.merge(
                            this,
                            i.parseHTML(f[1], t && t.nodeType ? t.ownerDocument || t : u, !0)
                        ),
                        ei.test(f[1]) && i.isPlainObject(t))
                )
                    for (f in t)
                        i.isFunction(this[f]) ? this[f](t[f]) : this.attr(f, t[f]);
                return this;
            }
            return (
                (e = u.getElementById(f[2])),
                e && ((this[0] = e), (this.length = 1)),
                this
            );
        }
        return n.nodeType ?
            ((this[0] = n), (this.length = 1), this) :
            i.isFunction(n) ?
            void 0 !== r.ready ?
            r.ready(n) :
            n(i) :
            i.makeArray(n, this);
    };
    hr.prototype = i.fn;
    or = i(u);
    cr = /^(?:parents|prev(?:Until|All))/;
    lr = { children: !0, contents: !0, next: !0, prev: !0 };
    i.fn.extend({
        has: function(n) {
            var t = i(n, this),
                r = t.length;
            return this.filter(function() {
                for (var n = 0; n < r; n++)
                    if (i.contains(this, t[n])) return !0;
            });
        },
        closest: function(n, t) {
            var r,
                f = 0,
                o = this.length,
                u = [],
                e = "string" != typeof n && i(n);
            if (!fr.test(n))
                for (; f < o; f++)
                    for (r = this[f]; r && r !== t; r = r.parentNode)
                        if (
                            r.nodeType < 11 &&
                            (e ?
                                e.index(r) > -1 :
                                1 === r.nodeType && i.find.matchesSelector(r, n))
                        ) {
                            u.push(r);
                            break;
                        }
            return this.pushStack(u.length > 1 ? i.uniqueSort(u) : u);
        },
        index: function(n) {
            return n ?
                "string" == typeof n ?
                ot.call(i(n), this[0]) :
                ot.call(this, n.jquery ? n[0] : n) :
                this[0] && this[0].parentNode ?
                this.first().prevAll().length :
                -1;
        },
        add: function(n, t) {
            return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))));
        },
        addBack: function(n) {
            return this.add(null == n ? this.prevObject : this.prevObject.filter(n));
        },
    });
    i.each({
            parent: function(n) {
                var t = n.parentNode;
                return t && 11 !== t.nodeType ? t : null;
            },
            parents: function(n) {
                return g(n, "parentNode");
            },
            parentsUntil: function(n, t, i) {
                return g(n, "parentNode", i);
            },
            next: function(n) {
                return ar(n, "nextSibling");
            },
            prev: function(n) {
                return ar(n, "previousSibling");
            },
            nextAll: function(n) {
                return g(n, "nextSibling");
            },
            prevAll: function(n) {
                return g(n, "previousSibling");
            },
            nextUntil: function(n, t, i) {
                return g(n, "nextSibling", i);
            },
            prevUntil: function(n, t, i) {
                return g(n, "previousSibling", i);
            },
            siblings: function(n) {
                return ur((n.parentNode || {}).firstChild, n);
            },
            children: function(n) {
                return ur(n.firstChild);
            },
            contents: function(n) {
                return l(n, "iframe") ?
                    n.contentDocument :
                    (l(n, "template") && (n = n.content || n),
                        i.merge([], n.childNodes));
            },
        },
        function(n, t) {
            i.fn[n] = function(r, u) {
                var f = i.map(this, t, r);
                return (
                    "Until" !== n.slice(-5) && (u = r),
                    u && "string" == typeof u && (f = i.filter(u, f)),
                    this.length > 1 &&
                    (lr[n] || i.uniqueSort(f), cr.test(n) && f.reverse()),
                    this.pushStack(f)
                );
            };
        }
    );
    h = /[^\x20\t\r\n\f]+/g;
    i.Callbacks = function(n) {
        n = "string" == typeof n ? ne(n) : i.extend({}, n);
        var e,
            r,
            h,
            u,
            t = [],
            o = [],
            f = -1,
            c = function() {
                for (u = u || n.once, h = e = !0; o.length; f = -1)
                    for (r = o.shift(); ++f < t.length;)
                        t[f].apply(r[0], r[1]) === !1 &&
                        n.stopOnFalse &&
                        ((f = t.length), (r = !1));
                n.memory || (r = !1);
                e = !1;
                u && (t = r ? [] : "");
            },
            s = {
                add: function() {
                    return (
                        t &&
                        (r && !e && ((f = t.length - 1), o.push(r)),
                            (function u(r) {
                                i.each(r, function(r, f) {
                                    i.isFunction(f) ?
                                        (n.unique && s.has(f)) || t.push(f) :
                                        f && f.length && "string" !== i.type(f) && u(f);
                                });
                            })(arguments),
                            r && !e && c()),
                        this
                    );
                },
                remove: function() {
                    return (
                        i.each(arguments, function(n, r) {
                            for (var u;
                                (u = i.inArray(r, t, u)) > -1;)
                                t.splice(u, 1), u <= f && f--;
                        }),
                        this
                    );
                },
                has: function(n) {
                    return n ? i.inArray(n, t) > -1 : t.length > 0;
                },
                empty: function() {
                    return t && (t = []), this;
                },
                disable: function() {
                    return (u = o = []), (t = r = ""), this;
                },
                disabled: function() {
                    return !t;
                },
                lock: function() {
                    return (u = o = []), r || e || (t = r = ""), this;
                },
                locked: function() {
                    return !!u;
                },
                fireWith: function(n, t) {
                    return (
                        u ||
                        ((t = t || []),
                            (t = [n, t.slice ? t.slice() : t]),
                            o.push(t),
                            e || c()),
                        this
                    );
                },
                fire: function() {
                    return s.fireWith(this, arguments), this;
                },
                fired: function() {
                    return !!h;
                },
            };
        return s;
    };
    i.extend({
        Deferred: function(t) {
            var u = [
                    [
                        "notify",
                        "progress",
                        i.Callbacks("memory"),
                        i.Callbacks("memory"),
                        2,
                    ],
                    [
                        "resolve",
                        "done",
                        i.Callbacks("once memory"),
                        i.Callbacks("once memory"),
                        0,
                        "resolved",
                    ],
                    [
                        "reject",
                        "fail",
                        i.Callbacks("once memory"),
                        i.Callbacks("once memory"),
                        1,
                        "rejected",
                    ],
                ],
                e = "pending",
                f = {
                    state: function() {
                        return e;
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this;
                    },
                    catch: function(n) {
                        return f.then(null, n);
                    },
                    pipe: function() {
                        var n = arguments;
                        return i
                            .Deferred(function(t) {
                                i.each(u, function(u, f) {
                                    var e = i.isFunction(n[f[4]]) && n[f[4]];
                                    r[f[1]](function() {
                                        var n = e && e.apply(this, arguments);
                                        n && i.isFunction(n.promise) ?
                                            n
                                            .promise()
                                            .progress(t.notify)
                                            .done(t.resolve)
                                            .fail(t.reject) :
                                            t[f[0] + "With"](this, e ? [n] : arguments);
                                    });
                                });
                                n = null;
                            })
                            .promise();
                    },
                    then: function(t, r, f) {
                        function o(t, r, u, f) {
                            return function() {
                                var s = this,
                                    h = arguments,
                                    l = function() {
                                        var n, c;
                                        if (!(t < e)) {
                                            if (((n = u.apply(s, h)), n === r.promise()))
                                                throw new TypeError("Thenable self-resolution");
                                            c =
                                                n &&
                                                ("object" == typeof n || "function" == typeof n) &&
                                                n.then;
                                            i.isFunction(c) ?
                                                f ?
                                                c.call(n, o(e, r, nt, f), o(e, r, pt, f)) :
                                                (e++,
                                                    c.call(
                                                        n,
                                                        o(e, r, nt, f),
                                                        o(e, r, pt, f),
                                                        o(e, r, nt, r.notifyWith)
                                                    )) :
                                                (u !== nt && ((s = void 0), (h = [n])),
                                                    (f || r.resolveWith)(s, h));
                                        }
                                    },
                                    c = f ?
                                    l :
                                    function() {
                                        try {
                                            l();
                                        } catch (n) {
                                            i.Deferred.exceptionHook &&
                                                i.Deferred.exceptionHook(n, c.stackTrace);
                                            t + 1 >= e &&
                                                (u !== pt && ((s = void 0), (h = [n])),
                                                    r.rejectWith(s, h));
                                        }
                                    };
                                t
                                    ?
                                    c() :
                                    (i.Deferred.getStackHook &&
                                        (c.stackTrace = i.Deferred.getStackHook()),
                                        n.setTimeout(c));
                            };
                        }
                        var e = 0;
                        return i
                            .Deferred(function(n) {
                                u[0][3].add(o(0, n, i.isFunction(f) ? f : nt, n.notifyWith));
                                u[1][3].add(o(0, n, i.isFunction(t) ? t : nt));
                                u[2][3].add(o(0, n, i.isFunction(r) ? r : pt));
                            })
                            .promise();
                    },
                    promise: function(n) {
                        return null != n ? i.extend(n, f) : f;
                    },
                },
                r = {};
            return (
                i.each(u, function(n, t) {
                    var i = t[2],
                        o = t[5];
                    f[t[1]] = i.add;
                    o &&
                        i.add(
                            function() {
                                e = o;
                            },
                            u[3 - n][2].disable,
                            u[0][2].lock
                        );
                    i.add(t[3].fire);
                    r[t[0]] = function() {
                        return (
                            r[t[0] + "With"](this === r ? void 0 : this, arguments), this
                        );
                    };
                    r[t[0] + "With"] = i.fireWith;
                }),
                f.promise(r),
                t && t.call(r, r),
                r
            );
        },
        when: function(n) {
            var f = arguments.length,
                t = f,
                e = Array(t),
                u = w.call(arguments),
                r = i.Deferred(),
                o = function(n) {
                    return function(t) {
                        e[n] = this;
                        u[n] = arguments.length > 1 ? w.call(arguments) : t;
                        --f || r.resolveWith(e, u);
                    };
                };
            if (
                f <= 1 &&
                (vr(n, r.done(o(t)).resolve, r.reject, !f),
                    "pending" === r.state() || i.isFunction(u[t] && u[t].then))
            )
                return r.then();
            while (t--) vr(u[t], o(t), r.reject);
            return r.promise();
        },
    });
    yr = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    i.Deferred.exceptionHook = function(t, i) {
        n.console &&
            n.console.warn &&
            t &&
            yr.test(t.name) &&
            n.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i);
    };
    i.readyException = function(t) {
        n.setTimeout(function() {
            throw t;
        });
    };
    wt = i.Deferred();
    i.fn.ready = function(n) {
        return (
            wt.then(n)["catch"](function(n) {
                i.readyException(n);
            }),
            this
        );
    };
    i.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(n) {
            (n === !0 ? --i.readyWait : i.isReady) ||
            ((i.isReady = !0),
                (n !== !0 && --i.readyWait > 0) || wt.resolveWith(u, [i]));
        },
    });
    i.ready.then = wt.then;
    "complete" === u.readyState ||
        ("loading" !== u.readyState && !u.documentElement.doScroll) ?
        n.setTimeout(i.ready) :
        (u.addEventListener("DOMContentLoaded", bt),
            n.addEventListener("load", bt));
    v = function(n, t, r, u, f, e, o) {
        var s = 0,
            c = n.length,
            h = null == r;
        if ("object" === i.type(r)) {
            f = !0;
            for (s in r) v(n, t, s, r[s], !0, e, o);
        } else if (
            void 0 !== u &&
            ((f = !0),
                i.isFunction(u) || (o = !0),
                h &&
                (o ?
                    (t.call(n, u), (t = null)) :
                    ((h = t),
                        (t = function(n, t, r) {
                            return h.call(i(n), r);
                        }))),
                t)
        )
            for (; s < c; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
        return f ? n : h ? t.call(n) : c ? t(n[0], r) : e;
    };
    st = function(n) {
        return 1 === n.nodeType || 9 === n.nodeType || !+n.nodeType;
    };
    ht.uid = 1;
    ht.prototype = {
        cache: function(n) {
            var t = n[this.expando];
            return (
                t ||
                ((t = {}),
                    st(n) &&
                    (n.nodeType ?
                        (n[this.expando] = t) :
                        Object.defineProperty(n, this.expando, {
                            value: t,
                            configurable: !0,
                        }))),
                t
            );
        },
        set: function(n, t, r) {
            var u,
                f = this.cache(n);
            if ("string" == typeof t) f[i.camelCase(t)] = r;
            else
                for (u in t) f[i.camelCase(u)] = t[u];
            return f;
        },
        get: function(n, t) {
            return void 0 === t ?
                this.cache(n) :
                n[this.expando] && n[this.expando][i.camelCase(t)];
        },
        access: function(n, t, i) {
            return void 0 === t || (t && "string" == typeof t && void 0 === i) ?
                this.get(n, t) :
                (this.set(n, t, i), void 0 !== i ? i : t);
        },
        remove: function(n, t) {
            var u,
                r = n[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t)
                    for (
                        Array.isArray(t) ?
                        (t = t.map(i.camelCase)) :
                        ((t = i.camelCase(t)), (t = (t in r) ? [t] : t.match(h) || [])),
                        u = t.length; u--;

                    )
                        delete r[t[u]];
                (void 0 === t || i.isEmptyObject(r)) &&
                (n.nodeType ? (n[this.expando] = void 0) : delete n[this.expando]);
            }
        },
        hasData: function(n) {
            var t = n[this.expando];
            return void 0 !== t && !i.isEmptyObject(t);
        },
    };
    var r = new ht(),
        e = new ht(),
        te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ie = /[A-Z]/g;
    i.extend({
        hasData: function(n) {
            return e.hasData(n) || r.hasData(n);
        },
        data: function(n, t, i) {
            return e.access(n, t, i);
        },
        removeData: function(n, t) {
            e.remove(n, t);
        },
        _data: function(n, t, i) {
            return r.access(n, t, i);
        },
        _removeData: function(n, t) {
            r.remove(n, t);
        },
    });
    i.fn.extend({
        data: function(n, t) {
            var o,
                f,
                s,
                u = this[0],
                h = u && u.attributes;
            if (void 0 === n) {
                if (
                    this.length &&
                    ((s = e.get(u)), 1 === u.nodeType && !r.get(u, "hasDataAttrs"))
                ) {
                    for (o = h.length; o--;)
                        h[o] &&
                        ((f = h[o].name),
                            0 === f.indexOf("data-") &&
                            ((f = i.camelCase(f.slice(5))), pr(u, f, s[f])));
                    r.set(u, "hasDataAttrs", !0);
                }
                return s;
            }
            return "object" == typeof n ?
                this.each(function() {
                    e.set(this, n);
                }) :
                v(
                    this,
                    function(t) {
                        var i;
                        if (u && void 0 === t) {
                            if (
                                ((i = e.get(u, n)), void 0 !== i) ||
                                ((i = pr(u, n)), void 0 !== i)
                            )
                                return i;
                        } else
                            this.each(function() {
                                e.set(this, n, t);
                            });
                    },
                    null,
                    t,
                    arguments.length > 1,
                    null, !0
                );
        },
        removeData: function(n) {
            return this.each(function() {
                e.remove(this, n);
            });
        },
    });
    i.extend({
        queue: function(n, t, u) {
            var f;
            if (n)
                return (
                    (t = (t || "fx") + "queue"),
                    (f = r.get(n, t)),
                    u &&
                    (!f || Array.isArray(u) ?
                        (f = r.access(n, t, i.makeArray(u))) :
                        f.push(u)),
                    f || []
                );
        },
        dequeue: function(n, t) {
            t = t || "fx";
            var r = i.queue(n, t),
                e = r.length,
                u = r.shift(),
                f = i._queueHooks(n, t),
                o = function() {
                    i.dequeue(n, t);
                };
            "inprogress" === u && ((u = r.shift()), e--);
            u &&
                ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
            !e && f && f.empty.fire();
        },
        _queueHooks: function(n, t) {
            var u = t + "queueHooks";
            return (
                r.get(n, u) ||
                r.access(n, u, {
                    empty: i.Callbacks("once memory").add(function() {
                        r.remove(n, [t + "queue", u]);
                    }),
                })
            );
        },
    });
    i.fn.extend({
        queue: function(n, t) {
            var r = 2;
            return (
                "string" != typeof n && ((t = n), (n = "fx"), r--),
                arguments.length < r ?
                i.queue(this[0], n) :
                void 0 === t ?
                this :
                this.each(function() {
                    var r = i.queue(this, n, t);
                    i._queueHooks(this, n);
                    "fx" === n && "inprogress" !== r[0] && i.dequeue(this, n);
                })
            );
        },
        dequeue: function(n) {
            return this.each(function() {
                i.dequeue(this, n);
            });
        },
        clearQueue: function(n) {
            return this.queue(n || "fx", []);
        },
        promise: function(n, t) {
            var u,
                e = 1,
                o = i.Deferred(),
                f = this,
                s = this.length,
                h = function() {
                    --e || o.resolveWith(f, [f]);
                };
            for (
                "string" != typeof n && ((t = n), (n = void 0)), n = n || "fx"; s--;

            )
                (u = r.get(f[s], n + "queueHooks")),
                u && u.empty && (e++, u.empty.add(h));
            return h(), o.promise(t);
        },
    });
    var wr = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ct = new RegExp("^(?:([+-])=|)(" + wr + ")([a-z%]*)$", "i"),
        b = ["Top", "Right", "Bottom", "Left"],
        kt = function(n, t) {
            return (
                (n = t || n),
                "none" === n.style.display ||
                ("" === n.style.display &&
                    i.contains(n.ownerDocument, n) &&
                    "none" === i.css(n, "display"))
            );
        },
        br = function(n, t, i, r) {
            var f,
                u,
                e = {};
            for (u in t)(e[u] = n.style[u]), (n.style[u] = t[u]);
            f = i.apply(n, r || []);
            for (u in t) n.style[u] = e[u];
            return f;
        };
    si = {};
    i.fn.extend({
        show: function() {
            return tt(this, !0);
        },
        hide: function() {
            return tt(this);
        },
        toggle: function(n) {
            return "boolean" == typeof n ?
                n ?
                this.show() :
                this.hide() :
                this.each(function() {
                    kt(this) ? i(this).show() : i(this).hide();
                });
        },
    });
    var dr = /^(?:checkbox|radio)$/i,
        gr = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        nu = /^$|\/(?:java|ecma)script/i,
        c = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
        };
    c.optgroup = c.option;
    c.tbody = c.tfoot = c.colgroup = c.caption = c.thead;
    c.th = c.td;
    tu = /<|&#?\w+;/;
    !(function() {
        var i = u.createDocumentFragment(),
            n = i.appendChild(u.createElement("div")),
            t = u.createElement("input");
        t.setAttribute("type", "radio");
        t.setAttribute("checked", "checked");
        t.setAttribute("name", "t");
        n.appendChild(t);
        f.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
        n.innerHTML = "<textarea>x</textarea>";
        f.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue;
    })();
    var dt = u.documentElement,
        fe = /^key/,
        ee = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        ru = /^([^.]*)(?:\.(.+)|)/;
    i.event = {
        global: {},
        add: function(n, t, u, f, e) {
            var v,
                y,
                w,
                p,
                b,
                c,
                s,
                l,
                o,
                k,
                d,
                a = r.get(n);
            if (a)
                for (
                    u.handler && ((v = u), (u = v.handler), (e = v.selector)),
                    e && i.find.matchesSelector(dt, e),
                    u.guid || (u.guid = i.guid++),
                    (p = a.events) || (p = a.events = {}),
                    (y = a.handle) ||
                    (y = a.handle = function(t) {
                        if ("undefined" != typeof i && i.event.triggered !== t.type)
                            return i.event.dispatch.apply(n, arguments);
                    }),
                    t = (t || "").match(h) || [""],
                    b = t.length; b--;

                )
                    (w = ru.exec(t[b]) || []),
                    (o = d = w[1]),
                    (k = (w[2] || "").split(".").sort()),
                    o &&
                    ((s = i.event.special[o] || {}),
                        (o = (e ? s.delegateType : s.bindType) || o),
                        (s = i.event.special[o] || {}),
                        (c = i.extend({
                                type: o,
                                origType: d,
                                data: f,
                                handler: u,
                                guid: u.guid,
                                selector: e,
                                needsContext: e && i.expr.match.needsContext.test(e),
                                namespace: k.join("."),
                            },
                            v
                        )),
                        (l = p[o]) ||
                        ((l = p[o] = []),
                            (l.delegateCount = 0),
                            (s.setup && s.setup.call(n, f, k, y) !== !1) ||
                            (n.addEventListener && n.addEventListener(o, y))),
                        s.add &&
                        (s.add.call(n, c), c.handler.guid || (c.handler.guid = u.guid)),
                        e ? l.splice(l.delegateCount++, 0, c) : l.push(c),
                        (i.event.global[o] = !0));
        },
        remove: function(n, t, u, f, e) {
            var y,
                k,
                c,
                v,
                p,
                s,
                l,
                a,
                o,
                b,
                d,
                w = r.hasData(n) && r.get(n);
            if (w && (v = w.events)) {
                for (t = (t || "").match(h) || [""], p = t.length; p--;)
                    if (
                        ((c = ru.exec(t[p]) || []),
                            (o = d = c[1]),
                            (b = (c[2] || "").split(".").sort()),
                            o)
                    ) {
                        for (
                            l = i.event.special[o] || {},
                            o = (f ? l.delegateType : l.bindType) || o,
                            a = v[o] || [],
                            c =
                            c[2] &&
                            new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                            k = y = a.length; y--;

                        )
                            (s = a[y]),
                            (!e && d !== s.origType) ||
                            (u && u.guid !== s.guid) ||
                            (c && !c.test(s.namespace)) ||
                            (f && f !== s.selector && ("**" !== f || !s.selector)) ||
                            (a.splice(y, 1),
                                s.selector && a.delegateCount--,
                                l.remove && l.remove.call(n, s));
                        k &&
                            !a.length &&
                            ((l.teardown && l.teardown.call(n, b, w.handle) !== !1) ||
                                i.removeEvent(n, o, w.handle),
                                delete v[o]);
                    } else
                        for (o in v) i.event.remove(n, o + t[p], u, f, !0);
                i.isEmptyObject(v) && r.remove(n, "handle events");
            }
        },
        dispatch: function(n) {
            var t = i.event.fix(n),
                u,
                c,
                s,
                e,
                f,
                l,
                h = new Array(arguments.length),
                a = (r.get(this, "events") || {})[t.type] || [],
                o = i.event.special[t.type] || {};
            for (h[0] = t, u = 1; u < arguments.length; u++) h[u] = arguments[u];
            if (
                ((t.delegateTarget = this), !o.preDispatch || o.preDispatch.call(this, t) !== !1)
            ) {
                for (
                    l = i.event.handlers.call(this, t, a), u = 0;
                    (e = l[u++]) && !t.isPropagationStopped();

                )
                    for (
                        t.currentTarget = e.elem, c = 0;
                        (f = e.handlers[c++]) && !t.isImmediatePropagationStopped();

                    )
                        (t.rnamespace && !t.rnamespace.test(f.namespace)) ||
                        ((t.handleObj = f),
                            (t.data = f.data),
                            (s = (
                                (i.event.special[f.origType] || {}).handle || f.handler
                            ).apply(e.elem, h)),
                            void 0 !== s &&
                            (t.result = s) === !1 &&
                            (t.preventDefault(), t.stopPropagation()));
                return o.postDispatch && o.postDispatch.call(this, t), t.result;
            }
        },
        handlers: function(n, t) {
            var f,
                e,
                u,
                o,
                s,
                c = [],
                h = t.delegateCount,
                r = n.target;
            if (h && r.nodeType && !("click" === n.type && n.button >= 1))
                for (; r !== this; r = r.parentNode || this)
                    if (1 === r.nodeType && ("click" !== n.type || r.disabled !== !0)) {
                        for (o = [], s = {}, f = 0; f < h; f++)
                            (e = t[f]),
                            (u = e.selector + " "),
                            void 0 === s[u] &&
                            (s[u] = e.needsContext ?
                                i(u, this).index(r) > -1 :
                                i.find(u, this, null, [r]).length),
                            s[u] && o.push(e);
                        o.length && c.push({ elem: r, handlers: o });
                    }
            return (
                (r = this), h < t.length && c.push({ elem: r, handlers: t.slice(h) }), c
            );
        },
        addProp: function(n, t) {
            Object.defineProperty(i.Event.prototype, n, {
                enumerable: !0,
                configurable: !0,
                get: i.isFunction(t) ?

                    function() {
                        if (this.originalEvent) return t(this.originalEvent);
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[n];
                    },
                set: function(t) {
                    Object.defineProperty(this, n, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t,
                    });
                },
            });
        },
        fix: function(n) {
            return n[i.expando] ? n : new i.Event(n);
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function() {
                    if (this !== uu() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function() {
                    if (this === uu() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && l(this, "input"))
                        return this.click(), !1;
                },
                _default: function(n) {
                    return l(n.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function(n) {
                    void 0 !== n.result &&
                        n.originalEvent &&
                        (n.originalEvent.returnValue = n.result);
                },
            },
        },
    };
    i.removeEvent = function(n, t, i) {
        n.removeEventListener && n.removeEventListener(t, i);
    };
    i.Event = function(n, t) {
        return this instanceof i.Event ?
            (n && n.type ?
                ((this.originalEvent = n),
                    (this.type = n.type),
                    (this.isDefaultPrevented =
                        n.defaultPrevented ||
                        (void 0 === n.defaultPrevented && n.returnValue === !1) ?
                        gt :
                        it),
                    (this.target =
                        n.target && 3 === n.target.nodeType ?
                        n.target.parentNode :
                        n.target),
                    (this.currentTarget = n.currentTarget),
                    (this.relatedTarget = n.relatedTarget)) :
                (this.type = n),
                t && i.extend(this, t),
                (this.timeStamp = (n && n.timeStamp) || i.now()),
                void(this[i.expando] = !0)) :
            new i.Event(n, t);
    };
    i.Event.prototype = {
        constructor: i.Event,
        isDefaultPrevented: it,
        isPropagationStopped: it,
        isImmediatePropagationStopped: it,
        isSimulated: !1,
        preventDefault: function() {
            var n = this.originalEvent;
            this.isDefaultPrevented = gt;
            n && !this.isSimulated && n.preventDefault();
        },
        stopPropagation: function() {
            var n = this.originalEvent;
            this.isPropagationStopped = gt;
            n && !this.isSimulated && n.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var n = this.originalEvent;
            this.isImmediatePropagationStopped = gt;
            n && !this.isSimulated && n.stopImmediatePropagation();
            this.stopPropagation();
        },
    };
    i.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(n) {
                var t = n.button;
                return null == n.which && fe.test(n.type) ?
                    null != n.charCode ?
                    n.charCode :
                    n.keyCode :
                    !n.which && void 0 !== t && ee.test(n.type) ?
                    1 & t ?
                    1 :
                    2 & t ?
                    3 :
                    4 & t ?
                    2 :
                    0 :
                    n.which;
            },
        },
        i.event.addProp
    );
    i.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout",
        },
        function(n, t) {
            i.event.special[n] = {
                delegateType: t,
                bindType: t,
                handle: function(n) {
                    var u,
                        f = this,
                        r = n.relatedTarget,
                        e = n.handleObj;
                    return (
                        (r && (r === f || i.contains(f, r))) ||
                        ((n.type = e.origType),
                            (u = e.handler.apply(this, arguments)),
                            (n.type = t)),
                        u
                    );
                },
            };
        }
    );
    i.fn.extend({
        on: function(n, t, i, r) {
            return ci(this, n, t, i, r);
        },
        one: function(n, t, i, r) {
            return ci(this, n, t, i, r, 1);
        },
        off: function(n, t, r) {
            var u, f;
            if (n && n.preventDefault && n.handleObj)
                return (
                    (u = n.handleObj),
                    i(n.delegateTarget).off(
                        u.namespace ? u.origType + "." + u.namespace : u.origType,
                        u.selector,
                        u.handler
                    ),
                    this
                );
            if ("object" == typeof n) {
                for (f in n) this.off(f, t, n[f]);
                return this;
            }
            return (
                (t !== !1 && "function" != typeof t) || ((r = t), (t = void 0)),
                r === !1 && (r = it),
                this.each(function() {
                    i.event.remove(this, n, r, t);
                })
            );
        },
    });
    var oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        se = /<script|<style|<link/i,
        he = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ce = /^true\/(.*)/,
        le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    i.extend({
        htmlPrefilter: function(n) {
            return n.replace(oe, "<$1></$2>");
        },
        clone: function(n, t, r) {
            var u,
                c,
                s,
                e,
                h = n.cloneNode(!0),
                l = i.contains(n.ownerDocument, n);
            if (!(
                    f.noCloneChecked ||
                    (1 !== n.nodeType && 11 !== n.nodeType) ||
                    i.isXMLDoc(n)
                ))
                for (e = o(h), s = o(n), u = 0, c = s.length; u < c; u++)
                    ye(s[u], e[u]);
            if (t)
                if (r)
                    for (s = s || o(n), e = e || o(h), u = 0, c = s.length; u < c; u++)
                        eu(s[u], e[u]);
                else eu(n, h);
            return (
                (e = o(h, "script")), e.length > 0 && hi(e, !l && o(n, "script")), h
            );
        },
        cleanData: function(n) {
            for (var u, t, f, s = i.event.special, o = 0; void 0 !== (t = n[o]); o++)
                if (st(t)) {
                    if ((u = t[r.expando])) {
                        if (u.events)
                            for (f in u.events)
                                s[f] ? i.event.remove(t, f) : i.removeEvent(t, f, u.handle);
                        t[r.expando] = void 0;
                    }
                    t[e.expando] && (t[e.expando] = void 0);
                }
        },
    });
    i.fn.extend({
        detach: function(n) {
            return ou(this, n, !0);
        },
        remove: function(n) {
            return ou(this, n);
        },
        text: function(n) {
            return v(
                this,
                function(n) {
                    return void 0 === n ?
                        i.text(this) :
                        this.empty().each(function() {
                            (1 !== this.nodeType &&
                                11 !== this.nodeType &&
                                9 !== this.nodeType) ||
                            (this.textContent = n);
                        });
                },
                null,
                n,
                arguments.length
            );
        },
        append: function() {
            return rt(this, arguments, function(n) {
                if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                ) {
                    var t = fu(this, n);
                    t.appendChild(n);
                }
            });
        },
        prepend: function() {
            return rt(this, arguments, function(n) {
                if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                ) {
                    var t = fu(this, n);
                    t.insertBefore(n, t.firstChild);
                }
            });
        },
        before: function() {
            return rt(this, arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this);
            });
        },
        after: function() {
            return rt(this, arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this.nextSibling);
            });
        },
        empty: function() {
            for (var n, t = 0; null != (n = this[t]); t++)
                1 === n.nodeType && (i.cleanData(o(n, !1)), (n.textContent = ""));
            return this;
        },
        clone: function(n, t) {
            return (
                (n = null != n && n),
                (t = null == t ? n : t),
                this.map(function() {
                    return i.clone(this, n, t);
                })
            );
        },
        html: function(n) {
            return v(
                this,
                function(n) {
                    var t = this[0] || {},
                        r = 0,
                        u = this.length;
                    if (void 0 === n && 1 === t.nodeType) return t.innerHTML;
                    if (
                        "string" == typeof n &&
                        !se.test(n) &&
                        !c[(gr.exec(n) || ["", ""])[1].toLowerCase()]
                    ) {
                        n = i.htmlPrefilter(n);
                        try {
                            for (; r < u; r++)
                                (t = this[r] || {}),
                                1 === t.nodeType &&
                                (i.cleanData(o(t, !1)), (t.innerHTML = n));
                            t = 0;
                        } catch (f) {}
                    }
                    t && this.empty().append(n);
                },
                null,
                n,
                arguments.length
            );
        },
        replaceWith: function() {
            var n = [];
            return rt(
                this,
                arguments,
                function(t) {
                    var r = this.parentNode;
                    i.inArray(this, n) < 0 &&
                        (i.cleanData(o(this)), r && r.replaceChild(t, this));
                },
                n
            );
        },
    });
    i.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith",
        },
        function(n, t) {
            i.fn[n] = function(n) {
                for (var u, f = [], e = i(n), o = e.length - 1, r = 0; r <= o; r++)
                    (u = r === o ? this : this.clone(!0)),
                    i(e[r])[t](u),
                    ui.apply(f, u.get());
                return this.pushStack(f);
            };
        }
    );
    var su = /^margin/,
        li = new RegExp("^(" + wr + ")(?!px)[a-z%]+$", "i"),
        ni = function(t) {
            var i = t.ownerDocument.defaultView;
            return (i && i.opener) || (i = n), i.getComputedStyle(t);
        };
    !(function() {
        function r() {
            if (t) {
                t.style.cssText =
                    "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
                t.innerHTML = "";
                dt.appendChild(e);
                var i = n.getComputedStyle(t);
                o = "1%" !== i.top;
                c = "2px" === i.marginLeft;
                s = "4px" === i.width;
                t.style.marginRight = "50%";
                h = "4px" === i.marginRight;
                dt.removeChild(e);
                t = null;
            }
        }
        var o,
            s,
            h,
            c,
            e = u.createElement("div"),
            t = u.createElement("div");
        t.style &&
            ((t.style.backgroundClip = "content-box"),
                (t.cloneNode(!0).style.backgroundClip = ""),
                (f.clearCloneStyle = "content-box" === t.style.backgroundClip),
                (e.style.cssText =
                    "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
                e.appendChild(t),
                i.extend(f, {
                    pixelPosition: function() {
                        return r(), o;
                    },
                    boxSizingReliable: function() {
                        return r(), s;
                    },
                    pixelMarginRight: function() {
                        return r(), h;
                    },
                    reliableMarginLeft: function() {
                        return r(), c;
                    },
                }));
    })();
    var pe = /^(none|table(?!-c[ea]).+)/,
        cu = /^--/,
        we = { position: "absolute", visibility: "hidden", display: "block" },
        lu = { letterSpacing: "0", fontWeight: "400" },
        au = ["Webkit", "Moz", "ms"],
        vu = u.createElement("div").style;
    i.extend({
        cssHooks: {
            opacity: {
                get: function(n, t) {
                    if (t) {
                        var i = lt(n, "opacity");
                        return "" === i ? "1" : i;
                    }
                },
            },
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
        },
        cssProps: { float: "cssFloat" },
        style: function(n, t, r, u) {
            if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
                var e,
                    s,
                    o,
                    c = i.camelCase(t),
                    l = cu.test(t),
                    h = n.style;
                return (
                    l || (t = yu(c)),
                    (o = i.cssHooks[t] || i.cssHooks[c]),
                    void 0 === r ?
                    o && "get" in o && void 0 !== (e = o.get(n, !1, u)) ?
                    e :
                    h[t] :
                    ((s = typeof r),
                        "string" === s &&
                        (e = ct.exec(r)) &&
                        e[1] &&
                        ((r = kr(n, t, e)), (s = "number")),
                        null != r &&
                        r === r &&
                        ("number" === s &&
                            (r += (e && e[3]) || (i.cssNumber[c] ? "" : "px")),
                            f.clearCloneStyle ||
                            "" !== r ||
                            0 !== t.indexOf("background") ||
                            (h[t] = "inherit"),
                            (o && "set" in o && void 0 === (r = o.set(n, r, u))) ||
                            (l ? h.setProperty(t, r) : (h[t] = r))),
                        void 0)
                );
            }
        },
        css: function(n, t, r, u) {
            var f,
                o,
                e,
                s = i.camelCase(t),
                h = cu.test(t);
            return (
                h || (t = yu(s)),
                (e = i.cssHooks[t] || i.cssHooks[s]),
                e && "get" in e && (f = e.get(n, !0, r)),
                void 0 === f && (f = lt(n, t, u)),
                "normal" === f && t in lu && (f = lu[t]),
                "" === r || r ?
                ((o = parseFloat(f)), r === !0 || isFinite(o) ? o || 0 : f) :
                f
            );
        },
    });
    i.each(["height", "width"], function(n, t) {
        i.cssHooks[t] = {
            get: function(n, r, u) {
                if (r)
                    return !pe.test(i.css(n, "display")) ||
                        (n.getClientRects().length && n.getBoundingClientRect().width) ?
                        bu(n, t, u) :
                        br(n, we, function() {
                            return bu(n, t, u);
                        });
            },
            set: function(n, r, u) {
                var f,
                    e = u && ni(n),
                    o =
                    u && wu(n, t, u, "border-box" === i.css(n, "boxSizing", !1, e), e);
                return (
                    o &&
                    (f = ct.exec(r)) &&
                    "px" !== (f[3] || "px") &&
                    ((n.style[t] = r), (r = i.css(n, t))),
                    pu(n, r, o)
                );
            },
        };
    });
    i.cssHooks.marginLeft = hu(f.reliableMarginLeft, function(n, t) {
        if (t)
            return (
                (parseFloat(lt(n, "marginLeft")) ||
                    n.getBoundingClientRect().left -
                    br(n, { marginLeft: 0 }, function() {
                        return n.getBoundingClientRect().left;
                    })) + "px"
            );
    });
    i.each({ margin: "", padding: "", border: "Width" }, function(n, t) {
        i.cssHooks[n + t] = {
            expand: function(i) {
                for (
                    var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; r < 4; r++
                )
                    f[n + b[r] + t] = u[r] || u[r - 2] || u[0];
                return f;
            },
        };
        su.test(n) || (i.cssHooks[n + t].set = pu);
    });
    i.fn.extend({
        css: function(n, t) {
            return v(
                this,
                function(n, t, r) {
                    var f,
                        e,
                        o = {},
                        u = 0;
                    if (Array.isArray(t)) {
                        for (f = ni(n), e = t.length; u < e; u++)
                            o[t[u]] = i.css(n, t[u], !1, f);
                        return o;
                    }
                    return void 0 !== r ? i.style(n, t, r) : i.css(n, t);
                },
                n,
                t,
                arguments.length > 1
            );
        },
    });
    i.Tween = s;
    s.prototype = {
        constructor: s,
        init: function(n, t, r, u, f, e) {
            this.elem = n;
            this.prop = r;
            this.easing = f || i.easing._default;
            this.options = t;
            this.start = this.now = this.cur();
            this.end = u;
            this.unit = e || (i.cssNumber[r] ? "" : "px");
        },
        cur: function() {
            var n = s.propHooks[this.prop];
            return n && n.get ? n.get(this) : s.propHooks._default.get(this);
        },
        run: function(n) {
            var t,
                r = s.propHooks[this.prop];
            return (
                (this.pos = this.options.duration ?
                    (t = i.easing[this.easing](
                        n,
                        this.options.duration * n,
                        0,
                        1,
                        this.options.duration
                    )) :
                    (t = n)),
                (this.now = (this.end - this.start) * t + this.start),
                this.options.step && this.options.step.call(this.elem, this.now, this),
                r && r.set ? r.set(this) : s.propHooks._default.set(this),
                this
            );
        },
    };
    s.prototype.init.prototype = s.prototype;
    s.propHooks = {
        _default: {
            get: function(n) {
                var t;
                return 1 !== n.elem.nodeType ||
                    (null != n.elem[n.prop] && null == n.elem.style[n.prop]) ?
                    n.elem[n.prop] :
                    ((t = i.css(n.elem, n.prop, "")), t && "auto" !== t ? t : 0);
            },
            set: function(n) {
                i.fx.step[n.prop] ?
                    i.fx.step[n.prop](n) :
                    1 !== n.elem.nodeType ||
                    (null == n.elem.style[i.cssProps[n.prop]] && !i.cssHooks[n.prop]) ?
                    (n.elem[n.prop] = n.now) :
                    i.style(n.elem, n.prop, n.now + n.unit);
            },
        },
    };
    s.propHooks.scrollTop = s.propHooks.scrollLeft = {
        set: function(n) {
            n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now);
        },
    };
    i.easing = {
        linear: function(n) {
            return n;
        },
        swing: function(n) {
            return 0.5 - Math.cos(n * Math.PI) / 2;
        },
        _default: "swing",
    };
    i.fx = s.prototype.init;
    i.fx.step = {};
    ku = /^(?:toggle|show|hide)$/;
    du = /queueHooks$/;
    i.Animation = i.extend(a, {
        tweeners: {
            "*": [
                function(n, t) {
                    var i = this.createTween(n, t);
                    return kr(i.elem, n, ct.exec(t), i), i;
                },
            ],
        },
        tweener: function(n, t) {
            i.isFunction(n) ? ((t = n), (n = ["*"])) : (n = n.match(h));
            for (var r, u = 0, f = n.length; u < f; u++)
                (r = n[u]),
                (a.tweeners[r] = a.tweeners[r] || []),
                a.tweeners[r].unshift(t);
        },
        prefilters: [ke],
        prefilter: function(n, t) {
            t ? a.prefilters.unshift(n) : a.prefilters.push(n);
        },
    });
    i.speed = function(n, t, r) {
        var u =
            n && "object" == typeof n ?
            i.extend({}, n) : {
                complete: r || (!r && t) || (i.isFunction(n) && n),
                duration: n,
                easing: (r && t) || (t && !i.isFunction(t) && t),
            };
        return (
            i.fx.off ?
            (u.duration = 0) :
            "number" != typeof u.duration &&
            (u.duration =
                u.duration in i.fx.speeds ?
                i.fx.speeds[u.duration] :
                i.fx.speeds._default),
            (null != u.queue && u.queue !== !0) || (u.queue = "fx"),
            (u.old = u.complete),
            (u.complete = function() {
                i.isFunction(u.old) && u.old.call(this);
                u.queue && i.dequeue(this, u.queue);
            }),
            u
        );
    };
    i.fn.extend({
        fadeTo: function(n, t, i, r) {
            return this.filter(kt)
                .css("opacity", 0)
                .show()
                .end()
                .animate({ opacity: t }, n, i, r);
        },
        animate: function(n, t, u, f) {
            var s = i.isEmptyObject(n),
                o = i.speed(t, u, f),
                e = function() {
                    var t = a(this, i.extend({}, n), o);
                    (s || r.get(this, "finish")) && t.stop(!0);
                };
            return (
                (e.finish = e),
                s || o.queue === !1 ? this.each(e) : this.queue(o.queue, e)
            );
        },
        stop: function(n, t, u) {
            var f = function(n) {
                var t = n.stop;
                delete n.stop;
                t(u);
            };
            return (
                "string" != typeof n && ((u = t), (t = n), (n = void 0)),
                t && n !== !1 && this.queue(n || "fx", []),
                this.each(function() {
                    var s = !0,
                        t = null != n && n + "queueHooks",
                        o = i.timers,
                        e = r.get(this);
                    if (t) e[t] && e[t].stop && f(e[t]);
                    else
                        for (t in e) e[t] && e[t].stop && du.test(t) && f(e[t]);
                    for (t = o.length; t--;)
                        o[t].elem !== this ||
                        (null != n && o[t].queue !== n) ||
                        (o[t].anim.stop(u), (s = !1), o.splice(t, 1));
                    (!s && u) || i.dequeue(this, n);
                })
            );
        },
        finish: function(n) {
            return (
                n !== !1 && (n = n || "fx"),
                this.each(function() {
                    var t,
                        e = r.get(this),
                        u = e[n + "queue"],
                        o = e[n + "queueHooks"],
                        f = i.timers,
                        s = u ? u.length : 0;
                    for (
                        e.finish = !0,
                        i.queue(this, n, []),
                        o && o.stop && o.stop.call(this, !0),
                        t = f.length; t--;

                    )
                        f[t].elem === this &&
                        f[t].queue === n &&
                        (f[t].anim.stop(!0), f.splice(t, 1));
                    for (t = 0; t < s; t++) u[t] && u[t].finish && u[t].finish.call(this);
                    delete e.finish;
                })
            );
        },
    });
    i.each(["toggle", "show", "hide"], function(n, t) {
        var r = i.fn[t];
        i.fn[t] = function(n, i, u) {
            return null == n || "boolean" == typeof n ?
                r.apply(this, arguments) :
                this.animate(ii(t, !0), n, i, u);
        };
    });
    i.each({
            slideDown: ii("show"),
            slideUp: ii("hide"),
            slideToggle: ii("toggle"),
            fadeIn: { opacity: "show" },
            fadeOut: { opacity: "hide" },
            fadeToggle: { opacity: "toggle" },
        },
        function(n, t) {
            i.fn[n] = function(n, i, r) {
                return this.animate(t, n, i, r);
            };
        }
    );
    i.timers = [];
    i.fx.tick = function() {
        var r,
            n = 0,
            t = i.timers;
        for (ut = i.now(); n < t.length; n++)
            (r = t[n]), r() || t[n] !== r || t.splice(n--, 1);
        t.length || i.fx.stop();
        ut = void 0;
    };
    i.fx.timer = function(n) {
        i.timers.push(n);
        i.fx.start();
    };
    i.fx.interval = 13;
    i.fx.start = function() {
        ti || ((ti = !0), ai());
    };
    i.fx.stop = function() {
        ti = null;
    };
    i.fx.speeds = { slow: 600, fast: 200, _default: 400 };
    (i.fn.delay = function(t, r) {
        return (
            (t = i.fx ? i.fx.speeds[t] || t : t),
            (r = r || "fx"),
            this.queue(r, function(i, r) {
                var u = n.setTimeout(i, t);
                r.stop = function() {
                    n.clearTimeout(u);
                };
            })
        );
    }),
    (function() {
        var n = u.createElement("input"),
            t = u.createElement("select"),
            i = t.appendChild(u.createElement("option"));
        n.type = "checkbox";
        f.checkOn = "" !== n.value;
        f.optSelected = i.selected;
        n = u.createElement("input");
        n.value = "t";
        n.type = "radio";
        f.radioValue = "t" === n.value;
    })();
    ft = i.expr.attrHandle;
    i.fn.extend({
        attr: function(n, t) {
            return v(this, i.attr, n, t, arguments.length > 1);
        },
        removeAttr: function(n) {
            return this.each(function() {
                i.removeAttr(this, n);
            });
        },
    });
    i.extend({
        attr: function(n, t, r) {
            var u,
                f,
                e = n.nodeType;
            if (3 !== e && 8 !== e && 2 !== e)
                return "undefined" == typeof n.getAttribute ?
                    i.prop(n, t, r) :
                    ((1 === e && i.isXMLDoc(n)) ||
                        (f =
                            i.attrHooks[t.toLowerCase()] ||
                            (i.expr.match.bool.test(t) ? tf : void 0)),
                        void 0 !== r ?
                        null === r ?
                        void i.removeAttr(n, t) :
                        f && "set" in f && void 0 !== (u = f.set(n, r, t)) ?
                        u :
                        (n.setAttribute(t, r + ""), r) :
                        f && "get" in f && null !== (u = f.get(n, t)) ?
                        u :
                        ((u = i.find.attr(n, t)), null == u ? void 0 : u));
        },
        attrHooks: {
            type: {
                set: function(n, t) {
                    if (!f.radioValue && "radio" === t && l(n, "input")) {
                        var i = n.value;
                        return n.setAttribute("type", t), i && (n.value = i), t;
                    }
                },
            },
        },
        removeAttr: function(n, t) {
            var i,
                u = 0,
                r = t && t.match(h);
            if (r && 1 === n.nodeType)
                while ((i = r[u++])) n.removeAttribute(i);
        },
    });
    tf = {
        set: function(n, t, r) {
            return t === !1 ? i.removeAttr(n, r) : n.setAttribute(r, r), r;
        },
    };
    i.each(i.expr.match.bool.source.match(/\w+/g), function(n, t) {
        var r = ft[t] || i.find.attr;
        ft[t] = function(n, t, i) {
            var f,
                e,
                u = t.toLowerCase();
            return (
                i ||
                ((e = ft[u]),
                    (ft[u] = f),
                    (f = null != r(n, t, i) ? u : null),
                    (ft[u] = e)),
                f
            );
        };
    });
    rf = /^(?:input|select|textarea|button)$/i;
    uf = /^(?:a|area)$/i;
    i.fn.extend({
        prop: function(n, t) {
            return v(this, i.prop, n, t, arguments.length > 1);
        },
        removeProp: function(n) {
            return this.each(function() {
                delete this[i.propFix[n] || n];
            });
        },
    });
    i.extend({
        prop: function(n, t, r) {
            var f,
                u,
                e = n.nodeType;
            if (3 !== e && 8 !== e && 2 !== e)
                return (
                    (1 === e && i.isXMLDoc(n)) ||
                    ((t = i.propFix[t] || t), (u = i.propHooks[t])),
                    void 0 !== r ?
                    u && "set" in u && void 0 !== (f = u.set(n, r, t)) ?
                    f :
                    (n[t] = r) :
                    u && "get" in u && null !== (f = u.get(n, t)) ?
                    f :
                    n[t]
                );
        },
        propHooks: {
            tabIndex: {
                get: function(n) {
                    var t = i.find.attr(n, "tabindex");
                    return t ?
                        parseInt(t, 10) :
                        rf.test(n.nodeName) || (uf.test(n.nodeName) && n.href) ?
                        0 :
                        -1;
                },
            },
        },
        propFix: { for: "htmlFor", class: "className" },
    });
    f.optSelected ||
        (i.propHooks.selected = {
            get: function(n) {
                var t = n.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null;
            },
            set: function(n) {
                var t = n.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
            },
        });
    i.each(
        [
            "tabIndex",
            "readOnly",
            "maxLength",
            "cellSpacing",
            "cellPadding",
            "rowSpan",
            "colSpan",
            "useMap",
            "frameBorder",
            "contentEditable",
        ],
        function() {
            i.propFix[this.toLowerCase()] = this;
        }
    );
    i.fn.extend({
        addClass: function(n) {
            var o,
                t,
                r,
                u,
                f,
                s,
                e,
                c = 0;
            if (i.isFunction(n))
                return this.each(function(t) {
                    i(this).addClass(n.call(this, t, d(this)));
                });
            if ("string" == typeof n && n)
                for (o = n.match(h) || [];
                    (t = this[c++]);)
                    if (((u = d(t)), (r = 1 === t.nodeType && " " + k(u) + " "))) {
                        for (s = 0;
                            (f = o[s++]);)
                            r.indexOf(" " + f + " ") < 0 && (r += f + " ");
                        e = k(r);
                        u !== e && t.setAttribute("class", e);
                    }
            return this;
        },
        removeClass: function(n) {
            var o,
                r,
                t,
                u,
                f,
                s,
                e,
                c = 0;
            if (i.isFunction(n))
                return this.each(function(t) {
                    i(this).removeClass(n.call(this, t, d(this)));
                });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof n && n)
                for (o = n.match(h) || [];
                    (r = this[c++]);)
                    if (((u = d(r)), (t = 1 === r.nodeType && " " + k(u) + " "))) {
                        for (s = 0;
                            (f = o[s++]);)
                            while (t.indexOf(" " + f + " ") > -1)
                                t = t.replace(" " + f + " ", " ");
                        e = k(t);
                        u !== e && r.setAttribute("class", e);
                    }
            return this;
        },
        toggleClass: function(n, t) {
            var u = typeof n;
            return "boolean" == typeof t && "string" === u ?
                t ?
                this.addClass(n) :
                this.removeClass(n) :
                i.isFunction(n) ?
                this.each(function(r) {
                    i(this).toggleClass(n.call(this, r, d(this), t), t);
                }) :
                this.each(function() {
                    var t, e, f, o;
                    if ("string" === u)
                        for (e = 0, f = i(this), o = n.match(h) || [];
                            (t = o[e++]);)
                            f.hasClass(t) ? f.removeClass(t) : f.addClass(t);
                    else
                        (void 0 !== n && "boolean" !== u) ||
                        ((t = d(this)),
                            t && r.set(this, "__className__", t),
                            this.setAttribute &&
                            this.setAttribute(
                                "class",
                                t || n === !1 ? "" : r.get(this, "__className__") || ""
                            ));
                });
        },
        hasClass: function(n) {
            for (var t, r = 0, i = " " + n + " ";
                (t = this[r++]);)
                if (1 === t.nodeType && (" " + k(d(t)) + " ").indexOf(i) > -1)
                    return !0;
            return !1;
        },
    });
    ff = /\r/g;
    i.fn.extend({
        val: function(n) {
            var t,
                r,
                f,
                u = this[0];
            return arguments.length ?
                ((f = i.isFunction(n)),
                    this.each(function(r) {
                        var u;
                        1 === this.nodeType &&
                            ((u = f ? n.call(this, r, i(this).val()) : n),
                                null == u ?
                                (u = "") :
                                "number" == typeof u ?
                                (u += "") :
                                Array.isArray(u) &&
                                (u = i.map(u, function(n) {
                                    return null == n ? "" : n + "";
                                })),
                                (t =
                                    i.valHooks[this.type] ||
                                    i.valHooks[this.nodeName.toLowerCase()]),
                                (t && "set" in t && void 0 !== t.set(this, u, "value")) ||
                                (this.value = u));
                    })) :
                u ?
                ((t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()]),
                    t && "get" in t && void 0 !== (r = t.get(u, "value")) ?
                    r :
                    ((r = u.value),
                        "string" == typeof r ? r.replace(ff, "") : null == r ? "" : r)) :
                void 0;
        },
    });
    i.extend({
        valHooks: {
            option: {
                get: function(n) {
                    var t = i.find.attr(n, "value");
                    return null != t ? t : k(i.text(n));
                },
            },
            select: {
                get: function(n) {
                    for (
                        var e,
                            t,
                            o = n.options,
                            u = n.selectedIndex,
                            f = "select-one" === n.type,
                            s = f ? null : [],
                            h = f ? u + 1 : o.length,
                            r = u < 0 ? h : f ? u : 0; r < h; r++
                    )
                        if (
                            ((t = o[r]),
                                (t.selected || r === u) &&
                                !t.disabled &&
                                (!t.parentNode.disabled || !l(t.parentNode, "optgroup")))
                        ) {
                            if (((e = i(t).val()), f)) return e;
                            s.push(e);
                        }
                    return s;
                },
                set: function(n, t) {
                    for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--;)
                        (r = f[o]),
                        (r.selected = i.inArray(i.valHooks.option.get(r), e) > -1) &&
                        (u = !0);
                    return u || (n.selectedIndex = -1), e;
                },
            },
        },
    });
    i.each(["radio", "checkbox"], function() {
        i.valHooks[this] = {
            set: function(n, t) {
                if (Array.isArray(t))
                    return (n.checked = i.inArray(i(n).val(), t) > -1);
            },
        };
        f.checkOn ||
            (i.valHooks[this].get = function(n) {
                return null === n.getAttribute("value") ? "on" : n.value;
            });
    });
    vi = /^(?:focusinfocus|focusoutblur)$/;
    i.extend(i.event, {
        trigger: function(t, f, e, o) {
            var w,
                s,
                c,
                b,
                a,
                v,
                l,
                p = [e || u],
                h = yt.call(t, "type") ? t.type : t,
                y = yt.call(t, "namespace") ? t.namespace.split(".") : [];
            if (
                ((s = c = e = e || u),
                    3 !== e.nodeType &&
                    8 !== e.nodeType &&
                    !vi.test(h + i.event.triggered) &&
                    (h.indexOf(".") > -1 &&
                        ((y = h.split(".")), (h = y.shift()), y.sort()),
                        (a = h.indexOf(":") < 0 && "on" + h),
                        (t = t[i.expando] ? t : new i.Event(h, "object" == typeof t && t)),
                        (t.isTrigger = o ? 2 : 3),
                        (t.namespace = y.join(".")),
                        (t.rnamespace = t.namespace ?
                            new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                            null),
                        (t.result = void 0),
                        t.target || (t.target = e),
                        (f = null == f ? [t] : i.makeArray(f, [t])),
                        (l = i.event.special[h] || {}),
                        o || !l.trigger || l.trigger.apply(e, f) !== !1))
            ) {
                if (!o && !l.noBubble && !i.isWindow(e)) {
                    for (
                        b = l.delegateType || h, vi.test(b + h) || (s = s.parentNode); s; s = s.parentNode
                    )
                        p.push(s), (c = s);
                    c === (e.ownerDocument || u) &&
                        p.push(c.defaultView || c.parentWindow || n);
                }
                for (w = 0;
                    (s = p[w++]) && !t.isPropagationStopped();)
                    (t.type = w > 1 ? b : l.bindType || h),
                    (v = (r.get(s, "events") || {})[t.type] && r.get(s, "handle")),
                    v && v.apply(s, f),
                    (v = a && s[a]),
                    v &&
                    v.apply &&
                    st(s) &&
                    ((t.result = v.apply(s, f)),
                        t.result === !1 && t.preventDefault());
                return (
                    (t.type = h),
                    o ||
                    t.isDefaultPrevented() ||
                    (l._default && l._default.apply(p.pop(), f) !== !1) ||
                    !st(e) ||
                    (a &&
                        i.isFunction(e[h]) &&
                        !i.isWindow(e) &&
                        ((c = e[a]),
                            c && (e[a] = null),
                            (i.event.triggered = h),
                            e[h](),
                            (i.event.triggered = void 0),
                            c && (e[a] = c))),
                    t.result
                );
            }
        },
        simulate: function(n, t, r) {
            var u = i.extend(new i.Event(), r, { type: n, isSimulated: !0 });
            i.event.trigger(u, null, t);
        },
    });
    i.fn.extend({
        trigger: function(n, t) {
            return this.each(function() {
                i.event.trigger(n, t, this);
            });
        },
        triggerHandler: function(n, t) {
            var r = this[0];
            if (r) return i.event.trigger(n, t, r, !0);
        },
    });
    i.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
            " "
        ),
        function(n, t) {
            i.fn[t] = function(n, i) {
                return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t);
            };
        }
    );
    i.fn.extend({
        hover: function(n, t) {
            return this.mouseenter(n).mouseleave(t || n);
        },
    });
    f.focusin = "onfocusin" in n;
    f.focusin ||
        i.each({ focus: "focusin", blur: "focusout" }, function(n, t) {
            var u = function(n) {
                i.event.simulate(t, n.target, i.event.fix(n));
            };
            i.event.special[t] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        f = r.access(i, t);
                    f || i.addEventListener(n, u, !0);
                    r.access(i, t, (f || 0) + 1);
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        f = r.access(i, t) - 1;
                    f
                        ?
                        r.access(i, t, f) :
                        (i.removeEventListener(n, u, !0), r.remove(i, t));
                },
            };
        });
    var at = n.location,
        ef = i.now(),
        yi = /\?/;
    i.parseXML = function(t) {
        var r;
        if (!t || "string" != typeof t) return null;
        try {
            r = new n.DOMParser().parseFromString(t, "text/xml");
        } catch (u) {
            r = void 0;
        }
        return (
            (r && !r.getElementsByTagName("parsererror").length) ||
            i.error("Invalid XML: " + t),
            r
        );
    };
    var ge = /\[\]$/,
        of = /\r?\n/g,
        no = /^(?:submit|button|image|reset|file)$/i,
        to = /^(?:input|select|textarea|keygen)/i;
    i.param = function(n, t) {
        var r,
            u = [],
            f = function(n, t) {
                var r = i.isFunction(t) ? t() : t;
                u[u.length] =
                    encodeURIComponent(n) + "=" + encodeURIComponent(null == r ? "" : r);
            };
        if (Array.isArray(n) || (n.jquery && !i.isPlainObject(n)))
            i.each(n, function() {
                f(this.name, this.value);
            });
        else
            for (r in n) pi(r, n[r], t, f);
        return u.join("&");
    };
    i.fn.extend({
        serialize: function() {
            return i.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                    var n = i.prop(this, "elements");
                    return n ? i.makeArray(n) : this;
                })
                .filter(function() {
                    var n = this.type;
                    return (
                        this.name &&
                        !i(this).is(":disabled") &&
                        to.test(this.nodeName) &&
                        !no.test(n) &&
                        (this.checked || !dr.test(n))
                    );
                })
                .map(function(n, t) {
                    var r = i(this).val();
                    return null == r ?
                        null :
                        Array.isArray(r) ?
                        i.map(r, function(n) {
                            return { name: t.name, value: n.replace(of, "\r\n") };
                        }) : { name: t.name, value: r.replace(of, "\r\n") };
                })
                .get();
        },
    });
    var io = /%20/g,
        ro = /#.*$/,
        uo = /([?&])_=[^&]*/,
        fo = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        eo = /^(?:GET|HEAD)$/,
        oo = /^\/\//,
        sf = {},
        wi = {},
        hf = "*/".concat("*"),
        bi = u.createElement("a");
    return (
        (bi.href = at.href),
        i.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: at.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    at.protocol
                ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": hf,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript",
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON",
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": i.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function(n, t) {
                return t ? ki(ki(n, i.ajaxSettings), t) : ki(i.ajaxSettings, n);
            },
            ajaxPrefilter: cf(sf),
            ajaxTransport: cf(wi),
            ajax: function(t, r) {
                function b(t, r, u, h) {
                    var y,
                        rt,
                        g,
                        p,
                        b,
                        l = r;
                    s ||
                        ((s = !0),
                            d && n.clearTimeout(d),
                            (a = void 0),
                            (k = h || ""),
                            (e.readyState = t > 0 ? 4 : 0),
                            (y = (t >= 200 && t < 300) || 304 === t),
                            u && (p = so(f, e, u)),
                            (p = ho(f, p, e, y)),
                            y ?
                            (f.ifModified &&
                                ((b = e.getResponseHeader("Last-Modified")),
                                    b && (i.lastModified[o] = b),
                                    (b = e.getResponseHeader("etag")),
                                    b && (i.etag[o] = b)),
                                204 === t || "HEAD" === f.type ?
                                (l = "nocontent") :
                                304 === t ?
                                (l = "notmodified") :
                                ((l = p.state), (rt = p.data), (g = p.error), (y = !g))) :
                            ((g = l), (!t && l) || ((l = "error"), t < 0 && (t = 0))),
                            (e.status = t),
                            (e.statusText = (r || l) + ""),
                            y ? tt.resolveWith(c, [rt, l, e]) : tt.rejectWith(c, [e, l, g]),
                            e.statusCode(w),
                            (w = void 0),
                            v &&
                            nt.trigger(y ? "ajaxSuccess" : "ajaxError", [e, f, y ? rt : g]),
                            it.fireWith(c, [e, l]),
                            v &&
                            (nt.trigger("ajaxComplete", [e, f]),
                                --i.active || i.event.trigger("ajaxStop")));
                }
                "object" == typeof t && ((r = t), (t = void 0));
                r = r || {};
                var a,
                    o,
                    k,
                    y,
                    d,
                    l,
                    s,
                    v,
                    g,
                    p,
                    f = i.ajaxSetup({}, r),
                    c = f.context || f,
                    nt = f.context && (c.nodeType || c.jquery) ? i(c) : i.event,
                    tt = i.Deferred(),
                    it = i.Callbacks("once memory"),
                    w = f.statusCode || {},
                    rt = {},
                    ut = {},
                    ft = "canceled",
                    e = {
                        readyState: 0,
                        getResponseHeader: function(n) {
                            var t;
                            if (s) {
                                if (!y)
                                    for (y = {};
                                        (t = fo.exec(k));) y[t[1].toLowerCase()] = t[2];
                                t = y[n.toLowerCase()];
                            }
                            return null == t ? null : t;
                        },
                        getAllResponseHeaders: function() {
                            return s ? k : null;
                        },
                        setRequestHeader: function(n, t) {
                            return (
                                null == s &&
                                ((n = ut[n.toLowerCase()] = ut[n.toLowerCase()] || n),
                                    (rt[n] = t)),
                                this
                            );
                        },
                        overrideMimeType: function(n) {
                            return null == s && (f.mimeType = n), this;
                        },
                        statusCode: function(n) {
                            var t;
                            if (n)
                                if (s) e.always(n[e.status]);
                                else
                                    for (t in n) w[t] = [w[t], n[t]];
                            return this;
                        },
                        abort: function(n) {
                            var t = n || ft;
                            return a && a.abort(t), b(0, t), this;
                        },
                    };
                if (
                    (tt.promise(e),
                        (f.url = ((t || f.url || at.href) + "").replace(
                            oo,
                            at.protocol + "//"
                        )),
                        (f.type = r.method || r.type || f.method || f.type),
                        (f.dataTypes = (f.dataType || "*").toLowerCase().match(h) || [""]),
                        null == f.crossDomain)
                ) {
                    l = u.createElement("a");
                    try {
                        l.href = f.url;
                        l.href = l.href;
                        f.crossDomain =
                            bi.protocol + "//" + bi.host != l.protocol + "//" + l.host;
                    } catch (et) {
                        f.crossDomain = !0;
                    }
                }
                if (
                    (f.data &&
                        f.processData &&
                        "string" != typeof f.data &&
                        (f.data = i.param(f.data, f.traditional)),
                        lf(sf, f, r, e),
                        s)
                )
                    return e;
                v = i.event && f.global;
                v && 0 == i.active++ && i.event.trigger("ajaxStart");
                f.type = f.type.toUpperCase();
                f.hasContent = !eo.test(f.type);
                o = f.url.replace(ro, "");
                f.hasContent ?
                    f.data &&
                    f.processData &&
                    0 ===
                    (f.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                    ) &&
                    (f.data = f.data.replace(io, "+")) :
                    ((p = f.url.slice(o.length)),
                        f.data && ((o += (yi.test(o) ? "&" : "?") + f.data), delete f.data),
                        f.cache === !1 &&
                        ((o = o.replace(uo, "$1")),
                            (p = (yi.test(o) ? "&" : "?") + "_=" + ef++ + p)),
                        (f.url = o + p));
                f.ifModified &&
                    (i.lastModified[o] &&
                        e.setRequestHeader("If-Modified-Since", i.lastModified[o]),
                        i.etag[o] && e.setRequestHeader("If-None-Match", i.etag[o]));
                ((f.data && f.hasContent && f.contentType !== !1) || r.contentType) &&
                e.setRequestHeader("Content-Type", f.contentType);
                e.setRequestHeader(
                    "Accept",
                    f.dataTypes[0] && f.accepts[f.dataTypes[0]] ?
                    f.accepts[f.dataTypes[0]] +
                    ("*" !== f.dataTypes[0] ? ", " + hf + "; q=0.01" : "") :
                    f.accepts["*"]
                );
                for (g in f.headers) e.setRequestHeader(g, f.headers[g]);
                if (f.beforeSend && (f.beforeSend.call(c, e, f) === !1 || s))
                    return e.abort();
                if (
                    ((ft = "abort"),
                        it.add(f.complete),
                        e.done(f.success),
                        e.fail(f.error),
                        (a = lf(wi, f, r, e)))
                ) {
                    if (((e.readyState = 1), v && nt.trigger("ajaxSend", [e, f]), s))
                        return e;
                    f.async &&
                        f.timeout > 0 &&
                        (d = n.setTimeout(function() {
                            e.abort("timeout");
                        }, f.timeout));
                    try {
                        s = !1;
                        a.send(rt, b);
                    } catch (et) {
                        if (s) throw et;
                        b(-1, et);
                    }
                } else b(-1, "No Transport");
                return e;
            },
            getJSON: function(n, t, r) {
                return i.get(n, t, r, "json");
            },
            getScript: function(n, t) {
                return i.get(n, void 0, t, "script");
            },
        }),
        i.each(["get", "post"], function(n, t) {
            i[t] = function(n, r, u, f) {
                return (
                    i.isFunction(r) && ((f = f || u), (u = r), (r = void 0)),
                    i.ajax(
                        i.extend({ url: n, type: t, dataType: f, data: r, success: u },
                            i.isPlainObject(n) && n
                        )
                    )
                );
            };
        }),
        (i._evalUrl = function(n) {
            return i.ajax({
                url: n,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0,
            });
        }),
        i.fn.extend({
            wrapAll: function(n) {
                var t;
                return (
                    this[0] &&
                    (i.isFunction(n) && (n = n.call(this[0])),
                        (t = i(n, this[0].ownerDocument).eq(0).clone(!0)),
                        this[0].parentNode && t.insertBefore(this[0]),
                        t
                        .map(function() {
                            for (var n = this; n.firstElementChild;)
                                n = n.firstElementChild;
                            return n;
                        })
                        .append(this)),
                    this
                );
            },
            wrapInner: function(n) {
                return i.isFunction(n) ?
                    this.each(function(t) {
                        i(this).wrapInner(n.call(this, t));
                    }) :
                    this.each(function() {
                        var t = i(this),
                            r = t.contents();
                        r.length ? r.wrapAll(n) : t.append(n);
                    });
            },
            wrap: function(n) {
                var t = i.isFunction(n);
                return this.each(function(r) {
                    i(this).wrapAll(t ? n.call(this, r) : n);
                });
            },
            unwrap: function(n) {
                return (
                    this.parent(n)
                    .not("body")
                    .each(function() {
                        i(this).replaceWith(this.childNodes);
                    }),
                    this
                );
            },
        }),
        (i.expr.pseudos.hidden = function(n) {
            return !i.expr.pseudos.visible(n);
        }),
        (i.expr.pseudos.visible = function(n) {
            return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length);
        }),
        (i.ajaxSettings.xhr = function() {
            try {
                return new n.XMLHttpRequest();
            } catch (t) {}
        }),
        (af = { 0: 200, 1223: 204 }),
        (et = i.ajaxSettings.xhr()),
        (f.cors = !!et && "withCredentials" in et),
        (f.ajax = et = !!et),
        i.ajaxTransport(function(t) {
            var i, r;
            if (f.cors || (et && !t.crossDomain))
                return {
                    send: function(u, f) {
                        var o,
                            e = t.xhr();
                        if (
                            (e.open(t.type, t.url, t.async, t.username, t.password),
                                t.xhrFields)
                        )
                            for (o in t.xhrFields) e[o] = t.xhrFields[o];
                        t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType);
                        t.crossDomain ||
                            u["X-Requested-With"] ||
                            (u["X-Requested-With"] = "XMLHttpRequest");
                        for (o in u) e.setRequestHeader(o, u[o]);
                        i = function(n) {
                            return function() {
                                i &&
                                    ((i = r = e.onload = e.onerror = e.onabort = e.onreadystatechange = null),
                                        "abort" === n ?
                                        e.abort() :
                                        "error" === n ?
                                        "number" != typeof e.status ?
                                        f(0, "error") :
                                        f(e.status, e.statusText) :
                                        f(
                                            af[e.status] || e.status,
                                            e.statusText,
                                            "text" !== (e.responseType || "text") ||
                                            "string" != typeof e.responseText ? { binary: e.response } : { text: e.responseText },
                                            e.getAllResponseHeaders()
                                        ));
                            };
                        };
                        e.onload = i();
                        r = e.onerror = i("error");
                        void 0 !== e.onabort ?
                            (e.onabort = r) :
                            (e.onreadystatechange = function() {
                                4 === e.readyState &&
                                    n.setTimeout(function() {
                                        i && r();
                                    });
                            });
                        i = i("abort");
                        try {
                            e.send((t.hasContent && t.data) || null);
                        } catch (s) {
                            if (i) throw s;
                        }
                    },
                    abort: function() {
                        i && i();
                    },
                };
        }),
        i.ajaxPrefilter(function(n) {
            n.crossDomain && (n.contents.script = !1);
        }),
        i.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
            },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
                "text script": function(n) {
                    return i.globalEval(n), n;
                },
            },
        }),
        i.ajaxPrefilter("script", function(n) {
            void 0 === n.cache && (n.cache = !1);
            n.crossDomain && (n.type = "GET");
        }),
        i.ajaxTransport("script", function(n) {
            if (n.crossDomain) {
                var r, t;
                return {
                    send: function(f, e) {
                        r = i("<script>")
                            .prop({ charset: n.scriptCharset, src: n.url })
                            .on(
                                "load error",
                                (t = function(n) {
                                    r.remove();
                                    t = null;
                                    n && e("error" === n.type ? 404 : 200, n.type);
                                })
                            );
                        u.head.appendChild(r[0]);
                    },
                    abort: function() {
                        t && t();
                    },
                };
            }
        }),
        (di = []),
        (ri = /(=)\?(?=&|$)|\?\?/),
        i.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var n = di.pop() || i.expando + "_" + ef++;
                return (this[n] = !0), n;
            },
        }),
        i.ajaxPrefilter("json jsonp", function(t, r, u) {
            var f,
                e,
                o,
                s =
                t.jsonp !== !1 &&
                (ri.test(t.url) ?
                    "url" :
                    "string" == typeof t.data &&
                    0 ===
                    (t.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                    ) &&
                    ri.test(t.data) &&
                    "data");
            if (s || "jsonp" === t.dataTypes[0])
                return (
                    (f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ?
                        t.jsonpCallback() :
                        t.jsonpCallback),
                    s ?
                    (t[s] = t[s].replace(ri, "$1" + f)) :
                    t.jsonp !== !1 &&
                    (t.url += (yi.test(t.url) ? "&" : "?") + t.jsonp + "=" + f),
                    (t.converters["script json"] = function() {
                        return o || i.error(f + " was not called"), o[0];
                    }),
                    (t.dataTypes[0] = "json"),
                    (e = n[f]),
                    (n[f] = function() {
                        o = arguments;
                    }),
                    u.always(function() {
                        void 0 === e ? i(n).removeProp(f) : (n[f] = e);
                        t[f] && ((t.jsonpCallback = r.jsonpCallback), di.push(f));
                        o && i.isFunction(e) && e(o[0]);
                        o = e = void 0;
                    }),
                    "script"
                );
        }),
        (f.createHTMLDocument = (function() {
            var n = u.implementation.createHTMLDocument("").body;
            return (
                (n.innerHTML = "<form></form><form></form>"), 2 === n.childNodes.length
            );
        })()),
        (i.parseHTML = function(n, t, r) {
            if ("string" != typeof n) return [];
            "boolean" == typeof t && ((r = t), (t = !1));
            var s, e, o;
            return (
                t ||
                (f.createHTMLDocument ?
                    ((t = u.implementation.createHTMLDocument("")),
                        (s = t.createElement("base")),
                        (s.href = u.location.href),
                        t.head.appendChild(s)) :
                    (t = u)),
                (e = ei.exec(n)),
                (o = !r && []),
                e ? [t.createElement(e[1])] :
                ((e = iu([n], t, o)),
                    o && o.length && i(o).remove(),
                    i.merge([], e.childNodes))
            );
        }),
        (i.fn.load = function(n, t, r) {
            var u,
                o,
                s,
                f = this,
                e = n.indexOf(" ");
            return (
                e > -1 && ((u = k(n.slice(e))), (n = n.slice(0, e))),
                i.isFunction(t) ?
                ((r = t), (t = void 0)) :
                t && "object" == typeof t && (o = "POST"),
                f.length > 0 &&
                i
                .ajax({ url: n, type: o || "GET", dataType: "html", data: t })
                .done(function(n) {
                    s = arguments;
                    f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n);
                })
                .always(
                    r &&
                    function(n, t) {
                        f.each(function() {
                            r.apply(this, s || [n.responseText, t, n]);
                        });
                    }
                ),
                this
            );
        }),
        i.each(
            [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
            ],
            function(n, t) {
                i.fn[t] = function(n) {
                    return this.on(t, n);
                };
            }
        ),
        (i.expr.pseudos.animated = function(n) {
            return i.grep(i.timers, function(t) {
                return n === t.elem;
            }).length;
        }),
        (i.offset = {
            setOffset: function(n, t, r) {
                var e,
                    o,
                    s,
                    h,
                    u,
                    c,
                    v,
                    l = i.css(n, "position"),
                    a = i(n),
                    f = {};
                "static" === l && (n.style.position = "relative");
                u = a.offset();
                s = i.css(n, "top");
                c = i.css(n, "left");
                v = ("absolute" === l || "fixed" === l) && (s + c).indexOf("auto") > -1;
                v
                    ?
                    ((e = a.position()), (h = e.top), (o = e.left)) :
                    ((h = parseFloat(s) || 0), (o = parseFloat(c) || 0));
                i.isFunction(t) && (t = t.call(n, r, i.extend({}, u)));
                null != t.top && (f.top = t.top - u.top + h);
                null != t.left && (f.left = t.left - u.left + o);
                "using" in t ? t.using.call(n, f) : a.css(f);
            },
        }),
        i.fn.extend({
            offset: function(n) {
                if (arguments.length)
                    return void 0 === n ?
                        this :
                        this.each(function(t) {
                            i.offset.setOffset(this, n, t);
                        });
                var r,
                    u,
                    f,
                    e,
                    t = this[0];
                if (t)
                    return t.getClientRects().length ?
                        ((f = t.getBoundingClientRect()),
                            (r = t.ownerDocument),
                            (u = r.documentElement),
                            (e = r.defaultView), {
                                top: f.top + e.pageYOffset - u.clientTop,
                                left: f.left + e.pageXOffset - u.clientLeft,
                            }) : { top: 0, left: 0 };
            },
            position: function() {
                if (this[0]) {
                    var t,
                        r,
                        u = this[0],
                        n = { top: 0, left: 0 };
                    return (
                        "fixed" === i.css(u, "position") ?
                        (r = u.getBoundingClientRect()) :
                        ((t = this.offsetParent()),
                            (r = this.offset()),
                            l(t[0], "html") || (n = t.offset()),
                            (n = {
                                top: n.top + i.css(t[0], "borderTopWidth", !0),
                                left: n.left + i.css(t[0], "borderLeftWidth", !0),
                            })), {
                            top: r.top - n.top - i.css(u, "marginTop", !0),
                            left: r.left - n.left - i.css(u, "marginLeft", !0),
                        }
                    );
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (
                        var n = this.offsetParent; n && "static" === i.css(n, "position");

                    )
                        n = n.offsetParent;
                    return n || dt;
                });
            },
        }),
        i.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
            function(n, t) {
                var r = "pageYOffset" === t;
                i.fn[n] = function(u) {
                    return v(
                        this,
                        function(n, u, f) {
                            var e;
                            return (
                                i.isWindow(n) ?
                                (e = n) :
                                9 === n.nodeType && (e = n.defaultView),
                                void 0 === f ?
                                e ?
                                e[t] :
                                n[u] :
                                void(e ?
                                    e.scrollTo(r ? e.pageXOffset : f, r ? f : e.pageYOffset) :
                                    (n[u] = f))
                            );
                        },
                        n,
                        u,
                        arguments.length
                    );
                };
            }
        ),
        i.each(["top", "left"], function(n, t) {
            i.cssHooks[t] = hu(f.pixelPosition, function(n, r) {
                if (r)
                    return (r = lt(n, t)), li.test(r) ? i(n).position()[t] + "px" : r;
            });
        }),
        i.each({ Height: "height", Width: "width" }, function(n, t) {
            i.each({ padding: "inner" + n, content: t, "": "outer" + n },
                function(r, u) {
                    i.fn[u] = function(f, e) {
                        var o = arguments.length && (r || "boolean" != typeof f),
                            s = r || (f === !0 || e === !0 ? "margin" : "border");
                        return v(
                            this,
                            function(t, r, f) {
                                var e;
                                return i.isWindow(t) ?
                                    0 === u.indexOf("outer") ?
                                    t["inner" + n] :
                                    t.document.documentElement["client" + n] :
                                    9 === t.nodeType ?
                                    ((e = t.documentElement),
                                        Math.max(
                                            t.body["scroll" + n],
                                            e["scroll" + n],
                                            t.body["offset" + n],
                                            e["offset" + n],
                                            e["client" + n]
                                        )) :
                                    void 0 === f ?
                                    i.css(t, r, s) :
                                    i.style(t, r, f, s);
                            },
                            t,
                            o ? f : void 0,
                            o
                        );
                    };
                }
            );
        }),
        i.fn.extend({
            bind: function(n, t, i) {
                return this.on(n, null, t, i);
            },
            unbind: function(n, t) {
                return this.off(n, null, t);
            },
            delegate: function(n, t, i, r) {
                return this.on(t, n, i, r);
            },
            undelegate: function(n, t, i) {
                return 1 === arguments.length ?
                    this.off(n, "**") :
                    this.off(t, n || "**", i);
            },
        }),
        (i.holdReady = function(n) {
            n ? i.readyWait++ : i.ready(!0);
        }),
        (i.isArray = Array.isArray),
        (i.parseJSON = JSON.parse),
        (i.nodeName = l),
        "function" == typeof define &&
        define.amd &&
        define("jquery", [], function() {
            return i;
        }),
        (vf = n.jQuery),
        (yf = n.$),
        (i.noConflict = function(t) {
            return n.$ === i && (n.$ = yf), t && n.jQuery === i && (n.jQuery = vf), i;
        }),
        t || (n.jQuery = n.$ = i),
        i
    );
}),
(function(n) {
    "function" == typeof define && define.amd ?
        define(["jquery"], n) :
        n(jQuery);
})(function(n) {
    function b(n) {
        for (var t = n.css("visibility");
            "inherit" === t;)
            (n = n.parent()), (t = n.css("visibility"));
        return "hidden" !== t;
    }

    function k(n) {
        for (var t, i; n.length && n[0] !== document;) {
            if (
                ((t = n.css("position")),
                    ("absolute" === t || "relative" === t || "fixed" === t) &&
                    ((i = parseInt(n.css("zIndex"), 10)), !isNaN(i) && 0 !== i))
            )
                return i;
            n = n.parent();
        }
        return 0;
    }

    function c() {
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._datepickerShowing = !1;
        this._inDialog = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
            monthNamesShort: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            dayNames: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: "",
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1,
        };
        n.extend(this._defaults, this.regional[""]);
        this.regional.en = n.extend(!0, {}, this.regional[""]);
        this.regional["en-US"] = n.extend(!0, {}, this.regional.en);
        this.dpDiv = l(
            n(
                "<div id='" +
                this._mainDivId +
                "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
            )
        );
    }

    function l(t) {
        var i =
            "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t
            .on("mouseout", i, function() {
                n(this).removeClass("ui-state-hover"); -
                1 !== this.className.indexOf("ui-datepicker-prev") &&
                    n(this).removeClass("ui-datepicker-prev-hover"); -
                1 !== this.className.indexOf("ui-datepicker-next") &&
                    n(this).removeClass("ui-datepicker-next-hover");
            })
            .on("mouseover", i, a);
    }

    function a() {
        n.datepicker._isDisabledDatepicker(
                i.inline ? i.dpDiv.parent()[0] : i.input[0]
            ) ||
            (n(this)
                .parents(".ui-datepicker-calendar")
                .find("a")
                .removeClass("ui-state-hover"),
                n(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") &&
                n(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") &&
                n(this).addClass("ui-datepicker-next-hover"));
    }

    function u(t, i) {
        n.extend(t, i);
        for (var r in i) null == i[r] && (t[r] = i[r]);
        return t;
    }

    function t(n) {
        return function() {
            var t = this.element.val();
            n.apply(this, arguments);
            this._refresh();
            t !== this.element.val() && this._trigger("change");
        };
    }
    var v, o, p, w, i, r, e;
    n.ui = n.ui || {};
    n.ui.version = "1.12.1";
    v = 0;
    o = Array.prototype.slice;
    n.cleanData = (function(t) {
        return function(i) {
            for (var r, u, f = 0; null != (u = i[f]); f++)
                try {
                    r = n._data(u, "events");
                    r && r.remove && n(u).triggerHandler("remove");
                } catch (e) {}
            t(i);
        };
    })(n.cleanData);
    n.widget = function(t, i, r) {
        var f,
            u,
            o,
            h = {},
            e = t.split(".")[0],
            s;
        return (
            (t = t.split(".")[1]),
            (s = e + "-" + t),
            r || ((r = i), (i = n.Widget)),
            n.isArray(r) && (r = n.extend.apply(null, [{}].concat(r))),
            (n.expr[":"][s.toLowerCase()] = function(t) {
                return !!n.data(t, s);
            }),
            (n[e] = n[e] || {}),
            (f = n[e][t]),
            (u = n[e][t] = function(n, t) {
                return this._createWidget ?
                    (arguments.length && this._createWidget(n, t), void 0) :
                    new u(n, t);
            }),
            n.extend(u, f, {
                version: r.version,
                _proto: n.extend({}, r),
                _childConstructors: [],
            }),
            (o = new i()),
            (o.options = n.widget.extend({}, o.options)),
            n.each(r, function(t, r) {
                return n.isFunction(r) ?
                    ((h[t] = (function() {
                            function n() {
                                return i.prototype[t].apply(this, arguments);
                            }

                            function u(n) {
                                return i.prototype[t].apply(this, n);
                            }
                            return function() {
                                var t,
                                    i = this._super,
                                    f = this._superApply;
                                return (
                                    (this._super = n),
                                    (this._superApply = u),
                                    (t = r.apply(this, arguments)),
                                    (this._super = i),
                                    (this._superApply = f),
                                    t
                                );
                            };
                        })()),
                        void 0) :
                    ((h[t] = r), void 0);
            }),
            (u.prototype = n.widget.extend(
                o, { widgetEventPrefix: f ? o.widgetEventPrefix || t : t },
                h, { constructor: u, namespace: e, widgetName: t, widgetFullName: s }
            )),
            f ?
            (n.each(f._childConstructors, function(t, i) {
                    var r = i.prototype;
                    n.widget(r.namespace + "." + r.widgetName, u, i._proto);
                }),
                delete f._childConstructors) :
            i._childConstructors.push(u),
            n.widget.bridge(t, u),
            u
        );
    };
    n.widget.extend = function(t) {
        for (var i, r, f = o.call(arguments, 1), u = 0, e = f.length; e > u; u++)
            for (i in f[u])
                (r = f[u][i]),
                f[u].hasOwnProperty(i) &&
                void 0 !== r &&
                (t[i] = n.isPlainObject(r) ?
                    n.isPlainObject(t[i]) ?
                    n.widget.extend({}, t[i], r) :
                    n.widget.extend({}, r) :
                    r);
        return t;
    };
    n.widget.bridge = function(t, i) {
        var r = i.prototype.widgetFullName || t;
        n.fn[t] = function(u) {
            var s = "string" == typeof u,
                e = o.call(arguments, 1),
                f = this;
            return (
                s ?
                this.length || "instance" !== u ?
                this.each(function() {
                    var i,
                        o = n.data(this, r);
                    return "instance" === u ?
                        ((f = o), !1) :
                        o ?
                        n.isFunction(o[u]) && "_" !== u.charAt(0) ?
                        ((i = o[u].apply(o, e)),
                            i !== o && void 0 !== i ?
                            ((f = i && i.jquery ? f.pushStack(i.get()) : i), !1) :
                            void 0) :
                        n.error(
                            "no such method '" +
                            u +
                            "' for " +
                            t +
                            " widget instance"
                        ) :
                        n.error(
                            "cannot call methods on " +
                            t +
                            " prior to initialization; attempted to call method '" +
                            u +
                            "'"
                        );
                }) :
                (f = void 0) :
                (e.length && (u = n.widget.extend.apply(null, [u].concat(e))),
                    this.each(function() {
                        var t = n.data(this, r);
                        t
                            ?
                            (t.option(u || {}), t._init && t._init()) :
                            n.data(this, r, new i(u, this));
                    })),
                f
            );
        };
    };
    n.Widget = function() {};
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = v++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            this.classesElementLookup = {};
            i !== this &&
                (n.data(i, this.widgetFullName, this),
                    this._on(!0, this.element, {
                        remove: function(n) {
                            n.target === i && this.destroy();
                        },
                    }),
                    (this.document = n(i.style ? i.ownerDocument : i.document || i)),
                    (this.window = n(
                        this.document[0].defaultView || this.document[0].parentWindow
                    )));
            this.options = n.widget.extend({},
                this.options,
                this._getCreateOptions(),
                t
            );
            this._create();
            this.options.disabled && this._setOptionDisabled(this.options.disabled);
            this._trigger("create", null, this._getCreateEventData());
            this._init();
        },
        _getCreateOptions: function() {
            return {};
        },
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            var t = this;
            this._destroy();
            n.each(this.classesElementLookup, function(n, i) {
                t._removeClass(i, n);
            });
            this.element.off(this.eventNamespace).removeData(this.widgetFullName);
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
            this.bindings.off(this.eventNamespace);
        },
        _destroy: n.noop,
        widget: function() {
            return this.element;
        },
        option: function(t, i) {
            var r,
                u,
                f,
                e = t;
            if (0 === arguments.length) return n.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (((e = {}), (r = t.split(".")), (t = r.shift()), r.length)) {
                    for (
                        u = e[t] = n.widget.extend({}, this.options[t]), f = 0; r.length - 1 > f; f++
                    )
                        (u[r[f]] = u[r[f]] || {}), (u = u[r[f]]);
                    if (((t = r.pop()), 1 === arguments.length))
                        return void 0 === u[t] ? null : u[t];
                    u[t] = i;
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[t] ? null : this.options[t];
                    e[t] = i;
                }
            return this._setOptions(e), this;
        },
        _setOptions: function(n) {
            var t;
            for (t in n) this._setOption(t, n[t]);
            return this;
        },
        _setOption: function(n, t) {
            return (
                "classes" === n && this._setOptionClasses(t),
                (this.options[n] = t),
                "disabled" === n && this._setOptionDisabled(t),
                this
            );
        },
        _setOptionClasses: function(t) {
            var i, u, r;
            for (i in t)
                (r = this.classesElementLookup[i]),
                t[i] !== this.options.classes[i] &&
                r &&
                r.length &&
                ((u = n(r.get())),
                    this._removeClass(r, i),
                    u.addClass(
                        this._classes({ element: u, keys: i, classes: t, add: !0 })
                    ));
        },
        _setOptionDisabled: function(n) {
            this._toggleClass(
                this.widget(),
                this.widgetFullName + "-disabled",
                null, !!n
            );
            n &&
                (this._removeClass(this.hoverable, null, "ui-state-hover"),
                    this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function() {
            return this._setOptions({ disabled: !1 });
        },
        disable: function() {
            return this._setOptions({ disabled: !0 });
        },
        _classes: function(t) {
            function r(r, f) {
                for (var o, e = 0; r.length > e; e++)
                    (o = u.classesElementLookup[r[e]] || n()),
                    (o = t.add ?
                        n(n.unique(o.get().concat(t.element.get()))) :
                        n(o.not(t.element).get())),
                    (u.classesElementLookup[r[e]] = o),
                    i.push(r[e]),
                    f && t.classes[r[e]] && i.push(t.classes[r[e]]);
            }
            var i = [],
                u = this;
            return (
                (t = n.extend({ element: this.element, classes: this.options.classes || {} },
                    t
                )),
                this._on(t.element, { remove: "_untrackClassesElement" }),
                t.keys && r(t.keys.match(/\S+/g) || [], !0),
                t.extra && r(t.extra.match(/\S+/g) || []),
                i.join(" ")
            );
        },
        _untrackClassesElement: function(t) {
            var i = this;
            n.each(i.classesElementLookup, function(r, u) {
                -1 !== n.inArray(t.target, u) &&
                    (i.classesElementLookup[r] = n(u.not(t.target).get()));
            });
        },
        _removeClass: function(n, t, i) {
            return this._toggleClass(n, t, i, !1);
        },
        _addClass: function(n, t, i) {
            return this._toggleClass(n, t, i, !0);
        },
        _toggleClass: function(n, t, i, r) {
            r = "boolean" == typeof r ? r : i;
            var u = "string" == typeof n || null === n,
                f = {
                    extra: u ? t : i,
                    keys: u ? n : t,
                    element: u ? this.element : n,
                    add: r,
                };
            return f.element.toggleClass(this._classes(f), r), this;
        },
        _on: function(t, i, r) {
            var f,
                u = this;
            "boolean" != typeof t && ((r = i), (i = t), (t = !1));
            r
                ?
                ((i = f = n(i)), (this.bindings = this.bindings.add(i))) :
                ((r = i), (i = this.element), (f = this.widget()));
            n.each(r, function(r, e) {
                function o() {
                    if (
                        t ||
                        (u.options.disabled !== !0 &&
                            !n(this).hasClass("ui-state-disabled"))
                    )
                        return ("string" == typeof e ? u[e] : e).apply(u, arguments);
                }
                "string" != typeof e &&
                    (o.guid = e.guid = e.guid || o.guid || n.guid++);
                var s = r.match(/^([\w:-]*)\s*(.*)$/),
                    h = s[1] + u.eventNamespace,
                    c = s[2];
                c ? f.on(h, c, o) : i.on(h, o);
            });
        },
        _off: function(t, i) {
            i =
                (i || "").split(" ").join(this.eventNamespace + " ") +
                this.eventNamespace;
            t.off(i).off(i);
            this.bindings = n(this.bindings.not(t).get());
            this.focusable = n(this.focusable.not(t).get());
            this.hoverable = n(this.hoverable.not(t).get());
        },
        _delay: function(n, t) {
            function r() {
                return ("string" == typeof n ? i[n] : n).apply(i, arguments);
            }
            var i = this;
            return setTimeout(r, t || 0);
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function(t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-hover");
                },
            });
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    this._addClass(n(t.currentTarget), null, "ui-state-focus");
                },
                focusout: function(t) {
                    this._removeClass(n(t.currentTarget), null, "ui-state-focus");
                },
            });
        },
        _trigger: function(t, i, r) {
            var u,
                f,
                e = this.options[t];
            if (
                ((r = r || {}),
                    (i = n.Event(i)),
                    (i.type = (t === this.widgetEventPrefix ?
                        t :
                        this.widgetEventPrefix + t
                    ).toLowerCase()),
                    (i.target = this.element[0]),
                    (f = i.originalEvent))
            )
                for (u in f) u in i || (i[u] = f[u]);
            return (
                this.element.trigger(i, r), !(
                    (n.isFunction(e) &&
                        e.apply(this.element[0], [i].concat(r)) === !1) ||
                    i.isDefaultPrevented()
                )
            );
        },
    };
    n.each({ show: "fadeIn", hide: "fadeOut" }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            "string" == typeof u && (u = { effect: u });
            var o,
                e = u ? (u === !0 || "number" == typeof u ? i : u.effect || i) : t;
            u = u || {};
            "number" == typeof u && (u = { duration: u });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ?
                r[t](u) :
                e !== t && r[e] ?
                r[e](u.duration, u.easing, f) :
                r.queue(function(i) {
                    n(this)[t]();
                    f && f.call(r[0]);
                    i();
                });
        };
    });
    n.widget,
        (function() {
            function f(n, t, i) {
                return [
                    parseFloat(n[0]) * (c.test(n[0]) ? t / 100 : 1),
                    parseFloat(n[1]) * (c.test(n[1]) ? i / 100 : 1),
                ];
            }

            function i(t, i) {
                return parseInt(n.css(t, i), 10) || 0;
            }

            function l(t) {
                var i = t[0];
                return 9 === i.nodeType ? {
                        width: t.width(),
                        height: t.height(),
                        offset: { top: 0, left: 0 },
                    } :
                    n.isWindow(i) ? {
                        width: t.width(),
                        height: t.height(),
                        offset: { top: t.scrollTop(), left: t.scrollLeft() },
                    } :
                    i.preventDefault ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } } : {
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        offset: t.offset(),
                    };
            }
            var u,
                r = Math.max,
                t = Math.abs,
                e = /left|center|right/,
                o = /top|center|bottom/,
                s = /[\+\-]\d+(\.[\d]+)?%?/,
                h = /^\w+/,
                c = /%$/,
                a = n.fn.position;
            n.position = {
                scrollbarWidth: function() {
                    if (void 0 !== u) return u;
                    var r,
                        i,
                        t = n(
                            "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
                        ),
                        f = t.children()[0];
                    return (
                        n("body").append(t),
                        (r = f.offsetWidth),
                        t.css("overflow", "scroll"),
                        (i = f.offsetWidth),
                        r === i && (i = t[0].clientWidth),
                        t.remove(),
                        (u = r - i)
                    );
                },
                getScrollInfo: function(t) {
                    var i =
                        t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                        r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                        u =
                        "scroll" === i ||
                        ("auto" === i && t.width < t.element[0].scrollWidth),
                        f =
                        "scroll" === r ||
                        ("auto" === r && t.height < t.element[0].scrollHeight);
                    return {
                        width: f ? n.position.scrollbarWidth() : 0,
                        height: u ? n.position.scrollbarWidth() : 0,
                    };
                },
                getWithinInfo: function(t) {
                    var i = n(t || window),
                        r = n.isWindow(i[0]),
                        u = !!i[0] && 9 === i[0].nodeType,
                        f = !r && !u;
                    return {
                        element: i,
                        isWindow: r,
                        isDocument: u,
                        offset: f ? n(t).offset() : { left: 0, top: 0 },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                    };
                },
            };
            n.fn.position = function(u) {
                if (!u || !u.of) return a.apply(this, arguments);
                u = n.extend({}, u);
                var w,
                    c,
                    v,
                    p,
                    y,
                    k,
                    d = n(u.of),
                    nt = n.position.getWithinInfo(u.within),
                    tt = n.position.getScrollInfo(nt),
                    b = (u.collision || "flip").split(" "),
                    g = {};
                return (
                    (k = l(d)),
                    d[0].preventDefault && (u.at = "left top"),
                    (c = k.width),
                    (v = k.height),
                    (p = k.offset),
                    (y = n.extend({}, p)),
                    n.each(["my", "at"], function() {
                        var t,
                            i,
                            n = (u[this] || "").split(" ");
                        1 === n.length &&
                            (n = e.test(n[0]) ?
                                n.concat(["center"]) :
                                o.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
                        n[0] = e.test(n[0]) ? n[0] : "center";
                        n[1] = o.test(n[1]) ? n[1] : "center";
                        t = s.exec(n[0]);
                        i = s.exec(n[1]);
                        g[this] = [t ? t[0] : 0, i ? i[0] : 0];
                        u[this] = [h.exec(n[0])[0], h.exec(n[1])[0]];
                    }),
                    1 === b.length && (b[1] = b[0]),
                    "right" === u.at[0] ?
                    (y.left += c) :
                    "center" === u.at[0] && (y.left += c / 2),
                    "bottom" === u.at[1] ?
                    (y.top += v) :
                    "center" === u.at[1] && (y.top += v / 2),
                    (w = f(g.at, c, v)),
                    (y.left += w[0]),
                    (y.top += w[1]),
                    this.each(function() {
                        var a,
                            k,
                            o = n(this),
                            s = o.outerWidth(),
                            h = o.outerHeight(),
                            it = i(this, "marginLeft"),
                            rt = i(this, "marginTop"),
                            ut = s + it + i(this, "marginRight") + tt.width,
                            ft = h + rt + i(this, "marginBottom") + tt.height,
                            e = n.extend({}, y),
                            l = f(g.my, o.outerWidth(), o.outerHeight());
                        "right" === u.my[0] ?
                            (e.left -= s) :
                            "center" === u.my[0] && (e.left -= s / 2);
                        "bottom" === u.my[1] ?
                            (e.top -= h) :
                            "center" === u.my[1] && (e.top -= h / 2);
                        e.left += l[0];
                        e.top += l[1];
                        a = { marginLeft: it, marginTop: rt };
                        n.each(["left", "top"], function(t, i) {
                            n.ui.position[b[t]] &&
                                n.ui.position[b[t]][i](e, {
                                    targetWidth: c,
                                    targetHeight: v,
                                    elemWidth: s,
                                    elemHeight: h,
                                    collisionPosition: a,
                                    collisionWidth: ut,
                                    collisionHeight: ft,
                                    offset: [w[0] + l[0], w[1] + l[1]],
                                    my: u.my,
                                    at: u.at,
                                    within: nt,
                                    elem: o,
                                });
                        });
                        u.using &&
                            (k = function(n) {
                                var i = p.left - e.left,
                                    a = i + c - s,
                                    f = p.top - e.top,
                                    y = f + v - h,
                                    l = {
                                        target: {
                                            element: d,
                                            left: p.left,
                                            top: p.top,
                                            width: c,
                                            height: v,
                                        },
                                        element: {
                                            element: o,
                                            left: e.left,
                                            top: e.top,
                                            width: s,
                                            height: h,
                                        },
                                        horizontal: 0 > a ? "left" : i > 0 ? "right" : "center",
                                        vertical: 0 > y ? "top" : f > 0 ? "bottom" : "middle",
                                    };
                                s > c && c > t(i + a) && (l.horizontal = "center");
                                h > v && v > t(f + y) && (l.vertical = "middle");
                                l.important =
                                    r(t(i), t(a)) > r(t(f), t(y)) ? "horizontal" : "vertical";
                                u.using.call(this, n, l);
                            });
                        o.offset(n.extend(e, { using: k }));
                    })
                );
            };
            n.ui.position = {
                fit: {
                    left: function(n, t) {
                        var h,
                            e = t.within,
                            u = e.isWindow ? e.scrollLeft : e.offset.left,
                            o = e.width,
                            s = n.left - t.collisionPosition.marginLeft,
                            i = u - s,
                            f = s + t.collisionWidth - o - u;
                        t.collisionWidth > o ?
                            i > 0 && 0 >= f ?
                            ((h = n.left + i + t.collisionWidth - o - u),
                                (n.left += i - h)) :
                            (n.left =
                                f > 0 && 0 >= i ?
                                u :
                                i > f ?
                                u + o - t.collisionWidth :
                                u) :
                            i > 0 ?
                            (n.left += i) :
                            f > 0 ?
                            (n.left -= f) :
                            (n.left = r(n.left - s, n.left));
                    },
                    top: function(n, t) {
                        var h,
                            o = t.within,
                            u = o.isWindow ? o.scrollTop : o.offset.top,
                            e = t.within.height,
                            s = n.top - t.collisionPosition.marginTop,
                            i = u - s,
                            f = s + t.collisionHeight - e - u;
                        t.collisionHeight > e ?
                            i > 0 && 0 >= f ?
                            ((h = n.top + i + t.collisionHeight - e - u),
                                (n.top += i - h)) :
                            (n.top =
                                f > 0 && 0 >= i ?
                                u :
                                i > f ?
                                u + e - t.collisionHeight :
                                u) :
                            i > 0 ?
                            (n.top += i) :
                            f > 0 ?
                            (n.top -= f) :
                            (n.top = r(n.top - s, n.top));
                    },
                },
                flip: {
                    left: function(n, i) {
                        var o,
                            s,
                            r = i.within,
                            y = r.offset.left + r.scrollLeft,
                            c = r.width,
                            h = r.isWindow ? r.scrollLeft : r.offset.left,
                            l = n.left - i.collisionPosition.marginLeft,
                            a = l - h,
                            v = l + i.collisionWidth - c - h,
                            u =
                            "left" === i.my[0] ?
                            -i.elemWidth :
                            "right" === i.my[0] ?
                            i.elemWidth :
                            0,
                            f =
                            "left" === i.at[0] ?
                            i.targetWidth :
                            "right" === i.at[0] ?
                            -i.targetWidth :
                            0,
                            e = -2 * i.offset[0];
                        0 > a ?
                            ((o = n.left + u + f + e + i.collisionWidth - c - y),
                                (0 > o || t(a) > o) && (n.left += u + f + e)) :
                            v > 0 &&
                            ((s =
                                    n.left - i.collisionPosition.marginLeft + u + f + e - h),
                                (s > 0 || v > t(s)) && (n.left += u + f + e));
                    },
                    top: function(n, i) {
                        var o,
                            s,
                            r = i.within,
                            y = r.offset.top + r.scrollTop,
                            c = r.height,
                            h = r.isWindow ? r.scrollTop : r.offset.top,
                            l = n.top - i.collisionPosition.marginTop,
                            a = l - h,
                            v = l + i.collisionHeight - c - h,
                            p = "top" === i.my[1],
                            u = p ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                            f =
                            "top" === i.at[1] ?
                            i.targetHeight :
                            "bottom" === i.at[1] ?
                            -i.targetHeight :
                            0,
                            e = -2 * i.offset[1];
                        0 > a ?
                            ((s = n.top + u + f + e + i.collisionHeight - c - y),
                                (0 > s || t(a) > s) && (n.top += u + f + e)) :
                            v > 0 &&
                            ((o = n.top - i.collisionPosition.marginTop + u + f + e - h),
                                (o > 0 || v > t(o)) && (n.top += u + f + e));
                    },
                },
                flipfit: {
                    left: function() {
                        n.ui.position.flip.left.apply(this, arguments);
                        n.ui.position.fit.left.apply(this, arguments);
                    },
                    top: function() {
                        n.ui.position.flip.top.apply(this, arguments);
                        n.ui.position.fit.top.apply(this, arguments);
                    },
                },
            };
        })();
    n.ui.position;
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ?
            n.expr.createPseudo(function(t) {
                return function(i) {
                    return !!n.data(i, t);
                };
            }) : function(t, i, r) {
                return !!n.data(t, r[3]);
            },
    });
    n.fn.extend({
        disableSelection: (function() {
            var n =
                "onselectstart" in document.createElement("div") ?
                "selectstart" :
                "mousedown";
            return function() {
                return this.on(n + ".ui-disableSelection", function(n) {
                    n.preventDefault();
                });
            };
        })(),
        enableSelection: function() {
            return this.off(".ui-disableSelection");
        },
    });
    var f = "ui-effects-",
        s = "ui-effects-style",
        h = "ui-effects-animated",
        y = n;
    (n.effects = { effect: {} }),
    (function(n, t) {
        function f(n, t, i) {
            var r = h[t.type] || {};
            return null == n ?
                i || !t.def ?
                null :
                t.def :
                ((n = r.floor ? ~~n : parseFloat(n)),
                    isNaN(n) ?
                    t.def :
                    r.mod ?
                    (n + r.mod) % r.mod :
                    0 > n ?
                    0 :
                    n > r.max ?
                    r.max :
                    n);
        }

        function s(f) {
            var o = i(),
                s = (o._rgba = []);
            return (
                (f = f.toLowerCase()),
                r(v, function(n, i) {
                    var r,
                        h = i.re.exec(f),
                        c = h && i.parse(h),
                        e = i.space || "rgba";
                    return c ?
                        ((r = o[e](c)),
                            (o[u[e].cache] = r[u[e].cache]),
                            (s = o._rgba = r._rgba), !1) :
                        t;
                }),
                s.length ?
                ("0,0,0,0" === s.join() && n.extend(s, e.transparent), o) :
                e[f]
            );
        }

        function o(n, t, i) {
            return (
                (i = (i + 1) % 1),
                1 > 6 * i ?
                n + 6 * (t - n) * i :
                1 > 2 * i ?
                t :
                2 > 3 * i ?
                n + 6 * (t - n) * (2 / 3 - i) :
                n
            );
        }
        var e,
            a = /^([\-+])=\s*(\d+\.?\d*)/,
            v = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(n) {
                        return [n[1], n[2], n[3], n[4]];
                    },
                },
                {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function(n) {
                        return [2.55 * n[1], 2.55 * n[2], 2.55 * n[3], n[4]];
                    },
                },
                {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function(n) {
                        return [
                            parseInt(n[1], 16),
                            parseInt(n[2], 16),
                            parseInt(n[3], 16),
                        ];
                    },
                },
                {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function(n) {
                        return [
                            parseInt(n[1] + n[1], 16),
                            parseInt(n[2] + n[2], 16),
                            parseInt(n[3] + n[3], 16),
                        ];
                    },
                },
                {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function(n) {
                        return [n[1], n[2] / 100, n[3] / 100, n[4]];
                    },
                },
            ],
            i = (n.Color = function(t, i, r, u) {
                return new n.Color.fn.parse(t, i, r, u);
            }),
            u = {
                rgba: {
                    props: {
                        red: { idx: 0, type: "byte" },
                        green: { idx: 1, type: "byte" },
                        blue: { idx: 2, type: "byte" },
                    },
                },
                hsla: {
                    props: {
                        hue: { idx: 0, type: "degrees" },
                        saturation: { idx: 1, type: "percent" },
                        lightness: { idx: 2, type: "percent" },
                    },
                },
            },
            h = {
                byte: { floor: !0, max: 255 },
                percent: { max: 1 },
                degrees: { mod: 360, floor: !0 },
            },
            c = (i.support = {}),
            l = n("<p>")[0],
            r = n.each;
        l.style.cssText = "background-color:rgba(1,1,1,.5)";
        c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
        r(u, function(n, t) {
            t.cache = "_" + n;
            t.props.alpha = { idx: 3, type: "percent", def: 1 };
        });
        i.fn = n.extend(i.prototype, {
            parse: function(o, h, c, l) {
                if (o === t) return (this._rgba = [null, null, null, null]), this;
                (o.jquery || o.nodeType) && ((o = n(o).css(h)), (h = t));
                var a = this,
                    v = n.type(o),
                    y = (this._rgba = []);
                return (
                    h !== t && ((o = [o, h, c, l]), (v = "array")),
                    "string" === v ?
                    this.parse(s(o) || e._default) :
                    "array" === v ?
                    (r(u.rgba.props, function(n, t) {
                            y[t.idx] = f(o[t.idx], t);
                        }),
                        this) :
                    "object" === v ?
                    (o instanceof i ?
                        r(u, function(n, t) {
                            o[t.cache] && (a[t.cache] = o[t.cache].slice());
                        }) :
                        r(u, function(t, i) {
                            var u = i.cache;
                            r(i.props, function(n, t) {
                                if (!a[u] && i.to) {
                                    if ("alpha" === n || null == o[n]) return;
                                    a[u] = i.to(a._rgba);
                                }
                                a[u][t.idx] = f(o[n], t, !0);
                            });
                            a[u] &&
                                0 > n.inArray(null, a[u].slice(0, 3)) &&
                                ((a[u][3] = 1), i.from && (a._rgba = i.from(a[u])));
                        }),
                        this) :
                    t
                );
            },
            is: function(n) {
                var o = i(n),
                    f = !0,
                    e = this;
                return (
                    r(u, function(n, i) {
                        var s,
                            u = o[i.cache];
                        return (
                            u &&
                            ((s = e[i.cache] || (i.to && i.to(e._rgba)) || []),
                                r(i.props, function(n, i) {
                                    return null != u[i.idx] ? (f = u[i.idx] === s[i.idx]) : t;
                                })),
                            f
                        );
                    }),
                    f
                );
            },
            _space: function() {
                var n = [],
                    t = this;
                return (
                    r(u, function(i, r) {
                        t[r.cache] && n.push(i);
                    }),
                    n.pop()
                );
            },
            transition: function(n, t) {
                var e = i(n),
                    c = e._space(),
                    o = u[c],
                    l = 0 === this.alpha() ? i("transparent") : this,
                    a = l[o.cache] || o.to(l._rgba),
                    s = a.slice();
                return (
                    (e = e[o.cache]),
                    r(o.props, function(n, i) {
                        var c = i.idx,
                            r = a[c],
                            u = e[c],
                            o = h[i.type] || {};
                        null !== u &&
                            (null === r ?
                                (s[c] = u) :
                                (o.mod &&
                                    (u - r > o.mod / 2 ?
                                        (r += o.mod) :
                                        r - u > o.mod / 2 && (r -= o.mod)),
                                    (s[c] = f((u - r) * t + r, i))));
                    }),
                    this[c](s)
                );
            },
            blend: function(t) {
                if (1 === this._rgba[3]) return this;
                var r = this._rgba.slice(),
                    u = r.pop(),
                    f = i(t)._rgba;
                return i(
                    n.map(r, function(n, t) {
                        return (1 - u) * f[t] + u * n;
                    })
                );
            },
            toRgbaString: function() {
                var i = "rgba(",
                    t = n.map(this._rgba, function(n, t) {
                        return null == n ? (t > 2 ? 1 : 0) : n;
                    });
                return 1 === t[3] && (t.pop(), (i = "rgb(")), i + t.join() + ")";
            },
            toHslaString: function() {
                var i = "hsla(",
                    t = n.map(this.hsla(), function(n, t) {
                        return (
                            null == n && (n = t > 2 ? 1 : 0),
                            t && 3 > t && (n = Math.round(100 * n) + "%"),
                            n
                        );
                    });
                return 1 === t[3] && (t.pop(), (i = "hsl(")), i + t.join() + ")";
            },
            toHexString: function(t) {
                var i = this._rgba.slice(),
                    r = i.pop();
                return (
                    t && i.push(~~(255 * r)),
                    "#" +
                    n
                    .map(i, function(n) {
                        return (
                            (n = (n || 0).toString(16)), 1 === n.length ? "0" + n : n
                        );
                    })
                    .join("")
                );
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
            },
        });
        i.fn.parse.prototype = i.fn;
        u.hsla.to = function(n) {
            if (null == n[0] || null == n[1] || null == n[2])
                return [null, null, null, n[3]];
            var s,
                h,
                i = n[0] / 255,
                r = n[1] / 255,
                f = n[2] / 255,
                c = n[3],
                u = Math.max(i, r, f),
                e = Math.min(i, r, f),
                t = u - e,
                o = u + e,
                l = 0.5 * o;
            return (
                (s =
                    e === u ?
                    0 :
                    i === u ?
                    (60 * (r - f)) / t + 360 :
                    r === u ?
                    (60 * (f - i)) / t + 120 :
                    (60 * (i - r)) / t + 240),
                (h = 0 === t ? 0 : 0.5 >= l ? t / o : t / (2 - o)), [Math.round(s) % 360, h, l, null == c ? 1 : c]
            );
        };
        u.hsla.from = function(n) {
            if (null == n[0] || null == n[1] || null == n[2])
                return [null, null, null, n[3]];
            var r = n[0] / 360,
                u = n[1],
                t = n[2],
                e = n[3],
                i = 0.5 >= t ? t * (1 + u) : t + u - t * u,
                f = 2 * t - i;
            return [
                Math.round(255 * o(f, i, r + 1 / 3)),
                Math.round(255 * o(f, i, r)),
                Math.round(255 * o(f, i, r - 1 / 3)),
                e,
            ];
        };
        r(u, function(u, e) {
            var s = e.props,
                o = e.cache,
                h = e.to,
                c = e.from;
            i.fn[u] = function(u) {
                if ((h && !this[o] && (this[o] = h(this._rgba)), u === t))
                    return this[o].slice();
                var l,
                    a = n.type(u),
                    v = "array" === a || "object" === a ? u : arguments,
                    e = this[o].slice();
                return (
                    r(s, function(n, t) {
                        var i = v["object" === a ? n : t.idx];
                        null == i && (i = e[t.idx]);
                        e[t.idx] = f(i, t);
                    }),
                    c ? ((l = i(c(e))), (l[o] = e), l) : i(e)
                );
            };
            r(s, function(t, r) {
                i.fn[t] ||
                    (i.fn[t] = function(i) {
                        var f,
                            e = n.type(i),
                            h = "alpha" === t ? (this._hsla ? "hsla" : "rgba") : u,
                            o = this[h](),
                            s = o[r.idx];
                        return "undefined" === e ?
                            s :
                            ("function" === e &&
                                ((i = i.call(this, s)), (e = n.type(i))),
                                null == i && r.empty ?
                                this :
                                ("string" === e &&
                                    ((f = a.exec(i)),
                                        f &&
                                        (i =
                                            s + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))),
                                    (o[r.idx] = i),
                                    this[h](o)));
                    });
            });
        });
        i.hook = function(t) {
            var u = t.split(" ");
            r(u, function(t, r) {
                n.cssHooks[r] = {
                    set: function(t, u) {
                        var o,
                            f,
                            e = "";
                        if (
                            "transparent" !== u &&
                            ("string" !== n.type(u) || (o = s(u)))
                        ) {
                            if (((u = i(o || u)), !c.rgba && 1 !== u._rgba[3])) {
                                for (
                                    f = "backgroundColor" === r ? t.parentNode : t;
                                    ("" === e || "transparent" === e) && f && f.style;

                                )
                                    try {
                                        e = n.css(f, "backgroundColor");
                                        f = f.parentNode;
                                    } catch (h) {}
                                u = u.blend(e && "transparent" !== e ? e : "_default");
                            }
                            u = u.toRgbaString();
                        }
                        try {
                            t.style[r] = u;
                        } catch (h) {}
                    },
                };
                n.fx.step[r] = function(t) {
                    t.colorInit ||
                        ((t.start = i(t.elem, r)),
                            (t.end = i(t.end)),
                            (t.colorInit = !0));
                    n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos));
                };
            });
        };
        i.hook(
            "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"
        );
        n.cssHooks.borderColor = {
            expand: function(n) {
                var t = {};
                return (
                    r(["Top", "Right", "Bottom", "Left"], function(i, r) {
                        t["border" + r + "Color"] = n;
                    }),
                    t
                );
            },
        };
        e = n.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff",
        };
    })(y),
    (function() {
        function t(t) {
            var r,
                u,
                i = t.ownerDocument.defaultView ?
                t.ownerDocument.defaultView.getComputedStyle(t, null) :
                t.currentStyle,
                f = {};
            if (i && i.length && i[0] && i[i[0]])
                for (u = i.length; u--;)
                    (r = i[u]), "string" == typeof i[r] && (f[n.camelCase(r)] = i[r]);
            else
                for (r in i) "string" == typeof i[r] && (f[r] = i[r]);
            return f;
        }

        function i(t, i) {
            var r,
                f,
                e = {};
            for (r in i)
                (f = i[r]),
                t[r] !== f &&
                (u[r] ||
                    ((n.fx.step[r] || !isNaN(parseFloat(f))) && (e[r] = f)));
            return e;
        }
        var r = ["add", "remove", "toggle"],
            u = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1,
            };
        n.each(
            [
                "borderLeftStyle",
                "borderRightStyle",
                "borderBottomStyle",
                "borderTopStyle",
            ],
            function(t, i) {
                n.fx.step[i] = function(n) {
                    (("none" === n.end || n.setAttr) && (1 !== n.pos || n.setAttr)) ||
                    (y.style(n.elem, i, n.end), (n.setAttr = !0));
                };
            }
        );
        n.fn.addBack ||
            (n.fn.addBack = function(n) {
                return this.add(
                    null == n ? this.prevObject : this.prevObject.filter(n)
                );
            });
        n.effects.animateClass = function(u, f, e, o) {
            var s = n.speed(f, e, o);
            return this.queue(function() {
                var o,
                    e = n(this),
                    h = e.attr("class") || "",
                    f = s.children ? e.find("*").addBack() : e;
                f = f.map(function() {
                    var i = n(this);
                    return { el: i, start: t(this) };
                });
                o = function() {
                    n.each(r, function(n, t) {
                        u[t] && e[t + "Class"](u[t]);
                    });
                };
                o();
                f = f.map(function() {
                    return (
                        (this.end = t(this.el[0])),
                        (this.diff = i(this.start, this.end)),
                        this
                    );
                });
                e.attr("class", h);
                f = f.map(function() {
                    var i = this,
                        t = n.Deferred(),
                        r = n.extend({}, s, {
                            queue: !1,
                            complete: function() {
                                t.resolve(i);
                            },
                        });
                    return this.el.animate(this.diff, r), t.promise();
                });
                n.when.apply(n, f.get()).done(function() {
                    o();
                    n.each(arguments, function() {
                        var t = this.el;
                        n.each(this.diff, function(n) {
                            t.css(n, "");
                        });
                    });
                    s.complete.call(e[0]);
                });
            });
        };
        n.fn.extend({
            addClass: (function(t) {
                return function(i, r, u, f) {
                    return r ?
                        n.effects.animateClass.call(this, { add: i }, r, u, f) :
                        t.apply(this, arguments);
                };
            })(n.fn.addClass),
            removeClass: (function(t) {
                return function(i, r, u, f) {
                    return arguments.length > 1 ?
                        n.effects.animateClass.call(this, { remove: i }, r, u, f) :
                        t.apply(this, arguments);
                };
            })(n.fn.removeClass),
            toggleClass: (function(t) {
                return function(i, r, u, f, e) {
                    return "boolean" == typeof r || void 0 === r ?
                        u ?
                        n.effects.animateClass.call(
                            this,
                            r ? { add: i } : { remove: i },
                            u,
                            f,
                            e
                        ) :
                        t.apply(this, arguments) :
                        n.effects.animateClass.call(this, { toggle: i }, r, u, f);
                };
            })(n.fn.toggleClass),
            switchClass: function(t, i, r, u, f) {
                return n.effects.animateClass.call(
                    this, { add: i, remove: t },
                    r,
                    u,
                    f
                );
            },
        });
    })(),
    (function() {
        function t(t, i, r, u) {
            return (
                n.isPlainObject(t) && ((i = t), (t = t.effect)),
                (t = { effect: t }),
                null == i && (i = {}),
                n.isFunction(i) && ((u = i), (r = null), (i = {})),
                ("number" == typeof i || n.fx.speeds[i]) &&
                ((u = r), (r = i), (i = {})),
                n.isFunction(r) && ((u = r), (r = null)),
                i && n.extend(t, i),
                (r = r || i.duration),
                (t.duration = n.fx.off ?
                    0 :
                    "number" == typeof r ?
                    r :
                    r in n.fx.speeds ?
                    n.fx.speeds[r] :
                    n.fx.speeds._default),
                (t.complete = u || i.complete),
                t
            );
        }

        function i(t) {
            return !t || "number" == typeof t || n.fx.speeds[t] ?
                !0 :
                "string" != typeof t || n.effects.effect[t] ?
                n.isFunction(t) ?
                !0 :
                "object" != typeof t || t.effect ?
                !1 :
                !0 :
                !0;
        }

        function r(n, t) {
            var r = t.outerWidth(),
                u = t.outerHeight(),
                i = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(
                    n
                ) || ["", 0, r, u, 0];
            return {
                top: parseFloat(i[1]) || 0,
                right: "auto" === i[2] ? r : parseFloat(i[2]),
                bottom: "auto" === i[3] ? u : parseFloat(i[3]),
                left: parseFloat(i[4]) || 0,
            };
        }
        n.expr &&
            n.expr.filters &&
            n.expr.filters.animated &&
            (n.expr.filters.animated = (function(t) {
                return function(i) {
                    return !!n(i).data(h) || t(i);
                };
            })(n.expr.filters.animated));
        n.uiBackCompat !== !1 &&
            n.extend(n.effects, {
                save: function(n, t) {
                    for (var i = 0, r = t.length; r > i; i++)
                        null !== t[i] && n.data(f + t[i], n[0].style[t[i]]);
                },
                restore: function(n, t) {
                    for (var r, i = 0, u = t.length; u > i; i++)
                        null !== t[i] && ((r = n.data(f + t[i])), n.css(t[i], r));
                },
                setMode: function(n, t) {
                    return (
                        "toggle" === t && (t = n.is(":hidden") ? "show" : "hide"), t
                    );
                },
                createWrapper: function(t) {
                    if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                    var i = {
                            width: t.outerWidth(!0),
                            height: t.outerHeight(!0),
                            float: t.css("float"),
                        },
                        u = n("<div></div>")
                        .addClass("ui-effects-wrapper")
                        .css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0,
                        }),
                        f = { width: t.width(), height: t.height() },
                        r = document.activeElement;
                    try {
                        r.id;
                    } catch (e) {
                        r = document.body;
                    }
                    return (
                        t.wrap(u),
                        (t[0] === r || n.contains(t[0], r)) && n(r).trigger("focus"),
                        (u = t.parent()),
                        "static" === t.css("position") ?
                        (u.css({ position: "relative" }),
                            t.css({ position: "relative" })) :
                        (n.extend(i, {
                                position: t.css("position"),
                                zIndex: t.css("z-index"),
                            }),
                            n.each(["top", "left", "bottom", "right"], function(n, r) {
                                i[r] = t.css(r);
                                isNaN(parseInt(i[r], 10)) && (i[r] = "auto");
                            }),
                            t.css({
                                position: "relative",
                                top: 0,
                                left: 0,
                                right: "auto",
                                bottom: "auto",
                            })),
                        t.css(f),
                        u.css(i).show()
                    );
                },
                removeWrapper: function(t) {
                    var i = document.activeElement;
                    return (
                        t.parent().is(".ui-effects-wrapper") &&
                        (t.parent().replaceWith(t),
                            (t[0] === i || n.contains(t[0], i)) && n(i).trigger("focus")),
                        t
                    );
                },
            });
        n.extend(n.effects, {
            version: "1.12.1",
            define: function(t, i, r) {
                return (
                    r || ((r = i), (i = "effect")),
                    (n.effects.effect[t] = r),
                    (n.effects.effect[t].mode = i),
                    r
                );
            },
            scaledDimensions: function(n, t, i) {
                if (0 === t)
                    return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
                var r = "horizontal" !== i ? (t || 100) / 100 : 1,
                    u = "vertical" !== i ? (t || 100) / 100 : 1;
                return {
                    height: n.height() * u,
                    width: n.width() * r,
                    outerHeight: n.outerHeight() * u,
                    outerWidth: n.outerWidth() * r,
                };
            },
            clipToBox: function(n) {
                return {
                    width: n.clip.right - n.clip.left,
                    height: n.clip.bottom - n.clip.top,
                    left: n.clip.left,
                    top: n.clip.top,
                };
            },
            unshift: function(n, t, i) {
                var r = n.queue();
                t > 1 && r.splice.apply(r, [1, 0].concat(r.splice(t, i)));
                n.dequeue();
            },
            saveStyle: function(n) {
                n.data(s, n[0].style.cssText);
            },
            restoreStyle: function(n) {
                n[0].style.cssText = n.data(s) || "";
                n.removeData(s);
            },
            mode: function(n, t) {
                var i = n.is(":hidden");
                return (
                    "toggle" === t && (t = i ? "show" : "hide"),
                    (i ? "hide" === t : "show" === t) && (t = "none"),
                    t
                );
            },
            getBaseline: function(n, t) {
                var i, r;
                switch (n[0]) {
                    case "top":
                        i = 0;
                        break;
                    case "middle":
                        i = 0.5;
                        break;
                    case "bottom":
                        i = 1;
                        break;
                    default:
                        i = n[0] / t.height;
                }
                switch (n[1]) {
                    case "left":
                        r = 0;
                        break;
                    case "center":
                        r = 0.5;
                        break;
                    case "right":
                        r = 1;
                        break;
                    default:
                        r = n[1] / t.width;
                }
                return { x: r, y: i };
            },
            createPlaceholder: function(t) {
                var i,
                    r = t.css("position"),
                    u = t.position();
                return (
                    t
                    .css({
                        marginTop: t.css("marginTop"),
                        marginBottom: t.css("marginBottom"),
                        marginLeft: t.css("marginLeft"),
                        marginRight: t.css("marginRight"),
                    })
                    .outerWidth(t.outerWidth())
                    .outerHeight(t.outerHeight()),
                    /^(static|relative)/.test(r) &&
                    ((r = "absolute"),
                        (i = n("<" + t[0].nodeName + ">")
                            .insertAfter(t)
                            .css({
                                display: /^(inline|ruby)/.test(t.css("display")) ?
                                    "inline-block" : "block",
                                visibility: "hidden",
                                marginTop: t.css("marginTop"),
                                marginBottom: t.css("marginBottom"),
                                marginLeft: t.css("marginLeft"),
                                marginRight: t.css("marginRight"),
                                float: t.css("float"),
                            })
                            .outerWidth(t.outerWidth())
                            .outerHeight(t.outerHeight())
                            .addClass("ui-effects-placeholder")),
                        t.data(f + "placeholder", i)),
                    t.css({ position: r, left: u.left, top: u.top }),
                    i
                );
            },
            removePlaceholder: function(n) {
                var t = f + "placeholder",
                    i = n.data(t);
                i && (i.remove(), n.removeData(t));
            },
            cleanUp: function(t) {
                n.effects.restoreStyle(t);
                n.effects.removePlaceholder(t);
            },
            setTransition: function(t, i, r, u) {
                return (
                    (u = u || {}),
                    n.each(i, function(n, i) {
                        var f = t.cssUnit(i);
                        f[0] > 0 && (u[i] = f[0] * r + f[1]);
                    }),
                    u
                );
            },
        });
        n.fn.extend({
            effect: function() {
                function o(t) {
                    function c() {
                        o.removeData(h);
                        n.effects.cleanUp(o);
                        "hide" === i.mode && o.hide();
                        s();
                    }

                    function s() {
                        n.isFunction(f) && f.call(o[0]);
                        n.isFunction(t) && t();
                    }
                    var o = n(this);
                    i.mode = l.shift();
                    n.uiBackCompat === !1 || u ?
                        "none" === i.mode ?
                        (o[r](), s()) :
                        e.call(o[0], i, c) :
                        (o.is(":hidden") ? "hide" === r : "show" === r) ?
                        (o[r](), s()) :
                        e.call(o[0], i, s);
                }
                var i = t.apply(this, arguments),
                    e = n.effects.effect[i.effect],
                    u = e.mode,
                    s = i.queue,
                    c = s || "fx",
                    f = i.complete,
                    r = i.mode,
                    l = [],
                    a = function(t) {
                        var f = n(this),
                            i = n.effects.mode(f, r) || u;
                        f.data(h, !0);
                        l.push(i);
                        u && ("show" === i || (i === u && "hide" === i)) && f.show();
                        (u && "none" === i) || n.effects.saveStyle(f);
                        n.isFunction(t) && t();
                    };
                return n.fx.off || !e ?
                    r ?
                    this[r](i.duration, f) :
                    this.each(function() {
                        f && f.call(this);
                    }) :
                    s === !1 ?
                    this.each(a).each(o) :
                    this.queue(c, a).queue(c, o);
            },
            show: (function(n) {
                return function(r) {
                    if (i(r)) return n.apply(this, arguments);
                    var u = t.apply(this, arguments);
                    return (u.mode = "show"), this.effect.call(this, u);
                };
            })(n.fn.show),
            hide: (function(n) {
                return function(r) {
                    if (i(r)) return n.apply(this, arguments);
                    var u = t.apply(this, arguments);
                    return (u.mode = "hide"), this.effect.call(this, u);
                };
            })(n.fn.hide),
            toggle: (function(n) {
                return function(r) {
                    if (i(r) || "boolean" == typeof r)
                        return n.apply(this, arguments);
                    var u = t.apply(this, arguments);
                    return (u.mode = "toggle"), this.effect.call(this, u);
                };
            })(n.fn.toggle),
            cssUnit: function(t) {
                var i = this.css(t),
                    r = [];
                return (
                    n.each(["em", "px", "%", "pt"], function(n, t) {
                        i.indexOf(t) > 0 && (r = [parseFloat(i), t]);
                    }),
                    r
                );
            },
            cssClip: function(n) {
                return n ?
                    this.css(
                        "clip",
                        "rect(" +
                        n.top +
                        "px " +
                        n.right +
                        "px " +
                        n.bottom +
                        "px " +
                        n.left +
                        "px)"
                    ) :
                    r(this.css("clip"), this);
            },
            transfer: function(t, i) {
                var u = n(this),
                    r = n(t.to),
                    f = "fixed" === r.css("position"),
                    e = n("body"),
                    o = f ? e.scrollTop() : 0,
                    s = f ? e.scrollLeft() : 0,
                    h = r.offset(),
                    l = {
                        top: h.top - o,
                        left: h.left - s,
                        height: r.innerHeight(),
                        width: r.innerWidth(),
                    },
                    c = u.offset(),
                    a = n("<div class='ui-effects-transfer'></div>")
                    .appendTo("body")
                    .addClass(t.className)
                    .css({
                        top: c.top - o,
                        left: c.left - s,
                        height: u.innerHeight(),
                        width: u.innerWidth(),
                        position: f ? "fixed" : "absolute",
                    })
                    .animate(l, t.duration, t.easing, function() {
                        a.remove();
                        n.isFunction(i) && i();
                    });
            },
        });
        n.fx.step.clip = function(t) {
            t.clipInit ||
                ((t.start = n(t.elem).cssClip()),
                    "string" == typeof t.end && (t.end = r(t.end, t.elem)),
                    (t.clipInit = !0));
            n(t.elem).cssClip({
                top: t.pos * (t.end.top - t.start.top) + t.start.top,
                right: t.pos * (t.end.right - t.start.right) + t.start.right,
                bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
                left: t.pos * (t.end.left - t.start.left) + t.start.left,
            });
        };
    })(),
    (function() {
        var t = {};
        n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
            t[i] = function(t) {
                return Math.pow(t, n + 2);
            };
        });
        n.extend(t, {
            Sine: function(n) {
                return 1 - Math.cos((n * Math.PI) / 2);
            },
            Circ: function(n) {
                return 1 - Math.sqrt(1 - n * n);
            },
            Elastic: function(n) {
                return 0 === n || 1 === n ?
                    n :
                    -Math.pow(2, 8 * (n - 1)) *
                    Math.sin(((80 * (n - 1) - 7.5) * Math.PI) / 15);
            },
            Back: function(n) {
                return n * n * (3 * n - 2);
            },
            Bounce: function(n) {
                for (var t, i = 4;
                    ((t = Math.pow(2, --i)) - 1) / 11 > n;);
                return (
                    1 / Math.pow(4, 3 - i) -
                    7.5625 * Math.pow((3 * t - 2) / 22 - n, 2)
                );
            },
        });
        n.each(t, function(t, i) {
            n.easing["easeIn" + t] = i;
            n.easing["easeOut" + t] = function(n) {
                return 1 - i(1 - n);
            };
            n.easing["easeInOut" + t] = function(n) {
                return 0.5 > n ? i(2 * n) / 2 : 1 - i(-2 * n + 2) / 2;
            };
        });
    })();
    p = n.effects;
    n.effects.define("blind", "hide", function(t, i) {
        var e = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"],
            },
            u = n(this),
            o = t.direction || "up",
            s = u.cssClip(),
            r = { clip: n.extend({}, s) },
            f = n.effects.createPlaceholder(u);
        r.clip[e[o][0]] = r.clip[e[o][1]];
        "show" === t.mode &&
            (u.cssClip(r.clip), f && f.css(n.effects.clipToBox(r)), (r.clip = s));
        f && f.animate(n.effects.clipToBox(r), t.duration, t.easing);
        u.animate(r, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i,
        });
    });
    n.effects.define("bounce", function(t, i) {
        var e,
            o,
            a,
            u = n(this),
            p = t.mode,
            s = "hide" === p,
            w = "show" === p,
            h = t.direction || "up",
            r = t.distance,
            v = t.times || 5,
            b = 2 * v + (w || s ? 1 : 0),
            c = t.duration / b,
            l = t.easing,
            f = "up" === h || "down" === h ? "top" : "left",
            y = "up" === h || "left" === h,
            k = 0,
            d = u.queue().length;
        for (
            n.effects.createPlaceholder(u),
            a = u.css(f),
            r || (r = u["top" === f ? "outerHeight" : "outerWidth"]() / 3),
            w &&
            ((o = { opacity: 1 }),
                (o[f] = a),
                u
                .css("opacity", 0)
                .css(f, y ? 2 * -r : 2 * r)
                .animate(o, c, l)),
            s && (r /= Math.pow(2, v - 1)),
            o = {},
            o[f] = a; v > k; k++
        )
            (e = {}),
            (e[f] = (y ? "-=" : "+=") + r),
            u.animate(e, c, l).animate(o, c, l),
            (r = s ? 2 * r : r / 2);
        s &&
            ((e = { opacity: 0 }),
                (e[f] = (y ? "-=" : "+=") + r),
                u.animate(e, c, l));
        u.queue(i);
        n.effects.unshift(u, d, b + 1);
    });
    n.effects.define("clip", "hide", function(t, i) {
        var r,
            u = {},
            f = n(this),
            e = t.direction || "vertical",
            o = "both" === e,
            s = o || "horizontal" === e,
            h = o || "vertical" === e;
        r = f.cssClip();
        u.clip = {
            top: h ? (r.bottom - r.top) / 2 : r.top,
            right: s ? (r.right - r.left) / 2 : r.right,
            bottom: h ? (r.bottom - r.top) / 2 : r.bottom,
            left: s ? (r.right - r.left) / 2 : r.left,
        };
        n.effects.createPlaceholder(f);
        "show" === t.mode && (f.cssClip(u.clip), (u.clip = r));
        f.animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i,
        });
    });
    n.effects.define("drop", "hide", function(t, i) {
        var e,
            u = n(this),
            h = t.mode,
            c = "show" === h,
            f = t.direction || "left",
            o = "up" === f || "down" === f ? "top" : "left",
            s = "up" === f || "left" === f ? "-=" : "+=",
            l = "+=" === s ? "-=" : "+=",
            r = { opacity: 0 };
        n.effects.createPlaceholder(u);
        e = t.distance || u["top" === o ? "outerHeight" : "outerWidth"](!0) / 2;
        r[o] = s + e;
        c && (u.css(r), (r[o] = l + e), (r.opacity = 1));
        u.animate(r, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i,
        });
    });
    n.effects.define("explode", "hide", function(t, i) {
        function b() {
            p.push(this);
            p.length === e * c && k();
        }

        function k() {
            o.css({ visibility: "visible" });
            n(p).remove();
            i();
        }
        for (
            var u,
                l,
                a,
                v,
                y,
                e = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
                c = e,
                o = n(this),
                d = t.mode,
                f = "show" === d,
                w = o.show().css("visibility", "hidden").offset(),
                s = Math.ceil(o.outerWidth() / c),
                h = Math.ceil(o.outerHeight() / e),
                p = [],
                r = 0; e > r; r++
        )
            for (a = w.top + r * h, y = r - (e - 1) / 2, u = 0; c > u; u++)
                (l = w.left + u * s),
                (v = u - (c - 1) / 2),
                o
                .clone()
                .appendTo("body")
                .wrap("<div></div>")
                .css({
                    position: "absolute",
                    visibility: "visible",
                    left: -u * s,
                    top: -r * h,
                })
                .parent()
                .addClass("ui-effects-explode")
                .css({
                    position: "absolute",
                    overflow: "hidden",
                    width: s,
                    height: h,
                    left: l + (f ? v * s : 0),
                    top: a + (f ? y * h : 0),
                    opacity: f ? 0 : 1,
                })
                .animate({
                        left: l + (f ? 0 : v * s),
                        top: a + (f ? 0 : y * h),
                        opacity: f ? 1 : 0,
                    },
                    t.duration || 500,
                    t.easing,
                    b
                );
    });
    n.effects.define("fade", "toggle", function(t, i) {
        var r = "show" === t.mode;
        n(this)
            .css("opacity", r ? 0 : 1)
            .animate({ opacity: r ? 1 : 0 }, { queue: !1, duration: t.duration, easing: t.easing, complete: i });
    });
    n.effects.define("fold", "hide", function(t, i) {
        var u = n(this),
            l = t.mode,
            v = "show" === l,
            y = "hide" === l,
            o = t.size || 15,
            a = /([0-9]+)%/.exec(o),
            p = !!t.horizFirst,
            f = p ? ["right", "bottom"] : ["bottom", "right"],
            s = t.duration / 2,
            h = n.effects.createPlaceholder(u),
            e = u.cssClip(),
            c = { clip: n.extend({}, e) },
            r = { clip: n.extend({}, e) },
            w = [e[f[0]], e[f[1]]],
            b = u.queue().length;
        a && (o = (parseInt(a[1], 10) / 100) * w[y ? 0 : 1]);
        c.clip[f[0]] = o;
        r.clip[f[0]] = o;
        r.clip[f[1]] = 0;
        v &&
            (u.cssClip(r.clip), h && h.css(n.effects.clipToBox(r)), (r.clip = e));
        u.queue(function(i) {
                h &&
                    h
                    .animate(n.effects.clipToBox(c), s, t.easing)
                    .animate(n.effects.clipToBox(r), s, t.easing);
                i();
            })
            .animate(c, s, t.easing)
            .animate(r, s, t.easing)
            .queue(i);
        n.effects.unshift(u, b, 4);
    });
    n.effects.define("highlight", "show", function(t, i) {
        var r = n(this),
            u = { backgroundColor: r.css("backgroundColor") };
        "hide" === t.mode && (u.opacity = 0);
        n.effects.saveStyle(r);
        r.css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99",
        }).animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i,
        });
    });
    n.effects.define("size", function(t, i) {
        var l,
            r,
            p,
            u = n(this),
            v = ["fontSize"],
            s = [
                "borderTopWidth",
                "borderBottomWidth",
                "paddingTop",
                "paddingBottom",
            ],
            h = [
                "borderLeftWidth",
                "borderRightWidth",
                "paddingLeft",
                "paddingRight",
            ],
            w = t.mode,
            y = "effect" !== w,
            c = t.scale || "both",
            b = t.origin || ["middle", "center"],
            k = u.css("position"),
            a = u.position(),
            o = n.effects.scaledDimensions(u),
            f = t.from || o,
            e = t.to || n.effects.scaledDimensions(u, 0);
        n.effects.createPlaceholder(u);
        "show" === w && ((p = f), (f = e), (e = p));
        r = {
            from: { y: f.height / o.height, x: f.width / o.width },
            to: { y: e.height / o.height, x: e.width / o.width },
        };
        ("box" === c || "both" === c) &&
        (r.from.y !== r.to.y &&
            ((f = n.effects.setTransition(u, s, r.from.y, f)),
                (e = n.effects.setTransition(u, s, r.to.y, e))),
            r.from.x !== r.to.x &&
            ((f = n.effects.setTransition(u, h, r.from.x, f)),
                (e = n.effects.setTransition(u, h, r.to.x, e))));
        ("content" === c || "both" === c) &&
        r.from.y !== r.to.y &&
            ((f = n.effects.setTransition(u, v, r.from.y, f)),
                (e = n.effects.setTransition(u, v, r.to.y, e)));
        b &&
            ((l = n.effects.getBaseline(b, o)),
                (f.top = (o.outerHeight - f.outerHeight) * l.y + a.top),
                (f.left = (o.outerWidth - f.outerWidth) * l.x + a.left),
                (e.top = (o.outerHeight - e.outerHeight) * l.y + a.top),
                (e.left = (o.outerWidth - e.outerWidth) * l.x + a.left));
        u.css(f);
        ("content" === c || "both" === c) &&
        ((s = s.concat(["marginTop", "marginBottom"]).concat(v)),
            (h = h.concat(["marginLeft", "marginRight"])),
            u.find("*[width]").each(function() {
                var i = n(this),
                    u = n.effects.scaledDimensions(i),
                    f = {
                        height: u.height * r.from.y,
                        width: u.width * r.from.x,
                        outerHeight: u.outerHeight * r.from.y,
                        outerWidth: u.outerWidth * r.from.x,
                    },
                    e = {
                        height: u.height * r.to.y,
                        width: u.width * r.to.x,
                        outerHeight: u.height * r.to.y,
                        outerWidth: u.width * r.to.x,
                    };
                r.from.y !== r.to.y &&
                    ((f = n.effects.setTransition(i, s, r.from.y, f)),
                        (e = n.effects.setTransition(i, s, r.to.y, e)));
                r.from.x !== r.to.x &&
                    ((f = n.effects.setTransition(i, h, r.from.x, f)),
                        (e = n.effects.setTransition(i, h, r.to.x, e)));
                y && n.effects.saveStyle(i);
                i.css(f);
                i.animate(e, t.duration, t.easing, function() {
                    y && n.effects.restoreStyle(i);
                });
            }));
        u.animate(e, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                var t = u.offset();
                0 === e.opacity && u.css("opacity", f.opacity);
                y ||
                    (u.css("position", "static" === k ? "relative" : k).offset(t),
                        n.effects.saveStyle(u));
                i();
            },
        });
    });
    n.effects.define("scale", function(t, i) {
        var u = n(this),
            f = t.mode,
            e =
            parseInt(t.percent, 10) ||
            (0 === parseInt(t.percent, 10) ? 0 : "effect" !== f ? 0 : 100),
            r = n.extend(!0, {
                    from: n.effects.scaledDimensions(u),
                    to: n.effects.scaledDimensions(u, e, t.direction || "both"),
                    origin: t.origin || ["middle", "center"],
                },
                t
            );
        t.fade && ((r.from.opacity = 1), (r.to.opacity = 0));
        n.effects.effect.size.call(this, r, i);
    });
    n.effects.define("puff", "hide", function(t, i) {
        var r = n.extend(!0, {}, t, {
            fade: !0,
            percent: parseInt(t.percent, 10) || 150,
        });
        n.effects.effect.scale.call(this, r, i);
    });
    n.effects.define("pulsate", "show", function(t, i) {
        var r = n(this),
            e = t.mode,
            o = "show" === e,
            c = "hide" === e,
            l = o || c,
            f = 2 * (t.times || 5) + (l ? 1 : 0),
            s = t.duration / f,
            u = 0,
            h = 1,
            a = r.queue().length;
        for (
            (o || !r.is(":visible")) && (r.css("opacity", 0).show(), (u = 1)); f > h; h++
        )
            r.animate({ opacity: u }, s, t.easing), (u = 1 - u);
        r.animate({ opacity: u }, s, t.easing);
        r.queue(i);
        n.effects.unshift(r, a, f + 1);
    });
    n.effects.define("shake", function(t, i) {
        var l = 1,
            r = n(this),
            f = t.direction || "left",
            e = t.distance || 20,
            a = t.times || 3,
            v = 2 * a + 1,
            u = Math.round(t.duration / v),
            o = "up" === f || "down" === f ? "top" : "left",
            s = "up" === f || "left" === f,
            h = {},
            c = {},
            y = {},
            p = r.queue().length;
        for (
            n.effects.createPlaceholder(r),
            h[o] = (s ? "-=" : "+=") + e,
            c[o] = (s ? "+=" : "-=") + 2 * e,
            y[o] = (s ? "-=" : "+=") + 2 * e,
            r.animate(h, u, t.easing); a > l; l++
        )
            r.animate(c, u, t.easing).animate(y, u, t.easing);
        r.animate(c, u, t.easing)
            .animate(h, u / 2, t.easing)
            .queue(i);
        n.effects.unshift(r, p, v + 1);
    });
    n.effects.define("slide", "show", function(t, i) {
        var s,
            o,
            u = n(this),
            h = {
                up: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                right: ["left", "right"],
            },
            c = t.mode,
            f = t.direction || "left",
            e = "up" === f || "down" === f ? "top" : "left",
            l = "up" === f || "left" === f,
            a = t.distance || u["top" === e ? "outerHeight" : "outerWidth"](!0),
            r = {};
        n.effects.createPlaceholder(u);
        s = u.cssClip();
        o = u.position()[e];
        r[e] = (l ? -1 : 1) * a + o;
        r.clip = u.cssClip();
        r.clip[h[f][1]] = r.clip[h[f][0]];
        "show" === c &&
            (u.cssClip(r.clip), u.css(e, r[e]), (r.clip = s), (r[e] = o));
        u.animate(r, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i,
        });
    });
    n.uiBackCompat !== !1 &&
        (p = n.effects.define("transfer", function(t, i) {
            n(this).transfer(t, i);
        }));
    n.ui.focusable = function(t, i) {
        var u,
            f,
            e,
            r,
            o,
            s = t.nodeName.toLowerCase();
        return "area" === s ?
            ((u = t.parentNode),
                (f = u.name),
                t.href && f && "map" === u.nodeName.toLowerCase() ?
                ((e = n("img[usemap='#" + f + "']")),
                    e.length > 0 && e.is(":visible")) :
                !1) :
            (/^(input|select|textarea|button|object)$/.test(s) ?
                ((r = !t.disabled),
                    r && ((o = n(t).closest("fieldset")[0]), o && (r = !o.disabled))) :
                (r = "a" === s ? t.href || i : i),
                r && n(t).is(":visible") && b(n(t)));
    };
    n.extend(n.expr[":"], {
        focusable: function(t) {
            return n.ui.focusable(t, null != n.attr(t, "tabindex"));
        },
    });
    n.ui.focusable;
    n.fn.form = function() {
        return "string" == typeof this[0].form ?
            this.closest("form") :
            n(this[0].form);
    };
    n.ui.formResetMixin = {
        _formResetHandler: function() {
            var t = n(this);
            setTimeout(function() {
                var i = t.data("ui-form-reset-instances");
                n.each(i, function() {
                    this.refresh();
                });
            });
        },
        _bindFormResetHandler: function() {
            if (((this.form = this.element.form()), this.form.length)) {
                var n = this.form.data("ui-form-reset-instances") || [];
                n.length ||
                    this.form.on("reset.ui-form-reset", this._formResetHandler);
                n.push(this);
                this.form.data("ui-form-reset-instances", n);
            }
        },
        _unbindFormResetHandler: function() {
            if (this.form.length) {
                var t = this.form.data("ui-form-reset-instances");
                t.splice(n.inArray(this, t), 1);
                t.length ?
                    this.form.data("ui-form-reset-instances", t) :
                    this.form
                    .removeData("ui-form-reset-instances")
                    .off("reset.ui-form-reset");
            }
        },
    };
    "1.7" === n.fn.jquery.substring(0, 3) &&
        (n.each(["Width", "Height"], function(t, i) {
                function r(t, i, r, u) {
                    return (
                        n.each(e, function() {
                            i -= parseFloat(n.css(t, "padding" + this)) || 0;
                            r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                            u && (i -= parseFloat(n.css(t, "margin" + this)) || 0);
                        }),
                        i
                    );
                }
                var e = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                    u = i.toLowerCase(),
                    f = {
                        innerWidth: n.fn.innerWidth,
                        innerHeight: n.fn.innerHeight,
                        outerWidth: n.fn.outerWidth,
                        outerHeight: n.fn.outerHeight,
                    };
                n.fn["inner" + i] = function(t) {
                    return void 0 === t ?
                        f["inner" + i].call(this) :
                        this.each(function() {
                            n(this).css(u, r(this, t) + "px");
                        });
                };
                n.fn["outer" + i] = function(t, e) {
                    return "number" != typeof t ?
                        f["outer" + i].call(this, t) :
                        this.each(function() {
                            n(this).css(u, r(this, t, !0, e) + "px");
                        });
                };
            }),
            (n.fn.addBack = function(n) {
                return this.add(
                    null == n ? this.prevObject : this.prevObject.filter(n)
                );
            }));
    n.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
    };
    n.ui.escapeSelector = (function() {
        var n = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
        return function(t) {
            return t.replace(n, "\\$1");
        };
    })();
    n.fn.labels = function() {
        var t, r, u, i, f;
        return this[0].labels && this[0].labels.length ?
            this.pushStack(this[0].labels) :
            ((i = this.eq(0).parents("label")),
                (u = this.attr("id")),
                u &&
                ((t = this.eq(0).parents().last()),
                    (f = t.add(t.length ? t.siblings() : this.siblings())),
                    (r = "label[for='" + n.ui.escapeSelector(u) + "']"),
                    (i = i.add(f.find(r).addBack(r)))),
                this.pushStack(i));
    };
    n.fn.scrollParent = function(t) {
        var i = this.css("position"),
            u = "absolute" === i,
            f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            r = this.parents()
            .filter(function() {
                var t = n(this);
                return u && "static" === t.css("position") ?
                    !1 :
                    f.test(
                        t.css("overflow") + t.css("overflow-y") + t.css("overflow-x")
                    );
            })
            .eq(0);
        return "fixed" !== i && r.length ?
            r :
            n(this[0].ownerDocument || document);
    };
    n.extend(n.expr[":"], {
        tabbable: function(t) {
            var i = n.attr(t, "tabindex"),
                r = null != i;
            return (!r || i >= 0) && n.ui.focusable(t, r);
        },
    });
    n.fn.extend({
        uniqueId: (function() {
            var n = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++n);
                });
            };
        })(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id");
            });
        },
    });
    n.widget("ui.accordion", {
        version: "1.12.1",
        options: {
            active: 0,
            animate: {},
            classes: {
                "ui-accordion-header": "ui-corner-top",
                "ui-accordion-header-collapsed": "ui-corner-all",
                "ui-accordion-content": "ui-corner-bottom",
            },
            collapsible: !1,
            event: "click",
            header: "> li > :first-child, > :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e",
            },
            activate: null,
            beforeActivate: null,
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide",
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show",
        },
        _create: function() {
            var t = this.options;
            this.prevShow = this.prevHide = n();
            this._addClass("ui-accordion", "ui-widget ui-helper-reset");
            this.element.attr("role", "tablist");
            t.collapsible ||
                (t.active !== !1 && null != t.active) ||
                (t.active = 0);
            this._processPanels();
            0 > t.active && (t.active += this.headers.length);
            this._refresh();
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : n(),
            };
        },
        _createIcons: function() {
            var i,
                r,
                t = this.options.icons;
            t &&
                ((i = n("<span>")),
                    this._addClass(i, "ui-accordion-header-icon", "ui-icon " + t.header),
                    i.prependTo(this.headers),
                    (r = this.active.children(".ui-accordion-header-icon")),
                    this._removeClass(r, t.header)
                    ._addClass(r, null, t.activeHeader)
                    ._addClass(this.headers, "ui-accordion-icons"));
        },
        _destroyIcons: function() {
            this._removeClass(this.headers, "ui-accordion-icons");
            this.headers.children(".ui-accordion-header-icon").remove();
        },
        _destroy: function() {
            var n;
            this.element.removeAttr("role");
            this.headers
                .removeAttr("role aria-expanded aria-selected aria-controls tabIndex")
                .removeUniqueId();
            this._destroyIcons();
            n = this.headers
                .next()
                .css("display", "")
                .removeAttr("role aria-hidden aria-labelledby")
                .removeUniqueId();
            "content" !== this.options.heightStyle && n.css("height", "");
        },
        _setOption: function(n, t) {
            return "active" === n ?
                (this._activate(t), void 0) :
                ("event" === n &&
                    (this.options.event &&
                        this._off(this.headers, this.options.event),
                        this._setupEvents(t)),
                    this._super(n, t),
                    "collapsible" !== n ||
                    t ||
                    this.options.active !== !1 ||
                    this._activate(0),
                    "icons" === n && (this._destroyIcons(), t && this._createIcons()),
                    void 0);
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this.element.attr("aria-disabled", n);
            this._toggleClass(null, "ui-state-disabled", !!n);
            this._toggleClass(
                this.headers.add(this.headers.next()),
                null,
                "ui-state-disabled", !!n
            );
        },
        _keydown: function(t) {
            if (!t.altKey && !t.ctrlKey) {
                var i = n.ui.keyCode,
                    u = this.headers.length,
                    f = this.headers.index(t.target),
                    r = !1;
                switch (t.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        r = this.headers[(f + 1) % u];
                        break;
                    case i.LEFT:
                    case i.UP:
                        r = this.headers[(f - 1 + u) % u];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._eventHandler(t);
                        break;
                    case i.HOME:
                        r = this.headers[0];
                        break;
                    case i.END:
                        r = this.headers[u - 1];
                }
                r &&
                    (n(t.target).attr("tabIndex", -1),
                        n(r).attr("tabIndex", 0),
                        n(r).trigger("focus"),
                        t.preventDefault());
            }
        },
        _panelKeyDown: function(t) {
            t.keyCode === n.ui.keyCode.UP &&
                t.ctrlKey &&
                n(t.currentTarget).prev().trigger("focus");
        },
        refresh: function() {
            var t = this.options;
            this._processPanels();
            (t.active === !1 && t.collapsible === !0) || !this.headers.length ?
                ((t.active = !1), (this.active = n())) :
                t.active === !1 ?
                this._activate(0) :
                this.active.length && !n.contains(this.element[0], this.active[0]) ?
                this.headers.length ===
                this.headers.find(".ui-state-disabled").length ?
                ((t.active = !1), (this.active = n())) :
                this._activate(Math.max(0, t.active - 1)) :
                (t.active = this.headers.index(this.active));
            this._destroyIcons();
            this._refresh();
        },
        _processPanels: function() {
            var t = this.headers,
                n = this.panels;
            this.headers = this.element.find(this.options.header);
            this._addClass(
                this.headers,
                "ui-accordion-header ui-accordion-header-collapsed",
                "ui-state-default"
            );
            this.panels = this.headers
                .next()
                .filter(":not(.ui-accordion-content-active)")
                .hide();
            this._addClass(
                this.panels,
                "ui-accordion-content",
                "ui-helper-reset ui-widget-content"
            );
            n && (this._off(t.not(this.headers)), this._off(n.not(this.panels)));
        },
        _refresh: function() {
            var t,
                i = this.options,
                r = i.heightStyle,
                u = this.element.parent();
            this.active = this._findActive(i.active);
            this._addClass(
                this.active,
                "ui-accordion-header-active",
                "ui-state-active"
            )._removeClass(this.active, "ui-accordion-header-collapsed");
            this._addClass(this.active.next(), "ui-accordion-content-active");
            this.active.next().show();
            this.headers
                .attr("role", "tab")
                .each(function() {
                    var t = n(this),
                        r = t.uniqueId().attr("id"),
                        i = t.next(),
                        u = i.uniqueId().attr("id");
                    t.attr("aria-controls", u);
                    i.attr("aria-labelledby", r);
                })
                .next()
                .attr("role", "tabpanel");
            this.headers
                .not(this.active)
                .attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1,
                })
                .next()
                .attr({ "aria-hidden": "true" })
                .hide();
            this.active.length ?
                this.active
                .attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0,
                })
                .next()
                .attr({ "aria-hidden": "false" }) :
                this.headers.eq(0).attr("tabIndex", 0);
            this._createIcons();
            this._setupEvents(i.event);
            "fill" === r
                ?
                ((t = u.height()),
                    this.element.siblings(":visible").each(function() {
                        var i = n(this),
                            r = i.css("position");
                        "absolute" !== r && "fixed" !== r && (t -= i.outerHeight(!0));
                    }),
                    this.headers.each(function() {
                        t -= n(this).outerHeight(!0);
                    }),
                    this.headers
                    .next()
                    .each(function() {
                        n(this).height(
                            Math.max(0, t - n(this).innerHeight() + n(this).height())
                        );
                    })
                    .css("overflow", "auto")) :
                "auto" === r &&
                ((t = 0),
                    this.headers
                    .next()
                    .each(function() {
                        var i = n(this).is(":visible");
                        i || n(this).show();
                        t = Math.max(t, n(this).css("height", "").height());
                        i || n(this).hide();
                    })
                    .height(t));
        },
        _activate: function(t) {
            var i = this._findActive(t)[0];
            i !== this.active[0] &&
                ((i = i || this.active[0]),
                    this._eventHandler({
                        target: i,
                        currentTarget: i,
                        preventDefault: n.noop,
                    }));
        },
        _findActive: function(t) {
            return "number" == typeof t ? this.headers.eq(t) : n();
        },
        _setupEvents: function(t) {
            var i = { keydown: "_keydown" };
            t &&
                n.each(t.split(" "), function(n, t) {
                    i[t] = "_eventHandler";
                });
            this._off(this.headers.add(this.headers.next()));
            this._on(this.headers, i);
            this._on(this.headers.next(), { keydown: "_panelKeyDown" });
            this._hoverable(this.headers);
            this._focusable(this.headers);
        },
        _eventHandler: function(t) {
            var e,
                o,
                i = this.options,
                u = this.active,
                r = n(t.currentTarget),
                f = r[0] === u[0],
                s = f && i.collapsible,
                c = s ? n() : r.next(),
                l = u.next(),
                h = {
                    oldHeader: u,
                    oldPanel: l,
                    newHeader: s ? n() : r,
                    newPanel: c,
                };
            t.preventDefault();
            (f && !i.collapsible) ||
            this._trigger("beforeActivate", t, h) === !1 ||
                ((i.active = s ? !1 : this.headers.index(r)),
                    (this.active = f ? n() : r),
                    this._toggle(h),
                    this._removeClass(u, "ui-accordion-header-active", "ui-state-active"),
                    i.icons &&
                    ((e = u.children(".ui-accordion-header-icon")),
                        this._removeClass(e, null, i.icons.activeHeader)._addClass(
                            e,
                            null,
                            i.icons.header
                        )),
                    f ||
                    (this._removeClass(r, "ui-accordion-header-collapsed")._addClass(
                            r,
                            "ui-accordion-header-active",
                            "ui-state-active"
                        ),
                        i.icons &&
                        ((o = r.children(".ui-accordion-header-icon")),
                            this._removeClass(o, null, i.icons.header)._addClass(
                                o,
                                null,
                                i.icons.activeHeader
                            )),
                        this._addClass(r.next(), "ui-accordion-content-active")));
        },
        _toggle: function(t) {
            var r = t.newPanel,
                i = this.prevShow.length ? this.prevShow : t.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0);
            this.prevShow = r;
            this.prevHide = i;
            this.options.animate ?
                this._animate(r, i, t) :
                (i.hide(), r.show(), this._toggleComplete(t));
            i.attr({ "aria-hidden": "true" });
            i.prev().attr({ "aria-selected": "false", "aria-expanded": "false" });
            r.length && i.length ?
                i.prev().attr({ tabIndex: -1, "aria-expanded": "false" }) :
                r.length &&
                this.headers
                .filter(function() {
                    return 0 === parseInt(n(this).attr("tabIndex"), 10);
                })
                .attr("tabIndex", -1);
            r.attr("aria-hidden", "false")
                .prev()
                .attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0,
                });
        },
        _animate: function(n, t, i) {
            var h,
                r,
                u,
                c = this,
                o = 0,
                l = n.css("box-sizing"),
                a = n.length && (!t.length || n.index() < t.index()),
                e = this.options.animate || {},
                f = (a && e.down) || e,
                s = function() {
                    c._toggleComplete(i);
                };
            return (
                "number" == typeof f && (u = f),
                "string" == typeof f && (r = f),
                (r = r || f.easing || e.easing),
                (u = u || f.duration || e.duration),
                t.length ?
                n.length ?
                ((h = n.show().outerHeight()),
                    t.animate(this.hideProps, {
                        duration: u,
                        easing: r,
                        step: function(n, t) {
                            t.now = Math.round(n);
                        },
                    }),
                    n.hide().animate(this.showProps, {
                        duration: u,
                        easing: r,
                        complete: s,
                        step: function(n, i) {
                            i.now = Math.round(n);
                            "height" !== i.prop ?
                                "content-box" === l && (o += i.now) :
                                "content" !== c.options.heightStyle &&
                                ((i.now = Math.round(h - t.outerHeight() - o)),
                                    (o = 0));
                        },
                    }),
                    void 0) :
                t.animate(this.hideProps, u, r, s) :
                n.animate(this.showProps, u, r, s)
            );
        },
        _toggleComplete: function(n) {
            var t = n.oldPanel,
                i = t.prev();
            this._removeClass(t, "ui-accordion-content-active");
            this._removeClass(i, "ui-accordion-header-active")._addClass(
                i,
                "ui-accordion-header-collapsed"
            );
            t.length && (t.parent()[0].className = t.parent()[0].className);
            this._trigger("activate", null, n);
        },
    });
    n.ui.safeActiveElement = function(n) {
        var t;
        try {
            t = n.activeElement;
        } catch (i) {
            t = n.body;
        }
        return t || (t = n.body), t.nodeName || (t = n.body), t;
    };
    n.widget("ui.menu", {
        version: "1.12.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: { submenu: "ui-icon-caret-1-e" },
            items: "> *",
            menus: "ul",
            position: { my: "left top", at: "right top" },
            role: "menu",
            blur: null,
            focus: null,
            select: null,
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().attr({ role: this.options.role, tabIndex: 0 });
            this._addClass("ui-menu", "ui-widget ui-widget-content");
            this._on({
                "mousedown .ui-menu-item": function(n) {
                    n.preventDefault();
                },
                "click .ui-menu-item": function(t) {
                    var i = n(t.target),
                        r = n(n.ui.safeActiveElement(this.document[0]));
                    !this.mouseHandled &&
                        i.not(".ui-state-disabled").length &&
                        (this.select(t),
                            t.isPropagationStopped() || (this.mouseHandled = !0),
                            i.has(".ui-menu").length ?
                            this.expand(t) :
                            !this.element.is(":focus") &&
                            r.closest(".ui-menu").length &&
                            (this.element.trigger("focus", [!0]),
                                this.active &&
                                1 === this.active.parents(".ui-menu").length &&
                                clearTimeout(this.timer)));
                },
                "mouseenter .ui-menu-item": function(t) {
                    if (!this.previousFilter) {
                        var r = n(t.target).closest(".ui-menu-item"),
                            i = n(t.currentTarget);
                        r[0] === i[0] &&
                            (this._removeClass(
                                    i.siblings().children(".ui-state-active"),
                                    null,
                                    "ui-state-active"
                                ),
                                this.focus(t, i));
                    }
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(n, t) {
                    var i = this.active || this.element.find(this.options.items).eq(0);
                    t || this.focus(n, i);
                },
                blur: function(t) {
                    this._delay(function() {
                        var i = !n.contains(
                            this.element[0],
                            n.ui.safeActiveElement(this.document[0])
                        );
                        i && this.collapseAll(t);
                    });
                },
                keydown: "_keydown",
            });
            this.refresh();
            this._on(this.document, {
                click: function(n) {
                    this._closeOnDocumentClick(n) && this.collapseAll(n);
                    this.mouseHandled = !1;
                },
            });
        },
        _destroy: function() {
            var t = this.element
                .find(".ui-menu-item")
                .removeAttr("role aria-disabled"),
                i = t
                .children(".ui-menu-item-wrapper")
                .removeUniqueId()
                .removeAttr("tabIndex role aria-haspopup");
            this.element
                .removeAttr("aria-activedescendant")
                .find(".ui-menu")
                .addBack()
                .removeAttr(
                    "role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex"
                )
                .removeUniqueId()
                .show();
            i.children().each(function() {
                var t = n(this);
                t.data("ui-menu-submenu-caret") && t.remove();
            });
        },
        _keydown: function(t) {
            var i,
                u,
                r,
                f,
                e = !0;
            switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active &&
                        !this.active.is(".ui-state-disabled") &&
                        this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    e = !1;
                    u = this.previousFilter || "";
                    f = !1;
                    r =
                        t.keyCode >= 96 && 105 >= t.keyCode ?
                        "" + (t.keyCode - 96) :
                        String.fromCharCode(t.keyCode);
                    clearTimeout(this.filterTimer);
                    r === u ? (f = !0) : (r = u + r);
                    i = this._filterMenuItems(r);
                    i =
                        f && -1 !== i.index(this.active.next()) ?
                        this.active.nextAll(".ui-menu-item") :
                        i;
                    i.length ||
                        ((r = String.fromCharCode(t.keyCode)),
                            (i = this._filterMenuItems(r)));
                    i.length ?
                        (this.focus(t, i),
                            (this.previousFilter = r),
                            (this.filterTimer = this._delay(function() {
                                delete this.previousFilter;
                            }, 1e3))) :
                        delete this.previousFilter;
            }
            e && t.preventDefault();
        },
        _activate: function(n) {
            this.active &&
                !this.active.is(".ui-state-disabled") &&
                (this.active.children("[aria-haspopup='true']").length ?
                    this.expand(n) :
                    this.select(n));
        },
        refresh: function() {
            var u,
                t,
                f,
                i,
                e,
                r = this,
                s = this.options.icons.submenu,
                o = this.element.find(this.options.menus);
            this._toggleClass(
                "ui-menu-icons",
                null, !!this.element.find(".ui-icon").length
            );
            f = o
                .filter(":not(.ui-menu)")
                .hide()
                .attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false",
                })
                .each(function() {
                    var t = n(this),
                        i = t.prev(),
                        u = n("<span>").data("ui-menu-submenu-caret", !0);
                    r._addClass(u, "ui-menu-icon", "ui-icon " + s);
                    i.attr("aria-haspopup", "true").prepend(u);
                    t.attr("aria-labelledby", i.attr("id"));
                });
            this._addClass(f, "ui-menu", "ui-widget ui-widget-content ui-front");
            u = o.add(this.element);
            t = u.find(this.options.items);
            t.not(".ui-menu-item").each(function() {
                var t = n(this);
                r._isDivider(t) &&
                    r._addClass(t, "ui-menu-divider", "ui-widget-content");
            });
            i = t.not(".ui-menu-item, .ui-menu-divider");
            e = i
                .children()
                .not(".ui-menu")
                .uniqueId()
                .attr({ tabIndex: -1, role: this._itemRole() });
            this._addClass(i, "ui-menu-item")._addClass(e, "ui-menu-item-wrapper");
            t.filter(".ui-state-disabled").attr("aria-disabled", "true");
            this.active &&
                !n.contains(this.element[0], this.active[0]) &&
                this.blur();
        },
        _itemRole: function() {
            return { menu: "menuitem", listbox: "option" }[this.options.role];
        },
        _setOption: function(n, t) {
            if ("icons" === n) {
                var i = this.element.find(".ui-menu-icon");
                this._removeClass(i, null, this.options.icons.submenu)._addClass(
                    i,
                    null,
                    t.submenu
                );
            }
            this._super(n, t);
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this.element.attr("aria-disabled", n + "");
            this._toggleClass(null, "ui-state-disabled", !!n);
        },
        focus: function(n, t) {
            var i, r, u;
            this.blur(n, n && "focus" === n.type);
            this._scrollIntoView(t);
            this.active = t.first();
            r = this.active.children(".ui-menu-item-wrapper");
            this._addClass(r, null, "ui-state-active");
            this.options.role &&
                this.element.attr("aria-activedescendant", r.attr("id"));
            u = this.active
                .parent()
                .closest(".ui-menu-item")
                .children(".ui-menu-item-wrapper");
            this._addClass(u, null, "ui-state-active");
            n && "keydown" === n.type ?
                this._close() :
                (this.timer = this._delay(function() {
                    this._close();
                }, this.delay));
            i = t.children(".ui-menu");
            i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
            this.activeMenu = t.parent();
            this._trigger("focus", n, { item: t });
        },
        _scrollIntoView: function(t) {
            var e, o, i, r, u, f;
            this._hasScroll() &&
                ((e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0),
                    (o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0),
                    (i = t.offset().top - this.activeMenu.offset().top - e - o),
                    (r = this.activeMenu.scrollTop()),
                    (u = this.activeMenu.height()),
                    (f = t.outerHeight()),
                    0 > i ?
                    this.activeMenu.scrollTop(r + i) :
                    i + f > u && this.activeMenu.scrollTop(r + i - u + f));
        },
        blur: function(n, t) {
            t || clearTimeout(this.timer);
            this.active &&
                (this._removeClass(
                        this.active.children(".ui-menu-item-wrapper"),
                        null,
                        "ui-state-active"
                    ),
                    this._trigger("blur", n, { item: this.active }),
                    (this.active = null));
        },
        _startOpening: function(n) {
            clearTimeout(this.timer);
            "true" === n.attr("aria-hidden") &&
                (this.timer = this._delay(function() {
                    this._close();
                    this._open(n);
                }, this.delay));
        },
        _open: function(t) {
            var i = n.extend({ of: this.active }, this.options.position);
            clearTimeout(this.timer);
            this.element
                .find(".ui-menu")
                .not(t.parents(".ui-menu"))
                .hide()
                .attr("aria-hidden", "true");
            t.show()
                .removeAttr("aria-hidden")
                .attr("aria-expanded", "true")
                .position(i);
        },
        collapseAll: function(t, i) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var r = i ?
                    this.element :
                    n(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element);
                this._close(r);
                this.blur(t);
                this._removeClass(
                    r.find(".ui-state-active"),
                    null,
                    "ui-state-active"
                );
                this.activeMenu = r;
            }, this.delay);
        },
        _close: function(n) {
            n || (n = this.active ? this.active.parent() : this.element);
            n.find(".ui-menu")
                .hide()
                .attr("aria-hidden", "true")
                .attr("aria-expanded", "false");
        },
        _closeOnDocumentClick: function(t) {
            return !n(t.target).closest(".ui-menu").length;
        },
        _isDivider: function(n) {
            return !/[^\-\u2014\u2013\s]/.test(n.text());
        },
        collapse: function(n) {
            var t =
                this.active &&
                this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(n, t));
        },
        expand: function(n) {
            var t =
                this.active &&
                this.active.children(".ui-menu ").find(this.options.items).first();
            t &&
                t.length &&
                (this._open(t.parent()),
                    this._delay(function() {
                        this.focus(n, t);
                    }));
        },
        next: function(n) {
            this._move("next", "first", n);
        },
        previous: function(n) {
            this._move("prev", "last", n);
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function(n, t, i) {
            var r;
            this.active &&
                (r =
                    "first" === n || "last" === n ?
                    this.active["first" === n ? "prevAll" : "nextAll"](
                        ".ui-menu-item"
                    ).eq(-1) :
                    this.active[n + "All"](".ui-menu-item").eq(0));
            (r && r.length && this.active) ||
            (r = this.activeMenu.find(this.options.items)[t]());
            this.focus(i, r);
        },
        nextPage: function(t) {
            var i, r, u;
            return this.active ?
                (this.isLastItem() ||
                    (this._hasScroll() ?
                        ((r = this.active.offset().top),
                            (u = this.element.height()),
                            this.active.nextAll(".ui-menu-item").each(function() {
                                return (i = n(this)), 0 > i.offset().top - r - u;
                            }),
                            this.focus(t, i)) :
                        this.focus(
                            t,
                            this.activeMenu
                            .find(this.options.items)[this.active ? "last" : "first"]()
                        )),
                    void 0) :
                (this.next(t), void 0);
        },
        previousPage: function(t) {
            var i, r, u;
            return this.active ?
                (this.isFirstItem() ||
                    (this._hasScroll() ?
                        ((r = this.active.offset().top),
                            (u = this.element.height()),
                            this.active.prevAll(".ui-menu-item").each(function() {
                                return (i = n(this)), i.offset().top - r + u > 0;
                            }),
                            this.focus(t, i)) :
                        this.focus(
                            t,
                            this.activeMenu.find(this.options.items).first()
                        )),
                    void 0) :
                (this.next(t), void 0);
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function(t) {
            this.active = this.active || n(t.target).closest(".ui-menu-item");
            var i = { item: this.active };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0);
            this._trigger("select", t, i);
        },
        _filterMenuItems: function(t) {
            var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                r = RegExp("^" + i, "i");
            return this.activeMenu
                .find(this.options.items)
                .filter(".ui-menu-item")
                .filter(function() {
                    return r.test(
                        n.trim(n(this).children(".ui-menu-item-wrapper").text())
                    );
                });
        },
    });
    n.widget("ui.autocomplete", {
        version: "1.12.1",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: { my: "left top", at: "left bottom", collision: "none" },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null,
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var t,
                i,
                r,
                u = this.element[0].nodeName.toLowerCase(),
                f = "textarea" === u,
                e = "input" === u;
            this.isMultiLine = f || (!e && this._isContentEditable(this.element));
            this.valueMethod = this.element[f || e ? "val" : "text"];
            this.isNewMenu = !0;
            this._addClass("ui-autocomplete-input");
            this.element.attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(u) {
                    if (this.element.prop("readOnly"))
                        return (t = !0), (r = !0), (i = !0), void 0;
                    t = !1;
                    r = !1;
                    i = !1;
                    var f = n.ui.keyCode;
                    switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0;
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0;
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0;
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0;
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                            this.menu.active &&
                                ((t = !0), u.preventDefault(), this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") &&
                                (this.isMultiLine || this._value(this.term),
                                    this.close(u),
                                    u.preventDefault());
                            break;
                        default:
                            i = !0;
                            this._searchTimeout(u);
                    }
                },
                keypress: function(r) {
                    if (t)
                        return (
                            (t = !1),
                            (!this.isMultiLine || this.menu.element.is(":visible")) &&
                            r.preventDefault(),
                            void 0
                        );
                    if (!i) {
                        var u = n.ui.keyCode;
                        switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r);
                        }
                    }
                },
                input: function(n) {
                    return r ?
                        ((r = !1), n.preventDefault(), void 0) :
                        (this._searchTimeout(n), void 0);
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value();
                },
                blur: function(n) {
                    return this.cancelBlur ?
                        (delete this.cancelBlur, void 0) :
                        (clearTimeout(this.searching),
                            this.close(n),
                            this._change(n),
                            void 0);
                },
            });
            this._initSource();
            this.menu = n("<ul>")
                .appendTo(this._appendTo())
                .menu({ role: null })
                .hide()
                .menu("instance");
            this._addClass(this.menu.element, "ui-autocomplete", "ui-front");
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault();
                    this.cancelBlur = !0;
                    this._delay(function() {
                        delete this.cancelBlur;
                        this.element[0] !== n.ui.safeActiveElement(this.document[0]) &&
                            this.element.trigger("focus");
                    });
                },
                menufocus: function(t, i) {
                    var r, u;
                    return this.isNewMenu &&
                        ((this.isNewMenu = !1),
                            t.originalEvent && /^mouse/.test(t.originalEvent.type)) ?
                        (this.menu.blur(),
                            this.document.one("mousemove", function() {
                                n(t.target).trigger(t.originalEvent);
                            }),
                            void 0) :
                        ((u = i.item.data("ui-autocomplete-item")), !1 !== this._trigger("focus", t, { item: u }) &&
                            t.originalEvent &&
                            /^key/.test(t.originalEvent.type) &&
                            this._value(u.value),
                            (r = i.item.attr("aria-label") || u.value),
                            r &&
                            n.trim(r).length &&
                            (this.liveRegion.children().hide(),
                                n("<div>").text(r).appendTo(this.liveRegion)),
                            void 0);
                },
                menuselect: function(t, i) {
                    var r = i.item.data("ui-autocomplete-item"),
                        u = this.previous;
                    this.element[0] !== n.ui.safeActiveElement(this.document[0]) &&
                        (this.element.trigger("focus"),
                            (this.previous = u),
                            this._delay(function() {
                                this.previous = u;
                                this.selectedItem = r;
                            }));
                    !1 !== this._trigger("select", t, { item: r }) &&
                        this._value(r.value);
                    this.term = this._value();
                    this.close(t);
                    this.selectedItem = r;
                },
            });
            this.liveRegion = n("<div>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions",
            }).appendTo(this.document[0].body);
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                },
            });
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove();
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "source" === n && this._initSource();
            "appendTo" === n && this.menu.element.appendTo(this._appendTo());
            "disabled" === n && t && this.xhr && this.xhr.abort();
        },
        _isEventTargetInWidget: function(t) {
            var i = this.menu.element[0];
            return (
                t.target === this.element[0] ||
                t.target === i ||
                n.contains(i, t.target)
            );
        },
        _closeOnClickOutside: function(n) {
            this._isEventTargetInWidget(n) || this.close();
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return (
                t &&
                (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)),
                (t && t[0]) || (t = this.element.closest(".ui-front, dialog")),
                t.length || (t = this.document[0].body),
                t
            );
        },
        _initSource: function() {
            var i,
                r,
                t = this;
            n.isArray(this.options.source) ?
                ((i = this.options.source),
                    (this.source = function(t, r) {
                        r(n.ui.autocomplete.filter(i, t.term));
                    })) :
                "string" == typeof this.options.source ?
                ((r = this.options.source),
                    (this.source = function(i, u) {
                        t.xhr && t.xhr.abort();
                        t.xhr = n.ajax({
                            url: r,
                            data: i,
                            dataType: "json",
                            success: function(n) {
                                u(n);
                            },
                            error: function() {
                                u([]);
                            },
                        });
                    })) :
                (this.source = this.options.source);
        },
        _searchTimeout: function(n) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                var t = this.term === this._value(),
                    i = this.menu.element.is(":visible"),
                    r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
                (t && (!t || i || r)) ||
                ((this.selectedItem = null), this.search(null, n));
            }, this.options.delay);
        },
        search: function(n, t) {
            return (
                (n = null != n ? n : this._value()),
                (this.term = this._value()),
                n.length < this.options.minLength ?
                this.close(t) :
                this._trigger("search", t) !== !1 ?
                this._search(n) :
                void 0
            );
        },
        _search: function(n) {
            this.pending++;
            this._addClass("ui-autocomplete-loading");
            this.cancelSearch = !1;
            this.source({ term: n }, this._response());
        },
        _response: function() {
            var t = ++this.requestIndex;
            return n.proxy(function(n) {
                t === this.requestIndex && this.__response(n);
                this.pending--;
                this.pending || this._removeClass("ui-autocomplete-loading");
            }, this);
        },
        __response: function(n) {
            n && (n = this._normalize(n));
            this._trigger("response", null, { content: n });
            !this.options.disabled && n && n.length && !this.cancelSearch ?
                (this._suggest(n), this._trigger("open")) :
                this._close();
        },
        close: function(n) {
            this.cancelSearch = !0;
            this._close(n);
        },
        _close: function(n) {
            this._off(this.document, "mousedown");
            this.menu.element.is(":visible") &&
                (this.menu.element.hide(),
                    this.menu.blur(),
                    (this.isNewMenu = !0),
                    this._trigger("close", n));
        },
        _change: function(n) {
            this.previous !== this._value() &&
                this._trigger("change", n, { item: this.selectedItem });
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ?
                t :
                n.map(t, function(t) {
                    return "string" == typeof t ? { label: t, value: t } :
                        n.extend({}, t, {
                            label: t.label || t.value,
                            value: t.value || t.label,
                        });
                });
        },
        _suggest: function(t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t);
            this.isNewMenu = !0;
            this.menu.refresh();
            i.show();
            this._resizeMenu();
            i.position(n.extend({ of: this.element }, this.options.position));
            this.options.autoFocus && this.menu.next();
            this._on(this.document, { mousedown: "_closeOnClickOutside" });
        },
        _resizeMenu: function() {
            var n = this.menu.element;
            n.outerWidth(
                Math.max(n.width("").outerWidth() + 1, this.element.outerWidth())
            );
        },
        _renderMenu: function(t, i) {
            var r = this;
            n.each(i, function(n, i) {
                r._renderItemData(t, i);
            });
        },
        _renderItemData: function(n, t) {
            return this._renderItem(n, t).data("ui-autocomplete-item", t);
        },
        _renderItem: function(t, i) {
            return n("<li>").append(n("<div>").text(i.label)).appendTo(t);
        },
        _move: function(n, t) {
            return this.menu.element.is(":visible") ?
                (this.menu.isFirstItem() && /^previous/.test(n)) ||
                (this.menu.isLastItem() && /^next/.test(n)) ?
                (this.isMultiLine || this._value(this.term),
                    this.menu.blur(),
                    void 0) :
                (this.menu[n](t), void 0) :
                (this.search(null, t), void 0);
        },
        widget: function() {
            return this.menu.element;
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function(n, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) &&
            (this._move(n, t), t.preventDefault());
        },
        _isContentEditable: function(n) {
            if (!n.length) return !1;
            var t = n.prop("contentEditable");
            return "inherit" === t ?
                this._isContentEditable(n.parent()) :
                "true" === t;
        },
    });
    n.extend(n.ui.autocomplete, {
        escapeRegex: function(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function(t, i) {
            var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
            return n.grep(t, function(n) {
                return r.test(n.label || n.value || n);
            });
        },
    });
    n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(n) {
                    return (
                        n +
                        (n > 1 ? " results are" : " result is") +
                        " available, use up and down arrow keys to navigate."
                    );
                },
            },
        },
        __response: function(t) {
            var i;
            this._superApply(arguments);
            this.options.disabled ||
                this.cancelSearch ||
                ((i =
                        t && t.length ?
                        this.options.messages.results(t.length) :
                        this.options.messages.noResults),
                    this.liveRegion.children().hide(),
                    n("<div>").text(i).appendTo(this.liveRegion));
        },
    });
    n.ui.autocomplete;
    w = /ui-corner-([a-z]){2,6}/g;
    n.widget("ui.controlgroup", {
        version: "1.12.1",
        defaultElement: "<div>",
        options: {
            direction: "horizontal",
            disabled: null,
            onlyVisible: !0,
            items: {
                button: "input[type=button], input[type=submit], input[type=reset], button, a",
                controlgroupLabel: ".ui-controlgroup-label",
                checkboxradio: "input[type='checkbox'], input[type='radio']",
                selectmenu: "select",
                spinner: ".ui-spinner-input",
            },
        },
        _create: function() {
            this._enhance();
        },
        _enhance: function() {
            this.element.attr("role", "toolbar");
            this.refresh();
        },
        _destroy: function() {
            this._callChildMethod("destroy");
            this.childWidgets.removeData("ui-controlgroup-data");
            this.element.removeAttr("role");
            this.options.items.controlgroupLabel &&
                this.element
                .find(this.options.items.controlgroupLabel)
                .find(".ui-controlgroup-label-contents")
                .contents()
                .unwrap();
        },
        _initWidgets: function() {
            var t = this,
                i = [];
            n.each(this.options.items, function(r, u) {
                var f,
                    e = {};
                if (u)
                    return "controlgroupLabel" === r ?
                        ((f = t.element.find(u)),
                            f.each(function() {
                                var t = n(this);
                                t.children(".ui-controlgroup-label-contents").length ||
                                    t
                                    .contents()
                                    .wrapAll(
                                        "<span class='ui-controlgroup-label-contents'></span>"
                                    );
                            }),
                            t._addClass(
                                f,
                                null,
                                "ui-widget ui-widget-content ui-state-default"
                            ),
                            (i = i.concat(f.get())),
                            void 0) :
                        (n.fn[r] &&
                            ((e = t["_" + r + "Options"] ?
                                    t["_" + r + "Options"]("middle") : { classes: {} }),
                                t.element.find(u).each(function() {
                                    var u = n(this),
                                        f = u[r]("instance"),
                                        o = n.widget.extend({}, e),
                                        s;
                                    ("button" === r && u.parent(".ui-spinner").length) ||
                                    (f || (f = u[r]()[r]("instance")),
                                        f && (o.classes = t._resolveClassesValues(o.classes, f)),
                                        u[r](o),
                                        (s = u[r]("widget")),
                                        n.data(
                                            s[0],
                                            "ui-controlgroup-data",
                                            f ? f : u[r]("instance")
                                        ),
                                        i.push(s[0]));
                                })),
                            void 0);
            });
            this.childWidgets = n(n.unique(i));
            this._addClass(this.childWidgets, "ui-controlgroup-item");
        },
        _callChildMethod: function(t) {
            this.childWidgets.each(function() {
                var r = n(this),
                    i = r.data("ui-controlgroup-data");
                i && i[t] && i[t]();
            });
        },
        _updateCornerClass: function(n, t) {
            var i = this._buildSimpleOptions(t, "label").classes.label;
            this._removeClass(
                n,
                null,
                "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"
            );
            this._addClass(n, null, i);
        },
        _buildSimpleOptions: function(n, t) {
            var i = "vertical" === this.options.direction,
                r = { classes: {} };
            return (
                (r.classes[t] = {
                    middle: "",
                    first: "ui-corner-" + (i ? "top" : "left"),
                    last: "ui-corner-" + (i ? "bottom" : "right"),
                    only: "ui-corner-all",
                }[n]),
                r
            );
        },
        _spinnerOptions: function(n) {
            var t = this._buildSimpleOptions(n, "ui-spinner");
            return (
                (t.classes["ui-spinner-up"] = ""),
                (t.classes["ui-spinner-down"] = ""),
                t
            );
        },
        _buttonOptions: function(n) {
            return this._buildSimpleOptions(n, "ui-button");
        },
        _checkboxradioOptions: function(n) {
            return this._buildSimpleOptions(n, "ui-checkboxradio-label");
        },
        _selectmenuOptions: function(n) {
            var t = "vertical" === this.options.direction;
            return {
                width: t ? "auto" : !1,
                classes: {
                    middle: {
                        "ui-selectmenu-button-open": "",
                        "ui-selectmenu-button-closed": "",
                    },
                    first: {
                        "ui-selectmenu-button-open": "ui-corner-" + (t ? "top" : "tl"),
                        "ui-selectmenu-button-closed": "ui-corner-" + (t ? "top" : "left"),
                    },
                    last: {
                        "ui-selectmenu-button-open": t ? "" : "ui-corner-tr",
                        "ui-selectmenu-button-closed": "ui-corner-" + (t ? "bottom" : "right"),
                    },
                    only: {
                        "ui-selectmenu-button-open": "ui-corner-top",
                        "ui-selectmenu-button-closed": "ui-corner-all",
                    },
                }[n],
            };
        },
        _resolveClassesValues: function(t, i) {
            var r = {};
            return (
                n.each(t, function(u) {
                    var f = i.options.classes[u] || "";
                    f = n.trim(f.replace(w, ""));
                    r[u] = (f + " " + t[u]).replace(/\s+/g, " ");
                }),
                r
            );
        },
        _setOption: function(n, t) {
            return (
                "direction" === n &&
                this._removeClass("ui-controlgroup-" + this.options.direction),
                this._super(n, t),
                "disabled" === n ?
                (this._callChildMethod(t ? "disable" : "enable"), void 0) :
                (this.refresh(), void 0)
            );
        },
        refresh: function() {
            var t,
                i = this;
            this._addClass(
                "ui-controlgroup ui-controlgroup-" + this.options.direction
            );
            "horizontal" === this.options.direction &&
                this._addClass(null, "ui-helper-clearfix");
            this._initWidgets();
            t = this.childWidgets;
            this.options.onlyVisible && (t = t.filter(":visible"));
            t.length &&
                (n.each(["first", "last"], function(n, r) {
                        var u = t[r]().data("ui-controlgroup-data"),
                            f;
                        u && i["_" + u.widgetName + "Options"] ?
                            ((f = i["_" + u.widgetName + "Options"](
                                    1 === t.length ? "only" : r
                                )),
                                (f.classes = i._resolveClassesValues(f.classes, u)),
                                u.element[u.widgetName](f)) :
                            i._updateCornerClass(t[r](), r);
                    }),
                    this._callChildMethod("refresh"));
        },
    });
    n.widget("ui.checkboxradio", [
        n.ui.formResetMixin,
        {
            version: "1.12.1",
            options: {
                disabled: null,
                label: null,
                icon: !0,
                classes: {
                    "ui-checkboxradio-label": "ui-corner-all",
                    "ui-checkboxradio-icon": "ui-corner-all",
                },
            },
            _getCreateOptions: function() {
                var t,
                    i,
                    u = this,
                    r = this._super() || {};
                return (
                    this._readType(),
                    (i = this.element.labels()),
                    (this.label = n(i[i.length - 1])),
                    this.label.length ||
                    n.error("No label found for checkboxradio widget"),
                    (this.originalLabel = ""),
                    this.label
                    .contents()
                    .not(this.element[0])
                    .each(function() {
                        u.originalLabel +=
                            3 === this.nodeType ? n(this).text() : this.outerHTML;
                    }),
                    this.originalLabel && (r.label = this.originalLabel),
                    (t = this.element[0].disabled),
                    null != t && (r.disabled = t),
                    r
                );
            },
            _create: function() {
                var n = this.element[0].checked;
                this._bindFormResetHandler();
                null == this.options.disabled &&
                    (this.options.disabled = this.element[0].disabled);
                this._setOption("disabled", this.options.disabled);
                this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible");
                this._addClass(
                    this.label,
                    "ui-checkboxradio-label",
                    "ui-button ui-widget"
                );
                "radio" === this.type &&
                    this._addClass(this.label, "ui-checkboxradio-radio-label");
                this.options.label && this.options.label !== this.originalLabel ?
                    this._updateLabel() :
                    this.originalLabel && (this.options.label = this.originalLabel);
                this._enhance();
                n &&
                    (this._addClass(
                            this.label,
                            "ui-checkboxradio-checked",
                            "ui-state-active"
                        ),
                        this.icon && this._addClass(this.icon, null, "ui-state-hover"));
                this._on({
                    change: "_toggleClasses",
                    focus: function() {
                        this._addClass(
                            this.label,
                            null,
                            "ui-state-focus ui-visual-focus"
                        );
                    },
                    blur: function() {
                        this._removeClass(
                            this.label,
                            null,
                            "ui-state-focus ui-visual-focus"
                        );
                    },
                });
            },
            _readType: function() {
                var t = this.element[0].nodeName.toLowerCase();
                this.type = this.element[0].type;
                ("input" === t && /radio|checkbox/.test(this.type)) ||
                n.error(
                    "Can't create checkboxradio on element.nodeName=" +
                    t +
                    " and element.type=" +
                    this.type
                );
            },
            _enhance: function() {
                this._updateIcon(this.element[0].checked);
            },
            widget: function() {
                return this.label;
            },
            _getRadioGroup: function() {
                var t,
                    i = this.element[0].name,
                    r = "input[name='" + n.ui.escapeSelector(i) + "']";
                return i ?
                    ((t = this.form.length ?
                            n(this.form[0].elements).filter(r) :
                            n(r).filter(function() {
                                return 0 === n(this).form().length;
                            })),
                        t.not(this.element)) :
                    n([]);
            },
            _toggleClasses: function() {
                var t = this.element[0].checked;
                this._toggleClass(
                    this.label,
                    "ui-checkboxradio-checked",
                    "ui-state-active",
                    t
                );
                this.options.icon &&
                    "checkbox" === this.type &&
                    this._toggleClass(
                        this.icon,
                        null,
                        "ui-icon-check ui-state-checked",
                        t
                    )._toggleClass(this.icon, null, "ui-icon-blank", !t);
                "radio" === this.type &&
                    this._getRadioGroup().each(function() {
                        var t = n(this).checkboxradio("instance");
                        t &&
                            t._removeClass(
                                t.label,
                                "ui-checkboxradio-checked",
                                "ui-state-active"
                            );
                    });
            },
            _destroy: function() {
                this._unbindFormResetHandler();
                this.icon && (this.icon.remove(), this.iconSpace.remove());
            },
            _setOption: function(n, t) {
                if ("label" !== n || t)
                    return (
                        this._super(n, t),
                        "disabled" === n ?
                        (this._toggleClass(this.label, null, "ui-state-disabled", t),
                            (this.element[0].disabled = t),
                            void 0) :
                        (this.refresh(), void 0)
                    );
            },
            _updateIcon: function(t) {
                var i = "ui-icon ui-icon-background ";
                this.options.icon ?
                    (this.icon ||
                        ((this.icon = n("<span>")),
                            (this.iconSpace = n("<span> </span>")),
                            this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
                        "checkbox" === this.type ?
                        ((i += t ?
                                "ui-icon-check ui-state-checked" :
                                "ui-icon-blank"),
                            this._removeClass(
                                this.icon,
                                null,
                                t ? "ui-icon-blank" : "ui-icon-check"
                            )) :
                        (i += "ui-icon-blank"),
                        this._addClass(this.icon, "ui-checkboxradio-icon", i),
                        t ||
                        this._removeClass(
                            this.icon,
                            null,
                            "ui-icon-check ui-state-checked"
                        ),
                        this.icon.prependTo(this.label).after(this.iconSpace)) :
                    void 0 !== this.icon &&
                    (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
            },
            _updateLabel: function() {
                var n = this.label.contents().not(this.element[0]);
                this.icon && (n = n.not(this.icon[0]));
                this.iconSpace && (n = n.not(this.iconSpace[0]));
                n.remove();
                this.label.append(this.options.label);
            },
            refresh: function() {
                var n = this.element[0].checked,
                    t = this.element[0].disabled;
                this._updateIcon(n);
                this._toggleClass(
                    this.label,
                    "ui-checkboxradio-checked",
                    "ui-state-active",
                    n
                );
                null !== this.options.label && this._updateLabel();
                t !== this.options.disabled && this._setOptions({ disabled: t });
            },
        },
    ]);
    n.ui.checkboxradio;
    n.widget("ui.button", {
        version: "1.12.1",
        defaultElement: "<button>",
        options: {
            classes: { "ui-button": "ui-corner-all" },
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0,
        },
        _getCreateOptions: function() {
            var n,
                t = this._super() || {};
            return (
                (this.isInput = this.element.is("input")),
                (n = this.element[0].disabled),
                null != n && (t.disabled = n),
                (this.originalLabel = this.isInput ?
                    this.element.val() :
                    this.element.html()),
                this.originalLabel && (t.label = this.originalLabel),
                t
            );
        },
        _create: function() {
            !this.option.showLabel & !this.options.icon &&
                (this.options.showLabel = !0);
            null == this.options.disabled &&
                (this.options.disabled = this.element[0].disabled || !1);
            this.hasTitle = !!this.element.attr("title");
            this.options.label &&
                this.options.label !== this.originalLabel &&
                (this.isInput ?
                    this.element.val(this.options.label) :
                    this.element.html(this.options.label));
            this._addClass("ui-button", "ui-widget");
            this._setOption("disabled", this.options.disabled);
            this._enhance();
            this.element.is("a") &&
                this._on({
                    keyup: function(t) {
                        t.keyCode === n.ui.keyCode.SPACE &&
                            (t.preventDefault(),
                                this.element[0].click ?
                                this.element[0].click() :
                                this.element.trigger("click"));
                    },
                });
        },
        _enhance: function() {
            this.element.is("button") || this.element.attr("role", "button");
            this.options.icon &&
                (this._updateIcon("icon", this.options.icon), this._updateTooltip());
        },
        _updateTooltip: function() {
            this.title = this.element.attr("title");
            this.options.showLabel ||
                this.title ||
                this.element.attr("title", this.options.label);
        },
        _updateIcon: function(t, i) {
            var u = "iconPosition" !== t,
                r = u ? this.options.iconPosition : i,
                f = "top" === r || "bottom" === r;
            this.icon ?
                u && this._removeClass(this.icon, null, this.options.icon) :
                ((this.icon = n("<span>")),
                    this._addClass(this.icon, "ui-button-icon", "ui-icon"),
                    this.options.showLabel || this._addClass("ui-button-icon-only"));
            u && this._addClass(this.icon, null, i);
            this._attachIcon(r);
            f
                ?
                (this._addClass(this.icon, null, "ui-widget-icon-block"),
                    this.iconSpace && this.iconSpace.remove()) :
                (this.iconSpace ||
                    ((this.iconSpace = n("<span> </span>")),
                        this._addClass(this.iconSpace, "ui-button-icon-space")),
                    this._removeClass(this.icon, null, "ui-wiget-icon-block"),
                    this._attachIconSpace(r));
        },
        _destroy: function() {
            this.element.removeAttr("role");
            this.icon && this.icon.remove();
            this.iconSpace && this.iconSpace.remove();
            this.hasTitle || this.element.removeAttr("title");
        },
        _attachIconSpace: function(n) {
            this.icon[/^(?:end|bottom)/.test(n) ? "before" : "after"](
                this.iconSpace
            );
        },
        _attachIcon: function(n) {
            this.element[/^(?:end|bottom)/.test(n) ? "append" : "prepend"](
                this.icon
            );
        },
        _setOptions: function(n) {
            var t = void 0 === n.showLabel ? this.options.showLabel : n.showLabel,
                i = void 0 === n.icon ? this.options.icon : n.icon;
            t || i || (n.showLabel = !0);
            this._super(n);
        },
        _setOption: function(n, t) {
            "icon" === n &&
                (t ?
                    this._updateIcon(n, t) :
                    this.icon &&
                    (this.icon.remove(), this.iconSpace && this.iconSpace.remove()));
            "iconPosition" === n && this._updateIcon(n, t);
            "showLabel" === n &&
                (this._toggleClass("ui-button-icon-only", null, !t),
                    this._updateTooltip());
            "label" === n &&
                (this.isInput ?
                    this.element.val(t) :
                    (this.element.html(t),
                        this.icon &&
                        (this._attachIcon(this.options.iconPosition),
                            this._attachIconSpace(this.options.iconPosition))));
            this._super(n, t);
            "disabled" === n &&
                (this._toggleClass(null, "ui-state-disabled", t),
                    (this.element[0].disabled = t),
                    t && this.element.blur());
        },
        refresh: function() {
            var n = this.element.is("input, button") ?
                this.element[0].disabled :
                this.element.hasClass("ui-button-disabled");
            n !== this.options.disabled && this._setOptions({ disabled: n });
            this._updateTooltip();
        },
    });
    n.uiBackCompat !== !1 &&
        (n.widget("ui.button", n.ui.button, {
                options: { text: !0, icons: { primary: null, secondary: null } },
                _create: function() {
                    this.options.showLabel &&
                        !this.options.text &&
                        (this.options.showLabel = this.options.text);
                    !this.options.showLabel &&
                        this.options.text &&
                        (this.options.text = this.options.showLabel);
                    this.options.icon ||
                        (!this.options.icons.primary && !this.options.icons.secondary) ?
                        this.options.icon &&
                        (this.options.icons.primary = this.options.icon) :
                        this.options.icons.primary ?
                        (this.options.icon = this.options.icons.primary) :
                        ((this.options.icon = this.options.icons.secondary),
                            (this.options.iconPosition = "end"));
                    this._super();
                },
                _setOption: function(n, t) {
                    return "text" === n ?
                        (this._super("showLabel", t), void 0) :
                        ("showLabel" === n && (this.options.text = t),
                            "icon" === n && (this.options.icons.primary = t),
                            "icons" === n &&
                            (t.primary ?
                                (this._super("icon", t.primary),
                                    this._super("iconPosition", "beginning")) :
                                t.secondary &&
                                (this._super("icon", t.secondary),
                                    this._super("iconPosition", "end"))),
                            this._superApply(arguments),
                            void 0);
                },
            }),
            (n.fn.button = (function(t) {
                return function() {
                    return !this.length ||
                        (this.length && "INPUT" !== this[0].tagName) ||
                        (this.length &&
                            "INPUT" === this[0].tagName &&
                            "checkbox" !== this.attr("type") &&
                            "radio" !== this.attr("type")) ?
                        t.apply(this, arguments) :
                        (n.ui.checkboxradio || n.error("Checkboxradio widget missing"),
                            0 === arguments.length ?
                            this.checkboxradio({ icon: !1 }) :
                            this.checkboxradio.apply(this, arguments));
                };
            })(n.fn.button)),
            (n.fn.buttonset = function() {
                return (
                    n.ui.controlgroup || n.error("Controlgroup widget missing"),
                    "option" === arguments[0] && "items" === arguments[1] && arguments[2] ?
                    this.controlgroup.apply(this, [
                        arguments[0],
                        "items.button",
                        arguments[2],
                    ]) :
                    "option" === arguments[0] && "items" === arguments[1] ?
                    this.controlgroup.apply(this, [arguments[0], "items.button"]) :
                    ("object" == typeof arguments[0] &&
                        arguments[0].items &&
                        (arguments[0].items = { button: arguments[0].items }),
                        this.controlgroup.apply(this, arguments))
                );
            }));
    n.ui.button;
    n.extend(n.ui, { datepicker: { version: "1.12.1" } });
    n.extend(c.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv;
        },
        setDefaults: function(n) {
            return u(this._defaults, n || {}), this;
        },
        _attachDatepicker: function(t, i) {
            var r, f, u;
            r = t.nodeName.toLowerCase();
            f = "div" === r || "span" === r;
            t.id || ((this.uuid += 1), (t.id = "dp" + this.uuid));
            u = this._newInst(n(t), f);
            u.settings = n.extend({}, i || {});
            "input" === r
                ?
                this._connectDatepicker(t, u) :
                f && this._inlineDatepicker(t, u);
        },
        _newInst: function(t, i) {
            var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: r,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ?
                    l(
                        n(
                            "<div class='" +
                            this._inlineClass +
                            " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
                        )
                    ) : this.dpDiv,
            };
        },
        _connectDatepicker: function(t, i) {
            var r = n(t);
            i.append = n([]);
            i.trigger = n([]);
            r.hasClass(this.markerClassName) ||
                (this._attachments(r, i),
                    r
                    .addClass(this.markerClassName)
                    .on("keydown", this._doKeyDown)
                    .on("keypress", this._doKeyPress)
                    .on("keyup", this._doKeyUp),
                    this._autoSize(i),
                    n.data(t, "datepicker", i),
                    i.settings.disabled && this._disableDatepicker(t));
        },
        _attachments: function(t, i) {
            var u,
                r,
                f,
                e = this._get(i, "appendText"),
                o = this._get(i, "isRTL");
            i.append && i.append.remove();
            e &&
                ((i.append = n(
                        "<span class='" + this._appendClass + "'>" + e + "</span>"
                    )),
                    t[o ? "before" : "after"](i.append));
            t.off("focus", this._showDatepicker);
            i.trigger && i.trigger.remove();
            u = this._get(i, "showOn");
            ("focus" === u || "both" === u) && t.on("focus", this._showDatepicker);
            ("button" === u || "both" === u) &&
            ((r = this._get(i, "buttonText")),
                (f = this._get(i, "buttonImage")),
                (i.trigger = n(
                    this._get(i, "buttonImageOnly") ?
                    n("<img/>")
                    .addClass(this._triggerClass)
                    .attr({ src: f, alt: r, title: r }) :
                    n("<button type='button'></button>")
                    .addClass(this._triggerClass)
                    .html(f ? n("<img/>").attr({ src: f, alt: r, title: r }) : r)
                )),
                t[o ? "before" : "after"](i.trigger),
                i.trigger.on("click", function() {
                    return (
                        n.datepicker._datepickerShowing &&
                        n.datepicker._lastInput === t[0] ?
                        n.datepicker._hideDatepicker() :
                        n.datepicker._datepickerShowing &&
                        n.datepicker._lastInput !== t[0] ?
                        (n.datepicker._hideDatepicker(),
                            n.datepicker._showDatepicker(t[0])) :
                        n.datepicker._showDatepicker(t[0]), !1
                    );
                }));
        },
        _autoSize: function(n) {
            if (this._get(n, "autoSize") && !n.inline) {
                var r,
                    u,
                    f,
                    t,
                    i = new Date(2009, 11, 20),
                    e = this._get(n, "dateFormat");
                e.match(/[DM]/) &&
                    ((r = function(n) {
                            for (u = 0, f = 0, t = 0; n.length > t; t++)
                                n[t].length > u && ((u = n[t].length), (f = t));
                            return f;
                        }),
                        i.setMonth(
                            r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))
                        ),
                        i.setDate(
                            r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) +
                            20 -
                            i.getDay()
                        ));
                n.input.attr("size", this._formatDate(n, i).length);
            }
        },
        _inlineDatepicker: function(t, i) {
            var r = n(t);
            r.hasClass(this.markerClassName) ||
                (r.addClass(this.markerClassName).append(i.dpDiv),
                    n.data(t, "datepicker", i),
                    this._setDate(i, this._getDefaultDate(i), !0),
                    this._updateDatepicker(i),
                    this._updateAlternate(i),
                    i.settings.disabled && this._disableDatepicker(t),
                    i.dpDiv.css("display", "block"));
        },
        _dialogDatepicker: function(t, i, r, f, e) {
            var s,
                h,
                c,
                l,
                a,
                o = this._dialogInst;
            return (
                o ||
                ((this.uuid += 1),
                    (s = "dp" + this.uuid),
                    (this._dialogInput = n(
                        "<input type='text' id='" +
                        s +
                        "' style='position: absolute; top: -100px; width: 0px;'/>"
                    )),
                    this._dialogInput.on("keydown", this._doKeyDown),
                    n("body").append(this._dialogInput),
                    (o = this._dialogInst = this._newInst(this._dialogInput, !1)),
                    (o.settings = {}),
                    n.data(this._dialogInput[0], "datepicker", o)),
                u(o.settings, f || {}),
                (i = i && i.constructor === Date ? this._formatDate(o, i) : i),
                this._dialogInput.val(i),
                (this._pos = e ? (e.length ? e : [e.pageX, e.pageY]) : null),
                this._pos ||
                ((h = document.documentElement.clientWidth),
                    (c = document.documentElement.clientHeight),
                    (l =
                        document.documentElement.scrollLeft || document.body.scrollLeft),
                    (a = document.documentElement.scrollTop || document.body.scrollTop),
                    (this._pos = [h / 2 - 100 + l, c / 2 - 150 + a])),
                this._dialogInput
                .css("left", this._pos[0] + 20 + "px")
                .css("top", this._pos[1] + "px"),
                (o.settings.onSelect = r),
                (this._inDialog = !0),
                this.dpDiv.addClass(this._dialogClass),
                this._showDatepicker(this._dialogInput[0]),
                n.blockUI && n.blockUI(this.dpDiv),
                n.data(this._dialogInput[0], "datepicker", o),
                this
            );
        },
        _destroyDatepicker: function(t) {
            var r,
                u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) &&
                ((r = t.nodeName.toLowerCase()),
                    n.removeData(t, "datepicker"),
                    "input" === r ?
                    (f.append.remove(),
                        f.trigger.remove(),
                        u
                        .removeClass(this.markerClassName)
                        .off("focus", this._showDatepicker)
                        .off("keydown", this._doKeyDown)
                        .off("keypress", this._doKeyPress)
                        .off("keyup", this._doKeyUp)) :
                    ("div" === r || "span" === r) &&
                    u.removeClass(this.markerClassName).empty(),
                    i === f && (i = null));
        },
        _enableDatepicker: function(t) {
            var i,
                r,
                u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) &&
                ((i = t.nodeName.toLowerCase()),
                    "input" === i ?
                    ((t.disabled = !1),
                        f.trigger
                        .filter("button")
                        .each(function() {
                            this.disabled = !1;
                        })
                        .end()
                        .filter("img")
                        .css({ opacity: "1.0", cursor: "" })) :
                    ("div" === i || "span" === i) &&
                    ((r = u.children("." + this._inlineClass)),
                        r.children().removeClass("ui-state-disabled"),
                        r
                        .find("select.ui-datepicker-month, select.ui-datepicker-year")
                        .prop("disabled", !1)),
                    (this._disabledInputs = n.map(this._disabledInputs, function(n) {
                        return n === t ? null : n;
                    })));
        },
        _disableDatepicker: function(t) {
            var i,
                r,
                u = n(t),
                f = n.data(t, "datepicker");
            u.hasClass(this.markerClassName) &&
                ((i = t.nodeName.toLowerCase()),
                    "input" === i ?
                    ((t.disabled = !0),
                        f.trigger
                        .filter("button")
                        .each(function() {
                            this.disabled = !0;
                        })
                        .end()
                        .filter("img")
                        .css({ opacity: "0.5", cursor: "default" })) :
                    ("div" === i || "span" === i) &&
                    ((r = u.children("." + this._inlineClass)),
                        r.children().addClass("ui-state-disabled"),
                        r
                        .find("select.ui-datepicker-month, select.ui-datepicker-year")
                        .prop("disabled", !0)),
                    (this._disabledInputs = n.map(this._disabledInputs, function(n) {
                        return n === t ? null : n;
                    })),
                    (this._disabledInputs[this._disabledInputs.length] = t));
        },
        _isDisabledDatepicker: function(n) {
            if (!n) return !1;
            for (var t = 0; this._disabledInputs.length > t; t++)
                if (this._disabledInputs[t] === n) return !0;
            return !1;
        },
        _getInst: function(t) {
            try {
                return n.data(t, "datepicker");
            } catch (i) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(t, i, r) {
            var e,
                h,
                o,
                s,
                f = this._getInst(t);
            return 2 === arguments.length && "string" == typeof i ?
                "defaults" === i ?
                n.extend({}, n.datepicker._defaults) :
                f ?
                "all" === i ?
                n.extend({}, f.settings) :
                this._get(f, i) :
                null :
                ((e = i || {}),
                    "string" == typeof i && ((e = {}), (e[i] = r)),
                    f &&
                    (this._curInst === f && this._hideDatepicker(),
                        (h = this._getDateDatepicker(t, !0)),
                        (o = this._getMinMaxDate(f, "min")),
                        (s = this._getMinMaxDate(f, "max")),
                        u(f.settings, e),
                        null !== o &&
                        void 0 !== e.dateFormat &&
                        void 0 === e.minDate &&
                        (f.settings.minDate = this._formatDate(f, o)),
                        null !== s &&
                        void 0 !== e.dateFormat &&
                        void 0 === e.maxDate &&
                        (f.settings.maxDate = this._formatDate(f, s)),
                        "disabled" in e &&
                        (e.disabled ?
                            this._disableDatepicker(t) :
                            this._enableDatepicker(t)),
                        this._attachments(n(t), f),
                        this._autoSize(f),
                        this._setDate(f, h),
                        this._updateAlternate(f),
                        this._updateDatepicker(f)),
                    void 0);
        },
        _changeDatepicker: function(n, t, i) {
            this._optionDatepicker(n, t, i);
        },
        _refreshDatepicker: function(n) {
            var t = this._getInst(n);
            t && this._updateDatepicker(t);
        },
        _setDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            i &&
                (this._setDate(i, t),
                    this._updateDatepicker(i),
                    this._updateAlternate(i));
        },
        _getDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            return (
                i && !i.inline && this._setDateFromField(i, t),
                i ? this._getDate(i) : null
            );
        },
        _doKeyDown: function(t) {
            var u,
                e,
                f,
                i = n.datepicker._getInst(t.target),
                r = !0,
                o = i.dpDiv.is(".ui-datepicker-rtl");
            if (((i._keyEvent = !0), n.datepicker._datepickerShowing))
                switch (t.keyCode) {
                    case 9:
                        n.datepicker._hideDatepicker();
                        r = !1;
                        break;
                    case 13:
                        return (
                            (f = n(
                                "td." +
                                n.datepicker._dayOverClass +
                                ":not(." +
                                n.datepicker._currentClass +
                                ")",
                                i.dpDiv
                            )),
                            f[0] &&
                            n.datepicker._selectDay(
                                t.target,
                                i.selectedMonth,
                                i.selectedYear,
                                f[0]
                            ),
                            (u = n.datepicker._get(i, "onSelect")),
                            u ?
                            ((e = n.datepicker._formatDate(i)),
                                u.apply(i.input ? i.input[0] : null, [e, i])) :
                            n.datepicker._hideDatepicker(), !1
                        );
                    case 27:
                        n.datepicker._hideDatepicker();
                        break;
                    case 33:
                        n.datepicker._adjustDate(
                            t.target,
                            t.ctrlKey ?
                            -n.datepicker._get(i, "stepBigMonths") :
                            -n.datepicker._get(i, "stepMonths"),
                            "M"
                        );
                        break;
                    case 34:
                        n.datepicker._adjustDate(
                            t.target,
                            t.ctrlKey ?
                            +n.datepicker._get(i, "stepBigMonths") :
                            +n.datepicker._get(i, "stepMonths"),
                            "M"
                        );
                        break;
                    case 35:
                        (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 36:
                        (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 37:
                        (t.ctrlKey || t.metaKey) &&
                        n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
                        r = t.ctrlKey || t.metaKey;
                        t.originalEvent.altKey &&
                            n.datepicker._adjustDate(
                                t.target,
                                t.ctrlKey ?
                                -n.datepicker._get(i, "stepBigMonths") :
                                -n.datepicker._get(i, "stepMonths"),
                                "M"
                            );
                        break;
                    case 38:
                        (t.ctrlKey || t.metaKey) &&
                        n.datepicker._adjustDate(t.target, -7, "D");
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 39:
                        (t.ctrlKey || t.metaKey) &&
                        n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
                        r = t.ctrlKey || t.metaKey;
                        t.originalEvent.altKey &&
                            n.datepicker._adjustDate(
                                t.target,
                                t.ctrlKey ?
                                +n.datepicker._get(i, "stepBigMonths") :
                                +n.datepicker._get(i, "stepMonths"),
                                "M"
                            );
                        break;
                    case 40:
                        (t.ctrlKey || t.metaKey) &&
                        n.datepicker._adjustDate(t.target, 7, "D");
                        r = t.ctrlKey || t.metaKey;
                        break;
                    default:
                        r = !1;
                }
            else
                36 === t.keyCode && t.ctrlKey ?
                n.datepicker._showDatepicker(this) :
                (r = !1);
            r && (t.preventDefault(), t.stopPropagation());
        },
        _doKeyPress: function(t) {
            var i,
                r,
                u = n.datepicker._getInst(t.target);
            if (n.datepicker._get(u, "constrainInput"))
                return (
                    (i = n.datepicker._possibleChars(
                        n.datepicker._get(u, "dateFormat")
                    )),
                    (r = String.fromCharCode(
                        null == t.charCode ? t.keyCode : t.charCode
                    )),
                    t.ctrlKey || t.metaKey || " " > r || !i || i.indexOf(r) > -1
                );
        },
        _doKeyUp: function(t) {
            var r,
                i = n.datepicker._getInst(t.target);
            if (i.input.val() !== i.lastVal)
                try {
                    r = n.datepicker.parseDate(
                        n.datepicker._get(i, "dateFormat"),
                        i.input ? i.input.val() : null,
                        n.datepicker._getFormatConfig(i)
                    );
                    r &&
                        (n.datepicker._setDateFromField(i),
                            n.datepicker._updateAlternate(i),
                            n.datepicker._updateDatepicker(i));
                } catch (u) {}
            return !0;
        },
        _showDatepicker: function(t) {
            if (
                ((t = t.target || t),
                    "input" !== t.nodeName.toLowerCase() &&
                    (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) &&
                    n.datepicker._lastInput !== t)
            ) {
                var i, o, s, r, f, e, h;
                i = n.datepicker._getInst(t);
                n.datepicker._curInst &&
                    n.datepicker._curInst !== i &&
                    (n.datepicker._curInst.dpDiv.stop(!0, !0),
                        i &&
                        n.datepicker._datepickerShowing &&
                        n.datepicker._hideDatepicker(n.datepicker._curInst.input[0]));
                o = n.datepicker._get(i, "beforeShow");
                s = o ? o.apply(t, [t, i]) : {};
                s !== !1 &&
                    (u(i.settings, s),
                        (i.lastVal = null),
                        (n.datepicker._lastInput = t),
                        n.datepicker._setDateFromField(i),
                        n.datepicker._inDialog && (t.value = ""),
                        n.datepicker._pos ||
                        ((n.datepicker._pos = n.datepicker._findPos(t)),
                            (n.datepicker._pos[1] += t.offsetHeight)),
                        (r = !1),
                        n(t)
                        .parents()
                        .each(function() {
                            return (r |= "fixed" === n(this).css("position")), !r;
                        }),
                        (f = { left: n.datepicker._pos[0], top: n.datepicker._pos[1] }),
                        (n.datepicker._pos = null),
                        i.dpDiv.empty(),
                        i.dpDiv.css({
                            position: "absolute",
                            display: "block",
                            top: "-1000px",
                        }),
                        n.datepicker._updateDatepicker(i),
                        (f = n.datepicker._checkOffset(i, f, r)),
                        i.dpDiv.css({
                            position: n.datepicker._inDialog && n.blockUI ?
                                "static" : r ?
                                "fixed" : "absolute",
                            display: "none",
                            left: f.left + "px",
                            top: f.top + "px",
                        }),
                        i.inline ||
                        ((e = n.datepicker._get(i, "showAnim")),
                            (h = n.datepicker._get(i, "duration")),
                            i.dpDiv.css("z-index", k(n(t)) + 1),
                            (n.datepicker._datepickerShowing = !0),
                            n.effects && n.effects.effect[e] ?
                            i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) :
                            i.dpDiv[e || "show"](e ? h : null),
                            n.datepicker._shouldFocusInput(i) && i.input.trigger("focus"),
                            (n.datepicker._curInst = i)));
            }
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4;
            i = t;
            t.dpDiv.empty().append(this._generateHTML(t));
            this._attachHandlers(t);
            var r,
                u = this._getNumberOfMonths(t),
                f = u[1],
                e = t.dpDiv.find("." + this._dayOverClass + " a");
            e.length > 0 && a.apply(e.get(0));
            t.dpDiv
                .removeClass(
                    "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
                )
                .width("");
            f > 1 &&
                t.dpDiv
                .addClass("ui-datepicker-multi-" + f)
                .css("width", 17 * f + "em");
            t.dpDiv[(1 !== u[0] || 1 !== u[1] ? "add" : "remove") + "Class"](
                "ui-datepicker-multi"
            );
            t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"](
                "ui-datepicker-rtl"
            );
            t === n.datepicker._curInst &&
                n.datepicker._datepickerShowing &&
                n.datepicker._shouldFocusInput(t) &&
                t.input.trigger("focus");
            t.yearshtml &&
                ((r = t.yearshtml),
                    setTimeout(function() {
                        r === t.yearshtml &&
                            t.yearshtml &&
                            t.dpDiv
                            .find("select.ui-datepicker-year:first")
                            .replaceWith(t.yearshtml);
                        r = t.yearshtml = null;
                    }, 0));
        },
        _shouldFocusInput: function(n) {
            return (
                n.input &&
                n.input.is(":visible") &&
                !n.input.is(":disabled") &&
                !n.input.is(":focus")
            );
        },
        _checkOffset: function(t, i, r) {
            var u = t.dpDiv.outerWidth(),
                f = t.dpDiv.outerHeight(),
                h = t.input ? t.input.outerWidth() : 0,
                o = t.input ? t.input.outerHeight() : 0,
                e =
                document.documentElement.clientWidth +
                (r ? 0 : n(document).scrollLeft()),
                s =
                document.documentElement.clientHeight +
                (r ? 0 : n(document).scrollTop());
            return (
                (i.left -= this._get(t, "isRTL") ? u - h : 0),
                (i.left -=
                    r && i.left === t.input.offset().left ?
                    n(document).scrollLeft() :
                    0),
                (i.top -=
                    r && i.top === t.input.offset().top + o ?
                    n(document).scrollTop() :
                    0),
                (i.left -= Math.min(
                    i.left,
                    i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0
                )),
                (i.top -= Math.min(
                    i.top,
                    i.top + f > s && s > f ? Math.abs(f + o) : 0
                )),
                i
            );
        },
        _findPos: function(t) {
            for (
                var i, r = this._getInst(t), u = this._get(r, "isRTL"); t &&
                ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));

            )
                t = t[u ? "previousSibling" : "nextSibling"];
            return (i = n(t).offset()), [i.left, i.top];
        },
        _hideDatepicker: function(t) {
            var r,
                f,
                u,
                e,
                i = this._curInst;
            !i ||
                (t && i !== n.data(t, "datepicker")) ||
                (this._datepickerShowing &&
                    ((r = this._get(i, "showAnim")),
                        (f = this._get(i, "duration")),
                        (u = function() {
                            n.datepicker._tidyDialog(i);
                        }),
                        n.effects && (n.effects.effect[r] || n.effects[r]) ?
                        i.dpDiv.hide(r, n.datepicker._get(i, "showOptions"), f, u) :
                        i.dpDiv[
                            "slideDown" === r ?
                            "slideUp" :
                            "fadeIn" === r ?
                            "fadeOut" :
                            "hide"
                        ](r ? f : null, u),
                        r || u(),
                        (this._datepickerShowing = !1),
                        (e = this._get(i, "onClose")),
                        e &&
                        e.apply(i.input ? i.input[0] : null, [
                            i.input ? i.input.val() : "",
                            i,
                        ]),
                        (this._lastInput = null),
                        this._inDialog &&
                        (this._dialogInput.css({
                                position: "absolute",
                                left: "0",
                                top: "-100px",
                            }),
                            n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))),
                        (this._inDialog = !1)));
        },
        _tidyDialog: function(n) {
            n.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
        },
        _checkExternalClick: function(t) {
            if (n.datepicker._curInst) {
                var i = n(t.target),
                    r = n.datepicker._getInst(i[0]);
                ((i[0].id === n.datepicker._mainDivId ||
                        0 !== i.parents("#" + n.datepicker._mainDivId).length ||
                        i.hasClass(n.datepicker.markerClassName) ||
                        i.closest("." + n.datepicker._triggerClass).length ||
                        !n.datepicker._datepickerShowing ||
                        (n.datepicker._inDialog && n.blockUI)) &&
                    (!i.hasClass(n.datepicker.markerClassName) ||
                        n.datepicker._curInst === r)) ||
                n.datepicker._hideDatepicker();
            }
        },
        _adjustDate: function(t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            this._isDisabledDatepicker(f[0]) ||
                (this._adjustInstDate(
                        u,
                        i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0),
                        r
                    ),
                    this._updateDatepicker(u));
        },
        _gotoToday: function(t) {
            var r,
                u = n(t),
                i = this._getInst(u[0]);
            this._get(i, "gotoCurrent") && i.currentDay ?
                ((i.selectedDay = i.currentDay),
                    (i.drawMonth = i.selectedMonth = i.currentMonth),
                    (i.drawYear = i.selectedYear = i.currentYear)) :
                ((r = new Date()),
                    (i.selectedDay = r.getDate()),
                    (i.drawMonth = i.selectedMonth = r.getMonth()),
                    (i.drawYear = i.selectedYear = r.getFullYear()));
            this._notifyChange(i);
            this._adjustDate(u);
        },
        _selectMonthYear: function(t, i, r) {
            var f = n(t),
                u = this._getInst(f[0]);
            u["selected" + ("M" === r ? "Month" : "Year")] = u[
                "draw" + ("M" === r ? "Month" : "Year")
            ] = parseInt(i.options[i.selectedIndex].value, 10);
            this._notifyChange(u);
            this._adjustDate(f);
        },
        _selectDay: function(t, i, r, u) {
            var f,
                e = n(t);
            n(u).hasClass(this._unselectableClass) ||
                this._isDisabledDatepicker(e[0]) ||
                ((f = this._getInst(e[0])),
                    (f.selectedDay = f.currentDay = n("a", u).html()),
                    (f.selectedMonth = f.currentMonth = i),
                    (f.selectedYear = f.currentYear = r),
                    this._selectDate(
                        t,
                        this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)
                    ));
        },
        _clearDate: function(t) {
            var i = n(t);
            this._selectDate(i, "");
        },
        _selectDate: function(t, i) {
            var u,
                f = n(t),
                r = this._getInst(f[0]);
            i = null != i ? i : this._formatDate(r);
            r.input && r.input.val(i);
            this._updateAlternate(r);
            u = this._get(r, "onSelect");
            u
                ?
                u.apply(r.input ? r.input[0] : null, [i, r]) :
                r.input && r.input.trigger("change");
            r.inline ?
                this._updateDatepicker(r) :
                (this._hideDatepicker(),
                    (this._lastInput = r.input[0]),
                    "object" != typeof r.input[0] && r.input.trigger("focus"),
                    (this._lastInput = null));
        },
        _updateAlternate: function(t) {
            var i,
                r,
                u,
                f = this._get(t, "altField");
            f &&
                ((i = this._get(t, "altFormat") || this._get(t, "dateFormat")),
                    (r = this._getDate(t)),
                    (u = this.formatDate(i, r, this._getFormatConfig(t))),
                    n(f).val(u));
        },
        noWeekends: function(n) {
            var t = n.getDay();
            return [t > 0 && 6 > t, ""];
        },
        iso8601Week: function(n) {
            var i,
                t = new Date(n.getTime());
            return (
                t.setDate(t.getDate() + 4 - (t.getDay() || 7)),
                (i = t.getTime()),
                t.setMonth(0),
                t.setDate(1),
                Math.floor(Math.round((i - t) / 864e5) / 7) + 1
            );
        },
        parseDate: function(t, i, r) {
            if (null == t || null == i) throw "Invalid arguments";
            if (((i = "object" == typeof i ? "" + i : i + ""), "" === i))
                return null;
            for (
                var a,
                    v,
                    u,
                    f = 0,
                    y =
                    (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    d =
                    "string" != typeof y ?
                    y :
                    (new Date().getFullYear() % 100) + parseInt(y, 10),
                    g = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort,
                    nt = (r ? r.dayNames : null) || this._defaults.dayNames,
                    tt =
                    (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort,
                    it = (r ? r.monthNames : null) || this._defaults.monthNames,
                    e = -1,
                    s = -1,
                    h = -1,
                    p = -1,
                    w = !1,
                    l = function(n) {
                        var i = t.length > o + 1 && t.charAt(o + 1) === n;
                        return i && o++, i;
                    },
                    c = function(n) {
                        var u = l(n),
                            r =
                            "@" === n ?
                            14 :
                            "!" === n ?
                            20 :
                            "y" === n && u ?
                            4 :
                            "o" === n ?
                            3 :
                            2,
                            e = "y" === n ? r : 1,
                            o = RegExp("^\\d{" + e + "," + r + "}"),
                            t = i.substring(f).match(o);
                        if (!t) throw "Missing number at position " + f;
                        return (f += t[0].length), parseInt(t[0], 10);
                    },
                    k = function(t, r, u) {
                        var e = -1,
                            o = n
                            .map(l(t) ? u : r, function(n, t) {
                                return [
                                    [t, n]
                                ];
                            })
                            .sort(function(n, t) {
                                return -(n[1].length - t[1].length);
                            });
                        if (
                            (n.each(o, function(n, t) {
                                var r = t[1];
                                if (i.substr(f, r.length).toLowerCase() === r.toLowerCase())
                                    return (e = t[0]), (f += r.length), !1;
                            }), -1 !== e)
                        )
                            return e + 1;
                        throw "Unknown name at position " + f;
                    },
                    b = function() {
                        if (i.charAt(f) !== t.charAt(o))
                            throw "Unexpected literal at position " + f;
                        f++;
                    },
                    o = 0; t.length > o; o++
            )
                if (w) "'" !== t.charAt(o) || l("'") ? b() : (w = !1);
                else
                    switch (t.charAt(o)) {
                        case "d":
                            h = c("d");
                            break;
                        case "D":
                            k("D", g, nt);
                            break;
                        case "o":
                            p = c("o");
                            break;
                        case "m":
                            s = c("m");
                            break;
                        case "M":
                            s = k("M", tt, it);
                            break;
                        case "y":
                            e = c("y");
                            break;
                        case "@":
                            u = new Date(c("@"));
                            e = u.getFullYear();
                            s = u.getMonth() + 1;
                            h = u.getDate();
                            break;
                        case "!":
                            u = new Date((c("!") - this._ticksTo1970) / 1e4);
                            e = u.getFullYear();
                            s = u.getMonth() + 1;
                            h = u.getDate();
                            break;
                        case "'":
                            l("'") ? b() : (w = !0);
                            break;
                        default:
                            b();
                    }
            if (i.length > f && ((v = i.substr(f)), !/^\s+/.test(v)))
                throw "Extra/unparsed characters found in date: " + v;
            if (
                (-1 === e ?
                    (e = new Date().getFullYear()) :
                    100 > e &&
                    (e +=
                        new Date().getFullYear() -
                        (new Date().getFullYear() % 100) +
                        (d >= e ? 0 : -100)),
                    p > -1)
            )
                for (s = 1, h = p;;) {
                    if (((a = this._getDaysInMonth(e, s - 1)), a >= h)) break;
                    s++;
                    h -= a;
                }
            if (
                ((u = this._daylightSavingAdjust(new Date(e, s - 1, h))),
                    u.getFullYear() !== e || u.getMonth() + 1 !== s || u.getDate() !== h)
            )
                throw "Invalid date";
            return u;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 864e9 *
            (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(n, t, i) {
            if (!t) return "";
            var u,
                h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                c = (i ? i.dayNames : null) || this._defaults.dayNames,
                l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                a = (i ? i.monthNames : null) || this._defaults.monthNames,
                f = function(t) {
                    var i = n.length > u + 1 && n.charAt(u + 1) === t;
                    return i && u++, i;
                },
                e = function(n, t, i) {
                    var r = "" + t;
                    if (f(n))
                        for (; i > r.length;) r = "0" + r;
                    return r;
                },
                s = function(n, t, i, r) {
                    return f(n) ? r[t] : i[t];
                },
                r = "",
                o = !1;
            if (t)
                for (u = 0; n.length > u; u++)
                    if (o)
                        "'" !== n.charAt(u) || f("'") ? (r += n.charAt(u)) : (o = !1);
                    else
                        switch (n.charAt(u)) {
                            case "d":
                                r += e("d", t.getDate(), 2);
                                break;
                            case "D":
                                r += s("D", t.getDay(), h, c);
                                break;
                            case "o":
                                r += e(
                                    "o",
                                    Math.round(
                                        (new Date(
                                                t.getFullYear(),
                                                t.getMonth(),
                                                t.getDate()
                                            ).getTime() -
                                            new Date(t.getFullYear(), 0, 0).getTime()) /
                                        864e5
                                    ),
                                    3
                                );
                                break;
                            case "m":
                                r += e("m", t.getMonth() + 1, 2);
                                break;
                            case "M":
                                r += s("M", t.getMonth(), l, a);
                                break;
                            case "y":
                                r += f("y") ?
                                    t.getFullYear() :
                                    (10 > t.getFullYear() % 100 ? "0" : "") +
                                    (t.getFullYear() % 100);
                                break;
                            case "@":
                                r += t.getTime();
                                break;
                            case "!":
                                r += 1e4 * t.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                f("'") ? (r += "'") : (o = !0);
                                break;
                            default:
                                r += n.charAt(u);
                        }
            return r;
        },
        _possibleChars: function(n) {
            for (
                var i = "",
                    r = !1,
                    u = function(i) {
                        var r = n.length > t + 1 && n.charAt(t + 1) === i;
                        return r && t++, r;
                    },
                    t = 0; n.length > t; t++
            )
                if (r) "'" !== n.charAt(t) || u("'") ? (i += n.charAt(t)) : (r = !1);
                else
                    switch (n.charAt(t)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            u("'") ? (i += "'") : (r = !0);
                            break;
                        default:
                            i += n.charAt(t);
                    }
            return i;
        },
        _get: function(n, t) {
            return void 0 !== n.settings[t] ? n.settings[t] : this._defaults[t];
        },
        _setDateFromField: function(n, t) {
            if (n.input.val() !== n.lastVal) {
                var f = this._get(n, "dateFormat"),
                    r = (n.lastVal = n.input ? n.input.val() : null),
                    u = this._getDefaultDate(n),
                    i = u,
                    e = this._getFormatConfig(n);
                try {
                    i = this.parseDate(f, r, e) || u;
                } catch (o) {
                    r = t ? "" : r;
                }
                n.selectedDay = i.getDate();
                n.drawMonth = n.selectedMonth = i.getMonth();
                n.drawYear = n.selectedYear = i.getFullYear();
                n.currentDay = r ? i.getDate() : 0;
                n.currentMonth = r ? i.getMonth() : 0;
                n.currentYear = r ? i.getFullYear() : 0;
                this._adjustInstDate(n);
            }
        },
        _getDefaultDate: function(n) {
            return this._restrictMinMax(
                n,
                this._determineDate(n, this._get(n, "defaultDate"), new Date())
            );
        },
        _determineDate: function(t, i, r) {
            var f = function(n) {
                    var t = new Date();
                    return t.setDate(t.getDate() + n), t;
                },
                e = function(i) {
                    try {
                        return n.datepicker.parseDate(
                            n.datepicker._get(t, "dateFormat"),
                            i,
                            n.datepicker._getFormatConfig(t)
                        );
                    } catch (h) {}
                    for (
                        var o =
                            (i.toLowerCase().match(/^c/) ?
                                n.datepicker._getDate(t) :
                                null) || new Date(),
                            f = o.getFullYear(),
                            e = o.getMonth(),
                            r = o.getDate(),
                            s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                            u = s.exec(i); u;

                    ) {
                        switch (u[2] || "d") {
                            case "d":
                            case "D":
                                r += parseInt(u[1], 10);
                                break;
                            case "w":
                            case "W":
                                r += 7 * parseInt(u[1], 10);
                                break;
                            case "m":
                            case "M":
                                e += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                                break;
                            case "y":
                            case "Y":
                                f += parseInt(u[1], 10);
                                r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                        }
                        u = s.exec(i);
                    }
                    return new Date(f, e, r);
                },
                u =
                null == i || "" === i ?
                r :
                "string" == typeof i ?
                e(i) :
                "number" == typeof i ?
                isNaN(i) ?
                r :
                f(i) :
                new Date(i.getTime());
            return (
                (u = u && "Invalid Date" == "" + u ? r : u),
                u &&
                (u.setHours(0),
                    u.setMinutes(0),
                    u.setSeconds(0),
                    u.setMilliseconds(0)),
                this._daylightSavingAdjust(u)
            );
        },
        _daylightSavingAdjust: function(n) {
            return n ?
                (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) :
                null;
        },
        _setDate: function(n, t, i) {
            var u = !t,
                f = n.selectedMonth,
                e = n.selectedYear,
                r = this._restrictMinMax(n, this._determineDate(n, t, new Date()));
            n.selectedDay = n.currentDay = r.getDate();
            n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
            n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
            (f === n.selectedMonth && e === n.selectedYear) ||
            i ||
                this._notifyChange(n);
            this._adjustInstDate(n);
            n.input && n.input.val(u ? "" : this._formatDate(n));
        },
        _getDate: function(n) {
            return !n.currentYear || (n.input && "" === n.input.val()) ?
                null :
                this._daylightSavingAdjust(
                    new Date(n.currentYear, n.currentMonth, n.currentDay)
                );
        },
        _attachHandlers: function(t) {
            var r = this._get(t, "stepMonths"),
                i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        n.datepicker._adjustDate(i, -r, "M");
                    },
                    next: function() {
                        n.datepicker._adjustDate(i, +r, "M");
                    },
                    hide: function() {
                        n.datepicker._hideDatepicker();
                    },
                    today: function() {
                        n.datepicker._gotoToday(i);
                    },
                    selectDay: function() {
                        return (
                            n.datepicker._selectDay(
                                i, +this.getAttribute("data-month"), +this.getAttribute("data-year"),
                                this
                            ), !1
                        );
                    },
                    selectMonth: function() {
                        return n.datepicker._selectMonthYear(i, this, "M"), !1;
                    },
                    selectYear: function() {
                        return n.datepicker._selectMonthYear(i, this, "Y"), !1;
                    },
                };
                n(this).on(
                    this.getAttribute("data-event"),
                    t[this.getAttribute("data-handler")]
                );
            });
        },
        _generateHTML: function(n) {
            var b,
                s,
                rt,
                h,
                ut,
                k,
                ft,
                et,
                ri,
                c,
                ot,
                ui,
                fi,
                ei,
                oi,
                st,
                g,
                si,
                ht,
                nt,
                o,
                y,
                ct,
                p,
                lt,
                l,
                u,
                at,
                vt,
                yt,
                pt,
                tt,
                wt,
                i,
                bt,
                kt,
                d,
                a,
                it,
                dt = new Date(),
                gt = this._daylightSavingAdjust(
                    new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())
                ),
                f = this._get(n, "isRTL"),
                li = this._get(n, "showButtonPanel"),
                hi = this._get(n, "hideIfNoPrevNext"),
                ni = this._get(n, "navigationAsDateFormat"),
                e = this._getNumberOfMonths(n),
                ai = this._get(n, "showCurrentAtPos"),
                ci = this._get(n, "stepMonths"),
                ti = 1 !== e[0] || 1 !== e[1],
                ii = this._daylightSavingAdjust(
                    n.currentDay ?
                    new Date(n.currentYear, n.currentMonth, n.currentDay) :
                    new Date(9999, 9, 9)
                ),
                w = this._getMinMaxDate(n, "min"),
                v = this._getMinMaxDate(n, "max"),
                t = n.drawMonth - ai,
                r = n.drawYear;
            if ((0 > t && ((t += 12), r--), v))
                for (
                    b = this._daylightSavingAdjust(
                        new Date(
                            v.getFullYear(),
                            v.getMonth() - e[0] * e[1] + 1,
                            v.getDate()
                        )
                    ),
                    b = w && w > b ? w : b; this._daylightSavingAdjust(new Date(r, t, 1)) > b;

                )
                    t--, 0 > t && ((t = 11), r--);
            for (
                n.drawMonth = t,
                n.drawYear = r,
                s = this._get(n, "prevText"),
                s = ni ?
                this.formatDate(
                    s,
                    this._daylightSavingAdjust(new Date(r, t - ci, 1)),
                    this._getFormatConfig(n)
                ) :
                s,
                rt = this._canAdjustMonth(n, -1, r, t) ?
                "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
                s +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "e" : "w") +
                "'>" +
                s +
                "</span></a>" :
                hi ?
                "" :
                "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
                s +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "e" : "w") +
                "'>" +
                s +
                "</span></a>",
                h = this._get(n, "nextText"),
                h = ni ?
                this.formatDate(
                    h,
                    this._daylightSavingAdjust(new Date(r, t + ci, 1)),
                    this._getFormatConfig(n)
                ) :
                h,
                ut = this._canAdjustMonth(n, 1, r, t) ?
                "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
                h +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "w" : "e") +
                "'>" +
                h +
                "</span></a>" :
                hi ?
                "" :
                "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
                h +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (f ? "w" : "e") +
                "'>" +
                h +
                "</span></a>",
                k = this._get(n, "currentText"),
                ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt,
                k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k,
                et = n.inline ?
                "" :
                "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
                this._get(n, "closeText") +
                "</button>",
                ri = li ?
                "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
                (f ? et : "") +
                (this._isInRange(n, ft) ?
                    "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                    k +
                    "</button>" :
                    "") +
                (f ? "" : et) +
                "</div>" :
                "",
                c = parseInt(this._get(n, "firstDay"), 10),
                c = isNaN(c) ? 0 : c,
                ot = this._get(n, "showWeek"),
                ui = this._get(n, "dayNames"),
                fi = this._get(n, "dayNamesMin"),
                ei = this._get(n, "monthNames"),
                oi = this._get(n, "monthNamesShort"),
                st = this._get(n, "beforeShowDay"),
                g = this._get(n, "showOtherMonths"),
                si = this._get(n, "selectOtherMonths"),
                ht = this._getDefaultDate(n),
                nt = "",
                y = 0; e[0] > y; y++
            ) {
                for (ct = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
                    if (
                        ((lt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay))),
                            (l = " ui-corner-all"),
                            (u = ""),
                            ti)
                    ) {
                        if (((u += "<div class='ui-datepicker-group"), e[1] > 1))
                            switch (p) {
                                case 0:
                                    u += " ui-datepicker-group-first";
                                    l = " ui-corner-" + (f ? "right" : "left");
                                    break;
                                case e[1] - 1:
                                    u += " ui-datepicker-group-last";
                                    l = " ui-corner-" + (f ? "left" : "right");
                                    break;
                                default:
                                    u += " ui-datepicker-group-middle";
                                    l = "";
                            }
                        u += "'>";
                    }
                    for (
                        u +=
                        "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                        l +
                        "'>" +
                        (/all|left/.test(l) && 0 === y ? (f ? ut : rt) : "") +
                        (/all|right/.test(l) && 0 === y ? (f ? rt : ut) : "") +
                        this._generateMonthYearHeader(
                            n,
                            t,
                            r,
                            w,
                            v,
                            y > 0 || p > 0,
                            ei,
                            oi
                        ) +
                        "</div><table class='ui-datepicker-calendar'><thead><tr>",
                        at = ot ?
                        "<th class='ui-datepicker-week-col'>" +
                        this._get(n, "weekHeader") +
                        "</th>" :
                        "",
                        o = 0; 7 > o; o++
                    )
                        (vt = (o + c) % 7),
                        (at +=
                            "<th scope='col'" +
                            ((o + c + 6) % 7 >= 5 ?
                                " class='ui-datepicker-week-end'" :
                                "") +
                            "><span title='" +
                            ui[vt] +
                            "'>" +
                            fi[vt] +
                            "</span></th>");
                    for (
                        u += at + "</tr></thead><tbody>",
                        yt = this._getDaysInMonth(r, t),
                        r === n.selectedYear &&
                        t === n.selectedMonth &&
                        (n.selectedDay = Math.min(n.selectedDay, yt)),
                        pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7,
                        tt = Math.ceil((pt + yt) / 7),
                        wt = ti ? (this.maxRows > tt ? this.maxRows : tt) : tt,
                        this.maxRows = wt,
                        i = this._daylightSavingAdjust(new Date(r, t, 1 - pt)),
                        bt = 0; wt > bt; bt++
                    ) {
                        for (
                            u += "<tr>",
                            kt = ot ?
                            "<td class='ui-datepicker-week-col'>" +
                            this._get(n, "calculateWeek")(i) +
                            "</td>" :
                            "",
                            o = 0; 7 > o; o++
                        )
                            (d = st ?
                                st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""]),
                            (a = i.getMonth() !== t),
                            (it = (a && !si) || !d[0] || (w && w > i) || (v && i > v)),
                            (kt +=
                                "<td class='" +
                                ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                                (a ? " ui-datepicker-other-month" : "") +
                                ((i.getTime() === lt.getTime() &&
                                        t === n.selectedMonth &&
                                        n._keyEvent) ||
                                    (ht.getTime() === i.getTime() &&
                                        ht.getTime() === lt.getTime()) ?
                                    " " + this._dayOverClass :
                                    "") +
                                (it ?
                                    " " + this._unselectableClass + " ui-state-disabled" :
                                    "") +
                                (a && !g ?
                                    "" :
                                    " " +
                                    d[1] +
                                    (i.getTime() === ii.getTime() ?
                                        " " + this._currentClass :
                                        "") +
                                    (i.getTime() === gt.getTime() ?
                                        " ui-datepicker-today" :
                                        "")) +
                                "'" +
                                ((a && !g) || !d[2] ?
                                    "" :
                                    " title='" + d[2].replace(/'/g, "&#39;") + "'") +
                                (it ?
                                    "" :
                                    " data-handler='selectDay' data-event='click' data-month='" +
                                    i.getMonth() +
                                    "' data-year='" +
                                    i.getFullYear() +
                                    "'") +
                                ">" +
                                (a && !g ?
                                    "&#xa0;" :
                                    it ?
                                    "<span class='ui-state-default'>" +
                                    i.getDate() +
                                    "</span>" :
                                    "<a class='ui-state-default" +
                                    (i.getTime() === gt.getTime() ?
                                        " ui-state-highlight" :
                                        "") +
                                    (i.getTime() === ii.getTime() ?
                                        " ui-state-active" :
                                        "") +
                                    (a ? " ui-priority-secondary" : "") +
                                    "' href='#'>" +
                                    i.getDate() +
                                    "</a>") +
                                "</td>"),
                            i.setDate(i.getDate() + 1),
                            (i = this._daylightSavingAdjust(i));
                        u += kt + "</tr>";
                    }
                    t++;
                    t > 11 && ((t = 0), r++);
                    u +=
                        "</tbody></table>" +
                        (ti ?
                            "</div>" +
                            (e[0] > 0 && p === e[1] - 1 ?
                                "<div class='ui-datepicker-row-break'></div>" :
                                "") :
                            "");
                    ct += u;
                }
                nt += ct;
            }
            return (nt += ri), (n._keyEvent = !1), nt;
        },
        _generateMonthYearHeader: function(n, t, i, r, u, f, e, o) {
            var k,
                d,
                h,
                v,
                y,
                p,
                s,
                a,
                w = this._get(n, "changeMonth"),
                b = this._get(n, "changeYear"),
                g = this._get(n, "showMonthAfterYear"),
                c = "<div class='ui-datepicker-title'>",
                l = "";
            if (f || !w)
                l += "<span class='ui-datepicker-month'>" + e[t] + "</span>";
            else {
                for (
                    k = r && r.getFullYear() === i,
                    d = u && u.getFullYear() === i,
                    l +=
                    "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                    h = 0; 12 > h; h++
                )
                    (!k || h >= r.getMonth()) &&
                    (!d || u.getMonth() >= h) &&
                    (l +=
                        "<option value='" +
                        h +
                        "'" +
                        (h === t ? " selected='selected'" : "") +
                        ">" +
                        o[h] +
                        "</option>");
                l += "</select>";
            }
            if ((g || (c += l + (!f && w && b ? "" : "&#xa0;")), !n.yearshtml))
                if (((n.yearshtml = ""), f || !b))
                    c += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (
                        v = this._get(n, "yearRange").split(":"),
                        y = new Date().getFullYear(),
                        p = function(n) {
                            var t = n.match(/c[+\-].*/) ?
                                i + parseInt(n.substring(1), 10) :
                                n.match(/[+\-].*/) ?
                                y + parseInt(n, 10) :
                                parseInt(n, 10);
                            return isNaN(t) ? y : t;
                        },
                        s = p(v[0]),
                        a = Math.max(s, p(v[1] || "")),
                        s = r ? Math.max(s, r.getFullYear()) : s,
                        a = u ? Math.min(a, u.getFullYear()) : a,
                        n.yearshtml +=
                        "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; a >= s; s++
                    )
                        n.yearshtml +=
                        "<option value='" +
                        s +
                        "'" +
                        (s === i ? " selected='selected'" : "") +
                        ">" +
                        s +
                        "</option>";
                    n.yearshtml += "</select>";
                    c += n.yearshtml;
                    n.yearshtml = null;
                }
            return (
                (c += this._get(n, "yearSuffix")),
                g && (c += (!f && w && b ? "" : "&#xa0;") + l),
                c + "</div>"
            );
        },
        _adjustInstDate: function(n, t, i) {
            var u = n.selectedYear + ("Y" === i ? t : 0),
                f = n.selectedMonth + ("M" === i ? t : 0),
                e =
                Math.min(n.selectedDay, this._getDaysInMonth(u, f)) +
                ("D" === i ? t : 0),
                r = this._restrictMinMax(
                    n,
                    this._daylightSavingAdjust(new Date(u, f, e))
                );
            n.selectedDay = r.getDate();
            n.drawMonth = n.selectedMonth = r.getMonth();
            n.drawYear = n.selectedYear = r.getFullYear();
            ("M" === i || "Y" === i) && this._notifyChange(n);
        },
        _restrictMinMax: function(n, t) {
            var i = this._getMinMaxDate(n, "min"),
                r = this._getMinMaxDate(n, "max"),
                u = i && i > t ? i : t;
            return r && u > r ? r : u;
        },
        _notifyChange: function(n) {
            var t = this._get(n, "onChangeMonthYear");
            t &&
                t.apply(n.input ? n.input[0] : null, [
                    n.selectedYear,
                    n.selectedMonth + 1,
                    n,
                ]);
        },
        _getNumberOfMonths: function(n) {
            var t = this._get(n, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
        },
        _getMinMaxDate: function(n, t) {
            return this._determineDate(n, this._get(n, t + "Date"), null);
        },
        _getDaysInMonth: function(n, t) {
            return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate();
        },
        _getFirstDayOfMonth: function(n, t) {
            return new Date(n, t, 1).getDay();
        },
        _canAdjustMonth: function(n, t, i, r) {
            var f = this._getNumberOfMonths(n),
                u = this._daylightSavingAdjust(
                    new Date(i, r + (0 > t ? t : f[0] * f[1]), 1)
                );
            return (
                0 > t &&
                u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())),
                this._isInRange(n, u)
            );
        },
        _isInRange: function(n, t) {
            var i,
                f,
                e = this._getMinMaxDate(n, "min"),
                o = this._getMinMaxDate(n, "max"),
                r = null,
                u = null,
                s = this._get(n, "yearRange");
            return (
                s &&
                ((i = s.split(":")),
                    (f = new Date().getFullYear()),
                    (r = parseInt(i[0], 10)),
                    (u = parseInt(i[1], 10)),
                    i[0].match(/[+\-].*/) && (r += f),
                    i[1].match(/[+\-].*/) && (u += f)),
                (!e || t.getTime() >= e.getTime()) &&
                (!o || t.getTime() <= o.getTime()) &&
                (!r || t.getFullYear() >= r) &&
                (!u || u >= t.getFullYear())
            );
        },
        _getFormatConfig: function(n) {
            var t = this._get(n, "shortYearCutoff");
            return (
                (t =
                    "string" != typeof t ?
                    t :
                    (new Date().getFullYear() % 100) + parseInt(t, 10)), {
                    shortYearCutoff: t,
                    dayNamesShort: this._get(n, "dayNamesShort"),
                    dayNames: this._get(n, "dayNames"),
                    monthNamesShort: this._get(n, "monthNamesShort"),
                    monthNames: this._get(n, "monthNames"),
                }
            );
        },
        _formatDate: function(n, t, i, r) {
            t ||
                ((n.currentDay = n.selectedDay),
                    (n.currentMonth = n.selectedMonth),
                    (n.currentYear = n.selectedYear));
            var u = t ?
                "object" == typeof t ?
                t :
                this._daylightSavingAdjust(new Date(r, i, t)) :
                this._daylightSavingAdjust(
                    new Date(n.currentYear, n.currentMonth, n.currentDay)
                );
            return this.formatDate(
                this._get(n, "dateFormat"),
                u,
                this._getFormatConfig(n)
            );
        },
    });
    n.fn.datepicker = function(t) {
        if (!this.length) return this;
        n.datepicker.initialized ||
            (n(document).on("mousedown", n.datepicker._checkExternalClick),
                (n.datepicker.initialized = !0));
        0 === n("#" + n.datepicker._mainDivId).length &&
            n("body").append(n.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof t ||
            ("isDisabled" !== t && "getDate" !== t && "widget" !== t) ?
            "option" === t &&
            2 === arguments.length &&
            "string" == typeof arguments[1] ?
            n.datepicker["_" + t + "Datepicker"].apply(
                n.datepicker, [this[0]].concat(i)
            ) :
            this.each(function() {
                "string" == typeof t
                    ?
                    n.datepicker["_" + t + "Datepicker"].apply(
                        n.datepicker, [this].concat(i)
                    ) :
                    n.datepicker._attachDatepicker(this, t);
            }) :
            n.datepicker["_" + t + "Datepicker"].apply(
                n.datepicker, [this[0]].concat(i)
            );
    };
    n.datepicker = new c();
    n.datepicker.initialized = !1;
    n.datepicker.uuid = new Date().getTime();
    n.datepicker.version = "1.12.1";
    n.datepicker;
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    r = !1;
    n(document).on("mouseup", function() {
        r = !1;
    });
    n.widget("ui.mouse", {
        version: "1.12.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0,
        },
        _mouseInit: function() {
            var t = this;
            this.element
                .on("mousedown." + this.widgetName, function(n) {
                    return t._mouseDown(n);
                })
                .on("click." + this.widgetName, function(i) {
                    if (!0 === n.data(i.target, t.widgetName + ".preventClickEvent"))
                        return (
                            n.removeData(i.target, t.widgetName + ".preventClickEvent"),
                            i.stopImmediatePropagation(), !1
                        );
                });
            this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName);
            this._mouseMoveDelegate &&
                this.document
                .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .off("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(t) {
            if (!r) {
                this._mouseMoved = !1;
                this._mouseStarted && this._mouseUp(t);
                this._mouseDownEvent = t;
                var i = this,
                    u = 1 === t.which,
                    f =
                    "string" == typeof this.options.cancel && t.target.nodeName ?
                    n(t.target).closest(this.options.cancel).length :
                    !1;
                return u && !f && this._mouseCapture(t) ?
                    ((this.mouseDelayMet = !this.options.delay),
                        this.mouseDelayMet ||
                        (this._mouseDelayTimer = setTimeout(function() {
                            i.mouseDelayMet = !0;
                        }, this.options.delay)),
                        this._mouseDistanceMet(t) &&
                        this._mouseDelayMet(t) &&
                        ((this._mouseStarted = this._mouseStart(t) !== !1), !this._mouseStarted) ?
                        (t.preventDefault(), !0) :
                        (!0 ===
                            n.data(t.target, this.widgetName + ".preventClickEvent") &&
                            n.removeData(
                                t.target,
                                this.widgetName + ".preventClickEvent"
                            ),
                            (this._mouseMoveDelegate = function(n) {
                                return i._mouseMove(n);
                            }),
                            (this._mouseUpDelegate = function(n) {
                                return i._mouseUp(n);
                            }),
                            this.document
                            .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                            .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                            t.preventDefault(),
                            (r = !0), !0)) :
                    !0;
            }
        },
        _mouseMove: function(t) {
            if (this._mouseMoved) {
                if (
                    n.ui.ie &&
                    (!document.documentMode || 9 > document.documentMode) &&
                    !t.button
                )
                    return this._mouseUp(t);
                if (!t.which)
                    if (
                        t.originalEvent.altKey ||
                        t.originalEvent.ctrlKey ||
                        t.originalEvent.metaKey ||
                        t.originalEvent.shiftKey
                    )
                        this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich) return this._mouseUp(t);
            }
            return (
                (t.which || t.button) && (this._mouseMoved = !0),
                this._mouseStarted ?
                (this._mouseDrag(t), t.preventDefault()) :
                (this._mouseDistanceMet(t) &&
                    this._mouseDelayMet(t) &&
                    ((this._mouseStarted =
                            this._mouseStart(this._mouseDownEvent, t) !== !1),
                        this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
            );
        },
        _mouseUp: function(t) {
            this.document
                .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
                .off("mouseup." + this.widgetName, this._mouseUpDelegate);
            this._mouseStarted &&
                ((this._mouseStarted = !1),
                    t.target === this._mouseDownEvent.target &&
                    n.data(t.target, this.widgetName + ".preventClickEvent", !0),
                    this._mouseStop(t));
            this._mouseDelayTimer &&
                (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer);
            this.ignoreMissingWhich = !1;
            r = !1;
            t.preventDefault();
        },
        _mouseDistanceMet: function(n) {
            return (
                Math.max(
                    Math.abs(this._mouseDownEvent.pageX - n.pageX),
                    Math.abs(this._mouseDownEvent.pageY - n.pageY)
                ) >= this.options.distance
            );
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        },
    });
    n.ui.plugin = {
        add: function(t, i, r) {
            var u,
                f = n.ui[t].prototype;
            for (u in r)
                (f.plugins[u] = f.plugins[u] || []), f.plugins[u].push([i, r[u]]);
        },
        call: function(n, t, i, r) {
            var u,
                f = n.plugins[t];
            if (
                f &&
                (r ||
                    (n.element[0].parentNode &&
                        11 !== n.element[0].parentNode.nodeType))
            )
                for (u = 0; f.length > u; u++)
                    n.options[f[u][0]] && f[u][1].apply(n.element, i);
        },
    };
    n.ui.safeBlur = function(t) {
        t && "body" !== t.nodeName.toLowerCase() && n(t).trigger("blur");
    };
    n.widget("ui.draggable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null,
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative();
            this.options.addClasses && this._addClass("ui-draggable");
            this._setHandleClassName();
            this._mouseInit();
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "handle" === n &&
                (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ?
                ((this.destroyOnClear = !0), void 0) :
                (this._removeHandleClassName(), this._mouseDestroy(), void 0);
        },
        _mouseCapture: function(t) {
            var i = this.options;
            return this.helper ||
                i.disabled ||
                n(t.target).closest(".ui-resizable-handle").length > 0 ?
                !1 :
                ((this.handle = this._getHandle(t)),
                    this.handle ?
                    (this._blurActiveElement(t),
                        this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) :
                    !1);
        },
        _blockFrames: function(t) {
            this.iframeBlocks = this.document.find(t).map(function() {
                var t = n(this);
                return n("<div>")
                    .css("position", "absolute")
                    .appendTo(t.parent())
                    .outerWidth(t.outerWidth())
                    .outerHeight(t.outerHeight())
                    .offset(t.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks &&
                (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function(t) {
            var i = n.ui.safeActiveElement(this.document[0]),
                r = n(t.target);
            r.closest(i).length || n.ui.safeBlur(i);
        },
        _mouseStart: function(t) {
            var i = this.options;
            return (
                (this.helper = this._createHelper(t)),
                this._addClass(this.helper, "ui-draggable-dragging"),
                this._cacheHelperProportions(),
                n.ui.ddmanager && (n.ui.ddmanager.current = this),
                this._cacheMargins(),
                (this.cssPosition = this.helper.css("position")),
                (this.scrollParent = this.helper.scrollParent(!0)),
                (this.offsetParent = this.helper.offsetParent()),
                (this.hasFixedAncestor =
                    this.helper.parents().filter(function() {
                        return "fixed" === n(this).css("position");
                    }).length > 0),
                (this.positionAbs = this.element.offset()),
                this._refreshOffsets(t),
                (this.originalPosition = this.position = this._generatePosition(
                    t, !1
                )),
                (this.originalPageX = t.pageX),
                (this.originalPageY = t.pageY),
                i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
                this._setContainment(),
                this._trigger("start", t) === !1 ?
                (this._clear(), !1) :
                (this._cacheHelperProportions(),
                    n.ui.ddmanager &&
                    !i.dropBehaviour &&
                    n.ui.ddmanager.prepareOffsets(this, t),
                    this._mouseDrag(t, !0),
                    n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t), !0)
            );
        },
        _refreshOffsets: function(n) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset(),
            };
            this.offset.click = {
                left: n.pageX - this.offset.left,
                top: n.pageY - this.offset.top,
            };
        },
        _mouseDrag: function(t, i) {
            if (
                (this.hasFixedAncestor &&
                    (this.offset.parent = this._getParentOffset()),
                    (this.position = this._generatePosition(t, !0)),
                    (this.positionAbs = this._convertPositionTo("absolute")), !i)
            ) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1)
                    return this._mouseUp(new n.Event("mouseup", t)), !1;
                this.position = r.position;
            }
            return (
                (this.helper[0].style.left = this.position.left + "px"),
                (this.helper[0].style.top = this.position.top + "px"),
                n.ui.ddmanager && n.ui.ddmanager.drag(this, t), !1
            );
        },
        _mouseStop: function(t) {
            var r = this,
                i = !1;
            return (
                n.ui.ddmanager &&
                !this.options.dropBehaviour &&
                (i = n.ui.ddmanager.drop(this, t)),
                this.dropped && ((i = this.dropped), (this.dropped = !1)),
                ("invalid" === this.options.revert && !i) ||
                ("valid" === this.options.revert && i) ||
                this.options.revert === !0 ||
                (n.isFunction(this.options.revert) &&
                    this.options.revert.call(this.element, i)) ?
                n(this.helper).animate(
                    this.originalPosition,
                    parseInt(this.options.revertDuration, 10),
                    function() {
                        r._trigger("stop", t) !== !1 && r._clear();
                    }
                ) :
                this._trigger("stop", t) !== !1 && this._clear(), !1
            );
        },
        _mouseUp: function(t) {
            return (
                this._unblockFrames(),
                n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t),
                this.handleElement.is(t.target) && this.element.trigger("focus"),
                n.ui.mouse.prototype._mouseUp.call(this, t)
            );
        },
        cancel: function() {
            return (
                this.helper.is(".ui-draggable-dragging") ?
                this._mouseUp(new n.Event("mouseup", { target: this.element[0] })) :
                this._clear(),
                this
            );
        },
        _getHandle: function(t) {
            return this.options.handle ?
                !!n(t.target).closest(this.element.find(this.options.handle)).length :
                !0;
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ?
                this.element.find(this.options.handle) :
                this.element;
            this._addClass(this.handleElement, "ui-draggable-handle");
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle");
        },
        _createHelper: function(t) {
            var r = this.options,
                u = n.isFunction(r.helper),
                i = u ?
                n(r.helper.apply(this.element[0], [t])) :
                "clone" === r.helper ?
                this.element.clone().removeAttr("id") :
                this.element;
            return (
                i.parents("body").length ||
                i.appendTo(
                    "parent" === r.appendTo ? this.element[0].parentNode : r.appendTo
                ),
                u && i[0] === this.element[0] && this._setPositionRelative(),
                i[0] === this.element[0] ||
                /(fixed|absolute)/.test(i.css("position")) ||
                i.css("position", "absolute"),
                i
            );
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) ||
                (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" "));
            n.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 });
            "left" in t && (this.offset.click.left = t.left + this.margins.left);
            "right" in t &&
                (this.offset.click.left =
                    this.helperProportions.width - t.right + this.margins.left);
            "top" in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom" in t &&
                (this.offset.click.top =
                    this.helperProportions.height - t.bottom + this.margins.top);
        },
        _isRootNode: function(n) {
            return /(html|body)/i.test(n.tagName) || n === this.document[0];
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset(),
                i = this.document[0];
            return (
                "absolute" === this.cssPosition &&
                this.scrollParent[0] !== i &&
                n.contains(this.scrollParent[0], this.offsetParent[0]) &&
                ((t.left += this.scrollParent.scrollLeft()),
                    (t.top += this.scrollParent.scrollTop())),
                this._isRootNode(this.offsetParent[0]) && (t = { top: 0, left: 0 }), {
                    top: t.top +
                        (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left +
                        (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
                }
            );
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
            var n = this.element.position(),
                t = this._isRootNode(this.scrollParent[0]);
            return {
                top: n.top -
                    (parseInt(this.helper.css("top"), 10) || 0) +
                    (t ? 0 : this.scrollParent.scrollTop()),
                left: n.left -
                    (parseInt(this.helper.css("left"), 10) || 0) +
                    (t ? 0 : this.scrollParent.scrollLeft()),
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight(),
            };
        },
        _setContainment: function() {
            var f,
                t,
                i,
                r = this.options,
                u = this.document[0];
            return (
                (this.relativeContainer = null),
                r.containment ?
                "window" === r.containment ?
                ((this.containment = [
                        n(window).scrollLeft() -
                        this.offset.relative.left -
                        this.offset.parent.left,
                        n(window).scrollTop() -
                        this.offset.relative.top -
                        this.offset.parent.top,
                        n(window).scrollLeft() +
                        n(window).width() -
                        this.helperProportions.width -
                        this.margins.left,
                        n(window).scrollTop() +
                        (n(window).height() || u.body.parentNode.scrollHeight) -
                        this.helperProportions.height -
                        this.margins.top,
                    ]),
                    void 0) :
                "document" === r.containment ?
                ((this.containment = [
                        0,
                        0,
                        n(u).width() -
                        this.helperProportions.width -
                        this.margins.left,
                        (n(u).height() || u.body.parentNode.scrollHeight) -
                        this.helperProportions.height -
                        this.margins.top,
                    ]),
                    void 0) :
                r.containment.constructor === Array ?
                ((this.containment = r.containment), void 0) :
                ("parent" === r.containment &&
                    (r.containment = this.helper[0].parentNode),
                    (t = n(r.containment)),
                    (i = t[0]),
                    i &&
                    ((f = /(scroll|auto)/.test(t.css("overflow"))),
                        (this.containment = [
                            (parseInt(t.css("borderLeftWidth"), 10) || 0) +
                            (parseInt(t.css("paddingLeft"), 10) || 0),
                            (parseInt(t.css("borderTopWidth"), 10) || 0) +
                            (parseInt(t.css("paddingTop"), 10) || 0),
                            (f ?
                                Math.max(i.scrollWidth, i.offsetWidth) :
                                i.offsetWidth) -
                            (parseInt(t.css("borderRightWidth"), 10) || 0) -
                            (parseInt(t.css("paddingRight"), 10) || 0) -
                            this.helperProportions.width -
                            this.margins.left -
                            this.margins.right,
                            (f ?
                                Math.max(i.scrollHeight, i.offsetHeight) :
                                i.offsetHeight) -
                            (parseInt(t.css("borderBottomWidth"), 10) || 0) -
                            (parseInt(t.css("paddingBottom"), 10) || 0) -
                            this.helperProportions.height -
                            this.margins.top -
                            this.margins.bottom,
                        ]),
                        (this.relativeContainer = t)),
                    void 0) :
                ((this.containment = null), void 0)
            );
        },
        _convertPositionTo: function(n, t) {
            t || (t = this.position);
            var i = "absolute" === n ? 1 : -1,
                r = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top +
                    this.offset.relative.top * i +
                    this.offset.parent.top * i -
                    ("fixed" === this.cssPosition ?
                        -this.offset.scroll.top :
                        r ?
                        0 :
                        this.offset.scroll.top) *
                    i,
                left: t.left +
                    this.offset.relative.left * i +
                    this.offset.parent.left * i -
                    ("fixed" === this.cssPosition ?
                        -this.offset.scroll.left :
                        r ?
                        0 :
                        this.offset.scroll.left) *
                    i,
            };
        },
        _generatePosition: function(n, t) {
            var i,
                s,
                u,
                f,
                r = this.options,
                h = this._isRootNode(this.scrollParent[0]),
                e = n.pageX,
                o = n.pageY;
            return (
                (h && this.offset.scroll) ||
                (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft(),
                }),
                t &&
                (this.containment &&
                    (this.relativeContainer ?
                        ((s = this.relativeContainer.offset()),
                            (i = [
                                this.containment[0] + s.left,
                                this.containment[1] + s.top,
                                this.containment[2] + s.left,
                                this.containment[3] + s.top,
                            ])) :
                        (i = this.containment),
                        n.pageX - this.offset.click.left < i[0] &&
                        (e = i[0] + this.offset.click.left),
                        n.pageY - this.offset.click.top < i[1] &&
                        (o = i[1] + this.offset.click.top),
                        n.pageX - this.offset.click.left > i[2] &&
                        (e = i[2] + this.offset.click.left),
                        n.pageY - this.offset.click.top > i[3] &&
                        (o = i[3] + this.offset.click.top)),
                    r.grid &&
                    ((u = r.grid[1] ?
                            this.originalPageY +
                            Math.round((o - this.originalPageY) / r.grid[1]) * r.grid[1] :
                            this.originalPageY),
                        (o = i ?
                            u - this.offset.click.top >= i[1] ||
                            u - this.offset.click.top > i[3] ?
                            u :
                            u - this.offset.click.top >= i[1] ?
                            u - r.grid[1] :
                            u + r.grid[1] :
                            u),
                        (f = r.grid[0] ?
                            this.originalPageX +
                            Math.round((e - this.originalPageX) / r.grid[0]) * r.grid[0] :
                            this.originalPageX),
                        (e = i ?
                            f - this.offset.click.left >= i[0] ||
                            f - this.offset.click.left > i[2] ?
                            f :
                            f - this.offset.click.left >= i[0] ?
                            f - r.grid[0] :
                            f + r.grid[0] :
                            f)),
                    "y" === r.axis && (e = this.originalPageX),
                    "x" === r.axis && (o = this.originalPageY)), {
                    top: o -
                        this.offset.click.top -
                        this.offset.relative.top -
                        this.offset.parent.top +
                        ("fixed" === this.cssPosition ?
                            -this.offset.scroll.top :
                            h ?
                            0 :
                            this.offset.scroll.top),
                    left: e -
                        this.offset.click.left -
                        this.offset.relative.left -
                        this.offset.parent.left +
                        ("fixed" === this.cssPosition ?
                            -this.offset.scroll.left :
                            h ?
                            0 :
                            this.offset.scroll.left),
                }
            );
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging");
            this.helper[0] === this.element[0] ||
                this.cancelHelperRemoval ||
                this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = !1;
            this.destroyOnClear && this.destroy();
        },
        _trigger: function(t, i, r) {
            return (
                (r = r || this._uiHash()),
                n.ui.plugin.call(this, t, [i, r, this], !0),
                /^(drag|start|stop)/.test(t) &&
                ((this.positionAbs = this._convertPositionTo("absolute")),
                    (r.offset = this.positionAbs)),
                n.Widget.prototype._trigger.call(this, t, i, r)
            );
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs,
            };
        },
    });
    n.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, i, r) {
            var u = n.extend({}, i, { item: r.element });
            r.sortables = [];
            n(r.options.connectToSortable).each(function() {
                var i = n(this).sortable("instance");
                i &&
                    !i.options.disabled &&
                    (r.sortables.push(i),
                        i.refreshPositions(),
                        i._trigger("activate", t, u));
            });
        },
        stop: function(t, i, r) {
            var u = n.extend({}, i, { item: r.element });
            r.cancelHelperRemoval = !1;
            n.each(r.sortables, function() {
                var n = this;
                n.isOver ?
                    ((n.isOver = 0),
                        (r.cancelHelperRemoval = !0),
                        (n.cancelHelperRemoval = !1),
                        (n._storedCSS = {
                            position: n.placeholder.css("position"),
                            top: n.placeholder.css("top"),
                            left: n.placeholder.css("left"),
                        }),
                        n._mouseStop(t),
                        (n.options.helper = n.options._helper)) :
                    ((n.cancelHelperRemoval = !0), n._trigger("deactivate", t, u));
            });
        },
        drag: function(t, i, r) {
            n.each(r.sortables, function() {
                var f = !1,
                    u = this;
                u.positionAbs = r.positionAbs;
                u.helperProportions = r.helperProportions;
                u.offset.click = r.offset.click;
                u._intersectsWith(u.containerCache) &&
                    ((f = !0),
                        n.each(r.sortables, function() {
                            return (
                                (this.positionAbs = r.positionAbs),
                                (this.helperProportions = r.helperProportions),
                                (this.offset.click = r.offset.click),
                                this !== u &&
                                this._intersectsWith(this.containerCache) &&
                                n.contains(u.element[0], this.element[0]) &&
                                (f = !1),
                                f
                            );
                        }));
                f
                    ?
                    (u.isOver ||
                        ((u.isOver = 1),
                            (r._parent = i.helper.parent()),
                            (u.currentItem = i.helper
                                .appendTo(u.element)
                                .data("ui-sortable-item", !0)),
                            (u.options._helper = u.options.helper),
                            (u.options.helper = function() {
                                return i.helper[0];
                            }),
                            (t.target = u.currentItem[0]),
                            u._mouseCapture(t, !0),
                            u._mouseStart(t, !0, !0),
                            (u.offset.click.top = r.offset.click.top),
                            (u.offset.click.left = r.offset.click.left),
                            (u.offset.parent.left -=
                                r.offset.parent.left - u.offset.parent.left),
                            (u.offset.parent.top -=
                                r.offset.parent.top - u.offset.parent.top),
                            r._trigger("toSortable", t),
                            (r.dropped = u.element),
                            n.each(r.sortables, function() {
                                this.refreshPositions();
                            }),
                            (r.currentItem = r.element),
                            (u.fromOutside = r)),
                        u.currentItem && (u._mouseDrag(t), (i.position = u.position))) :
                    u.isOver &&
                    ((u.isOver = 0),
                        (u.cancelHelperRemoval = !0),
                        (u.options._revert = u.options.revert),
                        (u.options.revert = !1),
                        u._trigger("out", t, u._uiHash(u)),
                        u._mouseStop(t, !0),
                        (u.options.revert = u.options._revert),
                        (u.options.helper = u.options._helper),
                        u.placeholder && u.placeholder.remove(),
                        i.helper.appendTo(r._parent),
                        r._refreshOffsets(t),
                        (i.position = r._generatePosition(t, !0)),
                        r._trigger("fromSortable", t),
                        (r.dropped = !1),
                        n.each(r.sortables, function() {
                            this.refreshPositions();
                        }));
            });
        },
    });
    n.ui.plugin.add("draggable", "cursor", {
        start: function(t, i, r) {
            var u = n("body"),
                f = r.options;
            u.css("cursor") && (f._cursor = u.css("cursor"));
            u.css("cursor", f.cursor);
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._cursor && n("body").css("cursor", u._cursor);
        },
    });
    n.ui.plugin.add("draggable", "opacity", {
        start: function(t, i, r) {
            var u = n(i.helper),
                f = r.options;
            u.css("opacity") && (f._opacity = u.css("opacity"));
            u.css("opacity", f.opacity);
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._opacity && n(i.helper).css("opacity", u._opacity);
        },
    });
    n.ui.plugin.add("draggable", "scroll", {
        start: function(n, t, i) {
            i.scrollParentNotHidden ||
                (i.scrollParentNotHidden = i.helper.scrollParent(!1));
            i.scrollParentNotHidden[0] !== i.document[0] &&
                "HTML" !== i.scrollParentNotHidden[0].tagName &&
                (i.overflowOffset = i.scrollParentNotHidden.offset());
        },
        drag: function(t, i, r) {
            var u = r.options,
                o = !1,
                e = r.scrollParentNotHidden[0],
                f = r.document[0];
            e !== f && "HTML" !== e.tagName ?
                ((u.axis && "x" === u.axis) ||
                    (r.overflowOffset.top + e.offsetHeight - t.pageY <
                        u.scrollSensitivity ?
                        (e.scrollTop = o = e.scrollTop + u.scrollSpeed) :
                        t.pageY - r.overflowOffset.top < u.scrollSensitivity &&
                        (e.scrollTop = o = e.scrollTop - u.scrollSpeed)),
                    (u.axis && "y" === u.axis) ||
                    (r.overflowOffset.left + e.offsetWidth - t.pageX <
                        u.scrollSensitivity ?
                        (e.scrollLeft = o = e.scrollLeft + u.scrollSpeed) :
                        t.pageX - r.overflowOffset.left < u.scrollSensitivity &&
                        (e.scrollLeft = o = e.scrollLeft - u.scrollSpeed))) :
                ((u.axis && "x" === u.axis) ||
                    (t.pageY - n(f).scrollTop() < u.scrollSensitivity ?
                        (o = n(f).scrollTop(n(f).scrollTop() - u.scrollSpeed)) :
                        n(window).height() - (t.pageY - n(f).scrollTop()) <
                        u.scrollSensitivity &&
                        (o = n(f).scrollTop(n(f).scrollTop() + u.scrollSpeed))),
                    (u.axis && "y" === u.axis) ||
                    (t.pageX - n(f).scrollLeft() < u.scrollSensitivity ?
                        (o = n(f).scrollLeft(n(f).scrollLeft() - u.scrollSpeed)) :
                        n(window).width() - (t.pageX - n(f).scrollLeft()) <
                        u.scrollSensitivity &&
                        (o = n(f).scrollLeft(n(f).scrollLeft() + u.scrollSpeed))));
            o !== !1 &&
                n.ui.ddmanager &&
                !u.dropBehaviour &&
                n.ui.ddmanager.prepareOffsets(r, t);
        },
    });
    n.ui.plugin.add("draggable", "snap", {
        start: function(t, i, r) {
            var u = r.options;
            r.snapElements = [];
            n(
                u.snap.constructor !== String ?
                u.snap.items || ":data(ui-draggable)" :
                u.snap
            ).each(function() {
                var t = n(this),
                    i = t.offset();
                this !== r.element[0] &&
                    r.snapElements.push({
                        item: this,
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: i.top,
                        left: i.left,
                    });
            });
        },
        drag: function(t, i, r) {
            for (
                var e,
                    o,
                    s,
                    h,
                    c,
                    a,
                    l,
                    v,
                    w,
                    b = r.options,
                    f = b.snapTolerance,
                    y = i.offset.left,
                    k = y + r.helperProportions.width,
                    p = i.offset.top,
                    d = p + r.helperProportions.height,
                    u = r.snapElements.length - 1; u >= 0; u--
            )
                (c = r.snapElements[u].left - r.margins.left),
                (a = c + r.snapElements[u].width),
                (l = r.snapElements[u].top - r.margins.top),
                (v = l + r.snapElements[u].height),
                c - f > k ||
                y > a + f ||
                l - f > d ||
                p > v + f ||
                !n.contains(
                    r.snapElements[u].item.ownerDocument,
                    r.snapElements[u].item
                ) ?
                (r.snapElements[u].snapping &&
                    r.options.snap.release &&
                    r.options.snap.release.call(
                        r.element,
                        t,
                        n.extend(r._uiHash(), { snapItem: r.snapElements[u].item })
                    ),
                    (r.snapElements[u].snapping = !1)) :
                ("inner" !== b.snapMode &&
                    ((e = f >= Math.abs(l - d)),
                        (o = f >= Math.abs(v - p)),
                        (s = f >= Math.abs(c - k)),
                        (h = f >= Math.abs(a - y)),
                        e &&
                        (i.position.top = r._convertPositionTo("relative", {
                            top: l - r.helperProportions.height,
                            left: 0,
                        }).top),
                        o &&
                        (i.position.top = r._convertPositionTo("relative", {
                            top: v,
                            left: 0,
                        }).top),
                        s &&
                        (i.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: c - r.helperProportions.width,
                        }).left),
                        h &&
                        (i.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: a,
                        }).left)),
                    (w = e || o || s || h),
                    "outer" !== b.snapMode &&
                    ((e = f >= Math.abs(l - p)),
                        (o = f >= Math.abs(v - d)),
                        (s = f >= Math.abs(c - y)),
                        (h = f >= Math.abs(a - k)),
                        e &&
                        (i.position.top = r._convertPositionTo("relative", {
                            top: l,
                            left: 0,
                        }).top),
                        o &&
                        (i.position.top = r._convertPositionTo("relative", {
                            top: v - r.helperProportions.height,
                            left: 0,
                        }).top),
                        s &&
                        (i.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: c,
                        }).left),
                        h &&
                        (i.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: a - r.helperProportions.width,
                        }).left)), !r.snapElements[u].snapping &&
                    (e || o || s || h || w) &&
                    r.options.snap.snap &&
                    r.options.snap.snap.call(
                        r.element,
                        t,
                        n.extend(r._uiHash(), { snapItem: r.snapElements[u].item })
                    ),
                    (r.snapElements[u].snapping = e || o || s || h || w));
        },
    });
    n.ui.plugin.add("draggable", "stack", {
        start: function(t, i, r) {
            var f,
                e = r.options,
                u = n.makeArray(n(e.stack)).sort(function(t, i) {
                    return (
                        (parseInt(n(t).css("zIndex"), 10) || 0) -
                        (parseInt(n(i).css("zIndex"), 10) || 0)
                    );
                });
            u.length &&
                ((f = parseInt(n(u[0]).css("zIndex"), 10) || 0),
                    n(u).each(function(t) {
                        n(this).css("zIndex", f + t);
                    }),
                    this.css("zIndex", f + u.length));
        },
    });
    n.ui.plugin.add("draggable", "zIndex", {
        start: function(t, i, r) {
            var u = n(i.helper),
                f = r.options;
            u.css("zIndex") && (f._zIndex = u.css("zIndex"));
            u.css("zIndex", f.zIndex);
        },
        stop: function(t, i, r) {
            var u = r.options;
            u._zIndex && n(i.helper).css("zIndex", u._zIndex);
        },
    });
    n.ui.draggable;
    n.widget("ui.resizable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: { "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se" },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null,
        },
        _num: function(n) {
            return parseFloat(n) || 0;
        },
        _isNumber: function(n) {
            return !isNaN(parseFloat(n));
        },
        _hasScroll: function(t, i) {
            if ("hidden" === n(t).css("overflow")) return !1;
            var r = i && "left" === i ? "scrollLeft" : "scrollTop",
                u = !1;
            return t[r] > 0 ? !0 : ((t[r] = 1), (u = t[r] > 0), (t[r] = 0), u);
        },
        _create: function() {
            var r,
                t = this.options,
                i = this;
            this._addClass("ui-resizable");
            n.extend(this, {
                _aspectRatio: !!t.aspectRatio,
                aspectRatio: t.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: t.helper || t.ghost || t.animate ?
                    t.helper || "ui-resizable-helper" : null,
            });
            this.element[0].nodeName.match(
                    /^(canvas|textarea|input|select|button|img)$/i
                ) &&
                (this.element.wrap(
                        n("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                            position: this.element.css("position"),
                            width: this.element.outerWidth(),
                            height: this.element.outerHeight(),
                            top: this.element.css("top"),
                            left: this.element.css("left"),
                        })
                    ),
                    (this.element = this.element
                        .parent()
                        .data("ui-resizable", this.element.resizable("instance"))),
                    (this.elementIsWrapper = !0),
                    (r = {
                        marginTop: this.originalElement.css("marginTop"),
                        marginRight: this.originalElement.css("marginRight"),
                        marginBottom: this.originalElement.css("marginBottom"),
                        marginLeft: this.originalElement.css("marginLeft"),
                    }),
                    this.element.css(r),
                    this.originalElement.css("margin", 0),
                    (this.originalResizeStyle = this.originalElement.css("resize")),
                    this.originalElement.css("resize", "none"),
                    this._proportionallyResizeElements.push(
                        this.originalElement.css({
                            position: "static",
                            zoom: 1,
                            display: "block",
                        })
                    ),
                    this.originalElement.css(r),
                    this._proportionallyResize());
            this._setupHandles();
            t.autoHide &&
                n(this.element)
                .on("mouseenter", function() {
                    t.disabled ||
                        (i._removeClass("ui-resizable-autohide"), i._handles.show());
                })
                .on("mouseleave", function() {
                    t.disabled ||
                        i.resizing ||
                        (i._addClass("ui-resizable-autohide"), i._handles.hide());
                });
            this._mouseInit();
        },
        _destroy: function() {
            this._mouseDestroy();
            var t,
                i = function(t) {
                    n(t)
                        .removeData("resizable")
                        .removeData("ui-resizable")
                        .off(".resizable")
                        .find(".ui-resizable-handle")
                        .remove();
                };
            return (
                this.elementIsWrapper &&
                (i(this.element),
                    (t = this.element),
                    this.originalElement
                    .css({
                        position: t.css("position"),
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: t.css("top"),
                        left: t.css("left"),
                    })
                    .insertAfter(t),
                    t.remove()),
                this.originalElement.css("resize", this.originalResizeStyle),
                i(this.originalElement),
                this
            );
        },
        _setOption: function(n, t) {
            switch ((this._super(n, t), n)) {
                case "handles":
                    this._removeHandles();
                    this._setupHandles();
            }
        },
        _setupHandles: function() {
            var i,
                r,
                u,
                o,
                t,
                f = this.options,
                e = this;
            if (
                ((this.handles =
                        f.handles ||
                        (n(".ui-resizable-handle", this.element).length ? {
                                n: ".ui-resizable-n",
                                e: ".ui-resizable-e",
                                s: ".ui-resizable-s",
                                w: ".ui-resizable-w",
                                se: ".ui-resizable-se",
                                sw: ".ui-resizable-sw",
                                ne: ".ui-resizable-ne",
                                nw: ".ui-resizable-nw",
                            } :
                            "e,s,se")),
                    (this._handles = n()),
                    this.handles.constructor === String)
            )
                for (
                    "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                    u = this.handles.split(","),
                    this.handles = {},
                    r = 0; u.length > r; r++
                )
                    (i = n.trim(u[r])),
                    (o = "ui-resizable-" + i),
                    (t = n("<div>")),
                    this._addClass(t, "ui-resizable-handle " + o),
                    t.css({ zIndex: f.zIndex }),
                    (this.handles[i] = ".ui-resizable-" + i),
                    this.element.append(t);
            this._renderAxis = function(t) {
                var i, r, u, f;
                t = t || this.element;
                for (i in this.handles)
                    this.handles[i].constructor === String ?
                    (this.handles[i] = this.element
                        .children(this.handles[i])
                        .first()
                        .show()) :
                    (this.handles[i].jquery || this.handles[i].nodeType) &&
                    ((this.handles[i] = n(this.handles[i])),
                        this._on(this.handles[i], { mousedown: e._mouseDown })),
                    this.elementIsWrapper &&
                    this.originalElement[0].nodeName.match(
                        /^(textarea|input|select|button)$/i
                    ) &&
                    ((r = n(this.handles[i], this.element)),
                        (f = /sw|ne|nw|se|n|s/.test(i) ?
                            r.outerHeight() :
                            r.outerWidth()),
                        (u = [
                            "padding",
                            /ne|nw|n/.test(i) ?
                            "Top" :
                            /se|sw|s/.test(i) ?
                            "Bottom" :
                            /^e$/.test(i) ?
                            "Right" :
                            "Left",
                        ].join("")),
                        t.css(u, f),
                        this._proportionallyResize()),
                    (this._handles = this._handles.add(this.handles[i]));
            };
            this._renderAxis(this.element);
            this._handles = this._handles.add(
                this.element.find(".ui-resizable-handle")
            );
            this._handles.disableSelection();
            this._handles.on("mouseover", function() {
                e.resizing ||
                    (this.className &&
                        (t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                        (e.axis = t && t[1] ? t[1] : "se"));
            });
            f.autoHide &&
                (this._handles.hide(), this._addClass("ui-resizable-autohide"));
        },
        _removeHandles: function() {
            this._handles.remove();
        },
        _mouseCapture: function(t) {
            var r,
                i,
                u = !1;
            for (r in this.handles)
                (i = n(this.handles[r])[0]),
                (i === t.target || n.contains(i, t.target)) && (u = !0);
            return !this.options.disabled && u;
        },
        _mouseStart: function(t) {
            var u,
                f,
                e,
                r = this.options,
                i = this.element;
            return (
                (this.resizing = !0),
                this._renderProxy(),
                (u = this._num(this.helper.css("left"))),
                (f = this._num(this.helper.css("top"))),
                r.containment &&
                ((u += n(r.containment).scrollLeft() || 0),
                    (f += n(r.containment).scrollTop() || 0)),
                (this.offset = this.helper.offset()),
                (this.position = { left: u, top: f }),
                (this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: i.width(), height: i.height() }),
                (this.originalSize = this._helper ? { width: i.outerWidth(), height: i.outerHeight() } : { width: i.width(), height: i.height() }),
                (this.sizeDiff = {
                    width: i.outerWidth() - i.width(),
                    height: i.outerHeight() - i.height(),
                }),
                (this.originalPosition = { left: u, top: f }),
                (this.originalMousePosition = { left: t.pageX, top: t.pageY }),
                (this.aspectRatio =
                    "number" == typeof r.aspectRatio ?
                    r.aspectRatio :
                    this.originalSize.width / this.originalSize.height || 1),
                (e = n(".ui-resizable-" + this.axis).css("cursor")),
                n("body").css("cursor", "auto" === e ? this.axis + "-resize" : e),
                this._addClass("ui-resizable-resizing"),
                this._propagate("start", t), !0
            );
        },
        _mouseDrag: function(t) {
            var i,
                r,
                u = this.originalMousePosition,
                e = this.axis,
                o = t.pageX - u.left || 0,
                s = t.pageY - u.top || 0,
                f = this._change[e];
            return (
                this._updatePrevProperties(),
                f ?
                ((i = f.apply(this, [t, o, s])),
                    this._updateVirtualBoundaries(t.shiftKey),
                    (this._aspectRatio || t.shiftKey) &&
                    (i = this._updateRatio(i, t)),
                    (i = this._respectSize(i, t)),
                    this._updateCache(i),
                    this._propagate("resize", t),
                    (r = this._applyChanges()), !this._helper &&
                    this._proportionallyResizeElements.length &&
                    this._proportionallyResize(),
                    n.isEmptyObject(r) ||
                    (this._updatePrevProperties(),
                        this._trigger("resize", t, this.ui()),
                        this._applyChanges()), !1) :
                !1
            );
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var r,
                u,
                f,
                e,
                o,
                s,
                h,
                c = this.options,
                i = this;
            return (
                this._helper &&
                ((r = this._proportionallyResizeElements),
                    (u = r.length && /textarea/i.test(r[0].nodeName)),
                    (f = u && this._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height),
                    (e = u ? 0 : i.sizeDiff.width),
                    (o = {
                        width: i.helper.width() - e,
                        height: i.helper.height() - f,
                    }),
                    (s =
                        parseFloat(i.element.css("left")) +
                        (i.position.left - i.originalPosition.left) || null),
                    (h =
                        parseFloat(i.element.css("top")) +
                        (i.position.top - i.originalPosition.top) || null),
                    c.animate || this.element.css(n.extend(o, { top: h, left: s })),
                    i.helper.height(i.size.height),
                    i.helper.width(i.size.width),
                    this._helper && !c.animate && this._proportionallyResize()),
                n("body").css("cursor", "auto"),
                this._removeClass("ui-resizable-resizing"),
                this._propagate("stop", t),
                this._helper && this.helper.remove(), !1
            );
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left,
            };
            this.prevSize = { width: this.size.width, height: this.size.height };
        },
        _applyChanges: function() {
            var n = {};
            return (
                this.position.top !== this.prevPosition.top &&
                (n.top = this.position.top + "px"),
                this.position.left !== this.prevPosition.left &&
                (n.left = this.position.left + "px"),
                this.size.width !== this.prevSize.width &&
                (n.width = this.size.width + "px"),
                this.size.height !== this.prevSize.height &&
                (n.height = this.size.height + "px"),
                this.helper.css(n),
                n
            );
        },
        _updateVirtualBoundaries: function(n) {
            var r,
                u,
                f,
                e,
                t,
                i = this.options;
            t = {
                minWidth: this._isNumber(i.minWidth) ? i.minWidth : 0,
                maxWidth: this._isNumber(i.maxWidth) ? i.maxWidth : 1 / 0,
                minHeight: this._isNumber(i.minHeight) ? i.minHeight : 0,
                maxHeight: this._isNumber(i.maxHeight) ? i.maxHeight : 1 / 0,
            };
            (this._aspectRatio || n) &&
            ((r = t.minHeight * this.aspectRatio),
                (f = t.minWidth / this.aspectRatio),
                (u = t.maxHeight * this.aspectRatio),
                (e = t.maxWidth / this.aspectRatio),
                r > t.minWidth && (t.minWidth = r),
                f > t.minHeight && (t.minHeight = f),
                t.maxWidth > u && (t.maxWidth = u),
                t.maxHeight > e && (t.maxHeight = e));
            this._vBoundaries = t;
        },
        _updateCache: function(n) {
            this.offset = this.helper.offset();
            this._isNumber(n.left) && (this.position.left = n.left);
            this._isNumber(n.top) && (this.position.top = n.top);
            this._isNumber(n.height) && (this.size.height = n.height);
            this._isNumber(n.width) && (this.size.width = n.width);
        },
        _updateRatio: function(n) {
            var t = this.position,
                i = this.size,
                r = this.axis;
            return (
                this._isNumber(n.height) ?
                (n.width = n.height * this.aspectRatio) :
                this._isNumber(n.width) &&
                (n.height = n.width / this.aspectRatio),
                "sw" === r &&
                ((n.left = t.left + (i.width - n.width)), (n.top = null)),
                "nw" === r &&
                ((n.top = t.top + (i.height - n.height)),
                    (n.left = t.left + (i.width - n.width))),
                n
            );
        },
        _respectSize: function(n) {
            var t = this._vBoundaries,
                i = this.axis,
                r = this._isNumber(n.width) && t.maxWidth && t.maxWidth < n.width,
                u = this._isNumber(n.height) && t.maxHeight && t.maxHeight < n.height,
                f = this._isNumber(n.width) && t.minWidth && t.minWidth > n.width,
                e = this._isNumber(n.height) && t.minHeight && t.minHeight > n.height,
                o = this.originalPosition.left + this.originalSize.width,
                s = this.originalPosition.top + this.originalSize.height,
                h = /sw|nw|w/.test(i),
                c = /nw|ne|n/.test(i);
            return (
                f && (n.width = t.minWidth),
                e && (n.height = t.minHeight),
                r && (n.width = t.maxWidth),
                u && (n.height = t.maxHeight),
                f && h && (n.left = o - t.minWidth),
                r && h && (n.left = o - t.maxWidth),
                e && c && (n.top = s - t.minHeight),
                u && c && (n.top = s - t.maxHeight),
                n.width || n.height || n.left || !n.top ?
                n.width || n.height || n.top || !n.left || (n.left = null) :
                (n.top = null),
                n
            );
        },
        _getPaddingPlusBorderDimensions: function(n) {
            for (
                var t = 0,
                    i = [],
                    r = [
                        n.css("borderTopWidth"),
                        n.css("borderRightWidth"),
                        n.css("borderBottomWidth"),
                        n.css("borderLeftWidth"),
                    ],
                    u = [
                        n.css("paddingTop"),
                        n.css("paddingRight"),
                        n.css("paddingBottom"),
                        n.css("paddingLeft"),
                    ]; 4 > t; t++
            )
                (i[t] = parseFloat(r[t]) || 0), (i[t] += parseFloat(u[t]) || 0);
            return { height: i[0] + i[2], width: i[1] + i[3] };
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (
                    var n, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++
                )
                    (n = this._proportionallyResizeElements[t]),
                    this.outerDimensions ||
                    (this.outerDimensions = this._getPaddingPlusBorderDimensions(
                        n
                    )),
                    n.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0,
                    });
        },
        _renderProxy: function() {
            var t = this.element,
                i = this.options;
            this.elementOffset = t.offset();
            this._helper ?
                ((this.helper =
                        this.helper || n("<div style='overflow:hidden;'></div>")),
                    this._addClass(this.helper, this._helper),
                    this.helper.css({
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        position: "absolute",
                        left: this.elementOffset.left + "px",
                        top: this.elementOffset.top + "px",
                        zIndex: ++i.zIndex,
                    }),
                    this.helper.appendTo("body").disableSelection()) :
                (this.helper = this.element);
        },
        _change: {
            e: function(n, t) {
                return { width: this.originalSize.width + t };
            },
            w: function(n, t) {
                var i = this.originalSize,
                    r = this.originalPosition;
                return { left: r.left + t, width: i.width - t };
            },
            n: function(n, t, i) {
                var r = this.originalSize,
                    u = this.originalPosition;
                return { top: u.top + i, height: r.height - i };
            },
            s: function(n, t, i) {
                return { height: this.originalSize.height + i };
            },
            se: function(t, i, r) {
                return n.extend(
                    this._change.s.apply(this, arguments),
                    this._change.e.apply(this, [t, i, r])
                );
            },
            sw: function(t, i, r) {
                return n.extend(
                    this._change.s.apply(this, arguments),
                    this._change.w.apply(this, [t, i, r])
                );
            },
            ne: function(t, i, r) {
                return n.extend(
                    this._change.n.apply(this, arguments),
                    this._change.e.apply(this, [t, i, r])
                );
            },
            nw: function(t, i, r) {
                return n.extend(
                    this._change.n.apply(this, arguments),
                    this._change.w.apply(this, [t, i, r])
                );
            },
        },
        _propagate: function(t, i) {
            n.ui.plugin.call(this, t, [i, this.ui()]);
            "resize" !== t && this._trigger(t, i, this.ui());
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition,
            };
        },
    });
    n.ui.plugin.add("resizable", "animate", {
        stop: function(t) {
            var i = n(this).resizable("instance"),
                u = i.options,
                r = i._proportionallyResizeElements,
                f = r.length && /textarea/i.test(r[0].nodeName),
                s = f && i._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
                h = f ? 0 : i.sizeDiff.width,
                c = { width: i.size.width - h, height: i.size.height - s },
                e =
                parseFloat(i.element.css("left")) +
                (i.position.left - i.originalPosition.left) || null,
                o =
                parseFloat(i.element.css("top")) +
                (i.position.top - i.originalPosition.top) || null;
            i.element.animate(n.extend(c, o && e ? { top: o, left: e } : {}), {
                duration: u.animateDuration,
                easing: u.animateEasing,
                step: function() {
                    var u = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left")),
                    };
                    r && r.length && n(r[0]).css({ width: u.width, height: u.height });
                    i._updateCache(u);
                    i._propagate("resize", t);
                },
            });
        },
    });
    n.ui.plugin.add("resizable", "containment", {
        start: function() {
            var r,
                f,
                e,
                o,
                s,
                h,
                c,
                t = n(this).resizable("instance"),
                l = t.options,
                a = t.element,
                u = l.containment,
                i =
                u instanceof n ?
                u.get(0) :
                /parent/.test(u) ?
                a.parent().get(0) :
                u;
            i &&
                ((t.containerElement = n(i)),
                    /document/.test(u) || u === document ?
                    ((t.containerOffset = { left: 0, top: 0 }),
                        (t.containerPosition = { left: 0, top: 0 }),
                        (t.parentData = {
                            element: n(document),
                            left: 0,
                            top: 0,
                            width: n(document).width(),
                            height: n(document).height() || document.body.parentNode.scrollHeight,
                        })) :
                    ((r = n(i)),
                        (f = []),
                        n(["Top", "Right", "Left", "Bottom"]).each(function(n, i) {
                            f[n] = t._num(r.css("padding" + i));
                        }),
                        (t.containerOffset = r.offset()),
                        (t.containerPosition = r.position()),
                        (t.containerSize = {
                            height: r.innerHeight() - f[3],
                            width: r.innerWidth() - f[1],
                        }),
                        (e = t.containerOffset),
                        (o = t.containerSize.height),
                        (s = t.containerSize.width),
                        (h = t._hasScroll(i, "left") ? i.scrollWidth : s),
                        (c = t._hasScroll(i) ? i.scrollHeight : o),
                        (t.parentData = {
                            element: i,
                            left: e.left,
                            top: e.top,
                            width: h,
                            height: c,
                        })));
        },
        resize: function(t) {
            var o,
                s,
                h,
                c,
                i = n(this).resizable("instance"),
                v = i.options,
                r = i.containerOffset,
                l = i.position,
                f = i._aspectRatio || t.shiftKey,
                e = { top: 0, left: 0 },
                a = i.containerElement,
                u = !0;
            a[0] !== document && /static/.test(a.css("position")) && (e = r);
            l.left < (i._helper ? r.left : 0) &&
                ((i.size.width =
                        i.size.width +
                        (i._helper ? i.position.left - r.left : i.position.left - e.left)),
                    f && ((i.size.height = i.size.width / i.aspectRatio), (u = !1)),
                    (i.position.left = v.helper ? r.left : 0));
            l.top < (i._helper ? r.top : 0) &&
                ((i.size.height =
                        i.size.height +
                        (i._helper ? i.position.top - r.top : i.position.top)),
                    f && ((i.size.width = i.size.height * i.aspectRatio), (u = !1)),
                    (i.position.top = i._helper ? r.top : 0));
            h = i.containerElement.get(0) === i.element.parent().get(0);
            c = /relative|absolute/.test(i.containerElement.css("position"));
            h && c ?
                ((i.offset.left = i.parentData.left + i.position.left),
                    (i.offset.top = i.parentData.top + i.position.top)) :
                ((i.offset.left = i.element.offset().left),
                    (i.offset.top = i.element.offset().top));
            o = Math.abs(
                i.sizeDiff.width +
                (i._helper ? i.offset.left - e.left : i.offset.left - r.left)
            );
            s = Math.abs(
                i.sizeDiff.height +
                (i._helper ? i.offset.top - e.top : i.offset.top - r.top)
            );
            o + i.size.width >= i.parentData.width &&
                ((i.size.width = i.parentData.width - o),
                    f && ((i.size.height = i.size.width / i.aspectRatio), (u = !1)));
            s + i.size.height >= i.parentData.height &&
                ((i.size.height = i.parentData.height - s),
                    f && ((i.size.width = i.size.height * i.aspectRatio), (u = !1)));
            u ||
                ((i.position.left = i.prevPosition.left),
                    (i.position.top = i.prevPosition.top),
                    (i.size.width = i.prevSize.width),
                    (i.size.height = i.prevSize.height));
        },
        stop: function() {
            var t = n(this).resizable("instance"),
                r = t.options,
                u = t.containerOffset,
                f = t.containerPosition,
                e = t.containerElement,
                i = n(t.helper),
                o = i.offset(),
                s = i.outerWidth() - t.sizeDiff.width,
                h = i.outerHeight() - t.sizeDiff.height;
            t._helper &&
                !r.animate &&
                /relative/.test(e.css("position")) &&
                n(this).css({ left: o.left - f.left - u.left, width: s, height: h });
            t._helper &&
                !r.animate &&
                /static/.test(e.css("position")) &&
                n(this).css({ left: o.left - f.left - u.left, width: s, height: h });
        },
    });
    n.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = n(this).resizable("instance"),
                i = t.options;
            n(i.alsoResize).each(function() {
                var t = n(this);
                t.data("ui-resizable-alsoresize", {
                    width: parseFloat(t.width()),
                    height: parseFloat(t.height()),
                    left: parseFloat(t.css("left")),
                    top: parseFloat(t.css("top")),
                });
            });
        },
        resize: function(t, i) {
            var r = n(this).resizable("instance"),
                e = r.options,
                u = r.originalSize,
                f = r.originalPosition,
                o = {
                    height: r.size.height - u.height || 0,
                    width: r.size.width - u.width || 0,
                    top: r.position.top - f.top || 0,
                    left: r.position.left - f.left || 0,
                };
            n(e.alsoResize).each(function() {
                var t = n(this),
                    u = n(this).data("ui-resizable-alsoresize"),
                    r = {},
                    f = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                n.each(f, function(n, t) {
                    var i = (u[t] || 0) + (o[t] || 0);
                    i && i >= 0 && (r[t] = i || null);
                });
                t.css(r);
            });
        },
        stop: function() {
            n(this).removeData("ui-resizable-alsoresize");
        },
    });
    n.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = n(this).resizable("instance"),
                i = t.size;
            t.ghost = t.originalElement.clone();
            t.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0,
            });
            t._addClass(t.ghost, "ui-resizable-ghost");
            n.uiBackCompat !== !1 &&
                "string" == typeof t.options.ghost &&
                t.ghost.addClass(this.options.ghost);
            t.ghost.appendTo(t.helper);
        },
        resize: function() {
            var t = n(this).resizable("instance");
            t.ghost &&
                t.ghost.css({
                    position: "relative",
                    height: t.size.height,
                    width: t.size.width,
                });
        },
        stop: function() {
            var t = n(this).resizable("instance");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
        },
    });
    n.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var h,
                t = n(this).resizable("instance"),
                i = t.options,
                y = t.size,
                o = t.originalSize,
                s = t.originalPosition,
                c = t.axis,
                l = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
                f = l[0] || 1,
                e = l[1] || 1,
                a = Math.round((y.width - o.width) / f) * f,
                v = Math.round((y.height - o.height) / e) * e,
                r = o.width + a,
                u = o.height + v,
                p = i.maxWidth && r > i.maxWidth,
                w = i.maxHeight && u > i.maxHeight,
                b = i.minWidth && i.minWidth > r,
                k = i.minHeight && i.minHeight > u;
            i.grid = l;
            b && (r += f);
            k && (u += e);
            p && (r -= f);
            w && (u -= e);
            /^(se|s|e)$/.test(c) ?
                ((t.size.width = r), (t.size.height = u)) :
                /^(ne)$/.test(c) ?
                ((t.size.width = r),
                    (t.size.height = u),
                    (t.position.top = s.top - v)) :
                /^(sw)$/.test(c) ?
                ((t.size.width = r),
                    (t.size.height = u),
                    (t.position.left = s.left - a)) :
                ((0 >= u - e || 0 >= r - f) &&
                    (h = t._getPaddingPlusBorderDimensions(this)),
                    u - e > 0 ?
                    ((t.size.height = u), (t.position.top = s.top - v)) :
                    ((u = e - h.height),
                        (t.size.height = u),
                        (t.position.top = s.top + o.height - u)),
                    r - f > 0 ?
                    ((t.size.width = r), (t.position.left = s.left - a)) :
                    ((r = f - h.width),
                        (t.size.width = r),
                        (t.position.left = s.left + o.width - r)));
        },
    });
    n.ui.resizable;
    n.widget("ui.dialog", {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            classes: {
                "ui-dialog": "ui-corner-all",
                "ui-dialog-titlebar": "ui-corner-all",
            },
            closeOnEscape: !0,
            closeText: "Close",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var i = n(this).css(t).offset().top;
                    0 > i && n(this).css("top", t.top - i);
                },
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null,
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0,
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height,
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element),
            };
            this.originalTitle = this.element.attr("title");
            null == this.options.title &&
                null != this.originalTitle &&
                (this.options.title = this.originalTitle);
            this.options.disabled && (this.options.disabled = !1);
            this._createWrapper();
            this.element.show().removeAttr("title").appendTo(this.uiDialog);
            this._addClass("ui-dialog-content", "ui-widget-content");
            this._createTitlebar();
            this._createButtonPane();
            this.options.draggable && n.fn.draggable && this._makeDraggable();
            this.options.resizable && n.fn.resizable && this._makeResizable();
            this._isOpen = !1;
            this._trackFocus();
        },
        _init: function() {
            this.options.autoOpen && this.open();
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ?
                n(t) :
                this.document.find(t || "body").eq(0);
        },
        _destroy: function() {
            var n,
                t = this.originalPosition;
            this._untrackInstance();
            this._destroyOverlay();
            this.element.removeUniqueId().css(this.originalCss).detach();
            this.uiDialog.remove();
            this.originalTitle && this.element.attr("title", this.originalTitle);
            n = t.parent.children().eq(t.index);
            n.length && n[0] !== this.element[0] ?
                n.before(this.element) :
                t.parent.append(this.element);
        },
        widget: function() {
            return this.uiDialog;
        },
        disable: n.noop,
        enable: n.noop,
        close: function(t) {
            var i = this;
            this._isOpen &&
                this._trigger("beforeClose", t) !== !1 &&
                ((this._isOpen = !1),
                    (this._focusedElement = null),
                    this._destroyOverlay(),
                    this._untrackInstance(),
                    this.opener.filter(":focusable").trigger("focus").length ||
                    n.ui.safeBlur(n.ui.safeActiveElement(this.document[0])),
                    this._hide(this.uiDialog, this.options.hide, function() {
                        i._trigger("close", t);
                    }));
        },
        isOpen: function() {
            return this._isOpen;
        },
        moveToTop: function() {
            this._moveToTop();
        },
        _moveToTop: function(t, i) {
            var r = !1,
                f = this.uiDialog
                .siblings(".ui-front:visible")
                .map(function() {
                    return +n(this).css("z-index");
                })
                .get(),
                u = Math.max.apply(null, f);
            return (
                u >= +this.uiDialog.css("z-index") &&
                (this.uiDialog.css("z-index", u + 1), (r = !0)),
                r && !i && this._trigger("focus", t),
                r
            );
        },
        open: function() {
            var t = this;
            return this._isOpen ?
                (this._moveToTop() && this._focusTabbable(), void 0) :
                ((this._isOpen = !0),
                    (this.opener = n(n.ui.safeActiveElement(this.document[0]))),
                    this._size(),
                    this._position(),
                    this._createOverlay(),
                    this._moveToTop(null, !0),
                    this.overlay &&
                    this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
                    this._show(this.uiDialog, this.options.show, function() {
                        t._focusTabbable();
                        t._trigger("focus");
                    }),
                    this._makeFocusTarget(),
                    this._trigger("open"),
                    void 0);
        },
        _focusTabbable: function() {
            var n = this._focusedElement;
            n || (n = this.element.find("[autofocus]"));
            n.length || (n = this.element.find(":tabbable"));
            n.length || (n = this.uiDialogButtonPane.find(":tabbable"));
            n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable"));
            n.length || (n = this.uiDialog);
            n.eq(0).trigger("focus");
        },
        _keepFocus: function(t) {
            function i() {
                var t = n.ui.safeActiveElement(this.document[0]),
                    i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
                i || this._focusTabbable();
            }
            t.preventDefault();
            i.call(this);
            this._delay(i);
        },
        _createWrapper: function() {
            this.uiDialog = n("<div>")
                .hide()
                .attr({ tabIndex: -1, role: "dialog" })
                .appendTo(this._appendTo());
            this._addClass(
                this.uiDialog,
                "ui-dialog",
                "ui-widget ui-widget-content ui-front"
            );
            this._on(this.uiDialog, {
                keydown: function(t) {
                    if (
                        this.options.closeOnEscape &&
                        !t.isDefaultPrevented() &&
                        t.keyCode &&
                        t.keyCode === n.ui.keyCode.ESCAPE
                    )
                        return t.preventDefault(), this.close(t), void 0;
                    if (t.keyCode === n.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable"),
                            r = i.filter(":first"),
                            u = i.filter(":last");
                        (t.target !== u[0] && t.target !== this.uiDialog[0]) || t.shiftKey ?
                            (t.target !== r[0] && t.target !== this.uiDialog[0]) ||
                            !t.shiftKey ||
                            (this._delay(function() {
                                    u.trigger("focus");
                                }),
                                t.preventDefault()) :
                            (this._delay(function() {
                                    r.trigger("focus");
                                }),
                                t.preventDefault());
                    }
                },
                mousedown: function(n) {
                    this._moveToTop(n) && this._focusTabbable();
                },
            });
            this.element.find("[aria-describedby]").length ||
                this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id"),
                });
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = n("<div>");
            this._addClass(
                this.uiDialogTitlebar,
                "ui-dialog-titlebar",
                "ui-widget-header ui-helper-clearfix"
            );
            this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    n(t.target).closest(".ui-dialog-titlebar-close") ||
                        this.uiDialog.trigger("focus");
                },
            });
            this.uiDialogTitlebarClose = n("<button type='button'></button>")
                .button({
                    label: n("<a>").text(this.options.closeText).html(),
                    icon: "ui-icon-closethick",
                    showLabel: !1,
                })
                .appendTo(this.uiDialogTitlebar);
            this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close");
            this._on(this.uiDialogTitlebarClose, {
                click: function(n) {
                    n.preventDefault();
                    this.close(n);
                },
            });
            t = n("<span>").uniqueId().prependTo(this.uiDialogTitlebar);
            this._addClass(t, "ui-dialog-title");
            this._title(t);
            this.uiDialogTitlebar.prependTo(this.uiDialog);
            this.uiDialog.attr({ "aria-labelledby": t.attr("id") });
        },
        _title: function(n) {
            this.options.title ? n.text(this.options.title) : n.html("&#160;");
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = n("<div>");
            this._addClass(
                this.uiDialogButtonPane,
                "ui-dialog-buttonpane",
                "ui-widget-content ui-helper-clearfix"
            );
            this.uiButtonSet = n("<div>").appendTo(this.uiDialogButtonPane);
            this._addClass(this.uiButtonSet, "ui-dialog-buttonset");
            this._createButtons();
        },
        _createButtons: function() {
            var i = this,
                t = this.options.buttons;
            return (
                this.uiDialogButtonPane.remove(),
                this.uiButtonSet.empty(),
                n.isEmptyObject(t) || (n.isArray(t) && !t.length) ?
                (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0) :
                (n.each(t, function(t, r) {
                        var u, f;
                        r = n.isFunction(r) ? { click: r, text: t } : r;
                        r = n.extend({ type: "button" }, r);
                        u = r.click;
                        f = {
                            icon: r.icon,
                            iconPosition: r.iconPosition,
                            showLabel: r.showLabel,
                            icons: r.icons,
                            text: r.text,
                        };
                        delete r.click;
                        delete r.icon;
                        delete r.iconPosition;
                        delete r.showLabel;
                        delete r.icons;
                        "boolean" == typeof r.text && delete r.text;
                        n("<button></button>", r)
                            .button(f)
                            .appendTo(i.uiButtonSet)
                            .on("click", function() {
                                u.apply(i.element[0], arguments);
                            });
                    }),
                    this._addClass(this.uiDialog, "ui-dialog-buttons"),
                    this.uiDialogButtonPane.appendTo(this.uiDialog),
                    void 0)
            );
        },
        _makeDraggable: function() {
            function i(n) {
                return { position: n.position, offset: n.offset };
            }
            var t = this,
                r = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(r, u) {
                    t._addClass(n(this), "ui-dialog-dragging");
                    t._blockFrames();
                    t._trigger("dragStart", r, i(u));
                },
                drag: function(n, r) {
                    t._trigger("drag", n, i(r));
                },
                stop: function(u, f) {
                    var e = f.offset.left - t.document.scrollLeft(),
                        o = f.offset.top - t.document.scrollTop();
                    r.position = {
                        my: "left top",
                        at: "left" +
                            (e >= 0 ? "+" : "") +
                            e +
                            " top" +
                            (o >= 0 ? "+" : "") +
                            o,
                        of: t.window,
                    };
                    t._removeClass(n(this), "ui-dialog-dragging");
                    t._unblockFrames();
                    t._trigger("dragStop", u, i(f));
                },
            });
        },
        _makeResizable: function() {
            function r(n) {
                return {
                    originalPosition: n.originalPosition,
                    originalSize: n.originalSize,
                    position: n.position,
                    size: n.size,
                };
            }
            var t = this,
                i = this.options,
                u = i.resizable,
                f = this.uiDialog.css("position"),
                e = "string" == typeof u ? u : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog
                .resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: i.maxWidth,
                    maxHeight: i.maxHeight,
                    minWidth: i.minWidth,
                    minHeight: this._minHeight(),
                    handles: e,
                    start: function(i, u) {
                        t._addClass(n(this), "ui-dialog-resizing");
                        t._blockFrames();
                        t._trigger("resizeStart", i, r(u));
                    },
                    resize: function(n, i) {
                        t._trigger("resize", n, r(i));
                    },
                    stop: function(u, f) {
                        var e = t.uiDialog.offset(),
                            o = e.left - t.document.scrollLeft(),
                            s = e.top - t.document.scrollTop();
                        i.height = t.uiDialog.height();
                        i.width = t.uiDialog.width();
                        i.position = {
                            my: "left top",
                            at: "left" +
                                (o >= 0 ? "+" : "") +
                                o +
                                " top" +
                                (s >= 0 ? "+" : "") +
                                s,
                            of: t.window,
                        };
                        t._removeClass(n(this), "ui-dialog-resizing");
                        t._unblockFrames();
                        t._trigger("resizeStop", u, r(f));
                    },
                })
                .css("position", f);
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._makeFocusTarget();
                    this._focusedElement = n(t.target);
                },
            });
        },
        _makeFocusTarget: function() {
            this._untrackInstance();
            this._trackingInstances().unshift(this);
        },
        _untrackInstance: function() {
            var t = this._trackingInstances(),
                i = n.inArray(this, t); -
            1 !== i && t.splice(i, 1);
        },
        _trackingInstances: function() {
            var n = this.document.data("ui-dialog-instances");
            return n || ((n = []), this.document.data("ui-dialog-instances", n)), n;
        },
        _minHeight: function() {
            var n = this.options;
            return "auto" === n.height ?
                n.minHeight :
                Math.min(n.minHeight, n.height);
        },
        _position: function() {
            var n = this.uiDialog.is(":visible");
            n || this.uiDialog.show();
            this.uiDialog.position(this.options.position);
            n || this.uiDialog.hide();
        },
        _setOptions: function(t) {
            var i = this,
                r = !1,
                u = {};
            n.each(t, function(n, t) {
                i._setOption(n, t);
                n in i.sizeRelatedOptions && (r = !0);
                n in i.resizableRelatedOptions && (u[n] = t);
            });
            r && (this._size(), this._position());
            this.uiDialog.is(":data(ui-resizable)") &&
                this.uiDialog.resizable("option", u);
        },
        _setOption: function(t, i) {
            var f,
                u,
                r = this.uiDialog;
            "disabled" !== t &&
                (this._super(t, i),
                    "appendTo" === t && this.uiDialog.appendTo(this._appendTo()),
                    "buttons" === t && this._createButtons(),
                    "closeText" === t &&
                    this.uiDialogTitlebarClose.button({
                        label: n("<a>")
                            .text("" + this.options.closeText)
                            .html(),
                    }),
                    "draggable" === t &&
                    ((f = r.is(":data(ui-draggable)")),
                        f && !i && r.draggable("destroy"), !f && i && this._makeDraggable()),
                    "position" === t && this._position(),
                    "resizable" === t &&
                    ((u = r.is(":data(ui-resizable)")),
                        u && !i && r.resizable("destroy"),
                        u && "string" == typeof i && r.resizable("option", "handles", i),
                        u || i === !1 || this._makeResizable()),
                    "title" === t &&
                    this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
        },
        _size: function() {
            var t,
                i,
                r,
                n = this.options;
            this.element
                .show()
                .css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 });
            n.minWidth > n.width && (n.width = n.minWidth);
            t = this.uiDialog.css({ height: "auto", width: n.width }).outerHeight();
            i = Math.max(0, n.minHeight - t);
            r =
                "number" == typeof n.maxHeight ?
                Math.max(0, n.maxHeight - t) :
                "none";
            "auto" === n.height ?
                this.element.css({ minHeight: i, maxHeight: r, height: "auto" }) :
                this.element.height(Math.max(0, n.height - t));
            this.uiDialog.is(":data(ui-resizable)") &&
                this.uiDialog.resizable("option", "minHeight", this._minHeight());
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = n(this);
                return n("<div>")
                    .css({
                        position: "absolute",
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                    })
                    .appendTo(t.parent())
                    .offset(t.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks &&
                (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _allowInteraction: function(t) {
            return n(t.target).closest(".ui-dialog").length ?
                !0 :
                !!n(t.target).closest(".ui-datepicker").length;
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var t = !0;
                this._delay(function() {
                    t = !1;
                });
                this.document.data("ui-dialog-overlays") ||
                    this._on(this.document, {
                        focusin: function(n) {
                            t ||
                                this._allowInteraction(n) ||
                                (n.preventDefault(),
                                    this._trackingInstances()[0]._focusTabbable());
                        },
                    });
                this.overlay = n("<div>").appendTo(this._appendTo());
                this._addClass(this.overlay, null, "ui-widget-overlay ui-front");
                this._on(this.overlay, { mousedown: "_keepFocus" });
                this.document.data(
                    "ui-dialog-overlays",
                    (this.document.data("ui-dialog-overlays") || 0) + 1
                );
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var n = this.document.data("ui-dialog-overlays") - 1;
                n
                    ?
                    this.document.data("ui-dialog-overlays", n) :
                    (this._off(this.document, "focusin"),
                        this.document.removeData("ui-dialog-overlays"));
                this.overlay.remove();
                this.overlay = null;
            }
        },
    });
    n.uiBackCompat !== !1 &&
        n.widget("ui.dialog", n.ui.dialog, {
            options: { dialogClass: "" },
            _createWrapper: function() {
                this._super();
                this.uiDialog.addClass(this.options.dialogClass);
            },
            _setOption: function(n, t) {
                "dialogClass" === n &&
                    this.uiDialog.removeClass(this.options.dialogClass).addClass(t);
                this._superApply(arguments);
            },
        });
    n.ui.dialog;
    n.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null,
        },
        _create: function() {
            var t,
                i = this.options,
                r = i.accept;
            this.isover = !1;
            this.isout = !0;
            this.accept = n.isFunction(r) ?
                r :
                function(n) {
                    return n.is(r);
                };
            this.proportions = function() {
                return arguments.length ?
                    ((t = arguments[0]), void 0) :
                    t ?
                    t :
                    (t = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight,
                    });
            };
            this._addToManager(i.scope);
            i.addClasses && this._addClass("ui-droppable");
        },
        _addToManager: function(t) {
            n.ui.ddmanager.droppables[t] = n.ui.ddmanager.droppables[t] || [];
            n.ui.ddmanager.droppables[t].push(this);
        },
        _splice: function(n) {
            for (var t = 0; n.length > t; t++) n[t] === this && n.splice(t, 1);
        },
        _destroy: function() {
            var t = n.ui.ddmanager.droppables[this.options.scope];
            this._splice(t);
        },
        _setOption: function(t, i) {
            if ("accept" === t)
                this.accept = n.isFunction(i) ?
                i :
                function(n) {
                    return n.is(i);
                };
            else if ("scope" === t) {
                var r = n.ui.ddmanager.droppables[this.options.scope];
                this._splice(r);
                this._addToManager(i);
            }
            this._super(t, i);
        },
        _activate: function(t) {
            var i = n.ui.ddmanager.current;
            this._addActiveClass();
            i && this._trigger("activate", t, this.ui(i));
        },
        _deactivate: function(t) {
            var i = n.ui.ddmanager.current;
            this._removeActiveClass();
            i && this._trigger("deactivate", t, this.ui(i));
        },
        _over: function(t) {
            var i = n.ui.ddmanager.current;
            i &&
                (i.currentItem || i.element)[0] !== this.element[0] &&
                this.accept.call(this.element[0], i.currentItem || i.element) &&
                (this._addHoverClass(), this._trigger("over", t, this.ui(i)));
        },
        _out: function(t) {
            var i = n.ui.ddmanager.current;
            i &&
                (i.currentItem || i.element)[0] !== this.element[0] &&
                this.accept.call(this.element[0], i.currentItem || i.element) &&
                (this._removeHoverClass(), this._trigger("out", t, this.ui(i)));
        },
        _drop: function(t, i) {
            var r = i || n.ui.ddmanager.current,
                u = !1;
            return r && (r.currentItem || r.element)[0] !== this.element[0] ?
                (this.element
                    .find(":data(ui-droppable)")
                    .not(".ui-draggable-dragging")
                    .each(function() {
                        var i = n(this).droppable("instance");
                        if (
                            i.options.greedy &&
                            !i.options.disabled &&
                            i.options.scope === r.options.scope &&
                            i.accept.call(i.element[0], r.currentItem || r.element) &&
                            e(
                                r,
                                n.extend(i, { offset: i.element.offset() }),
                                i.options.tolerance,
                                t
                            )
                        )
                            return (u = !0), !1;
                    }),
                    u ?
                    !1 :
                    this.accept.call(this.element[0], r.currentItem || r.element) ?
                    (this._removeActiveClass(),
                        this._removeHoverClass(),
                        this._trigger("drop", t, this.ui(r)),
                        this.element) :
                    !1) :
                !1;
        },
        ui: function(n) {
            return {
                draggable: n.currentItem || n.element,
                helper: n.helper,
                position: n.position,
                offset: n.positionAbs,
            };
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover");
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover");
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active");
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active");
        },
    });
    e = n.ui.intersect = (function() {
        function n(n, t, i) {
            return n >= t && t + i > n;
        }
        return function(t, i, r, u) {
            if (!i.offset) return !1;
            var o = (t.positionAbs || t.position.absolute).left + t.margins.left,
                s = (t.positionAbs || t.position.absolute).top + t.margins.top,
                h = o + t.helperProportions.width,
                c = s + t.helperProportions.height,
                f = i.offset.left,
                e = i.offset.top,
                l = f + i.proportions().width,
                a = e + i.proportions().height;
            switch (r) {
                case "fit":
                    return o >= f && l >= h && s >= e && a >= c;
                case "intersect":
                    return (
                        o + t.helperProportions.width / 2 > f &&
                        l > h - t.helperProportions.width / 2 &&
                        s + t.helperProportions.height / 2 > e &&
                        a > c - t.helperProportions.height / 2
                    );
                case "pointer":
                    return (
                        n(u.pageY, e, i.proportions().height) &&
                        n(u.pageX, f, i.proportions().width)
                    );
                case "touch":
                    return (
                        ((s >= e && a >= s) || (c >= e && a >= c) || (e > s && c > a)) &&
                        ((o >= f && l >= o) || (h >= f && l >= h) || (f > o && h > l))
                    );
                default:
                    return !1;
            }
        };
    })();
    n.ui.ddmanager = {
        current: null,
        droppables: { default: [] },
        prepareOffsets: function(t, i) {
            var r,
                f,
                u = n.ui.ddmanager.droppables[t.options.scope] || [],
                o = i ? i.type : null,
                e = (t.currentItem || t.element)
                .find(":data(ui-droppable)")
                .addBack();
            n: for (r = 0; u.length > r; r++)
                if (!(
                        u[r].options.disabled ||
                        (t &&
                            !u[r].accept.call(u[r].element[0], t.currentItem || t.element))
                    )) {
                    for (f = 0; e.length > f; f++)
                        if (e[f] === u[r].element[0]) {
                            u[r].proportions().height = 0;
                            continue n;
                        }
                    u[r].visible = "none" !== u[r].element.css("display");
                    u[r].visible &&
                        ("mousedown" === o && u[r]._activate.call(u[r], i),
                            (u[r].offset = u[r].element.offset()),
                            u[r].proportions({
                                width: u[r].element[0].offsetWidth,
                                height: u[r].element[0].offsetHeight,
                            }));
                }
        },
        drop: function(t, i) {
            var r = !1;
            return (
                n.each(
                    (n.ui.ddmanager.droppables[t.options.scope] || []).slice(),
                    function() {
                        this.options &&
                            (!this.options.disabled &&
                                this.visible &&
                                e(t, this, this.options.tolerance, i) &&
                                (r = this._drop.call(this, i) || r), !this.options.disabled &&
                                this.visible &&
                                this.accept.call(
                                    this.element[0],
                                    t.currentItem || t.element
                                ) &&
                                ((this.isout = !0),
                                    (this.isover = !1),
                                    this._deactivate.call(this, i)));
                    }
                ),
                r
            );
        },
        dragStart: function(t, i) {
            t.element.parentsUntil("body").on("scroll.droppable", function() {
                t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i);
            });
        },
        drag: function(t, i) {
            t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i);
            n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var r,
                        o,
                        f,
                        s = e(t, this, this.options.tolerance, i),
                        u = !s && this.isover ?
                        "isout" :
                        s && !this.isover ?
                        "isover" :
                        null;
                    u &&
                        (this.options.greedy &&
                            ((o = this.options.scope),
                                (f = this.element
                                    .parents(":data(ui-droppable)")
                                    .filter(function() {
                                        return n(this).droppable("instance").options.scope === o;
                                    })),
                                f.length &&
                                ((r = n(f[0]).droppable("instance")),
                                    (r.greedyChild = "isover" === u))),
                            r &&
                            "isover" === u &&
                            ((r.isover = !1), (r.isout = !0), r._out.call(r, i)),
                            (this[u] = !0),
                            (this["isout" === u ? "isover" : "isout"] = !1),
                            this["isover" === u ? "_over" : "_out"].call(this, i),
                            r &&
                            "isout" === u &&
                            ((r.isout = !1), (r.isover = !0), r._over.call(r, i)));
                }
            });
        },
        dragStop: function(t, i) {
            t.element.parentsUntil("body").off("scroll.droppable");
            t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i);
        },
    };
    n.uiBackCompat !== !1 &&
        n.widget("ui.droppable", n.ui.droppable, {
            options: { hoverClass: !1, activeClass: !1 },
            _addActiveClass: function() {
                this._super();
                this.options.activeClass &&
                    this.element.addClass(this.options.activeClass);
            },
            _removeActiveClass: function() {
                this._super();
                this.options.activeClass &&
                    this.element.removeClass(this.options.activeClass);
            },
            _addHoverClass: function() {
                this._super();
                this.options.hoverClass &&
                    this.element.addClass(this.options.hoverClass);
            },
            _removeHoverClass: function() {
                this._super();
                this.options.hoverClass &&
                    this.element.removeClass(this.options.hoverClass);
            },
        });
    n.ui.droppable;
    n.widget("ui.progressbar", {
        version: "1.12.1",
        options: {
            classes: {
                "ui-progressbar": "ui-corner-all",
                "ui-progressbar-value": "ui-corner-left",
                "ui-progressbar-complete": "ui-corner-right",
            },
            max: 100,
            value: 0,
            change: null,
            complete: null,
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.attr({ role: "progressbar", "aria-valuemin": this.min });
            this._addClass("ui-progressbar", "ui-widget ui-widget-content");
            this.valueDiv = n("<div>").appendTo(this.element);
            this._addClass(
                this.valueDiv,
                "ui-progressbar-value",
                "ui-widget-header"
            );
            this._refreshValue();
        },
        _destroy: function() {
            this.element.removeAttr(
                "role aria-valuemin aria-valuemax aria-valuenow"
            );
            this.valueDiv.remove();
        },
        value: function(n) {
            return void 0 === n ?
                this.options.value :
                ((this.options.value = this._constrainedValue(n)),
                    this._refreshValue(),
                    void 0);
        },
        _constrainedValue: function(n) {
            return (
                void 0 === n && (n = this.options.value),
                (this.indeterminate = n === !1),
                "number" != typeof n && (n = 0),
                this.indeterminate ?
                !1 :
                Math.min(this.options.max, Math.max(this.min, n))
            );
        },
        _setOptions: function(n) {
            var t = n.value;
            delete n.value;
            this._super(n);
            this.options.value = this._constrainedValue(t);
            this._refreshValue();
        },
        _setOption: function(n, t) {
            "max" === n && (t = Math.max(this.min, t));
            this._super(n, t);
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this.element.attr("aria-disabled", n);
            this._toggleClass(null, "ui-state-disabled", !!n);
        },
        _percentage: function() {
            return this.indeterminate ?
                100 :
                (100 * (this.options.value - this.min)) /
                (this.options.max - this.min);
        },
        _refreshValue: function() {
            var t = this.options.value,
                i = this._percentage();
            this.valueDiv
                .toggle(this.indeterminate || t > this.min)
                .width(i.toFixed(0) + "%");
            this._toggleClass(
                this.valueDiv,
                "ui-progressbar-complete",
                null,
                t === this.options.max
            )._toggleClass(
                "ui-progressbar-indeterminate",
                null,
                this.indeterminate
            );
            this.indeterminate ?
                (this.element.removeAttr("aria-valuenow"),
                    this.overlayDiv ||
                    ((this.overlayDiv = n("<div>").appendTo(this.valueDiv)),
                        this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) :
                (this.element.attr({
                        "aria-valuemax": this.options.max,
                        "aria-valuenow": t,
                    }),
                    this.overlayDiv &&
                    (this.overlayDiv.remove(), (this.overlayDiv = null)));
            this.oldValue !== t && ((this.oldValue = t), this._trigger("change"));
            t === this.options.max && this._trigger("complete");
        },
    });
    n.widget("ui.selectable", n.ui.mouse, {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null,
        },
        _create: function() {
            var t = this;
            this._addClass("ui-selectable");
            this.dragged = !1;
            this.refresh = function() {
                t.elementPos = n(t.element[0]).offset();
                t.selectees = n(t.options.filter, t.element[0]);
                t._addClass(t.selectees, "ui-selectee");
                t.selectees.each(function() {
                    var i = n(this),
                        u = i.offset(),
                        r = {
                            left: u.left - t.elementPos.left,
                            top: u.top - t.elementPos.top,
                        };
                    n.data(this, "selectable-item", {
                        element: this,
                        $element: i,
                        left: r.left,
                        top: r.top,
                        right: r.left + i.outerWidth(),
                        bottom: r.top + i.outerHeight(),
                        startselected: !1,
                        selected: i.hasClass("ui-selected"),
                        selecting: i.hasClass("ui-selecting"),
                        unselecting: i.hasClass("ui-unselecting"),
                    });
                });
            };
            this.refresh();
            this._mouseInit();
            this.helper = n("<div>");
            this._addClass(this.helper, "ui-selectable-helper");
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item");
            this._mouseDestroy();
        },
        _mouseStart: function(t) {
            var i = this,
                r = this.options;
            this.opos = [t.pageX, t.pageY];
            this.elementPos = n(this.element[0]).offset();
            this.options.disabled ||
                ((this.selectees = n(r.filter, this.element[0])),
                    this._trigger("start", t),
                    n(r.appendTo).append(this.helper),
                    this.helper.css({ left: t.pageX, top: t.pageY, width: 0, height: 0 }),
                    r.autoRefresh && this.refresh(),
                    this.selectees.filter(".ui-selected").each(function() {
                        var r = n.data(this, "selectable-item");
                        r.startselected = !0;
                        t.metaKey ||
                            t.ctrlKey ||
                            (i._removeClass(r.$element, "ui-selected"),
                                (r.selected = !1),
                                i._addClass(r.$element, "ui-unselecting"),
                                (r.unselecting = !0),
                                i._trigger("unselecting", t, { unselecting: r.element }));
                    }),
                    n(t.target)
                    .parents()
                    .addBack()
                    .each(function() {
                        var u,
                            r = n.data(this, "selectable-item");
                        if (r)
                            return (
                                (u =
                                    (!t.metaKey && !t.ctrlKey) ||
                                    !r.$element.hasClass("ui-selected")),
                                i
                                ._removeClass(
                                    r.$element,
                                    u ? "ui-unselecting" : "ui-selected"
                                )
                                ._addClass(
                                    r.$element,
                                    u ? "ui-selecting" : "ui-unselecting"
                                ),
                                (r.unselecting = !u),
                                (r.selecting = u),
                                (r.selected = u),
                                u ?
                                i._trigger("selecting", t, { selecting: r.element }) :
                                i._trigger("unselecting", t, { unselecting: r.element }), !1
                            );
                    }));
        },
        _mouseDrag: function(t) {
            if (((this.dragged = !0), !this.options.disabled)) {
                var o,
                    i = this,
                    s = this.options,
                    r = this.opos[0],
                    u = this.opos[1],
                    f = t.pageX,
                    e = t.pageY;
                return (
                    r > f && ((o = f), (f = r), (r = o)),
                    u > e && ((o = e), (e = u), (u = o)),
                    this.helper.css({ left: r, top: u, width: f - r, height: e - u }),
                    this.selectees.each(function() {
                        var o = n.data(this, "selectable-item"),
                            c = !1,
                            h = {};
                        o &&
                            o.element !== i.element[0] &&
                            ((h.left = o.left + i.elementPos.left),
                                (h.right = o.right + i.elementPos.left),
                                (h.top = o.top + i.elementPos.top),
                                (h.bottom = o.bottom + i.elementPos.top),
                                "touch" === s.tolerance ?
                                (c = !(
                                    h.left > f ||
                                    r > h.right ||
                                    h.top > e ||
                                    u > h.bottom
                                )) :
                                "fit" === s.tolerance &&
                                (c =
                                    h.left > r && f > h.right && h.top > u && e > h.bottom),
                                c ?
                                (o.selected &&
                                    (i._removeClass(o.$element, "ui-selected"),
                                        (o.selected = !1)),
                                    o.unselecting &&
                                    (i._removeClass(o.$element, "ui-unselecting"),
                                        (o.unselecting = !1)),
                                    o.selecting ||
                                    (i._addClass(o.$element, "ui-selecting"),
                                        (o.selecting = !0),
                                        i._trigger("selecting", t, { selecting: o.element }))) :
                                (o.selecting &&
                                    ((t.metaKey || t.ctrlKey) && o.startselected ?
                                        (i._removeClass(o.$element, "ui-selecting"),
                                            (o.selecting = !1),
                                            i._addClass(o.$element, "ui-selected"),
                                            (o.selected = !0)) :
                                        (i._removeClass(o.$element, "ui-selecting"),
                                            (o.selecting = !1),
                                            o.startselected &&
                                            (i._addClass(o.$element, "ui-unselecting"),
                                                (o.unselecting = !0)),
                                            i._trigger("unselecting", t, {
                                                unselecting: o.element,
                                            }))),
                                    o.selected &&
                                    (t.metaKey ||
                                        t.ctrlKey ||
                                        o.startselected ||
                                        (i._removeClass(o.$element, "ui-selected"),
                                            (o.selected = !1),
                                            i._addClass(o.$element, "ui-unselecting"),
                                            (o.unselecting = !0),
                                            i._trigger("unselecting", t, {
                                                unselecting: o.element,
                                            })))));
                    }), !1
                );
            }
        },
        _mouseStop: function(t) {
            var i = this;
            return (
                (this.dragged = !1),
                n(".ui-unselecting", this.element[0]).each(function() {
                    var r = n.data(this, "selectable-item");
                    i._removeClass(r.$element, "ui-unselecting");
                    r.unselecting = !1;
                    r.startselected = !1;
                    i._trigger("unselected", t, { unselected: r.element });
                }),
                n(".ui-selecting", this.element[0]).each(function() {
                    var r = n.data(this, "selectable-item");
                    i._removeClass(r.$element, "ui-selecting")._addClass(
                        r.$element,
                        "ui-selected"
                    );
                    r.selecting = !1;
                    r.selected = !0;
                    r.startselected = !0;
                    i._trigger("selected", t, { selected: r.element });
                }),
                this._trigger("stop", t),
                this.helper.remove(), !1
            );
        },
    });
    n.widget("ui.selectmenu", [
        n.ui.formResetMixin,
        {
            version: "1.12.1",
            defaultElement: "<select>",
            options: {
                appendTo: null,
                classes: {
                    "ui-selectmenu-button-open": "ui-corner-top",
                    "ui-selectmenu-button-closed": "ui-corner-all",
                },
                disabled: null,
                icons: { button: "ui-icon-triangle-1-s" },
                position: { my: "left top", at: "left bottom", collision: "none" },
                width: !1,
                change: null,
                close: null,
                focus: null,
                open: null,
                select: null,
            },
            _create: function() {
                var t = this.element.uniqueId().attr("id");
                this.ids = { element: t, button: t + "-button", menu: t + "-menu" };
                this._drawButton();
                this._drawMenu();
                this._bindFormResetHandler();
                this._rendered = !1;
                this.menuItems = n();
            },
            _drawButton: function() {
                var t,
                    i = this,
                    r = this._parseOption(
                        this.element.find("option:selected"),
                        this.element[0].selectedIndex
                    );
                this.labels = this.element.labels().attr("for", this.ids.button);
                this._on(this.labels, {
                    click: function(n) {
                        this.button.focus();
                        n.preventDefault();
                    },
                });
                this.element.hide();
                this.button = n("<span>", {
                    tabindex: this.options.disabled ? -1 : 0,
                    id: this.ids.button,
                    role: "combobox",
                    "aria-expanded": "false",
                    "aria-autocomplete": "list",
                    "aria-owns": this.ids.menu,
                    "aria-haspopup": "true",
                    title: this.element.attr("title"),
                }).insertAfter(this.element);
                this._addClass(
                    this.button,
                    "ui-selectmenu-button ui-selectmenu-button-closed",
                    "ui-button ui-widget"
                );
                t = n("<span>").appendTo(this.button);
                this._addClass(
                    t,
                    "ui-selectmenu-icon",
                    "ui-icon " + this.options.icons.button
                );
                this.buttonItem = this._renderButtonItem(r).appendTo(this.button);
                this.options.width !== !1 && this._resizeButton();
                this._on(this.button, this._buttonEvents);
                this.button.one("focusin", function() {
                    i._rendered || i._refreshMenu();
                });
            },
            _drawMenu: function() {
                var t = this;
                this.menu = n("<ul>", {
                    "aria-hidden": "true",
                    "aria-labelledby": this.ids.button,
                    id: this.ids.menu,
                });
                this.menuWrap = n("<div>").append(this.menu);
                this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front");
                this.menuWrap.appendTo(this._appendTo());
                this.menuInstance = this.menu
                    .menu({
                        classes: { "ui-menu": "ui-corner-bottom" },
                        role: "listbox",
                        select: function(n, i) {
                            n.preventDefault();
                            t._setSelection();
                            t._select(i.item.data("ui-selectmenu-item"), n);
                        },
                        focus: function(n, i) {
                            var r = i.item.data("ui-selectmenu-item");
                            null != t.focusIndex &&
                                r.index !== t.focusIndex &&
                                (t._trigger("focus", n, { item: r }),
                                    t.isOpen || t._select(r, n));
                            t.focusIndex = r.index;
                            t.button.attr(
                                "aria-activedescendant",
                                t.menuItems.eq(r.index).attr("id")
                            );
                        },
                    })
                    .menu("instance");
                this.menuInstance._off(this.menu, "mouseleave");
                this.menuInstance._closeOnDocumentClick = function() {
                    return !1;
                };
                this.menuInstance._isDivider = function() {
                    return !1;
                };
            },
            refresh: function() {
                this._refreshMenu();
                this.buttonItem.replaceWith(
                    (this.buttonItem = this._renderButtonItem(
                        this._getSelectedItem().data("ui-selectmenu-item") || {}
                    ))
                );
                null === this.options.width && this._resizeButton();
            },
            _refreshMenu: function() {
                var n,
                    t = this.element.find("option");
                this.menu.empty();
                this._parseOptions(t);
                this._renderMenu(this.menu, this.items);
                this.menuInstance.refresh();
                this.menuItems = this.menu
                    .find("li")
                    .not(".ui-selectmenu-optgroup")
                    .find(".ui-menu-item-wrapper");
                this._rendered = !0;
                t.length &&
                    ((n = this._getSelectedItem()),
                        this.menuInstance.focus(null, n),
                        this._setAria(n.data("ui-selectmenu-item")),
                        this._setOption("disabled", this.element.prop("disabled")));
            },
            open: function(n) {
                this.options.disabled ||
                    (this._rendered ?
                        (this._removeClass(
                                this.menu.find(".ui-state-active"),
                                null,
                                "ui-state-active"
                            ),
                            this.menuInstance.focus(null, this._getSelectedItem())) :
                        this._refreshMenu(),
                        this.menuItems.length &&
                        ((this.isOpen = !0),
                            this._toggleAttr(),
                            this._resizeMenu(),
                            this._position(),
                            this._on(this.document, this._documentClick),
                            this._trigger("open", n)));
            },
            _position: function() {
                this.menuWrap.position(
                    n.extend({ of: this.button }, this.options.position)
                );
            },
            close: function(n) {
                this.isOpen &&
                    ((this.isOpen = !1),
                        this._toggleAttr(),
                        (this.range = null),
                        this._off(this.document),
                        this._trigger("close", n));
            },
            widget: function() {
                return this.button;
            },
            menuWidget: function() {
                return this.menu;
            },
            _renderButtonItem: function(t) {
                var i = n("<span>");
                return (
                    this._setText(i, t.label),
                    this._addClass(i, "ui-selectmenu-text"),
                    i
                );
            },
            _renderMenu: function(t, i) {
                var r = this,
                    u = "";
                n.each(i, function(i, f) {
                    var e;
                    f.optgroup !== u &&
                        ((e = n("<li>", { text: f.optgroup })),
                            r._addClass(
                                e,
                                "ui-selectmenu-optgroup",
                                "ui-menu-divider" +
                                (f.element.parent("optgroup").prop("disabled") ?
                                    " ui-state-disabled" :
                                    "")
                            ),
                            e.appendTo(t),
                            (u = f.optgroup));
                    r._renderItemData(t, f);
                });
            },
            _renderItemData: function(n, t) {
                return this._renderItem(n, t).data("ui-selectmenu-item", t);
            },
            _renderItem: function(t, i) {
                var r = n("<li>"),
                    u = n("<div>", { title: i.element.attr("title") });
                return (
                    i.disabled && this._addClass(r, null, "ui-state-disabled"),
                    this._setText(u, i.label),
                    r.append(u).appendTo(t)
                );
            },
            _setText: function(n, t) {
                t ? n.text(t) : n.html("&#160;");
            },
            _move: function(n, t) {
                var i,
                    r,
                    u = ".ui-menu-item";
                this.isOpen ?
                    (i = this.menuItems.eq(this.focusIndex).parent("li")) :
                    ((i = this.menuItems
                            .eq(this.element[0].selectedIndex)
                            .parent("li")),
                        (u += ":not(.ui-state-disabled)"));
                r =
                    "first" === n || "last" === n ?
                    i["first" === n ? "prevAll" : "nextAll"](u).eq(-1) :
                    i[n + "All"](u).eq(0);
                r.length && this.menuInstance.focus(t, r);
            },
            _getSelectedItem: function() {
                return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
            },
            _toggle: function(n) {
                this[this.isOpen ? "close" : "open"](n);
            },
            _setSelection: function() {
                var n;
                this.range &&
                    (window.getSelection ?
                        ((n = window.getSelection()),
                            n.removeAllRanges(),
                            n.addRange(this.range)) :
                        this.range.select(),
                        this.button.focus());
            },
            _documentClick: {
                mousedown: function(t) {
                    this.isOpen &&
                        (n(t.target).closest(
                                ".ui-selectmenu-menu, #" + n.ui.escapeSelector(this.ids.button)
                            ).length ||
                            this.close(t));
                },
            },
            _buttonEvents: {
                mousedown: function() {
                    var n;
                    window.getSelection ?
                        ((n = window.getSelection()),
                            n.rangeCount && (this.range = n.getRangeAt(0))) :
                        (this.range = document.selection.createRange());
                },
                click: function(n) {
                    this._setSelection();
                    this._toggle(n);
                },
                keydown: function(t) {
                    var i = !0;
                    switch (t.keyCode) {
                        case n.ui.keyCode.TAB:
                        case n.ui.keyCode.ESCAPE:
                            this.close(t);
                            i = !1;
                            break;
                        case n.ui.keyCode.ENTER:
                            this.isOpen && this._selectFocusedItem(t);
                            break;
                        case n.ui.keyCode.UP:
                            t.altKey ? this._toggle(t) : this._move("prev", t);
                            break;
                        case n.ui.keyCode.DOWN:
                            t.altKey ? this._toggle(t) : this._move("next", t);
                            break;
                        case n.ui.keyCode.SPACE:
                            this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                            break;
                        case n.ui.keyCode.LEFT:
                            this._move("prev", t);
                            break;
                        case n.ui.keyCode.RIGHT:
                            this._move("next", t);
                            break;
                        case n.ui.keyCode.HOME:
                        case n.ui.keyCode.PAGE_UP:
                            this._move("first", t);
                            break;
                        case n.ui.keyCode.END:
                        case n.ui.keyCode.PAGE_DOWN:
                            this._move("last", t);
                            break;
                        default:
                            this.menu.trigger(t);
                            i = !1;
                    }
                    i && t.preventDefault();
                },
            },
            _selectFocusedItem: function(n) {
                var t = this.menuItems.eq(this.focusIndex).parent("li");
                t.hasClass("ui-state-disabled") ||
                    this._select(t.data("ui-selectmenu-item"), n);
            },
            _select: function(n, t) {
                var i = this.element[0].selectedIndex;
                this.element[0].selectedIndex = n.index;
                this.buttonItem.replaceWith(
                    (this.buttonItem = this._renderButtonItem(n))
                );
                this._setAria(n);
                this._trigger("select", t, { item: n });
                n.index !== i && this._trigger("change", t, { item: n });
                this.close(t);
            },
            _setAria: function(n) {
                var t = this.menuItems.eq(n.index).attr("id");
                this.button.attr({
                    "aria-labelledby": t,
                    "aria-activedescendant": t,
                });
                this.menu.attr("aria-activedescendant", t);
            },
            _setOption: function(n, t) {
                if ("icons" === n) {
                    var i = this.button.find("span.ui-icon");
                    this._removeClass(i, null, this.options.icons.button)._addClass(
                        i,
                        null,
                        t.button
                    );
                }
                this._super(n, t);
                "appendTo" === n && this.menuWrap.appendTo(this._appendTo());
                "width" === n && this._resizeButton();
            },
            _setOptionDisabled: function(n) {
                this._super(n);
                this.menuInstance.option("disabled", n);
                this.button.attr("aria-disabled", n);
                this._toggleClass(this.button, null, "ui-state-disabled", n);
                this.element.prop("disabled", n);
                n
                    ?
                    (this.button.attr("tabindex", -1), this.close()) :
                    this.button.attr("tabindex", 0);
            },
            _appendTo: function() {
                var t = this.options.appendTo;
                return (
                    t &&
                    (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)),
                    (t && t[0]) || (t = this.element.closest(".ui-front, dialog")),
                    t.length || (t = this.document[0].body),
                    t
                );
            },
            _toggleAttr: function() {
                this.button.attr("aria-expanded", this.isOpen);
                this._removeClass(
                        this.button,
                        "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open")
                    )
                    ._addClass(
                        this.button,
                        "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed")
                    )
                    ._toggleClass(
                        this.menuWrap,
                        "ui-selectmenu-open",
                        null,
                        this.isOpen
                    );
                this.menu.attr("aria-hidden", !this.isOpen);
            },
            _resizeButton: function() {
                var n = this.options.width;
                return n === !1 ?
                    (this.button.css("width", ""), void 0) :
                    (null === n &&
                        ((n = this.element.show().outerWidth()), this.element.hide()),
                        this.button.outerWidth(n),
                        void 0);
            },
            _resizeMenu: function() {
                this.menu.outerWidth(
                    Math.max(
                        this.button.outerWidth(),
                        this.menu.width("").outerWidth() + 1
                    )
                );
            },
            _getCreateOptions: function() {
                var n = this._super();
                return (n.disabled = this.element.prop("disabled")), n;
            },
            _parseOptions: function(t) {
                var r = this,
                    i = [];
                t.each(function(t, u) {
                    i.push(r._parseOption(n(u), t));
                });
                this.items = i;
            },
            _parseOption: function(n, t) {
                var i = n.parent("optgroup");
                return {
                    element: n,
                    index: t,
                    value: n.val(),
                    label: n.text(),
                    optgroup: i.attr("label") || "",
                    disabled: i.prop("disabled") || n.prop("disabled"),
                };
            },
            _destroy: function() {
                this._unbindFormResetHandler();
                this.menuWrap.remove();
                this.button.remove();
                this.element.show();
                this.element.removeUniqueId();
                this.labels.attr("for", this.ids.element);
            },
        },
    ]);
    n.widget("ui.slider", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header",
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null,
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1;
            this._mouseSliding = !1;
            this._animateOff = !0;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this._calculateNewMax();
            this._addClass(
                "ui-slider ui-slider-" + this.orientation,
                "ui-widget ui-widget-content"
            );
            this._refresh();
            this._animateOff = !1;
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue();
        },
        _createHandles: function() {
            var r,
                i,
                u = this.options,
                t = this.element.find(".ui-slider-handle"),
                f = [];
            for (
                i = (u.values && u.values.length) || 1,
                t.length > i && (t.slice(i).remove(), (t = t.slice(0, i))),
                r = t.length; i > r; r++
            )
                f.push("<span tabindex='0'></span>");
            this.handles = t.add(n(f.join("")).appendTo(this.element));
            this._addClass(this.handles, "ui-slider-handle", "ui-state-default");
            this.handle = this.handles.eq(0);
            this.handles.each(function(t) {
                n(this).data("ui-slider-handle-index", t).attr("tabIndex", 0);
            });
        },
        _createRange: function() {
            var t = this.options;
            t.range ?
                (t.range === !0 &&
                    (t.values ?
                        t.values.length && 2 !== t.values.length ?
                        (t.values = [t.values[0], t.values[0]]) :
                        n.isArray(t.values) && (t.values = t.values.slice(0)) :
                        (t.values = [this._valueMin(), this._valueMin()])),
                    this.range && this.range.length ?
                    (this._removeClass(
                            this.range,
                            "ui-slider-range-min ui-slider-range-max"
                        ),
                        this.range.css({ left: "", bottom: "" })) :
                    ((this.range = n("<div>").appendTo(this.element)),
                        this._addClass(this.range, "ui-slider-range")),
                    ("min" === t.range || "max" === t.range) &&
                    this._addClass(this.range, "ui-slider-range-" + t.range)) :
                (this.range && this.range.remove(), (this.range = null));
        },
        _setupEvents: function() {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles);
        },
        _destroy: function() {
            this.handles.remove();
            this.range && this.range.remove();
            this._mouseDestroy();
        },
        _mouseCapture: function(t) {
            var s,
                f,
                r,
                i,
                u,
                h,
                e,
                c,
                o = this,
                l = this.options;
            return l.disabled ?
                !1 :
                ((this.elementSize = {
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                    }),
                    (this.elementOffset = this.element.offset()),
                    (s = { x: t.pageX, y: t.pageY }),
                    (f = this._normValueFromMouse(s)),
                    (r = this._valueMax() - this._valueMin() + 1),
                    this.handles.each(function(t) {
                        var e = Math.abs(f - o.values(t));
                        (r > e ||
                            (r === e &&
                                (t === o._lastChangedValue || o.values(t) === l.min))) &&
                        ((r = e), (i = n(this)), (u = t));
                    }),
                    (h = this._start(t, u)),
                    h === !1 ?
                    !1 :
                    ((this._mouseSliding = !0),
                        (this._handleIndex = u),
                        this._addClass(i, null, "ui-state-active"),
                        i.trigger("focus"),
                        (e = i.offset()),
                        (c = !n(t.target).parents().addBack().is(".ui-slider-handle")),
                        (this._clickOffset = c ? { left: 0, top: 0 } : {
                            left: t.pageX - e.left - i.width() / 2,
                            top: t.pageY -
                                e.top -
                                i.height() / 2 -
                                (parseInt(i.css("borderTopWidth"), 10) || 0) -
                                (parseInt(i.css("borderBottomWidth"), 10) || 0) +
                                (parseInt(i.css("marginTop"), 10) || 0),
                        }),
                        this.handles.hasClass("ui-state-hover") || this._slide(t, u, f),
                        (this._animateOff = !0), !0));
        },
        _mouseStart: function() {
            return !0;
        },
        _mouseDrag: function(n) {
            var t = { x: n.pageX, y: n.pageY },
                i = this._normValueFromMouse(t);
            return this._slide(n, this._handleIndex, i), !1;
        },
        _mouseStop: function(n) {
            return (
                this._removeClass(this.handles, null, "ui-state-active"),
                (this._mouseSliding = !1),
                this._stop(n, this._handleIndex),
                this._change(n, this._handleIndex),
                (this._handleIndex = null),
                (this._clickOffset = null),
                (this._animateOff = !1), !1
            );
        },
        _detectOrientation: function() {
            this.orientation =
                "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function(n) {
            var i, r, t, u, f;
            return (
                "horizontal" === this.orientation ?
                ((i = this.elementSize.width),
                    (r =
                        n.x -
                        this.elementOffset.left -
                        (this._clickOffset ? this._clickOffset.left : 0))) :
                ((i = this.elementSize.height),
                    (r =
                        n.y -
                        this.elementOffset.top -
                        (this._clickOffset ? this._clickOffset.top : 0))),
                (t = r / i),
                t > 1 && (t = 1),
                0 > t && (t = 0),
                "vertical" === this.orientation && (t = 1 - t),
                (u = this._valueMax() - this._valueMin()),
                (f = this._valueMin() + t * u),
                this._trimAlignValue(f)
            );
        },
        _uiHash: function(n, t, i) {
            var r = {
                handle: this.handles[n],
                handleIndex: n,
                value: void 0 !== t ? t : this.value(),
            };
            return (
                this._hasMultipleValues() &&
                ((r.value = void 0 !== t ? t : this.values(n)),
                    (r.values = i || this.values())),
                r
            );
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length;
        },
        _start: function(n, t) {
            return this._trigger("start", n, this._uiHash(t));
        },
        _slide: function(n, t, i) {
            var u,
                r,
                f = this.value(),
                e = this.values();
            this._hasMultipleValues() &&
                ((r = this.values(t ? 0 : 1)),
                    (f = this.values(t)),
                    2 === this.options.values.length &&
                    this.options.range === !0 &&
                    (i = 0 === t ? Math.min(r, i) : Math.max(r, i)),
                    (e[t] = i));
            i !== f &&
                ((u = this._trigger("slide", n, this._uiHash(t, i, e))),
                    u !== !1 &&
                    (this._hasMultipleValues() ? this.values(t, i) : this.value(i)));
        },
        _stop: function(n, t) {
            this._trigger("stop", n, this._uiHash(t));
        },
        _change: function(n, t) {
            this._keySliding ||
                this._mouseSliding ||
                ((this._lastChangedValue = t),
                    this._trigger("change", n, this._uiHash(t)));
        },
        value: function(n) {
            return arguments.length ?
                ((this.options.value = this._trimAlignValue(n)),
                    this._refreshValue(),
                    this._change(null, 0),
                    void 0) :
                this._value();
        },
        values: function(t, i) {
            var u, f, r;
            if (arguments.length > 1)
                return (
                    (this.options.values[t] = this._trimAlignValue(i)),
                    this._refreshValue(),
                    this._change(null, t),
                    void 0
                );
            if (!arguments.length) return this._values();
            if (!n.isArray(arguments[0]))
                return this._hasMultipleValues() ? this._values(t) : this.value();
            for (
                u = this.options.values, f = arguments[0], r = 0; u.length > r; r += 1
            )
                (u[r] = this._trimAlignValue(f[r])), this._change(null, r);
            this._refreshValue();
        },
        _setOption: function(t, i) {
            var r,
                u = 0;
            switch (
                ("range" === t &&
                    this.options.range === !0 &&
                    ("min" === i ?
                        ((this.options.value = this._values(0)),
                            (this.options.values = null)) :
                        "max" === i &&
                        ((this.options.value = this._values(
                                this.options.values.length - 1
                            )),
                            (this.options.values = null))),
                    n.isArray(this.options.values) && (u = this.options.values.length),
                    this._super(t, i),
                    t)
            ) {
                case "orientation":
                    this._detectOrientation();
                    this._removeClass(
                        "ui-slider-horizontal ui-slider-vertical"
                    )._addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    this.options.range && this._refreshRange(i);
                    this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = !1;
                    break;
                case "values":
                    for (
                        this._animateOff = !0, this._refreshValue(), r = u - 1; r >= 0; r--
                    )
                        this._change(null, r);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0;
                    this._calculateNewMax();
                    this._refreshValue();
                    this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0;
                    this._refresh();
                    this._animateOff = !1;
            }
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this._toggleClass(null, "ui-state-disabled", !!n);
        },
        _value: function() {
            var n = this.options.value;
            return this._trimAlignValue(n);
        },
        _values: function(n) {
            var r, t, i;
            if (arguments.length)
                return (r = this.options.values[n]), (r = this._trimAlignValue(r));
            if (this._hasMultipleValues()) {
                for (t = this.options.values.slice(), i = 0; t.length > i; i += 1)
                    t[i] = this._trimAlignValue(t[i]);
                return t;
            }
            return [];
        },
        _trimAlignValue: function(n) {
            if (this._valueMin() >= n) return this._valueMin();
            if (n >= this._valueMax()) return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1,
                i = (n - this._valueMin()) % t,
                r = n - i;
            return (
                2 * Math.abs(i) >= t && (r += i > 0 ? t : -t),
                parseFloat(r.toFixed(5))
            );
        },
        _calculateNewMax: function() {
            var n = this.options.max,
                i = this._valueMin(),
                t = this.options.step,
                r = Math.round((n - i) / t) * t;
            n = r + i;
            n > this.options.max && (n -= t);
            this.max = parseFloat(n.toFixed(this._precision()));
        },
        _precision: function() {
            var n = this._precisionOf(this.options.step);
            return (
                null !== this.options.min &&
                (n = Math.max(n, this._precisionOf(this.options.min))),
                n
            );
        },
        _precisionOf: function(n) {
            var t = "" + n,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1;
        },
        _valueMin: function() {
            return this.options.min;
        },
        _valueMax: function() {
            return this.max;
        },
        _refreshRange: function(n) {
            "vertical" === n && this.range.css({ width: "", left: "" });
            "horizontal" === n && this.range.css({ height: "", bottom: "" });
        },
        _refreshValue: function() {
            var s,
                t,
                c,
                f,
                h,
                e = this.options.range,
                i = this.options,
                r = this,
                u = this._animateOff ? !1 : i.animate,
                o = {};
            this._hasMultipleValues() ?
                this.handles.each(function(f) {
                    t =
                        100 *
                        ((r.values(f) - r._valueMin()) /
                            (r._valueMax() - r._valueMin()));
                    o["horizontal" === r.orientation ? "left" : "bottom"] = t + "%";
                    n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
                    r.options.range === !0 &&
                        ("horizontal" === r.orientation ?
                            (0 === f &&
                                r.range
                                .stop(1, 1)[u ? "animate" : "css"]({ left: t + "%" }, i.animate),
                                1 === f &&
                                r.range[u ? "animate" : "css"]({ width: t - s + "%" }, { queue: !1, duration: i.animate })) :
                            (0 === f &&
                                r.range
                                .stop(1, 1)[u ? "animate" : "css"]({ bottom: t + "%" }, i.animate),
                                1 === f &&
                                r.range[u ? "animate" : "css"]({ height: t - s + "%" }, { queue: !1, duration: i.animate })));
                    s = t;
                }) :
                ((c = this.value()),
                    (f = this._valueMin()),
                    (h = this._valueMax()),
                    (t = h !== f ? 100 * ((c - f) / (h - f)) : 0),
                    (o["horizontal" === this.orientation ? "left" : "bottom"] =
                        t + "%"),
                    this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate),
                    "min" === e &&
                    "horizontal" === this.orientation &&
                    this.range
                    .stop(1, 1)[u ? "animate" : "css"]({ width: t + "%" }, i.animate),
                    "max" === e &&
                    "horizontal" === this.orientation &&
                    this.range
                    .stop(1, 1)[u ? "animate" : "css"]({ width: 100 - t + "%" }, i.animate),
                    "min" === e &&
                    "vertical" === this.orientation &&
                    this.range
                    .stop(1, 1)[u ? "animate" : "css"]({ height: t + "%" }, i.animate),
                    "max" === e &&
                    "vertical" === this.orientation &&
                    this.range
                    .stop(1, 1)[u ? "animate" : "css"]({ height: 100 - t + "%" }, i.animate));
        },
        _handleEvents: {
            keydown: function(t) {
                var e,
                    r,
                    i,
                    u,
                    f = n(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                    case n.ui.keyCode.HOME:
                    case n.ui.keyCode.END:
                    case n.ui.keyCode.PAGE_UP:
                    case n.ui.keyCode.PAGE_DOWN:
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (
                            (t.preventDefault(), !this._keySliding &&
                                ((this._keySliding = !0),
                                    this._addClass(n(t.target), null, "ui-state-active"),
                                    (e = this._start(t, f)),
                                    e === !1))
                        )
                            return;
                }
                switch (
                    ((u = this.options.step),
                        (r = i = this._hasMultipleValues() ? this.values(f) : this.value()),
                        t.keyCode)
                ) {
                    case n.ui.keyCode.HOME:
                        i = this._valueMin();
                        break;
                    case n.ui.keyCode.END:
                        i = this._valueMax();
                        break;
                    case n.ui.keyCode.PAGE_UP:
                        i = this._trimAlignValue(
                            r + (this._valueMax() - this._valueMin()) / this.numPages
                        );
                        break;
                    case n.ui.keyCode.PAGE_DOWN:
                        i = this._trimAlignValue(
                            r - (this._valueMax() - this._valueMin()) / this.numPages
                        );
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                        if (r === this._valueMax()) return;
                        i = this._trimAlignValue(r + u);
                        break;
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (r === this._valueMin()) return;
                        i = this._trimAlignValue(r - u);
                }
                this._slide(t, f, i);
            },
            keyup: function(t) {
                var i = n(t.target).data("ui-slider-handle-index");
                this._keySliding &&
                    ((this._keySliding = !1),
                        this._stop(t, i),
                        this._change(t, i),
                        this._removeClass(n(t.target), null, "ui-state-active"));
            },
        },
    });
    n.widget("ui.sortable", n.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null,
        },
        _isOverAxis: function(n, t, i) {
            return n >= t && t + i > n;
        },
        _isFloating: function(n) {
            return (
                /left|right/.test(n.css("float")) ||
                /inline|table-cell/.test(n.css("display"))
            );
        },
        _create: function() {
            this.containerCache = {};
            this._addClass("ui-sortable");
            this.refresh();
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = !0;
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "handle" === n && this._setHandleClassName();
        },
        _setHandleClassName: function() {
            var t = this;
            this._removeClass(
                this.element.find(".ui-sortable-handle"),
                "ui-sortable-handle"
            );
            n.each(this.items, function() {
                t._addClass(
                    this.instance.options.handle ?
                    this.item.find(this.instance.options.handle) :
                    this.item,
                    "ui-sortable-handle"
                );
            });
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var n = this.items.length - 1; n >= 0; n--)
                this.items[n].item.removeData(this.widgetName + "-item");
            return this;
        },
        _mouseCapture: function(t, i) {
            var r = null,
                f = !1,
                u = this;
            return this.reverting ?
                !1 :
                this.options.disabled || "static" === this.options.type ?
                !1 :
                (this._refreshItems(t),
                    n(t.target)
                    .parents()
                    .each(function() {
                        if (n.data(this, u.widgetName + "-item") === u)
                            return (r = n(this)), !1;
                    }),
                    n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)),
                    r ?
                    !this.options.handle ||
                    i ||
                    (n(this.options.handle, r)
                        .find("*")
                        .addBack()
                        .each(function() {
                            this === t.target && (f = !0);
                        }),
                        f) ?
                    ((this.currentItem = r), this._removeCurrentsFromItems(), !0) :
                    !1 :
                    !1);
        },
        _mouseStart: function(t, i, r) {
            var f,
                e,
                u = this.options;
            if (
                ((this.currentContainer = this),
                    this.refreshPositions(),
                    (this.helper = this._createHelper(t)),
                    this._cacheHelperProportions(),
                    this._cacheMargins(),
                    (this.scrollParent = this.helper.scrollParent()),
                    (this.offset = this.currentItem.offset()),
                    (this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left,
                    }),
                    n.extend(this.offset, {
                        click: {
                            left: t.pageX - this.offset.left,
                            top: t.pageY - this.offset.top,
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset(),
                    }),
                    this.helper.css("position", "absolute"),
                    (this.cssPosition = this.helper.css("position")),
                    (this.originalPosition = this._generatePosition(t)),
                    (this.originalPageX = t.pageX),
                    (this.originalPageY = t.pageY),
                    u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt),
                    (this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0],
                    }),
                    this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
                    this._createPlaceholder(),
                    u.containment && this._setContainment(),
                    u.cursor &&
                    "auto" !== u.cursor &&
                    ((e = this.document.find("body")),
                        (this.storedCursor = e.css("cursor")),
                        e.css("cursor", u.cursor),
                        (this.storedStylesheet = n(
                            "<style>*{ cursor: " + u.cursor + " !important; }</style>"
                        ).appendTo(e))),
                    u.opacity &&
                    (this.helper.css("opacity") &&
                        (this._storedOpacity = this.helper.css("opacity")),
                        this.helper.css("opacity", u.opacity)),
                    u.zIndex &&
                    (this.helper.css("zIndex") &&
                        (this._storedZIndex = this.helper.css("zIndex")),
                        this.helper.css("zIndex", u.zIndex)),
                    this.scrollParent[0] !== this.document[0] &&
                    "HTML" !== this.scrollParent[0].tagName &&
                    (this.overflowOffset = this.scrollParent.offset()),
                    this._trigger("start", t, this._uiHash()),
                    this._preserveHelperProportions || this._cacheHelperProportions(), !r)
            )
                for (f = this.containers.length - 1; f >= 0; f--)
                    this.containers[f]._trigger("activate", t, this._uiHash(this));
            return (
                n.ui.ddmanager && (n.ui.ddmanager.current = this),
                n.ui.ddmanager &&
                !u.dropBehaviour &&
                n.ui.ddmanager.prepareOffsets(this, t),
                (this.dragging = !0),
                this._addClass(this.helper, "ui-sortable-helper"),
                this._mouseDrag(t), !0
            );
        },
        _mouseDrag: function(t) {
            var e,
                u,
                f,
                o,
                i = this.options,
                r = !1;
            for (
                this.position = this._generatePosition(t),
                this.positionAbs = this._convertPositionTo("absolute"),
                this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
                this.options.scroll &&
                (this.scrollParent[0] !== this.document[0] &&
                    "HTML" !== this.scrollParent[0].tagName ?
                    (this.overflowOffset.top +
                        this.scrollParent[0].offsetHeight -
                        t.pageY <
                        i.scrollSensitivity ?
                        (this.scrollParent[0].scrollTop = r =
                            this.scrollParent[0].scrollTop + i.scrollSpeed) :
                        t.pageY - this.overflowOffset.top < i.scrollSensitivity &&
                        (this.scrollParent[0].scrollTop = r =
                            this.scrollParent[0].scrollTop - i.scrollSpeed),
                        this.overflowOffset.left +
                        this.scrollParent[0].offsetWidth -
                        t.pageX <
                        i.scrollSensitivity ?
                        (this.scrollParent[0].scrollLeft = r =
                            this.scrollParent[0].scrollLeft + i.scrollSpeed) :
                        t.pageX - this.overflowOffset.left <
                        i.scrollSensitivity &&
                        (this.scrollParent[0].scrollLeft = r =
                            this.scrollParent[0].scrollLeft - i.scrollSpeed)) :
                    (t.pageY - this.document.scrollTop() < i.scrollSensitivity ?
                        (r = this.document.scrollTop(
                            this.document.scrollTop() - i.scrollSpeed
                        )) :
                        this.window.height() -
                        (t.pageY - this.document.scrollTop()) <
                        i.scrollSensitivity &&
                        (r = this.document.scrollTop(
                            this.document.scrollTop() + i.scrollSpeed
                        )),
                        t.pageX - this.document.scrollLeft() < i.scrollSensitivity ?
                        (r = this.document.scrollLeft(
                            this.document.scrollLeft() - i.scrollSpeed
                        )) :
                        this.window.width() -
                        (t.pageX - this.document.scrollLeft()) <
                        i.scrollSensitivity &&
                        (r = this.document.scrollLeft(
                            this.document.scrollLeft() + i.scrollSpeed
                        ))),
                    r !== !1 &&
                    n.ui.ddmanager &&
                    !i.dropBehaviour &&
                    n.ui.ddmanager.prepareOffsets(this, t)),
                this.positionAbs = this._convertPositionTo("absolute"),
                (this.options.axis && "y" === this.options.axis) ||
                (this.helper[0].style.left = this.position.left + "px"),
                (this.options.axis && "x" === this.options.axis) ||
                (this.helper[0].style.top = this.position.top + "px"),
                e = this.items.length - 1; e >= 0; e--
            )
                if (
                    ((u = this.items[e]),
                        (f = u.item[0]),
                        (o = this._intersectsWithPointer(u)),
                        o &&
                        u.instance === this.currentContainer &&
                        f !== this.currentItem[0] &&
                        this.placeholder[1 === o ? "next" : "prev"]()[0] !== f &&
                        !n.contains(this.placeholder[0], f) &&
                        ("semi-dynamic" === this.options.type ?
                            !n.contains(this.element[0], f) :
                            !0))
                ) {
                    if (
                        ((this.direction = 1 === o ? "down" : "up"),
                            "pointer" !== this.options.tolerance &&
                            !this._intersectsWithSides(u))
                    )
                        break;
                    this._rearrange(t, u);
                    this._trigger("change", t, this._uiHash());
                    break;
                }
            return (
                this._contactContainers(t),
                n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
                this._trigger("sort", t, this._uiHash()),
                (this.lastPositionAbs = this.positionAbs), !1
            );
        },
        _mouseStop: function(t, i) {
            if (t) {
                if (
                    (n.ui.ddmanager &&
                        !this.options.dropBehaviour &&
                        n.ui.ddmanager.drop(this, t),
                        this.options.revert)
                ) {
                    var e = this,
                        f = this.placeholder.offset(),
                        r = this.options.axis,
                        u = {};
                    (r && "x" !== r) ||
                    (u.left =
                        f.left -
                        this.offset.parent.left -
                        this.margins.left +
                        (this.offsetParent[0] === this.document[0].body ?
                            0 :
                            this.offsetParent[0].scrollLeft));
                    (r && "y" !== r) ||
                    (u.top =
                        f.top -
                        this.offset.parent.top -
                        this.margins.top +
                        (this.offsetParent[0] === this.document[0].body ?
                            0 :
                            this.offsetParent[0].scrollTop));
                    this.reverting = !0;
                    n(this.helper).animate(
                        u,
                        parseInt(this.options.revert, 10) || 500,
                        function() {
                            e._clear(t);
                        }
                    );
                } else this._clear(t, i);
                return !1;
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new n.Event("mouseup", { target: null }));
                "original" === this.options.helper ?
                    (this.currentItem.css(this._storedCSS),
                        this._removeClass(this.currentItem, "ui-sortable-helper")) :
                    this.currentItem.show();
                for (var t = this.containers.length - 1; t >= 0; t--)
                    this.containers[t]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[t].containerCache.over &&
                    (this.containers[t]._trigger("out", null, this._uiHash(this)),
                        (this.containers[t].containerCache.over = 0));
            }
            return (
                this.placeholder &&
                (this.placeholder[0].parentNode &&
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                    "original" !== this.options.helper &&
                    this.helper &&
                    this.helper[0].parentNode &&
                    this.helper.remove(),
                    n.extend(this, {
                        helper: null,
                        dragging: !1,
                        reverting: !1,
                        _noFinalSort: null,
                    }),
                    this.domPosition.prev ?
                    n(this.domPosition.prev).after(this.currentItem) :
                    n(this.domPosition.parent).prepend(this.currentItem)),
                this
            );
        },
        serialize: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected),
                i = [];
            return (
                (t = t || {}),
                n(r).each(function() {
                    var r = (n(t.item || this).attr(t.attribute || "id") || "").match(
                        t.expression || /(.+)[\-=_](.+)/
                    );
                    r &&
                        i.push(
                            (t.key || r[1] + "[]") +
                            "=" +
                            (t.key && t.expression ? r[1] : r[2])
                        );
                }), !i.length && t.key && i.push(t.key + "="),
                i.join("&")
            );
        },
        toArray: function(t) {
            var r = this._getItemsAsjQuery(t && t.connected),
                i = [];
            return (
                (t = t || {}),
                r.each(function() {
                    i.push(n(t.item || this).attr(t.attribute || "id") || "");
                }),
                i
            );
        },
        _intersectsWith: function(n) {
            var t = this.positionAbs.left,
                h = t + this.helperProportions.width,
                i = this.positionAbs.top,
                c = i + this.helperProportions.height,
                r = n.left,
                f = r + n.width,
                u = n.top,
                e = u + n.height,
                o = this.offset.click.top,
                s = this.offset.click.left,
                l = "x" === this.options.axis || (i + o > u && e > i + o),
                a = "y" === this.options.axis || (t + s > r && f > t + s),
                v = l && a;
            return "pointer" === this.options.tolerance ||
                this.options.forcePointerForContainers ||
                ("pointer" !== this.options.tolerance &&
                    this.helperProportions[this.floating ? "width" : "height"] >
                    n[this.floating ? "width" : "height"]) ?
                v :
                t + this.helperProportions.width / 2 > r &&
                f > h - this.helperProportions.width / 2 &&
                i + this.helperProportions.height / 2 > u &&
                e > c - this.helperProportions.height / 2;
        },
        _intersectsWithPointer: function(n) {
            var t,
                i,
                r =
                "x" === this.options.axis ||
                this._isOverAxis(
                    this.positionAbs.top + this.offset.click.top,
                    n.top,
                    n.height
                ),
                u =
                "y" === this.options.axis ||
                this._isOverAxis(
                    this.positionAbs.left + this.offset.click.left,
                    n.left,
                    n.width
                ),
                f = r && u;
            return f ?
                ((t = this._getDragVerticalDirection()),
                    (i = this._getDragHorizontalDirection()),
                    this.floating ?
                    "right" === i || "down" === t ?
                    2 :
                    1 :
                    t && ("down" === t ? 2 : 1)) :
                !1;
        },
        _intersectsWithSides: function(n) {
            var r = this._isOverAxis(
                    this.positionAbs.top + this.offset.click.top,
                    n.top + n.height / 2,
                    n.height
                ),
                u = this._isOverAxis(
                    this.positionAbs.left + this.offset.click.left,
                    n.left + n.width / 2,
                    n.width
                ),
                t = this._getDragVerticalDirection(),
                i = this._getDragHorizontalDirection();
            return this.floating && i ?
                ("right" === i && u) || ("left" === i && !u) :
                t && (("down" === t && r) || ("up" === t && !r));
        },
        _getDragVerticalDirection: function() {
            var n = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== n && (n > 0 ? "down" : "up");
        },
        _getDragHorizontalDirection: function() {
            var n = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== n && (n > 0 ? "right" : "left");
        },
        refresh: function(n) {
            return (
                this._refreshItems(n),
                this._setHandleClassName(),
                this.refreshPositions(),
                this
            );
        },
        _connectWith: function() {
            var n = this.options;
            return n.connectWith.constructor === String ? [n.connectWith] :
                n.connectWith;
        },
        _getItemsAsjQuery: function(t) {
            function h() {
                s.push(this);
            }
            var r,
                u,
                e,
                i,
                s = [],
                f = [],
                o = this._connectWith();
            if (o && t)
                for (r = o.length - 1; r >= 0; r--)
                    for (e = n(o[r], this.document[0]), u = e.length - 1; u >= 0; u--)
                        (i = n.data(e[u], this.widgetFullName)),
                        i &&
                        i !== this &&
                        !i.options.disabled &&
                        f.push([
                            n.isFunction(i.options.items) ?
                            i.options.items.call(i.element) :
                            n(i.options.items, i.element)
                            .not(".ui-sortable-helper")
                            .not(".ui-sortable-placeholder"),
                            i,
                        ]);
            for (
                f.push([
                    n.isFunction(this.options.items) ?
                    this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem,
                    }) :
                    n(this.options.items, this.element)
                    .not(".ui-sortable-helper")
                    .not(".ui-sortable-placeholder"),
                    this,
                ]),
                r = f.length - 1; r >= 0; r--
            )
                f[r][0].each(h);
            return n(s);
        },
        _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = n.grep(this.items, function(n) {
                for (var i = 0; t.length > i; i++)
                    if (t[i] === n.item[0]) return !1;
                return !0;
            });
        },
        _refreshItems: function(t) {
            this.items = [];
            this.containers = [this];
            var r,
                u,
                e,
                i,
                o,
                s,
                h,
                l,
                a = this.items,
                f = [
                    [
                        n.isFunction(this.options.items) ?
                        this.options.items.call(this.element[0], t, {
                            item: this.currentItem,
                        }) :
                        n(this.options.items, this.element),
                        this,
                    ],
                ],
                c = this._connectWith();
            if (c && this.ready)
                for (r = c.length - 1; r >= 0; r--)
                    for (e = n(c[r], this.document[0]), u = e.length - 1; u >= 0; u--)
                        (i = n.data(e[u], this.widgetFullName)),
                        i &&
                        i !== this &&
                        !i.options.disabled &&
                        (f.push([
                                n.isFunction(i.options.items) ?
                                i.options.items.call(i.element[0], t, {
                                    item: this.currentItem,
                                }) :
                                n(i.options.items, i.element),
                                i,
                            ]),
                            this.containers.push(i));
            for (r = f.length - 1; r >= 0; r--)
                for (o = f[r][1], s = f[r][0], u = 0, l = s.length; l > u; u++)
                    (h = n(s[u])),
                    h.data(this.widgetName + "-item", o),
                    a.push({
                        item: h,
                        instance: o,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0,
                    });
        },
        refreshPositions: function(t) {
            this.floating = this.items.length ?
                "x" === this.options.axis || this._isFloating(this.items[0].item) :
                !1;
            this.offsetParent &&
                this.helper &&
                (this.offset.parent = this._getParentOffset());
            for (var r, f, u, i = this.items.length - 1; i >= 0; i--)
                (r = this.items[i]),
                (r.instance !== this.currentContainer &&
                    this.currentContainer &&
                    r.item[0] !== this.currentItem[0]) ||
                ((f = this.options.toleranceElement ?
                        n(this.options.toleranceElement, r.item) :
                        r.item),
                    t || ((r.width = f.outerWidth()), (r.height = f.outerHeight())),
                    (u = f.offset()),
                    (r.left = u.left),
                    (r.top = u.top));
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--)
                    (u = this.containers[i].element.offset()),
                    (this.containers[i].containerCache.left = u.left),
                    (this.containers[i].containerCache.top = u.top),
                    (this.containers[i].containerCache.width = this.containers[
                        i
                    ].element.outerWidth()),
                    (this.containers[i].containerCache.height = this.containers[
                        i
                    ].element.outerHeight());
            return this;
        },
        _createPlaceholder: function(t) {
            t = t || this;
            var r,
                i = t.options;
            (i.placeholder && i.placeholder.constructor !== String) ||
            ((r = i.placeholder),
                (i.placeholder = {
                    element: function() {
                        var u = t.currentItem[0].nodeName.toLowerCase(),
                            i = n("<" + u + ">", t.document[0]);
                        return (
                            t
                            ._addClass(
                                i,
                                "ui-sortable-placeholder",
                                r || t.currentItem[0].className
                            )
                            ._removeClass(i, "ui-sortable-helper"),
                            "tbody" === u ?
                            t._createTrPlaceholder(
                                t.currentItem.find("tr").eq(0),
                                n("<tr>", t.document[0]).appendTo(i)
                            ) :
                            "tr" === u ?
                            t._createTrPlaceholder(t.currentItem, i) :
                            "img" === u && i.attr("src", t.currentItem.attr("src")),
                            r || i.css("visibility", "hidden"),
                            i
                        );
                    },
                    update: function(n, u) {
                        (!r || i.forcePlaceholderSize) &&
                        (u.height() ||
                            u.height(
                                t.currentItem.innerHeight() -
                                parseInt(t.currentItem.css("paddingTop") || 0, 10) -
                                parseInt(t.currentItem.css("paddingBottom") || 0, 10)
                            ),
                            u.width() ||
                            u.width(
                                t.currentItem.innerWidth() -
                                parseInt(t.currentItem.css("paddingLeft") || 0, 10) -
                                parseInt(t.currentItem.css("paddingRight") || 0, 10)
                            ));
                    },
                }));
            t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem));
            t.currentItem.after(t.placeholder);
            i.placeholder.update(t, t.placeholder);
        },
        _createTrPlaceholder: function(t, i) {
            var r = this;
            t.children().each(function() {
                n("<td>&#160;</td>", r.document[0])
                    .attr("colspan", n(this).attr("colspan") || 1)
                    .appendTo(i);
            });
        },
        _contactContainers: function(t) {
            for (
                var u,
                    c,
                    f,
                    a,
                    v,
                    o,
                    l,
                    s,
                    h,
                    e = null,
                    i = null,
                    r = this.containers.length - 1; r >= 0; r--
            )
                if (!n.contains(this.currentItem[0], this.containers[r].element[0]))
                    if (this._intersectsWith(this.containers[r].containerCache)) {
                        if (e && n.contains(this.containers[r].element[0], e.element[0]))
                            continue;
                        e = this.containers[r];
                        i = r;
                    } else
                        this.containers[r].containerCache.over &&
                        (this.containers[r]._trigger("out", t, this._uiHash(this)),
                            (this.containers[r].containerCache.over = 0));
            if (e)
                if (1 === this.containers.length)
                    this.containers[i].containerCache.over ||
                    (this.containers[i]._trigger("over", t, this._uiHash(this)),
                        (this.containers[i].containerCache.over = 1));
                else {
                    for (
                        c = 1e4,
                        f = null,
                        s = e.floating || this._isFloating(this.currentItem),
                        a = s ? "left" : "top",
                        v = s ? "width" : "height",
                        h = s ? "pageX" : "pageY",
                        u = this.items.length - 1; u >= 0; u--
                    )
                        n.contains(
                            this.containers[i].element[0],
                            this.items[u].item[0]
                        ) &&
                        this.items[u].item[0] !== this.currentItem[0] &&
                        ((o = this.items[u].item.offset()[a]),
                            (l = !1),
                            t[h] - o > this.items[u][v] / 2 && (l = !0),
                            c > Math.abs(t[h] - o) &&
                            ((c = Math.abs(t[h] - o)),
                                (f = this.items[u]),
                                (this.direction = l ? "up" : "down")));
                    if (!f && !this.options.dropOnEmpty) return;
                    if (this.currentContainer === this.containers[i])
                        return (
                            this.currentContainer.containerCache.over ||
                            (this.containers[i]._trigger("over", t, this._uiHash()),
                                (this.currentContainer.containerCache.over = 1)),
                            void 0
                        );
                    f
                        ?
                        this._rearrange(t, f, null, !0) :
                        this._rearrange(t, null, this.containers[i].element, !0);
                    this._trigger("change", t, this._uiHash());
                    this.containers[i]._trigger("change", t, this._uiHash(this));
                    this.currentContainer = this.containers[i];
                    this.options.placeholder.update(
                        this.currentContainer,
                        this.placeholder
                    );
                    this.containers[i]._trigger("over", t, this._uiHash(this));
                    this.containers[i].containerCache.over = 1;
                }
        },
        _createHelper: function(t) {
            var r = this.options,
                i = n.isFunction(r.helper) ?
                n(r.helper.apply(this.element[0], [t, this.currentItem])) :
                "clone" === r.helper ?
                this.currentItem.clone() :
                this.currentItem;
            return (
                i.parents("body").length ||
                n(
                    "parent" !== r.appendTo ?
                    r.appendTo :
                    this.currentItem[0].parentNode
                )[0].appendChild(i[0]),
                i[0] === this.currentItem[0] &&
                (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left"),
                }),
                (!i[0].style.width || r.forceHelperSize) &&
                i.width(this.currentItem.width()),
                (!i[0].style.height || r.forceHelperSize) &&
                i.height(this.currentItem.height()),
                i
            );
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" "));
            n.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 });
            "left" in t && (this.offset.click.left = t.left + this.margins.left);
            "right" in t &&
                (this.offset.click.left =
                    this.helperProportions.width - t.right + this.margins.left);
            "top" in t && (this.offset.click.top = t.top + this.margins.top);
            "bottom" in t &&
                (this.offset.click.top =
                    this.helperProportions.height - t.bottom + this.margins.top);
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return (
                "absolute" === this.cssPosition &&
                this.scrollParent[0] !== this.document[0] &&
                n.contains(this.scrollParent[0], this.offsetParent[0]) &&
                ((t.left += this.scrollParent.scrollLeft()),
                    (t.top += this.scrollParent.scrollTop())),
                (this.offsetParent[0] === this.document[0].body ||
                    (this.offsetParent[0].tagName &&
                        "html" === this.offsetParent[0].tagName.toLowerCase() &&
                        n.ui.ie)) &&
                (t = { top: 0, left: 0 }), {
                    top: t.top +
                        (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left +
                        (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
                }
            );
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var n = this.currentItem.position();
                return {
                    top: n.top -
                        (parseInt(this.helper.css("top"), 10) || 0) +
                        this.scrollParent.scrollTop(),
                    left: n.left -
                        (parseInt(this.helper.css("left"), 10) || 0) +
                        this.scrollParent.scrollLeft(),
                };
            }
            return { top: 0, left: 0 };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight(),
            };
        },
        _setContainment: function() {
            var t,
                r,
                u,
                i = this.options;
            "parent" === i.containment &&
                (i.containment = this.helper[0].parentNode);
            ("document" === i.containment || "window" === i.containment) &&
            (this.containment = [
                0 - this.offset.relative.left - this.offset.parent.left,
                0 - this.offset.relative.top - this.offset.parent.top,
                "document" === i.containment ?
                this.document.width() :
                this.window.width() -
                this.helperProportions.width -
                this.margins.left,
                ("document" === i.containment ?
                    this.document.height() || document.body.parentNode.scrollHeight :
                    this.window.height() ||
                    this.document[0].body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]);
            /^(document|window|parent)$/.test(i.containment) ||
                ((t = n(i.containment)[0]),
                    (r = n(i.containment).offset()),
                    (u = "hidden" !== n(t).css("overflow")),
                    (this.containment = [
                        r.left +
                        (parseInt(n(t).css("borderLeftWidth"), 10) || 0) +
                        (parseInt(n(t).css("paddingLeft"), 10) || 0) -
                        this.margins.left,
                        r.top +
                        (parseInt(n(t).css("borderTopWidth"), 10) || 0) +
                        (parseInt(n(t).css("paddingTop"), 10) || 0) -
                        this.margins.top,
                        r.left +
                        (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) -
                        (parseInt(n(t).css("borderLeftWidth"), 10) || 0) -
                        (parseInt(n(t).css("paddingRight"), 10) || 0) -
                        this.helperProportions.width -
                        this.margins.left,
                        r.top +
                        (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) -
                        (parseInt(n(t).css("borderTopWidth"), 10) || 0) -
                        (parseInt(n(t).css("paddingBottom"), 10) || 0) -
                        this.helperProportions.height -
                        this.margins.top,
                    ]));
        },
        _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var r = "absolute" === t ? 1 : -1,
                u =
                "absolute" !== this.cssPosition ||
                (this.scrollParent[0] !== this.document[0] &&
                    n.contains(this.scrollParent[0], this.offsetParent[0])) ?
                this.scrollParent :
                this.offsetParent,
                f = /(html|body)/i.test(u[0].tagName);
            return {
                top: i.top +
                    this.offset.relative.top * r +
                    this.offset.parent.top * r -
                    ("fixed" === this.cssPosition ?
                        -this.scrollParent.scrollTop() :
                        f ?
                        0 :
                        u.scrollTop()) *
                    r,
                left: i.left +
                    this.offset.relative.left * r +
                    this.offset.parent.left * r -
                    ("fixed" === this.cssPosition ?
                        -this.scrollParent.scrollLeft() :
                        f ?
                        0 :
                        u.scrollLeft()) *
                    r,
            };
        },
        _generatePosition: function(t) {
            var r,
                u,
                i = this.options,
                f = t.pageX,
                e = t.pageY,
                o =
                "absolute" !== this.cssPosition ||
                (this.scrollParent[0] !== this.document[0] &&
                    n.contains(this.scrollParent[0], this.offsetParent[0])) ?
                this.scrollParent :
                this.offsetParent,
                s = /(html|body)/i.test(o[0].tagName);
            return (
                "relative" !== this.cssPosition ||
                (this.scrollParent[0] !== this.document[0] &&
                    this.scrollParent[0] !== this.offsetParent[0]) ||
                (this.offset.relative = this._getRelativeOffset()),
                this.originalPosition &&
                (this.containment &&
                    (t.pageX - this.offset.click.left < this.containment[0] &&
                        (f = this.containment[0] + this.offset.click.left),
                        t.pageY - this.offset.click.top < this.containment[1] &&
                        (e = this.containment[1] + this.offset.click.top),
                        t.pageX - this.offset.click.left > this.containment[2] &&
                        (f = this.containment[2] + this.offset.click.left),
                        t.pageY - this.offset.click.top > this.containment[3] &&
                        (e = this.containment[3] + this.offset.click.top)),
                    i.grid &&
                    ((r =
                            this.originalPageY +
                            Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1]),
                        (e = this.containment ?
                            r - this.offset.click.top >= this.containment[1] &&
                            r - this.offset.click.top <= this.containment[3] ?
                            r :
                            r - this.offset.click.top >= this.containment[1] ?
                            r - i.grid[1] :
                            r + i.grid[1] :
                            r),
                        (u =
                            this.originalPageX +
                            Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0]),
                        (f = this.containment ?
                            u - this.offset.click.left >= this.containment[0] &&
                            u - this.offset.click.left <= this.containment[2] ?
                            u :
                            u - this.offset.click.left >= this.containment[0] ?
                            u - i.grid[0] :
                            u + i.grid[0] :
                            u))), {
                    top: e -
                        this.offset.click.top -
                        this.offset.relative.top -
                        this.offset.parent.top +
                        ("fixed" === this.cssPosition ?
                            -this.scrollParent.scrollTop() :
                            s ?
                            0 :
                            o.scrollTop()),
                    left: f -
                        this.offset.click.left -
                        this.offset.relative.left -
                        this.offset.parent.left +
                        ("fixed" === this.cssPosition ?
                            -this.scrollParent.scrollLeft() :
                            s ?
                            0 :
                            o.scrollLeft()),
                }
            );
        },
        _rearrange: function(n, t, i, r) {
            i
                ?
                i[0].appendChild(this.placeholder[0]) :
                t.item[0].parentNode.insertBefore(
                    this.placeholder[0],
                    "down" === this.direction ? t.item[0] : t.item[0].nextSibling
                );
            this.counter = this.counter ? ++this.counter : 1;
            var u = this.counter;
            this._delay(function() {
                u === this.counter && this.refreshPositions(!r);
            });
        },
        _clear: function(n, t) {
            function u(n, t, i) {
                return function(r) {
                    i._trigger(n, r, t._uiHash(t));
                };
            }
            this.reverting = !1;
            var i,
                r = [];
            if (
                (!this._noFinalSort &&
                    this.currentItem.parent().length &&
                    this.placeholder.before(this.currentItem),
                    (this._noFinalSort = null),
                    this.helper[0] === this.currentItem[0])
            ) {
                for (i in this._storedCSS)
                    ("auto" === this._storedCSS[i] ||
                        "static" === this._storedCSS[i]) &&
                    (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS);
                this._removeClass(this.currentItem, "ui-sortable-helper");
            } else this.currentItem.show();
            for (
                this.fromOutside &&
                !t &&
                r.push(function(n) {
                    this._trigger("receive", n, this._uiHash(this.fromOutside));
                }),
                (!this.fromOutside &&
                    this.domPosition.prev ===
                    this.currentItem.prev().not(".ui-sortable-helper")[0] &&
                    this.domPosition.parent === this.currentItem.parent()[0]) ||
                t ||
                r.push(function(n) {
                    this._trigger("update", n, this._uiHash());
                }),
                this !== this.currentContainer &&
                (t ||
                    (r.push(function(n) {
                            this._trigger("remove", n, this._uiHash());
                        }),
                        r.push(
                            function(n) {
                                return function(t) {
                                    n._trigger("receive", t, this._uiHash(this));
                                };
                            }.call(this, this.currentContainer)
                        ),
                        r.push(
                            function(n) {
                                return function(t) {
                                    n._trigger("update", t, this._uiHash(this));
                                };
                            }.call(this, this.currentContainer)
                        ))),
                i = this.containers.length - 1; i >= 0; i--
            )
                t || r.push(u("deactivate", this, this.containers[i])),
                this.containers[i].containerCache.over &&
                (r.push(u("out", this, this.containers[i])),
                    (this.containers[i].containerCache.over = 0));
            if (
                (this.storedCursor &&
                    (this.document.find("body").css("cursor", this.storedCursor),
                        this.storedStylesheet.remove()),
                    this._storedOpacity &&
                    this.helper.css("opacity", this._storedOpacity),
                    this._storedZIndex &&
                    this.helper.css(
                        "zIndex",
                        "auto" === this._storedZIndex ? "" : this._storedZIndex
                    ),
                    (this.dragging = !1),
                    t || this._trigger("beforeStop", n, this._uiHash()),
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                    this.cancelHelperRemoval ||
                    (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
                        (this.helper = null)), !t)
            ) {
                for (i = 0; r.length > i; i++) r[i].call(this, n);
                this._trigger("stop", n, this._uiHash());
            }
            return (this.fromOutside = !1), !this.cancelHelperRemoval;
        },
        _trigger: function() {
            n.Widget.prototype._trigger.apply(this, arguments) === !1 &&
                this.cancel();
        },
        _uiHash: function(t) {
            var i = t || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || n([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: t ? t.element : null,
            };
        },
    });
    n.widget("ui.spinner", {
        version: "1.12.1",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            classes: {
                "ui-spinner": "ui-corner-all",
                "ui-spinner-down": "ui-corner-br",
                "ui-spinner-up": "ui-corner-tr",
            },
            culture: null,
            icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null,
        },
        _create: function() {
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step", this.options.step);
            "" !== this.value() && this._value(this.element.val(), !0);
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                },
            });
        },
        _getCreateOptions: function() {
            var t = this._super(),
                i = this.element;
            return (
                n.each(["min", "max", "step"], function(n, r) {
                    var u = i.attr(r);
                    null != u && u.length && (t[r] = u);
                }),
                t
            );
        },
        _events: {
            keydown: function(n) {
                this._start(n) && this._keydown(n) && n.preventDefault();
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val();
            },
            blur: function(n) {
                return this.cancelBlur ?
                    (delete this.cancelBlur, void 0) :
                    (this._stop(),
                        this._refresh(),
                        this.previous !== this.element.val() &&
                        this._trigger("change", n),
                        void 0);
            },
            mousewheel: function(n, t) {
                if (t) {
                    if (!this.spinning && !this._start(n)) return !1;
                    this._spin((t > 0 ? 1 : -1) * this.options.step, n);
                    clearTimeout(this.mousewheelTimer);
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(n);
                    }, 100);
                    n.preventDefault();
                }
            },
            "mousedown .ui-spinner-button": function(t) {
                function r() {
                    var t =
                        this.element[0] === n.ui.safeActiveElement(this.document[0]);
                    t ||
                        (this.element.trigger("focus"),
                            (this.previous = i),
                            this._delay(function() {
                                this.previous = i;
                            }));
                }
                var i;
                i =
                    this.element[0] === n.ui.safeActiveElement(this.document[0]) ?
                    this.previous :
                    this.element.val();
                t.preventDefault();
                r.call(this);
                this.cancelBlur = !0;
                this._delay(function() {
                    delete this.cancelBlur;
                    r.call(this);
                });
                this._start(t) !== !1 &&
                    this._repeat(
                        null,
                        n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                        t
                    );
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(t) {
                if (n(t.currentTarget).hasClass("ui-state-active"))
                    return this._start(t) === !1 ?
                        !1 :
                        (this._repeat(
                                null,
                                n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
                                t
                            ),
                            void 0);
            },
            "mouseleave .ui-spinner-button": "_stop",
        },
        _enhance: function() {
            this.uiSpinner = this.element
                .attr("autocomplete", "off")
                .wrap("<span>")
                .parent()
                .append("<a></a><a></a>");
        },
        _draw: function() {
            this._enhance();
            this._addClass(
                this.uiSpinner,
                "ui-spinner",
                "ui-widget ui-widget-content"
            );
            this._addClass("ui-spinner-input");
            this.element.attr("role", "spinbutton");
            this.buttons = this.uiSpinner
                .children("a")
                .attr("tabIndex", -1)
                .attr("aria-hidden", !0)
                .button({ classes: { "ui-button": "" } });
            this._removeClass(this.buttons, "ui-corner-all");
            this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up");
            this._addClass(
                this.buttons.last(),
                "ui-spinner-button ui-spinner-down"
            );
            this.buttons
                .first()
                .button({ icon: this.options.icons.up, showLabel: !1 });
            this.buttons
                .last()
                .button({ icon: this.options.icons.down, showLabel: !1 });
            this.buttons.height() > Math.ceil(0.5 * this.uiSpinner.height()) &&
                this.uiSpinner.height() > 0 &&
                this.uiSpinner.height(this.uiSpinner.height());
        },
        _keydown: function(t) {
            var r = this.options,
                i = n.ui.keyCode;
            switch (t.keyCode) {
                case i.UP:
                    return this._repeat(null, 1, t), !0;
                case i.DOWN:
                    return this._repeat(null, -1, t), !0;
                case i.PAGE_UP:
                    return this._repeat(null, r.page, t), !0;
                case i.PAGE_DOWN:
                    return this._repeat(null, -r.page, t), !0;
            }
            return !1;
        },
        _start: function(n) {
            return this.spinning || this._trigger("start", n) !== !1 ?
                (this.counter || (this.counter = 1), (this.spinning = !0), !0) :
                !1;
        },
        _repeat: function(n, t, i) {
            n = n || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                this._repeat(40, t, i);
            }, n);
            this._spin(t * this.options.step, i);
        },
        _spin: function(n, t) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1);
            i = this._adjustValue(i + n * this._increment(this.counter));
            (this.spinning && this._trigger("spin", t, { value: i }) === !1) ||
            (this._value(i), this.counter++);
        },
        _increment: function(t) {
            var i = this.options.incremental;
            return i ?
                n.isFunction(i) ?
                i(t) :
                Math.floor((t * t * t) / 5e4 - (t * t) / 500 + (17 * t) / 200 + 1) :
                1;
        },
        _precision: function() {
            var n = this._precisionOf(this.options.step);
            return (
                null !== this.options.min &&
                (n = Math.max(n, this._precisionOf(this.options.min))),
                n
            );
        },
        _precisionOf: function(n) {
            var t = "" + n,
                i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1;
        },
        _adjustValue: function(n) {
            var r,
                i,
                t = this.options;
            return (
                (r = null !== t.min ? t.min : 0),
                (i = n - r),
                (i = Math.round(i / t.step) * t.step),
                (n = r + i),
                (n = parseFloat(n.toFixed(this._precision()))),
                null !== t.max && n > t.max ?
                t.max :
                null !== t.min && t.min > n ?
                t.min :
                n
            );
        },
        _stop: function(n) {
            this.spinning &&
                (clearTimeout(this.timer),
                    clearTimeout(this.mousewheelTimer),
                    (this.counter = 0),
                    (this.spinning = !1),
                    this._trigger("stop", n));
        },
        _setOption: function(n, t) {
            var u, i, r;
            return "culture" === n || "numberFormat" === n ?
                ((u = this._parse(this.element.val())),
                    (this.options[n] = t),
                    this.element.val(this._format(u)),
                    void 0) :
                (("max" === n || "min" === n || "step" === n) &&
                    "string" == typeof t &&
                    (t = this._parse(t)),
                    "icons" === n &&
                    ((i = this.buttons.first().find(".ui-icon")),
                        this._removeClass(i, null, this.options.icons.up),
                        this._addClass(i, null, t.up),
                        (r = this.buttons.last().find(".ui-icon")),
                        this._removeClass(r, null, this.options.icons.down),
                        this._addClass(r, null, t.down)),
                    this._super(n, t),
                    void 0);
        },
        _setOptionDisabled: function(n) {
            this._super(n);
            this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!n);
            this.element.prop("disabled", !!n);
            this.buttons.button(n ? "disable" : "enable");
        },
        _setOptions: t(function(n) {
            this._super(n);
        }),
        _parse: function(n) {
            return (
                "string" == typeof n &&
                "" !== n &&
                (n =
                    window.Globalize && this.options.numberFormat ?
                    Globalize.parseFloat(n, 10, this.options.culture) :
                    +n),
                "" === n || isNaN(n) ? null : n
            );
        },
        _format: function(n) {
            return "" === n ?
                "" :
                window.Globalize && this.options.numberFormat ?
                Globalize.format(n, this.options.numberFormat, this.options.culture) :
                n;
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val()),
            });
        },
        isValid: function() {
            var n = this.value();
            return null === n ? !1 : n === this._adjustValue(n);
        },
        _value: function(n, t) {
            var i;
            "" !== n &&
                ((i = this._parse(n)),
                    null !== i &&
                    (t || (i = this._adjustValue(i)), (n = this._format(i))));
            this.element.val(n);
            this._refresh();
        },
        _destroy: function() {
            this.element
                .prop("disabled", !1)
                .removeAttr(
                    "autocomplete role aria-valuemin aria-valuemax aria-valuenow"
                );
            this.uiSpinner.replaceWith(this.element);
        },
        stepUp: t(function(n) {
            this._stepUp(n);
        }),
        _stepUp: function(n) {
            this._start() &&
                (this._spin((n || 1) * this.options.step), this._stop());
        },
        stepDown: t(function(n) {
            this._stepDown(n);
        }),
        _stepDown: function(n) {
            this._start() &&
                (this._spin((n || 1) * -this.options.step), this._stop());
        },
        pageUp: t(function(n) {
            this._stepUp((n || 1) * this.options.page);
        }),
        pageDown: t(function(n) {
            this._stepDown((n || 1) * this.options.page);
        }),
        value: function(n) {
            return arguments.length ?
                (t(this._value).call(this, n), void 0) :
                this._parse(this.element.val());
        },
        widget: function() {
            return this.uiSpinner;
        },
    });
    n.uiBackCompat !== !1 &&
        n.widget("ui.spinner", n.ui.spinner, {
            _enhance: function() {
                this.uiSpinner = this.element
                    .attr("autocomplete", "off")
                    .wrap(this._uiSpinnerHtml())
                    .parent()
                    .append(this._buttonHtml());
            },
            _uiSpinnerHtml: function() {
                return "<span>";
            },
            _buttonHtml: function() {
                return "<a></a><a></a>";
            },
        });
    n.ui.spinner;
    n.widget("ui.tabs", {
        version: "1.12.1",
        delay: 300,
        options: {
            active: null,
            classes: {
                "ui-tabs": "ui-corner-all",
                "ui-tabs-nav": "ui-corner-all",
                "ui-tabs-panel": "ui-corner-bottom",
                "ui-tabs-tab": "ui-corner-top",
            },
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null,
        },
        _isLocal: (function() {
            var n = /#.*$/;
            return function(t) {
                var i, r;
                i = t.href.replace(n, "");
                r = location.href.replace(n, "");
                try {
                    i = decodeURIComponent(i);
                } catch (u) {}
                try {
                    r = decodeURIComponent(r);
                } catch (u) {}
                return t.hash.length > 1 && i === r;
            };
        })(),
        _create: function() {
            var i = this,
                t = this.options;
            this.running = !1;
            this._addClass("ui-tabs", "ui-widget ui-widget-content");
            this._toggleClass("ui-tabs-collapsible", null, t.collapsible);
            this._processTabs();
            t.active = this._initialActive();
            n.isArray(t.disabled) &&
                (t.disabled = n
                    .unique(
                        t.disabled.concat(
                            n.map(this.tabs.filter(".ui-state-disabled"), function(n) {
                                return i.tabs.index(n);
                            })
                        )
                    )
                    .sort());
            this.active =
                this.options.active !== !1 && this.anchors.length ?
                this._findActive(t.active) :
                n();
            this._refresh();
            this.active.length && this.load(t.active);
        },
        _initialActive: function() {
            var t = this.options.active,
                i = this.options.collapsible,
                r = location.hash.substring(1);
            return (
                null === t &&
                (r &&
                    this.tabs.each(function(i, u) {
                        if (n(u).attr("aria-controls") === r) return (t = i), !1;
                    }),
                    null === t &&
                    (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
                    (null === t || -1 === t) && (t = this.tabs.length ? 0 : !1)),
                t !== !1 &&
                ((t = this.tabs.index(this.tabs.eq(t))), -1 === t && (t = i ? !1 : 0)), !i && t === !1 && this.anchors.length && (t = 0),
                t
            );
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : n(),
            };
        },
        _tabKeydown: function(t) {
            var r = n(n.ui.safeActiveElement(this.document[0])).closest("li"),
                i = this.tabs.index(r),
                u = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                        i++;
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.LEFT:
                        u = !1;
                        i--;
                        break;
                    case n.ui.keyCode.END:
                        i = this.anchors.length - 1;
                        break;
                    case n.ui.keyCode.HOME:
                        i = 0;
                        break;
                    case n.ui.keyCode.SPACE:
                        return (
                            t.preventDefault(),
                            clearTimeout(this.activating),
                            this._activate(i),
                            void 0
                        );
                    case n.ui.keyCode.ENTER:
                        return (
                            t.preventDefault(),
                            clearTimeout(this.activating),
                            this._activate(i === this.options.active ? !1 : i),
                            void 0
                        );
                    default:
                        return;
                }
                t.preventDefault();
                clearTimeout(this.activating);
                i = this._focusNextTab(i, u);
                t.ctrlKey ||
                    t.metaKey ||
                    (r.attr("aria-selected", "false"),
                        this.tabs.eq(i).attr("aria-selected", "true"),
                        (this.activating = this._delay(function() {
                            this.option("active", i);
                        }, this.delay)));
            }
        },
        _panelKeydown: function(t) {
            this._handlePageNav(t) ||
                (t.ctrlKey &&
                    t.keyCode === n.ui.keyCode.UP &&
                    (t.preventDefault(), this.active.trigger("focus")));
        },
        _handlePageNav: function(t) {
            return t.altKey && t.keyCode === n.ui.keyCode.PAGE_UP ?
                (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) :
                t.altKey && t.keyCode === n.ui.keyCode.PAGE_DOWN ?
                (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) :
                void 0;
        },
        _findNextTab: function(t, i) {
            function u() {
                return t > r && (t = 0), 0 > t && (t = r), t;
            }
            for (
                var r = this.tabs.length - 1; -
                1 !== n.inArray(u(), this.options.disabled);

            )
                t = i ? t + 1 : t - 1;
            return t;
        },
        _focusNextTab: function(n, t) {
            return (
                (n = this._findNextTab(n, t)), this.tabs.eq(n).trigger("focus"), n
            );
        },
        _setOption: function(n, t) {
            return "active" === n ?
                (this._activate(t), void 0) :
                (this._super(n, t),
                    "collapsible" === n &&
                    (this._toggleClass("ui-tabs-collapsible", null, t),
                        t || this.options.active !== !1 || this._activate(0)),
                    "event" === n && this._setupEvents(t),
                    "heightStyle" === n && this._setupHeightStyle(t),
                    void 0);
        },
        _sanitizeSelector: function(n) {
            return n ?
                n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") :
                "";
        },
        refresh: function() {
            var t = this.options,
                i = this.tablist.children(":has(a[href])");
            t.disabled = n.map(i.filter(".ui-state-disabled"), function(n) {
                return i.index(n);
            });
            this._processTabs();
            t.active !== !1 && this.anchors.length ?
                this.active.length && !n.contains(this.tablist[0], this.active[0]) ?
                this.tabs.length === t.disabled.length ?
                ((t.active = !1), (this.active = n())) :
                this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) :
                (t.active = this.tabs.index(this.active)) :
                ((t.active = !1), (this.active = n()));
            this._refresh();
        },
        _refresh: function() {
            this._setOptionDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs
                .not(this.active)
                .attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1,
                });
            this.panels
                .not(this._getPanelForTab(this.active))
                .hide()
                .attr({ "aria-hidden": "true" });
            this.active.length ?
                (this.active.attr({
                        "aria-selected": "true",
                        "aria-expanded": "true",
                        tabIndex: 0,
                    }),
                    this._addClass(this.active, "ui-tabs-active", "ui-state-active"),
                    this._getPanelForTab(this.active)
                    .show()
                    .attr({ "aria-hidden": "false" })) :
                this.tabs.eq(0).attr("tabIndex", 0);
        },
        _processTabs: function() {
            var t = this,
                i = this.tabs,
                r = this.anchors,
                u = this.panels;
            this.tablist = this._getList().attr("role", "tablist");
            this._addClass(
                this.tablist,
                "ui-tabs-nav",
                "ui-helper-reset ui-helper-clearfix ui-widget-header"
            );
            this.tablist
                .on("mousedown" + this.eventNamespace, "> li", function(t) {
                    n(this).is(".ui-state-disabled") && t.preventDefault();
                })
                .on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                    n(this).closest("li").is(".ui-state-disabled") && this.blur();
                });
            this.tabs = this.tablist
                .find("> li:has(a[href])")
                .attr({ role: "tab", tabIndex: -1 });
            this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default");
            this.anchors = this.tabs
                .map(function() {
                    return n("a", this)[0];
                })
                .attr({ role: "presentation", tabIndex: -1 });
            this._addClass(this.anchors, "ui-tabs-anchor");
            this.panels = n();
            this.anchors.each(function(i, r) {
                var f,
                    u,
                    e,
                    s = n(r).uniqueId().attr("id"),
                    o = n(r).closest("li"),
                    h = o.attr("aria-controls");
                t._isLocal(r) ?
                    ((f = r.hash),
                        (e = f.substring(1)),
                        (u = t.element.find(t._sanitizeSelector(f)))) :
                    ((e = o.attr("aria-controls") || n({}).uniqueId()[0].id),
                        (f = "#" + e),
                        (u = t.element.find(f)),
                        u.length ||
                        ((u = t._createPanel(e)),
                            u.insertAfter(t.panels[i - 1] || t.tablist)),
                        u.attr("aria-live", "polite"));
                u.length && (t.panels = t.panels.add(u));
                h && o.data("ui-tabs-aria-controls", h);
                o.attr({ "aria-controls": e, "aria-labelledby": s });
                u.attr("aria-labelledby", s);
            });
            this.panels.attr("role", "tabpanel");
            this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content");
            i &&
                (this._off(i.not(this.tabs)),
                    this._off(r.not(this.anchors)),
                    this._off(u.not(this.panels)));
        },
        _getList: function() {
            return this.tablist || this.element.find("ol, ul").eq(0);
        },
        _createPanel: function(t) {
            return n("<div>").attr("id", t).data("ui-tabs-destroy", !0);
        },
        _setOptionDisabled: function(t) {
            var i, u, r;
            for (
                n.isArray(t) &&
                (t.length ?
                    t.length === this.anchors.length && (t = !0) :
                    (t = !1)),
                r = 0;
                (u = this.tabs[r]); r++
            )
                (i = n(u)),
                t === !0 || -1 !== n.inArray(r, t) ?
                (i.attr("aria-disabled", "true"),
                    this._addClass(i, null, "ui-state-disabled")) :
                (i.removeAttr("aria-disabled"),
                    this._removeClass(i, null, "ui-state-disabled"));
            this.options.disabled = t;
            this._toggleClass(
                this.widget(),
                this.widgetFullName + "-disabled",
                null,
                t === !0
            );
        },
        _setupEvents: function(t) {
            var i = {};
            t &&
                n.each(t.split(" "), function(n, t) {
                    i[t] = "_eventHandler";
                });
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(!0, this.anchors, {
                click: function(n) {
                    n.preventDefault();
                },
            });
            this._on(this.anchors, i);
            this._on(this.tabs, { keydown: "_tabKeydown" });
            this._on(this.panels, { keydown: "_panelKeydown" });
            this._focusable(this.tabs);
            this._hoverable(this.tabs);
        },
        _setupHeightStyle: function(t) {
            var i,
                r = this.element.parent();
            "fill" === t
                ?
                ((i = r.height()),
                    (i -= this.element.outerHeight() - this.element.height()),
                    this.element.siblings(":visible").each(function() {
                        var t = n(this),
                            r = t.css("position");
                        "absolute" !== r && "fixed" !== r && (i -= t.outerHeight(!0));
                    }),
                    this.element
                    .children()
                    .not(this.panels)
                    .each(function() {
                        i -= n(this).outerHeight(!0);
                    }),
                    this.panels
                    .each(function() {
                        n(this).height(
                            Math.max(0, i - n(this).innerHeight() + n(this).height())
                        );
                    })
                    .css("overflow", "auto")) :
                "auto" === t &&
                ((i = 0),
                    this.panels
                    .each(function() {
                        i = Math.max(i, n(this).height("").height());
                    })
                    .height(i));
        },
        _eventHandler: function(t) {
            var u = this.options,
                r = this.active,
                c = n(t.currentTarget),
                i = c.closest("li"),
                f = i[0] === r[0],
                e = f && u.collapsible,
                o = e ? n() : this._getPanelForTab(i),
                s = r.length ? this._getPanelForTab(r) : n(),
                h = { oldTab: r, oldPanel: s, newTab: e ? n() : i, newPanel: o };
            t.preventDefault();
            i.hasClass("ui-state-disabled") ||
                i.hasClass("ui-tabs-loading") ||
                this.running ||
                (f && !u.collapsible) ||
                this._trigger("beforeActivate", t, h) === !1 ||
                ((u.active = e ? !1 : this.tabs.index(i)),
                    (this.active = f ? n() : i),
                    this.xhr && this.xhr.abort(),
                    s.length ||
                    o.length ||
                    n.error("jQuery UI Tabs: Mismatching fragment identifier."),
                    o.length && this.load(this.tabs.index(i), t),
                    this._toggle(t, h));
        },
        _toggle: function(t, i) {
            function e() {
                r.running = !1;
                r._trigger("activate", t, i);
            }

            function o() {
                r._addClass(
                    i.newTab.closest("li"),
                    "ui-tabs-active",
                    "ui-state-active"
                );
                u.length && r.options.show ?
                    r._show(u, r.options.show, e) :
                    (u.show(), e());
            }
            var r = this,
                u = i.newPanel,
                f = i.oldPanel;
            this.running = !0;
            f.length && this.options.hide ?
                this._hide(f, this.options.hide, function() {
                    r._removeClass(
                        i.oldTab.closest("li"),
                        "ui-tabs-active",
                        "ui-state-active"
                    );
                    o();
                }) :
                (this._removeClass(
                        i.oldTab.closest("li"),
                        "ui-tabs-active",
                        "ui-state-active"
                    ),
                    f.hide(),
                    o());
            f.attr("aria-hidden", "true");
            i.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" });
            u.length && f.length ?
                i.oldTab.attr("tabIndex", -1) :
                u.length &&
                this.tabs
                .filter(function() {
                    return 0 === n(this).attr("tabIndex");
                })
                .attr("tabIndex", -1);
            u.attr("aria-hidden", "false");
            i.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
            });
        },
        _activate: function(t) {
            var r,
                i = this._findActive(t);
            i[0] !== this.active[0] &&
                (i.length || (i = this.active),
                    (r = i.find(".ui-tabs-anchor")[0]),
                    this._eventHandler({
                        target: r,
                        currentTarget: r,
                        preventDefault: n.noop,
                    }));
        },
        _findActive: function(t) {
            return t === !1 ? n() : this.tabs.eq(t);
        },
        _getIndex: function(t) {
            return (
                "string" == typeof t &&
                (t = this.anchors.index(
                    this.anchors.filter("[href$='" + n.ui.escapeSelector(t) + "']")
                )),
                t
            );
        },
        _destroy: function() {
            this.xhr && this.xhr.abort();
            this.tablist.removeAttr("role").off(this.eventNamespace);
            this.anchors.removeAttr("role tabIndex").removeUniqueId();
            this.tabs.add(this.panels).each(function() {
                n.data(this, "ui-tabs-destroy") ?
                    n(this).remove() :
                    n(this).removeAttr(
                        "role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded"
                    );
            });
            this.tabs.each(function() {
                var t = n(this),
                    i = t.data("ui-tabs-aria-controls");
                i
                    ?
                    t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") :
                    t.removeAttr("aria-controls");
            });
            this.panels.show();
            "content" !== this.options.heightStyle && this.panels.css("height", "");
        },
        enable: function(t) {
            var i = this.options.disabled;
            i !== !1 &&
                (void 0 === t ?
                    (i = !1) :
                    ((t = this._getIndex(t)),
                        (i = n.isArray(i) ?
                            n.map(i, function(n) {
                                return n !== t ? n : null;
                            }) :
                            n.map(this.tabs, function(n, i) {
                                return i !== t ? i : null;
                            }))),
                    this._setOptionDisabled(i));
        },
        disable: function(t) {
            var i = this.options.disabled;
            if (i !== !0) {
                if (void 0 === t) i = !0;
                else {
                    if (((t = this._getIndex(t)), -1 !== n.inArray(t, i))) return;
                    i = n.isArray(i) ? n.merge([t], i).sort() : [t];
                }
                this._setOptionDisabled(i);
            }
        },
        load: function(t, i) {
            t = this._getIndex(t);
            var r = this,
                u = this.tabs.eq(t),
                e = u.find(".ui-tabs-anchor"),
                f = this._getPanelForTab(u),
                o = { tab: u, panel: f },
                s = function(n, t) {
                    "abort" === t && r.panels.stop(!1, !0);
                    r._removeClass(u, "ui-tabs-loading");
                    f.removeAttr("aria-busy");
                    n === r.xhr && delete r.xhr;
                };
            this._isLocal(e[0]) ||
                ((this.xhr = n.ajax(this._ajaxSettings(e, i, o))),
                    this.xhr &&
                    "canceled" !== this.xhr.statusText &&
                    (this._addClass(u, "ui-tabs-loading"),
                        f.attr("aria-busy", "true"),
                        this.xhr
                        .done(function(n, t, u) {
                            setTimeout(function() {
                                f.html(n);
                                r._trigger("load", i, o);
                                s(u, t);
                            }, 1);
                        })
                        .fail(function(n, t) {
                            setTimeout(function() {
                                s(n, t);
                            }, 1);
                        })));
        },
        _ajaxSettings: function(t, i, r) {
            var u = this;
            return {
                url: t.attr("href").replace(/#.*$/, ""),
                beforeSend: function(t, f) {
                    return u._trigger(
                        "beforeLoad",
                        i,
                        n.extend({ jqXHR: t, ajaxSettings: f }, r)
                    );
                },
            };
        },
        _getPanelForTab: function(t) {
            var i = n(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i));
        },
    });
    n.uiBackCompat !== !1 &&
        n.widget("ui.tabs", n.ui.tabs, {
            _processTabs: function() {
                this._superApply(arguments);
                this._addClass(this.tabs, "ui-tab");
            },
        });
    n.ui.tabs;
    n.widget("ui.tooltip", {
        version: "1.12.1",
        options: {
            classes: { "ui-tooltip": "ui-corner-all ui-widget-shadow" },
            content: function() {
                var t = n(this).attr("title") || "";
                return n("<a>").text(t).html();
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip",
            },
            show: !0,
            track: !1,
            close: null,
            open: null,
        },
        _addDescribedBy: function(t, i) {
            var r = (t.attr("aria-describedby") || "").split(/\s+/);
            r.push(i);
            t.data("ui-tooltip-id", i).attr(
                "aria-describedby",
                n.trim(r.join(" "))
            );
        },
        _removeDescribedBy: function(t) {
            var u = t.data("ui-tooltip-id"),
                i = (t.attr("aria-describedby") || "").split(/\s+/),
                r = n.inArray(u, i); -
            1 !== r && i.splice(r, 1);
            t.removeData("ui-tooltip-id");
            i = n.trim(i.join(" "));
            i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby");
        },
        _create: function() {
            this._on({ mouseover: "open", focusin: "open" });
            this.tooltips = {};
            this.parents = {};
            this.liveRegion = n("<div>")
                .attr({
                    role: "log",
                    "aria-live": "assertive",
                    "aria-relevant": "additions",
                })
                .appendTo(this.document[0].body);
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
            this.disabledTitles = n([]);
        },
        _setOption: function(t, i) {
            var r = this;
            this._super(t, i);
            "content" === t &&
                n.each(this.tooltips, function(n, t) {
                    r._updateContent(t.element);
                });
        },
        _setOptionDisabled: function(n) {
            this[n ? "_disable" : "_enable"]();
        },
        _disable: function() {
            var t = this;
            n.each(this.tooltips, function(i, r) {
                var u = n.Event("blur");
                u.target = u.currentTarget = r.element[0];
                t.close(u, !0);
            });
            this.disabledTitles = this.disabledTitles.add(
                this.element
                .find(this.options.items)
                .addBack()
                .filter(function() {
                    var t = n(this);
                    if (t.is("[title]"))
                        return t
                            .data("ui-tooltip-title", t.attr("title"))
                            .removeAttr("title");
                })
            );
        },
        _enable: function() {
            this.disabledTitles.each(function() {
                var t = n(this);
                t.data("ui-tooltip-title") &&
                    t.attr("title", t.data("ui-tooltip-title"));
            });
            this.disabledTitles = n([]);
        },
        open: function(t) {
            var r = this,
                i = n(t ? t.target : this.element).closest(this.options.items);
            i.length &&
                !i.data("ui-tooltip-id") &&
                (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")),
                    i.data("ui-tooltip-open", !0),
                    t &&
                    "mouseover" === t.type &&
                    i.parents().each(function() {
                        var i,
                            t = n(this);
                        t.data("ui-tooltip-open") &&
                            ((i = n.Event("blur")),
                                (i.target = i.currentTarget = this),
                                r.close(i, !0));
                        t.attr("title") &&
                            (t.uniqueId(),
                                (r.parents[this.id] = {
                                    element: this,
                                    title: t.attr("title"),
                                }),
                                t.attr("title", ""));
                    }),
                    this._registerCloseHandlers(t, i),
                    this._updateContent(i, t));
        },
        _updateContent: function(n, t) {
            var r,
                i = this.options.content,
                u = this,
                f = t ? t.type : null;
            return "string" == typeof i || i.nodeType || i.jquery ?
                this._open(t, n, i) :
                ((r = i.call(n[0], function(i) {
                        u._delay(function() {
                            n.data("ui-tooltip-open") &&
                                (t && (t.type = f), this._open(t, n, i));
                        });
                    })),
                    r && this._open(t, n, r),
                    void 0);
        },
        _open: function(t, i, r) {
            function o(n) {
                s.of = n;
                u.is(":hidden") || u.position(s);
            }
            var f,
                u,
                h,
                e,
                s = n.extend({}, this.options.position);
            if (r) {
                if ((f = this._find(i)))
                    return f.tooltip.find(".ui-tooltip-content").html(r), void 0;
                i.is("[title]") &&
                    (t && "mouseover" === t.type ?
                        i.attr("title", "") :
                        i.removeAttr("title"));
                f = this._tooltip(i);
                u = f.tooltip;
                this._addDescribedBy(i, u.attr("id"));
                u.find(".ui-tooltip-content").html(r);
                this.liveRegion.children().hide();
                e = n("<div>").html(u.find(".ui-tooltip-content").html());
                e.removeAttr("name").find("[name]").removeAttr("name");
                e.removeAttr("id").find("[id]").removeAttr("id");
                e.appendTo(this.liveRegion);
                this.options.track && t && /^mouse/.test(t.type) ?
                    (this._on(this.document, { mousemove: o }), o(t)) :
                    u.position(n.extend({ of: i }, this.options.position));
                u.hide();
                this._show(u, this.options.show);
                this.options.track &&
                    this.options.show &&
                    this.options.show.delay &&
                    (h = this.delayedShow = setInterval(function() {
                        u.is(":visible") && (o(s.of), clearInterval(h));
                    }, n.fx.interval));
                this._trigger("open", t, { tooltip: u });
            }
        },
        _registerCloseHandlers: function(t, i) {
            var r = {
                keyup: function(t) {
                    if (t.keyCode === n.ui.keyCode.ESCAPE) {
                        var r = n.Event(t);
                        r.currentTarget = i[0];
                        this.close(r, !0);
                    }
                },
            };
            i[0] !== this.element[0] &&
                (r.remove = function() {
                    this._removeTooltip(this._find(i).tooltip);
                });
            (t && "mouseover" !== t.type) || (r.mouseleave = "close");
            (t && "focusin" !== t.type) || (r.focusout = "close");
            this._on(!0, i, r);
        },
        close: function(t) {
            var u,
                f = this,
                i = n(t ? t.currentTarget : this.element),
                r = this._find(i);
            return r ?
                ((u = r.tooltip),
                    r.closing ||
                    (clearInterval(this.delayedShow),
                        i.data("ui-tooltip-title") &&
                        !i.attr("title") &&
                        i.attr("title", i.data("ui-tooltip-title")),
                        this._removeDescribedBy(i),
                        (r.hiding = !0),
                        u.stop(!0),
                        this._hide(u, this.options.hide, function() {
                            f._removeTooltip(n(this));
                        }),
                        i.removeData("ui-tooltip-open"),
                        this._off(i, "mouseleave focusout keyup"),
                        i[0] !== this.element[0] && this._off(i, "remove"),
                        this._off(this.document, "mousemove"),
                        t &&
                        "mouseleave" === t.type &&
                        n.each(this.parents, function(t, i) {
                            n(i.element).attr("title", i.title);
                            delete f.parents[t];
                        }),
                        (r.closing = !0),
                        this._trigger("close", t, { tooltip: u }),
                        r.hiding || (r.closing = !1)),
                    void 0) :
                (i.removeData("ui-tooltip-open"), void 0);
        },
        _tooltip: function(t) {
            var i = n("<div>").attr("role", "tooltip"),
                r = n("<div>").appendTo(i),
                u = i.uniqueId().attr("id");
            return (
                this._addClass(r, "ui-tooltip-content"),
                this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"),
                i.appendTo(this._appendTo(t)),
                (this.tooltips[u] = { element: t, tooltip: i })
            );
        },
        _find: function(n) {
            var t = n.data("ui-tooltip-id");
            return t ? this.tooltips[t] : null;
        },
        _removeTooltip: function(n) {
            n.remove();
            delete this.tooltips[n.attr("id")];
        },
        _appendTo: function(n) {
            var t = n.closest(".ui-front, dialog");
            return t.length || (t = this.document[0].body), t;
        },
        _destroy: function() {
            var t = this;
            n.each(this.tooltips, function(i, r) {
                var f = n.Event("blur"),
                    u = r.element;
                f.target = f.currentTarget = u[0];
                t.close(f, !0);
                n("#" + i).remove();
                u.data("ui-tooltip-title") &&
                    (u.attr("title") || u.attr("title", u.data("ui-tooltip-title")),
                        u.removeData("ui-tooltip-title"));
            });
            this.liveRegion.remove();
        },
    });
    n.uiBackCompat !== !1 &&
        n.widget("ui.tooltip", n.ui.tooltip, {
            options: { tooltipClass: null },
            _tooltip: function() {
                var n = this._superApply(arguments);
                return (
                    this.options.tooltipClass &&
                    n.tooltip.addClass(this.options.tooltipClass),
                    n
                );
            },
        });
    n.ui.tooltip;
});
Function.__typeName = "Function";
Function.__class = !0;
Function.createCallback = function(n, t) {
    return function() {
        var u = arguments.length,
            r,
            i;
        if (u > 0) {
            for (r = [], i = 0; i < u; i++) r[i] = arguments[i];
            return (r[u] = t), n.apply(this, r);
        }
        return n.call(this, t);
    };
};
Function.createDelegate = function(n, t) {
    return function() {
        return t.apply(n, arguments);
    };
};
Function.emptyFunction = Function.emptyMethod = function() {};
Function.validateParameters = function(n, t, i) {
    return Function._validateParams(n, t, i);
};
Function._validateParams = function(n, t, i) {
    var r,
        e = t.length,
        u,
        s,
        f,
        o;
    if (
        ((i = i || typeof i == "undefined"),
            (r = Function._validateParameterCount(n, t, i)),
            r)
    )
        return r.popStackFrame(), r;
    for (u = 0, s = n.length; u < s; u++) {
        if (((f = t[Math.min(u, e - 1)]), (o = f.name), f.parameterArray))
            o += "[" + (u - e + 1) + "]";
        else if (!i && u >= e) break;
        if (((r = Function._validateParameter(n[u], f, o)), r))
            return r.popStackFrame(), r;
    }
    return null;
};
Function._validateParameterCount = function(n, t, i) {
    var r,
        f,
        u = t.length,
        e = n.length,
        o,
        s,
        h;
    if (e < u) {
        for (o = u, r = 0; r < u; r++)
            (s = t[r]), (s.optional || s.parameterArray) && o--;
        e < o && (f = !0);
    } else if (i && e > u)
        for (f = !0, r = 0; r < u; r++)
            if (t[r].parameterArray) {
                f = !1;
                break;
            }
    return f ? ((h = Error.parameterCount()), h.popStackFrame(), h) : null;
};
Function._validateParameter = function(n, t, i) {
    var r,
        o = t.type,
        l = !!t.integer,
        a = !!t.domElement,
        v = !!t.mayBeNull,
        f,
        e,
        s,
        h,
        u,
        c;
    if (((r = Function._validateParameterType(n, o, l, a, v, i)), r))
        return r.popStackFrame(), r;
    if (
        ((f = t.elementType),
            (e = !!t.elementMayBeNull),
            o === Array && typeof n != "undefined" && n !== null && (f || !e))
    )
        for (
            s = !!t.elementInteger, h = !!t.elementDomElement, u = 0; u < n.length; u++
        )
            if (
                ((c = n[u]),
                    (r = Function._validateParameterType(c, f, s, h, e, i + "[" + u + "]")),
                    r)
            )
                return r.popStackFrame(), r;
    return null;
};
Function._validateParameterType = function(n, t, i, r, u, f) {
    var e, h, o, c, s;
    if (typeof n == "undefined")
        return u ? null : ((e = Error.argumentUndefined(f)), e.popStackFrame(), e);
    if (n === null)
        return u ? null : ((e = Error.argumentNull(f)), e.popStackFrame(), e);
    if (t && t.__enum) {
        if (typeof n != "number")
            return (
                (e = Error.argumentType(f, Object.getType(n), t)), e.popStackFrame(), e
            );
        if (n % 1 == 0)
            if (((o = t.prototype), t.__flags && n !== 0)) {
                c = n;
                for (h in o)
                    if (((s = o[h]), s !== 0) && ((s & n) === s && (c -= s), c === 0))
                        return null;
            } else
                for (h in o)
                    if (o[h] === n) return null;
        return (
            (e = Error.argumentOutOfRange(
                f,
                n,
                String.format(Sys.Res.enumInvalidValue, n, t.getName())
            )),
            e.popStackFrame(),
            e
        );
    }
    return r && (!Sys._isDomElement(n) || n.nodeType === 3) ?
        ((e = Error.argument(f, Sys.Res.argumentDomElement)),
            e.popStackFrame(),
            e) :
        t && !Sys._isInstanceOfType(t, n) ?
        ((e = Error.argumentType(f, Object.getType(n), t)), e.popStackFrame(), e) :
        t === Number && i && n % 1 != 0 ?
        ((e = Error.argumentOutOfRange(f, n, Sys.Res.argumentInteger)),
            e.popStackFrame(),
            e) :
        null;
};
Error.__typeName = "Error";
Error.__class = !0;
Error.create = function(n, t) {
    var i = new Error(n),
        r;
    if (((i.message = n), t))
        for (r in t) i[r] = t[r];
    return i.popStackFrame(), i;
};
Error.argument = function(n, t) {
    var r = "Sys.ArgumentException: " + (t ? t : Sys.Res.argument),
        i;
    return (
        n && (r += "\n" + String.format(Sys.Res.paramName, n)),
        (i = Error.create(r, { name: "Sys.ArgumentException", paramName: n })),
        i.popStackFrame(),
        i
    );
};
Error.argumentNull = function(n, t) {
    var r = "Sys.ArgumentNullException: " + (t ? t : Sys.Res.argumentNull),
        i;
    return (
        n && (r += "\n" + String.format(Sys.Res.paramName, n)),
        (i = Error.create(r, { name: "Sys.ArgumentNullException", paramName: n })),
        i.popStackFrame(),
        i
    );
};
Error.argumentOutOfRange = function(n, t, i) {
    var r =
        "Sys.ArgumentOutOfRangeException: " +
        (i ? i : Sys.Res.argumentOutOfRange),
        u;
    return (
        n && (r += "\n" + String.format(Sys.Res.paramName, n)),
        typeof t != "undefined" &&
        t !== null &&
        (r += "\n" + String.format(Sys.Res.actualValue, t)),
        (u = Error.create(r, {
            name: "Sys.ArgumentOutOfRangeException",
            paramName: n,
            actualValue: t,
        })),
        u.popStackFrame(),
        u
    );
};
Error.argumentType = function(n, t, i, r) {
    var u = "Sys.ArgumentTypeException: ",
        f;
    return (
        (u += r ?
            r :
            t && i ?
            String.format(Sys.Res.argumentTypeWithTypes, t.getName(), i.getName()) :
            Sys.Res.argumentType),
        n && (u += "\n" + String.format(Sys.Res.paramName, n)),
        (f = Error.create(u, {
            name: "Sys.ArgumentTypeException",
            paramName: n,
            actualType: t,
            expectedType: i,
        })),
        f.popStackFrame(),
        f
    );
};
Error.argumentUndefined = function(n, t) {
    var r =
        "Sys.ArgumentUndefinedException: " + (t ? t : Sys.Res.argumentUndefined),
        i;
    return (
        n && (r += "\n" + String.format(Sys.Res.paramName, n)),
        (i = Error.create(r, {
            name: "Sys.ArgumentUndefinedException",
            paramName: n,
        })),
        i.popStackFrame(),
        i
    );
};
Error.format = function(n) {
    var i = "Sys.FormatException: " + (n ? n : Sys.Res.format),
        t = Error.create(i, { name: "Sys.FormatException" });
    return t.popStackFrame(), t;
};
Error.invalidOperation = function(n) {
    var i =
        "Sys.InvalidOperationException: " + (n ? n : Sys.Res.invalidOperation),
        t = Error.create(i, { name: "Sys.InvalidOperationException" });
    return t.popStackFrame(), t;
};
Error.notImplemented = function(n) {
    var i = "Sys.NotImplementedException: " + (n ? n : Sys.Res.notImplemented),
        t = Error.create(i, { name: "Sys.NotImplementedException" });
    return t.popStackFrame(), t;
};
Error.parameterCount = function(n) {
    var i = "Sys.ParameterCountException: " + (n ? n : Sys.Res.parameterCount),
        t = Error.create(i, { name: "Sys.ParameterCountException" });
    return t.popStackFrame(), t;
};
Error.prototype.popStackFrame = function() {
    var r, t;
    if (
        typeof this.stack != "undefined" &&
        this.stack !== null &&
        typeof this.fileName != "undefined" &&
        this.fileName !== null &&
        typeof this.lineNumber != "undefined" &&
        this.lineNumber !== null
    ) {
        for (
            var n = this.stack.split("\n"),
                i = n[0],
                u = this.fileName + ":" + this.lineNumber; typeof i != "undefined" && i !== null && i.indexOf(u) === -1;

        )
            n.shift(), (i = n[0]);
        ((r = n[1]), typeof r != "undefined" && r !== null) &&
        ((t = r.match(/@(.*):(\d+)$/)), typeof t != "undefined" && t !== null) &&
        ((this.fileName = t[1]),
            (this.lineNumber = parseInt(t[2])),
            n.shift(),
            (this.stack = n.join("\n")));
    }
};
Object.__typeName = "Object";
Object.__class = !0;
Object.getType = function(n) {
    var t = n.constructor;
    return !t ||
        typeof t != "function" ||
        !t.__typeName ||
        t.__typeName === "Object" ?
        Object :
        t;
};
Object.getTypeName = function(n) {
    return Object.getType(n).getName();
};
String.__typeName = "String";
String.__class = !0;
String.prototype.endsWith = function(n) {
    return this.substr(this.length - n.length) === n;
};
String.prototype.startsWith = function(n) {
    return this.substr(0, n.length) === n;
};
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.trimEnd = function() {
    return this.replace(/\s+$/, "");
};
String.prototype.trimStart = function() {
    return this.replace(/^\s+/, "");
};
String.format = function() {
    return String._toFormattedString(!1, arguments);
};
String._toFormattedString = function(n, t) {
    for (var e = "", f = t[0], o, u, i = 0;;) {
        if (((o = f.indexOf("{", i)), (u = f.indexOf("}", i)), o < 0 && u < 0)) {
            e += f.slice(i);
            break;
        }
        if (u > 0 && (u < o || o < 0)) {
            e += f.slice(i, u + 1);
            i = u + 2;
            continue;
        }
        if (((e += f.slice(i, o)), (i = o + 1), f.charAt(i) === "{")) {
            e += "{";
            i++;
            continue;
        }
        if (u < 0) break;
        var s = f.substring(i, u),
            h = s.indexOf(":"),
            l = parseInt(h < 0 ? s : s.substring(0, h), 10) + 1,
            c = h < 0 ? "" : s.substring(h + 1),
            r = t[l];
        (typeof r == "undefined" || r === null) && (r = "");
        e += r.toFormattedString ?
            r.toFormattedString(c) :
            n && r.localeFormat ?
            r.localeFormat(c) :
            r.format ?
            r.format(c) :
            r.toString();
        i = u + 1;
    }
    return e;
};
Boolean.__typeName = "Boolean";
Boolean.__class = !0;
Boolean.parse = function(n) {
    var t = n.trim().toLowerCase();
    return t === "false" ? !1 : t === "true" ? !0 : void 0;
};
Date.__typeName = "Date";
Date.__class = !0;
Number.__typeName = "Number";
Number.__class = !0;
RegExp.__typeName = "RegExp";
RegExp.__class = !0;
window || (this.window = this);
window.Type = Function;
Type.prototype.callBaseMethod = function(n, t, i) {
    var r = Sys._getBaseMethod(this, n, t);
    return i ? r.apply(n, i) : r.apply(n);
};
Type.prototype.getBaseMethod = function(n, t) {
    return Sys._getBaseMethod(this, n, t);
};
Type.prototype.getBaseType = function() {
    return typeof this.__baseType == "undefined" ? null : this.__baseType;
};
Type.prototype.getInterfaces = function() {
    for (var n = [], t = this, i, r, f, u; t;) {
        if (((i = t.__interfaces), i))
            for (r = 0, f = i.length; r < f; r++)
                (u = i[r]), Array.contains(n, u) || (n[n.length] = u);
        t = t.__baseType;
    }
    return n;
};
Type.prototype.getName = function() {
    return typeof this.__typeName == "undefined" ? "" : this.__typeName;
};
Type.prototype.implementsInterface = function(n) {
    var r, t, u, i, f;
    if (
        (this.resolveInheritance(),
            (r = n.getName()),
            (t = this.__interfaceCache),
            t)
    ) {
        if (((u = t[r]), typeof u != "undefined")) return u;
    } else t = this.__interfaceCache = {};
    for (i = this; i;) {
        if (((f = i.__interfaces), f && Array.indexOf(f, n) !== -1))
            return (t[r] = !0);
        i = i.__baseType;
    }
    return (t[r] = !1);
};
Type.prototype.inheritsFrom = function(n) {
    this.resolveInheritance();
    for (var t = this.__baseType; t;) {
        if (t === n) return !0;
        t = t.__baseType;
    }
    return !1;
};
Type.prototype.initializeBase = function(n, t) {
    return (
        this.resolveInheritance(),
        this.__baseType &&
        (t ? this.__baseType.apply(n, t) : this.__baseType.apply(n)),
        n
    );
};
Type.prototype.isImplementedBy = function(n) {
    if (typeof n == "undefined" || n === null) return !1;
    var t = Object.getType(n);
    return !!(t.implementsInterface && t.implementsInterface(this));
};
Type.prototype.isInstanceOfType = function(n) {
    return Sys._isInstanceOfType(this, n);
};
Type.prototype.registerClass = function(n, t, i) {
    var r, u, f;
    if (
        ((this.prototype.constructor = this),
            (this.__typeName = n),
            (this.__class = !0),
            t && ((this.__baseType = t), (this.__basePrototypePending = !0)),
            (Sys.__upperCaseTypes[n.toUpperCase()] = this),
            i)
    )
        for (this.__interfaces = [], r = 2, u = arguments.length; r < u; r++)
            (f = arguments[r]), this.__interfaces.push(f);
    return this;
};
Type.prototype.registerInterface = function(n) {
    return (
        (Sys.__upperCaseTypes[n.toUpperCase()] = this),
        (this.prototype.constructor = this),
        (this.__typeName = n),
        (this.__interface = !0),
        this
    );
};
Type.prototype.resolveInheritance = function() {
    var n, t, i;
    if (this.__basePrototypePending) {
        n = this.__baseType;
        n.resolveInheritance();
        for (t in n.prototype)
            (i = n.prototype[t]), this.prototype[t] || (this.prototype[t] = i);
        delete this.__basePrototypePending;
    }
};
Type.getRootNamespaces = function() {
    return Array.clone(Sys.__rootNamespaces);
};
Type.isClass = function(n) {
    return typeof n == "undefined" || n === null ? !1 : !!n.__class;
};
Type.isInterface = function(n) {
    return typeof n == "undefined" || n === null ? !1 : !!n.__interface;
};
Type.isNamespace = function(n) {
    return typeof n == "undefined" || n === null ? !1 : !!n.__namespace;
};
Type.parse = function(typeName, ns) {
    var fn;
    return ns ?
        ((fn =
                Sys.__upperCaseTypes[
                    ns.getName().toUpperCase() + "." + typeName.toUpperCase()
                ]),
            fn || null) :
        typeName ?
        (Type.__htClasses || (Type.__htClasses = {}),
            (fn = Type.__htClasses[typeName]),
            fn || ((fn = eval(typeName)), (Type.__htClasses[typeName] = fn)),
            fn) :
        null;
};
Type.registerNamespace = function(n) {
    for (var r = window, u = n.split("."), f, t, i = 0; i < u.length; i++)
        (f = u[i]),
        (t = r[f]),
        t || (t = r[f] = {}),
        t.__namespace ||
        (i === 0 &&
            n !== "Sys" &&
            (Sys.__rootNamespaces[Sys.__rootNamespaces.length] = t),
            (t.__namespace = !0),
            (t.__typeName = u.slice(0, i + 1).join(".")),
            (t.getName = function() {
                return this.__typeName;
            })),
        (r = t);
};
Type._checkDependency = function(n, t) {
    var i = Type._registerScript._scripts,
        r = i ? !!i[n] : !1;
    if (typeof t != "undefined" && !r)
        throw Error.invalidOperation(
            String.format(Sys.Res.requiredScriptReferenceNotIncluded, t, n)
        );
    return r;
};
Type._registerScript = function(n, t) {
    var i = Type._registerScript._scripts,
        r,
        f,
        u;
    if ((i || (Type._registerScript._scripts = i = {}), i[n]))
        throw Error.invalidOperation(String.format(Sys.Res.scriptAlreadyLoaded, n));
    if (((i[n] = !0), t))
        for (r = 0, f = t.length; r < f; r++)
            if (((u = t[r]), !Type._checkDependency(u)))
                throw Error.invalidOperation(
                    String.format(Sys.Res.scriptDependencyNotFound, n, u)
                );
};
Type.registerNamespace("Sys");
Sys.__upperCaseTypes = {};
Sys.__rootNamespaces = [Sys];
Sys._isInstanceOfType = function(n, t) {
    if (typeof t == "undefined" || t === null) return !1;
    if (t instanceof n) return !0;
    var i = Object.getType(t);
    return (!!(i === n) ||
        (i.inheritsFrom && i.inheritsFrom(n)) ||
        (i.implementsInterface && i.implementsInterface(n))
    );
};
Sys._getBaseMethod = function(n, t, i) {
    var u = n.getBaseType(),
        r;
    return u ? ((r = u.prototype[i]), r instanceof Function ? r : null) : null;
};
Sys._isDomElement = function(n) {
    var i = !1,
        t,
        r;
    return (
        typeof n.nodeType != "number" &&
        ((t = n.ownerDocument || n.document || n),
            t != n ?
            ((r = t.defaultView || t.parentWindow), (i = r != n)) :
            (i = typeof t.body == "undefined")), !i
    );
};
Array.__typeName = "Array";
Array.__class = !0;
Array.add = Array.enqueue = function(n, t) {
    n[n.length] = t;
};
Array.addRange = function(n, t) {
    n.push.apply(n, t);
};
Array.clear = function(n) {
    n.length = 0;
};
Array.clone = function(n) {
    return n.length === 1 ? [n[0]] : Array.apply(null, n);
};
Array.contains = function(n, t) {
    return Sys._indexOf(n, t) >= 0;
};
Array.dequeue = function(n) {
    return n.shift();
};
Array.forEach = function(n, t, i) {
    for (var u, r = 0, f = n.length; r < f; r++)
        (u = n[r]), typeof u != "undefined" && t.call(i, u, r, n);
};
Array.indexOf = function(n, t, i) {
    return Sys._indexOf(n, t, i);
};
Array.insert = function(n, t, i) {
    n.splice(t, 0, i);
};
Array.parse = function(value) {
    return value ? eval(value) : [];
};
Array.remove = function(n, t) {
    var i = Sys._indexOf(n, t);
    return i >= 0 && n.splice(i, 1), i >= 0;
};
Array.removeAt = function(n, t) {
    n.splice(t, 1);
};
Sys._indexOf = function(n, t, i) {
    var u, r;
    if (typeof t == "undefined") return -1;
    if (((u = n.length), u !== 0))
        for (
            i = +i,
            isNaN(i) ?
            (i = 0) :
            (isFinite(i) && (i = i - (i % 1)),
                i < 0 && (i = Math.max(0, u + i))),
            r = i; r < u; r++
        )
            if (typeof n[r] != "undefined" && n[r] === t) return r;
    return -1;
};
Type._registerScript._scripts = {
    "MicrosoftAjaxCore.js": !0,
    "MicrosoftAjaxGlobalization.js": !0,
    "MicrosoftAjaxSerialization.js": !0,
    "MicrosoftAjaxComponentModel.js": !0,
    "MicrosoftAjaxHistory.js": !0,
    "MicrosoftAjaxNetwork.js": !0,
    "MicrosoftAjaxWebServices.js": !0,
};
Sys.IDisposable = function() {};
Sys.IDisposable.prototype = {};
Sys.IDisposable.registerInterface("Sys.IDisposable");
Sys.StringBuilder = function(n) {
    this._parts =
        typeof n != "undefined" && n !== null && n !== "" ? [n.toString()] : [];
    this._value = {};
    this._len = 0;
};
Sys.StringBuilder.prototype = {
    append: function(n) {
        this._parts[this._parts.length] = n;
    },
    appendLine: function(n) {
        this._parts[this._parts.length] =
            typeof n == "undefined" || n === null || n === "" ? "\r\n" : n + "\r\n";
    },
    clear: function() {
        this._parts = [];
        this._value = {};
        this._len = 0;
    },
    isEmpty: function() {
        return this._parts.length === 0 ? !0 : this.toString() === "";
    },
    toString: function(n) {
        var t, r, i;
        if (
            ((n = n || ""),
                (t = this._parts),
                this._len !== t.length && ((this._value = {}), (this._len = t.length)),
                (r = this._value),
                typeof r[n] == "undefined")
        ) {
            if (n !== "")
                for (i = 0; i < t.length;)
                    typeof t[i] == "undefined" || t[i] === "" || t[i] === null ?
                    t.splice(i, 1) :
                    i++;
            r[n] = this._parts.join(n);
        }
        return r[n];
    },
};
Sys.StringBuilder.registerClass("Sys.StringBuilder");
Sys.Browser = {};
Sys.Browser.InternetExplorer = {};
Sys.Browser.Firefox = {};
Sys.Browser.Safari = {};
Sys.Browser.Opera = {};
Sys.Browser.agent = null;
Sys.Browser.hasDebuggerStatement = !1;
Sys.Browser.name = navigator.appName;
Sys.Browser.version = parseFloat(navigator.appVersion);
Sys.Browser.documentMode = 0;
navigator.userAgent.indexOf(" MSIE ") > -1 ||
    navigator.userAgent.indexOf("Trident") > -1 ?
    ((Sys.Browser.agent = Sys.Browser.InternetExplorer),
        (Sys.Browser.version =
            navigator.userAgent.indexOf(" MSIE ") > -1 ?
            parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]) :
            parseFloat("11.0")),
        Sys.Browser.version >= 8 &&
        document.documentMode >= 7 &&
        (Sys.Browser.documentMode = document.documentMode),
        (Sys.Browser.hasDebuggerStatement = !0)) :
    navigator.userAgent.indexOf(" Firefox/") > -1 ?
    ((Sys.Browser.agent = Sys.Browser.Firefox),
        (Sys.Browser.version = parseFloat(
            navigator.userAgent.match(/Firefox\/(\d+\.\d+)/)[1]
        )),
        (Sys.Browser.name = "Firefox"),
        (Sys.Browser.hasDebuggerStatement = !0)) :
    navigator.userAgent.indexOf(" AppleWebKit/") > -1 ?
    ((Sys.Browser.agent = Sys.Browser.Safari),
        (Sys.Browser.version = parseFloat(
            navigator.userAgent.match(/AppleWebKit\/(\d+(\.\d+)?)/)[1]
        )),
        (Sys.Browser.name = "Safari")) :
    navigator.userAgent.indexOf("Opera/") > -1 &&
    (Sys.Browser.agent = Sys.Browser.Opera);
Sys.EventArgs = function() {};
Sys.EventArgs.registerClass("Sys.EventArgs");
Sys.EventArgs.Empty = new Sys.EventArgs();
Sys.CancelEventArgs = function() {
    Sys.CancelEventArgs.initializeBase(this);
    this._cancel = !1;
};
Sys.CancelEventArgs.prototype = {
    get_cancel: function() {
        return this._cancel;
    },
    set_cancel: function(n) {
        this._cancel = n;
    },
};
Sys.CancelEventArgs.registerClass("Sys.CancelEventArgs", Sys.EventArgs);
Type.registerNamespace("Sys.UI");
Sys._Debug = function() {};
Sys._Debug.prototype = {
    _appendConsole: function(n) {
        typeof Debug != "undefined" && Debug.writeln;
        window.console && window.console.log && window.console.log(n);
        window.opera && window.opera.postError(n);
        window.debugService && window.debugService.trace(n);
    },
    _appendTrace: function(n) {
        var t = document.getElementById("TraceConsole");
        t && t.tagName.toUpperCase() === "TEXTAREA" && (t.value += n + "\n");
    },
    assert: function(n, t, i) {
        n ||
            ((t =
                    i && this.assert.caller ?
                    String.format(Sys.Res.assertFailedCaller, t, this.assert.caller) :
                    String.format(Sys.Res.assertFailed, t)),
                confirm(String.format(Sys.Res.breakIntoDebugger, t)) && this.fail(t));
    },
    clearTrace: function() {
        var n = document.getElementById("TraceConsole");
        n && n.tagName.toUpperCase() === "TEXTAREA" && (n.value = "");
    },
    fail: function(message) {
        this._appendConsole(message);
        Sys.Browser.hasDebuggerStatement && eval("debugger");
    },
    trace: function(n) {
        this._appendConsole(n);
        this._appendTrace(n);
    },
    traceDump: function(n, t) {
        var i = this._traceDump(n, t, !0);
    },
    _traceDump: function(n, t, i, r, u) {
        var e, o, f, c, s, h;
        if (((t = t ? t : "traceDump"), (r = r ? r : ""), n === null)) {
            this.trace(r + t + ": null");
            return;
        }
        switch (typeof n) {
            case "undefined":
                this.trace(r + t + ": Undefined");
                break;
            case "number":
            case "string":
            case "boolean":
                this.trace(r + t + ": " + n);
                break;
            default:
                if (Date.isInstanceOfType(n) || RegExp.isInstanceOfType(n)) {
                    this.trace(r + t + ": " + n.toString());
                    break;
                }
                if (u) {
                    if (Array.contains(u, n)) {
                        this.trace(r + t + ": ...");
                        return;
                    }
                } else u = [];
                if (
                    (Array.add(u, n),
                        n == window ||
                        n === document ||
                        (window.HTMLElement && n instanceof HTMLElement) ||
                        typeof n.nodeName == "string")
                )
                    (e = n.tagName ? n.tagName : "DomElement"),
                    n.id && (e += " - " + n.id),
                    this.trace(r + t + " {" + e + "}");
                else if (
                    ((o = Object.getTypeName(n)),
                        this.trace(r + t + (typeof o == "string" ? " {" + o + "}" : "")),
                        r === "" || i)
                )
                    if (((r += "    "), Array.isInstanceOfType(n)))
                        for (c = n.length, f = 0; f < c; f++)
                            this._traceDump(n[f], "[" + f + "]", i, r, u);
                    else
                        for (s in n)
                            (h = n[s]),
                            Function.isInstanceOfType(h) || this._traceDump(h, s, i, r, u);
                Array.remove(u, n);
        }
    },
};
Sys._Debug.registerClass("Sys._Debug");
Sys.Debug = new Sys._Debug();
Sys.Debug.isDebug = !1;
Type.prototype.registerEnum = function(n, t) {
    Sys.__upperCaseTypes[n.toUpperCase()] = this;
    for (var i in this.prototype) this[i] = this.prototype[i];
    this.__typeName = n;
    this.parse = Sys$Enum$parse;
    this.__string = this.toString();
    this.toString = Sys$Enum$toString;
    this.__flags = t;
    this.__enum = !0;
};
Type.isEnum = function(n) {
    return typeof n == "undefined" || n === null ? !1 : !!n.__enum;
};
Type.isFlags = function(n) {
    return typeof n == "undefined" || n === null ? !1 : !!n.__flags;
};
Sys.CollectionChange = function(n, t, i, r, u) {
    this.action = n;
    t && (t instanceof Array || (t = [t]));
    this.newItems = t || null;
    typeof i != "number" && (i = -1);
    this.newStartingIndex = i;
    r && (r instanceof Array || (r = [r]));
    this.oldItems = r || null;
    typeof u != "number" && (u = -1);
    this.oldStartingIndex = u;
};
Sys.CollectionChange.registerClass("Sys.CollectionChange");
Sys.NotifyCollectionChangedAction = function() {
    throw Error.notImplemented();
};
Sys.NotifyCollectionChangedAction.prototype = { add: 0, remove: 1, reset: 2 };
Sys.NotifyCollectionChangedAction.registerEnum(
    "Sys.NotifyCollectionChangedAction"
);
Sys.NotifyCollectionChangedEventArgs = function(n) {
    this._changes = n;
    Sys.NotifyCollectionChangedEventArgs.initializeBase(this);
};
Sys.NotifyCollectionChangedEventArgs.prototype = {
    get_changes: function() {
        return this._changes || [];
    },
};
Sys.NotifyCollectionChangedEventArgs.registerClass(
    "Sys.NotifyCollectionChangedEventArgs",
    Sys.EventArgs
);
Sys.Observer = function() {};
Sys.Observer.registerClass("Sys.Observer");
Sys.Observer.makeObservable = function(n) {
    var i = n instanceof Array,
        t = Sys.Observer;
    return n.setValue === t._observeMethods.setValue ?
        n :
        (t._addMethods(n, t._observeMethods),
            i && t._addMethods(n, t._arrayMethods),
            n);
};
Sys.Observer._addMethods = function(n, t) {
    for (var i in t) n[i] = t[i];
};
Sys.Observer._addEventHandler = function(n, t, i) {
    Sys.Observer._getContext(n, !0).events._addHandler(t, i);
};
Sys.Observer.addEventHandler = function(n, t, i) {
    Sys.Observer._addEventHandler(n, t, i);
};
Sys.Observer._removeEventHandler = function(n, t, i) {
    Sys.Observer._getContext(n, !0).events._removeHandler(t, i);
};
Sys.Observer.removeEventHandler = function(n, t, i) {
    Sys.Observer._removeEventHandler(n, t, i);
};
Sys.Observer.raiseEvent = function(n, t, i) {
    var u = Sys.Observer._getContext(n),
        r;
    u && ((r = u.events.getHandler(t)), r && r(n, i));
};
Sys.Observer.addPropertyChanged = function(n, t) {
    Sys.Observer._addEventHandler(n, "propertyChanged", t);
};
Sys.Observer.removePropertyChanged = function(n, t) {
    Sys.Observer._removeEventHandler(n, "propertyChanged", t);
};
Sys.Observer.beginUpdate = function(n) {
    Sys.Observer._getContext(n, !0).updating = !0;
};
Sys.Observer.endUpdate = function(n) {
    var t = Sys.Observer._getContext(n),
        i,
        r;
    t &&
        t.updating &&
        ((t.updating = !1),
            (i = t.dirty),
            (t.dirty = !1),
            i &&
            (n instanceof Array &&
                ((r = t.changes),
                    (t.changes = null),
                    Sys.Observer.raiseCollectionChanged(n, r)),
                Sys.Observer.raisePropertyChanged(n, "")));
};
Sys.Observer.isUpdating = function(n) {
    var t = Sys.Observer._getContext(n);
    return t ? t.updating : !1;
};
Sys.Observer._setValue = function(n, t, i) {
    for (
        var r, s, l = n, f = t.split("."), c, a, v, u, o, e = 0, h = f.length - 1; e < h; e++
    )
        if (
            ((c = f[e]),
                (r = n["get_" + c]),
                (n = typeof r == "function" ? r.call(n) : n[c]),
                (a = typeof n),
                n === null || a === "undefined")
        )
            throw Error.invalidOperation(
                String.format(Sys.Res.nullReferenceInPath, t)
            );
    if (
        ((u = f[h]),
            (r = n["get_" + u]),
            (s = n["set_" + u]),
            (v = typeof r == "function" ? r.call(n) : n[u]),
            typeof s == "function" ? s.call(n, i) : (n[u] = i),
            v !== i)
    ) {
        if (((o = Sys.Observer._getContext(l)), o && o.updating)) {
            o.dirty = !0;
            return;
        }
        Sys.Observer.raisePropertyChanged(l, f[0]);
    }
};
Sys.Observer.setValue = function(n, t, i) {
    Sys.Observer._setValue(n, t, i);
};
Sys.Observer.raisePropertyChanged = function(n, t) {
    Sys.Observer.raiseEvent(
        n,
        "propertyChanged",
        new Sys.PropertyChangedEventArgs(t)
    );
};
Sys.Observer.addCollectionChanged = function(n, t) {
    Sys.Observer._addEventHandler(n, "collectionChanged", t);
};
Sys.Observer.removeCollectionChanged = function(n, t) {
    Sys.Observer._removeEventHandler(n, "collectionChanged", t);
};
Sys.Observer._collectionChange = function(n, t) {
    var i = Sys.Observer._getContext(n),
        r;
    i && i.updating ?
        ((i.dirty = !0), (r = i.changes), r ? r.push(t) : (i.changes = r = [t])) :
        (Sys.Observer.raiseCollectionChanged(n, [t]),
            Sys.Observer.raisePropertyChanged(n, "length"));
};
Sys.Observer.add = function(n, t) {
    var i = new Sys.CollectionChange(
        Sys.NotifyCollectionChangedAction.add, [t],
        n.length
    );
    Array.add(n, t);
    Sys.Observer._collectionChange(n, i);
};
Sys.Observer.addRange = function(n, t) {
    var i = new Sys.CollectionChange(
        Sys.NotifyCollectionChangedAction.add,
        t,
        n.length
    );
    Array.addRange(n, t);
    Sys.Observer._collectionChange(n, i);
};
Sys.Observer.clear = function(n) {
    var t = Array.clone(n);
    Array.clear(n);
    Sys.Observer._collectionChange(
        n,
        new Sys.CollectionChange(
            Sys.NotifyCollectionChangedAction.reset,
            null, -1,
            t,
            0
        )
    );
};
Sys.Observer.insert = function(n, t, i) {
    Array.insert(n, t, i);
    Sys.Observer._collectionChange(
        n,
        new Sys.CollectionChange(Sys.NotifyCollectionChangedAction.add, [i], t)
    );
};
Sys.Observer.remove = function(n, t) {
    var i = Array.indexOf(n, t);
    return i !== -1 ?
        (Array.remove(n, t),
            Sys.Observer._collectionChange(
                n,
                new Sys.CollectionChange(
                    Sys.NotifyCollectionChangedAction.remove,
                    null, -1, [t],
                    i
                )
            ), !0) :
        !1;
};
Sys.Observer.removeAt = function(n, t) {
    if (t > -1 && t < n.length) {
        var i = n[t];
        Array.removeAt(n, t);
        Sys.Observer._collectionChange(
            n,
            new Sys.CollectionChange(
                Sys.NotifyCollectionChangedAction.remove,
                null, -1, [i],
                t
            )
        );
    }
};
Sys.Observer.raiseCollectionChanged = function(n, t) {
    Sys.Observer.raiseEvent(
        n,
        "collectionChanged",
        new Sys.NotifyCollectionChangedEventArgs(t)
    );
};
Sys.Observer._observeMethods = {
    add_propertyChanged: function(n) {
        Sys.Observer._addEventHandler(this, "propertyChanged", n);
    },
    remove_propertyChanged: function(n) {
        Sys.Observer._removeEventHandler(this, "propertyChanged", n);
    },
    addEventHandler: function(n, t) {
        Sys.Observer._addEventHandler(this, n, t);
    },
    removeEventHandler: function(n, t) {
        Sys.Observer._removeEventHandler(this, n, t);
    },
    get_isUpdating: function() {
        return Sys.Observer.isUpdating(this);
    },
    beginUpdate: function() {
        Sys.Observer.beginUpdate(this);
    },
    endUpdate: function() {
        Sys.Observer.endUpdate(this);
    },
    setValue: function(n, t) {
        Sys.Observer._setValue(this, n, t);
    },
    raiseEvent: function(n, t) {
        Sys.Observer.raiseEvent(this, n, t);
    },
    raisePropertyChanged: function(n) {
        Sys.Observer.raiseEvent(
            this,
            "propertyChanged",
            new Sys.PropertyChangedEventArgs(n)
        );
    },
};
Sys.Observer._arrayMethods = {
    add_collectionChanged: function(n) {
        Sys.Observer._addEventHandler(this, "collectionChanged", n);
    },
    remove_collectionChanged: function(n) {
        Sys.Observer._removeEventHandler(this, "collectionChanged", n);
    },
    add: function(n) {
        Sys.Observer.add(this, n);
    },
    addRange: function(n) {
        Sys.Observer.addRange(this, n);
    },
    clear: function() {
        Sys.Observer.clear(this);
    },
    insert: function(n, t) {
        Sys.Observer.insert(this, n, t);
    },
    remove: function(n) {
        return Sys.Observer.remove(this, n);
    },
    removeAt: function(n) {
        Sys.Observer.removeAt(this, n);
    },
    raiseCollectionChanged: function(n) {
        Sys.Observer.raiseEvent(
            this,
            "collectionChanged",
            new Sys.NotifyCollectionChangedEventArgs(n)
        );
    },
};
Sys.Observer._getContext = function(n, t) {
    var i = n._observerContext;
    return i ?
        i() :
        t ?
        (n._observerContext = Sys.Observer._createContext())() :
        null;
};
Sys.Observer._createContext = function() {
    var n = { events: new Sys.EventHandlerList() };
    return function() {
        return n;
    };
};
Date._appendPreOrPostMatch = function(n, t) {
    for (var f = 0, i = !1, u, r = 0, e = n.length; r < e; r++) {
        u = n.charAt(r);
        switch (u) {
            case "'":
                i ? t.append("'") : f++;
                i = !1;
                break;
            case "\\":
                i && t.append("\\");
                i = !i;
                break;
            default:
                t.append(u);
                i = !1;
        }
    }
    return f;
};
Date._expandFormat = function(n, t) {
    t || (t = "F");
    var i = t.length;
    if (i === 1)
        switch (t) {
            case "d":
                return n.ShortDatePattern;
            case "D":
                return n.LongDatePattern;
            case "t":
                return n.ShortTimePattern;
            case "T":
                return n.LongTimePattern;
            case "f":
                return n.LongDatePattern + " " + n.ShortTimePattern;
            case "F":
                return n.FullDateTimePattern;
            case "M":
            case "m":
                return n.MonthDayPattern;
            case "s":
                return n.SortableDateTimePattern;
            case "Y":
            case "y":
                return n.YearMonthPattern;
            default:
                throw Error.format(Sys.Res.formatInvalidString);
        }
    else i === 2 && t.charAt(0) === "%" && (t = t.charAt(1));
    return t;
};
Date._expandYear = function(n, t) {
    var r = new Date(),
        u = Date._getEra(r),
        i;
    return (
        t < 100 &&
        ((i = Date._getEraYear(r, n, u)),
            (t += i - (i % 100)),
            t > n.Calendar.TwoDigitYearMax && (t -= 100)),
        t
    );
};
Date._getEra = function(n, t) {
    var r, u, i, f;
    if (!t) return 0;
    for (u = n.getTime(), i = 0, f = t.length; i < f; i += 4)
        if (((r = t[i + 2]), r === null || u >= r)) return i;
    return 0;
};
Date._getEraYear = function(n, t, i, r) {
    var u = n.getFullYear();
    return !r && t.eras && (u -= t.eras[i + 3]), u;
};
Date._getParseRegExp = function(n, t) {
    var r, c, l, e;
    if (n._parseRegExp) {
        if (n._parseRegExp[t]) return n._parseRegExp[t];
    } else n._parseRegExp = {};
    r = Date._expandFormat(n, t);
    r = r.replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1");
    for (
        var i = new Sys.StringBuilder("^"),
            o = [],
            f = 0,
            s = 0,
            h = Date._getTokenRegExp(),
            u;
        (u = h.exec(r)) !== null;

    ) {
        if (
            ((c = r.slice(f, u.index)),
                (f = h.lastIndex),
                (s += Date._appendPreOrPostMatch(c, i)),
                s % 2 == 1)
        ) {
            i.append(u[0]);
            continue;
        }
        switch (u[0]) {
            case "dddd":
            case "ddd":
            case "MMMM":
            case "MMM":
            case "gg":
            case "g":
                i.append("(\\D+)");
                break;
            case "tt":
            case "t":
                i.append("(\\D*)");
                break;
            case "yyyy":
                i.append("(\\d{4})");
                break;
            case "fff":
                i.append("(\\d{3})");
                break;
            case "ff":
                i.append("(\\d{2})");
                break;
            case "f":
                i.append("(\\d)");
                break;
            case "dd":
            case "d":
            case "MM":
            case "M":
            case "yy":
            case "y":
            case "HH":
            case "H":
            case "hh":
            case "h":
            case "mm":
            case "m":
            case "ss":
            case "s":
                i.append("(\\d\\d?)");
                break;
            case "zzz":
                i.append("([+-]?\\d\\d?:\\d{2})");
                break;
            case "zz":
            case "z":
                i.append("([+-]?\\d\\d?)");
                break;
            case "/":
                i.append("(\\" + n.DateSeparator + ")");
        }
        Array.add(o, u[0]);
    }
    return (
        Date._appendPreOrPostMatch(r.slice(f), i),
        i.append("$"),
        (l = i.toString().replace(/\s+/g, "\\s+")),
        (e = { regExp: l, groups: o }),
        (n._parseRegExp[t] = e),
        e
    );
};
Date._getTokenRegExp = function() {
    return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g;
};
Date.parseLocale = function(n) {
    return Date._parse(n, Sys.CultureInfo.CurrentCulture, arguments);
};
Date.parseInvariant = function(n) {
    return Date._parse(n, Sys.CultureInfo.InvariantCulture, arguments);
};
Date._parse = function(n, t, i) {
    for (var u, e, o, s = !1, r = 1, f = i.length; r < f; r++)
        if (((e = i[r]), e && ((s = !0), (u = Date._parseExact(n, e, t)), u)))
            return u;
    if (!s)
        for (o = t._getDateTimeFormats(), r = 0, f = o.length; r < f; r++)
            if (((u = Date._parseExact(n, o[r], t)), u)) return u;
    return null;
};
Date._parseExact = function(n, t, i) {
    var v, st, r, rt, nt, y, p, w, ht, u, ct, b, ut;
    n = n.trim();
    var s = i.dateTimeFormat,
        ft = Date._getParseRegExp(s, t),
        et = new RegExp(ft.regExp).exec(n);
    if (et === null) return null;
    var ot = ft.groups,
        tt = null,
        e = null,
        f = null,
        c = null,
        l = null,
        o = 0,
        a,
        k = 0,
        d = 0,
        h = 0,
        g = null,
        it = !1;
    for (v = 0, st = ot.length; v < st; v++)
        if (((r = et[v + 1]), r))
            switch (ot[v]) {
                case "dd":
                case "d":
                    if (((c = parseInt(r, 10)), c < 1 || c > 31)) return null;
                    break;
                case "MMMM":
                    if (((f = i._getMonthIndex(r)), f < 0 || f > 11)) return null;
                    break;
                case "MMM":
                    if (((f = i._getAbbrMonthIndex(r)), f < 0 || f > 11)) return null;
                    break;
                case "M":
                case "MM":
                    if (((f = parseInt(r, 10) - 1), f < 0 || f > 11)) return null;
                    break;
                case "y":
                case "yy":
                    if (((e = Date._expandYear(s, parseInt(r, 10))), e < 0 || e > 9999))
                        return null;
                    break;
                case "yyyy":
                    if (((e = parseInt(r, 10)), e < 0 || e > 9999)) return null;
                    break;
                case "h":
                case "hh":
                    if (((o = parseInt(r, 10)), o === 12 && (o = 0), o < 0 || o > 11))
                        return null;
                    break;
                case "H":
                case "HH":
                    if (((o = parseInt(r, 10)), o < 0 || o > 23)) return null;
                    break;
                case "m":
                case "mm":
                    if (((k = parseInt(r, 10)), k < 0 || k > 59)) return null;
                    break;
                case "s":
                case "ss":
                    if (((d = parseInt(r, 10)), d < 0 || d > 59)) return null;
                    break;
                case "tt":
                case "t":
                    if (
                        ((rt = r.toUpperCase()),
                            (it = rt === s.PMDesignator.toUpperCase()), !it && rt !== s.AMDesignator.toUpperCase())
                    )
                        return null;
                    break;
                case "f":
                    if (((h = parseInt(r, 10) * 100), h < 0 || h > 999)) return null;
                    break;
                case "ff":
                    if (((h = parseInt(r, 10) * 10), h < 0 || h > 999)) return null;
                    break;
                case "fff":
                    if (((h = parseInt(r, 10)), h < 0 || h > 999)) return null;
                    break;
                case "dddd":
                    if (((l = i._getDayIndex(r)), l < 0 || l > 6)) return null;
                    break;
                case "ddd":
                    if (((l = i._getAbbrDayIndex(r)), l < 0 || l > 6)) return null;
                    break;
                case "zzz":
                    if (
                        ((nt = r.split(/:/)), nt.length !== 2) ||
                        ((a = parseInt(nt[0], 10)), a < -12 || a > 13) ||
                        ((y = parseInt(nt[1], 10)), y < 0 || y > 59)
                    )
                        return null;
                    g = a * 60 + (r.startsWith("-") ? -y : y);
                    break;
                case "z":
                case "zz":
                    if (((a = parseInt(r, 10)), a < -12 || a > 13)) return null;
                    g = a * 60;
                    break;
                case "g":
                case "gg":
                    if (((p = r), !p || !s.eras)) return null;
                    for (
                        p = p.toLowerCase().trim(), w = 0, ht = s.eras.length; w < ht; w += 4
                    )
                        if (p === s.eras[w + 1].toLowerCase()) {
                            tt = w;
                            break;
                        }
                    if (tt === null) return null;
            }
    if (
        ((u = new Date()),
            (b = s.Calendar.convert),
            (ct = b ? b.fromGregorian(u)[0] : u.getFullYear()),
            e === null ? (e = ct) : s.eras && (e += s.eras[(tt || 0) + 3]),
            f === null && (f = 0),
            c === null && (c = 1),
            b)
    ) {
        if (((u = b.toGregorian(e, f, c)), u === null)) return null;
    } else if (
        (u.setFullYear(e, f, c), u.getDate() !== c) ||
        (l !== null && u.getDay() !== l)
    )
        return null;
    return (
        it && o < 12 && (o += 12),
        u.setHours(o, k, d, h),
        g !== null &&
        ((ut = u.getMinutes() - (g + u.getTimezoneOffset())),
            u.setHours(u.getHours() + parseInt(ut / 60, 10), ut % 60)),
        u
    );
};
Date.prototype.format = function(n) {
    return this._toFormattedString(n, Sys.CultureInfo.InvariantCulture);
};
Date.prototype.localeFormat = function(n) {
    return this._toFormattedString(n, Sys.CultureInfo.CurrentCulture);
};
Date.prototype._toFormattedString = function(n, t) {
    function f(n) {
        return n < 10 ? "0" + n : n.toString();
    }

    function y(n) {
        return n < 10 ? "00" + n : n < 100 ? "0" + n : n.toString();
    }

    function nt(n) {
        return n < 10 ?
            "000" + n :
            n < 100 ?
            "00" + n :
            n < 1e3 ?
            "0" + n :
            n.toString();
    }

    function g() {
        return s || k ? s : ((s = d.test(n)), (k = !0), s);
    }
    var r = t.dateTimeFormat,
        a = r.Calendar.convert,
        v,
        b,
        h,
        c,
        i,
        u,
        s,
        k,
        d,
        p,
        w,
        e;
    if (!n || !n.length || n === "i")
        return t && t.name.length ?
            a ?
            this._toFormattedString(r.FullDateTimePattern, t) :
            ((v = new Date(this.getTime())),
                (b = Date._getEra(this, r.eras)),
                v.setFullYear(Date._getEraYear(this, r, b)),
                v.toLocaleString()) :
            this.toString();
    for (
        h = r.eras,
        c = n === "s",
        n = Date._expandFormat(r, n),
        i = new Sys.StringBuilder(),
        d = /([^d]|^)(d|dd)([^d]|$)/g,
        p = 0,
        w = Date._getTokenRegExp(), !c && a && (e = a.fromGregorian(this));;

    ) {
        var tt = w.lastIndex,
            l = w.exec(n),
            it = n.slice(tt, l ? l.index : n.length);
        if (((p += Date._appendPreOrPostMatch(it, i)), !l)) break;
        if (p % 2 == 1) {
            i.append(l[0]);
            continue;
        }

        function o(n, t) {
            if (e) return e[t];
            switch (t) {
                case 0:
                    return n.getFullYear();
                case 1:
                    return n.getMonth();
                case 2:
                    return n.getDate();
            }
        }
        switch (l[0]) {
            case "dddd":
                i.append(r.DayNames[this.getDay()]);
                break;
            case "ddd":
                i.append(r.AbbreviatedDayNames[this.getDay()]);
                break;
            case "dd":
                s = !0;
                i.append(f(o(this, 2)));
                break;
            case "d":
                s = !0;
                i.append(o(this, 2));
                break;
            case "MMMM":
                i.append(
                    r.MonthGenitiveNames && g() ?
                    r.MonthGenitiveNames[o(this, 1)] :
                    r.MonthNames[o(this, 1)]
                );
                break;
            case "MMM":
                i.append(
                    r.AbbreviatedMonthGenitiveNames && g() ?
                    r.AbbreviatedMonthGenitiveNames[o(this, 1)] :
                    r.AbbreviatedMonthNames[o(this, 1)]
                );
                break;
            case "MM":
                i.append(f(o(this, 1) + 1));
                break;
            case "M":
                i.append(o(this, 1) + 1);
                break;
            case "yyyy":
                i.append(
                    nt(e ? e[0] : Date._getEraYear(this, r, Date._getEra(this, h), c))
                );
                break;
            case "yy":
                i.append(
                    f(
                        (e ? e[0] : Date._getEraYear(this, r, Date._getEra(this, h), c)) %
                        100
                    )
                );
                break;
            case "y":
                i.append(
                    (e ? e[0] : Date._getEraYear(this, r, Date._getEra(this, h), c)) % 100
                );
                break;
            case "hh":
                u = this.getHours() % 12;
                u === 0 && (u = 12);
                i.append(f(u));
                break;
            case "h":
                u = this.getHours() % 12;
                u === 0 && (u = 12);
                i.append(u);
                break;
            case "HH":
                i.append(f(this.getHours()));
                break;
            case "H":
                i.append(this.getHours());
                break;
            case "mm":
                i.append(f(this.getMinutes()));
                break;
            case "m":
                i.append(this.getMinutes());
                break;
            case "ss":
                i.append(f(this.getSeconds()));
                break;
            case "s":
                i.append(this.getSeconds());
                break;
            case "tt":
                i.append(this.getHours() < 12 ? r.AMDesignator : r.PMDesignator);
                break;
            case "t":
                i.append(
                    (this.getHours() < 12 ? r.AMDesignator : r.PMDesignator).charAt(0)
                );
                break;
            case "f":
                i.append(y(this.getMilliseconds()).charAt(0));
                break;
            case "ff":
                i.append(y(this.getMilliseconds()).substr(0, 2));
                break;
            case "fff":
                i.append(y(this.getMilliseconds()));
                break;
            case "z":
                u = this.getTimezoneOffset() / 60;
                i.append((u <= 0 ? "+" : "-") + Math.floor(Math.abs(u)));
                break;
            case "zz":
                u = this.getTimezoneOffset() / 60;
                i.append((u <= 0 ? "+" : "-") + f(Math.floor(Math.abs(u))));
                break;
            case "zzz":
                u = this.getTimezoneOffset() / 60;
                i.append(
                    (u <= 0 ? "+" : "-") +
                    f(Math.floor(Math.abs(u))) +
                    ":" +
                    f(Math.abs(this.getTimezoneOffset() % 60))
                );
                break;
            case "g":
            case "gg":
                r.eras && i.append(r.eras[Date._getEra(this, h) + 1]);
                break;
            case "/":
                i.append(r.DateSeparator);
        }
    }
    return i.toString();
};
String.localeFormat = function() {
    return String._toFormattedString(!0, arguments);
};
Number.parseLocale = function(n) {
    return Number._parse(n, Sys.CultureInfo.CurrentCulture);
};
Number.parseInvariant = function(n) {
    return Number._parse(n, Sys.CultureInfo.InvariantCulture);
};
Number._parse = function(n, t) {
    var l, f, e, r, a, v, y, h, c;
    if (((n = n.trim()), n.match(/^[+-]?infinity$/i))) return parseFloat(n);
    if (n.match(/^0x[a-f0-9]+$/i)) return parseInt(n);
    var i = t.numberFormat,
        o = Number._parseNumberNegativePattern(n, i, i.NumberNegativePattern),
        s = o[0],
        u = o[1];
    return (s === "" &&
            i.NumberNegativePattern !== 1 &&
            ((o = Number._parseNumberNegativePattern(n, i, 1)), (s = o[0]), (u = o[1])),
            s === "" && (s = "+"),
            (e = u.indexOf("e")),
            e < 0 && (e = u.indexOf("E")),
            e < 0 ? ((f = u), (l = null)) : ((f = u.substr(0, e)), (l = u.substr(e + 1))),
            (v = f.indexOf(i.NumberDecimalSeparator)),
            v < 0 ?
            ((r = f), (a = null)) :
            ((r = f.substr(0, v)),
                (a = f.substr(v + i.NumberDecimalSeparator.length))),
            (r = r.split(i.NumberGroupSeparator).join("")),
            (y = i.NumberGroupSeparator.replace(/\u00A0/g, " ")),
            i.NumberGroupSeparator !== y && (r = r.split(y).join("")),
            (h = s + r),
            a !== null && (h += "." + a),
            l !== null &&
            ((c = Number._parseNumberNegativePattern(l, i, 1)),
                c[0] === "" && (c[0] = "+"),
                (h += "e" + c[0] + c[1])),
            h.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/)) ?
        parseFloat(h) :
        Number.NaN;
};
Number._parseNumberNegativePattern = function(n, t, i) {
    var r = t.NegativeSign,
        u = t.PositiveSign;
    switch (i) {
        case 4:
            r = " " + r;
            u = " " + u;
        case 3:
            if (n.endsWith(r)) return ["-", n.substr(0, n.length - r.length)];
            if (n.endsWith(u)) return ["+", n.substr(0, n.length - u.length)];
            break;
        case 2:
            r += " ";
            u += " ";
        case 1:
            if (n.startsWith(r)) return ["-", n.substr(r.length)];
            if (n.startsWith(u)) return ["+", n.substr(u.length)];
            break;
        case 0:
            if (n.startsWith("(") && n.endsWith(")"))
                return ["-", n.substr(1, n.length - 2)];
    }
    return ["", n];
};
Number.prototype.format = function(n) {
    return this._toFormattedString(n, Sys.CultureInfo.InvariantCulture);
};
Number.prototype.localeFormat = function(n) {
    return this._toFormattedString(n, Sys.CultureInfo.CurrentCulture);
};
Number.prototype._toFormattedString = function(n, t) {
    function s(n, t, i) {
        for (var r = n.length; r < t; r++) n = i ? "0" + n : n + "0";
        return n;
    }

    function h(n, t, i, r, u) {
        var a = i[0],
            v = 1,
            p = Math.pow(10, t),
            y = Math.round(n * p) / p,
            h,
            l;
        isFinite(y) || (y = n);
        n = y;
        var e = n.toString(),
            f = "",
            o,
            c = e.split(/e/i);
        for (
            e = c[0],
            o = c.length > 1 ? parseInt(c[1]) : 0,
            c = e.split("."),
            e = c[0],
            f = c.length > 1 ? c[1] : "",
            o > 0 ?
            ((f = s(f, o, !1)), (e += f.slice(0, o)), (f = f.substr(o))) :
            o < 0 &&
            ((o = -o),
                (e = s(e, o + 1, !0)),
                (f = e.slice(-o, e.length) + f),
                (e = e.slice(0, -o))),
            t > 0 ?
            ((f = f.length > t ? f.slice(0, t) : s(f, t, !1)), (f = u + f)) :
            (f = ""),
            h = e.length - 1,
            l = ""; h >= 0;

        ) {
            if (a === 0 || a > h)
                return l.length > 0 ?
                    e.slice(0, h + 1) + r + l + f :
                    e.slice(0, h + 1) + f;
            l =
                l.length > 0 ?
                e.slice(h - a + 1, h + 1) + r + l :
                e.slice(h - a + 1, h + 1);
            h -= a;
            v < i.length && ((a = i[v]), v++);
        }
        return e.slice(0, h + 1) + r + l + f;
    }
    var i, u, r, f, c, e, l, o;
    if (!n || n.length === 0 || n === "i")
        return t && t.name.length > 0 ? this.toLocaleString() : this.toString();
    i = t.numberFormat;
    u = Math.abs(this);
    n || (n = "D");
    r = -1;
    n.length > 1 && (r = parseInt(n.slice(1), 10));
    switch (n.charAt(0)) {
        case "d":
        case "D":
            f = "n";
            r !== -1 && (u = s("" + u, r, !0));
            this < 0 && (u = -u);
            break;
        case "c":
        case "C":
            f =
                this < 0 ? [
                    "($n)",
                    "-$n",
                    "$-n",
                    "$n-",
                    "(n$)",
                    "-n$",
                    "n-$",
                    "n$-",
                    "-n $",
                    "-$ n",
                    "n $-",
                    "$ n-",
                    "$ -n",
                    "n- $",
                    "($ n)",
                    "(n $)",
                ][i.CurrencyNegativePattern] : ["$n", "n$", "$ n", "n $"][i.CurrencyPositivePattern];
            r === -1 && (r = i.CurrencyDecimalDigits);
            u = h(
                Math.abs(this),
                r,
                i.CurrencyGroupSizes,
                i.CurrencyGroupSeparator,
                i.CurrencyDecimalSeparator
            );
            break;
        case "n":
        case "N":
            f =
                this < 0 ? ["(n)", "-n", "- n", "n-", "n -"][i.NumberNegativePattern] :
                "n";
            r === -1 && (r = i.NumberDecimalDigits);
            u = h(
                Math.abs(this),
                r,
                i.NumberGroupSizes,
                i.NumberGroupSeparator,
                i.NumberDecimalSeparator
            );
            break;
        case "p":
        case "P":
            f =
                this < 0 ? ["-n %", "-n%", "-%n"][i.PercentNegativePattern] : ["n %", "n%", "%n"][i.PercentPositivePattern];
            r === -1 && (r = i.PercentDecimalDigits);
            u = h(
                Math.abs(this) * 100,
                r,
                i.PercentGroupSizes,
                i.PercentGroupSeparator,
                i.PercentDecimalSeparator
            );
            break;
        default:
            throw Error.format(Sys.Res.formatBadFormatSpecifier);
    }
    for (c = /n|\$|-|%/g, e = "";;) {
        if (
            ((l = c.lastIndex),
                (o = c.exec(f)),
                (e += f.slice(l, o ? o.index : f.length)), !o)
        )
            break;
        switch (o[0]) {
            case "n":
                e += u;
                break;
            case "$":
                e += i.CurrencySymbol;
                break;
            case "-":
                /[1-9]/.test(u) && (e += i.NegativeSign);
                break;
            case "%":
                e += i.PercentSymbol;
        }
    }
    return e;
};
Sys.CultureInfo = function(n, t, i) {
    this.name = n;
    this.numberFormat = t;
    this.dateTimeFormat = i;
};
Sys.CultureInfo.prototype = {
    _getDateTimeFormats: function() {
        if (!this._dateTimeFormats) {
            var n = this.dateTimeFormat;
            this._dateTimeFormats = [
                n.MonthDayPattern,
                n.YearMonthPattern,
                n.ShortDatePattern,
                n.ShortTimePattern,
                n.LongDatePattern,
                n.LongTimePattern,
                n.FullDateTimePattern,
                n.RFC1123Pattern,
                n.SortableDateTimePattern,
                n.UniversalSortableDateTimePattern,
            ];
        }
        return this._dateTimeFormats;
    },
    _getIndex: function(n, t, i) {
        var u = this._toUpper(n),
            r = Array.indexOf(t, u);
        return r === -1 && (r = Array.indexOf(i, u)), r;
    },
    _getMonthIndex: function(n) {
        return (
            this._upperMonths ||
            ((this._upperMonths = this._toUpperArray(
                    this.dateTimeFormat.MonthNames
                )),
                (this._upperMonthsGenitive = this._toUpperArray(
                    this.dateTimeFormat.MonthGenitiveNames
                ))),
            this._getIndex(n, this._upperMonths, this._upperMonthsGenitive)
        );
    },
    _getAbbrMonthIndex: function(n) {
        return (
            this._upperAbbrMonths ||
            ((this._upperAbbrMonths = this._toUpperArray(
                    this.dateTimeFormat.AbbreviatedMonthNames
                )),
                (this._upperAbbrMonthsGenitive = this._toUpperArray(
                    this.dateTimeFormat.AbbreviatedMonthGenitiveNames
                ))),
            this._getIndex(n, this._upperAbbrMonths, this._upperAbbrMonthsGenitive)
        );
    },
    _getDayIndex: function(n) {
        return (
            this._upperDays ||
            (this._upperDays = this._toUpperArray(this.dateTimeFormat.DayNames)),
            Array.indexOf(this._upperDays, this._toUpper(n))
        );
    },
    _getAbbrDayIndex: function(n) {
        return (
            this._upperAbbrDays ||
            (this._upperAbbrDays = this._toUpperArray(
                this.dateTimeFormat.AbbreviatedDayNames
            )),
            Array.indexOf(this._upperAbbrDays, this._toUpper(n))
        );
    },
    _toUpperArray: function(n) {
        for (var i = [], t = 0, r = n.length; t < r; t++)
            i[t] = this._toUpper(n[t]);
        return i;
    },
    _toUpper: function(n) {
        return n.split(" ").join(" ").toUpperCase();
    },
};
Sys.CultureInfo.registerClass("Sys.CultureInfo");
Sys.CultureInfo._parse = function(n) {
    var t = n.dateTimeFormat;
    return (
        t && !t.eras && (t.eras = n.eras),
        new Sys.CultureInfo(n.name, n.numberFormat, t)
    );
};
Sys.CultureInfo.InvariantCulture = Sys.CultureInfo._parse({
    name: "",
    numberFormat: {
        CurrencyDecimalDigits: 2,
        CurrencyDecimalSeparator: ".",
        IsReadOnly: !0,
        CurrencyGroupSizes: [3],
        NumberGroupSizes: [3],
        PercentGroupSizes: [3],
        CurrencyGroupSeparator: ",",
        CurrencySymbol: "¤",
        NaNSymbol: "NaN",
        CurrencyNegativePattern: 0,
        NumberNegativePattern: 1,
        PercentPositivePattern: 0,
        PercentNegativePattern: 0,
        NegativeInfinitySymbol: "-Infinity",
        NegativeSign: "-",
        NumberDecimalDigits: 2,
        NumberDecimalSeparator: ".",
        NumberGroupSeparator: ",",
        CurrencyPositivePattern: 0,
        PositiveInfinitySymbol: "Infinity",
        PositiveSign: "+",
        PercentDecimalDigits: 2,
        PercentDecimalSeparator: ".",
        PercentGroupSeparator: ",",
        PercentSymbol: "%",
        PerMilleSymbol: "‰",
        NativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        DigitSubstitution: 1,
    },
    dateTimeFormat: {
        AMDesignator: "AM",
        Calendar: {
            MinSupportedDateTime: "@-62135568000000@",
            MaxSupportedDateTime: "@253402300799999@",
            AlgorithmType: 1,
            CalendarType: 1,
            Eras: [1],
            TwoDigitYearMax: 2029,
            IsReadOnly: !0,
        },
        DateSeparator: "/",
        FirstDayOfWeek: 0,
        CalendarWeekRule: 0,
        FullDateTimePattern: "dddd, dd MMMM yyyy HH:mm:ss",
        LongDatePattern: "dddd, dd MMMM yyyy",
        LongTimePattern: "HH:mm:ss",
        MonthDayPattern: "MMMM dd",
        PMDesignator: "PM",
        RFC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
        ShortDatePattern: "MM/dd/yyyy",
        ShortTimePattern: "HH:mm",
        SortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        TimeSeparator: ":",
        UniversalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
        YearMonthPattern: "yyyy MMMM",
        AbbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ShortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        DayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        AbbreviatedMonthNames: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "",
        ],
        MonthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
            "",
        ],
        IsReadOnly: !0,
        NativeCalendarName: "Gregorian Calendar",
        AbbreviatedMonthGenitiveNames: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "",
        ],
        MonthGenitiveNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
            "",
        ],
    },
    eras: [1, "A.D.", null, 0],
});
typeof __cultureInfo == "object" ?
    ((Sys.CultureInfo.CurrentCulture = Sys.CultureInfo._parse(__cultureInfo)),
        delete __cultureInfo) :
    (Sys.CultureInfo.CurrentCulture = Sys.CultureInfo._parse({
        name: "en-US",
        numberFormat: {
            CurrencyDecimalDigits: 2,
            CurrencyDecimalSeparator: ".",
            IsReadOnly: !1,
            CurrencyGroupSizes: [3],
            NumberGroupSizes: [3],
            PercentGroupSizes: [3],
            CurrencyGroupSeparator: ",",
            CurrencySymbol: "$",
            NaNSymbol: "NaN",
            CurrencyNegativePattern: 0,
            NumberNegativePattern: 1,
            PercentPositivePattern: 0,
            PercentNegativePattern: 0,
            NegativeInfinitySymbol: "-Infinity",
            NegativeSign: "-",
            NumberDecimalDigits: 2,
            NumberDecimalSeparator: ".",
            NumberGroupSeparator: ",",
            CurrencyPositivePattern: 0,
            PositiveInfinitySymbol: "Infinity",
            PositiveSign: "+",
            PercentDecimalDigits: 2,
            PercentDecimalSeparator: ".",
            PercentGroupSeparator: ",",
            PercentSymbol: "%",
            PerMilleSymbol: "‰",
            NativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            DigitSubstitution: 1,
        },
        dateTimeFormat: {
            AMDesignator: "AM",
            Calendar: {
                MinSupportedDateTime: "@-62135568000000@",
                MaxSupportedDateTime: "@253402300799999@",
                AlgorithmType: 1,
                CalendarType: 1,
                Eras: [1],
                TwoDigitYearMax: 2029,
                IsReadOnly: !1,
            },
            DateSeparator: "/",
            FirstDayOfWeek: 0,
            CalendarWeekRule: 0,
            FullDateTimePattern: "dddd, MMMM dd, yyyy h:mm:ss tt",
            LongDatePattern: "dddd, MMMM dd, yyyy",
            LongTimePattern: "h:mm:ss tt",
            MonthDayPattern: "MMMM dd",
            PMDesignator: "PM",
            RFC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
            ShortDatePattern: "M/d/yyyy",
            ShortTimePattern: "h:mm tt",
            SortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
            TimeSeparator: ":",
            UniversalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
            YearMonthPattern: "MMMM, yyyy",
            AbbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            ShortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            DayNames: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            AbbreviatedMonthNames: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
                "",
            ],
            MonthNames: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
                "",
            ],
            IsReadOnly: !1,
            NativeCalendarName: "Gregorian Calendar",
            AbbreviatedMonthGenitiveNames: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
                "",
            ],
            MonthGenitiveNames: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
                "",
            ],
        },
        eras: [1, "A.D.", null, 0],
    }));
Type.registerNamespace("Sys.Serialization");
Sys.Serialization.JavaScriptSerializer = function() {};
Sys.Serialization.JavaScriptSerializer.registerClass(
    "Sys.Serialization.JavaScriptSerializer"
);
Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs = [];
Sys.Serialization.JavaScriptSerializer._charsToEscape = [];
Sys.Serialization.JavaScriptSerializer._dateRegEx = new RegExp(
    '(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"',
    "g"
);
Sys.Serialization.JavaScriptSerializer._escapeChars = {};
Sys.Serialization.JavaScriptSerializer._escapeRegEx = new RegExp(
    '["\\\\\\x00-\\x1F]',
    "i"
);
Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal = new RegExp(
    '["\\\\\\x00-\\x1F]',
    "g"
);
Sys.Serialization.JavaScriptSerializer._jsonRegEx = new RegExp(
    "[^,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]",
    "g"
);
Sys.Serialization.JavaScriptSerializer._jsonStringRegEx = new RegExp(
    '"(\\\\.|[^"\\\\])*"',
    "g"
);
Sys.Serialization.JavaScriptSerializer._serverTypeFieldName = "__type";
Sys.Serialization.JavaScriptSerializer._init = function() {
    var i = [
            "\\u0000",
            "\\u0001",
            "\\u0002",
            "\\u0003",
            "\\u0004",
            "\\u0005",
            "\\u0006",
            "\\u0007",
            "\\b",
            "\\t",
            "\\n",
            "\\u000b",
            "\\f",
            "\\r",
            "\\u000e",
            "\\u000f",
            "\\u0010",
            "\\u0011",
            "\\u0012",
            "\\u0013",
            "\\u0014",
            "\\u0015",
            "\\u0016",
            "\\u0017",
            "\\u0018",
            "\\u0019",
            "\\u001a",
            "\\u001b",
            "\\u001c",
            "\\u001d",
            "\\u001e",
            "\\u001f",
        ],
        n,
        t;
    for (
        Sys.Serialization.JavaScriptSerializer._charsToEscape[0] = "\\",
        Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[
            "\\"
        ] = new RegExp("\\\\", "g"),
        Sys.Serialization.JavaScriptSerializer._escapeChars["\\"] = "\\\\",
        Sys.Serialization.JavaScriptSerializer._charsToEscape[1] = '"',
        Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[
            '"'
        ] = new RegExp('"', "g"),
        Sys.Serialization.JavaScriptSerializer._escapeChars['"'] = '\\"',
        n = 0; n < 32; n++
    )
        (t = String.fromCharCode(n)),
        (Sys.Serialization.JavaScriptSerializer._charsToEscape[n + 2] = t),
        (Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[
            t
        ] = new RegExp(t, "g")),
        (Sys.Serialization.JavaScriptSerializer._escapeChars[t] = i[n]);
};
Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder = function(
    n,
    t
) {
    t.append(n.toString());
};
Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder = function(
    n,
    t
) {
    if (isFinite(n)) t.append(String(n));
    else throw Error.invalidOperation(Sys.Res.cannotSerializeNonFiniteNumbers);
};
Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder = function(
    n,
    t
) {
    var r, i;
    if (
        (t.append('"'), Sys.Serialization.JavaScriptSerializer._escapeRegEx.test(n))
    )
        if (
            (Sys.Serialization.JavaScriptSerializer._charsToEscape.length === 0 &&
                Sys.Serialization.JavaScriptSerializer._init(),
                n.length < 128)
        )
            n = n.replace(
                Sys.Serialization.JavaScriptSerializer._escapeRegExGlobal,
                function(n) {
                    return Sys.Serialization.JavaScriptSerializer._escapeChars[n];
                }
            );
        else
            for (r = 0; r < 34; r++)
                (i = Sys.Serialization.JavaScriptSerializer._charsToEscape[r]),
                n.indexOf(i) !== -1 &&
                (n =
                    Sys.Browser.agent === Sys.Browser.Opera ||
                    Sys.Browser.agent === Sys.Browser.FireFox ?
                    n
                    .split(i)
                    .join(
                        Sys.Serialization.JavaScriptSerializer._escapeChars[i]
                    ) :
                    n.replace(
                        Sys.Serialization.JavaScriptSerializer._charsToEscapeRegExs[
                            i
                        ],
                        Sys.Serialization.JavaScriptSerializer._escapeChars[i]
                    ));
    t.append(n);
    t.append('"');
};
Sys.Serialization.JavaScriptSerializer._serializeWithBuilder = function(
    n,
    t,
    i,
    r
) {
    var u, f, e, o, h, s;
    switch (typeof n) {
        case "object":
            if (n)
                if (Number.isInstanceOfType(n))
                    Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(
                        n,
                        t
                    );
                else if (Boolean.isInstanceOfType(n))
                Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(
                    n,
                    t
                );
            else if (String.isInstanceOfType(n))
                Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(
                    n,
                    t
                );
            else if (Array.isInstanceOfType(n)) {
                for (t.append("["), u = 0; u < n.length; ++u)
                    u > 0 && t.append(","),
                    Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(
                        n[u],
                        t, !1,
                        r
                    );
                t.append("]");
            } else {
                if (Date.isInstanceOfType(n)) {
                    t.append('"\\/Date(');
                    t.append(n.getTime());
                    t.append(')\\/"');
                    break;
                }
                f = [];
                e = 0;
                for (o in n)
                    o.startsWith("$") ||
                    (o ===
                        Sys.Serialization.JavaScriptSerializer._serverTypeFieldName &&
                        e !== 0 ?
                        ((f[e++] = f[0]), (f[0] = o)) :
                        (f[e++] = o));
                for (i && f.sort(), t.append("{"), h = !1, u = 0; u < e; u++)
                    (s = n[f[u]]),
                    typeof s != "undefined" &&
                    typeof s != "function" &&
                    (h ? t.append(",") : (h = !0),
                        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(
                            f[u],
                            t,
                            i,
                            r
                        ),
                        t.append(":"),
                        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(
                            s,
                            t,
                            i,
                            r
                        ));
                t.append("}");
            } else t.append("null");
            break;
        case "number":
            Sys.Serialization.JavaScriptSerializer._serializeNumberWithBuilder(n, t);
            break;
        case "string":
            Sys.Serialization.JavaScriptSerializer._serializeStringWithBuilder(n, t);
            break;
        case "boolean":
            Sys.Serialization.JavaScriptSerializer._serializeBooleanWithBuilder(n, t);
            break;
        default:
            t.append("null");
    }
};
Sys.Serialization.JavaScriptSerializer.serialize = function(n) {
    var t = new Sys.StringBuilder();
    return (
        Sys.Serialization.JavaScriptSerializer._serializeWithBuilder(n, t, !1),
        t.toString()
    );
};
Sys.Serialization.JavaScriptSerializer.deserialize = function(data, secure) {
    if (data.length === 0)
        throw Error.argument("data", Sys.Res.cannotDeserializeEmptyString);
    try {
        var exp = data.replace(
            Sys.Serialization.JavaScriptSerializer._dateRegEx,
            "$1new Date($2)"
        );
        if (
            secure &&
            Sys.Serialization.JavaScriptSerializer._jsonRegEx.test(
                exp.replace(Sys.Serialization.JavaScriptSerializer._jsonStringRegEx, "")
            )
        )
            throw null;
        return eval("(" + exp + ")");
    } catch (a) {
        throw Error.argument("data", Sys.Res.cannotDeserializeInvalidJson);
    }
};
Type.registerNamespace("Sys.UI");
Sys.EventHandlerList = function() {
    this._list = {};
};
Sys.EventHandlerList.prototype = {
    _addHandler: function(n, t) {
        Array.add(this._getEvent(n, !0), t);
    },
    addHandler: function(n, t) {
        this._addHandler(n, t);
    },
    _removeHandler: function(n, t) {
        var i = this._getEvent(n);
        i && Array.remove(i, t);
    },
    removeHandler: function(n, t) {
        this._removeHandler(n, t);
    },
    getHandler: function(n) {
        var t = this._getEvent(n);
        return !t || t.length === 0 ?
            null :
            ((t = Array.clone(t)),
                function(n, i) {
                    for (var r = 0, u = t.length; r < u; r++) t[r](n, i);
                });
    },
    _getEvent: function(n, t) {
        if (!this._list[n]) {
            if (!t) return null;
            this._list[n] = [];
        }
        return this._list[n];
    },
};
Sys.EventHandlerList.registerClass("Sys.EventHandlerList");
Sys.CommandEventArgs = function(n, t, i) {
    Sys.CommandEventArgs.initializeBase(this);
    this._commandName = n;
    this._commandArgument = t;
    this._commandSource = i;
};
Sys.CommandEventArgs.prototype = {
    _commandName: null,
    _commandArgument: null,
    _commandSource: null,
    get_commandName: function() {
        return this._commandName;
    },
    get_commandArgument: function() {
        return this._commandArgument;
    },
    get_commandSource: function() {
        return this._commandSource;
    },
};
Sys.CommandEventArgs.registerClass("Sys.CommandEventArgs", Sys.CancelEventArgs);
Sys.INotifyPropertyChange = function() {};
Sys.INotifyPropertyChange.prototype = {};
Sys.INotifyPropertyChange.registerInterface("Sys.INotifyPropertyChange");
Sys.PropertyChangedEventArgs = function(n) {
    Sys.PropertyChangedEventArgs.initializeBase(this);
    this._propertyName = n;
};
Sys.PropertyChangedEventArgs.prototype = {
    get_propertyName: function() {
        return this._propertyName;
    },
};
Sys.PropertyChangedEventArgs.registerClass(
    "Sys.PropertyChangedEventArgs",
    Sys.EventArgs
);
Sys.INotifyDisposing = function() {};
Sys.INotifyDisposing.prototype = {};
Sys.INotifyDisposing.registerInterface("Sys.INotifyDisposing");
Sys.Component = function() {
    Sys.Application && Sys.Application.registerDisposableObject(this);
};
Sys.Component.prototype = {
    _id: null,
    _initialized: !1,
    _updating: !1,
    get_events: function() {
        return (
            this._events || (this._events = new Sys.EventHandlerList()), this._events
        );
    },
    get_id: function() {
        return this._id;
    },
    set_id: function(n) {
        this._id = n;
    },
    get_isInitialized: function() {
        return this._initialized;
    },
    get_isUpdating: function() {
        return this._updating;
    },
    add_disposing: function(n) {
        this.get_events().addHandler("disposing", n);
    },
    remove_disposing: function(n) {
        this.get_events().removeHandler("disposing", n);
    },
    add_propertyChanged: function(n) {
        this.get_events().addHandler("propertyChanged", n);
    },
    remove_propertyChanged: function(n) {
        this.get_events().removeHandler("propertyChanged", n);
    },
    beginUpdate: function() {
        this._updating = !0;
    },
    dispose: function() {
        if (this._events) {
            var n = this._events.getHandler("disposing");
            n && n(this, Sys.EventArgs.Empty);
        }
        delete this._events;
        Sys.Application.unregisterDisposableObject(this);
        Sys.Application.removeComponent(this);
    },
    endUpdate: function() {
        this._updating = !1;
        this._initialized || this.initialize();
        this.updated();
    },
    initialize: function() {
        this._initialized = !0;
    },
    raisePropertyChanged: function(n) {
        if (this._events) {
            var t = this._events.getHandler("propertyChanged");
            t && t(this, new Sys.PropertyChangedEventArgs(n));
        }
    },
    updated: function() {},
};
Sys.Component.registerClass(
    "Sys.Component",
    null,
    Sys.IDisposable,
    Sys.INotifyPropertyChange,
    Sys.INotifyDisposing
);
$create = Sys.Component.create = function(n, t, i, r, u) {
    var f = u ? new n(u) : new n(),
        e = Sys.Application,
        s = e.get_isCreatingComponents(),
        o;
    if ((f.beginUpdate(), t && Sys$Component$_setProperties(f, t), i))
        for (o in i) f["add_" + o](i[o]);
    return (
        f.get_id() && e.addComponent(f),
        s ?
        ((e._createdComponents[e._createdComponents.length] = f),
            r ? e._addComponentToSecondPass(f, r) : f.endUpdate()) :
        (r && Sys$Component$_setReferences(f, r), f.endUpdate()),
        f
    );
};
Sys.UI.MouseButton = function() {
    throw Error.notImplemented();
};
Sys.UI.MouseButton.prototype = {
    leftButton: 0,
    middleButton: 1,
    rightButton: 2,
};
Sys.UI.MouseButton.registerEnum("Sys.UI.MouseButton");
Sys.UI.Key = function() {
    throw Error.notImplemented();
};
Sys.UI.Key.prototype = {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    space: 32,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 127,
};
Sys.UI.Key.registerEnum("Sys.UI.Key");
Sys.UI.Point = function(n, t) {
    this.x = n;
    this.y = t;
};
Sys.UI.Point.registerClass("Sys.UI.Point");
Sys.UI.Bounds = function(n, t, i, r) {
    this.x = n;
    this.y = t;
    this.height = r;
    this.width = i;
};
Sys.UI.Bounds.registerClass("Sys.UI.Bounds");
Sys.UI.DomEvent = function(n) {
    var t = n,
        u = (this.type = t.type.toLowerCase()),
        i,
        r;
    this.rawEvent = t;
    this.altKey = t.altKey;
    typeof t.button != "undefined" &&
        (this.button =
            typeof t.which != "undefined" ?
            t.button :
            t.button === 4 ?
            Sys.UI.MouseButton.middleButton :
            t.button === 2 ?
            Sys.UI.MouseButton.rightButton :
            Sys.UI.MouseButton.leftButton);
    u === "keypress" ?
        (this.charCode = t.charCode || t.keyCode) :
        (this.keyCode = t.keyCode && t.keyCode === 46 ? 127 : t.keyCode);
    this.clientX = t.clientX;
    this.clientY = t.clientY;
    this.ctrlKey = t.ctrlKey;
    this.target = t.target ? t.target : t.srcElement;
    u.startsWith("key") ||
        (typeof t.offsetX != "undefined" && typeof t.offsetY != "undefined" ?
            ((this.offsetX = t.offsetX), (this.offsetY = t.offsetY)) :
            this.target &&
            this.target.nodeType !== 3 &&
            typeof t.clientX == "number" &&
            ((i = Sys.UI.DomElement.getLocation(this.target)),
                (r = Sys.UI.DomElement._getWindow(this.target)),
                (this.offsetX = (r.pageXOffset || 0) + t.clientX - i.x),
                (this.offsetY = (r.pageYOffset || 0) + t.clientY - i.y)));
    this.screenX = t.screenX;
    this.screenY = t.screenY;
    this.shiftKey = t.shiftKey;
};
Sys.UI.DomEvent.prototype = {
    preventDefault: function() {
        this.rawEvent.preventDefault ?
            this.rawEvent.preventDefault() :
            window.event && (this.rawEvent.returnValue = !1);
    },
    stopPropagation: function() {
        this.rawEvent.stopPropagation ?
            this.rawEvent.stopPropagation() :
            window.event && (this.rawEvent.cancelBubble = !0);
    },
};
Sys.UI.DomEvent.registerClass("Sys.UI.DomEvent");
var $addHandler = (Sys.UI.DomEvent.addHandler = function(n, t, i, r) {
        var u, f, e;
        n._events || (n._events = {});
        u = n._events[t];
        u || (n._events[t] = u = []);
        n.addEventListener ?
            ((f = function(t) {
                    return i.call(n, new Sys.UI.DomEvent(t));
                }),
                n.addEventListener(t, f, !1)) :
            n.attachEvent &&
            ((f = function() {
                    var t = {};
                    try {
                        t = Sys.UI.DomElement._getWindow(n).event;
                    } catch (r) {}
                    return i.call(n, new Sys.UI.DomEvent(t));
                }),
                n.attachEvent("on" + t, f));
        u[u.length] = { handler: i, browserHandler: f, autoRemove: r };
        r &&
            ((e = n.dispose),
                e !== Sys.UI.DomEvent._disposeHandlers &&
                ((n.dispose = Sys.UI.DomEvent._disposeHandlers),
                    typeof e != "undefined" && (n._chainDispose = e)));
    }),
    $addHandlers = (Sys.UI.DomEvent.addHandlers = function(n, t, i, r) {
        var f, u;
        for (f in t)
            (u = t[f]),
            i && (u = Function.createDelegate(i, u)),
            $addHandler(n, f, u, r || !1);
    }),
    $clearHandlers = (Sys.UI.DomEvent.clearHandlers = function(n) {
        Sys.UI.DomEvent._clearHandlers(n, !1);
    });
Sys.UI.DomEvent._clearHandlers = function(n, t) {
    var r, u, f, i, e;
    if (n._events) {
        r = n._events;
        for (u in r)
            for (f = r[u], i = f.length - 1; i >= 0; i--)
                (e = f[i]), (!t || e.autoRemove) && $removeHandler(n, u, e.handler);
        n._events = null;
    }
};
Sys.UI.DomEvent._disposeHandlers = function() {
    Sys.UI.DomEvent._clearHandlers(this, !0);
    var n = this._chainDispose,
        t = typeof n;
    t !== "undefined" &&
        ((this.dispose = n),
            (this._chainDispose = null),
            t === "function" && this.dispose());
};
$removeHandler = Sys.UI.DomEvent.removeHandler = function(n, t, i) {
    Sys.UI.DomEvent._removeHandler(n, t, i);
};
Sys.UI.DomEvent._removeHandler = function(n, t, i) {
    for (var f = null, u = n._events[t], r = 0, e = u.length; r < e; r++)
        if (u[r].handler === i) {
            f = u[r].browserHandler;
            break;
        }
    n.removeEventListener ?
        n.removeEventListener(t, f, !1) :
        n.detachEvent && n.detachEvent("on" + t, f);
    u.splice(r, 1);
};
Sys.UI.DomElement = function() {};
Sys.UI.DomElement.registerClass("Sys.UI.DomElement");
Sys.UI.DomElement.addCssClass = function(n, t) {
    Sys.UI.DomElement.containsCssClass(n, t) ||
        (n.className === "" ? (n.className = t) : (n.className += " " + t));
};
Sys.UI.DomElement.containsCssClass = function(n, t) {
    return Array.contains(n.className.split(" "), t);
};
Sys.UI.DomElement.getBounds = function(n) {
    var t = Sys.UI.DomElement.getLocation(n);
    return new Sys.UI.Bounds(t.x, t.y, n.offsetWidth || 0, n.offsetHeight || 0);
};
$get = Sys.UI.DomElement.getElementById = function(n, t) {
    var u, f, r, i;
    if (!t) return document.getElementById(n);
    if (t.getElementById) return t.getElementById(n);
    for (u = [], f = t.childNodes, r = 0; r < f.length; r++)
        (i = f[r]), i.nodeType == 1 && (u[u.length] = i);
    while (u.length) {
        if (((i = u.shift()), i.id == n)) return i;
        for (f = i.childNodes, r = 0; r < f.length; r++)
            (i = f[r]), i.nodeType == 1 && (u[u.length] = i);
    }
    return null;
};
Sys.UI.DomElement.getLocation = document.documentElement.getBoundingClientRect ?

    function(n) {
        var u, e, o;
        if (
            n.self ||
            n.nodeType === 9 ||
            n === document.documentElement ||
            n.parentNode === n.ownerDocument.documentElement ||
            ((u = n.getBoundingClientRect()), !u)
        )
            return new Sys.UI.Point(0, 0);
        var f = n.ownerDocument.documentElement,
            i = Math.round(u.left) + f.scrollLeft,
            r = Math.round(u.top) + f.scrollTop;
        if (Sys.Browser.agent === Sys.Browser.InternetExplorer) {
            try {
                e = n.ownerDocument.parentWindow.frameElement || null;
                e &&
                    ((o = e.frameBorder === "0" || e.frameBorder === "no" ? 2 : 0),
                        (i += o),
                        (r += o));
            } catch (c) {}
            if (Sys.Browser.version === 7 && !document.documentMode) {
                var s = document.body,
                    h = s.getBoundingClientRect(),
                    t = (h.right - h.left) / s.clientWidth;
                t = Math.round(t * 100);
                t = (t - (t % 5)) / 100;
                isNaN(t) ||
                    t === 1 ||
                    ((i = Math.round(i / t)), (r = Math.round(r / t)));
            }
            (document.documentMode || 0) < 8 &&
                ((i -= f.clientLeft), (r -= f.clientTop));
        }
        return new Sys.UI.Point(i, r);
    } :
    Sys.Browser.agent === Sys.Browser.Safari ?

    function(n) {
        var r, o, s;
        if ((n.window && n.window === n) || n.nodeType === 9)
            return new Sys.UI.Point(0, 0);
        for (
            var u = 0, f = 0, h = null, e = null, i, t = n; t; h = t, e = i, t = t.offsetParent
        )
            (i = Sys.UI.DomElement._getCurrentStyle(t)),
            (r = t.tagName ? t.tagName.toUpperCase() : null),
            (t.offsetLeft || t.offsetTop) &&
            (r !== "BODY" || !e || e.position !== "absolute") &&
            ((u += t.offsetLeft), (f += t.offsetTop)),
            h &&
            Sys.Browser.version >= 3 &&
            ((u += parseInt(i.borderLeftWidth)),
                (f += parseInt(i.borderTopWidth)));
        if (
            ((i = Sys.UI.DomElement._getCurrentStyle(n)),
                (o = i ? i.position : null), !o || o !== "absolute")
        )
            for (t = n.parentNode; t; t = t.parentNode)
                if (
                    ((r = t.tagName ? t.tagName.toUpperCase() : null),
                        r !== "BODY" &&
                        r !== "HTML" &&
                        (t.scrollLeft || t.scrollTop) &&
                        ((u -= t.scrollLeft || 0), (f -= t.scrollTop || 0)),
                        (i = Sys.UI.DomElement._getCurrentStyle(t)),
                        (s = i ? i.position : null),
                        s && s === "absolute")
                )
                    break;
        return new Sys.UI.Point(u, f);
    } :
    function(n) {
        var r, o;
        if ((n.window && n.window === n) || n.nodeType === 9)
            return new Sys.UI.Point(0, 0);
        for (
            var u = 0, f = 0, s = null, e = null, i = null, t = n; t; s = t, e = i, t = t.offsetParent
        )
            (r = t.tagName ? t.tagName.toUpperCase() : null),
            (i = Sys.UI.DomElement._getCurrentStyle(t)), !(t.offsetLeft || t.offsetTop) ||
            (r === "BODY" && (!e || e.position !== "absolute")) ||
            ((u += t.offsetLeft), (f += t.offsetTop)),
            s !== null &&
            i &&
            (r !== "TABLE" &&
                r !== "TD" &&
                r !== "HTML" &&
                ((u += parseInt(i.borderLeftWidth) || 0),
                    (f += parseInt(i.borderTopWidth) || 0)),
                r === "TABLE" &&
                (i.position === "relative" || i.position === "absolute") &&
                ((u += parseInt(i.marginLeft) || 0),
                    (f += parseInt(i.marginTop) || 0)));
        if (
            ((i = Sys.UI.DomElement._getCurrentStyle(n)),
                (o = i ? i.position : null), !o || o !== "absolute")
        )
            for (t = n.parentNode; t; t = t.parentNode)
                (r = t.tagName ? t.tagName.toUpperCase() : null),
                r !== "BODY" &&
                r !== "HTML" &&
                (t.scrollLeft || t.scrollTop) &&
                ((u -= t.scrollLeft || 0),
                    (f -= t.scrollTop || 0),
                    (i = Sys.UI.DomElement._getCurrentStyle(t)),
                    i &&
                    ((u += parseInt(i.borderLeftWidth) || 0),
                        (f += parseInt(i.borderTopWidth) || 0)));
        return new Sys.UI.Point(u, f);
    };
Sys.UI.DomElement.isDomElement = function(n) {
    return Sys._isDomElement(n);
};
Sys.UI.DomElement.removeCssClass = function(n, t) {
    var i = " " + n.className + " ",
        r = i.indexOf(" " + t + " ");
    r >= 0 &&
        (n.className = (
            i.substr(0, r) +
            " " +
            i.substring(r + t.length + 1, i.length)
        ).trim());
};
Sys.UI.DomElement.resolveElement = function(n, t) {
    var i = n;
    return i ?
        (typeof i == "string" && (i = Sys.UI.DomElement.getElementById(i, t)), i) :
        null;
};
Sys.UI.DomElement.raiseBubbleEvent = function(n, t) {
    for (var r = n, i; r;) {
        if (((i = r.control), i && i.onBubbleEvent && i.raiseBubbleEvent)) {
            Sys.UI.DomElement._raiseBubbleEventFromControl(i, n, t);
            return;
        }
        r = r.parentNode;
    }
};
Sys.UI.DomElement._raiseBubbleEventFromControl = function(n, t, i) {
    n.onBubbleEvent(t, i) || n._raiseBubbleEvent(t, i);
};
Sys.UI.DomElement.setLocation = function(n, t, i) {
    var r = n.style;
    r.position = "absolute";
    r.left = t + "px";
    r.top = i + "px";
};
Sys.UI.DomElement.toggleCssClass = function(n, t) {
    Sys.UI.DomElement.containsCssClass(n, t) ?
        Sys.UI.DomElement.removeCssClass(n, t) :
        Sys.UI.DomElement.addCssClass(n, t);
};
Sys.UI.DomElement.getVisibilityMode = function(n) {
    return n._visibilityMode === Sys.UI.VisibilityMode.hide ?
        Sys.UI.VisibilityMode.hide :
        Sys.UI.VisibilityMode.collapse;
};
Sys.UI.DomElement.setVisibilityMode = function(n, t) {
    Sys.UI.DomElement._ensureOldDisplayMode(n);
    n._visibilityMode !== t &&
        ((n._visibilityMode = t),
            Sys.UI.DomElement.getVisible(n) === !1 &&
            (n.style.display =
                n._visibilityMode === Sys.UI.VisibilityMode.hide ?
                n._oldDisplayMode :
                "none"),
            (n._visibilityMode = t));
};
Sys.UI.DomElement.getVisible = function(n) {
    var t = n.currentStyle || Sys.UI.DomElement._getCurrentStyle(n);
    return t ? t.visibility !== "hidden" && t.display !== "none" : !0;
};
Sys.UI.DomElement.setVisible = function(n, t) {
    t !== Sys.UI.DomElement.getVisible(n) &&
        (Sys.UI.DomElement._ensureOldDisplayMode(n),
            (n.style.visibility = t ? "visible" : "hidden"),
            (n.style.display =
                t || n._visibilityMode === Sys.UI.VisibilityMode.hide ?
                n._oldDisplayMode :
                "none"));
};
Sys.UI.DomElement._ensureOldDisplayMode = function(n) {
    if (!n._oldDisplayMode) {
        var t = n.currentStyle || Sys.UI.DomElement._getCurrentStyle(n);
        if (
            ((n._oldDisplayMode = t ? t.display : null), !n._oldDisplayMode || n._oldDisplayMode === "none")
        )
            switch (n.tagName.toUpperCase()) {
                case "DIV":
                case "P":
                case "ADDRESS":
                case "BLOCKQUOTE":
                case "BODY":
                case "COL":
                case "COLGROUP":
                case "DD":
                case "DL":
                case "DT":
                case "FIELDSET":
                case "FORM":
                case "H1":
                case "H2":
                case "H3":
                case "H4":
                case "H5":
                case "H6":
                case "HR":
                case "IFRAME":
                case "LEGEND":
                case "OL":
                case "PRE":
                case "TABLE":
                case "TD":
                case "TH":
                case "TR":
                case "UL":
                    n._oldDisplayMode = "block";
                    break;
                case "LI":
                    n._oldDisplayMode = "list-item";
                    break;
                default:
                    n._oldDisplayMode = "inline";
            }
    }
};
Sys.UI.DomElement._getWindow = function(n) {
    var t = n.ownerDocument || n.document || n;
    return t.defaultView || t.parentWindow;
};
Sys.UI.DomElement._getCurrentStyle = function(n) {
    var t, i, f, e, r, u;
    if (n.nodeType === 3) return null;
    if (
        ((t = Sys.UI.DomElement._getWindow(n)),
            n.documentElement && (n = n.documentElement),
            (i =
                t && n !== t && t.getComputedStyle ?
                t.getComputedStyle(n, null) :
                n.currentStyle || n.style), !i && Sys.Browser.agent === Sys.Browser.Safari && n.style)
    ) {
        f = n.style.display;
        e = n.style.position;
        n.style.position = "absolute";
        n.style.display = "block";
        r = t.getComputedStyle(n, null);
        n.style.display = f;
        n.style.position = e;
        i = {};
        for (u in r) i[u] = r[u];
        i.display = "none";
    }
    return i;
};
Sys.IContainer = function() {};
Sys.IContainer.prototype = {};
Sys.IContainer.registerInterface("Sys.IContainer");
Sys.ApplicationLoadEventArgs = function(n, t) {
    Sys.ApplicationLoadEventArgs.initializeBase(this);
    this._components = n;
    this._isPartialLoad = t;
};
Sys.ApplicationLoadEventArgs.prototype = {
    get_components: function() {
        return this._components;
    },
    get_isPartialLoad: function() {
        return this._isPartialLoad;
    },
};
Sys.ApplicationLoadEventArgs.registerClass(
    "Sys.ApplicationLoadEventArgs",
    Sys.EventArgs
);
Sys._Application = function() {
    Sys._Application.initializeBase(this);
    this._disposableObjects = [];
    this._components = {};
    this._createdComponents = [];
    this._secondPassComponents = [];
    this._unloadHandlerDelegate = Function.createDelegate(
        this,
        this._unloadHandler
    );
    Sys.UI.DomEvent.addHandler(window, "unload", this._unloadHandlerDelegate);
    this._domReady();
};
Sys._Application.prototype = {
    _creatingComponents: !1,
    _disposing: !1,
    _deleteCount: 0,
    get_isCreatingComponents: function() {
        return this._creatingComponents;
    },
    get_isDisposing: function() {
        return this._disposing;
    },
    add_init: function(n) {
        this._initialized ?
            n(this, Sys.EventArgs.Empty) :
            this.get_events().addHandler("init", n);
    },
    remove_init: function(n) {
        this.get_events().removeHandler("init", n);
    },
    add_load: function(n) {
        this.get_events().addHandler("load", n);
    },
    remove_load: function(n) {
        this.get_events().removeHandler("load", n);
    },
    add_unload: function(n) {
        this.get_events().addHandler("unload", n);
    },
    remove_unload: function(n) {
        this.get_events().removeHandler("unload", n);
    },
    addComponent: function(n) {
        this._components[n.get_id()] = n;
    },
    beginCreateComponents: function() {
        this._creatingComponents = !0;
    },
    dispose: function() {
        var t, i, n, f, r, u;
        if (!this._disposing) {
            for (
                this._disposing = !0,
                this._timerCookie &&
                (window.clearTimeout(this._timerCookie), delete this._timerCookie),
                this._endRequestHandler &&
                (Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(
                        this._endRequestHandler
                    ),
                    delete this._endRequestHandler),
                this._beginRequestHandler &&
                (Sys.WebForms.PageRequestManager.getInstance().remove_beginRequest(
                        this._beginRequestHandler
                    ),
                    delete this._beginRequestHandler),
                window.pageUnload && window.pageUnload(this, Sys.EventArgs.Empty),
                t = this.get_events().getHandler("unload"),
                t && t(this, Sys.EventArgs.Empty),
                i = Array.clone(this._disposableObjects),
                n = 0,
                f = i.length; n < f; n++
            )
                (r = i[n]), typeof r != "undefined" && r.dispose();
            Array.clear(this._disposableObjects);
            Sys.UI.DomEvent.removeHandler(
                window,
                "unload",
                this._unloadHandlerDelegate
            );
            Sys._ScriptLoader &&
                ((u = Sys._ScriptLoader.getInstance()), u && u.dispose());
            Sys._Application.callBaseMethod(this, "dispose");
        }
    },
    disposeElement: function(n, t) {
        var f, e, u, i;
        if (n.nodeType === 1) {
            for (
                var s = n.getElementsByTagName("*"),
                    o = s.length,
                    h = new Array(o),
                    r = 0; r < o; r++
            )
                h[r] = s[r];
            for (r = o - 1; r >= 0; r--)
                (f = h[r]),
                (e = f.dispose),
                e && typeof e == "function" ?
                f.dispose() :
                ((u = f.control),
                    u && typeof u.dispose == "function" && u.dispose()),
                (i = f._behaviors),
                i && this._disposeComponents(i),
                (i = f._components),
                i && (this._disposeComponents(i), (f._components = null));
            t ||
                ((e = n.dispose),
                    e && typeof e == "function" ?
                    n.dispose() :
                    ((u = n.control),
                        u && typeof u.dispose == "function" && u.dispose()),
                    (i = n._behaviors),
                    i && this._disposeComponents(i),
                    (i = n._components),
                    i && (this._disposeComponents(i), (n._components = null)));
        }
    },
    endCreateComponents: function() {
        for (var t = this._secondPassComponents, i, n = 0, r = t.length; n < r; n++)
            (i = t[n].component),
            Sys$Component$_setReferences(i, t[n].references),
            i.endUpdate();
        this._secondPassComponents = [];
        this._creatingComponents = !1;
    },
    findComponent: function(n, t) {
        return t ?
            Sys.IContainer.isInstanceOfType(t) ?
            t.findComponent(n) :
            t[n] || null :
            Sys.Application._components[n] || null;
    },
    getComponents: function() {
        var n = [],
            t = this._components,
            i;
        for (i in t) n[n.length] = t[i];
        return n;
    },
    initialize: function() {
        if (!this.get_isInitialized() && !this._disposing) {
            if (
                (Sys._Application.callBaseMethod(this, "initialize"),
                    this._raiseInit(),
                    this.get_stateString)
            ) {
                Sys.WebForms &&
                    Sys.WebForms.PageRequestManager &&
                    ((this._beginRequestHandler = Function.createDelegate(
                            this,
                            this._onPageRequestManagerBeginRequest
                        )),
                        Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(
                            this._beginRequestHandler
                        ),
                        (this._endRequestHandler = Function.createDelegate(
                            this,
                            this._onPageRequestManagerEndRequest
                        )),
                        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(
                            this._endRequestHandler
                        ));
                var n = this.get_stateString();
                n !== this._currentEntry ? this._navigate(n) : this._ensureHistory();
            }
            this.raiseLoad();
        }
    },
    notifyScriptLoaded: function() {},
    registerDisposableObject: function(n) {
        if (!this._disposing) {
            var t = this._disposableObjects,
                i = t.length;
            t[i] = n;
            n.__msdisposeindex = i;
        }
    },
    raiseLoad: function() {
        var n = this.get_events().getHandler("load"),
            t = new Sys.ApplicationLoadEventArgs(
                Array.clone(this._createdComponents), !!this._loaded
            );
        this._loaded = !0;
        n && n(this, t);
        window.pageLoad && window.pageLoad(this, t);
        this._createdComponents = [];
    },
    removeComponent: function(n) {
        var t = n.get_id();
        t && delete this._components[t];
    },
    unregisterDisposableObject: function(n) {
        var u, t, i, r, f;
        if (!this._disposing &&
            ((u = n.__msdisposeindex),
                typeof u == "number" &&
                ((t = this._disposableObjects),
                    delete t[u],
                    delete n.__msdisposeindex,
                    ++this._deleteCount > 1e3))
        ) {
            for (i = [], r = 0, f = t.length; r < f; r++)
                (n = t[r]),
                typeof n != "undefined" &&
                ((n.__msdisposeindex = i.length), i.push(n));
            this._disposableObjects = i;
            this._deleteCount = 0;
        }
    },
    _addComponentToSecondPass: function(n, t) {
        this._secondPassComponents[this._secondPassComponents.length] = {
            component: n,
            references: t,
        };
    },
    _disposeComponents: function(n) {
        var t, i;
        if (n)
            for (t = n.length - 1; t >= 0; t--)
                (i = n[t]), typeof i.dispose == "function" && i.dispose();
    },
    _domReady: function() {
        function t() {
            u.initialize();
        }
        var n,
            u = this,
            r = function() {
                Sys.UI.DomEvent.removeHandler(window, "load", r);
                t();
            },
            f,
            i;
        if (
            (Sys.UI.DomEvent.addHandler(window, "load", r), document.addEventListener)
        )
            try {
                document.addEventListener(
                    "DOMContentLoaded",
                    (n = function() {
                        document.removeEventListener("DOMContentLoaded", n, !1);
                        t();
                    }), !1
                );
            } catch (e) {}
        else
            document.attachEvent &&
            (window == window.top && document.documentElement.doScroll ?
                ((i = document.createElement("div")),
                    (n = function() {
                        try {
                            i.doScroll("left");
                        } catch (r) {
                            f = window.setTimeout(n, 0);
                            return;
                        }
                        i = null;
                        t();
                    }),
                    n()) :
                document.attachEvent(
                    "onreadystatechange",
                    (n = function() {
                        document.readyState === "complete" &&
                            (document.detachEvent("onreadystatechange", n), t());
                    })
                ));
    },
    _raiseInit: function() {
        var n = this.get_events().getHandler("init");
        n &&
            (this.beginCreateComponents(),
                n(this, Sys.EventArgs.Empty),
                this.endCreateComponents());
    },
    _unloadHandler: function() {
        this.dispose();
    },
};
Sys._Application.registerClass(
    "Sys._Application",
    Sys.Component,
    Sys.IContainer
);
Sys.Application = new Sys._Application();
$find = Sys.Application.findComponent;
Sys.UI.Behavior = function(n) {
    Sys.UI.Behavior.initializeBase(this);
    this._element = n;
    var t = n._behaviors;
    t ? (t[t.length] = this) : (n._behaviors = [this]);
};
Sys.UI.Behavior.prototype = {
    _name: null,
    get_element: function() {
        return this._element;
    },
    get_id: function() {
        var n = Sys.UI.Behavior.callBaseMethod(this, "get_id");
        return n ?
            n :
            !this._element || !this._element.id ?
            "" :
            this._element.id + "$" + this.get_name();
    },
    get_name: function() {
        if (this._name) return this._name;
        var n = Object.getTypeName(this),
            t = n.lastIndexOf(".");
        return (
            t !== -1 && (n = n.substr(t + 1)),
            this.get_isInitialized() || (this._name = n),
            n
        );
    },
    set_name: function(n) {
        this._name = n;
    },
    initialize: function() {
        Sys.UI.Behavior.callBaseMethod(this, "initialize");
        var n = this.get_name();
        n && (this._element[n] = this);
    },
    dispose: function() {
        var n, t, i;
        Sys.UI.Behavior.callBaseMethod(this, "dispose");
        n = this._element;
        n &&
            ((t = this.get_name()),
                t && (n[t] = null),
                (i = n._behaviors),
                Array.remove(i, this),
                i.length === 0 && (n._behaviors = null),
                delete this._element);
    },
};
Sys.UI.Behavior.registerClass("Sys.UI.Behavior", Sys.Component);
Sys.UI.Behavior.getBehaviorByName = function(n, t) {
    var i = n[t];
    return i && Sys.UI.Behavior.isInstanceOfType(i) ? i : null;
};
Sys.UI.Behavior.getBehaviors = function(n) {
    return n._behaviors ? Array.clone(n._behaviors) : [];
};
Sys.UI.Behavior.getBehaviorsByType = function(n, t) {
    var r = n._behaviors,
        u = [],
        i,
        f;
    if (r)
        for (i = 0, f = r.length; i < f; i++)
            t.isInstanceOfType(r[i]) && (u[u.length] = r[i]);
    return u;
};
Sys.UI.VisibilityMode = function() {
    throw Error.notImplemented();
};
Sys.UI.VisibilityMode.prototype = { hide: 0, collapse: 1 };
Sys.UI.VisibilityMode.registerEnum("Sys.UI.VisibilityMode");
Sys.UI.Control = function(n) {
    Sys.UI.Control.initializeBase(this);
    this._element = n;
    n.control = this;
    var t = this.get_role();
    t && n.setAttribute("role", t);
};
Sys.UI.Control.prototype = {
    _parent: null,
    _visibilityMode: Sys.UI.VisibilityMode.hide,
    get_element: function() {
        return this._element;
    },
    get_id: function() {
        return this._element ? this._element.id : "";
    },
    set_id: function() {
        throw Error.invalidOperation(Sys.Res.cantSetId);
    },
    get_parent: function() {
        if (this._parent) return this._parent;
        if (!this._element) return null;
        for (var n = this._element.parentNode; n;) {
            if (n.control) return n.control;
            n = n.parentNode;
        }
        return null;
    },
    set_parent: function(n) {
        this._parent = n;
    },
    get_role: function() {
        return null;
    },
    get_visibilityMode: function() {
        return Sys.UI.DomElement.getVisibilityMode(this._element);
    },
    set_visibilityMode: function(n) {
        Sys.UI.DomElement.setVisibilityMode(this._element, n);
    },
    get_visible: function() {
        return Sys.UI.DomElement.getVisible(this._element);
    },
    set_visible: function(n) {
        Sys.UI.DomElement.setVisible(this._element, n);
    },
    addCssClass: function(n) {
        Sys.UI.DomElement.addCssClass(this._element, n);
    },
    dispose: function() {
        Sys.UI.Control.callBaseMethod(this, "dispose");
        this._element && ((this._element.control = null), delete this._element);
        this._parent && delete this._parent;
    },
    onBubbleEvent: function() {
        return !1;
    },
    raiseBubbleEvent: function(n, t) {
        this._raiseBubbleEvent(n, t);
    },
    _raiseBubbleEvent: function(n, t) {
        for (var i = this.get_parent(); i;) {
            if (i.onBubbleEvent(n, t)) return;
            i = i.get_parent();
        }
    },
    removeCssClass: function(n) {
        Sys.UI.DomElement.removeCssClass(this._element, n);
    },
    toggleCssClass: function(n) {
        Sys.UI.DomElement.toggleCssClass(this._element, n);
    },
};
Sys.UI.Control.registerClass("Sys.UI.Control", Sys.Component);
Sys.HistoryEventArgs = function(n) {
    Sys.HistoryEventArgs.initializeBase(this);
    this._state = n;
};
Sys.HistoryEventArgs.prototype = {
    get_state: function() {
        return this._state;
    },
};
Sys.HistoryEventArgs.registerClass("Sys.HistoryEventArgs", Sys.EventArgs);
Sys.Application._appLoadHandler = null;
Sys.Application._beginRequestHandler = null;
Sys.Application._clientId = null;
Sys.Application._currentEntry = "";
Sys.Application._endRequestHandler = null;
Sys.Application._history = null;
Sys.Application._enableHistory = !1;
Sys.Application._historyFrame = null;
Sys.Application._historyInitialized = !1;
Sys.Application._historyPointIsNew = !1;
Sys.Application._ignoreTimer = !1;
Sys.Application._initialState = null;
Sys.Application._state = {};
Sys.Application._timerCookie = 0;
Sys.Application._timerHandler = null;
Sys.Application._uniqueId = null;
Sys._Application.prototype.get_stateString = function() {
    var n = null,
        t,
        i;
    return Sys.Browser.agent === Sys.Browser.Firefox ?
        ((t = window.location.href),
            (i = t.indexOf("#")),
            i !== -1 ? t.substring(i + 1) : "") :
        ((n = window.location.hash),
            n.length > 0 && n.charAt(0) === "#" && (n = n.substring(1)),
            n);
};
Sys._Application.prototype.get_enableHistory = function() {
    return this._enableHistory;
};
Sys._Application.prototype.set_enableHistory = function(n) {
    this._enableHistory = n;
};
Sys._Application.prototype.add_navigate = function(n) {
    this.get_events().addHandler("navigate", n);
};
Sys._Application.prototype.remove_navigate = function(n) {
    this.get_events().removeHandler("navigate", n);
};
Sys._Application.prototype.addHistoryPoint = function(n, t) {
    var i, r, u, f;
    this._ensureHistory();
    i = this._state;
    for (r in n)
        (u = n[r]),
        u === null ? typeof i[r] != "undefined" && delete i[r] : (i[r] = u);
    f = this._serializeState(i);
    this._historyPointIsNew = !0;
    this._setState(f, t);
    this._raiseNavigate();
};
Sys._Application.prototype.setServerId = function(n, t) {
    this._clientId = n;
    this._uniqueId = t;
};
Sys._Application.prototype.setServerState = function(n) {
    this._ensureHistory();
    this._state.__s = n;
    this._updateHiddenField(n);
};
Sys._Application.prototype._deserializeState = function(n) {
    var f = {},
        t,
        e,
        u,
        o,
        i,
        r,
        s,
        h;
    for (
        n = n || "",
        t = n.indexOf("&&"),
        t !== -1 &&
        t + 2 < n.length &&
        ((f.__s = n.substr(t + 2)), (n = n.substr(0, t))),
        e = n.split("&"),
        u = 0,
        o = e.length; u < o; u++
    )
        (i = e[u]),
        (r = i.indexOf("=")),
        r !== -1 &&
        r + 1 < i.length &&
        ((s = i.substr(0, r)),
            (h = i.substr(r + 1)),
            (f[s] = decodeURIComponent(h)));
    return f;
};
Sys._Application.prototype._enableHistoryInScriptManager = function() {
    this._enableHistory = !0;
};
Sys._Application.prototype._ensureHistory = function() {
    if (!this._historyInitialized && this._enableHistory) {
        Sys.Browser.agent === Sys.Browser.InternetExplorer &&
            Sys.Browser.documentMode < 8 &&
            ((this._historyFrame = document.getElementById("__historyFrame")),
                (this._ignoreIFrame = !0));
        this._timerHandler = Function.createDelegate(this, this._onIdle);
        this._timerCookie = window.setTimeout(this._timerHandler, 100);
        try {
            this._initialState = this._deserializeState(this.get_stateString());
        } catch (n) {}
        this._historyInitialized = !0;
    }
};
Sys._Application.prototype._navigate = function(n) {
    var t, r, i;
    if (
        (this._ensureHistory(),
            (t = this._deserializeState(n)),
            this._uniqueId && ((r = this._state.__s || ""), (i = t.__s || ""), i !== r))
    ) {
        this._updateHiddenField(i);
        __doPostBack(this._uniqueId, i);
        this._state = t;
        return;
    }
    this._setState(n);
    this._state = t;
    this._raiseNavigate();
};
Sys._Application.prototype._onIdle = function() {
    delete this._timerCookie;
    var n = this.get_stateString();
    n !== this._currentEntry ?
        this._ignoreTimer || ((this._historyPointIsNew = !1), this._navigate(n)) :
        (this._ignoreTimer = !1);
    this._timerCookie = window.setTimeout(this._timerHandler, 100);
};
Sys._Application.prototype._onIFrameLoad = function(n) {
    this._ensureHistory();
    this._ignoreIFrame || ((this._historyPointIsNew = !1), this._navigate(n));
    this._ignoreIFrame = !1;
};
Sys._Application.prototype._onPageRequestManagerBeginRequest = function() {
    this._ignoreTimer = !0;
    this._originalTitle = document.title;
};
Sys._Application.prototype._onPageRequestManagerEndRequest = function(n, t) {
    var u = t.get_dataItems()[this._clientId],
        f = this._originalTitle,
        r,
        i,
        e;
    this._originalTitle = null;
    r = document.getElementById("__EVENTTARGET");
    r && r.value === this._uniqueId && (r.value = "");
    typeof u != "undefined" ?
        (this.setServerState(u), (this._historyPointIsNew = !0)) :
        (this._ignoreTimer = !1);
    i = this._serializeState(this._state);
    i !== this._currentEntry &&
        ((this._ignoreTimer = !0),
            typeof f == "string" ?
            (Sys.Browser.agent !== Sys.Browser.InternetExplorer ||
                Sys.Browser.version > 7 ?
                ((e = document.title),
                    (document.title = f),
                    this._setState(i),
                    (document.title = e)) :
                this._setState(i),
                this._raiseNavigate()) :
            (this._setState(i), this._raiseNavigate()));
};
Sys._Application.prototype._raiseNavigate = function() {
    var u = this._historyPointIsNew,
        t = this.get_events().getHandler("navigate"),
        i = {},
        n,
        r;
    for (n in this._state) n !== "__s" && (i[n] = this._state[n]);
    if (((r = new Sys.HistoryEventArgs(i)), t && t(this, r), !u))
        try {
            Sys.Browser.agent === Sys.Browser.Firefox &&
                window.location.hash &&
                (!window.frameElement || window.top.location.hash) &&
                (Sys.Browser.version < 3.5 ?
                    window.history.go(0) :
                    (location.hash = this.get_stateString()));
        } catch (f) {}
};
Sys._Application.prototype._serializeState = function(n) {
    var i = [],
        t,
        r,
        u;
    for (t in n)
        (r = n[t]),
        t === "__s" ? (u = r) : (i[i.length] = t + "=" + encodeURIComponent(r));
    return i.join("&") + (u ? "&&" + u : "");
};
Sys._Application.prototype._setState = function(n, t) {
    var i, u, r, f;
    this._enableHistory &&
        ((n = n || ""),
            n !== this._currentEntry &&
            (window.theForm &&
                ((i = window.theForm.action),
                    (u = i.indexOf("#")),
                    (window.theForm.action = (u !== -1 ? i.substring(0, u) : i) + "#" + n)),
                this._historyFrame &&
                this._historyPointIsNew &&
                ((this._ignoreIFrame = !0),
                    (r = this._historyFrame.contentWindow.document),
                    r.open("javascript:'<html></html>'"),
                    r.write(
                        "<html><head><title>" +
                        (t || document.title) +
                        '</title><script type="text/javascript">parent.Sys.Application._onIFrameLoad(' +
                        Sys.Serialization.JavaScriptSerializer.serialize(n) +
                        ");</script></head><body></body></html>"
                    ),
                    r.close()),
                (this._ignoreTimer = !1),
                (this._currentEntry = n),
                (this._historyFrame || this._historyPointIsNew) &&
                ((f = this.get_stateString()),
                    n !== f &&
                    ((window.location.hash = n),
                        (this._currentEntry = this.get_stateString()),
                        typeof t != "undefined" && t !== null && (document.title = t))),
                (this._historyPointIsNew = !1)));
};
Sys._Application.prototype._updateHiddenField = function(n) {
    if (this._clientId) {
        var t = document.getElementById(this._clientId);
        t && (t.value = n);
    }
};
window.XMLHttpRequest ||
    (window.XMLHttpRequest = function() {
        for (
            var t = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP"], n = 0, i = t.length; n < i; n++
        )
            try {
                return new ActiveXObject(t[n]);
            } catch (r) {}
        return null;
    });
Type.registerNamespace("Sys.Net");
Sys.Net.WebRequestExecutor = function() {
    this._webRequest = null;
    this._resultObject = null;
};
Sys.Net.WebRequestExecutor.prototype = {
    get_webRequest: function() {
        return this._webRequest;
    },
    _set_webRequest: function(n) {
        this._webRequest = n;
    },
    get_started: function() {
        throw Error.notImplemented();
    },
    get_responseAvailable: function() {
        throw Error.notImplemented();
    },
    get_timedOut: function() {
        throw Error.notImplemented();
    },
    get_aborted: function() {
        throw Error.notImplemented();
    },
    get_responseData: function() {
        throw Error.notImplemented();
    },
    get_statusCode: function() {
        throw Error.notImplemented();
    },
    get_statusText: function() {
        throw Error.notImplemented();
    },
    get_xml: function() {
        throw Error.notImplemented();
    },
    get_object: function() {
        return (
            this._resultObject ||
            (this._resultObject = Sys.Serialization.JavaScriptSerializer.deserialize(
                this.get_responseData()
            )),
            this._resultObject
        );
    },
    executeRequest: function() {
        throw Error.notImplemented();
    },
    abort: function() {
        throw Error.notImplemented();
    },
    getResponseHeader: function() {
        throw Error.notImplemented();
    },
    getAllResponseHeaders: function() {
        throw Error.notImplemented();
    },
};
Sys.Net.WebRequestExecutor.registerClass("Sys.Net.WebRequestExecutor");
Sys.Net.XMLDOM = function(n) {
    var r, i, u, t, f;
    if (window.DOMParser)
        try {
            return (f = new window.DOMParser()), f.parseFromString(n, "text/xml");
        } catch (e) {}
    else
        for (
            r = ["Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument"], i = 0, u = r.length; i < u; i++
        )
            try {
                return (
                    (t = new ActiveXObject(r[i])),
                    (t.async = !1),
                    t.loadXML(n),
                    t.setProperty("SelectionLanguage", "XPath"),
                    t
                );
            } catch (e) {}
    return null;
};
Sys.Net.XMLHttpExecutor = function() {
    Sys.Net.XMLHttpExecutor.initializeBase(this);
    var n = this;
    this._xmlHttpRequest = null;
    this._webRequest = null;
    this._responseAvailable = !1;
    this._timedOut = !1;
    this._timer = null;
    this._aborted = !1;
    this._started = !1;
    this._onReadyStateChange = function() {
        if (n._xmlHttpRequest.readyState === 4) {
            try {
                if (typeof n._xmlHttpRequest.status == "undefined") return;
            } catch (t) {
                return;
            }
            n._clearTimer();
            n._responseAvailable = !0;
            try {
                n._webRequest.completed(Sys.EventArgs.Empty);
            } finally {
                n._xmlHttpRequest != null &&
                    ((n._xmlHttpRequest.onreadystatechange = Function.emptyMethod),
                        (n._xmlHttpRequest = null));
            }
        }
    };
    this._clearTimer = function() {
        n._timer != null && (window.clearTimeout(n._timer), (n._timer = null));
    };
    this._onTimeout = function() {
        n._responseAvailable ||
            (n._clearTimer(),
                (n._timedOut = !0),
                (n._xmlHttpRequest.onreadystatechange = Function.emptyMethod),
                n._xmlHttpRequest.abort(),
                n._webRequest.completed(Sys.EventArgs.Empty),
                (n._xmlHttpRequest = null));
    };
};
Sys.Net.XMLHttpExecutor.prototype = {
    get_timedOut: function() {
        return this._timedOut;
    },
    get_started: function() {
        return this._started;
    },
    get_responseAvailable: function() {
        return this._responseAvailable;
    },
    get_aborted: function() {
        return this._aborted;
    },
    executeRequest: function() {
        var t, n, i, r, u, f;
        if (
            ((this._webRequest = this.get_webRequest()),
                (t = this._webRequest.get_body()),
                (n = this._webRequest.get_headers()),
                (this._xmlHttpRequest = new XMLHttpRequest()),
                (this._xmlHttpRequest.onreadystatechange = this._onReadyStateChange),
                (i = this._webRequest.get_httpVerb()),
                this._xmlHttpRequest.open(i, this._webRequest.getResolvedUrl(), !0),
                this._xmlHttpRequest.setRequestHeader(
                    "X-Requested-With",
                    "XMLHttpRequest"
                ),
                n)
        )
            for (r in n)
                (u = n[r]),
                typeof u != "function" && this._xmlHttpRequest.setRequestHeader(r, u);
        i.toLowerCase() === "post" &&
            ((n !== null && n["Content-Type"]) ||
                this._xmlHttpRequest.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded; charset=utf-8"
                ),
                t || (t = ""));
        f = this._webRequest.get_timeout();
        f > 0 &&
            (this._timer = window.setTimeout(
                Function.createDelegate(this, this._onTimeout),
                f
            ));
        this._xmlHttpRequest.send(t);
        this._started = !0;
    },
    getResponseHeader: function(n) {
        var t;
        try {
            t = this._xmlHttpRequest.getResponseHeader(n);
        } catch (i) {}
        return t || (t = ""), t;
    },
    getAllResponseHeaders: function() {
        return this._xmlHttpRequest.getAllResponseHeaders();
    },
    get_responseData: function() {
        return this._xmlHttpRequest.responseText;
    },
    get_statusCode: function() {
        var n = 0;
        try {
            n = this._xmlHttpRequest.status;
        } catch (t) {}
        return n;
    },
    get_statusText: function() {
        return this._xmlHttpRequest.statusText;
    },
    get_xml: function() {
        var n = this._xmlHttpRequest.responseXML;
        if (n && n.documentElement)
            navigator.userAgent.indexOf("MSIE") !== -1 &&
            n.setProperty("SelectionLanguage", "XPath");
        else if (
            ((n = Sys.Net.XMLDOM(this._xmlHttpRequest.responseText)), !n || !n.documentElement)
        )
            return null;
        return n.documentElement.namespaceURI ===
            "http://www.mozilla.org/newlayout/xml/parsererror.xml" &&
            n.documentElement.tagName === "parsererror" ?
            null :
            n.documentElement.firstChild &&
            n.documentElement.firstChild.tagName === "parsererror" ?
            null :
            n;
    },
    abort: function() {
        this._aborted ||
            this._responseAvailable ||
            this._timedOut ||
            ((this._aborted = !0),
                this._clearTimer(),
                this._xmlHttpRequest &&
                !this._responseAvailable &&
                ((this._xmlHttpRequest.onreadystatechange = Function.emptyMethod),
                    this._xmlHttpRequest.abort(),
                    (this._xmlHttpRequest = null),
                    this._webRequest.completed(Sys.EventArgs.Empty)));
    },
};
Sys.Net.XMLHttpExecutor.registerClass(
    "Sys.Net.XMLHttpExecutor",
    Sys.Net.WebRequestExecutor
);
Sys.Net._WebRequestManager = function() {
    this._defaultTimeout = 0;
    this._defaultExecutorType = "Sys.Net.XMLHttpExecutor";
};
Sys.Net._WebRequestManager.prototype = {
    add_invokingRequest: function(n) {
        this._get_eventHandlerList().addHandler("invokingRequest", n);
    },
    remove_invokingRequest: function(n) {
        this._get_eventHandlerList().removeHandler("invokingRequest", n);
    },
    add_completedRequest: function(n) {
        this._get_eventHandlerList().addHandler("completedRequest", n);
    },
    remove_completedRequest: function(n) {
        this._get_eventHandlerList().removeHandler("completedRequest", n);
    },
    _get_eventHandlerList: function() {
        return (
            this._events || (this._events = new Sys.EventHandlerList()), this._events
        );
    },
    get_defaultTimeout: function() {
        return this._defaultTimeout;
    },
    set_defaultTimeout: function(n) {
        this._defaultTimeout = n;
    },
    get_defaultExecutorType: function() {
        return this._defaultExecutorType;
    },
    set_defaultExecutorType: function(n) {
        this._defaultExecutorType = n;
    },
    executeRequest: function(webRequest) {
        var executor = webRequest.get_executor(),
            failed,
            executorType,
            evArgs,
            handler;
        if (!executor) {
            failed = !1;
            try {
                executorType = eval(this._defaultExecutorType);
                executor = new executorType();
            } catch (a) {
                failed = !0;
            }
            webRequest.set_executor(executor);
        }
        executor.get_aborted() ||
            ((evArgs = new Sys.Net.NetworkRequestEventArgs(webRequest)),
                (handler = this._get_eventHandlerList().getHandler("invokingRequest")),
                handler && handler(this, evArgs),
                evArgs.get_cancel() || executor.executeRequest());
    },
};
Sys.Net._WebRequestManager.registerClass("Sys.Net._WebRequestManager");
Sys.Net.WebRequestManager = new Sys.Net._WebRequestManager();
Sys.Net.NetworkRequestEventArgs = function(n) {
    Sys.Net.NetworkRequestEventArgs.initializeBase(this);
    this._webRequest = n;
};
Sys.Net.NetworkRequestEventArgs.prototype = {
    get_webRequest: function() {
        return this._webRequest;
    },
};
Sys.Net.NetworkRequestEventArgs.registerClass(
    "Sys.Net.NetworkRequestEventArgs",
    Sys.CancelEventArgs
);
Sys.Net.WebRequest = function() {
    this._url = "";
    this._headers = {};
    this._body = null;
    this._userContext = null;
    this._httpVerb = null;
    this._executor = null;
    this._invokeCalled = !1;
    this._timeout = 0;
};
Sys.Net.WebRequest.prototype = {
    add_completed: function(n) {
        this._get_eventHandlerList().addHandler("completed", n);
    },
    remove_completed: function(n) {
        this._get_eventHandlerList().removeHandler("completed", n);
    },
    completed: function(n) {
        var t = Sys.Net.WebRequestManager._get_eventHandlerList().getHandler(
            "completedRequest"
        );
        t && t(this._executor, n);
        t = this._get_eventHandlerList().getHandler("completed");
        t && t(this._executor, n);
    },
    _get_eventHandlerList: function() {
        return (
            this._events || (this._events = new Sys.EventHandlerList()), this._events
        );
    },
    get_url: function() {
        return this._url;
    },
    set_url: function(n) {
        this._url = n;
    },
    get_headers: function() {
        return this._headers;
    },
    get_httpVerb: function() {
        return this._httpVerb === null ?
            this._body === null ?
            "GET" :
            "POST" :
            this._httpVerb;
    },
    set_httpVerb: function(n) {
        this._httpVerb = n;
    },
    get_body: function() {
        return this._body;
    },
    set_body: function(n) {
        this._body = n;
    },
    get_userContext: function() {
        return this._userContext;
    },
    set_userContext: function(n) {
        this._userContext = n;
    },
    get_executor: function() {
        return this._executor;
    },
    set_executor: function(n) {
        this._executor = n;
        this._executor._set_webRequest(this);
    },
    get_timeout: function() {
        return this._timeout === 0 ?
            Sys.Net.WebRequestManager.get_defaultTimeout() :
            this._timeout;
    },
    set_timeout: function(n) {
        this._timeout = n;
    },
    getResolvedUrl: function() {
        return Sys.Net.WebRequest._resolveUrl(this._url);
    },
    invoke: function() {
        Sys.Net.WebRequestManager.executeRequest(this);
        this._invokeCalled = !0;
    },
};
Sys.Net.WebRequest._resolveUrl = function(n, t) {
    var r, i, u, f, e;
    return n && n.indexOf("://") !== -1 ?
        n :
        ((t && t.length !== 0) ||
            ((r = document.getElementsByTagName("base")[0]),
                (t = r && r.href && r.href.length > 0 ? r.href : document.URL)),
            (i = t.indexOf("?")),
            i !== -1 && (t = t.substr(0, i)),
            (i = t.indexOf("#")),
            i !== -1 && (t = t.substr(0, i)),
            (t = t.substr(0, t.lastIndexOf("/") + 1)), !n || n.length === 0) ?
        t :
        n.charAt(0) === "/" ?
        ((u = t.indexOf("://")), (f = t.indexOf("/", u + 3)), t.substr(0, f) + n) :
        ((e = t.lastIndexOf("/")), t.substr(0, e + 1) + n);
};
Sys.Net.WebRequest._createQueryString = function(n, t, i) {
    t = t || encodeURIComponent;
    var e = 0,
        u,
        o,
        f,
        r = new Sys.StringBuilder();
    if (n)
        for (f in n)
            ((u = n[f]), typeof u != "function") &&
            ((o = Sys.Serialization.JavaScriptSerializer.serialize(u)),
                e++ && r.append("&"),
                r.append(f),
                r.append("="),
                r.append(t(o)));
    return i && (e && r.append("&"), r.append(i)), r.toString();
};
Sys.Net.WebRequest._createUrl = function(n, t, i) {
    if (!t && !i) return n;
    var r = Sys.Net.WebRequest._createQueryString(t, null, i);
    return r.length ? n + (n && n.indexOf("?") >= 0 ? "&" : "?") + r : n;
};
Sys.Net.WebRequest.registerClass("Sys.Net.WebRequest");
Sys._ScriptLoaderTask = function(n, t) {
    this._scriptElement = n;
    this._completedCallback = t;
};
Sys._ScriptLoaderTask.prototype = {
    get_scriptElement: function() {
        return this._scriptElement;
    },
    dispose: function() {
        this._disposed ||
            ((this._disposed = !0),
                this._removeScriptElementHandlers(),
                Sys._ScriptLoaderTask._clearScript(this._scriptElement),
                (this._scriptElement = null));
    },
    execute: function() {
        this._addScriptElementHandlers();
        document.getElementsByTagName("head")[0].appendChild(this._scriptElement);
    },
    _addScriptElementHandlers: function() {
        this._scriptLoadDelegate = Function.createDelegate(
            this,
            this._scriptLoadHandler
        );
        Sys.Browser.agent !== Sys.Browser.InternetExplorer ?
            ((this._scriptElement.readyState = "loaded"),
                $addHandler(this._scriptElement, "load", this._scriptLoadDelegate)) :
            $addHandler(
                this._scriptElement,
                "readystatechange",
                this._scriptLoadDelegate
            );
        this._scriptElement.addEventListener &&
            ((this._scriptErrorDelegate = Function.createDelegate(
                    this,
                    this._scriptErrorHandler
                )),
                this._scriptElement.addEventListener(
                    "error",
                    this._scriptErrorDelegate, !1
                ));
    },
    _removeScriptElementHandlers: function() {
        if (this._scriptLoadDelegate) {
            var n = this.get_scriptElement();
            Sys.Browser.agent !== Sys.Browser.InternetExplorer ?
                $removeHandler(n, "load", this._scriptLoadDelegate) :
                $removeHandler(n, "readystatechange", this._scriptLoadDelegate);
            this._scriptErrorDelegate &&
                (this._scriptElement.removeEventListener(
                        "error",
                        this._scriptErrorDelegate, !1
                    ),
                    (this._scriptErrorDelegate = null));
            this._scriptLoadDelegate = null;
        }
    },
    _scriptErrorHandler: function() {
        this._disposed || this._completedCallback(this.get_scriptElement(), !1);
    },
    _scriptLoadHandler: function() {
        if (!this._disposed) {
            var n = this.get_scriptElement();
            (n.readyState === "loaded" || n.readyState === "complete") &&
            this._completedCallback(n, !0);
        }
    },
};
Sys._ScriptLoaderTask.registerClass(
    "Sys._ScriptLoaderTask",
    null,
    Sys.IDisposable
);
Sys._ScriptLoaderTask._clearScript = function(n) {
    Sys.Debug.isDebug || n.parentNode.removeChild(n);
};
Type.registerNamespace("Sys.Net");
Sys.Net.WebServiceProxy = function() {};
Sys.Net.WebServiceProxy.prototype = {
    get_timeout: function() {
        return this._timeout || 0;
    },
    set_timeout: function(n) {
        if (n < 0)
            throw Error.argumentOutOfRange("value", n, Sys.Res.invalidTimeout);
        this._timeout = n;
    },
    get_defaultUserContext: function() {
        return typeof this._userContext == "undefined" ? null : this._userContext;
    },
    set_defaultUserContext: function(n) {
        this._userContext = n;
    },
    get_defaultSucceededCallback: function() {
        return this._succeeded || null;
    },
    set_defaultSucceededCallback: function(n) {
        this._succeeded = n;
    },
    get_defaultFailedCallback: function() {
        return this._failed || null;
    },
    set_defaultFailedCallback: function(n) {
        this._failed = n;
    },
    get_enableJsonp: function() {
        return !!this._jsonp;
    },
    set_enableJsonp: function(n) {
        this._jsonp = n;
    },
    get_path: function() {
        return this._path || null;
    },
    set_path: function(n) {
        this._path = n;
    },
    get_jsonpCallbackParameter: function() {
        return this._callbackParameter || "callback";
    },
    set_jsonpCallbackParameter: function(n) {
        this._callbackParameter = n;
    },
    _invoke: function(n, t, i, r, u, f, e) {
        return (
            (u = u || this.get_defaultSucceededCallback()),
            (f = f || this.get_defaultFailedCallback()),
            (e === null || typeof e == "undefined") &&
            (e = this.get_defaultUserContext()),
            Sys.Net.WebServiceProxy.invoke(
                n,
                t,
                i,
                r,
                u,
                f,
                e,
                this.get_timeout(),
                this.get_enableJsonp(),
                this.get_jsonpCallbackParameter()
            )
        );
    },
};
Sys.Net.WebServiceProxy.registerClass("Sys.Net.WebServiceProxy");
Sys.Net.WebServiceProxy.invoke = function(n, t, i, r, u, f, e, o, s, h) {
    function it(n) {
        var r, i, o, h, s, c;
        if (n.get_responseAvailable()) {
            r = n.get_statusCode();
            i = null;
            try {
                o = n.getResponseHeader("Content-Type");
                i = o.startsWith("application/json") ?
                    n.get_object() :
                    o.startsWith("text/xml") ?
                    n.get_xml() :
                    n.get_responseData();
            } catch (l) {}
            h = n.getResponseHeader("jsonerror");
            s = h === "true";
            s
                ?
                i &&
                (i = new Sys.Net.WebServiceError(!1,
                    i.Message,
                    i.StackTrace,
                    i.ExceptionType,
                    i
                )) :
                o.startsWith("application/json") &&
                (i = !i || typeof i.d == "undefined" ? i : i.d);
            r < 200 || r >= 300 || s ?
                f &&
                ((i && s) ||
                    (i = new Sys.Net.WebServiceError(!1,
                        String.format(Sys.Res.webServiceFailedNoMsg, t)
                    )),
                    (i._statusCode = r),
                    f(i, e, t)) :
                u && u(i, e, t);
        } else
            (c = n.get_timedOut() ?
                String.format(Sys.Res.webServiceTimedOut, t) :
                String.format(Sys.Res.webServiceFailedNoMsg, t)),
            f && f(new Sys.Net.WebServiceError(n.get_timedOut(), c, "", ""), e, t);
    }
    var y = s !== !1 ? Sys.Net.WebServiceProxy._xdomain.exec(n) : null,
        l,
        p =
        y &&
        y.length === 3 &&
        (y[1] !== location.protocol || y[2] !== location.host),
        w,
        c;
    i = p || i;
    p && ((h = h || "callback"), (l = "_jsonp" + Sys._jsonp++));
    r || (r = {});
    w = r;
    (i && w) || (w = {});
    var d,
        v,
        a = null,
        b,
        k = null,
        g = Sys.Net.WebRequest._createUrl(
            t ? n + "/" + encodeURIComponent(t) : n,
            w,
            p ? h + "=Sys." + l : null
        );
    if (p) {
        d = document.createElement("script");
        d.src = g;
        b = new Sys._ScriptLoaderTask(d, function(n, i) {
            (!i || l) &&
            nt({ Message: String.format(Sys.Res.webServiceFailedNoMsg, t) }, -1);
        });

        function tt() {
            a !== null &&
                ((a = null),
                    (v = new Sys.Net.WebServiceError(!0,
                        String.format(Sys.Res.webServiceTimedOut, t)
                    )),
                    b.dispose(),
                    delete Sys[l],
                    f && f(v, e, t));
        }

        function nt(n, i) {
            a !== null && (window.clearTimeout(a), (a = null));
            b.dispose();
            delete Sys[l];
            l = null;
            typeof i != "undefined" && i !== 200 ?
                f &&
                ((v = new Sys.Net.WebServiceError(!1,
                        n.Message || String.format(Sys.Res.webServiceFailedNoMsg, t),
                        n.StackTrace || null,
                        n.ExceptionType || null,
                        n
                    )),
                    (v._statusCode = i),
                    f(v, e, t)) :
                u && u(n, e, t);
        }
        return (
            (Sys[l] = nt),
            (o = o || Sys.Net.WebRequestManager.get_defaultTimeout()),
            o > 0 && (a = window.setTimeout(tt, o)),
            b.execute(),
            null
        );
    }
    return (
        (c = new Sys.Net.WebRequest()),
        c.set_url(g),
        (c.get_headers()["Content-Type"] = "application/json; charset=utf-8"),
        i ||
        ((k = Sys.Serialization.JavaScriptSerializer.serialize(r)),
            k === "{}" && (k = "")),
        c.set_body(k),
        c.add_completed(it),
        o && o > 0 && c.set_timeout(o),
        c.invoke(),
        c
    );
};
Sys.Net.WebServiceProxy._generateTypedConstructor = function(n) {
    return function(t) {
        if (t)
            for (var i in t) this[i] = t[i];
        this.__type = n;
    };
};
Sys._jsonp = 0;
Sys.Net.WebServiceProxy._xdomain = /^\s*([a-zA-Z0-9\+\-\.]+\:)\/\/([^?#\/]+)/;
Sys.Net.WebServiceError = function(n, t, i, r, u) {
    this._timedOut = n;
    this._message = t;
    this._stackTrace = i;
    this._exceptionType = r;
    this._errorObject = u;
    this._statusCode = -1;
};
Sys.Net.WebServiceError.prototype = {
    get_timedOut: function() {
        return this._timedOut;
    },
    get_statusCode: function() {
        return this._statusCode;
    },
    get_message: function() {
        return this._message;
    },
    get_stackTrace: function() {
        return this._stackTrace || "";
    },
    get_exceptionType: function() {
        return this._exceptionType || "";
    },
    get_errorObject: function() {
        return this._errorObject || null;
    },
};
Sys.Net.WebServiceError.registerClass("Sys.Net.WebServiceError");
Type.registerNamespace("Sys");
Sys.Res = {
    argumentInteger: "Value must be an integer.",
    invokeCalledTwice: "Cannot call invoke more than once.",
    webServiceFailed: "The server method '{0}' failed with the following error: {1}",
    argumentType: "Object cannot be converted to the required type.",
    argumentNull: "Value cannot be null.",
    scriptAlreadyLoaded: "The script '{0}' has been referenced multiple times. If referencing Microsoft AJAX scripts explicitly, set the MicrosoftAjaxMode property of the ScriptManager to Explicit.",
    scriptDependencyNotFound: "The script '{0}' failed to load because it is dependent on script '{1}'.",
    formatBadFormatSpecifier: "Format specifier was invalid.",
    requiredScriptReferenceNotIncluded: "'{0}' requires that you have included a script reference to '{1}'.",
    webServiceFailedNoMsg: "The server method '{0}' failed.",
    argumentDomElement: "Value must be a DOM element.",
    invalidExecutorType: "Could not create a valid Sys.Net.WebRequestExecutor from: {0}.",
    cannotCallBeforeResponse: "Cannot call {0} when responseAvailable is false.",
    actualValue: "Actual value was {0}.",
    enumInvalidValue: "'{0}' is not a valid value for enum {1}.",
    scriptLoadFailed: "The script '{0}' could not be loaded.",
    parameterCount: "Parameter count mismatch.",
    cannotDeserializeEmptyString: "Cannot deserialize empty string.",
    formatInvalidString: "Input string was not in a correct format.",
    invalidTimeout: "Value must be greater than or equal to zero.",
    cannotAbortBeforeStart: "Cannot abort when executor has not started.",
    argument: "Value does not fall within the expected range.",
    cannotDeserializeInvalidJson: "Cannot deserialize. The data does not correspond to valid JSON.",
    invalidHttpVerb: "httpVerb cannot be set to an empty or null string.",
    nullWebRequest: "Cannot call executeRequest with a null webRequest.",
    eventHandlerInvalid: "Handler was not added through the Sys.UI.DomEvent.addHandler method.",
    cannotSerializeNonFiniteNumbers: "Cannot serialize non finite numbers.",
    argumentUndefined: "Value cannot be undefined.",
    webServiceInvalidReturnType: "The server method '{0}' returned an invalid type. Expected type: {1}",
    servicePathNotSet: "The path to the web service has not been set.",
    argumentTypeWithTypes: "Object of type '{0}' cannot be converted to type '{1}'.",
    cannotCallOnceStarted: "Cannot call {0} once started.",
    badBaseUrl1: "Base URL does not contain ://.",
    badBaseUrl2: "Base URL does not contain another /.",
    badBaseUrl3: "Cannot find last / in base URL.",
    setExecutorAfterActive: "Cannot set executor after it has become active.",
    paramName: "Parameter name: {0}",
    nullReferenceInPath: "Null reference while evaluating data path: '{0}'.",
    cannotCallOutsideHandler: "Cannot call {0} outside of a completed event handler.",
    cannotSerializeObjectWithCycle: "Cannot serialize object with cyclic reference within child properties.",
    format: "One of the identified items was in an invalid format.",
    assertFailedCaller: "Assertion Failed: {0}\r\nat {1}",
    argumentOutOfRange: "Specified argument was out of the range of valid values.",
    webServiceTimedOut: "The server method '{0}' timed out.",
    notImplemented: "The method or operation is not implemented.",
    assertFailed: "Assertion Failed: {0}",
    invalidOperation: "Operation is not valid due to the current state of the object.",
    breakIntoDebugger: "{0}\r\n\r\nBreak into debugger?",
};