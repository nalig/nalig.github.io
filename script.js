document.addEventListener('DOMContentLoaded', () => {
    const splitView = document.getElementById('split-view');
    const splitBtns = document.querySelectorAll('.split-btn');
    const backBtns = document.querySelectorAll('.back-to-split');
    const logoReset = document.getElementById('logo-reset');
    
    // Handle click on split buttons (Extern / Intern)
    splitBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        // Hide split view
        splitView.classList.remove('active');
        
        // Wait a bit for the fade out, then show target
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          targetSection.classList.add('active');
        }, 400); // 400ms matches halfway through our CSS transition
      });
    });
    
    // Handle back buttons
    const resetView = (e) => {
      if (e) e.preventDefault();
      
      const activeFunnels = document.querySelectorAll('.funnel-section.active');
      
      if (activeFunnels.length > 0) {
        activeFunnels.forEach(funnel => {
          funnel.classList.remove('active');
        });
        
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          splitView.classList.add('active');
        }, 400);
      }
    };
    
    backBtns.forEach(btn => {
      btn.addEventListener('click', resetView);
    });
    
    // Clicking logo resets to split view
    logoReset.addEventListener('click', resetView);
  });
