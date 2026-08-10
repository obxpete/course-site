window.CourseComponents = window.CourseComponents || {};

// Tokenizes a typed command line, respecting 'single' and "double" quotes so
// `git commit -m "Add first lesson notes"` becomes one token for the message.
function tokenizeCommand(input) {
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  const tokens = [];
  let m;
  while ((m = re.exec(input))) {
    tokens.push(m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3]);
  }
  return tokens;
}

window.CourseComponents.GitSimulatorWidget = {
  props: ["config"],
  data() {
    return {
      command: "",
      commandHistory: [],
      historyIndex: -1,
      lines: [],
      initialized: !!this.config.startInitialized,
      files: {}, // name -> 'untracked' | 'staged' | 'committed'
      commits: []
    };
  },
  created() {
    this.seedFiles();
    this.printWelcome();
  },
  methods: {
    randomHash() {
      return Math.random().toString(16).slice(2, 9);
    },
    seedFiles() {
      this.files = {};
      (this.config.startingFiles || []).forEach((name) => {
        this.files[name] = "untracked";
      });
    },
    printWelcome() {
      this.lines = [];
      this.print(this.config.prompt || "Type real git commands below — try `git init` to get started.");
    },
    // content: a string (single line, default color) or an array of
    // {text, cls} line objects for multi-line/colored output, e.g. `git
    // status`'s staged (green) vs untracked (red) file lists.
    print(content, type = "output") {
      const parts = typeof content === "string" ? [{ text: content }] : content;
      this.lines.push({ type, parts });
    },
    reset() {
      this.initialized = !!this.config.startInitialized;
      this.commits = [];
      this.command = "";
      this.commandHistory = [];
      this.historyIndex = -1;
      this.seedFiles();
      this.printWelcome();
    },
    submit() {
      const input = this.command;
      if (!input.trim()) return;
      this.print(input, "command");
      this.commandHistory.push(input);
      this.historyIndex = this.commandHistory.length;
      this.command = "";
      this.run(tokenizeCommand(input));
      this.$nextTick(() => {
        const el = this.$refs.output;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },
    historyUp() {
      if (this.historyIndex > 0) {
        this.historyIndex -= 1;
        this.command = this.commandHistory[this.historyIndex];
      }
    },
    historyDown() {
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex += 1;
        this.command = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.command = "";
      }
    },
    requireRepo() {
      if (!this.initialized) {
        this.print("fatal: not a git repository (or any of the parent directories): .git", "error");
        return false;
      }
      return true;
    },
    run(tokens) {
      if (tokens[0] === "clear") return void (this.lines = []);
      if (tokens[0] === "help") return this.cmdHelp();
      if (tokens[0] === "ls") return this.cmdLs();
      if (tokens[0] === "touch") return this.cmdTouch(tokens[1]);
      if (tokens[0] !== "git") {
        return this.print(`${tokens[0]}: command not found`, "error");
      }
      switch (tokens[1]) {
        case "init": return this.cmdInit();
        case "status": return this.cmdStatus();
        case "add": return this.cmdAdd(tokens.slice(2));
        case "commit": return this.cmdCommit(tokens.slice(2));
        case "log": return this.cmdLog();
        default:
          return this.print(`git: '${tokens[1] || ""}' is not a git command. See 'git --help'.`, "error");
      }
    },
    cmdHelp() {
      this.print([
        "Supported: git init, git status, git add <file|.>, git commit -m \"message\",",
        "git log, touch <file>, ls, clear"
      ].join("\n"));
    },
    cmdLs() {
      const names = Object.keys(this.files);
      this.print(names.length ? names.join("  ") : "");
    },
    cmdTouch(name) {
      if (!name) return this.print("touch: missing file operand", "error");
      if (!this.files[name]) this.files[name] = "untracked";
    },
    cmdInit() {
      if (this.initialized) {
        return this.print("Reinitialized existing Git repository in ~/project/.git/");
      }
      this.initialized = true;
      this.print("Initialized empty Git repository in ~/project/.git/");
    },
    cmdStatus() {
      if (!this.requireRepo()) return;
      const staged = Object.entries(this.files).filter(([, s]) => s === "staged").map(([n]) => n);
      const untracked = Object.entries(this.files).filter(([, s]) => s === "untracked").map(([n]) => n);
      if (!staged.length && !untracked.length) {
        return this.print([{ text: "On branch main" }, { text: "nothing to commit, working tree clean" }]);
      }
      const parts = [{ text: "On branch main" }];
      if (staged.length) {
        parts.push({ text: "Changes to be committed:", cls: "dim" });
        staged.forEach((n) => parts.push({ text: `  new file:   ${n}`, cls: "green" }));
      }
      if (untracked.length) {
        parts.push({ text: "Untracked files:", cls: "dim" });
        untracked.forEach((n) => parts.push({ text: `  ${n}`, cls: "red" }));
        parts.push({ text: '(use "git add <file>..." to include in what will be committed)', cls: "dim" });
      }
      this.print(parts);
    },
    cmdAdd(args) {
      if (!this.requireRepo()) return;
      if (!args.length) return this.print("Nothing specified, nothing added.", "error");
      if (args[0] === ".") {
        Object.keys(this.files).forEach((n) => {
          if (this.files[n] === "untracked") this.files[n] = "staged";
        });
        return;
      }
      args.forEach((name) => {
        if (!this.files[name]) {
          return this.print(`fatal: pathspec '${name}' did not match any files`, "error");
        }
        if (this.files[name] === "untracked") this.files[name] = "staged";
      });
    },
    cmdCommit(args) {
      if (!this.requireRepo()) return;
      const mIndex = args.indexOf("-m");
      const message = mIndex !== -1 ? args[mIndex + 1] : null;
      if (!message) {
        return this.print(
          "This simulator only supports commits with a message: git commit -m \"your message\"",
          "error"
        );
      }
      const staged = Object.entries(this.files).filter(([, s]) => s === "staged").map(([n]) => n);
      if (!staged.length) {
        return this.print("nothing to commit, working tree clean");
      }
      const hash = this.randomHash();
      this.commits.unshift({ hash, message, files: staged });
      staged.forEach((n) => { this.files[n] = "committed"; });
      this.print(`[main ${hash}] ${message}\n ${staged.length} file${staged.length > 1 ? "s" : ""} changed`);
    },
    cmdLog() {
      if (!this.requireRepo()) return;
      if (!this.commits.length) {
        return this.print("fatal: your current branch 'main' does not have any commits yet", "error");
      }
      this.print(this.commits.map((c) => `${c.hash}  ${c.message}`).join("\n"));
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Git terminal" }}</span>
        <button class="btn btn--ghost btn--sm" @click="reset" type="button">Reset</button>
      </div>
      <div class="git-term" @click="$refs.input && $refs.input.focus()">
        <div class="git-term__output" ref="output">
          <template v-for="(line, i) in lines" :key="i">
            <div v-if="line.type === 'command'" class="git-term__line git-term__line--command">
              <span class="git-term__prompt">$</span>{{ line.parts[0].text }}
            </div>
            <div
              v-else
              v-for="(p, pi) in line.parts"
              :key="i + '-' + pi"
              class="git-term__line"
              :class="['git-term__line--' + line.type, p.cls ? 'git-term__seg--' + p.cls : '']">{{ p.text }}</div>
          </template>
        </div>
        <div class="git-term__input-row">
          <span class="git-term__prompt">$</span>
          <input
            ref="input"
            v-model="command"
            type="text"
            class="git-term__input"
            spellcheck="false"
            autocapitalize="off"
            autocomplete="off"
            @keyup.enter="submit"
            @keydown.up.prevent="historyUp"
            @keydown.down.prevent="historyDown"
          />
        </div>
      </div>
    </div>
  `
};
