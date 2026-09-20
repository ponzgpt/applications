#!/usr/bin/env node
/**
 * Generates javier-ponz-prado-cover-letter.pdf from the text below.
 *
 * The letter lives here rather than on the general portfolio site because it is
 * addressed to one company. The CV is general and stays on the portfolio.
 * Keep it consistent with content.mjs: same facts, shorter.
 *
 * Layout is deliberately plain, single-column and text-only for the same reason
 * as the CV: the first reader is likely to be software, and multi-column
 * layouts scramble text-extraction order.
 *
 *   node build-cover-letter.mjs
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)));
const out = join(root, 'javier-ponz-prado-cover-letter.pdf');

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
];

const paragraphs = [
  `I have spent ten years helping people make difficult technology work. I am now applying that discipline to open agents, tools and systems, and I am building toward forward-deployed engineering at Nous — honestly, from the support side first.`,

  `Between 2014 and 2024 I worked across Apple Retail Spain as a Specialist, a Technical Specialist and, for six and a half years, a Genius, with a remote AppleCare Support Advisor period during COVID and two seven-month In-Store Experience Lead secondments. Most of that decade was hands-on diagnosis: separating symptom from cause, documenting what had been checked, and translating a technical system into a next step the person in front of me could act on.`,

  `<b>What I can show today.</b> I use Hermes Agent daily and build tooling, skills and workflows around it. hermes-contributions (hermes-contributions.technoir.cloud) gathers that work: an onboarding path and the 0th script, a front door that behaves like the CLI, a field guide to model costs, and MCP skills for local Markdown vaults. It was four repositories on four hosts until I found my own field guide quoting model prices at 80% of the real ones for weeks, because the promotion I had snapshotted ended and nothing was watching. Every fact it quotes from Nous now lives in one file and is re-read from the sources Nous publishes on every check, every deploy, every CI run and once a day; when a number moves the build fails and names it. That repository was specified by me and written with an agent under rules I set. Memento Mori is a small privacy-first web product I wrote and deployed myself, and everything I run sits on a VPS I administer, shipped by one script that starts the new Swarm task behind a health check before stopping the old one. My portfolio labels which is which.`,

  `<b>Where the gap is.</b> I have not spent five years shipping enterprise software. I am still building depth in backend engineering, cloud and hybrid deployment, APIs and authentication, observability, networking and production agent infrastructure, and I am studying AI and Full Stack development through Universidad Rey Juan Carlos via Racks Academy (in progress). Kubernetes and container orchestration, deeper Python, and a homelab of my own now in design are what I am starting next — stated as intent rather than experience, learned with an LLM and an agent harness beside me and aimed at the part that makes a system operable. I am asking for the chance to close that gap in the direction of Forward Deployed Engineer, not for anyone to pretend it is closed.`,

  `I am based in Aberdeen, Scotland, work across UK and European time zones, can travel, would consider relocation, and can start immediately. The full application is at nousresearch.technoir.cloud. The most useful reply would tell me what would make me obviously useful to Nous in the first 90 days; I would rather close a specific gap than guess at one.`
];

const html = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><title>Javier Ponz Prado — cover letter</title>
<style>
  @page { size: A4; margin: 16mm 19mm; }
  * { box-sizing: border-box; }
  body { margin:0; font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
         font-size:9.8pt; line-height:1.48; color:#111; }
  header { border-bottom:1px solid #b9b9b9; padding-bottom:10px; margin-bottom:16px; }
  h1 { font-size:17pt; margin:0 0 3px; letter-spacing:-.01em; }
  .headline { font-size:9.6pt; font-weight:700; color:#3a3a3a; margin:0 0 4px; }
  .contact { font-size:8.6pt; color:#333; margin:0; }
  .to { font-size:9.4pt; margin:0 0 14px; }
  .to b { display:block; font-size:10pt; }
  p { margin:0 0 9px; }
  .sign { margin-top:16px; font-size:9.6pt; }
  .sign b { display:block; margin-top:2px; }
</style></head><body>

<header>
  <h1>Javier Ponz Prado</h1>
  <p class="headline">Technical support &middot; agent operations &middot; a forward-deployed path &middot; Aberdeen, Scotland</p>
  <p class="contact">nerion89@gmail.com &middot; +34 691 347 651 &middot; github.com/ponzgpt &middot; linkedin.com/in/javierponz &middot; javierponz.technoir.cloud</p>
</header>

<p class="to"><b>Nous Research</b>
Open application — an early-career path toward Forward Deployed Engineer</p>

${paragraphs.map((p) => `<p>${p}</p>`).join('\n')}

<p class="sign">Thank you for reading.
<b>Javier Ponz Prado</b></p>

</body></html>`;

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chrome or Chromium found. Tried:\n  ' + CHROME_CANDIDATES.join('\n  '));
  process.exit(1);
}

const tmp = mkdtempSync(join(tmpdir(), 'cl-'));
const src = join(tmp, 'letter.html');
writeFileSync(src, html, 'utf8');

try {
  execFileSync(chrome, [
    '--headless', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${out}`, `file://${src}`
  ], { stdio: 'pipe' });
} catch (err) {
  console.error('Chrome failed to render the PDF:', err.message);
  process.exit(1);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

if (!existsSync(out)) {
  console.error('Chrome reported success but no PDF was written.');
  process.exit(1);
}
console.log(`wrote ${out} (${(statSync(out).size / 1024).toFixed(0)} KB)`);
