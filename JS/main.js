// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  document.body.classList.add(savedTheme);
  updateThemeIcon(savedTheme);

  // Toggle theme on click
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Get current theme
    const currentTheme = document.body.classList.contains("dark-mode")
      ? "dark-mode"
      : "light-mode";

    // Save to localStorage
    localStorage.setItem("theme", currentTheme);
    updateThemeIcon(currentTheme);
  });
}

// Update theme icon
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  if (theme === "dark-mode") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}