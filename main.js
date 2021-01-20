const divBody = document.getElementById("body");
let date = new Date();
let today = date.toLocaleDateString();
console.log(date);
console.log(typeof date);

console.log(today);
console.log(typeof today);

today = today.split('/').reverse().join('-')
console.log(today);
console.log(typeof today);

today = today.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
console.log(today);
console.log(typeof today);


window.addEventListener("load", () => {
    let forms = document.getElementsByTagName("form");
    for (const form of forms) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    }
});

function toggleCollapse() {
    let figure = document.getElementById("logo-collapsed");
    let icon = document.getElementById("collapse-icon");
    let userIcon = document.getElementById("user-icon-stack");
    let column;
    if (document.getElementById("search-options"))
        column = document.getElementById("search-options");

    figure.classList.toggle("d-none");
    icon.classList.toggle("fa-angle-right");
    icon.classList.toggle("fa-angle-left");

    // if (document.getElementById('user-name').innerText != '') {
    //     if (figure.classList.contains('d-none')) userIcon.classList.remove('d-none');
    //     else userIcon.classList.add('d-none');
    // }

    if (figure.classList.contains("d-none")) {
        userIcon.classList.remove("d-none");
        if (column) column.classList.remove("mt-5");
    } else {
        userIcon.classList.add("d-none");
        if (column) column.classList.add("mt-5");
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
    let rentPrice = document.getElementById("rent-price");
    if (chk.checked) {
        rentPrice.removeAttribute("disabled");
        rentPrice.focus();
    } else {
        rentPrice.setAttribute("disabled", true);
    }
}

function writeSignature() {
    let commentary = document.getElementById("commentary");
    let commentaryText = [];
    commentaryText = commentary.value;
    if (commentaryText) {
        if (!commentaryText.includes("Firma del empleado que ingresa la solicitud")) {
            commentary.value += "\nFirma del empleado que ingresa la solicitud";
            commentary.focus();
        } else {
            commentary.focus();
        }
    } else {
        commentary.value += "\nFirma del empleado que ingresa la solicitud";
        commentary.focus();
    }
}

function clearTextarea() {
    let commentary = document.getElementById("commentary");
    commentary.value = '';
    commentary.focus();
}

// Detectar cambio rango fecha modificación docs
function setDateRange(select) {
    let dateRange = document.getElementById(select.id);
    let selectedRange = dateRange.options[dateRange.selectedIndex].value;
    let startDay = document.getElementById("start-day");
    let endDay = document.getElementById("end-day");
    endDay.setAttribute('value', today);

    if (selectedRange == "custom") {
        startDay.removeAttribute("disabled");
        endDay.removeAttribute("disabled");
        startDay.focus();
    } else {
        startDay.setAttribute("disabled", true);
        endDay.setAttribute("disabled", true);
    }

    switch (selectedRange) {
        case "custom":
            break;
        case "all":
            break;
        case "0":
            break;
        case "1":
            break;
        case "7":
            break;
        case "15":
            break;
        case "30":
            break;
        case "90":
            break;
        case "365":
            break;
        default:
            break;
    }
}