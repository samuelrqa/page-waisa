var hex_chr = "0123456789abcdef";

function rhex(num) {
    str = "";
    for (j = 0; j <= 3; j++)
        str +=
        hex_chr.charAt((num >> (j * 8 + 4)) & 0x0f) +
        hex_chr.charAt((num >> (j * 8)) & 0x0f);
    return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str) {
    nblk = ((str.length + 8) >> 6) + 1;
    blks = new Array(nblk * 16);
    for (i = 0; i < nblk * 16; i++) blks[i] = 0;
    for (i = 0; i < str.length; i++)
        blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    blks[i >> 2] |= 0x80 << ((i % 4) * 8);
    blks[nblk * 16 - 2] = str.length * 8;
    return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t) {
    return add(rol(add(add(a, q), add(x, t)), s), b);
}

function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str) {
    x = str2blks_MD5(str);
    a = 1732584193;
    b = -271733879;
    c = -1732584194;
    d = 271733878;

    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;

        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
    }
    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

// PRUEBA 1
let mvelasquez = "edab6e862dd2595edcc977c3d4a7c8f1";
let test = calcMD5("Aceros2020");

console.log("Result:");
console.log(mvelasquez);
console.log(test);

if (mvelasquez == test) console.log("Done!");
else console.log("Fail!");

// PRUEBA 2
let bvelez = "fa5a02c9cc183b3ff1bfcd4c2243f85c";
test = calcMD5("prueba123");

console.log("Result:");
console.log(bvelez);
console.log(test);

if (bvelez == test) console.log("Done!");
else console.log("Fail!");

// PRUEBA 3
let cvalencia = "827ccb0eea8a706c4c34a16891f84e7b";
test = calcMD5("12345");

console.log("Result:");
console.log(cvalencia);
console.log(test);

if (cvalencia == test) console.log("Done!");
else console.log("Fail!");

// PRUEBA 4
let lpatino = "489c0f9a161b964235a4eb7cceac22f1";
test = calcMD5("31102020");

console.log("Result:");
console.log(lpatino);
console.log(test);

if (lpatino == test) console.log("Done!");
else console.log("Fail!");

const divBody = document.getElementById("body");

if (document.getElementById("form-validate")) {
    const form = document.getElementById("form-validate");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

window.addEventListener("load", () => {
    let forms = document.getElementsByTagName('form');
    for (const form of forms) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        console.log(form);
    }
});

function toggleCollapse() {
    let figure = document.getElementById("logo-collapsed");
    let icon = document.getElementById("collapse-icon");
    let userIcon = document.getElementById("user-icon-stack");
    let column;
    if (document.getElementById("search-options")) column = document.getElementById("search-options");

    figure.classList.toggle("d-none");
    icon.classList.toggle("fa-angle-right");
    icon.classList.toggle("fa-angle-left");

    // if (document.getElementById('user-name').innerText != '') {
    //     if (figure.classList.contains('d-none')) userIcon.classList.remove('d-none');
    //     else userIcon.classList.add('d-none');
    // }

    if (figure.classList.contains("d-none")) {
        userIcon.classList.remove("d-none");
        if (column) column.classList.remove('mt-5');
    } else {
        userIcon.classList.add("d-none");
        if (column) column.classList.add('mt-5');
    }
}

function setTitle(e) {
    e.title = document.getElementById("user-name").innerText;
}

// Mostrar icono "Ver/Ocultar contraseña"
function showIcon(el) {
    let viewPass = document.getElementById("view-pass");
    if (el.value.length >= 1) {
        viewPass.classList.remove("d-none");
    } else {
        viewPass.classList.add("d-none");
    }
}

// Ver contraseña
function changeIcon(tag) {
    let el = tag;
    if (el.classList.contains("fa-eye")) {
        el.classList.add("fa-eye-slash");
        el.classList.remove("fa-eye");
        el.nextElementSibling.setAttribute("type", "text");
    } else {
        el.classList.add("fa-eye");
        el.classList.remove("fa-eye-slash");
        el.nextElementSibling.setAttribute("type", "password");
    }
}

// Iniciar sesión
function doLogin() {
    let user = document.getElementById("user");
    let password = document.getElementById("password");

    if (user.value != "") {
        if (password.value != "") {
            window.location = "home.html";
            form.reset();
        } else {
            password.focus();
            alert("Debe ingresar una contraseña");
        }
    } else {
        alert("Debe ingresar un nombre de usuario");
        user.focus();
        form.reset();
    }
}

function prueba() {
    window.location = "nueva.html";
}

// solicitud.html

function setRentPrice(chk) {
    let rentPrice = document.getElementById('rent-price');
    if (chk.checked) {
        rentPrice.removeAttribute('disabled');
        rentPrice.focus();
    } else {
        rentPrice.setAttribute('disabled', true)
    }
}

function writeSignature() {
    let commentary = document.getElementById('commentary');
    let commentaryText = [];
    commentaryText = commentary.value;
    if (commentaryText) {
        if (!commentaryText.includes('Firma del empleado que ingresa la solicitud')) {
            commentary.value += '\nFirma del empleado que ingresa la solicitud';
            commentary.focus();
        } else {
            commentary.focus();
        }
    } else {
        commentary.value += '\nFirma del empleado que ingresa la solicitud';
        commentary.focus();
    }
}

// Detectar cambio rango fecha modificación docs
function setDateRange(select) {
    let dateRange = document.getElementById(select.id);
    let selectedRange = dateRange.options[dateRange.selectedIndex].value;
    let startDay = document.getElementById('start-day');
    let endDay = document.getElementById('end-day');

    if (selectedRange == "custom") {
        startDay.removeAttribute('disabled');
        endDay.removeAttribute('disabled');
        startDay.focus();
    } else {
        startDay.setAttribute('disabled', true);
        endDay.setAttribute('disabled', true);
    }
}