// Publication filter.
(function () {
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
