/**
 * Carolina Wound Care — Performance Optimizer
 * Handles: font loading, lazy images, deferred scripts, scroll reveals
 */

(function() {
  'use strict';

  /* ============================================================
     1. FONT LOADING OPTIMIZATION
     Marks fonts as loaded to prevent FOUT (Flash of Unstyled Text)
  ============================================================ */
  if ('fonts' in document) {
    document.fonts.ready.then(function() {
      document.documentElement.classList.add('fonts-loaded');
    });
  }

  /* ============================================================
     2. NATIVE LAZY LOADING POLYFILL
     For browsers that don't support loading="lazy" natively
  ============================================================ */
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported — nothing extra needed
  } else {
    // Fallback: IntersectionObserver lazy load
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      var imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '200px 0px' });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  /* ============================================================
     3. SCROLL REVEAL ANIMATION
     Adds .visible class when elements enter the viewport
  ============================================================ */
  function initReveal() {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(function(el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback: show all immediately
      revealElements.forEach(function(el) {
        el.classList.add('visible');
      });
    }
  }

  /* ============================================================
     4. DEFERRED THIRD-PARTY SCRIPTS
     Loads non-critical scripts only after page is interactive
  ============================================================ */
  function loadDeferredScripts() {
    // Any analytics or tracking can be added here
    // They load after the page is fully interactive
  }

  /* ============================================================
     5. PREFETCH NEXT LIKELY PAGES ON HOVER
     When user hovers a nav link, prefetch that page
  ============================================================ */
  function initPrefetch() {
    if (!('IntersectionObserver' in window)) return;
    
    var prefetched = new Set();
    
    document.querySelectorAll('a[href]').forEach(function(link) {
      var href = link.getAttribute('href');
      // Only prefetch same-origin .html pages
      if (!href || href.startsWith('http') || href.startsWith('#') || 
          href.startsWith('tel:') || href.startsWith('mailto:')) return;
      
      link.addEventListener('mouseenter', function() {
        if (prefetched.has(href)) return;
        prefetched.add(href);
        
        var prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        prefetchLink.as = 'document';
        document.head.appendChild(prefetchLink);
      }, { once: true });
    });
  }

  /* ============================================================
     6. NAVBAR SCROLL BEHAVIOR
     Adds .scrolled class to navbar when page is scrolled
  ============================================================ */
  function initNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     INIT — Run after DOM is ready
     NOTE: Mobile menu toggle and accordion are handled
     exclusively by js/main.js to avoid duplicate listeners.
  ============================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initReveal();
      initNavbarScroll();
      initPrefetch();
    });
  } else {
    initReveal();
    initNavbarScroll();
    initPrefetch();
  }

  window.addEventListener('load', loadDeferredScripts);

})();
