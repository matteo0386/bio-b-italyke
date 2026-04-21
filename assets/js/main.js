document.documentElement.classList.add("js");

const body = document.body;
const header = document.querySelector("[data-site-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-site-menu]");
const menuLinks = document.querySelectorAll("[data-site-menu] a");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const isSmallViewport = window.matchMedia("(max-width: 760px)");

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-solid", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const closeMenu = () => {
  body.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-hidden", "true");
};

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const photoRevealElements = Array.from(
  document.querySelectorAll(
    ".media-slider, .editorial__media, .room-showcase, .room-suite__media, .experience-card, .gallery-band img, .cta, .instagram-post"
  )
);

photoRevealElements.forEach((element, index) => {
  element.classList.add("photo-reveal");
  element.style.setProperty("--photo-reveal-delay", `${(index % 3) * 70}ms`);
});

if (photoRevealElements.length) {
  if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
    const photoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-photo-visible", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.18 }
    );

    photoRevealElements.forEach((element) => photoObserver.observe(element));
  } else {
    photoRevealElements.forEach((element) => element.classList.add("is-photo-visible"));
  }
}

const initSlider = (slider) => {
  const slides = Array.from(slider.querySelectorAll("[data-slide]"));
  const previousButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  const dotsContainer = slider.querySelector("[data-slider-dots]");
  const delay = Number(slider.dataset.interval || 6200);
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
  let timer = 0;

  if (slides.length === 0) return;

  const dots = dotsContainer
    ? slides.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Vai all'immagine ${index + 1}`);
        dot.addEventListener("click", () => goTo(index, true));
        dotsContainer.append(dot);
        return dot;
      })
    : [];

  const update = () => {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };

  const start = () => {
    if (slides.length < 2 || prefersReducedMotion.matches || timer) return;
    timer = window.setInterval(() => goTo(activeIndex + 1), delay);
  };

  function goTo(index, userAction = false) {
    activeIndex = (index + slides.length) % slides.length;
    update();

    if (userAction) {
      stop();
      start();
    }
  }

  previousButton?.addEventListener("click", () => goTo(activeIndex - 1, true));
  nextButton?.addEventListener("click", () => goTo(activeIndex + 1, true));
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  slider.addEventListener("focusin", stop);
  slider.addEventListener("focusout", start);

  update();
  start();
};

document.querySelectorAll("[data-slider]").forEach(initSlider);

const heroVideos = Array.from(document.querySelectorAll("[data-hero-video]"));

const loadHeroVideos = () => {
  if (prefersReducedMotion.matches) return;

  heroVideos.forEach((video) => {
    if (video.dataset.loaded === "true") return;

    video.querySelectorAll("source[data-src]").forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
    });

    video.dataset.loaded = "true";
    video.load();

    const playVideo = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", () => video.classList.add("is-loaded"), { once: true });

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }
  });
};

if (heroVideos.length) {
  const scheduleHeroVideoLoad = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadHeroVideos, { timeout: 1600 });
    } else {
      window.setTimeout(loadHeroVideos, 650);
    }
  };

  if (document.readyState === "complete") {
    scheduleHeroVideoLoad();
  } else {
    window.addEventListener("load", scheduleHeroVideoLoad, { once: true });
  }
}

document
  .querySelectorAll(".page-hero__image, .media-slide img, .editorial__media img, .strip-image img, .cta img, .room-suite__media img")
  .forEach((element) => {
    if (!element.hasAttribute("data-parallax")) {
      element.setAttribute("data-parallax", "0.18");
    }
  });

const parallaxElements = Array.from(document.querySelectorAll("[data-parallax]"));
let parallaxTicking = false;

const updateParallax = () => {
  const viewportHeight = window.innerHeight || 1;

  parallaxElements.forEach((element) => {
    const frame =
      element.closest(".hero, .page-hero, .media-slider, .editorial__media, .strip-image, .cta, .room-suite__media") ||
      element.parentElement;

    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewportHeight) return;

    const speed = Number(element.dataset.parallax || 0.25);
    const centerDelta = rect.top + rect.height / 2 - viewportHeight / 2;
    const y = centerDelta * -0.14 * speed;
    element.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
  });

  parallaxTicking = false;
};

const requestParallax = () => {
  if (parallaxTicking || prefersReducedMotion.matches) return;
  parallaxTicking = true;
  window.requestAnimationFrame(updateParallax);
};

if (parallaxElements.length && !prefersReducedMotion.matches && !isSmallViewport.matches) {
  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const get = (name) => String(data.get(name) || "").trim();
    const whatsappLines = [
      "Buongiorno, vorrei inviare una richiesta per Bio&B Italyke.",
      "",
      `Nome: ${get("nome")}`,
      `Email: ${get("email")}`,
      `Telefono: ${get("telefono") || "Non indicato"}`,
      `Arrivo: ${get("arrivo") || "Da definire"}`,
      `Partenza: ${get("partenza") || "Da definire"}`,
      `Ospiti: ${get("ospiti") || "Da definire"}`,
      `Interesse: ${get("interesse") || "Da definire"}`,
      "",
      "Messaggio:",
      get("messaggio"),
    ];

    const whatsappUrl = `https://wa.me/393923048053?text=${encodeURIComponent(whatsappLines.join("\n"))}`;
    const status = contactForm.querySelector("[data-form-status]");

    if (status) {
      status.textContent = "Sto aprendo WhatsApp con la richiesta compilata.";
    }

    window.open(whatsappUrl, "_blank", "noopener");
  });
}
