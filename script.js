const confettiContainer = document.getElementById('confetti');
const celebrateBtn = document.getElementById('celebrateBtn');
const celebrateAgainBtn = document.getElementById('celebrateAgainBtn');
const footerMessage = document.getElementById('footerMessage');
const currentYear = document.getElementById('currentYear');
const loadingScreen = document.getElementById('loadingScreen');
const revealElements = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.top-link');
const observedSections = document.querySelectorAll('section[id]');

const colors = ['#6fb6e8', '#ffffff', '#f6c445', '#3c93d0'];
const footerMessages = [
    'Made with love for a proud Argentina fan.',
    'Champions today, legends forever.',
    'Messi, magic, and sky-blue dreams.',
    'Every heartbeat says: Vamos Argentina!'
];

let footerIndex = 0;

// Loading screen handler
function hideLoadingScreen() {
    if (!loadingScreen) return;

    loadingScreen.classList.add('is-hidden');

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        triggerInitialReveal();
    }, 900);
}

function triggerInitialReveal() {
    if (revealElements.length > 0) {
        revealElements[0].classList.add('is-visible');
    }
}

// Confetti functions
function createConfettiPiece() {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
    piece.style.animationDuration = `${2.7 + Math.random() * 1.6}s`;
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    confettiContainer.appendChild(piece);

    window.setTimeout(() => {
        piece.remove();
    }, 4300);
}

function celebrate() {
    for (let i = 0; i < 100; i += 1) {
        window.setTimeout(createConfettiPiece, i * 18);
    }
}

// Footer message rotator
function rotateFooterMessage() {
    if (!footerMessage) return;

    footerIndex = (footerIndex + 1) % footerMessages.length;
    footerMessage.textContent = footerMessages[footerIndex];
}

// Scroll reveal animations
function revealOnScroll() {
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.18
    });

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

// Active nav link tracking
function updateActiveNav(sectionId) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('active', isActive);
    });
}

function setupSectionTracking() {
    if (!('IntersectionObserver' in window) || observedSections.length === 0) return;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                updateActiveNav(entry.target.id);
            }
        });
    }, {
        threshold: 0.45
    });

    observedSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

// Set current year in footer
function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Initialize everything
function init() {
    setCurrentYear();
    revealOnScroll();
    setupSectionTracking();

    window.setInterval(rotateFooterMessage, 3500);

    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', celebrate);
    }

    if (celebrateAgainBtn) {
        celebrateAgainBtn.addEventListener('click', celebrate);
    }

    // Hide loading screen after a small delay
    window.setTimeout(hideLoadingScreen, 1600);
}

// Start initialization
document.addEventListener('DOMContentLoaded', init);
