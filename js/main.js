(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var nav = document.getElementById("siteNav");
  var navToggle = document.getElementById("navToggle");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("menu-open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("menu-open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Services accordion ---------- */
  var accordion = document.getElementById("accordion");
  if (accordion) {
    var items = Array.prototype.slice.call(accordion.querySelectorAll(".acc-item"));

    function setPanelHeight(item, open) {
      var panel = item.querySelector(".acc-panel");
      if (!panel) return;
      if (open) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "0px";
      }
    }

    items.forEach(function (item) {
      var trigger = item.querySelector(".acc-trigger");
      setPanelHeight(item, item.classList.contains("open"));
      trigger.addEventListener("click", function () {
        var willOpen = !item.classList.contains("open");
        items.forEach(function (other) {
          other.classList.remove("open");
          other.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
          setPanelHeight(other, false);
        });
        if (willOpen) {
          item.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
          setPanelHeight(item, true);
        }
      });
    });

    // Keep open panel sized correctly on resize (debounced via rAF)
    var resizeTicking = false;
    window.addEventListener("resize", function () {
      if (resizeTicking) return;
      resizeTicking = true;
      requestAnimationFrame(function () {
        var openItem = accordion.querySelector(".acc-item.open");
        if (openItem) setPanelHeight(openItem, true);
        resizeTicking = false;
      });
    });
  }

  /* ---------- Scroll reveal (single IntersectionObserver, cheap) ---------- */
  var revealEls = document.querySelectorAll(".reveal:not(.in)");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Process timeline progress ---------- */
  var timeline = document.getElementById("timeline");
  var progress = document.getElementById("timelineProgress");
  var steps = timeline ? Array.prototype.slice.call(timeline.querySelectorAll(".timeline-step")) : [];

  if (timeline && progress && steps.length) {
    var ticking = false;

    function updateTimeline() {
      var rect = timeline.getBoundingClientRect();
      var viewportH = window.innerHeight;
      var total = rect.height;
      var scrolled = viewportH * 0.75 - rect.top;
      var ratio = Math.max(0, Math.min(1, scrolled / total));
      progress.style.height = (ratio * 100) + "%";

      var activeIndex = Math.floor(ratio * steps.length);
      steps.forEach(function (step, i) {
        step.classList.toggle("active", i < activeIndex || (i === activeIndex && ratio > 0));
      });
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(updateTimeline);
          ticking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", function () {
      if (!ticking) {
        requestAnimationFrame(updateTimeline);
        ticking = true;
      }
    });
    updateTimeline();
  }

  /* ---------- Contact form (client-side only demo handling) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var btn = document.getElementById("submitBtn");
    var status = document.getElementById("formStatus");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      btn.disabled = true;
      btn.textContent = "Sending...";
      status.textContent = "";

      // Placeholder for a real endpoint integration.
      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = "Let's make it happen";
        status.textContent = "Thanks — we've received your message and will be in touch shortly.";
        form.reset();
      }, 700);
    });
  }
})();
