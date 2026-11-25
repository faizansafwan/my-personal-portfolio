/**
 * Injects server-rendered HTML into each built page so search engines and link
 * previews see real content. Runs after `vite build` and the SSR build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const PAGES = [
  { html: 'dist/index.html', fn: 'render' },
  { html: 'dist/motion/index.html', fn: 'renderMotion' },
];

const server = await import(pathToFileURL(serverEntry).href);

for (const page of PAGES) {
  const htmlPath = path.join(root, page.html);
  const template = fs.readFileSync(htmlPath, 'utf-8');
  if (!template.includes('<!--app-html-->')) {
    throw new Error(`${page.html} is missing the <!--app-html--> placeholder`);
  }
  if (typeof server[page.fn] !== 'function') {
    throw new Error(`entry-server.js does not export ${page.fn}()`);
  }
  const html = template.replace('<!--app-html-->', server[page.fn]());
  fs.writeFileSync(htmlPath, html);
  console.log(`Pre-rendered ${(html.length / 1024).toFixed(1)} kB into ${page.html}`);
}

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
