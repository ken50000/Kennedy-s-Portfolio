# Kennedy Campbell — Portfolio

A single-page, hash-routed portfolio site. Pure HTML/CSS/JS — no build step, no dependencies to install.

```
.
├── index.html          # all pages (home, about, work, 4 case studies, contact)
├── css/style.css        # all styles
├── js/script.js         # routing, tabs, ticker, project cards, interactions
└── assets/img/          # all images
```

## Run it locally

No build step needed. Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Upload to GitHub

**Option A — GitHub's website (no command line needed)**
1. Go to [github.com/new](https://github.com/new) and create a new repository (e.g. `portfolio`).
2. On the new repo's page, click **"uploading an existing file."**
3. Drag in the `index.html` file, the `css`, `js`, and `assets` folders, and this `README.md`.
4. Commit the changes.

**Option B — Git command line**
```bash
cd path/to/this/folder
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy for free with GitHub Pages

1. In your repo on GitHub, go to **Settings → Pages**.
2. Under "Build and deployment," set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. GitHub will give you a live URL, typically:
   `https://<your-username>.github.io/<repo-name>/`
   (takes a minute or two to go live after your first push).

## Editing content

- **Text/content:** edit directly in `index.html` — each page is a `<div class="page" id="page-...">` block.
- **Project cards & Topcoder graphic:** near the top of `js/script.js`, in the `projects` array.
- **Colors/fonts:** all in the `:root { ... }` block at the top of `css/style.css`.
- **Images:** swap files in `assets/img/` (keep the same filename, or update the `src`/`assets/img/...` reference in `index.html`).
