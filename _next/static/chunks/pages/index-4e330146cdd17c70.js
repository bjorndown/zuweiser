(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(7396)}])},7396:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return Q}});var n=i(5893),r=i(536),a=i.n(r),s=i(7294),c=function(e){var t=e.onChange,i=(0,s.useState)("\t"),r=i[0];i[1];return(0,n.jsxs)("div",{className:"jsx-9dbe652c94c65d4c container",children:[(0,n.jsx)("textarea",{rows:20,onChange:function(e){return t(function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.split("\n").slice(t?1:0).map((function(e){return e.trim().split(r).map((function(e){return e.trim()}))})).filter((function(e){return 1!==e.length}))}(e.target.value))},className:"jsx-9dbe652c94c65d4c input"}),(0,n.jsx)(a(),{id:"9dbe652c94c65d4c",children:".container.jsx-9dbe652c94c65d4c{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column wrap;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-flow:column wrap;flex-flow:column wrap;margin:1rem 0}.input.jsx-9dbe652c94c65d4c{max-width:700px}"})]})},o=function(e){var t=e.text;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{title:t,className:"jsx-ced004547a5ed728 explanation",children:"?"}),(0,n.jsx)(a(),{id:"ced004547a5ed728",children:".explanation.jsx-ced004547a5ed728{background:var(--ok);margin-left:.3rem;padding:0 5px;font-weight:bold;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%}"})]})},l=i(4184),u=i.n(l),d=i(4598),f=i.n(d),h=function(e){var t=e.children,i=e.type;return(0,n.jsx)("p",{className:u()(f().container,i),children:t})},m=function(e){var t=e.error,i=e.columns,r=e.table;return(0,n.jsxs)(n.Fragment,{children:[t&&(0,n.jsx)(h,{type:"bad",children:t}),!t&&i.length>0&&(0,n.jsx)("div",{className:"jsx-75eb681a21301031 preview",children:(0,n.jsxs)("table",{className:"jsx-75eb681a21301031",children:[(0,n.jsx)("thead",{className:"jsx-75eb681a21301031",children:(0,n.jsx)("tr",{className:"jsx-75eb681a21301031",children:i.map((function(e){return(0,n.jsx)("th",{title:e.matchedAs?'Erkannt als "'.concat(e.matchedAsLabel,'"'):"",className:"jsx-75eb681a21301031 "+(u()({"matched-column":e.matchedAs})||""),children:e.label},e.label)}))})}),(0,n.jsx)("tbody",{className:"jsx-75eb681a21301031",children:r.slice(1).map((function(e,t){return(0,n.jsx)("tr",{className:"jsx-75eb681a21301031",children:e.map((function(e,i){return(0,n.jsx)("td",{className:"jsx-75eb681a21301031",children:e},"cell-".concat(t,"-").concat(i))}))},"row-".concat(t))}))})]})}),(0,n.jsx)(a(),{id:"75eb681a21301031",children:".preview.jsx-75eb681a21301031{height:10rem;overflow:auto}.matched-column.jsx-75eb681a21301031{background:var(--ok)}th.jsx-75eb681a21301031{position:-webkit-sticky;position:sticky;top:0;left:0}"})]})},x=function(e){var t,i,r=e.onChange,l=(0,s.useState)(!0),u=l[0],d=l[1],f=(0,s.useState)(),h=f[0],x=f[1],p=function(e){return"id"===e.toLowerCase()},b=function(e){return e.toLowerCase().startsWith("name")||e.toLowerCase().startsWith("titel")},v=function(e){return e.toLowerCase().includes("limit")||e.toLowerCase().includes("max")},j=function(e){return e.toLowerCase().includes("minimum")},y=(0,s.useMemo)((function(){return null!==(t=null===h||void 0===h?void 0:h[0])&&void 0!==t?t:[]}),[h]),g=(0,s.useMemo)((function(){return null!==(i=null===h||void 0===h?void 0:h.slice(1))&&void 0!==i?i:[]}),[h]),w=(0,s.useMemo)((function(){return y.indexOf(y.find((function(e){return p(e)})))}),[y]),N=(0,s.useMemo)((function(){return y.indexOf(y.find((function(e){return b(e)})))}),[y]),P=(0,s.useMemo)((function(){return y.indexOf(y.find((function(e){return v(e)})))}),[y]),k=(0,s.useMemo)((function(){return y.indexOf(y.find((function(e){return j(e)})))}),[y]),A=(0,s.useMemo)((function(){return y.length?y.map((function(e,t){return p(e)?{label:e,matchedAsLabel:"ID",matchedAs:"id"}:b(e)?{label:e,matchedAs:"title",matchedAsLabel:"Titel"}:v(e)?{label:e,matchedAs:"limit",matchedAsLabel:"Limit"}:j(e)?{label:e,matchedAs:"minimum",matchedAsLabel:"Minimum"}:{label:e,matchedAs:void 0,matchedAsLabel:void 0}})):[]}),[y]),M=(0,s.useMemo)((function(){if(h)return!A||A.length<3?"Keine oder zu wenige Spalten erkannt. Minimum an Spalten: ID, Titel, Limit, Minimum":!A.find((function(e){return"id"===e.matchedAs}))?'Spalte "ID" nicht erkannt':!A.find((function(e){return"title"===e.matchedAs}))?'Spalte "Titel" nicht erkannt':!A.find((function(e){return"limit"===e.matchedAs}))?'Spalte "Limit" nicht erkannt':!!A.find((function(e){return"minimum"===e.matchedAs}))?void 0:'Spalte "Minimum" nicht erkannt'}),[h,A]),S=(0,s.useMemo)((function(){return M||!g.length?[]:g.map((function(e){return{id:e[w],title:e[N],limit:parseInt(e[P]),minimum:parseInt(e[k])}}))}),[M,g,y]);return(0,s.useEffect)((function(){r(M?void 0:{activities:S,shuffleBeforeMatch:u})}),[M,S,u]),(0,n.jsxs)("div",{className:"jsx-62bbc98b497c4570 container",children:[(0,n.jsx)("h2",{className:"jsx-62bbc98b497c4570",children:"Aktivit\xe4ten"}),(0,n.jsx)("input",{type:"checkbox",id:"shuffleActivitiesBeforeMatch",checked:u,onChange:function(){return d(!u)},className:"jsx-62bbc98b497c4570"}),(0,n.jsxs)("label",{htmlFor:"shuffleActivitiesBeforeMatch",className:"jsx-62bbc98b497c4570",children:["Vor dem Zuweisen mischen",(0,n.jsx)(o,{text:"Ohne Mischen ist die Reihenfolge der Eintr\xe4ge in der Tabelle massgebend, d.h. fr\xfche Eintr\xe4ge werden bevorzugt"})]}),(0,n.jsx)(c,{onChange:function(e){return x(e)}}),(0,n.jsx)(m,{error:M,columns:A,table:h}),(0,n.jsx)(a(),{id:"62bbc98b497c4570",children:".container.jsx-62bbc98b497c4570{min-width:400px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}"})]})},p=function(e){var t,i,r=e.onChange,l=(0,s.useState)(!0),u=l[0],d=l[1],f=(0,s.useState)(1),h=f[0],x=f[1],p=(0,s.useState)(),b=p[0],v=p[1],j=function(e){return"id"===e.toLowerCase()},y=function(e){return e.toLowerCase().includes("prio")||e.toLowerCase().includes("wahl")},g=(0,s.useMemo)((function(){return null!==(t=null===b||void 0===b?void 0:b[0])&&void 0!==t?t:[]}),[b]),w=(0,s.useMemo)((function(){return null!==(i=null===b||void 0===b?void 0:b.slice(1))&&void 0!==i?i:[]}),[b]),N=(0,s.useMemo)((function(){return g.indexOf(g.find((function(e){return j(e)})))}),[g]),P=(0,s.useMemo)((function(){return g.filter(y).map((function(e){return g.indexOf(e)}))}),[g]),k=(0,s.useMemo)((function(){return g.filter((function(e){return!y(e)&&!j(e)}))}),[g]),A=(0,s.useMemo)((function(){if(!g.length)return[];var e=g.filter(y);return g.map((function(t){return j(t)?{label:t,matchedAsLabel:"ID",matchedAs:"id"}:y(t)?{label:t,matchedAs:"priority",matchedAsLabel:"Priorit\xe4t ".concat(e.indexOf(t)+1)}:{label:t,matchedAs:void 0,matchedAsLabel:void 0}}))}),[g]),M=(0,s.useMemo)((function(){if(b){if(!A||A.length<3)return"Keine oder zu wenige Spalten erkannt. Minimum an Spalten: ID, Priorit\xe4t 1, Priorit\xe4t 2";if(!!!A.find((function(e){return"id"===e.matchedAs})))return'Spalte "ID" nicht erkannt';var e=A.filter((function(e){return"priority"===e.matchedAs})).length;return 0===e?"Keine Priorit\xe4ten-Spalten erkannt":1===e?"Nur eine Priorit\xe4ten-Spalten erkannt":void 0}}),[b,A]),S=(0,s.useMemo)((function(){return M||!b?[]:w.map((function(e){return{id:e[N],priorities:e.filter((function(e,t){return P.includes(t)})),otherAttributes:e.filter((function(e,t){return!P.concat(N).includes(t)}))}}))}),[M,b,w,N,P]);return(0,s.useEffect)((function(){r(M?void 0:{participants:S,shuffleBeforeMatch:u,activitiesPerPerson:h,prioritiesPerPerson:P.length,otherAttributesColumns:k})}),[M,S,u,h,P,k]),(0,n.jsxs)("div",{className:"jsx-e5979519b32ed23 container",children:[(0,n.jsx)("h2",{className:"jsx-e5979519b32ed23",children:"Teilnehmer"}),(0,n.jsx)("label",{htmlFor:"activitiesPerPerson",className:"jsx-e5979519b32ed23",children:"Aktivit\xe4ten pro Person"}),(0,n.jsx)("input",{id:"activitiesPerPerson",type:"number",value:h,onChange:function(e){return x(parseInt(e.target.value))},maxLength:1,size:3,className:"jsx-e5979519b32ed23"}),(0,n.jsx)("input",{type:"checkbox",id:"shuffleParticipantsBeforeMatch",checked:u,onChange:function(){return d(!u)},className:"jsx-e5979519b32ed23"}),(0,n.jsxs)("label",{htmlFor:"shuffleParticipantsBeforeMatch",className:"jsx-e5979519b32ed23",children:["Vor dem Zuweisen mischen",(0,n.jsx)(o,{text:"Ohne Mischen ist die Reihenfolge der Eintr\xe4ge in der Tabelle massgebend, d.h. fr\xfche Eintr\xe4ge werden bevorzugt"})]}),(0,n.jsx)(c,{onChange:function(e){return v(e)}}),(0,n.jsx)(m,{error:M,columns:A,table:b}),(0,n.jsx)(a(),{id:"e5979519b32ed23",children:".container.jsx-e5979519b32ed23{min-width:500px;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}"})]})},b=function(e){var t=e.fulfilledPriorities,i=e.totalParticipants;return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("ol",{children:t.map((function(e,t){return(0,n.jsxs)("li",{children:["Priorit\xe4t"," ",(0,n.jsx)("progress",{value:e,max:i})," ",e]},"priority-".concat(t))}))})})},v=i(6026),j=i.n(v),y=function(e){var t=e.result,i=e.particpantsConfig;return(0,n.jsxs)("div",{className:"jsx-1eb6440d3202b42d",children:[(0,n.jsxs)("article",{className:"jsx-1eb6440d3202b42d statistics",children:[(0,n.jsxs)("section",{className:"jsx-1eb6440d3202b42d",children:[(0,n.jsx)("h3",{className:"jsx-1eb6440d3202b42d",children:"Kurz\xfcbersicht"}),(0,n.jsxs)("table",{className:"jsx-1eb6440d3202b42d",children:[(0,n.jsx)("thead",{className:"jsx-1eb6440d3202b42d",children:(0,n.jsxs)("tr",{className:"jsx-1eb6440d3202b42d",children:[(0,n.jsx)("th",{className:"jsx-1eb6440d3202b42d",children:"Kurs"}),j()(0,i.activitiesPerPerson).map((function(e){return(0,n.jsxs)("th",{className:"jsx-1eb6440d3202b42d",children:["Durchf\xfchrung ",e+1]})})),(0,n.jsx)("th",{className:"jsx-1eb6440d3202b42d",children:"Minimum"}),(0,n.jsx)("th",{className:"jsx-1eb6440d3202b42d",children:"Limit"})]})}),(0,n.jsxs)("tbody",{className:"jsx-1eb6440d3202b42d",children:[t.activities.map((function(e){return(0,n.jsxs)("tr",{className:"jsx-1eb6440d3202b42d",children:[(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d",children:e.title}),j()(0,i.activitiesPerPerson).map((function(t){var i;return(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d number",children:null===(i=e.participants[t+1])||void 0===i?void 0:i.length})})),(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d number",children:e.minimum}),(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d number",children:e.limit})]},"activity-".concat(e.id))})),(0,n.jsxs)("tr",{className:"jsx-1eb6440d3202b42d totals",children:[(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d",children:"Total"}),j()(0,i.activitiesPerPerson).map((function(e){return(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d number",children:t.activities.reduce((function(t,i){return i.participantsByExecution(e+1).length+t}),0)})})),(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d number",children:t.activities.map((function(e){return e.minimum})).reduce((function(e,t){return e+t}))}),(0,n.jsx)("td",{className:"jsx-1eb6440d3202b42d number",children:t.activities.map((function(e){return e.limit})).reduce((function(e,t){return e+t}))})]})]})]})]}),(0,n.jsxs)("section",{className:"jsx-1eb6440d3202b42d",children:[(0,n.jsx)("h3",{className:"jsx-1eb6440d3202b42d",children:"Verteilung der erf\xfcllten Priorit\xe4ten"}),(0,n.jsx)(b,{fulfilledPriorities:function(e){var t={},i=!0,n=!1,r=void 0;try{for(var a,s=e.activities[Symbol.iterator]();!(i=(a=s.next()).done);i=!0){var c=a.value,o=!0,l=!1,u=void 0;try{for(var d,f=c.allParticipants()[Symbol.iterator]();!(o=(d=f.next()).done);o=!0){var h=d.value.priorities.indexOf(c.id);t[h]?t[h]++:t[h]=1}}catch(m){l=!0,u=m}finally{try{o||null==f.return||f.return()}finally{if(l)throw u}}}}catch(m){n=!0,r=m}finally{try{i||null==s.return||s.return()}finally{if(n)throw r}}return Object.keys(t).map((function(e){return t[e]}))}(t),totalParticipants:t.participants.length}),(0,n.jsx)("h3",{className:"jsx-1eb6440d3202b42d",children:"Gesamtbewertung"}),(0,n.jsx)("p",{className:"jsx-1eb6440d3202b42d",children:(0,n.jsxs)(n.Fragment,{children:[t.participants.reduce((function(e,t){return e+t.score()}),0),(0,n.jsx)(o,{text:"Je tiefer dieser Wert ist, desto besser. Er ist die Summe der erf\xfcllten Priorit\xe4ten pro Teilnehmer:in. Beispiel: Wird jemand seiner 1. und 5. Priorit\xe4t zugewiesen, dann ist ihre Bewertung 1 + 5 = 6. Eine fehlende Zuweisung wird mit der Anzahl Priorit\xe4ten gewertet."})]})})]})]}),(0,n.jsx)(a(),{id:"1eb6440d3202b42d",children:".statistics.jsx-1eb6440d3202b42d{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-moz-box-orient:horizontal;-moz-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;gap:1rem}"})]})},g=function(e){var t=e.result,i=e.participantsConfig,r=(0,s.useState)(!1),c=r[0],o=r[1];return(0,n.jsxs)("div",{className:"jsx-f64233d701ae89c container",children:[(0,n.jsx)("h3",{className:"jsx-f64233d701ae89c",children:c?"Alle Teilnehmer":"Teilnehmer mit zu wenig Aktivit\xe4ten"}),(0,n.jsx)("label",{htmlFor:"showAllParticipants",className:"jsx-f64233d701ae89c",children:"Alle Teilnehmer zeigen"}),(0,n.jsx)("input",{id:"showAllParticipants",type:"checkbox",checked:c,onChange:function(e){return o(!c)},className:"jsx-f64233d701ae89c"}),(0,n.jsx)("div",{className:"jsx-f64233d701ae89c fixed-header-scroll-container",children:(0,n.jsxs)("table",{className:"jsx-f64233d701ae89c",children:[(0,n.jsx)("thead",{className:"jsx-f64233d701ae89c",children:(0,n.jsxs)("tr",{className:"jsx-f64233d701ae89c",children:[(0,n.jsx)("th",{className:"jsx-f64233d701ae89c",children:"ID"}),i.otherAttributesColumns.map((function(e){return(0,n.jsx)("th",{className:"jsx-f64233d701ae89c",children:e})})),j()(0,i.prioritiesPerPerson).map((function(e){return(0,n.jsxs)("th",{className:"jsx-f64233d701ae89c",children:["Priorit\xe4t ",e+1]},e)})),j()(0,i.activitiesPerPerson).map((function(e){return(0,n.jsxs)("th",{className:"jsx-f64233d701ae89c",children:["Kurs ",e+1]})})),(0,n.jsx)("th",{className:"jsx-f64233d701ae89c",children:"Bewertung"})]})}),(0,n.jsx)("tbody",{className:"jsx-f64233d701ae89c",children:t.participants.filter((function(e){return!!c||e.needsMoreActivities()})).sort((function(e,t){return t.score()-e.score()})).map((function(e,r){return(0,n.jsxs)("tr",{className:"jsx-f64233d701ae89c",children:[(0,n.jsx)("td",{className:"jsx-f64233d701ae89c",children:e.id}),e.otherAttributes.map((function(e,t){return(0,n.jsx)("td",{className:"jsx-f64233d701ae89c",children:e},"property-".concat(t))})),e.priorities.map((function(i){var r=t.activities.find((function(e){return e.id===i})),a=e.activities.find((function(e){return e.activity.id===r.id}));return(0,n.jsx)("td",{className:"jsx-f64233d701ae89c "+(u()({assigned:!!a})||""),children:(0,n.jsx)(n.Fragment,{children:a?"".concat(r.title," (").concat(a.execution,")"):r.title})},i)})),j()(0,i.activitiesPerPerson).map((function(t){var i=e.activities[t];return i?(0,n.jsx)("td",{className:"jsx-f64233d701ae89c",children:"".concat(i.activity.title," ").concat(i.execution)},t):(0,n.jsx)("td",{className:"jsx-f64233d701ae89c"},t)})),(0,n.jsx)("td",{className:"jsx-f64233d701ae89c",children:e.score()})]},"participant-".concat(e.id,"-").concat(r))}))})]})}),(0,n.jsx)(a(),{id:"f64233d701ae89c",children:".container.jsx-f64233d701ae89c{}.assigned.jsx-f64233d701ae89c{font-weight:bold}.fixed-header-scroll-container.jsx-f64233d701ae89c{max-height:55rem;overflow:auto}th.jsx-f64233d701ae89c{position:-webkit-sticky;position:sticky;top:0;left:0}"})]})},w=function(e){var t=e.activity,i=e.participantsConfig,r=e.result,c=(0,s.useMemo)((function(){return t.participantsWithExecution()}),[t]),o=function(e){return e.otherAssignedActivities(t).map((function(e){var t=e.activity,i=e.priority;return"".concat(t.title," (Prio ").concat(i+1,")")})).join(", ")};return(0,n.jsxs)("article",{className:"jsx-74bce0fcf5fa9ef6 matched-activity-container",children:[(0,n.jsx)("h4",{className:"jsx-74bce0fcf5fa9ef6",children:function(e){return"".concat(e.title," (").concat(c.length," / ").concat(e.limit*i.activitiesPerPerson,")")}(t)}),(0,n.jsxs)("table",{className:"jsx-74bce0fcf5fa9ef6 matching-result",children:[(0,n.jsx)("thead",{className:"jsx-74bce0fcf5fa9ef6",children:(0,n.jsxs)("tr",{className:"jsx-74bce0fcf5fa9ef6",children:[(0,n.jsx)("th",{className:"jsx-74bce0fcf5fa9ef6",children:"#"}),i.otherAttributesColumns.map((function(e){return(0,n.jsx)("th",{className:"jsx-74bce0fcf5fa9ef6",children:e})})),(0,n.jsx)("th",{className:"jsx-74bce0fcf5fa9ef6",children:"Priorit\xe4t"}),i.activitiesPerPerson>1&&(0,n.jsx)("th",{className:"jsx-74bce0fcf5fa9ef6",children:"Durchf\xfchrung"})]})}),(0,n.jsx)("tbody",{className:"jsx-74bce0fcf5fa9ef6",children:c.map((function(e,a){var s=e.participant,c=e.execution;return(0,n.jsxs)("tr",{title:i.activitiesPerPerson>1?"Andere Kurse: ".concat(o(s)):"",onClick:function(){return console.log("Alternativen",s.otherPossiblePriorities(r.activities))},className:"jsx-74bce0fcf5fa9ef6",children:[(0,n.jsx)("td",{className:"jsx-74bce0fcf5fa9ef6",children:a+1}),s.otherAttributes.map((function(e,t){return(0,n.jsx)("td",{className:"jsx-74bce0fcf5fa9ef6",children:e},"property-".concat(t))})),(0,n.jsx)("td",{className:"jsx-74bce0fcf5fa9ef6 priority-column",children:s.priorities.indexOf(t.id)+1}),i.activitiesPerPerson>1&&(0,n.jsx)("td",{className:"jsx-74bce0fcf5fa9ef6",children:c})]},"participant-".concat(s.id))}))})]}),(0,n.jsx)(a(),{id:"74bce0fcf5fa9ef6",children:"table.matching-result.jsx-74bce0fcf5fa9ef6{min-width:350px;max-width:550px}.matched-activity-container.jsx-74bce0fcf5fa9ef6{display:block}.priority-column.jsx-74bce0fcf5fa9ef6{text-align:center}"})]},"activity-".concat(t.id))},N=function(e){var t=e.result,i=e.participantsConfig;return t.participants.map((function(e){var i=e.otherPossiblePriorities(t.activities);i.length&&console.log("possible",e,i)})),(0,n.jsxs)("div",{className:"jsx-9ca720909a472cb3",children:[(0,n.jsx)("h2",{className:"jsx-9ca720909a472cb3",children:"Resultat"}),(0,n.jsx)(y,{result:t,particpantsConfig:i}),(0,n.jsx)(g,{result:t,participantsConfig:i}),(0,n.jsxs)("section",{className:"jsx-9ca720909a472cb3",children:[(0,n.jsx)("h3",{className:"jsx-9ca720909a472cb3",children:"Zuweisungen pro Kurs"}),(0,n.jsx)("div",{className:"jsx-9ca720909a472cb3 matching-results",children:t.activities.map((function(e){return(0,n.jsx)(w,{activity:e,participantsConfig:i,result:t},"activity-".concat(e.id))}))})]}),(0,n.jsx)(a(),{id:"9ca720909a472cb3",children:".matching-results.jsx-9ca720909a472cb3{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-moz-box-orient:horizontal;-moz-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;gap:1rem}"})]})},P=i(9983),k=i.n(P),A=i(4111),M=i(1438),S=i(2951),C=i(8668),z=i(603),E=i(5892),T=i(6626),B=i(4051),L=i.n(B),O=function(){function e(t,i){(0,M.Z)(this,e),this.participant=t,this.config=i,this.activities=[]}var t=e.prototype;return t.assign=function(e,t){if(!this.needsMoreActivities())throw new Error("Participant has reached limit of activities per person");if(this.isAssignedTo(e,t))throw new Error("Participant is already assigned to this activity");this.activities.push({activity:e,execution:t})},t.isAssignedTo=function(e,t){return this.activities.some((function(i){return i.activity.id===e.id&&i.execution===t}))},t.canBeAssignedTo=function(e,t){var i=this.activities.some((function(e){return e.execution===t})),n=this.activities.some((function(t){return t.activity.id===e.id}));return this.needsMoreActivities()&&!this.isAssignedTo(e,t)&&e.isNotFull(t)&&!i&&!n},t.needsMoreActivities=function(){return this.activities.length<this.config.activitiesPerPerson},t.otherAssignedActivities=function(e){var t=this;return this.activities.filter((function(t){return t.activity.id!==e.id})).map((function(e){var i=e.activity;e.execution;return{activity:i,priority:t.priorities.indexOf(i.id)}}))},t.otherPossiblePriorities=function(e){var t=this;return this.priorities.map((function(t){return e.find((function(e){return e.id===t}))})).map((function(e){return j()(1,t.config.activitiesPerPerson+1).map((function(i){return{execution:i,activity:e,canBeAssigned:t.canBeAssignedTo(e,i),priority:t.priorities.indexOf(e.id)}}))})).flat().filter((function(e){return e.canBeAssigned}))},t.score=function(){var e=this;return this.activities.map((function(t){return e.priorities.indexOf(t.activity.id)+1})).reduce((function(e,t){return e+t}),0)+(this.config.activitiesPerPerson-this.activities.length)*this.priorities.length},(0,S.Z)(e,[{key:"id",get:function(){return this.participant.id}},{key:"priorities",get:function(){return this.participant.priorities}},{key:"otherAttributes",get:function(){return this.participant.otherAttributes}}]),e}(),Z=function(){function e(t,i){var n=this;(0,M.Z)(this,e),this.activity=t,this.participants={},j()(1,i.activitiesPerPerson+1).forEach((function(e){return n.participants[e]=[]}))}var t=e.prototype;return t.allParticipants=L().mark((function e(){var t,i,n,r,a,s,c,o,l,u,d,f,h;return L().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=!0,i=!1,n=void 0,e.prev=1,r=Object.entries(this.participants)[Symbol.iterator]();case 3:if(t=(a=r.next()).done){e.next=32;break}s=(0,z.Z)(a.value,2),s[0],c=s[1],o=!0,l=!1,u=void 0,e.prev=6,d=c[Symbol.iterator]();case 8:if(o=(f=d.next()).done){e.next=15;break}return h=f.value,e.next=12,h;case 12:o=!0,e.next=8;break;case 15:e.next=21;break;case 17:e.prev=17,e.t0=e.catch(6),l=!0,u=e.t0;case 21:e.prev=21,e.prev=22,o||null==d.return||d.return();case 24:if(e.prev=24,!l){e.next=27;break}throw u;case 27:return e.finish(24);case 28:return e.finish(21);case 29:t=!0,e.next=3;break;case 32:e.next=38;break;case 34:e.prev=34,e.t1=e.catch(1),i=!0,n=e.t1;case 38:e.prev=38,e.prev=39,t||null==r.return||r.return();case 41:if(e.prev=41,!i){e.next=44;break}throw n;case 44:return e.finish(41);case 45:return e.finish(38);case 46:case"end":return e.stop()}}),e,this,[[1,34,38,46],[6,17,21,29],[22,,24,28],[39,,41,45]])})),t.participantsByExecution=function(e){var t;return null!==(t=this.participants[e])&&void 0!==t?t:[]},t.participantsWithExecution=function(){return Object.entries(this.participants).map((function(e){var t=(0,z.Z)(e,2),i=t[0];return t[1].map((function(e){return{participant:e,execution:i}}))})).flat(2)},t.assignParticipant=function(e,t){if(!this.isNotFull(t))throw new Error('Activity title="'.concat(this.title," is full"));if(this.participants[t].some((function(t){return t.id===e.id})))throw new Error("Participant already in this activity");this.participants[t].push(e),e.assign(this,t)},t.isNotFull=function(e){return this.participants[e].length<this.limit},(0,S.Z)(e,[{key:"id",get:function(){return this.activity.id}},{key:"minimum",get:function(){return this.activity.minimum}},{key:"limit",get:function(){return this.activity.limit}},{key:"title",get:function(){return this.activity.title}}]),e}(),F=function(e){(0,C.Z)(i,e);var t=(0,T.Z)(i);function i(e,n,r,a){var s;return(0,M.Z)(this,i),(s=t.call(this,"".concat(r,"=").concat(a," not unique for ").concat(e," with id=").concat(n))).entityType=e,s.entityId=n,s.propertyName=r,s.propertyValue=a,Object.setPrototypeOf((0,A.Z)(s),i.prototype),s}return i}((0,E.Z)(Error)),_=function(e){(0,C.Z)(i,e);var t=(0,T.Z)(i);function i(e,n,r,a){var s;return(0,M.Z)(this,i),(s=t.call(this,"".concat(e," with id=").concat(n," does not exist. Referred to by ").concat(r," with id=").concat(a))).entityType=e,s.id=n,s.referrerType=r,s.referrerId=a,Object.setPrototypeOf((0,A.Z)(s),i.prototype),s}return i}((0,E.Z)(Error)),I=function(e,t){!function(e){var t=new Set;e.forEach((function(e){if(t.has(e.id))throw new F("Activity",e.id,"id",e.id);t.add(e.id)}))}(t),function(e){var t=new Set;e.forEach((function(e){if(t.has(e.id))throw new F("Participant",e.id,"id",e.id);t.add(e.id)}))}(e),function(e){e.forEach((function(e){if(e.priorities.length!==new Set(e.priorities).size)throw new F("Participant",e.id,"priorities",e.priorities.toString())}))}(e),function(e,t){var i=t.map((function(e){return e.id}));e.forEach((function(e){e.priorities.forEach((function(t){if(!i.find((function(e){return e===t})))throw new _("Activity",t,"Participant",e.id)}))}))}(e,t)};var D=function(e,t,i){var n=K(t),r=i.prioritiesPerPerson,a=!0,s=!1,c=void 0;try{for(var o,l=n[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var u=o.value,d=!0,f=!1,h=void 0;try{for(var m,x=j()(1,i.activitiesPerPerson+1)[Symbol.iterator]();!(d=(m=x.next()).done);d=!0){var p=m.value,b=W(e,u,r);console.log(u.title);var v=R(u,b,r);console.log("Minimal priority to fill to minimum ".concat(v.priority+1,", index ").concat(v.index));var y=!0,g=!1,w=void 0;try{for(var N,P=j()(r)[Symbol.iterator]();!(y=(N=P.next()).done);y=!0){var k=N.value;console.log("Prio ".concat(k+1,": ").concat(b[k].length))}}catch(je){g=!0,w=je}finally{try{y||null==P.return||P.return()}finally{if(g)throw w}}X(u,b,v,p)}}catch(je){f=!0,h=je}finally{try{d||null==x.return||x.return()}finally{if(f)throw h}}}}catch(je){s=!0,c=je}finally{try{a||null==l.return||l.return()}finally{if(s)throw c}}console.log("Second round");var A=!0,M=!1,S=void 0;try{for(var C,z=j()(1,i.activitiesPerPerson+1)[Symbol.iterator]();!(A=(C=z.next()).done);A=!0){var E=C.value,T=!0,B=!1,L=void 0;try{for(var O,Z=q(n,E)[Symbol.iterator]();!(T=(O=Z.next()).done);T=!0){var F=O.value,_=W(e,F,r),I=F.minimum-F.participants[E].length,D=_.flat();for(console.log("Try to fill delta ".concat(I," for ").concat(F.title));D.length>0&&F.minimum-F.participants[E].length>0;){var V=D.shift();V.canBeAssignedTo(F,E)&&F.assignParticipant(V,E)}}}catch(je){B=!0,L=je}finally{try{T||null==Z.return||Z.return()}finally{if(B)throw L}}}}catch(je){M=!0,S=je}finally{try{A||null==z.return||z.return()}finally{if(M)throw S}}console.log("final round");var J=!0,H=!1,Q=void 0;try{for(var U,Y=G(n,e,r)[Symbol.iterator]();!(J=(U=Y.next()).done);J=!0){var $=U.value,ee=!0,te=!1,ie=void 0;try{for(var ne,re=j()(1,i.activitiesPerPerson+1)[Symbol.iterator]();!(ee=(ne=re.next()).done);ee=!0){var ae=ne.value,se=W(e,$,r),ce=!0,oe=!1,le=void 0;try{for(var ue,de=j()(r)[Symbol.iterator]();!(ce=(ue=de.next()).done);ce=!0){var fe=ue.value,he=!0,me=!1,xe=void 0;try{for(var pe,be=j()(se[fe].length)[Symbol.iterator]();!(he=(pe=be.next()).done);he=!0){pe.value;var ve=se[fe].shift();ve.canBeAssignedTo($,ae)&&$.assignParticipant(ve,ae)}}catch(je){me=!0,xe=je}finally{try{he||null==be.return||be.return()}finally{if(me)throw xe}}}}catch(je){oe=!0,le=je}finally{try{ce||null==de.return||de.return()}finally{if(oe)throw le}}}}catch(je){te=!0,ie=je}finally{try{ee||null==re.return||re.return()}finally{if(te)throw ie}}}}catch(je){H=!0,Q=je}finally{try{J||null==Y.return||Y.return()}finally{if(H)throw Q}}},K=function(e){return e.filter((function(e){return e.limit>0}))},W=function(e,t,i){var n=j()(i).map((function(){return[]})),r=!0,a=!1,s=void 0;try{for(var c,o=function(){var e=c.value;n.forEach((function(i,r){e.priorities[r]===t.id&&n[r].push(e)}))},l=e[Symbol.iterator]();!(r=(c=l.next()).done);r=!0)o()}catch(u){a=!0,s=u}finally{try{r||null==l.return||l.return()}finally{if(a)throw s}}return n},V=function(e){return e.filter((function(e){return e.needsMoreActivities()}))},R=function(e,t,i){for(var n=0,r=[],a=t.map((function(e){return e.slice(0)}));r.length<e.minimum&&a.flat().length>0&&n<i;){if(0===a[n].length&&n<i&&(n+=1),r.push(a[n].shift()),0===a.flat().length&&r.length<e.minimum)return{priority:-1,index:-1};if(r.length===e.minimum)break}return{priority:n,index:t[n].length-a[n].length-1}},X=function(e,t,i,n){var r=!0,a=!1,s=void 0;try{for(var c,o=j()(i.priority)[Symbol.iterator]();!(r=(c=o.next()).done);r=!0){var l=c.value,u=!0,d=!1,f=void 0;try{for(var h,m=j()(t[l].length)[Symbol.iterator]();!(u=(h=m.next()).done);u=!0){h.value;var x=t[l].shift();x.canBeAssignedTo(e,n)&&e.assignParticipant(x,n)}}catch(N){d=!0,f=N}finally{try{u||null==m.return||m.return()}finally{if(d)throw f}}}}catch(N){a=!0,s=N}finally{try{r||null==o.return||o.return()}finally{if(a)throw s}}var p=!0,b=!1,v=void 0;try{for(var y,g=j()(i.index+1)[Symbol.iterator]();!(p=(y=g.next()).done);p=!0){y.value;var w=t[i.priority].shift();w.canBeAssignedTo(e,n)&&e.assignParticipant(w,n)}}catch(N){b=!0,v=N}finally{try{p||null==g.return||g.return()}finally{if(b)throw v}}},q=function(e,t){return e.sort((function(e,i){var n=e.minimum-e.participants[t].length;return i.minimum-i.participants[t].length-n}))},G=function(e,t,i){return e.sort((function(e,n){var r=!0,a=!1,s=void 0;try{for(var c,o=j()(i)[Symbol.iterator]();!(r=(c=o.next()).done);r=!0){var l=c.value,u=W(t,e,i),d=W(t,n,i);if(V(d[l]).length>V(u[l]).length)return 1;if(V(u[l]).length>V(d[l]).length)return-1}}catch(f){a=!0,s=f}finally{try{r||null==o.return||o.return()}finally{if(a)throw s}}return 0}))},J=function(e){var t=e.participantsConfig,i=e.activitiesConfig,r=function(e,i){return t.participants.reduce((function(t,n){return n.priorities[e]===i?t+1:t}),0)};return(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Verteilung der Priorit\xe4ten pro Kurs"}),(0,n.jsxs)("table",{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"ID"}),(0,n.jsx)("th",{children:"Titel"}),(0,n.jsx)("th",{children:"Minimum"}),(0,n.jsx)("th",{children:"Maximum"}),j()(1,t.prioritiesPerPerson+1).map((function(e,t){return(0,n.jsxs)("th",{children:["Anzahl Prio ",t+1]},"prio".concat(t))}))]})}),(0,n.jsx)("tbody",{children:i.activities.map((function(e){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:e.id}),(0,n.jsx)("td",{children:e.title}),(0,n.jsx)("td",{children:e.minimum}),(0,n.jsx)("td",{children:e.limit}),j()(0,t.prioritiesPerPerson).map((function(t,i){return(0,n.jsx)("td",{children:r(t,e.id)},"prio".concat(i))}))]},"activity".concat(e.id))}))})]})]})},H=function(e){var t=e.participantsConfig,i=e.activitiesConfig,r=(0,s.useMemo)((function(){return t.participants.length}),[i,t]),a=(0,s.useMemo)((function(){return i.activities.reduce((function(e,t){return e+t.limit}),0)}),[i,t]);return a<r?(0,n.jsxs)(h,{type:"bad",children:["Es fehlen ",r-a," Pl\xe4tze. Im Moment werden ",a," Pl\xe4tze angeboten. F\xfcr"," ",t.participants.length," Teilnehmer:innen, die"," ",t.activitiesPerPerson," Aktivit\xe4ten besuchen sollen, werden mindestens ",r," Pl\xe4tze ben\xf6tigt."]}):null},Q=function(){var e=(0,s.useState)(),t=e[0],i=e[1],r=(0,s.useState)(),c=r[0],o=r[1],l=(0,s.useState)(),u=l[0],d=l[1],f=(0,s.useState)(),m=f[0],b=f[1],v=(0,s.useMemo)((function(){var e,i;return(null===t||void 0===t||null===(e=t.activities)||void 0===e?void 0:e.length)&&(null===c||void 0===c||null===(i=c.participants)||void 0===i?void 0:i.length)}),[t,c]);(0,s.useEffect)((function(){d(void 0)}),[t,c]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h1",{className:"jsx-71568fd074756783",children:"Zuweiser"}),(0,n.jsxs)("div",{id:"config",className:"jsx-71568fd074756783",children:[(0,n.jsx)(x,{onChange:function(e){b(void 0),i(e)}}),(0,n.jsx)(p,{onChange:function(e){b(void 0),o(e)}})]}),v&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(J,{participantsConfig:c,activitiesConfig:t}),(0,n.jsx)(H,{participantsConfig:c,activitiesConfig:t}),(0,n.jsx)("button",{onClick:function(){try{d(function(e,t){I(e.participants,t.activities);var i=(e.shuffleBeforeMatch?k()(e.participants):e.participants).map((function(t){return new O(t,e)})),n=(t.shuffleBeforeMatch?k()(t.activities):t.activities).map((function(t){return new Z(t,e)}));return D(i,n,e),{participants:i,activities:n}}(c,t))}catch(m){console.error(m),b(m)}},className:"jsx-71568fd074756783 matchButton",children:"Priorit\xe4ten aufl\xf6sen"}),m&&(0,n.jsx)(h,{type:"bad",children:m.message})]}),u&&(0,n.jsx)(N,{result:u,participantsConfig:c}),(0,n.jsx)(a(),{id:"71568fd074756783",children:"@media screen and (min-width:500px){#config.jsx-71568fd074756783{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column wrap;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-flow:column wrap;flex-flow:column wrap}}#config.jsx-71568fd074756783{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-moz-box-orient:horizontal;-moz-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:start;-webkit-justify-content:flex-start;-moz-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-column-gap:1rem;-moz-column-gap:1rem;column-gap:1rem}.matchButton.jsx-71568fd074756783{margin-top:1rem;padding:.5rem;font-size:larger}"})]})}},4598:function(e){e.exports={container:"Message_container__uABwy"}}},function(e){e.O(0,[302,774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);