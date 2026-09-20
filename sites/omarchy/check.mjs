#!/usr/bin/env node
// Guards the one hand-written page: its structure, and the claims it may not make.
//   node check.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

// Claims the ledger says must never be published (site-audit/docs/CLAIMS-LEDGER.csv
// in the private ponzgpt/javier-ponz-site-internal), plus the filler this page
// exists to avoid.
const banned = [
  /senior (software )?engineer/i, /enterprise client/i, /years of experience/i,
  /\bpassionate\b/i, /\bempowering\b/i, /\bseamless\b/i, /cutting-edge/i,
  /revolutionary/i, /at the intersection of/i, /\bsynerg/i, /\brockstar\b/i,
  /contributor to omarchy/i, /contributed to omarchy/i, /\bmy patch\b/i
];
for (const re of banned) assert.ok(!re.test(html), `banned pattern ${re}`);

// The seven panes, in the order the bar links to them.
for (const id of ['person', 'work', 'proof', 'fit', 'gap', 'logistics', 'contact'])
  assert.ok(html.includes(`id="${id}"`), `missing section #${id}`);

// Exactly three pieces of proof; more and nobody reads them.
assert.equal((html.match(/<li>\s*<span class="badge"/g) || []).length, 3, 'expected exactly three proof items');

// The disclaimer is the reason this page is allowed to exist.
assert.ok(/Not affiliated with 37signals or Omarchy/.test(html), 'the not-affiliated statement is missing');

// Every theme the switcher offers must have a palette, and vice versa.
const offered = [...html.matchAll(/data-set="([a-z-]+)"/g)].map((m) => m[1]);
const defined = [...html.matchAll(/:root\[data-theme="([a-z-]+)"\]/g)].map((m) => m[1]);
assert.deepEqual([...offered].sort(), [...defined].sort(), 'theme buttons and palettes disagree');
assert.ok(html.includes(`<html lang="en-GB" data-theme="${defined[0]}">`), 'the default theme must be the first palette');

// No build step: nothing may be pulled in at runtime except the typeface.
const external = [...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
for (const url of external)
  assert.ok(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(url) || !/\.(js|css)(\?|$)/.test(url),
    `unexpected external asset: ${url}`);

console.log('omarchy: check ok');
