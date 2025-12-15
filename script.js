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

  // Click-based Carousel Logic
  const wrappers = document.querySelectorAll('.carousel-wrapper');

  wrappers.forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');

    // 1. Setup Infinite Loop (Clones)
    const cards = Array.from(carousel.children);
    const cardWidth = 300 + 32; // Width + Gap
    const visibleWidth = wrapper.offsetWidth;

    // We need enough clones to fill the screen + buffer
    const clonesNeeded = Math.max(cards.length, Math.ceil(visibleWidth / cardWidth) + 2);

    // Clone for end
    for (let i = 0; i < clonesNeeded; i++) {
      const clone = cards[i % cards.length].cloneNode(true);
      clone.classList.add('clone');
      carousel.appendChild(clone);
    }

    // Clone for start
    for (let i = 0; i < clonesNeeded; i++) {
      const clone = cards[cards.length - 1 - (i % cards.length)].cloneNode(true);
      clone.classList.add('clone');
      carousel.insertBefore(clone, carousel.firstChild);
    }

    const allCards = Array.from(carousel.children);

    // Start in the middle (at the first real item)
    let currentIndex = clonesNeeded;

    // Function to scroll to a specific index
    const scrollToCard = (index, animate = true) => {
      const scrollPos = (index * cardWidth) + (cardWidth / 2) - (wrapper.offsetWidth / 2);

      if (animate) {
        carousel.style.scrollBehavior = 'smooth';
      } else {
        carousel.style.scrollBehavior = 'auto';
        // Disable transitions on all cards for instant update
        allCards.forEach(card => {
          card.style.transition = 'none';
        });
      }

      carousel.scrollLeft = scrollPos;

      // Update Active State
      allCards.forEach((card, i) => {
        if (i === index) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      if (!animate) {
        // Force reflow
        carousel.offsetHeight;
        // Re-enable transitions
        allCards.forEach(card => {
          card.style.transition = '';
        });
      }
    };

    // Initial positioning (no animation)
    setTimeout(() => {
      scrollToCard(currentIndex, false);
    }, 50);

    // Handle Resize
    window.addEventListener('resize', () => {
      scrollToCard(currentIndex, false);
    });

    // Navigation Logic
    let isAnimating = false;

    const move = (direction) => {
      if (isAnimating) return;
      isAnimating = true;

      currentIndex += direction;
      scrollToCard(currentIndex, true);

      // Check for loop condition after animation
      setTimeout(() => {
        // If we moved into the end clones
        if (currentIndex >= clonesNeeded + cards.length) {
          // Teleport to start
          currentIndex = clonesNeeded;
          scrollToCard(currentIndex, false);
        }
        // If we moved into the start clones
        else if (currentIndex < clonesNeeded) {
          // Teleport to end
          currentIndex = clonesNeeded + cards.length - 1;
          scrollToCard(currentIndex, false);
        }
        isAnimating = false;
      }, 500); // Match CSS transition time roughly
    };

    nextBtn.addEventListener('click', () => move(1));
    prevBtn.addEventListener('click', () => move(-1));
  });

  // Make project cards clickable
  // Prikklok card should navigate to /prikklok
  // GeminiCopy card should open Firefox addon page
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const title = card.querySelector('h3');
    if (title && title.textContent.trim() === 'Prikklok') {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.location.href = 'prikklok';
      });
    } else if (title && title.textContent.trim() === 'GeminiCopy (LaTeX)') {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.open('https://addons.mozilla.org/en-US/firefox/addon/geminicopy/', '_blank');
      });
    }
  });
});
