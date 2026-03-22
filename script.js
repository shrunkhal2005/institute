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
const whatsappNumber = '919822456743';
const blockedValues = new Set([
  'asd',
  'asdasd',
  'test',
  'testing',
  'qwerty',
  'abc',
  'xyz',
  'na',
  'n/a',
  'none'
]);

const countLetters = (value) => (value.match(/\p{L}/gu) || []).length;

const isMeaningfulText = (value, minLength, minLetters) => {
  const trimmed = value.trim();
  if (trimmed.length < minLength) {
    return false;
  }

  if (countLetters(trimmed) < minLetters) {
    return false;
  }

  if (blockedValues.has(trimmed.toLowerCase())) {
    return false;
  }

  const compact = trimmed.toLowerCase().replace(/\s+/g, '');
  if (/^(.)\1+$/.test(compact)) {
    return false;
  }

  return true;
};

const isValidPhone = (value) => {
  const digitsOnly = value.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(digitsOnly);
};

if (enquiryForm && formMessage) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(enquiryForm);
    const name = (formData.get('name') || '').toString();
    const phone = (formData.get('phone') || '').toString();
    const course = (formData.get('course') || '').toString();
    const message = (formData.get('message') || '').toString();

    if (!isMeaningfulText(name, 3, 3)) {
      formMessage.textContent = 'Enter a valid full name.';
      formMessage.classList.add('error');
      return;
    }

    if (!isValidPhone(phone)) {
      formMessage.textContent = 'Enter a valid 10-digit mobile number.';
      formMessage.classList.add('error');
      return;
    }

    if (!isMeaningfulText(course, 2, 2)) {
      formMessage.textContent = 'Enter a meaningful course name.';
      formMessage.classList.add('error');
      return;
    }

    if (!isMeaningfulText(message, 8, 4)) {
      formMessage.textContent = 'Enter a meaningful message (minimum 8 characters).';
      formMessage.classList.add('error');
      return;
    }

    formMessage.textContent = '';
    formMessage.classList.remove('error');

    const text = [
      'New Admission Enquiry - Universal Computer Institute, Tumsar',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Course: ${course}`,
      `Message: ${message}`
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.location.href = whatsappUrl;
  });
}
