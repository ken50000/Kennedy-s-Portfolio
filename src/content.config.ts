import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One .mdx file per case study in src/content/case-studies/.
// Copy src/content/case-studies/_template.mdx to start a new one.
const caseStudies = defineCollection({
  loader: glob({ pattern: '[!_]*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),               // one line: problem → what Kennedy did → result
    role: z.string(),
    timeline: z.string(),
    team: z.string().optional(),
    category: z.string().optional(),   // short label for the Work carousel, e.g. "Mobile · Fitness app"
    tools: z.string().optional(),
    order: z.number(),                 // position on the home page (1 = first)
    cover: z.object({ alt: z.string(), hint: z.string() }),
    status: z.enum(['draft', 'ready']).default('draft'),
    // Set to true to keep a case study off the home page while it's unfinished.
    hidden: z.boolean().default(false),
    // Cinematic layout: passcode → laptop flip → video → case study. See docs/CINEMATIC.md.
    cinematic: z
      .object({
        // Locked (NDA) projects: everything after the passcode is scrambled in this file (scripts/lock-case.mjs).
        payload: z.string().optional(), // e.g. "/locked/reimburseme.json"
        // Open projects (no passcode): a public video in public/media/, and the MDX body is the case study.
        video: z.string().optional(), // e.g. "/media/texstyle.mp4"
        poster: z.string().optional(), // first frame, shown while the video loads
        sound: z.boolean().default(false), // open projects: show a "Turn sound on" button
        device: z.enum(['laptop', 'phone']).default('laptop'), // the frame the video plays in
        ratio: z.string().optional(), // the video's shape, e.g. "1600 / 1020" (default 16 / 9)
        kicker: z.string().default('Case study · Under NDA'),
        mark: z.enum(['lock', 'receipt', 'sun', 'form']).default('lock'), // icon on the back of the device
        accent: z.string().default('#e2332b'),
        accentHot: z.string().default('#ff4b3e'), // small accent text on dark; keep 4.5:1 contrast
        accentInk: z.string().default('#faf8f3'), // text on top of the accent
        accentGrad: z.string().default('linear-gradient(115deg, #ff4b3e 0%, #e2332b 35%, #b5251e 65%, #6b130f 100%)'),
      })
      .refine((c) => c.payload || c.video, { message: 'cinematic needs a payload (locked) or a video (open)' })
      .optional(),
  }),
});

export const collections = { 'case-studies': caseStudies };
