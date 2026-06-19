/* MEESTERSCHAP — JavaScript */

/* Thema instellen vóór de pagina laadt (voorkomt flikkering) */
const opgeslagenThema = localStorage.getItem('thema');
const systeemDonker = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = opgeslagenThema ?? (systeemDonker ? 'dark' : 'light');

document.addEventListener('DOMContentLoaded', () => {

  /* --- Thema toggle --- */
  const knop = document.getElementById('thema-knop');

  if (knop) {
    knop.addEventListener('click', () => {
      const huidig = document.documentElement.dataset.theme;
      const nieuw = huidig === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nieuw;
      localStorage.setItem('thema', nieuw);
    });
  }

  /* --- Hamburger menu --- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Vak-kaart popup op touch/klik --- */
  document.querySelectorAll('.vak-kaart').forEach(kaart => {
    kaart.addEventListener('click', e => {
      if (window.matchMedia('(hover: none)').matches) {
        const popup = kaart.querySelector('.vak-popup');
        if (!popup) return;

        const isOpen = kaart.classList.contains('popup-open');

        document.querySelectorAll('.vak-kaart.popup-open').forEach(k => k.classList.remove('popup-open'));

        if (!isOpen) {
          kaart.classList.add('popup-open');
          e.preventDefault();
        }
      }
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.vak-kaart')) {
      document.querySelectorAll('.vak-kaart.popup-open').forEach(k => k.classList.remove('popup-open'));
    }
  });

  /* --- Actieve navigatielink markeren --- */
  const huidigePagina = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === huidigePagina) {
      link.classList.add('actief');
      link.setAttribute('aria-current', 'page');
    }
  });


});
