/**
 * <node-sandbox-widget :config="..." />
 * config: { label, title, description, files, openFile }
 *
 * Embeds a real, running Node.js environment (StackBlitz's WebContainers)
 * via their JavaScript SDK, built fresh from the files in config — no
 * pre-existing GitHub repo or StackBlitz account needed to open, edit, or
 * run it. An account is only needed if a student wants to save their own
 * copy, which is entirely optional.
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
    script.onerror = () => reject(new Error("Could not load the sandbox right now."));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

window.CourseComponents.NodeSandboxWidget = {
  props: ["config"],
  data() {
    return { failed: false, elId: "sb-" + Math.random().toString(36).slice(2) };
  },
  async mounted() {
    try {
      const sdk = await loadStackBlitzSdk();
      await sdk.embedProject(
        this.elId,
        {
          title: this.config.title || "CIS 365 Sandbox",
          description: this.config.description || "",
          template: "node",
          files: this.config.files
        },
        {
          openFile: this.config.openFile,
          height: 480,
          hideNavigation: false,
          clickToLoad: true, // student clicks to boot it — keeps the page light until they're ready
          forceEmbedLayout: true
        }
      );
    } catch (e) {
      this.failed = true;
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Try it yourself" }}</span>
        <span class="progress-label">No account needed to run it</span>
      </div>
      <p v-if="failed" class="api-tester__error">
        The embedded sandbox couldn't load (this can happen without an internet connection).
        You can still follow along using GitHub Codespaces or a local install of VS Code instead.
      </p>
      <div v-else :id="elId" class="node-sandbox"></div>
    </div>
  `
};
