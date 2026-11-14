(() => {
  const schedule = document.querySelector('.week table');
  if (!schedule) return;

  const dayCells = [...schedule.rows[0].cells]
    .map((cell, index) => ({ day: cell.textContent.trim(), index }))
    .filter(({ day }) => /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/i.test(day));
  if (!dayCells.length) return;

  const details = [...document.querySelectorAll('#workout-content details')];
  const normalize = (text) => text.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
  const sectionName = (element) => normalize(element.querySelector('summary')?.textContent || '');
  const targetsFor = (label) => {
    const text = normalize(label);
    let category;
    let variants = [];

    if (text.startsWith('movement prep')) {
      category = 'movement prep';
      variants = [...text.matchAll(/\b([ab])\b/g)].map((match) => match[1]);
    } else if (text.startsWith('elasticity')) {
      category = 'elasticity';
      variants = [...text.matchAll(/\b([ab])\b/g)].map((match) => match[1]);
    } else if (text.startsWith('strength')) {
      category = 'strength';
      variants = [...text.matchAll(/\b([ab])\b/g)].map((match) => match[1]);
    } else if (text.startsWith('prehab')) {
      category = 'prehab';
    } else if (text.startsWith('esd')) {
      category = 'energy system development';
    } else if (text.startsWith('physioball')) {
      category = 'physioball';
    } else if (/^(regeneration|regen)\b/.test(text)) {
      category = 'regeneration';
    }

    if (!category) return [];
    const candidates = details.filter((detail) => {
      const name = sectionName(detail);
      if (category === 'energy system development') return name.includes(category);
      if (category === 'prehab') {
        const area = ['shoulder', 'core', 'hip'].find((word) => text.includes(word));
        return name.startsWith(category) && (!area || name.includes(area) || name === category);
      }
      if (category === 'regeneration') return name.startsWith(category);
      return name.startsWith(category);
    });

    if (!variants.length || !['movement prep', 'elasticity', 'strength'].includes(category)) {
      return candidates.slice(0, 1);
    }
    return variants.flatMap((variant) => {
      const exact = candidates.find((detail) => {
        const suffix = sectionName(detail).slice(category.length).trim();
        return new RegExp(`^${variant}(?:\\s|$)`).test(suffix);
      });
      return exact ? [exact] : [];
    });
  };

  const targetId = (detail) => {
    if (!detail.id) detail.id = `phase-session-target-${details.indexOf(detail) + 1}`;
    detail.style.scrollMarginTop = '180px';
    return detail.id;
  };
  const makeComponent = (label) => {
    const targets = targetsFor(label);
    if (!targets.length) {
      const text = document.createElement('span');
      text.className = 'session-component';
      text.textContent = label;
      return text;
    }
    const link = document.createElement('a');
    const ids = targets.map(targetId);
    link.className = 'session-component';
    link.href = `#${ids[0]}`;
    link.textContent = label;
    if (ids.length > 1) {
      link.dataset.targets = ids.join(' ');
      link.setAttribute('aria-label', `${label}: opens all matching workout sections`);
    }
    return link;
  };

  schedule.querySelectorAll('td').forEach((cell) => {
    const label = cell.textContent.trim();
    if (!label || !targetsFor(label).length) return;
    cell.replaceChildren(makeComponent(label));
  });

  const days = dayCells.map(({ day, index }) => ({
    day,
    items: [...schedule.rows].slice(1)
      .map((row) => row.cells[index]?.textContent.trim() || '')
      .filter(Boolean)
  }));
  const phase = document.querySelector('#workout-content > h1')?.textContent.trim() || 'Training';
  const weeks = document.querySelector('.phase-weeks')?.textContent.trim() || '';
  const firstTarget = details[0];
  const sessions = document.createElement('section');
  sessions.className = 'session-overview';
  sessions.setAttribute('aria-labelledby', 'daily-sessions-heading');

  const heading = document.createElement('div');
  heading.className = 'session-heading';
  const intro = document.createElement('div');
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = `${phase}${weeks ? ` · ${weeks}` : ''} · session view`;
  const title = document.createElement('h2');
  title.id = 'daily-sessions-heading';
  title.textContent = 'Daily sessions';
  const description = document.createElement('p');
  description.textContent = 'Components appear in the same order as the weekly schedule. Select one to jump to its exercise details.';
  intro.append(eyebrow, title, description);
  heading.append(intro);

  if (firstTarget) {
    const browse = document.createElement('a');
    browse.className = 'text-link session-component';
    browse.href = `#${targetId(firstTarget)}`;
    browse.textContent = 'Browse all exercise details ↓';
    heading.append(browse);
  }
  sessions.append(heading);

  const week = document.createElement('section');
  week.className = 'session-week';
  week.setAttribute('aria-label', `${phase}${weeks ? `, ${weeks}` : ''}`);
  const weekHeading = document.createElement('h3');
  weekHeading.textContent = weeks || phase;
  const grid = document.createElement('div');
  grid.className = 'session-grid';
  days.forEach(({ day, items }) => {
    const card = document.createElement('article');
    card.className = 'session-card';
    const cardHeading = document.createElement('h4');
    cardHeading.textContent = day;
    card.append(cardHeading);
    if (items.length) {
      const list = document.createElement('ol');
      items.forEach((item) => {
        const entry = document.createElement('li');
        entry.append(makeComponent(item));
        list.append(entry);
      });
      card.append(list);
    } else {
      const empty = document.createElement('p');
      empty.className = 'no-session';
      empty.textContent = 'No session listed';
      card.append(empty);
    }
    grid.append(card);
  });
  week.append(weekHeading, grid);
  sessions.append(week);
  schedule.closest('.week')?.after(sessions);

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a.session-component[href^="#"]');
    if (!link) return;
    const targetIds = link.dataset.targets?.split(' ') || [link.hash.slice(1)];
    targetIds.forEach((id) => {
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) target.open = true;
    });
  });
})();
