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
const heroMedia = document.querySelector(".hero-media");

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

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener(
    "canplay",
    () => {
      const wrapper = video.closest(".hero-media, .structure-visual");
      if (wrapper) {
        wrapper.classList.add("has-video");
      }
    },
    { once: true }
  );

  video.addEventListener(
    "error",
    () => {
      const wrapper = video.closest(".hero-media, .structure-visual");
      if (wrapper) {
        wrapper.classList.remove("has-video");
      }
    },
    { once: true }
  );
});

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
