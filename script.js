document.addEventListener('DOMContentLoaded', () => {
  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }


  });



  // Scroll Animation Logic
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  // Make project cards clickable
  // GeminiCopy card should open Firefox addon page
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const title = card.querySelector('h3');
    if (title && title.textContent.trim() === 'GeminiCopy (LaTeX)') {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.open('https://addons.mozilla.org/en-US/firefox/addon/geminicopy/', '_blank');
      });
    }
  });
});
