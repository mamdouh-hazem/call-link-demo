// shared helpers
const $=s=>document.querySelector(s);
const qs=new URLSearchParams(location.search);
function normPhone(raw){
  let d=(raw||'').replace(/[\u0660-\u0669]/g,c=>c.charCodeAt(0)-0x660).replace(/\D/g,'');
  if(d.startsWith('00'))d=d.slice(2);
  if(/^01\d{9}$/.test(d))d='20'+d.slice(1); // Egyptian mobile typed locally
  return (d.length>=8&&d.length<=15)?d:'';
}
function baseUrl(page){return location.origin+location.pathname.replace(/[^/]*$/,'')+page}
function rand(n){const a='abcdefghjkmnpqrstuvwxyz23456789';let s='';const r=crypto.getRandomValues(new Uint8Array(n));for(const x of r)s+=a[x%a.length];return s}
function cleanSrc(s){return (s||'direct').toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,20)||'direct'}
// click counter: free public counter service (abacus). Best effort only.
const COUNT_API='https://abacus.jasoncameron.dev';
async function countHit(ns,src,kind){
  if(!ns)return false;
  try{const r=await fetch(`${COUNT_API}/hit/clk-${ns}/${cleanSrc(src)}_${kind}`);return r.ok}catch(e){return false}
}
async function getCount(ns,src,kind){
  try{const r=await fetch(`${COUNT_API}/get/clk-${ns}/${cleanSrc(src)}_${kind}`);if(!r.ok)return 0;return (await r.json()).value||0}catch(e){return null}
}
function makeQR(el,text){
  const q=qrcode(0,'M');q.addData(text);q.make();el.innerHTML=q.createSvgTag({cellSize:6,margin:2,scalable:true});
}
function copyText(t,btn){navigator.clipboard.writeText(t).then(()=>{const o=btn.textContent;btn.textContent='تم النسخ ✓';setTimeout(()=>btn.textContent=o,1500)}).catch(()=>{prompt('انسخ الرابط:',t)})}
const NAV='<nav><a href="index.html">الرئيسية</a><a href="owner.html">صفحة المالك (استقبال مكالمات)</a><a href="generator.html">الرابط الذكي</a></nav>';
const ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'}]};
