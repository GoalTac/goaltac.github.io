const O=(t,s)=>e=>Math.max(Math.min(e,s),t),u=t=>t%1?Number(t.toFixed(5)):t,p=/(-)?([\d]*\.?[\d])+/g,d=/(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi,k=/^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;function f(t){return typeof t=="string"}const b={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},y=Object.assign(Object.assign({},b),{transform:O(0,1)}),V=Object.assign(Object.assign({},b),{default:1}),m=t=>({test:s=>f(s)&&s.endsWith(t)&&s.split(" ").length===1,parse:parseFloat,transform:s=>`${s}${t}`}),W=m("deg"),i=m("%"),B=m("px"),H=m("vh"),Z=m("vw"),q=Object.assign(Object.assign({},i),{parse:t=>i.parse(t)/100,transform:t=>i.transform(t*100)}),j=(t,s)=>e=>Boolean(f(e)&&k.test(e)&&e.startsWith(t)||s&&Object.prototype.hasOwnProperty.call(e,s)),F=(t,s,e)=>r=>{if(!f(r))return r;const[n,o,c,a]=r.match(p);return{[t]:parseFloat(n),[s]:parseFloat(o),[e]:parseFloat(c),alpha:a!==void 0?parseFloat(a):1}},g={test:j("hsl","hue"),parse:F("hue","saturation","lightness"),transform:({hue:t,saturation:s,lightness:e,alpha:r=1})=>"hsla("+Math.round(t)+", "+i.transform(u(s))+", "+i.transform(u(e))+", "+u(y.transform(r))+")"},I=O(0,255),h=Object.assign(Object.assign({},b),{transform:t=>Math.round(I(t))}),l={test:j("rgb","red"),parse:F("red","green","blue"),transform:({red:t,green:s,blue:e,alpha:r=1})=>"rgba("+h.transform(t)+", "+h.transform(s)+", "+h.transform(e)+", "+u(y.transform(r))+")"};function M(t){let s="",e="",r="",n="";return t.length>5?(s=t.substr(1,2),e=t.substr(3,2),r=t.substr(5,2),n=t.substr(7,2)):(s=t.substr(1,1),e=t.substr(2,1),r=t.substr(3,1),n=t.substr(4,1),s+=s,e+=e,r+=r,n+=n),{red:parseInt(s,16),green:parseInt(e,16),blue:parseInt(r,16),alpha:n?parseInt(n,16)/255:1}}const x={test:j("#"),parse:M,transform:l.transform},w={test:t=>l.test(t)||x.test(t)||g.test(t),parse:t=>l.test(t)?l.parse(t):g.test(t)?g.parse(t):x.parse(t),transform:t=>f(t)?t:t.hasOwnProperty("red")?l.transform(t):g.transform(t)},N="${c}",$="${n}";function _(t){var s,e,r,n;return isNaN(t)&&f(t)&&((e=(s=t.match(p))===null||s===void 0?void 0:s.length)!==null&&e!==void 0?e:0)+((n=(r=t.match(d))===null||r===void 0?void 0:r.length)!==null&&n!==void 0?n:0)>0}function C(t){typeof t=="number"&&(t=`${t}`);const s=[];let e=0;const r=t.match(d);r&&(e=r.length,t=t.replace(d,N),s.push(...r.map(w.parse)));const n=t.match(p);return n&&(t=t.replace(p,$),s.push(...n.map(b.parse))),{values:s,numColors:e,tokenised:t}}function R(t){return C(t).values}function T(t){const{values:s,numColors:e,tokenised:r}=C(t),n=s.length;return o=>{let c=r;for(let a=0;a<n;a++)c=c.replace(a<e?N:$,a<e?w.transform(o[a]):u(o[a]));return c}}const S=t=>typeof t=="number"?0:t;function U(t){const s=R(t);return T(t)(s.map(S))}const z={test:_,parse:R,createTransformer:T,getAnimatableNone:U},A=new Set(["brightness","contrast","saturate","opacity"]);function D(t){let[s,e]=t.slice(0,-1).split("(");if(s==="drop-shadow")return t;const[r]=e.match(p)||[];if(!r)return t;const n=e.replace(r,"");let o=A.has(s)?1:0;return r!==e&&(o*=100),s+"("+o+n+")"}const P=/([a-z-]*)\(.*?\)/g,E=Object.assign(Object.assign({},z),{getAnimatableNone:t=>{const s=t.match(P);return s?s.map(D).join(" "):t}});export{y as a,q as b,z as c,W as d,w as e,E as f,i as g,H as h,g as i,x as j,b as n,B as p,l as r,V as s,Z as v};
