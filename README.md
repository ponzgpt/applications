# applications

When I apply to a company, I send a short site about me written for them: their values, a nod to their aesthetic and culture, my evidence. This repo holds all of them and serves each on its own address.

| Company | Site | Status |
|---|---|---|
| Nous Research | https://nousresearch.technoir.cloud | Active, priority |
| 37signals, by way of Omarchy | https://omarchy.technoir.cloud | Active |

None of these sites is affiliated with or endorsed by the company it addresses.

`37signals.technoir.cloud` is the application's first address and now redirects to `omarchy.technoir.cloud`. Each site lives in `sites/<company>/` with its own README, history (merged from `ponzgpt/nousresearch-application` and `ponzgpt/37signals-application`), nginx config, Dockerfile and hosts — and deploys as its own service, so working on one cannot ship another. Adding a company, checking and deploying: see [AGENTS.md](AGENTS.md) and [DEPLOYMENT.md](DEPLOYMENT.md).
