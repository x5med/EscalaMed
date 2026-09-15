"use client";

import { useEffect } from "react";

type PageRuntimeProps = {
  variant: "classic" | "v2";
};

type Cleanup = () => void;

function listen<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
function listen<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
function listen(
  target: EventTarget,
  type: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
): Cleanup;
function listen(
  target: EventTarget,
  type: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
) {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

function formatCounterValue(value: number, format: string, suffix = "") {
  if (format === "decimal") {
    return Number(value).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (format === "compact") {
    if (value >= 1_000_000) {
      const amount = value / 1_000_000;
      const label = amount === 1 ? "milhão" : "milhões";
      return `${amount.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${label}`;
    }

    if (value >= 1_000) {
      return `${Math.round(value / 1_000).toLocaleString("pt-BR")} mil`;
    }
  }

  return `${Math.round(value).toLocaleString("pt-BR")}${suffix}`;
}

export function PageRuntime({ variant }: PageRuntimeProps) {
  useEffect(() => {
    document.documentElement.classList.add("js");
    document.body.dataset.page = variant;

    const cleanups: Cleanup[] = [];
    const observers: IntersectionObserver[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileMotionLite = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
    const header = document.querySelector<HTMLElement>(".site-header");
    const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
    const mobileMenu = document.querySelector<HTMLElement>(".mobile-menu");
    let animationContext: { revert: () => void } | undefined;
    let cancelled = false;

    const closeMenu = () => {
      if (!menuToggle || !mobileMenu) return;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      mobileMenu.setAttribute("aria-hidden", "true");
      mobileMenu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    const toggleMenu = () => {
      if (!menuToggle || !mobileMenu) return;
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      mobileMenu.setAttribute("aria-hidden", String(!open));
      mobileMenu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };

    if (menuToggle) cleanups.push(listen(menuToggle, "click", toggleMenu));
    mobileMenu?.querySelectorAll("a").forEach((link) => {
      cleanups.push(listen(link, "click", closeMenu));
    });
    cleanups.push(
      listen(document, "keydown", (event) => {
        if (event.key === "Escape") closeMenu();
      }),
    );

    let headerFrame = 0;
    let headerScrolled: boolean | null = null;
    const updateHeader = () => {
      const nextState = window.scrollY > (variant === "v2" ? 32 : 24);
      if (nextState !== headerScrolled) {
        header?.classList.toggle("is-scrolled", nextState);
        headerScrolled = nextState;
      }
      headerFrame = 0;
    };
    const requestHeaderUpdate = () => {
      if (headerFrame) return;
      headerFrame = window.requestAnimationFrame(updateHeader);
    };
    cleanups.push(listen(window, "scroll", requestHeaderUpdate, { passive: true }));
    updateHeader();

    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const scrollToTarget = (event: Event) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector<HTMLElement>(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      };
      cleanups.push(listen(anchor, "click", scrollToTarget));
    });

    const diagnosis = document.querySelector<HTMLElement>("[data-diagnosis]");
    if (diagnosis) {
      const panels = diagnosis.querySelectorAll<HTMLElement>(".diagnosis-panel");
      const activatePanel = (selected: HTMLElement) => {
        panels.forEach((panel) => {
          const active = panel === selected;
          panel.classList.toggle("is-active", active);
          panel.querySelector("button")?.setAttribute("aria-expanded", String(active));
        });
      };

      panels.forEach((panel) => {
        const button = panel.querySelector<HTMLButtonElement>("button");
        if (button) cleanups.push(listen(button, "click", () => activatePanel(panel)));
        cleanups.push(
          listen(panel, "mouseenter", () => {
            if (window.matchMedia("(min-width: 901px)").matches) activatePanel(panel);
          }),
        );
      });
    }

    const configureRail = (
      viewport: HTMLElement,
      previous: HTMLButtonElement,
      next: HTMLButtonElement,
    ) => {
      let railFrame = 0;
      const updateControls = () => {
        const maximum = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
        previous.disabled = viewport.scrollLeft <= 2;
        next.disabled = viewport.scrollLeft >= maximum - 2;
        railFrame = 0;
      };
      const moveRail = (direction: number) => {
        const item = viewport.querySelector<HTMLElement>(".mentor-card, .video-slide");
        const track = viewport.firstElementChild;
        const gap = track ? Number.parseFloat(getComputedStyle(track).gap) || 0 : 0;
        const distance = (item?.getBoundingClientRect().width || viewport.clientWidth) + gap;
        viewport.scrollBy({
          left: distance * direction,
          behavior: reducedMotion ? "auto" : "smooth",
        });
      };
      const onRailScroll = () => {
        if (railFrame) return;
        railFrame = window.requestAnimationFrame(updateControls);
      };

      cleanups.push(listen(previous, "click", () => moveRail(-1)));
      cleanups.push(listen(next, "click", () => moveRail(1)));
      cleanups.push(listen(viewport, "scroll", onRailScroll, { passive: true }));
      cleanups.push(listen(window, "resize", updateControls, { passive: true }));
      cleanups.push(() => window.cancelAnimationFrame(railFrame));
      updateControls();
    };

    if (variant === "v2") {
      document.querySelectorAll<HTMLElement>("[data-rail-controls]").forEach((controls) => {
        const railName = controls.dataset.railControls;
        const viewport = document.querySelector<HTMLElement>(
          `[data-rail-viewport="${railName}"]`,
        );
        const previous = controls.querySelector<HTMLButtonElement>("[data-rail-prev]");
        const next = controls.querySelector<HTMLButtonElement>("[data-rail-next]");
        if (viewport && previous && next) configureRail(viewport, previous, next);
      });
    } else {
      const viewport = document.querySelector<HTMLElement>(".video-viewport");
      const previous = document.querySelector<HTMLButtonElement>("[data-carousel-prev]");
      const next = document.querySelector<HTMLButtonElement>("[data-carousel-next]");
      if (viewport && previous && next) configureRail(viewport, previous, next);
    }

    const supportsVideoPreview = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let stopActiveVideo: Cleanup | undefined;

    const sendPlayerCommand = (player: HTMLIFrameElement, command: string) => {
      player.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*",
      );
    };

    document.querySelectorAll<HTMLButtonElement>(".video-poster").forEach((poster, index) => {
      const videoId = poster.dataset.youtubeId;
      if (!videoId) return;

      const title =
        poster.dataset.playerTitle ||
        poster.getAttribute("aria-label") ||
        `Depoimento em vídeo ${index + 1}`;
      let previewPlayer: HTMLIFrameElement | undefined;
      let previewTimer = 0;

      const createPlayer = (loop: boolean) => {
        const params = new URLSearchParams({
          autoplay: "1",
          mute: "1",
          controls: "0",
          playsinline: "1",
          rel: "0",
          modestbranding: "1",
          iv_load_policy: "3",
          disablekb: "1",
          fs: "0",
          cc_load_policy: "0",
          enablejsapi: "1",
          origin: window.location.origin,
        });

        if (loop) {
          params.set("loop", "1");
          params.set("playlist", videoId);
        }

        const player = document.createElement("iframe");
        player.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
        player.title = title;
        player.className = "video-embed-frame";
        player.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        player.referrerPolicy = "strict-origin-when-cross-origin";
        player.tabIndex = -1;
        return player;
      };

      const stopPreview = () => {
        window.clearTimeout(previewTimer);
        previewTimer = 0;
        poster.classList.remove("is-previewing");
        previewPlayer?.remove();
        previewPlayer = undefined;
      };

      const startPreview = () => {
        if (!supportsVideoPreview || reducedMotion || previewPlayer || stopActiveVideo) return;
        window.clearTimeout(previewTimer);
        previewTimer = window.setTimeout(() => {
          const player = createPlayer(true);
          previewPlayer = player;
          player.classList.add("video-hover-preview");
          player.setAttribute("aria-hidden", "true");
          poster.append(player);
          window.requestAnimationFrame(() => {
            if (previewPlayer === player) poster.classList.add("is-previewing");
          });
        }, 120);
      };

      const openCustomPlayer = () => {
        stopPreview();
        stopActiveVideo?.();

        const shell = document.createElement("div");
        shell.className = "video-player-shell";
        shell.setAttribute("aria-label", title);

        const player = createPlayer(false);
        const hitArea = document.createElement("button");
        const controls = document.createElement("div");
        const playToggle = document.createElement("button");
        const soundToggle = document.createElement("button");
        const closeButton = document.createElement("button");
        let playing = true;
        let muted = true;

        hitArea.type = "button";
        hitArea.className = "video-player-hitarea";
        hitArea.setAttribute("aria-label", "Pausar vídeo");
        controls.className = "video-player-controls";
        playToggle.type = "button";
        soundToggle.type = "button";
        closeButton.type = "button";
        playToggle.textContent = "Pausar";
        soundToggle.textContent = "Ativar som";
        closeButton.textContent = "Fechar";
        playToggle.setAttribute("aria-label", "Pausar vídeo");
        soundToggle.setAttribute("aria-label", "Ativar som do vídeo");
        closeButton.setAttribute("aria-label", "Fechar vídeo");

        const togglePlayback = () => {
          playing = !playing;
          sendPlayerCommand(player, playing ? "playVideo" : "pauseVideo");
          playToggle.textContent = playing ? "Pausar" : "Reproduzir";
          playToggle.setAttribute("aria-label", playing ? "Pausar vídeo" : "Reproduzir vídeo");
          hitArea.setAttribute("aria-label", playing ? "Pausar vídeo" : "Reproduzir vídeo");
          shell.classList.toggle("is-paused", !playing);
        };

        const toggleSound = () => {
          muted = !muted;
          sendPlayerCommand(player, muted ? "mute" : "unMute");
          soundToggle.textContent = muted ? "Ativar som" : "Silenciar";
          soundToggle.setAttribute(
            "aria-label",
            muted ? "Ativar som do vídeo" : "Silenciar vídeo",
          );
          shell.classList.toggle("has-sound", !muted);
        };

        const closePlayer = () => {
          shell.replaceWith(poster);
          stopActiveVideo = undefined;
          poster.focus();
        };

        hitArea.addEventListener("click", togglePlayback);
        playToggle.addEventListener("click", togglePlayback);
        soundToggle.addEventListener("click", toggleSound);
        closeButton.addEventListener("click", closePlayer);
        controls.append(playToggle, soundToggle, closeButton);
        shell.append(player, hitArea, controls);
        poster.replaceWith(shell);
        stopActiveVideo = closePlayer;
        soundToggle.focus();
      };

      cleanups.push(listen(poster, "mouseenter", startPreview));
      cleanups.push(listen(poster, "mouseleave", stopPreview));
      cleanups.push(listen(poster, "click", openCustomPlayer));
      cleanups.push(stopPreview);
    });

    cleanups.push(() => stopActiveVideo?.());

    const revealElements = document.querySelectorAll<HTMLElement>(".reveal");
    if (variant === "classic") {
      if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
      } else {
        const observer = new IntersectionObserver(
          (entries, currentObserver) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              currentObserver.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -40px" },
        );
        revealElements.forEach((element) => observer.observe(element));
        observers.push(observer);
      }

      const continuousSections = document.querySelectorAll<HTMLElement>(".hero, .ai-section");
      if (reducedMotion || !("IntersectionObserver" in window)) {
        continuousSections.forEach((section) => section.classList.add("is-motion-active"));
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) =>
              entry.target.classList.toggle("is-motion-active", entry.isIntersecting),
            );
          },
          { rootMargin: "120px 0px" },
        );
        continuousSections.forEach((section) => observer.observe(section));
        observers.push(observer);
      }
    }

    const animateCounter = (element: HTMLElement) => {
      if (element.dataset.counted === "true") return;
      element.dataset.counted = "true";
      const target = Number(element.dataset.value || 0);
      const format = element.dataset.format || "number";
      const suffix = element.dataset.suffix || "";
      if (reducedMotion) {
        element.textContent = formatCounterValue(target, format, suffix);
        return;
      }

      const duration = variant === "v2" ? 1450 : Math.min(2200, Math.max(1100, target / 450));
      const startedAt = performance.now();
      let frame = 0;
      const update = (timestamp: number) => {
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, variant === "v2" ? 3 : 4);
        element.textContent = formatCounterValue(
          target * eased,
          format,
          progress === 1 ? suffix : "",
        );
        if (progress < 1) frame = window.requestAnimationFrame(update);
      };
      frame = window.requestAnimationFrame(update);
      cleanups.push(() => window.cancelAnimationFrame(frame));
    };

    const counters = document.querySelectorAll<HTMLElement>(".counter, [data-counter]");
    if (!("IntersectionObserver" in window)) {
      counters.forEach((counter) => animateCounter(counter));
    } else {
      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target as HTMLElement);
            currentObserver.unobserve(entry.target);
          });
        },
        { threshold: variant === "v2" ? 0.45 : 0.55, rootMargin: "0px 0px -8%" },
      );
      counters.forEach((counter) => observer.observe(counter));
      observers.push(observer);
    }

    if (variant === "v2") {
      const splitWords = (element: HTMLElement | null, accentLastWords = 0) => {
        if (!element) return;
        if (mobileMotionLite || reducedMotion) {
          element.classList.add("is-readable");
          return;
        }
        const words = element.textContent?.trim().split(/\s+/) ?? [];
        element.replaceChildren(
          ...words.flatMap((word, index) => {
            const span = document.createElement("span");
            span.className = `word${index >= words.length - accentLastWords ? " accent" : ""}`;
            span.textContent = word;
            return index === words.length - 1 ? [span] : [span, document.createTextNode(" ")];
          }),
        );
      };
      splitWords(document.querySelector<HTMLElement>("[data-scrub-text]"));
      splitWords(document.querySelector<HTMLElement>("[data-authority-scrub]"), 3);

      const journeyTrack = document.querySelector<HTMLElement>(".journey-track");
      if (journeyTrack) {
        const stations = [...journeyTrack.querySelectorAll<HTMLElement>(".journey-station")];
        let journeyVisible = !("IntersectionObserver" in window);
        let journeyFrame = 0;
        const updateJourney = () => {
          const compact = window.matchMedia("(max-width: 900px)").matches;
          const trigger = window.innerHeight * 0.68;
          let progress = 0;
          if (reducedMotion) {
            progress = 1;
          } else if (compact && stations.length > 1) {
            const first = stations[0].querySelector<HTMLElement>(".station-marker")!.getBoundingClientRect();
            const last = stations.at(-1)!.querySelector<HTMLElement>(".station-marker")!.getBoundingClientRect();
            progress =
              (trigger - (first.top + first.height / 2)) /
              Math.max(last.top + last.height / 2 - (first.top + first.height / 2), 1);
          } else {
            const rect = journeyTrack.getBoundingClientRect();
            progress = (trigger - rect.top) / Math.max(rect.height, 1);
          }
          progress = Math.min(Math.max(progress, 0), 1);
          journeyTrack.style.setProperty("--journey-progress", progress.toFixed(4));
          stations.forEach((station, index) => {
            const threshold = index === 0 ? 0.015 : index / Math.max(stations.length - 1, 1);
            station.classList.toggle("is-reached", progress >= threshold);
          });
          journeyFrame = 0;
        };
        const requestJourneyUpdate = () => {
          if (!journeyVisible || journeyFrame) return;
          journeyFrame = window.requestAnimationFrame(updateJourney);
        };
        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              journeyVisible = entry.isIntersecting;
              requestJourneyUpdate();
            },
            { rootMargin: "20% 0px 20%" },
          );
          observer.observe(journeyTrack);
          observers.push(observer);
        }
        cleanups.push(listen(window, "scroll", requestJourneyUpdate, { passive: true }));
        cleanups.push(listen(window, "resize", requestJourneyUpdate, { passive: true }));
        cleanups.push(() => window.cancelAnimationFrame(journeyFrame));
        journeyVisible = true;
        requestJourneyUpdate();
      }
    }

    const initializeGsap = async () => {
      if (reducedMotion) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      animationContext = gsap.context(() => {
        if (variant === "classic") {
          const mentorArt = document.querySelector(".hero-mentor-art");
          if (mentorArt) {
            gsap.fromTo(
              mentorArt,
              { opacity: 0.72, scale: 1.025 },
              { opacity: 1, scale: 1, duration: 1.35, ease: "power2.out" },
            );
            gsap.to(mentorArt, {
              opacity: 0.38,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom 45%",
                scrub: true,
              },
            });
          }

          const scrubText = document.querySelector<HTMLElement>(".scrub-copy > p");
          if (scrubText) {
            const words = scrubText.textContent?.trim().split(/\s+/) ?? [];
            scrubText.replaceChildren(
              ...words.flatMap((word, index) => {
                const span = document.createElement("span");
                span.className = "scrub-word";
                span.textContent = word;
                return index === words.length - 1 ? [span] : [span, document.createTextNode(" ")];
              }),
            );
            gsap.set(".scrub-word", { opacity: 0.16 });
            gsap.to(".scrub-word", {
              opacity: 1,
              stagger: 0.045,
              ease: "none",
              scrollTrigger: {
                trigger: scrubText,
                start: "top 78%",
                end: "bottom 38%",
                scrub: true,
              },
            });
          }
          return;
        }

        if (mobileMotionLite) {
          gsap.fromTo(".hero-art", { opacity: 0.82 }, { opacity: 1, duration: 0.85 });
          gsap.from(".hero-copy > *, .hero-actions .button", {
            y: 22,
            opacity: 0,
            duration: 0.65,
            stagger: 0.07,
            delay: 0.15,
            ease: "power2.out",
          });
          return;
        }

        gsap.fromTo(
          ".hero-art",
          { scale: 0.88, opacity: 0.72 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
        );
        gsap.from(".hero-copy > *", {
          y: 48,
          opacity: 0,
          duration: 1.1,
          stagger: 0.13,
          delay: 0.35,
          ease: "power3.out",
        });
        gsap.from(".hero-actions .button", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.75,
          ease: "power3.out",
        });

        const animateFrom = (selector: string, trigger: string, values: Record<string, unknown>) => {
          if (!document.querySelector(selector)) return;
          gsap.from(selector, {
            ...values,
            scrollTrigger: { trigger, start: "top 78%", once: true },
          });
        };
        const scrubWords = document.querySelectorAll(".diagnosis-thesis .word");
        if (scrubWords.length) {
          gsap.to(scrubWords, {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: ".diagnosis-thesis",
              start: "top 82%",
              end: "bottom 46%",
              scrub: true,
            },
          });
        }
        animateFrom(".diagnosis-panel", ".diagnosis-accordion", {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.09,
          ease: "power3.out",
        });
        gsap.to(".route-progress span", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".pillars-stack", start: "top 60%", end: "bottom 70%", scrub: true },
        });
        gsap.to(".route-progress i", {
          left: "100%",
          ease: "none",
          scrollTrigger: { trigger: ".pillars-stack", start: "top 60%", end: "bottom 70%", scrub: true },
        });
        const cards = [...document.querySelectorAll<HTMLElement>(".pillar-card")];
        cards.forEach((card, index) => {
          gsap.from(card, {
            y: 120,
            opacity: 0,
            scale: 0.92,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 86%", end: "top 48%", scrub: 1 },
          });
          if (cards[index + 1]) {
            gsap.to(card, {
              scale: 0.94 - index * 0.012,
              opacity: 0.52,
              ease: "none",
              scrollTrigger: {
                trigger: cards[index + 1],
                start: "top 72%",
                end: "top 22%",
                scrub: true,
              },
            });
          }
        });
        gsap.to(".range-line span", {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".audience-range", start: "top 72%", once: true },
        });
        animateFrom(".audience-signal", ".audience-signals", { x: 36, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out" });
        animateFrom(".growth-paths li", ".growth-paths", { y: 46, opacity: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" });
        animateFrom(".experience-specs > div", ".experience-specs", { y: 32, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
        animateFrom(".journey-station", ".journey-track", { y: 42, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
        animateFrom(".proof-step", ".case-timeline", { y: 36, opacity: 0, duration: 0.8, stagger: 0.09, ease: "power3.out" });
        animateFrom(".proof-metric", ".case-meter", { scale: 0.84, opacity: 0, duration: 1, stagger: 0.18, ease: "power3.out" });
        animateFrom(".mentor-photo img", ".mentor-viewport", { scale: 1.08, opacity: 0.35, duration: 1.15, stagger: 0.1, ease: "power3.out" });
        animateFrom(".authority-stat", ".authority-stats", { y: 42, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" });
        const authorityWords = document.querySelectorAll(".authority-close .word");
        if (authorityWords.length) {
          gsap.to(authorityWords, {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".authority-close",
              start: "top 82%",
              end: "bottom 48%",
              scrub: true,
            },
          });
        }
      }, document.body);

      ScrollTrigger.refresh();
    };

    void initializeGsap();

    return () => {
      cancelled = true;
      animationContext?.revert();
      observers.forEach((observer) => observer.disconnect());
      cleanups.reverse().forEach((cleanup) => cleanup());
      window.cancelAnimationFrame(headerFrame);
      closeMenu();
      delete document.body.dataset.page;
    };
  }, [variant]);

  return null;
}
