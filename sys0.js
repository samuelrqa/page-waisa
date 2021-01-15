function _BindSaveCurEl(n) {
    $(_BINDQUERY, n || document).bind("blur", _SaveCurEl);
}

function _UnbindSaveCurEl(n) {
    var t = $(":input.saveHistory");
    t.removeClass("saveHistory");
    t.unbind("blur", _SaveCurEl);
    t.addClass("saveHistory");
    $(_BINDQUERY + ":not(.saveHistory)", n || document).unbind(
        "blur",
        _SaveCurEl
    );
}

function _SaveCurEl() {
    document.previousElement = this;
}

function SysSubmit(n) {
    var i, t;
    if (sysWasSubmitted) return !1;
    n != null && SysShowWaitMessage();
    i = sysIsSubmitted;
    sysIsSubmitted = !0;
    sysWasSubmitted = !0;
    document.forms[0].target || (document.forms[0].target = "_self");
    try {
        return document.forms[0].submit();
    } catch (r) {
        n != null && SysWaitMessage(!1);
        sysIsSubmitted = i;
        sysWasSubmitted = !1;
        t = "";
        switch (r.number) {
            case -2147024891:
                t = SysTerm(20006, "Invalid") + ": " + SysTerm(1011, "File path");
                break;
            default:
                t = r.message;
        }
        return (
            SysConfirm(
                5,
                null,
                t,
                null,
                null,
                SysTerm(35240, "The form couldn't be submitted.")
            ), !1
        );
    }
}

function SysShowWaitMessage() {
    SysWaitMessage(!0);
}

function SysWaitMessage(n) {
    n ? $("#WaitMessage").show() : $("#WaitMessage").hide();
}

function SysAuto(n) {
    return SysSet("sysFocus", n), SysSubmit(1);
}

function SysAutoTab(n) {
    SysGetKey(n) == SysHandleKey.Key.tab && SysSet("sysTab", !0);
}

function SysFocusTab(n) {
    var u = !1,
        t = 0,
        r,
        f = document.forms[0].length;
    try {
        for (i = 0; i < f; i++)
            if (document.forms[0][i].name == n || u) {
                if (
                    ((t = i),
                        t < f && u == !1 && t++,
                        (r = document.forms[0][t]),
                        r.tabIndex >= 0 && r.type != "hidden")
                ) {
                    SysFocus(r.id);
                    break;
                }
                u = !0;
            }
    } catch (e) {}
}

function SysLocation(n) {
    sysIsSubmitted = !0;
    window.location.assign(n);
}

function SysForward() {
    sysIsSubmitted = !0;
    history.forward();
}

function SysBack() {
    sysIsSubmitted = !0;
    history.back();
}

function SysFocus(n) {
    var t = SysGetElement(n),
        r;
    if (t != null) {
        if (
            t.tagName == "INPUT" &&
            t.type == "radio" &&
            ((r = document.getElementsByName(n)), r != null)
        )
            for (i = 0; i < r.length; i++)
                if (r[i].checked) {
                    t = r[i];
                    break;
                }
        try {
            $(document).focus();
            $(t).focus();
            t.setActive && t.setActive();
            SysSelect(t);
        } catch (u) {}
    }
}

function SysDefaultFocus() {
    var n = SysGetElement("sysDefaultFocus");
    n && n.value != "" && ((n = SysGetElement(n.value)), n) && SysFocus(n.id);
}

function SysSelect(n) {
    if (
        n.tagName == "INPUT" &&
        n.type != "radio" &&
        n.type != "checkbox" &&
        n.type != "hidden" &&
        !$(n).is(":hidden")
    ) {
        var t = new SysSelection(n);
        t.SetSelection();
    }
}

function SysFocusFirst(n) {
    var r, t, i;
    if ((n == null && (n = document), n.forms.length != 0))
        try {
            for (r = n.forms[0], i = 0; i < r.elements.length; i++)
                if (((t = $(r.elements[i])), t.is("input") || t.is(":hidden"))) {
                    t.focus();
                    return;
                }
        } catch (u) {}
}

function SysURLEncode(n) {
    return encodeURIComponent(n);
}

function SysPageInIFrame(n) {
    return (
        n != null &&
        n.frameElement != null &&
        n.frameElement.nodeName.toLowerCase() == "iframe" &&
        n.name === "ModalWindowCom"
    );
}

function SysBackUrl(n, t) {
    var u, i, f, r;
    if (!new SysHandleEvent(n).IsEventStopped() &&
        new SysHandleKey(n).IsEscapeKey()
    ) {
        if (((u = !1), (i = null), SysPageInIFrame(window)))
            for (u = !0, i = window.parent; SysPageInIFrame(i);) i = i.parent;
        u && i != null ?
            i.sysButtonClose == null ?
            i.GetSysBackUrl ?
            ((f = i.GetSysBackUrl()),
                f != null ? i.location.assign(f) : window.location.assign(t)) :
            window.location.assign(t) :
            ((r = SysGetElement(i.sysButtonClose, i)), r && r.click()) :
            sysButtonClose == null ?
            window.location.assign(t) :
            ((r = SysGetElement(sysButtonClose)), r && r.click());
        SysCancelBubble(n);
    }
}

function SysDefaultEnter(n) {
    var t = $(SysSrcElement(n)),
        u,
        i,
        r;
    t.is("textarea") ||
        t.is("select") ||
        t.is("button") ||
        t.is("a") ||
        ((u = new SysHandleKey(n)),
            (i = u.GetKey()),
            i !== SysHandleKey.Key.enter ||
            i === SysHandleKey.Key.alt ||
            (sysXmlHttpAborted ||
                (SysCancelBubble(n), SysPreventDefault(n), SysCallbackAbort()),
                sysDefaultEnter != null &&
                ((r = SysGetElement(sysDefaultEnter)),
                    r && r.click(),
                    SysCancelBubble(n),
                    SysPreventDefault(n))));
}

function SysCancelClose(n) {
    !new SysHandleEvent(n).IsEventStopped() &&
        new SysHandleKey(n).IsEscapeKey() &&
        (window.SysIsDirty && window.SysIsDirty() ?
            SysShowModalPopup(
                "SysConfirm.aspx",
                null,
                "300px",
                "185px",
                function() {
                    SysButtonHandler();
                }
            ) :
            setTimeout(function() {
                window.parent.SysCloseModalPopup();
            }, 150),
            SysCancelBubble(n));
}

function SysClickTag(n) {
    var t = $(SysSrcElement(n)),
        i = new SysHandleKey(n);
    i.GetKey() === SysHandleKey.Key.space && t.is("a") && t.click();
}

function SysEnable(n) {
    var t = new SysElement(n);
    t.SetDisabled(!1);
}

function SysDisable(n) {
    var t = new SysElement(n);
    t.SetDisabled(!0);
}

function SysSetImage(n, t) {
    var i = SysGetElement(n);
    i != null && (i.src = t);
}

function SysSetDisplay(n, t) {
    var i = SysGetElement(n);
    i != null && $(i).css("display", t);
}

function SysCheckBackHistory() {
    var n = SysGet("SysNoBack");
    n == null || n == "" ? SysSet("SysNoBack", 1) : SysForward();
}

function SysNumKeyDown(n, t, i, r) {
    if ($(t).attr("readonly") != !0) {
        var u = new SysHandleKey(n);
        switch (u.GetKey()) {
            case SysHandleKey.Key.del:
                SysNumDelete(t, i, r);
                SysCancelBubble(n);
                break;
            case SysHandleKey.Key.backspace:
                SysNumBackSpace(t, i, r);
                SysCancelBubble(n);
                break;
            case SysHandleKey.Key.dot:
                SysNumStep(t);
                SysCancelBubble(n);
        }
    }
}

function SysNumKeyPress(n, t, i, r, u) {
    $(t).get(0).readOnly ||
        (SysProcessKey(n) &&
            (u == null &&
                (SysCancelBubble(n), (u = String.fromCharCode(SysGetKey(n)))),
                u >= "0" && u <= "9" ?
                SysNumInput(t, i, u, r) :
                u == sysFormatDecSep ?
                SysNumStep(t) :
                u == "-" && r && SysNumToggleSign(t, i)));
}

function SysNumPaste() {}

function SysNumCut(n, t) {
    var i, r, u;
    if (window.clipboardData) {
        if ((document.execCommand("Copy"), (i = SysNumClearSelection(n)), i == ""))
            return;
        r = SysGetCaretPosition(n);
        u = SysNumUnFormat(i, !0);
        i = SysNumFormat(u, t);
        n.value = i;
        SysSetCaretPosition(n, r);
        sysInputChanged = !0;
    }
}

function SysNumUnFormat(n, t) {
    var i;
    if (n == null) return "0";
    for (var r = "", f = !1, e = !0, u = 0; u < n.length; u++)
        (i = n.charAt(u)),
        (e && i == "0") ||
        (i >= "0" && i <= "9" && ((e = !1), (r += i)),
            t && (i == "-" || i == "(" || i == ")") && (f = !0));
    return r.length == 0 && (r = "0"), f && (r = "-" + r), r;
}

function SysNumFormat(n, t) {
    var e = n.substr(0, 1) == "-",
        r,
        f;
    e && (n = n.substr(1));
    t == null && (t = 2);
    for (var i = "", u = n.length - 1, r = 0; r < t && u >= 0; u--, r++)
        (f = n.substr(u, 1)), (i = f + i);
    if (r < t || n.length == t)
        if (t == 0) i = "0";
        else {
            for (; r < t; r++) i = "0" + i;
            i = "0" + sysFormatDecSep + i;
        }
    else
        for (t != 0 && (i = sysFormatDecSep + i), r = 0; u >= 0; u--, r++)
            r == 3 && ((i = sysFormatSep + i), (r = 0)),
            (f = n.substr(u, 1)),
            (i = f + i);
    return e ? SysFormatNegative(i, sysFormatNegative) : i;
}

function SysFormatNegative(n, t) {
    switch (t) {
        case 0:
            return "(" + n + ")";
        case 1:
            return "-" + n;
        case 2:
            return "- " + n;
        case 3:
            return n + "-";
        case 4:
            return n + " -";
    }
    return n;
}

function SysNegativeChars(n) {
    var t = [];
    t[0] = 0;
    t[1] = 0;
    switch (n) {
        case 0:
            t[0] = 1;
            t[1] = 1;
            break;
        case 1:
            t[0] = 1;
            break;
        case 2:
            t[0] = 2;
            break;
        case 3:
            t[1] = 1;
            break;
        case 4:
            t[1] = 2;
    }
    return t;
}

function SysNumStep(n) {
    var i = n.value,
        t = i.indexOf(sysFormatDecSep);
    t >= 0 && SysSetCaretPosition(n, t + 1);
}

function SysNumClearSelection(n) {
    var r,
        o = SysGetCaretPosition(n),
        t = $(n).get(0),
        u,
        i,
        f,
        e;
    if (typeof doSelectionStart(t) == "number") {
        if (t.selectionStart == t.selectionEnd) return null;
        u = n.value;
        r = n.value.substring(t.selectionStart, t.selectionEnd);
        n.value = u.substring(0, t.selectionStart) + u.substring(t.selectionEnd);
    } else {
        if (document.selection.type != "Text") return null;
        r = document.selection.createRange().text;
        document.selection.clear();
    }
    if (((i = n.value), i == "" || i == null))
        return (
            (n.value = ""), SysSetCaretPosition(n, 1), (sysInputChanged = !0), ""
        );
    if (((f = i.indexOf(sysFormatDecSep)), f >= 0 && o > f))
        for (r = r.replace(/-|\)| /g, ""), e = r.length; e > 0; e--) i += "0";
    return i;
}

function SysNumDelete(n, t, i) {
    var f,
        u = SysGetCaretPosition(n),
        r = SysNumClearSelection(n),
        e,
        s,
        h,
        c,
        o;
    if (r != "") {
        if (r == null) {
            if (((r = n.value), u == r.length)) return;
            if (
                ((f = r.substr(u, 1)),
                    (f == sysFormatDecSep || f == sysFormatSep || f == " " || f == "(") &&
                    u++,
                    (e = r.indexOf(sysFormatDecSep)),
                    (r = r.substr(0, u) + r.substr(u + 1)),
                    (s = e < 0 ? 0 : u <= e ? r.length - e : r.length - (e + 1)),
                    e >= 0 && u > e && s < t && (r += "0"),
                    e < 0)
            )
                for (h = 1; h < t + 1; h++) r += "0";
        }
        c = r.length - u;
        s > t ?
            ((o = SysNumUnFormat(r, i)), (r = SysNumFormat(o, s))) :
            ((o = SysNumUnFormat(r, i)), (r = SysNumFormat(o, t)));
        n.value = r;
        u = r.length - c;
        f = r.substr(u, 1);
        (f == sysFormatSep || "( -".indexOf(f) >= 0) && u++;
        SysSetCaretPosition(n, u);
        sysInputChanged = !0;
    }
}

function SysNumBackSpace(n, t, i) {
    var u = SysGetCaretPosition(n),
        s,
        r = SysNumClearSelection(n),
        e,
        f,
        h,
        c,
        o;
    if (r != "") {
        if (r == null) {
            if (u == 0) return;
            if (
                ((r = n.value),
                    (e = r.substr(u - 1, 1)),
                    (e == sysFormatDecSep || e == sysFormatSep || e == " " || e == ")") &&
                    u--,
                    (s = r.length - u),
                    (f = r.indexOf(sysFormatDecSep)),
                    (r = r.substr(0, u - 1) + r.substr(u)),
                    (h = f < 0 ? 0 : u <= f ? r.length - f : r.length - (f + 1)),
                    f >= 0 && u > f && e != "-" && h < t && ((r += "0"), s++),
                    f < 0)
            )
                for (c = 1; c < t + 1; c++) r += "0";
        } else s = r.length - u;
        h > t ?
            ((o = SysNumUnFormat(r, i)), (r = SysNumFormat(o, h))) :
            ((o = SysNumUnFormat(r, i)), (r = SysNumFormat(o, t)));
        n.value = r;
        u = r.length - s;
        SysSetCaretPosition(n, u);
        sysInputChanged = !0;
    }
}

function SysNumZeros(n) {
    for (var t = ""; n > 0; n--) t += "0";
    return t;
}

function SysNumToggleSign(n, t) {
    var r = new SysSelection(n),
        u = r.GetCaretPosition(n);
    r.DeleteSelection();
    var e = n.value,
        i = SysNumUnFormat(e, !0),
        f = i.substr(0, 1) == "-";
    f ? (i = i.substr(1)) : (i == "0" && u == 0 && u++, (i = "-" + i));
    n.value = SysNumFormat(i, t);
    r.SetCaretPosition(u + (f ? -1 : 1) * SysNegativeChars(sysFormatNegative)[0]);
    sysInputChanged = !0;
    r = null;
}

function SysNumInput(n, t, i, r) {
    var f = SysGetCaretPosition(n),
        u = SysNumClearSelection(n),
        l,
        a,
        v,
        e,
        o,
        y;
    if ((u == null && (u = n.value), u == "" || u == null))
        (n.value = SysNumFormat(i + SysNumZeros(t), t)), SysSetCaretPosition(n, 1);
    else {
        var s = u.indexOf(sysFormatDecSep),
            h = !0,
            c = !1;
        if (s >= 0 && f > s) {
            if (
                (r && ((l = SysNumUnFormat(u, r)), (c = l.substr(0, 1) == "-")),
                    u.length <= f + (c ? SysNegativeChars(sysFormatNegative)[1] : 0))
            )
                return;
            h = !1;
        }
        if (
            ((a = u.length - f),
                (v = u.substr(0, f)),
                h ?
                (e = u.substr(f)) :
                ((e = u.substring(f, s + t)),
                    c &&
                    (e += u.substr(u.length - SysNegativeChars(sysFormatNegative)[1]))),
                (o = SysNumUnFormat(v + i + e, r)),
                (y = n.maxLength),
                y > 0)
        )
            if (t > 0) {
                if (o.length + 1 > n.maxLength) return;
            } else if (o.length > n.maxLength) return;
        u = SysNumFormat(o, t);
        n.value = u;
        f = u.length - a;
        h || f++;
        SysSetCaretPosition(n, f);
    }
    sysInputChanged = !0;
}

function ValidateKey(n, t) {
    var i = SysEvent(n),
        r = SysGetKey(i),
        u = String.fromCharCode(r);
    SysProcessKey(n) && (r <= 31 || t.indexOf(u) >= 0 || i.preventDefault());
}

function SysValidateNumber(n, t, i, r) {
    var u = "1234567890",
        f = SysGetKey(n);
    t || (u += sysFormatDecSep);
    i && (u += "-() ");
    r && (u += sysFormatSep);
    t || sysFormatDecSep != "," || f != 46 ? ValidateKey(n, u) : SysSetKey(n, 44);
}

function SysValidateDate(n) {
    ValidateKey(n, ".-/1234567890");
}

function SysValidateTime(n, t, i) {
    var r = ":1234567890";
    t && (r += " apmAPM");
    i && (r += "-");
    ValidateKey(n, r);
}

function SysValidateTimeInterval(n, t) {
    var s = "1234567890",
        u = SysEvent(t),
        h = SysGetKey(u),
        f = String.fromCharCode(h),
        o,
        i,
        r,
        e;
    SysProcessKey(t) &&
        (h <= 31 || "1234567890:-".indexOf(f) >= 0 ?
            ((o = SysGetCaretPosition(n)),
                (i = SysNumClearSelection(n)),
                i == null && (i = n.value),
                i != null &&
                ((r = i.replace("-", "").replace(":", "")),
                    f == ":" && i.indexOf(":") >= 0 ?
                    u.preventDefault() :
                    f == "-" && i.indexOf("-") >= 0 ?
                    u.preventDefault() :
                    f == "-" && o != 0 ?
                    u.preventDefault() :
                    f == "-" ?
                    (r == "0000" || r == "000" || r == "00") && u.preventDefault() :
                    f == "0" && i.indexOf("-") >= 0 && (r == "000" || r == "00") ?
                    (n.value = "0:0") :
                    ((e = i.indexOf(":")),
                        s.indexOf(f) >= 0 &&
                        e >= 0 &&
                        (o > e && i.substr(e + 1).length >= 2 ?
                            u.preventDefault() :
                            o <= e &&
                            (i.indexOf("-") >= 0 ?
                                r.substr(0, e - 1).length >= 2 && u.preventDefault() :
                                i.substr(0, e).length >= 2 ?
                                u.preventDefault() :
                                i.substr(0, e).length == 0 &&
                                SysSetCaretPosition(n, 0))),
                        f == ":" &&
                        i.indexOf(":") == -1 &&
                        i.replace("-", "").length == 3 &&
                        (i.indexOf("-") >= 0 ?
                            SysSetCaretPosition(n, 2) :
                            SysSetCaretPosition(n, 1)),
                        s.indexOf(f) >= 0 &&
                        i.indexOf(":") == -1 &&
                        (r.length == 2 ?
                            ((i =
                                    i.indexOf("-") >= 0 ?
                                    "-" + r.substr(0, 1) + ":" + r.substr(1, 1) :
                                    i.substr(0, 1) + ":" + i.substr(1, 1)),
                                (n.value = i)) :
                            i.replace("-", "").length == 3 &&
                            ((i =
                                    i.indexOf("-") >= 0 ?
                                    "-" + r.substr(0, 2) + ":" + r.substr(2, 2) :
                                    i.substr(0, 2) + ":" + i.substr(2, 2)),
                                (n.value = i)))))) :
            u.preventDefault());
}

function SysAddClass(n, t) {
    $(n).hasClass(t) || $(n).addClass(t);
}

function SysRemoveClass(n, t) {
    $(n).hasClass(t) && $(n).removeClass(t);
}

function SysResetInvalidFlag(n) {
    var t = SysGetElement("InvalidFlag_" + n),
        i;
    t != null &&
        ((i = SysGetElement(n)),
            i != null ?
            i.value.trim() == "" ?
            SysRemoveClass(t, "displayNone") :
            SysAddClass(t, "displayNone") :
            (t.innerHTML = ""));
    t = SysGetElement(n);
    t != null && SysRemoveClass(t, "notValid");
    t = SysGetElement(n + "_alt");
    t != null && SysRemoveClass(t, "notValid");
    t = SysGetElement("okVerb");
    t != null && SysResetSaveButton(n);
}

function SysResetSaveButton(n) {
    var i = $('[id^="InvalidFlag_"]'),
        t;
    $("#okVerb").prop("disabled", !1);
    i.each(function() {
        $(this).hasClass("displayNone") ||
            ($.trim(this.innerHTML) != "" && $("#okVerb").prop("disabled", !0));
    });
    t = SysGetElement(n);
    t != null && t.value == "" && $("#okVerb").prop("disabled", !0);
}

function SysSetInvalidFlag(n) {
    var t = SysGetElement(n);
    t != null && SysAddClass(t, "notValid");
}

function SysSetDate(n) {
    switch (sysFormatDate) {
        case "1":
            return SetDate(n[2], n[1], n[0]);
        case "2":
            return SetDate(n[2], n[0], n[1]);
        case "3":
            return SetDate(n[0], n[1], n[2]);
    }
}

function SetDate(n, t, i) {
    var r, u;
    n >= 0 && n <= 99 && (n += n < 50 ? 2e3 : 1900);
    n > 9999 && (n = 9999);
    t > 12 && (t = 12);
    r = 31;
    switch (t) {
        case 2:
            r = SysLeapYear(n) ? 29 : 28;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            r = 30;
    }
    return (
        i > r && (i = r),
        (u = new Date()),
        u.setFullYear(n, t - 1, i),
        u.setHours(0, 0, 0, 0),
        u
    );
}

function SysLeapYear(n) {
    return (n % 4 == 0 && n % 100 != 0) || n % 400 == 0;
}

function SysFormatDate(n) {
    var r = n.getDate(),
        t,
        i;
    r.toString(10).length == 1 && (r = "0" + r);
    t = n.getMonth() + 1;
    t.toString(10).length == 1 && (t = "0" + t);
    i = n.getFullYear();
    i.toString(10).length == 3 && (i = " " + i);
    switch (sysFormatDate) {
        case "1":
            return r + sysFormatDateSep + t + sysFormatDateSep + i;
        case "2":
            return t + sysFormatDateSep + r + sysFormatDateSep + i;
        case "3":
            return i + sysFormatDateSep + t + sysFormatDateSep + r;
    }
}

function SysDateParts(n) {
    var r = [],
        t = n,
        i,
        f,
        e = sysFormatDateSep,
        u;
    for (
        e == "." && (e = "\\."),
        i = t.search(e),
        i != -1 &&
        ((f = SysStrip(t.substr(0, i))),
            (r[0] = parseInt(f)),
            (t = t.substr(i + 1))),
        i = t.search(e),
        i != -1 &&
        ((f = SysStrip(t.substr(0, i))),
            (r[1] = parseInt(f)),
            (t = t.substr(i + 1))),
        r[2] = parseInt(SysStrip(t)),
        u = 0; u < 3; u++
    )
        isNaN(r[u]) && (r[u] = 0);
    return r;
}

function SysSetDateCursor(n) {
    if (n.value == SysMask(sysDateMask, ""))
        $(n).one("click", function() {
            SysSetCaretPositionDateField(n.id, 0);
        });
}

function SysSetCaretPositionDateField(n, t) {
    var i = document.getElementById(n),
        r;
    i != null &&
        (i.createTextRange ?
            ((r = i.createTextRange()), r.move("character", t), r.select()) :
            i.selectionStart ?
            (i.focus(), i.setSelectionRange(t, t)) :
            i.focus());
}

function SysStrip(n) {
    if (n == null) return "";
    for (
        n = n.replace(/ /g, ""); n.length > 1 && n.substr(0, 1) == "0"; n = n.substr(1)
    );
    return n;
}

function SysUnFormatDate(n) {
    var t = SysDateParts(n);
    return t[0] == 0 || t[1] == 0 || t[2] == 0 ? null : SysSetDate(t);
}

