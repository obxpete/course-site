window.CourseComponents = window.CourseComponents || {};

// Splits a comma-separated list, ignoring commas that fall inside 'single'
// or "double" quotes, e.g. INSERT ... VALUES (1, 'Smith, Jr.', true).
function splitTopLevelCommas(s) {
  const parts = [];
  let cur = "", inSingle = false, inDouble = false;
  for (const ch of s) {
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    if (ch === "," && !inSingle && !inDouble) {
      parts.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  parts.push(cur);
  return parts.map((p) => p.trim());
}

function parseValue(raw) {
  const t = raw.trim();
  if (/^'([^']*)'$/.test(t)) return t.slice(1, -1);
  if (/^"([^"]*)"$/.test(t)) return t.slice(1, -1);
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
  if (/^true$/i.test(t)) return true;
  if (/^false$/i.test(t)) return false;
  if (/^null$/i.test(t)) return null;
  return t;
}

// Only single-condition WHERE clauses are supported (matches every example
// this lesson actually teaches) — no AND/OR.
function parseWhere(clause) {
  const m = /^(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)$/.exec(clause.trim());
  if (!m) return null;
  let [, col, op] = m;
  const rawVal = m[3];
  if (op === "<>") op = "!=";
  return { col, op, value: parseValue(rawVal) };
}

function matchesWhere(row, where) {
  if (!where) return true;
  const a = row[where.col];
  const b = where.value;
  switch (where.op) {
    case "=": return a == b; // eslint-disable-line eqeqeq
    case "!=": return a != b; // eslint-disable-line eqeqeq
    case ">": return a > b;
    case "<": return a < b;
    case ">=": return a >= b;
    case "<=": return a <= b;
    default: return false;
  }
}

