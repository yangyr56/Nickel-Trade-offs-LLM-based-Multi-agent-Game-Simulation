import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const origin='http://127.0.0.1:8780';
const child=spawn(process.execPath,['server.mjs'],{cwd:process.cwd(),env:{...process.env,DEEPSEEK_API_KEY:'',PORT:'8780',HOST:'127.0.0.1',APP_ORIGIN:origin,NODE_ENV:'development',DEMO_PASSWORD:'local-test-password-only',SESSION_SECRET:'local-test-session-secret-01234567890123456789'},stdio:'ignore'});
try{
 let ready=false;for(let i=0;i<30;i++){try{await fetch(origin+'/api/status');ready=true;break;}catch{await new Promise(r=>setTimeout(r,100));}}assert.ok(ready,'server starts');
 const checks=[];
 assert.equal((await fetch(origin)).status,200);checks.push('independent Node server serves page');
 const anon=await(await fetch(origin+'/api/status')).json();assert.equal(anon.authorized,false);checks.push('anonymous user cannot use paid API');
 const spoof=await(await fetch(origin+'/api/status',{headers:{'oai-authenticated-user-id':'fake','oai-authenticated-user-email':'team-demo@local.invalid'}})).json();assert.equal(spoof.authorized,false);checks.push('forged Sites identity headers stripped');
 const denied=await fetch(origin+'/local-login',{method:'POST',headers:{origin:'https://wrong.example','content-type':'application/x-www-form-urlencoded'},body:'password=local-test-password-only',redirect:'manual'});assert.equal(denied.status,403);checks.push('cross-origin login rejected');
 const login=await fetch(origin+'/local-login',{method:'POST',headers:{origin,'content-type':'application/x-www-form-urlencoded'},body:'password=local-test-password-only',redirect:'manual'});assert.equal(login.status,303);
 const cookie=login.headers.get('set-cookie').split(';')[0];
 const auth=await(await fetch(origin+'/api/status',{headers:{cookie}})).json();assert.equal(auth.authorized,true);assert.equal(auth.configured,false);checks.push('signed local session enables identity, without actual API calls');
 await writeFile('本机验收记录.json',JSON.stringify({checks,scope:'Local runtime/auth checks only; no mainland network or paid provider test'},null,2));
 console.log(checks.map(x=>'PASS '+x).join('\n'));
}finally{child.kill();}
