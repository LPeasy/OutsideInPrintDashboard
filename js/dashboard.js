(function () {
  const CANONICAL_BASE = 'https://lpeasy.github.io/outsideinprint';
  const CONTENT_SECTIONS = [
    { value: 'Essays', label: 'Essays', slug: 'essays' },
    { value: 'Books', label: 'Books', slug: 'literature' },
    { value: 'Syd and Oliver', label: 'Syd and Oliver', slug: 'syd-and-oliver' },
  ];

  function readData() {
    const node = typeof document !== 'undefined' && document.getElementById('dashboard-data');
    return node ? JSON.parse(node.textContent) : null;
  }

  function cleanTitle(title) {
    return String(title || '').replace(/\s*\|\s*Outside In Print$/, '').trim();
  }

  function normalizeSection(section, path) {
    if (section === 'Literature' || section === 'Books') return 'Books';
    if ((path || '').startsWith('/literature/')) return 'Books';
    return section;
  }

  function canonicalPieceUrl(item) {
    if (item.path) return `${CANONICAL_BASE}${item.path}`;
    const section = CONTENT_SECTIONS.find((entry) => entry.label === normalizeSection(item.section, item.path));
    const slugBase = section ? section.slug : 'essays';
    return `${CANONICAL_BASE}/${slugBase}/${item.slug}/`;
  }

  function pdfUrl(item) {
    return item.slug ? `https://lpeasy.github.io/OutsideInPrintDashboard/pdfs/${item.slug}.pdf` : null;
  }

  function normalizeSource(raw) {
    const value = `${raw || ''}`.trim();
    if (!value || value === 'direct') {
      return { key: 'Direct', label: 'Direct', type: 'direct' };
    }
    if (value.includes('/start-here')) {
      return { key: 'Start Here', label: 'Start Here', type: 'internal' };
    }
    if (value.includes('/collections')) {
      return { key: 'Collections', label: 'Collections', type: 'internal' };
    }
    if (value.includes('/library') || value.includes('/literature')) {
      return { key: 'Library / Books', label: 'Library / Books', type: 'internal' };
    }
    if (value.includes('/random')) {
      return { key: 'Random', label: 'Random', type: 'internal' };
    }
    if (value.includes('outsideinprint')) {
      return { key: 'Internal article link', label: 'Internal article link', type: 'internal' };
    }
    if (value.startsWith('internal')) {
      return { key: 'Internal navigation', label: 'Internal navigation', type: 'internal' };
    }
    return { key: 'External referral', label: 'External referral', type: 'external' };
  }

  function buildPieceCollection(data) {
    const items = (data?.essays || []).map((item) => ({
      ...item,
      section: normalizeSection(item.section, item.path),
      cleanTitle: cleanTitle(item.title),
      liveUrl: canonicalPieceUrl(item),
      pdfUrl: pdfUrl(item),
      sourceLabel: normalizeSource(item.primary_source).label,
    }));

    return items.sort((left, right) => {
      if (right.views !== left.views) return right.views - left.views;
      return left.cleanTitle.localeCompare(right.cleanTitle);
    });
  }

  function summarizeSections(data, pieces) {
    const actual = new Map((data?.sections || []).map((entry) => [normalizeSection(entry.section), { ...entry, section: normalizeSection(entry.section) }]));
    return CONTENT_SECTIONS.map((section) => {
      const fromData = actual.get(section.label);
      const sectionPieces = pieces.filter((piece) => piece.section === section.label);
      return {
        section: section.label,
        pageviews: fromData?.pageviews || sectionPieces.reduce((sum, piece) => sum + (piece.views || 0), 0),
        reads: fromData?.reads || sectionPieces.reduce((sum, piece) => sum + (piece.reads || 0), 0),
        pdf_downloads: fromData?.pdf_downloads || sectionPieces.reduce((sum, piece) => sum + (piece.pdf_downloads || 0), 0),
        read_rate: fromData?.read_rate || (sectionPieces.length ? Number(((sectionPieces.reduce((sum, piece) => sum + (piece.reads || 0), 0) / Math.max(sectionPieces.reduce((sum, piece) => sum + (piece.views || 0), 0), 1)) * 100).toFixed(1)) : 0),
        pieceCount: sectionPieces.length,
      };
    });
  }

  function renderOverview(data, pieces) {
    const grid = document.querySelector('[data-kpi-grid]');
    const updatedAt = document.querySelector('[data-updated-at]');
    if (!grid) return;
    const overview = data?.overview || {};
    updatedAt.textContent = overview.updated_at ? `Updated ${overview.updated_at}` : 'Static build';

    const kpis = [
      ['Pageviews', overview.pageviews || 0],
      ['Reads', overview.reads || 0],
      ['Read rate', `${Number(overview.read_rate || 0).toFixed(1)}%`],
      ['PDF downloads', overview.pdf_downloads || 0],
      ['Tracked pieces', pieces.length],
    ];

    grid.innerHTML = kpis.map(([label, value]) => `<article class="kpi-card"><span class="kpi-label">${label}</span><p class="kpi-value">${value}</p></article>`).join('');
  }

  function renderSections(sectionRows) {
    const target = document.querySelector('[data-section-cards]');
    if (!target) return;
    target.innerHTML = sectionRows.map((entry) => `
      <article class="section-card">
        <p class="eyebrow">${entry.section}</p>
        <p><strong>${entry.pieceCount}</strong> tracked pieces</p>
        <p>${entry.pageviews} pageviews · ${entry.reads} reads · ${entry.pdf_downloads} PDFs</p>
        <p class="helper-text">Read rate ${Number(entry.read_rate || 0).toFixed(1)}%</p>
      </article>
    `).join('');
  }

  function renderTopPieces(pieces) {
    const target = document.querySelector('[data-top-pieces]');
    if (!target) return;
    const rows = pieces.slice(0, 10).map((piece) => `
      <tr>
        <td><a href="${piece.liveUrl}">${piece.cleanTitle}</a></td>
        <td>${piece.section}</td>
        <td>${piece.views || 0}</td>
        <td>${piece.reads || 0}</td>
        <td>${Number(piece.read_rate || 0).toFixed(1)}%</td>
        <td>${piece.pdf_downloads || 0}</td>
        <td>${piece.sourceLabel}</td>
        <td><a href="piece.html?section=${encodeURIComponent(piece.section)}&slug=${encodeURIComponent(piece.slug)}">Open</a></td>
      </tr>
    `).join('');

    target.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Piece</th>
            <th>Section</th>
            <th>Views</th>
            <th>Reads</th>
            <th>Read rate</th>
            <th>PDFs</th>
            <th>Primary source</th>
            <th>Stats</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderSources(data) {
    const target = document.querySelector('[data-source-summary]');
    if (!target) return;
    const grouped = new Map();
    (data?.sources || []).forEach((entry) => {
      const normalized = normalizeSource(`${entry.source || ''}${entry.medium || ''}`);
      const current = grouped.get(normalized.key) || { label: normalized.label, visitors: 0, pageviews: 0, reads: 0, type: normalized.type };
      current.visitors += entry.visitors || 0;
      current.pageviews += entry.pageviews || 0;
      current.reads += entry.reads || 0;
      grouped.set(normalized.key, current);
    });

    target.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Source group</th>
            <th>Type</th>
            <th>Visitors</th>
            <th>Pageviews</th>
            <th>Reads</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from(grouped.values()).sort((a, b) => b.pageviews - a.pageviews).map((entry) => `
            <tr>
              <td>${entry.label}</td>
              <td><span class="tag">${entry.type}</span></td>
              <td>${entry.visitors}</td>
              <td>${entry.pageviews}</td>
              <td>${entry.reads}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function getSeriesForPiece(data, piece) {
    const match = (data?.essays_timeseries || []).find((entry) => entry.slug === piece.slug && normalizeSection(entry.section, entry.path) === piece.section);
    return match?.series || [];
  }

  function populatePiecePage(data, pieces) {
    const sectionSelect = document.querySelector('[data-piece-section]');
    const pieceSelect = document.querySelector('[data-piece-select]');
    if (!sectionSelect || !pieceSelect) return;

    const helper = document.querySelector('[data-piece-helper]');
    const params = new URLSearchParams(window.location.search);

    sectionSelect.innerHTML = CONTENT_SECTIONS.map((section) => `<option value="${section.label}">${section.label}</option>`).join('');

    function updatePieceOptions() {
      const section = sectionSelect.value;
      const filtered = pieces.filter((piece) => piece.section === section);
      pieceSelect.innerHTML = filtered.length
        ? filtered.map((piece) => `<option value="${piece.slug}">${piece.cleanTitle}</option>`).join('')
        : '<option value="">No tracked pieces yet</option>';
      pieceSelect.disabled = !filtered.length;
      helper.textContent = filtered.length
        ? `${filtered.length} tracked piece${filtered.length === 1 ? '' : 's'} in ${section}.`
        : `${section} is a valid public section, but this snapshot does not yet include tracked pieces for it.`;

      const desiredSlug = params.get('slug');
      const exists = filtered.some((piece) => piece.slug === desiredSlug);
      if (exists) {
        pieceSelect.value = desiredSlug;
      }
    }

    function renderSelectedPiece() {
      const piece = pieces.find((entry) => entry.section === sectionSelect.value && entry.slug === pieceSelect.value);
      const title = document.querySelector('[data-piece-title]');
      const subtitle = document.querySelector('[data-piece-subtitle]');
      const liveLink = document.querySelector('[data-piece-live-link]');
      const pdfLink = document.querySelector('[data-piece-pdf-link]');
      const kpiGrid = document.querySelector('[data-piece-kpis]');
      const seriesTarget = document.querySelector('[data-piece-series]');
      const sourceTarget = document.querySelector('[data-piece-source]');

      if (!piece) {
        title.textContent = 'No tracked piece available';
        subtitle.textContent = 'Select another section or wait for future snapshot coverage.';
        liveLink.href = CANONICAL_BASE;
        liveLink.textContent = 'Open public site';
        pdfLink.hidden = true;
        kpiGrid.innerHTML = '';
        seriesTarget.innerHTML = '<p class="helper-text">No piece series available.</p>';
        sourceTarget.innerHTML = '<p class="helper-text">No source summary available.</p>';
        return;
      }

      const series = getSeriesForPiece(data, piece);
      title.textContent = piece.cleanTitle;
      subtitle.textContent = `${piece.section} · canonical URL ${piece.liveUrl}`;
      liveLink.href = piece.liveUrl;
      liveLink.textContent = 'Open published piece';
      pdfLink.href = piece.pdfUrl || '#';
      pdfLink.hidden = !piece.pdfUrl;
      kpiGrid.innerHTML = [
        ['Views', piece.views || 0],
        ['Reads', piece.reads || 0],
        ['Read rate', `${Number(piece.read_rate || 0).toFixed(1)}%`],
        ['PDF downloads', piece.pdf_downloads || 0],
      ].map(([label, value]) => `<article class="stat-card"><span class="stat-label">${label}</span><strong class="stat-value">${value}</strong></article>`).join('');

      seriesTarget.innerHTML = series.length
        ? `<table class="detail-table"><thead><tr><th>Date</th><th>Pageviews</th><th>Reads</th><th>PDFs</th></tr></thead><tbody>${series.map((entry) => `<tr><td>${entry.date}</td><td>${entry.pageviews}</td><td>${entry.reads}</td><td>${entry.pdf_downloads}</td></tr>`).join('')}</tbody></table>`
        : '<p class="helper-text">No daily series available for this piece.</p>';

      sourceTarget.innerHTML = `
        <p><span class="tag">${piece.sourceLabel}</span></p>
        <p class="helper-text">Primary observed source for the current snapshot.</p>
      `;

      const nextParams = new URLSearchParams({ section: piece.section, slug: piece.slug });
      window.history.replaceState({}, '', `${window.location.pathname}?${nextParams.toString()}`);
    }

    const requestedSection = params.get('section');
    if (CONTENT_SECTIONS.some((entry) => entry.label === requestedSection)) {
      sectionSelect.value = requestedSection;
    }

    updatePieceOptions();
    if (!pieceSelect.value && !pieceSelect.disabled) {
      pieceSelect.selectedIndex = 0;
    }
    renderSelectedPiece();

    sectionSelect.addEventListener('change', () => {
      updatePieceOptions();
      if (!pieceSelect.disabled) pieceSelect.selectedIndex = 0;
      renderSelectedPiece();
    });

    pieceSelect.addEventListener('change', renderSelectedPiece);
  }

  function init() {
    const data = readData();
    if (!data) return;
    const pieces = buildPieceCollection(data);
    if (document.querySelector('[data-kpi-grid]')) {
      renderOverview(data, pieces);
      renderSections(summarizeSections(data, pieces));
      renderTopPieces(pieces);
      renderSources(data);
    }
    populatePiecePage(data, pieces);
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }

  if (typeof module !== 'undefined') {
    module.exports = {
      CONTENT_SECTIONS,
      buildPieceCollection,
      canonicalPieceUrl,
      cleanTitle,
      normalizeSection,
      normalizeSource,
      summarizeSections,
      populatePiecePage,
    };
  }
})();
