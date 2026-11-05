#!/usr/bin/env node
// `npm run status`: lists everything still open on the site:
//   • images that haven't been added yet (ImageSlot placeholders)
//   • <Todo> notes waiting on Kennedy
//   • TODO comments in src/site.ts
//   • whether public/resume.pdf exists
// `npm run check:content` does the same, but exits with an error if anything is open
// (run it before publishing).

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
const exts = ['webp', 'jpg', 'jpeg', 'png', 'avif'];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const sources = walk(path.join(root, 'src')).filter(
  (f) => /\.(mdx|astro)$/.test(f) && !path.basename(f).startsWith('_') && !f.includes(`${path.sep}components${path.sep}`)
);

const imageExists = (folder, name) =>
  exts.some((x) => fs.existsSync(path.join(root, 'src/images', folder, `${name}.${x}`)));

let openCount = 0;
const report = [];

for (const file of sources) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  const slug = rel.includes('case-studies') ? path.basename(file, '.mdx') : null;
  const items = [];

  // Cover image for case studies (rendered by the page template)
  if (slug) {
    const hint = (text.match(/cover:\s*\n\s*alt:.*\n\s*hint:\s*(.+)/) || [])[1];
    if (!imageExists(slug, 'cover')) items.push(`🖼  Image: src/images/${slug}/cover.*  (${hint || 'cover image'})`);
  }

  // ImageSlots with literal folder/name attributes
  for (const m of text.matchAll(/<ImageSlot([\s\S]*?)\/>/g)) {
    const attrs = m[1];
    const folder = (attrs.match(/folder="([^"]+)"/) || [])[1];
    const name = (attrs.match(/name="([^"]+)"/) || [])[1];
    const hint = (attrs.match(/hint="([^"]+)"/) || [])[1] || '';
    if (folder && name && !imageExists(folder, name)) items.push(`🖼  Image: src/images/${folder}/${name}.*  (${hint})`);
  }

  // Todo notes
  for (const m of text.matchAll(/<Todo(?:\s+label="([^"]*)")?\s*>([\s\S]*?)<\/Todo>/g)) {
    const label = m[1] || 'To do';
    const body = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    items.push(`✏️  ${label}: ${body.length > 140 ? body.slice(0, 137) + '…' : body}`);
  }

  if (items.length) {
    openCount += items.length;
    report.push(`\n${rel}\n` + items.map((i) => `   ${i}`).join('\n'));
  }
}

// site.ts TODOs
const siteFile = path.join(root, 'src/site.ts');
if (fs.existsSync(siteFile)) {
  const todos = fs
    .readFileSync(siteFile, 'utf8')
    .split('\n')
    .filter((l) => l.includes('TODO:'))
    .map((l) => `   ✏️  ${l.split('TODO:')[1]?.trim() || l.trim()}`);
  if (todos.length) {
    openCount += todos.length;
    report.push(`\nsrc/site.ts\n${todos.join('\n')}`);
  }
}

// Résumé PDF
if (!fs.existsSync(path.join(root, 'public/resume.pdf'))) {
  openCount += 1;
  report.push(`\npublic/resume.pdf\n   📄 Résumé PDF not added yet`);
}

// Inbox
const inbox = walk(path.join(root, 'inbox')).filter((f) => !/README\.md$|\.gitkeep$/.test(f));
if (inbox.length) report.push(`\ninbox/\n   📥 ${inbox.length} file(s) waiting. Run /add-images in Claude Code to file them.`);

if (openCount === 0) {
  console.log('✅ Nothing open. Every image is in and every TODO is answered.');
  process.exit(0);
}
console.log(`📋 ${openCount} thing(s) still open:`);
console.log(report.join('\n'));
console.log('');
if (strict) {
  console.error('❌ Not ready to publish. Finish the items above first.');
  process.exit(1);
}
