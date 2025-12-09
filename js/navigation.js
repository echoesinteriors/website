// ============================================
// NAVIGATION
// Mobile menu toggle and scroll effects
// ============================================

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    // Mobile menu toggle
    if (navbarToggle && navbarNav) {
      navbarToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navbarToggle.querySelectorAll('span');
        if (navbarNav.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translateY(8px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
      
      // Close mobile menu when clicking a link
      navbarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            navbarNav.classList.remove('active');
            const spans = navbarToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        });
      });
    }
    
    // Scroll effect for header
    if (header) {
      let lastScroll = 0;
      
      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
      });
    }
    
    // Highlight active nav link based on current page
    const currentPath = window.location.pathname;
    navbarLinks.forEach(function(link) {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  });
})();
