window.CourseComponents = window.CourseComponents || {};

window.CourseComponents.GitSimulatorWidget = {
  props: ["config"],
  data() {
    return {
      message: "",
      commits: (this.config.startingCommits || []).map(c => ({
        hash: c.hash || this.randomHash(),
        message: c.message
      }))
    };
  },
  methods: {
    randomHash() {
      return Math.random().toString(16).slice(2, 9);
    },
    commit() {
      const msg = this.message.trim();
      if (!msg) return;
      this.commits.unshift({ hash: this.randomHash(), message: msg });
      this.message = "";
    },
    reset() {
      this.commits = (this.config.startingCommits || []).map(c => ({
        hash: c.hash || this.randomHash(),
        message: c.message
      }));
      this.message = "";
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Git commit simulator" }}</span>
        <button class="btn btn--ghost btn--sm" @click="reset" type="button">Reset</button>
      </div>
      <p v-if="config.prompt" class="widget__prompt">{{ config.prompt }}</p>
      <div class="git-log">
        <div v-for="(c, i) in commits" :key="i" class="git-commit">
          <div class="git-commit__track">
            <div class="git-commit__node"></div>
            <div class="git-commit__line" v-if="i < commits.length - 1"></div>
          </div>
          <div class="git-commit__body">
            <span class="git-commit__hash">{{ c.hash }}</span>
            <span class="git-commit__msg">{{ c.message }}</span>
          </div>
        </div>
      </div>
      <div class="git-input">
        <input
          v-model="message"
          type="text"
          placeholder="Write a commit message…"
          class="git-input__field"
          @keyup.enter="commit"
          spellcheck="false"
          maxlength="72"
        />
        <button
          class="btn btn--primary btn--sm"
          @click="commit"
          type="button"
          :disabled="!message.trim()">
          Commit
        </button>
      </div>
    </div>
  `
};
