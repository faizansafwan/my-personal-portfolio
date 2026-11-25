/**
 * Injects server-rendered HTML into dist/index.html so search engines and link
 * previews see real content. Runs after `vite build` and the SSR build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(htmlPath, 'utf-8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> placeholder');
}

const html = template.replace('<!--app-html-->', render());
fs.writeFileSync(htmlPath, html);
fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });

console.log(`Pre-rendered ${(html.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
