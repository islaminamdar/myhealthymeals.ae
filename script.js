// MyHealthyMeals.ae - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {

  // =====================
  // NAVBAR SCROLL EFFECT
  // =====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // =====================
  // HAMBURGER MENU
  // =====================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  // =====================
  // SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // =====================
  // FAQ ACCORDION
  // =====================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // =====================
  // CORPORATE FORM
  // =====================
  const corporateForm = document.getElementById('corporateForm');

  if (corporateForm) {
    corporateForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('corpName') ? document.getElementById('corpName').value.trim() : '';
      const company = document.getElementById('corpCompany') ? document.getElementById('corpCompany').value.trim() : '';
      const phone = document.getElementById('corpPhone') ? document.getElementById('corpPhone').value.trim() : '';
      const size = document.getElementById('corpSize') ? document.getElementById('corpSize').value : '';
      const msg = document.getElementById('corpMsg') ? document.getElementById('corpMsg').value.trim() : '';

      if (!name || !company || !phone) {
        alert('Please fill in your name, company, and phone number.');
        return;
      }

      let message = 'Hi! I am interested in a Corporate Meal Plan.\n\n';
      message += 'Name: ' + name + '\n';
      message += 'Company: ' + company + '\n';
      message += 'Phone: ' + phone + '\n';
      if (size) message += 'Team Size: ' + size + '\n';
      if (msg) message += 'Requirements: ' + msg + '\n';
      message += '\nPlease send me a quote. Thank you!';

      const encodedMessage = encodeURIComponent(message);
      const waURL = 'https://wa.me/971557133786?text=' + encodedMessage;

      window.open(waURL, '_blank');

      // Reset form
      corporateForm.reset();

      // Show success feedback
      const submitBtn = corporateForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✅ Opening WhatsApp...';
        submitBtn.style.background = '#25D366';
        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }

  // =====================
  // INTERSECTION OBSERVER - Animate sections on scroll
  // =====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  const animateEls = document.querySelectorAll('.meal-card, .plan-card, .variant-card, .hiw-step, .faq-item');
  animateEls.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease ' + (i * 0.08) + 's, transform 0.5s ease ' + (i * 0.08) + 's';
    observer.observe(el);
  });

});
