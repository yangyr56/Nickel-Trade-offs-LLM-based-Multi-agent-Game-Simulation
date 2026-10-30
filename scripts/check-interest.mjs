import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';import vm from 'node:vm';
const b={};b.window=b;vm.createContext(b);for(const f of ['data.js','engine.js'])vm.runInContext(await readFile('public/'+f,'utf8'),b);
const E=b.NickelEngine,D=b.NICKEL_DATA;
assert.equal(E.attitude([3,1],[1,null]).stance,'support');assert.equal(E.attitude([3,1],[-1,null]).stance,'oppose');
assert.equal(E.attitude([1,1],[1,-1]).stance,'balanced');assert.equal(E.attitude([1,1],[null,0]).stance,'unclear');assert.equal(E.attitude([1,1],[0,0]).stance,'balanced');assert.equal(E.attitude([1,1],[null,0]).score,null);
assert.throws(()=>E.attitude([1],[2]));
const counts=Object.fromEntries(E.actors.map(a=>[a,{support:0,oppose:0,balanced:0,unclear:0}]));let feasible=0;
for(const a of ['A','B','C'])for(const c of ['A','B','C'])for(const d of ['A','B','C'])for(const e of ['A','B','C']){
 const selection={P02:a,P04:c,P05:d,P11:e},demand={};for(const[p,k]of Object.entries(selection))for(const[x,v]of Object.entries(D.menu[p].options[k].cost))demand[x]=(demand[x]||0)+v;
 if(Object.entries(demand).some(([x,v])=>v>D.scenario.capacity[x]-D.scenario.already_spent[x]))continue;
 const checked=E.inspect(selection,D.menu,D.scenario,Object.fromEntries(E.actors.map(a=>[a,true])));if(Object.values(checked.ready).some(v=>!['基线','具备模拟条件'].includes(v)))continue;
 feasible++;const ev=E.evaluate(selection,D.menu);for(const r of D.roles)counts[r.actor_id][E.attitude(r.criteria.map(c=>c.raw_priority),ev.impacts[r.actor_id]).stance]++;
}
assert.equal(feasible,52);assert.ok(counts.MINER.support&&counts.MINER.oppose&&counts.PROCESSOR.support&&counts.PROCESSOR.oppose);
const current=E.evaluate({P02:'C',P04:'B',P05:'C',P11:'A'},D.menu);assert.equal(E.attitude(D.roles[1].criteria.map(c=>c.raw_priority),current.impacts.PROCESSOR).stance,'support');
await writeFile('knowledge/总体利益倾向与菜单审查.json',JSON.stringify({rule:'interest-direction-v1',scope:'standard simulation capacity, potential cooperation; not observed attitudes or frequencies',feasible,counts,issues:['地方与社区在当前可提出菜单中没有明确净负向组合；影响表及政策取舍仍需证据校准，不人为补负分。','未知范围不是统计置信区间；角色权重及指标等距为研究设定。']},null,2));
console.log('PASS robust positive/negative, known zero, unknown crossing zero and menu audit; no forced opposition');
