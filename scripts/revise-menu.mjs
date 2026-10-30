import {readFile,writeFile,access} from 'node:fs/promises';
import vm from 'node:vm';
const box={window:{}};
vm.runInNewContext(await readFile('public/data.js','utf8'),box);
vm.runInNewContext(await readFile('public/player-copy.js','utf8'),box);
const D=box.window.NICKEL_DATA,C=box.window.PLAYER_COPY;
try{await access('knowledge/旧政策菜单_V1.json');}catch{await writeFile('knowledge/旧政策菜单_V1.json',JSON.stringify(D.menu,null,2));}
D.policy_version='policy-quota-v2';
// Values are declared design assumptions, not estimated policy effects.
const defs={
 P02:{name:'配额安排与过渡节奏',driver:'quota-policy',options:{
 B:{title:'沿用现有配额，本轮不额外收紧',why:'企业沿用既有生产安排，短期衔接负担较小；本轮也不会增加对开采的约束。',cost:{},required:[],effects:{},gov:[0,0,0,0,0,0],timing:'沿用现有安排，无新增收紧。',gate:'既有法定义务继续适用。'},
 A:{title:'下一执行期收紧配额，三个月后复评',why:'较快开始控制开采，但矿企可采售矿量受限，冶炼企业需要重排供矿和生产。没有准备期，合同与开工衔接压力更大；净利润变化仍需判断。',cost:{MINER:1,PROCESSOR:1},required:['MINER','PROCESSOR'],effects:{MINER:[null,-1,-1,0],PROCESSOR:[-1,null,-1,0]},gov:[0,0,1,0,0,-1],timing:'较快启动额外收紧，三个月后检查供矿与经营情况。',gate:'企业明确配合调整；实际配额仍需相应审批和复评。'},
 C:{title:'先给六个月准备期，再分阶段收紧',why:'先核对供矿、合同和生产衔接，让企业有时间调整；但收紧生效更晚，还会占用中央核对与协调资源。准备期不等于取消后续约束。',cost:{GOV:1,MINER:1,PROCESSOR:1},required:['MINER','PROCESSOR'],effects:{MINER:[null,1,0,0],PROCESSOR:[0,null,1,0]},gov:[0,0,1,0,0,1],timing:'先准备六个月，再分步实施和复评；资源控制的启动晚于立即收紧。',gate:'核对与协调投入、企业调整合作均须明确；不得把准备期当作已经完成收紧。'}
 }},
 P04:{name:'过渡与履约支持',options:{
 B:{title:'不新增企业补助，资金留待其他安排',why:'中央不承担这轮额外企业补助，企业自行消化调整成本。培训和公共服务是否有政府投入，仍由后两题单独选择。',cost:{},required:[],effects:{},gov:[0,0,0,0,0,0],timing:'本轮无新增企业补助。',gate:'不影响其他已选配套，也不豁免企业法定义务。'},
 A:{title:'提供一年过渡支持，先拨付、后核查用途',why:'对符合试点条件的企业先提供缓冲，帮助较快消化调整成本；中央先承担较多经费，留给其他事项的配套空间更少。这份支持不自动换来培训成果。',cost:{GOV:3},required:['MINER','PROCESSOR'],effects:{MINER:[1,0,0,0],PROCESSOR:[0,1,0,0]},gov:[-1,0,0,0,0,1],timing:'先安排过渡支持，一年内核对用途和退出安排。',gate:'企业接受用途核查，中央审批与资源到位后才可能拨付。'},
 C:{title:'提供一年履约支持，培训节点验收后拨付',why:'把支持与本地培训或供应商试点的履约挂钩，中央先预留较少资金；企业需要先垫付投入、提交材料，最终经营收益不能只凭补助承诺判断。',cost:{GOV:2,MINER:1,PROCESSOR:1},required:['MINER','PROCESSOR'],effects:{MINER:[null,0,-1,0],PROCESSOR:[0,null,0,0]},gov:[-1,1,0,0,1,0],timing:'先投入和核验培训节点，再按条件拨付；不能当作企业现在已经拿到钱。',gate:'须选择培训题的任一新增方案，相关合作齐备；实际验收与拨付仍是后续节点。'}
 }},
 P05:{name:'岗位与本地供应能力',options:{
 B:{title:'维持已有安排，暂不增加培训项目',why:'本轮不追加投入和组织任务，也不新增承诺本地岗位或供应商机会。',cost:{},required:[],effects:{},gov:[0,0,0,0,0,0],timing:'无新增项目。',gate:'保留既有安排，不把它记为新增成果。'},
 A:{title:'先做岗位培训，企业出资、地方对接',why:'围绕现有岗位开展培训，企业承担经费，地方组织就业对接；准备较简单、中央不用新增配套，但企业和地方要承担成本，对产业链深度的改变有限。',cost:{MINER:1,PROCESSOR:1,LOCAL:1},required:['MINER','PROCESSOR','LOCAL'],effects:{MINER:[-1,0,-1,0],PROCESSOR:[0,-1,0,1],LOCAL:[1,0,-1,0],COMMUNITY:[0,1,0,0]},gov:[0,0,0,0,1,0],timing:'先围绕既有岗位启动培训，复评就业对接；不保证每位参与者获得岗位。',gate:'企业培训投入与地方对接合作明确，实际岗位结果另行核对。'},
 C:{title:'共建技能与本地供应商试点，分阶段验收',why:'政企共同建设技能培训、供应商辅导和采购资格核验，争取把更多配套能力留在本地；项目范围更广，需要更多企业投入与协调时间，近期岗位和采购增量仍不确定。',cost:{GOV:1,MINER:2,PROCESSOR:2,LOCAL:1},required:['MINER','PROCESSOR','LOCAL'],effects:{MINER:[-1,0,-1,1],PROCESSOR:[0,-1,0,1],LOCAL:[null,0,-1,0],COMMUNITY:[0,null,1,0]},gov:[-1,1,0,0,1,0],timing:'先确定岗位、供应商申请条件与投入分工，再分阶段检查培训和采购对接。',gate:'政企和地方投入齐备；采购资格及实际订单单独核验，不保证订单数量。'}
 }},
 P11:{name:'基本服务与综合试点',options:{
 B:{title:'维持现有服务安排，本轮不扩展',why:'地方继续承担既有责任，本轮不新增试点和投入，已有的生活诉求仍需持续回应。',cost:{},required:[],effects:{},gov:[0,0,0,0,0,0],timing:'沿用现有服务。',gate:'既有环境与服务义务持续，不能以未选试点为由免除。'},
 A:{title:'先保基本服务，地方统筹、中央补缺',why:'先围绕现有供水及基本服务维护开展一年保障安排，公开回应居民问题。中央投入较少，地方需要承担更多统筹和运营，暂不承诺扩大服务范围。',cost:{GOV:1,LOCAL:2,COMMUNITY:1},required:['LOCAL','COMMUNITY'],effects:{LOCAL:[0,0,-1,1],COMMUNITY:[1,0,1,0]},gov:[-1,0,0,1,0,0],timing:'先保障现有基本服务，一年内持续回应和检查；不承诺扩展覆盖范围。',gate:'地方运营投入及居民反馈参与明确；仍需确认持续运营经费。'},
 C:{title:'开展一年综合服务试点，中央配套、居民监督',why:'将服务改善、地方运营和居民监督一并组织，定期公开回应，并讨论更广的服务衔接。中央承担更多配套，地方初期负担较轻，但会占用其他政策的投入空间。',cost:{GOV:2,LOCAL:1,COMMUNITY:1},required:['LOCAL','COMMUNITY'],effects:{MINER:[0,0,0,1],PROCESSOR:[0,0,0,1],LOCAL:[0,1,1,1],COMMUNITY:[1,0,1,0]},gov:[-1,0,0,1,1,0],timing:'一年试点，季度公开回应；具体扩展范围和长期运营仍须复评。',gate:'中央配套、地方运营和居民参与均明确；参与监督不包含同意搬迁。'}
 }}
};
const taskMaps={
 P02:{A:{MINER:'重排开采、售矿与合同安排，配合配额复评',PROCESSOR:'重排原料采购与生产衔接，配合供需复评'},C:{MINER:'在准备期核对供矿与合同，并配合分阶段配额调整',PROCESSOR:'在准备期核对采购与排产，配合分阶段调整'}},
 P04:{A:{MINER:'接受过渡支持的用途核查与退出安排',PROCESSOR:'接受过渡支持的用途核查与退出安排'},C:{MINER:'先承担履约投入并提供培训核验材料',PROCESSOR:'先承担履约投入并提供培训核验材料'}},
 P05:{A:{MINER:'出资开展本企业岗位培训',PROCESSOR:'出资开展本企业岗位培训',LOCAL:'组织岗位需求与本地就业对接'},C:{MINER:'投入培训和供应商辅导，参与资格核验',PROCESSOR:'投入技能与供应商试点，核对采购资格',LOCAL:'组织岗位、供应商申请和分阶段对接'}},
 P11:{A:{LOCAL:'统筹基本服务维护并公开回应问题',COMMUNITY:'反馈基本服务问题、查看回应进度（不含同意搬迁）'},C:{LOCAL:'组织综合服务试点及运营衔接，公开回应进展',COMMUNITY:'参与查看服务进度、反馈问题（不含同意搬迁）'}}
};
for(const [p,def]of Object.entries(defs)){
 D.menu[p].name=def.name;D.menu[p].driver=def.driver||'policy-tool';
 C.policies[p].tasks_by_option=taskMaps[p];
 for(const [k,x]of Object.entries(def.options)){
  Object.assign(D.menu[p].options[k],{text:x.title,actor_effects:x.effects,government_effects:x.gov,cost:x.cost,required:x.required,rule_id:p+'_'+k+'_V2',timing:x.timing,implementation_gate:x.gate,design_rationale:x.why,status:'D：政策工具为研究情景；数值与时限非经验估计',unknown:'实际配额量、价格、净收益、财政审批与长期成效仍需独立核验'});
  C.policies[p].options[k]=[x.title,x.why];
 }
}
D.menu.P04.options.C.dependency_rule={policy:'P05',options:['A','C']};
C.background.summary='本局把协商设在2026年的印尼镍产业。政府正考虑是否收紧镍矿开采配额，以兼顾产业发展和资源利用。矿企担心可采售矿量与合同收益，冶炼企业担心原料衔接；地方和居民希望就业、基本服务及生活问题得到回应。配额怎么调、过渡成本由谁承担、培训与服务怎样落实，是本次协商的四个问题。';
C.background.story[1]=['配额收紧为什么会引起分歧？','配额限制的是允许开采的数量。矿企可能面临可销售数量受限，冶炼企业需要重新安排原料供应。市场价格可能随供需变化，但还受需求、库存及其他供给影响；价格能否抵消数量或成本变化，不能直接断定。本局不计算“收紧配额就一定涨价、矿企就一定增利”。'];
C.background.story[3]=['这次具体谈什么？','中央选择沿用现有配额、较快收紧或先准备再收紧；再讨论先拨付的过渡支持与履约后支持、岗位培训与供应商试点，以及基本服务保障与综合服务试点。各项安排占用不同主体的投入与协调能力，不能全部由口头支持代替。'];
C.roles.MINER.wants[0][1]='可采售矿量关系到工资、还款和下一步投入。我担心配额收紧打乱销量与合同；即使市场价格出现变化，收入也未必足以覆盖数量损失。';
await writeFile('public/data.js','window.NICKEL_DATA = '+JSON.stringify(D,null,2)+';\n');
await writeFile('public/player-copy.js','window.PLAYER_COPY = '+JSON.stringify(C,null,2)+';\n');
console.log('Revised four-policy menu with quota policy and explicit tradeoffs');
