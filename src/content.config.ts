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
        payload: z.string(), // e.g. "/locked/reimburseme.json", made by scripts/lock-case.mjs
        kicker: z.string().default('Case study · Under NDA'),
        mark: z.enum(['lock', 'receipt']).default('lock'), // icon on the back of the laptop lid
        accent: z.string().default('#e2332b'),
        accentHot: z.string().default('#ff4b3e'), // small accent text on dark; keep 4.5:1 contrast
        accentInk: z.string().default('#faf8f3'), // text on top of the accent
        accentGrad: z.string().default('linear-gradient(115deg, #ff4b3e 0%, #e2332b 35%, #b5251e 65%, #6b130f 100%)'),
      })
      .optional(),
  }),
});

export const collections = { 'case-studies': caseStudies };