function _SysMClearSelection(n, t) {
    var u = t.GetSelection(),
        f;
    if (u.length > 0) {
        for (
            var r = t.GetCaretPosition(), e = n.value, i = e.substr(0, r); i.length < u.length + r; i += "#"
        );
        return (
            (i += e.substr(r + u.length)),
            (f = sysDateMask),
            (i = SysUnmask(f, i, r).replace(/#/g, " ")),
            (n.value = SysMask(f, i)),
            t.SetCaretPosition(r - sysMaskEnd),
            (sysInputChanged = !0), !0
        );
    }
    return !1;
}

function SysUnmask(n, t, i) {
    var u, f, r;
    for (
        sysMaskEnd = 0, sysMaskPos = i, u = "", f = !0, r = n.length - 1; r >= 0; r--
    )
        switch (n.charAt(r)) {
            case "a":
            case "A":
            case "9":
            case "#":
                u = t.charAt(r) + u;
                r < i && (f = !1);
                break;
            default:
                r < i && (sysMaskPos--, f && sysMaskEnd++);
        }
    return u;
}

function SysMask(n, t) {
    for (var r = "", u = 0, i = 0; i < n.length; i++)
        switch (n.charAt(i)) {
            case "a":
            case "A":
            case "9":
            case "#":
                r += u < t.length ? t.charAt(u) : " ";
                u++;
                break;
            default:
                r += n.charAt(i);
        }
    return r;
}

function SysMKeyDown(n, t) {
    var i = new SysHandleKey(n);
    switch (i.GetKey()) {
        case SysHandleKey.Key.del:
            _SysMDelete(t);
            SysCancelBubble(n);
            break;
        case SysHandleKey.Key.backspace:
            _SysMBackSpace(t);
            SysCancelBubble(n);
    }
}

function SysMKeyPress(n, t) {
    if (SysProcessKey(n)) {
        var i = new SysSelection(t);
        _SysMPassChar(t, SysGetKey(n), i);
        SysCancelBubble(n);
    }
}

function _SysMDelete(n) {
    var i = new SysSelection(n);
    if (!_SysMClearSelection(n, i)) {
        for (
            var r = i.GetCaretPosition(),
                u = n.value,
                f = sysDateMask,
                t = SysUnmask(f, u, r); t.charAt(sysMaskPos) == " "; sysMaskPos++
        );
        t = SysMPutChar(sysMaskPos, " ", t);
        n.value = SysMask(f, t);
        i.SetCaretPosition(r);
        u != n.value && (sysInputChanged = !0);
    }
}

function _SysMBackSpace(n) {
    var i = new SysSelection(n),
        t;
    if (!_SysMClearSelection(n, i) && ((t = i.GetCaretPosition()), t > 0)) {
        var u = sysDateMask,
            f = n.value,
            r = SysUnmask(u, f, t);
        r = SysMPutChar(sysMaskPos - 1, " ", r);
        n.value = SysMask(u, r);
        i.SetCaretPosition(t - sysMaskEnd - 1);
        sysInputChanged = !0;
    }
}

function SysMPutChar(n, t, i) {
    var r = i.substr(0, n),
        u = i.substr(n + 1);
    return (sysInputChanged = !0), r + t + u;
}

function _SysMPassChar(n, t, i, r) {
    var c = 1,
        o,
        s;
    typeof r == "number" && (c = r);
    _SysMClearSelection(n, i);
    var u = i.GetCaretPosition(),
        e = sysDateMask,
        h = n.value,
        f = String.fromCharCode(t);
    if (!(u >= e.length) && !(c > e.length)) {
        o = !0;
        switch (e.charAt(u)) {
            case "a":
                f >= "a" && f <= "z" ?
                    ((n.value = SysMPutChar(u, f, h)), (u += 1), i.SetCaretPosition(u)) :
                    (o = !1);
                break;
            case "A":
                f >= "A" && f <= "Z" ?
                    ((n.value = SysMPutChar(u, f, h)), (u += 1), i.SetCaretPosition(u)) :
                    (o = !1);
                break;
            case "9":
                f >= "0" && f <= "9" ?
                    ((n.value = SysMPutChar(u, f, h)), (u += 1), i.SetCaretPosition(u)) :
                    (o = !1);
                break;
            case "#":
                n.value = SysMPutChar(u, f, h);
                u += 1;
                i.SetCaretPosition(u);
                break;
            default:
                u += 1;
                i.SetCaretPosition(u);
                e.charAt(u - 1) != (".-/".indexOf(f) >= 0 ? sysFormatDateSep : f) &&
                    _SysMPassChar(n, t, i, c + 1);
        }
        if (!o && ".-/".indexOf(f) >= 0)
            for (s = u; s < e.length; s++)
                if (e.charAt(s) == sysFormatDateSep) {
                    u = ++s;
                    i.SetCaretPosition(u);
                    break;
                }
        return u;
    }
}

function SysMCut(n, t) {
    document.execCommand("Copy");
    var i = new SysSelection(t);
    _SysMClearSelection(t, i);
    SysCancelBubble(n);
}

function SysMPaste(n, t) {
    var i, u, r;
    if (window.clipboardData) {
        if (
            (SysCancelBubble(n),
                (i = window.clipboardData.getData("Text")),
                i == null)
        )
            return;
        for (u = new SysSelection(t), r = 0; r < i.length; r++)
            _SysMPassChar(t, i.charCodeAt(r), u);
    }
}

function SysParseDate(n) {
    for (var i = SysDateParts(n.value), e = 0, t = 0; t < 3; t++)
        i[t] == 0 && e++;
    switch (e) {
        case 2:
            var r = new Date(),
                u = r.getMonth() + 1,
                f = r.getFullYear();
            for (t = 0; t < 3; t++)
                i[t] != 0 && (n.value = SysFormatDate(SetDate(f, u, i[t])));
            break;
        case 1:
            var r = new Date(),
                o,
                u,
                f = r.getFullYear(),
                s = !0;
            for (t = 0; t < 3; t++)
                i[t] != 0 &&
                (s ^ (sysFormatDate != "1") ? (o = t) : (u = i[t]), (s = !1));
            n.value = SysFormatDate(SetDate(f, u, i[o]));
            break;
        case 0:
            n.value = SysFormatDate(SysSetDate(i));
    }
}

function SysUnFormatNumber(n, t, i) {
    var f, u, e, o, r;
    if (n == null) return 0;
    if ($("#HourSeparator").length > 0) {
        if ($("#HourSeparator").val() == ":")
            return (
                n.toString().indexOf(":") == -1 &&
                (sysFormatDecSep == "," &&
                    n.toString().indexOf(",") != -1 &&
                    (n = n.replace(",", ".")),
                    (n = SysConvertDoubleToDuration(n))),
                n.toString().indexOf("-") == -1 &&
                (n = SysRoundToNearestInterval(n, t, i)),
                parseFloat(SysConvertDurationToDouble(n))
            );
        if (t != 0)
            return (
                (f = n),
                n.toString().indexOf(":") == -1 &&
                (sysFormatDecSep == "," &&
                    n.toString().indexOf(",") != -1 &&
                    (n = n.replace(",", ".")),
                    (f = SysConvertDoubleToDuration(n))),
                f.toString().indexOf("-") == -1 &&
                (f = SysRoundToNearestInterval(f, t, i)),
                parseFloat(SysConvertDurationToDouble(f))
            );
    }
    for (u = "", o = !1, e = 0; e < n.length; e++)
        (r = n.charAt(e)),
        r >= "0" && r <= "9" && (u += r),
        r == sysFormatDecSep && (u += "."),
        (r == "-" || r == "(" || r == ")") && (o = !0);
    return u.length == 0 ? 0 : (o && (u = "-" + u), parseFloat(u));
}

function SysFormatNumber(n, t, i, r) {
    var f, u;
    if (n == null) return 0;
    if (
        (i == undefined && (i = 0),
            r == undefined && (r = 0),
            $("#HourSeparator").length > 0)
    ) {
        if ($("#HourSeparator").val() == ":")
            return (
                (f = n.toString()),
                f.indexOf(":") == -1 && (n = SysUnFormatNumber(n, i, r)),
                (u = SysConvertDoubleToDuration(n)),
                u.toString().indexOf("-") == -1 ? SysRoundToNearestInterval(u, i, r) : u
            );
        i != 0 &&
            ((f = n.toString()),
                f.indexOf(":") == -1 && (n = SysUnFormatNumber(n, i, r)),
                (u = SysConvertDoubleToDuration(n)),
                u.toString().indexOf("-") == -1 &&
                (u = SysRoundToNearestInterval(u, i, r)),
                (n = SysConvertDurationToDouble(u)));
    }
    return t == null && (t = 2), SysFormatNumberEx(n, t);
}

function SysFormatNumberEx(n, t) {
    var r = Math.pow(10, t),
        u,
        f,
        e,
        o,
        i;
    if (
        (n == null && (n = "0"),
            (n = n.toString().replace(/\$|\,/g, "")),
            isNaN(n) && (n = "0"),
            (sign = n == (n = Math.abs(n))),
            (n = Math.floor(n * r + 0.50000000001)),
            (n + "").length >= 15 ?
            ((u = "SysCallBack.aspx?Action=5&num=" + n + "&pow=" + r),
                (cents = parseInt(SysCallback(u)))) :
            (cents = n % r),
            (n = Math.floor(n / r).toString()),
            cents < r)
    )
        for (
            cents == 0 && (cents = ""), f = t - cents.toString().length, i = 0; i < f; i++
        )
            cents = "0" + cents;
    for (
        e = sysFormatSep, o = sysFormatDecSep, i = 0; i < Math.floor((n.length - (1 + i)) / 3); i++
    )
        n =
        n.substr(0, n.length - (4 * i + 3)) +
        e +
        n.substr(n.length - (4 * i + 3));
    return (
        t > 0 && (n = n + o + cents),
        sign ? n : SysFormatNegative(n, sysFormatNegative)
    );
}

function SysConvertDurationToDouble(n) {
    var i = n,
        t;
    if ((n.indexOf("-") > -1 && (i = n.replace("-", "")), i.indexOf(":") != -1)) {
        if (((t = i.split(":")), t.length != 2)) return "0";
        var u = t[0],
            f = Number(t[1]),
            e = f / 60,
            r = (parseFloat(u) + parseFloat(e)).toString();
        return n.indexOf("-") > -1 ? -r : r;
    }
    return "0";
}

function SysConvertDoubleToDuration(n) {
    var i = 1,
        u,
        f;
    n < 0 && (i = -1);
    n = Math.abs(n);
    var t = parseInt(n),
        e = parseInt(Math.round((n - t) * 100)),
        r = 0;
    return (
        e != 0 && (r = parseInt(Math.round((60 * e) / 100))),
        (u = ""),
        r < 10 && (u = "0"),
        (t = t * i),
        (f = ""),
        t == 0 && i == -1 && (f = "-"),
        f + t + ":" + u + r
    );
}

function SysRoundToNearestInterval(n, t, i) {
    var e, r, s, u, f, h, o;
    if (
        ((s = n.split(":")),
            (e = s[0]),
            (r = s[1]),
            r.length == 1 && (r = r + "0"),
            i != 1 && e >= 24)
    )
        return "24:00";
    if (t > 0)
        if (
            ((u = Number(r)),
                (bAddHour = !1),
                (h = 60 / t),
                (o = Math.ceil(t / 2)),
                u >= 0 && u < o)
        )
            r = "00";
        else
            for (f = 0; f < h; f++)
                f != h - 1 ?
                u >= t * f + o &&
                u < t * (f + 1) + o &&
                ((r = (t * (f + 1)).toString()), r.length == 1 && (r = "0" + r)) :
                u >= t * f + o && ((r = "00"), (bAddHour = !0));
    else
        (u = Number(r)),
        (bAddHour = !1),
        u >= 60 && ((r = u - 60), (bAddHour = !0));
    return bAddHour == !0 && (e = Number(e) + 1), String(e) + ":" + r;
}

function SysDialogDeadend() {
    if (SysDialog.win && !SysDialog.win.closed) return SysDialog.win.focus(), !1;
}

function SysDialogCheckModal() {
    SysDialog.win && !SysDialog.win.closed && SysDialog.win.focus();
}

function SysDialogBlockEvents() {
    window.captureEvents(
        Event.CLICK | Event.MOUSEDOWN | Event.MOUSEUP | Event.FOCUS
    );
    window.onclick = SysDialogDeadend;
    window.onfocus = SysDialogCheckModal;
}

function SysDialogUnblockEvents() {
    window.releaseEvents(
        Event.CLICK | Event.MOUSEDOWN | Event.MOUSEUP | Event.FOCUS
    );
    window.onclick = null;
    window.onfocus = null;
}

function SysShowModalDialog(n, t, i) {
    return window.showModalDialog ?
        window.showModalDialog(n, t, i) :
        (alert("Your browser does not support this feature."), null);
}

function SysShowHelp(n, t, i, r) {
    r == undefined && (r = "");
    var u =
        "SysHelp.aspx?Title=" +
        SysURLEncode(n) +
        "&Topic=" +
        SysURLEncode(t) +
        "&TopicFilter=" +
        i,
        f = (screen.width - 800) / 2,
        e = (screen.height - 500) / 2;
    window.open(
        r + u,
        null,
        "width=800,height=500,left=" +
        f +
        ",top=" +
        e +
        ",resizable=yes,scrollbars=yes,status=yes,toolbar=yes,menubar=no,location=no"
    );
}

function SysPrintPage(n) {
    window.open(
        n,
        null,
        "width=200,height=200,titlebar=no,resizable=yes,scrollbars=yes,status=yes,toolbar=yes,menubar=yes,location=no"
    );
}

function SysAddUrl(n, t) {
    return n.indexOf("?") < 0 ? n + "?" + t : n + "&" + t;
}

function SysPrint() {
    SysPrintPage(SysAddUrl(sysPageUrl, "SysDoPrinting=1"));
}

function SysClientExportToExcel(n, t, i) {
    $("#" + n).excelexportjs({ containerid: n, datatype: t, worksheetName: i });
}

function SysExport(n) {
    window.location = SysAddUrl(sysPageUrl, "SysDoPrinting=1&SysExporting=" + n);
}

function SysSendMail(n, t) {
    SysSendPage(SysAddUrl(sysPageUrl, "SysDoPrinting=1&SysExporting=2"), n, t);
}

function SysGetMainWindowFrame() {
    var n = window.self;
    return (
        $("#IsEmbed").val() ?
        (n = window.self.parent.parent) :
        $(window.self).attr("name") !== "MainWindow" &&
        window.self !== window.top ?
        window.self.parent &&
        ($(window.parent).attr("name") === "Products" &&
            navigator.userAgent.match(/iPad/i) ?
            (n = window.self.parent) :
            $(window.self).attr("name") !== "Products" &&
            (n = window.self.parent)) :
        $(window.self).attr("name") === "MainWindow" &&
        window.self === window &&
        (n = window.self.parent),
        n
    );
}

function SysGetElement(n, t) {
    var r = t,
        i;
    return (t && typeof t.nodeName != "string" && (r = t.document), n != null) ?
        ((i = $get(n, r)), i != null) ?
        i :
        ((i = $("[name='" + n + "']", r)[0]), i == undefined ? null : i) :
        null;
}

function SysSet(n, t) {
    SysSetValue(n, t);
}

function SysSetValue(n, t) {
    var i = SysGetElement(n);
    i != null &&
        (i.tagName.toLowerCase() == "span" ? SysSetInnerText(i, t) : $(i).val(t));
}

function SysGet(n) {
    return SysGetValue(n);
}

function SysGetValue(n) {
    var t = SysGetElement(n);
    if (t != null) return $(t).val();
}

function SysTrim2(n, t) {
    return SysTrim(n, t);
}

function SysTrim(n, t) {
    if (n == null) return "";
    var i = jQuery.trim(n);
    return i.length == 0 ? (t == undefined && (t = !1), t ? n : i) : i;
}

function SysDef(n, t) {
    var i = SysGetElement(n);
    i !== undefined && i !== null && (i.value = t);
}

function SysDefName(n, t, i) {
    var r = document.getElementsByName(n),
        u;
    r != null && r.length >= t - 1 && ((u = r(t)), u != null && (u.value = i));
}

function SysDefCheck(n, t) {
    var i = document.getElementById(n);
    i != null && (i.checked = t);
}

function SysDefCheckList(n, t) {
    var r = document.getElementsByName(n),
        u,
        f,
        o,
        e;
    if (r != null)
        for (t != null && t != "" && (u = t.split(",")), i = 0; i < r.length; i++) {
            if (((f = !1), (o = new SysElement(r[i])), SysElement.IsNotNothing(u)))
                for (e = 0; !f && e < u.length;) {
                    if (o._el != undefined && o._el.value == u[e]) {
                        f = !0;
                        break;
                    }
                    e++;
                }
            r[i].checked = f;
        }
}

function SysDefRadioList(n, t) {
    $('[name="' + n + '"]').each(function() {
        this.checked = this.value == t;
    });
}

function SysAsk(n, t) {
    window.confirm(t) ? SysSet(n, 1) : SysSet(n, 0);
    SysSubmit();
}

function SysSwitchDivision(n, t, i, r) {
    (i || SysConfirm(8)) && ((window.top.allowSwitch = !0), SysLogOff(n, t, r));
}

function SysLogOff(n, t, i) {
    var r = "";
    n != null && (r = r.concat("&Division=".concat(n)));
    t != null && (r = r.concat("&App=".concat(t)));
    i != null && (r = r.concat("&Remember=".concat(i)));
    try {
        window.top.location = "ClearSession.aspx".concat(r.replace("&", "?"));
    } catch (u) {}
}

function SysDirtyBeforeUnload(n, t) {
    if (sysNoBeforeUnloadCheck) sysIsSubmitted = !1;
    else if (SysIsDirty() && !sysIsSubmitted && !isGroupDeleted)
        return (sysIsSubmitted = !1), SysPreventDefault(n, t), t;
}

function SysIsDirty() {
    try {
        if (typeof SysCheckDirty == "function" && SysCheckDirty()) return !0;
    } catch (t) {}
    if (_sysDirtyIDs != null && _sysDirtyChecks != null)
        for (i = 0; i < _sysDirtyIDs.length; i++) {
            var n = SysGetElement(_sysDirtyIDs[i]);
            if (n != null)
                if (n.tagName == "INPUT" && n.type == "checkbox") {
                    if (_sysDirtyChecks[i] != n.checked) return !0;
                } else if (n.tagName == "INPUT" && n.type == "radio") {
                if ($("input[id= " + _sysDirtyIDs[i] + "]").length > 0) {
                    if (
                        _sysDirtyChecks[i] != $("input[id= " + n.id + "]:checked").val()
                    )
                        return !0;
                } else if (
                    _sysDirtyChecks[i] !=
                    $("input[name= " + _sysDirtyIDs[i] + "]:checked").val()
                )
                    return !0;
            } else {
                if ($(n).hasClass("CuteEditorTextArea")) return EditorEdited;
                if (_sysDirtyChecks[i] != n.value) return !0;
            }
        }
    return !1;
}

function SysSaveDirtyValues() {
    if (_sysDirtyIDs != null)
        for (_sysDirtyChecks = [], i = 0; i < _sysDirtyIDs.length; i++) {
            var n = SysGetElement(_sysDirtyIDs[i]);
            _sysDirtyChecks[i] =
                n != null ?
                n.tagName == "INPUT" && n.type == "checkbox" ?
                n.checked :
                n.tagName == "INPUT" && n.type == "radio" ?
                $("input[id= " + _sysDirtyIDs[i] + "]").length > 0 ?
                $("input[id= " + n.id + "]:checked").val() :
                $("input[name= " + _sysDirtyIDs[i] + "]:checked").val() :
                n.value :
                "";
        }
}

function SysSetDirtyFalse(n) {
    if (_sysDirtyIDs != null && _sysDirtyChecks != null)
        for (i = 0; i < _sysDirtyIDs.length; i++)
            if (_sysDirtyIDs[i] == n) {
                var t = SysGetElement(_sysDirtyIDs[i]);
                t != null &&
                    (_sysDirtyChecks[i] =
                        t.tagName == "INPUT" && t.type == "checkbox" ? t.checked : t.value);
                break;
            }
    return !1;
}

function SysColumnDirty(n) {
    return n ? !0 : (SysConfirm(3), !1);
}

function SysColumnDeleteAsk(n) {
    return n ? SysConfirm() : (SysConfirm(3), !1);
}

function SysAlert(n, t, i, r, u, f) {
    return SysConfirm(5, n, t, i, r, u, f);
}

function textMetrics(n) {
    var i = 0,
        r = 0,
        t = document.createElement("div"),
        u;
    return (
        document.body.appendChild(t),
        $(t).css({
            position: "absolute",
            left: -1e3,
            top: -1e3,
            display: "none",
            width: "300px",
        }),
        $(t).html($(n).html()),
        (u = [
            "font-size",
            "font-style",
            "font-weight",
            "font-family",
            "line-height",
            "text-transform",
            "letter-spacing",
        ]),
        $(u).each(function() {
            var i = this.toString();
            $(t).css(i, $(n).css(i));
        }),
        (i = $(t).outerHeight()),
        (r = $(t).outerWidth()),
        $(t).remove(), { height: i, width: r }
    );
}

function SysPopupDate() {
    SysCallback(
        "SysInputSearch.aspx?TextType=" +
        sysInputTextType +
        "&Text=" +
        sysInputText,
        "",
        SysInputCallback
    );
}

function SysBrowserKeyDown(n, t) {
    var i = new SysHandleKey(n),
        f = i.GetKey(),
        r,
        u;
    f === SysHandleKey.Key.tab && SysCancelInputSearch();
    r = $(SysSrcElement(n));
    t
        ?
        i.IsF2Key() && ((F2pressed = !0), SysCancelBubble(n), r.dblclick()) :
        (i.IsF2Key() ||
            ((r.val() == "undefined" || r.val().length == 0) &&
                (f === SysHandleKey.Key.enter || i.IsTabKey()))) &&
        (i.IsF2Key() && (F2pressed = !0), SysCancelBubble(n), r.dblclick());
    t &&
        i.IsF2CtrlKey() &&
        n.srcElement.id.substr(0, 1) == "r" &&
        (n.srcElement.id.substr(3, 14) == "EmployeeID_alt" ||
            n.srcElement.id.substr(4, 14) == "EmployeeID_alt" ||
            n.srcElement.id.substr(5, 14) == "EmployeeID_alt") &&
        ((F2pressed = !0),
            SysCancelBubble(n),
            n.srcElement.id.substr(3, 14) == "EmployeeID_alt" &&
            (u = n.srcElement.id.substr(0, 13)),
            n.srcElement.id.substr(4, 14) == "EmployeeID_alt" &&
            (u = n.srcElement.id.substr(0, 14)),
            n.srcElement.id.substr(5, 14) == "EmployeeID_alt" &&
            (u = n.srcElement.id.substr(0, 15)),
            (c = SysGetElement("CSCOLFiltroGrupo")),
            c != null &&
            c.value != null &&
            CSCOLSysBrowseData(
                u,
                "Name=CSCOLFTGrupos&ResultCols=Descripcion,DatosRecursos&Options=1&Where=" +
                SysURLEncode(c.value),
                "HRMResourceCard.aspx?ID=", !0, !1,
                null,
                null,
                "r1_EmployeeID_alt,r1_EmployeeID_ref,r1_EmployeeID__ref_ref",
                null, !1
            ));
}

function SysBrowserKeyUp(n) {
    var t = new SysHandleKey(n);
    t.IsEscapeKey() ?
        window.isPopupLoadedWithError ?
        ($(".ui-dialog-content").dialog().dialog("close"),
            (window.isPopupLoadedWithError = !1)) :
        window.parent.SysCloseModalPopup() :
        t.IsInsertKey() && BrowseNew();
}

function CSCOLSysBrowseData(n, t, i, r, u, f, e, o, s, h, c, l) {
    var a, b, p, k;
    if (
        f != null &&
        ((a = SysGetElement(n + "_alt")), a != null && a.value != null)
    ) {
        for (var y = SysTrim(a.value), w = !1, v = 0; v < y.length; v++)
            if ("0123456789 .".indexOf(y.charAt(v)) < 0) {
                w = !0;
                break;
            }
        w && (t = t + "&BRS_" + f + "=" + SysURLEncode(y));
    }
    b = SysGetElement(n);
    h &&
        !F2pressed &&
        b.tagName == "INPUT" &&
        ((a = SysGetElement(n + "_alt")),
            a == null && (a = SysGetElement(n)),
            a != null &&
            a.value != "" &&
            (t = t + "&BRS_QuickSearch=" + a.value + "&ClickSearch=1"));
    F2pressed = null;
    s != 1 &&
        c != null &&
        (t = t + "&BRS_BackOfficeDivisionCode=" + SysURLEncode(c));
    l != null && (t = t + "&BRS_EntityEGBrowser=" + SysURLEncode(l));
    s == 1 ?
        ((p = "SysMultiBrowser.aspx?" + t), (k = SysGet(n))) :
        (p = "SysBrowser.aspx?" + t);
    SysDialog.ctl = n;
    SysDialog.bKeyInRef = u;
    SysDialog.refurl = i;
    SysDialog.onchangeScript = e;
    SysDialog.extraResults = o;
    SysShowModal(p, k, "850px", "600px", "CSCOLSysBrowseDataHandler();", !0);
}

function SysBrowserMouseDown(n) {
    n != null && (n.mouseclicked = !0);
}

function SysBrowserReset(n) {
    n != null && (n.mouseclicked = null);
}

function SysBrowserCheckKeyDown(n) {
    if (n != null) return n.mouseclicked ? !1 : !0;
}

function CSCOLSysBrowseDataHandler() {
    var s = SysDialog.ctl,
        a = SysDialog.bKeyInRef,
        h = SysDialog.refurl,
        e = SysDialog.returnValue,
        v = SysDialog.extraResults,
        n,
        i,
        t,
        o,
        l;
    if (
        ((n = SysGetElement(s)),
            n != null ?
            (n.id.substr(3, 10) == "EmployeeID" && (i = n.id.substr(1, 1)),
                n.id.substr(4, 10) == "EmployeeID" && (i = n.id.substr(1, 2)),
                n.id.substr(5, 10) == "EmployeeID" && (i = n.id.substr(1, 3))) :
            (i = 0),
            typeof e != "undefined")
    ) {
        if (e == null)
            for (
                t = parseInt(i), n = SysGetElement("r" + t + "_EmployeeID"); n != null;

            )
                (n = SysGetElement("r" + t + "_EmployeeID")),
                n != null && (n.value = ""),
                (n = SysGetElement("r" + t + "_EmployeeID_alt")),
                n != null && (n.value = ""),
                (n = SysGetElement("r" + t + "_EmployeeID_ref")),
                n != null && SysSetInnerText(n, ""),
                (n = SysGetElement("r" + t + "_EmployeeID_ref_ref")),
                n != null &&
                n.nodeName.toLowerCase() == "a" &&
                SysSetInnerText(n, ""),
                t++,
                (n = SysGetElement("r" + t + "_EmployeeID"));
        else {
            var u = e[1].split(";"),
                t = 0,
                f,
                c,
                r = 0;
            if (u.length > 0)
                for (t = 0; t < u.length; t++)
                    if (
                        ((r = t + parseInt(i)),
                            (n = SysGetElement("r" + r + "_EmployeeID")),
                            n != null)
                    )
                        (f = u[t].split(",")[0]),
                        (c = u[t].split(",")[1]),
                        (n = SysGetElement("r" + r + "_EmployeeID")),
                        n != null && (n.value = f),
                        (n = SysGetElement("r" + r + "_EmployeeID_alt")),
                        n != null && (n.value = f),
                        (n = SysGetElement("r" + r + "_EmployeeID_ref")),
                        n != null &&
                        (n.nodeName.toLowerCase() == "input" &&
                            ((o = SysGetElement(n.id + "_ref")), o && (n = o)),
                            h.length > 0 && (n.href = h + SysURLEncode(f)),
                            SysSetInnerText(n, c),
                            $(n).css("color", ""));
                    else break;
        }
        SysDialog.onchangeScript != null &&
            SysDialog.onchangeScript != "" &&
            ((l = new Function(SysDialog.onchangeScript)), l());
        try {
            HlpHtHandleBrowser(s);
        } catch (y) {}
        return !0;
    }
    return (
        SysGetElement("Editor_Editor") != null &&
        SysFrameDocument(Editor_Editor).body.focus(), !1
    );
}

function SysBrowserClear(n) {
    SysSet(n, "");
    SysSet(n + "_alt", "");
    var t = SysGetElement(n + "_ref");
    t != null && (SysSetInnerText(t, ""), (t.href = ""));
}

function SysMultiBrowserSingleSelect(n, t) {
    var r = SysEvent(n),
        i = $(r.target).parent("tr").children("td").find(":checkbox");
    i.attr("checked", !t || !i.attr("checked"));
}

function SysBrowserDef(n) {
    SysBrowserClear(n);
}

function SysBrowserClear(n) {
    SysSet(n, "");
    SysSet(n + "_alt", "");
    var t = SysGetElement(n + "_ref");
    t != null && (SysSetInnerText(t, ""), (t.href = ""));
}

function SysBrowserURL(n, t) {
    var e = new RegExp("<[A-Z](.+?)>", "g"),
        r = n.match(e),
        f,
        u;
    if (r != null)
        for (i = 0; i < r.length; i++)
            (u = SysGetElement(r[i].slice(1, -1))),
            (f = u != null ? SysURLEncode(u.value) : ""),
            (n = n.replace(r[i], f));
    return n + SysURLEncode(t);
}

function SysBrowseDateParam(n, t) {
    var o = SysGetValue(n),
        i,
        e,
        r,
        u,
        f;
    return o != null ?
        ((i = SysDateParts(o)),
            i[0] == 0 || i[1] == 0 || i[2] == 0 ?
            "&ParamName=" + t + "&ParamValue=" :
            ((e = SetDate(i[2], i[1], i[0])),
                (r = e.getDate()),
                r.toString(10).length == 1 && (r = "0" + r),
                (u = e.getMonth() + 1),
                u.toString(10).length == 1 && (u = "0" + u),
                (f = e.getFullYear()),
                f.toString(10).length == 3 && (f = " " + f),
                "&ParamName=" +
                t +
                "&ParamValue=" +
                SysURLEncode(f + "-" + u + "-" + r))) :
        "&ParamName=" + t + "&ParamValue=";
}

function SysBrowseParam(n, t) {
    var i = SysGetValue(n);
    return i != null ?
        "&ParamName=" + t + "&ParamValue=" + SysURLEncode(i) :
        "&ParamName=" + t + "&ParamValue=";
}

function SysBrowseList(n, t, i, r, u, f) {
    var c = "SysBrowser.aspx?" + t,
        e = window.showModalDialog(c, window, i),
        l,
        s,
        h,
        o;
    if (typeof e != "undefined" && e != null) {
        for (
            l = 1,
            s = "",
            typeof e != "object" && (e = Array(e)),
            (f || e.length == 1) && (s = e[0]),
            j = 1; j < e.length; j++
        )
            s.length > 0 && (s += " - "), (s += e[j]);
        h = SysGetElement(n.substr(0, n.length - 4));
        o = h.value;
        o != null && o.length > 0 && o.substr(o.length - 1, 1) != ";" && (o += ";");
        o += s;
        h.value = o;
    }
    return !1;
}

function SysBrowse(n) {
    try {
        return SysGetElement("p" + n).click(), SysGet(n);
    } catch (t) {}
}

function SysFileFieldToggle(n) {
    var t = $(SysGetElement(n + "_tdName")),
        i = $(SysGetElement(n + "_tdFile"));
    t.css("display") == "none" ? (t.show(), i.hide()) : (t.hide(), i.show());
}

function SysFileUpload(n, t, i) {
    var e = AddFileAttachment(n),
        r = new XMLHttpRequest(),
        u = new FormData(),
        f;
    noOfFileUpload = noOfFileUpload + 1;
    typeof SetFeedTabStatus == "function" && SetFeedTabStatus();
    try {
        r.open("POST", e, !0);
        (r.upload || r).addEventListener("progress", function(n) {
            var i = n.position || n.loaded,
                r = n.totalSize || n.total,
                t = document.getElementById("fileprogressbar");
            t != null && (t.style.width = Math.round((i / r) * 50) + "%");
            filesToUploading = 1;
            typeof SetPostButtonStatus == "function" && SetPostButtonStatus();
        });
        r.addEventListener("load", function() {
            var t = document.getElementById("fileprogressbar"),
                i,
                n;
            t != null &&
                ((i = t.parentNode),
                    (n = document.createElement("td")),
                    n.setAttribute("colspan", "2"),
                    n.setAttribute("id", "fileprogressbarDone"),
                    n.setAttribute("height", "1px"),
                    n.setAttribute("class", "feedfileprogressbar"),
                    n.setAttribute("style", "width: 100%;"),
                    (n.textContent = "_"),
                    i.appendChild(n),
                    $("#fileprogressbar").remove(),
                    (noOfFileUploadDone = noOfFileUploadDone + 1));
        });
        r.onreadystatechange = function() {
            r.readyState == 4 &&
                (r.status == 200 || r.status == 204) &&
                (filesToUploadAttachmentid.push({
                        fileAttId: r.response.replace('"', "").replace('"', ""),
                        fileObject: t,
                        fileControlID: i,
                    }),
                    noOfFileUpload - 1 <= noOfFileUploadDone &&
                    ($(".FeedDocAttachmentDeleteIcon")
                        .css("visibility", "visible")
                        .hide()
                        .fadeIn("slow"),
                        (filesToUploading = 0),
                        typeof SetPostButtonStatus == "function" && SetPostButtonStatus()));
        };
        f = filesToUpload[filesToUpload.length - 1].fileObject;
        u.append("file", f);
        r.send(u);
    } catch (o) {}
}

function SysUploadVirtualAttachment(n, t) {
    var r = AddVirtualAttachment(n);
    typeof SetPostButtonStatus == "function" && SetPostButtonStatus();
    $.ajax(r, {
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(t),
        success: function(n) {
            var t, r;
            if (n)
                for (
                    $(".FeedDocAttachmentDeleteIcon")
                    .css("visibility", "visible")
                    .hide()
                    .fadeIn("slow"),
                    t = JSON.parse(n),
                    i = 0; i < t.length; i++
                )
                    (r = { name: null, size: 0 }),
                    (r.name = t[i].name),
                    filesToUploadAttachmentid.push({
                        fileAttId: t[i].id,
                        fileObject: r,
                        fileControlID: null,
                    }),
                    filesToUpload.push({ fileObject: r, fileControlID: null });
            typeof SetFeedTabStatus == "function" && SetFeedTabStatus();
            typeof SetPostButtonStatus == "function" && SetPostButtonStatus();
        },
        error: function() {
            alert("Error upload file");
        },
    });
}

function SysRemoveAllFileUpload(n) {
    if (n == null) return 0;
    var i = Removeallfileattachment(n),
        t = new XMLHttpRequest(),
        r = new FormData();
    t.open("POST", i, !0);
    t.onreadystatechange = function() {
        t.readyState == 4 &&
            (t.status == 200 || t.status == 204) &&
            ((noOfFileUpload = 0),
                (noOfFileUploadDone = 0),
                (filesToUploading = 0),
                $("#IsDeletingEntities").val("True"),
                typeof SetFeedTabStatus == "function" && SetFeedTabStatus());
    };
    t.send();
}

function RemoveNewsFeedAttachedObject() {
    var t = SysGetElement("feed_id"),
        n;
    $("#OldAttachments").val() &&
        (oldAttachedObject = JSON.parse($("#OldAttachments").val()));
    for (n in oldAttachedObject)
        $.ajax(Removefileattachment(t.value, n), {
            type: "POST",
            dataType: "json",
            success: function() {},
            error: function() {},
        });
}

function SysRemoveFileUpload(n, t) {
    var f, u, i;
    if (filesToUploadAttachmentid.length == 0) return 0;
    for (i = 0; i <= filesToUploadAttachmentid.length - 1; i++)
        t == filesToUploadAttachmentid[i].fileControlID &&
        n.name == filesToUploadAttachmentid[i].fileObject.name &&
        ((u = filesToUploadAttachmentid[i].fileAttId),
            (f = filesToUploadAttachmentid[i].fileAttId),
            filesToUploadAttachmentid.splice(i, 1));
    if (
        ((noOfFileUpload = noOfFileUpload - 1),
            (filesToUploading = 1),
            typeof SetPostButtonStatus == "function" && SetPostButtonStatus(),
            typeof SetFeedTabStatus == "function" && SetFeedTabStatus(),
            u == null)
    )
        return 0;
    var e = Removefileattachment(f, u),
        r = new XMLHttpRequest(),
        o = new FormData();
    r.open("POST", e, !0);
    r.onreadystatechange = function() {
        r.readyState == 4 &&
            (r.status == 200 || r.status == 204) &&
            noOfFileUpload - 1 <= noOfFileUploadDone &&
            ((filesToUploading = 0),
                typeof SetFeedTabStatus == "function" && SetFeedTabStatus(),
                $("#NewsAttImgSwitchSection").css("display", "none"),
                $("#NewsAttFileSwitchSection").css("display", "none"),
                typeof CheckToggleAfterDeleteAttachments == "function" &&
                CheckToggleAfterDeleteAttachments(),
                typeof CheckToggleForOldAttachments == "function" &&
                CheckToggleForOldAttachments());
    };
    r.send();
}

function SysFilesFieldAddFile(n, t) {
    var r = SysFilesFieldGetTopFile(n),
        i;
    r != null &&
        r.value != null &&
        r.value.length != 0 &&
        (t == null ?
            SysFilesFieldAddToList(n) :
            t == 1 ?
            SysFilesFieldAddToListNewUx(n) :
            SysFilesFieldAddToList(n),
            (i = SysGetElement(n + "_FileNumber")),
            i != null &&
            (t == null ?
                SysSetInnerText(i, SysFilesFieldGetFileNumber(n)) :
                t == 1 ?
                SysFilesFieldGetFileNumberNewUx(n) :
                SysSetInnerText(i, SysFilesFieldGetFileNumber(n))));
}

function SysFilesFieldSetBorder(n) {
    var t, i, r;
    try {
        if (
            ((t = $("#" + n + "_List")),
                t == null ? (t = SysGetElement(n + "_List")) : (i = t.find("tr")),
                t == null &&
                ((t = SysGetElement(n.replace("$", "_") + "_List")),
                    t != null && t.childNodes.length == 0))
        )
            return 0;
        i.length == 0 ?
            t.parent().css("border", "0") :
            (t.parent().css("border", "1px solid Black"),
                i.last().children().css("border-bottom", "0"),
                t.parent().css("height", ""),
                (r = 0),
                i.each(function() {
                    r += $(this).outerHeight();
                }),
                Sys.Browser.agent !== Sys.Browser.InternetExplorer ?
                r >= 84 ?
                (t.parent().css("height", "84px"),
                    t.parent().css("overflow", "auto")) :
                t.parent().css("overflow", "") :
                r >= 96 ?
                (t.parent().css("height", "96px"),
                    t.parent().css("overflow", "auto")) :
                t.parent().css("overflow", ""));
    } catch (u) {}
}

function SysFilesFieldGetFileNumber(n) {
    var t = SysGetElement(n + "_List");
    return t != null ? t.rows.length : 0;
}

function SysGetFileSize(n) {
    if (n.files && n.files.length > 0) {
        if (n.files[0]) return n.files[0].size;
        if (n.files.item(0)) return n.files.item(0).size;
    } else if (n.value && n.value.length > 0) {
        var t = new ActiveXObject("Scripting.FileSystemObject"),
            i = t.GetFile(n.value).Size;
        return (t = null), i;
    }
    return 0;
}

function SysFilesFieldAddToList(n) {
    for (
        var b = SysGetElement(n + "_List"),
            t = SysFilesFieldGetTopFile(n),
            a = [],
            f,
            r,
            y,
            e,
            h,
            i,
            p,
            s,
            c,
            o,
            l,
            k,
            w,
            v,
            u = 0; u <= t.files.length - 1; u++
    ) {
        if (
            ((f = t.files[u].name),
                (r = document.createElement("div")),
                (r.style.backgroundColor = "#ffffff"),
                (r.style.fontWeight = "normal"),
                (r.style.textAlign = "left"),
                (r.style.verticalAlign = "middle"),
                (r.title = f),
                (r.value = t.id),
                f.length > 128)
        )
            return (
                (y = SysGetElement(n + "_divFile")),
                y.removeChild(t),
                (e = SysFilesFieldCheckMaxFileNumber(n)),
                (v = SysFilesFieldCreateFile(n, e)),
                SysAlert(
                    0,
                    SysTerm(409, "Attachment filename") +
                    " : " +
                    SysTerm(18637, "Exceeded") +
                    " - " +
                    SysTerm(33551, "Max. number of characters") +
                    "(128)"
                ), !1
            );
        filesToUpload.push({ fileObject: t.files[u], fileControlID: t.id });
        h = SysGetElement("feed_id");
        h != null &&
            ((u = t.files.length - 1) ?
                SysFileUpload(h.value, t.files[u], t.id) :
                SysFileUpload(h.value, t.files[u], t.id));
        r.innerHTML = f;
        i = document.createElement("div");
        i.style.backgroundColor = "#ffffff";
        i.style.fontWeight = "normal";
        i.style.textAlign = "center";
        i.style.verticalAlign = "middle";
        i.style.height = "16px";
        p = SysTerm(26102, "Remove") + ": " + f;
        i.title = p;
        i.value = t.id;
        s = document.createElement("img");
        s.src = "images/clear.svg";
        s.onclick = function() {
            SysFilesFieldRemoveRow(n, this);
            SysFilesFieldSetBorder(n);
        };
        i.appendChild(s);
        c = b.insertRow(0);
        o = c.insertCell(0);
        o.style.width = "90%";
        o.style.borderBottom = "1px solid #777777";
        o.style.height = "20px";
        o.appendChild(r);
        l = c.insertCell(1);
        l.style.textAlign = "right";
        l.style.borderBottom = "1px solid #777777";
        o.style.height = "20px";
        l.appendChild(i);
        k = c.insertCell(2);
        w = SysFilesFieldCheckFileFormat(n, f);
        w || (a.push(f), SysFilesFieldRemoveRow(n, s), SysFilesFieldSetBorder(n));
        e && (e = SysFilesFieldCheckMaxFileNumber(n));
    }
    return (
        a.length != 0 && SysDisplayInvalidFormatMsg(a),
        (v = SysFilesFieldCreateFile(n, e)), !1
    );
}

function SysDisplayInvalidFormatMsg(n) {
    var f, r, t, i, e, u;
    if (n.length == 1)
        (f = SysTerm(42476, "has an invalid file format and will not be added.")),
        (r = "[" + n[0] + "]");
    else if (
        ((f = SysTerm(42477, "have an invalid file format and will not be added.")),
            n.length == 2)
    )
        r = "[" + n[0] + "] " + SysTerm(57688, "and") + " [" + n[1] + "]";
    else {
        for (t = "", i = 1; i <= n.length - 1; i++)
            t = t == "" ? n[i] : t + "&#13;" + n[i];
        e =
            "<a href='#' title='" +
            t +
            "'>" +
            (n.length - 1) +
            " " +
            SysTerm(323, "more") +
            "</a>";
        r = "[" + n[0] + "] " + SysTerm(57688, "and") + " " + e;
    }
    u = SysTerm(16165, "File") + ": " + r + " " + f;
    SysAlert(0, u, SysConfirmWidth(u), SysConfirmHeight(u), "", !1);
}

function SysConvertFileSizeFromBytes(n) {
    var t, i;
    return (
        n < 1024 ?
        (i = String(n) + " bytes.") :
        n < 1048576 ?
        ((t = n / 1024), (i = String(t.toFixed(2)) + " KB.")) :
        ((t = n / 1048576), (i = String(t.toFixed(2)) + " MB.")),
        i
    );
}

function SysFilesFieldCreateFile(n, t) {
    var e = SysGetElement(n + "_divFile"),
        r = SysGetElement(n + "_FileCount"),
        u,
        f,
        i;
    return (
        r || (r = $("[id$='_FileCount']")[0]),
        (u = SysFilesFieldGetTopFile(n)),
        (r.value = parseInt(r.value) + 1),
        (f = n + "_File" + r.value),
        (i = document.createElement("input")),
        (i.id = i.name = f),
        (i.type = "file"),
        (i.style.width = "100%"),
        (i.style.display = ""),
        (i.multiple = !0),
        (i.onchange = function() {
            SysFilesFieldAddFile(n);
            SysFilesFieldSetBorder(n);
        }),
        t == !1 && (i.disabled = "true"),
        _sysDirtyIDs.push(f),
        e.appendChild(i),
        u != null && (u.style.display = "none"),
        i
    );
}

function SysFilesFieldGetTopFile(n) {
    var t = SysGetElement(n + "_FileCount"),
        r,
        i;
    return (
        t == null && (t = SysGetElement(n.replace("_", "$") + "_FileCount")),
        t || (t = $("[id$='_FileCount']")[0]),
        (r = n + "_File" + t.value),
        (i = SysGetElement(r)),
        i == null && (i = SysGetElement(n.replace("_", "$") + "_File" + t.value)),
        i
    );
}

function SysFilesFieldRemoveRow(n, t) {
    var a = SysGetElement(n + "_divFile"),
        s = SysGetElement(n + "_List"),
        h = SysGetElement(t.parentNode.value),
        r,
        u,
        f,
        i,
        c,
        l,
        e,
        o;
    for (
        h != null && a.removeChild(h),
        r = t.parentNode.parentNode.parentNode.rowIndex,
        i = 0; i <= filesToUpload.length - 1; i++
    )
        (u = filesToUpload[i].fileObject),
        (f = filesToUpload[i].fileControlID),
        f == t.parentNode.value &&
        u.name == s.rows[r].textContent &&
        ((c = SysGetElement("feed_id")),
            c != null && SysRemoveFileUpload(u, f),
            filesToUpload.splice(i, 1));
    s.deleteRow(r);
    l = SysFilesFieldCheckMaxFileNumber(n);
    l && ((e = SysFilesFieldGetTopFile(n)), e != null && (e.disabled = ""));
    o = SysGetElement(n + "_FileNumber");
    o != null && SysSetInnerText(o, SysFilesFieldGetFileNumber(n));
}

function SysFilesFieldCheckFileFormat(n, t) {
    var r = SysGetElement(n + "_FileFormat"),
        u,
        e,
        f;
    if (
        (r == null && (r = SysGetElement(n.replace("_", "$") + "_FileFormat")),
            r || (r = $("[id$='_FileFormat']")[0]),
            r.value == "*" || r.value.length == 0)
    )
        return !0;
    if (((u = t.lastIndexOf(".")), u < 0)) return !1;
    for (e = t.substr(u + 1), f = r.value.split("|"), i = 0; i < f.length; i++)
        if (f[i].toUpperCase() == e.toUpperCase()) return !0;
    return !1;
}

function SysFilesFieldCheckMaxFileNumber(n) {
    var i = SysGetElement(n + "_List"),
        t;
    return (i == null && (i = SysGetElement(n.replace("_", "$") + "_List")),
            (t = SysGetElement(n + "_MaxFileNumber")),
            t == null && (t = SysGetElement(n.replace("_", "$") + "_MaxFileNumber")),
            t || (t = $("[id$='_MaxFileNumber']")[0]),
            t.value <= 0) ?
        !0 :
        i.rows.length >= t.value ?
        !1 :
        !0;
}

function SysFilesFieldCheckMaxFileSize(n, t) {
    var i = SysGetElement(n + "_MaxFileSize");
    return (i == null &&
            (i = SysGetElement(n.replace("$", "_") + "_MaxFileSize")),
            i == null && (i = SysGetElement(n.replace("_", "$") + "_MaxFileSize")),
            i || (i = $("[id$='_MaxFileSize']")[0]),
            i == null) ?
        !0 :
        i.value <= 0 ?
        !0 :
        t > i.value ?
        !1 :
        !0;
}

function SysFilesFieldCheckMaxTotalFileSize(n) {
    var t = SysGetElement(n + "_MaxTotalFileSize"),
        i,
        u,
        r;
    if (
        (t == null &&
            (t = SysGetElement(n.replace("_", "$") + "_MaxTotalFileSize")),
            t || (t = $("[id$='_MaxTotalFileSize']")[0]),
            t.value > 0)
    ) {
        if (((i = 0), (u = SysGetElement("feed_id")), u != null))
            for (r = 0; r <= filesToUpload.length - 1; r++)
                i = i + filesToUpload[r].fileObject.size;
        else return !0;
        return i <= t.value;
    }
    return !0;
}

function SysComboUp(n) {
    var t = SysGetElement(n);
    t != null && t.selectedIndex > 0 && (t.selectedIndex -= 1);
}

function SysComboDown(n) {
    var t = SysGetElement(n);
    t != null && t.selectedIndex < t.options.length - 1 && (t.selectedIndex += 1);
}

function SysGetCaretPosition(n) {
    if (window.getSelection) return doSelectionStart($(n).get(0));
    for (
        var t = $(n).val().replace(/\n/g, "").length + 1,
            i = document.selection.createRange().duplicate(); i.parentElement() == $(n).get(0) && i.move("character", 1) == 1;

    )
        --t;
    return --t;
}

function SysSetCaretPosition(n, t) {
    var i = $(n).get(0),
        r;
    window.getSelection ?
        (doSelectionStart(i, t), doSelectionEnd(i, t)) :
        ((r = i.createTextRange()), r.move("character", t), r.select());
}

function SysInsertAtCaret(n, t) {
    var i, u;
    if (document.selection)
        (i = n.scrollTop),
        n.focus(),
        (u = document.selection.createRange()),
        (u.text = t),
        n.focus(),
        (n.scrollTop = i);
    else if (window.getSelection) {
        var r = n.selectionStart,
            f = n.selectionEnd,
            i = n.scrollTop;
        n.value =
            n.value.substring(0, r) + t + n.value.substring(f, n.value.length);
        n.focus();
        n.selectionStart = r + t.length;
        n.selectionEnd = r + t.length;
        n.scrollTop = i;
    }
}

function SysStoreCaret(n) {
    n.createTextRange &&
        (n.caretPos = document.selection.createRange().duplicate());
}

function SysSetTimestamp(n) {
    var u = new Date(),
        i = parseInt(u.getTimezoneOffset()),
        t = "(GMT ",
        f,
        r;
    if (
        ((t += i <= 0 ? "+" : "-"),
            Math.abs(i) < 600 && (t += "0"),
            (t += Math.floor(Math.abs(i) / 60) + ":"),
            Math.abs(i % 60) < 10 && (t += "0"),
            (t += Math.abs(i) % 60),
            (t += ")"),
            (f =
                "[" +
                SysUserFullName() +
                " " +
                SysDateFormat(u) +
                " " +
                SysTimeFormat(u.toTimeString()) +
                " " +
                t +
                "]"),
            (r = SysGetElement(n)),
            r.type == "hidden")
    ) {
        r.value = f;
        return;
    }
    SysInsertAtCaret(r, f);
}

function SysSetFullscreen(n) {
    SysPopupMemo(n, null, null, null, !0);
}

function SysImageRadioButton(n, t) {
    var r = SysGetElement(n).value;
    SysGetElement(n + r).className = "unselected";
    SysGetElement(n + t).className = "selected";
    SysGetElement(n).value = t;
    try {
        for (
            SysGetElement(n + t).className.baseVal != "selected" &&
            ((SysGetElement(n + t).className.baseVal = "partially-selected"),
                (SysGetElement(n + t).className.animVal = "partially-selected")),
            i = 0; i < 8; i++
        )
            i != t &&
            SysGetElement(n + i).className.baseVal == "partially-selected" &&
            ((SysGetElement(n + i).className.baseVal = "unselected"),
                (SysGetElement(n + i).className.animVal = "unselected"));
    } catch (u) {}
}

function SysImageToggleButton(n, t, i, r) {
    for (var s = SysGetElement(n), f = 0, u, e, o; f < t.length;) {
        if (t[f] == s.value) {
            u = f;
            break;
        }
        f++;
    }
    u == t.length - 1 ? (u = 0) : u++;
    s.value = t[u];
    e = SysGetElement(n + "_img");
    e != null && ((e.title = r[u]), convertToInlineSVG(e, i[u]));
    o = SysGetElement(n + "_btn");
    o != null && (o.title = r[u]);
}

function SysImageToggleButtonReset(n, t, i, r, u) {
    for (var s = SysGetElement(n), f = 0, e, o; f < t.length;) {
        if (t[f] == u) {
            e = f;
            break;
        }
        f++;
    }
    s.value = t[e];
    o = SysGetElement(n + "_img");
    o != null && ((o.title = r[e]), convertToInlineSVG(o, i[e]));
}

function SysSetSecurity(n) {
    SysSetValue(n, SysGetValue(n + "_select"));
}

function SysSetSecuritySelect(n) {
    var t = SysGetValue(n);
    switch (t) {
        case null:
        case "":
            return;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "10":
        case "100":
        case "101":
            SysSetValue(n + "_select", t);
            break;
        default:
            SysSetValue(n + "_select", "10");
            (t >= 10 && t < 100) || SysSetValue(n, "10");
    }
}

function SysBrowseTermhandler() {
    var n = SysDialog.returnValue,
        i = SysDialog.ctl,
        u = SysGetElement(i + "_Term"),
        r,
        t,
        f;
    typeof n != "undefined" &&
        ((r = SysGetElement(i)),
            (t = SysGetElement(i + "_Ref")),
            n == null ?
            ((r.value = ""), (u.value = 0), SysSetInnerText(t, "")) :
            ((r.value = n[1]),
                (u.value = n[0]),
                (t.href = "SysTerm.aspx?_ID=" + n[0]),
                (f = n[2]),
                SysSetInnerText(t, f)));
}

function SysSetReadOnly(n, t) {
    n &&
        ((n.readOnly = t),
            (n.style.backgroundColor = t ? "#e7e7e7" : ""),
            (n.tabIndex = t ? -1 : 0));
}

function SysCheckFocus(n) {
    onChangeTriggered = !1;
    onFocusValue = SysGetValue(n.id);
}

function SysCheckOnChange(n) {
    if (onChangeTriggered == !0) {
        onChangeTriggered = !1;
        return;
    }
    var t = SysTrim(n.value);
    t != "" &&
        SysTrim(onFocusValue) != t &&
        new SysElement(n).FireEvent("change");
    onChangeTriggered = !1;
}

function SetEmptyDate(n) {
    if (SysTrim(n.value) == "")
        switch (sysFormatDate) {
            case "1":
            case "2":
                n.value = "  " + sysFormatDateSep + "  " + sysFormatDateSep + "    ";
                break;
            case "3":
                n.value = "    " + sysFormatDateSep + "  " + sysFormatDateSep + "  ";
        }
}

function SysInputOnFocus(n) {
    SysAddClass(n, "Selected");
}

function SysInputOnBlur(n) {
    SysRemoveClass(n, "Selected");
    sysInputChanged = !1;
}

function SysChangeOnBlur(n) {
    sysInputChanged &&
        (new SysElement(n).FireEvent("change"), (sysInputChanged = !1));
}

function dblClickTransfer(n, t) {
    clickCount++;
    clickCount == 1 && (firstClick_MiliSeconds = new Date().getTime());
    var i = new Date().getTime() - firstClick_MiliSeconds;
    clickCount == 2 && (i < 500 && SysDualListTransfer(n, t), (clickCount = 0));
}

function SysDualListTransfer(n, t) {
    var r = SysGetElement(n + (t ? "_list" : "_selected")),
        f = SysGetElement(n + (t ? "_selected" : "_list")),
        i,
        e,
        u;
    if (f != null && r != null && !(r.length <= 0)) {
        for (i = 0; r.options.length > i; i++)
            if (((u = r.options[i]), u.selected)) {
                e = SysDualListInsert(f, u.value, u.text);
                $(e).on("click", function() {
                    dblClickTransfer(n, !t);
                });
            }
        for (i = r.options.length - 1; i >= 0; i--)
            (u = r.options[i]), u.selected && SysDualListRemove(r, i);
        SysDualListOptions(n);
        e != null && ((f.selectedIndex = e.index), f.focus());
    }
}

function SysDualReset(n, t) {
    var u = SysGetElement(n + "_list"),
        f = SysGetElement(n + "_selected"),
        o,
        s,
        e,
        r;
    if (u != null && f != null) {
        for (i = f.options.length - 1; i >= 0; i--)
            (r = f.options[i]),
            SysDualListInsert(u, r.value, r.text),
            SysDualListRemove(f, i);
        if (t != null)
            for (o = t.split(","), i = 0; o.length > i; i++)
                for (s = o[i], e = 0; u.options.length > e; e++)
                    (r = u.options[e]),
                    r.value == s &&
                    (SysDualListInsert(f, r.value, r.text), SysDualListRemove(u, e));
        SysDualListOptions(n);
    }
}

function SysDualListMove(n, t) {
    var i = SysGetElement(n + "_selected"),
        u,
        r,
        f,
        e;
    if (!(i.length <= 0))
        return (i.selectedIndex == i.length - 1 && t == 0) ||
            (i.selectedIndex == 0 && t == 1) ?
            void 0 :
            ((u = i.selectedIndex), u == -1) ?
            void 0 :
            ((r = u + (t ? -1 : 1)),
                r < 0 && (r = i.length - 1),
                r >= i.length && (r = 0),
                (f = i[u].value),
                (e = i[u].text),
                (i[u].value = i[r].value),
                (i[u].text = i[r].text),
                (i[r].value = f),
                (i[r].text = e),
                (i.selectedIndex = r),
                SysDualListOptions(n), !1);
}

function SysDualListInsert(n, t, i) {
    var r = new Option(i, t);
    return (n.options[n.length] = r), r;
}

function SysDualListRemove(n, t) {
    n.length <= 0 || (t != -1 && (n.options[t] = null));
}

function SysDualListOptions(n) {
    for (
        var i = SysGetElement(n + "_selected"),
            u = SysGetElement(n),
            f = i.options.length,
            r = "",
            t = 0; t < f; t++
    )
        r += i.options[t].value + ",";
    u.value = r;
}

function SysDualImgUnSelect(n) {
    for (var i, t = 0; t < n.rows.length; t++)
        (i = n.rows[t]), (i.className = "DataLight");
}

function SysDualImgSelect(n, t) {
    var f = !0,
        u = SysEvent(n),
        i,
        r;
    for (
        u.ctrlKey ||
        u.ctrlLeft ||
        (u.shiftKey || u.shiftLeft ? (f = !1) : SysDualImgUnSelect(t)),
        i = u.target; i != null && i.tagName != "TR";

    )
        i = i.parentNode;
    if (i != null) {
        for (r = i; r != null && r.tagName != "TABLE";) r = r.parentNode;
        r == null || r != t;
    }
}

function SysDualImgMultipleHandler(n, t, i) {
    var f = !0,
        r,
        u,
        e;
    for (
        (i.shiftKey || i.shiftLeft) && (f = !1),
        r = 0,
        r = Sys.Browser.agent === Sys.Browser.Firefox ? i.target : i.srcElement; r != null && r.tagName.toLowerCase() != "tr";

    )
        r = r.parentNode;
    if (r == null) return t;
    for (u = r; u != null && u.tagName.toLowerCase() != "table";)
        u = u.parentNode;
    return u == null || u != n ?
        t :
        !f && t != null ?
        (SysDualImgSelectMulti(n, u, r, t), t) :
        ((e = r.getAttribute("dummy")),
            e != "1" ? ((r.className = "Selected"), r) : void 0);
}

function SysDualImgSelectMulti(n, t, r, u) {
    var f = t.getElementsByTagName("TR"),
        o = u,
        s = !1,
        e;
    for (i = 0; i < f.length - 1; i++) {
        if (f[i].textContent === r.textContent) break;
        if (f[i].textContent === o.textContent) {
            s = !0;
            break;
        }
    }
    if (r.textContent === o.textContent) {
        SysDualImgUnSelect(n);
        o.className = "Selected";
        return;
    }
    if (o != null)
        if (((e = !1), s))
            for (i = 0; i < f.length - 1; i++)
                f[i].textContent === o.textContent && (e = !0),
                (f[i].className = e ? "Selected" : "DataLight"),
                f[i].textContent === r.textContent && (e = !1);
        else
            for (i = 0; i < f.length - 1; i++)
                f[i].textContent === r.textContent && (e = !0),
                (f[i].className = e ? "Selected" : "DataLight"),
                f[i].textContent === o.textContent && (e = !1);
}

function dblClickImgTransfer(n, t) {
    clickCountImg++;
    clickCountImg == 1 && (firstImgClick_MiliSeconds = new Date().getTime());
    var i = new Date().getTime() - firstImgClick_MiliSeconds;
    clickCountImg == 2 &&
        (i < 500 && SysDualImgListTransfer(n, t), (clickCountImg = 0));
}

function SysDualImgListTransfer(n, t) {
    var f = SysGetElement(n + (t ? "_list" : "_selected")),
        u = SysGetElement(n + (t ? "_selected" : "_list")),
        e,
        r,
        o;
    if (u != null && f != null && !(f.rows.length <= 0)) {
        for (i = u.rows.length - 1; i >= 0; i--)
            (r = u.rows[i]), r.className == "Selected" && (r.className = "DataLight");
        for (i = f.rows.length - 1; i >= 0; i--)
            (e = u.rows[u.rows.length - 1]),
            (r = f.rows[i]),
            r.className == "Selected" &&
            ((o = r.getAttribute("dummy")),
                $(r).attr("onclick", "dblClickImgTransfer('" + n + "'," + !t + ")"),
                o != "1" &&
                (Sys.Browser.agent === Sys.Browser.Firefox ?
                    u.appendChild(r) :
                    e.insertAdjacentElement("beforeBegin", r)));
        SysDualImgListOptions(n);
    }
}

function SysDualImgListMove(n, t) {
    for (
        var u = SysGetElement(n + "_selected"), i = null, r = 0, f; r < u.rows.length && i == null;

    )
        (i = u.rows[r]), i.className != "Selected" && (i = null), r++;
    i != null &&
        ((f = i.getAttribute("dummy")),
            f != "1" &&
            (t && r != 1 ?
                SysDualImgListMoveUp(i) :
                t || r == u.rows.length - 1 || SysDualImgListMoveDown(i)),
            SysDualImgListOptions(n, t));
}

function SysDualImgListMoveDown(n) {
    var t, i;
    n != null &&
        ((t = n.nextSibling),
            navigator.appName != "Microsoft Internet Explorer" &&
            t.nodeType != Node.ELEMENT_NODE &&
            (t = n.nextElementSibling),
            t != null) &&
        ((t = t.nextSibling),
            (i = n.parentNode),
            t == null ? i.insertBefore(n) : i.insertBefore(n, t));
}

function SysDualImgListMoveUp(n) {
    var t, i;
    n != null &&
        n.fieldIndex != 1 &&
        ((t = n.previousSibling),
            navigator.appName != "Microsoft Internet Explorer" &&
            t.nodeType != Node.ELEMENT_NODE &&
            (t = n.previousElementSibling),
            (i = n.parentNode),
            i.insertBefore(n, t));
}

function SysDualImgListOptions(n) {
    for (
        var u = SysGetElement(n + "_selected"),
            o = SysGetElement(n),
            s = u.rows.length,
            t = "",
            i = 0,
            r,
            f,
            e; i < s;

    )
        (r = u.rows[i]),
        (f = r.getAttribute("dummy")),
        f != "1" &&
        ((e = r.getAttribute("value")), t != "" && (t += ","), (t += e)),
        i++;
    o.value = t;
}

function SysDualImgListReset(n, t) {
    var u = SysGetElement(n + "_list"),
        f = SysGetElement(n + "_selected"),
        s,
        h,
        e;
    if (u != null && f != null) {
        for (i = f.rows.length - 1; i >= 0; i--) {
            var r = f.rows[i],
                o = u.rows[u.rows.length - 1],
                c = r.getAttribute("dummy");
            c != "1" &&
                (Sys.Browser.agent === Sys.Browser.Firefox ?
                    u.appendChild(r) :
                    o.insertAdjacentElement("beforeBegin", r));
        }
        if (t != null)
            for (s = t.split(","), i = 0; s.length > i; i++)
                for (h = s[i], e = 0; u.rows.length > e; e++) {
                    var r = u.rows[e],
                        l = r.getAttribute("value"),
                        o = f.rows[f.rows.length - 1];
                    l == h &&
                        (Sys.Browser.agent === Sys.Browser.Firefox ?
                            f.appendChild(r) :
                            o.insertAdjacentElement("beforeBegin", r));
                }
        SysDualImgListOptions(n);
    }
}

function SysFileName(n) {
    var t = n.location.pathname,
        i = t.lastIndexOf("/"),
        r = t.lastIndexOf(".");
    return i < 0 || r < 0 ? null : t.substring(i + 1, r);
}

function SysDateRangeSelect(n) {
    var i,
        r,
        t = SysGetElement(n + "_Selection"),
        l = t[t.length - 1].value,
        f,
        u,
        e,
        o,
        s,
        h,
        c;
    return (
        l.substr(0, 2) == "S_" &&
        ((t.options[t.length - 1] = null),
            (f = SysGetElement(n + "_SelectionValue")),
            f != null && (f.value = "")),
        (u = t.selectedIndex),
        u >= 0 &&
        ((i = SysDateRange[u][0]),
            (r = SysDateRange[u][1]),
            (e = SysGetElement(n + "_From")),
            e != null &&
            (e.value =
                i == null ? sysDateMask.replace(/9/g, " ") : SysDateFormat(i)),
            (o = SysGetElement(n + "_To")),
            o != null &&
            (o.value =
                r == null ? sysDateMask.replace(/9/g, " ") : SysDateFormat(r))),
        (s = t[u].value >= 1e3),
        (h = SysGetElement(n + "_More")),
        h != null && (h.disabled = s),
        (c = SysGetElement(n + "_Less")),
        c != null && (c.disabled = s),
        i != null && r != null ? [i, r] : null
    );
}

function SysDateRangeNavigate(n, t, i, r) {
    var o, s, h;
    if (n != null && i != null && r != null) {
        var f = SysGetElement(n + "_Selection"),
            u = f[f.length - 1].value,
            e = f.selectedIndex - 1;
        if (
            (u.substr(0, 2) != "S_" &&
                e >= 0 &&
                ((f.options[f.length] = new Option(
                        "-- " + SysDateRange[e + 1][2] + " --",
                        "S_" + f.options[e + 1].value
                    )),
                    (f.selectedIndex = f.length - 1),
                    (o = SysGetElement(n + "_SelectionValue")),
                    o != null && (o.value = f.options[e + 1].value)),
                (e = f.selectedIndex),
                (u = f[e].value),
                u.substr(0, 2) == "S_" && (u = u.substr(2)),
                (u = parseInt(u)),
                u > 0)
        )
            switch (u) {
                case 1:
                    i = new Date(i.getFullYear(), i.getMonth(), i.getDate() + t);
                    r = new Date(i.getFullYear(), i.getMonth(), i.getDate());
                    break;
                case 7:
                    i = new Date(i.getFullYear(), i.getMonth(), i.getDate() + 7 * t);
                    r = new Date(i.getFullYear(), i.getMonth(), i.getDate() + 6);
                    break;
                case 30:
                    i = new Date(i.getFullYear(), i.getMonth() + t, 1);
                    r = new Date(i.getFullYear(), i.getMonth() + 1, 0);
                    break;
                case 90:
                    i = new Date(i.getFullYear(), i.getMonth() + 3 * t, 1);
                    r = new Date(i.getFullYear(), i.getMonth() + 3, 0);
                    break;
                case 365:
                    i = new Date(i.getFullYear() + t, 0, 1);
                    r = new Date(i.getFullYear(), 11, 31);
            }
        else
            (u = -1 * u),
            (i = new Date(i.getFullYear(), i.getMonth(), i.getDate() + u * t)),
            (r = new Date(r.getFullYear(), r.getMonth(), r.getDate() + u * t));
        return (
            (s = SysGetElement(n + "_From")),
            s != null && (s.value = i == null ? "" : SysDateFormat(i)),
            (h = SysGetElement(n + "_To")),
            h != null && (h.value = r == null ? "" : SysDateFormat(r)),
            i != null && r != null ? [i, r] : null
        );
    }
}

function SysDateRangeClearNavigator(n) {
    try {
        SysGetElement(n + "_Selection").value = 1e3;
        SysGetElement(n + "_SelectionValue").value = "";
        SysGetElement(n + "_NLess").disabled = !0;
        SysGetElement(n + "_NMore").disabled = !0;
    } catch (t) {}
}

function SysSearchSubmit(n, t) {
    SysSet("SCAction", t);
    SysSubmit();
}

function SysCheckTemplateLength(n) {
    var r, u, i, t;
    if (n.length != 0 && ((r = SysGetElement(n)), r))
        for (u = 255, i = r.getElementsByTagName("input"), t = 0; t < i.length; t++)
            if (
                i[t].type == "text" &&
                !i[t].disabled &&
                !i[t].readOnly &&
                SysTrim(i[t].value).length > u
            )
                return i[t];
}

function SysSearchSaveTemplateHandler() {
    var n = SysDialog.returnValue,
        t = SysDialog.search;
    n != null &&
        ((SysGetElement(t + "_Template").value = n[1]),
            (SysGetElement(t + "_SaveName").value = n[2]),
            (SysGetElement(t + "_SavePrivate").value = n[0]),
            SysSearchSubmit(t, 5));
}

function SysSearchSelectAll(n) {
    for (var t = n, r, u; t != null && t.tagName != "TR";) t = t.parentNode;
    if (t != null) {
        for (t = t.nextSibling; t.nodeType != "1";) t = t.nextSibling;
        while (t != null && t.className != "SectionHeader") {
            for (r = SysGetElementsByTagName(t, "INPUT"), i = 0; i < r.length; i++)
                (u = r[i]), u.type == "checkbox" && (u.checked = n.checked);
            for (t = t.nextSibling; t != null && t.nodeType != "1";)
                t = t.nextSibling;
        }
    }
}

function SysSearchFieldSelect(n, t) {
    var f = !0,
        e = SysGetElement(t + "_CB"),
        r,
        u,
        o;
    if (n.checked) {
        for (r = e; r != null && r.tagName != "TR";) r = r.parentNode;
        if (r == null) return;
        for (r = r.nextSibling; r != null && r.className != "SectionHeader";) {
            if (((u = SysGetElementsByTagName(r, "INPUT")), u != null))
                for (i = 0; i < u.length; i++)
                    if (((o = u[i]), o.type == "checkbox" && !o.checked)) {
                        f = !1;
                        break;
                    }
            if (!f) break;
            r = r.nextSibling;
        }
        f && (e.checked = !0);
    } else e.checked = !1;
}

function SysSearchTemplateChange(n) {
    SysSet("SCAction", n);
    SysSubmit();
}

function SysSearchTempSwitch(n) {
    var t = SysGetElement(n + "_ShowTemp"),
        i = SysGetElement(n + "_HideTemp"),
        u = SysGetElement("SeaTemplateHide"),
        r;
    t != null &&
        i != null &&
        u != null &&
        ((r = t.style.display),
            (t.style.display = i.style.display),
            (i.style.display = r),
            (u.value = r == "none" ? "1" : "0"));
}

function SysSearchFldColEx(n, t, i) {
    var e = document.getElementsByTagName("TR"),
        f,
        s,
        u,
        o,
        r;
    if (e != null) {
        for (f = 0, r = 0; r < e.length; r++)
            e[r].getAttribute("id") != null &&
            e[r].getAttribute("id").substring(0, n.length) == n &&
            (f = f + 1);
        if (f > 0)
            for (u = 0, o = SysGetElement(t), r = 0; r < f; r++)
                (u = r + 1),
                u.toString().length == 1 && (u = "0" + u),
                (s = n + u),
                (el = SysGetElement(s)),
                el != null &&
                (el.style.display == "block" || el.style.display == "" ?
                    ((el.style.display = "none"),
                        convertToInlineSVG(o, "images/expand.svg"),
                        SysSet(i, "0")) :
                    ((el.style.display = ""),
                        convertToInlineSVG(o, "images/collapse.svg"),
                        SysSet(i, "1")));
    }
}

function SysSearchFldShowHide(n, t, i, r) {
    var o = document.getElementsByTagName("TR"),
        e,
        h,
        f,
        s,
        u;
    if (o != null) {
        for (e = 0, u = 0; u < o.length; u++)
            o[u].id.substring(0, n.length) == n && (e = e + 1);
        if (e > 0)
            for (f = 0, s = SysGetElement(t), u = 0; u < e; u++)
                (f = u + 1),
                f.toString().length == 1 && (f = "0" + f),
                (h = n + f),
                (el = SysGetElement(h)),
                el != null &&
                (r == 1 ?
                    ((el.style.display = "none"),
                        (s.src = "images/expand.svg"),
                        SysSet(i, "0")) :
                    ((el.style.display = ""),
                        (s.src = "images/collapse.svg"),
                        SysSet(i, "1")));
    }
}

function SysSearchColExAll(n) {
    for (
        var u = document.getElementsByTagName("TR"), i, r, t = 0; t < u.length; t++
    )
        u[t].id.substring(0, 5) == "trSH_" &&
        (u[t].style.display = n == "0" ? "none" : "");
    for (i = document.getElementsByTagName("IMG"), t = 0; t < i.length; t++)
        i[t].id.substring(0, 5) == "imgSC" &&
        (i[t].src = n == "0" ? "images/expand.svg" : "images/collapse.svg");
    for (r = document.getElementsByTagName("INPUT"), t = 0; t < r.length; t++)
        r[t].id.substring(0, 5) == "SFCE_" && (r[t].value = n == "0" ? "0" : "1");
}

function SysSearchHidePane(n) {
    $(SysGetElement(n)).hide();
}

function SysSearchShowPane(n) {
    $(SysGetElement(n)).show();
}

function SysSearchSwitchTab(n) {
    var t = SysGetElement(n);
    t != null &&
        (SysSearchHidePane(sysSearchCurrent),
            SysSearchShowPane(t.value),
            (sysSearchCurrent = t.value));
}

function LbxReset(n, t) {
    var u = SysGetElement(n),
        f,
        e,
        i,
        r;
    if (u != null) {
        for (i = 0; i < u.options.length; i++)
            (r = u.options[i]), (r.selected = !1);
        for (f = t.split(","), i = 0; f.length > i; i++)
            for (e = f[i], i = 0; i < u.options.length; i++)
                (r = u.options[i]), r.value == e && (r.selected = !0);
    }
}

function LbxMoveUp(n) {
    var t = SysGetElement(n),
        i,
        r;
    t == null ||
        t.selectedIndex <= 0 ||
        ((i = t.selectedIndex),
            (r = t.options[i]),
            t.options.remove(i),
            LbxAdd(t, r, i - 1));
}

function LbxMoveDown(n) {
    var t = SysGetElement(n),
        i,
        r;
    t == null ||
        t.selectedIndex < 0 ||
        t.selectedIndex == t.options.length - 1 ||
        ((i = t.selectedIndex),
            (r = t.options[i]),
            t.options.remove(i),
            LbxAdd(t, r, i + 1));
}

function LbxAdd(n, t, i) {
    i != null ? n.options.add(t, i) : n.options.add(t);
    LbxStore(n);
}

function LbxRemove(n) {
    var t = SysGetElement(n),
        i;
    t == null ||
        t.selectedIndex < 0 ||
        ((i = t.selectedIndex), t.options.remove(i), LbxStore(t));
}

function LbxStore(n) {
    var r = SysGetElement(n.id + "_List"),
        t;
    if (r != null) {
        for (t = "", i = 0; i < n.options.length; i++)
            t != "" && (t += ","), (t += n.options[i].value);
        r.value = t;
        n.focus();
    }
}

function SysDataList(n, t, i) {
    if (t == "666") {
        SysSet("BCAction", 10);
        SysSubmit();
        return;
    }
    SysColumnDirty(n) && (SysSet("BCUrl", i), SysSet("BCAction", 9), SysSubmit());
}

function SysDataListEdit(n, t, i, r) {
    SysColumnDirty(t) &&
        (SysSet(n, i), SysSet("BCUrl", r), SysSet("BCAction", 1), SysSubmit());
}

function PopupCoordinates(n, t, i, r, u, f) {
    var w =
        Sys.Browser.agent === Sys.Browser.InternetExplorer &&
        Sys.Browser.version < 7,
        c =
        Sys.Browser.agent === Sys.Browser.InternetExplorer &&
        Sys.Browser.version === 7,
        b;
    c = !1;
    var l = $(document.body),
        a = $(document.documentElement),
        e,
        o,
        v,
        k,
        s = new SysElement(f),
        h = l.scrollLeft() + a.scrollLeft(),
        d = l.scrollTop() + a.scrollTop(),
        y,
        p;
    return (
        w ?
        ((y = a[0].clientWidth + h), (p = a[0].clientHeight)) :
        ((y = l.innerWidth() + h), (p = l.innerHeight())),
        (c || w) &&
        ((y -= Math.abs(
                document.documentElement.clientWidth - document.body.clientWidth
            )),
            (p -= Math.abs(
                document.documentElement.clientHeight - document.body.clientHeight
            ))),
        s.empty ?
        ((e = n.clientX + t), (o = n.clientY + i), (e += h)) :
        ((e = s.Left() + t), (o = s.Top() + s.Height() + i - d)),
        (v = e + r - y),
        v > 0 && (e -= v < e ? v : e),
        c ? ((e -= h), e <= 0 && (e = 5)) : e <= h && (e = h + 5),
        (k = o + u - p),
        k > 0 &&
        ((b = o - u - i - 5), b > 0 && ((o = b), s.empty || (o -= s.Height()))),
        c || w || (o += d), { top: o, left: e }
    );
}

function SysMenuHide() {
    try {
        if (sysCxMenu !== null) {
            var n = new SysElement(sysCxMenu);
            n.DetachEvent("onkeydown", SysMenuOnKeyDown);
            n.DetachEvent("onmouseover", _DoMnuMouseOver);
            n = null;
            sysInputMenu = null;
            document.body.removeChild(sysCxMenu[0]);
            sysCxMenu = null;
            sysCxMenuFrame !== null &&
                (document.body.removeChild(sysCxMenuFrame[0]), (sysCxMenuFrame = null));
            sysInputText = "";
        }
    } catch (t) {
        alert("Unable to handle SysMenuHide properly.");
    }
}

function SysMenuShouldShow(n, t, i, r) {
    (n && n.ctrlKey) ||
    top != window.parent.parent ||
        (SysMenuShowW(t, i, r, n), SysCancelBubble(n));
}

function SysMenuShow(n, t, i, r) {
    SysMenuShowW(n, t, i, r);
}

function SysMenuShowW(n, t, i, r) {
    var s, l, y, a, h, v, p, f, e, u, o, c;
    if ((SysMenuHide(r), r == null || !r.ctrlKey)) {
        if ((_CreateMenuContainer(), t != null)) {
            if (
                ((s = null),
                    (l = !1),
                    Sys.Browser.agent !== Sys.Browser.InternetExplorer)
            )
                for (
                    y = t.substring(t.indexOf("(") + 1, t.indexOf(")")),
                    a = y.split(","),
                    patt = new RegExp(/^[\s\t\n]*event[\s\t\n]*$/),
                    h = 0; h < a.length; h++
                )
                    patt.test(a[h]) && (l = !0);
            if (l == !0) {
                if (((s = new Function("event", "return " + t)), !s(r))) {
                    SysMenuHide(r);
                    return;
                }
            } else if (((s = new Function("return " + t)), !s())) {
                SysMenuHide(r);
                return;
            }
        }
        return ((v = SysGetElement(n + "_MenuDiv")), v == null) ?
            (SysMenuHide(r), !1) :
            ((p = $(v).html()),
                sysCxMenu.html(p),
                (f = SysGetElement(n + "_Menu", sysCxMenu[0])),
                f != null &&
                ((e = f.offsetHeight),
                    (u = f.offsetWidth),
                    i == null ?
                    (o =
                        r != null && r != undefined ?
                        PopupCoordinates(r, 0, 0, u, e, SysSrcElement(r)) :
                        PopupCoordinates(r, 0, 0, u, e)) :
                    ((c = $(SysGetElement(i))),
                        u < c.width() && ((u = c.width()), $(f).css("width", u)),
                        (o = PopupCoordinates(r, 0, 0, u, e, c))),
                    sysCxMenu.css({ left: o.left, top: o.top, width: u, height: e }),
                    sysCxMenuFrame !== null &&
                    sysCxMenuFrame.css({
                        left: o.left,
                        top: o.top,
                        width: u,
                        height: e,
                    }),
                    (sysCxRowCurrent = -1),
                    sysCxMenuFrame !== null && sysCxMenuFrame.show(),
                    sysCxMenu.show(),
                    $(f).focus()),
                (sysCxMenuName = n),
                r && ((r.cancelBubble = !0), (r.returnValue = !1)), !0);
    }
}

function SysMenuOnload(n, t) {
    try {
        parent.LastSelectedRow != null &&
            SysMenuHighlight(n, parent.LastSelectedRow, t);
    } catch (i) {}
}

function SysMenuOnKeyDown(n) {
    var u = $(SysSrcElement(n)),
        t,
        o,
        r,
        f,
        e;
    if (
        (u.hasClass("ContextMenu") || (u = u.parents(".ContextMenu")), u.length > 0)
    ) {
        if (((t = u[0]), t != null)) {
            o = new SysHandleKey(n);
            r = o.GetKey();
            switch (r) {
                case SysHandleKey.Key.up:
                    if (sysCxRowCurrent >= 0)
                        for (i = sysCxRowCurrent - 1; i >= 0; i--)
                            if (t.rows[i].className == "ContextMenuItems") {
                                SysMenuHighlight(n, i, t);
                                break;
                            }
                    break;
                case SysHandleKey.Key.down:
                    if (sysCxRowCurrent < t.rows.length - 1)
                        for (i = sysCxRowCurrent + 1; i < t.rows.length; i++)
                            if (t.rows[i].className == "ContextMenuItems") {
                                SysMenuHighlight(n, i, t);
                                break;
                            }
                    break;
                case SysHandleKey.Key.tab:
                case SysHandleKey.Key.enter:
                    $(t.rows[sysCxRowCurrent]).click();
                    break;
                case SysHandleKey.Key.end:
                    for (i = t.rows.length - 1; i > 0; i--)
                        if (t.rows[i].className == "ContextMenuItems") {
                            SysMenuHighlight(n, i, t);
                            break;
                        }
                    break;
                case SysHandleKey.Key.home:
                    for (i = 0; i < t.rows.length; i++)
                        if (t.rows[i].className == "ContextMenuItems") {
                            SysMenuHighlight(n, i, t);
                            break;
                        }
                    break;
                default:
                    for (
                        e = 0,
                        f =
                        r >= 96 && r <= 105 ?
                        r - 48 :
                        r >= 106 && r <= 111 ?
                        r - 64 :
                        r,
                        i = sysCxRowCurrent + 1; i < t.rows.length; i++
                    )
                        if (
                            t.rows[i].className == "ContextMenuItems" &&
                            SysGetInnerText(t.rows[i].children[1])
                            .toUpperCase()
                            .substring(0, 1)
                            .charCodeAt(0) == f
                        ) {
                            SysMenuHighlight(n, i, t);
                            e = 1;
                            break;
                        }
                    if (!e)
                        for (i = 0; i < sysCxRowCurrent && i < t.rows.length; i++)
                            if (
                                t.rows[i].className == "ContextMenuItems" &&
                                SysGetInnerText(t.rows[i].children[1])
                                .toUpperCase()
                                .substring(0, 1)
                                .charCodeAt(0) == f
                            ) {
                                SysMenuHighlight(n, i, t);
                                break;
                            }
            }
        }
        SysCancelBubble(n);
    }
}

function SysMenuFindElement(n) {
    while (n != null && n.className != "ContextMenuItems") n = n.parentNode;
    return n;
}

function SysMenuSwitchColor(n) {
    if (n != null) {
        var t = $(n),
            i = t.css("backgroundColor");
        t.css("backgroundColor", t.css("color"));
        t.css("color", i);
    }
}

function SysMenuHighlight(n, t, i) {
    if (t == null || i == null) {
        var r = SysMenuFindElement(SysSrcElement(n));
        r != null &&
            r.className == "ContextMenuItems" &&
            (sysCxRowCurrent >= 0 &&
                sysCxRowCurrent < r.parentNode.rows.length &&
                ((r.parentNode.rows[sysCxRowCurrent].style.backgroundColor = ""),
                    (r.parentNode.rows[sysCxRowCurrent].style.color = "")),
                (r.style.backgroundColor = SysColors.ActiveCaption),
                (r.style.color = SysColors.CaptionText),
                (sysCxRowCurrent = r.rowIndex));
    } else
        i.rows[t].className == "ContextMenuItems" &&
        (sysCxRowCurrent >= 0 &&
            ((i.rows[sysCxRowCurrent].style.backgroundColor = ""),
                (i.rows[sysCxRowCurrent].style.color = "")),
            (i.rows[t].style.backgroundColor = SysColors.ActiveCaption),
            (i.rows[t].style.color = SysColors.CaptionText),
            (sysCxRowCurrent = t));
}

function SysMenuLowlight(n) {
    var t = SysMenuFindElement(SysSrcElement(n));
    t != null &&
        t.className == "ContextMenuItems" &&
        ((t.style.backgroundColor = ""), (t.style.color = ""));
}

function SysMenuCmxClick(n, t, i) {
    i != null && i != "" && SysLocation(i);
}

function SysMenuClick(n, t, i) {
    var u, r;
    if (
        (SysMenuHide(n),
            t != "" && SysSetValue(sysCxMenuName, t),
            i != null && i != "")
    ) {
        if (((u = SysRowGetCellKey(n, sysRowCurrent)), u == null))
            for (
                r = sysRowCurrent.previousSibling; r != null && sysRowCurrent.className == r.className;

            )
                (u = SysRowGetCellKey(n, r)), (r = r.previousSibling);
        u != null && SysLocation(i + u);
    }
}

function SysHideSelect() {
    $("SELECT").css({ visibility: "hidden" });
}

function SysShowSelect() {
    $("SELECT").css({ visibility: "visible" });
}

function SysMenuStd(n) {
    var i, t;
    if (
        ((sysCmxMenu = new SysEvent(n).target),
            sysCmxMenu.tagName == "A" &&
            ((i = sysCmxMenu.getAttribute("cmx")), i != null))
    )
        return SysMenuShow("stdCmx" + i), !0;
    for (t = sysCmxMenu; t != null && t.oncontextmenu == null;) t = t.parentNode;
    return SysMenuShow("pgCmx"), !0;
}

function SysMenuStdCall(n, t) {
    var i, r, u;
    SysMenuHide();
    sysCmxMenu.tagName == "A" &&
        ((i = sysCmxMenu.href),
            (r = i.lastIndexOf("=")),
            r > 0 && ((u = i.substr(r + 1)), (window.location = t + u)));
}

function SysSearch(n) {
    window.location = "SysSearch.aspx?txt=" + n;
}

function SysRowGetCellKey(n) {
    n == null && event != null && (n = event.srcElement);
    for (var t = null; n != null && t == null;)
        (t = n.getAttribute("CmxKey")), (n = n.parentNode);
    return t;
}

function SysRowGetCellDescription(n) {
    n == null && event != null && (n = event.srcElement);
    for (var t = null; n != null && t == null;)
        (t = SysGetInnerText(n)), (n = n.parentNode);
    return t;
}

function SysRowSelect() {
    return (sysRowCurrent = sysListPrevRow), sysRowCurrent != null;
}

function SysSetTab(n, t, r) {
    var u = n,
        e,
        f;
    if (
        u.parentNode.className == "tabClear" ||
        u.parentNode.className == "extendedTabClear"
    ) {
        for (
            e = SysGetElement(t), e.value = r, i = 0; i < u.parentNode.parentNode.childNodes.length; i++
        )
            (f = u.parentNode.parentNode.childNodes[i]),
            f.className == "tabSelected" && (f.className = "tabClear"),
            f.className == "extendedTabSelected" &&
            (f.className = "extendedTabClear");
        u.parentNode.className = "tabSelected";
        u.parentNode.className == "extendedTabClear" &&
            (u.parentNode.className = "extendedTabSelected");
    }
}

function StoreTabCheckValue(n) {
    var i = $("#" + n + "_table input:checkbox").serializeArray(),
        t;
    $.each(i, function(n, i) {
        i.value != null &&
            i.value != undefined &&
            (t != null && t != undefined ?
                ((t += ","), (t += i.value)) :
                (t = i.value));
    });
    $("#" + n + "_chk").val(t);
}

function SysTabHide(n) {
    $(SysGetElement(n)).hide();
}

function SysTabShow(n) {
    $(SysGetElement(n)).show();
}

function SysTabSwitch(n) {
    var t = SysGetElement(n);
    t != null && SysTabShow(t.value);
}

function SysWizNext(n) {
    var i = SysGetElement(n),
        t;
    i != null &&
        ((t = SysWizGetNext(n, i.value)),
            t != null && ((i.value = t), SysTabShow(t)));
}

function SysWizGetNext() {
    switch (t.value) {
        case "pane0":
            return "pane1";
    }
}

function SysWizCheckFirst(n, t, i) {
    var r = SysGetElement(n + "_Prev");
    r != null && (r.disabled = t == i);
}

function SysWizCheckLast(n, t, i) {
    var r = SysGetElement(n + "_Next");
    r != null && (r.disabled = t == i);
}

function SysWizChkButton(n, t, i) {
    var r = SysGetElement(n);
    r != null &&
        (SysWizCheckFirst(n, r.value, t), SysWizCheckLast(n, r.value, i));
}

function alertSize() {
    var n = 0;
    return (
        typeof parent.window.innerWidth == "number" ?
        (n = parent.window.innerHeight) :
        parent.document.documentElement &&
        (parent.document.documentElement.clientWidth ||
            parent.document.documentElement.clientHeight) ?
        (n = parent.document.documentElement.clientHeight) :
        parent.document.body &&
        (parent.document.body.clientWidth ||
            parent.document.body.clientHeight) &&
        (n = parent.document.body.clientHeight),
        n
    );
}

function AssignFrameHeight(n) {
    var i = $("#" + n, parent.document.body),
        r = getIframeHeight(n),
        t = $(document.body).height();
    $(document.body)[0] &&
        ($(document.body)[0].bottomMargin &&
            (t += Number($(document.body)[0].bottomMargin)),
            $(document.body)[0].topMargin &&
            (t += Number($(document.body)[0].topMargin)));
    r > t ?
        i.height(r - 160) :
        $.browser != undefined && $.browser.msie ?
        i.height(t) :
        i.height(t + 50);
}

function getIframeHeight(n) {
    var t = parent.document.getElementById ?
        parent.document.getElementById(n) :
        parent.document.all ?
        parent.document.all[n] :
        null;
    if (t) return (t.style.height = "auto"), alertSize();
}

function SysTreeFindElement(n, t) {
    while (n != null && n.tagName != t) n = n.parentNode;
    return n;
}

function SysTreeCollapseOrExpand(n, t) {
    var e = n || window.event,
        u = SysSrcElement(e),
        i = u.getAttribute("treeid"),
        f = SysGetElement(i),
        o = f.style.display == "",
        r = SysGetElement("i" + i);
    o
        ?
        ((f.style.display = "none"),
            (u.style.backgroundImage = "url('Images/treeexpand.svg')"),
            r != null && convertToInlineSVG(r, "Images/Folder.svg"),
            SysTreeRemoveExpandState(t, i.substring(1))) :
        ((f.style.display = ""),
            (u.style.backgroundImage = "url('Images/treecollapse.svg')"),
            r != null && convertToInlineSVG(r, "Images/FolderExpanded.svg"),
            SysTreeAddExpandState(t, i.substring(1)));
}

function SysTreeAddExpandState(n, t) {
    var i = SysGet(n + "_Expanded");
    i.length > 0 && (i += ":");
    i += t;
    SysSet(n + "_Expanded", i);
}

function SysTreeRemoveExpandState(n, t) {
    var r = SysGet(n + "_Expanded"),
        u = r.split(":");
    for (r = "", i = 0; i < u.length; i++)
        u[i] != t && ((r += ":" + u[i]), i == 0 && (r = u[i]));
    SysSet(n + "_Expanded", r);
}

function SysTreeMouseOver(n) {
    var i = SysSrcElement(n),
        t = SysTreeFindElement(i, "A");
    t != null &&
        t.className != "NoEvents" &&
        (t.className =
            t.className == "Selected" ? "SelectedMouseOver" : "MouseOver");
}

function SysTreeMouseOut(n) {
    var i = SysSrcElement(n),
        t = SysTreeFindElement(i, "A");
    t != null &&
        t.className != "NoEvents" &&
        (t.className =
            t.className == "SelectedMouseOver" || t.className == "Selected" ?
            "Selected" :
            "");
}

function SysTreeRuleOver(n) {
    var i = SysSrcElement(n),
        t = SysTreeFindElement(i, "TD");
    t != null &&
        t.className != "NoEvents" &&
        (t.className == "MouseOver" || t.className == "Text") &&
        ((t.className = "MouseOver"),
            sysTreeLastSelected != null &&
            ((sysTreeLastSelected.className = "Text"), (sysTreeLastSelected = null)));
}

function SysTreeRuleOut(n) {
    var i = SysSrcElement(n),
        t = SysTreeFindElement(i, "TD");
    t != null &&
        t.className != "NoEvents" &&
        t.className == "MouseOver" &&
        (t.className = "Text");
}

function SysTreeSelect(n, t) {
    var i = SysSrcElement(n),
        r,
        u,
        f;
    if (i != null && ((i = SysTreeFindElement(i, "A")), i != null))
        while (i.tagName != "A" || (i.tagName == "A" && i.name != "Selected"))
            if (((i = i.parentNode), i == null)) break;
    if (i != null) {
        if (i.tagName == "A")
            return i.className == "NoEvents" ?
                void 0 :
                (sysTreeLastSelected != null ?
                    (sysTreeLastSelected.className = "") :
                    ((r = SysGetElement(t + "_Tree")),
                        r != null && SysTree_Clear(r.childNodes)),
                    (i.className = "SelectedMouseOver"),
                    (sysTreeLastSelected = i),
                    (u = SysTreeFindElement(i, "TR")),
                    SysSet(t, u.getAttribute("value")),
                    (f = $("td:eq(1)", u)),
                    f != null && SysSet(t + "_Text", SysGetInnerText(f)), !0);
        i.tagName == "BUTTON" && SysTree_SaveNodes(t);
    }
    return !1;
}

function SysTree_Clear(n) {
    for (var t, i = 0; i < n.length; i++)
        (t = n[i]),
        t != null &&
        (t.tagName == "A" &&
            t.getAttribute("name") == "SelCat" &&
            t.className != "NoEvents" &&
            (t.className = ""),
            SysTree_Clear(t.childNodes));
}

function SysTree_InitSelected(n, t) {
    var u, r, i;
    if (
        (n == null &&
            ((u = SysGetElement(t + "_Tree")), u != null && (n = u.childNodes)),
            n != null)
    )
        for (r = 0; r < n.length; r++)
            (i = n[r]),
            i != null &&
            ((i.tagName == "A" || i.tagName == "TD") &&
                i.className == "Selected" &&
                (sysTreeLastSelected = i),
                SysTree_InitSelected(i.childNodes, t));
}

function SysTree_SaveNodes(n) {
    var i = SysGetElement(n),
        t = "";
    t = SysTree_SaveNodes(i.childNodes, t);
    SysSet(n + "_Expanded", t.substr(0, t.length - 1));
}

function SysTree_SaveNodes(n, t) {
    var r, i;
    if (n == null) return t;
    for (r = 0; r < n.length; r++)
        (i = n[r]),
        i != null &&
        (i.tagName == "TR" &&
            i.name == "TableRow" &&
            i.style.display == "block" &&
            (t += i.getAttribute("ID") + ":"),
            (t = SysTree_SaveNodes(i.childNodes, t)));
    return t;
}

function SysTreeStartDrag() {
    var t = window.event.srcElement.getAttribute("id"),
        n = window.event.dataTransfer;
    n.setData("Text", "@tree@-" + t);
    n.effectAllowed = "linkMove";
    n.dropEffect = "move";
}

function SysTreeStopDrag() {
    window.event.dataTransfer.clearData();
}

function SysTreeOverDrag() {
    window.event.returnValue = !1;
}

function SysTreeEnterDrag() {
    window.event.dataTransfer.getData("Text");
}

function SysTreeDrop(n) {
    var r = window.event.dataTransfer.getData("Text"),
        u,
        t,
        f;
    if (((window.event.returnValue = !1), r && r.substr(0, 7) == "@tree@-")) {
        for (
            r = r.substr(7), t = window.event.srcElement; t.getAttribute("name") != n + "_Tree";

        )
            t = t.parentNode;
        if (t != null)
            for (i = 0; i < t.all.length; i++)
                t.all(i).tagName == "TR" &&
                t.all(i).getAttribute("id") == r &&
                (u = t.all(i).getAttribute("value"));
        return (
            (f = SysTreeFindElement(window.event.srcElement, "TR")),
            SysSet(n + "_DropTarget", f.getAttribute("value")),
            SysSet(n + "_DropSource", u),
            SysSet("BCAction", 4),
            SysSubmit(), !0
        );
    }
}

function MnuActivate(n) {
    var t = SysSrcElement(n);
    t.tagName == "A" && t.focus();
}

function MnuOnKeyDown(n) {
    var c = SysSrcElement(n),
        l = c.parentNode,
        s = l.parentNode,
        a = s.parentNode,
        v = a.parentNode,
        t = s.rowIndex,
        h = v.parentNode,
        e = h.parentNode,
        u = e.parentNode,
        i = h.cellIndex,
        r = e.rowIndex,
        o = new SysHandleKey(n),
        f;
    switch (!0) {
        case o.IsLeftKey():
            if (
                (i == 0 ?
                    ((i = e.cells.length - 1), (f = MnuActiveCell(u, r, i, t))) :
                    (i--, (f = MnuActiveCell(u, r, i, t))), !f)
            ) {
                while (!MnuActiveCell(u, r, i, t) && t > 0) t--;
                if (t == 0)
                    for (t = 1; MnuActiveCell(u, r - 1, i, t) && t > 0;) t++;
            }
            break;
        case o.IsUpKey():
            if (t == 1)
                for (
                    r--,
                    MnuActiveCell(u, r, i, 1) ||
                    ((r = u.rows.length - 1),
                        MnuActiveCell(u, r, i, 1) || (r--, MnuActiveCell(u, r, i, 1))); MnuActiveCell(u, r, i, t);

                )
                    t++;
            else MnuActiveCell(u, r, i, t - 1);
            break;
        case o.IsRightKey():
            if (
                (i == e.cells.length - 1 ?
                    ((i = 0), (f = MnuActiveCell(u, r, i, t))) :
                    (i++, (f = MnuActiveCell(u, r, i, t))), !f)
            ) {
                while (!MnuActiveCell(u, r, i, t) && t > 0) t--;
                if (t == 0)
                    for (t = 1; MnuActiveCell(u, r - 1, i, t) && t > 0;) t++;
            }
            break;
        case o.IsDownKey():
            MnuActiveCell(u, r, i, t + 1) ||
                MnuActiveCell(u, r + 1, i, 1) ||
                MnuActiveCell(u, 0, i, 1);
    }
}

function MnuActiveCell(n, t, i, r) {
    try {
        var u = $(
            n.rows[t].childNodes[i].childNodes[1].rows[r].childNodes[0].childNodes[0]
        );
        if (u.is("a")) return u.focus(), !0;
    } catch (f) {}
    return !1;
}

function SysKeyMenuLeft08(n) {
    var t = window.top.MenuLeft;
    t != null && t.MenuKey != null && t.MenuKey(n);
}

function SysSendPage(n, t, i) {
    var a, l, f, h, e, s, o, v, y, r, c, u, p;
    if (
        (Sys.Browser.agent == null &&
            ((a = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./)),
                (navigator.userAgent.indexOf(" MSIE ") > -1 || a == !0) &&
                (Sys.Browser.agent = Sys.Browser.InternetExplorer)),
            Sys.Browser.agent === Sys.Browser.InternetExplorer)
    ) {
        l = !1;
        try {
            if (((h = new ActiveXObject("Outlook.Application")), h != null)) {
                for (
                    l = !0,
                    e = h.CreateItem(0),
                    r = SysCallback(n),
                    t != null &&
                    ((c = SysCallback(t)),
                        (u = r.indexOf("<head>")),
                        u > 0 &&
                        ((r =
                                r.substr(0, u + 6) +
                                "<STYLE>" +
                                c +
                                "</STYLE>" +
                                r.substr(u + 6)),
                            (r =
                                r.substr(0, u + 6) +
                                "<base href='" +
                                i +
                                "' />" +
                                r.substr(u + 6)))),
                    u = r.indexOf("<script"),
                    s = r.indexOf("</script>"); u > 0 && s > u;

                )
                    u > 0 &&
                    s > u &&
                    s + 9 <= r.length &&
                    (r = r.substr(0, u - 1) + r.substr(s + 9)),
                    (u = r.indexOf("<script")),
                    (s = r.indexOf("</script>"));
                if (
                    ((r = SysParsePictures(r, e)),
                        h.Version.substring(0, 2) != "12" ?
                        (e.Display(), (f = e.HtmlBody)) :
                        (e.Display(), (f = e.HtmlBody)),
                        h.Version.substring(0, 1) == "9" ?
                        f.length > 0 ?
                        ((u = f.toLowerCase().indexOf("<body")),
                            u > -1 && (u = f.indexOf(">", u)),
                            u > -1 && (o = f.substring(u, f.length))) :
                        ((o = e.Body), o.length > 0 && o.replace(/\r\n/g, "<BR>")) :
                        ((u = f.toLowerCase().indexOf("<body")),
                            u > -1 && (u = f.indexOf(">", u)),
                            u > -1 && (o = f.substring(u + 1, f.length))),
                        o.length > 0)
                ) {
                    u = -1;
                    do u = r.indexOf("</body>", u + 1);
                    while (r.indexOf("</body>", u + 1) > -1);
                    r = r.substring(0, u - 1) + o;
                }
                v = r.indexOf("ErrEditor") - 9;
                y = r.indexOf("ErrEditor") + 233;
                r = r.replace(r.slice(v, y), "");
                e.HTMLBody = r;
            }
        } catch (w) {
            l = !1;
        }
        l ||
            window.alert(
                "Unable to e-mail. \rPlease ensure that the Microsoft Outlook is installed and the option 'Initialize and script ActiveX controls not marked as safe' is enabled in Internet Explorer Security options."
            );
    } else
        (r = SysCallback(n)),
        t != null &&
        ((c = SysCallback(t)),
            (u = r.indexOf("<head>")),
            u > 0 &&
            ((r =
                    r.substr(0, u + 6) + "<STYLE>" + c + "</STYLE>" + r.substr(u + 6)),
                (r =
                    r.substr(0, u + 6) +
                    "<base href='" +
                    i +
                    "' />" +
                    r.substr(u + 6)))),
        (p = window.open()),
        $(p.document.body).html(r);
}

function SysParsePictures(n, t) {
    var e, r;
    try {
        var c = new ActiveXObject("Scripting.FileSystemObject"),
            f = [],
            o = document.createElement("div");
        for (
            o.innerHTML = n, e = o.getElementsByTagName("img"), r = 0; r < e.length; r++
        ) {
            var s = e[r],
                u = s.src,
                h = s.nameProp;
            if (!SysFindPicture(f, u)) {
                f[f.length] = u;
                var i = SysAddPicture(c, u, t, r),
                    l = new RegExp(SysReplaceRegEx(u), "gim"),
                    a = new RegExp(SysReplaceRegEx("images/" + i), "gim"),
                    v = h.replace(/&/g, "&amp;");
                n = n.replace(h, i);
                n = n.replace(l, i);
                n = n.replace(a, i);
                n = n.replace(v, i);
                n = n.replace(new RegExp(i, "g"), "cid:" + i);
            }
        }
    } catch (y) {
        window.alert(
            "Unable to add pictures. \rPlease ensure that the Microsoft Outlook is installed and the option 'Initialize and script ActiveX controls not marked as safe' is enabled in Internet Explorer Security options."
        );
    }
    return n;
}

function SysReplaceRegEx(n) {
    for (var t = "", r, i = 0; i < n.length; i++) {
        r = n.charAt(i);
        switch (r) {
            case "\\":
                t += "\\\\";
                break;
            case ".":
                t += "\\.";
                break;
            case "$":
                t += "\\$";
                break;
            default:
                t += r;
        }
    }
    return t;
}

function SysFindPicture(n, t) {
    for (var i = 0; i < n.length; i++)
        if (t == n[i]) return !0;
    return !1;
}

function SysAddPicture(n, t, i, r) {
    var f, c, l;
    if (t.indexOf("?") >= 0) f = "picture" + r.toString();
    else {
        var u = 0,
            o = t.lastIndexOf("\\"),
            s = t.lastIndexOf("/");
        o > u && (u = o + 1);
        s > u && (u = s + 1);
        f = t.substr(u);
    }
    var e = n.GetSpecialFolder(2) + "\\" + f,
        a = SysCallback(t, null, null, !0, !0),
        h = n.CreateTextFile(e, !0);
    return (
        h.Write(BinaryToString(a)),
        h.Close(),
        (c = i.Attachments),
        c.Add(e),
        (l = n.GetFile(e)),
        l.Delete(),
        f
    );
}

function BinaryToString(n) {
    var t = new ActiveXObject("ADODB.Stream"),
        i;
    return (
        (t.type = 1),
        t.open(),
        t.write(n),
        (t.position = 0),
        (t.type = 2),
        (t.CharSet = "windows-1252"),
        (i = t.ReadText),
        t.close(),
        i
    );
}

function SysSetCookie(n, t, i, r, u, f) {
    var e =
        n +
        "=" +
        escape(t) +
        (i ? "; expires=" + i.toGMTString() : "") +
        (r ? "; path=" + r : "") +
        (u ? "; domain=" + u : "") +
        (f ? "; secure" : "");
    document.cookie = e;
}

function SysGetCookie(n) {
    var i = document.cookie,
        u = n + "=",
        t = i.indexOf("; " + u),
        r;
    if (t == -1) {
        if (((t = i.indexOf(u)), t != 0)) return null;
    } else t += 2;
    return (
        (r = document.cookie.indexOf(";", t)),
        r == -1 && (r = i.length),
        unescape(i.substring(t + u.length, r))
    );
}

function SysDeleteCookie(n, t, i) {
    SysGetCookie(n) &&
        (document.cookie =
            n +
            "=" +
            (t ? "; path=" + t : "") +
            (i ? "; domain=" + i : "") +
            "; expires=Thu, 01-Jan-1970 00:00:01 GMT");
}

function SysDiv(n) {
    var i = SysGetElement("Products", parent),
        r,
        t;
    i != null &&
        ((r = i.contentWindow),
            (t = SysGetElement("Division", r)),
            t != null && n != t.value && SysSwitchDivision(t.value, "Portal.aspx", !0));
}

function SysToolBoxClick(n, t, r) {
    var u, f, e;
    for (SysSet(t, r), u = n.parentNode.parentNode, i = 0; i < u.rows.length; i++)
        (f = u.rows[i]),
        f.height == "100%" && $("#" + f.id).css({ display: "none", height: "1" });
    e = n.nextSibling;
    $("#" + e.id).css({ display: "block", height: "100%" });
}

function SysToolBoxHide(n) {
    $("#" + n).hide();
}

function SysAnimate(n, t, i, r, u) {
    var e = Math.abs(t - i),
        s = r / e,
        f = r,
        o = t > i;
    SysAnimationKey == null && (SysAnimationKey = t);
    SysAnimationTimer = o ?
        setInterval(function() {
            SysAnimationKey > i ?
                ((SysAnimationKey -= f),
                    SysAnimationKey < i && (SysAnimationKey = i),
                    n()) :
                (clearInterval(SysAnimationTimer),
                    (SysAnimationKey = null),
                    u != null && u());
        }, 5) :
        setInterval(function() {
            SysAnimationKey < i ?
                ((SysAnimationKey += f),
                    SysAnimationKey > i && (SysAnimationKey = i),
                    n()) :
                (clearInterval(SysAnimationTimer),
                    (SysAnimationKey = null),
                    u != null && u());
        }, 5);
}

function SysNumStrPaste(n) {
    var t, r, u, i;
    for (
        event.cancelBubble = !0,
        event.returnValue = !1,
        window.clipboardData && window.clipboardData.getData ?
        (t = window.clipboardData.getData("Text")) :
        event.clipboardData &&
        event.clipboardData.getData &&
        (t = event.clipboardData.getData("text/plain")),
        event.preventDefault(),
        r = "",
        u = "1234567890",
        i = 0; i < t.length; i++
    )
        u.indexOf(t.charAt(i)) >= 0 && (r += t.charAt(i));
    n.value = r;
}

function GetActiveXCode(n, t, i, r, u, f) {
    var s, h, c, e, o;
    switch (r) {
        case 0:
            c = "movie";
            s = "D27CDB6E-AE6D-11cf-96B8-444553540000";
            h =
                "https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
            break;
        case 1:
            c = "url";
            s = "6BF52A52-394A-11d3-B153-00C04F79FAA6";
            h =
                "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715";
    }
    if (
        ((e = ""),
            (e =
                '<object classid="clsid:' +
                s +
                '" codebase="' +
                h +
                '" width="' +
                t +
                '" height="' +
                i +
                '">'),
            (e += '<param name="' + c + '" value="' + n + '" />'),
            u != null)
    )
        for (o in u) e += '<param name="' + o + '" value="' + params[o] + '" />';
    if (
        ((e += '<embed src="' + n + '" width="' + t + '" height="' + i + '"'),
            u != null)
    )
        for (o in u) e += " " + o + '="' + params[o] + '"';
    e += ">";
    e += "</object>";
    f !== undefined && f != null && f.length > 0 ?
        $("#" + f + ':not(:has("object"))').append(e) :
        document.write(e);
}

function SysAddEvent(n, t, i) {
    return n.attachEvent ?
        n.attachEvent("on" + t, i) :
        n.addEventListener ?
        (n.addEventListener(t, i, !0), !0) :
        !1;
}

function SysGetElementsByTagName(n, t) {
    if (n.nodeName != "#text") return n.getElementsByTagName(t);
}

function SysGetInnerText(n) {
    return $(n).text().replace(/\xa0/gi, " ");
}

function SysGetInnerTextID(n) {
    return SysGetInnerText(SysGetElement(n));
}

function SysSetInnerText(n, t) {
    n != null &&
        (t == null && (t = ""),
            Sys.Browser.agent == Sys.Browser.InternetExplorer ?
            (n.innerText = t) :
            $(n).text(t));
}

function SysSetInnerTextID(n, t) {
    if (n != null) return SysSetInnerText(SysGetElement(n), t);
}

function SysSetInnerHtmlID(n, t) {
    t == null && (t = "");
    $(SysGetElement(n)).html(t);
}

function SysGetOuterHtmlID(n) {
    return $("<div>")
        .append($(SysGetElement(n)).clone())
        .html();
}

function SysFrame(n) {
    return document.getElementsByName(n);
}

function SysFrameDocument(n) {
    return n[0].contentWindow.document;
}

function SysLeft(n) {
    for (x = window.screenLeft; n != null;)
        (x += n.offsetLeft), (x -= n.scrollLeft), (n = n.offsetParent);
    return x;
}

function SysTop(n) {
    for (y = window.screenTop; n != null;)
        (y += n.offsetTop), (y -= n.scrollTop), (n = n.offsetParent);
    return y;
}

function SysBottom(n) {
    return n.offsetHeight + SysTop(n);
}

function SysRight(n) {
    return n.offsetWidth + SysLeft(n);
}

function SysButton(n, t) {
    if (new SysHandleKey(n).IsShiftKey()) window.open(t);
    else
        try {
            window.location = t;
        } catch (i) {}
}

function SysTerm(n, t, i, r) {
    var u = "SysCallBack.aspx?Action=3";
    return (
        n != null && (u += "&CaptionID=" + n),
        t != null && (u += "&Caption=" + t),
        i != null && (u += "&SuffixID=" + i),
        r != null && (u += "&Suffix=" + r),
        SysCallback(u)
    );
}

function SysSetModalDialog() {
    if (window.opener != null) {
        window.opener.parent.SysModalDialog = window;
        for (var n = 0; n < window.opener.parent.frames.length; n++)
            (frame = window.opener.parent.frames[n]), (frame.SysModalDialog = window);
    }
}

function SysShowFrameOverlay() {
    var i = this,
        t = document.getElementById(this.name + "_overlay"),
        n;
    t == null ?
        ((n = document.createElement("div")),
            (n.id = this.name + "_overlay"),
            $(n).css({
                "z-index": "999",
                opacity: "0",
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
            }),
            $(n).click(function() {
                window.parent.triggerWindow.SysFocusChildDialogs();
            }),
            document.body.appendChild(n)) :
        (t.style.display = "block");
}

function SysShowOverlay() {
    for (var n = 0; n < window.parent.frames.length; n++) {
        frame = window.parent.frames[n];
        try {
            frame.SysShowFrameOverlay();
        } catch (t) {
            SysShowFrameOverlay();
        }
    }
}

function SysHideFrameOverlay() {
    var n = document.getElementById(this.name + "_overlay");
    n && (n.style.display = "none");
}

function SysHideParentOverlay() {
    for (var n = 0; n < window.opener.parent.frames.length; n++)
        (frame = window.opener.parent.frames[n]), frame.SysHideFrameOverlay();
    window.parent.focus();
}

function SysFocusChildDialogs() {
    for (var n = window; n.SysModalDialog != null && !n.SysModalDialog.closed;)
        (n = n.SysModalDialog), n.focus();
}

function SysCloseChildWindows() {
    for (var n = this; n.SysModalDialog;)
        (n = n.SysModalDialog),
        setTimeout(function() {
            window.close();
        }, 1e3);
}

function SysShowModal(n, t, i, r, u, f, e) {
    var c, l, o, s, a, h;
    this.parent.triggerWindow = this;
    n += n.indexOf("?") > 0 ? "&IsModal=1" : "?IsModal=1";
    f != null && (n = "SysPopupFrame.aspx?Page=" + encodeURIComponent(n));
    l = /px/g;
    o = "";
    i &&
        ((o =
                (window.top.screenLeft ? window.top.screenLeft : window.top.screenX) +
                (window.top.document.body.clientWidth - new Number(i.replace(l, ""))) /
                2),
            (o = "dialogLeft:" + o + ";"));
    s = "";
    r &&
        ((a = new Number(r.replace(l, ""))),
            (s =
                (window.top.screenTop ? window.top.screenTop : window.top.screenY) +
                (window.top.document.body.clientHeight - a) / 2),
            (s = "dialogTop:" + s + ";"));
    u != null && (c = new Function(u));
    h =
        o +
        s +
        "dialogHeight:" +
        r +
        ";dialogWidth:" +
        i +
        ";status:no;unadorned:yes;help:no;resizable:yes;";
    e != null && (h = h + e);
    try {
        navigator.userAgent.indexOf("Chrome/") > -1 && window.SysShowOverlay();
        SysDialog.returnValue = window.showModalDialog(n, t, h);
    } catch (v) {
        window.alert(
            SysTerm(15693, "Pop-up blocked. Please enable pop-ups for this site.")
        );
    }
    return c != null && c(), SysDialog.returnValue;
}

function SysShowRadWindow(n, t, i, r, u, f, e, o) {
    var l = /px/g,
        r,
        u,
        h,
        c,
        a,
        s;
    this.parent.triggerWindow = this;
    t += t.indexOf("?") > 0 ? "&BRS_RadWindow=1" : "?BRS_RadWindow=1";
    o != null && o == !0 && (t += "&IsModal=1");
    e != null && (t = "SysPopupFrame.aspx?Page=" + encodeURIComponent(t));
    h = "";
    r == null &&
        ((r = $(window).width() - 50), r < 400 && (r = 400), (r = r + "px"));
    r &&
        (h =
            (window.top.screenLeft ? window.top.screenLeft : window.top.screenX) +
            (window.top.document.body.clientWidth - new Number(r.replace(l, ""))) /
            2);
    c = "";
    u == null &&
        ((u = $(window).height() - 50), u < 400 && (u = 400), (u = u + "px"));
    u &&
        ((a = new Number(u.replace(l, ""))),
            (c =
                (window.top.screenTop ? window.top.screenTop : window.top.screenY) +
                (window.top.document.body.clientHeight - a) / 2));
    radReturnFunc = f;
    s = $find(n + "_RadWindow");
    try {
        s != null &&
            s != undefined &&
            (s.setUrl(t),
                (s.argument = i),
                s.setSize(r, u),
                s.set_left(h),
                s.set_top(c),
                s.set_behaviors(
                    Telerik.Web.UI.WindowBehaviors.Resize +
                    Telerik.Web.UI.WindowBehaviors.Close +
                    Telerik.Web.UI.WindowBehaviors.Move
                ),
                (s.set_centerIfModal = !0),
                s.add_close(SysRadWindowOnClientClose),
                s.show());
    } catch (v) {
        window.alert(
            SysTerm(15693, "Pop-up blocked. Please enable pop-ups for this site.")
        );
    }
}

function SysRadWindowOnClientClose(n, t) {
    var i, r;
    t.get_argument() != null && (r = t.get_argument());
    SysDialog.returnValue = r;
    radReturnFunc != null && (i = new Function(radReturnFunc));
    i != null && i();
    n.remove_close(SysRadWindowOnClientClose);
}

function SysGetRadWindow() {
    var n = null;
    return (
        window.radWindow ?
        (n = window.radWindow) :
        window.frameElement.radWindow ?
        (n = window.frameElement.radWindow) :
        window.parent.frameElement.radWindow &&
        (n = window.parent.frameElement.radWindow),
        n
    );
}

function SysElement(n, t) {
    SysElement._initialized === undefined &&
        ((SysElement.prototype.Top = function(n) {
                if (SysElement.IsNothing(n)) return this.element.offset().top;
                this.element.css("top", n);
            }),
            (SysElement.prototype.Left = function(n) {
                if (SysElement.IsNothing(n)) return this.element.offset().left;
                this.element.css("left", n);
            }),
            (SysElement.prototype.Width = function(n) {
                if (SysElement.IsNothing(n)) return this.element.width();
                this.element.width(n);
            }),
            (SysElement.prototype.Height = function(n) {
                if (SysElement.IsNothing(n)) return this.element.height();
                this.element.height(n);
            }),
            (SysElement.prototype.SetChecked = function(n) {
                n ? (this.checked = !0) : this.element.removeAttr("checked");
            }),
            (SysElement.prototype.SetDisabled = function(n) {
                n
                    ?
                    this.element.attr("disabled", "disabled") :
                    this.element.attr("disabled", "");
            }),
            (SysElement.prototype.SetReadonly = function(n) {
                n
                    ?
                    this.element.attr("readonly", "readonly") :
                    this.element.removeAttr("readonly");
            }),
            (SysElement.prototype.SetSelected = function(n) {
                n
                    ?
                    this.element.attr("selected", "selected") :
                    this.element.removeAttr("selected");
            }),
            (SysElement.prototype.SetDisplay = function(n) {
                this.element.css("display", n);
            }),
            (SysElement.prototype.AddClass = function(n) {
                this.element.addClass(n);
            }),
            (SysElement.prototype.RemoveClass = function(n) {
                this.element.removeClass(n);
            }),
            (SysElement.prototype.HasClass = function(n) {
                return this.element.hasClass(n);
            }),
            (SysElement.prototype.IsChecked = function() {
                return this.element.is(":checked");
            }),
            (SysElement.prototype.IsDisabled = function() {
                return this.element.is(":disabled");
            }),
            (SysElement.prototype.IsReadonly = function() {
                return this.element.is(":readonly");
            }),
            (SysElement.prototype.IsSelected = function() {
                return this.element.is(":selected");
            }),
            (SysElement.prototype.Show = function() {
                this.element.show();
            }),
            (SysElement.prototype.Hide = function() {
                this.element.hide();
            }),
            (SysElement.prototype.Focus = function() {
                var n = this.element;
                n.is(":radio") && (n = $("[name='" + this.element[0].id + "']:checked"));
                n.focus();
            }),
            (SysElement.prototype.Select = function() {
                this.element
                    .filter(":input")
                    .not(":hidden")
                    .is(":text,:password,:file") &&
                    new SysSelection(this.element).SetSelection();
            }),
            (SysElement.prototype.Value = function(n) {
                var t, i, r;
                if (SysElement.IsNothing(n))
                    return (
                        this.element.length > 0 ?
                        this.element.is("input:radio") ?
                        ((i = this.element[0]),
                            (r = i.name || i.id),
                            (t = $("input[name=" + r + "]:radio:checked").val())) :
                        (t = this.element.is("input:checkbox") ?
                            this.IsChecked() :
                            this.element.val()) :
                        typeof this._org == "string" &&
                        (t = $("input[name=" + this._org + "]:radio:checked").val()),
                        t
                    );
                this.element.length > 0 ?
                    this.element.is(":checkbox") ?
                    this.SetChecked(n) :
                    this.element.is(":radio") ?
                    this._SetValueRadio(n) :
                    this.element.val(n) :
                    typeof this._org == "string" && this._SetValueRadio(n);
            }),
            (SysElement.prototype.AttachEvent = function(n, t, i) {
                var r = n;
                n.startsWith("on") && (r = n.substr(2));
                $addHandler2(this._el, r, t, i);
            }),
            (SysElement.prototype.DetachEvent = function(n, t) {
                var i = n;
                n.startsWith("on") && (i = n.substr(2));
                $removeHandler(this._el, i, t);
            }),
            (SysElement.prototype.FireEvent = function(n) {
                var t = n,
                    i;
                if (document.createEvent) {
                    t.startsWith("on") === !0 && (t = t.substr(2));
                    switch (t) {
                        case "click":
                        case "mousedown":
                        case "mouseup":
                        case "mouseover":
                        case "mousemove":
                        case "mouseout":
                            i = document.createEvent("MouseEvents");
                            i.initMouseEvent(
                                t, !0, !0,
                                this._el.ownerDocument.defaultView,
                                0,
                                0,
                                0,
                                0,
                                0, !1, !1, !1, !1,
                                0,
                                null
                            );
                            this._el.dispatchEvent(i);
                            break;
                        case "load":
                        case "unload":
                        case "abort":
                        case "error":
                        case "select":
                        case "change":
                        case "submit":
                        case "reset":
                        case "focus":
                        case "blur":
                        case "resize":
                        case "scroll":
                            i = document.createEvent("HTMLEvents");
                            i.initEvent(t, !0, !0);
                            this._el.dispatchEvent(i);
                    }
                } else
                    document.createEventObject &&
                    (t.startsWith("on") === !1 && (t = "on" + t),
                        (i = document.createEventObject()),
                        this._el.fireEvent(t, i));
            }),
            (SysElement.prototype.HandleAccessKey = function(n) {
                var t = this.element.click();
                return SysElement.IsJQuery(t) ?
                    t.length > 0 ?
                    (SysCancelBubble(n), !1) :
                    !0 :
                    t;
            }),
            (SysElement.prototype.GetDomElement = function() {
                return this._el;
            }),
            (SysElement.prototype._Init = function(n, t) {
                var i = t;
                SysElement.IsSysElement(i) && (i = i.element);
                this._org = n;
                this._ctx = t;
                SysElement.IsSysElement(n) ?
                    (this.element = n.element) :
                    SysElement.IsJQuery(n) ?
                    (this.element = n) :
                    typeof n == "string" ?
                    (this.element = $("#" + n.replace(/(\.|:)/g, "\\$1"), i)) :
                    SysElement.IsNotNothing(n) && (this.element = $(n, i));
                SysElement.IsNotNothing(this.element) &&
                    ((this._el = this.element[0]), (this.empty = !1));
            }),
            (SysElement.prototype._SetValueRadio = function(n) {
                var t = $(String.format("input[name={0}]", this._org));
                t.each(function() {
                    var t = new SysElement(this);
                    return t.element.val() === n.toString() ? (t.SetChecked(!0), !1) : !0;
                });
            }),
            (SysElement._initialized = !0));
    this._Init(n, t);
}

function SysHandleKey(n) {
    SysHandleKey._initialized === undefined &&
        ((SysHandleKey.prototype.HandleEnter = function(n) {
                return n || this.IsEnterKey() ?
                    (SysCancelInputSearch(),
                        SysCancelBubble(this.event),
                        SysFocusNext(SysSrcElement(this.event)), !0) :
                    !1;
            }),
            (SysHandleKey.prototype.IsEscapeKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.esc);
            }),
            (SysHandleKey.prototype.IsEnterKey = function() {
                return this.IsSingleKey(Sys.UI.Key.enter);
            }),
            (SysHandleKey.prototype.IsInsertKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.ins);
            }),
            (SysHandleKey.prototype.IsLeftKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.left);
            }),
            (SysHandleKey.prototype.IsRightKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.right);
            }),
            (SysHandleKey.prototype.IsUpKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.up);
            }),
            (SysHandleKey.prototype.IsDownKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.down);
            }),
            (SysHandleKey.prototype.IsHomeKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.home);
            }),
            (SysHandleKey.prototype.IsEndKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.end);
            }),
            (SysHandleKey.prototype.IsPageUpKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.pageUp);
            }),
            (SysHandleKey.prototype.IsPageDownKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.pageDown);
            }),
            (SysHandleKey.prototype.IsF1Key = function() {
                return this.IsSingleKey(SysHandleKey.Key.F1);
            }),
            (SysHandleKey.prototype.IsF2Key = function() {
                return this.IsSingleKey(SysHandleKey.Key.F2);
            }),
            (SysHandleKey.prototype.IsF2CtrlKey = function() {
                return this.GetKey() == SysHandleKey.Key.F2 && this.event.ctrlKey;
            }),
            (SysHandleKey.prototype.IsTabKey = function() {
                return this.IsSingleKey(SysHandleKey.Key.tab);
            }),
            (SysHandleKey.prototype.IsSingleKey = function(n) {
                var t = !(this.IsAltKey() || this.IsShiftKey() || this.IsCtrlKey());
                return t && n && (t = this.GetKey() === n), t;
            }),
            (SysHandleKey.prototype.IsAltKey = function() {
                return this.event.altKey;
            }),
            (SysHandleKey.prototype.IsCtrlKey = function() {
                return this.event.ctrlKey;
            }),
            (SysHandleKey.prototype.IsShiftKey = function() {
                return this.event.shiftKey;
            }),
            (SysHandleKey.prototype.GetKey = function() {
                return this.event.type == "keypress" ?
                    this.event.charCode :
                    this.event.type == "keyup" || this.event.type == "keydown" ?
                    this.event.keyCode :
                    this.event.keyCode;
            }),
            (SysHandleKey.prototype._Init = function(n) {
                if (n === undefined)
                    throw new Error("You must supply an event to operate on");
                this.event = SysEvent(n);
            }),
            (SysHandleKey._initialized = !0));
    this._Init(n);
}

