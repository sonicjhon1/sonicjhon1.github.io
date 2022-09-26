function LoadThis() {
  $(".list").click(function () {
    $(".list").removeClass("active"), $(this).addClass("active");
  });
  const t = document.querySelectorAll(".list");
  function e() {
    t.forEach((t) => t.classList.remove("active")),
      this.classList.add("active");
  }
  t.forEach((t) => t.addEventListener("click", e));
  const i = document.querySelector(".nav").querySelectorAll("li"),
    o = i.length,
    s = document.querySelectorAll(".section"),
    c = s.length;
  for (let t = 0; t < o; t++) {
    i[t].querySelector("a").addEventListener("click", function () {
      n();
      for (let t = 0; t < o; t++)
        i[t].querySelector("a").classList.contains("active") && a(t),
          i[t].classList.contains("active") && a(t),
          i[t].querySelector("a").classList.remove("active"),
          i[t].classList.remove("active");
      this.classList.add("active"), r(this);
    });
  }
  function n() {
    for (let t = 0; t < c; t++) s[t].classList.remove("back-section");
  }
  function a(t) {
    s[t].classList.add("back-section");
  }
  function r(t) {
    for (let t = 0; t < c; t++) s[t].classList.remove("active");
    const e = t.getAttribute("href").split("#")[1];
    document.querySelector("#" + e).classList.add("active");
  }
  function l(t) {
    for (let e = 0; e < o; e++) {
      i[e].querySelector("a").classList.remove("active"),
        i[e].classList.remove("active");
      const o = t.getAttribute("href").split("#")[1];
      o === i[e].querySelector("a").getAttribute("href").split("#")[1] &&
        i[e].querySelector("a").classList.add("active"),
        o === i[e].querySelector("a").getAttribute("href").split("#")[1] &&
          i[e].classList.add("active");
    }
  }
  if (
    (document.querySelector(".my-project").addEventListener("click", function () {
      const t = this.getAttribute("data-section-index");
      r(this), l(this), n(), a(t);
    }),
    document.querySelector(".about-me").addEventListener("click", function () {
      const t = this.getAttribute("data-section-index");
      r(this), l(this), n(), a(t);
    }),
    jQuery(".mouse-cursor").length && $("body"))
  ) {
    const t = document.querySelector(".cursor-inner"),
      e = document.querySelector(".cursor-outer");
    let i,
      o = 0,
      s = !1;
    (window.onmousemove = function (c) {
      s ||
        (e.style.transform =
          "translate(" + c.clientX + "px, " + c.clientY + "px)"),
        (t.style.transform =
          "translate(" + c.clientX + "px, " + c.clientY + "px)"),
        (i = c.clientY),
        (o = c.clientX);
    }),
      $("body").on("mouseenter", "a,.trigger, .cursor-pointer", function () {
        t.classList.add("cursor-hover"), e.classList.add("cursor-hover");
      }),
      $("body").on("mouseleave", "a,.trigger, .cursor-pointer", function () {
        ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
          (t.classList.remove("cursor-hover"),
          e.classList.remove("cursor-hover"));
      }),
      (t.style.visibility = "visible"),
      (e.style.visibility = "visible");
  }

  // Carousel
  const myCarousel = new Carousel(document.querySelector(".carousel"), {
    preload: 5,
    center: false,
    Autoplay: {
      timeout: 1250,
      hoverPause: false
    },
  });

  // Carousel autoplay
  myCarousel.plugins.Autoplay.start()
  myCarousel.updatePage();
  
  // Copyright year
  document.getElementById("current-year").textContent = new Date().getFullYear();
  mixitup(".portfolio-list");

  // Trigger funfact boxes count on visible
  onVisible(document.querySelector(".funfacts-box"), countFun);

  // Download button
  document.getElementById("dl-button").onclick = downloadPDF;
};

docReady(LoadThis());

// Fancybox
fancybox_items = document.querySelectorAll("a")
fancybox_items.forEach(item => {
  if (!item.hasAttribute("data-caption")) return;
  
  // Set attribute
  item.setAttribute("data-fancybox", "gallery");
  if (item.parentNode.classList.contains("gfx")) {
    item.setAttribute("data-type", "image");
    item.setAttribute("data-thumb", getImg(item.href, "webp"));
   } else { 
    item.setAttribute("data-type", "iframe");
    item.setAttribute("data-preload", "false");
   }

  let currentImg = document.createElement("img");
  (item.parentNode.classList.contains("gfx")) ? currentImg.src = getImg(item.href, "webp") : currentImg.src = getImg(item.dataset.thumb, "webp");
  currentImg.alt = item.dataset.caption;
  item.appendChild(currentImg);

  let currentDiv = document.createElement("div");
  currentDiv.className = "info";
  item.appendChild(currentDiv);

  let currentH3 = document.createElement("h3");
  currentH3.className = "title";
  (item.parentNode.classList.contains("gfx")) ? currentH3.textContent += "GFX" : currentH3.textContent += "Website";
  currentDiv.appendChild(currentH3);

  let currentSpan = document.createElement("span");
  currentSpan.className = "post";
  currentSpan.textContent += "View";
  currentDiv.appendChild(currentSpan);

  if (item.parentNode.classList.contains("webdesign")) {
    let currentA = document.createElement("a");
    currentA.href = item.dataset.caption;
    currentDiv.appendChild(currentA);

    let currentButton = document.createElement("span");
    currentButton.className = "post";
    currentButton.onclick = function() {window.location = item.href}
    currentButton.textContent += "Link";
    currentA.appendChild(currentButton);
  }
});