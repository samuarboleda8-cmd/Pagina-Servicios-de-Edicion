// Variable global para el overlay
let currentOverlay = null;

// Animación de hover para videos - Zoom suave y glow
function videoHoverEffects() {
  const videoContainers = document.querySelectorAll('.mis-proyectos > div');
  
  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    
    container.addEventListener('mouseenter', function() {
      // Reproducir video
      if (video) {
        video.play().catch(err => console.log('Video play error:', err));
      }
      
      // Efecto visual
      this.style.transform = 'translateY(-20px) scale(1.05)';
      this.style.boxShadow = '0 30px 80px rgba(0, 168, 232, 0.6)';
      this.style.zIndex = '10';
      
      if (video) {
        video.style.filter = 'brightness(1.2) saturate(1.2)';
      }
    });
    
    container.addEventListener('mouseleave', function() {
      // Pausar video
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      
      // Restaurar
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
      this.style.zIndex = '1';
      
      if (video) {
        video.style.filter = 'brightness(1) saturate(1)';
      }
    });
    
    // Click para expandir
    container.addEventListener('click', function(e) {
      // Si ya está expandido, cerrar
      if (this.classList.contains('expanded')) {
        closeExpandedVideo();
        return;
      }
      
      // Expandir
      expandVideo(this);
    });
  });
}

// Expandir video en modal
function expandVideo(container) {
  const video = container.querySelector('video');
  
  // Crear overlay
  if (!currentOverlay) {
    currentOverlay = document.createElement('div');
    currentOverlay.className = 'video-overlay';
    document.body.appendChild(currentOverlay);
    
    currentOverlay.addEventListener('click', closeExpandedVideo);
  }
  
  // Expandir
  container.classList.add('expanded');
  document.body.style.overflow = 'hidden';
  
  // Reproducir video
  if (video) {
    video.play().catch(err => console.log('Video play error:', err));
    video.controls = true;
  }
}

// Función para cerrar video expandido
function closeExpandedVideo() {
  const expanded = document.querySelector('.mis-proyectos > div.expanded');
  
  if (expanded) {
    const video = expanded.querySelector('video');
    
    expanded.classList.remove('expanded');
    document.body.style.overflow = '';
    
    // Pausar y resetear video
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.controls = false;
    }
  }
  
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
}

// Animación del botón CTA con pulso
function animateCTAButton() {
  const ctaButtons = document.querySelectorAll('.cta-button, .demo-reel button, .sobre-mi button');
  
  ctaButtons.forEach(button => {
    // Efecto de pulso cada 4 segundos
    setInterval(() => {
      button.style.animation = 'pulse 1s ease';
      setTimeout(() => {
        button.style.animation = '';
      }, 800);
    }, 4000);
  });
}

// Animación de entrada para textos del hero
function animateTextEntrance() {
  const heroTitle = document.querySelector('.demo-reel h2:first-of-type');
  const heroSubtitle = document.querySelector('.demo-reel > p');
  const demoTitle = document.querySelector('.demo-reel h2:nth-of-type(2)');
  const videoDemo = document.querySelector('.video-demo');
  const button = document.querySelector('.demo-reel button');
  
  const elements = [
    { el: heroTitle, delay: 200 },
    { el: heroSubtitle, delay: 400 },
    { el: demoTitle, delay: 600 },
    { el: videoDemo, delay: 800 },
    { el: button, delay: 1000 }
  ];
  
  elements.forEach(({ el, delay }) => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    }
  });
}

// Animación para cards de proyectos con delay mayor
function animateProjectCards() {
  const cards = document.querySelectorAll('.mis-proyectos > div');
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8) translateY(30px)';
    
    // Delay inicial de 2 segundos + 200ms entre cada card
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'scale(1) translateY(0)';
    }, 2000 + (index * 200));
  });
}

// Observer para animaciones al hacer scroll con threshold mayor
function setupScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-100px', // Solo activar cuando esté 100px dentro del viewport
      threshold: 0.3 // Necesita estar 30% visible
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Animaciones específicas para servicios con más delay
          if (entry.target.classList.contains('mis-servicios')) {
            const cards = entry.target.querySelectorAll('div');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.animation = `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
              }, index * 300); // 300ms entre cada card
            });
          }
        }
      });
    }, observerOptions);
    
    // Observar secciones
    const sections = document.querySelectorAll('.sobre-mi, .mis-servicios, .contacto');
    sections.forEach(section => observer.observe(section));
  }
}

// Agregar estilos de animación dinámicamente
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 10px 35px rgba(0, 168, 232, 0.5);
      }
      50% {
        transform: scale(1.08);
        box-shadow: 0 15px 50px rgba(0, 168, 232, 0.8);
      }
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(40px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-15px);
      }
    }
    
    .video-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(6, 27, 82, 0.95);
      z-index: 998;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
      cursor: pointer;
      backdrop-filter: blur(10px);
    }
    
    @keyframes fadeIn {
      to {
        opacity: 1;
      }
    }
    
    .mis-proyectos > div {
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    
    .mis-proyectos > div.expanded {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) scale(1) !important;
      z-index: 999 !important;
      width: auto !important;
      height: 90vh !important;
      max-width: 95vw !important;
      max-height: 90vh !important;
      box-shadow: 0 30px 100px rgba(0, 168, 232, 0.8) !important;
      cursor: pointer !important;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    
    .mis-proyectos > div.expanded video {
      width: auto !important;
      height: 90vh !important;
      max-width: 95vw !important;
      max-height: 90vh !important;
      object-fit: contain !important;
      filter: brightness(1) saturate(1) !important;
    }
    
    /* Animación de flotación para la foto de perfil */
    .foto {
      animation: float 3s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

// Cerrar video expandido con tecla ESC
function setupKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeExpandedVideo();
    }
  });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
  // Agregar estilos de animación
  addAnimationStyles();
  
  // Animaciones de entrada
  setTimeout(() => {
    animateTextEntrance();
    animateProjectCards();
  }, 100);
  
  // Video hover effects con click para expandir
  videoHoverEffects();
  
  // Animación del botón CTA
  animateCTAButton();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Keyboard controls
  setupKeyboardControls();
  
  // Prevenir menú contextual en videos
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('contextmenu', (e) => e.preventDefault());
  });
});

// Animación de entrada para la página
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 50);
});