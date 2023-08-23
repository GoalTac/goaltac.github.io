import{r as i}from"./react.03111c44.js";import{f as _,z as Q,R as $}from"./react-remove-scroll-bar.c8544b6f.js";import{a as q,e as G}from"./use-sidecar.8e78d81f.js";import{a as A,F as I,j as B}from"./@chakra-ui.79b255d4.js";import{u as J}from"./use-callback-ref.5559999b.js";import{s as K}from"./react-style-singleton.2fafa2f7.js";var p=function(){return p=Object.assign||function(r){for(var n,t=1,o=arguments.length;t<o;t++){n=arguments[t];for(var c in n)Object.prototype.hasOwnProperty.call(n,c)&&(r[c]=n[c])}return r},p.apply(this,arguments)};function U(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n}function ee(e,r,n){if(n||arguments.length===2)for(var t=0,o=r.length,c;t<o;t++)(c||!(t in r))&&(c||(c=Array.prototype.slice.call(r,0,t)),c[t]=r[t]);return e.concat(c||Array.prototype.slice.call(r))}var H=q(),j=function(){},N=i.exports.forwardRef(function(e,r){var n=i.exports.useRef(null),t=i.exports.useState({onScrollCapture:j,onWheelCapture:j,onTouchMoveCapture:j}),o=t[0],c=t[1],f=e.forwardProps,u=e.children,m=e.className,S=e.removeScrollBar,b=e.enabled,y=e.shards,C=e.sideCar,w=e.noIsolation,R=e.inert,a=e.allowPinchZoom,l=e.as,d=l===void 0?"div":l,h=e.gapMode,v=U(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),g=C,s=J([n,r]),x=p(p({},v),o);return A(I,{children:[b&&B(g,{sideCar:H,removeScrollBar:S,shards:y,noIsolation:w,inert:R,setCallbacks:c,allowPinchZoom:!!a,lockRef:n,gapMode:h}),f?i.exports.cloneElement(i.exports.Children.only(u),p(p({},x),{ref:s})):B(d,{...p({},x,{className:m,ref:s}),children:u})]})});N.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};N.classNames={fullWidth:_,zeroRight:Q};var O=!1;if(typeof window<"u")try{var M=Object.defineProperty({},"passive",{get:function(){return O=!0,!0}});window.addEventListener("test",M,M),window.removeEventListener("test",M,M)}catch{O=!1}var E=O?{passive:!1}:!1,re=function(e){return e.tagName==="TEXTAREA"},V=function(e,r){var n=window.getComputedStyle(e);return n[r]!=="hidden"&&!(n.overflowY===n.overflowX&&!re(e)&&n[r]==="visible")},te=function(e){return V(e,"overflowY")},ae=function(e){return V(e,"overflowX")},Y=function(e,r){var n=r.ownerDocument,t=r;do{typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&(t=t.host);var o=Z(e,t);if(o){var c=F(e,t),f=c[1],u=c[2];if(f>u)return!0}t=t.parentNode}while(t&&t!==n.body);return!1},ne=function(e){var r=e.scrollTop,n=e.scrollHeight,t=e.clientHeight;return[r,n,t]},oe=function(e){var r=e.scrollLeft,n=e.scrollWidth,t=e.clientWidth;return[r,n,t]},Z=function(e,r){return e==="v"?te(r):ae(r)},F=function(e,r){return e==="v"?ne(r):oe(r)},le=function(e,r){return e==="h"&&r==="rtl"?-1:1},ce=function(e,r,n,t,o){var c=le(e,window.getComputedStyle(r).direction),f=c*t,u=n.target,m=r.contains(u),S=!1,b=f>0,y=0,C=0;do{var w=F(e,u),R=w[0],a=w[1],l=w[2],d=a-l-c*R;(R||d)&&Z(e,u)&&(y+=d,C+=R),u=u.parentNode}while(!m&&u!==document.body||m&&(r.contains(u)||r===u));return(b&&(o&&y===0||!o&&f>y)||!b&&(o&&C===0||!o&&-f>C))&&(S=!0),S},T=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},D=function(e){return[e.deltaX,e.deltaY]},W=function(e){return e&&"current"in e?e.current:e},ie=function(e,r){return e[0]===r[0]&&e[1]===r[1]},ue=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},se=0,k=[];function fe(e){var r=i.exports.useRef([]),n=i.exports.useRef([0,0]),t=i.exports.useRef(),o=i.exports.useState(se++)[0],c=i.exports.useState(K)[0],f=i.exports.useRef(e);i.exports.useEffect(function(){f.current=e},[e]),i.exports.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var a=ee([e.lockRef.current],(e.shards||[]).map(W),!0).filter(Boolean);return a.forEach(function(l){return l.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),a.forEach(function(l){return l.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var u=i.exports.useCallback(function(a,l){if("touches"in a&&a.touches.length===2)return!f.current.allowPinchZoom;var d=T(a),h=n.current,v="deltaX"in a?a.deltaX:h[0]-d[0],g="deltaY"in a?a.deltaY:h[1]-d[1],s,x=a.target,P=Math.abs(v)>Math.abs(g)?"h":"v";if("touches"in a&&P==="h"&&x.type==="range")return!1;var L=Y(P,x);if(!L)return!0;if(L?s=P:(s=P==="v"?"h":"v",L=Y(P,x)),!L)return!1;if(!t.current&&"changedTouches"in a&&(v||g)&&(t.current=s),!s)return!0;var X=t.current||s;return ce(X,l,a,X==="h"?v:g,!0)},[]),m=i.exports.useCallback(function(a){var l=a;if(!(!k.length||k[k.length-1]!==c)){var d="deltaY"in l?D(l):T(l),h=r.current.filter(function(s){return s.name===l.type&&s.target===l.target&&ie(s.delta,d)})[0];if(h&&h.should){l.cancelable&&l.preventDefault();return}if(!h){var v=(f.current.shards||[]).map(W).filter(Boolean).filter(function(s){return s.contains(l.target)}),g=v.length>0?u(l,v[0]):!f.current.noIsolation;g&&l.cancelable&&l.preventDefault()}}},[]),S=i.exports.useCallback(function(a,l,d,h){var v={name:a,delta:l,target:d,should:h};r.current.push(v),setTimeout(function(){r.current=r.current.filter(function(g){return g!==v})},1)},[]),b=i.exports.useCallback(function(a){n.current=T(a),t.current=void 0},[]),y=i.exports.useCallback(function(a){S(a.type,D(a),a.target,u(a,e.lockRef.current))},[]),C=i.exports.useCallback(function(a){S(a.type,T(a),a.target,u(a,e.lockRef.current))},[]);i.exports.useEffect(function(){return k.push(c),e.setCallbacks({onScrollCapture:y,onWheelCapture:y,onTouchMoveCapture:C}),document.addEventListener("wheel",m,E),document.addEventListener("touchmove",m,E),document.addEventListener("touchstart",b,E),function(){k=k.filter(function(a){return a!==c}),document.removeEventListener("wheel",m,E),document.removeEventListener("touchmove",m,E),document.removeEventListener("touchstart",b,E)}},[]);var w=e.removeScrollBar,R=e.inert;return A(I,{children:[R?B(c,{styles:ue(o)}):null,w?B($,{gapMode:e.gapMode}):null]})}const de=G(H,fe);var z=i.exports.forwardRef(function(e,r){return B(N,{...p({},e,{ref:r,sideCar:de})})});z.classNames=N.classNames;const pe=z;export{pe as R};