function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 10);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

"use strict";
var Cursor = document.querySelector(".mouse-cursor");
if (Cursor.length && document.querySelector("body")) {
  var innerElement = document.querySelector(".cursor-inner");
  var outerElement = document.querySelector(".cursor-outer");
  var mouseX;
  var mouseY;
  window.onmousemove = function (x) {
    outerElement.style.transform = "translate(" + x.clientX + "px, " + x.clientY + "px)";
    innerElement.style.transform = "translate(" + x.clientX + "px, " + x.clientY + "px)";
    mouseX = x.clientX;
    mouseY = x.clientY;
  };
  document.querySelector("body").on("mouseenter", "a,.trigger, .cursor-pointer", function () {
    innerElement.classList.add("cursor-hover");
    outerElement.classList.add("cursor-hover");
  });
  document.querySelector("body").on("mouseleave", "a,.trigger, .cursor-pointer", function () {
    if (!(document.querySelector(this).is("a") && document.querySelector(this).closest(".cursor-pointer").length)) {
      innerElement.classList.remove("cursor-hover");
      outerElement.classList.remove("cursor-hover");
    }
  });
  innerElement.style.visibility = "visible";
  outerElement.style.visibility = "visible";
}

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
  var isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent );
  if (isMobile) {
    preloader.remove();
  } else {
    sleep(1000).then(() => {preloader.classList.add("preloaded")});
    sleep(2000).then(() => {preloader.remove()});
  }
});