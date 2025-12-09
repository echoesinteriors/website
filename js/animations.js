// ============================================
// ANIMATIONS
// Scroll-triggered animations and interactions
// ============================================

(function() {
  'use strict';
  
  // Intersection Observer for scroll animations with smoother options
  const observerOptions = {
    threshold: [0, 0.1, 0.2, 0.3],
    rootMargin: '0px 0px -80px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Add a small delay for smoother appearance
        setTimeout(function() {
          entry.target.classList.add('animate-in');
        }, 50);
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      } else {
        // Reset animation when element leaves viewport (optional)
        // entry.target.classList.remove('animate-in');
      }
    });
  }, observerOptions);
  
  document.addEventListener('DOMContentLoaded', function() {
    // Observe all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
    
    // Smooth parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      let ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.4;
            heroBackground.style.transform = 'translateY(' + rate + 'px) scale(1.05)';
            heroBackground.style.transition = 'transform 0.1s ease-out';
            ticking = false;
          });
          ticking = true;
        }
      });
    }
    
    // Stagger animation for cards
    const cards = document.querySelectorAll('.service-card, .card');
    cards.forEach(function(card, index) {
      card.style.animationDelay = (index * 0.1) + 's';
    });
    
    // Enhanced 3D tilt effect for service cards with smooth transitions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function(card) {
      let ticking = false;
      
      card.addEventListener('mousemove', function(e) {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-12px) scale(1.03)';
            card.style.transition = 'transform 0.1s ease-out';
            ticking = false;
          });
          ticking = true;
        }
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });
    
    // Smooth number counter animation with easing
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(function(counter) {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2500;
      let startTime = null;
      
      const easeOutCubic = function(t) {
        return 1 - Math.pow(1 - t, 3);
      };
      
      const updateCounter = function(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const current = Math.floor(target * easedProgress);
        
        counter.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      // Start counting when element is visible
      const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            startTime = null; // Reset for each animation
            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      counterObserver.observe(counter);
    });
    
    // Smooth reveal for images with intersection observer
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.complete) {
            img.classList.add('loaded');
          } else {
            img.addEventListener('load', function() {
              img.classList.add('loaded');
            });
          }
          imageObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1 });
    
    images.forEach(function(img) {
      imageObserver.observe(img);
    });
    
    // Also handle eager loaded images
    const eagerImages = document.querySelectorAll('img[loading="eager"]');
    eagerImages.forEach(function(img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
      }
    });
    
    // Enhanced ripple effect to buttons with smooth animation
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'ripple-animation 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        button.appendChild(ripple);
        
        setTimeout(function() {
          ripple.remove();
        }, 800);
      });
    });
    
    // Add smooth scroll behavior enhancement
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });
})();
