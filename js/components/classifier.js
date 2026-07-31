/**
 * <classifier-widget :config="..." />
 * config: { label, prompt, categories: string[], items: [{ snippet|task|term, answer, explanation }] }
 *
 * General-purpose classification widget: given a list of items, the student
 * clicks one of N category buttons to classify each one. Used for MVC sorting
 * (lesson 02), career role matching (lesson 06), and stack-layer mapping (lesson 10).
 */
window.CourseComponents = window.CourseComponents || {};

window.CourseComponents.ClassifierWidget = {
  props: ["config"],
  data() {
    return {
      answers: {}
    };
  },
  computed: {
    categories() {
      return this.config.categories || ["A", "B", "C"];
    },
    answeredCount() {
      return Object.keys(this.answers).length;
    },
    correctCount() {
      return Object.keys(this.answers).filter(
        i => this.answers[i] === this.config.items[parseInt(i)].answer
      ).length;
    }
  },
  methods: {
    classify(i, cat) {
      if (this.answers[String(i)] !== undefined) return;
      this.answers = { ...this.answers, [String(i)]: cat };
    },
    isAnswered(i) {
      return this.answers[String(i)] !== undefined;
    },
    isCorrect(i) {
      return this.answers[String(i)] === this.config.items[i].answer;
    },
    label(item) {
      return item.snippet || item.task || item.term || "";
    },
    isCode(item) {
      return Boolean(item.snippet || item.term);
    },
    reset() {
      this.answers = {};
    }
  },
  template: `
    <div class="widget">
      <div class="widget__head">
        <span class="widget__label">{{ config.label || "Classify each item" }}</span>
        <div class="widget__actions">
          <span v-if="answeredCount > 0" class="progress-label">{{ correctCount }}/{{ answeredCount }} correct</span>
          <button class="btn btn--ghost btn--sm" @click="reset" type="button">Reset</button>
        </div>
      </div>
      <p v-if="config.prompt" class="widget__prompt">{{ config.prompt }}</p>
      <div class="classifier-list">
        <div
          v-for="(item, i) in config.items"
          :key="i"
          class="classifier-item"
          :class="{ 'is-answered': isAnswered(i), 'is-correct': isAnswered(i) && isCorrect(i), 'is-wrong': isAnswered(i) && !isCorrect(i) }">
          <div class="classifier-item__text">
            <code v-if="isCode(item)">{{ label(item) }}</code>
            <span v-else>{{ label(item) }}</span>
          </div>
          <div v-if="!isAnswered(i)" class="classifier-cats">
            <button
              v-for="cat in categories"
              :key="cat"
              class="btn btn--ghost btn--sm"
              @click="classify(i, cat)"
              type="button">{{ cat }}</button>
          </div>
          <div v-else class="classifier-reveal">
            <span class="classifier-tag" :class="isCorrect(i) ? 'tag-correct' : 'tag-wrong'">
              {{ isCorrect(i) ? '✓' : '✗' }} {{ item.answer }}
            </span>
            <p class="classifier-explanation">{{ item.explanation }}</p>
          </div>
        </div>
      </div>
    </div>
  `
};
