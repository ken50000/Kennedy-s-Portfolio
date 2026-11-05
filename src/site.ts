// Site-wide facts. Edit here and every page updates.
// Anything still unconfirmed is marked TODO. `npm run status` lists them.

// Internal links go through url() so the site works when it's served from a sub-folder
// (GitHub Pages serves it at /<repo-name>/). Locally the base is just "/".
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export const site = {
  name: 'Kennedy Campbell',
  role: 'UX Designer', // TODO: confirm primary title (her drafts also say "Visual/Content Designer")
  location: 'Bentonville, Arkansas',
  email: 'campbellkennedy09@gmail.com', // TODO: confirm this is the email she wants public
  linkedin: 'https://www.linkedin.com/in/kennedypcampbell/',
  experience: '4 years of experience', // TODO: confirm. Product design since Feb 2022 (Ani). Old drafts said 5 or 6.
  description:
    'Kennedy Campbell is a UX designer at Walmart Global Tech designing UI for enterprise finance tools.',
};
