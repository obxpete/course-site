// Run from the course-site root: node scripts/build-search-index.js
// Re-run whenever lessons are added or significantly updated.
const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('content/lessons/manifest.json', 'utf8'));

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')               // fenced code blocks
    .replace(/<[^>]+>/g, '')                        // HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, '')               // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')       // links → text
    .replace(/#{1,6} /g, '')                        // headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')             // bold
    .replace(/\*([^*]+)\*/g, '$1')                  // italic
    .replace(/`[^`]+`/g, '')                        // inline code
    .replace(/^\|.+$/gm, '')                        // table rows
    .replace(/^[-*+] /gm, '')                       // unordered list markers
    .replace(/^\d+\. /gm, '')                       // ordered list markers
    .replace(/^> /gm, '')                           // blockquotes
    .replace(/\n{3,}/g, '\n\n')                    // excess blank lines
    .trim();
}

const index = manifest.lessons.map(lesson => {
  const filePath = path.join('content/lessons', lesson.file);
  const raw = fs.readFileSync(filePath, 'utf8');
  return {
    id: lesson.id,
    title: lesson.title,
    summary: lesson.summary,
    text: stripMarkdown(raw)
  };
});

fs.writeFileSync('search-index.json', JSON.stringify(index));
console.log(`Search index built: ${index.length} lessons, ${Buffer.byteLength(JSON.stringify(index))} bytes`);
