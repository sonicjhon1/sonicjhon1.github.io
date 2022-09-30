function LoadThis() {
  
  document.querySelectorAll(".list").forEach( list => {
    list.addEventListener("click", function() {
      list.classList.remove("active");
      this.classList.add("active");
    });
  })

  const navLists = document.querySelector(".nav").querySelectorAll("li");
  const sections = document.querySelectorAll(".section");
  navLists.forEach( nav => {
    nav.querySelector("a").addEventListener("click", function () {
      toggleNav(this);
    });
  });

  async function toggleNav(i) {
    navLists.forEach( nav => {
      nav.querySelector("a").classList.remove("active");
      nav.classList.remove("active");
      i.classList.add("active");
      toggleSection(i);
    })
  }

  async function toggleSection(i) {    
    sections.forEach( async section => {
      section.classList.remove("active");
    });
    document.querySelector(i.getAttribute("href")).classList.add("active");
  }

  async function buttonToggleSection(i) {
    navLists.forEach( async list => {
      list.querySelector("a").classList.remove("active");
      list.classList.remove("active");
      if (i.getAttribute("href") === list.querySelector("a").getAttribute("href")) {
        list.classList.add("active");
      }
    });
    document.querySelector(i.getAttribute("href")).querySelector("a").classList.add("active");
  }

  // Add EventListener to buttons
  document.querySelector(".my-project").addEventListener("click", async function () {
    toggleSection(this), buttonToggleSection(this);
  }),
  document.querySelector(".about-me").addEventListener("click", async function () {
    toggleSection(this), buttonToggleSection(this);
  })

  // Init cursor
  var Cursor = document.querySelectorAll(".mouse-cursor");
  if (Cursor.length) {
    var innerElement = document.querySelector(".cursor-inner");
    var outerElement = document.querySelector(".cursor-outer");
    var mouseX;
    var mouseY;
    window.onmousemove = async function (x) {
      outerElement.style.transform = "translate(" + x.clientX + "px, " + x.clientY + "px)";
      innerElement.style.transform = "translate(" + x.clientX + "px, " + x.clientY + "px)";
      mouseX = x.clientX;
      mouseY = x.clientY;
    };

    innerElement.classList.add("cursor-hover");
    outerElement.classList.add("cursor-hover");

    innerElement.style.visibility = "visible";
    outerElement.style.visibility = "visible";
  }

  // Carousel
  //const friendCarousel = new Carousel(document.querySelector("#friends.carousel"), {
  //  center: true,
  //  Autoplay: {
  //    timeout: 500,
  //    hoverPause: false
  //  },
  //});
  //
  //// Carousel autoplay
  //friendCarousel.plugins.Autoplay.start()
  //friendCarousel.updatePage();

  // Fancybox autoplay fix
  Fancybox.bind('[data-fancybox="gallery"]', {
    Carousel: {
      Autoplay: {
        timeout: 9999999,
        hoverPause: true
      }
    },
    on: {
      init: Carousel.Plugins.Autoplay.stop,
      initLayout: Carousel.Plugins.Autoplay.stop,
      destroy: Carousel.Plugins.Autoplay.stop
    }
  });
  
  // Copyright year
  document.getElementById("current-year").textContent = new Date().getFullYear();
  mixitup(".portfolio-list");

  // Trigger funfact boxes count on visible
  onVisible(document.querySelector(".funfacts-box"), countFun);

  // Download button
  document.getElementById("dl-button").onclick = downloadPDF;

  // Email me button
  document.getElementById("contact-submit").onclick = mailTo;
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