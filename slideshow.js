/* Screenshot slideshow on The Game page.
   Without JavaScript every screenshot simply shows one after another. */

document.querySelectorAll("[data-slideshow]").forEach((show) => {
  const slides = Array.from(show.querySelectorAll(".slide"));
  const dots = Array.from(show.querySelectorAll(".dot"));
  const counter = show.querySelector(".slideshow-count");
  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length; // wrap around at both ends
    slides.forEach((slide, i) => (slide.hidden = i !== current));
    dots.forEach((dot, i) => dot.setAttribute("aria-current", i === current ? "true" : "false"));
    counter.textContent = `${current + 1} / ${slides.length}`;
  }

  show.querySelector("[data-prev]").addEventListener("click", () => goTo(current - 1));
  show.querySelector("[data-next]").addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  // Left / right arrow keys work while focus is anywhere inside the slideshow.
  show.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goTo(current - 1);
    if (event.key === "ArrowRight") goTo(current + 1);
  });

  // Swipe left / right on touch screens.
  let touchStartX = null;
  show.addEventListener("touchstart", (event) => (touchStartX = event.touches[0].clientX), { passive: true });
  show.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 50) goTo(distance < 0 ? current + 1 : current - 1);
    touchStartX = null;
  });

  show.classList.add("is-active"); // turns on the one-at-a-time layout
  goTo(0);
});
