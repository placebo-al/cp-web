/* Resolve from this script, not the page: works at /cp-web/ and below it. */
(() => {
  const root = new URL('./', document.currentScript.src);
  const href = (path) => new URL(path, root).href;
  const pathname = new URL(window.location.href).pathname;
  const current = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  const essentials = 'CP-Workouts/Coreperformance-Essentials.html';
  const isEssentials = current === new URL(essentials, root).pathname;
  const isCP = current.startsWith(new URL('CP-Workouts/', root).pathname) && !isEssentials;
  const isSAS = current.startsWith(new URL('sas/', root).pathname);
  const isStrength = current.startsWith(new URL('Performance-Strength/', root).pathname);
  const link = (path, label, active = current === new URL(path, root).pathname) =>
    `<a href="${href(path)}"${active ? ' aria-current="page"' : ''}>${label}</a>`;

  class WorkoutHeader extends HTMLElement {
    connectedCallback() {
      const phases = [
        ['Coreperformance-Phase1.html', 'Phase 1 · Weeks 1–3'],
        ['Coreperformance-Phase2.html', 'Phase 2 · Weeks 4–6'],
        ['Coreperformance-Phase3.html', 'Phase 3 · Weeks 7–9'],
        ['Coreperformance-Phase4.html', 'Phase 4 · Weeks 10–12']
      ];
      const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
      this.innerHTML = `
        <header class="site-header">
          <a class="site-brand" href="${href('index.html')}">Workout library</a>
          <span>Core Performance · Essentials · SAS · Performance Strength</span>
        </header>
        <nav class="program-nav" aria-label="Workout programmes">
          ${link('index.html', 'Home')}
          ${link('CP-Workouts/index.html', 'Core Performance', isCP)}
          ${link(essentials, 'Essentials', isEssentials)}
          ${link('sas/index.html', 'SAS', isSAS)}
          ${link('Performance-Strength/index.html', 'Performance Strength', isStrength)}
        </nav>
        ${isCP ? `<nav class="workout-nav" aria-label="Core Performance phases">${phases.map(([path, label]) => link(`CP-Workouts/${path}`, label)).join('')}</nav>` : ''}
        ${isSAS ? `<nav class="workout-nav" aria-label="SAS levels">${levels.map((level) => link(`sas/${level}.html`, level)).join('')}</nav>` : ''}
      `;
    }
  }
  if (!customElements.get('header-component')) customElements.define('header-component', WorkoutHeader);

  // Keep spreadsheet-width tables readable without making the whole page scroll.
  document.querySelectorAll('table').forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', 'Workout table; scroll horizontally for more columns');
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
})();