function SysSrcElement(n) {
    return new SysHandleEvent(n).target;
}

function SysHandleEvent(n) {
    SysHandleEvent._initialized === undefined &&
        ((SysHandleEvent.prototype.IsEventStopped = function() {
                return (this.event.rawEvent || this.event).stopEvent === !0;
            }),
            (SysHandleEvent.prototype.StopPropagation = function() {
                this.event.stopPropagation && this.event.stopPropagation();
                this.event.cancelBubble = !0;
            }),
            (SysHandleEvent.prototype.PreventDefault = function(n) {
                var t = typeof n == "string" && n.length > 0;
                this.event.preventDefault ?
                    (this.event.preventDefault(),
                        t && this.event.rawEvent && (this.event.rawEvent.returnValue = n)) :
                    (this.event.returnValue = t ? n : !1);
            }),
            (SysHandleEvent.prototype.StopEvent = function() {
                (this.event.rawEvent || this.event).stopEvent = !0;
            }),
            (SysHandleEvent.prototype.StopAll = function() {
                this.StopPropagation();
                this.PreventDefault();
                this.StopEvent();
            }),
            (SysHandleEvent.prototype._Init = function(n) {
                this.event = n;
                this.target = this.event.target ?
                    this.event.target :
                    this.event.srcElement;
            }),
            (SysHandleEvent._initialized = !0));
    this._Init(n);
}

