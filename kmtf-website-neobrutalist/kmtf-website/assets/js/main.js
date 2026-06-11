// =============================================
// KMTF ISBI Bandung — Main JavaScript
// Neo-Brutalist Edition
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ───
  const dot = document.getElementById('cursorDot');
  if (dot && window.matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    });
  } else if (dot) {
    dot.style.display = 'none';
    document.body.style.cursor = 'auto';
  }

  // ─── NAV: Scroll behavior ───
  const nav = document.getElementById('main-nav');
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.style.borderBottomColor = 'rgba(197,254,51,0.15)';
    } else {
      nav.style.borderBottomColor = '';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── NAV: Hamburger ───
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // Animate spans
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ─── INTERSECTION OBSERVER: Reveal on scroll ───
  const revealEls = document.querySelectorAll('.reveal-item, .divisi-card, .port-item, .stat-brut, .about-card, .stats-brut');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards in grids
        const siblings = entry.target.parentElement.querySelectorAll('.divisi-card, .port-item, .stat-brut');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 60;
        });
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    if (!el.classList.contains('reveal-item')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    }
    observer.observe(el);
  });

  // ─── TICKER: Duplicate for seamless loop ───
  document.querySelectorAll('.ticker, .marquee-track').forEach(ticker => {
    const clone = ticker.innerHTML;
    ticker.innerHTML += clone; // double content for seamless loop
  });

  // ─── PORTFOLIO: Play button interaction ───
  document.querySelectorAll('.port-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('h3');
      if (title) {
        // Placeholder – replace with actual modal / YouTube embed logic
        const msg = `"${title.textContent.trim()}" — Segera tersedia di platform streaming KMTF.`;
        showToast(msg);
      }
    });
  });

  // ─── SIMPLE TOAST NOTIFICATION ───
  function showToast(msg) {
    const existing = document.querySelector('.kmtf-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'kmtf-toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed; bottom: 32px; left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #c5fe33; color: #0a0a0a;
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700; font-size: 13px;
      letter-spacing: 1px;
      padding: 14px 28px;
      max-width: 90vw; text-align: center;
      z-index: 9000;
      border: 2px solid #9bc800;
      opacity: 0;
      transition: opacity .3s, transform .3s;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ─── KEGIATAN: Hover expand (optional) ───
  document.querySelectorAll('.kegiatan-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.borderLeftColor = 'var(--orange)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.borderLeftColor = '';
    });
  });

  // ─── ACTIVE NAV LINK on scroll ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // CSS for active nav
  const style = document.createElement('style');
  style.textContent = `.nav-active { color: var(--lime) !important; }`;
  document.head.appendChild(style);

});
