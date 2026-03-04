// ============================================================
// Carolina Wound Care — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll behavior ----
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Mobile menu toggle ----
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  toggle?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });
  // Close mobile menu when a direct link is clicked
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      const icon = toggle?.querySelector('i');
      if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-xmark'); }
    });
  });

  // ---- Mobile accordion sections ----
  document.querySelectorAll('.mobile-section-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.mobile-nav-section');
      const isOpen = section.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ---- Accordion ----
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-header').forEach(b => {
        b.classList.remove('open');
        if (b.nextElementSibling) b.nextElementSibling.classList.remove('open');
      });
      // Toggle clicked
      if (!isOpen) {
        btn.classList.add('open');
        body?.classList.add('open');
      }
    });
  });

  // ---- Counter animation ----
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current = Math.min(current + step, target);
          el.textContent = (Number.isInteger(step) ? Math.floor(current) : Math.round(current)) + suffix;
          if (current < target) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ---- Hero video play handler ----
  const heroPlayBtn     = document.getElementById('heroPlayBtn');
  const heroVideoPoster = document.getElementById('heroVideoPoster');
  const heroVideo       = document.getElementById('heroVideo');

  if (heroPlayBtn && heroVideo && heroVideoPoster) {
    heroPlayBtn.addEventListener('click', () => {
      const src = heroVideo.querySelector('source')?.getAttribute('src');
      if (!src || src === '#') {
        heroPlayBtn.querySelector('.play-label').textContent = 'Video coming soon!';
        setTimeout(() => {
          const lbl = heroPlayBtn.querySelector('.play-label');
          if (lbl) lbl.textContent = 'Watch Our Story';
        }, 2500);
        return;
      }

      // Show loading spinner while video buffers
      const playLabel = heroPlayBtn.querySelector('.play-label');
      const playIcon  = heroPlayBtn.querySelector('.play-icon');
      if (playLabel) playLabel.textContent = 'Loading…';
      if (playIcon)  playIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

      // Preload the video now that user has clicked
      heroVideo.preload = 'auto';

      // Wait for enough data to play smoothly
      const onCanPlay = () => {
        heroVideoPoster.style.opacity = '0';
        heroVideoPoster.style.transition = 'opacity .4s ease';
        setTimeout(() => {
          heroVideoPoster.style.display = 'none';
          heroVideo.style.display = 'block';
          heroVideo.style.opacity = '0';
          heroVideo.style.transition = 'opacity .4s ease';
          // Fade video in
          requestAnimationFrame(() => {
            heroVideo.style.opacity = '1';
          });
        }, 400);
        heroVideo.play().catch(() => {
          // Autoplay blocked — show video controls anyway
          heroVideo.style.display = 'block';
          heroVideoPoster.style.display = 'none';
        });
        heroVideo.removeEventListener('canplay', onCanPlay);
      };

      heroVideo.addEventListener('canplay', onCanPlay);

      // Fallback: if video doesn't fire canplay in 3s, show it anyway
      setTimeout(() => {
        if (heroVideoPoster.style.display !== 'none') {
          heroVideoPoster.style.display = 'none';
          heroVideo.style.display = 'block';
        }
      }, 3000);
    });

    // When video ends — show poster again with replay option
    heroVideo.addEventListener('ended', () => {
      heroVideo.style.display = 'none';
      heroVideoPoster.style.display = 'flex';
      heroVideoPoster.style.opacity = '1';
      const playLabel = heroPlayBtn.querySelector('.play-label');
      const playIcon  = heroPlayBtn.querySelector('.play-icon');
      if (playLabel) playLabel.textContent = 'Watch Again';
      if (playIcon)  playIcon.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
    });
  }

  // ---- Contact / appointment form submission ----
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      btn.disabled = true;

      // Collect fields
      const data = {};
      new FormData(form).forEach((val, key) => { data[key] = val; });
      data.submitted_at = new Date().toISOString();

      try {
        await fetch('tables/contact_requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        form.innerHTML = `
          <div class="form-success">
            <div class="form-success-icon"><i class="fa-solid fa-circle-check"></i></div>
            <h3>Thank You!</h3>
            <p>We've received your request and will contact you within 24 hours. For immediate assistance, call <a href="tel:8665408090">866-540-8090</a>.</p>
          </div>`;
      } catch (err) {
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('There was an error submitting your request. Please call us at 866-540-8090.');
      }
    });
  });

  // ---- Wound Quiz ----
  initWoundQuiz();

});

// ---- Wound Quiz Logic ----
function initWoundQuiz() {
  const quizContainer = document.getElementById('woundQuiz');
  if (!quizContainer) return;

  const questions = [
    {
      q: "How long has the wound been present?",
      options: ["Less than 2 weeks", "2–6 weeks", "6 weeks to 3 months", "More than 3 months"],
      scores: [0, 1, 3, 4]
    },
    {
      q: "Does the wound show signs of improvement (getting smaller, less drainage)?",
      options: ["Yes, clearly improving", "Slightly improving", "Staying the same", "Getting worse"],
      scores: [0, 1, 3, 4]
    },
    {
      q: "Do you have diabetes?",
      options: ["No", "Pre-diabetic / borderline", "Yes, well-controlled", "Yes, poorly controlled"],
      scores: [0, 1, 2, 3]
    },
    {
      q: "Where is the wound located?",
      options: ["Minor cut/scrape", "Arm or hand", "Leg or ankle", "Foot or heel"],
      scores: [0, 1, 2, 4]
    },
    {
      q: "How would you describe the wound?",
      options: ["Shallow, clean", "Moderate depth, some drainage", "Deep or tunneling", "Exposed bone/tendon or very dark tissue"],
      scores: [0, 2, 3, 4]
    },
    {
      q: "Do you have difficulty getting to a clinic due to mobility, transportation, or health concerns?",
      options: ["No difficulty", "Some difficulty", "Significant difficulty", "Cannot leave home"],
      scores: [0, 1, 2, 3]
    }
  ];

  let current = 0;
  let scores = new Array(questions.length).fill(null);

  function render() {
    if (current < questions.length) {
      const q = questions[current];
      quizContainer.innerHTML = `
        <div class="quiz-progress">
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width:${(current / questions.length) * 100}%"></div>
          </div>
          <span class="quiz-step">Question ${current + 1} of ${questions.length}</span>
        </div>
        <div class="quiz-question reveal visible">
          <h4>${q.q}</h4>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option ${scores[current] === q.scores[i] ? 'selected' : ''}"
                data-score="${q.scores[i]}" data-idx="${i}">
                <span class="quiz-option-letter">${String.fromCharCode(65+i)}</span>
                ${opt}
              </button>
            `).join('')}
          </div>
          <div class="quiz-nav">
            ${current > 0 ? '<button class="btn btn-outline btn-sm quiz-back"><i class="fa-solid fa-arrow-left"></i> Back</button>' : '<span></span>'}
            <button class="btn btn-primary btn-sm quiz-next" ${scores[current] === null ? 'disabled' : ''}>
              ${current === questions.length - 1 ? 'See My Results <i class="fa-solid fa-arrow-right"></i>' : 'Next <i class="fa-solid fa-arrow-right"></i>'}
            </button>
          </div>
        </div>`;
      quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          scores[current] = parseInt(btn.getAttribute('data-score'));
          quizContainer.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          quizContainer.querySelector('.quiz-next').disabled = false;
        });
      });
      quizContainer.querySelector('.quiz-next').addEventListener('click', () => {
        if (scores[current] !== null) { current++; render(); }
      });
      quizContainer.querySelector('.quiz-back')?.addEventListener('click', () => { current--; render(); });
    } else {
      showResults();
    }
  }

  function showResults() {
    const total = scores.reduce((a, b) => a + (b || 0), 0);
    const maxScore = questions.reduce((acc, q) => acc + Math.max(...q.scores), 0);
    const pct = (total / maxScore) * 100;

    let level, title, desc, urgent, cta, color;
    if (pct < 20) {
      level = 1; title = "Your wound appears minor";
      desc = "Based on your answers, your wound may be healing normally. Continue proper wound care and monitor for changes.";
      urgent = false; color = "#48BB78";
      cta = "However, if you have any concerns, don't hesitate to schedule a free consultation with our specialists.";
    } else if (pct < 45) {
      level = 2; title = "Your wound may benefit from specialist attention";
      desc = "Some factors suggest your wound could improve with specialized wound care. Early intervention leads to much better outcomes.";
      urgent = false; color = "#F6AD55";
      cta = "We recommend scheduling a consultation to assess your wound and create a personalized care plan.";
    } else if (pct < 70) {
      level = 3; title = "Specialized wound care is strongly recommended";
      desc = "Several risk factors indicate that your wound would greatly benefit from professional wound care management. Without specialist care, chronic wounds can worsen significantly.";
      urgent = true; color = "#FC8181";
      cta = "Please contact us soon. Our specialists can help accelerate healing and prevent serious complications.";
    } else {
      level = 4; title = "Please seek specialized wound care promptly";
      desc = "Your answers indicate a complex wound situation that requires immediate specialist evaluation. Delays in treatment can lead to serious complications including infection and hospitalization.";
      urgent = true; color = "#E53E3E";
      cta = "Call us today at 866-540-8090 or request a home visit. We come to you — no need to leave home.";
    }

    quizContainer.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-icon" style="color:${color}">
          <i class="fa-solid fa-${urgent ? 'triangle-exclamation' : 'circle-check'}"></i>
        </div>
        <h3>${title}</h3>
        <div class="quiz-result-meter">
          <div class="quiz-result-fill" style="width:${pct}%; background:${color}"></div>
        </div>
        <p class="quiz-result-desc">${desc}</p>
        <div class="alert-box ${urgent ? 'alert-box-warn' : ''}">
          <i class="fa-solid fa-${urgent ? 'bell' : 'lightbulb'}"></i>
          <p>${cta}</p>
        </div>
        <div class="quiz-result-cta">
          <a href="contact.html" class="btn btn-primary">Schedule Free Consultation</a>
          <a href="tel:8665408090" class="btn btn-outline">
            <i class="fa-solid fa-phone"></i> Call 866-540-8090
          </a>
        </div>
        <button class="quiz-restart btn btn-sm" style="margin-top:1rem;color:var(--text-muted);background:none;border:none;">
          <i class="fa-solid fa-rotate-left"></i> Retake Quiz
        </button>
      </div>`;

    quizContainer.querySelector('.quiz-restart')?.addEventListener('click', () => {
      current = 0; scores = new Array(questions.length).fill(null); render();
    });
  }

  render();
}
