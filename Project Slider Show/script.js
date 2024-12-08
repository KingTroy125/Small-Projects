const slider = document.querySelector('.project-slider');
const cards = document.querySelectorAll('.project-card');
const scrollIndicator = document.querySelector('.scroll-indicator');

let currentIndex = 0;
const totalCards = cards.length;
let isScrolling = false;
let scrollTimeout;
let lastScrollTime = 0;
const scrollCooldown = 800; // Cooldown period in milliseconds

// Position cards initially
function initializeCards() {
    cards.forEach((card, index) => {
        card.style.transform = `rotateY(${index * 120}deg) translateZ(400px)`;
        card.style.opacity = index === 0 ? '1' : '0.5';
    });
}

// Rotate to show next/previous card
function rotateSlider(direction) {
    if (isScrolling) return;
    
    isScrolling = true;
    currentIndex = (currentIndex + direction + totalCards) % totalCards;
    
    slider.style.transform = `rotateY(${-currentIndex * 120}deg)`;
    
    cards.forEach((card, index) => {
        card.style.opacity = index === currentIndex ? '1' : '0.5';
    });

    // Reset scrolling flag after animation
    setTimeout(() => {
        isScrolling = false;
    }, 600);
}

// Handle mouse wheel event
function handleWheel(event) {
    event.preventDefault();
    
    const currentTime = new Date().getTime();
    if (currentTime - lastScrollTime < scrollCooldown) return;
    
    const delta = event.deltaY;
    
    if (Math.abs(delta) < 50) return; // Ignore small scroll movements
    
    if (delta > 0) {
        rotateSlider(1); // Scroll down - next project
    } else {
        rotateSlider(-1); // Scroll up - previous project
    }
    
    lastScrollTime = currentTime;
}

// Add event listener for mouse wheel
document.addEventListener('wheel', handleWheel, { passive: false });

// Touch events for mobile
let touchStartY = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

slider.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touchEndY = e.touches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
            rotateSlider(1);
        } else {
            rotateSlider(-1);
        }
        touchStartY = touchEndY;
    }
});

// Initialize
initializeCards();

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        rotateSlider(-1);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        rotateSlider(1);
    }
});