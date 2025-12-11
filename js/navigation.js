/* ============================================
   NAVIGATION
   Mobile menu and nav interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavLink();
});

/* ========== MOBILE NAVIGATION ========== */
function initMobileNav() {
  const toggle = document.getElementById('navbar-toggle');
  const nav = document.getElementById('navbar-nav');
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking nav links
  nav.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ========== ACTIVE NAV LINK ========== */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.navbar-link');
  const currentPath = window.location.pathname;
  
  // Remove all active classes first
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Set active based on current page
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    // Check if this link matches current page (not hash links)
    if (!link.getAttribute('href').startsWith('#')) {
      if (currentPath === linkPath || 
          (currentPath.endsWith('/') && linkPath.includes('index.html')) ||
          (currentPath.includes('index.html') && linkPath.includes('index.html'))) {
        link.classList.add('active');
      }
    }
  });
  
  // Scroll-based active state for section links
  const sections = document.querySelectorAll('section[id]');
  
  if (sections.length) {
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          handleScrollActiveState(navLinks, sections);
          isScrolling = false;
        });
        isScrolling = true;
      }
    });
  }
}

function handleScrollActiveState(navLinks, sections) {
  const scrollY = window.scrollY + 200;
  let activeSection = null;
  
  // Find the current section in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      activeSection = section.getAttribute('id');
    }
  });
  
  // Update nav links
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (activeSection && href === `#${activeSection}`) {
      // Activate section link, deactivate page links
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    } else if (!activeSection && scrollY < 300) {
      // At the top, activate Home link
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks.forEach(l => {
        if (l.getAttribute('href').includes('index.html')) {
          l.classList.add('active');
        }
      });
    }
  });
}
