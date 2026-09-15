#!/usr/bin/env node
/**
 * Renders content.mjs into three static pages:
 *
 *   index.html      English   /
 *   es/index.html   Español   /es/
 *   zh/index.html   中文      /zh/
 *
 * One template, three languages, so the versions cannot drift apart. Real
 * pages rather than a browser-side text swap: the reader here is likely to be
 * an ATS filter or a Hermes agent before it is a person, and a translation
 * applied by JavaScript is invisible to both.
 *
 *   node build.mjs && node check.mjs
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { langs, links, content } from './content.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://nousresearch.technoir.cloud';

// Editorial and monochrome: large serif heads, mono section labels, thin rules.
// The relationship to nousresearch.com is rhythm and restraint, not borrowed CSS.
const styles = `
  @font-face{font-family:"Geist Mono";src:url("https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-mono/GeistMono-Variable.woff2") format("woff2");font-weight:100 900;font-display:swap}
  @font-face{font-family:"Geist";src:url("https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-sans/Geist-Variable.woff2") format("woff2");font-weight:100 900;font-display:swap}
  :root{
    --ink:#141414;--paper:#fafaf7;--grey:#5f5f5a;--hair:#d8d8d0;--max:1120px;
    --serif:"EB Garamond",Georgia,"Times New Roman",serif;
    --sans:"Geist","Helvetica Neue",Helvetica,Arial,sans-serif;
    --mono:"Geist Mono",ui-monospace,Menlo,Consolas,monospace;
  }
  *{box-sizing:border-box}
  html{background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased}
  body{margin:0;background:var(--paper);font-family:var(--sans);font-size:17px;line-height:1.6}
  .shell{width:min(calc(100% - 40px),var(--max));margin:0 auto}
  a{color:inherit;text-decoration-thickness:1px;text-underline-offset:3px}
  a:hover{text-decoration-thickness:2px}
  a:focus-visible,summary:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
  p{margin:0 0 20px;max-width:66ch}
  .mono,.label,nav a,.brand,.tag,.links,.status,.study,.kicker,.map-lead{
    font-family:var(--mono);font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;font-weight:500}

  .top{border-bottom:1px solid var(--ink)}
  .top .shell{display:flex;align-items:center;justify-content:space-between;gap:12px 24px;padding:16px 0;flex-wrap:wrap}
  .brand{text-decoration:none;font-weight:600}
  nav{display:flex;align-items:center;gap:6px 18px;flex-wrap:wrap}
  nav a{text-decoration:none;color:var(--grey)}
  nav a:hover{color:var(--ink);text-decoration:underline}

  /* plain links inside <details>: works with JavaScript off, crawlable */
  .lang{position:relative}
  .lang summary{list-style:none;cursor:pointer;font-family:var(--mono);font-size:12.5px;letter-spacing:.06em;
    border:1px solid var(--ink);padding:2px 8px;border-radius:2px}
  .lang summary::-webkit-details-marker{display:none}
  .lang[open] summary,.lang summary:hover{background:var(--ink);color:var(--paper)}
  .langmenu{position:absolute;right:0;top:calc(100% + 6px);z-index:10;display:flex;flex-direction:column;
    background:var(--paper);border:1px solid var(--ink);min-width:9em}
  .langmenu a{padding:6px 10px;text-decoration:none;font-family:var(--sans);font-size:14px}
  .langmenu a:hover,.langmenu a[aria-current="true"]{background:var(--ink);color:var(--paper)}

  .hero{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:56px;padding:72px 0 64px;align-items:start}
  .kicker{display:inline-block;border:1px solid var(--ink);padding:3px 8px;margin:0 0 28px;letter-spacing:.14em}
  h1{font-family:var(--serif);font-weight:500;font-size:clamp(52px,9vw,112px);line-height:.92;letter-spacing:-.02em;margin:0 0 20px}
  .tagline{font-family:var(--serif);font-size:clamp(22px,2.6vw,30px);line-height:1.25;color:var(--grey);max-width:30ch;margin:0 0 44px}
  .opening p{font-size:clamp(18px,1.7vw,20px);max-width:58ch}
  .opening p:first-child{font-family:var(--serif);font-size:clamp(26px,3vw,34px);line-height:1.2;max-width:26ch}
  .status{color:var(--grey);border-top:1px solid var(--hair);padding-top:14px;margin:32px 0 0;max-width:none;line-height:1.7}
  .portrait{aspect-ratio:3/3.8;overflow:hidden;filter:grayscale(1);margin-top:8px}
  .portrait img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}

  .part{display:grid;grid-template-columns:200px minmax(0,1fr);gap:40px;padding:64px 0;border-top:1px solid var(--ink)}
  .label{color:var(--grey);margin:10px 0 0}
  h2{font-family:var(--serif);font-weight:500;font-size:clamp(36px,4.6vw,58px);line-height:1;letter-spacing:-.015em;margin:0 0 32px}
  h3{font-size:18px;font-weight:600;margin:0 0 8px}

  .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;margin:0 0 36px}
  .card{border-top:1px solid var(--ink);padding-top:16px}
  .card p{font-size:16px;margin:0}
  .aside{color:var(--grey);border-left:1px solid var(--ink);padding-left:16px}

  .projects{list-style:none;margin:0 0 28px;padding:0;border-bottom:1px solid var(--hair)}
  .project{display:grid;grid-template-columns:230px minmax(0,1fr);gap:6px 32px;padding:24px 0;border-top:1px solid var(--hair)}
  .project h3{font-family:var(--serif);font-weight:500;font-size:30px;line-height:1.05;margin:0 0 8px}
  .tag{color:var(--grey);font-size:11.5px;line-height:1.5}
  .project p{margin:0}
  .links{display:flex;flex-wrap:wrap;gap:4px 18px;margin:12px 0 0}

  .map-lead{color:var(--grey);margin:36px 0 8px}
  .map{display:grid;grid-template-columns:minmax(0,15em) minmax(0,1fr);margin:0;border-top:1px solid var(--hair)}
  .map dt,.map dd{margin:0;padding:10px 0;border-bottom:1px solid var(--hair)}
  .map dt{font-weight:600;padding-right:20px}
  .study{border:1px solid var(--ink);display:inline-block;padding:6px 10px;margin:8px 0 20px;line-height:1.6}

  .contact{border-top:1px solid var(--ink)}
  .contact h2{font-size:clamp(44px,6vw,76px)}
  .contact dd a{overflow-wrap:anywhere}

  footer{border-top:1px solid var(--ink);padding:28px 0 48px;color:var(--grey);font-size:14px}
  footer .shell{display:flex;justify-content:space-between;gap:16px 40px;flex-wrap:wrap}
  footer p{margin:0;max-width:60ch}
  footer .links{margin:0}

  @media (max-width:860px){
    body{font-size:16px}
    .hero{grid-template-columns:1fr;gap:32px;padding:44px 0 48px}
    .portrait{max-width:200px}
    .part{grid-template-columns:1fr;gap:10px;padding:48px 0}
    h2{margin-bottom:24px}
    .cards,.project,.map{grid-template-columns:1fr}
    .cards{gap:24px}
    .map dt{border-bottom:0;padding-bottom:0}
    .map dd{padding-top:2px}
  }
