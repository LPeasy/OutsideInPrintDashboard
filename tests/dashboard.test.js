const assert = require('assert');
const fs = require('fs');
const path = require('path');
const helpers = require('../js/dashboard.js');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const pieceHtml = fs.readFileSync(path.join(__dirname, '..', 'piece.html'), 'utf8');

assert(indexHtml.includes('Editorial totals'));
assert(indexHtml.includes('Top pieces'));
assert(indexHtml.includes('Traffic sources'));
assert(!indexHtml.includes('Reader Journey'));
assert(!indexHtml.includes('Small Multiples'));
assert(!indexHtml.includes('Essay Explorer'));
assert(!indexHtml.includes('Section Explorer'));
assert(!indexHtml.includes('What Stands Out'));
assert(!indexHtml.includes('Editable-source finding'));

assert(pieceHtml.includes('Select a section, then a piece'));
assert(pieceHtml.includes('data-piece-section'));
assert(pieceHtml.includes('data-piece-select'));

assert.strictEqual(helpers.cleanTitle('The Dolphin Company | Outside In Print'), 'The Dolphin Company');
assert.strictEqual(helpers.normalizeSection('Literature', '/literature/sample/'), 'Books');
assert.strictEqual(
  helpers.canonicalPieceUrl({ path: '/syd-and-oliver/smoke-and-brass/', section: 'Syd and Oliver', slug: 'smoke-and-brass' }),
  'https://lpeasy.github.io/outsideinprint/syd-and-oliver/smoke-and-brass/'
);

const pieces = helpers.buildPieceCollection({
  essays: [
    { path: '/literature/example-book/', section: 'Literature', slug: 'example-book', title: 'Example Book | Outside In Print', views: 2, reads: 1, read_rate: 50, pdf_downloads: 0, primary_source: 'lpeasy.github.io/outsideinprint/library' },
    { path: '/essays/example-essay/', section: 'Essays', slug: 'example-essay', title: 'Example Essay | Outside In Print', views: 4, reads: 2, read_rate: 50, pdf_downloads: 1, primary_source: 'internal /random/' },
  ],
});

assert.deepStrictEqual(pieces.map((piece) => piece.section), ['Essays', 'Books']);
assert.deepStrictEqual(
  pieces.filter((piece) => piece.section === 'Books').map((piece) => piece.cleanTitle),
  ['Example Book']
);
assert.strictEqual(pieces.find((piece) => piece.slug === 'example-book').liveUrl, 'https://lpeasy.github.io/outsideinprint/literature/example-book/');
assert.strictEqual(helpers.normalizeSource('lpeasy.github.io/outsideinprint/random').label, 'Random');
assert.strictEqual(helpers.normalizeSource('direct').type, 'direct');

const summary = helpers.summarizeSections(
  { sections: [{ section: 'Essays', pageviews: 4, reads: 2, pdf_downloads: 1, read_rate: 50 }] },
  pieces
);
assert.strictEqual(summary.find((entry) => entry.section === 'Essays').pieceCount, 1);
assert.strictEqual(summary.find((entry) => entry.section === 'Books').pieceCount, 1);
assert.strictEqual(summary.find((entry) => entry.section === 'Syd and Oliver').pieceCount, 0);

class FakeElement {
  constructor(name) {
    this.name = name;
    this._innerHTML = '';
    this._options = [];
    this._selectedIndex = 0;
    this.value = '';
    this.textContent = '';
    this.href = '';
    this.hidden = false;
    this.disabled = false;
    this.listeners = {};
  }

  set innerHTML(value) {
    this._innerHTML = value;
    if (this.name === 'sectionSelect' || this.name === 'pieceSelect') {
      this._options = Array.from(String(value).matchAll(/<option value="([^"]*)">([^<]*)<\/option>/g)).map((match) => ({
        value: match[1],
        label: match[2],
      }));
      if (this._options.length) {
        if (!this._options.some((option) => option.value === this.value)) {
          this.value = this._options[0].value;
          this._selectedIndex = 0;
        }
      } else {
        this.value = '';
        this._selectedIndex = 0;
      }
    }
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set selectedIndex(index) {
    this._selectedIndex = index;
    if (this._options[index]) {
      this.value = this._options[index].value;
    }
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  addEventListener(type, handler) {
    this.listeners[type] = handler;
  }

  dispatch(type) {
    if (this.listeners[type]) {
      this.listeners[type]();
    }
  }
}

