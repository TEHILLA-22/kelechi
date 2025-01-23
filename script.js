const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toggleButton = document.getElementById('toggleButton');

// Toggle between Login and Sign Up forms
toggleButton.addEventListener('click', () => {
  if (loginForm.classList.contains('active')) {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    toggleButton.textContent = 'Switch to Login';
  } else {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
    toggleButton.textContent = 'Switch to Sign Up';
  }
});

// Handle Sign Up form submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = signupForm.querySelector('input[type="text"]').value;
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;

  // Check if email already exists
  if (localStorage.getItem(email)) {
    alert('User already exists! Please log in.');
    return;
  }

  // Save user credentials to localStorage
  const userData = { name, email, password };
  localStorage.setItem(email, JSON.stringify(userData));

  alert('Sign Up Successful! Please log in.');
  signupForm.reset();
  toggleButton.click(); // Switch to login form
});

// Handle Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem(email));

  if (!userData) {
    alert('User does not exist! Please sign up.');
    return;
  }

  // Check password
  if (userData.password === password) {
    alert(`Welcome back, ${userData.name}! You are now logged in.`);
    loginForm.reset();
  } else {
    alert('Incorrect password. Please try again.');
  }
});

const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentIndex) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  document.querySelector('.slider').style.transform = `translateX(-${currentIndex * 100}%)`;
  updateSlides();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  document.querySelector('.slider').style.transform = `translateX(-${currentIndex * 100}%)`;
  updateSlides();
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);



