const F=require('node:fs'),I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
function V(P,B){
const S=new Int32Array(256),M=new Int32Array(256),C=new Int32Array(64);
let s=0,k=0,pc=0,t=0,i=0,L=P.length,o='';
const p=()=>{if(s<1)throw 2;return S[--s]},q=x=>{if(s>255)throw 3;S[s++]=x};
try{for(;;){
if(t>=1e6)throw 10;
t++;
if(pc<0||pc>=L)throw 9;
const op=P[pc],n=op==1?1:op==2?4:op>47&&op<52?2:0;
if(pc+n>=L)throw 9;
pc+=n+1;
let v,a,b,c,d;
switch(op){
case 0:return[o,0];
case 1:v=P[pc-1];q(v>127?v-256:v);break;
case 2:q(P.readInt32LE(pc-4));break;
case 3:p();break;
case 4:v=p();q(v);q(v);break;
case 5:b=p();a=p();q(b);q(a);break;
case 6:b=p();a=p();q(a);q(b);q(a);break;
case 7:c=p();b=p();a=p();q(b);q(c);q(a);break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:b=p();a=p();if(op>18&&!b)throw 4;q([a+b|0,a-b|0,Math.imul(a,b),a/b|0,a%b,(a>>>0)/(b>>>0)|0,(a>>>0)%(b>>>0)|0][op-16]);break;
case 23:q(-p()|0);break;
case 24:case 25:case 26:b=p();a=p();q([a&b,a|b,a^b][op-24]);break;
case 27:q(~p());break;
case 28:case 29:case 30:b=p();a=p();q([a<<(b&31),a>>(b&31),a>>>(b&31)|0][op-28]);break;
case 32:case 33:case 34:b=p();a=p();q([a==b,a<b,(a>>>0)<(b>>>0)][op-32]|0);break;
case 48:pc+=P.readInt16LE(pc-2);break;
case 49:d=P.readInt16LE(pc-2);v=p();if(!v)pc+=d;break;
case 50:d=P.readInt16LE(pc-2);v=p();if(v)pc+=d;break;
case 51:if(k>63)throw 7;C[k++]=pc;pc=P.readUInt16LE(pc-2);break;
case 52:if(!k)throw 8;pc=C[--k];break;
case 64:a=p();if(a<0||a>255)throw 6;q(M[a]);break;
case 65:a=p();b=p();if(a<0||a>255)throw 6;M[a]=b;break;
case 80:v=p();d=o+v;if(d.length>65536)throw 11;o=d;break;
case 81:v=p();if(o.length>65535)throw 11;o+=String.fromCharCode(v&255);break;
case 82:q(i<B.length?B[i++]:-1);break;
case 83:v=p();return[o,v&255];
default:throw 5;
}}}catch(e){return[o,e]}}
for(const d of F.readdirSync(I)){
const b=I+'/'+d,P=F.readFileSync(b+'/program.bin'),B=F.readFileSync(b+'/input.bin');
const[r,e]=V(P,B),w=O+'/'+d;
F.mkdirSync(w,{recursive:true});
F.writeFileSync(w+'/stdout.bin',Buffer.from(r,'latin1'));
F.writeFileSync(w+'/exit.txt',e+'');
}