function SysEvent(n) {
    return n && !n.rawEvent ? new Sys.UI.DomEvent(n) : n;
}

function SysIsCancelBubble(n) {
    return n.cancelBubble;
}

function SysStopPropagation(n) {
    new SysHandleEvent(n).StopPropagation();
}

function SysPreventDefault(n, t) {
    new SysHandleEvent(n).PreventDefault(t);
}

function SysCancelBubble(n) {
    new SysHandleEvent(n).StopAll();
}

function SysDetachEvent(n, t, i) {
    var r = new SysElement(n);
    r.DetachEvent(t, i);
}

function SysAttachEvent(n, t, i, r) {
    var u = new SysElement(n);
    u.AttachEvent(t, i, r);
}

function SysProcessKey(n) {
    if (Sys.Browser.agent === Sys.Browser.Firefox) {
        var t = n;
        if (
            (n.rawEvent && (t = n.rawEvent),
                t.type === "keypress" && (t.ctrlKey || t.altKey))
        )
            return !1;
    }
    return !0;
}

function SysKeyDown(n) {
    new SysHandleKey(n).HandleEnter();
}

function SysGetKey(n) {
    return new SysHandleKey(n).GetKey();
}

function SysSetKey(n, t) {
    var i, r;
    n.srcElement ?
        (n.keyCode = t) :
        (n.stopPropagation(),
            (i = document.createEvent("KeyboardEvent")),
            i.initKeyEvent("keydown", !0, !0, null, !1, !1, !1, !1, t, 0),
            (r = SysSrcElement(n)),
            r.dispatchEvent(i));
}

