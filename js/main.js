// ===================================
// BEM FIKOM UDB - Main JS
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------
  // 1. Navbar scroll effect
  // -----------------------------------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // -----------------------------------
  // 2. Particle system (hero only)
  // -----------------------------------
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const PARTICLE_COUNT = 25;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${6 + Math.random() * 6}s;
        opacity: ${0.3 + Math.random() * 0.4};
      `;
      particlesContainer.appendChild(p);
    }
  }

  // -----------------------------------
  // 3. Intersection Observer – fade-in-up
  // -----------------------------------
  const fadeEls = document.querySelectorAll('.fade-in-up');

  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach((el) => observer.observe(el));
  }

  // -----------------------------------
  // 4. Staggered divisi cards
  // -----------------------------------
  const divisiCards = document.querySelectorAll('.divisi-card');
  if (divisiCards.length) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, parseFloat(entry.target.style.getPropertyValue('--delay') || '0') * 1000);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    divisiCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease';
      cardObserver.observe(card);
    });
  }

  // -----------------------------------
  // 5. Smooth anchor scroll
  // -----------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -----------------------------------
  // 6. Active nav highlight on scroll
  // -----------------------------------
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.nav-link').forEach((link) => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  }

  // -----------------------------------
  // 7. Button ripple effect
  // -----------------------------------
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.5s linear;
        pointer-events: none;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframe once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple-anim {
        to { transform: scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // -----------------------------------
  // 8. Remove accordion behavior — all blocks visible by default
  // -----------------------------------

});
