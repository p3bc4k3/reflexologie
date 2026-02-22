/* =========================================
   REFLEXOLOGIE RODEZ — Main JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Mobile nav toggle ----
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on nav link click
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- Sticky header shadow ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ---- Scroll reveal ----
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-question.open').forEach(q => {
        q.classList.remove('open');
        q.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
      });

      // Open clicked (toggle)
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // ---- Floating CTA & Back to top ----
  const floatingCta = document.querySelector('.floating-cta');
  const backToTop = document.getElementById('backToTop');
  const footerEl = document.querySelector('.footer');

  if (floatingCta || backToTop) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;

      // Back to top: visible after 400px
      if (backToTop) {
        backToTop.classList.toggle('visible', scrollY > 400);
      }

      // Floating CTA: hide when near footer
      if (floatingCta && footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top;
        floatingCta.classList.toggle('hidden', footerTop < viewH + 80);
      }
    }, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ---- Smooth phone number formatting ----
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      // Track in analytics if needed
    });
  });

  // ---- Contact form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message envoyé !';
      btn.disabled = true;
      btn.style.background = '#3d6b4f';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    });
  }

  // ---- Counter animation ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
      }
    }, 16);
  }
});
