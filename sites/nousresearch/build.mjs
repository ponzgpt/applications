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

const styles = `
  @font-face{
    /* Same variable font Nous uses for headings, self-hosted nowhere near
       reliably enough on Google Fonts, so pulled from its own npm package. */
    font-family:"Geist Mono";
    src:url("https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-mono/GeistMono-Variable.woff2") format("woff2");
    font-weight:100 900;
    font-style:normal;
    font-display:swap;
  }
  @font-face{
    /* Nous sets nav links and lead-in words in "mondwest mike," a commercial
       display face we have no license to serve. Geist is the closest thing we
       can legally ship — open source, and Nous already loads it themselves
       (it's in their own document.fonts list, just not on these elements). */
    font-family:"Geist";
    src:url("https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-sans/Geist-Variable.woff2") format("woff2");
    font-weight:100 900;
    font-style:normal;
    font-display:swap;
  }
  :root{
    /* Sampled directly from the computed style of nousresearch.com/careers. */
    --ink:#0171a9;
    --paper:#ffffff;
    --grey:#5c6d78;
    --max:1100px;
    --serif:"EB Garamond",Georgia,"Times New Roman",serif;
    --sans:"Helvetica Neue",Helvetica,Arial,sans-serif;
    --mono:"Courier Prime","Courier New",Courier,monospace;
    --headmono:"Geist Mono","Courier Prime",monospace;
    --headsans:"Geist","Helvetica Neue",sans-serif;
  }
  *{box-sizing:border-box}
  html{background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased}
  /* their body copy computes to Helvetica Neue, weight 600, 16px/24px —
     sampled directly, not approximated */
  body{margin:0;font-family:var(--sans);font-weight:600;font-size:16px;line-height:1.5}
  .shell{width:min(calc(100% - 48px),var(--max));margin:0 auto}
  a{color:var(--ink)}

  /* sticky: the nav stays reachable while reading a long page. It lives in a
     full-bleed bar with its own inner shell, and the dashed rule belongs to
     the bar so it travels with it and stays edge-matched to every other rule
     on the page. */
  .navbar{position:sticky;top:0;z-index:20;background:var(--paper)}
  .navbar .shell{border-bottom:2px dashed var(--ink)}
  nav{padding:22px 0 16px;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap}
  /* sampled from their real nav links: Geist, weight 500, 15px, uppercase,
     no extra letter-spacing */
  nav a{
    font-family:var(--headsans);font-weight:500;font-size:15px;letter-spacing:normal;
    text-transform:uppercase;text-decoration:none;margin:0 10px;display:inline-block;line-height:1.9;
  }
  nav a:hover{text-decoration:underline;text-underline-offset:4px}
  nav a.home{text-decoration:underline;text-underline-offset:4px}

  /* language picker — an icon button that opens a popover of language codes,
     with a caret pointing back at the button. Still plain links inside a
     <details>, so it works with JavaScript off and a crawler can follow it to
     the translated page. */
  .lang{position:relative;margin-left:12px;--pop:#fbfbfc;--hair:rgba(1,113,169,.16)}
  .lang summary{
    list-style:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;
    width:38px;height:38px;border-radius:10px;color:var(--ink);
    background:var(--paper);border:1px solid var(--hair);box-shadow:0 2px 8px rgba(0,0,0,.07);
  }
  .lang summary::-webkit-details-marker{display:none}
  .lang summary svg{display:block;width:20px;height:20px}
  .lang summary:hover,.lang[open] summary{background:var(--ink);color:var(--paper);border-color:var(--ink)}
  .langmenu{
    position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 11px);z-index:30;
    display:flex;align-items:center;gap:2px;padding:5px;white-space:nowrap;
    background:var(--pop);border:1px solid var(--hair);border-radius:14px;
    box-shadow:0 6px 18px rgba(0,0,0,.10);
  }
  .langmenu::before{
    content:"";position:absolute;top:-6px;left:50%;width:10px;height:10px;
    transform:translateX(-50%) rotate(45deg);background:var(--pop);
    border-left:1px solid var(--hair);border-top:1px solid var(--hair);border-radius:2px;
  }
  .langmenu a{
    display:block;margin:0;padding:7px 12px;border-radius:9px;line-height:1.2;
    font-family:var(--sans);font-weight:700;font-size:14px;letter-spacing:.01em;
    text-transform:none;text-decoration:none;color:var(--grey);
  }
  .langmenu a:hover{color:var(--ink);text-decoration:none}
  .langmenu a[aria-current="true"]{background:var(--paper);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.12)}

  .rule{border:0;border-top:2px dashed var(--ink);margin:0;opacity:.9}

  .block{
    display:inline-block;background:var(--ink);color:var(--paper);
    font-family:var(--headmono);font-weight:600;font-size:clamp(24px,2.4vw,32px);
    letter-spacing:-.05em;padding:0;margin:0 0 62px;
  }

  section{padding:56px 0 62px;scroll-margin-top:78px}
  #application{padding-top:52px}
  /* two cells on desktop; on mobile the media query collapses to one column and
     the portrait drops below the mission paragraph, like the portrait on
     nousresearch.com/careers */
  .cols{display:grid;grid-template-columns:1fr 200px;gap:48px;align-items:start}

  /* their lead-in words (OUR MISSION, NOUS RESEARCH) render in "mondwest
     mike" at 28.8px/16px = 1.8em, weight 600, -0.5px letter-spacing — same
     Geist substitution as the nav, same negative tracking */
  .lead-in{
    font-family:var(--headsans);font-weight:600;font-size:1.8em;
    letter-spacing:-.02em;text-transform:uppercase;line-height:1;
  }
  .lead-in a{text-decoration:none}
  .lead-in a:hover{text-decoration:underline;text-underline-offset:4px}

  p{margin:0 0 22px;max-width:90ch}
  .status{color:var(--grey);font-weight:600;font-size:14px}
  .u{text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:2px;text-decoration-color:rgba(0,113,169,.42);transition:text-decoration-color .15s,background-color .15s}
  .u:hover{text-decoration-color:var(--ink);background:rgba(0,113,169,.07)}

  ul{margin:0 0 22px;padding-left:22px;max-width:90ch}
  li{margin-bottom:14px}

  /* their section heads (OPEN ROLES) are Geist Mono, weight 600, 28.8px,
     -0.5px letter-spacing — same values .block already uses for APPLICATION */
  .mono-head{
    font-family:var(--headmono);font-weight:600;font-size:clamp(22px,2.4vw,28.8px);
    letter-spacing:-.02em;text-transform:uppercase;margin:0 0 30px;
  }
  .mono-head .hw{text-decoration:underline;text-underline-offset:6px;text-decoration-thickness:2px}
  .mono-head .sub{font-family:var(--sans);font-weight:600;font-size:.5em;letter-spacing:0;text-transform:none;color:var(--grey);margin-left:14px}

  /* floating, unframed — matches the portrait on nousresearch.com/careers. */
  .portrait{border-radius:6px;overflow:hidden;box-shadow:0 4px 8px rgba(0,0,0,.05);aspect-ratio:3/3.6}
  .portrait img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}

  /* condensed "what I want" list, in the same badge + title + one-liner shape
     as the "OPEN ROLES" list on nousresearch.com/careers, values sampled from
     its .badge/.role-title/.role-description. Reused for What I Bring and for
     Built and Shipped, so the whole page speaks in one component vocabulary
     instead of inventing a card grid or a feature-matrix table. */
  .rolelist{margin:0 0 26px;max-width:78ch}
  .role-item{padding:12.8px 0;border-bottom:1px dotted var(--ink)}
  .role-title{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-weight:600;font-size:17.6px;margin:0}
  .badge{display:inline-block;background:#007bff;color:#fff;padding:1.6px 4.8px;border-radius:1px;font-weight:600;font-size:9.6px;letter-spacing:.03em;text-transform:uppercase;white-space:nowrap}
  /* body copy dropped to 600 globally, but their .role-description is 700 —
     stated explicitly here rather than inherited */
  .role-body{margin:6px 0 0;font-weight:700;font-size:15.2px;line-height:1.5}
  .role-links{margin:8px 0 0;font-weight:600;font-size:13.6px}
  .role-links a{margin-right:16px}
  /* the shell-shaped nouns the Proof section names — 0th, /healthz — are
     commands rather than prose. Nothing else on the page needs a code face. */
  .role-body code{font-family:var(--mono);font-size:.92em;font-weight:400}

  /* the role-fit mapping: same dotted-row rhythm as .role-item, without the
     badge — a label and its answer, not a SaaS feature-matrix table. */
  .maplist{list-style:none;margin:0 0 26px;padding:0;max-width:78ch}
  .maplist li{padding:10.4px 0;border-bottom:1px dotted var(--ink);margin:0}
  .maplist b{font-weight:600}

  /* mirrors their "HOW TO APPLY" list: square markers, 16px, same ink */
  .applylist{list-style:square;padding-left:16px;margin:16px 0 26px;max-width:78ch}
  .applylist li{margin:0 0 8px;font-size:16px;font-weight:600;line-height:1.5;overflow-wrap:anywhere}

  /* matches the "if nothing fits" callout on nousresearch.com/careers exactly.
     Used once on the whole page, for the one thing that deserves the weight. */
  .footnote{
    display:flex;align-items:flex-start;
    background:var(--ink);color:var(--paper);border-left:5px solid #00547e;border-radius:1px;
    box-shadow:0 2px 8px rgba(0,0,0,.08);padding:.8rem 1.8rem;
    font-family:var(--sans);font-weight:500;font-size:15.2px;line-height:1.6;letter-spacing:.02em;
    max-width:78ch;
  }
  .footnote .info-icon{width:20px;height:20px;min-width:20px;margin:3px 12px 0 0;flex-shrink:0}

  footer{padding:28px 0 60px;color:var(--grey);font-size:13px}
  footer .shell{border-top:2px dashed var(--ink);padding-top:24px;display:flex;justify-content:space-between;gap:14px 32px;flex-wrap:wrap}
  footer p{margin:0;max-width:60ch;font-size:13px}
  footer .links{display:flex;flex-wrap:wrap;gap:4px 16px;font-family:var(--headsans);font-size:12.5px;letter-spacing:.04em;text-transform:uppercase}

  @media (max-width:900px){
    .cols{grid-template-columns:1fr;gap:36px}
    .portrait{max-width:240px}
    nav{padding:14px 0 10px}
    nav a{margin:0 7px;font-size:14px;line-height:1.9}
    section{padding:40px 0 44px;scroll-margin-top:94px}
    #application{padding-top:34px}
    .mono-head .sub{display:block;margin:8px 0 0}
    .footnote{padding:.7rem 1.1rem}
    footer .shell{flex-direction:column}
  }
`;

