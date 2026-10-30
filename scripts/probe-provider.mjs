import {readFile,writeFile} from 'node:fs/promises';
if(process.stdin.isTTY)process.stdin.setRawMode(true);
process.stdout.write('Ready for private runtime credential on stdin (hidden).\n');
let text='';
for await(const chunk of process.stdin){text+=chunk.toString();if(/[\r\n]/.test(text)||/sk-[a-zA-Z0-9_-]{32,}/.test(text))break;}
if(process.stdin.isTTY)process.stdin.setRawMode(false);
process.stdin.pause();
const key=text.trim();text='';console.log('Credential received; requesting one role response.');
try{
 const source=await readFile('dist/server/index.js','utf8');
 const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
 const payload={actor:'MINER',version:1,route:'G3',policy_version:'policy-quota-v3',capacityMode:'standard',selection:{P02:'C',P04:'B',P05:'C',P11:'C'},reason:'先给生产准备期，并将有限资源用于本地培训和服务。',history:[]};
 if(process.argv.includes('--revision')){payload.actor='PROCESSOR';payload.version=2;payload.history=[{selection:{P02:'A',P04:'B',P05:'B',P11:'B'},reason:'测试用首轮草案',responses:{MINER:{speech:'希望先给准备期，分摊培训成本。'},PROCESSOR:{speech:'请求准备期、共同培训和服务配套。'},LOCAL:{speech:'要求任务配资源。'},COMMUNITY:{speech:'要求服务改善、参与和回应。'}}}];}
 const response=await worker.fetch(new Request('https://local-check.invalid/api/negotiate',{method:'POST',headers:{'content-type':'application/json',origin:'https://local-check.invalid','oai-authenticated-user-id':'local-owner','oai-authenticated-user-email':'owner@example.test'},body:JSON.stringify(payload)}),{DEEPSEEK_API_KEY:key,DEEPSEEK_MODEL:'deepseek-flash',AI_ALLOWED_EMAIL:'owner@example.test'});
 const data=await response.json();
 await writeFile(process.argv.includes('--revision')?'knowledge/修订草案真实接口核验记录.json':'knowledge/真实接口核验记录.json',JSON.stringify({date:new Date().toISOString(),scope:'One real provider call through worker with local test identity and constructed public history fixture; not hosted sign-in verification',http_status:response.status,result:data},null,2));
 console.log(JSON.stringify({status:response.status,model:data.model,error:data.error,speech:data.speech,usage:data.usage,commitments:data.commitments},null,2));
 process.exitCode=response.ok?0:1;
}catch{console.log('Provider verification failed; inspect network availability without exposing credentials.');process.exitCode=1;}
process.exit(process.exitCode||0);

