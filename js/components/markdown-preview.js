/**
 * <markdown-preview-widget :config="..." />
 * config: { label, starter }
 * A split-pane Markdown editor with a live rendered preview, reusing the
 * same marked.js already loaded on the page.
 */
window.CourseComponents = window.CourseComponents || {};

window.CourseComponents.MarkdownPreviewWidget = {
  props: ["config"],
  data() {
    return { source: this.config.starter || "" };
  },
  computed: {
    rendered() {
      try {
        return marked.parse(this.source || "");
      } catch {
        return "<p>Couldn't render that yet — keep typing.</p>";
      }
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Try it yourself" }}</span>
      </div>
      <div class="md-preview">
        <textarea v-model="source" spellcheck="false"></textarea>
        <div class="md-preview__output lesson-content" v-html="rendered"></div>
      </div>
    </div>
  `
};