`;

const ids = ['person', 'work', 'proof', 'fit', 'gap', 'logistics'];
const contactHrefs = [`mailto:${links.email}`, links.cv, links.portfolio, links.projects, links.github, links.linkedin];
const contactText = [links.email, 'javier-ponz-prado-cv.pdf', 'javierponz.technoir.cloud', 'javierponz.technoir.cloud/#projects', 'github.com/ponzgpt', 'linkedin.com/in/javierponz'];

const paras = (list) => list.map((p) => `      <p>${p}</p>`).join('\n');

const part = (id, s, body) => `
  <section class="part" id="${id}" aria-labelledby="${id}-h">
    <p class="label">${s.label}</p>
    <div>
      <h2 id="${id}-h">${s.head}</h2>
${body}
    </div>
  </section>`;

function render(lang) {
  const c = content[lang.code];
  const url = `${SITE}${lang.dir ? `/${lang.dir}` : '/'}`;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Person',
    name: 'Javier Ponz Prado',
    jobTitle: 'Technical support and agent operations',
    description: c.desc,
    email: links.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Aberdeen', addressCountry: 'GB' },
    url: links.portfolio,
    sameAs: [links.github, links.linkedin],
    seeks: { '@type': 'Demand', name: 'Early-career path toward Forward Deployed Engineer at Nous Research' },
    knowsAbout: ['technical support', 'technical troubleshooting', 'Hermes Agent', 'Model Context Protocol',
      'agent workflows', 'Docker', 'Traefik', 'nginx', 'Linux', 'JavaScript'],
    knowsLanguage: ['es', 'en'],
    inLanguage: lang.html
  };

  const alternates = langs.map((l) =>
    `<link rel="alternate" hreflang="${l.html}" href="${SITE}${l.dir ? `/${l.dir}` : '/'}" />`).join('\n');

  const langMenu = langs.map((l) =>
    `<a href="${l.dir ? `/${l.dir}` : '/'}" hreflang="${l.html}" lang="${l.html}"${l.code === lang.code ? ' aria-current="true"' : ''}>${l.name}</a>`
  ).join('\n            ');

  const nav = ids.map((id, i) => `<a href="#${id}">${String(i + 1).padStart(2, '0')} ${c.nav[i]}</a>`).join('\n        ');

  const work = `      <div class="cards">
