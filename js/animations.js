/* ============================================
   ANIMATIONS & INTERACTIONS
   Modern scroll-based animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Mark JS as loaded for CSS fallback
  document.body.classList.add('js-loaded');
  
  // Initialize all animations
  initScrollAnimations();
  initHeaderScroll();
  initCounterAnimations();
  initImageLazyLoad();
  initSmoothScroll();
  initMarquee();
});

/* ========== SCROLL ANIMATIONS ========== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (!animatedElements.length) return;
  
  // Immediately show elements that are already in or near viewport
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('animate-in');
    }
  });
  
  // Fallback: Show ALL elements after 2 seconds regardless
  setTimeout(() => {
    animatedElements.forEach(el => el.classList.add('animate-in'));
  }, 2000);
  
  const observerOptions = {
    root: null,
    rootMargin: '50px 0px 50px 0px',
    threshold: 0.01
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => {
    if (!el.classList.contains('animate-in')) {
      observer.observe(el);
    }
  });
}

/* ========== HEADER SCROLL ========== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  let lastScroll = 0;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        
        // Add scrolled class when scrolled past 50px
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 200) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

/* ========== COUNTER ANIMATIONS ========== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-count]');
  
  if (!counters.length) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out-expo)
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(easeProgress * (target - start) + start);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(update);
}

/* ========== IMAGE LAZY LOADING ========== */
function initImageLazyLoad() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  images.forEach(img => {
    img.classList.add('lazy-image');
    
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
  
  // Also handle eager images
  const eagerImages = document.querySelectorAll('img:not([loading="lazy"])');
  eagerImages.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
}

/* ========== SMOOTH SCROLL ========== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.getElementById('header')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile nav if open
        const navbarNav = document.getElementById('navbar-nav');
        const navbarToggle = document.getElementById('navbar-toggle');
        if (navbarNav?.classList.contains('active')) {
          navbarNav.classList.remove('active');
          navbarToggle?.classList.remove('active');
        }
      }
    });
  });
}

/* ========== MARQUEE ========== */
function initMarquee() {
  const marquees = document.querySelectorAll('.marquee-content');
  
  marquees.forEach(marquee => {
    // Pause on hover
    marquee.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    
    marquee.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  });
}

/* ========== GSAP ANIMATIONS (if available) ========== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section parallax
  gsap.to('.hero-background img', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  // Floating cards
  gsap.to('.hero-floating-card.card-1', {
    y: -30,
    rotation: 3,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.hero-floating-card.card-2', {
    y: 25,
    rotation: -2,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // Service cards stagger
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out'
    });
  });
  
  // Stat numbers
  gsap.utils.toArray('.stat-number').forEach(stat => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%'
      },
      textContent: 0,
      duration: 2,
      snap: { textContent: 1 },
      ease: 'power2.out'
    });
  });
}

// Initialize GSAP if available after page load
window.addEventListener('load', () => {
  // Wait a bit for GSAP to load
  setTimeout(initGSAPAnimations, 100);
});

/* ========== RIPPLE EFFECT ========== */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
  ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
  
  btn.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
});

/* ========== CURSOR EFFECTS (optional) ========== */
function initCursorEffects() {
  // Only on desktop
  if (window.innerWidth < 768) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  
  // Scale up on hoverable elements
  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

// Uncomment to enable custom cursor
// initCursorEffects();
