// Site-wide facts. Edit here and every page updates.
// Anything still unconfirmed is marked TODO. `npm run status` lists them.

// Internal links go through url() so the site works when it's served from a sub-folder
// (GitHub Pages serves it at /<repo-name>/). Locally the base is just "/".
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export const site = {
  name: 'Kennedy Campbell',
  role: 'UX Designer', // Confirmed: her own intro (2026-11-08) calls her a UX designer.
  location: 'Bentonville, Arkansas',
  email: 'campbellkennedy09@gmail.com', // Public on her own résumé (2026-11-09).
  linkedin: 'https://www.linkedin.com/in/kennedypcampbell/',
  experience: '6 years of experience', // Kennedy confirmed 6 years (2026-11-09).
  description:
    'Kennedy Campbell is a UX designer at Walmart Global Tech designing UI for enterprise finance tools.',
};
