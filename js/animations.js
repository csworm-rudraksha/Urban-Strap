// Initial animations and transitions
document.addEventListener('DOMContentLoaded', () => {
  // Apply staggered animations to elements
  const animateElements = () => {
    const elements = document.querySelectorAll('.hero > *, .subscription, footer');
    elements.forEach((el, index) => {
      // We're using animation-delay in CSS, but this ensures they fire in sequence
      setTimeout(() => {
        el.style.visibility = 'visible';
      }, 300 * index);
    });
  };

  // Call animations after a short delay
  setTimeout(animateElements, 100);
});

// Intersection Observer for additional scroll animations
if ('IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}