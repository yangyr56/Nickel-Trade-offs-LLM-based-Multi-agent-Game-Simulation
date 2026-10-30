import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const record=JSON.parse(await readFile('../../outputs/01_当前制作/比赛交付_V4_两轮态度与任务明细/真实两轮接口记录_版本13.json','utf8'));
const dataSrc=await readFile('public/data.js','utf8');const dataJson=JSON.parse(dataSrc.slice(dataSrc.indexOf('{'),dataSrc.lastIndexOf('}')+1));const d={policy_version:dataJson.policy_version};
const source=await readFile('dist/server/index.js','utf8');const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
let fixture;const old=globalThis.fetch;globalThis.fetch=async(url,options)=>{const ctx=JSON.parse(JSON.parse(options.body).messages[1].content);fixture.stance=ctx.stance_evaluation.stance;fixture.impacts=ctx.role.criteria.map(c=>c.impact);fixture.evidence_ids=[ctx.references[0]?.id||ctx.sources[0]?.id];return Response.json({model:'real-output-replay-only',choices:[{finish_reason:'stop',message:{content:JSON.stringify(fixture)}}]});};
const env={AI_ALLOWED_EMAIL:'replay@example.test',DEEPSEEK_API_KEY:'replay-only-placeholder'};let reviewed=0;
try{for(const q of record.rounds)for(const [actor,data]of Object.entries(q.ai)){
 fixture=structuredClone(data);const body={actor,version:q.version,selection:q.selection,route:q.route,policy_version:d.policy_version,capacityMode:q.capacityMode,reason:q.reason,history:q.version===1?[]:[{selection:record.rounds[0].selection,reason:record.rounds[0].reason,responses:record.rounds[0].ai}]};
 const response=await worker.fetch(new Request('https://replay.example.test/api/negotiate',{method:'POST',headers:{origin:'https://replay.example.test','content-type':'application/json','oai-authenticated-user-id':'replay:'+q.version+actor,'oai-authenticated-user-email':env.AI_ALLOWED_EMAIL},body:JSON.stringify(body)}),env);assert.equal(response.status,200,await response.clone().text());const result=await response.json();
 for(const c of result.commitments)if(/前提是|为条件|但需|但以|齐备后/.test(c.reason)){assert.equal(c.decision,'pending');assert.equal(result.offers[c.policy_id],null);reviewed++;}
}assert.ok(reviewed>0);console.log('PASS replayed 8 historical role outputs without provider calls; stance, impacts and commitments retained, citations rebound to current context; '+reviewed+' extra-proviso decisions stay pending');}finally{globalThis.fetch=old;}
