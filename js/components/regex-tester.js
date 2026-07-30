/**
 * <regex-tester-widget :config="..." />
 * config: { label, starterPattern, starterFlags, starterText }
 */
window.CourseComponents = window.CourseComponents || {};

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

window.CourseComponents.RegexTesterWidget = {
  props: ["config"],
  data() {
    return {
      pattern: this.config.starterPattern || "",
      flags: this.config.starterFlags || "g",
      text: this.config.starterText || "",
      errorMsg: ""
    };
  },
  computed: {
    highlighted() {
      this.errorMsg = "";
      if (!this.pattern) return escapeHtml(this.text);
      let re;
      try {
        re = new RegExp(this.pattern, this.flags.includes("g") ? this.flags : this.flags + "g");
      } catch (e) {
        this.errorMsg = "Invalid pattern: " + e.message;
        return escapeHtml(this.text);
      }
      let out = "";
      let lastIndex = 0;
      let match;
      let count = 0;
      re.lastIndex = 0;
      while ((match = re.exec(this.text)) !== null) {
        if (match[0] === "") { re.lastIndex++; continue; }
        out += escapeHtml(this.text.slice(lastIndex, match.index));
        out += "<mark>" + escapeHtml(match[0]) + "</mark>";
        lastIndex = match.index + match[0].length;
        count++;
        if (count > 500) break; // guard against pathological patterns
      }
      out += escapeHtml(this.text.slice(lastIndex));
      return out;
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Try it yourself" }}</span>
      </div>
      <div class="regex-tester">
        <div class="regex-tester__bar">
          <span class="regex-tester__slash">/</span>
          <input type="text" v-model="pattern" placeholder="pattern" class="regex-tester__pattern">
          <span class="regex-tester__slash">/</span>
          <input type="text" v-model="flags" placeholder="flags" class="regex-tester__flags">
        </div>
        <p v-if="errorMsg" class="api-tester__error">{{ errorMsg }}</p>
        <textarea v-model="text" spellcheck="false"></textarea>
        <p class="widget__label" style="margin-top:0.8rem;">Matches</p>
        <div class="regex-tester__output" v-html="highlighted"></div>
      </div>
    </div>
  `
};
