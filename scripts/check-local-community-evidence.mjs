import assert from 'node:assert/strict';
import fs from 'node:fs';

const db=JSON.parse(fs.readFileSync('knowledge/observations.json','utf8'));
const rows=db.observations;
const ids=new Set(rows.map(x=>x.id));
const data=JSON.parse(fs.readFileSync('public/data.js','utf8').replace(/^window\.NICKEL_DATA\s*=\s*/,'').trim().replace(/;$/,''));
const copy=JSON.parse(fs.readFileSync('public/player-copy.js','utf8').replace(/^window\.PLAYER_COPY\s*=\s*/,'').trim().replace(/;$/,''));
const registry=JSON.parse(fs.readFileSync('knowledge/补充来源登记_V1.3.json','utf8'));
assert.equal(db.version,'KB-20261030-3');
assert.equal(db.legacy_record_count,81);
assert.equal(db.observation_count,85);
assert.equal(db.supplemental_count,19);
assert.equal(db.record_count,97);
assert.equal(ids.size,rows.length,'observation IDs must be unique');
for(const id of ['LC04','LC05','LC06','LC07','LC08','LC09','LC10','LC11','LC12','LC13','LC14','LC15','LC16','LC17','LC18','LC19'])assert.ok(ids.has(id),`missing ${id}`);
for(const row of rows.filter(x=>/^LC(0[4-9]|1[0-9])$/.test(x.id)))assert.ok(registry.some(s=>s.source_id===row.source),`${row.id} source missing`);
assert.equal(data.evidence.length,copy.background.sources.length,'public evidence links and explanations must align by index');
assert.equal(data.knowledge_version,db.version);
for(const p of ['P02','P04','P05','P11'])for(const o of Object.values(data.menu[p].options))for(const id of o.evidence||[])assert.ok(ids.has(id),`${p} cites unknown observation ${id}`);
for(const option of ['A','C']){
 const p02=data.menu.P02.options[option];
 assert.equal(p02.actor_effects.LOCAL[0],null);
 assert.equal(p02.actor_effects.LOCAL[1],null);
 assert.equal(p02.actor_effects.COMMUNITY[1],null);
 const p05=data.menu.P05.options[option];
 assert.equal(p05.impact_basis,'用户确认的D级情景假设；非经验测量');
 assert.ok(p05.impact_note.includes('用户确认')&&p05.impact_note.includes('实测结果'));
 assert.ok(!p05.evidence.includes('LC03'),'training outcomes must not cite general employment background as proof');
}
assert.equal(data.menu.P11.options.A.actor_effects.COMMUNITY[0],null);
assert.equal(data.menu.P11.options.C.actor_effects.COMMUNITY[0],null);
assert.equal(data.menu.P11.options.C.actor_effects.COMMUNITY[2],1);
assert.ok(copy.roles.LOCAL.intro.includes('不能代替中央审批'));
assert.ok(copy.roles.COMMUNITY.difference.includes('工人关注安全、工资和医疗'));

const terms={LOCAL:['地方','县政府','财政','服务','就业','Morowali','莫罗瓦利','预算','投诉','协调','LOCAL_BUDGET','FISCAL_CAPACITY','IMPLEMENTATION_GAP'],COMMUNITY:['居民','社区','工人','工会','渔民','农户','渔农','健康','土地','水','电','工资','医疗','Kawasi','参与','生计','COMMUNITY_LAND','FISHERIES','LIVELIHOOD','GRIEVANCE_MECHANISM']};
function retrieve(actor){return rows.map((r,i)=>({r,i,score:terms[actor].reduce((n,t)=>n+((r.actor+' '+r.summary+' '+r.topics).toLowerCase().includes(t.toLowerCase())?1:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.i-b.i).slice(0,12).map(x=>x.r);}
assert.ok(retrieve('LOCAL').some(x=>['LC05','LC09','LC10','LC14','LC15','LC16'].includes(x.id)),'local-government retrieval should surface local finance and response material');
assert.ok(retrieve('COMMUNITY').some(x=>['LC07','LC09','LC10','LC12','LC17','LC18','LC19'].includes(x.id)),'community retrieval should surface voices and livelihood differences');
assert.ok(retrieve('COMMUNITY').some(x=>x.id==='LC19'),'community retrieval should surface land-rights and grievance research');
assert.ok(rows.find(x=>x.id==='LC09').limitation.includes('未提供完整签署纪要'));
assert.ok(rows.find(x=>x.id==='LC14').limitation.includes('不是审计实支'));
assert.ok(rows.find(x=>x.id==='LC15').published_date.includes('2026-10-28'));
assert.ok(rows.find(x=>x.id==='LC15').limitation.includes('可自由支配余量'));
assert.ok(rows.find(x=>x.id==='LC18').limitation.includes('不同于Morowali'));
assert.equal(data.evidence.length,17);
console.log(JSON.stringify({checks:'passed',observation_rows:rows.length,legacy_records:db.legacy_record_count,supplemental:db.supplemental_count,registered_sources:registry.length,visible_sources:data.evidence.length,local_retrieval:retrieve('LOCAL').map(x=>x.id),community_retrieval:retrieve('COMMUNITY').map(x=>x.id)},null,2));