function SysSelection(n) {
    SysSelection._initialized === undefined &&
        ((SysSelection.prototype.GetCaretPosition = function() {
                var i, n, r, t;
                if (this._selectionStart == -1 && this.hasSelection)
                    if (window.getSelection)
                        this._selectionStart = SysElement.IsNotNothing(
                            doSelectionStart(this._el)
                        ) ?
                        this._el.selectionStart :
                        this._sel.anchorOffset;
                    else if (document.selection) {
                    for (
                        n =
                        this._sel && this._rng ?
                        SysSelection._CreateRange(this._sel) :
                        SysSelection._CreateRange(document.selection),
                        r = this.el.text() || this.el.val(),
                        i = r.replace(/\n/g, "").length + 1,
                        t = 1; n && n.parentElement() == this._el && t == 1;

                    )
                        (t = n.move("character", 1)), t === 1 && --i;
                    this._selectionStart = --i;
                } else this._selectionStart = 0;
                return this._selectionStart;
            }),
            (SysSelection.prototype.SetCaretPosition = function(n) {
                if (this.hasSelection)
                    if (((this._selectionStart = n), window.getSelection))
                        doSelectionStart(this._el, n), doSelectionEnd(this._el, n);
                    else {
                        var t = this._el.createTextRange();
                        t.move("character", n);
                        t.select();
                    }
            }),
            (SysSelection.prototype.GetSelection = function() {
                var n = "",
                    t;
                return (
                    this.hasSelection &&
                    (window.getSelection ?
                        SysElement.IsNotNothing(doSelectionStart(this._el)) ?
                        ((t = this.GetCaretPosition()),
                            t != this._el.selectionEnd &&
                            (n = this.el.val().substring(t, this._el.selectionEnd))) :
                        (n = this._sel.toString()) :
                        document.selection &&
                        (this._sel.type === SysSelection._Type.text ?
                            (n = this._rng.text) :
                            this._sel.type === SysSelection._Type.control &&
                            (n = this._el.innerText))),
                    n
                );
            }),
            (SysSelection.prototype.SetSelection = function(n, t) {
                var i = -1,
                    u = -1,
                    f = (this.el.val() || this.el.text()).length,
                    r;
                typeof n == "number" && n >= 0 && (i = u = n);
                typeof t == "number" && t >= 0 && (u = i + t);
                window.getSelection ?
                    ((this._selectionStart =
                            i > -1 ?
                            doSelectionStart(this._el, i) :
                            doSelectionStart(this._el, 0)),
                        u > -1 ? doSelectionEnd(this._el, u) : doSelectionEnd(this._el, f)) :
                    document.selection &&
                    ((r = document.selection.createRange()),
                        i > 0 ? r.moveStart("character", i) : r.moveStart("textedit"),
                        u == -1 ? r.expand("textedit") : r.expand("character", f - i),
                        r.select());
            }),
            (SysSelection.prototype.ClearSelection = function() {
                this.hasSelection &&
                    (window.getSelection ?
                        doSelectionEnd(this._el, doSelectionStart(this._el)) :
                        document.selection && (this._sel.empty(), (this._rng = null)));
            }),
            (SysSelection.prototype.DeleteSelection = function() {
                var n = "",
                    t,
                    i;
                if (this.hasSelection)
                    if (window.getSelection)
                        (n = this._sel.toString()),
                        n.length > 0 && this._sel.deleteFromDocument();
                    else if (document.selection)
                    if (this._sel.type === SysSelection._Type.text)
                        (n = this._rng.text), this._sel.clear();
                    else if (this._sel.type === SysSelection._Type.control) {
                    for (t = 0, i = this._el.parentElement; t < this._rng.length;)
                        (n += this._rng(t).innerText), t++;
                    this._sel.clear();
                    this._Init(i);
                }
                return n;
            }),
            (SysSelection.prototype.ReplaceSelection = function(n) {
                if (this.hasSelection)
                    if (window.getSelection) {
                        var t = this.GetCaretPosition();
                        SysElement.IsNotNothing(this._el.value) ?
                            ((this._el.value = this._InsertValue(this._el.value, t, n)),
                                this.SetCaretPosition(t + n.length)) :
                            SysElement.IsNotNothing(this._el.textContent) &&
                            (this._el.textContent = this._InsertValue(
                                this._el.textContent,
                                t,
                                n
                            ));
                    } else
                        document.selection &&
                        (this._sel.type === SysSelection._Type.none ?
                            SysElement.IsNotNothing(this._rng) ?
                            (this._rng.text =
                                this._rng.text.charAt(this._rng.text.length - 1) == "" ?
                                n + " " :
                                n) :
                            (this._el.focus(),
                                SysElement.IsNotNothing(this._el.value) &&
                                (this._el.value = n)) :
                            this._sel.type === SysSelection._Type.text ?
                            (this._rng.text = n) :
                            this._el.createTextRange &&
                            ((this._rng = this._el.createTextRange()),
                                (this._rng.text = n)));
            }),
            (SysSelection.prototype._Init = function(n) {
                var r = n,
                    i,
                    t;
                n && ((i = new SysElement(n).element), i.length > 0 && (r = i[0]));
                t = SysSelection._GetElement(r);
                this.el = t[0];
                this._sel = t[1];
                this._rng = t[2];
                this.mode = t[3];
                this._el = this.el[0];
                this._selectionStart = -1;
                this.hasSelection = !0;
            }),
            (SysSelection.prototype._InsertValue = function(n, t, i) {
                var r;
                return (
                    t != -1 ?
                    ((r = n.substring(0, t)), (r += i), (r += n.substring(t))) :
                    (r = i + n),
                    r
                );
            }),
            (SysSelection._initialized = !0));
    this._Init(n);
}

function doSelectionStart(n, t) {
    return n.type != "text" && n.type != "textarea" ?
        null :
        arguments.length === 1 ?
        n.selectionStart :
        (n.selectionStart = t);
}

function doSelectionEnd(n, t) {
    return n.type != "text" && n.type != "textarea" ?
        null :
        arguments.length === 1 ?
        n.selectionEnd :
        (n.selectionEnd = t);
}

function BrowseTableMouseOver(n) {
    var t = SysSrcElement(n);
    t.tagName == "TD" && (t.parentNode.className = "Selected");
}

function BrowseTableMouseOut(n) {
    var i = SysSrcElement(n),
        t;
    i.tagName == "TD" &&
        ((t = i.parentNode),
            (t.className = t.rowIndex % 2 != 0 ? "DataLight" : "DataDark"));
}

function BrowseTableClick(n) {
    var t = SysSrcElement(n);
    BrowseTableClicked(t.href == "javascript:{}" ? t.parentNode : t, n);
}

function BrowseSetFocus(n) {
    var t = SysGetElement(n);
    t != null && t.focus();
}

function BrowseTableKeyPress() {}

function SysInputFindElement(n) {
    while (n != null && n.className != "ContextMenuItems") n = n.parentNode;
    return n;
}

function SysInputHighlight(n) {
    var t = SysInputFindElement(SysSrcElement(n));
    t != null &&
        t.className == "ContextMenuItems" &&
        ((sysInputRow = t.rowIndex),
            (t.style.backgroundColor = SysColors.ActiveCaption),
            (t.style.color = SysColors.CaptionText));
}

function SysInputLowlight(n) {
    var i, t;
    sysInputRow < 0 ||
        ((i = sysInputMenu.rows[sysInputRow]),
            i != null && ((i.style.backgroundColor = ""), (i.style.color = "")),
            (t = SysInputFindElement(SysSrcElement(n))),
            t != null &&
            t.className == "ContextMenuItems" &&
            ((t.style.backgroundColor = ""), (t.style.color = "")));
}

function SysInputRowHide(n) {
    var t = sysInputMenu.rows[n];
    t != null && ((t.style.backgroundColor = ""), (t.style.color = ""));
}

function SysInputSelectRow(n, t) {
    var i, r;
    return sysInputMenu == null ||
        sysInput == null ||
        (sysCxMenu !== null && sysCxMenu.is(":hidden")) ||
        (t != SysHandleKey.Key.up && t != SysHandleKey.Key.down) ?
        !1 :
        (SysInputLowlight(n),
            t == SysHandleKey.Key.up ?
            sysInputRow > 0 ?
            (sysInputRow -= 1) :
            (sysInputRow = sysInputMenu.rows.length - 1) :
            sysInputRow < sysInputMenu.rows.length - 1 ?
            (sysInputRow += 1) :
            (sysInputRow = 0),
            (i = sysInputMenu.rows[sysInputRow]),
            i.className != "ContextMenuItems" &&
            (t == 38 ?
                sysInputRow > 0 ?
                (sysInputRow -= 1) :
                (sysInputRow = sysInputMenu.rows.length - 1) :
                sysInputRow < sysInputMenu.rows.length - 1 ?
                (sysInputRow += 1) :
                (sysInputRow = 0),
                (i = sysInputMenu.rows[sysInputRow])),
            i != null &&
            ((i.style.backgroundColor = SysColors.ActiveCaption),
                (i.style.color = SysColors.CaptionText),
                (r = i.cells[0]),
                SysInputSetValue(r)), !0);
}

function SysInputMouseSelect(n) {
    var i = SysSrcElement(n),
        t;
    i != null &&
        (i.nodeName.toLowerCase() === "span" ?
            SysInputSetValue(i.parentNode) :
            SysInputSetValue(i),
            i.focus(),
            SysMenuHide(),
            sysInputChanged &&
            ((t = SysGetElement(sysInputAlt + "_alt")),
                t == null && (t = SysGetElement(sysInputAlt)),
                t != null && (SysChangeOnBlur(t), t.focus())));
}

function SysInputSetValue(n) {
    var r = $(n.parentNode.firstChild),
        f = SysTrim(r.attr("iv")),
        v,
        a,
        i,
        t,
        c,
        l,
        e;
    if (((sysInputChanged = !0), sysInputType == BrowseInputType.Browser)) {
        var i = $("#" + sysInputAlt),
            b = 1,
            y = sysInputRefUrl,
            k = sysInputKeyInRef,
            t = r.attr("ic");
        t == null && (t = f);
        i.length > 0 && (i.val(f), (sysInputChanged = !0));
        v = $("#" + sysInputAlt + "_alt");
        v.length > 0 && (v.val(SysTrim(t)), b++);
        a = $("#" + sysInputAlt + "_ref");
        a.length > 0 &&
            (y.length > 0 && a.attr("href", y + SysURLEncode(f)),
                k ?
                SysSetInnerText(a, r.text()) :
                SysSetInnerText(a, t + " - " + r.text()));
    } else if (sysInputType == BrowseInputType.InputField)
        (i = $("#" + sysInput)), i.val(r.text());
    else if (sysInputType == BrowseInputType.SearchField)
        (f = r.attr("iv")),
        (t = r.attr("ic")),
        t == null && (t = f),
        (i = $("#" + sysInput)),
        i.val(SysTrim(t));
    else if (sysInputType == BrowseInputType.Tag) {
        f = r.attr("iv");
        t = r.attr("ic");
        t == null && (t = f);
        var i = sysInput,
            u = SysGetElement(i),
            p = u.value,
            w = "",
            o = SysGetCaretPosition(u),
            s = p.lastIndexOf(",", o - 1);
        s >= 0 && (w = p.substring(0, s + 1));
        u.value = w + SysTrim(r.text());
    } else {
        Sys.Debug.fail("where does this occur");
        var i = sysInput,
            u = SysGetElement(i),
            h = u.value,
            o = SysGetCaretPosition($(u)),
            s = h.lastIndexOf(";", o - 1);
        s < 0 && (s = -1);
        e = h.indexOf(";", o);
        e < 0 && (e = h.length);
        c = h.substring(0, s);
        c != "" && c != null && (c = c + ";");
        l = h.substring(e, h.length);
        l != "" && l != null && (l = ";" + l);
        u.value = c + r.text() + l;
        selRange = u.createTextRange();
        selRange.move("character", o);
        e = u.value.indexOf(";", o);
        e < 0 && (e = u.value.length);
        selRange.moveEnd("character", e - o);
        selRange.select();
    }
}

function SysSetSysDialog(n) {
    var i = n.getAttribute("cvcount"),
        t;
    if (i && parseInt(i) && !(parseInt(i) <= 0)) {
        if (((count = parseInt(i)), count == 1)) {
            SysDialog.returnValue = n.getAttribute("cv0") ?
                SysTrim(n.getAttribute("cv0")) :
                "";
            return;
        }
        for (SysDialog.returnValue = [], t = 0; t < count; t++)
            SysDialog.returnValue[t] = n.getAttribute("cv" + t) ?
            SysTrim(n.getAttribute("cv" + t)) :
            "";
    }
}

function SysInputBrowseChg(n, t, r, u, f, e, o, s, h, c, l, a, v, y) {
    var rt, p, ut, k, w, g, d, b;
    if (
        ((onChangeTriggered = !0),
            (rt = SysGetElement(n + "_alt")),
            rt == null && (rt = SysGetElement(n)),
            (p = SysTrim(rt.value)),
            p != null &&
            p != "" &&
            (ut = SysCallback(
                "../docs/SysInputSearch.aspx?MultiBrowser=1&XML=1&InputType=B&Text=" +
                SysURLEncode(p) +
                "&" +
                u +
                "&BRS_BackOfficeDivisionCode=" +
                h +
                "&BRS_EntityEGBrowser=" +
                c +
                "&BRS_BackOfficeSetting=" +
                l +
                "&BRS_BackOfficeUseFixedCredentials=" +
                a +
                "&BRS_BackOfficeMacroManager=" +
                v,
                "",
                null, !1
            )),
            (k = !1),
            ut != null)
    ) {
        for (
            w = ut.getElementsByTagName("Entity"), i = 0; !k && i < w.length; i++
        ) {
            var nt = w.item(i),
                tt = nt.getAttribute("code"),
                it = nt.getAttribute("id");
            y == "false" ?
                SysTrim(p).toLowerCase() != SysTrim(tt).toLowerCase() &&
                SysTrim(p).toLowerCase() != SysTrim(it).toLowerCase() ?
                w.length == 1 &&
                ((g = nt.getAttribute("description")),
                    SysSetSysDialog(nt),
                    (r = !1),
                    SysSetBrowserChg(n, it, tt, t, g, r, o, SysDialog.returnValue),
                    (k = !0)) :
                (k = !0) :
                (w.length == 1 ||
                    SysTrim(p).toLowerCase() == SysTrim(tt).toLowerCase() ||
                    SysTrim(p).toLowerCase() == SysTrim(it).toLowerCase()) &&
                ((g = nt.getAttribute("description")),
                    SysSetSysDialog(nt),
                    SysSetBrowserChg(n, it, tt, t, g, r, o, SysDialog.returnValue),
                    (k = !0));
        }
        if (!k && w.length > 1) {
            if (s == !0) {
                new SysElement(rt).FireEvent("dblclick");
                SysCancelBubble(event);
                return;
            }
            var tt = w[0].getAttribute("code"),
                it = w[0].getAttribute("id"),
                g = w[0].getAttribute("description");
            SysSetSysDialog(w[0]);
            y == "false" && (r = !1);
            SysSetBrowserChg(n, it, tt, t, g, r, o, SysDialog.returnValue);
            k = !0;
        }
    }
    d = SysGetElement(n + "_ref");
    d != null ?
        ((b = SysGetElement(n + "_ref_ref")),
            p == null || p == "" ?
            (SysSetInnerText(d, ""),
                b != null && SysSetInnerText(b, ""),
                SysClearExtraResults(o)) :
            k ?
            ((d.style.color = ""), b != null && (b.style.color = "")) :
            (SysSetInnerText(d, sysNoDataTerm),
                (d.style.color = "red"),
                d.tagName == "A" && d.removeAttribute("href"),
                b != null &&
                (SysSetInnerText(b, sysNoDataTerm),
                    (b.style.color = "red"),
                    b.tagName == "A" && b.removeAttribute("href")),
                (e || s) && (SysSetValue(n, ""), SysSetValue(n + "_alt", "")),
                SysClearExtraResults(o))) :
        k || ((e || s) && (SysSetValue(n, ""), SysSetValue(n + "_alt", "")));
}

function SysClearExtraResults(n) {
    if (n != null) {
        var t = n.split(",");
        for (j = 0; j < t.length; j++)
            (c = SysGetElement(t[j])), c != null && SysSet(t[j], "");
    }
}

