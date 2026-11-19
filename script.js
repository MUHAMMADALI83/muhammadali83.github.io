(() => {
  // Repair the portfolio shell width token and keep content readable if scripts are unavailable.
  const enhancementStyles = document.createElement('style');
  enhancementStyles.textContent = `
    :root { --shell: min(1180px, calc(100% - 96px)); }
    @media (max-width: 900px) { :root { --shell: min(calc(100% - 56px), 720px); } }
    @media (max-width: 640px) { :root { --shell: calc(100% - 38px); } }
    @media (max-width: 360px) { :root { --shell: calc(100% - 30px); } }
    .reveal { opacity: 1; transform: none; }
    html.js-enabled .reveal { opacity: 0; transform: translateY(20px); }
    html.js-enabled .reveal.is-visible { opacity: 1; transform: translateY(0); }
    @media (max-width: 640px) {
      html.js-enabled .reveal { transform: translateY(13px); }
      html.js-enabled .reveal.is-visible { transform: translateY(0); }
      html:not(.js-enabled) .primary-nav { position: static; visibility: visible; opacity: 1; transform: none; flex-direction: column; align-items: stretch; padding: 8px 0 16px; }
      html:not(.js-enabled) .primary-nav > a:not(.nav-cta) { padding: 10px 0; }
      html:not(.js-enabled) .menu-toggle { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      html.js-enabled .reveal, html.js-enabled .reveal.is-visible { opacity: 1; transform: none; }
    }
  `;
  document.head.append(enhancementStyles);
  document.documentElement.classList.add('js-enabled');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 640) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - rect.left - rect.width / 2;
        const dy = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${dx * 0.08}px, ${dy * 0.12}px)`;
      });
      button.addEventListener('pointerleave', () => {
        button.style.transform = '';
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
