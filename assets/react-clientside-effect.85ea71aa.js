import{a as h,b as l}from"./@babel.22c28777.js";import{r as y}from"./react.bd6d2c26.js";import{j as v}from"./@chakra-ui.e051454b.js";function S(f,s){function m(i){return i.displayName||i.name||"Component"}return function(a){var n=[],p;function u(){p=f(n.map(function(t){return t.props})),s(p)}var c=function(t){l(e,t);function e(){return t.apply(this,arguments)||this}e.peek=function(){return p};var o=e.prototype;return o.componentDidMount=function(){n.push(this),u()},o.componentDidUpdate=function(){u()},o.componentWillUnmount=function(){var d=n.indexOf(this);n.splice(d,1),u()},o.render=function(){return v(a,{...this.props})},e}(y.exports.PureComponent);return h(c,"displayName","SideEffect("+m(a)+")"),c}}export{S as w};
