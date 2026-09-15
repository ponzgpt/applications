#!/usr/bin/env node
// Fails if a built page loses its structure or an obsolete claim creeps back in.
//   node build.mjs && node check.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const pages = ['index.html', 'es/index.html', 'zh/index.html'];
const sources = [...pages, 'llms.txt', 'build-cover-letter.mjs', 'content.mjs'];

const banned = [/5090/, /cambridge/i, /\bCAE\b/, /consultanc/i, /consultora/i, /咨询/, /stormlight/i,
  /journey before destination/i, /tony simons/i, /\bfounder\b/i, /Who—/, /more than once/i,
  /empowering/i, /revolutionary/i, /seamless/i, /cutting-edge/i, /at the intersection of/i,
  /application was sent/i, /already attached/i];

for (const f of sources) {
  const text = readFileSync(f, 'utf8');
  for (const re of banned) assert.ok(!re.test(text), `${f}: banned pattern ${re}`);
}

for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  for (const id of ['person', 'work', 'proof', 'fit', 'gap', 'logistics', 'contact'])
    assert.ok(html.includes(`id="${id}"`), `${f}: missing section #${id}`);
  const proofSection = html.split('id="proof"')[1].split('id="fit"')[0];
  assert.equal((proofSection.match(/class="role-item"/g) || []).length, 3, `${f}: expected exactly three proof items`);
  assert.ok(html.includes('javier-sketch.jpg'), `${f}: portrait missing`);
  assert.ok(/\.navbar\{position:sticky/.test(html), `${f}: navbar must be sticky`);
}

const en = readFileSync('index.html', 'utf8');
assert.equal((en.match(/leading is serving/g) || []).length, 1, 'index.html: "leading is serving" must appear once');

console.log(`check ok: ${sources.length} files`);
