(() => {
  const schedule = document.querySelector('.week table');
  if (!schedule) return;

  const destinations = [
    [/^ESD\s*[12]$/i, 'esd'],
    [/^Movement Prep$/i, 'movement-prep'],
    [/^Physioball$/i, 'physioball'],
    [/^Prehab/i, 'prehab'],
    [/^Strength$/i, 'strength'],
    [/^(Regeneration|Regen:)/i, 'regeneration']
  ];
  const destinationFor = (label) => destinations.find(([pattern]) => pattern.test(label))?.[1];
  const componentLink = (label) => {
    const id = destinationFor(label);
    return id
      ? `<a class="session-component" href="#${id}">${label}</a>`
      : `<span class="session-component">${label}</span>`;
  };

  // Make the spreadsheet's existing schedule labels useful jump links too.
  schedule.querySelectorAll('td').forEach((cell) => {
    const label = cell.textContent.trim();
    if (destinationFor(label)) cell.innerHTML = componentLink(label);
  });

  const headers = [...schedule.querySelectorAll('tr:first-child th')]
    .map((cell) => cell.textContent.trim());
  const weeks = [];
  let currentWeek;
  [...schedule.querySelectorAll('tr')].slice(1).forEach((row) => {
    const cells = [...row.children];
    const weekLabel = cells[0]?.textContent.trim();
    if (/^Week/i.test(weekLabel)) {
      currentWeek = { label: weekLabel, days: headers.slice(2).map((day) => ({ day, items: [] })) };
      weeks.push(currentWeek);
    }
    if (!currentWeek) return;
    cells.slice(2).forEach((cell, index) => {
      const label = cell.textContent.trim();
      if (label) currentWeek.days[index]?.items.push(label);
    });
  });

  const sessions = document.createElement('section');
  sessions.className = 'session-overview';
  sessions.id = 'daily-sessions';
  sessions.setAttribute('aria-labelledby', 'daily-sessions-heading');
  sessions.innerHTML = `
    <div class="session-heading">
      <div>
        <p class="eyebrow">Phase 1 · session view</p>
        <h2 id="daily-sessions-heading">Daily sessions</h2>
        <p>Components appear in the same order as the weekly schedule. Select one to jump to its exercise details.</p>
      </div>
      <a class="text-link" href="#workout-details">Browse all exercise details ↓</a>
    </div>
    ${weeks.map((week) => `
      <section class="session-week" aria-label="${week.label}">
        <h3>${week.label}</h3>
        <div class="session-grid">
          ${week.days.map(({ day, items }) => `
            <article class="session-card">
              <h4>${day}</h4>
              ${items.length
                ? `<ol>${items.map((item) => `<li>${componentLink(item)}</li>`).join('')}</ol>`
                : '<p class="no-session">No session listed</p>'}
            </article>
          `).join('')}
        </div>
      </section>
    `).join('')}
  `;
  schedule.closest('.week').after(sessions);

  const details = [
    ['.movementprep details', 'movement-prep'],
    ['.strength details', 'strength'],
    ['.prehab details', 'prehab'],
    ['.esd details', 'esd'],
    ['.physioball details', 'physioball'],
    ['.regen details', 'regeneration']
  ];
  details.forEach(([selector, id]) => {
    const section = document.querySelector(selector);
    if (section) {
      section.id = id;
      section.open = false;
    }
  });
  const workoutDetails = document.createElement('div');
  workoutDetails.id = 'workout-details';
  document.querySelector('.movementprep')?.before(workoutDetails);
  workoutDetails.insertAdjacentHTML('beforeend', '<p class="eyebrow">Exercise reference</p><h2>Workout details</h2>');
  document.querySelectorAll('.movementprep, .strength, .prehab, .esd, .physioball, .regen')
    .forEach((section) => workoutDetails.append(section));

  // Deep links open the corresponding workout so the destination is visible.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a.session-component[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target instanceof HTMLDetailsElement) target.open = true;
  });

  // Build a compact strength view from the existing per-set spreadsheet rows.
  const strengthTable = document.querySelector('#strength table');
  if (strengthTable) {
    const rows = [...strengthTable.rows];
    const setHeader = rows[0]?.cells[1]?.textContent.trim().toLowerCase() === 'sets';
    if (setHeader) {
      const sessionHeaders = [...rows[0].cells].slice(2).map((cell) => cell.textContent.trim());
      const groups = [];
      let group = { label: 'Exercises', exercises: [] };
      groups.push(group);
      let exercise;

      rows.slice(1).forEach((row) => {
        const name = row.cells[0]?.textContent.trim();
        const set = row.cells[1]?.textContent.trim();
        if (name && /^(SuperSet|Circuit)$/i.test(name)) {
          group = { label: name, exercises: [] };
          groups.push(group);
          exercise = undefined;
          return;
        }
        if (name) {
          exercise = { name, prescriptions: sessionHeaders.map(() => []) };
          group.exercises.push(exercise);
        }
        if (!exercise || !/^\d+$/.test(set)) return;
        [...row.cells].slice(2).forEach((cell, index) => {
          const reps = cell.textContent.trim();
          if (reps) exercise.prescriptions[index]?.push({ set: Number(set), reps });
        });
      });

      const compact = document.createElement('section');
      compact.className = 'compact-strength';
      compact.setAttribute('aria-label', 'Strength prescriptions in compact set notation');
      compact.innerHTML = '<p class="prescription-note">Set × reps. “@” and other spreadsheet notes are retained with the rep count. Open the original table below to compare each set row.</p>';
      const formatPrescription = (entries) => {
        if (!entries.length) return '—';
        const sameReps = entries.every((entry) => entry.reps === entries[0].reps);
        const consecutiveSets = entries.every((entry, index) => entry.set === index + 1);
        if (sameReps && consecutiveSets) return `${entries.length} × ${entries[0].reps}`;
        return entries.map(({ set, reps }) => `Set ${set}: ${reps}`).join('; ');
      };
      groups.filter((item) => item.exercises.length).forEach((item) => {
        const section = document.createElement('section');
        section.className = 'compact-strength-group';
        if (item.label !== 'Exercises') section.innerHTML = `<h4>${item.label}</h4>`;
        item.exercises.forEach((entry) => {
          const card = document.createElement('article');
          card.className = 'prescription-card';
          const values = entry.prescriptions.map((prescription, index) =>
            `<div class="prescription-cell"><span>${sessionHeaders[index] || `Session ${index + 1}`}</span><strong>${formatPrescription(prescription)}</strong></div>`
          ).join('');
          card.innerHTML = `<h5>${entry.name}</h5><div class="prescription-grid">${values}</div>`;
          section.append(card);
        });
        compact.append(section);
      });

      const tableScroll = strengthTable.closest('.table-scroll');
      const original = document.createElement('details');
      original.className = 'original-strength';
      original.innerHTML = '<summary>View the original spreadsheet table</summary>';
      tableScroll?.before(compact, original);
      if (tableScroll) original.append(tableScroll);
    }
  }
})();