const ids = ['person', 'work', 'proof', 'fit', 'gap', 'logistics'];

const paras = (list) => list.map((p) => `    <p>${p}</p>`).join('\n\n');

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

  const navLinks = [
    `<a class="home" href="${links.portfolio}">${c.home}</a>`,
    ...ids.map((id, i) => `<a href="#${id}">${c.nav[i]}</a>`)
  ].join('\n      ');

  const langMenu = langs.map((l) => {
    const to = l.dir ? `/${l.dir}` : '/';
    return `<a href="${to}" hreflang="${l.html}" lang="${l.html}" title="${l.name}"${l.code === lang.code ? ' aria-current="true"' : ''}>${l.label}</a>`;
  }).join('\n          ');

  const alternates = langs.map((l) =>
    `<link rel="alternate" hreflang="${l.html}" href="${SITE}${l.dir ? `/${l.dir}` : '/'}" />`).join('\n');

  const workList = c.work.items.map((r) => `
      <div class="role-item">
        <div class="role-title"><span class="badge">${r.badge}</span>${r.title}</div>
        <p class="role-body">${r.body}</p>
      </div>`).join('\n');

  const proofList = c.proof.items.map((r) => `
      <div class="role-item">
        <div class="role-title"><span class="badge">${r.badge}</span>${r.title}</div>
        <p class="role-body">${r.body}</p>
        <p class="role-links">${r.links.map(([href, t]) => `<a class="u" href="${href}">${t} ↗</a>`).join('')}</p>
      </div>`).join('\n');

  const mapList = c.fit.map.map(([k, v]) => `      <li><b>${k}</b> — ${v}</li>`).join('\n');
  const nextList = c.gap.next.map(([k, v]) => `      <li><b>${k}</b> — ${v}</li>`).join('\n');
  const applyList = c.contact.items.map((i) => `      <li>${i}</li>`).join('\n');

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
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
<style>${styles}</style>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<div class="navbar">
  <div class="shell">
    <nav>
      ${navLinks}
      <details class="lang">
        <summary aria-label="${c.langLabel}" title="${c.langLabel}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" /></svg></summary>
        <div class="langmenu">
          ${langMenu}
        </div>
      </details>
    </nav>
  </div>
