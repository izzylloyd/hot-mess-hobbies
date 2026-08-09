// Hot Mess Hobby Shop — shared site behavior

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Submits to Netlify Forms via AJAX so the page doesn't have to reload.
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(() => {
          alert("Thanks! Your message is on its way.");
          form.reset();
        })
        .catch(() => {
          alert("Something went wrong sending that — please email hello@hotmesshobbyshop.com directly.");
        });
    });
  }
});
