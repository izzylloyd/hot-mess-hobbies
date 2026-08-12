// Hot Mess Hobby Shop — conference/division/team card filter

document.addEventListener('DOMContentLoaded', () => {
  const confSelect = document.getElementById('conference-filter');
  const divSelect = document.getElementById('division-filter');
  const teamSelect = document.getElementById('team-filter');
  const emptyMessage = document.querySelector('[data-filter-empty]');
  if (!confSelect || !divSelect || !teamSelect) return;

  const cards = Array.from(document.querySelectorAll('.card-grid .card'));
  const divOptions = Array.from(divSelect.options);
  const teamOptions = Array.from(teamSelect.options);

  function narrowDivisions(conf) {
    divOptions.forEach((opt) => {
      if (opt.value === 'all') return;
      opt.hidden = conf !== 'all' && opt.getAttribute('data-conference') !== conf;
    });
  }

  function narrowTeams(conf, div) {
    teamOptions.forEach((opt) => {
      if (opt.value === 'all') return;
      const matchesConf = conf === 'all' || opt.getAttribute('data-conference') === conf;
      const matchesDiv = div === 'all' || opt.getAttribute('data-division') === div;
      opt.hidden = !(matchesConf && matchesDiv);
    });
  }

  function applyFilters() {
    const conf = confSelect.value;
    const div = divSelect.value;
    const team = teamSelect.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardTeam = card.getAttribute('data-team');
      const cardConf = card.getAttribute('data-conference');
      const cardDiv = card.getAttribute('data-division');
      let visible = true;

      if (team !== 'all') {
        visible = cardTeam === team;
      } else if (div !== 'all') {
        visible = cardDiv === div;
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
    divSelect.value = 'all';
    teamSelect.value = 'all';
    narrowDivisions(conf);
    narrowTeams(conf, 'all');
    applyFilters();
  });

  divSelect.addEventListener('change', () => {
    const div = divSelect.value;
    if (div !== 'all') {
      const opt = divOptions.find((o) => o.value === div);
      const conf = opt.getAttribute('data-conference');
      confSelect.value = conf;
      narrowDivisions(conf);
    }
    teamSelect.value = 'all';
    narrowTeams(confSelect.value, div);
    applyFilters();
  });

  teamSelect.addEventListener('change', () => {
    const team = teamSelect.value;
    if (team !== 'all') {
      const opt = teamOptions.find((o) => o.value === team);
      const conf = opt.getAttribute('data-conference');
      const div = opt.getAttribute('data-division');
      confSelect.value = conf;
      divSelect.value = div;
      narrowDivisions(conf);
      narrowTeams(conf, div);
    }
    applyFilters();
  });
});
