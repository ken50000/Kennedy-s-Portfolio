Help Kennedy put the site online. Free hosting on GitHub Pages.

Only continue if /check passes (or Kennedy says she just wants a preview).

**First time (her own GitHub repo):**
1. Ask for her GitHub username. If she doesn't have an account, walk her through making one at github.com.
2. Make sure the GitHub CLI is installed and she's logged in (`gh auth login`; she types it herself with
   `! gh auth login` so the login happens in her browser).
3. `git init`, commit everything, and create the repo with `gh repo create <name> --public --source . --push`.
4. Turn on Pages with GitHub Actions as the source:
   `gh api -X POST repos/<user>/<name>/pages -f build_type=workflow`
5. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Watch it with
   `gh run watch`, then give her the URL: `https://<user>.github.io/<name>/`.

**After that:** commit and push to `main`, and the site rebuilds automatically in a minute or two.

**Custom domain (optional, ~$10–15/yr):** add it in the repo's Settings → Pages, then change `SITE` and
`BASE_PATH` in the workflow (`BASE_PATH: /` for a custom domain).
