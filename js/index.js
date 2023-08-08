window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.loader-container');
  loadingScreen.style.display = 'none';
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { rootMargin: "-10px" }
);
const hiddenEl = document.querySelectorAll(".hidden");
hiddenEl.forEach((el) => observer.observe(el));

const pageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentPage = entry.target.dataset.page;
        const boxes = document.querySelectorAll(".box");

        for (let i = 0; i < boxes.length; i++) {
          if (currentPage - 1 == i) {
            boxes[i].style.backgroundColor = "#693cdb";
          } else {
            boxes[i].style.backgroundColor = "#e6e6e9";
          }
        }
        if (currentPage > 1) {
          document.querySelector(".name").classList.remove("name-display");
          document.querySelector(".name").classList.add("name-hide");
        } else {
          document.querySelector(".name").classList.remove("name-hide");
          document.querySelector(".name").classList.add("name-display");
        }

        document.querySelector(".page").textContent = `${currentPage}/4`;
      }
    });
  },
  { rootMargin: "-10px", threshold: 0.5 }
);
const sectionEl = document.querySelectorAll("section");
sectionEl.forEach((el) => {
  pageObserver.observe(el);
});

const logo = document.querySelector(".logo");
logo.addEventListener("mouseenter", (l) => {
  logo.textContent = ">|<";
  logo.classList.remove("logoexit");
  logo.classList.add("logoenter");
});
logo.addEventListener("mouseleave", (l) => {
  logo.textContent = "-l||l-";
  logo.classList.remove("logoenter");
  logo.classList.add("logoexit");
});

(() => {
  var word;
  var orignal;
  var text = "";
  const rotationGap = 4;
  var clock2;
  var j;
  var l;
  var c;
  var p;

  window.addEventListener("load", () => {
    word = document.querySelector(".name");
    orignal = `MERAJ HOSSAINI`;
    l = orignal.length;
    j = c = p = 0;
    clock2 = setInterval(shuffle, 50);
  });

  function shuffle() {
    if (p-- > 0) return;
    text = "";
    for (var k = 0; k < j; k++) text += orignal[k];
    for (var k = j; k < j + 4 && k < l; k++) {
      text += String.fromCharCode(
        Math.random() > 0.5
          ? Math.floor(Math.random() * 26) + 65
          : Math.floor(Math.random() * 26) + 97
      );
    }
    c++;
    if (c == rotationGap) {
      c = 0;
      j += 1;
    }
    word.innerHTML = text;
    if (j >= l + 1) {
      j = 0;
      c = 0;
      p = 100;
    }
  }
})();

const hamburger = () => {
  const dropDownMenu = document.querySelector(".nav-dropdown");
  if (dropDownMenu) {
    if (dropDownMenu.style.display == "flex") {
      dropDownMenu.style.display = "none";
    } else {
      dropDownMenu.style.display = "flex";
    }
  }
};

function findOverFlowAxisY() {
  var all = document.getElementsByTagName("*"),
    i = 0,
    rect,
    docWidth = document.documentElement.offsetWidth;
  for (; i < all.length; i++) {
    rect = all[i].getBoundingClientRect();
    if (rect.right > docWidth || rect.left < 0) {
      console.log(all[i]);
      all[i].style.borderTop = "5px solid red";
    }
  }
}

const track = document.querySelector(".project-track");
const allApps = Array.from(track.children);
const nextBtn = document.querySelector(".project-btn-right");
const prevBtn = document.querySelector(".project-btn-left");

const appWidth = allApps[0].getBoundingClientRect().width;

const setAppWidth = (app, i) => {
  app.style.left = appWidth * i + "px";
};
const changeSlide = (track, current, target) => {
  track.style.transform = `translateX(-${target.style.left})`;
  current.classList.remove("current-app");
  target.classList.add("current-app");
};
const manageBtnDisplay = () => {
  const track = document.querySelector(".project-track");
  const allApps = Array.from(track.children);
  if (allApps[0].classList.contains("current-app")) {
    prevBtn.style.display = "none";
  }
  if (allApps[3].classList.contains("current-app")) {
    nextBtn.style.display = "none";
  }
  if (
    !allApps[3].classList.contains("current-app") &&
    !allApps[0].classList.contains("current-app")
  ) {
    nextBtn.style.display = "block";
    prevBtn.style.display = "block";
  }
};

nextBtn.addEventListener("click", () => {
  const currentApp = track.querySelector(".current-app");
  const nextApp = currentApp.nextElementSibling;
  changeSlide(track, currentApp, nextApp);
  manageBtnDisplay();
});
prevBtn.addEventListener("click", () => {
  const currentApp = track.querySelector(".current-app");
  const prevApp = currentApp.previousElementSibling;
  changeSlide(track, currentApp, prevApp);
  manageBtnDisplay();
});

allApps.forEach(setAppWidth);
manageBtnDisplay();

