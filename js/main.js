// ─── NAVIGATION SCROLL EFFECT ───
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ─── HAMBURGER MENU ───
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── HERO PARALLAX ───
const heroBg = document.querySelector('.hero-bg');
const heroGrid = document.querySelector('.hero-grid');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.3}px)`;
  if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.15}px)`;
});

// ─── GLITCH EFFECT ON HOVER ───
const glitchEls = document.querySelectorAll('.hero-title');
glitchEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.textShadow = `
      2px 0 var(--crimson),
      -2px 0 rgba(0, 100, 255, 0.3)
    `;
    setTimeout(() => {
      el.style.textShadow = '';
    }, 150);
  });
});

// ─── CURSOR GLOW (desktop only) ───
if (window.innerWidth > 900) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}
