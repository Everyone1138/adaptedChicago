

// script.js
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("content").classList.remove("hidden");
    }, 900); // Simulates loading delay
});