window.CourseComponents.SqlToolWidget = {
  props: ["config"],
  data() {
    return {
      command: "",
      commandHistory: [],
      historyIndex: -1,
      lines: [],
      columns: this.config.columns || [],
      rows: [],
      nextId: 1
    };
  },
  created() {
    this.seedRows();
    this.printWelcome();
  },
  methods: {
    seedRows() {
      this.rows = (this.config.startingRows || []).map((r) => ({ ...r }));
      const pk = this.config.primaryKey || "id";
      const maxId = this.rows.reduce((m, r) => Math.max(m, Number(r[pk]) || 0), 0);
      this.nextId = maxId + 1;
    },
    printWelcome() {
      this.lines = [];
      this.print(this.config.prompt || `Type real SQL against the ${this.config.table} table below.`);
    },
    print(content, type = "output") {
      const parts = typeof content === "string" ? [{ text: content }] : content;
      this.lines.push({ type, parts });
    },
    printTable(cols, rows) {
      if (!rows.length) {
        this.print("(0 rows)");
        return;
      }
      this.lines.push({
        type: "table",
        columns: cols,
        rows: rows.map((r) => cols.map((c) => this.formatCell(r[c])))
      });
      this.print(`(${rows.length} row${rows.length > 1 ? "s" : ""})`);
    },
    formatCell(v) {
      if (v === null || v === undefined) return "NULL";
      if (typeof v === "boolean") return v ? "true" : "false";
      return String(v);
    },
    reset() {
      this.command = "";
      this.commandHistory = [];
      this.historyIndex = -1;
      this.seedRows();
      this.printWelcome();
    },
    submit() {
      const input = this.command;
      if (!input.trim()) return;
      this.print(input, "command");
      this.commandHistory.push(input);
      this.historyIndex = this.commandHistory.length;
      this.command = "";
      this.execute(input);
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
    checkTable(name) {
      if (name.toLowerCase() !== this.config.table.toLowerCase()) {
        this.print(`SQL error: no such table '${name}'`, "error");
        return false;
      }
      return true;
    },
    checkColumns(cols) {
      for (const c of cols) {
        if (!this.columns.includes(c)) {
          this.print(`SQL error: no such column '${c}'`, "error");
          return false;
        }
      }
      return true;
    },
    execute(sqlRaw) {
      if (sqlRaw.trim() === "clear") return void (this.lines = []);
      if (sqlRaw.trim() === "help") return this.cmdHelp();
      const sql = sqlRaw.trim().replace(/;\s*$/, "");
      const lower = sql.toLowerCase();
      if (lower.startsWith("select")) return this.execSelect(sql);
      if (lower.startsWith("insert")) return this.execInsert(sql);
      if (lower.startsWith("update")) return this.execUpdate(sql);
      if (lower.startsWith("delete")) return this.execDelete(sql);
      this.print("SQL error: unrecognized statement. Supported: SELECT, INSERT, UPDATE, DELETE.", "error");
    },
    cmdHelp() {
      this.print([
        { text: "Supported:" },
        { text: `  SELECT <cols|*> FROM ${this.config.table} [WHERE col = value] [ORDER BY col [ASC|DESC]] [LIMIT n]` },
        { text: `  INSERT INTO ${this.config.table} (col, ...) VALUES (value, ...)` },
        { text: `  UPDATE ${this.config.table} SET col = value [, col = value ...] [WHERE col = value]` },
        { text: `  DELETE FROM ${this.config.table} [WHERE col = value]` },
        { text: "  clear, help" }
      ]);
    },
    execSelect(sql) {
      const m = /^select\s+(.+?)\s+from\s+(\w+)([\s\S]*)$/i.exec(sql);
      if (!m) return this.print("SQL error: expected SELECT <columns> FROM <table>", "error");
      const [, colsRaw, table, rest] = m;
      if (!this.checkTable(table)) return;

      const whereM = /where\s+([\s\S]+?)(?:\s+order\s+by\s+|\s+limit\s+|$)/i.exec(rest);
      const orderM = /order\s+by\s+(\w+)(?:\s+(asc|desc))?/i.exec(rest);
      const limitM = /limit\s+(\d+)/i.exec(rest);

      const cols = colsRaw.trim() === "*" ? this.columns : colsRaw.split(",").map((c) => c.trim());
      if (!this.checkColumns(cols)) return;

      const where = whereM ? parseWhere(whereM[1]) : null;
      if (whereM && !where) return this.print(`SQL error: could not parse WHERE clause '${whereM[1]}'`, "error");
      if (where && !this.checkColumns([where.col])) return;

      let result = this.rows.filter((r) => matchesWhere(r, where));

      if (orderM) {
        const orderCol = orderM[1];
        if (!this.checkColumns([orderCol])) return;
        const dir = (orderM[2] || "asc").toLowerCase();
        result = [...result].sort((a, b) => {
          const av = a[orderCol], bv = b[orderCol];
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;
          return dir === "desc" ? -cmp : cmp;
        });
      }
      if (limitM) result = result.slice(0, parseInt(limitM[1], 10));

      this.printTable(cols, result);
    },
    execInsert(sql) {
      const m = /^insert\s+into\s+(\w+)\s*\(([^)]+)\)\s*values\s*\(([^)]+)\)\s*$/i.exec(sql);
      if (!m) return this.print("SQL error: expected INSERT INTO <table> (col, ...) VALUES (value, ...)", "error");
      const [, table, colsRaw, valsRaw] = m;
      if (!this.checkTable(table)) return;

      const cols = colsRaw.split(",").map((c) => c.trim());
      const vals = splitTopLevelCommas(valsRaw).map(parseValue);
      if (cols.length !== vals.length) {
        return this.print("SQL error: column count doesn't match value count", "error");
      }
      if (!this.checkColumns(cols)) return;

      const pk = this.config.primaryKey || "id";
      const row = {};
      this.columns.forEach((c) => { row[c] = null; });
      cols.forEach((c, i) => { row[c] = vals[i]; });
      if (row[pk] === null) row[pk] = this.nextId;
      this.nextId = Math.max(this.nextId, Number(row[pk]) + 1);
      this.rows.push(row);
      this.print("INSERT 0 1");
    },
    execUpdate(sql) {
      const m = /^update\s+(\w+)\s+set\s+([\s\S]+?)(?:\s+where\s+([\s\S]+))?$/i.exec(sql);
      if (!m) return this.print("SQL error: expected UPDATE <table> SET col = value [WHERE ...]", "error");
      const [, table, setRaw, whereRaw] = m;
      if (!this.checkTable(table)) return;

      const assignments = splitTopLevelCommas(setRaw).map((pair) => {
        const eq = pair.indexOf("=");
        return { col: pair.slice(0, eq).trim(), value: parseValue(pair.slice(eq + 1)) };
      });
      if (!this.checkColumns(assignments.map((a) => a.col))) return;

      const where = whereRaw ? parseWhere(whereRaw) : null;
      if (whereRaw && !where) return this.print(`SQL error: could not parse WHERE clause '${whereRaw}'`, "error");
      if (where && !this.checkColumns([where.col])) return;

      let count = 0;
      this.rows.forEach((r) => {
        if (matchesWhere(r, where)) {
          assignments.forEach((a) => { r[a.col] = a.value; });
          count += 1;
        }
      });
      this.print(`UPDATE ${count}`);
    },
    execDelete(sql) {
      const m = /^delete\s+from\s+(\w+)(?:\s+where\s+([\s\S]+))?$/i.exec(sql);
      if (!m) return this.print("SQL error: expected DELETE FROM <table> [WHERE ...]", "error");
      const [, table, whereRaw] = m;
      if (!this.checkTable(table)) return;

      const where = whereRaw ? parseWhere(whereRaw) : null;
      if (whereRaw && !where) return this.print(`SQL error: could not parse WHERE clause '${whereRaw}'`, "error");
      if (where && !this.checkColumns([where.col])) return;

      const before = this.rows.length;
      this.rows = this.rows.filter((r) => !matchesWhere(r, where));
      this.print(`DELETE ${before - this.rows.length}`);
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "SQL practice" }}</span>
        <button class="btn btn--ghost btn--sm" @click="reset" type="button">Reset</button>
      </div>
      <div class="term" @click="$refs.input && $refs.input.focus()">
        <div class="term__output" ref="output">
          <template v-for="(line, i) in lines" :key="i">
            <div v-if="line.type === 'command'" class="term__line term__line--command">
              <span class="term__prompt">›</span>{{ line.parts[0].text }}
            </div>
            <table v-else-if="line.type === 'table'" class="term__table">
              <thead><tr><th v-for="c in line.columns" :key="c">{{ c }}</th></tr></thead>
              <tbody>
                <tr v-for="(row, ri) in line.rows" :key="ri">
                  <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
            <div
              v-else
              v-for="(p, pi) in line.parts"
              :key="i + '-' + pi"
              class="term__line"
              :class="['term__line--' + line.type, p.cls ? 'term__seg--' + p.cls : '']">{{ p.text }}</div>
          </template>
        </div>
        <div class="term__input-row">
          <span class="term__prompt">›</span>
          <input
            ref="input"
            v-model="command"
            type="text"
            class="term__input"
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
