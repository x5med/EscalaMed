document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const continuousMotionSections = [...document.querySelectorAll(".hero, .ai-section")];
const numberFormatter = new Intl.NumberFormat("pt-BR");
const counterFrameInterval = window.matchMedia("(max-width: 767px)").matches ? 32 : 16;

function setMenuState(open) {
  if (!menuButton || !mobileMenu) return;

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mobileMenu.setAttribute("aria-hidden", String(!open));
  mobileMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuButton?.addEventListener("click", () => {
  setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

let scrollFrame = null;
let headerIsScrolled = null;

function updateHeader() {
  const nextState = window.scrollY > 24;

  if (nextState === headerIsScrolled) return;
  headerIsScrolled = nextState;
  header?.classList.toggle("is-scrolled", nextState);
}

function onScroll() {
  if (scrollFrame) return;

  scrollFrame = requestAnimationFrame(() => {
    updateHeader();
    scrollFrame = null;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  continuousMotionSections.forEach((section) => section.classList.add("is-motion-active"));
} else {
  const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("is-motion-active", entry.isIntersecting));
  }, { rootMargin: "120px 0px" });

  continuousMotionSections.forEach((section) => motionObserver.observe(section));
}

updateHeader();

const videoViewport = document.querySelector(".video-viewport");
const videoPrevious = document.querySelector("[data-carousel-prev]");
const videoNext = document.querySelector("[data-carousel-next]");
let videoScrollFrame = null;

function updateVideoControls() {
  if (!videoViewport || !videoPrevious || !videoNext) return;

  const maximum = Math.max(videoViewport.scrollWidth - videoViewport.clientWidth, 0);
  videoPrevious.disabled = videoViewport.scrollLeft <= 2;
  videoNext.disabled = videoViewport.scrollLeft >= maximum - 2;
}

function moveVideoCarousel(direction) {
  if (!videoViewport) return;

  const slide = videoViewport.querySelector(".video-slide");
  const gap = 16;
  const distance = (slide?.getBoundingClientRect().width || videoViewport.clientWidth) + gap;
  videoViewport.scrollBy({ left: distance * direction, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

videoPrevious?.addEventListener("click", () => moveVideoCarousel(-1));
videoNext?.addEventListener("click", () => moveVideoCarousel(1));
videoViewport?.addEventListener("scroll", () => {
  if (videoScrollFrame) return;
  videoScrollFrame = requestAnimationFrame(() => {
    updateVideoControls();
    videoScrollFrame = null;
  });
}, { passive: true });

window.addEventListener("resize", updateVideoControls, { passive: true });
updateVideoControls();

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

const revealElements = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

  revealElements.forEach((element) => revealObserver.observe(element));
}

function formatCounter(value, element) {
  return numberFormatter.format(value);
}

function animateCounter(element) {
  if (element.dataset.counted === "true") return;

  element.dataset.counted = "true";
  const target = Number(element.dataset.value || 0);
  const suffix = element.dataset.suffix || "";

  if (prefersReducedMotion) {
    element.textContent = `${formatCounter(target, element)}${suffix}`;
    return;
  }

  const duration = Math.min(2200, Math.max(1100, target / 450));
  const start = performance.now();
  let lastPaint = -Infinity;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    if (progress === 1 || now - lastPaint >= counterFrameInterval) {
      const current = Math.round(target * eased);
      element.textContent = `${formatCounter(current, element)}${suffix}`;
      lastPaint = now;
    }

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll(".counter");

if (!("IntersectionObserver" in window)) {
  counters.forEach(animateCounter);
} else {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.55 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

const whatsappInput = document.querySelector("#whatsapp");

whatsappInput?.addEventListener("input", (event) => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
  let formatted = digits;

  if (digits.length > 2) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length > 7) formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;

  event.target.value = formatted;
});

const leadForm = document.querySelector("#lead-form");
const successState = document.querySelector("#form-success");

function setFieldError(input, message = "") {
  const field = input.closest(".field");
  const error = field?.querySelector("small");
  field?.classList.toggle("has-error", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message;
}

function validateField(input) {
  const value = input.value.trim();
  let message = "";

  if (!value) message = "Preencha este campo.";
  else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Informe um e-mail válido.";
  else if (input.name === "whatsapp" && value.replace(/\D/g, "").length < 10) message = "Informe um WhatsApp válido.";

  setFieldError(input, message);
  return !message;
}

leadForm?.querySelectorAll("input").forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") validateField(input);
  });
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [...leadForm.querySelectorAll("input")];
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
    return;
  }

  leadForm.hidden = true;
  successState.hidden = false;
  successState.focus();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  });
});
