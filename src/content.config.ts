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
    tools: z.string().optional(),
    order: z.number(),                 // position on the home page (1 = first)
    cover: z.object({ alt: z.string(), hint: z.string() }),
    status: z.enum(['draft', 'ready']).default('draft'),
    // Set to true to keep a case study off the home page while it's unfinished.
    hidden: z.boolean().default(false),
  }),
});

export const collections = { 'case-studies': caseStudies };
