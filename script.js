window.addEventListener('scroll', () => {
  const header = document.querySelector('.glass-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


const scrollIcon = document.getElementById('scroll-icon');
let scrollTimeout;

function showScrollIcon() {
  if (window.scrollY < 100) {
    scrollIcon.classList.add('visible');
  }
}

function hideScrollIcon() {
  scrollIcon.classList.remove('visible');
}

function resetScrollTimer() {
  hideScrollIcon();
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(showScrollIcon, 3000);
}

setTimeout(showScrollIcon, 2000);

window.addEventListener('scroll', resetScrollTimer);
window.addEventListener('mousemove', resetScrollTimer);
window.addEventListener('touchstart', resetScrollTimer);
