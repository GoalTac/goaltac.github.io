import{r as s}from"./react.03111c44.js";import{i as v,g as w,r as j,j as B,p as T,m as Q,A as K,s as _,a as Y,c as Z,b as M}from"./@remix-run.2d8c01ab.js";import{j as h,a as A,F as H}from"./@chakra-ui.79b255d4.js";/**
 * React Router v6.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},N.apply(this,arguments)}const I=s.exports.createContext(null),ee=s.exports.createContext(null),R=s.exports.createContext(null),L=s.exports.createContext(null),g=s.exports.createContext({outlet:null,matches:[],isDataRoute:!1}),z=s.exports.createContext(null);function te(e,t){let{relative:r}=t===void 0?{}:t;E()||v(!1);let{basename:n,navigator:a}=s.exports.useContext(R),{hash:o,pathname:i,search:c}=G(e,{relative:r}),l=i;return n!=="/"&&(l=i==="/"?n:B([n,i])),a.createHref({pathname:l,search:c,hash:o})}function E(){return s.exports.useContext(L)!=null}function P(){return E()||v(!1),s.exports.useContext(L).location}function W(e){s.exports.useContext(R).static||s.exports.useLayoutEffect(e)}function $(){let{isDataRoute:e}=s.exports.useContext(g);return e?xe():re()}function re(){E()||v(!1);let e=s.exports.useContext(I),{basename:t,navigator:r}=s.exports.useContext(R),{matches:n}=s.exports.useContext(g),{pathname:a}=P(),o=JSON.stringify(w(n).map(l=>l.pathnameBase)),i=s.exports.useRef(!1);return W(()=>{i.current=!0}),s.exports.useCallback(function(l,u){if(u===void 0&&(u={}),!i.current)return;if(typeof l=="number"){r.go(l);return}let p=j(l,JSON.parse(o),a,u.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:B([t,p.pathname])),(u.replace?r.replace:r.push)(p,u.state,u)},[t,r,o,a,e])}const ne=s.exports.createContext(null);function oe(e){let t=s.exports.useContext(g).outlet;return t&&h(ne.Provider,{value:e,children:t})}function Oe(){let{matches:e}=s.exports.useContext(g),t=e[e.length-1];return t?t.params:{}}function G(e,t){let{relative:r}=t===void 0?{}:t,{matches:n}=s.exports.useContext(g),{pathname:a}=P(),o=JSON.stringify(w(n).map(i=>i.pathnameBase));return s.exports.useMemo(()=>j(e,JSON.parse(o),a,r==="path"),[e,o,a,r])}function ae(e,t){return se(e,t)}function se(e,t,r){E()||v(!1);let{navigator:n}=s.exports.useContext(R),{matches:a}=s.exports.useContext(g),o=a[a.length-1],i=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let l=P(),u;if(t){var p;let f=typeof t=="string"?T(t):t;c==="/"||((p=f.pathname)==null?void 0:p.startsWith(c))||v(!1),u=f}else u=l;let x=u.pathname||"/",C=c==="/"?x:x.slice(c.length)||"/",m=Q(e,{pathname:C}),d=pe(m&&m.map(f=>Object.assign({},f,{params:Object.assign({},i,f.params),pathname:B([c,n.encodeLocation?n.encodeLocation(f.pathname).pathname:f.pathname]),pathnameBase:f.pathnameBase==="/"?c:B([c,n.encodeLocation?n.encodeLocation(f.pathnameBase).pathname:f.pathnameBase])})),a,r);return t&&d?h(L.Provider,{value:{location:N({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:K.Pop},children:d}):d}function le(){let e=ve(),t=Y(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null;return A(H,{children:[h("h2",{children:"Unexpected Application Error!"}),h("h3",{style:{fontStyle:"italic"},children:t}),r?h("pre",{style:{padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},children:r}):null,null]})}const ie=h(le,{});class ue extends s.exports.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error||r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error?h(g.Provider,{value:this.props.routeContext,children:h(z.Provider,{value:this.state.error,children:this.props.component})}):this.props.children}}function ce(e){let{routeContext:t,match:r,children:n}=e,a=s.exports.useContext(I);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),h(g.Provider,{value:t,children:n})}function pe(e,t,r){var n;if(t===void 0&&(t=[]),r===void 0&&(r=null),e==null){var a;if((a=r)!=null&&a.errors)e=r.matches;else return null}let o=e,i=(n=r)==null?void 0:n.errors;if(i!=null){let c=o.findIndex(l=>l.route.id&&(i==null?void 0:i[l.route.id]));c>=0||v(!1),o=o.slice(0,Math.min(o.length,c+1))}return o.reduceRight((c,l,u)=>{let p=l.route.id?i==null?void 0:i[l.route.id]:null,x=null;r&&(x=l.route.errorElement||ie);let C=t.concat(o.slice(0,u+1)),m=()=>{let d;return p?d=x:l.route.Component?d=s.exports.createElement(l.route.Component,null):l.route.element?d=l.route.element:d=c,h(ce,{match:l,routeContext:{outlet:c,matches:C,isDataRoute:r!=null},children:d})};return r&&(l.route.ErrorBoundary||l.route.errorElement||u===0)?h(ue,{location:r.location,revalidation:r.revalidation,component:x,error:p,children:m(),routeContext:{outlet:null,matches:C,isDataRoute:!0}}):m()},null)}var O;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate"})(O||(O={}));var b;(function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId"})(b||(b={}));function de(e){let t=s.exports.useContext(I);return t||v(!1),t}function fe(e){let t=s.exports.useContext(ee);return t||v(!1),t}function he(e){let t=s.exports.useContext(g);return t||v(!1),t}function V(e){let t=he(),r=t.matches[t.matches.length-1];return r.route.id||v(!1),r.route.id}function ve(){var e;let t=s.exports.useContext(z),r=fe(b.UseRouteError),n=V(b.UseRouteError);return t||((e=r.errors)==null?void 0:e[n])}function xe(){let{router:e}=de(O.UseNavigateStable),t=V(b.UseNavigateStable),r=s.exports.useRef(!1);return W(()=>{r.current=!0}),s.exports.useCallback(function(a,o){o===void 0&&(o={}),r.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,N({fromRouteId:t},o)))},[e,t])}function ke(e){let{to:t,replace:r,state:n,relative:a}=e;E()||v(!1);let{matches:o}=s.exports.useContext(g),{pathname:i}=P(),c=$(),l=j(t,w(o).map(p=>p.pathnameBase),i,a==="path"),u=JSON.stringify(l);return s.exports.useEffect(()=>c(JSON.parse(u),{replace:r,state:n,relative:a}),[c,u,a,r,n]),null}function we(e){return oe(e.context)}function me(e){v(!1)}function ge(e){let{basename:t="/",children:r=null,location:n,navigationType:a=K.Pop,navigator:o,static:i=!1}=e;E()&&v(!1);let c=t.replace(/^\/*/,"/"),l=s.exports.useMemo(()=>({basename:c,navigator:o,static:i}),[c,o,i]);typeof n=="string"&&(n=T(n));let{pathname:u="/",search:p="",hash:x="",state:C=null,key:m="default"}=n,d=s.exports.useMemo(()=>{let f=_(u,c);return f==null?null:{location:{pathname:f,search:p,hash:x,state:C,key:m},navigationType:a}},[c,u,p,x,C,m,a]);return d==null?null:h(R.Provider,{value:l,children:h(L.Provider,{children:r,value:d})})}function je(e){let{children:t,location:r}=e;return ae(k(t),r)}var D;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(D||(D={}));new Promise(()=>{});function k(e,t){t===void 0&&(t=[]);let r=[];return s.exports.Children.forEach(e,(n,a)=>{if(!s.exports.isValidElement(n))return;let o=[...t,a];if(n.type===s.exports.Fragment){r.push.apply(r,k(n.props.children,o));return}n.type!==me&&v(!1),!n.props.index||!n.props.children||v(!1);let i={id:n.props.id||o.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(i.children=k(n.props.children,o)),r.push(i)}),r}/**
 * React Router DOM v6.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ce(e,t){if(e==null)return{};var r={},n=Object.keys(e),a,o;for(o=0;o<n.length;o++)a=n[o],!(t.indexOf(a)>=0)&&(r[a]=e[a]);return r}function ye(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Re(e,t){return e.button===0&&(!t||t==="_self")&&!ye(e)}const Ee=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"];function Ie(e){let{basename:t,children:r,window:n}=e,a=s.exports.useRef();a.current==null&&(a.current=Z({window:n,v5Compat:!0}));let o=a.current,[i,c]=s.exports.useState({action:o.action,location:o.location});return s.exports.useLayoutEffect(()=>o.listen(c),[o]),h(ge,{basename:t,children:r,location:i.location,navigationType:i.action,navigator:o})}const be=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Pe=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Se=s.exports.forwardRef(function(t,r){let{onClick:n,relative:a,reloadDocument:o,replace:i,state:c,target:l,to:u,preventScrollReset:p}=t,x=Ce(t,Ee),{basename:C}=s.exports.useContext(R),m,d=!1;if(typeof u=="string"&&Pe.test(u)&&(m=u,be))try{let y=new URL(window.location.href),U=u.startsWith("//")?new URL(y.protocol+u):new URL(u),S=_(U.pathname,C);U.origin===y.origin&&S!=null?u=S+U.search+U.hash:d=!0}catch{}let f=te(u,{relative:a}),X=Ue(u,{replace:i,state:c,target:l,preventScrollReset:p,relative:a});function q(y){n&&n(y),y.defaultPrevented||X(y)}return h("a",{...x,href:m||f,onClick:d||o?n:q,ref:r,target:l})});var F;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(F||(F={}));var J;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(J||(J={}));function Ue(e,t){let{target:r,replace:n,state:a,preventScrollReset:o,relative:i}=t===void 0?{}:t,c=$(),l=P(),u=G(e,{relative:i});return s.exports.useCallback(p=>{if(Re(p,r)){p.preventDefault();let x=n!==void 0?n:M(l)===M(u);c(e,{replace:x,state:a,preventScrollReset:o,relative:i})}},[l,c,u,n,a,r,e,o,i])}export{Ie as B,Se as L,ke as N,we as O,je as R,P as a,Oe as b,me as c,$ as u};