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
  if (counterEl) counterEl.textContent = "0%";

  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;
    if (counterEl) counterEl.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.remove("hidden");
          console.log("✅ Preloader completado");
          // Inicializar todo después del preloader
          initAll();
        }, 1000);
      }, 250);
    }
  }, 200);
});

// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
function initAll() {
  console.log("🚗 Inicializando Publidcar...");
  initContactMenu();
  initFavorites();
  initSmoothScroll();
  initForm();
  console.log("✅ Todas las funciones inicializadas");
}

// MENÚ DE CONTACTO - VERSIÓN SIMPLIFICADA Y FUNCIONAL
function initContactMenu() {
  console.log("🔄 Iniciando menú de contacto...");
  
  const contactToggle = document.getElementById('contactToggle');
  const contactMenu = document.getElementById('contactMenu');
  const closeContact = document.getElementById('closeContact');
  
  if (!contactToggle || !contactMenu) {
    console.error("❌ No se encontraron elementos del menú de contacto");
    return;
  }

  console.log("✅ Elementos del menú encontrados");

  // Abrir/cerrar menú
  contactToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("📞 Click en botón contacto");
    
    const isOpen = contactMenu.classList.contains('active');
    
    if (isOpen) {
      // Cerrar menú
      contactMenu.classList.remove('active');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
      console.log("❌ Menú cerrado");
    } else {
      // Abrir menú
      contactMenu.classList.add('active');
      contactToggle.setAttribute('aria-expanded', 'true');
      contactMenu.setAttribute('aria-hidden', 'false');
      console.log("✅ Menú abierto");
    }
  });

  // Cerrar con botón
  if (closeContact) {
    closeContact.addEventListener('click', function() {
      contactMenu.classList.remove('active');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
      console.log("❌ Menú cerrado con botón");
    });
  }

  // Cerrar al hacer click fuera del menú
  document.addEventListener('click', function(e) {
    if (contactMenu.classList.contains('active') && 
        !contactMenu.contains(e.target) && 
        e.target !== contactToggle) {
      contactMenu.classList.remove('active');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
      console.log("❌ Menú cerrado (click fuera)");
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactMenu.classList.contains('active')) {
      contactMenu.classList.remove('active');
      contactToggle.setAttribute('aria-expanded', 'false');
      contactMenu.setAttribute('aria-hidden', 'true');
      console.log("❌ Menú cerrado (Escape)");
    }
  });

  console.log("✅ Menú de contacto listo");
}

// SISTEMA DE FAVORITOS
function initFavorites() {
  console.log("🔄 Iniciando sistema de favoritos...");
  
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("favorite") || 
        e.target.closest(".favorite")) {
      
      e.preventDefault();
      const favoriteBtn = e.target.classList.contains("favorite") ? e.target : e.target.closest(".favorite");
      
      console.log("❤️ Click en favorito");
      
      const isFav = favoriteBtn.getAttribute("aria-pressed") === "true";
      favoriteBtn.setAttribute("aria-pressed", !isFav);
      favoriteBtn.classList.toggle('is-fav');
      
      // Cambiar corazón
      const heart = favoriteBtn.querySelector('span') || favoriteBtn;
      heart.textContent = isFav ? "❤" : "💖";
      
      // Efecto visual
      heart.style.transform = "scale(1.3)";
      setTimeout(() => {
        heart.style.transform = "scale(1)";
      }, 200);
    }
  });
}

// SCROLL SUAVE
function initSmoothScroll() {
  console.log("🔄 Iniciando scroll suave...");
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#publicar') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          console.log(`🔍 Scroll a: ${href}`);
        }
      }
    });
  });
}

// MANEJO DE FORMULARIO
function initForm() {
  console.log("🔄 Iniciando formulario...");
  
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
      console.log("✅ Formulario enviado correctamente");
    });
  }
}

// INICIALIZACIÓN DE EMERGENCIA SI EL PRELOADER FALLA
document.addEventListener("DOMContentLoaded", function() {
  console.log("📄 DOM cargado");
  
  // Si después de 3 segundos el preloader no se cierra, forzar inicialización
  setTimeout(() => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");
    
    if (loader && loader.style.display !== "none") {
      console.log("⚠️ Preloader tardando, forzando inicialización...");
      loader.style.display = "none";
      if (mainContent) mainContent.classList.remove("hidden");
      initAll();
    }
  }, 3000);
});

// Manejo de errores global
window.addEventListener('error', function(e) {
  console.error('❌ Error global:', e.error);
});

console.log("📝 Script.js cargado - Esperando inicialización...");
