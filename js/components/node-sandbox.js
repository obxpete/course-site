/**
 * <node-sandbox-widget :config="..." />
 * config: { label, title, description, files, openFile }
 *
 * Runs a real Node.js/Express server via StackBlitz's WebContainers.
 *
 * Note on approach: WebContainers require the *hosting page* to send
 * Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy headers for an
 * inline iframe embed to boot. GitHub Pages has no mechanism to set custom
 * response headers, so an embedded iframe here would fail outright — and
 * even on hosts that can set those headers, StackBlitz's inline embed is
 * known to be unreliable (see stackblitz/sdk#37, stackblitz/webcontainer-core#2045).
 * Opening the project in a fresh top-level tab sidesteps all of that: it's
 * a real stackblitz.com page, which already sends the right headers itself,
 * so it works consistently regardless of how this site is hosted.
 */
window.CourseComponents = window.CourseComponents || {};

let sdkPromise = null;
function loadStackBlitzSdk() {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    if (window.StackBlitzSDK) return resolve(window.StackBlitzSDK);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js";
    script.onload = () => resolve(window.StackBlitzSDK);
    script.onerror = () => reject(new Error("Could not load the sandbox launcher right now."));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

window.CourseComponents.NodeSandboxWidget = {
  props: ["config"],
  data() {
    return { failed: false, launching: false };
  },
  computed: {
    previewFile() {
      const name = this.config.openFile || Object.keys(this.config.files)[0];
      return { name, code: this.config.files[name] || "" };
    }
  },
  methods: {
    async launch() {
      this.launching = true;
      this.failed = false;
      try {
        const sdk = await loadStackBlitzSdk();
        await sdk.openProject(
          {
            title: this.config.title || "CIS 365 Sandbox",
            description: this.config.description || "",
            template: "node",
            files: this.config.files
          },
          { newWindow: true, openFile: this.config.openFile }
        );
      } catch (e) {
        this.failed = true;
      } finally {
        this.launching = false;
      }
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Try it yourself" }}</span>
        <span class="progress-label">Opens in a new tab · no account needed to edit or run it</span>
      </div>
      <pre><code>{{ previewFile.code }}</code></pre>
      <button class="btn btn--primary" @click="launch" :disabled="launching">
        {{ launching ? "Opening…" : "Launch live sandbox ↗" }}
      </button>
      <p v-if="failed" class="api-tester__error" style="margin-top:0.8rem;">
        The sandbox launcher couldn't load (this can happen without an internet connection).
        You can still follow along using GitHub Codespaces or a local install of VS Code instead.
      </p>
    </div>
  `
};

