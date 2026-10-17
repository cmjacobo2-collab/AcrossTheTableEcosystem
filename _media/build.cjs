// Bakes media/index.html from media/media.json + prices.json, using the same
// renderer the browser uses (media/media.js).   node _media/build.cjs
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const M = require(path.join(ROOT, 'media', 'media.js'));
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'media', 'media.json'), 'utf8'));
const prices = JSON.parse(fs.readFileSync(path.join(ROOT, 'prices.json'), 'utf8')).prices;
const out = M.render(data, prices);
let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
html = html.replace('{{JSONLD}}', () => out.jsonld);
for (const k of M.ORDER) {
  html = html.replace('{{' + k + '}}', () => out[k]);
  html = html.replace('{{' + k + '_hidden}}', out[k] ? '' : ' hidden');
}
if (/\{\{\w+\}\}/.test(html)) throw new Error('unfilled placeholder: ' + html.match(/\{\{\w+\}\}/)[0]);
fs.writeFileSync(path.join(ROOT, 'media', 'index.html'), html);
console.log('media/index.html', html.length, 'bytes; appearances shown:', !!out.appearances);
