import{j as M}from"./@chakra-ui.e051454b.js";import{r as s}from"./react.bd6d2c26.js";import{c as P}from"./dnd-core.fad2b7d7.js";import{i as c,s as C}from"./@react-dnd.8e87eeaf.js";import{f as y}from"./fast-deep-equal.a94972be.js";const v=s.exports.createContext({dragDropManager:void 0});function x(r,e){if(r==null)return{};var t=R(r,e),n,i;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);for(i=0;i<o.length;i++)n=o[i],!(e.indexOf(n)>=0)&&(!Object.prototype.propertyIsEnumerable.call(r,n)||(t[n]=r[n]))}return t}function R(r,e){if(r==null)return{};var t={},n=Object.keys(r),i,o;for(o=0;o<n.length;o++)i=n[o],!(e.indexOf(i)>=0)&&(t[i]=r[i]);return t}let I=0;const l=Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");var de=s.exports.memo(function(e){var{children:t}=e,n=x(e,["children"]);const[i,o]=H(n);return s.exports.useEffect(()=>{if(o){const a=T();return++I,()=>{--I===0&&(a[l]=null)}}},[]),M(v.Provider,{value:i,children:t})});function H(r){if("manager"in r)return[{dragDropManager:r.manager},!1];const e=E(r.backend,r.context,r.options,r.debugMode),t=!r.context;return[e,t]}function E(r,e=T(),t,n){const i=e;return i[l]||(i[l]={dragDropManager:P(r,e,t,n)}),i[l]}function T(){return typeof global<"u"?global:window}const u=typeof window<"u"?s.exports.useLayoutEffect:s.exports.useEffect;function k(r,e,t){const[n,i]=s.exports.useState(()=>e(r)),o=s.exports.useCallback(()=>{const a=e(r);y(n,a)||(i(a),t&&t())},[n,r,t]);return u(o),[n,o]}function N(r,e,t){const[n,i]=k(r,e,t);return u(function(){const a=r.getHandlerId();if(a!=null)return r.subscribeToStateChange(i,{handlerIds:[a]})},[r,i]),n}function O(r,e,t){return N(e,r||(()=>({})),()=>t.reconnect())}function b(r,e){const t=[...e||[]];return e==null&&typeof r!="function"&&t.push(r),s.exports.useMemo(()=>typeof r=="function"?r():r,t)}function j(r){return s.exports.useMemo(()=>r.hooks.dragSource(),[r])}function _(r){return s.exports.useMemo(()=>r.hooks.dragPreview(),[r])}let p=!1,f=!1;class A{receiveHandlerId(e){this.sourceId=e}getHandlerId(){return this.sourceId}canDrag(){c(!p,"You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return p=!0,this.internalMonitor.canDragSource(this.sourceId)}finally{p=!1}}isDragging(){if(!this.sourceId)return!1;c(!f,"You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return f=!0,this.internalMonitor.isDraggingSource(this.sourceId)}finally{f=!1}}subscribeToStateChange(e,t){return this.internalMonitor.subscribeToStateChange(e,t)}isDraggingSource(e){return this.internalMonitor.isDraggingSource(e)}isOverTarget(e,t){return this.internalMonitor.isOverTarget(e,t)}getTargetIds(){return this.internalMonitor.getTargetIds()}isSourcePublic(){return this.internalMonitor.isSourcePublic()}getSourceId(){return this.internalMonitor.getSourceId()}subscribeToOffsetChange(e){return this.internalMonitor.subscribeToOffsetChange(e)}canDragSource(e){return this.internalMonitor.canDragSource(e)}canDropOnTarget(e){return this.internalMonitor.canDropOnTarget(e)}getItemType(){return this.internalMonitor.getItemType()}getItem(){return this.internalMonitor.getItem()}getDropResult(){return this.internalMonitor.getDropResult()}didDrop(){return this.internalMonitor.didDrop()}getInitialClientOffset(){return this.internalMonitor.getInitialClientOffset()}getInitialSourceClientOffset(){return this.internalMonitor.getInitialSourceClientOffset()}getSourceClientOffset(){return this.internalMonitor.getSourceClientOffset()}getClientOffset(){return this.internalMonitor.getClientOffset()}getDifferenceFromInitialOffset(){return this.internalMonitor.getDifferenceFromInitialOffset()}constructor(e){this.sourceId=null,this.internalMonitor=e.getMonitor()}}let D=!1;class U{receiveHandlerId(e){this.targetId=e}getHandlerId(){return this.targetId}subscribeToStateChange(e,t){return this.internalMonitor.subscribeToStateChange(e,t)}canDrop(){if(!this.targetId)return!1;c(!D,"You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");try{return D=!0,this.internalMonitor.canDropOnTarget(this.targetId)}finally{D=!1}}isOver(e){return this.targetId?this.internalMonitor.isOverTarget(this.targetId,e):!1}getItemType(){return this.internalMonitor.getItemType()}getItem(){return this.internalMonitor.getItem()}getDropResult(){return this.internalMonitor.getDropResult()}didDrop(){return this.internalMonitor.didDrop()}getInitialClientOffset(){return this.internalMonitor.getInitialClientOffset()}getInitialSourceClientOffset(){return this.internalMonitor.getInitialSourceClientOffset()}getSourceClientOffset(){return this.internalMonitor.getSourceClientOffset()}getClientOffset(){return this.internalMonitor.getClientOffset()}getDifferenceFromInitialOffset(){return this.internalMonitor.getDifferenceFromInitialOffset()}constructor(e){this.targetId=null,this.internalMonitor=e.getMonitor()}}function F(r,e,t){const n=t.getRegistry(),i=n.addTarget(r,e);return[i,()=>n.removeTarget(i)]}function Y(r,e,t){const n=t.getRegistry(),i=n.addSource(r,e);return[i,()=>n.removeSource(i)]}function m(r){return r!==null&&typeof r=="object"&&Object.prototype.hasOwnProperty.call(r,"current")}function W(r){if(typeof r.type=="string")return;const e=r.type.displayName||r.type.name||"the component";throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${e} into a <div>, or turn it into a drag source or a drop target itself.`)}function G(r){return(e=null,t=null)=>{if(!s.exports.isValidElement(e)){const o=e;return r(o,t),o}const n=e;return W(n),L(n,t?o=>r(o,t):r)}}function w(r){const e={};return Object.keys(r).forEach(t=>{const n=r[t];if(t.endsWith("Ref"))e[t]=r[t];else{const i=G(n);e[t]=()=>i}}),e}function S(r,e){typeof r=="function"?r(e):r.current=e}function L(r,e){const t=r.ref;return c(typeof t!="string","Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs"),t?s.exports.cloneElement(r,{ref:n=>{S(t,n),S(e,n)}}):s.exports.cloneElement(r,{ref:e})}class V{receiveHandlerId(e){this.handlerId!==e&&(this.handlerId=e,this.reconnect())}get connectTarget(){return this.dragSource}get dragSourceOptions(){return this.dragSourceOptionsInternal}set dragSourceOptions(e){this.dragSourceOptionsInternal=e}get dragPreviewOptions(){return this.dragPreviewOptionsInternal}set dragPreviewOptions(e){this.dragPreviewOptionsInternal=e}reconnect(){const e=this.reconnectDragSource();this.reconnectDragPreview(e)}reconnectDragSource(){const e=this.dragSource,t=this.didHandlerIdChange()||this.didConnectedDragSourceChange()||this.didDragSourceOptionsChange();return t&&this.disconnectDragSource(),this.handlerId?e?(t&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragSource=e,this.lastConnectedDragSourceOptions=this.dragSourceOptions,this.dragSourceUnsubscribe=this.backend.connectDragSource(this.handlerId,e,this.dragSourceOptions)),t):(this.lastConnectedDragSource=e,t):t}reconnectDragPreview(e=!1){const t=this.dragPreview,n=e||this.didHandlerIdChange()||this.didConnectedDragPreviewChange()||this.didDragPreviewOptionsChange();if(n&&this.disconnectDragPreview(),!!this.handlerId){if(!t){this.lastConnectedDragPreview=t;return}n&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragPreview=t,this.lastConnectedDragPreviewOptions=this.dragPreviewOptions,this.dragPreviewUnsubscribe=this.backend.connectDragPreview(this.handlerId,t,this.dragPreviewOptions))}}didHandlerIdChange(){return this.lastConnectedHandlerId!==this.handlerId}didConnectedDragSourceChange(){return this.lastConnectedDragSource!==this.dragSource}didConnectedDragPreviewChange(){return this.lastConnectedDragPreview!==this.dragPreview}didDragSourceOptionsChange(){return!C(this.lastConnectedDragSourceOptions,this.dragSourceOptions)}didDragPreviewOptionsChange(){return!C(this.lastConnectedDragPreviewOptions,this.dragPreviewOptions)}disconnectDragSource(){this.dragSourceUnsubscribe&&(this.dragSourceUnsubscribe(),this.dragSourceUnsubscribe=void 0)}disconnectDragPreview(){this.dragPreviewUnsubscribe&&(this.dragPreviewUnsubscribe(),this.dragPreviewUnsubscribe=void 0,this.dragPreviewNode=null,this.dragPreviewRef=null)}get dragSource(){return this.dragSourceNode||this.dragSourceRef&&this.dragSourceRef.current}get dragPreview(){return this.dragPreviewNode||this.dragPreviewRef&&this.dragPreviewRef.current}clearDragSource(){this.dragSourceNode=null,this.dragSourceRef=null}clearDragPreview(){this.dragPreviewNode=null,this.dragPreviewRef=null}constructor(e){this.hooks=w({dragSource:(t,n)=>{this.clearDragSource(),this.dragSourceOptions=n||null,m(t)?this.dragSourceRef=t:this.dragSourceNode=t,this.reconnectDragSource()},dragPreview:(t,n)=>{this.clearDragPreview(),this.dragPreviewOptions=n||null,m(t)?this.dragPreviewRef=t:this.dragPreviewNode=t,this.reconnectDragPreview()}}),this.handlerId=null,this.dragSourceRef=null,this.dragSourceOptionsInternal=null,this.dragPreviewRef=null,this.dragPreviewOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDragSource=null,this.lastConnectedDragSourceOptions=null,this.lastConnectedDragPreview=null,this.lastConnectedDragPreviewOptions=null,this.backend=e}}class q{get connectTarget(){return this.dropTarget}reconnect(){const e=this.didHandlerIdChange()||this.didDropTargetChange()||this.didOptionsChange();e&&this.disconnectDropTarget();const t=this.dropTarget;if(!!this.handlerId){if(!t){this.lastConnectedDropTarget=t;return}e&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDropTarget=t,this.lastConnectedDropTargetOptions=this.dropTargetOptions,this.unsubscribeDropTarget=this.backend.connectDropTarget(this.handlerId,t,this.dropTargetOptions))}}receiveHandlerId(e){e!==this.handlerId&&(this.handlerId=e,this.reconnect())}get dropTargetOptions(){return this.dropTargetOptionsInternal}set dropTargetOptions(e){this.dropTargetOptionsInternal=e}didHandlerIdChange(){return this.lastConnectedHandlerId!==this.handlerId}didDropTargetChange(){return this.lastConnectedDropTarget!==this.dropTarget}didOptionsChange(){return!C(this.lastConnectedDropTargetOptions,this.dropTargetOptions)}disconnectDropTarget(){this.unsubscribeDropTarget&&(this.unsubscribeDropTarget(),this.unsubscribeDropTarget=void 0)}get dropTarget(){return this.dropTargetNode||this.dropTargetRef&&this.dropTargetRef.current}clearDropTarget(){this.dropTargetRef=null,this.dropTargetNode=null}constructor(e){this.hooks=w({dropTarget:(t,n)=>{this.clearDropTarget(),this.dropTargetOptions=n,m(t)?this.dropTargetRef=t:this.dropTargetNode=t,this.reconnect()}}),this.handlerId=null,this.dropTargetRef=null,this.dropTargetOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDropTarget=null,this.lastConnectedDropTargetOptions=null,this.backend=e}}function d(){const{dragDropManager:r}=s.exports.useContext(v);return c(r!=null,"Expected drag drop context"),r}function B(r,e){const t=d(),n=s.exports.useMemo(()=>new V(t.getBackend()),[t]);return u(()=>(n.dragSourceOptions=r||null,n.reconnect(),()=>n.disconnectDragSource()),[n,r]),u(()=>(n.dragPreviewOptions=e||null,n.reconnect(),()=>n.disconnectDragPreview()),[n,e]),n}function z(){const r=d();return s.exports.useMemo(()=>new A(r),[r])}class X{beginDrag(){const e=this.spec,t=this.monitor;let n=null;return typeof e.item=="object"?n=e.item:typeof e.item=="function"?n=e.item(t):n={},n!=null?n:null}canDrag(){const e=this.spec,t=this.monitor;return typeof e.canDrag=="boolean"?e.canDrag:typeof e.canDrag=="function"?e.canDrag(t):!0}isDragging(e,t){const n=this.spec,i=this.monitor,{isDragging:o}=n;return o?o(i):t===e.getSourceId()}endDrag(){const e=this.spec,t=this.monitor,n=this.connector,{end:i}=e;i&&i(t.getItem(),t),n.reconnect()}constructor(e,t,n){this.spec=e,this.monitor=t,this.connector=n}}function $(r,e,t){const n=s.exports.useMemo(()=>new X(r,e,t),[e,t]);return s.exports.useEffect(()=>{n.spec=r},[r]),n}function J(r){return s.exports.useMemo(()=>{const e=r.type;return c(e!=null,"spec.type must be defined"),e},[r])}function K(r,e,t){const n=d(),i=$(r,e,t),o=J(r);u(function(){if(o!=null){const[g,h]=Y(o,i,n);return e.receiveHandlerId(g),t.receiveHandlerId(g),h}},[n,e,t,i,o])}function ge(r,e){const t=b(r,e);c(!t.begin,"useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)");const n=z(),i=B(t.options,t.previewOptions);return K(t,n,i),[O(t.collect,n,i),j(i),_(i)]}function Q(r){return s.exports.useMemo(()=>r.hooks.dropTarget(),[r])}function Z(r){const e=d(),t=s.exports.useMemo(()=>new q(e.getBackend()),[e]);return u(()=>(t.dropTargetOptions=r||null,t.reconnect(),()=>t.disconnectDropTarget()),[r]),t}function ee(){const r=d();return s.exports.useMemo(()=>new U(r),[r])}function te(r){const{accept:e}=r;return s.exports.useMemo(()=>(c(r.accept!=null,"accept must be defined"),Array.isArray(e)?e:[e]),[e])}class re{canDrop(){const e=this.spec,t=this.monitor;return e.canDrop?e.canDrop(t.getItem(),t):!0}hover(){const e=this.spec,t=this.monitor;e.hover&&e.hover(t.getItem(),t)}drop(){const e=this.spec,t=this.monitor;if(e.drop)return e.drop(t.getItem(),t)}constructor(e,t){this.spec=e,this.monitor=t}}function ne(r,e){const t=s.exports.useMemo(()=>new re(r,e),[e]);return s.exports.useEffect(()=>{t.spec=r},[r]),t}function ie(r,e,t){const n=d(),i=ne(r,e),o=te(r);u(function(){const[g,h]=F(o,i,n);return e.receiveHandlerId(g),t.receiveHandlerId(g),h},[n,e,i,t,o.map(a=>a.toString()).join("|")])}function le(r,e){const t=b(r,e),n=ee(),i=Z(t.options);return ie(t,n,i),[O(t.collect,n,i),Q(i)]}export{de as D,ge as a,le as u};
