// script.js
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("content").classList.remove("hidden");
    }, 2000); // Simulates loading delay
});
