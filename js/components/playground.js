/**
 * <playground-widget :config="..." />
 * config: { label, html, css, js, extraHead?, extraBodyEnd? }
 *
 * A self-contained HTML/CSS/JS editor + live preview, built from plain
 * textareas and an iframe using srcdoc. No CodePen/CodeSandbox account,
 * no network dependency beyond whatever CDN links the lesson itself opts
 * into (e.g. Bootstrap in Lesson 8).
 */
window.CourseComponents = window.CourseComponents || {};

window.CourseComponents.PlaygroundWidget = {
  props: ["config"],
  data() {
    return {
      tab: "html",
      html: this.config.html || "",
      css: this.config.css || "",
      js: this.config.js || "",
      srcdoc: "",
      runCount: 0
    };
  },
  mounted() {
    this.run();
  },
  methods: {
    run() {
      const head = this.config.extraHead || "";
      const bodyEnd = this.config.extraBodyEnd || "";
      this.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8">${head}<style>${this.css}</style></head><body>${this.html}${bodyEnd}<script>${this.js}<\/script></body></html>`;
      this.runCount++;
    },
    reset() {
      this.html = this.config.html || "";
      this.css = this.config.css || "";
      this.js = this.config.js || "";
      this.run();
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Try it yourself" }}</span>
        <div class="widget__actions">
          <button class="btn btn--ghost btn--sm" @click="reset" type="button">Reset</button>
          <button class="btn btn--primary btn--sm" @click="run" type="button">Run ▶</button>
        </div>
      </div>
      <div class="playground">
        <div class="playground__editor">
          <div class="playground__tabs">
            <button type="button" :class="{ 'is-active': tab === 'html' }" @click="tab = 'html'">HTML</button>
            <button type="button" :class="{ 'is-active': tab === 'css' }" @click="tab = 'css'">CSS</button>
            <button type="button" :class="{ 'is-active': tab === 'js' }" @click="tab = 'js'">JS</button>
          </div>
          <textarea v-show="tab === 'html'" v-model="html" spellcheck="false"></textarea>
          <textarea v-show="tab === 'css'" v-model="css" spellcheck="false"></textarea>
          <textarea v-show="tab === 'js'" v-model="js" spellcheck="false"></textarea>
        </div>
        <iframe :key="runCount" class="playground__preview" sandbox="allow-scripts allow-modals" :srcdoc="srcdoc" title="Live preview"></iframe>
      </div>
    </div>
  `
};
