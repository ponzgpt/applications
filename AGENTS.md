# applications
Javier's tailored job-application sites: one folder per company under `sites/`, each styled after that company's values and aesthetic, each deployed as its own service on its own host. Live: https://nousresearch.technoir.cloud (priority), https://omarchy.technoir.cloud

## Commands
- Check (before every commit): `./scripts/check.sh [site]` — no argument checks every site
- Deploy one site: `./scripts/deploy.sh <site>`
- Nous pages: edit `sites/nousresearch/content.mjs`, then `cd sites/nousresearch && node build.mjs` and commit the built HTML; cover letter PDF: `node build-cover-letter.mjs`
- Omarchy page: edit `sites/omarchy/index.html` by hand. No build step, on purpose — DHH's own argument, and the page says so.

## One site, one service
Each site owns everything that is only about it: `nginx.conf`, `Dockerfile`, `hosts` (first host canonical, the rest redirect to it), `check.mjs`, and `built` if it has a `build.mjs`. `scripts/` and `snippets/` are the only shared files. A deploy ships that one site, so two people — or two sessions — can work in this repo at once without shipping each other's half-finished page.

**Never touch another site's folder, and never put a hostname in two sites' `hosts`.** If a change seems to need both, it belongs in `scripts/` or `snippets/`, and it is the one kind of change to make on its own, with nothing else in flight.

## Adding a company
`mkdir sites/<company>`, give it those files, commit, then `./scripts/deploy.sh <company>`. Nothing else in the repo changes.

## Non-negotiables
1. Never claim affiliation: no company logos, endorsements, code, words or assets; every site states it is unaffiliated.
2. Every claim about Javier must be in the claims ledger (private `ponzgpt/javier-ponz-site-internal`); never claim senior engineering experience, enterprise clients or official contributions without evidence.
3. Say which repos Javier wrote and which he specified for an agent to write.
4. Nous copy lives in `sites/nousresearch/content.mjs` for EN/ES/ZH; change all three together.
5. The Omarchy page addresses 37signals, not Omarchy: use of the OS is a claim about Javier, contributions to it are not. Keep them apart.