</div>

<div class="shell">

  <section id="application">
    <h1 class="block">${c.block}</h1>
    <div class="cols">
      <div>
${paras(c.opening)}
        <p class="status">${c.status}</p>
      </div>
      <div class="portrait">
        <img src="/javier-sketch.jpg" alt="${c.portraitAlt}" width="720" height="960" />
      </div>
    </div>
  </section>
  <hr class="rule" />

  <section id="person">
    <h2 class="mono-head"><span class="hw">${c.person.head}</span><span class="sub">${c.person.sub}</span></h2>
${paras(c.person.paras)}
  </section>
  <hr class="rule" />

  <section id="work">
    <h2 class="mono-head"><span class="hw">${c.work.head}</span><span class="sub">${c.work.sub}</span></h2>
    <div class="rolelist">
${workList}
    </div>
    <p>${c.work.calibration}</p>
  </section>
  <hr class="rule" />

  <section id="proof">
    <h2 class="mono-head"><span class="hw">${c.proof.head}</span><span class="sub">${c.proof.sub}</span></h2>
    <p>${c.proof.intro}</p>
    <div class="rolelist">
${proofList}
    </div>
    <p>${c.proof.note}</p>
  </section>
  <hr class="rule" />

  <section id="fit">
    <h2 class="mono-head"><span class="hw">${c.fit.head}</span><span class="sub">${c.fit.sub}</span></h2>
