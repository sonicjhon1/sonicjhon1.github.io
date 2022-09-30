docReady( function() {
  var preloader = document.querySelector("#preloader");
  sleep(1000).then(() => {preloader.classList.add("preloaded")});
  sleep(2500).then(() => {preloader.remove()});
});