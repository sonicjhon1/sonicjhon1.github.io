var unameE;
var passwE;

document.addEventListener('DOMContentLoaded', function() {
    unameE = document.querySelector("#uname")
    passwE = document.querySelector("#passw")

    unameE.value = "";
    passwE.value = "";
});

function login() {
    if (unameE.value != "" && passwE.value != "") {
        setCookie("uname", unameE.value, 365);
        window.location.href = 'index.html'
    }
}

function logout() {
    setCookie("uname", "", 365);
    window.location.href = 'index.html'
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}