if ( localStorage.getItem("uname") == null || localStorage.getItem("uname") == "" ) window.location.href = 'login.html';

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}
    
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
} 

// On ready
document.addEventListener("DOMContentLoaded", function() {
    const nameElements = document.querySelectorAll('#name');
    nameElements.forEach(element => {
        element.innerText = localStorage.getItem("uname");
    });
})