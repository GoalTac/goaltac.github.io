import{w as Ce,i as Y}from"./hey-listen.a7ce0d1d.js";import{i as H,r as L,j as Ne,c as ce,e as ie}from"./style-value-types.c3f9dfc8.js";function le(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,s=Object.getOwnPropertySymbols(e);o<s.length;o++)t.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(e,s[o])&&(n[s[o]]=e[s[o]]);return n}const V=(e,t,n)=>Math.min(Math.max(n,e),t),k=.001,Pe=.01,X=10,_e=.05,ke=1;function Be({duration:e=800,bounce:t=.25,velocity:n=0,mass:s=1}){let o,a;Ce(e<=X*1e3);let r=1-t;r=V(_e,ke,r),e=V(Pe,X,e/1e3),r<1?(o=i=>{const f=i*r,d=f*e,M=f-n,O=z(i,r),g=Math.exp(-d);return k-M/O*g},a=i=>{const d=i*r*e,M=d*n+n,O=Math.pow(r,2)*Math.pow(i,2)*e,g=Math.exp(-d),S=z(Math.pow(i,2),r);return(-o(i)+k>0?-1:1)*((M-O)*g)/S}):(o=i=>{const f=Math.exp(-i*e),d=(i-n)*e+1;return-k+f*d},a=i=>{const f=Math.exp(-i*e),d=(n-i)*(e*e);return f*d});const l=5/e,c=Le(o,a,l);if(e=e*1e3,isNaN(c))return{stiffness:100,damping:10,duration:e};{const i=Math.pow(c,2)*s;return{stiffness:i,damping:r*2*Math.sqrt(s*i),duration:e}}}const He=12;function Le(e,t,n){let s=n;for(let o=1;o<He;o++)s=s-e(s)/t(s);return s}function z(e,t){return e*Math.sqrt(1-t*t)}const Ve=["duration","bounce"],ze=["stiffness","damping","mass"];function ee(e,t){return t.some(n=>e[n]!==void 0)}function qe(e){let t=Object.assign({velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1},e);if(!ee(e,ze)&&ee(e,Ve)){const n=Be(e);t=Object.assign(Object.assign(Object.assign({},t),n),{velocity:0,mass:1}),t.isResolvedFromDuration=!0}return t}function $(e){var{from:t=0,to:n=1,restSpeed:s=2,restDelta:o}=e,a=le(e,["from","to","restSpeed","restDelta"]);const r={done:!1,value:t};let{stiffness:l,damping:c,mass:i,velocity:f,duration:d,isResolvedFromDuration:M}=qe(a),O=te,g=te;function S(){const b=f?-(f/1e3):0,y=n-t,m=c/(2*Math.sqrt(l*i)),u=Math.sqrt(l/i)/1e3;if(o===void 0&&(o=Math.min(Math.abs(n-t)/100,.4)),m<1){const p=z(u,m);O=h=>{const x=Math.exp(-m*u*h);return n-x*((b+m*u*y)/p*Math.sin(p*h)+y*Math.cos(p*h))},g=h=>{const x=Math.exp(-m*u*h);return m*u*x*(Math.sin(p*h)*(b+m*u*y)/p+y*Math.cos(p*h))-x*(Math.cos(p*h)*(b+m*u*y)-p*y*Math.sin(p*h))}}else if(m===1)O=p=>n-Math.exp(-u*p)*(y+(b+u*y)*p);else{const p=u*Math.sqrt(m*m-1);O=h=>{const x=Math.exp(-m*u*h),v=Math.min(p*h,300);return n-x*((b+m*u*y)*Math.sinh(v)+p*y*Math.cosh(v))/p}}}return S(),{next:b=>{const y=O(b);if(M)r.done=b>=d;else{const m=g(b)*1e3,u=Math.abs(m)<=s,p=Math.abs(n-y)<=o;r.done=u&&p}return r.value=r.done?n:y,r},flipTarget:()=>{f=-f,[t,n]=[n,t],S()}}}$.needsInterpolation=(e,t)=>typeof e=="string"||typeof t=="string";const te=e=>0,ue=(e,t,n)=>{const s=t-e;return s===0?1:(n-e)/s},J=(e,t,n)=>-n*e+n*t+e;function B(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function ne({hue:e,saturation:t,lightness:n,alpha:s}){e/=360,t/=100,n/=100;let o=0,a=0,r=0;if(!t)o=a=r=n;else{const l=n<.5?n*(1+t):n+t-n*t,c=2*n-l;o=B(c,l,e+1/3),a=B(c,l,e),r=B(c,l,e-1/3)}return{red:Math.round(o*255),green:Math.round(a*255),blue:Math.round(r*255),alpha:s}}const Ue=(e,t,n)=>{const s=e*e,o=t*t;return Math.sqrt(Math.max(0,n*(o-s)+s))},Ke=[Ne,L,H],se=e=>Ke.find(t=>t.test(e)),fe=(e,t)=>{let n=se(e),s=se(t),o=n.parse(e),a=s.parse(t);n===H&&(o=ne(o),n=L),s===H&&(a=ne(a),s=L);const r=Object.assign({},o);return l=>{for(const c in r)c!=="alpha"&&(r[c]=Ue(o[c],a[c],l));return r.alpha=J(o.alpha,a.alpha,l),n.transform(r)}},q=e=>typeof e=="number",Ge=(e,t)=>n=>t(e(n)),pe=(...e)=>e.reduce(Ge);function de(e,t){return q(e)?n=>J(e,t,n):ie.test(e)?fe(e,t):me(e,t)}const he=(e,t)=>{const n=[...e],s=n.length,o=e.map((a,r)=>de(a,t[r]));return a=>{for(let r=0;r<s;r++)n[r]=o[r](a);return n}},We=(e,t)=>{const n=Object.assign(Object.assign({},e),t),s={};for(const o in n)e[o]!==void 0&&t[o]!==void 0&&(s[o]=de(e[o],t[o]));return o=>{for(const a in s)n[a]=s[a](o);return n}};function re(e){const t=ce.parse(e),n=t.length;let s=0,o=0,a=0;for(let r=0;r<n;r++)s||typeof t[r]=="number"?s++:t[r].hue!==void 0?a++:o++;return{parsed:t,numNumbers:s,numRGB:o,numHSL:a}}const me=(e,t)=>{const n=ce.createTransformer(t),s=re(e),o=re(t);return s.numHSL===o.numHSL&&s.numRGB===o.numRGB&&s.numNumbers>=o.numNumbers?pe(he(s.parsed,o.parsed),n):r=>`${r>0?t:e}`},$e=(e,t)=>n=>J(e,t,n);function Je(e){if(typeof e=="number")return $e;if(typeof e=="string")return ie.test(e)?fe:me;if(Array.isArray(e))return he;if(typeof e=="object")return We}function Qe(e,t,n){const s=[],o=n||Je(e[0]),a=e.length-1;for(let r=0;r<a;r++){let l=o(e[r],e[r+1]);if(t){const c=Array.isArray(t)?t[r]:t;l=pe(c,l)}s.push(l)}return s}function Ze([e,t],[n]){return s=>n(ue(e,t,s))}function Ye(e,t){const n=e.length,s=n-1;return o=>{let a=0,r=!1;if(o<=e[0]?r=!0:o>=e[s]&&(a=s-1,r=!0),!r){let c=1;for(;c<n&&!(e[c]>o||c===s);c++);a=c-1}const l=ue(e[a],e[a+1],o);return t[a](l)}}function ye(e,t,{clamp:n=!0,ease:s,mixer:o}={}){const a=e.length;Y(a===t.length),Y(!s||!Array.isArray(s)||s.length===a-1),e[0]>e[a-1]&&(e=[].concat(e),t=[].concat(t),e.reverse(),t.reverse());const r=Qe(t,s,o),l=a===2?Ze(e,r):Ye(e,r);return n?c=>l(V(e[0],e[a-1],c)):l}const N=e=>t=>1-e(1-t),Q=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,Xe=e=>t=>Math.pow(t,e),ge=e=>t=>t*t*((e+1)*t-e),et=e=>{const t=ge(e);return n=>(n*=2)<1?.5*t(n):.5*(2-Math.pow(2,-10*(n-1)))},be=1.525,tt=4/11,nt=8/11,st=9/10,rt=e=>e,Me=Xe(2),kt=N(Me),ot=Q(Me),at=e=>1-Math.sin(Math.acos(e)),ct=N(at),Bt=Q(ct),xe=ge(be),Ht=N(xe),Lt=Q(xe),Vt=et(be),it=4356/361,lt=35442/1805,ut=16061/1805,U=e=>{if(e===1||e===0)return e;const t=e*e;return e<tt?7.5625*t:e<nt?9.075*t-9.9*e+3.4:e<st?it*t-lt*e+ut:10.8*e*e-20.52*e+10.72},zt=N(U),qt=e=>e<.5?.5*(1-U(1-e*2)):.5*U(e*2-1)+.5;function ft(e,t){return e.map(()=>t||ot).splice(0,e.length-1)}function pt(e){const t=e.length;return e.map((n,s)=>s!==0?s/(t-1):0)}function dt(e,t){return e.map(n=>n*t)}function A({from:e=0,to:t=1,ease:n,offset:s,duration:o=300}){const a={done:!1,value:e},r=Array.isArray(t)?t:[e,t],l=dt(s&&s.length===r.length?s:pt(r),o);function c(){return ye(l,r,{ease:Array.isArray(n)?n:ft(r,n)})}let i=c();return{next:f=>(a.value=i(f),a.done=f>=o,a),flipTarget:()=>{r.reverse(),i=c()}}}function ht({velocity:e=0,from:t=0,power:n=.8,timeConstant:s=350,restDelta:o=.5,modifyTarget:a}){const r={done:!1,value:t};let l=n*e;const c=t+l,i=a===void 0?c:a(c);return i!==c&&(l=i-t),{next:f=>{const d=-l*Math.exp(-f/s);return r.done=!(d>o||d<-o),r.value=r.done?i:i+d,r},flipTarget:()=>{}}}const oe={keyframes:A,spring:$,decay:ht};function mt(e){if(Array.isArray(e.to))return A;if(oe[e.type])return oe[e.type];const t=new Set(Object.keys(e));return t.has("ease")||t.has("duration")&&!t.has("dampingRatio")?A:t.has("dampingRatio")||t.has("stiffness")||t.has("mass")||t.has("damping")||t.has("restSpeed")||t.has("restDelta")?$:A}const Oe=1/60*1e3,yt=typeof performance<"u"?()=>performance.now():()=>Date.now(),Se=typeof window<"u"?e=>window.requestAnimationFrame(e):e=>setTimeout(()=>e(yt()),Oe);function gt(e){let t=[],n=[],s=0,o=!1,a=!1;const r=new WeakSet,l={schedule:(c,i=!1,f=!1)=>{const d=f&&o,M=d?t:n;return i&&r.add(c),M.indexOf(c)===-1&&(M.push(c),d&&o&&(s=t.length)),c},cancel:c=>{const i=n.indexOf(c);i!==-1&&n.splice(i,1),r.delete(c)},process:c=>{if(o){a=!0;return}if(o=!0,[t,n]=[n,t],n.length=0,s=t.length,s)for(let i=0;i<s;i++){const f=t[i];f(c),r.has(f)&&(l.schedule(f),e())}o=!1,a&&(a=!1,l.process(c))}};return l}const bt=40;let K=!0,D=!1,G=!1;const T={delta:0,timestamp:0},R=["read","update","preRender","render","postRender"],P=R.reduce((e,t)=>(e[t]=gt(()=>D=!0),e),{}),Mt=R.reduce((e,t)=>{const n=P[t];return e[t]=(s,o=!1,a=!1)=>(D||St(),n.schedule(s,o,a)),e},{}),xt=R.reduce((e,t)=>(e[t]=P[t].cancel,e),{});R.reduce((e,t)=>(e[t]=()=>P[t].process(T),e),{});const Ot=e=>P[e].process(T),ve=e=>{D=!1,T.delta=K?Oe:Math.max(Math.min(e-T.timestamp,bt),1),T.timestamp=e,G=!0,R.forEach(Ot),G=!1,D&&(K=!1,Se(ve))},St=()=>{D=!0,K=!0,G||Se(ve)},vt=()=>T;function we(e,t,n=0){return e-t-n}function wt(e,t,n=0,s=!0){return s?we(t+-e,t,n):t-(e-t)+n}function Tt(e,t,n,s){return s?e>=t+n:e<=-n}const Dt=e=>{const t=({delta:n})=>e(n);return{start:()=>Mt.update(t,!0),stop:()=>xt.update(t)}};function Rt(e){var t,n,{from:s,autoplay:o=!0,driver:a=Dt,elapsed:r=0,repeat:l=0,repeatType:c="loop",repeatDelay:i=0,onPlay:f,onStop:d,onComplete:M,onRepeat:O,onUpdate:g}=e,S=le(e,["from","autoplay","driver","elapsed","repeat","repeatType","repeatDelay","onPlay","onStop","onComplete","onRepeat","onUpdate"]);let{to:b}=S,y,m=0,u=S.duration,p,h=!1,x=!0,v;const I=mt(S);!((n=(t=I).needsInterpolation)===null||n===void 0)&&n.call(t,s,b)&&(v=ye([0,100],[s,b],{clamp:!1}),s=0,b=100);const w=I(Object.assign(Object.assign({},S),{from:s,to:b}));function Ee(){m++,c==="reverse"?(x=m%2===0,r=wt(r,u,i,x)):(r=we(r,u,i),c==="mirror"&&w.flipTarget()),h=!1,O&&O()}function Fe(){y.stop(),M&&M()}function Ae(_){if(x||(_=-_),r+=_,!h){const Z=w.next(Math.max(0,r));p=Z.value,v&&(p=v(p)),h=x?Z.done:r<=0}g==null||g(p),h&&(m===0&&(u!=null||(u=r)),m<l?Tt(r,u,i,x)&&Ee():Fe())}function je(){f==null||f(),y=a(Ae),y.start()}return o&&je(),{stop:()=>{d==null||d(),y.stop()}}}function It(e,t){return t?e*(1e3/t):0}function Ut({from:e=0,velocity:t=0,min:n,max:s,power:o=.8,timeConstant:a=750,bounceStiffness:r=500,bounceDamping:l=10,restDelta:c=1,modifyTarget:i,driver:f,onUpdate:d,onComplete:M,onStop:O}){let g;function S(u){return n!==void 0&&u<n||s!==void 0&&u>s}function b(u){return n===void 0?s:s===void 0||Math.abs(n-u)<Math.abs(s-u)?n:s}function y(u){g==null||g.stop(),g=Rt(Object.assign(Object.assign({},u),{driver:f,onUpdate:p=>{var h;d==null||d(p),(h=u.onUpdate)===null||h===void 0||h.call(u,p)},onComplete:M,onStop:O}))}function m(u){y(Object.assign({type:"spring",stiffness:r,damping:l,restDelta:c},u))}if(S(e))m({from:e,velocity:t,to:b(e)});else{let u=o*t+e;typeof i<"u"&&(u=i(u));const p=b(u),h=p===n?-1:1;let x,v;const I=w=>{x=v,v=w,t=It(w-x,vt().delta),(h===1&&w>p||h===-1&&w<p)&&m({from:w,to:p,velocity:t})};y({type:"decay",from:e,velocity:t,timeConstant:a,power:o,restDelta:c,modifyTarget:i,onUpdate:S(u)?I:void 0})}return{stop:()=>g==null?void 0:g.stop()}}const W=e=>e.hasOwnProperty("x")&&e.hasOwnProperty("y"),ae=e=>W(e)&&e.hasOwnProperty("z"),E=(e,t)=>Math.abs(e-t);function Kt(e,t){if(q(e)&&q(t))return E(e,t);if(W(e)&&W(t)){const n=E(e.x,t.x),s=E(e.y,t.y),o=ae(e)&&ae(t)?E(e.z,t.z):0;return Math.sqrt(Math.pow(n,2)+Math.pow(s,2)+Math.pow(o,2))}}const Te=(e,t)=>1-3*t+3*e,De=(e,t)=>3*t-6*e,Re=e=>3*e,C=(e,t,n)=>((Te(t,n)*e+De(t,n))*e+Re(t))*e,Ie=(e,t,n)=>3*Te(t,n)*e*e+2*De(t,n)*e+Re(t),Et=1e-7,Ft=10;function At(e,t,n,s,o){let a,r,l=0;do r=t+(n-t)/2,a=C(r,s,o)-e,a>0?n=r:t=r;while(Math.abs(a)>Et&&++l<Ft);return r}const jt=8,Ct=.001;function Nt(e,t,n,s){for(let o=0;o<jt;++o){const a=Ie(t,n,s);if(a===0)return t;const r=C(t,n,s)-e;t-=r/a}return t}const j=11,F=1/(j-1);function Gt(e,t,n,s){if(e===t&&n===s)return rt;const o=new Float32Array(j);for(let r=0;r<j;++r)o[r]=C(r*F,e,n);function a(r){let l=0,c=1;const i=j-1;for(;c!==i&&o[c]<=r;++c)l+=F;--c;const f=(r-o[c])/(o[c+1]-o[c]),d=l+f*F,M=Ie(d,e,n);return M>=Ct?Nt(r,d,e,n):M===0?d:At(r,l,l+F,e,n)}return r=>r===0||r===1?r:C(a(r),t,s)}export{ot as a,kt as b,Gt as c,at as d,Me as e,Bt as f,ct as g,xe as h,Lt as i,Ht as j,Vt as k,rt as l,zt as m,qt as n,U as o,pe as p,Ut as q,Rt as r,Kt as s,J as t,ue as u,It as v,V as w};
