// Day/Night toggle (remembered across pages) and the publication filter.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  function paint() {
    var dark = root.dataset.theme === 'dark';
    btn.textContent = dark ? 'Day' : 'Night';
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  if (btn) {
    btn.hidden = false;
    paint();
    btn.addEventListener('click', function () {
      var dark = root.dataset.theme !== 'dark';
      if (dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
      paint();
    });
  }

  var filters = document.querySelector('.filters');
  if (!filters) return;
  var pubs = [].slice.call(document.querySelectorAll('#pub-list > li'));
  var buttons = [].slice.call(filters.querySelectorAll('button'));
  buttons.forEach(function (b) {
    var type = b.dataset.filter;
    var n = pubs.filter(function (p) { return type === 'all' || p.dataset.type === type; }).length;
    b.querySelector('span').textContent = '(' + n + ')';
    b.addEventListener('click', function () {
      buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      pubs.forEach(function (p) { p.hidden = !(type === 'all' || p.dataset.type === type); });
    });
  });
  filters.hidden = false;
})();
