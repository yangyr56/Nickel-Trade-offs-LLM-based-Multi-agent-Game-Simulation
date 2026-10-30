import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile('dist/server/index.js','utf8');
const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const box={window:{}};vm.runInNewContext(await readFile('public/data.js','utf8'),box);
const D=box.window.NICKEL_DATA,E=globalThis.NickelEngine,checks=[];
const all={MINER:true,PROCESSOR:true,LOCAL:true,COMMUNITY:true};
let combinations=0;
for(const a of ['A','B','C'])for(const b of ['A','B','C'])for(const c of ['A','B','C'])for(const d of ['A','B','C']){
 const s={P02:a,P04:b,P05:c,P11:d};
 assert.deepEqual(E.evaluate(s,D.menu,1).impacts,E.evaluate(s,D.menu,-1).impacts);
 if(a!=='B'){assert.equal(E.evaluate(s,D.menu).impacts.MINER[0],null);assert.equal(E.evaluate(s,D.menu).impacts.PROCESSOR[1],null);}
 combinations++;
}
checks.push('all 81 combinations ignore removed price driver; tightening never guarantees profit');
const support=E.inspect({P02:'B',P04:'C',P05:'A',P11:'B'},D.menu,D.scenario,all);assert.equal(support.ready.P04,'具备模拟条件');checks.push('performance support accepts basic training and does not require service bundle');
const noTraining=E.inspect({P02:'B',P04:'C',P05:'B',P11:'C'},D.menu,D.scenario,all);assert.equal(noTraining.ready.P04,'受阻');checks.push('services cannot substitute for required training milestone arrangement');
const service=E.inspect({P02:'B',P04:'B',P05:'B',P11:'A'},D.menu,D.scenario,{...all,COMMUNITY:null});assert.equal(service.ready.P11,'待明确');checks.push('basic service feedback participation is not assumed from silence');
assert.equal(D.menu.P02.options.C.cost.GOV,1);assert.equal(D.menu.P02.options.A.cost.GOV||0,0);checks.push('preparation consumes additional central coordination resources');
const rawFetch=globalThis.fetch;let calls=0,invalid=false,citationRepair=false,expectedRoute='产业升级优先';
globalThis.fetch=async(url,opts)=>{
 calls++;const payload=JSON.parse(opts.body),ctx=JSON.parse(payload.messages[1].content);
 assert.equal(ctx.actor,'GOV');assert.equal(ctx.strategy.name,expectedRoute);
 assert.ok(ctx.feasible_candidates.length>0&&ctx.feasible_candidates.length<81);
 assert.ok(!ctx.feasible_candidates.some(c=>c.id==='CCCC'));
 assert.ok(ctx.feasible_candidates.every(c=>Object.entries(c.resource_demand_if_cooperation).every(([a,n])=>n<=ctx.capacity[a])));
 const chosen=ctx.feasible_candidates.find(c=>c.id==='CBCA');assert.ok(chosen);
 if(citationRepair){const contract=JSON.parse(payload.messages[2].content);assert.ok(contract.allowed_evidence_ids.includes('CTX1'));if(payload.messages.length>3)assert.ok(JSON.parse(payload.messages.at(-1).content).correction_required.includes('CTX1'));}
 const result={actor:'GOV',candidate_id:invalid?'CCCC':chosen.id,reason:'采纳准备期和配套能力建设，以地方基本服务控制中央投入。',tradeoff:'企业和地方仍需承担投入，不能保证全部支持。',clause_reasons:Object.fromEntries(['P02','P04','P05','P11'].map(p=>[p,'依据所选条款解释成本与取舍。'])),supplementary_suggestions:[],responses_to_feedback:ctx.version===1?[]:['MINER','PROCESSOR','LOCAL','COMMUNITY'].map(actor=>({actor,handling:'部分回应',reason:'保留未满足的条件，第二轮重新确认。'})),evidence_ids:['CTX1'],selection:{P02:'INVALID'}};
 if(citationRepair&&payload.messages.length===3)result.evidence_ids=['NOT_RETRIEVED'];
 return Response.json({model:'mock-only',choices:[{finish_reason:'stop',message:{content:JSON.stringify(result)}}]});
};
const env={DEEPSEEK_API_KEY:'test-only-placeholder',AI_ALLOWED_EMAIL:'owner@example.test'};
const body={version:2,policy_version:D.policy_version,route:'G2',capacityMode:'standard',preferences:{P02:'balanced',P04:'balanced',P05:'balanced',P11:'balanced'},history:[{selection:{P02:'A',P04:'B',P05:'B',P11:'B'},responses:{}}]};
const req=b=>new Request('https://lab.example.test/api/government',{method:'POST',headers:{origin:'https://lab.example.test','content-type':'application/json','oai-authenticated-user-id':'gov-test','oai-authenticated-user-email':env.AI_ALLOWED_EMAIL},body:JSON.stringify(b)});
try{
 const first={...body,version:1,history:[],preferences:{P02:'active',P04:'conservative',P05:'balanced',P11:'active'}};const firstRes=await worker.fetch(req(first),env);assert.equal(firstRes.status,200);const firstData=await firstRes.json();assert.equal(firstData.version,1);assert.deepEqual(firstData.preferences,first.preferences);assert.deepEqual(firstData.responses_to_feedback,[]);checks.push('first round receives four preferences and does not invent previous feedback');
 const good=await worker.fetch(req(body),env),data=await good.json();assert.equal(good.status,200);assert.equal(data.version,2);assert.equal(data.selection.P02,'C');assert.equal(data.selection.P05,'C');assert.equal(data.offers,undefined);checks.push('central AI selects validated candidate without inventing cooperation or changing route');
 invalid=true;const badBody=structuredClone(body);badBody.history[0].reason='different-case';assert.equal((await worker.fetch(req(badBody),env)).status,502);checks.push('central AI cannot select an over-budget candidate, even after repair');
 invalid=false;citationRepair=true;const citationBody=structuredClone(body);citationBody.history[0].reason='citation-repair-case';const repaired=await worker.fetch(req(citationBody),env);assert.equal(repaired.status,200);assert.equal((await repaired.json()).generation_attempts.length,2);checks.push('invalid citation remains rejected and explicit allowed IDs guide a validated repair');
 citationRepair=false;for(const route of D.government.routes){expectedRoute=route.name;const f={...first,route:route.id,preferences:{P02:'conservative',P04:'active',P05:'active',P11:'conservative'}};const res=await worker.fetch(req(f),env);assert.equal(res.status,200);assert.deepEqual((await res.json()).preferences,f.preferences);}checks.push('all three routes and alternative preferences reach central context without changing resources');
 const old=structuredClone(body);delete old.policy_version;const before=calls;assert.equal((await worker.fetch(req(old),env)).status,400);assert.equal(calls,before);checks.push('stale frontend rejected before model charges');
}finally{globalThis.fetch=rawFetch;}
await writeFile('knowledge/政策及中央AI核验.json',JSON.stringify({scope:'deterministic and mock model checks, not live agent quality',combinations,checks},null,2));
console.log(checks.map(c=>'PASS '+c).join('\n'));
