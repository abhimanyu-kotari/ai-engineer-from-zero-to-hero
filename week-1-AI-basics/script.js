// ===================================
// SMOOTH SCROLLING & NAVIGATION
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Navbar active state on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });
});

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("scroll-reveal");
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

// Apply reveal animation to cards
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".card, .task-card, .learning-card, .arch-card, .char-card",
  );
  cards.forEach((card) => {
    revealOnScroll.observe(card);
  });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
      }
    });
  },
  { threshold: 0.1 },
);

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===================================
// COPY TO CLIPBOARD
// ===================================

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification("Copied to clipboard!");
  });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6366f1;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInDown 0.3s ease-out;
    `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideUp 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

let backToTopBtn = null;

window.addEventListener("scroll", function () {
  if (!backToTopBtn) {
    backToTopBtn = document.querySelector(".back-to-top");
  }

  if (window.pageYOffset > 300) {
    if (!document.querySelector(".back-to-top")) {
      const btn = document.createElement("button");
      btn.className = "back-to-top";
      btn.innerHTML = "↑";
      btn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                z-index: 999;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                animation: slideInUp 0.3s ease-out;
                transition: all 0.3s ease;
            `;

      btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      btn.addEventListener("hover", function () {
        this.style.transform = "scale(1.1)";
      });

      document.body.appendChild(btn);
      backToTopBtn = btn;
    }
  } else if (backToTopBtn) {
    const btn = document.querySelector(".back-to-top");
    if (btn) btn.remove();
    backToTopBtn = null;
  }
});

// ===================================
// ACTIVE NAVIGATION STYLING
// ===================================

const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: #6366f1;
        font-weight: 700;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===================================
// LAZY LOADING ANIMATION
// ===================================

function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });
  images.forEach((img) => imageObserver.observe(img));
}

lazyLoadImages();

// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================

if ("scrollBehavior" in document.documentElement.style === false) {
  function smoothScroll(element, duration = 1000) {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const distance = element.getBoundingClientRect().top;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime) => {
      const elapsed = currentTime - startTime;
      const run = ease(elapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (elapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  }
}

// ===================================
// MOBILE MENU TOGGLE (if needed)
// ===================================

function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    navMenu.classList.toggle("active");
  }
}

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener("scroll", function () {
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  parallaxElements.forEach((element) => {
    let scrollPosition = window.pageYOffset;
    let elementOffset = element.offsetTop;
    let distance = scrollPosition - elementOffset;
    element.style.transform = `translateY(${distance * 0.5}px)`;
  });
});

// ===================================
// THEME TOGGLE (Dark/Light Mode)
// ===================================

let isDarkMode = localStorage.getItem("darkMode") === "true";

function initTheme() {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// ===================================
// INTERACTIVE VISUALIZATIONS
// ===================================

// Neural Network Visualization
function initNeuralNetworkDemo() {
  const nnLayers = document.querySelectorAll(".nn-layer");

  nnLayers.forEach((layer) => {
    layer.addEventListener("mouseenter", function () {
      const neurons = this.querySelectorAll(".neuron");
      neurons.forEach((neuron, index) => {
        neuron.style.animation = `pulse 2s ease-in-out ${index * 0.1}s infinite`;
      });
    });

    layer.addEventListener("mouseleave", function () {
      const neurons = this.querySelectorAll(".neuron");
      neurons.forEach((neuron) => {
        neuron.style.animation = "pulse 2s ease-in-out infinite";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initNeuralNetworkDemo);

// ===================================
// CODE SYNTAX HIGHLIGHTING
// ===================================

function highlightCode() {
  const codeBlocks = document.querySelectorAll("code");
  codeBlocks.forEach((block) => {
    // Add syntax highlighting if library is available
    if (window.Prism) {
      Prism.highlightElement(block);
    }
  });
}

highlightCode();

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===================================
// SCROLL TO ELEMENT WITH OFFSET
// ===================================

function scrollToElement(selector, offset = 100) {
  const element = document.querySelector(selector);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: "smooth",
    });
  }
}

// ===================================
// ELEMENT VISIBILITY CHECKER
// ===================================

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===================================
// PERFORMANCE MONITORING
// ===================================

if (window.performance && window.performance.timing) {
  window.addEventListener("load", function () {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log("Page Load Time:", pageLoadTime, "ms");
  });
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================

function initializeApp() {
  // Initialize theme
  initTheme();

  // Initialize animations
  initNeuralNetworkDemo();

  // Add scroll animations to elements
  document
    .querySelectorAll(".card, .task-card, .learning-card")
    .forEach((el) => {
      el.classList.add("scroll-reveal");
    });

  // Add analytics tracking (if needed)
  trackPageView();
}

function trackPageView() {
  // Add your analytics tracking code here
  console.log("Page viewed:", window.location.pathname);
}

// ===================================
// DOM READY
// ===================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// ===================================
// HANDLE RESPONSIVE BEHAVIOR
// ===================================

const handleResize = debounce(function () {
  const width = window.innerWidth;

  if (width < 768) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
}, 250);

window.addEventListener("resize", handleResize);
handleResize();

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener("keydown", function (e) {
  // ESC key to close modals/menus
  if (e.key === "Escape") {
    const activeMenu = document.querySelector(".nav-menu.active");
    if (activeMenu) {
      activeMenu.classList.remove("active");
    }
  }

  // Home key to go to top
  if (e.key === "Home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // End key to go to bottom
  if (e.key === "End") {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
});

// ===================================
// ACCESSIBILITY FEATURES
// ===================================

// Skip to main content link
function addSkipLink() {
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #6366f1;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "0";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

addSkipLink();

// ===================================
// CONSOLE MESSAGING
// ===================================

console.log(
  "%c🤖 AI Basics for Beginners",
  "font-size: 20px; color: #6366f1; font-weight: bold;",
);
console.log(
  "%cLet's learn AI fundamentals together!",
  "font-size: 14px; color: #8b5cf6;",
);
console.log("%cVersion: 1.0.0", "font-size: 12px; color: #64748b;");
