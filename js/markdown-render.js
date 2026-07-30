/**
 * Small wrapper around marked.js: fetches a markdown file and returns
 * rendered HTML, with external links opened in a new tab.
 */
window.renderMarkdownFrom = async function renderMarkdownFrom(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load ${path} (${res.status})`);
  const raw = await res.text();

  marked.setOptions({ gfm: true, breaks: false });
  const html = marked.parse(raw);

  // Open external links in a new tab without needing a DOM parse pass.
  const container = document.createElement("div");
  container.innerHTML = html;
  container.querySelectorAll("a[href^='http']").forEach((a) => {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });
  return container.innerHTML;
};
