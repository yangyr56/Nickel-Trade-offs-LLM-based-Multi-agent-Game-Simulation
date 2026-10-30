import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
const source=await readFile('dist/server/index.js','utf8'),{default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const selection={P02:'C',P04:'B',P05:'C',P11:'A'};
const body={version:2,policy_version:'policy-quota-v3',route:'G2',capacityMode:'standard',selection,rounds:[{version:1,selection,reason:'初稿',responses:{MINER:{speech:'培训投入仍需核对。'}}},{version:2,selection,reason:'保留并复评',responses:{COMMUNITY:{speech:'服务进度需公开。'}}}],offers:{MINER:{P02:true,P05:null},PROCESSOR:true,LOCAL:true,COMMUNITY:true}};
const env={AI_ALLOWED_EMAIL:'followup@example.test',DEEPSEEK_API_KEY:'fixture-only'};let serial=0,calls=0,change=()=>{},finish='stop';const saved=globalThis.fetch;
globalThis.fetch=async(url,options)=>{calls++;const ctx=JSON.parse(JSON.parse(options.body).messages[1].content);assert.equal(ctx.actor,'FOLLOWUP');assert.equal(ctx.rounds.length,2);assert.equal(ctx.policies.P05.readiness,'待明确');assert.equal(ctx.policies.P04.selected,'B');
 const o={actor:'FOLLOWUP',current_selection:ctx.current_selection,items:Object.entries(ctx.policies).map(([p,v])=>({policy_id:p,option_id:v.selected,why:'结合本局条款和未解决的投入问题跟踪核对。',records:v.framework.records,review_at:v.framework.review_at,trigger:v.framework.trigger,response:v.framework.response,uncertainty:'资料来源和拟议责任方尚需核对。'})),evidence_ids:['CTX1']};change(o);return Response.json({model:'mock-only',choices:[{finish_reason:finish,message:{content:JSON.stringify(o)}}]});};
function req(b,auth=true){return new Request('https://lab.example.test/api/followup',{method:'POST',headers:{origin:'https://lab.example.test','content-type':'application/json',...(auth?{'oai-authenticated-user-id':'followup:'+serial++,'oai-authenticated-user-email':env.AI_ALLOWED_EMAIL}:{})},body:JSON.stringify(b)});}
try{
 assert.equal((await worker.fetch(req(body,false),env)).status,401);assert.equal(calls,0);
 const good=await worker.fetch(req(body),env);assert.equal(good.status,200);const data=await good.json();assert.equal(data.items.length,4);assert.equal(data.current_selection.P04,'B');
 const missing=structuredClone(body);delete missing.offers;const before=calls;assert.equal((await worker.fetch(req(missing),env)).status,400);assert.equal(calls,before);
 change=o=>o.items[0].option_id='A';assert.equal((await worker.fetch(req(body),env)).status,502);
 change=o=>o.items[0].trigger='利润下降20%时调整';assert.equal((await worker.fetch(req(body),env)).status,502);
 change=o=>o.items[0].why='保证政策成功';assert.equal((await worker.fetch(req(body),env)).status,502);
 change=o=>o.items.pop();assert.equal((await worker.fetch(req(body),env)).status,502);
 finish='length';const cut=await worker.fetch(req(body),env);assert.equal(cut.status,502);const message=(await cut.json()).error;assert.ok(message.includes('协商记录及预设框架仍保留'));assert.ok(!message.includes('本轮尚未成立'));
 console.log('PASS authorized contextual followup; pending cooperation/baseline retained; wrong clauses, invented thresholds, predictions and missing items rejected; failure preserves completed rounds');
}finally{globalThis.fetch=saved;}
