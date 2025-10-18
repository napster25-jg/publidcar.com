// =========================
// script.js - Publidcar
// =========================

// PRELOADER CON CONTADOR (0 -> 100 en pasos de 10)
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const counterEl = document.getElementById("loader-counter");
  const loadingBtn = loader.querySelector(".loading-btn");

  let progress = 0;
  counterEl.textContent = "0%";
  loadingBtn.textContent = "Cargando... 0%";

  // incrementar cada 200ms -> 10 pasos -> 2 segundos aprox.
  const stepMs = 200;
  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;
    counterEl.textContent = `${progress}%`;
    loadingBtn.textContent = `Cargando... ${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      // pequeño retardo visual antes del fade
      setTimeout(() => {
        loader.classList.add("fade-out");
        // esperar la transición (1s) para remover el loader y mostrar contenido
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.remove("hidden");
        }, 1000); // coincide con transition en CSS
      }, 250);
    }
  }, stepMs);
});

// LIGHTBOX / GALERÍA
document.addEventListener("DOMContentLoaded", () => {
  const verButtons = document.querySelectorAll(".btn.ver");
  // crear lightbox
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content" role="dialog" aria-modal="true" aria-label="Galería de imágenes">
      <button class="lightbox-close" aria-label="Cerrar galería">✖</button>
      <button class="lightbox-prev" aria-label="Imagen anterior">◀</button>
      <img class="lightbox-image" src="" alt="Imagen del vehículo">
      <button class="lightbox-next" aria-label="Imagen siguiente">▶</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector(".lightbox-image");
  const btnClose = lightbox.querySelector(".lightbox-close");
  const btnPrev = lightbox.querySelector(".lightbox-prev");
  const btnNext = lightbox.querySelector(".lightbox-next");

  let images = [];
  let currentIndex = 0;

  function openLightbox(imgArray, startIndex = 0) {
    images = imgArray.map(s => s.trim()).filter(Boolean);
    if (!images.length) return;
    currentIndex = Math.max(0, Math.min(startIndex, images.length - 1));
    imgEl.src = images[currentIndex];
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    // focus para accesibilidad
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    imgEl.src = "";
  }

  function showIndex(i) {
    if (!images.length) return;
    currentIndex = (i + images.length) % images.length;
    imgEl.src = images[currentIndex];
  }

  btnPrev.addEventListener("click", () => showIndex(currentIndex - 1));
  btnNext.addEventListener("click", () => showIndex(currentIndex + 1));
  btnClose.addEventListener("click", closeLightbox);

  // cerrar al hacer click fuera del contenido (en el propio lightbox)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // teclado: Escape, flechas
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showIndex(currentIndex - 1);
    if (e.key === "ArrowRight") showIndex(currentIndex + 1);
  });

  // Asociar botones "Ver" a abrir galería (usa data-gallery del .card)
  verButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // el .btn.ver puede ser un <a> dentro del overlay, buscamos la card
      const card = btn.closest(".card");
      if (!card) return;
      const gallery = card.dataset.gallery;
      if (!gallery) return;
      const imgs = gallery.split(",").map(s => s.trim()).filter(Boolean);
      openLightbox(imgs, 0);
    });
  });
});

// FAVORITOS (toggle)
document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("favorite")) {
    e.preventDefault();
    const pressed = target.getAttribute("aria-pressed") === "true";
    target.setAttribute("aria-pressed", !pressed);
    // Visual simple: cambiar símbolo
    target.textContent = pressed ? "❤" : "💖";
  }
});
