import {mkdir,copyFile} from 'node:fs/promises';
await mkdir(new URL('../dist/',import.meta.url),{recursive:true});
for(const name of ['index.html','style.css','app.js','core.js'])await copyFile(new URL(`../${name}`,import.meta.url),new URL(`../dist/${name}`,import.meta.url));
console.log('Built four static assets in dist/. No third-party dependencies.');
