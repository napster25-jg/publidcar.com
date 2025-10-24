// =========================
// script.js - Publidcar 
// =========================

// PRELOADER CON CONTADOR
window.addEventListener("load", () => {
  console.log("🔄 Iniciando preloader...");
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const counterEl = document.getElementById("loader-counter");
  
  if (!loader || !mainContent) {
    console.error("❌ No se encontraron elementos del preloader");
    return;
  }

  let progress = 0;
  counterEl.textContent = "0%";

  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;
    counterEl.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.remove("hidden");
          console.log("✅ Preloader completado");
        }, 1000);
      }, 250);
    }
  }, 200);
});

// MENÚ DE CONTACTO SIMPLIFICADO
function initContactMenu() {
  console.log("🔄 Iniciando menú de contacto...");
  
  const contactToggle = document.getElementById('contactToggle');
  const contactMenu = document.getElementById('contactMenu');
  
  if (!contactToggle || !contactMenu) {
    console.error("❌ No se encontró el menú de contacto");
    return;
  }

  contactToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const isOpen = contactMenu.classList.contains('active');
    
    if (isOpen) {
      // Cerrar menú
      contactMenu.classList.remove('active');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
    } else {
      // Abrir menú
      contactMenu.classList.add('active');
      contactToggle.setAttribute('aria-expanded', 'true');
      contactMenu.setAttribute('aria-hidden', 'false');
    }
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', function(e) {
    if (contactMenu.classList.contains('active') && 
        !contactMenu.contains(e.target) && 
        e.target !== contactToggle) {
      contactMenu.classList.remove('active');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactMenu.classList.contains('active')) {
      contactMenu.classList.remove('active');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
    }
  });

  console.log("✅ Menú de contacto listo");
}

// LIGHTBOX BÁSICO
function initLightbox() {
  console.log("🔄 Iniciando lightbox...");
  
  const verButtons = document.querySelectorAll(".btn.ver");
  
  if (verButtons.length === 0) {
    console.log("ℹ️ No se encontraron botones Ver");
    return;
  }

  verButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      console.log("🔍 Click en botón Ver");
      
      // Simplemente redirigir a la página de detalle por ahora
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        window.location.href = href;
      }
    });
  });
}

// FAVORITOS SIMPLES
function initFavorites() {
  console.log("🔄 Iniciando sistema de favoritos...");
  
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("favorite")) {
      e.preventDefault();
      console.log("❤️ Click en favorito");
      
      const isFav = e.target.getAttribute("aria-pressed") === "true";
      e.target.setAttribute("aria-pressed", !isFav);
      
      // Cambiar corazón
      const heart = e.target.querySelector('span') || e.target;
      heart.textContent = isFav ? "❤" : "💖";
      
      // Efecto visual simple
      heart.style.transform = "scale(1.2)";
      setTimeout(() => {
        heart.style.transform = "scale(1)";
      }, 200);
    }
  });
}

// INICIALIZAR TODO CUANDO EL DOCUMENTO ESTÉ LISTO
document.addEventListener("DOMContentLoaded", function() {
  console.log("🚗 Inicializando Publidcar...");
  
  // Inicializar componentes uno por uno
  initContactMenu();
  initLightbox(); 
  initFavorites();
  
  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  console.log("✅ Publidcar inicializado correctamente");
});

// Manejo de errores global
window.addEventListener('error', function(e) {
  console.error('❌ Error global:', e.error);
});
