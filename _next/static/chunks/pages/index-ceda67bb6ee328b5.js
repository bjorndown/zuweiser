(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(10)}])},10:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return q}});var r=n(5893),i=n(5988),a=n.n(i),c=n(7294),s=function(t){var e=t.onChange,n=(0,c.useState)("\t"),i=n[0];n[1];return(0,r.jsxs)("div",{className:"jsx-468845d9269d5f3e container",children:[(0,r.jsx)("textarea",{cols:80,rows:20,onChange:function(t){return e(function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t.split("\n").slice(e?1:0).map((function(t){return t.trim().split(i).map((function(t){return t.trim()}))})).filter((function(t){return 1!==t.length}))}(t.target.value))},className:"jsx-468845d9269d5f3e"}),(0,r.jsx)(a(),{id:"468845d9269d5f3e",children:".container.jsx-468845d9269d5f3e{display:-webkit-box;\ndisplay:-webkit-flex;\ndisplay:-ms-flexbox;\ndisplay:flex;\nflex-flow:column wrap;\nmargin:1rem 0}"})]})},o=function(t){var e=t.text;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("span",{title:e,className:"jsx-cd050b290067be02 explanation",children:"?"}),(0,r.jsx)(a(),{id:"cd050b290067be02",children:".explanation.jsx-cd050b290067be02{background:var(--green);\nmargin-left:0.3rem;\npadding:0 5px;\nfont-weight:bold;\nborder-radius:50%}"})]})},l=n(4184),u=n.n(l),d=function(t){var e=t.error,n=t.columns,i=t.table;return(0,r.jsxs)(r.Fragment,{children:[e&&(0,r.jsx)("span",{className:"jsx-939ad00f6424421d error",children:e}),!e&&n.length>0&&(0,r.jsx)("div",{className:"jsx-939ad00f6424421d preview",children:(0,r.jsxs)("table",{className:"jsx-939ad00f6424421d",children:[(0,r.jsx)("thead",{className:"jsx-939ad00f6424421d",children:(0,r.jsx)("tr",{className:"jsx-939ad00f6424421d",children:n.map((function(t){return(0,r.jsx)("th",{title:t.matchedAs?'Erkannt als "'.concat(t.matchedAsLabel,'"'):"",className:"jsx-939ad00f6424421d "+(u()({"matched-column":t.matchedAs})||""),children:t.label},t.label)}))})}),(0,r.jsx)("tbody",{className:"jsx-939ad00f6424421d",children:i.slice(1).map((function(t,e){return(0,r.jsx)("tr",{className:"jsx-939ad00f6424421d",children:t.map((function(t,n){return(0,r.jsx)("td",{className:"jsx-939ad00f6424421d",children:t},"cell-".concat(e,"-").concat(n))}))},"row-".concat(e))}))})]})}),(0,r.jsx)(a(),{id:"939ad00f6424421d",children:".preview.jsx-939ad00f6424421d{height:10rem;\noverflow:auto}\n.matched-column.jsx-939ad00f6424421d{background:var(--green)}\nth.jsx-939ad00f6424421d{position:-webkit-sticky;\nposition:sticky;\ntop:0;\nleft:0}\n.error.jsx-939ad00f6424421d{background:#cd5c5c}"})]})},f=function(t){var e,n,i=t.onChange,a=(0,c.useState)(!0),l=a[0],u=a[1],f=(0,c.useState)(),h=f[0],m=f[1],p=function(t){return"id"===t.toLowerCase()},x=function(t){return t.toLowerCase().startsWith("name")||t.toLowerCase().startsWith("title")},j=function(t){return t.toLowerCase().startsWith("limit")||t.toLowerCase().includes("max")},b=function(t){return t.toLowerCase().startsWith("minimum")},v=(0,c.useMemo)((function(){return null!==(e=null===h||void 0===h?void 0:h[0])&&void 0!==e?e:[]}),[h]),y=(0,c.useMemo)((function(){return null!==(n=null===h||void 0===h?void 0:h.slice(1))&&void 0!==n?n:[]}),[h]),g=(0,c.useMemo)((function(){return v.indexOf(v.find((function(t){return p(t)})))}),[v]),w=(0,c.useMemo)((function(){return v.indexOf(v.find((function(t){return x(t)})))}),[v]),N=(0,c.useMemo)((function(){return v.indexOf(v.find((function(t){return j(t)})))}),[v]),S=(0,c.useMemo)((function(){return v.indexOf(v.find((function(t){return b(t)})))}),[v]),P=(0,c.useMemo)((function(){return v.length?v.map((function(t,e){return p(t)?{label:t,matchedAsLabel:"ID",matchedAs:"id"}:x(t)?{label:t,matchedAs:"title",matchedAsLabel:"Titel"}:j(t)?{label:t,matchedAs:"limit",matchedAsLabel:"Limit"}:b(t)?{label:t,matchedAs:"minimum",matchedAsLabel:"Minimum"}:{label:t,matchedAs:void 0,matchedAsLabel:void 0}})):[]}),[v]),O=(0,c.useMemo)((function(){if(h)return!P||P.length<3?"Keine oder zu wenige Spalten erkannt. Minimum an Spalten: ID, Titel, Limit, Minimum":!P.find((function(t){return"id"===t.matchedAs}))?'Spalte "ID" nicht erkannt':!P.find((function(t){return"title"===t.matchedAs}))?'Spalte "Titel" nicht erkannt':!P.find((function(t){return"limit"===t.matchedAs}))?'Spalte "Limit" nicht erkannt':!!P.find((function(t){return"minimum"===t.matchedAs}))?void 0:'Spalte "Minimum" nicht erkannt'}),[h,P]),M=(0,c.useMemo)((function(){return O||!y.length?[]:y.map((function(t){return{id:t[g],title:t[w],limit:parseInt(t[N]),minimum:parseInt(t[S])}}))}),[O,y,v]);return(0,c.useEffect)((function(){O||i({activities:M,shuffleBeforeMatch:l})}),[O,M,l]),(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{children:"Aktivit\xe4ten"}),(0,r.jsx)("input",{type:"checkbox",id:"shuffleActivitiesBeforeMatch",checked:l,onChange:function(){return u(!l)}}),(0,r.jsxs)("label",{htmlFor:"shuffleActivitiesBeforeMatch",children:["Vor dem Zuweisen mischen",(0,r.jsx)(o,{text:"Ohne Mischen ist die Reihenfolge der Eintr\xe4ge in der Tabelle massgebend, d.h. fr\xfche Eintr\xe4ge werden bevorzugt"})]}),(0,r.jsx)(s,{onChange:function(t){return m(t)}}),(0,r.jsx)(d,{error:O,columns:P,table:h})]})},h=function(t){var e,n,i=t.onChange,a=(0,c.useState)(!0),l=a[0],u=a[1],f=(0,c.useState)(),h=f[0],m=f[1],p=function(t){return"id"===t.toLowerCase()},x=function(t){return t.toLowerCase().startsWith("prio")},j=(0,c.useMemo)((function(){return null!==(e=null===h||void 0===h?void 0:h[0])&&void 0!==e?e:[]}),[h]),b=(0,c.useMemo)((function(){return null!==(n=null===h||void 0===h?void 0:h.slice(1))&&void 0!==n?n:[]}),[h]),v=(0,c.useMemo)((function(){return j.indexOf(j.find((function(t){return p(t)})))}),[j]),y=(0,c.useMemo)((function(){return j.filter(x).map((function(t){return j.indexOf(t)}))}),[j]),g=(0,c.useMemo)((function(){if(!j.length)return[];var t=j.filter((function(t){return t.toLowerCase().startsWith("prio")}));return j.map((function(e){return p(e)?{label:e,matchedAsLabel:"ID",matchedAs:"id"}:x(e)?{label:e,matchedAs:"priority",matchedAsLabel:"Priorit\xe4t ".concat(t.indexOf(e)+1)}:{label:e,matchedAs:void 0,matchedAsLabel:void 0}}))}),[j]),w=(0,c.useMemo)((function(){if(h){if(!g||g.length<3)return"Keine oder zu wenige Spalten erkannt. Minimum an Spalten: ID, Priorit\xe4t 1, Priorit\xe4t 2";if(!!!g.find((function(t){return"id"===t.matchedAs})))return'Spalte "ID" nicht erkannt';var t=g.filter((function(t){return"priority"===t.matchedAs})).length;return 0===t?"Keine Priorit\xe4ten-Spalten erkannt":1===t?"Nur eine Priorit\xe4ten-Spalten erkannt":void 0}}),[h,g]),N=(0,c.useMemo)((function(){return w||!h?[]:b.map((function(t){return{id:t[v],priorities:t.filter((function(t,e){return y.includes(e)}))}}))}),[w,h,b,v,y]),S=(0,c.useMemo)((function(){return w||!h?[]:b.map((function(t){return{id:t[v],data:t.filter((function(t,e){return!y.concat(v).includes(e)}))}}))}),[w,h,b,v,y]);return(0,c.useEffect)((function(){w||i({participants:N,participantsData:S,shuffleBeforeMatch:l})}),[w,N,S,l]),(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{children:"Teilnehmer"}),(0,r.jsx)("input",{type:"checkbox",id:"shuffleParticipantsBeforeMatch",checked:l,onChange:function(){return u(!l)}}),(0,r.jsxs)("label",{htmlFor:"shuffleParticipantsBeforeMatch",children:["Vor dem Zuweisen mischen",(0,r.jsx)(o,{text:"Ohne Mischen ist die Reihenfolge der Eintr\xe4ge in der Tabelle massgebend, d.h. fr\xfche Eintr\xe4ge werden bevorzugt"})]}),(0,r.jsx)(s,{onChange:function(t){return m(t)}}),(0,r.jsx)(d,{error:w,columns:g,table:h})]})},m=n(6026),p=n.n(m),x=function(t){var e=t.fulfilledPriorities,n=t.totalParticipants;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("ol",{children:e.map((function(t,e){return(0,r.jsxs)("li",{children:["Priorit\xe4t ",(0,r.jsx)("progress",{value:t,max:n})," ",t]},"priority-".concat(e))}))})})},j=function(t){var e=t.result,n=function(t){return"".concat(t+1,". Priorit\xe4t")};return(0,r.jsxs)("div",{id:"statistics-root",children:[(0,r.jsxs)("div",{id:"statistics-overview",children:[(0,r.jsx)("h3",{children:"Zusammenfassung"}),(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{}),(0,r.jsx)("th",{children:"Zugewiesen"}),(0,r.jsx)("th",{children:"Minimum"}),(0,r.jsx)("th",{children:"Limit"})]})}),(0,r.jsxs)("tbody",{children:[e.activities.map((function(t){return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:t.title}),(0,r.jsx)("td",{className:"number",children:t.participants.length}),(0,r.jsx)("td",{className:"number",children:t.minimum}),(0,r.jsx)("td",{className:"number",children:t.limit})]},"activity-".concat(t.id))})),(0,r.jsxs)("tr",{className:"totals",children:[(0,r.jsx)("td",{children:"Total"}),(0,r.jsx)("td",{className:"number",children:e.participants.filter((function(t){return t.assigned})).length}),(0,r.jsx)("td",{className:"number",children:e.activities.map((function(t){return t.minimum})).reduce((function(t,e){return t+e}))}),(0,r.jsx)("td",{className:"number",children:e.activities.map((function(t){return t.limit})).reduce((function(t,e){return t+e}))})]})]})]})]}),(0,r.jsxs)("div",{id:"statistics-barchart",children:[(0,r.jsx)("h3",{children:"Verteilung der erf\xfcllten Priorit\xe4ten"}),(0,r.jsx)(x,{fulfilledPriorities:function(t){var e={},r=!0,i=!1,a=void 0;try{for(var c,s=t.activities[Symbol.iterator]();!(r=(c=s.next()).done);r=!0){var o=c.value,l=!0,u=!1,d=void 0;try{for(var f,h=o.participants[Symbol.iterator]();!(l=(f=h.next()).done);l=!0){var m=f.value.priorities.indexOf(o.id);e[n(m)]?e[n(m)]++:e[n(m)]=1}}catch(p){u=!0,d=p}finally{try{l||null==h.return||h.return()}finally{if(u)throw d}}}}catch(p){i=!0,a=p}finally{try{r||null==s.return||s.return()}finally{if(i)throw a}}return Object.keys(e).map((function(t){return e[t]}))}(e),totalParticipants:e.participants.length})]})]})},b=function(t){var e,n=t.result,i=t.participantsData,c=function(t){return t.filter((function(t){return!t.assigned}))},s=function(t){return"".concat(t.title," (").concat(t.participants.length," / ").concat(t.limit,")")};return(0,r.jsxs)("div",{id:"results-root",className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("div",{id:"results-config",className:"jsx-48174cdeae27a10b",children:(0,r.jsx)("h2",{className:"jsx-48174cdeae27a10b",children:"Resultat"})}),(0,r.jsx)(j,{result:n}),(0,r.jsx)("div",{id:"results-successful",className:"jsx-48174cdeae27a10b",children:(0,r.jsx)("ul",{className:"jsx-48174cdeae27a10b",children:n.activities.map((function(t){return(0,r.jsxs)("li",{className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("h3",{className:"jsx-48174cdeae27a10b",children:s(t)}),(0,r.jsxs)("table",{className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("thead",{className:"jsx-48174cdeae27a10b",children:(0,r.jsxs)("tr",{className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b",children:"ID"}),(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b"}),(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b"}),(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b"}),(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b",children:"Priorit\xe4t"})]})}),(0,r.jsx)("tbody",{className:"jsx-48174cdeae27a10b",children:t.participants.map((function(e,n){return(0,r.jsxs)("tr",{className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("td",{className:"jsx-48174cdeae27a10b",children:n+1}),i[e.id].map((function(t,e){return(0,r.jsx)("td",{className:"jsx-48174cdeae27a10b",children:t},"property-".concat(e))})),(0,r.jsx)("td",{className:"jsx-48174cdeae27a10b priority-column",children:e.priorities.indexOf(t.id)+1})]},"participant-".concat(e.id))}))})]})]},"result-".concat(t.id))}))})}),(0,r.jsxs)("div",{id:"results-unassignable",className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("h3",{className:"jsx-48174cdeae27a10b",children:"Nicht-zuweisbare Teilnehmer"}),c(n.participants).length>0&&(0,r.jsxs)("table",{className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("thead",{className:"jsx-48174cdeae27a10b",children:(0,r.jsxs)("tr",{className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b",children:"ID"}),(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b"}),(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b"}),(0,r.jsx)("th",{className:"jsx-48174cdeae27a10b"}),(e=n.participants,p()(1,e[0].priorities.length+1)).map((function(t){return(0,r.jsxs)("th",{className:"jsx-48174cdeae27a10b",children:["Priorit\xe4t ",t]},t)}))]})}),(0,r.jsx)("tbody",{className:"jsx-48174cdeae27a10b",children:c(n.participants).map((function(t,e){return(0,r.jsxs)("tr",{className:"jsx-48174cdeae27a10b",children:[(0,r.jsx)("td",{className:"jsx-48174cdeae27a10b",children:e+1}),i[t.id].map((function(t,e){return(0,r.jsx)("td",{className:"jsx-48174cdeae27a10b",children:t},"property-".concat(e))})),t.priorities.map((function(t){return(0,r.jsx)("td",{className:"jsx-48174cdeae27a10b",children:n.activities.find((function(e){return e.id===t})).title},t)}))]},"participant-".concat(t.id,"-").concat(e))}))})]})]}),(0,r.jsx)(a(),{id:"48174cdeae27a10b",children:"table.jsx-48174cdeae27a10b{border-spacing:0;\nmin-width:350px;\nmax-width:550px}\n#results-unassignable.jsx-48174cdeae27a10b table.jsx-48174cdeae27a10b{max-width:800px}\n.priority-column.jsx-48174cdeae27a10b{text-align:center}\nul.jsx-48174cdeae27a10b{margin:0;\npadding:0;\nlist-style:none}\n#results-root.jsx-48174cdeae27a10b{display:grid;\ngrid-template-columns:450px auto;\ngrid-template-areas:'config config' 'statistics statistics' 'unassignable unassignable' 'successful successful'}\n#results-config.jsx-48174cdeae27a10b{grid-area:config}\n#results-successful.jsx-48174cdeae27a10b{grid-area:successful}\n#results-unassignable.jsx-48174cdeae27a10b{grid-area:unassignable}"})]})},v=n(9983),y=n.n(v);function g(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function w(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function N(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function S(t,e,n){return S=N()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&E(i,n.prototype),i},S.apply(null,arguments)}function P(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}function M(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable})))),r.forEach((function(e){P(t,e,n[e])}))}return t}function A(t,e){return!e||"object"!==_(e)&&"function"!==typeof e?g(t):e}function E(t,e){return E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},E(t,e)}var _=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function C(t){var e="function"===typeof Map?new Map:void 0;return C=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return S(t,arguments,O(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),E(r,t)},C(t)}function L(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=O(t);if(e){var i=O(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return A(this,n)}}var T=function(t){M(n,t);var e=L(n);function n(t,r,i,a){var c;return w(this,n),(c=e.call(this,"".concat(i,"=").concat(a," not unique for ").concat(t," with id=").concat(r))).entityType=t,c.entityId=r,c.propertyName=i,c.propertyValue=a,Object.setPrototypeOf(g(c),n.prototype),c}return n}(C(Error)),D=function(t){M(n,t);var e=L(n);function n(t,r,i,a){var c;return w(this,n),(c=e.call(this,"".concat(t," with id=").concat(r," does not exist. Referred to by ").concat(i," with id=").concat(a))).entityType=t,c.id=r,c.referrerType=i,c.referrerId=a,Object.setPrototypeOf(g(c),n.prototype),c}return n}(C(Error)),R=function(t,e){!function(t){var e=new Set;t.forEach((function(t){if(e.has(t.id))throw new T("Activity",t.id,"id",t.id);e.add(t.id)}))}(e),function(t){var e=new Set;t.forEach((function(t){if(e.has(t.id))throw new T("Participant",t.id,"id",t.id);e.add(t.id)}))}(t),function(t){t.forEach((function(t){if(t.priorities.length!==new Set(t.priorities).size)throw new T("Participant",t.id,"priorities",t.priorities.toString())}))}(t),function(t,e){var n=e.map((function(t){return t.id}));t.forEach((function(t){t.priorities.forEach((function(e){if(!n.find((function(t){return t===e})))throw new D("Activity",e,"Participant",t.id)}))}))}(t,e)};function F(t,e){R(t.participants,e.activities);var n=(t.shuffleBeforeMatch?y()(t.participants):t.participants).map((function(t){return function(t){return k({},t,{_assigned:!1,set assigned(t){if(this._assigned&&t)throw Error("Participant ".concat(this.id," already assigned"));this._assigned=t},get assigned(){return this._assigned}})}(t)})),r=(e.shuffleBeforeMatch?y()(e.activities):e.activities).map((function(t){return function(t){return k({},t,{assignParticipant:function(t){if(!(this.participants.length<this.limit))throw new Error('Activity title="'.concat(this.title," is full"));this.participants.push(t)},isNotFull:function(){return this.participants.length<this.limit},participants:[]})}(t)}));return I(n,r),{participants:n,activities:r}}var I=function(t,e){var n=B(e),r=t[0].priorities.length,i=!0,a=!1,c=void 0;try{for(var s,o=n[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var l=s.value,u=z(t,l,r);console.log(l.title);var d=Z(l,u,r);console.log("Minimal priority to fill to minimum ".concat(d.priority+1,", index ").concat(d.index));var f=!0,h=!1,m=void 0;try{for(var x,j=p()(r)[Symbol.iterator]();!(f=(x=j.next()).done);f=!0){var b=x.value;console.log("Prio ".concat(b+1,": ").concat(u[b].length))}}catch(tt){h=!0,m=tt}finally{try{f||null==j.return||j.return()}finally{if(h)throw m}}V(l,u,d)}}catch(tt){a=!0,c=tt}finally{try{i||null==o.return||o.return()}finally{if(a)throw c}}console.log("Second round");var v=!0,y=!1,g=void 0;try{for(var w,N=K(n)[Symbol.iterator]();!(v=(w=N.next()).done);v=!0){var S=w.value,P=z(t,S,r),O=S.minimum-S.participants.length,M=P.flat();for(console.log("Try to fill delta ".concat(O," for ").concat(S.title));M.length>0&&S.minimum-S.participants.length>0;){var k=M.shift();!k.assigned&&S.isNotFull()?(S.assignParticipant(k),k.assigned=!0):console.warn("".concat(k.id," already matched!!"))}}}catch(tt){y=!0,g=tt}finally{try{v||null==N.return||N.return()}finally{if(y)throw g}}console.log("final round");var A=!0,E=!1,_=void 0;try{for(var C,L=X(n,t,r)[Symbol.iterator]();!(A=(C=L.next()).done);A=!0){var T=C.value;console.log(T.title);var D=z(t,T,r),R=!0,F=!1,I=void 0;try{for(var W,q=p()(r)[Symbol.iterator]();!(R=(W=q.next()).done);R=!0){var G=W.value,H=!0,J=!1,Q=void 0;try{for(var U,Y=p()(D[G].length)[Symbol.iterator]();!(H=(U=Y.next()).done);H=!0){U.value;var $=D[G].shift();!$.assigned&&T.isNotFull()?(T.assignParticipant($),$.assigned=!0):console.warn("".concat($.id," already matched!!"))}}catch(tt){J=!0,Q=tt}finally{try{H||null==Y.return||Y.return()}finally{if(J)throw Q}}}}catch(tt){F=!0,I=tt}finally{try{R||null==q.return||q.return()}finally{if(F)throw I}}}}catch(tt){E=!0,_=tt}finally{try{A||null==L.return||L.return()}finally{if(E)throw _}}},B=function(t){return t.filter((function(t){return t.limit>0}))},z=function(t,e,n){var r=p()(n).map((function(){return[]})),i=!0,a=!1,c=void 0;try{for(var s,o=function(t,n){var i=n.value;r.forEach((function(t,n){i.priorities[n]===e.id&&r[n].push(i)}))},l=t[Symbol.iterator]();!(i=(s=l.next()).done);i=!0)o(0,s)}catch(u){a=!0,c=u}finally{try{i||null==l.return||l.return()}finally{if(a)throw c}}return r},W=function(t){return t.filter((function(t){return!t.assigned}))},Z=function(t,e,n){for(var r=0,i=[],a=e.map((function(t){return t.slice(0)}));i.length<t.minimum&&a.flat().length>0&&r<n;){if(0===a[r].length&&r<n&&(r+=1),i.push(a[r].shift()),0===a.flat().length&&i.length<t.minimum)return{priority:-1,index:-1};if(i.length===t.minimum)break}return{priority:r,index:e[r].length-a[r].length-1}},V=function(t,e,n){var r=!0,i=!1,a=void 0;try{for(var c,s=p()(n.priority)[Symbol.iterator]();!(r=(c=s.next()).done);r=!0){var o=c.value,l=!0,u=!1,d=void 0;try{for(var f,h=p()(e[o].length)[Symbol.iterator]();!(l=(f=h.next()).done);l=!0){f.value;var m=e[o].shift();!m.assigned&&t.isNotFull()?(t.assignParticipant(m),m.assigned=!0):console.warn("".concat(m.id," already matched!!"))}}catch(w){u=!0,d=w}finally{try{l||null==h.return||h.return()}finally{if(u)throw d}}}}catch(w){i=!0,a=w}finally{try{r||null==s.return||s.return()}finally{if(i)throw a}}var x=!0,j=!1,b=void 0;try{for(var v,y=p()(n.index+1)[Symbol.iterator]();!(x=(v=y.next()).done);x=!0){v.value;var g=e[n.priority].shift();!g.assigned&&t.isNotFull()?(t.assignParticipant(g),g.assigned=!0):console.warn("".concat(g.id," already matched!!"))}}catch(w){j=!0,b=w}finally{try{x||null==y.return||y.return()}finally{if(j)throw b}}},K=function(t){return t.sort((function(t,e){var n=t.minimum-t.participants.length;return e.minimum-e.participants.length-n}))},X=function(t,e,n){return t.sort((function(t,r){var i=!0,a=!1,c=void 0;try{for(var s,o=p()(n)[Symbol.iterator]();!(i=(s=o.next()).done);i=!0){var l=s.value,u=z(e,t,n),d=z(e,r,n);if(W(d[l]).length>W(u[l]).length)return 1;if(W(u[l]).length>W(d[l]).length)return-1}}catch(f){a=!0,c=f}finally{try{i||null==o.return||o.return()}finally{if(a)throw c}}return 0}))},q=function(){var t,e=(0,c.useState)(),n=e[0],i=e[1],s=(0,c.useState)(),o=s[0],l=s[1],u=(0,c.useState)(),d=u[0],m=u[1],p=(0,c.useMemo)((function(){return n&&o}),[n,o]),x=(0,c.useMemo)((function(){return Object.fromEntries(null!==(t=null===o||void 0===o?void 0:o.participantsData.map((function(t){return[t.id,t.data]})))&&void 0!==t?t:[])}),[o]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h1",{className:"jsx-b9934d6490de9d4e",children:"Zuweiser"}),(0,r.jsx)(f,{onChange:i}),(0,r.jsx)(h,{onChange:l}),p&&(0,r.jsx)("button",{onClick:function(){m(F(o,n))},className:"jsx-b9934d6490de9d4e",children:"Priorit\xe4ten aufl\xf6sen"}),d&&(0,r.jsx)(b,{result:d,participantsData:x}),(0,r.jsx)(a(),{id:"b9934d6490de9d4e",children:"label.jsx-b9934d6490de9d4e{margin-right:1em}\nselect.jsx-b9934d6490de9d4e{margin-bottom:0.6em}\n#sheet-config.jsx-b9934d6490de9d4e{display:grid;\ngrid-area:config;\ngrid-template-columns:450px auto;\ngrid-template-areas:'header header' 'activities  participants'}\n#config-header.jsx-b9934d6490de9d4e{grid-area:header}\n#config-activities.jsx-b9934d6490de9d4e{grid-area:activities}\n#config-participants.jsx-b9934d6490de9d4e{grid-area:participants}"})]})}}},function(t){t.O(0,[802,774,888,179],(function(){return e=5301,t(t.s=e);var e}));var e=t.O();_N_E=e}]);