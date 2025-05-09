(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis,et=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),at=new WeakMap;let $t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(et&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&at.set(e,t))}return t}toString(){return this.cssText}};const wt=r=>new $t(typeof r=="string"?r:r+"",void 0,st),U=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new $t(e,r,st)},Et=(r,t)=>{if(et)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=V.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},lt=et?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return wt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Pt,defineProperty:St,getOwnPropertyDescriptor:Ct,getOwnPropertyNames:Ot,getOwnPropertySymbols:Ut,getPrototypeOf:Tt}=Object,_=globalThis,ht=_.trustedTypes,Rt=ht?ht.emptyScript:"",Z=_.reactiveElementPolyfillSupport,M=(r,t)=>r,F={toAttribute(r,t){switch(t){case Boolean:r=r?Rt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},it=(r,t)=>!Pt(r,t),pt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:it};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&St(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=Ct(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return s==null?void 0:s.call(this)},set(n){const l=s==null?void 0:s.call(this);o.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??pt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=Tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,i=[...Ot(e),...Ut(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(lt(s))}else t!==void 0&&e.push(lt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Et(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var o;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const n=i.getPropertyOptions(s),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:F;this._$Em=s,this[s]=l.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??it)(this[t],e))return;this.P(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(e)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[M("elementProperties")]=new Map,w[M("finalized")]=new Map,Z==null||Z({ReactiveElement:w}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis,q=k.trustedTypes,ct=q?q.createPolicy("lit-html",{createHTML:r=>r}):void 0,_t="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,vt="?"+$,Nt=`<${vt}>`,x=document,H=()=>x.createComment(""),B=r=>r===null||typeof r!="object"&&typeof r!="function",rt=Array.isArray,jt=r=>rt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ut=/>/g,v=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,ft=/"/g,yt=/^(?:script|style|textarea|title)$/i,Mt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),T=Mt(1),E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),mt=new WeakMap,y=x.createTreeWalker(x,129);function xt(r,t){if(!rt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}const kt=(r,t)=>{const e=r.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",n=j;for(let l=0;l<e;l++){const a=r[l];let p,d,h=-1,f=0;for(;f<a.length&&(n.lastIndex=f,d=n.exec(a),d!==null);)f=n.lastIndex,n===j?d[1]==="!--"?n=dt:d[1]!==void 0?n=ut:d[2]!==void 0?(yt.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=v):d[3]!==void 0&&(n=v):n===v?d[0]===">"?(n=s??j,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,p=d[1],n=d[3]===void 0?v:d[3]==='"'?ft:gt):n===ft||n===gt?n=v:n===dt||n===ut?n=j:(n=v,s=void 0);const b=n===v&&r[l+1].startsWith("/>")?" ":"";o+=n===j?a+Nt:h>=0?(i.push(p),a.slice(0,h)+_t+a.slice(h)+$+b):a+$+(h===-2?l:b)}return[xt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class D{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[p,d]=kt(t,e);if(this.el=D.createElement(p,i),y.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=y.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(_t)){const f=d[n++],b=s.getAttribute(h).split($),I=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:I[2],strings:b,ctor:I[1]==="."?Bt:I[1]==="?"?Dt:I[1]==="@"?zt:G}),s.removeAttribute(h)}else h.startsWith($)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(yt.test(s.tagName)){const h=s.textContent.split($),f=h.length-1;if(f>0){s.textContent=q?q.emptyScript:"";for(let b=0;b<f;b++)s.append(h[b],H()),y.nextNode(),a.push({type:2,index:++o});s.append(h[f],H())}}}else if(s.nodeType===8)if(s.data===vt)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf($,h+1))!==-1;)a.push({type:7,index:o}),h+=$.length-1}o++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function P(r,t,e=r,i){var n,l;if(t===E)return t;let s=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const o=B(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=P(r,s._$AS(r,t.values),s,i)),t}class Ht{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??x).importNode(e,!0);y.currentNode=s;let o=y.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new L(o,o.nextSibling,this,t):a.type===1?p=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(p=new Lt(o,this,t)),this._$AV.push(p),a=i[++l]}n!==(a==null?void 0:a.index)&&(o=y.nextNode(),n++)}return y.currentNode=x,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class L{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),B(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):jt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(xt(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(e);else{const n=new Ht(s,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=mt.get(t.strings);return e===void 0&&mt.set(t.strings,e=new D(t)),e}k(t){rt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new L(this.O(H()),this.O(H()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(o===void 0)t=P(this,t,e,0),n=!B(t)||t!==this._$AH&&t!==E,n&&(this._$AH=t);else{const l=t;let a,p;for(t=o[0],a=0;a<o.length-1;a++)p=P(this,l[i+a],e,a),p===E&&(p=this._$AH[a]),n||(n=!B(p)||p!==this._$AH[a]),p===c?t=c:t!==c&&(t+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Bt extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class Dt extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class zt extends G{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??c)===E)return;const i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Lt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const Q=k.litHtmlPolyfillSupport;Q==null||Q(D,L),(k.litHtmlVersions??(k.litHtmlVersions=[])).push("3.2.1");const It=(r,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new L(t.insertBefore(H(),o),o,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let u=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=It(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return E}};var bt;u._$litElement$=!0,u.finalized=!0,(bt=globalThis.litElementHydrateSupport)==null||bt.call(globalThis,{LitElement:u});const tt=globalThis.litElementPolyfillSupport;tt==null||tt({LitElement:u});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:it},Ft=(r=Vt,t,e)=>{const{kind:i,metadata:s}=e;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),o.set(e.name,r),i==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,r)},init(l){return l!==void 0&&this.P(n,void 0,r),l}}}if(i==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+i)};function g(r){return(t,e)=>typeof e=="object"?Ft(r,t,e):((i,s,o)=>{const n=s.hasOwnProperty(o);return s.constructor.createProperty(o,n?{...i,wrapped:!0}:i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(r){return g({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt=(r,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(r,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ot(r,t){return(e,i,s)=>{const o=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(r))??null};return qt(e,i,{get(){return o(this)}})}}var Wt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,K=(r,t,e,i)=>{for(var s=i>1?void 0:i?Gt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Wt(t,e,s),s};let S=class extends u{constructor(){super(...arguments),this.powerOn=!1,this.playing=!1,this.progress=0}get rotation(){return this.powerOn?20+this.progress/100*25:0}render(){return T`
      <div class="arm">
        <img class="arm__bottom" src="arm-bottom.png" alt="Arm Bottom" />
        <img
          style="transform: rotate(${this.rotation}deg);"
          class="arm__top ${this.playing?"playing":""}"
          src="arm-top.png"
          alt="Arm Top"
        />
      </div>
    `}};S.styles=[U`
      :host {
        display: block;
      }

      .arm {
        position: relative;
        width: 65px;
        height: 300px;
      }

      .arm__bottom {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: auto;
      }
      .arm__top {
        position: absolute;
        top: 0;
        left: -5px;
        height: 100%;
        width: auto;
        transform-origin: 30px 70px;
        transition: transform 0.5s ease-in-out;
      }

      .arm__top.playing {
        transition: none;
      }
    `];K([g({type:Boolean})],S.prototype,"powerOn",2);K([g({type:Boolean})],S.prototype,"playing",2);K([g({type:Number})],S.prototype,"progress",2);S=K([R("cp-arm")],S);var Kt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,nt=(r,t,e,i)=>{for(var s=i>1?void 0:i?Jt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Kt(t,e,s),s};let z=class extends u{constructor(){super(...arguments),this.image="./assets/logo.png",this.rotation=0}startScratch(r){r.preventDefault(),r.stopPropagation();const t=r.target;console.log("target",t)}render(){return T`
      <div
        class="turntable__platter"
        style="transform: rotate(${this.rotation}deg);"
        @mousedown=${this.startScratch}
        @touchstart=${this.startScratch}
      >
        <div class="turntable__record">
          <div class="turntable__label">
            <img
              src="${this.image}"
              alt="Logo"
              style="width: 100%; height: 100%; border-radius: 50%;"
            />
          </div>
        </div>
      </div>
    `}};z.styles=[U`
      :host {
        display: block;
      }

      .turntable__platter {
        padding: 18px;
        width: 330px;
        height: 330px;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        position: relative;
        background: radial-gradient(
          circle,
          black 0px 150px,
          silver 150px 152px,
          black 152px 163px,
          silver 163px 165px
        );
      }

      .turntable__platter::before {
        content: '';
        position: absolute;
        top: 6px;
        left: 6px;
        right: 6px;
        bottom: 6px;
        border: 3px dotted silver;
        border-radius: 50%;
        overflow: hidden;
        z-index: 1;
      }

      .turntable__record {
        padding: 100px;
        width: 100%;
        height: 100%;
        background: repeating-radial-gradient(#131313, #000 2px, #000 2px, #131313 4px);
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        position: relative;
        box-sizing: border-box;
      }

      .turntable__label {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 50%;
      }

      .turntable__platter.playing {
        animation: spin 3s linear infinite;
      }
    `];nt([g()],z.prototype,"image",2);nt([g()],z.prototype,"rotation",2);z=nt([R("cp-platter")],z);var Xt=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,At=(r,t,e,i)=>{for(var s=i>1?void 0:i?Zt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Xt(t,e,s),s};let W=class extends u{constructor(){super(...arguments),this.on=!1}toggle(){this.on=!this.on,this.dispatchEvent(new CustomEvent("power-toggle",{detail:this.on,bubbles:!0,composed:!0}))}render(){return T`
      <div class="wheel-container">
        <div class="wheel ${this.on?"on":""}" @click="${this.toggle}">
          <svg viewBox="0 0 30 30" class="wheel-text">
            <defs>
              <path
                id="circleTextPath"
                d="M 15,15 m 0,-10 a 10,10 0 1,1 0,20 a 10,10 0 1,1 0,-20"
              />
            </defs>
            <text>
              <textPath href="#circleTextPath" startOffset="15%" text-anchor="middle">
                OFF • ON
              </textPath>
            </text>
          </svg>
        </div>
        <svg class="red-ray ${this.on?"on":""}" width="60" height="40" viewBox="0 0 60 40">
          <defs>
            <linearGradient id="rayGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ff3535" stop-opacity="1" />
              <stop offset="90%" stop-color="transparent" stop-opacity="0.4" />
            </linearGradient>
            <filter id="blur-ray" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>
          <polygon points="10,20 58,5 58,35" fill="url(#rayGradient)" filter="url(#blur-ray)" />
        </svg>
      </div>
    `}};W.styles=[U`
      :host {
        display: inline-block;
        cursor: pointer;
      }

      .wheel-container {
        position: relative;
        width: 30px;
        height: 30px;
        margin: 0 auto;
      }
      .red-ray {
        position: absolute;
        left: 100%;
        margin-left: -16px;
        top: -24px;
        transform: rotate(-33deg);
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }

      .red-ray.on {
        opacity: 1;
      }
      .wheel {
        width: 30px;
        height: 30px;
        font-size: 8px;
        color: #fff;
        border-radius: 50%;
        background: radial-gradient(circle, #555 0%, #222 100%);
        box-shadow:
          inset 0 2px 5px rgba(255, 255, 255, 0.2),
          inset 0 -2px 5px rgba(0, 0, 0, 0.6),
          0 2px 5px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: transform 0.3s ease-in-out;
      }

      .wheel.on {
        transform: rotate(-100deg);
      }

      .wheel-text {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        pointer-events: none;
      }

      .wheel text {
        fill: white;
        font-size: 3px;
        letter-spacing: 1px;
        font-family: sans-serif;
      }
    `];At([g({type:Boolean})],W.prototype,"on",2);W=At([R("cp-power-wheel")],W);var Yt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,A=(r,t,e,i)=>{for(var s=i>1?void 0:i?Qt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Yt(t,e,s),s};let m=class extends u{constructor(){super(...arguments),this.trackUrl="",this.volume=1,this.image="logo-grey.png",this.playing=!1,this.progress=0,this.powerOn=!1,this.rotation=0,this.speed=33.3,this.pitchControl=0,this.scratching=!1,this.startX=0,this.startY=0,this.lastAngle=0,this.audioPaused=!1,this.lastTimestamp=null}connectedCallback(){super.connectedCallback(),this.trackUrl&&this.setupAudio()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupAudio()}async setupAudio(){const r=window.AudioContext||window.webkitAudioContext;if(!r){console.error("Web Audio API is not supported in this browser.");return}this.audioContext=new r,this.audioElement=new Audio(this.trackUrl),this.audioElement.crossOrigin="anonymous",this.trackSource=this.audioContext.createMediaElementSource(this.audioElement),this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=this.volume,this.trackSource.connect(this.gainNode).connect(this.audioContext.destination)}cleanupAudio(){var r,t,e,i;(r=this.audioElement)==null||r.pause(),(t=this.trackSource)==null||t.disconnect(),(e=this.gainNode)==null||e.disconnect(),(i=this.audioContext)==null||i.close()}togglePlay(){var r,t,e;this.powerOn&&(this.playing?(r=this.audioElement)==null||r.pause():(this.lastTimestamp=performance.now(),requestAnimationFrame(this.updateRotation.bind(this)),(t=this.audioContext)==null||t.resume(),(e=this.audioElement)==null||e.play()),this.playing=!this.playing)}updateRotation(r){if(this.playing){if(this.lastTimestamp&&this.audioElement){this.progress=this.audioElement.currentTime/this.audioElement.duration*100;const t=(r-this.lastTimestamp)/1e3,e=this.speed+this.speed*this.pitchControl/100;this.rotation+=e/60*360*t,this.rotation%=360,this.requestUpdate()}this.lastTimestamp=r,requestAnimationFrame(this.updateRotation.bind(this))}}updatePitchControl(r){const t=r.target;this.pitchControl=parseFloat(t.value),this.setPlaybackRate()}setPlaybackRate(){if(this.audioElement){const e=.9+(this.pitchControl+10)/20*.20000000000000007;this.audioElement.playbackRate=e}}setVolume(r){this.volume=r,this.gainNode&&(this.gainNode.gain.value=r)}getVolume(){return this.volume}handlePowerToggle(r){this.powerOn=r.detail,!this.powerOn&&this.playing&&this.audioElement&&(this.audioElement.pause(),this.audioElement.currentTime=0,this.rotation=0,this.progress=0,this.playing=!1)}render(){return T`<div class="turntable">
      <section class="turntable__left">
        <cp-platter image=${this.image} rotation=${this.rotation}></cp-platter>
        <cp-power-wheel @power-toggle="${this.handlePowerToggle}"></cp-power-wheel>
        <button
          class="turntable__start-stop ${this.playing?"turntable__start-stop--playing":""}"
          @click=${this.togglePlay}
        >
          Start <span>.</span> Stop
        </button>
      </section>
      <aside class="turntable__controls">
        <input
          class="slider"
          type="range"
          id="speed"
          min="-10"
          max="10"
          step="1"
          .value=${this.pitchControl}
          @input=${this.updatePitchControl}
        />
      </aside>
      <img class="turntable__logo" src="logo-full.png" alt="Logo" width="100" height="20" />
      <cp-arm .playing=${this.playing} .powerOn=${this.powerOn} progress=${this.progress}></cp-arm>
    </div>`}};m.styles=[U`
      :host {
        display: block;
      }

      .turntable {
        width: 450px;
        height: 350px;
        padding: 10px;
        box-sizing: border-box;
        background: linear-gradient(
          112deg,
          #cccccc 12.1202882483%,
          #cbcbcb 12.1202882483%,
          #828282 88.949556541%
        );
        box-shadow:
          inset 0 -3px 0px rgba(0, 0, 0, 0.3),
          inset 0 3px 0px rgba(255, 255, 255, 0.5),
          0 3px 10px 6px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        position: relative;
        cursor: grab;
      }

      .turntable__start-stop {
        background-color: rgb(46, 48, 50);
        text-transform: uppercase;
        color: #fff;
        font-size: 6px;
        position: absolute;
        z-index: 2;
        bottom: 10px;
        left: 10px;
        padding: 5px 10px;
        cursor: grab;
      }

      .turntable__logo {
        position: absolute;
        z-index: 3;
        bottom: 10px;
        right: 50px;
      }

      input[type='range'] {
        position: absolute;
        bottom: 50px;
        right: 25px;
        writing-mode: vertical-rl;
        -webkit-appearance: none;
        appearance: none;
        background: #333;
        box-shadow: inset -1px -1px 0 1px #555;
        border-radius: 4px;
        outline: none;
        width: 7px;
        height: 165px;
      }

      /* Stile del cursore */
      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 15px;
        background: linear-gradient(to bottom, #444, #222);
        border: 2px solid #000;
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      }

      cp-arm {
        position: absolute;
        right: 50px;
        top: 15px;
        z-index: 2;
      }

      cp-power-wheel {
        position: absolute;
        bottom: 50px;
        left: 10px;
        z-index: 2;
      }
    `];A([g({type:String})],m.prototype,"trackUrl",2);A([g({type:Number})],m.prototype,"volume",2);A([g({type:String})],m.prototype,"image",2);A([N()],m.prototype,"playing",2);A([N()],m.prototype,"progress",2);A([N()],m.prototype,"powerOn",2);m=A([R("dj-turntable")],m);var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,J=(r,t,e,i)=>{for(var s=i>1?void 0:i?ee(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&te(t,e,s),s};let C=class extends u{constructor(){super(...arguments),this.volumeA=1,this.volumeB=1,this.crossfade=.5,this.handeChange=()=>{const r=Math.max(0,Math.min(1,this.crossfade)),t=Math.cos(r*.5*Math.PI),e=Math.sin(r*.5*Math.PI),i=this.volumeA*t,s=this.volumeB*e;this.dispatchEvent(new CustomEvent("volume-change",{detail:{volumeA:i,volumeB:s},bubbles:!0,composed:!0}))}}render(){return T`
      <div class="mixer">
        <div class="channels">
          <div class="channel">
            <label for="volumeA">1</label>
            <div class="slider-container vertical-slider">
              <div class="slider">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  .value=${String(this.volumeA)}
                  @input=${r=>{this.volumeA=parseFloat(r.target.value),this.handeChange()}}
                  class="vertical-slider"
                />
              </div>
            </div>
          </div>

          <div class="channel">
            <label for="volumeB">2</label>
            <div class="slider-container vertical-slider">
              <div class="slider">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  .value=${String(this.volumeB)}
                  @input=${r=>{this.volumeB=parseFloat(r.target.value),this.handeChange()}}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="crossfader">
          <label for="crossfader">FADER</label>
          <div class="slider-container">
            <div class="slider">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                .value=${String(this.crossfade)}
                @input=${r=>{this.crossfade=parseFloat(r.target.value),this.handeChange()}}
              />
            </div>
          </div>
        </div>
        <div class="logo">
          <img class="mixer-logo" src="logo-full.png" alt="Logo" width="100" height="20" />
        </div>
      </div>
    `}};C.styles=U`
    .mixer {
      font-family: 'Musieer';
      padding: 40px;
      background: linear-gradient(
        112deg,
        #cccccc 12.1202882483%,
        #cbcbcb 12.1202882483%,
        #828282 88.949556541%
      );
      border-radius: 20px;
      box-shadow: 0 0 20px #000;
      width: 200px;
      height: 330px;
    }

    .channels {
      display: flex;
      gap: 100px;
      justify-content: center;
      height: 250px;
    }

    .channel,
    .crossfader {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    label {
      font-size: 1rem;
      font-weight: bold;
      color: #000;
      letter-spacing: 1px;
    }

    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      background: #333;
      box-shadow: inset -1px -1px 0 1px #555;
      border-radius: 4px;
      outline: none;
      width: 165px;
      height: 7px;
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 30px;
      background: linear-gradient(to bottom, #444, #222);
      border: 2px solid #000;
      cursor: pointer;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .slider {
      height: 23px;
      background-position: center center;
      background: repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 5px,
        rgb(250, 250, 250) 6px,
        transparent 7px,
        transparent 14px
      );
    }

    .slider-container {
      border: 1px solid #bbb;
      padding: 5px;
    }

    .slider-container.vertical-slider {
      transform: rotate(-90deg);
      margin-top: 80px;
    }

    .channel {
      width: 30px;
    }

    .logo {
      text-align: center;
      margin-top: 20px;
    }
  `;J([N()],C.prototype,"volumeA",2);J([N()],C.prototype,"volumeB",2);J([N()],C.prototype,"crossfade",2);C=J([R("dj-mixer")],C);var se=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,X=(r,t,e,i)=>{for(var s=i>1?void 0:i?ie(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&se(t,e,s),s};let O=class extends u{constructor(){super(...arguments),this.handleVolumeChange=r=>{var s,o;const t=r,{volumeA:e,volumeB:i}=t.detail;(s=this.deckA)==null||s.setVolume(e),(o=this.deckB)==null||o.setVolume(i)}}firstUpdated(){this.addEventListener("volume-change",this.handleVolumeChange.bind(this))}render(){return T`
      <div class="dj-console">
        <dj-turntable id="deckA" trackUrl="left.mp3"></dj-turntable>
        <dj-mixer></dj-mixer>
        <dj-turntable id="deckB" trackUrl="right.mp3" image="logo-red.png"></dj-turntable>
      </div>
    `}};O.styles=U`
    :host {
      display: block;
    }
    .dj-console {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      padding: 20px;
    }
  `;X([ot("#deckA")],O.prototype,"deckA",2);X([ot("#deckB")],O.prototype,"deckB",2);X([ot("cp-mixer")],O.prototype,"mixer",2);O=X([R("cp-console")],O);
