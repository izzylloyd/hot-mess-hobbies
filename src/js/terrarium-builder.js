// Hot Mess Hobby Shop — terrarium builder interactivity

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[data-terrarium-builder]');
  if (!root) return;

  const sizes = JSON.parse(document.getElementById('builder-data').textContent);
  const sizesByName = Object.fromEntries(sizes.map((s) => [s.name, s]));

  const sizeRadios = root.querySelectorAll('input[name="vesselSize"]');
  const categoryBlocks = root.querySelectorAll('[data-category]');
  const promptEl = root.querySelector('[data-plant-prompt]');
  const plantStep = root.querySelector('[data-plant-step]');
  const form = root.querySelector('form');

  function updateCheckboxState(block, limit) {
    const checkboxes = Array.from(block.querySelectorAll('input[type="checkbox"]'));
    const checkedCount = checkboxes.filter((cb) => cb.checked).length;
    checkboxes.forEach((cb) => {
      cb.disabled = !cb.checked && checkedCount >= limit;
    });
  }

  function applyLimits(limits) {
    categoryBlocks.forEach((block) => {
      const category = block.getAttribute('data-category');
      const limit = limits[category] || 0;
      const countEl = block.querySelector('[data-count-label]');

      block.hidden = limit === 0;
      block.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.disabled = limit === 0;
      });
      if (limit === 0) return;

      if (countEl) countEl.textContent = '— choose up to ' + limit;
      updateCheckboxState(block, limit);
    });
  }

  function resetCategoryCheckboxes() {
    categoryBlocks.forEach((block) => {
      block.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
      });
    });
  }

  categoryBlocks.forEach((block) => {
    block.addEventListener('change', (e) => {
      if (!e.target.matches('input[type="checkbox"]')) return;
      const selected = root.querySelector('input[name="vesselSize"]:checked');
      if (!selected) return;
      const limit = sizesByName[selected.value].limits[block.getAttribute('data-category')] || 0;
      updateCheckboxState(block, limit);
    });
  });

  sizeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      resetCategoryCheckboxes();
      if (promptEl) promptEl.hidden = true;
      if (plantStep) plantStep.hidden = false;
      applyLimits(sizesByName[radio.value].limits);
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(() => {
          alert("Thanks! Your custom build request is on its way — we'll follow up by email to confirm details and pricing.");
          form.reset();
          resetCategoryCheckboxes();
          if (plantStep) plantStep.hidden = true;
          if (promptEl) promptEl.hidden = false;
        })
        .catch(() => {
          alert('Something went wrong sending that — please email hello@hotmesshobbyshop.com directly with your build details.');
        });
    });
  }
});
