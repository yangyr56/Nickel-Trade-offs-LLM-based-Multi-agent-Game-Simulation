import http from 'node:http';
import {createHash,createHmac,timingSafeEqual,webcrypto} from 'node:crypto';
import worker from './server-bundle.mjs';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
const env={...process.env,AI_ALLOWED_EMAIL:'team-demo@local.invalid'};
const port=Number(process.env.PORT||8080);
const origin=new URL(process.env.APP_ORIGIN||`http://127.0.0.1:${port}`);
if(process.env.NODE_ENV==='production'&&origin.protocol!=='https:')throw Error('Production APP_ORIGIN must use HTTPS');
const authReady=(process.env.DEMO_PASSWORD||'').length>=12&&(process.env.SESSION_SECRET||'').length>=32;
const publicMode=process.env.PUBLIC_DEMO_MODE==='1';
if(env.DEEPSEEK_API_KEY&&!authReady&&!publicMode)throw Error('Configure DEMO_PASSWORD (12+ characters) and SESSION_SECRET (32+ characters) before enabling paid API (or set PUBLIC_DEMO_MODE=1 for login-free demo)');
const cookieName='nickel_demo_session', attempts=new Map();
const digest=s=>createHash('sha256').update(s).digest();
const sign=s=>createHmac('sha256',process.env.SESSION_SECRET).update(s).digest('base64url');
function session(cookie){
 if(!authReady)return false;
 try{const value=(cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(cookieName+'='))?.slice(cookieName.length+1);if(!value)return false;const [payload,sig]=value.split('.');if(!payload||!sig||!timingSafeEqual(digest(sig),digest(sign(payload))))return false;const d=JSON.parse(Buffer.from(payload,'base64url'));return Number.isFinite(d.exp)&&d.exp>Date.now();}catch{return false;}
}
const form=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>团队演示登录</title><body style="font:18px system-ui;max-width:460px;margin:12vh auto;padding:24px"><h1>团队演示登录</h1><p>此口令仅供团队使用，用于保护付费模型接口。普通规则试玩无需登录。</p><form action="/local-login" method="post"><label>演示口令 <input name="password" type="password" required autocomplete="current-password"></label><p><button type="submit">登录</button></p></form><a href="/">返回规则试玩</a></body></html>`;
async function bodyOf(req){const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>64000)throw Error('Body too large');chunks.push(chunk);}return Buffer.concat(chunks);}
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,origin);
  if(url.origin!==origin.origin){res.writeHead(400);res.end('Invalid origin');return;}
  if(url.pathname==='/signin-with-chatgpt'&&req.method==='GET'){res.writeHead(authReady?200:503,{'content-type':'text/html;charset=utf-8','cache-control':'no-store'});res.end(authReady?form:'请先配置服务端演示口令和会话密钥。');return;}
  if(url.pathname==='/local-login'&&req.method==='POST'){
   if(!authReady||req.headers.origin!==origin.origin){res.writeHead(403);res.end('Login origin rejected');return;}
   const ip=req.socket.remoteAddress||'unknown',now=Date.now();let a=attempts.get(ip);if(!a||now-a.since>600000)a={since:now,count:0};
   if(a.count>=5){res.writeHead(429);res.end('Too many login attempts; try again later');return;}
   const data=new URLSearchParams((await bodyOf(req)).toString());
   if(!timingSafeEqual(digest(data.get('password')||''),digest(process.env.DEMO_PASSWORD))){a.count++;attempts.set(ip,a);res.writeHead(401,{'content-type':'text/html;charset=utf-8'});res.end('口令不正确。<a href="/signin-with-chatgpt">返回重试</a>');return;}
   attempts.delete(ip);const payload=Buffer.from(JSON.stringify({exp:now+28800000})).toString('base64url');
   res.writeHead(303,{'location':'/','set-cookie':`${cookieName}=${payload}.${sign(payload)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${origin.protocol==='https:'?'; Secure':''}`,'cache-control':'no-store'});res.end();return;
  }
  const headers=new Headers();
  for(const [k,v] of Object.entries(req.headers)){if(v!==undefined&&!k.toLowerCase().startsWith('oai-'))headers.set(k,Array.isArray(v)?v.join(','):v);}
  // Never trust incoming Sites identity headers outside the Sites platform.
  if(publicMode||session(req.headers.cookie)){headers.set('oai-authenticated-user-id','team-demo');headers.set('oai-authenticated-user-email',env.AI_ALLOWED_EMAIL);}
  const body=['GET','HEAD'].includes(req.method)?undefined:await bodyOf(req);
  const response=await worker.fetch(new Request(url,{method:req.method,headers,body}),env);
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500,{'content-type':'text/plain;charset=utf-8'});res.end('请求未完成，请保留草案后重试。');}
});
server.listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Nickel app listening on port ${port}; configured origin ${origin.origin}`));
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
