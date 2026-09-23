document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Helper to detect mobile/tablet hamburger view
  function isMobileTab() {
    return window.innerWidth <= 991 || (mobileToggle && window.getComputedStyle(mobileToggle).display !== 'none');
  }

  function closeMobileMenu() {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (mobileToggle) {
        mobileToggle.innerHTML = '<i class="fa fa-bars"></i>';
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }
  }

  function openMobileMenu() {
    if (navMenu) {
      navMenu.classList.add('open');
      if (mobileToggle) {
        mobileToggle.innerHTML = '<i class="fa fa-times"></i>';
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Prevent clicks inside nav-menu from closing it
    navMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
      closeMobileMenu();
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });

    // Close mobile menu when clicking navigation links (except dropdown toggle)
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      if (link.closest('.has-dropdown') && link.classList.contains('nav-link')) {
        return; // Don't close when tapping dropdown toggle
      }
      link.addEventListener('click', () => {
        if (isMobileTab()) {
          closeMobileMenu();
        }
      });
    });
  }

  // 2. Mobile & Tablet Dropdown Toggle for Services
  const dropdownToggles = document.querySelectorAll('.has-dropdown > .nav-link');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (isMobileTab()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const parent = toggle.closest('.nav-item');
        const isOpen = parent.classList.contains('dropdown-open');

        if (isOpen) {
          parent.classList.remove('dropdown-open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          parent.classList.add('dropdown-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // Reset mobile menu and dropdowns if resized to desktop
  window.addEventListener('resize', () => {
    if (!isMobileTab()) {
      closeMobileMenu();
      document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
        item.classList.remove('dropdown-open');
      });
    }
  });

  // 3. FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.closest('.faq-item');
      const answer = currentItem.querySelector('.faq-answer');
      const isOpen = currentItem.classList.contains('active');

      if (isOpen) {
        currentItem.classList.remove('active');
        answer.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        // Close all other active FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
          if (item !== currentItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            const otherHeader = item.querySelector('.faq-header');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        currentItem.classList.add('active');
        answer.style.maxHeight = (answer.scrollHeight + 15) + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 4. Header Shadow on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(10, 28, 50, 0.08)';
    } else {
      header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.04)';
    }
  });

  // 5. Smooth scroll for anchor tags
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Do not smooth scroll or close menu if this is a dropdown toggle in mobile/tab view
      if (this.closest('.has-dropdown') && this.classList.contains('nav-link') && isMobileTab()) {
        return;
      }

      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        // If mobile menu open, close it cleanly
        if (navMenu && navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
