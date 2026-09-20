# An application to 37signals, by way of Omarchy

A single-page, personal application, published on my own domain:
<https://omarchy.technoir.cloud>

**Not affiliated with 37signals or Omarchy.** No logo, no endorsement, no
relationship. 37signals' jobs page is at <https://37signals.com/jobs/>; Omarchy
is at <https://omarchy.org/>.

## What it is

37signals has no openings at the time of writing, and the page says so. The ask
is not a role — it is: *tell me the distance between where I am and someone
you'd hire.* That ask doesn't expire, so the page doesn't either.

The route in is Omarchy: DHH's Arch + Hyprland desktop, incubated at 37signals.
It is the machine I work on, and five of the ten lines of its doctrine already
describe how I work. The page says which five and shows the evidence.

## The look

An equivalence, not a copy: a bar at the top, tiled panes with gaps and rounded
borders, and a monospace face everywhere — because that is what using the thing
looks like. No Omarchy logo, code or assets.

The four palettes are their upstream projects' own — Tokyo Night, Catppuccin
Mocha, Gruvbox and Nord, which Omarchy ships themes for — reproduced from those
projects rather than from Omarchy's theme files. The switcher is a nod to
changing theme system-wide, not a port of it.

## Build

There isn't one, on purpose. One hand-written `index.html`, plain CSS, and about
thirty lines of JavaScript that the page works fine without. `check.mjs` guards
the structure and the claims.

Checked and deployed from the repo root: `./scripts/check.sh`, `./scripts/deploy.sh`.
