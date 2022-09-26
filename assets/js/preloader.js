var wrapper = document.querySelector(".gaspar");
var buttons = document.querySelectorAll(".style-switch-wrapper .cursor li a");
var shows = document.querySelectorAll(".style-switch-wrapper .cursor li a.show");
var hides = document.querySelectorAll(".style-switch-wrapper .cursor li a.hide");

buttons.forEach(button => {
  button.on("click", function () {
    var nav_target = document.querySelector(this);
    return ( nav_target.classList.contains("showme") || (button.classList.remove("showme"), nav_target.classList.add("showme")), false );
  });
});

shows.forEach(show => {
  show.on("click", wrapper.setAttribute("data-magic-cursor", ""));
});

hides.forEach(hide => {
  hide.on("click", wrapper.setAttribute("data-magic-cursor", "hide"));
});

docReady( function() {
  var preloader = document.querySelector("#preloader");
  sleep(1000).then(() => {preloader.classList.add("preloaded")});
  sleep(2500).then(() => {preloader.remove()});
});