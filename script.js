// =========================
// script.js - Publidcar - VERSIÓN COMPLETA FUNCIONAL
// =========================

// PRELOADER CON CONTADOR QUE SÍ FUNCIONA
window.addEventListener("load", () => {
  console.log("🔄 Iniciando preloader...");
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const counterEl = document.getElementById("loader-counter");
  const loadingBtn = document.querySelector(".loading-btn");
  
  if (!loader || !mainContent) {
    console.error("❌ No se encontraron elementos del preloader");
    document.body.style.overflow = "auto";
    return;
  }

  let progress = 0;
  
  // Función para actualizar el contador
  function updateProgress() {
    if (counterEl) counterEl.textContent = `${progress}%`;
    if (loadingBtn) loadingBtn.textContent = `Cargando... ${progress}%`;
  }
  
  // Inicializar en 0%
  updateProgress();
  
  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;
    
    // Actualizar visualización
    updateProgress();
    
    console.log(`📊 Preloader: ${progress}%`);

    if (progress >= 100) {
      clearInterval(interval);
      console.log("✅ Preloader al 100%, iniciando transición...");
      
      // Pequeña pausa en el 100% antes de desaparecer
      setTimeout(() => {
        loader.classList.add("fade-out");
        console.log("🎬 Aplicando animación fade-out");
        
        // Esperar a que termine la animación CSS
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.remove("hidden");
          document.body.style.overflow = "auto";
          console.log("🎉 Preloader completado, mostrando contenido");
          
          // Inicializar todas las funciones después del preloader
          initAllFunctions();
        }, 1000); // Coincide con la transición CSS
      }, 500); // Pausa en el 100%
    }
  }, 180); // Un poco más rápido: 1.8 segundos total
});

// FUNCIÓN PRINCIPAL PARA INICIALIZAR TODO
function initAllFunctions() {
  console.log("🚗 Inicializando todas las funciones de Publidcar...");
  initContactMenu();
  initFavorites();
  initSmoothScroll();
  initFormValidation();
  console.log("✅ Todas las funciones inicializadas correctamente");
}

// MENÚ DE CONTACTO - VERSIÓN CONFIRMADA FUNCIONAL
function initContactMenu() {
  console.log("🔧 Inicializando menú de contacto...");
  
  const contactBtn = document.getElementById('contactToggle');
  const contactMenu = document.getElementById('contactMenu');
  const closeBtn = document.getElementById('closeContact');
  
  if (!contactBtn || !contactMenu) {
    console.error("❌ No se encontró el botón o menú de contacto");
    return;
  }
  
  console.log("✅ Elementos de contacto encontrados");
  
  // ABRIR MENÚ
  contactBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("🎯 Botón Contacto presionado!");
    
    // Cambiar visibilidad del menú
    const isOpen = contactMenu.classList.contains('active');
    
    if (isOpen) {
      // Cerrar menú
      contactMenu.classList.remove('active');
      contactMenu.classList.add('hidden');
      contactBtn.setAttribute('aria-expanded', 'false');
      console.log("❌ Menú de contacto cerrado");
    } else {
      // Abrir menú
      contactMenu.classList.remove('hidden');
      contactMenu.classList.add('active');
      contactBtn.setAttribute('aria-expanded', 'true');
      console.log("✅ Menú de contacto abierto");
    }
  });
  
  // CERRAR CON BOTÓN
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      contactMenu.classList.remove('active');
      contactMenu.classList.add('hidden');
      contactBtn.setAttribute('aria-expanded', 'false');
      console.log("❌ Menú cerrado con botón");
    });
  }
  
  // CERRAR AL HACER CLICK FUERA
  document.addEventListener('click', function(e) {
    if (contactMenu.classList.contains('active') && 
        !contactMenu.contains(e.target) && 
        e.target !== contactBtn) {
      contactMenu.classList.remove('active');
      contactMenu.classList.add('hidden');
      contactBtn.setAttribute('aria-expanded', 'false');
      console.log("❌ Menú cerrado (click fuera)");
    }
  });
  
  // CERRAR CON TECLA ESCAPE
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactMenu.classList.contains('active')) {
      contactMenu.classList.remove('active');
      contactMenu.classList.add('hidden');
      contactBtn.setAttribute('aria-expanded', 'false');
      console.log("❌ Menú cerrado (Escape)");
    }
  });
  
  console.log("🎉 Menú de contacto completamente funcional");
}

// SISTEMA DE FAVORITOS
function initFavorites() {
  console.log("❤️ Inicializando sistema de favoritos...");
  
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("favorite") || 
        e.target.closest(".favorite")) {
      
      e.preventDefault();
      const favoriteBtn = e.target.classList.contains("favorite") ? 
                          e.target : e.target.closest(".favorite");
      
      console.log("💖 Click en favorito");
      
      const isFav = favoriteBtn.getAttribute("aria-pressed") === "true";
      favoriteBtn.setAttribute("aria-pressed", !isFav);
      favoriteBtn.classList.toggle('is-fav');
      
      // Cambiar corazón con animación
      const heart = favoriteBtn.querySelector('span') || favoriteBtn;
      heart.textContent = isFav ? "❤" : "💖";
      
      // Efecto visual de animación
      heart.style.transform = "scale(1.3)";
      setTimeout(() => {
        heart.style.transform = "scale(1)";
      }, 200);
    }
  });
}

// SCROLL SUAVE
function initSmoothScroll() {
  console.log("↕️ Inicializando scroll suave...");
  
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
          console.log(`🔍 Navegando a: ${href}`);
        }
      }
    });
  });
}

// VALIDACIÓN DE FORMULARIO
function initFormValidation() {
  console.log("📝 Inicializando validación de formulario...");
  
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

// SISTEMA DE RESPALDO POR SI EL PRELOADER FALLA
document.addEventListener("DOMContentLoaded", function() {
  console.log("📄 DOM completamente cargado");
  
  // Si después de 4 segundos el preloader sigue visible, forzar inicialización
  setTimeout(() => {
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");
    
    if (loader && loader.style.display !== "none") {
      console.log("⚠️ Preloader tardando mucho, forzando inicialización...");
      loader.style.display = "none";
      if (mainContent) mainContent.classList.remove("hidden");
      document.body.style.overflow = "auto";
      initAllFunctions();
    }
  }, 4000);
});

// MANEJO DE ERRORES GLOBALES
window.addEventListener('error', function(e) {
  console.error('❌ Error detectado:', e.error);
});

console.log("🚗 Script.js de Publidcar cargado - Esperando preloader...");
