function e(t){return"Minified Redux error #"+t+"; visit https://redux.js.org/Errors?code="+t+" for the full message or use the non-minified dev environment for full errors. "}var N=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}(),y=function(){return Math.random().toString(36).substring(7).split("").join(".")},d={INIT:"@@redux/INIT"+y(),REPLACE:"@@redux/REPLACE"+y(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+y()}};function m(t){if(typeof t!="object"||t===null)return!1;for(var n=t;Object.getPrototypeOf(n)!==null;)n=Object.getPrototypeOf(n);return Object.getPrototypeOf(t)===n}function I(t,n,i){var b;if(typeof n=="function"&&typeof i=="function"||typeof i=="function"&&typeof arguments[3]=="function")throw new Error(e(0));if(typeof n=="function"&&typeof i>"u"&&(i=n,n=void 0),typeof i<"u"){if(typeof i!="function")throw new Error(e(1));return i(I)(t,n)}if(typeof t!="function")throw new Error(e(2));var w=t,p=n,c=[],u=c,s=!1;function v(){u===c&&(u=c.slice())}function E(){if(s)throw new Error(e(3));return p}function h(r){if(typeof r!="function")throw new Error(e(4));if(s)throw new Error(e(5));var f=!0;return v(),u.push(r),function(){if(!!f){if(s)throw new Error(e(6));f=!1,v();var o=u.indexOf(r);u.splice(o,1),c=null}}}function l(r){if(!m(r))throw new Error(e(7));if(typeof r.type>"u")throw new Error(e(8));if(s)throw new Error(e(9));try{s=!0,p=w(p,r)}finally{s=!1}for(var f=c=u,a=0;a<f.length;a++){var o=f[a];o()}return r}function g(r){if(typeof r!="function")throw new Error(e(10));w=r,l({type:d.REPLACE})}function x(){var r,f=h;return r={subscribe:function(o){if(typeof o!="object"||o===null)throw new Error(e(11));function O(){o.next&&o.next(E())}O();var P=f(O);return{unsubscribe:P}}},r[N]=function(){return this},r}return l({type:d.INIT}),b={dispatch:l,subscribe:h,getState:E,replaceReducer:g},b[N]=x,b}export{I as c};
