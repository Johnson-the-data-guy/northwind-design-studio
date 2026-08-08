document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function syncToggle() {
    toggle.textContent = isDark() ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
  }

  syncToggle();

  toggle.addEventListener('click', function () {
    if (isDark()) {
      document.documentElement.removeAttribute('data-theme');
      sessionStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      sessionStorage.setItem('theme', 'dark');
    }
    syncToggle();
  });
});
