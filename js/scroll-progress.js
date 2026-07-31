(function () {
  // ── Scroll progress bar ──────────────────────────────────────────────────
  const bar = document.getElementById("scroll-progress");

  function updateBar() {
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  }

  if (bar) {
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();
  }

  // ── Scroll position memory (lesson pages only, session-scoped) ───────────
  const params = new URLSearchParams(location.search);
  const lessonId = params.get("lesson");
  if (!lessonId) return;

  const KEY = "cis365.scroll." + lessonId;

  // Restore saved position after lesson content has fully loaded
  window.addEventListener("lesson-loaded", function handler(e) {
    if (e.detail && e.detail.lessonId !== lessonId) return;
    const saved = parseInt(sessionStorage.getItem(KEY) || "0", 10);
    if (saved > 80) {
      setTimeout(() => window.scrollTo({ top: saved, behavior: "instant" }), 120);
    }
    // Only restore once per page load
    window.removeEventListener("lesson-loaded", handler);
  });

  // Persist position on scroll (debounced)
  let saveTimer;
  window.addEventListener("scroll", function () {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      sessionStorage.setItem(KEY, Math.round(window.scrollY));
    }, 250);
  }, { passive: true });
})();
