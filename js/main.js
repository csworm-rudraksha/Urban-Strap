// Theme toggle functionality
const themeButton = document.getElementById('theme-button');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on user preference
if (prefersDarkScheme.matches) {
  document.body.classList.add('dark-theme');
}

// Toggle theme when button is clicked
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Countdown timer
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 6); // Set launch date to 30 days from now

function updateCountdown() {
  const currentTime = new Date().getTime();
  const timeLeft = countdownDate.getTime() - currentTime;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

  if (timeLeft < 0) {
    clearInterval(countdownTimer);
    document.querySelector('.countdown-container').innerHTML = '<p>We are launching soon!</p>';
  }
}

// Initial countdown update
updateCountdown();

// Update countdown every second
const countdownTimer = setInterval(updateCountdown, 1000);

// Form validation and handling
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  // Basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.className = 'form-message error-message';
    return;
  }

  // Simulate form submission
  formMessage.textContent = 'Processing...';
  formMessage.className = 'form-message';
  
  // Simulate API call with timeout
  setTimeout(() => {
    // Success response simulation
    emailInput.value = '';
    formMessage.textContent = 'Thank you! You\'ll be the first to know when we launch.';
    formMessage.className = 'form-message success-message';
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = '';
    }, 5000);
  }, 1500);
});