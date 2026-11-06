# Session Log

Newest entry on top. Claude Code: read the latest entry at the start of every session, and add one at the end.

---

## 2026-11-06 (late): New passcode
- Re-locked ReimburseMe and Data Platform Concept with a new passcode Kennedy chose (not written here).
  The old passcode no longer opens them.

---

## 2026-11-06 (evening): New covers
**Changed**
- New art-directed covers for ReimburseMe, Walmart Intake Form Redesign, Texstyle, and Fitness Bingo
  (`src/images/<slug>/cover.jpg`), built from Kennedy's reference images as one set: same frame, labels, crop
  marks, and title placement; each with its own palette and device.
- Walmart covers are abstracted: no logos, no real screens or data. Texstyle uses a redraw of its own logo
  mark. Fitness Bingo keeps its palette and waves but not the third-party illustration from the reference.
- ReimburseMe's accent changed from teal to blue to match its identity (carousel and locked page).

**Open**
- Couldn't open her Figma "Walmart Initiatives" slides (Figma blocks automated access; no Figma connector).
  Nothing on the covers depends on them.

---

## 2026-11-06 (evening): 3D Work carousel
**Changed**
- The Work section is now an immersive 3D carousel (`src/components/WorkCarousel.astro`) instead of the bento
  grid: featured project centered; neighbors recede with perspective, rotation, scale, masked crop, and dimming.
  Background rings turn and the glow and wireframe drift with each move; the accent color shifts per project.
- Navigation: arrows, numbered pagination, drag and swipe, sideways trackpad scrolling (up and down too while the
  carousel has focus), and keyboard arrows, Home, End, and Enter.
- The info panel (title, summary, role, timeline, category, CTA) animates in with a masked title reveal.
- Opening a project expands its card toward the viewer, then the page cross-fades into the case study. Coming
  back via "All work" restores and settles the same project. Reduced motion: flat, no spin, no expand.
- New `category:` field on every case study (short labels drawn from each project's own summary).
- Without JavaScript, it falls back to a horizontal row of links.

**Open**
- Covers still missing (typographic posters for now): Walmart Intake Form Redesign, Texstyle, Fitness Bingo.

---

## 2026-11-06 (later): Cinematic case study template
**Changed**
- New reusable template: passcode → laptop flip → autoplay video → scrollable 8-section case study
  (`src/components/CinematicCase.astro`, `public/cine/`, `scripts/lock-case.mjs`, guide in `docs/CINEMATIC.md`).
  Any case study opts in with a `cinematic:` block in its frontmatter.
- ReimburseMe now uses it, with its own teal look and Kennedy's ReimburseMe video (compressed from 28.7 MB to
  6.4 MB). Its written case study moved into the locked content, restructured into the 8 sections, with
  screenshots from the video.
- Data Platform Concept now uses it, in red, with the concept film and six chapter stills.
- Both locked with the same passcode as before. Removed the old single-film lock (`Locked.astro`,
  `lock-project.mjs`). Added previous/next project links on cinematic pages.

**Open**
- Locked placeholders: ReimburseMe 12, Data Platform 10. They don't show in `npm run status`.
- ReimburseMe video includes program results ($21M+ etc.), roadmap plans, and Walmart branding. It's behind the
  passcode; any written mention of those numbers must say they're program results.
- Confirm Kennedy made the ReimburseMe video herself (no borrowed deck slides).
- Data Platform film still has no soundtrack.

---

## 2026-11-06: Passcode-protected project
**Changed**
- New case study "Data Platform Concept" (`data-platform-concept.mdx`), 8th on the home page. It holds her concept
  film behind a passcode via the new `<Locked>` component. The film is stored scrambled (AES-256, PBKDF2) in
  `public/locked/data-platform-concept.json`. The original file and the passcode are NOT in this repo.
- Fixed the film's centering so it fits any screen size.
- Added `scripts/lock-project.mjs` to lock other files the same way (or re-lock with a new passcode).

