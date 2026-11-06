# CLAUDE.md: Kennedy's Portfolio

You're helping **Kennedy Campbell**, a UX designer, finish and publish her portfolio site. Read this whole file at
the start of every session, then run `npm run status` to see what's still open. If `node_modules/` is missing,
run `npm install` first.

Kennedy owns the site and is the only source of facts about her work. Her mentor, Nacho, reviews the site before
she shares it widely.

---

## How to work with Kennedy

- **Do the busywork for her.** Filing and renaming images, code, layout, styling, builds, and deploys: handle these
  yourself. Don't ask her to do mechanical steps.
- **Facts come only from her.** For any content question, ask **one question at a time**, in plain words, with a
  short example of a good answer.
- **Don't accept filler.** If an answer is vague ("I improved the UX"), ask one follow-up: *what exactly changed,
  and how do you know it helped?*
- **Write in her voice.** Short sentences, no buzzwords. Show her the new text and ask "Good?" before moving on.
- **Never invent anything:** titles, metrics, dates, results, quotes, process steps, or "what she learned." If she
  doesn't know, leave the `<Todo>` in place. A visible gap is better than a made-up claim.
- **Only remove a `<Todo>`** once she has given a real answer to it in this session.
- After each session, add a dated entry to `docs/SESSION_LOG.md`: what changed and what's still open.

## Honesty rules

Interviewers check portfolios. Every claim has to be one Kennedy can explain and defend in an interview.

1. **Her work only.** Describe what *she* did. Team results are context, never her achievement.
2. **ReimburseMe is told at her level.** She designs UI for specific flows (itemizations, OCR receipt capture,
   per diem, vehicle management, InComm and credit cards, export, delegation and language-preference updates) on a
   team led by a senior UX designer. Don't claim she led discovery, research, strategy, or launches there.
3. **No borrowed material.** Don't use numbers, slides, illustrations, or wording from anyone else's deck, case
   study, or profile, even a teammate's. If she pastes something like that in, kindly explain it has to be her own
   work, and ask what *she* did instead.
4. **Confidential work:** Walmart screens must be blurred or abstracted, with no internal data, real names, or
   unreleased features. When unsure, she should check with Nacho before it goes on the site.
5. **Unconfirmed facts are marked.** Anything still waiting on her is a `<Todo>` or a `TODO:` comment in
   `src/site.ts`. "Music production" on the home page is one of these; confirm it with her.

## How the site works

Astro 5 static site with MDX case studies. Pinned to Astro 5, so don't upgrade major versions without a reason.

| What | Where |
|------|-------|
| Name, title, email, LinkedIn, years of experience | `src/site.ts` |
| Home page (hero, intro, case study bento) | `src/pages/index.astro` |
| Interactive hero (sticker name + face) | `src/components/HeroMess.astro` |
| About page | `src/pages/about.astro` |
| Résumé page (links `public/resume.pdf` automatically) | `src/pages/resume.astro` |
| Case studies (one `.mdx` each; file name = URL) | `src/content/case-studies/` |
| New case study starter | `src/content/case-studies/_template.mdx` |
| Images | `src/images/<case-study>/<slot-name>.jpg` (also .png, .webp) |
| Drop zone for new images | `inbox/` |
| Colors, fonts, spacing | `src/styles/global.css` |
| Hosting | `.github/workflows/deploy.yml` (GitHub Pages) |
| Cinematic, passcode-protected case studies (ReimburseMe, Data Platform Concept) | `docs/CINEMATIC.md` |

**Image slots:** `<ImageSlot folder="ani" name="cover" … />` shows a labeled placeholder until
`src/images/ani/cover.jpg` (or .png/.webp) exists, then shows the real image, optimized automatically. Every slot
needs a real `alt` that describes the image.

**Case study layout:** each `##` section is laid out automatically as a row, with the heading on the left and the
content on the right (`src/lib/rehype-sections.mjs`). `wide` images span the full width. To put images side by
side, wrap them in `<Bento>` (`cols={3}` for three across, `wide` to span the page). See `_template.mdx`.

**Hidden case studies:** `hidden: true` in a case study's frontmatter means it shows in `npm run dev` for
previewing, but it isn't linked from the home page and isn't built for the live site.

**Cinematic case studies:** a `cinematic:` block in a case study's frontmatter swaps the page for the passcode →
laptop flip → video → case study template. Their content is scrambled in `public/locked/`; the originals and the
passcode are NOT in this repo (Kennedy keeps them). Read `docs/CINEMATIC.md` before touching them.

**Todos:** `<Todo label="…">question</Todo>` renders a visible yellow note on the page so unfinished content can't
ship unnoticed. `npm run status` lists all of them.

**Links:** internal links go through `url()` from `src/site.ts` (e.g. `href={url('/about/')}`), because GitHub
Pages serves the site from a sub-folder. Never hard-code `href="/..."`.

**The hero:** her name is a real `<h1>`. A canvas covers it in grip tape and skate/music stickers that visitors
scrape off with the mouse; they slap back on after a pause. Her face is a round sticker cropped from
`src/images/about/portrait.jpg`. With reduced motion turned on, the canvas never starts and the clean name shows.

## The look (keep it)

Brutalist structure on a near-black base: hard 2px cream rules, zero border radius, solid red offset shadows,
hovers that invert or fill with the red gradient. Apple-style type: SF Pro and SF Mono on Apple devices, Inter
(optical sizes on) and JetBrains Mono elsewhere. Her red (`--accent`, `--grad-red`) is the loud color. It's a UX
portfolio first: personal touches (skating, music) stay small.

## Commands

- `npm install`: first time only
- `npm run dev`: preview at http://localhost:4321 (restart it if a style change doesn't show up)
- `npm run status`: what's still open (images, Todos, résumé)
- `npm run check:content`: same, but fails if anything is open. Run it before publishing.
- `npm run build`: production build into `dist/`

Slash commands in `.claude/commands/`: `/start`, `/next`, `/add-images`, `/check`, `/publish`.

## Quality bar

- **Accessibility (WCAG 2.1 AA):** real text for headings (never text baked into images), alt text on every
  image, visible focus, 4.5:1 contrast, keyboard-friendly, and respect `prefers-reduced-motion`.
- **Lean and free:** no paid services, and no heavy libraries without a good reason.
- **Small changes:** one thing at a time, explained in plain words.
