document.addEventListener("DOMContentLoaded", function () {
  var toggleBtn = document.getElementById("theme-toggle");
  var storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (!toggleBtn) return;

  function updateButtonText() {
    var isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  }

  updateButtonText();

  toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    updateButtonText();
  });
});
