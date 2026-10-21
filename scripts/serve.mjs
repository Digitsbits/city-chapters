import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png'};
createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const target=resolve(root,'.'+(path==='/'?'/index.html':path));if(!target.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403).end();return;}const data=await readFile(target);res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff'}).end(data);}catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found');}}).listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log(`City Chapters: http://127.0.0.1:${Number(process.env.PORT)||4173}`));
