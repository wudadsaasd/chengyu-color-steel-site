const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.classList.toggle("is-open");
    mobileNav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.classList.remove("is-open");
      mobileNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const structureVisual = document.querySelector(".structure-visual");
const steps = document.querySelectorAll(".step");

steps.forEach((step) => {
  step.addEventListener("click", () => {
    steps.forEach((item) => item.classList.remove("is-active"));
    step.classList.add("is-active");
    if (structureVisual) {
      structureVisual.dataset.active = step.dataset.layer || "roof";
    }
  });
});

if (structureVisual) {
  structureVisual.dataset.active = "roof";
}

const siteVideos = document.querySelectorAll("video");

const playSiteVideos = () => {
  siteVideos.forEach((video) => {
    const playRequest = video.play();

    if (playRequest) {
      playRequest.catch(() => {});
    }
  });
};

siteVideos.forEach((video) => {
  const wrapper = video.closest(".hero-media, .structure-visual");
  const markReady = () => {
    if (wrapper) {
      wrapper.classList.add("has-video");
      wrapper.classList.remove("video-failed");
    }
  };
  const markFailed = () => {
    if (wrapper) {
      wrapper.classList.remove("has-video");
      wrapper.classList.add("video-failed");
    }
  };

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  ["loadedmetadata", "loadeddata", "canplay", "playing", "timeupdate"].forEach((eventName) => {
    video.addEventListener(eventName, markReady, { once: true });
  });

  video.addEventListener("error", markFailed, { once: true });

  if (video.readyState >= 2) {
    markReady();
  }
});

playSiteVideos();
window.addEventListener("pageshow", playSiteVideos);
window.addEventListener("pointerdown", playSiteVideos, { once: true });
window.addEventListener("touchstart", playSiteVideos, { once: true, passive: true });

document.documentElement.classList.add("reveal-ready");

document.querySelectorAll(".section, .trust-strip article, .color-card, .proof-card, .service-grid article, .case-grid article").forEach((element) => {
  element.setAttribute("data-reveal", "");
});

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

document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

const contactSection = document.querySelector("#contact");

if (contactSection) {
  const contactObserver = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle("contact-visible", entry.isIntersecting);
    },
    { threshold: 0.18 }
  );

  contactObserver.observe(contactSection);
}
