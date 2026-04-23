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

  /* --- Actieve navigatielink markeren --- */
  const huidigePagina = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === huidigePagina) {
      link.classList.add('actief');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* --- Fade-in animaties bij scrollen --- */
  const waarnemer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zichtbaar');
        waarnemer.unobserve(entry.target); /* stop na eerste keer */
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade').forEach(el => waarnemer.observe(el));

  /* --- Voortgangsbalken animeren --- */
  const balkWaarnemer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zichtbaar');
        balkWaarnemer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.voortgang-fill').forEach(balk => balkWaarnemer.observe(balk));

});
