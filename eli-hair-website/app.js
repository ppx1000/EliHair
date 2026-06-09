const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const instagramRail = document.querySelector(".ig-rail");

if (instagramRail) {
  instagramRail.innerHTML += instagramRail.innerHTML;
}

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-active");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-active");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function updateParallax() {
  const scrollY = window.scrollY || window.pageYOffset;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();
    const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
    const y = Math.round((centerOffset * speed + scrollY * speed * 0.08) * 100) / 100;
    item.style.setProperty("--parallax-y", `${y}px`);
  });
}

let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  },
  { passive: true }
);

window.addEventListener("resize", updateParallax);
updateParallax();
