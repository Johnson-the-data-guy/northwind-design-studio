document.addEventListener('DOMContentLoaded', function () {
  var hasGsap = typeof window.gsap !== 'undefined';

  if (hasGsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger, window.ScrollToPlugin);
  }

  var nav = document.getElementById('siteNav');

  // Nav background toggles once the page scrolls past the hero top.
  if (hasGsap && window.ScrollTrigger) {
    ScrollTrigger.create({
      start: 'top -10',
      onEnter: function () { nav.classList.add('nav--scrolled'); },
      onLeaveBack: function () { nav.classList.remove('nav--scrolled'); }
    });
  } else {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 10);
    });
  }

  // Smooth scroll for in-page nav links.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href.length < 2) return;

    link.addEventListener('click', function (event) {
      var target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();

      if (hasGsap && window.ScrollToPlugin) {
        gsap.to(window, {
          duration: 0.9,
          scrollTo: { y: target, offsetY: 70 },
          ease: 'power2.inOut'
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (!hasGsap) return;

  // Hero entrance.
  var heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
  heroTimeline
    .from('.hero .eyebrow', { opacity: 0, y: 16 })
    .from('.hero__title', { opacity: 0, y: 24 }, '-=0.6')
    .from('.hero__lede', { opacity: 0, y: 20 }, '-=0.6')
    .from('.hero__actions', { opacity: 0, y: 16 }, '-=0.5')
    .from('.hero__mock', { opacity: 0, y: 30, scale: 0.97 }, '-=0.7');

  // Scroll-triggered reveals for the rest of the page.
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    if (el.closest('.hero')) return;

    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%'
      }
    });
  });

  // Hover micro-interactions.
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      gsap.to(btn, { scale: 1.04, duration: 0.25, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' });
    });
  });

  document.querySelectorAll('.feature-card, .pricing-card:not(.pricing-card--highlight), .testimonial-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
});
