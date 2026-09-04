document.documentElement.classList.add("js");

window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const diagnosis = document.querySelector("[data-diagnosis]");
  const mobileMotionLite = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let headerTicking = false;
  let headerScrolled = null;

  const updateHeader = () => {
    const nextState = window.scrollY > 32;
    if (nextState !== headerScrolled) {
      header?.classList.toggle("is-scrolled", nextState);
      headerScrolled = nextState;
    }
    headerTicking = false;
  };

  const requestHeaderUpdate = () => {
    if (headerTicking) return;
    headerTicking = true;
    window.requestAnimationFrame(updateHeader);
  };

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    mobileMenu.setAttribute("aria-hidden", String(!willOpen));
    mobileMenu.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  };

  const activatePanel = (panel) => {
    if (!diagnosis || !panel) return;
    diagnosis.querySelectorAll(".diagnosis-panel").forEach((item) => {
      const active = item === panel;
      item.classList.toggle("is-active", active);
      item.querySelector("button")?.setAttribute("aria-expanded", String(active));
    });
  };

  menuToggle?.addEventListener("click", toggleMenu);
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  updateHeader();

  diagnosis?.querySelectorAll(".diagnosis-panel").forEach((panel) => {
    panel.querySelector("button")?.addEventListener("click", () => activatePanel(panel));
    panel.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 901px)").matches) activatePanel(panel);
    });
  });

  document.querySelectorAll("[data-rail-controls]").forEach((controls) => {
    const railName = controls.dataset.railControls;
    const viewport = document.querySelector(`[data-rail-viewport="${railName}"]`);
    const previous = controls.querySelector("[data-rail-prev]");
    const next = controls.querySelector("[data-rail-next]");
    let railTicking = false;

    if (!viewport || !previous || !next) return;

    const updateControls = () => {
      const maximum = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
      previous.disabled = viewport.scrollLeft <= 2;
      next.disabled = viewport.scrollLeft >= maximum - 2;
      railTicking = false;
    };

    const moveRail = (direction) => {
      const item = viewport.querySelector(".mentor-card, .video-slide");
      const track = viewport.firstElementChild;
      const gap = track ? Number.parseFloat(getComputedStyle(track).gap) || 0 : 0;
      const distance = (item?.getBoundingClientRect().width || viewport.clientWidth) + gap;
      viewport.scrollBy({ left: distance * direction, behavior: reducedMotion ? "auto" : "smooth" });
    };

    previous.addEventListener("click", () => moveRail(-1));
    next.addEventListener("click", () => moveRail(1));
    viewport.addEventListener("scroll", () => {
      if (railTicking) return;
      railTicking = true;
      window.requestAnimationFrame(updateControls);
    }, { passive: true });
    window.addEventListener("resize", updateControls, { passive: true });
    updateControls();
  });

  document.querySelectorAll(".video-poster").forEach((poster, index) => {
    poster.addEventListener("click", () => {
      const videoId = poster.dataset.youtubeId;
      if (!videoId) return;

      const player = document.createElement("iframe");
      player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
      player.title = `Depoimento em vídeo ${index + 1}`;
      player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      player.referrerPolicy = "strict-origin-when-cross-origin";
      player.setAttribute("allowfullscreen", "");
      poster.replaceWith(player);
      player.focus();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const scrubText = document.querySelector("[data-scrub-text]");
  if (scrubText && !mobileMotionLite && !reducedMotion) {
    const words = scrubText.textContent.trim().split(/\s+/);
    scrubText.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(" ");
  } else {
    scrubText?.classList.add("is-readable");
  }

  const authorityScrub = document.querySelector("[data-authority-scrub]");
  if (authorityScrub && !mobileMotionLite && !reducedMotion) {
    const words = authorityScrub.textContent.trim().split(/\s+/);
    authorityScrub.innerHTML = words.map((word, index) => `<span class="word${index >= words.length - 3 ? " accent" : ""}">${word}</span>`).join(" ");
  } else {
    authorityScrub?.classList.add("is-readable");
  }

  if (!window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  if (reducedMotion) return;

  if (mobileMotionLite) {
    gsap.fromTo(".hero-art", { opacity: .82 }, { opacity: 1, duration: .85, ease: "power2.out" });
    gsap.from(".hero-copy > *, .hero-actions .button", {
      y: 22,
      opacity: 0,
      duration: .65,
      stagger: .07,
      delay: .15,
      ease: "power2.out"
    });
    return;
  }

  gsap.fromTo(".hero-art", { scale: .88, opacity: .72 }, { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" });
  gsap.from(".hero-copy > *", { y: 48, opacity: 0, duration: 1.1, stagger: .13, delay: .35, ease: "power3.out" });
  gsap.from(".hero-actions .button", { y: 30, opacity: 0, duration: .9, stagger: .12, delay: .75, ease: "power3.out" });

  const scrubWords = gsap.utils.toArray(".diagnosis-thesis .word");
  if (scrubWords.length) {
    gsap.to(scrubWords, {
      opacity: 1,
      stagger: .06,
      ease: "none",
      scrollTrigger: {
        trigger: ".diagnosis-thesis",
        start: "top 82%",
        end: "bottom 46%",
        scrub: true
      }
    });
  }

  gsap.from(".diagnosis-panel", {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: .09,
    ease: "power3.out",
    scrollTrigger: { trigger: ".diagnosis-accordion", start: "top 78%" }
  });

  gsap.to(".route-progress span", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: ".pillars-stack", start: "top 60%", end: "bottom 70%", scrub: true }
  });
  gsap.to(".route-progress i", {
    left: "100%",
    ease: "none",
    scrollTrigger: { trigger: ".pillars-stack", start: "top 60%", end: "bottom 70%", scrub: true }
  });

  const cards = gsap.utils.toArray(".pillar-card");

  cards.forEach((card, index) => {
    gsap.from(card, {
      y: 120,
      opacity: 0,
      scale: .92,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 86%",
        end: "top 48%",
        scrub: 1
      }
    });

    const nextCard = cards[index + 1];
    if (nextCard) {
      gsap.to(card, {
        scale: .94 - index * .012,
        opacity: .52,
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top 72%",
          end: "top 22%",
          scrub: true
        }
      });
    }
  });

  gsap.to(".range-line span", {
    scaleX: 1,
    duration: 1.5,
    ease: "power3.inOut",
    scrollTrigger: { trigger: ".audience-range", start: "top 72%", once: true }
  });

  gsap.from(".audience-signal", {
    x: 36,
    opacity: 0,
    duration: .8,
    stagger: .09,
    ease: "power3.out",
    scrollTrigger: { trigger: ".audience-signals", start: "top 72%", once: true }
  });

  gsap.from(".growth-paths li", {
    y: 46,
    opacity: 0,
    duration: .85,
    stagger: .08,
    ease: "power3.out",
    scrollTrigger: { trigger: ".growth-paths", start: "top 82%", once: true }
  });

  gsap.from(".experience-specs > div", {
    y: 32,
    opacity: 0,
    duration: .8,
    stagger: .08,
    ease: "power3.out",
    scrollTrigger: { trigger: ".experience-specs", start: "top 80%", once: true }
  });

  gsap.to(".journey-progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { trigger: ".journey-track", start: "top 76%", end: "bottom 58%", scrub: true }
  });

  gsap.from(".journey-station", {
    y: 42,
    opacity: 0,
    duration: .9,
    stagger: .12,
    ease: "power3.out",
    scrollTrigger: { trigger: ".journey-track", start: "top 78%", once: true }
  });

  gsap.from(".proof-step", {
    y: 36,
    opacity: 0,
    duration: .8,
    stagger: .09,
    ease: "power3.out",
    scrollTrigger: { trigger: ".case-timeline", start: "top 74%", once: true }
  });

  gsap.from(".proof-metric", {
    scale: .84,
    opacity: 0,
    duration: 1,
    stagger: .18,
    ease: "power3.out",
    scrollTrigger: { trigger: ".case-meter", start: "top 72%", once: true }
  });

  gsap.from(".mentor-photo img", {
    scale: .82,
    opacity: .2,
    duration: 1.15,
    stagger: .1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".mentor-viewport", start: "top 78%", once: true }
  });

  gsap.from(".authority-stat", {
    y: 42,
    opacity: 0,
    duration: .9,
    stagger: .1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".authority-stats", start: "top 78%", once: true }
  });

  const authorityWords = gsap.utils.toArray(".authority-close .word");
  if (authorityWords.length) {
    gsap.to(authorityWords, {
      opacity: 1,
      stagger: .08,
      ease: "none",
      scrollTrigger: { trigger: ".authority-close", start: "top 82%", end: "bottom 48%", scrub: true }
    });
  }
});
