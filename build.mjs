import {readFile,writeFile,mkdir} from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
const root=process.cwd();
const read=p=>readFile(path.join(root,p),'utf8');
const sandbox={window:{}};
vm.runInNewContext(await read('public/data.js'),sandbox);
vm.runInNewContext(await read('public/player-copy.js'),sandbox);
const assets={};
for(const n of ['index.html','style.css','history-host.css','history.html','history.css','history-target.css','history.js','app.js','engine.js','data.js','player-copy.js','review-chart.js','followup.js','research_results.js','spatial.js','flags.js','international_nickel_shares.js','sna.js']) assets[n]=await read('public/'+n);

const generated='const DATA='+JSON.stringify(sandbox.window.NICKEL_DATA)+';\nconst COPY='+JSON.stringify(sandbox.window.PLAYER_COPY)+';\nconst KB='+await read('knowledge/observations.json')+';\nconst ASSETS='+JSON.stringify(assets)+';\n'+await read('public/engine.js')+'\n'+await read('public/followup.js')+'\n'+await read('worker/followup.mjs')+'\n'+await read('worker/government.mjs')+'\n'+await read('worker/handler.mjs');
await mkdir(path.join(root,'dist/server'),{recursive:true});

await writeFile(path.join(root,'dist/server/index.js'),generated);

console.log('Worker built with embedded assets and source-linked knowledge; no credentials included.');