**Open**
- Her role on the project, and Nacho's OK to share it by passcode.
- The film's soundtrack (`audio/mix.wav`) wasn't provided, so it plays silently with captions. To add sound,
  embed the audio into the film and re-lock it.
- Keep company and product names off the public page text; only the scrambled film contains them.

---

## 2026-11-05 (evening): Imported Wix case studies
**Changed**
- Three new case studies from her Wix site (campbellkennedy09.wixsite.com/my-site-1): Texstyle, Fitness Bingo,
  and Walmart Intake Form Redesign (her 2024 PM internship). Text is a close rewrite of the Wix pages, because the
  originals could only be read as summaries. Placed after the existing four on the home page.

**Open**
- Images are still on Wix and couldn't be downloaded here. Each slot's hint says which Wix image goes there.
- New Todos on each page: context and her part, wording check, final product, reflection; for Walmart, a
  confidentiality check with Nacho and blurring screens. The Walmart Wix card used a stock photo; don't reuse it.
- Wix tiles with no write-up (Skate Sponsorship, Editorial Work, Jump On, Feed the Cat, Ripple Delete) weren't
  imported. Ask her whether any belong on the site.

---

## 2026-11-05 (later): Sample images
**Changed**
- Moved this site into Kennedy's own repo (ken50000/Kennedy-s-Portfolio), replacing the old portfolio.
- Added tagged sample mockups for all 16 empty image slots in `src/images/_samples/`. Each is marked "SAMPLE
  IMAGE", invented, abstract, and has a "Sample image. Replace with: …" note under it. A real image at
  `src/images/<folder>/<name>.*` replaces its sample automatically. `npm run status` still lists every slot as open.
  Delete `src/images/_samples/` to go back to the yellow placeholders.

---

## 2026-11-05: Moved content over from the old portfolio
**Changed**
- New case study: Workforce Planning Portal (`workforce-planning.mdx`), public, second on the home page. Text from
  the old portfolio, rewritten in plain words. No images yet: the old ones were unblurred Walmart screens.
- Ani: filled the cover, screens, wireframes, color system, and My Feed images, cropped from the old portfolio.
- About: added Experience, Education, and Skills and tools from the old portfolio, at her level. Fixed "studied
  architecture" to Experience Architecture (HCI).
- Home: a 4th case study tile now fills its row.
- Not copied, on purpose: ReimburseMe team metrics ($21M+, 89 ASUS, 824K+), the "I led design" wording, and all
  unblurred Walmart screens (ReimburseMe, Workforce Planning, concept apps).

**Open**
- New Todos: Workforce Planning role, confidentiality check with Nacho, one decision, feedback source, reflection;
  Ani cover illustration credit; About dates.
- Ani images are low-resolution crops of old screenshots. Swap in sharp exports when possible.
- Not yet built or previewed (package installs were blocked in this session). Run `npm install` then `npm run build`.

---

## 2026-10-27: Handed off to Kennedy
**Built**
- Home: interactive hero (her name covered in grip tape and skate/music stickers that visitors scrape off, with her
  face as a round sticker), her title and intro, and a bento grid of case studies.
- Case study pages: bento intro (cover, summary, facts), then two-column sections, with `<Bento>` for side-by-side
  images. Case studies: ReimburseMe, Ani, Topcoder Ideas.
- About and Résumé pages. LinkedIn is linked.
- Hosting: GitHub Pages, deployed automatically on every push to `main`.

**Open (run `npm run status` for the full list)**
- About 25 images: case study covers first, then process and final screens.
- About 25 questions across the case studies, About, and the home intro. Start with ReimburseMe "confirm the
  story" and Ani "your title on Ani".
- Confirm in `src/site.ts`: primary title, public email, years of experience.
- Confirm "music production" (home page, Off the clock).
- Résumé PDF at `public/resume.pdf`.
