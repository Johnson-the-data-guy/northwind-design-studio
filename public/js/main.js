document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const toggle = document.getElementById('menuToggle');
  const back = document.getElementById('menuBack');
  const menu = document.getElementById('siteMenu');

  function openMenu() {
    body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', openMenu);
  back.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) {
      closeMenu();
    }
  });
});
