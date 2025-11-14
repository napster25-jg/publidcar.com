// =========================
// script.js - Publidcar - VERSIÓN OPTIMIZADA Y CORREGIDA
// =========================

console.log("🚗 Script.js de Publidcar cargado - Esperando preloader...");

// =========================
// PRELOADER CON CONTADOR
// =========================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const counterEl = document.getElementById("loader-counter");
  const loadingBtn = document.querySelector(".loading-btn");

  if (!loader || !mainContent) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) progress = 100;
    if (counterEl) counterEl.textContent = `${progress}%`;
    if (loadingBtn) loadingBtn.textContent = `Cargando... ${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.remove("hidden");
          document.body.style.overflow = "auto";
          initAllFunctions();
        }, 1000);
      }, 500);
    }
  }, 180);
});

// =========================
// CONTADOR DE FOTOS
// =========================
function updatePhotoCounters() {
  document.querySelectorAll('[data-gallery]').forEach(card => {
    const galleryData = card.getAttribute('data-gallery');
    const photoCountElement = card.querySelector('.photo-count');
    if (galleryData && photoCountElement) {
      const photos = galleryData.split(',').map(p => p.trim());
      const photoCount = photos.length;
      photoCountElement.textContent = `${photoCount} fotos`;
      card.setAttribute('data-count', photoCount);
    }
  });
}

// =========================
// MENÚ DE CONTACTO
// =========================
function initContactMenu() {
  const contactBtn = document.getElementById('contactToggle');
  const contactMenu = document.getElementById('contactMenu');
  const closeBtn = document.getElementById('closeContact');
  if (!contactBtn || !contactMenu) return;

  function closeMenu() {
    contactMenu.classList.remove('active');
    contactMenu.classList.add('hidden');
    contactBtn.setAttribute('aria-expanded', 'false');
  }

  contactBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    contactMenu.classList.contains('active') ? closeMenu() : (() => {
      contactMenu.classList.remove('hidden');
      contactMenu.classList.add('active');
      contactBtn.setAttribute('aria-expanded', 'true');
    })();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('click', e => {
    if (contactMenu.classList.contains('active') && !contactMenu.contains(e.target) && e.target !== contactBtn) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && contactMenu.classList.contains('active')) closeMenu();
  });
}

// =========================
// SISTEMA DE FAVORITOS
// =========================
function initFavorites() {
  document.addEventListener("click", e => {
    const favBtn = e.target.closest(".favorite");
    if (!favBtn) return;
    e.preventDefault();
    const isFav = favBtn.getAttribute("aria-pressed") === "true";
    favBtn.setAttribute("aria-pressed", (!isFav).toString());
    favBtn.classList.toggle('is-fav');
    const heart = favBtn.querySelector('span') || favBtn;
    heart.textContent = isFav ? "❤" : "💖";
    heart.style.transition = "transform 0.2s";
    heart.style.transform = "scale(1.3)";
    setTimeout(() => heart.style.transform = "scale(1)", 200);
  });
}

// =========================
// SCROLL SUAVE
// =========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// =========================
// FORMULARIO
// =========================
function initFormValidation() {
  const form = document.getElementById('publicar-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const marca = form.querySelector('[name="marca"]').value.trim();
    const modelo = form.querySelector('[name="modelo"]').value.trim();
    if (!marca || !modelo) {
      alert('Por favor completa los campos obligatorios: Marca y Modelo');
      return;
    }
    alert('¡Gracias! Tu anuncio ha sido recibido.');
    form.reset();
  });
}

// =========================
// SUBIDA DE IMÁGENES
// =========================
function initImageUpload() {
  const uploadArea = document.querySelector('.file-upload');
  if (!uploadArea) return;

  const uploadWrapper = document.createElement('div');
  uploadWrapper.className = 'image-upload-area';
  uploadWrapper.innerHTML = `
    <p>📸 Arrastra tus fotos aquí o <span class="browse">haz clic para seleccionar</span></p>
    <input type="file" id="fileInput" accept="image/*" multiple hidden>
    <div class="preview-gallery" id="previewGallery"></div>
  `;
  uploadArea.replaceWith(uploadWrapper);

  const fileInput = uploadWrapper.querySelector('#fileInput');
  const previewGallery = uploadWrapper.querySelector('#previewGallery');

  uploadWrapper.addEventListener('click', () => fileInput.click());
  uploadWrapper.addEventListener('dragover', e => { e.preventDefault(); uploadWrapper.classList.add('dragover'); });
  uploadWrapper.addEventListener('dragleave', () => uploadWrapper.classList.remove('dragover'));
  uploadWrapper.addEventListener('drop', e => { e.preventDefault(); uploadWrapper.classList.remove('dragover'); handleFiles(e.dataTransfer.files); });
  fileInput.addEventListener('change', () => handleFiles(fileInput.files));

  function handleFiles(files) {
    previewGallery.innerHTML = '';
    [...files].slice(0, 5).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        previewGallery.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }
}

// =========================
// GALERÍA LIGHTBOX
// =========================
function initGallery() {
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <div class="gallery-content">
      <button class="gallery-close" aria-label="Cerrar galería">×</button>
      <div class="gallery-counter"><span class="current-index">1</span> / <span class="total-count">0</span></div>
      <div class="gallery-main"><img class="gallery-image" src="" alt="" /></div>
      <div class="gallery-thumbnails"></div>
      <button class="gallery-nav gallery-prev" aria-label="Foto anterior">‹</button>
      <button class="gallery-nav gallery-next" aria-label="Foto siguiente">›</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  document.querySelectorAll('.btn.ver').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openGallery(btn.closest('.card'));
    });
  });

  let currentIndex = 0;
  let photos = [];

  function openGallery(card) {
    if (!card) return;
    const galleryData = card.dataset.gallery;
    if (!galleryData) return alert('No hay galería de fotos disponible.');

    photos = galleryData.split(',').map(p => p.trim());
    currentIndex = 0;

    const lightboxImage = lightbox.querySelector('.gallery-image');
    const thumbnailsContainer = lightbox.querySelector('.gallery-thumbnails');
    const currentIndexEl = lightbox.querySelector('.current-index');
    const totalCountEl = lightbox.querySelector('.total-count');

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    totalCountEl.textContent = photos.length;

    function navigateTo(index) {
      currentIndex = index;
      lightboxImage.src = photos[currentIndex];
      lightboxImage.alt = `Imagen ${currentIndex + 1} de ${photos.length} - ${card.dataset.title || 'Vehículo'}`;
      currentIndexEl.textContent = currentIndex + 1;
      thumbnailsContainer.querySelectorAll('.thumb').forEach((thumb, i) => thumb.classList.toggle('active', i === currentIndex));
    }

    thumbnailsContainer.innerHTML = '';
    photos.forEach((photo, i) => {
      const thumb = document.createElement('img');
      thumb.src = photo;
      thumb.alt = `Miniatura ${i + 1}`;
      thumb.className = 'thumb';
      if (i === 0) thumb.classList.add('active');
      thumb.addEventListener('click', () => navigateTo(i));
      thumbnailsContainer.appendChild(thumb);
    });

    navigateTo(0);

    lightbox.querySelector('.gallery-next').onclick = () => navigateTo((currentIndex + 1) % photos.length);
    lightbox.querySelector('.gallery-prev').onclick = () => navigateTo((currentIndex - 1 + photos.length) % photos.length);
    lightbox.querySelector('.gallery-close').onclick = closeGallery;
  }

  function closeGallery() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') navigateGallery(1);
    if (e.key === 'ArrowLeft') navigateGallery(-1);
  });

  function navigateGallery(step) {
    if (!photos.length) return;
    currentIndex = (currentIndex + step + photos.length) % photos.length;
    const lightboxImage = lightbox.querySelector('.gallery-image');
    const thumbnailsContainer = lightbox.querySelector('.gallery-thumbnails');
    const currentIndexEl = lightbox.querySelector('.current-index');
    lightboxImage.src = photos[currentIndex];
    currentIndexEl.textContent = currentIndex + 1;
    thumbnailsContainer.querySelectorAll('.thumb').forEach((thumb, i) => thumb.classList.toggle('active', i === currentIndex));
  }
}

// =========================
// BUSCADOR AVANZADO / FILTROS
// =========================
function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const filterCity = document.getElementById('filterCity');
  const filterYear = document.getElementById('filterYear');
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  const cards = document.querySelectorAll('.galeria-grid .card');

  const noResultsMessage = document.createElement('div');
  noResultsMessage.textContent = "😕 No se encontraron resultados";
  noResultsMessage.style.textAlign = "center";
  noResultsMessage.style.color = "#ffd700";
  noResultsMessage.style.marginTop = "20px";
  noResultsMessage.className = "no-results-message";
  document.getElementById("main-content").appendChild(noResultsMessage);

  function filterCards(e) {
    if (e) e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const city = filterCity.value;
    const year = filterYear.value;
    const minPrice = parseInt(priceMin.value) || 0;
    const maxPrice = parseInt(priceMax.value) || Infinity;

    let anyVisible = false;

    cards.forEach(card => {
      const title = card.dataset.title?.toLowerCase() || "";
      const cardCity = card.dataset.city || "";
      const cardYear = card.dataset.year || ""; // ✅ mejor usar data-year
      const cardPrice = parseInt(card.dataset.price) || 0;

      const matchesQuery = title.includes(query);
      const matchesCity = !city || cardCity === city;
      const matchesYear = !year || cardYear === year;
      const matchesPrice = cardPrice >= minPrice && cardPrice <= maxPrice;

      if (matchesQuery && matchesCity && matchesYear && matchesPrice) {
        card.style.display = "";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    noResultsMessage.style.display = anyVisible ? "none" : "block";
  }

  document.getElementById('filterForm').addEventListener('submit', filterCards);
  searchInput.addEventListener('input', filterCards);
  filterCity.addEventListener('change', filterCards);
  filterYear.addEventListener('change', filterCards);
  priceMin.addEventListener('input', filterCards);
  priceMax.addEventListener('input', filterCards);
}

// =========================
// INICIALIZACIÓN GENERAL
// =========================
function initAllFunctions() {
  initContactMenu();
  initFavorites();
  initSmoothScroll();
  initFormValidation();
  initImageUpload();
  initGallery();
  updatePhotoCounters();
  initFilters(); // ✅ CORREGIDO
}

// =========================
// ERRORES GLOBALES
// =========================
window.addEventListener('error', e => console.error('❌ Error detectado:', e.error));