function SysInputBrowse(
    n,
    t,
    i,
    r,
    u,
    f,
    e,
    o,
    s,
    h,
    c,
    l,
    a,
    v,
    y,
    p,
    w,
    b,
    k,
    d
) {
    var nt, g, it;
    if (
        e != null &&
        ((nt = SysGetElement(t + "_alt")), nt != null && nt.value != null)
    ) {
        for (var rt = SysTrim(nt.value), ut = !1, tt = 0; tt < rt.length; tt++)
            "0123456789 .".indexOf(rt.charAt(tt)) < 0 && (ut = !0);
        ut && (u = u + "&BRS_" + e + "=" + SysURLEncode(rt));
    }
    return (
        (sysInputType = BrowseInputType.Browser),
        (sysInputRefUrl = i),
        (sysInputKeyInRef = r),
        (sysInputExtraQuery = u),
        (sysInputParm = f),
        h != null && (sysInputDivisionCode = "&BRS_BackOfficeDivisionCode=" + h),
        c != null &&
        (sysInputDivisionCode =
            sysInputDivisionCode + "&BRS_EntityEGBrowser=" + c),
        l != null &&
        (sysInputDivisionCode =
            sysInputDivisionCode + "&BRS_BackOfficeSetting=" + l),
        a != null &&
        (sysInputDivisionCode += "&BRS_BackOfficeUseFixedCredentials=" + a),
        v != null && (sysInputDivisionCode += "&BRS_BackOfficeMacroManager=" + v),
        p &&
        (sysInputDivisionCode += "&BRS_EntityLicenseBrowser=" + SysURLEncode(p)),
        w && (sysInputDivisionCode += "&BRS_Portal=" + SysURLEncode(w)),
        b && (sysInputDivisionCode += "&BRS_u=" + SysURLEncode(b)),
        k && (sysInputDivisionCode += "&BRS_p=" + SysURLEncode(k)),
        d && (sysInputDivisionCode += "&BRS_d=" + SysURLEncode(d)),
        (g = SysGetElement(t + "_alt")),
        g != null ?
        ((it = g.value), SysInputSelectDo(n, g, "", t, it)) :
        ((g = SysGetElement(t)),
            (it = g.value),
            SysInputSelectDo(n, g, "", t, it))
    );
}

function SysInputSelect(n, t, i) {
    sysInputType = BrowseInputType.InputField;
    var r = t.value;
    return SysInputSelectDo(n, t, i, null, r);
}

function SysInputSide(n, t, i) {
    sysInputType = BrowseInputType.SearchField;
    var r = t.value;
    return SysInputSelectDo(n, t, i, null, r);
}

function SysInputList(n, t, i) {
    var u;
    sysInputType = BrowseInputType.InputList;
    var r = t.value,
        e = SysGetCaretPosition(t),
        f = r.lastIndexOf(";", e - 1);
    return (
        f < 0 && (f = -1),
        (u = r.indexOf(";", e)),
        u < 0 && (u = r.length),
        (r = r.substring(f + 1, u)),
        SysInputSelectDo(n, t, i, null, r)
    );
}

function SysInputTag(n, t, r) {
    sysInputType = BrowseInputType.Tag;
    var u = t.value,
        e = SysGetCaretPosition(t),
        f = u.lastIndexOf(",", e - 1);
    return (
        f < 0 && (f = -1),
        (i = u.length),
        (u = u.substring(f + 1, i)),
        SysInputSelectDo(n, t, r, null, u)
    );
}

function _DoMnuMouseOver(n) {
    var t = SysSrcElement(n);
    SysElement.IsNotNothing(sysInputMenu) &&
        (t.nodeName.toLowerCase() === "td" ||
            t.nodeName.toLowerCase() === "span") &&
        (t.nodeName.toLowerCase() === "span" ?
            SysInputSetValue(t.parentNode) :
            SysInputSetValue(t));
}

function _DoValidateMouseOut(n) {
    ValidateMouseOut(n, sysCxMenu, 0);
}

function ValidateMouseOut(n, t, i) {
    if (!SysElement.IsNothing(t)) {
        var o =
            $(document.body).scrollLeft() +
            $(document.documentElement).scrollLeft(),
            s =
            $(document.body).scrollTop() + $(document.documentElement).scrollTop(),
            r = n.clientX + o,
            u = n.clientY + s,
            f = t.offset().left,
            e = t.offset().top,
            h = t.width(),
            c = t.height();
        r <= f && SysMenuHide(n);
        r >= f + h && SysMenuHide(n);
        u <= e - i && SysMenuHide(n);
        u >= e + c && SysMenuHide(n);
    }
}

function _CreateMenuContainer() {
    var n, i;
    if (sysCxMenu == null) {
        n = document.createElement("div");
        sysCxMenu = $(n);
        var t = $(document.body),
            r = $(document.documentElement),
            u = t.scrollLeft() + r.scrollLeft(),
            f = t.scrollTop() + r.scrollTop();
        sysCxMenu.css({
            position: "absolute",
            display: "block",
            padding: "0px",
            zIndex: 4e3,
            left: u,
            top: f,
            "overflow-y": "hidden",
            "overflow-x": "hidden",
        });
        t.attr("id") != "BodyLeftMenu" && sysCxMenu.css("width", "2000px");
        sysCxMenu.isOpen = !0;
        document.body.appendChild(n);
        Sys.Browser.agent === Sys.Browser.InternetExplorer &&
            navigator.userAgent.toUpperCase().indexOf("OUTLOOK") < 0 &&
            ((i = document.createElement("iframe")),
                (sysCxMenuFrame = $(i)),
                sysCxMenuFrame.css({
                    position: "absolute",
                    opacity: 0,
                    display: "none",
                    zIndex: 50,
                    left: u,
                    top: f,
                }),
                (sysCxMenu.isOpen = !0),
                sysCxMenuFrame.attr("src", "empty.html"),
                document.body.appendChild(i));
        n = new SysElement(n);
        n.AttachEvent("onkeydown", SysMenuOnKeyDown);
        n.AttachEvent("onmouseover", _DoMnuMouseOver);
    }
}

function OutOfFocusSugestionBox(n, t) {
    menuTimeoutId != null &&
        (window.clearTimeout(menuTimeoutId), (menuTimeoutId = null));
    $(t).is(":focus") === !1 ?
        SysMenuHide(n) :
        (menuTimeoutId = window.setTimeout(function() {
            OutOfFocusSugestionBox(n, t);
        }, 300));
}

function SysInputSelectDo(n, t, i, r, u) {
    if (SysElement.IsNothing(n)) {
        sysInputText = "";
        return;
    }
    menuTimeoutId = window.setTimeout(function() {
        OutOfFocusSugestionBox(n, t);
    }, 300);
    var e = new SysHandleKey(n),
        f = e.GetKey();
    if (SysInputSelectRow(n, f)) {
        SysStopPropagation(n);
        sysInputText = "";
        return;
    }
    if (
        f == SysHandleKey.Key.esc ||
        f == SysHandleKey.Key.enter ||
        f == SysHandleKey.Key.left ||
        f == SysHandleKey.Key.right ||
        f == SysHandleKey.Key.up ||
        f == SysHandleKey.Key.down
    ) {
        SysCancelInputSearch();
        sysInputText = "";
        return;
    }
    if (
        e.IsCtrlKey() ||
        t.value == null ||
        t.value == "" ||
        f == SysHandleKey.Key.tab
    ) {
        sysInputText = "";
        return;
    }
    if (
        f !== SysHandleKey.Key.ctrl &&
        f !== SysHandleKey.Key.shift &&
        f !== SysHandleKey.Key.alt
    ) {
        if ((_CreateMenuContainer(), sysInputText != u || t.id != sysInput))
            return (
                (sysInputRow = -1),
                (sysInputText = u),
                (sysInput = t.id),
                (sysInputAlt = r),
                (sysInputTextType = i),
                (sysXmlHttpAborted = !1),
                sysInputTimer != null && window.clearTimeout(sysInputTimer),
                (sysInputTimer = window.setTimeout(SysInputTimerHandler, 300)), !0
            );
        SysInputHandle();
        SysStopPropagation(n);
        SysPreventDefault(n);
    }
}

function SysInputTimerHandler() {
    sysXmlHttpAborted ||
        (sysInputType == BrowseInputType.Browser ?
            SysCallback(
                "../docs/SysInputSearch.aspx?MultiBrowser=1&InputType=B&Text=" +
                SysURLEncode(sysInputText) +
                "&" +
                sysInputExtraQuery +
                sysInputDivisionCode,
                "",
                SysInputCallback
            ) :
            sysInputType == BrowseInputType.Tag ?
            SysCallback(
                "DocInputSearchTag.aspx?MultiBrowser=1&TextType=" +
                sysInputTextType +
                "&InputType=" +
                sysInputType +
                "&Text=" +
                SysURLEncode(sysInputText) +
                "&eq=" +
                sysInputExtraQuery +
                sysInputParm,
                "",
                SysInputCallback
            ) :
            SysCallback(
                "../docs/SysInputSearch.aspx?MultiBrowser=1&TextType=" +
                sysInputTextType +
                "&InputType=" +
                sysInputType +
                "&Text=" +
                SysURLEncode(sysInputText) +
                "&eq=" +
                sysInputExtraQuery +
                sysInputParm +
                "&RecentlyUsed=" +
                sysInputTextType +
                "&TopRecentlyused=3",
                "",
                SysInputCallback
            ));
}

function SysInputCallback() {
    var n, i, t;
    if (!sysXmlHttpAborted && sysXmlHttp.readyState == 4) {
        if (
            ((n = sysXmlHttp.responseText),
                (n = n.replace(/\r\n/g, "")),
                (i = $(n)),
                i.length > 1 &&
                ((t = i.filter("form")),
                    t.length > 0 && ($("script", t).remove(), (n = t.html()))),
                n == null || n == "")
        ) {
            sysCxMenu !== null && sysCxMenu.hide();
            sysCxMenuFrame !== null && sysCxMenuFrame.hide();
            return;
        }
        SysElement.IsNotNothing(sysCxMenu) &&
            SysElement.IsNotNothing(n) &&
            n.length > 0 &&
            (sysCxMenu.html(n), SysInputHandle());
    }
}

function SysInputHandle() {
    var e = 0,
        o = 0,
        r = $("#BodyLeftMenu").width(),
        t,
        l,
        s,
        a,
        f,
        h,
        c;
    if ((r == null && (r = 500), (t = SysGetElement(sysInput)), t != null)) {
        e = $(t).offset().left;
        o = $(t).offset().top + $(t).height() + 5;
        var i = 200,
            n = r,
            u = SysGetElement("_Menu", sysCxMenu[0]);
        u != null ?
            (sysInputMenu = u) :
            ((sysInputMenu = null),
                (u = SysGetElement("_MenuError", sysCxMenu[0])));
        u != null &&
            n < u.offsetWidth &&
            (n = u.offsetWidth > r ? r : u.offsetWidth);
        n == r &&
            $(n).children().first().width() >= r &&
            (e = $(t).parent().offset().left);
        sysCxMenu.css({ width: n });
        sysCxMenuFrame !== null && sysCxMenuFrame.css({ width: n });
        sysCxMenu.show();
        l = $(".ContextMenu");
        s = 2;
        navigator.userAgent.indexOf("Chrome/") <= 0 ?
            ((a = n),
                l.find("tr").each(function() {
                    var t = $(this).children(),
                        i = t.length;
                    t.each(function() {
                        $(this).css("width", n / i + "px");
                        $(this).attr("colspan") != undefined &&
                            parseInt($(this).attr("colspan")) > s &&
                            $(this).attr("colspan", s);
                        $(this).css("wordWrap", "break-word");
                        $(this).css("overflow", "hidden");
                        $(this).css("verticalAlign", "bottom");
                    });
                })) :
            l.find("td").each(function() {
                $(this).attr("colspan") != undefined &&
                    parseInt($(this).attr("colspan")) > s &&
                    $(this).attr("colspan", s);
                $(this).css("wordWrap", "break-word");
                $(this).css("overflow", "hidden");
                $(this).css("verticalAlign", "bottom");
            });
        f = SysGetElement("_Menu", sysCxMenu[0]);
        f != null ?
            (sysInputMenu = f) :
            ((sysInputMenu = null),
                (f = SysGetElement("_MenuError", sysCxMenu[0])));
        f != null &&
            ((i = $("#_Menu").height() + 1),
                (h = $(document).height() - ($(t).offset().top + $(t).height() + 5)),
                (c = $(t).offset().top),
                i > h && c > h ?
                i > c ?
                ((o = 0), (i = c)) :
                (o = c - i) :
                i > h && (i = h),
                $(f).css("width", "100%"));
        n == r && (e = $(t).parent().offset().left);
        sysCxMenu.css({ left: e, top: o, width: n, height: i });
        sysCxMenuFrame !== null &&
            sysCxMenuFrame.css({ left: e, top: o, width: n, height: i });
        sysCxMenuFrame !== null && sysCxMenuFrame.show();
    }
    return !0;
}

function InMenuLeft() {
    return (
        window.frameElement && window.frameElement.id.toUpperCase() == "MENULEFT"
    );
}

function SysExchangeRate(n, t, i, r, u) {
    var f = SysGetElement(n),
        e = SysGetElement(t),
        s = SysGetElement(r),
        h = SysGetElement(t + "_hidden"),
        o;
    e != null &&
        f != null &&
        ((o = "SysCallback.aspx?Action=1&Target=" + i + "&Source=" + f.value),
            s != null && (o += "&Date=" + s.value),
            (e.value = SysCallback(o)),
            (h.value = f.value),
            SysSetReadOnly(e, !u || f.value == i));
}

function SysEditor_InsertImage() {
    editor.document.execCommand("insertimage", "1", null);
}

function SysCbLoadList(n) {
    var r = SysCallback(n),
        t,
        i;
    return ($("#callbackvalues").css("display", "none"),
            $("#divHide").empty(),
            (t = $("body").append("<div id='divHide'></div>")),
            $("#divHide").css("display", "none"),
            $("#divHide").append(r),
            (i = $("#divHide").find("#callbackvalues")),
            i == null) ?
        null :
        (SysCbSetValues(t), t);
}

function SysCbSetValues(n) {
    for (var i = n.find("#callbackvalues"), r, t = 0; t < i[0].rows.length; t++)
        (r = i[0].rows[t]), SysCbSetValueRow(r);
}

function SysCbSetValue(n, t) {
    var i = SysGetElement(t, n);
    i != null && SysCbSetValueRow(i);
}

function SysCbSetValueRow(n) {
    var r = n.getAttribute("id"),
        i = n.getAttribute("t"),
        u;
    if (i == null || i == "")(u = SysGetInnerText(n.cells[0])), SysSet(r, u);
    else if (i == "B") {
        var t = SysGetInnerText(n.cells[0]),
            f = SysGetInnerText(n.cells[1]),
            e = SysGetInnerText(n.cells[2]),
            o = SysGetInnerText(n.cells[3]);
        (t == null || t == "") && (t = f);
        SysSetBrowser(r, t, f, e, o, null, null);
    }
}

function SysCbGetValue(n, t) {
    var i = SysGetElement(t, n);
    if (i != null) return SysGetInnerText(i.cells[0]);
}

function SysSetBrowser(n, t, i, r, u, f, e, o) {
    var s, c, h, l;
    if (
        (i == null && (i = t),
            (s = SysGetElement(n)),
            s != null && (s.value = SysTrim(t)),
            (s = SysGetElement(n + "_alt")),
            s != null &&
            ((c = SysTrim(i)),
                s.value.toUpperCase() != c.toUpperCase() && (s.value = SysTrim(i))),
            (s = SysGetElement(n + "_ref")),
            s != null)
    )
        if ((r.length > 0 && (s.href = r + SysURLEncode(t)), e != null)) {
            if (
                (SysSetInnerText(s, i),
                    (h = e.split(",")),
                    (erc = h.length),
                    (l = o.length - erc),
                    h != null)
            )
                for (k = 0; k < h.length; k++) SysSet(h[k], o[l + k]);
        } else
            f || i.length == 0 ?
            SysSetInnerText(s, u) :
            SysSetInnerText(s, i + " - " + u);
}

function SysSetBrowserChg(n, t, i, r, u, f, e) {
    SysDialog.ctl = n;
    SysDialog.bKeyInRef = f;
    SysDialog.refurl = r;
    SysDialog.extraResults = e;
    SysDialog.onchangeScript = "";
    SysBrowseDataHandler();
}

function SysCreateControl(n, t) {
    var i = SysGetElement(n);
    i.innerHTML = t;
}

function SysCallback(n, t, i, r, u) {
    try {
        r == null && (r = !0);
        u == null && (u = !1);
        t == null && (t = "true");
        var f = n;
        return (
            (f += n.indexOf("?") < 0 ? "?" : "&"),
            (f += "callback=" + t),
            sysXmlHttp != null && sysXmlHttp.abort(),
            (sysXmlHttp = new XMLHttpRequest()),
            i == null ? sysXmlHttp.open("GET", f, !1) : sysXmlHttp.open("GET", f, !0),
            sysXmlHttp.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            ),
            i != null && (sysXmlHttp.onreadystatechange = i),
            sysXmlHttp.send(null),
            i != null ?
            null :
            r ?
            u ?
            sysXmlHttp.responseBody :
            sysXmlHttp.responseText :
            sysXmlHttp.responseXML
        );
    } catch (e) {
        return null;
    }
}

function SysCancelInputSearch() {
    SysCallbackAbort();
    sysCxMenu != null && sysCxMenu.hide();
    sysCxMenuFrame !== null && sysCxMenuFrame.hide();
}

function SysCallbackAbort() {
    sysXmlHttp != null && sysXmlHttp.abort();
    sysXmlHttpAborted = !0;
}

function getOriginalDirtyCheck() {
    return SysIsDirty;
}

function SysFocusNext(n) {
    var e = $(n),
        r = e.parent(),
        i = r.parent(),
        t = i.next(),
        o = t.is("td"),
        u,
        f;
    if (t.is("td") === !1)
        for (
            u = i.parent(), f = u.next(), t = f.children(":first"); t.has(":text").length == 0 && t.length > 0;

        )
            t = t.next();
    return (
        t.length == 0 && (i.removeClass("selected"), t.focus()),
        t.children(":first").children(":first").focus(),
        r
    );
}

function SysLogLoadTime() {
    if (window.performance != undefined && window.console != undefined) {
        var n = window.performance.timing,
            t = new Date().getTime() - n.navigationStart;
        console.log("Load time: " + t + " ms");
    }
}

function SysInjectPolyfills() {
    SysFixIEDragDrop();
    SysFixDefaultButtonType();
    FixWindowLocationPathName();
    SysFixAltKeysCombinations();
}

function SysFixAltKeysCombinations() {
    SysCheckWebKit();
    var n = $("button[onclick*='SysSetTimestamp']").length;
    (Sys.Browser.agent == Sys.Browser.InternetExplorer || n == 1) &&
    $("button[onclick*='SysSetTimestamp']").each(function() {
        var t = $(this).attr("onclick"),
            i = t.substring(t.indexOf("('") + 2, t.indexOf("')")),
            n;
        Sys.Browser.agent === Sys.Browser.Firefox ?
            $(this).attr("title", "ALT SHIFT T - Timestamp") :
            Sys.Browser.agent === Sys.Browser.Safari ?
            $(this).attr("title", "CTRL ALT T - Timestamp") :
            $(this).attr("title", "ALT T - Timestamp");
        n = 0;
        $("#" + i).keydown(function(t) {
            if (n == 0 && t.keyCode == 18) {
                t.preventDefault();
                n = t.keyCode;
                return;
            }
        });
        $("#" + i).keyup(function(t) {
            t.keyCode == 18 && (n = 0);
        });
    });
    $("button[onclick*='onTimestamp']").each(function() {
        var t = $(this).attr("onclick"),
            i = t.substring(t.indexOf("('") + 2, t.indexOf("')")),
            n;
        Sys.Browser.agent === Sys.Browser.Firefox ?
            $(this).attr("title", "ALT SHIFT T - Timestamp") :
            Sys.Browser.agent === Sys.Browser.Safari ?
            $(this).attr("title", "CTRL ALT T - Timestamp") :
            $(this).attr("title", "ALT T - Timestamp");
        n = 0;
        $("#Memo").keydown(function(t) {
            if (n == 0 && t.keyCode == 18) {
                t.preventDefault();
                n = t.keyCode;
                return;
            }
        });
        $("#" + i).keyup(function(t) {
            t.keyCode == 18 && (n = 0);
        });
    });
    n = $("button[onclick*='SysSetFullscreen']").length;
    (Sys.Browser.agent == Sys.Browser.InternetExplorer || n == 1) &&
    $("button[onclick*='SysSetFullscreen']").each(function() {
        var n = $(this).attr("onclick"),
            i = n.substring(n.indexOf("('") + 2, n.indexOf("')")),
            t = 0;
        Sys.Browser.agent == Sys.Browser.Firefox ||
            Sys.Browser.agent == Sys.Browser.Chrome ?
            $(this).attr("title", "ALT SHIFT F - Fullscreen") :
            Sys.Browser.agent === Sys.Browser.Safari ?
            $(this).attr("title", "CTRL ALT F - Fullscreen") :
            $(this).attr("title", "ALT F - Full screen");
        $("#" + i).keydown(function(n) {
            if (t == 0 && n.keyCode == 18) {
                n.preventDefault();
                t = n.keyCode;
                return;
            }
        });
        $("#" + i).keyup(function(n) {
            n.keyCode == 18 && (t = 0);
        });
    });
}

function SysCheckWebKit() {
    typeof Sys.Browser.Edge == "undefined" && (Sys.Browser.Edge = {});
    typeof Sys.Browser.Chrome == "undefined" && (Sys.Browser.Chrome = {});
    typeof Sys.Browser.Safari == "undefined" && (Sys.Browser.Safari = {});
    typeof Sys.Browser.WebKit == "undefined" && (Sys.Browser.WebKit = {});
    navigator.userAgent.indexOf("Edge/") > -1 ?
        ((Sys.Browser.agent = Sys.Browser.Edge),
            (Sys.Browser.version = parseFloat(
                navigator.userAgent.match(/Edge\/(\d+(\.\d+)?)/)[1]
            )),
            (Sys.Browser.name = "Edge")) :
        navigator.userAgent.indexOf("Chrome/") > -1 ?
        ((Sys.Browser.agent = Sys.Browser.Chrome),
            (Sys.Browser.version = parseFloat(
                navigator.userAgent.match(/Chrome\/(\d+(\.\d+)?)/)[1]
            )),
            (Sys.Browser.name = "Chrome")) :
        navigator.userAgent.indexOf("Safari/") > -1 ?
        ((Sys.Browser.agent = Sys.Browser.Safari),
            (Sys.Browser.version = parseFloat(
                navigator.userAgent.match(/Safari\/(\d+(\.\d+)?)/)[1]
            )),
            (Sys.Browser.name = "Safari")) :
        navigator.userAgent.indexOf("WebKit/") > -1 &&
        ((Sys.Browser.agent = Sys.Browser.WebKit),
            (Sys.Browser.version = parseFloat(
                navigator.userAgent.match(/WebKit\/(\d+(\.\d+)?)/)[1]
            )),
            (Sys.Browser.name = "WebKit"));
}

function SysFixIEDragDrop() {
    document.body.dragDrop &&
        $("body").delegate("[draggable]", "selectstart", function() {
            return this.dragDrop(), !1;
        });
}

function SysFixDefaultButtonType() {
    $("button").each(function() {
        $(this).attr("type") == undefined && $(this).attr("type", "button");
    });
}

function FixWindowLocationPathName() {
    window.location.origin ||
        (window.location.origin =
            window.location.protocol +
            "//" +
            window.location.hostname +
            (window.location.port ? ":" + window.location.port : ""));
}

function getCookie(n) {
    var t = document.cookie,
        i = t.indexOf(" " + n + "="),
        r;
    return (
        i == -1 && (i = t.indexOf(n + "=")),
        i == -1 ?
        (t = null) :
        ((i = t.indexOf("=", i) + 1),
            (r = t.indexOf(";", i)),
            r == -1 && (r = t.length),
            (t = unescape(t.substring(i, r)))),
        t
    );
}

function SysPictureUpload(n) {
    $("#" + n).click();
}

function deletePicture(n, t, i, r, u, f, e) {
    if (SysDialog.returnValue == 1)
        if (t) {
            var o = new Image();
            o.src = e;
            o.id = i;
            o.style.visibility = "hidden";
            $("#" + i).after(o);
            $("#" + i).remove();
            o.onload = function() {
                this.width = "120";
                this.height = "120";
                this.style.visibility = "visible";
                $("#" + f).val("");
                $("div.PicUploader span.PicUpload").text(u);
                $("#" + r).removeClass("PicDelete");
                $("#" + r).addClass("PicDeleteNotShown");
                this.onload = null;
                convertToInlineSVG(o, e);
            };
        } else SysSet(n, "1"), SysSubmit();
}

function SysPictureDelete(n, t, i, r, u, f, e) {
    SysShowModalPopup(
        SysConfirmUrl(9, 42057, "Are you sure you want to delete this picture?"),
        null,
        "300px",
        "185px",
        function() {
            deletePicture(n, t, i, r, u, f, e);
            CheckSynergyLinkPoll(!1);
            $("#ImgDeletedInEditMode").val("True");
        },
        null,
        "scroll:no;"
    );
}

function resetOrientation(n, t, i) {
    var r = new Image();
    r.onload = function() {
        var u = r.width,
            f = r.height,
            e = document.createElement("canvas"),
            n = e.getContext("2d");
        4 < t && t < 9 ?
            ((e.width = f), (e.height = u)) :
            ((e.width = u), (e.height = f));
        switch (t) {
            case 2:
                n.transform(-1, 0, 0, 1, u, 0);
                break;
            case 3:
                n.transform(-1, 0, 0, -1, u, f);
                break;
            case 4:
                n.transform(1, 0, 0, -1, 0, f);
                break;
            case 5:
                n.transform(0, 1, 1, 0, 0, 0);
                break;
            case 6:
                n.transform(0, 1, -1, 0, f, 0);
                break;
            case 7:
                n.transform(0, -1, -1, 0, f, u);
                break;
            case 8:
                n.transform(0, -1, 1, 0, 0, u);
        }
        n.drawImage(r, 0, 0);
        i(e.toDataURL());
    };
    r.src = n;
}

function SysShowPicture(n, t, i, r, u, f, e) {
    var a = [
            "jpg",
            "jpeg",
            "jpe",
            "jfif",
            "bmp",
            "gif",
            "png",
            "tif",
            "dib",
            "svg+xml",
            "tiff",
        ],
        w = n.files[0].type,
        c = !1,
        v = w.split("/")[1],
        h,
        y,
        o;
    for (e = e || 0, h = 0; h < a.length; h++)
        if (((y = a[h]), v == y.toLowerCase())) {
            c = !0;
            break;
        }
    if ((c == !1 && (SysSet("BCAction", "4"), SysSubmit()), (c = !0))) {
        if (n.files && n.files[0]) {
            var p = new FileReader(),
                o = new Image(),
                l = null,
                s;
            p.onload = function(n) {
                var u, r, c, t, h, f, l, e;
                $("#" + i).attr("src", n.target.result);
                o.src = n.target.result;
                o.id = i;
                o.style.visibility = "hidden";
                $("#" + i).after(o);
                $("#" + i).remove();
                try {
                    for (
                        u = !1,
                        r = new DataView(
                            _base64ToArrayBuffer(n.target.result.split(",").pop())
                        ),
                        r.getUint16(0, !1) != 65496 && ((s = -2), (u = !0)),
                        c = r.byteLength,
                        t = 2; t < c && !u;

                    )
                        if (
                            (r.getUint16(t + 2, !1) <= 8 && (s = -1),
                                (h = r.getUint16(t, !1)),
                                (t += 2),
                                h == 65505)
                        )
                            for (
                                r.getUint32((t += 2), !1) != 1165519206 && ((s = -1), (u = !0)),
                                f = r.getUint16((t += 6), !1) == 18761,
                                t += r.getUint32(t + 4, f),
                                l = r.getUint16(t, f),
                                t += 2,
                                e = 0; e < l && !u; e++
                            )
                                r.getUint16(t + e * 12, f) == 274 &&
                                ((s = r.getUint16(t + e * 12 + 8, f)), (u = !0));
                        else if ((h & 65280) != 65280) break;
                    else t += r.getUint16(t, !1);
                    u || (s = -1);
                    s === 6 || s === 3 || s === 8 ?
                        resetOrientation(n.target.result, s, function(n) {
                            $("#" + i).attr("src", n);
                            $("#" + i).show();
                        }) :
                        ($("#" + i).attr("src", n.target.result), $("#" + i).show());
                } catch (a) {
                    n.target.result &&
                        ($("#" + i).attr("src", n.target.result), $("#" + i).show());
                }
            };
            o.onload = function() {
                if (v != "svg+xml") {
                    l =
                        this.width > this.height ?
                        "LinkBackgroundLandscape" :
                        "LinkBackgroundPortrait";
                    var n = this.width,
                        i = this.height;
                    (i > t || n > t) &&
                    (i > n ?
                        ((n = (t / i) * n), (i = t)) :
                        ((i = (t / n) * i), (n = t)));
                    this.width = n;
                    this.height = i;
                    e && (this.className = l);
                } else
                    (this.style.height = "auto"),
                    (this.style.width = "auto"),
                    (this.style.maxHeight = "120px"),
                    (this.style.maxWidth = "120px");
                this.style.visibility = "visible";
                $("div.PicUploader span.PicUpload").text(r);
                $("#" + f).removeClass("PicDeleteNotShown");
                $("#" + f).addClass("PicDelete");
                this.onload = null;
            };
        }
        p.readAsDataURL(n.files[0]);
    } else
        (o = new Image()),
        (o.src = "images/default_profile.svg"),
        (o.id = i),
        (o.style.visibility = "hidden"),
        $("#" + i).after(o),
        $("#" + i).remove(),
        (o.onload = function() {
            this.width = "120";
            this.height = "120";
            this.style.visibility = "visible";
            $("div.PicUploader span.PicUpload").text(u);
            $("#" + f).removeClass("PicDelete");
            $("#" + f).addClass("PicDeleteNotShown");
        });
}

function _base64ToArrayBuffer(n) {
    for (
        var i = window.atob(n), r = i.length, u = new Uint8Array(r), t = 0; t < r; t++
    )
        u[t] = i.charCodeAt(t);
    return u.buffer;
}

function SysCheckDirtyFields(n) {
    SysIsDirty() || SysSet(n, "1");
}

function ShowItemsNotification(n, t, i) {
    var r = n.document.getElementById(t);
    r != null &&
        (i > 0 ?
            ((r.style.visibility = "visible"), (r.innerHTML = i)) :
            (r.style.visibility = "hidden"));
}

function HighlightWorkflowLink(n, t, i, r) {
    var u = top.Products,
        f,
        e,
        o,
        s,
        h;
    u != null &&
        (ShowItemsNotification(u, "workflowUnread", n),
            ShowItemsNotification(u, "workflowUnreadDockCollapse", n),
            r != "" &&
            (ShowItemsNotification(u, "calendarUnread", i),
                ShowItemsNotification(u, "calendarUnreadDockCollapse", i)),
            (f = u.document.getElementById("WorkflowCalendarUnread")),
            f != null &&
            (r == "" ?
                ((o = u.document.getElementById("calendarUnread")),
                    (i = o == null ? 0 : o.innerHTML == "" ? 0 : parseInt(o.innerHTML)),
                    (e = i + n)) :
                (e = i + n),
                (s = $(u.document.getElementById("hdnDockMenu")).val()),
                (h = $(u.document.getElementById("divMenuNav")).css("display")),
                e > 0 && s != "1" && s != "2" && s != "" && h == "none" ?
                ((f.style.visibility = "visible"), (f.innerHTML = e)) :
                ((f.style.visibility = "hidden"), (f.innerHTML = 0))));
}

function ButtonBarToggleState(n) {
    var t = document.getElementById("expandCollapseImg"),
        i = $("div.exButtonBar button[show=false]");
    t != null &&
        (i != null) & (i.length > 0) &&
        $(i).each(function(r) {
            var u;
            $(t).hide();
            r == 0 &&
                (n === !0 ?
                    ((u = $(t).attr("onclick")),
                        u != null && (u = u.replace("ButtonBarToggleState(true);", "")),
                        $(t).attr("onclick", "ButtonBarToggleState(false);" + u),
                        $(t).attr("class", "Icon buttonStyleOver expandCollapseSVGOver")) :
                    ((u = $(t).attr("onclick")),
                        u != null && (u = u.replace("ButtonBarToggleState(false);", "")),
                        $(t).attr("onclick", "ButtonBarToggleState(true);" + u),
                        $(t).attr("class", "Icon buttonStyle expandCollapseSVG")));
            $(this).fadeToggle("fast", function() {
                r == i.length - 1 &&
                    ($(t).show(),
                        n === !0 ?
                        convertToInlineSVG(t, "images/hideleft.svg") :
                        convertToInlineSVG(t, "images/showleft.svg"));
            });
        });
}

function ToggleExpandCollapse(n, t, i, r, u) {
    var f = document.getElementById(n),
        e = document.getElementById(t);
    f != null &&
        e != null &&
        (u === !0 ?
            (i != null && convertToInlineSVG(f, i),
                $(e).fadeToggle("fast", function() {
                    i == null && $(f).hide();
                })) :
            (r != null && convertToInlineSVG(f, r),
                $(e).fadeToggle("fast", function() {
                    r == null && $(f).hide();
                })));
}

function setSearchListViewMode(n, t) {
    SysSet(n, t);
}

function switchViewModeCSS() {
    var n = $(".ViewModeSelected"),
        t = $(".ViewModeIcons");
    n.each(function() {
        $(this).attr("class", "ViewModeIcons");
    });
    t.each(function() {
        $(this).attr("class", "ViewModeSelected");
    });
}

function setCompactViewClass() {
    $(window).width() < 1024 ?
        ($("div.divCompactCol").removeClass("divColOneMarginIE9"),
            $("div.divCompactCol").removeClass("divHalfedCompactCol"),
            $("div.divCompactCol").addClass("divFullCompactCol"),
            $("div.divCompactCol").addClass("divFloatLeft")) :
        $(window).width() >= 1024 &&
        ($("div.divCompactCol").removeClass("divColOneMargin"),
            $("div.divCompactCol").removeClass("divFloatLeft"),
            $("div.divCompactCol").addClass("divColOneMarginIE9"),
            $("div.divCompactCol").removeClass("divFullCompactCol"),
            $("div.divCompactCol").addClass("divHalfedCompactCol"));
}

