document.documentElement.classList.add("has-js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const navLinks = navigation ? navigation.querySelectorAll("a") : [];
const mainContent = document.querySelector("main");
const footer = document.querySelector(".site-footer");

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  if (mainContent) mainContent.inert = false;
  if (footer) footer.inert = false;
  if (restoreFocus) menuButton.focus();
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  const shouldOpen = !isOpen;
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navigation?.classList.toggle("is-open", shouldOpen);
  document.body.classList.toggle("menu-open", shouldOpen);
  if (mainContent) mainContent.inert = shouldOpen;
  if (footer) footer.inert = shouldOpen;
  if (shouldOpen) navigation?.querySelector("a")?.focus();
});

navLinks.forEach((link) => link.addEventListener("click", () => closeMenu({ restoreFocus: link.target === "_blank" })));
document.addEventListener("keydown", (event) => {
  if (menuButton?.getAttribute("aria-expanded") !== "true") return;
  if (event.key === "Escape") closeMenu({ restoreFocus: true });
  if (event.key !== "Tab" || !navigation) return;

  const focusableLinks = [...navigation.querySelectorAll("a[href]")];
  const firstLink = focusableLinks[0];
  const lastLink = focusableLinks.at(-1);
  if (event.shiftKey && document.activeElement === firstLink) {
    event.preventDefault();
    lastLink?.focus();
  } else if (!event.shiftKey && document.activeElement === lastLink) {
    event.preventDefault();
    firstLink?.focus();
  }
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll('a[href="#inicio"]').forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  closeMenu();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  history.replaceState(null, "", "#inicio");
}));

const siteHeader =document.querySelector(".site-header");
const updateHeader = () => siteHeader?.classList.toggle("is-floating", window.scrollY > 24);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

window.addEventListener("resize", () => {
  if (window.innerWidth > 680) closeMenu();
}, { passive: true });
