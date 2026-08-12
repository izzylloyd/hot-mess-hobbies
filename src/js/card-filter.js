// Hot Mess Hobby Shop — team/conference card filter

document.addEventListener('DOMContentLoaded', () => {
  const confSelect = document.getElementById('conference-filter');
  const teamSelect = document.getElementById('team-filter');
  const emptyMessage = document.querySelector('[data-filter-empty]');
  if (!confSelect || !teamSelect) return;

  const cards = Array.from(document.querySelectorAll('.card-grid .card'));
  const teamOptions = Array.from(teamSelect.options);

  function applyFilters() {
    const conf = confSelect.value;
    const team = teamSelect.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardTeam = card.getAttribute('data-team');
      const cardConf = card.getAttribute('data-conference');
      let visible = true;

      if (team !== 'all') {
        visible = cardTeam === team;
      } else if (conf !== 'all') {
        visible = cardConf === conf;
      }

      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount += 1;
    });

    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
  }

  confSelect.addEventListener('change', () => {
    const conf = confSelect.value;
    teamOptions.forEach((opt) => {
      if (opt.value === 'all') return;
      opt.hidden = conf !== 'all' && opt.getAttribute('data-conference') !== conf;
    });
    teamSelect.value = 'all';
    applyFilters();
  });

  teamSelect.addEventListener('change', applyFilters);
});
