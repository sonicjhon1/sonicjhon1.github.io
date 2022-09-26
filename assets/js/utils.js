function docReady(fn) {
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

function onVisible(element, callback) {
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
  var fileName = "resume.txt";
  var type = "text/plain";
  var encode = "UTF-8";
  var mime = type + "; charset=" + encode
  var value= "Test";

  var properties = {type : mime, ending : "native"};
  var fileUrl = URL.createObjectURL( new File([value], fileName, properties) );

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