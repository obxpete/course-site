(function () {
  const KEY = 'cis365.theme';
  const btn = document.querySelector('.topbar__theme-toggle');
  if (!btn) return;

  // The inline anti-flash script in <head> already set data-theme before the
  // button existed to be labeled — sync the label to actual state on load,
  // not just after a click.
  const syncLabel = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  syncLabel();

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
    syncLabel();
  });
})();
