const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const pages = [
  'index.html', 'CP-Workouts/index.html', 'CP-Workouts/Coreperformance-Essentials.html',
  ...[1, 2, 3, 4].map((n) => `CP-Workouts/Coreperformance-Phase${n}.html`),
  'sas/index.html', ...['Beginner', 'Intermediate', 'Advanced', 'Professional'].map((n) => `sas/${n}.html`)
];

function headerAt(page, prefix = '/cp-web/') {
  const classes = new Map();
  const base = `https://example.test${prefix}`;
  vm.runInNewContext(read('index.js'), {
    URL, HTMLElement: class {}, window: { location: { href: new URL(page, base).href } },
    document: { currentScript: { src: new URL('index.js', base).href }, querySelectorAll: () => [] },
    customElements: { get: (key) => classes.get(key), define: (key, value) => classes.set(key, value) }
  });
  const header = new (classes.get('header-component'))();
  header.connectedCallback();
  return header.innerHTML;
}

test('shared navigation stays inside the deployment from every page and subfolder', () => {
  for (const prefix of ['/cp-web/', '/', '/preview/nested/cp-web/']) {
    for (const page of pages) {
      const header = headerAt(page, prefix);
      for (const [, target] of header.matchAll(/href="([^"]+)"/g)) {
        const url = new URL(target);
        assert.ok(url.pathname.startsWith(prefix), `${page}: ${target} escaped ${prefix}`);
        assert.ok(fs.existsSync(path.join(root, decodeURIComponent(url.pathname.slice(prefix.length)))), `${page}: missing ${target}`);
        assert.ok(!url.pathname.includes('/CP-Workouts/CP-Workouts/'));
      }
    }
  }
});

test('Essentials is independent; phase and SAS navigation only appear in their programmes', () => {
  assert.match(headerAt(''), /aria-current="page">Home/);
  assert.match(headerAt('CP-Workouts/'), /aria-current="page">Core Performance/);
  const essentials = headerAt('CP-Workouts/Coreperformance-Essentials.html');
  assert.match(essentials, /aria-current="page">Essentials/);
  assert.doesNotMatch(essentials, /aria-label="Core Performance phases"/);
  for (let n = 1; n <= 4; n++) {
    const cp = headerAt(`CP-Workouts/Coreperformance-Phase${n}.html`);
    assert.match(cp, new RegExp(`aria-current="page">Phase ${n}`));
    assert.doesNotMatch(cp, /aria-label="SAS levels"/);
  }
  for (const level of ['Beginner', 'Intermediate', 'Advanced', 'Professional']) {
    const sas = headerAt(`sas/${level}.html`);
    assert.match(sas, new RegExp(`aria-current="page">${level}`));
    assert.doesNotMatch(sas, /aria-label="Core Performance phases"/);
  }
});

test('home has three separate programme choices and workbook week ranges are represented', () => {
  assert.equal([...read('index.html').matchAll(/class="programme-card"/g)].length, 3);
  for (const target of ['CP-Workouts/index.html', 'CP-Workouts/Coreperformance-Essentials.html', 'sas/index.html']) assert.ok(read('index.html').includes(target));
  for (const weeks of ['1–3', '4–6', '7–9', '10–12']) assert.ok(read('CP-Workouts/index.html').includes(`Weeks ${weeks}`));
});

test('local HTML resources exist, keep exact filename case, and every page loads the shared header', () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /name="viewport"/);
    assert.match(html, /<header-component><\/header-component>/);
    assert.equal([...html.matchAll(/<title>/gi)].length, 1);
    assert.ok(html.includes(page === 'index.html' ? 'src="./index.js"' : 'src="../index.js"'));
    for (const [, target] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:https?:|#|mailto:|data:)/.test(target)) continue;
      const local = path.resolve(root, path.dirname(page), target.split('#')[0]);
      assert.ok(local.startsWith(root + path.sep), `${page}: resource escaped repository`);
      assert.ok(fs.existsSync(local), `${page}: missing ${target}`);
      assert.ok(fs.readdirSync(path.dirname(local)).includes(path.basename(local)), `${page}: filename case mismatch ${target}`);
    }
  }
});

test('SAS scripts populate their own tables and tolerate tables absent on other levels', () => {
  for (const [script, page] of [['Index-SAS.js', 'Beginner'], ['Int-SAS.js', 'Intermediate'], ['Adv-SAS.js', 'Advanced']]) {
    const tables = new Map();
    for (const [, classes] of read(`sas/${page}.html`).matchAll(/<table[^>]*class="([^"]+)"/g)) {
      for (const name of classes.split(/\s+/)) tables.set(`table.${name}`, { rows: [], insertRow() { const row = { cells: [], insertCell() { const cell = { appendChild(text) { this.text = text; } }; this.cells.push(cell); return cell; } }; this.rows.push(row); return row; } });
    }
    const context = { document: { querySelector: (selector) => tables.get(selector) || null, createTextNode: String } };
    vm.runInNewContext(read(`sas/${script}`), context);
    assert.ok([...tables.values()].some((table) => table.rows.length > 0), `${page}: no exercise rows`);
    assert.doesNotMatch(read(`sas/${script}`), /customElements\.define/);
    vm.runInNewContext(read(`sas/${script}`), { document: { querySelector: () => null, createTextNode: String } });
  }
  assert.doesNotMatch(read('sas/Professional.html'), /src="\.\/Index-SAS\.js"/);
});
