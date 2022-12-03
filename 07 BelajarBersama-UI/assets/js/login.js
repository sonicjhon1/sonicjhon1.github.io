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
        localStorage.setItem("uname", unameE.value)
        window.location.href = 'index.html'
    }
}