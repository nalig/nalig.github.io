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

  // Advanced Carousel Logic
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    // 1. Infinite Loop Setup
    const cards = Array.from(carousel.children);
    const cardWidth = 300 + 32; // Width + Gap (approx)

    // Clone items for infinite effect (prepend and append)
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('clone');
      carousel.appendChild(clone);
    });
    cards.reverse().forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('clone');
      carousel.insertBefore(clone, carousel.firstChild);
    });

    // Scroll to middle set initially
    // We need to wait for layout to settle, but let's try setting it immediately
    setTimeout(() => {
      carousel.scrollLeft = cards.length * cardWidth;
    }, 10);


    // 2. Center Highlight Logic
    const updateActiveCard = () => {
      const carouselCenter = carousel.getBoundingClientRect().left + carousel.offsetWidth / 2;
      let closestCard = null;
      let minDistance = Infinity;

      const allCards = carousel.querySelectorAll('.card');
      allCards.forEach(card => {
        const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      allCards.forEach(card => card.classList.remove('active'));
      if (closestCard) {
        closestCard.classList.add('active');
      }
    };

    // 3. Infinite Loop Scroll Handler
    const handleScroll = () => {
      updateActiveCard();

      const totalWidth = cards.length * cardWidth;

      if (carousel.scrollLeft <= 50) {
        carousel.scrollLeft += totalWidth;
      } else if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.offsetWidth - 50)) {
        carousel.scrollLeft -= totalWidth;
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateActiveCard);

    // 4. Drag to Scroll Logic
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('active');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Initial update
    setTimeout(updateActiveCard, 100);
  });
});