${paras(c.fit.paras)}
    <ul class="maplist">
${mapList}
    </ul>
  </section>
  <hr class="rule" />

  <section id="gap">
    <h2 class="mono-head"><span class="hw">${c.gap.head}</span><span class="sub">${c.gap.sub}</span></h2>
${paras(c.gap.paras)}
    <p>${c.gap.nextLead}</p>
    <ul class="maplist">
${nextList}
    </ul>
    <p>${c.gap.method}</p>
    <p>${c.gap.study}</p>
  </section>
  <hr class="rule" />

  <section id="logistics">
    <h2 class="mono-head"><span class="hw">${c.logistics.head}</span><span class="sub">${c.logistics.sub}</span></h2>
${paras(c.logistics.paras)}
  </section>
  <hr class="rule" />

  <section id="contact">
    <h2 class="mono-head"><span class="hw">${c.contact.head}</span></h2>
${paras(c.contact.paras)}
    <div class="footnote">
      <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
      <span>${c.contact.ask}</span>
    </div>
    <ul class="applylist">
${applyList}
    </ul>
  </section>

</div>

<footer>
  <div class="shell">
    <p>${c.footer}</p>
    <p class="links">
      <a href="${links.portfolio}">${c.portfolio} ↗</a>
      <a href="${links.github}">GitHub ↗</a>
      <a href="${links.linkedin}">LinkedIn ↗</a>
      <a href="${links.hermes}">Hermes Agent ↗</a>
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
