# applications
Javier's tailored job-application sites: one folder per company, each styled after that company's values and aesthetic, all served by one nginx at `<company>.technoir.cloud`. Live: https://nousresearch.technoir.cloud (priority), https://omarchy.technoir.cloud

## Commands
- Check (before every commit and deploy): `./scripts/check.sh`
- Nous pages: edit `nousresearch/content.mjs`, then `cd nousresearch && node build.mjs` and commit the built HTML; cover letter PDF: `node build-cover-letter.mjs`
- Omarchy page: edit `omarchy/index.html` by hand. No build step, on purpose — DHH's own argument, and the page says so.
- Deploy (all sites): `./scripts/deploy.sh`

## Adding a company
Create `<company>/` with its site, add a `server` block in `nginx.conf`, its files in `Dockerfile`, its host in `DOMAINS` in `scripts/deploy.sh`, and a line in `scripts/check.sh`.

## Non-negotiables
1. Never claim affiliation: no company logos, endorsements, code, words or assets; every site states it is unaffiliated.
2. Every claim about Javier must be in the claims ledger (private `ponzgpt/javier-ponz-site-internal`); never claim senior engineering experience, enterprise clients or official contributions without evidence.
3. Say which repos Javier wrote and which he specified for an agent to write.
4. Nous copy lives in `nousresearch/content.mjs` for EN/ES/ZH; change all three together.
5. The Omarchy page addresses 37signals, not Omarchy: use of the OS is a claim about Javier, contributions to it are not. Keep them apart.