function setCompactViewBorder() {
    $(document).ready(function() {
        setCompactViewClass();
        $(document).on("touchstart", function() {
            if (docDialogID != null) {
                var t = $(".SearchAllDocument").toArray(),
                    n = $.grep(t, function(n) {
                        return n.id == docDialogID + "_SearchAllDocument";
                    });
                n.length == 1 && ((n[0].style.display = "none"), (docDialogID = null));
            }
        });
        SetFilterSectionHeight($(window).width());
    });
    $(this).resize(function() {
        setCompactViewClass();
    });
}

function FilterSectionEvents() {
    $(function() {
        var n = $(window).width();
        SetFilterSectionHeight(n);
        $(".SearchAllCollapseBar").click(function() {
            ShowHideSearchFilter();
        });
        $(".SearchFilterFields.browseFilterSelected").length == 0 &&
            $(".SearchFilterFields:first").addClass("browseFilterSelected");
        $(".SearchFilterFields").click(function() {
            $(".SearchFilterFields").toggleClass("browseFilterSelected", !1);
            $(this).toggleClass("browseFilterSelected", !0);
        });
        $(window).resize(OnSearchAllBrowserResize);
    });
}

function SetFilterSectionHeight(n) {
    var r = $("#MainResultSection"),
        u = $("#PagingSection"),
        t = $(window).height() - 83,
        i = r.height() + u.height();
    Sys.Browser.agent === Sys.Browser.Safari ?
        $(window).resize(function() {
            $(window).width() != n && setSectionHeight(t, i);
        }) :
        setSectionHeight(t, i);
}

function setSectionHeight(n, t) {
    t > n ?
        ($("#FilterPanelSection").height(t),
            $("#FilterCollapseBar").height(t),
            $("#FilterFields").height(t - 19)) :
        ($("#FilterPanelSection").height(n),
            $("#FilterCollapseBar").height($("#FilterPanelSection").height()),
            $("#FilterFields").height($("#FilterPanelSection").height() - 19));
}

function OnSearchAllBrowserResize() {
    var n = $("#FilterPanelSection"),
        t = $("#MainResultSection"),
        i = $(window).width();
    n.length > 0 &&
        ($("#FilterFields").is(":visible") ?
            i <= 770 ?
            ($(n).addClass("FilterPanelShadow"),
                $(t).addClass("DocLeftContentBlur")) :
            ($(n).removeClass("FilterPanelShadow"),
                $(t).removeClass("DocLeftContentBlur")) :
            ($(n).removeClass("FilterPanelShadow"),
                $(t).removeClass("DocLeftContentBlur")),
            SetFilterSectionHeight(i));
}

function ShowHideSearchFilter() {
    $("#FilterFields").toggle();
    var n = $("#FilterFields").is(":visible");
    $("#HideFilterPanel").toggle(n);
    $("#ShowFilterPanel").toggle(!n);
    n
        ?
        ($("#FilterPanelSection").width("184px"),
            $("#MainResultSection").width("calc(100% - 195px)"),
            $("#MainResultSection").css("position", ""),
            $("#MainResultSection").css("padding-left", "")) :
        ($("#FilterPanelSection").width("20px"),
            $("#MainResultSection").width("calc(100% - 29px)"),
            $("#MainResultSection").css("padding-left", "28px"),
            $("#PagingSection").width("calc(100% - 29px)"),
            $("#PagingSection").css("padding-left", "28px"));
    OnSearchAllBrowserResize();
}

function ToggleVisibilityTypeFields(n) {
    var i = n + "_TypeFields",
        t = document.getElementById(i);
    t != null &&
        (t.style.display == "none" ?
            ((t.style.display = "table-row"), (t.style.width = "100%")) :
            (t.style.display = "none"));
    i = n + "_BreakLine";
    t = document.getElementById(i);
    t != null &&
        (t.style.display == "none" ?
            ((t.style.display = "inline-block"), (t.style.width = "100%")) :
            (t.style.display = "none"));
}

function EnableDownloadAttachment(n, t, i) {
    var e = document.getElementById(n + "_DownloadIcon"),
        r = document.getElementById(n + "_DownloadFileName"),
        o = document.getElementById(n + "_AttachIcon"),
        u = document.getElementById(n + "_AttachFileName"),
        f = i.clientWidth;
    f < 120 && (f = 115);
    t == "true" ?
        ((r.style.width = u.clientWidth - 25 + "px"),
            (o.style.display = "none"),
            (u.style.display = "none"),
            (e.style.display = "inline-block"),
            (r.style.display = "inline-block"),
            $(i).addClass("SearchAllDownloadBackColor"),
            (i.style.width = f + "px")) :
        (r.removeAttribute("style"),
            (o.style.display = "inline-block"),
            (u.style.display = "inline-block"),
            (e.style.display = "none"),
            (r.style.display = "none"),
            $(i).removeClass("SearchAllDownloadBackColor"),
            i.removeAttribute("style"));
}

function ShowPopUpDocument(n, t, i) {
    var r = document.getElementById(n + "_SearchAllDocument");
    r != null && (r.style.display = t == "true" ? "inline-block" : "none");
    docDialogID = n;
    i.stopPropagation();
}

function loadSearchList(n, t, i) {
    var r = parent.document.getElementById("QuickSearch");
    r.value = i;
    SysSet(n, t);
    SysSet("QuickSearch", i);
    SysSubmit();
}

function SysSetSearchListResults(n, t) {
    SysShowSearchListResults(n, t, !1);
    DoPresenceControl();
}

function SysAppendSearchListResults(n, t) {
    SysShowSearchListResults(n, t, !0);
}

function SysShowSearchListResults(n, t) {
    var i = $(window).width();
    n != null &&
        $("#MainResultSection").length &&
        $("#MainResultSection").append(n);
    jQuery("img").each(function() {
        convertToInlineSVG(this);
    });
    setCompactViewBorder();
    SetFilterSectionHeight(i);
    $(window).resize(OnSearchAllBrowserResize);
    $("#" + t + "_Wait").hide();
}

function SysSearchListError() {
    SysSubmit();
}

function SysPrepareCallback() {
    __theFormPostData = "";
    __theFormPostCollection = [];
    WebForm_InitCallback();
}

function SysGetSearchListArguments(n) {
    var t, i, r;
    return (
        $("#MainResultSection").empty(),
        $("#" + n + "_Wait").show(),
        (t = ""),
        SysGet("QuickSearch") != null && (t = SysGet("QuickSearch")),
        (i = ""),
        SysGet(n + "_ViewMode") != null && (i = SysGet(n + "_ViewMode")),
        (r = ""),
        SysGet(n + "_SelectedFilterItem") != null &&
        (r = SysGet(n + "_SelectedFilterItem")),
        i + "," + t + "," + r
    );
}

function SysGetSearchListContext(n) {
    return n;
}

function ToggleDownloadAttachment(n, t) {
    var f = SysGetElement(n + "_Icon"),
        e = SysGetElement(n + "_AttachFileName"),
        i = SysGetElement(n + "_ViewIcon"),
        u = SysGetElement(n + "_DownloadIcon"),
        r = SysGetElement(n + "_FileSize");
    t == "true" ?
        (i && (i.style.display = "inline-block"),
            (u.style.display = "inline-block"),
            r != null && (r.style.display = "none")) :
        (i && (i.style.display = "none"),
            (u.style.display = "none"),
            r != null && (r.style.display = "inline"));
}

function AdjustEmbedContentToCenter(n) {
    $("#" + n.id).css("display", "");
    var t = $("#" + n.id)
        .contents()
        .find("div");
    t.length > 1 && (t[1].style.display = "inline-block");
}

