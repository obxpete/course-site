/**
 * <api-tester-widget :config="..." />
 * config: { label, presets: [{label, method, url}], defaultMethod, defaultUrl }
 *
 * A minimal Postman-style request tool built on the browser's own fetch().
 * Only works against APIs that allow cross-origin requests (like the public
 * JSONPlaceholder API used by default) — that's a real, useful lesson about
 * CORS in itself.
 */
window.CourseComponents = window.CourseComponents || {};

window.CourseComponents.ApiTesterWidget = {
  props: ["config"],
  data() {
    return {
      method: this.config.defaultMethod || "GET",
      url: this.config.defaultUrl || "",
      loading: false,
      status: null,
      statusText: "",
      body: "",
      errorMsg: ""
    };
  },
  methods: {
    applyPreset(p) {
      this.method = p.method;
      this.url = p.url;
    },
    async send() {
      this.loading = true;
      this.status = null;
      this.body = "";
      this.errorMsg = "";
      try {
        const res = await fetch(this.url, { method: this.method });
        this.status = res.status;
        this.statusText = res.statusText;
        const text = await res.text();
        try {
          this.body = JSON.stringify(JSON.parse(text), null, 2);
        } catch {
          this.body = text;
        }
      } catch (err) {
        this.errorMsg = "Request failed — this can happen if the API doesn't allow cross-origin requests (CORS), or if you're offline.";
      } finally {
        this.loading = false;
      }
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Try it yourself" }}</span>
      </div>
      <div class="api-tester">
        <div class="api-tester__presets" v-if="config.presets && config.presets.length">
          <button type="button" class="btn btn--ghost btn--sm" v-for="p in config.presets" :key="p.url" @click="applyPreset(p)">{{ p.label }}</button>
        </div>
        <div class="api-tester__bar">
          <select v-model="method">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input type="text" v-model="url" placeholder="https://api.example.com/resource">
          <button type="button" class="btn btn--primary btn--sm" @click="send" :disabled="loading || !url">
            {{ loading ? "Sending…" : "Send" }}
          </button>
        </div>
        <p v-if="errorMsg" class="api-tester__error">{{ errorMsg }}</p>
        <div v-if="status !== null" class="api-tester__response">
          <p class="api-tester__status">Status: <strong>{{ status }} {{ statusText }}</strong></p>
          <pre><code>{{ body }}</code></pre>
        </div>
      </div>
    </div>
  `
};
