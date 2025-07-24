document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log("Welcome to Pallavi's Portfolio!");

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError('nameError');
      isValid = false;
    }

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError('emailError');
      isValid = false;
    }

    const subject = document.getElementById('subject');
    if (!subject.value.trim()) {
      showError('subjectError');
      isValid = false;
    }

    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError('messageError');
      isValid = false;
    }

    if (isValid) {
      
      const formData = new FormData(contactForm);
      
      formData.append('access_key', '37d1a5cc-2c76-444d-bcc9-671b5f2e4544');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          contactForm.reset();
          document.getElementById('successMessage').style.display = 'block';
          setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
          }, 3000);
        } else {
          alert('Failed to send message. Please try again later.');
        }
      })
      .catch(() => {
        alert('Failed to send message. Please check your internet connection.');
      });
    }
  });

  function showError(id) {
    document.getElementById(id).style.display = 'block';
  }

  function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.style.display = 'none');
    document.getElementById('successMessage').style.display = 'none';
  }
});