${c.work.blocks.map((b) => `        <div class="card"><h3>${b.title}</h3><p>${b.body}</p></div>`).join('\n')}
      </div>
      <p class="aside">${c.work.calibration}</p>`;

  const proof = `      <p>${c.proof.intro}</p>
      <ul class="projects">
${c.proof.projects.map((p) => `        <li class="project">
          <div><h3>${p.name}</h3><p class="tag">${p.tag}</p></div>
          <div>
            <p>${p.body}</p>
            <p class="links">${p.links.map(([href, t]) => `<a href="${href}">${t} ↗</a>`).join(' ')}</p>
          </div>
        </li>`).join('\n')}
      </ul>
      <p class="aside">${c.proof.note}</p>`;

  const fit = `${paras(c.fit.paras)}
      <p class="map-lead">${c.fit.mapLead}</p>
      <dl class="map">
${c.fit.map.map(([k, v]) => `        <dt>${k}</dt><dd>${v}</dd>`).join('\n')}
      </dl>`;

  const gap = `${paras(c.gap.paras)}
      <p class="study">${c.gap.study}</p>
      <p>${c.gap.more}</p>`;

  const contact = `${paras(c.contact.paras)}
      <dl class="map">
${c.contact.items.map((k, i) => `        <dt>${k}</dt><dd><a href="${contactHrefs[i]}">${contactText[i]}</a></dd>`).join('\n')}
      </dl>`;

  return `<!doctype html>
<html lang="${lang.html}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${c.title}</title>
<meta name="description" content="${c.desc}" />
<link rel="canonical" href="${url}" />
${alternates}
<link rel="alternate" hreflang="x-default" href="${SITE}/" />
<meta property="og:title" content="${c.title}" />
<meta property="og:description" content="${c.ogDesc}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:locale" content="${lang.html.replace('-', '_')}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet" />
<style>${styles}</style>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<header class="top">
  <div class="shell">
    <a class="brand" href="${links.portfolio}">Javier Ponz · ${c.portfolio} ↗</a>
    <nav aria-label="Sections">
        ${nav}
        <details class="lang">
          <summary aria-label="${c.langLabel}">${lang.label}</summary>
          <div class="langmenu">
            ${langMenu}
          </div>
        </details>
    </nav>
  </div>
</header>

<main class="shell">
  <section class="hero" id="application">
    <div>
      <p class="kicker">${c.block}</p>
      <h1>Javier Ponz</h1>
      <p class="tagline">${c.tagline}</p>
      <div class="opening">
${paras(c.opening)}
      </div>
      <p class="status">${c.status}</p>
    </div>
    <div class="portrait">
      <img src="/javier-sketch.jpg" alt="${c.portraitAlt}" width="720" height="960" />
    </div>
  </section>
${part('person', c.person, paras(c.person.paras))}
${part('work', c.work, work)}
${part('proof', c.proof, proof)}
${part('fit', c.fit, fit)}
${part('gap', c.gap, gap)}
${part('logistics', c.logistics, `      <p>${c.logistics.para}</p>`)}
${part('contact', c.contact, contact).replace('class="part"', 'class="part contact"')}
</main>

<footer>
  <div class="shell">
    <p>${c.footer}</p>
    <p class="links">
      <a href="${links.portfolio}">${c.portfolio} ↗</a>
      <a href="${links.github}">GitHub ↗</a>
      <a href="${links.linkedin}">LinkedIn ↗</a>
      <a href="${links.hermes}">Hermes Agent ↗</a>
      <a href="${links.careers}">Nous careers ↗</a>
      <a href="/llms.txt">llms.txt</a>
    </p>
  </div>
</footer>
</body>
</html>
`;
}

for (const lang of langs) {
  const out = join(root, lang.dir, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(lang), 'utf8');
  console.log(`wrote ${lang.dir || ''}index.html  (${lang.code})`);
}

// sitemap, so the three pages and the PDF are all discoverable
const urls = [
  ...langs.map((l) => `${SITE}${l.dir ? `/${l.dir}` : '/'}`),
  `${SITE}/javier-ponz-prado-cover-letter.pdf`
];
writeFileSync(join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u.endsWith('.pdf') ? '0.8' : '1.0'}</priority></url>`).join('\n') +
  `\n</urlset>\n`, 'utf8');
console.log('wrote sitemap.xml');
