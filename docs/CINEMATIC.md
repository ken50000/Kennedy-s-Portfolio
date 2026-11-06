# Cinematic case studies

A reusable, passcode-protected case study experience:

**Passcode → laptop flip → autoplay video → scrollable case study → design details → impact.**

ReimburseMe and Data Platform Concept use it. Any new project can too, without rebuilding the interaction.

## Two modes

- **Locked** (NDA work: ReimburseMe, Data Platform Concept, Walmart Intake Form Redesign): `payload:` set. Passcode
  first; everything after it is scrambled (below).
- **Open** (Texstyle): `video:` set, no payload. No passcode. The device waits on its back and flips when the stage
  scrolls into view; the video plays muted. The case study is the MDX body itself (plain HTML building blocks
  below, plus `<Todo>` and `<ImageSlot>`), so it stays editable and shows in `npm run status`. Video lives in
  `public/media/`.
- `device: phone` uses a phone frame (mobile projects); `ratio:` sets the screen shape to match the video.
- `<div class="cine-phones cine-full">` with `<figure>`s makes a row of phone screenshots.

## How it works (plain words)

- The public page shows only the title, a one-line summary, role, and timeline, plus the passcode box.
- The written case study, its screenshots, and the video are **scrambled** (encrypted) in `public/locked/`.
  They unscramble in the visitor's browser only after the right passcode. The repo is public, so this is what
  keeps NDA work safe.
- The **originals** (case study text, screenshots, video) are **never** committed. Kennedy keeps them in her
  `locked-case-sources` folder. To change a locked case study, you need that folder.
- The passcode is never written in this repo. Kennedy has it.

## Pieces

| What | Where |
|------|-------|
| Page template (lock card, laptop, story shell) | `src/components/CinematicCase.astro` |
| Animation, unlock, and scroll behavior | `public/cine/cinematic.js` |
| Look and layout | `public/cine/cinematic.css` |
| Turned on per project | `cinematic:` in the case study's frontmatter (`src/content.config.ts`) |
| Locking script | `scripts/lock-case.mjs` |
| Scrambled output | `public/locked/<name>.json` + `public/locked/<name>.media` |

## Add a new cinematic project

1. Make a private source folder **outside** this repo, for example `locked-case-sources/<name>/`:
   - `case.html`: the case study body (building blocks below). Copy an existing one to start.
   - `img/`: screenshots, used in `case.html` as `src="img/<file>.jpg"` (about 1600px wide, JPEG).
   - `media.mp4` (a video) or `media.html` (an HTML film). Compress video first:
     `ffmpeg -i in.mp4 -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k media.mp4`
2. Lock it: `LOCK_PASSCODE='…' node scripts/lock-case.mjs <source-folder> <name>`
3. In `src/content/case-studies/<name>.mdx`, add:
   ```yaml
   cinematic:
     payload: /locked/<name>.json
     kicker: Case study · Under NDA
     mark: lock            # or receipt: the icon on the back of the laptop lid
     accent: "#e2332b"     # optional per-project colors; red is the default
     accentHot: "#ff4b3e"  # small accent text on dark: keep 4.5:1 contrast
     accentInk: "#faf8f3"  # text on top of the accent
     accentGrad: "linear-gradient(…)"
   ```
   Keep this file free of confidential details. It's public.
4. Use the **same passcode** as the other projects unless Kennedy says otherwise.

## Building blocks for `case.html`

- `<div class="cine-glance">` with four `<div><span class="cine-label">Label</span><p>…</p></div>` cells:
  the 60-second summary for recruiters. Use `<p class="cine-missing">To add: …</p>` for unknowns.
- One `<section class="cine-sec" id="…">` per step, each starting with
  `<header><span class="cine-num">01</span><h2>Title</h2></header><div>…content…</div>`.
  The numbers and the sticky section index are filled in automatically from the headings.
  Standard order: Project overview, The goal, The challenge, My role, Research & discovery, Design strategy,
  The solution, Impact & outcomes.
- `<p class="cine-lede">` big intro line. `<blockquote class="cine-quote">… <cite>source</cite></blockquote>`.
- `<figure class="cine-fig"><img src="img/x.jpg" alt="…"><figcaption><b>Title.</b> Text</figcaption></figure>`:
  click to enlarge. Add `cine-full` and put it directly inside the section (after the content `<div>`) to span
  the full width.
- `<ol class="cine-flow"><li><b>Step</b><span>detail</span></li>…</ol>`: a flow diagram (3 or 6 steps).
- `<div class="cine-cards"><article class="cine-card"><img …><div><h3>…</h3><p>…</p></div></article>…</div>`.
- `<ol class="cine-steps"><li><h3>…</h3><p>…</p><ul class="cine-tags"><li>tag</li></ul></li>…</ol>`: a timeline.
- `<todo label="Kennedy: …">question</todo>`: a yellow placeholder note. The script prints how many are left.

## Rules (from CLAUDE.md)

Never invent facts. Unknowns stay as `<todo>`. Team or program results are labeled as such, never as Kennedy's.
Respect `prefers-reduced-motion` (the template already does: no flip, no scroll animations).
