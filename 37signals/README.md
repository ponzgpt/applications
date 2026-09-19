# An application to 37signals

A single-page, personal application, published on my own domain.

**Not affiliated with 37signals.** No logo, no endorsement, no claim of any
relationship. Their jobs page is at <https://37signals.com/jobs/>.

The format — flat red ground, white type, a numbered list of short
declaratives — is a deliberate nod to 37signals' own manifesto page, as a way
of showing I read it. All words and content are mine.

Static HTML, no build step. Deploys as nginx behind Traefik, same pattern as
the rest of my sites.

```bash
docker build -t thirtyseven-application . && docker run --rm -p 8080:80 thirtyseven-application
```
