/* ============================================================
   CAROLINA WOUND CARE — 2026 AI-Ready Demo Site
   Main JavaScript
   Conscious Health Connections
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Mobile menu ───────────────────────────────────────────
  const navToggle   = document.getElementById('navToggle');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      navToggle.setAttribute('aria-expanded', 'true');
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', closeMobile);
  }
  // Close on outside click
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMobile();
    });
  }
  function closeMobile() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  // ── Mobile sub-menu toggles ───────────────────────────────
  document.querySelectorAll('.mobile-section-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.nextElementSibling;
      const caret = btn.querySelector('.toggle-caret');
      if (!sub) return;
      const isOpen = sub.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      if (caret) caret.style.transform = isOpen ? 'rotate(180deg)' : '';
    });
  });

  // Close mobile on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobile);
  });

  // ── Scroll Reveal ─────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Animated Counters ─────────────────────────────────────
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();
    const isDecimal = String(target).includes('.');

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  // ── FAQ Accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Optional: close all others in same list
      const parentList = btn.closest('.faq-list, [data-faq-group]');
      if (parentList && parentList.dataset.faqGroup === 'accordion') {
        parentList.querySelectorAll('.faq-toggle.open').forEach(other => {
          if (other !== btn) {
            other.classList.remove('open');
            const ob = other.nextElementSibling;
            if (ob) ob.style.maxHeight = '0';
          }
        });
      }

      btn.classList.toggle('open', !isOpen);
      if (body) {
        body.style.maxHeight = isOpen ? '0' : body.scrollHeight + 'px';
      }
    });
  });

  // ── Interactive Wound Quiz ────────────────────────────────
  const quizContainer = document.getElementById('woundQuiz');
  if (quizContainer) {
    initWoundQuiz(quizContainer);
  }

  function initWoundQuiz(container) {
    const questions = [
      {
        q: 'How long has your wound been present without fully healing?',
        options: [
          { text: 'Less than 2 weeks',        score: 0, icon: 'fa-calendar' },
          { text: '2–4 weeks',                 score: 1, icon: 'fa-calendar-week' },
          { text: '1–3 months',                score: 2, icon: 'fa-calendar-days' },
          { text: 'More than 3 months',        score: 3, icon: 'fa-calendar-xmark' }
        ]
      },
      {
        q: 'Has your wound been showing any of the following signs?',
        options: [
          { text: 'Slowly improving with home care',      score: 0, icon: 'fa-trending-up' },
          { text: 'Staying the same — not getting better', score: 2, icon: 'fa-minus' },
          { text: 'Getting larger or deeper',             score: 3, icon: 'fa-expand' },
          { text: 'Signs of infection (redness, odor)',   score: 3, icon: 'fa-triangle-exclamation' }
        ]
      },
      {
        q: 'Do you have any of these underlying health conditions?',
        options: [
          { text: 'None of the below',              score: 0, icon: 'fa-circle-check' },
          { text: 'Diabetes',                       score: 2, icon: 'fa-syringe' },
          { text: 'Poor circulation / vascular disease', score: 2, icon: 'fa-heart-pulse' },
          { text: 'Multiple conditions / complex care', score: 3, icon: 'fa-stethoscope' }
        ]
      }
    ];

    const results = [
      {
        range: [0, 2],
        tier: 'Monitor at Home',
        color: 'var(--green)',
        icon: 'fa-house-medical',
        message: 'Your wound may be manageable at home right now. Monitor daily for changes. If it doesn\'t improve within 2 weeks, schedule an evaluation.',
        cta: 'Schedule a Consultation'
      },
      {
        range: [3, 5],
        tier: 'Evaluation Recommended',
        color: 'var(--accent)',
        icon: 'fa-stethoscope',
        message: 'Your answers suggest your wound would benefit from professional evaluation soon. Specialized wound care can prevent complications.',
        cta: 'Request Evaluation'
      },
      {
        range: [6, 9],
        tier: 'Specialist Care Needed',
        color: 'var(--red-soft)',
        icon: 'fa-triangle-exclamation',
        message: 'Your wound shows signs that require specialized care. A board-certified wound care specialist should evaluate you as soon as possible.',
        cta: 'Get Urgent Care'
      }
    ];

    let current = 0;
    let scores = [];
    const dotsEl   = container.querySelector('.quiz-progress');
    const stepsEl  = container.querySelectorAll('.quiz-question');
    const resultEl = container.querySelector('.quiz-result');
    const restartEl = container.querySelector('.quiz-restart');

    function updateDots() {
      if (!dotsEl) return;
      container.querySelectorAll('.quiz-progress-dot').forEach((d, i) => {
        d.classList.toggle('done',   i < current);
        d.classList.toggle('active', i === current);
      });
    }

    function showQuestion(idx) {
      stepsEl.forEach((el, i) => el.classList.toggle('active', i === idx));
      updateDots();
    }

    // Build questions dynamically
    if (stepsEl.length === 0) {
      // Dynamic build
      const progressDiv = container.querySelector('.quiz-progress') || document.createElement('div');
      progressDiv.className = 'quiz-progress';
      progressDiv.innerHTML = questions.map(() => '<div class="quiz-progress-dot"></div>').join('');

      let html = progressDiv.outerHTML;
      questions.forEach((q, qi) => {
        html += `<div class="quiz-question${qi === 0 ? ' active' : ''}" data-qi="${qi}">
          <h3>${q.q}</h3>
          <div class="quiz-options">
            ${q.options.map((o, oi) => `
              <button class="quiz-option" data-qi="${qi}" data-oi="${oi}" data-score="${o.score}" type="button">
                <i class="fa-solid ${o.icon}"></i> ${o.text}
              </button>`).join('')}
          </div>
        </div>`;
      });
      html += `<div class="quiz-result" id="quizResult">
        <div class="quiz-result-icon" id="quizResultIcon"></div>
        <h3 id="quizResultTier"></h3>
        <p id="quizResultMsg"></p>
        <a href="contact.html" class="btn btn-primary" id="quizResultCta">Request Consultation</a>
        <br><br>
        <button class="btn btn-secondary btn-sm quiz-restart" type="button">Take Quiz Again</button>
      </div>`;
      container.innerHTML = html;
    }

    // Re-query after dynamic build
    const allOptions = () => container.querySelectorAll('.quiz-option');
    const allQuestions = () => container.querySelectorAll('.quiz-question');
    const resultBox   = () => container.querySelector('.quiz-result');

    // Rebuild dots ref
    const newDots = container.querySelectorAll('.quiz-progress-dot');

    function refreshDots() {
      newDots.forEach((d, i) => {
        d.classList.toggle('done',   i < current);
        d.classList.toggle('active', i === current);
      });
    }
    refreshDots();

    container.addEventListener('click', (e) => {
      const opt = e.target.closest('.quiz-option');
      const restart = e.target.closest('.quiz-restart');

      if (restart) {
        current = 0; scores = [];
        allQuestions().forEach((q, i) => q.classList.toggle('active', i === 0));
        const rb = resultBox();
        if (rb) rb.classList.remove('show');
        refreshDots();
        return;
      }

      if (!opt) return;
      const qi = parseInt(opt.dataset.qi);
      const score = parseInt(opt.dataset.score);

      // Highlight selected
      allOptions().forEach(o => {
        if (parseInt(o.dataset.qi) === qi) o.classList.remove('selected');
      });
      opt.classList.add('selected');
      scores[qi] = score;

      // Move forward after brief delay
      setTimeout(() => {
        if (current < questions.length - 1) {
          current++;
          allQuestions().forEach((q, i) => q.classList.toggle('active', i === current));
          refreshDots();
        } else {
          // Show result
          const total = scores.reduce((a, b) => (a + (b || 0)), 0);
          const result = results.find(r => total >= r.range[0] && total <= r.range[1]) || results[2];
          allQuestions().forEach(q => q.classList.remove('active'));
          const rb = resultBox();
          if (rb) {
            rb.classList.add('show');
            const iconEl = rb.querySelector('#quizResultIcon') || rb.querySelector('.quiz-result-icon');
            const tierEl = rb.querySelector('#quizResultTier');
            const msgEl  = rb.querySelector('#quizResultMsg');
            const ctaEl  = rb.querySelector('#quizResultCta') || rb.querySelector('a.btn');
            if (iconEl) iconEl.innerHTML = `<i class="fa-solid ${result.icon}" style="color:${result.color}"></i>`;
            if (tierEl) tierEl.textContent = result.tier;
            if (msgEl)  msgEl.textContent  = result.message;
            if (ctaEl)  ctaEl.textContent  = result.cta;
          }
        }
      }, 400);
    });
  }

  // ── Contact Form (Referral / Contact pages) ───────────────
  const contactForms = document.querySelectorAll('.cwc-contact-form');
  if (contactForms.length > 0) {
    contactForms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
        btn.disabled = true;

        const data = {};
        new FormData(form).forEach((v, k) => { data[k] = v; });
        data.submitted_at = new Date().toISOString();
        data.source = document.title;

        try {
          await fetch('tables/cwc_leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const successEl = form.parentElement.querySelector('.form-success');
          if (successEl) {
            form.style.display = 'none';
            successEl.classList.add('show');
          } else {
            form.innerHTML = `
              <div class="form-success show">
                <div class="form-success-icon"><i class="fa-solid fa-circle-check"></i></div>
                <h3>Request Received!</h3>
                <p>We'll contact you within 24 hours. For immediate help, call <a href="tel:8665408090">866-540-8090</a>.</p>
              </div>`;
          }
        } catch {
          btn.innerHTML = originalHtml;
          btn.disabled = false;
          alert('There was an issue submitting. Please call 866-540-8090 directly.');
        }
      });
    });
  }

  // ── Video lazy-load ───────────────────────────────────────
  document.querySelectorAll('.video-poster-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const src = wrap.dataset.src;
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.allow = 'autoplay; encrypted-media; fullscreen';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;position:absolute;inset:0;';
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
      wrap.style.cursor = 'default';
    });
  });

  // ── Active nav link highlighting ─────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Smooth scroll for anchor links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
