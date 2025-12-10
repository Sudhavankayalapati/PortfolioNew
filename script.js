// script.js — interactions: nav toggle, active on scroll, reveal, typewriter, back-to-top
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksWrap = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const revealEls = document.querySelectorAll(".reveal");
  const typingEl = document.querySelector(".typing");
  const backToTop = document.querySelector(".back-to-top");
  const yearEl = document.getElementById("year");

  // set copyright year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  navToggle && navToggle.addEventListener("click", () => {
    navLinksWrap.classList.toggle("open");
  });

  // close nav when clicking a link
  navLinks.forEach(link => link.addEventListener("click", () => {
    navLinksWrap.classList.remove("open");
  }));

  // smooth scroll for internal links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // active nav on scroll
  window.addEventListener("scroll", () => {
    const y = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const h = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (y >= top && y < top + h) {
        navLinks.forEach(a => a.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        active && active.classList.add("active");
      }
    });

    // back to top toggle
    if (y > 450) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });

  // back to top click
  backToTop && backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Intersection Observer for reveal animations
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("show");
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => io.observe(el));

  // Simple typewriter
  const roles = [
    "Aspiring Java Full-Stack Developer",
    "Java · Spring Boot · REST APIs · MariaDB",
    "Angular · Responsive Frontends"
  ];
  let rIndex = 0, cIndex = 0, deleting = false;
  function type() {
    if (!typingEl) return;
    const cur = roles[rIndex];
    if (!deleting) {
      typingEl.textContent = cur.substring(0, cIndex + 1);
      cIndex++;
      if (cIndex === cur.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      typingEl.textContent = cur.substring(0, cIndex - 1);
      cIndex--;
      if (cIndex === 0) {
        deleting = false;
        rIndex = (rIndex + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 40 : 85);
  }
  type();
});
