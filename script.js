// script.js
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("content").classList.remove("hidden");
    }, 2000); // Simulates loading delay
});


document.getElementById("menu-btn").addEventListener("click", function(event) {
    event.stopPropagation();
    this.classList.add("rotate-180");
    document.getElementById("menu").style.right = "0";
});

document.getElementById("close-btn").addEventListener("click", function(event) {
    event.stopPropagation();
    document.getElementById("menu-btn").classList.remove("rotate-180");
    document.getElementById("menu").style.right = "-100%";
});

function closeMenu(event) {
    let menu = document.getElementById("menu");
    let menuBtn = document.getElementById("menu-btn");
    if (!menu.contains(event.target) && event.target !== menuBtn) {
        menu.style.right = "-100%";
        menuBtn.classList.remove("rotate-180");
    }
}

// banner // 


// about us in home page //
function fadeInOnScroll() {
    const aboutSection = document.getElementById("aboutUs");
    const sectionPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        aboutSection.classList.remove("opacity-0", "translate-y-10");
    }
}

window.addEventListener("scroll", fadeInOnScroll);


// slit screen animation
$(document).ready(function () {
    $("#leftPaneButton").click(function () {
      $("#leftPane").animate({ width: 0 }, 1000);
      $("#rightPane").animate({ width: "100%" }, 1000);
    });
  
    $("#rightPaneButton").click(function () {
      $("#leftPane").animate({ width: "100%" }, 1000);
      $("#rightPane").animate({ width: 0 }, 1000);
    });
  });