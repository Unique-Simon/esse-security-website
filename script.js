/* =========================================
   ESSE SECURITY SERVICES
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close the mobile menu after a navigation link is selected.
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    // Close the mobile menu when clicking outside it.
    document.addEventListener("click", function (event) {
      const clickedInsideMenu = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });

  }


  /* =========================================
     HERO IMAGE SLIDESHOW
  ========================================= */

  const slides = document.querySelectorAll(".hero-slide");
  const slideDots = document.querySelectorAll(".hero-dot");

  let currentSlide = 0;
  let slideshowTimer = null;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function showSlide(index) {

    if (!slides.length) {
      return;
    }

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach(function (slide, slideIndex) {
      const isActive = slideIndex === currentSlide;

      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    slideDots.forEach(function (dot, dotIndex) {
      const isActive = dotIndex === currentSlide;

      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

  }

  function startSlideshow() {

    if (reducedMotion || slides.length < 2) {
      return;
    }

    stopSlideshow();

    slideshowTimer = window.setInterval(function () {
      showSlide(currentSlide + 1);
    }, 1500);

  }

  function stopSlideshow() {

    if (slideshowTimer !== null) {
      window.clearInterval(slideshowTimer);
      slideshowTimer = null;
    }

  }

  if (slides.length) {

    showSlide(0);

    slideDots.forEach(function (dot) {

      dot.addEventListener("click", function () {

        const slideIndex = Number(dot.dataset.slide);

        if (Number.isInteger(slideIndex)) {
          showSlide(slideIndex);
          startSlideshow();
        }

      });

    });

    startSlideshow();

    // Pause the slideshow when the browser tab is hidden.
    document.addEventListener("visibilitychange", function () {

      if (document.hidden) {
        stopSlideshow();
      } else {
        startSlideshow();
      }

    });

  }


  /* =========================================
     BACK TO TOP BUTTON
  ========================================= */

  const backToTop = document.getElementById("backToTop");

  function updateBackToTop() {

    if (!backToTop) {
      return;
    }

    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

  }

  if (backToTop) {

    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", function () {

      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
      });

    });

  }


  /* =========================================
     AUTOMATIC COPYRIGHT YEAR
  ========================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =========================================
     CLOSE MENU WHEN RESIZING TO DESKTOP
  ========================================= */

  window.addEventListener("resize", function () {

    if (window.innerWidth > 850 && mainNav && menuToggle) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

  });

});