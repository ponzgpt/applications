# An open application to Nous Research

A single-page, personal application, published on my own domain at
[nousresearch.technoir.cloud](https://nousresearch.technoir.cloud/).

**Not affiliated with Nous Research.** No logo, no endorsement, no claim of
any relationship. Their careers page is at <https://nousresearch.com/careers>.

The visual language borrows rhythm and restraint from Nous's careers page —
large editorial type, thin rules, monochrome — without copying its code, words
or assets. All words and content are mine.

The page runs person → work → proof → fit → gap → logistics, and it is explicit
about which repositories I wrote and which I specified and had an agent write.
Getting that distinction wrong would be the only thing on here worth catching.

`content.mjs` holds the copy in EN/ES/ZH; `build.mjs` renders the three static
pages; `check.mjs` fails on missing sections or obsolete claims. Deploys as nginx
behind Traefik, same pattern as the rest of my sites.

Checked and deployed from the repo root: `./scripts/check.sh`, `./scripts/deploy.sh`.
