function T(r,e,...t){if(k()&&e===void 0)throw new Error("invariant requires an error message argument");if(!r){let n;if(e===void 0)n=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{let s=0;n=new Error(e.replace(/%s/g,function(){return t[s++]})),n.name="Invariant Violation"}throw n.framesToPop=1,n}}function k(){return typeof process<"u"&&process.env.NODE_ENV==="production"}const h=typeof global<"u"?global:self,c=h.MutationObserver||h.WebKitMutationObserver;function f(r){return function(){const t=setTimeout(s,0),n=setInterval(s,50);function s(){clearTimeout(t),clearInterval(n),r()}}}function v(r){let e=1;const t=new c(r),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){e=-e,n.data=e}}const w=typeof c=="function"?v:f;class y{enqueueTask(e){const{queue:t,requestFlush:n}=this;t.length||(n(),this.flushing=!0),t[t.length]=e}constructor(){this.queue=[],this.pendingErrors=[],this.flushing=!1,this.index=0,this.capacity=1024,this.flush=()=>{const{queue:e}=this;for(;this.index<e.length;){const t=this.index;if(this.index++,e[t].call(),this.index>this.capacity){for(let n=0,s=e.length-this.index;n<s;n++)e[n]=e[n+this.index];e.length-=this.index,this.index=0}}e.length=0,this.index=0,this.flushing=!1},this.registerPendingError=e=>{this.pendingErrors.push(e),this.requestErrorThrow()},this.requestFlush=w(this.flush),this.requestErrorThrow=f(()=>{if(this.pendingErrors.length)throw this.pendingErrors.shift()})}}class q{call(){try{this.task&&this.task()}catch(e){this.onError(e)}finally{this.task=null,this.release(this)}}constructor(e,t){this.onError=e,this.release=t,this.task=null}}class E{create(e){const t=this.freeTasks,n=t.length?t.pop():new q(this.onError,s=>t[t.length]=s);return n.task=e,n}constructor(e){this.onError=e,this.freeTasks=[]}}const d=new y,x=new E(d.registerPendingError);function m(r){d.enqueueTask(x.create(r))}function O(r,e,t,n){let s=t?t.call(n,r,e):void 0;if(s!==void 0)return!!s;if(r===e)return!0;if(typeof r!="object"||!r||typeof e!="object"||!e)return!1;const o=Object.keys(r),g=Object.keys(e);if(o.length!==g.length)return!1;const p=Object.prototype.hasOwnProperty.bind(e);for(let a=0;a<o.length;a++){const i=o[a];if(!p(i))return!1;const l=r[i],u=e[i];if(s=t?t.call(n,l,u,i):void 0,s===!1||s===void 0&&l!==u)return!1}return!0}export{m as a,T as i,O as s};