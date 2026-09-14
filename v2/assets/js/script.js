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

  const formatCounterValue = (value, format, suffix = "") => {
    if (format === "compact") {
      if (value >= 1000000) {
        const amount = value / 1000000;
        const label = amount === 1 ? "milhão" : "milhões";
        return `${amount.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${label}`;
      }
      if (value >= 1000) return `${Math.round(value / 1000).toLocaleString("pt-BR")} mil`;
    }
    return `${Math.round(value).toLocaleString("pt-BR")}${suffix}`;
  };

  const animateCounter = (element) => {
    if (element.dataset.counted === "true") return;
    element.dataset.counted = "true";

    const target = Number(element.dataset.value || 0);
    const format = element.dataset.format || "number";
    const suffix = element.dataset.suffix || "";

    if (reducedMotion) {
      element.textContent = formatCounterValue(target, format, suffix);
      return;
    }

    const duration = 1450;
    const start = performance.now();
    const update = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatCounterValue(target * eased, format, progress === 1 ? suffix : "");
      if (progress < 1) window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
  };

  const counters = document.querySelectorAll("[data-counter]");
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .45, rootMargin: "0px 0px -8%" });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  const journeyTrack = document.querySelector(".journey-track");
  if (journeyTrack) {
    const stations = [...journeyTrack.querySelectorAll(".journey-station")];
    let journeyVisible = false;
    let journeyTicking = false;

    const updateJourneyProgress = () => {
      const compact = window.matchMedia("(max-width: 900px)").matches;
      const trigger = window.innerHeight * .68;
      let progress = 0;

      if (reducedMotion) {
        progress = 1;
      } else if (compact && stations.length > 1) {
        const first = stations[0].querySelector(".station-marker").getBoundingClientRect();
        const last = stations[stations.length - 1].querySelector(".station-marker").getBoundingClientRect();
        const start = first.top + first.height / 2;
        const end = last.top + last.height / 2;
        progress = (trigger - start) / Math.max(end - start, 1);
      } else {
        const rect = journeyTrack.getBoundingClientRect();
        progress = (trigger - rect.top) / Math.max(rect.height, 1);
      }

      progress = Math.min(Math.max(progress, 0), 1);
      journeyTrack.style.setProperty("--journey-progress", progress.toFixed(4));
      stations.forEach((station, index) => {
        const threshold = index === 0 ? .015 : index / Math.max(stations.length - 1, 1);
        station.classList.toggle("is-reached", progress >= threshold);
      });
      journeyTicking = false;
    };

    const requestJourneyUpdate = () => {
      if (journeyTicking) return;
      journeyTicking = true;
      window.requestAnimationFrame(updateJourneyProgress);
    };

    if ("IntersectionObserver" in window) {
      const journeyObserver = new IntersectionObserver(([entry]) => {
        journeyVisible = entry.isIntersecting;
        requestJourneyUpdate();
      }, { rootMargin: "20% 0px 20%" });
      journeyObserver.observe(journeyTrack);
    } else {
      journeyVisible = true;
    }

    window.addEventListener("scroll", () => {
      if (journeyVisible) requestJourneyUpdate();
    }, { passive: true });
    window.addEventListener("resize", requestJourneyUpdate, { passive: true });
    requestJourneyUpdate();
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