const sectionSelect = new FakeElement('sectionSelect');
const pieceSelect = new FakeElement('pieceSelect');
const helper = new FakeElement('helper');
const title = new FakeElement('title');
const subtitle = new FakeElement('subtitle');
const liveLink = new FakeElement('liveLink');
const pdfLink = new FakeElement('pdfLink');
const kpiGrid = new FakeElement('kpiGrid');
const series = new FakeElement('series');
const source = new FakeElement('source');

const fakeDocument = {
  querySelector(selector) {
    return {
      '[data-piece-section]': sectionSelect,
      '[data-piece-select]': pieceSelect,
      '[data-piece-helper]': helper,
      '[data-piece-title]': title,
      '[data-piece-subtitle]': subtitle,
      '[data-piece-live-link]': liveLink,
      '[data-piece-pdf-link]': pdfLink,
      '[data-piece-kpis]': kpiGrid,
      '[data-piece-series]': series,
      '[data-piece-source]': source,
    }[selector] || null;
  },
};

const replaceCalls = [];
const fakeWindow = {
  location: { search: '?section=Essays&slug=the-national-flood-insurance-program', pathname: '/piece.html' },
  history: { replaceState: (...args) => replaceCalls.push(args) },
};

global.document = fakeDocument;
global.window = fakeWindow;

helpers.populatePiecePage(
  {
    essays: [
      { path: '/essays/the-national-flood-insurance-program/', section: 'Essays', slug: 'the-national-flood-insurance-program', title: 'The National Flood Insurance Program | Outside In Print', views: 1, reads: 1, read_rate: 100, pdf_downloads: 0, primary_source: 'lpeasy.github.io/outsideinprint/random' },
      { path: '/syd-and-oliver/smoke-and-brass/', section: 'Syd and Oliver', slug: 'smoke-and-brass', title: 'Smoke and Brass | Outside In Print', views: 1, reads: 0, read_rate: 0, pdf_downloads: 0, primary_source: 'internal /syd-and-oliver/' },
    ],
    essays_timeseries: [
      { path: '/essays/the-national-flood-insurance-program/', section: 'Essays', slug: 'the-national-flood-insurance-program', series: [{ date: '2026-03-16', pageviews: 1, reads: 1, pdf_downloads: 0 }] },
      { path: '/syd-and-oliver/smoke-and-brass/', section: 'Syd and Oliver', slug: 'smoke-and-brass', series: [{ date: '2026-03-15', pageviews: 1, reads: 0, pdf_downloads: 0 }] },
    ],
  },
  helpers.buildPieceCollection({
    essays: [
      { path: '/essays/the-national-flood-insurance-program/', section: 'Essays', slug: 'the-national-flood-insurance-program', title: 'The National Flood Insurance Program | Outside In Print', views: 1, reads: 1, read_rate: 100, pdf_downloads: 0, primary_source: 'lpeasy.github.io/outsideinprint/random' },
      { path: '/syd-and-oliver/smoke-and-brass/', section: 'Syd and Oliver', slug: 'smoke-and-brass', title: 'Smoke and Brass | Outside In Print', views: 1, reads: 0, read_rate: 0, pdf_downloads: 0, primary_source: 'internal /syd-and-oliver/' },
    ],
  })
);

assert(sectionSelect.innerHTML.includes('Essays'));
assert(sectionSelect.innerHTML.includes('Books'));
assert(pieceSelect.innerHTML.includes('the-national-flood-insurance-program'));
assert.strictEqual(title.textContent, 'The National Flood Insurance Program');
assert.strictEqual(liveLink.href, 'https://lpeasy.github.io/outsideinprint/essays/the-national-flood-insurance-program/');

sectionSelect.value = 'Syd and Oliver';
sectionSelect.dispatch('change');
assert(pieceSelect.innerHTML.includes('smoke-and-brass'));
assert(!pieceSelect.innerHTML.includes('the-national-flood-insurance-program'));
assert.strictEqual(title.textContent, 'Smoke and Brass');
assert.strictEqual(liveLink.href, 'https://lpeasy.github.io/outsideinprint/syd-and-oliver/smoke-and-brass/');
assert(replaceCalls.length > 0);

delete global.document;
delete global.window;

console.log('dashboard tests passed');
