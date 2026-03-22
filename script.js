const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

const enquiryForm = document.getElementById('enquiryForm');
const formMessage = document.getElementById('formMessage');

if (enquiryForm && formMessage) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = 'Thank you! Your enquiry is noted. Please call us for quick admission support.';
    enquiryForm.reset();
  });
}
