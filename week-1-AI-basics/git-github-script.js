// ==================== COPY CODE TO CLIPBOARD ====================
function copyCode(button) {
  const codeBlock = button.parentElement;
  const code = codeBlock.querySelector("code").textContent;

  navigator.clipboard
    .writeText(code)
    .then(() => {
      const originalText = button.textContent;
      button.textContent = "✓ Copied!";

      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      button.textContent = "Copy failed";
    });
}

// ==================== TAB SWITCHING ====================
function switchTab(event, tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Show the selected tab and mark button as active
  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

// ==================== INTERVIEW Q&A TOGGLE ====================
function toggleAnswer(header) {
  header.classList.toggle("active");
  const answer = header.nextElementSibling;

  if (answer.classList.contains("active")) {
    answer.classList.remove("active");
  } else {
    answer.classList.add("active");
  }
}

// ==================== SMOOTH SCROLL TO SECTION ====================
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// ==================== INITIALIZE ON PAGE LOAD ====================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize first tab as active
  const firstTabContent = document.querySelector(".tab-content");
  if (firstTabContent) {
    firstTabContent.classList.add("active");
  }

  // Add keyboard shortcuts
  addKeyboardShortcuts();

  // Animate elements on scroll
  observeElements();
});

// ==================== KEYBOARD SHORTCUTS ====================
function addKeyboardShortcuts() {
  document.addEventListener("keydown", function (event) {
    // Ctrl/Cmd + K to scroll to top
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

// ==================== SCROLL ANIMATIONS ====================
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Observe all cards
  document
    .querySelectorAll(".card, .command-item, .interview-question")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.5s ease";
      observer.observe(el);
    });
}

// ==================== SEARCH FUNCTIONALITY ====================
document.addEventListener("DOMContentLoaded", function () {
  // Add search capability (could be expanded)
  addSearchFunctionality();
});

function addSearchFunctionality() {
  // This can be expanded to add a search feature
  // For now, it's a placeholder for future enhancement
}

// ==================== MOBILE MENU TOGGLE ====================
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.style.display =
      navLinks.style.display === "none" ? "flex" : "none";
  }
}

// ==================== CODE HIGHLIGHTING ====================
function highlightCode() {
  document.querySelectorAll(".code-block code").forEach((codeBlock) => {
    // Add syntax highlighting if needed
    // This can be integrated with a library like Prism.js
  });
}

// ==================== PROGRESS TRACKING ====================
let completedLessons = [];

function markLessonComplete(lessonId) {
  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId);
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
    alert("Great! Lesson marked as complete! 🎉");
  }
}

function loadCompletedLessons() {
  const saved = localStorage.getItem("completedLessons");
  if (saved) {
    completedLessons = JSON.parse(saved);
  }
}

// ==================== UTILITY: Print Summary ====================
function printGitSummary() {
  const summary = `
    ==================== GIT QUICK REFERENCE ====================
    
    MOST USED COMMANDS (80% of work):
    ✓ git status              - Check what changed
    ✓ git add .              - Stage all changes
    ✓ git commit -m "msg"    - Save with message
    ✓ git push origin branch - Upload to GitHub
    ✓ git pull origin branch - Download updates
    ✓ git clone <url>        - Clone repository
    
    BRANCHING (IMPORTANT):
    ✓ git checkout -b name   - Create new branch
    ✓ git checkout name      - Switch to branch
    ✓ git branch -a          - List all branches
    ✓ git merge branch       - Merge branches
    
    COMPANY WORKFLOW:
    1. Clone the repo
    2. Create feature branch
    3. Make changes
    4. Commit with good message
    5. Push to GitHub
    6. Create Pull Request
    7. Team reviews
    8. Merge to main
    
    REMEMBER: Always pull before pushing!
    =========================================================
    `;
  console.log(summary);
  return summary;
}

// Make printGitSummary accessible globally
window.printGitSummary = printGitSummary;
window.markLessonComplete = markLessonComplete;

// ==================== INITIAL SETUP ====================
loadCompletedLessons();
