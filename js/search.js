(function () {
  let index = null;
  let overlay, input, resultsList;

  function init() {
    overlay = document.getElementById('search-overlay');
    input = document.getElementById('search-input');
    resultsList = document.getElementById('search-results');
    if (!overlay) return;

    document.querySelectorAll('.search-trigger').forEach(btn => {
      btn.addEventListener('click', openSearch);
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSearch(); return; }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    });

    input.addEventListener('input', onInput);

    resultsList.addEventListener('click', function (e) {
      if (e.target.closest('.search-result')) closeSearch();
    });
  }

  async function openSearch() {
    overlay.hidden = false;
    input.value = '';
    resultsList.innerHTML = '';
    input.focus();
    if (!index) {
      index = await fetch('search-index.json').then(function (r) { return r.json(); });
    }
  }

  function closeSearch() {
    overlay.hidden = true;
  }

  function onInput() {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { resultsList.innerHTML = ''; return; }
    render(search(q), q);
  }

  function search(q) {
    return index
      .map(function (lesson) {
        var titleIdx = lesson.title.toLowerCase().indexOf(q);
        var textIdx = lesson.text.toLowerCase().indexOf(q);
        if (titleIdx === -1 && textIdx === -1) return null;
        return { lesson: lesson, titleMatch: titleIdx !== -1, textIdx: textIdx };
      })
      .filter(Boolean)
      .sort(function (a, b) {
        if (a.titleMatch && !b.titleMatch) return -1;
        if (!a.titleMatch && b.titleMatch) return 1;
        return 0;
      })
      .slice(0, 8);
  }

  function snippet(text, q) {
    var idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text.slice(0, 130).replace(/\n/g, ' ') + '…';
    var start = Math.max(0, idx - 65);
    var end = Math.min(text.length, idx + q.length + 65);
    var s = text.slice(start, end).replace(/\n/g, ' ');
    if (start > 0) s = '…' + s;
    if (end < text.length) s = s + '…';
    return s;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlight(text, q) {
    var escaped = escapeHtml(text);
    var pattern = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return escaped.replace(pattern, function (m) { return '<mark>' + m + '</mark>'; });
  }

  function render(hits, q) {
    if (hits.length === 0) {
      resultsList.innerHTML = '<li class="search-noresult">No results for "' + escapeHtml(q) + '"</li>';
      return;
    }
    resultsList.innerHTML = hits.map(function (hit) {
      var snip = snippet(hit.lesson.text, q);
      return '<li>' +
        '<a href="lesson.html?lesson=' + hit.lesson.id + '" class="search-result">' +
          '<span class="search-result__title">' + highlight(hit.lesson.title, q) + '</span>' +
          '<span class="search-result__snip">' + highlight(snip, q) + '</span>' +
        '</a>' +
      '</li>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