function htmlDecode(n) {
    var t = n;
    return (t = t.replace(/#doubleQuot/g, '"')), t.replace(/#singleQuot/g, "'");
}

function htmlEncode(n) {
    var t = $("<div/>").text(n).html();
    return (
        (t = t.replace(/\\/g, "\\\\")),
        (t = t.replace(/\\\\/g, "\\")),
        (t = t.replace(/\'/g, "&#39")),
        t.replace(/\"/g, "&#34")
    );
}

function scriptEncode(n) {
    return (
        (n = n.replace(/\\/g, "\\\\")),
        (n = n.replace(/\"/g, "#doubleQuot")),
        n.replace(/\'/g, "#singleQuot")
    );
}

function RefreshPersonalCompanyWorkspaces(n, t, i) {
    var r = n.split("||")[0],
        u = n.split("||")[1];
    RefreshList(r, "Personal", t, i);
    RefreshList(u, "Company", t, i);
}

function RefreshList(n, t, i, r) {
    var f, u, e;
    switch (t) {
        case "Personal":
            f = "#WorkspaceListContainer";
            break;
        case "Company":
            f = "#CompanyWPListContainer";
            break;
        default:
            return !1;
    }
    r ? ((e = window.parent.$("#BodyTopMenu")), (u = e.find(f))) : (u = $(f));
    u.empty();
    u.append(n);
    u.find("img").each(function() {
        convertToInlineSVG($(this)[0]);
    });
    HighlightCheck(r);
    u.find("div#MoreLess_" + t).length > 0 &&
        ShowHideItems(u.find("div#MoreLess_" + t)[0], i, r);
}

function HighlightCheck(n) {
    var t, i;
    n
        ?
        ((i = window.parent.$("#BodyTopMenu")),
            (t = i.find(
                "#WorkspaceListContainer .WorkspaceCheck, #CompanyWPListContainer .WorkspaceCheck"
            ))) :
        (t = $(".WorkspaceCheck"));
    t.hover(
        function() {
            $(this).removeClass("workspaceItem");
        },
        function() {
            $(this).addClass("workspaceItem");
        }
    );
}

function ShowHideItems(n, t, i) {
    var h = 4,
        e = SysTerm(323, "more"),
        c = SysTerm(37752, "less"),
        l = "40",
        o = n.id,
        f = o.split("_")[1],
        r,
        u,
        s;
    i
        ?
        ((s = window.parent.$("#BodyTopMenu")),
            (r = s.find("#WorkspaceGroup_" + f)),
            (u = s.find("#" + o + " span"))) :
        ((r = $("#WorkspaceGroup_" + f)), (u = $("#" + o + " span")));
    t
        ?
        sessionStorage.getItem("IsCollapsed_" + f) == "0" ?
        (u.text(c), r.css({ height: "100%", overflow: "visible" })) :
        (u.text(e), r.css({ height: l * h + "px", overflow: "hidden" })) :
        u.text() == e ?
        (u.text(c),
            r.css({ height: "100%", overflow: "visible" }),
            Sys.Browser.agent === Sys.Browser.InternetExplorer && r.hide().show(0),
            sessionStorage.setItem("IsCollapsed_" + f, "0")) :
        (u.text(e),
            r.css({ height: l * h + "px", overflow: "hidden" }),
            sessionStorage.setItem("IsCollapsed_" + f, "1"));
}

function SysFilesFieldAddToListNewUx(n, t) {
    var s = SysGetElement(n + "_ListingSection"),
        a,
        c,
        r,
        i,
        e,
        y,
        p,
        l,
        b,
        k,
        v,
        it,
        w,
        u,
        o,
        h,
        rt,
        g,
        nt,
        f,
        tt,
        d;
    for (
        s == null && (s = SysGetElement(n.replace("$", "_") + "_ListingSection")),
        s || (s = $("[id$='_ListingSection']")[0]),
        typeof t == "undefined" && (t = SysFilesFieldGetTopFile(n)),
        a = [],
        c = SysGetElement("feed_id"),
        t.files.length > 0 &&
        typeof disablePostButton == "function" &&
        disablePostButton(),
        noOfFileUpload = 0,
        noOfFileUploadDone = 0,
        r = 0; r <= t.files.length - 1; r++
    ) {
        if (
            ((i = t.files[r].name),
                (e = document.createElement("div")),
                t.files[r].type === "" && t.files[r].size <= 0)
        ) {
            a.push(i);
            continue;
        }
        if (
            ((e.style.display = "inline"),
                (e.id = i),
                (e.title = i),
                (e.value = t.id),
                (y = document.createElement("span")),
                (y.style.paddingRight = "6px"),
                (p = document.createElement("span")),
                (p.className = "DocAttachmentUnsaveBlock"),
                (l = document.createElement("table")),
                l.setAttribute("cellspacing", 0),
                l.setAttribute("cellspadding", 0),
                (b = l.insertRow(0)),
                (k = b.insertCell(0)),
                k.setAttribute("valign", "top"),
                (v = document.createElement("span")),
                (v.className = "DocAttachmentUnsaveFileName"),
                i.length > 40 ?
                ((it = i.substring(0, 40).concat(" ...")), (v.innerHTML = it)) :
                (v.innerHTML = i),
                k.appendChild(v),
                (w = b.insertCell(1)),
                (w.style.width = "20px"),
                w.setAttribute("valign", "top"),
                (u = document.createElement("img")),
                (u.src = "images/cross.svg"),
                (u.id = "FeedDocAttachmentDeleteIcon"),
                (u.className =
                    c != null ? "FeedDocAttachmentDeleteIcon" : "DocAttachmentDeleteIcon"),
                (u.onclick = function() {
                    SysFilesFieldRemoveRowNewUx(n, this);
                }),
                w.appendChild(u),
                c != null &&
                ((o = document.createElement("div")),
                    o.setAttribute("id", "fileprogressbar"),
                    o.setAttribute("height", "1px"),
                    o.setAttribute("class", "feedfileprogressbar"),
                    o.setAttribute("style", "width: 0%;font-size: 2px;"),
                    (o.textContent = "_"),
                    l.appendChild(o)),
                p.appendChild(l),
                y.appendChild(p),
                e.appendChild(y),
                s.appendChild(e),
                i.length > 128)
        )
            return (
                s.removeChild(e),
                (h = SysFilesFieldCheckMaxFileNumberNewUx(n)),
                (d = SysFilesFieldCreateFileNewUx(n, h)),
                SysAlert(
                    0,
                    SysTerm(409, "Attachment filename") +
                    " : " +
                    SysTerm(18637, "Exceeded") +
                    " - " +
                    SysTerm(33551, "Max. number of characters") +
                    "(128)"
                ), !1
            );
        if (
            (filesToUpload.push({ fileObject: t.files[r], fileControlID: t.id }),
                (rt = SysGetFileSize(t)),
                (g = SysFilesFieldCheckMaxFileSize(n, rt)),
                g ||
                ((f = SysGetElement(n + "_MaxFileSize")),
                    SysAlert(0, i + " exceeds " + SysConvertFileSizeFromBytes(f.value)),
                    SysFilesFieldRemoveRowNewUx(n, u)),
                (nt = SysFilesFieldCheckMaxTotalFileSize(n)), !nt)
        ) {
            f = SysGetElement(n + "_MaxTotalFileSize");
            f == null &&
                (f = SysGetElement(n.replace("_", "$") + "_MaxTotalFileSize"));
            f || (f = $("[id$='_MaxTotalFileSize']")[0]);
            SysAlert(
                0,
                SysTerm(42842, "The size of your attachments should not exceed") +
                " " +
                SysConvertFileSizeFromBytes(f.value)
            );
            SysFilesFieldRemoveRowNewUx(n, u);
            break;
        }
        tt = SysFilesFieldCheckFileFormat(n, i);
        tt || (a.push(i), SysFilesFieldRemoveRowNewUx(n, u));
        h && (h = SysFilesFieldCheckMaxFileNumberNewUx(n));
        g &&
            nt &&
            tt &&
            c != null &&
            (r == t.files.length - 1 ?
                SysFileUpload(c.value, t.files[r], t.id) :
                SysFileUpload(c.value, t.files[r], t.id));
    }
    return (
        a.length != 0 && SysDisplayInvalidFormatMsg(a),
        (d = SysFilesFieldCreateFileNewUx(n, h)), !1
    );
}

function SysOneDriveAddToList(n, t) {
    var i = "FileAttachments",
        r,
        b,
        c,
        u,
        f,
        l,
        a,
        o,
        y,
        p,
        s,
        k,
        v,
        e,
        h,
        w;
    for (
        t != null && (i = t),
        r = SysGetElement(i + "_ListingSection"),
        r == null && (r = SysGetElement(i.replace("$", "_") + "_ListingSection")),
        r || (r = $("[id$='_ListingSection']")[0]),
        b = SysGetElement("feed_id"),
        noOfFileUpload = 0,
        noOfFileUploadDone = 0,
        c = 0; c <= n.value.length - 1; c++
    )
        if (
            ((u = n.value[c].name),
                (f = document.createElement("div")),
                (f.style.display = "inline"),
                (f.id = u),
                (f.title = u),
                (l = document.createElement("span")),
                (l.style.paddingRight = "6px"),
                (a = document.createElement("span")),
                (a.className = "DocAttachmentUnsaveBlock"),
                (o = document.createElement("table")),
                o.setAttribute("cellspacing", 0),
                o.setAttribute("cellspadding", 0),
                (y = o.insertRow(0)),
                (p = y.insertCell(0)),
                p.setAttribute("valign", "top"),
                (s = document.createElement("span")),
                (s.className = "DocAttachmentUnsaveFileName"),
                u.length > 40 ?
                ((k = u.substring(0, 40).concat(" ...")), (s.innerHTML = k)) :
                (s.innerHTML = u),
                p.appendChild(s),
                (v = y.insertCell(1)),
                (v.style.width = "20px"),
                v.setAttribute("valign", "top"),
                (e = document.createElement("img")),
                (e.src = "images/cross.svg"),
                (e.id = "FeedDocAttachmentDeleteIcon"),
                (e.className =
                    b != null ? "FeedDocAttachmentDeleteIcon" : "DocAttachmentDeleteIcon"),
                (e.onclick = function() {
                    SysFilesFieldRemoveRowNewUx(i, this);
                }),
                v.appendChild(e),
                a.appendChild(o),
                l.appendChild(a),
                f.appendChild(l),
                r.appendChild(f),
                u.length > 128)
        )
            return (
                r.removeChild(f),
                (h = SysFilesFieldCheckMaxFileNumberNewUx(i)),
                (w = SysFilesFieldCreateFileNewUx(i, h)),
                SysAlert(
                    0,
                    SysTerm(409, "Attachment filename") +
                    " : " +
                    SysTerm(18637, "Exceeded") +
                    " - " +
                    SysTerm(33551, "Max. number of characters") +
                    "(128)"
                ), !1
            );
    return (w = SysFilesFieldCreateFileNewUx(i, h)), !1;
}

function SysFilesFieldGetFileNumberNewUx(n) {
    var t = SysGetElement(n + "_ListingSection");
    return (
        t == null && (t = SysGetElement(n.replace("$", "_") + "_ListingSection")),
        t || (t = $("[id$='_ListingSection']")[0]),
        t != null ? t.childNodes.length : 0
    );
}

function SysFilesFieldCheckMaxFileNumberNewUx(n) {
    var i = SysGetElement(n + "_ListingSection"),
        t;
    return (i == null &&
            (i = SysGetElement(n.replace("$", "_") + "_ListingSection")),
            i || (i = $("[id$='_ListingSection']")[0]),
            (t = SysGetElement(n + "_MaxFileNumber")),
            t == null && (t = SysGetElement(n.replace("$", "_") + "_MaxFileNumber")),
            t == null && (t = SysGetElement(n.replace("_", "$") + "_MaxFileNumber")),
            t || (t = $("[id$='_MaxFileNumber']")[0]),
            t.value <= 0) ?
        !0 :
        i.childNodes.length >= t.value ?
        !1 :
        !0;
}

function SysFilesFieldCreateFileNewUx(n, t) {
    var f = SysGetElement(n + "_divFile"),
        i,
        u,
        e,
        r;
    return (
        f == null && (f = SysGetElement(n.replace("_", "$") + "_divFile")),
        (i = SysGetElement(n + "_FileCount")),
        i || (i = $("[id$='_FileCount']")[0]),
        i == null ?
        ((i = SysGetElement(n.replace("_", "$") + "_FileCount")),
            (i.value = parseInt(i.value) + 1),
            (u = n.replace("_", "$") + "_File" + i.value)) :
        ((i.value = parseInt(i.value) + 1), (u = n + "_File" + i.value)),
        (e = SysFilesFieldGetTopFile(n)),
        (r = document.createElement("input")),
        (r.id = r.name = u),
        (r.type = "file"),
        (r.style.width = "100%"),
        (r.style.display = ""),
        (r.multiple = !0),
        (r.onchange = function() {
            SysFilesFieldAddFile(n, 1);
        }),
        t == !1 && (r.disabled = "true"),
        f.appendChild(r),
        e != null && (e.style.display = "none"),
        r
    );
}

function SysFilesFieldRemoveRowNewUx(n, t) {
    var r = SysGetElement(n + "_ListingSection"),
        e,
        o,
        u,
        f,
        i,
        c,
        s,
        h;
    for (
        r == null && (r = SysGetElement(n.replace("$", "_") + "_ListingSection")),
        r || (r = $("[id$='_ListingSection']")[0]),
        e =
        t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode,
        o =
        t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        .parentNode.title,
        i = 0; i <= filesToUploadAttachmentid.length - 1; i++
    )
        (u = filesToUploadAttachmentid[i].fileObject),
        (f = filesToUploadAttachmentid[i].fileControlID),
        f == e.value &&
        u.name == o &&
        (SysRemoveFileUpload(u, f), filesToUpload.splice(i, 1));
    if (!filesToUploadAttachmentid.length && filesToUpload.length)
        for (i = 0; i <= filesToUpload.length - 1; i++)
            (u = filesToUpload[i].fileObject),
            (f = filesToUpload[i].fileControlID),
            f == e.value && u.name == o && filesToUpload.splice(i, 1);
    typeof DeleteVirtualFiles != "undefined" &&
        $.isFunction(DeleteVirtualFiles) &&
        DeleteVirtualFiles(o);
    typeof SetFeedTabStatus == "function" && SetFeedTabStatus();
    r.removeChild(e);
    c = SysFilesFieldCheckMaxFileNumberNewUx(n);
    c && ((s = SysFilesFieldGetTopFile(n)), s != null && (s.disabled = ""));
    h = SysGetElement(n + "_FileNumber");
    h != null && SysSetInnerText(h, SysFilesFieldGetFileNumberNewUx(n));
}

function SysFilesFieldRemoveAllRowNewUx(n, t) {
    var i = SysGetElement(n + "_ListingSection"),
        r,
        e,
        u,
        f;
    if (
        (i == null && (i = SysGetElement(n.replace("$", "_") + "_ListingSection")),
            i || (i = $("[id$='_ListingSection']")[0]),
            (r = SysGetElement("feed_id")),
            r != null &&
            (t &&
                ($("#FeedTypeTabSelected").val() != "7" ?
                    SysRemoveAllFileUpload(r.value) :
                    RemoveNewsFeedAttachedObject()),
                (filesToRemoveAll = filesToUpload.slice(0)),
                filesToUpload.splice(0, filesToUpload.length),
                filesToUploadAttachmentid.splice(0, filesToUploadAttachmentid.length)),
            i)
    )
        while (i.firstChild) i.removeChild(i.firstChild);
    e = SysFilesFieldCheckMaxFileNumberNewUx(n);
    e && ((u = SysFilesFieldGetTopFile(n)), u != null && (u.disabled = ""));
    f = SysGetElement(n + "_FileNumber");
    f != null && SysSetInnerText(f, SysFilesFieldGetFileNumberNewUx(n));
    typeof SetFeedTabStatus == "function" && SetFeedTabStatus();
}

function ResourceHoverCardRemove(n) {
    vpersonlink = n.currentTarget;
    position = vpersonlink;
    height = vpersonlink.offsetHeight;
    width = vpersonlink.offsetWidth;
    $(document).mousemove(function(n) {
        if ($(".popper").length > 0) {
            var i = $(".popper"),
                t = i.offset(),
                r = i.height(),
                u = i.width();
            (n.pageX < position.offsetLeft - 10 ||
                n.pageX > position.offsetLeft + width + 10 ||
                n.pageY < position.offsetTop - 10 ||
                n.pageY > position.offsetTop + height + 10) &&
            (n.pageX < t.left - 5 ||
                n.pageX > t.left + u - 10 ||
                n.pageY < t.top - 5 ||
                n.pageY > t.top + r + 10) &&
            setTimeout(function() {
                $(".popper").remove();
                $(document).off("mousemove");
            }, 1);
        }
    });
}

function offset(n) {
    var t = (ot = 0);
    if (n.offsetParent)
        do(t += n.offsetLeft), (ot += n.offsetTop);
        while ((n = n.offsetParent));
    return { left: t, top: ot };
}

function isMobileBrowser() {
    return "ontouchstart" in window;
}

function ResourceHoverCard(n) {
    var f,
        o,
        t,
        r,
        s,
        h,
        e,
        c,
        l,
        a,
        v,
        y,
        p,
        ft,
        et,
        ot,
        st,
        ht,
        ct,
        u,
        i,
        w,
        b,
        k,
        d,
        g,
        nt,
        tt,
        it,
        lt,
        rt,
        ut;
    if (
        ($(document).off("mousemove"), iload == 0) &&
        ((vpersonlink = n.currentTarget),
            (popperHostElement = $(document.body)["0"]), !(n.currentTarget.href.indexOf("SCPersonalTimeline.aspx") < 0)) &&
        !($(".popper").length > 0)
    ) {
        if (
            ($(".popper").remove(),
                (iload = 1),
                (f = 0),
                (t = n.currentTarget.href.match(/ID=([0-9]+)/)[1]),
                resHoverCard.length > 0)
        )
            for (r = 0; r <= resHoverCard.length - 1; r++)
                if (t == resHoverCard[r].id)
                    if (resHoverCard[r].pageObject["0"].children[1].children.length == 0)
                        resHoverCard.splice(r, 1), (f = 0);
                    else {
                        o = resHoverCard[r].pageObject;
                        o["0"].outerHTML.indexOf("isThumbnail=0&amp;ID=" + t) > 0 &&
                            (f = 1);
                        break;
                    }
        else f = 0;
        s = document.createElement("div");
        f == 1 ?
            (popperHostElement.appendChild(o["0"]),
                ($(".popper")["0"].style.top = "-2000px")) :
            ((s.className = "popper"),
                popperHostElement.appendChild(s),
                ($(".popper")["0"].style.top = "-2000px"),
                (window.onbeforeunload = !0),
                (h = document.createElement("div")),
                (h.className = "popper__arrow"),
                $(".popper", popperHostElement).append(h),
                (e = document.createElement("div")),
                (e.className = "popper__content"),
                (e.id = "popper" + t),
                $(".popper", popperHostElement).append(e),
                (c = document.createElement("div")),
                (c.className = "Mon_Documents"),
                (l = document.createElement("div")),
                (l.className = "Mon_Projects"),
                (a = document.createElement("div")),
                (a.className = "Mon_Workflow"),
                (v = document.createElement("div")),
                (v.className = "Mon_Planning"),
                (y = document.createElement("div")),
                (y.className = "Mon_Accounts"),
                (p = document.createElement("div")),
                (p.className = "Mon_Items"),
                (i = document.createElement("table")),
                (i.className = "bottomhover"),
                (i.id = "bottomhover" + t),
                (i.align = "center"),
                (i.style.paddingTop = "2px"),
                (i.style.paddingLeft = "25px"),
                (i.width = "600px"),
                (u = i.insertRow(0)),
                (ft = u.insertCell(0).appendChild(c)),
                (et = u.insertCell(1).appendChild(l)),
                (ot = u.insertCell(2).appendChild(a)),
                (st = u.insertCell(3).appendChild(v)),
                (ht = u.insertCell(4).appendChild(y)),
                (ct = u.insertCell(5).appendChild(p)),
                jQuery.ajax({
                    url: "HRMResourceCard.aspx?ID=" + t + "&hovercard=1",
                    success: function(n) {
                        var r = $("<div>").html(
                            n
                            .replace("saveHistory", "poppersaveHistory")
                            .replace(
                                'class="CardSummaryTitle"',
                                'class="popperCardSummaryTitle"'
                            )
                            .replace(
                                new RegExp('class="Field" colspan="2"', "g"),
                                'class="popperField" colspan="2"'
                            )
                            .replace(
                                new RegExp('class="Field" colspan="3"', "g"),
                                'class="popperField" colspan="3"'
                            )
                            .replace(
                                new RegExp('class="Field"', "g"),
                                'class="Field" style="text-align:left;"'
                            )
                            .replace(
                                'class="Form" id="csPicture"',
                                'class="FormPopper" id="csPicture' + t + '"'
                            )
                            .replace(
                                'class="Form" id="csPictureCol"',
                                'class="Form" id="csPictureCol' +
                                t +
                                '" style="table-layout:fixed;width:100%;margin:0;"'
                            )
                            .replace(
                                new RegExp('class="Label"', "g"),
                                'class="Label" style="white-space:normal"'
                            )
                            .replace(
                                'id="cfViewTimeline"',
                                'id="csViewTimeline' + t + '" cellpadding="0" cellspacing="0"'
                            )
                            .replace('style="width:20%;"', "")
                            .replace('style="width:70%;"', "")
                            .replace("PicProfile", "popperPicProfile")
                            .replace('col style="width:200px;"', "col style")
                            .replace(
                                'class="CardSummaryPic"',
                                'class="CardSummaryPic" style="vertical-align:middle;padding-top:0px;padding-left:0px"'
                            )
                        );
                        w = r.find("#csPicture" + t);
                        $popperPicProfile = r.find(".popperPicProfile");
                        b = r.find("#Mon_Documents").find("a")[1];
                        k = r.find("#Mon_Projects").find("a")[1];
                        d = r.find("#Mon_Workflow").find("a")[1];
                        g = r.find("#Mon_Planning").find("a")[1];
                        nt = r.find("#Mon_Accounts").find("a")[1];
                        tt = r.find("#Mon_Items").find("a")[1];
                        $(".popper__content")
                            .append(w)
                            .append(
                                "<table class='bottomhoverline' id='bottomhoverline" +
                                t +
                                "' align='center' width='600px' style='border-bottom: thin solid #cccccc'><tr><td><td></tr></table>"
                            )
                            .append(i);
                        $(".Mon_Documents").append(b);
                        $(".Mon_Projects").append(k);
                        $(".Mon_Workflow").append(d);
                        $(".Mon_Planning").append(g);
                        $(".Mon_Accounts").append(nt);
                        $(".Mon_Items").append(tt);
                    },
                    async: !1,
                }));
        it = $(".ui-dialog").length > 0 ? $("#nanoContentDiv")[0] : "viewport";
        lt = new Popper(vpersonlink, $(".popper", popperHostElement), {
            placement: "bottom",
            modifiers: {
                flip: { behavior: ["left", "bottom", "top"] },
                preventOverflow: { boundariesElement: it },
                arrow: { element: "[x-arrow]" },
                offset: {
                    fn: function(n) {
                        if (
                            $(".ui-dialog").length > 0 &&
                            n.instance.options.modifiers.preventOverflow.boundariesElement ==
                            "viewport"
                        ) {
                            if (n.instance.reference.parentNode.className == "membersCard")
                                return n;
                            n.offsets.popper.left = n.offsets.reference.left;
                            $("#GroupActivityFeedTopPanel").length > 0 &&
                                (n.offsets.popper.top += $(
                                    "#GroupActivityFeedTopPanel"
                                )[0].clientHeight);
                        }
                        return n;
                    },
                },
            },
        });
        $(".ui-dialog").length > 0 ?
            ((rt = offset(n.currentTarget).left - offset($(".ui-dialog")[0]).left),
                (ut =
                    offset(n.currentTarget).left - offset($(".WallContainer")[0]).left),
                ($(".popper__arrow")["0"].style.left =
                    n.currentTarget.offsetWidth / 2 + rt < 300 ?
                    ut + n.currentTarget.offsetWidth / 2 - 10 + "px" :
                    n.currentTarget.offsetWidth / 2 + offset(n.currentTarget).left >
                    $(window).width() - 315 ?
                    offset(n.currentTarget).left - ($(window).width() - 615) + "px" :
                    "295px")) :
            ($(".popper__arrow")["0"].style.left =
                n.currentTarget.offsetWidth / 2 + offset(n.currentTarget).left < 300 ?
                offset(n.currentTarget).left +
                n.currentTarget.offsetWidth / 2 -
                10 +
                "px" :
                n.currentTarget.offsetWidth / 2 + offset(n.currentTarget).left >
                $(window).width() - 315 ?
                offset(n.currentTarget).left - ($(window).width() - 615) + "px" :
                "295px");
        iload = 0;
        f == 0 &&
            (resHoverCard.length > 5 && resHoverCard.splice(0, 1),
                resHoverCard.push({
                    id: t,
                    pageObject: $(".popper", popperHostElement),
                }));
    }
}

function PreviewFeedAttachment(n, t, i, r, u) {
    var h = screen.width * 0.7,
        s = screen.height * 0.7,
        l = s - 10,
        c =
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
        navigator.userAgent.match(/AppleWebKit/),
        o = n.slice(-3),
        f,
        e;
    o = o.toLowerCase();
    c && o == "pdf" ?
        ((e = getDesiredPopupSize({
                widthPercentage: 0.8,
                heightPercentage: 0.8,
            })),
            SysShowModalPopup(
                "FeedAttachmentPreview.aspx?ACTION=PREVIEW&AttID=" + t + "&Type=P",
                null,
                e.width,
                e.height
            )) :
        u ?
        ((f = window.open(
                "empty.html",
                "",
                "height=" +
                s +
                ",width=" +
                h +
                ",menubar=0,menubar=0,resizable=1,scrollbars=0,titlebar=0,status=1"
            )),
            f.document.write("<html>"),
            f.document.write("<head>"),
            f.document.write("<title>" + unescape(n) + "</title>"),
            f.document.write("</head>"),
            f.document.write("<body >"),
            o == "pdf" ?
            f.document.write(
                '<iframe style="position: absolute; height: 99%; border: none; margin-bottom: 15px;margin-right: 15px;" width=99% scrolling=yes frameborder=0 noresize=noresize src="DocBinBlob.aspx?ACTION=PREVIEW&AttID=' +
                t +
                '&Type=P">'
            ) :
            f.document.write(
                '<iframe sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-top-navigation" style="position: absolute; height: 99%; border: none; margin-bottom: 15px;margin-right: 15px;" width=99% scrolling=yes frameborder=0 noresize=noresize src="DocBinBlob.aspx?ACTION=PREVIEW&AttID=' +
                t +
                '&Type=P">'
            ),
            f.document.write("</iframe>"),
            f.document.write("</body>"),
            f.document.write("</html>")) :
        ((e = getDesiredPopupSize({
                widthPercentage: 0.8,
                heightPercentage: 0.8,
            })),
            SysShowModalPopup(
                "FeedAttachmentPreview.aspx?ACTION=PREVIEW&AttID=" +
                t +
                "&Type=P&isImage=" +
                u,
                null,
                e.width,
                e.height
            ));
}

function SysPreviewAttachment(n, t, i, r) {
    var e = screen.width * 0.7,
        o = screen.height * 0.7,
        f = n.slice(-3),
        u;
    f = f.toLowerCase();
    var h = navigator.userAgent.toLowerCase(),
        s = function(n) {
            return n.test(h);
        },
        c = !s(/chrome/) && s(/safari/);
    c && f == "pdf" ?
        (u = window.open(
            "DocBinBlob.aspx?ACTION=PREVIEW&ID=" + r + "&AttID=" + t,
            "",
            "height=" +
            o +
            ",width=" +
            e +
            ",menubar=0,menubar=0,resizable=1,scrollbars=1,titlebar=0,status=1"
        )) :
        ((u = window.open(
                "empty.html",
                "",
                "height=" +
                o +
                ",width=" +
                e +
                ",menubar=0,menubar=0,resizable=1,scrollbars=1,titlebar=0,status=1"
            )),
            u.document.write("<html>"),
            u.document.write("<head>"),
            u.document.write(
                '<link id="ExactCSS" rel="stylesheet" type="text/css" href="exact.css"></link>'
            ),
            u.document.write("<title>" + unescape(n) + "</title>"),
            u.document.write("</head>"),
            f != "pdf" ?
            u.document.write('<frameset rows="25px,*" frameborder=0>') :
            u.document.write('<frameset rows="0%,*" frameborder=0>'),
            u.document.write(
                '<frame name="upper" noresize="noresize" scrolling=no style="margin: 2px 10px;"></frame>'
            ),
            u.document.write(
                '<frame name="lower" style="margin: 15px;" src="DocBinBlob.aspx?ACTION=PREVIEW&ID=' +
                r +
                "&AttID=" +
                t +
                '"></frame>'
            ),
            u.document.write("</frameset>"),
            u.document.write("</html>"),
            u.frames[0].document.write("<html>"),
            u.frames[0].document.write("<head>"),
            u.frames[0].document.write(
                '<link id="ExactCSS" rel="stylesheet" type="text/css" href="exact.css"></link>'
            ),
            u.frames[0].document.write("</head>"),
            u.frames[0].document.write("<body>"),
            u.frames[0].document.write('<div class="HdrProps">'),
            u.frames[0].document.write(
                '<table style="background-color: #e5e5e5; border: 0; padding: 3px; width: 100%;">'
            ),
            u.frames[0].document.write("<tr>"),
            u.frames[0].document.write(
                '<td style="width: 4%; height: 40%; text-align: center;" >'
            ),
            u.frames[0].document.write(
                "<a href=\"javascript:parent['lower'].focus();parent['lower'].print();\">"
            ),
            u.frames[0].document.write("<b>Print</b>"),
            u.frames[0].document.write("</a>"),
            u.frames[0].document.write('</td><td style="width: 10%;">'),
            u.frames[0].document.write(
                '<a ID="download" href="DocBinBlob.aspx?DOWNLOAD=1&ID=' +
                r +
                "&AttID=" +
                t +
                '">'
            ),
            u.frames[0].document.write("<b>Download</b>"),
            u.frames[0].document.write("</a>"),
            u.frames[0].document.write(
                '</td><td style="width: 80%;">&nbsp</td></tr></table>'
            ),
            u.frames[0].document.write("</div>"),
            u.frames[0].document.write("</body>"),
            u.frames[0].document.write("</html>"));
}

function SysDownloadAttachment(n) {
    var i = navigator.userAgent.toLowerCase(),
        t = function(n) {
            return n.test(i);
        },
        r = !t(/chrome/) && t(/safari/),
        u;
    r ? (u = window.open(n)) : (location.href = n);
}

function IsAccessByBrowserBackButton() {
    if (!!window.performance && window.performance.navigation.type === 2)
        return !0;
}

function CheckToggleForNewAttachments() {
    var n, t;
    if (filesToUpload.length > 0)
        for (n = 0; n < filesToUpload.length; n++)
            (t = filesToUpload[n].fileObject.name), ToggleNewsAttImgSection(t);
}

function ToggleNewsAttImgSection(n) {
    var r = n.lastIndexOf("."),
        t = n.substring(r, n.length),
        i = GetFileType(t.toLowerCase());
    i === "image" || (i === "non_image" && t === ".svg") ?
        $("#NewsAttImgSwitchSection").css("display", "inline-flex") :
        $("#NewsAttFileSwitchSection").css("display", "inline-flex");
}

function GetFileType(n) {
    switch (n) {
        case ".bmp":
        case ".ico":
        case ".jpe":
        case ".jpg":
        case ".jpeg":
        case ".gif":
        case ".tif":
        case ".tiff":
        case ".png":
            return "image";
        default:
            return "non_image";
    }
}

function SysStringTruncate(n, t) {
    return n == null ? "" : n.length > t ? n.substr(0, t - 1) + "..." : n;
}

function AdjustMembersList() {
    var t = $("div.membersCard").length,
        u;
    $("div.membersCard").css("display", "none");
    $("div.membersCard").css("margin-right", "0px");
    var i = $("#div_GroupActivityFeedProperties").innerWidth() - 5,
        n = Math.floor(i / 50),
        r = 0;
    t < n && (n = t);
    t > n && (r = (i - 53 * n) / (n - 1));
    u = 5 + r;
    $("div.membersCard:lt(" + (n - 1) + ")").css("margin-right", u + "px");
    $("div.membersCard:lt(" + n + ")").show();
}

function getParameterByName(n) {
    var i = "[\\?&]" + n + "=([^&#]*)",
        r = new RegExp(i),
        t = r.exec(window.location.search);
    return t == null ? "" : decodeURIComponent(t[1].replace(/\+/g, " "));
}

function GetDefaultGroupImg(n) {
    $(n).attr("src", "./images/collaboration_filled.svg");
    convertToInlineSVG(n);
    $("#GroupImage_ImgDeleteIcon") != null &&
        $("#GroupImage_ImgDeleteIcon").css("display", "none");
}

function RemoveGroupImgDeleteIcon() {
    $("#GroupImage_ImgDeleteIcon") != null &&
        $("#GroupImage_ImgDeleteIcon").css("display", "none");
    $("#DNGImage_ImgDeleteIcon") != null &&
        $("#DNGImage_ImgDeleteIcon").css("display", "none");
}

function GetDNGImg(n, t) {
    t
        ?
        $(n).attr("src", "./images/news-group.svg") :
        $(n).attr("src", "./images/collaboration_filled.svg");
    convertToInlineSVG(n);
}

function GetDefaultPersonImg(n) {
    $(n).attr("src", "./images/default_profile.svg");
    convertToInlineSVG(n);
}

function handleDNGImg(n) {
    var t = null;
    n == "newsLogoImg" ?
        ((t = document.getElementsByClassName(n)),
            $(t).attr("src", "./images/news.svg")) :
        ((t = document.getElementById(n)),
            $(t).attr("src", "./images/news-group.svg"));
    t != null && convertToInlineSVG(t);
}

function HighlightHashtagText(n) {
    n.parent().parent().find(".txtarea-highlighter").css("width", n.css("width"));
    var t = regex_escape(n.val());
    n.parent().parent().find(".txtarea-highlighter").html(t);
}

function regex_escape(n) {
    n = n.replace(new RegExp("<", "g"), "?");
    var t = new XRegExp(
        "(^|[^\\p{L}0-9_!@&_<]|[!])(#[\\p{L}]+[\\p{L}0-9_]*)|(^|[^0-9\\p{L}@&_<]|[!])(#[0-9_]+[\\p{L}]+[\\p{L}0-9_]*)",
        "igm"
    );
    return XRegExp.replace(n, t, function(n, t, i, r, u) {
        return typeof i == "undefined" ?
            u.length > 140 ?
            u :
            r + '<span class="txtareahighlight">' + u + "</span>" :
            i.length > 140 ?
            i :
            t + '<span class="txtareahighlight">' + i + "</span>";
    });
}

function AdjustGridMonitor() {
    var l = 12,
        u,
        e = 70,
        f,
        t = $(".CardGridMonitor"),
        i,
        a,
        n,
        r,
        o,
        s,
        h,
        c;
    t.length != 0 &&
        (t.scrollTop(0),
            (i = t.innerWidth()),
            (a = t.innerHeight()),
            (f = t[0].children[0].children[0].childElementCount),
            (n = f),
            i < 80 * n && (n = Math.floor(i / 81)),
            (r = 0),
            n != 0 && (r = Math.ceil(f / n)),
            (n = Math.ceil(f / r)),
            (u = Math.floor(i / n)),
            (o = (u + 1) * n),
            o > i && (u = (i - n) / n),
            t.find(".GridMonitorItemInfo").each(function(t) {
                $(this).css({ height: e + "px", width: u + "px", "font-size": l + "px" });
                h = Math.floor(t / n) + 1;
                h < r ?
                    $(this).css("border-bottom", "1px solid #CCCCCC") :
                    $(this).css("border-bottom", "none");
                s = t % n;
                s < n - 1 ?
                    $(this).css("border-right", "1px solid #CCCCCC") :
                    $(this).css("border-right", "none");
                AdjustGridTitleLength($(this), 25);
            }),
            (c = r * e + (r - 1)),
            $(".CardGridMonitor").css("display", "block"),
            $(".CardGridMonitor").css("height", c + "px"));
}

function AdjustGridTitleLength(n, t) {
    var i = n[0].querySelector("span");
    i.innerText.length < 15 ||
        Math.abs(i.scrollHeight - i.offsetHeight) < 3 ||
        (i.scrollHeight > i.offsetHeight &&
            ((i.innerText = $.trim(n[0].title)
                    .substring(0, t)
                    .split(" ")
                    .slice(0, -1)
                    .join(" ")),
                (i.innerText += "..."),
                AdjustGridTitleLength(n, t - 5)));
}

function HlpShowPopUp() {
    SysShowModal("HlpTipPopUp.aspx", "", "550px", "200px", null, 1);
}

function HlpGlossary(n) {
    SysShowModal(
        "HlpGlossaryPopUp.aspx?term=" + n,
        "",
        "300px",
        "250px",
        null,
        1
    );
}

function SysSearch(n) {
    document.location = "SysSearch.aspx?text=" + n;
}

function HlpDocument(n) {
    var t = window.open(
        "HlpDocument.aspx?Mode=5&helpid=" + n,
        "EOLHELP",
        "width=800,height=500,resizable=yes,scrollbars=yes,status=yes,toolbar=yes,menubar=no,location=no"
    );
    if (hlpBalloonOn) {
        HlpBalloonOff();
        return;
    }
    t != null && t.focus();
}

function HlpBalloonOff() {
    document.body.runtimeStyle.cursor = "default";
    hlpBalloonOn = !1;
}

function HlpBalloon(n, t) {
    var r, i, u;
    if ((SysMenuHide(), hlpBalloonOn)) {
        HlpBalloonOff();
        return;
    }
    if (
        ((window.document.body.runtimeStyle.cursor = "help"),
            (hlpBalloonOn = !0),
            (r = SysCallback("hlpdocument.aspx?mode=1&helpid=" + n)),
            (i = window.createPopup()),
            (hlpBalloonCx = i),
            i.document.write(r),
            i.document.close(),
            (u = i.document.getElementById("helpBalloon")),
            u == null)
    )
        return null;
    t == null ?
        HlpBalloonAttachEvent(window.document) :
        HlpWizardAttachEvent(window.document);
}

function HlpBalloonAttachEvent(n) {
    SysAttachEvent(n, "onmouseover", function() {
        HlpBalloonMouseOver();
    });
    SysAttachEvent(n, "onmouseout", function() {
        HlpBalloonMouseOut();
    });
    SysAttachEvent(n, "onactivate", function() {
        HlpBalloonMouseOver();
    });
    SysAttachEvent(n, "onblur", function() {
        HlpBalloonMouseOut();
    });
}

function HlpGetBalloonText(n) {
    var t;
    for (
        n.id != null &&
        n.id != "" &&
        (t = hlpBalloonCx.document.getElementById(n.id)); t == null && n != null;

    )
        (n = n.parentElement),
        n != null &&
        n.id != null &&
        n.id != "" &&
        (t = hlpBalloonCx.document.getElementById(n.id));
    return t;
}

function HlpBalloonMouseOver() {
    var n, t, r, i;
    if (hlpBalloonOn && ((n = event.srcElement), n != null)) {
        if (((t = HlpGetBalloonText(n)), t == null)) return null;
        if (hlpBalloonCurrent != t.id && ((r = SysGetInnerText(t)), r != null)) {
            n = SysGetElement(t.id);
            hlpBalloonCxShow = window.createPopup();
            var u = SysLeft(n),
                f = SysBottom(n);
            hlpBalloonCxShow.show(u, f, 400, 1);
            hlpBalloonCxShow.document.write(
                '<html><head><link rel="stylesheet" type="text/css" href="SilverAndRed.css"></head><body scroll="auto" style="overflow:hidden;border-top-style: none; border-right-style: none; border-left-style: none; border-bottom-style: none"><script language="javascript" src="SysControls.js" ></script><div id="help" class="HelpBalloon">' +
                r +
                "</div></body></html>"
            );
            hlpBalloonCxShow.document.close();
            i = hlpBalloonCxShow.document.getElementById("help");
            i != null && hlpBalloonCxShow.show(u, f, i.offsetWidth, i.offsetHeight);
            hlpBalloonCurrent = t.id;
        }
    }
}

function HlpBalloonMouseOut() {
    hlpBalloonCxShow != null &&
        ((hlpBalloonCurrent = null), hlpBalloonCxShow.hide());
}

function HlpWizardStart(n, t) {
    hlpWizardctl = SysGetElement(t);
    hlpWizardctl && HlpBalloon(n, "a");
}

function HlpWizardAttachEvent(n) {
    n.id != null &&
        n.id != "" &&
        (SysAttachEvent(n, "onmouseover", function() {
                HlpWizardMouseOver();
            }),
            SysAttachEvent(n, "onmouseout", function() {
                HlpWizardMouseOut();
            }),
            SysAttachEvent(n, "onfocus", function() {
                HlpWizardMouseOver();
            }),
            SysAttachEvent(n, "onblur", function() {
                HlpWizardMouseOut();
            }));
}

function HlpWizardMouseOver() {
    var i = event.srcElement,
        n,
        t;
    if (i != null) {
        if (((n = HlpGetBalloonText(i)), n == null)) return null;
        hlpWizardCurrent != n.id &&
            ((t = SysGetInnerText(n)),
                t != null &&
                (SysSetInnerText(hlpWizardctl, t), (hlpWizardCurrent = n.id)));
    }
}

function HlpWizardMouseOut() {}

function HlpHtClose() {
    parent.hlpHtRunning = !1;
    parent.prtStopHelp();
}

function HlpHtStart() {
    var n, t, i;
    ((parent.hlpHtRunning = !0), (n = HlpHtDoc()), n != null) &&
    ((t = HlpHtMainDoc()), (i = HlpHtFile(t)), HlpHtSetFirstText(n, i));
}

function HlpHtFile(n) {
    var t = n.location.pathname,
        i = t.lastIndexOf("/"),
        r = t.lastIndexOf(".");
    return i < 0 || r < 0 ? null : t.substring(i + 1, r);
}

function HlpHtControl() {
    var t, n, i;
    hlpHtRunning &&
        ((t = HlpHtMainDoc()), (n = HlpHtDoc()), n != null) &&
        ((i = HlpHtFile(t)),
            HlpHtTabClose(n),
            HlpHtTabOpen(n, i),
            HlpHtAddEvents(t),
            HlpHtSetFirstText(n, i));
}

function HlpHtSetFirstText(n, t) {
    var i = n.getElementById("t" + t),
        r,
        u;
    if (i != null && i.rows.length != 0)
        for (HlpHtCloseText(n, i), r = 0; r < i.rows.length; r++)
            if (
                ((u = i.rows[r]),
                    u.className == "" && u.runtimeStyle.textDecoration != "line-through")
            ) {
                HlpHtShowText(u);
                return;
            }
}

function HlpHtDoc() {
    var n = parent.document.getElementById("Help");
    if (n != null) return n.contentWindow.document;
}

function HlpHtMainDoc() {
    var n = parent.document.getElementById("MainWindow");
    if (n != null)
        try {
            return n.contentWindow.document;
        } catch (t) {
            return null;
        }
}

function HlpHtTabClose(n) {
    var i = n.getElementById("HelpRows"),
        t,
        r,
        u;
    if (i != null)
        for (t = 0; t < i.rows.length; t++)
            (r = i.rows[t]),
            (u = r.getAttribute("ctl")),
            u != null && (r.runtimeStyle.display = "none");
}

function HlpHtTabOpen(n, t) {
    var i = n.getElementById("p" + t);
    i != null && (i.runtimeStyle.display = "block");
}

function HlpHtAddEvents(n) {
    for (var u, r, t, i = 0; i < n.forms.length; i++)
        for (u = n.forms[i], r = 0; r < u.elements.length; r++)
            (t = u.elements[r]),
            t.tagName == "BUTTON" || (t.tagName == "INPUT" && t.Type == "BUTTON") ?
            SysAttachEvent(
                t,
                "onclick",
                new Function('HlpHtHandleOnClick("' + t.id + '")')
            ) :
            SysAttachEvent(
                t,
                "onchange",
                new Function('HlpHtHandleOnChange("' + t.id + '")')
            );
}

function HlpHtHandleBrowser(n) {
    parent.hlpHtRunning && HlpHtChange(n);
}

function HlpHtHandleOnChange(n) {
    HlpHtChange(n);
}

function HlpHtHandleOnClick(n) {
    HlpHtChange(n);
}

function HlpHtChange(n) {
    var t = HlpHtScratch(n);
    t != null && (t = t.nextSibling);
    HlpHtShowText(t);
}

function HlpHtShowText(n) {
    n != null && (n = n.nextSibling);
    n != null && (n.runtimeStyle.display = "block");
}

function HlpHtSetText(n) {
    var t, i, r;
    n != null &&
        ((t = HlpHtDoc()), t != null) &&
        ((i = t.getElementById("helpText")), i != null) &&
        ((r = n.getAttribute("txt")),
            (i.innerText = r != null ? n.getAttribute("txt") : ""));
}

function HlpHtScratch(n) {
    var r = HlpHtDoc(),
        e = HlpHtMainDoc(),
        u,
        i,
        f,
        t;
    if (r != null && e != null)
        return ((u = HlpHtFile(e)),
                (i = r.getElementById("t" + u)),
                i == null || i.rows.length == 0) ?
            void 0 :
            ((t = r.getElementById("p" + u)), t == null) ?
            void 0 :
            ((f = t.getAttribute("ctl")), f == null) ?
            void 0 :
            ((t = r.getElementById("p" + f + n)),
                t == null && ((t = HlpHtFindControlRow(n, i)), t == null)) ?
            void 0 :
            (HlpHtCloseText(r, i),
                HlpHtScratchUntil(t, i),
                (t = t.nextSibling),
                (t.runtimeStyle.display = "none"),
                t);
}

function HlpHtFindControlRow(n, t) {
    for (var u, f, e, r, i = 0; i < t.rows.length; i++)
        if (((u = t.rows[i]), (f = u.getAttribute("ctlid")), f != null))
            for (e = f.split(" "), r = 0; r < e.length; r++)
                if (e[r] == n) return u;
}

function HlpHtScratchUntil(n, t) {
    for (var r, i = 0; i < t.rows.length; i++)
        if (
            ((r = t.rows[i]),
                r.className != "HelpGuideText" &&
                (r.runtimeStyle.textDecoration = "line-through"),
                r == n)
        )
            return;
}

function HlpHtCloseText(n, t) {
    for (var r, i = 0; i < t.rows.length; i++)
        (r = t.rows[i]),
        r.className == "HelpGuideText" && (r.runtimeStyle.display = "none");
}

function HlpHtMouseOver() {
    HlpHtSwitchColors(!0);
}

function HlpHtMouseOut() {
    HlpHtSwitchColors(!1);
}

function HlpHtSwitchColors(n) {
    var i = event.srcElement,
        r,
        u,
        t;
    if (((i = i.parentElement), (r = i.getAttribute("ctlid")), r != null))
        for (u = r.split(" "), t = 0; t < u.length; t++) HlpHtSwitchColor(u[t], n);
}

function HlpHtSwitchColor(n, t) {
    var r = HlpHtMainDoc(),
        i;
    r != null &&
        ((i = r.getElementById(n)),
            i != null &&
            (i.parentElement.tagName == "TD" && (i = i.parentElement),
                t ?
                SysAddClass(i, "HelpGuideSelect") :
                SysRemoveClass(i, "HelpGuideSelect")));
}
var _BINDQUERY,
    sysButtonClose,
    sysDefaultEnter,
    sysMaskPos,
    sysMaskEnd,
    SysDialog,
    sysPageUrl,
    _sysDirtyChecks,
    _sysDirtyIDs,
    sysNoBeforeUnloadCheck,
    F2pressed,
    onChangeTriggered,
    onFocusValue,
    sysInputChanged,
    clickCount,
    firstClick_MiliSeconds,
    clickCountImg,
    firstImgClick_MiliSeconds,
    sysSearchCurrent,
    sysCmxMenu,
    sysTreeLastSelected,
    SysAnimationKey,
    SysAnimationTimer,
    SysModalDialog,
    radReturnFunc,
    _SysElement,
    $addHandler2,
    menuTimeoutId,
    sysXmlHttp,
    sysXmlHttpAborted,
    docDialogID,
    vpersonlink,
    iload,
    RedirectionInGroupPopUp,
    RedirectionInEventPopUp,
    hlpBalloonCx,
    hlpBalloonOn,
    hlpBalloonCxShow,
    hlpBalloonCurrent,
    hlpWizardctl,
    hlpWizardCurrent,
    counter,
    hlpHtRunning;
$ &&
    $.fn &&
    $.fn.jquery === "1.2.6" &&
    $.extend($.expr[":"], {
        reallyHidden: "(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length > 0)",
        reallyVisible: "!(jQuery(a).is(':hidden') || jQuery(a).parents(':hidden').length)",
    });
$ &&
    $.fn &&
    $.fn.jquery === "1.3.2" &&
    $.extend($.expr[":"], {
        readonly: function(n) {
            return !!n.readOnly;
        },
    });
_BINDQUERY = ":input:not(:hidden)";
SysColors = { ActiveCaption: "#DDDDDD", CaptionText: "#FFFFFF" };
BrowseInputType = {
    InputField: "I",
    Browser: "B",
    SearchField: "S",
    InputList: "L",
    Tag: "T",
};
var sysIsSubmitted = !1,
    isGroupDeleted = !1,
    sysWasSubmitted = !1;
sysButtonClose = null;
sysDefaultEnter = null;
SysDialog = {};
sysNoBeforeUnloadCheck = !1;
var resHoverCard = [],
    filesToUpload = [],
    filesToUploadAttachmentid = [],
    filesToUploading = 0,
    noOfFileUpload = 0,
    noOfFileUploadDone = 0,
    filesToRemoveAll = [],
    entityDict = null,
    oldEntityDict = null;
onChangeTriggered = !1;
onFocusValue = "";
sysInputChanged = !1;
clickCount = 0;
clickCountImg = 0;
var sysCxMenu = null,
    sysCxMenuTable = null,
    sysCxMenuFrame = null,
    sysCxMenuName,
    sysCxRowCurrent = 0;
Sys.Browser.Chrome = {};
navigator.userAgent.indexOf("Chrome/") > -1 &&
    (Sys.Browser.agent = Sys.Browser.Chrome);
SysElement.IsJQuery = function(n) {
    return n && n.jquery !== undefined ? !0 : !1;
};
SysElement.IsSysElement = function(n) {
    return n && n.syselement !== undefined ? !0 : !1;
};
SysElement.IsNothing = function(n) {
    return n === undefined || n === null;
};
SysElement.IsNotNothing = function(n) {
    return !SysElement.IsNothing(n);
};
SysElement.GetDomElement = function(n) {
    return (
        _SysElement || (_SysElement = new SysElement(n)),
        _SysElement._Init(n),
        _SysElement._el
    );
};
SysHandleKey.prototype = {
    event: null,
    syshandlekey: "1.0.0",
    GetKey: function() {},
    HandleEnter: function() {},
    IsEscapeKey: function() {},
    IsEnterKey: function() {},
    IsInsertKey: function() {},
    IsLeftKey: function() {},
    IsRightKey: function() {},
    IsUpKey: function() {},
    IsDownKey: function() {},
    IsHomeKey: function() {},
    IsEndKey: function() {},
    IsPageUpKey: function() {},
    IsPageDownKey: function() {},
    IsF1Key: function() {},
    IsF2Key: function() {},
    IsF2CtrlKey: function() {},
    IsTabKey: function() {},
    IsSingleKey: function() {},
    IsAltKey: function() {},
    IsCtrlKey: function() {},
    IsShiftKey: function() {},
};
SysHandleKey.Key = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
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
    ins: 45,
    dot: 110,
    F1: 112,
    F2: 113,
    del: 127,
    numlock: 144,
    fslash: 191,
};
SysHandleEvent.prototype = {
    event: null,
    syshandleevent: "1.0.0",
    target: null,
    IsEventStopped: function() {},
    StopEvent: function() {},
    StopPropagation: function() {},
    PreventDefault: function() {},
    StopAll: function() {},
};
$addHandler2 = Sys.UI.DomEvent.addHandler2 = function(n, t, i, r) {
    var e = Function._validateParams(arguments, [
            { name: "element", domElement: !0 },
            { name: "eventName", type: String },
            { name: "handler", type: Function },
            { name: "contentWindow", type: Object, optional: !0, mayBeNull: !0 },
        ]),
        u,
        f;
    if (e) throw e;
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
                var t = r == null ? window : r;
                return i.call(n, new Sys.UI.DomEvent(t.event));
            }),
            n.attachEvent("on" + t, f));
    u[u.length] = { handler: i, browserHandler: f };
};
SysSelection.Mode = { undefined: -1, control: 0, text: 1, mixed: 2 };
SysSelection._Type = { text: "Text", control: "Control", none: "None" };
SysSelection.prototype = {
    el: null,
    hasSelection: !1,
    sysselection: "1.0.0",
    mode: SysSelection.Mode.undefined,
    GetCaretPosition: function() {},
    SetCaretPosition: function() {},
    GetSelection: function() {},
    SetSelection: function() {},
    ClearSelection: function() {},
    DeleteSelection: function() {},
    ReplaceSelection: function() {},
};
SysSelection._GetElement = function(n) {
    var t,
        r,
        i,
        e = SysSelection.Mode.undefined,
        u,
        f;
    return (
        n &&
        (window.getSelection ?
            ((e = SysSelection.Mode.text),
                (r = n.window ? n.window.getSelection() : window.getSelection()),
                r.rangeCount > 0 ?
                ((i = r.getRangeAt(0)),
                    SysElement.IsNotNothing(doSelectionStart(n)) ?
                    (t = n) :
                    ((t = i.startContainer),
                        t.nodeType == 3 ?
                        (t = t.parentNode) :
                        (e = SysSelection.Mode.control))) :
                (t = n)) :
            document.selection &&
            ((r = n.nodeType === 9 ? n.selection : n.document.selection),
                (i = SysSelection._CreateRange(r)),
                (u = r.type),
                u === SysSelection._Type.text ?
                (e = SysSelection.Mode.text) :
                u === SysSelection._Type.control &&
                (e = SysSelection.Mode.control),
                u === SysSelection._Type.text || SysElement.IsNothing(n.nodeType) ?
                i.parentElement ?
                (t = i.parentElement()) :
                i.commonParentElement && (t = i.commonParentElement()) :
                u === SysSelection._Type.control ?
                (t = i(0)) :
                u === SysSelection._Type.none && (t = n))),
        (f = []),
        (f[0] = $(t)),
        (f[1] = r),
        (f[2] = i),
        (f[3] = e),
        f
    );
};
SysSelection._CreateRange = function(n) {
    var t = n.createRange();
    return typeof t.duplicate == "object" && (t = t.duplicate()), t;
};
var sysInput,
    sysInputAlt,
    sysInputMenu,
    sysInputText,
    sysInputRow,
    sysInputXmlHttp,
    sysInputTimer,
    sysInputTextType,
    sysInputRefUrl,
    sysInputKeyInRef,
    sysInputType,
    sysInputExtraQuery = "",
    sysInputParm = "",
    sysInputDivisionCode = "";
menuTimeoutId = null;
sysXmlHttpAborted = !1;
docDialogID = null;
iload = 0;
!(function(n, t) {
    "use strict";
    "function" == typeof define && define.amd ?
        define([], t) :
        "object" == typeof exports ?
        (module.exports = t()) :
        (n.autosize = t());
})(this, function() {
    function n(n) {
        function u() {
            var u = window.getComputedStyle(n, null),
                f;
            "vertical" === u.resize ?
                (n.style.resize = "none") :
                "both" === u.resize && (n.style.resize = "horizontal");
            n.style.wordWrap = "break-word";
            f = n.style.width;
            n.style.width = "0px";
            n.offsetWidth;
            n.style.width = f;
            i = "none" !== u.maxHeight ? parseFloat(u.maxHeight) : !1;
            r =
                "content-box" === u.boxSizing ?
                -(parseFloat(u.paddingTop) + parseFloat(u.paddingBottom)) :
                parseFloat(u.borderTopWidth) + parseFloat(u.borderBottomWidth);
            t();
        }

        function t() {
            var f = n.style.height,
                e = document.documentElement.scrollTop,
                o = document.body.scrollTop,
                t,
                u;
            n.style.height = "";
            t = n.scrollHeight + r;
            (i !== !1 && t > i ?
                ((t = i),
                    "scroll" !== n.style.overflowY && (n.style.overflowY = "scroll")) :
                "hidden" !== n.style.overflowY && (n.style.overflowY = "hidden"),
                (n.style.height = t + "px"),
                (document.documentElement.scrollTop = e),
                (document.body.scrollTop = o),
                f !== n.style.height) &&
            ((u = document.createEvent("Event")),
                u.initEvent("autosize.resized", !0, !1),
                n.dispatchEvent(u));
        }
        if (
            n &&
            n.nodeName &&
            "TEXTAREA" === n.nodeName &&
            !n.hasAttribute("data-autosize-on")
        ) {
            var i, r;
            "onpropertychange" in n &&
                "oninput" in n &&
                n.addEventListener("keyup", t);
            window.addEventListener("resize", t);
            n.addEventListener("input", t);
            n.addEventListener("autosize.update", t);
            n.addEventListener(
                "autosize.destroy",
                function(i) {
                    window.removeEventListener("resize", t);
                    n.removeEventListener("input", t);
                    n.removeEventListener("keyup", t);
                    n.removeEventListener("autosize.destroy");
                    Object.keys(i).forEach(function(t) {
                        n.style[t] = i[t];
                    });
                    n.removeAttribute("data-autosize-on");
                }.bind(n, {
                    height: n.style.height,
                    overflow: n.style.overflow,
                    overflowY: n.style.overflowY,
                    wordWrap: n.style.wordWrap,
                    resize: n.style.resize,
                })
            );
            n.setAttribute("data-autosize-on", !0);
            n.style.overflow = "hidden";
            n.style.overflowY = "hidden";
            u();
        }
    }
    return "function" != typeof window.getComputedStyle ?

        function(n) {
            return n;
        } :
        function(t) {
            return (
                t && t.length ?
                Array.prototype.forEach.call(t, n) :
                t && t.nodeName && n(t),
                t
            );
        };
});
RedirectionInGroupPopUp = function(n, t, i, r, u, f, e) {
    SysCloseModalPopup();
    var o = function() {
            $(".CreateWorkspaceOverlay").hide();
            var n = SysDialog.returnValue;
            typeof n != "undefined" &&
                n !== null &&
                n > 0 &&
                RedirectToWorkspace("Home.aspx?ID=" + n);
        },
        s = "",
        h =
        "SysCreateGroup.aspx?twindow=" +
        n +
        "&CompatibilityMode=1&act=" +
        i +
        "&defaultTab=" +
        r +
        "&GroupID=" +
        t;
    u
        ?
        f ?
        SysShowModalPopup(
            h + "&GroupAdmin=0",
            null,
            "720px",
            e + "px",
            function() {
                o();
            },
            null,
            "scroll:no;",
            null,
            null,
            s,
            0,
            null,
            "deleteGroupFunc"
        ) :
        SysShowModalPopup(
            h + "&GroupAdmin=1",
            null,
            "720px",
            e + "px",
            function() {
                o();
            },
            null,
            "scroll:no;",
            null,
            null,
            s,
            0,
            null
        ) :
        SysShowModalPopup(
            h + "&GroupAdmin=0",
            null,
            "720px",
            e + "px",
            function() {
                o();
            },
            null,
            "scroll:no;",
            null,
            null,
            s,
            0,
            null
        );
};
RedirectionInEventPopUp = function(n, t, i, r, u, f, e) {
    SysCloseModalPopup();
    var o = function() {
            $(".CreateWorkspaceOverlay").hide();
            var n = SysDialog.returnValue;
            typeof n != "undefined" &&
                n !== null &&
                n > 0 &&
                RedirectToWorkspace("Home.aspx?ID=" + n);
        },
        s =
        "SCCreateEvent.aspx?twindow=" +
        n +
        "&CompatibilityMode=1&act=" +
        i +
        "&defaultTab=" +
        r +
        "&EventID=" +
        t;
    SysShowModalPopup(
        s + "&GroupAdmin=1",
        null,
        "720px",
        e + "px",
        function() {
            o();
        },
        null,
        "scroll:no;",
        null,
        null,
        "",
        0,
        null
    );
};
hlpBalloonOn = !1;
counter = 0;
hlpHtRunning = !1;