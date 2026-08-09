// Hot Mess Hobbies — shared site behavior

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Placeholder contact form: no backend yet, so just confirm to the user.
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thanks! This form isn't wired up to send messages yet — for now, email hello@hotmesshobbies.com directly.");
      form.reset();
    });
  }
});
