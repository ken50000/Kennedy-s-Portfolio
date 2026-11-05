# Session Log

Newest entry on top. Claude Code: read the latest entry at the start of every session, and add one at the end.

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
