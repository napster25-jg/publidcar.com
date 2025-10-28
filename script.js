// =========================
// script.js - Publidcar - VERSIÓN COMPLETA FUNCIONAL CON GALERÍA
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
  initGallery(); // ✅ FUNCIÓN DE GALERÍA
  updatePhotoCounters(); // ✅ NUEVO: CONTADOR AUTOMÁTICO
  console.log("✅ Todas las funciones inicializadas correctamente");
}

// =========================
// CONTADOR AUTOMÁTICO DE FOTOS - NUEVA FUNCIÓN
// =========================
function updatePhotoCounters() {
  console.log("📸 Actualizando contadores de fotos automáticamente...");
  
  document.querySelectorAll('[data-gallery]').forEach(card => {
    const galleryData = card.getAttribute('data-gallery');
    const photoCountElement = card.querySelector('.photo-count');
    
    if (galleryData && photoCountElement) {
      const photos = galleryData.split(',');
      const photoCount = photos.length;
      
      // Actualizar el texto visible "4 fotos" → "7 fotos"
      photoCountElement.textContent = `${photoCount} fotos`;
      
      // Actualizar también data-count por consistencia
      card.setAttribute('data-count', photoCount);
      
      console.log(`🔄 ${card.getAttribute('data-title')}: ${photoCount} fotos`);
    }
  });
  
  console.log("✅ Contadores de fotos actualizados correctamente");
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

// =========================
// GALERÍA LIGHTBOX
// =========================
function initGallery() {
  console.log("🖼️ Inicializando sistema de galería lightbox...");
  
  // Crear el lightbox (similar a tu contact-menu)
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <div class="gallery-content">
      <button class="gallery-close" aria-label="Cerrar galería">×</button>
      <div class="gallery-counter">
        <span class="current-index">1</span> / <span class="total-count">0</span>
      </div>
      <div class="gallery-main">
        <img class="gallery-image" src="" alt="" />
      </div>
      <div class="gallery-thumbnails"></div>
      <button class="gallery-nav gallery-prev" aria-label="Foto anterior">‹</button>
      <button class="gallery-nav gallery-next" aria-label="Foto siguiente">›</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Configurar botones "Ver"
  document.querySelectorAll('.btn.ver').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.card');
      openGallery(card);
    });
  });
  
  console.log("🎉 Sistema de galería inicializado correctamente");
}

function openGallery(card) {
  const galleryData = card.getAttribute('data-gallery');
  
  if (!galleryData) {
    console.error('❌ No se encontró data-gallery en el card');
    alert('No hay galería de fotos disponible para este vehículo');
    return;
  }

  const photos = galleryData.split(',').map(photo => photo.trim());
  const lightbox = document.querySelector('.gallery-lightbox');
  const lightboxImage = lightbox.querySelector('.gallery-image');
  const thumbnailsContainer = lightbox.querySelector('.gallery-thumbnails');
  const currentIndexEl = lightbox.querySelector('.current-index');
  const totalCountEl = lightbox.querySelector('.total-count');
  
  let currentIndex = 0;

  // Mostrar lightbox (igual que tu contact-menu)
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  console.log("🖼️ Abriendo galería con", photos.length, "fotos");

  // Actualizar contador
  totalCountEl.textContent = photos.length;

  // Función de navegación
  function navigateTo(index) {
    currentIndex = index;
    lightboxImage.src = photos[currentIndex];
    lightboxImage.alt = `Imagen ${currentIndex + 1} de ${photos.length} - ${card.getAttribute('data-title') || 'Vehículo'}`;
    currentIndexEl.textContent = currentIndex + 1;
    
    // Actualizar miniaturas activas
    thumbnailsContainer.querySelectorAll('.thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });
    
    console.log(`🔄 Navegando a foto ${currentIndex + 1}/${photos.length}`);
  }

  // Crear miniaturas
  thumbnailsContainer.innerHTML = '';
  photos.forEach((photo, index) => {
    const thumb = document.createElement('img');
    thumb.src = photo;
    thumb.alt = `Miniatura ${index + 1}`;
    thumb.className = 'thumb';
    if (index === 0) thumb.classList.add('active');
    thumb.addEventListener('click', () => navigateTo(index));
    thumbnailsContainer.appendChild(thumb);
  });

  // Cargar primera imagen
  navigateTo(0);

  // Event listeners para navegación
  lightbox.querySelector('.gallery-next').addEventListener('click', () => {
    navigateTo((currentIndex + 1) % photos.length);
  });

  lightbox.querySelector('.gallery-prev').addEventListener('click', () => {
    navigateTo((currentIndex - 1 + photos.length) % photos.length);
  });

  // Cerrar lightbox
  lightbox.querySelector('.gallery-close').addEventListener('click', closeGallery);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeGallery();
  });

  // Navegación con teclado
  document.addEventListener('keydown', function keyHandler(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeGallery();
        break;
      case 'ArrowRight':
        navigateTo((currentIndex + 1) % photos.length);
        break;
      case 'ArrowLeft':
        navigateTo((currentIndex - 1 + photos.length) % photos.length);
        break;
    }
  });
}

function closeGallery() {
  const lightbox = document.querySelector('.gallery-lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
  console.log("❌ Galería cerrada");
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
