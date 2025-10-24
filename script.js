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

// ===========================
// MENÚ DE CONTACTO INTERACTIVO
// ===========================
function initContactMenu() {
  const contactToggle = document.getElementById('contactToggle');
  const contactMenu = document.getElementById('contactMenu');
  const closeContact = document.getElementById('closeContact');
  
  // Si no existen los elementos, salir silenciosamente
  if (!contactToggle || !contactMenu) return;
  
  // Abrir menú de contacto
  contactToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    contactMenu.classList.toggle('active');
    contactMenu.setAttribute('aria-hidden', isExpanded);
    
    // Enfocar el primer elemento del menú cuando se abre
    if (!isExpanded) {
      setTimeout(() => {
        const firstContactLink = contactMenu.querySelector('.contact-link');
        if (firstContactLink) firstContactLink.focus();
      }, 100);
    }
  });
  
  // Cerrar con botón
  closeContact.addEventListener('click', function() {
    closeContactMenu();
  });
  
  // Cerrar al hacer click fuera
  contactMenu.addEventListener('click', function(e) {
    if (e.target === this) {
      closeContactMenu();
    }
  });
  
  // Cerrar con Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactMenu.classList.contains('active')) {
      closeContactMenu();
    }
  });
  
  function closeContactMenu() {
    contactToggle.setAttribute('aria-expanded', 'false');
    contactMenu.classList.remove('active');
    contactMenu.setAttribute('aria-hidden', 'true');
    // Regresar el foco al botón de contacto
    contactToggle.focus();
  }
}

// ===========================
// LIGHTBOX / GALERÍA
// ===========================
function initLightbox() {
  const verButtons = document.querySelectorAll(".btn.ver");
  
  // Verificar si ya existe el lightbox para no duplicar
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    // crear lightbox
    lightbox = document.createElement("div");
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
  }

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

  // Asignar event listeners solo si no están ya asignados
  if (!btnClose._listenersAttached) {
    btnPrev.addEventListener("click", () => showIndex(currentIndex - 1));
    btnNext.addEventListener("click", () => showIndex(currentIndex + 1));
    btnClose.addEventListener("click", closeLightbox);
    btnClose._listenersAttached = true;
  }

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
    // Evitar asignar múltiples listeners
    if (btn._lightboxListener) return;
    
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
    
    btn._lightboxListener = true;
  });
}

// ===========================
// FAVORITOS (toggle)
// ===========================
function initFavorites() {
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("favorite")) {
      e.preventDefault();
      const pressed = target.getAttribute("aria-pressed") === "true";
      target.setAttribute("aria-pressed", !pressed);
      target.classList.toggle("is-fav");
      
      // Visual simple: cambiar símbolo con animación
      const heartSpan = target.querySelector("span");
      if (heartSpan) {
        heartSpan.textContent = pressed ? "❤" : "💖";
        // Pequeña animación
        heartSpan.style.transform = "scale(1.3)";
        setTimeout(() => {
          heartSpan.style.transform = "scale(1)";
        }, 200);
      } else {
        target.textContent = pressed ? "❤" : "💖";
      }
    }
  });
}

// ===========================
// INICIALIZACIÓN GENERAL
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar todas las funcionalidades
  initContactMenu();
  initLightbox();
  initFavorites();
  
  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Manejo mejorado del formulario
  const publicarForm = document.getElementById('publicar-form');
  if (publicarForm) {
    publicarForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validación básica
      const marca = this.querySelector('[name="marca"]').value.trim();
      const modelo = this.querySelector('[name="modelo"]').value.trim();
      
      if (!marca || !modelo) {
        alert('Por favor completa los campos obligatorios: Marca y Modelo');
        return;
      }
      
      // Simular envío exitoso
      alert('¡Gracias! Tu anuncio ha sido recibido. Nos pondremos en contacto contigo pronto.');
      this.reset();
    });
  }
  
  console.log('🚗 Publidcar - Todas las funcionalidades cargadas correctamente');
});

// ===========================
// MANEJO DE ERRORES GLOBALES
// ===========================
window.addEventListener('error', function(e) {
  console.error('Error en Publidcar:', e.error);
});

// Soporte para navegadores antiguos
if (typeof NodeList.prototype.forEach !== 'function') {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
