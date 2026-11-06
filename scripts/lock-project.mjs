// Scrambles (encrypts) a file with a passcode so it can sit in this public repo safely.
// Only someone with the passcode can view it on the site, through the <Locked> component.
//
// Usage:
//   LOCK_PASSCODE='your-passcode' node scripts/lock-project.mjs path/to/original.html public/locked/<name>.json
//
// Keep the original file OUT of this repo (the repo is public). Never write the passcode in any file here.
// Encryption: AES-256-GCM, key from the passcode with PBKDF2-SHA256 (600,000 rounds, random salt).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { webcrypto as crypto } from 'node:crypto';

const [input, output] = process.argv.slice(2);
const passcode = process.env.LOCK_PASSCODE;
if (!input || !output || !passcode) {
  console.error("Usage: LOCK_PASSCODE='…' node scripts/lock-project.mjs <input> <output.json>");
  process.exit(1);
}

const ITER = 600_000;
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(passcode), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITER },
  base,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt'],
);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, readFileSync(input)));
const b64 = (u) => Buffer.from(u).toString('base64');

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify({ v: 1, iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) }));
console.log(`Locked ${input} → ${output}`);
