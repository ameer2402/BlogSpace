// Immediate execution to prevent flash of light theme on load
(function() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-toggle-icon');
  
  const updateIcon = (theme) => {
    if (!toggleIcon) return;
    if (theme === 'dark') {
      toggleIcon.classList.remove('fa-moon');
      toggleIcon.classList.add('fa-sun');
      toggleIcon.style.color = '#fbbf24'; // Warm sun color
    } else {
      toggleIcon.classList.remove('fa-sun');
      toggleIcon.classList.add('fa-moon');
      toggleIcon.style.color = ''; // Reset to default
    }
  };

  const currentTheme = localStorage.getItem('theme') || 'light';
  updateIcon(currentTheme);

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      let theme = 'light';
      if (document.documentElement.classList.contains('dark-theme')) {
        document.documentElement.classList.remove('dark-theme');
      } else {
        document.documentElement.classList.add('dark-theme');
        theme = 'dark';
      }
      localStorage.setItem('theme', theme);
      updateIcon(theme);
    });
  }
});
