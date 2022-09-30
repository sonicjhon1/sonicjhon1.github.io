async function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 10);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}

// Get webp
function getImg(input, ext) {
  let image = input.split(".");
  image.pop();
  return (image.join(".") + "." + ext);
}

//
function downloadPDF() {
  var fileName = "Resume.pdf";
  var mime = "application/pdf";
  var fileUrl= "https://raw.githubusercontent.com/sonicjhon1/sonicjhon1.github.io/main/assets/Resume.pdf";

  try {
    var save = document.createElement.bind(document, "a")();
    save.download = fileName;
    save.href = fileUrl;
    save.type = mime;
    save.target = "_self";
    save.click();
  } finally {
    URL.revokeObjectURL(fileUrl);
  }
}

// Count up funfact boxes
function countFun() {
  let funfactBoxes = document.querySelectorAll(".funfacts-box");
  funfactBoxes.forEach(funfactBox => {
    funfactBox.querySelectorAll(".counter").forEach(countNum => {
      var data_to = countNum.getAttribute("data-to");
      var duration = parseInt(countNum.getAttribute("data-time"));
        var value = 0;
        let counts = setInterval(updated, duration - (value));
        let counts2 = setInterval(updated2, 80);

        function updated(){
          countNum.innerText = parseInt(countNum.innerText) + value++;
          if( parseInt(countNum.innerText) >= data_to ) clearInterval(counts);
        }

        function updated2(){
          countNum.innerText++;
          if( parseInt(countNum.innerText) >= data_to ) clearInterval(counts2);
        }
    });
  })
}

function mailTo() {
  let name = encodeURIComponent(document.getElementById('contact-name').value);
  let email = document.getElementById('contact-email').value;
  let subject = encodeURIComponent(document.getElementById('contact-subject').value);
  let message = encodeURIComponent(document.getElementById('contact-message').value);

  if (name && email && subject && message) {
    window.open("mailto:sonicjhon1@gmail.com?cc=&bcc=&subject=" + subject + "&body=" + message + "%0D%0A%0D%0AFrom%20" + name + "%0D%0A" + email, "_blank").focus();
  }
}