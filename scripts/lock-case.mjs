// Locks a cinematic case study: scrambles the written case study, its images, and its video with a passcode,
// so they can live in this public repo safely. The page template (public/cine/) unscrambles them in the
// visitor's browser only after they enter the passcode.
//
// Usage:
//   LOCK_PASSCODE='the-passcode' node scripts/lock-case.mjs <source-folder> <name>
//
// <source-folder> holds the PRIVATE originals. Keep it OUT of this repo (the repo is public):
//   case.html     the case study body (see docs/CINEMATIC.md for the building blocks)
//   img/…         images used in case.html as src="img/<file>"
//   media.mp4     the hero video, or media.html for an HTML film
// Writes public/locked/<name>.json and public/locked/<name>.media
//
// Shorthand in case.html:  <todo label="Kennedy: …">question</todo>  becomes a yellow placeholder note.
// Encryption: AES-256-GCM, key from the passcode with PBKDF2-SHA256 (600,000 rounds, random salt).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { webcrypto as crypto } from 'node:crypto';

const [src, name] = process.argv.slice(2);
const passcode = process.env.LOCK_PASSCODE;
if (!src || !name || !passcode) {
  console.error("Usage: LOCK_PASSCODE='…' node scripts/lock-case.mjs <source-folder> <name>");
  process.exit(1);
}

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
let html = readFileSync(join(src, 'case.html'), 'utf8');

// Inline images so the whole case study is one scrambled file.
html = html.replace(/src="img\/([^"]+)"/g, (_, file) => {
  const type = MIME[extname(file).toLowerCase()];
  if (!type) throw new Error(`Unsupported image type: ${file}`);
  return `src="data:${type};base64,${readFileSync(join(src, 'img', file)).toString('base64')}"`;
});

// <todo label="…">…</todo> → the site's placeholder note.
let todos = 0;
html = html.replace(/<todo label="([^"]*)">([\s\S]*?)<\/todo>/g, (_, label, body) => {
  todos++;
  return `<aside class="todo" aria-label="${label}"><span class="todo-label">${label}</span><div class="todo-body">${body.trim()}</div></aside>`;
});

const ITER = 600_000;
const salt = crypto.getRandomValues(new Uint8Array(16));
const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(passcode), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITER }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt'],
);
const seal = async (bytes) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  return { iv, ct: new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes)) };
};
const b64 = (u) => Buffer.from(u).toString('base64');

const out = 'public/locked';
mkdirSync(out, { recursive: true });
const body = await seal(new TextEncoder().encode(JSON.stringify({ html })));
const meta = { v: 2, iter: ITER, salt: b64(salt), iv: b64(body.iv), ct: b64(body.ct) };

const mediaSrc = ['media.mp4', 'media.webm', 'media.html'].map((f) => join(src, f)).find(existsSync);
if (mediaSrc) {
  const type = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.html': 'text/html' }[extname(mediaSrc)];
  const media = await seal(readFileSync(mediaSrc));
  writeFileSync(join(out, `${name}.media`), media.ct);
  meta.media = { file: `${name}.media`, iv: b64(media.iv), type };
}
writeFileSync(join(out, `${name}.json`), JSON.stringify(meta));

const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`Locked ${name}: case study ${kb(meta.ct.length)}${mediaSrc ? `, media ${kb(readFileSync(join(out, `${name}.media`)).length)}` : ''}, ${todos} placeholder note(s).`);
