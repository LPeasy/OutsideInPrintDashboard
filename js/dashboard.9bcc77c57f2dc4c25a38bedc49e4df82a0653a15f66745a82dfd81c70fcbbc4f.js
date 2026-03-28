(()=>{var C=[{key:"pageviews",label:"Pageviews",kind:"number"},{key:"unique_visitors",label:"Unique visitors",kind:"number"},{key:"reads",label:"Read events",kind:"number"},{key:"read_rate",label:"Read rate",kind:"percent"},{key:"pdf_downloads",label:"PDF downloads",kind:"number"},{key:"newsletter_submits",label:"Newsletter submits",kind:"number"}],me=10,K=10,B=5,F={period:"30d",section:"all",sourceType:"all",metric:"pageviews",scale:"absolute",sort:"views",selectedSection:"",compareSections:[],compareEssays:[],selectedEssay:""};function i(e){let s=Number(e);return Number.isFinite(s)?s:0}function v(e,s=""){return e==null||e===""?s:String(e)}function x(e){return Array.isArray(e)?e:[]}function L(e,s="Unlabeled"){let a=v(e).trim();if(!a)return s;let t=a.toLowerCase();return t==="essay"||t==="essays"?"Essays":t==="working paper"||t==="working papers"||t==="working-paper"||t==="working-papers"?"Working Papers":t==="dialogue"||t==="dialogues"||t==="syd and oliver"||t==="syd & oliver"||t==="s and o"||t==="s & o"?"Dialogues":t==="collection"||t==="collections"?"Collections":a}function V(e){return[...e].sort((s,a)=>v(s.date).localeCompare(v(a.date)))}function f(e,s){return e.reduce((a,t)=>a+i(t[s]),0)}function $(e,s){return s>0?Math.round(e/s*1e3)/10:0}function P(e){return[...new Set(e.filter(Boolean))]}function fe(e){return e?P(String(e).split(",").map(s=>s.trim())):[]}function te(e,s,a=4){let t=new Set(s);return P(e).filter(r=>t.has(r)).slice(0,a)}function T(e){let s=v(e.discovery_type||e.source_type||e.type);if(s)return s;let a=v(e.source).toLowerCase(),t=v(e.medium).toLowerCase(),r=v(e.campaign).toLowerCase();return a==="direct"?"direct":a.startsWith("internal")?"internal":r||t==="campaign"||t==="generated"||t==="email"?"campaign":a?"external":"unknown"}function D(e,s){return e.kind==="percent"?`${i(s).toFixed(1)}%`:new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(i(s))}function ae(e,s,a){let t=i(e),r=i(s),o=t-r;if(r<=0&&t<=0)return"Flat vs previous window";if(r<=0)return`${D(a,o)} above a zero baseline`;let d=o>0?"up":o<0?"down":"flat",b=Math.abs(o/r*100);return d==="flat"?"Flat vs previous window":`${d} ${b.toFixed(1)}% vs previous window`}function j(e,s){if(s==="all")return[...e];let a=Number.parseInt(s,10);return!Number.isFinite(a)||a<=0?[...e]:e.slice(Math.max(0,e.length-a))}function oe(e,s){if(!s.length)return[];let a=s[0].date,t=e.findIndex(r=>r.date===a);return t<=0?[]:e.slice(Math.max(0,t-s.length),t)}function _e(e){return C.find(s=>s.key===e)||C[0]}function re(e){return{date:v(e.date),pageviews:i(e.pageviews||e.views),unique_visitors:i(e.unique_visitors||e.visitors),reads:i(e.reads),read_rate:i(e.read_rate),pdf_downloads:i(e.pdf_downloads),newsletter_submits:i(e.newsletter_submits)}}function J(e,s){return{label:v(e[s]),discovery_type:T(e),discovery_mode:v(e.discovery_mode),module_slot:v(e.module_slot),collection:v(e.collection),section:L(e.section),slug:v(e.slug),path:v(e.path),title:v(e.title,v(e[s],"Untitled")),views:i(e.views),reads:i(e.reads),read_rate:i(e.read_rate),pdf_downloads:i(e.pdf_downloads),pdf_rate:i(e.pdf_rate),newsletter_submits:i(e.newsletter_submits),newsletter_rate:i(e.newsletter_rate),approximate_downstream:!!e.approximate_downstream,attribution_note:v(e.attribution_note)}}function we(e,s){let a=v(e.path),t=i(e.views),r=i(e.reads);return{slug:v(e.slug),path:a,title:v(e.title,"Untitled"),section:L(e.section),views:t,reads:r,read_rate:i(e.read_rate)||$(r,t),pdf_downloads:i(e.pdf_downloads),primary_source:v(e.primary_source,"Unattributed"),series:s.get(a)||[]}}function ge(e={}){let s={range_label:v(e.overview?.range_label,"Snapshot"),updated_at:v(e.overview?.updated_at),pageviews:i(e.overview?.pageviews),unique_visitors:i(e.overview?.unique_visitors),reads:i(e.overview?.reads),read_rate:i(e.overview?.read_rate),pdf_downloads:i(e.overview?.pdf_downloads),newsletter_submits:i(e.overview?.newsletter_submits)},a=V(x(e.timeseries_daily).map(re)),t=new Map(x(e.essays_timeseries).map(p=>[v(p.path),V(x(p.series).map(re))])),r=x(e.essays).map(p=>we(p,t)),d=[...x(e.sections).reduce((p,n)=>{let y=L(n.section),w=p.get(y)||{section:y,pageviews:0,reads:0,pdf_downloads:0,newsletter_submits:0,sparkline_pageviews:[],sparkline_reads:[]},k=Array.isArray(n.sparkline_pageviews)?n.sparkline_pageviews.map(i):[],S=Array.isArray(n.sparkline_reads)?n.sparkline_reads.map(i):[],E=Math.max(w.sparkline_pageviews.length,k.length);return w.pageviews+=i(n.pageviews||n.views),w.reads+=i(n.reads),w.pdf_downloads+=i(n.pdf_downloads),w.newsletter_submits+=i(n.newsletter_submits),w.sparkline_pageviews=Array.from({length:E},(ye,q)=>i(w.sparkline_pageviews[q])+i(k[q])),w.sparkline_reads=Array.from({length:E},(ye,q)=>i(w.sparkline_reads[q])+i(S[q])),p.set(y,w),p},new Map).values()].map(p=>({...p,read_rate:i(p.pageviews)>0?$(p.reads,p.pageviews):0})).sort((p,n)=>n.pageviews-p.pageviews||n.reads-p.reads),b=x(e.journeys).map(p=>({discovery_source:v(p.discovery_source,"Direct"),discovery_type:T(p),discovery_mode:v(p.discovery_mode,"article-discovery"),module_slot:v(p.module_slot),collection:v(p.collection),slug:v(p.slug),path:v(p.path),title:v(p.title,"Untitled"),section:L(p.section),views:i(p.views),reads:i(p.reads),pdf_downloads:i(p.pdf_downloads),newsletter_submits:i(p.newsletter_submits),approximate_downstream:!!p.approximate_downstream,attribution_note:v(p.attribution_note)})),c=x(e.journey_by_source).map(p=>J(p,"discovery_source")),l=x(e.journey_by_collection).map(p=>J(p,"collection_label")),h=x(e.journey_by_essay).map(p=>J(p,"title")),_=x(e.sources).map(p=>{let n=i(p.pageviews||p.views),y=i(p.reads);return{source:v(p.source,"Direct"),medium:v(p.medium),campaign:v(p.campaign),content:v(p.content),visitors:i(p.visitors),pageviews:n,reads:y,read_rate:$(y,n)}}),m=V(x(e.sources_timeseries).map(p=>({date:v(p.date),source_type:T(p),source:v(p.source,"Direct"),pageviews:i(p.pageviews||p.views),reads:i(p.reads),read_rate:i(p.read_rate),pdf_downloads:i(p.pdf_downloads),newsletter_submits:i(p.newsletter_submits)})));return{overview:s,daily:a,sections:d,essays:r,journeys:b,journeyBySource:c,journeyByCollection:l,journeyByEssay:h,sources:_,sourceSeries:m,periods:x(e.periods),sectionOptions:P(d.map(p=>p.section).concat(r.map(p=>p.section))).sort(),sourceTypeOptions:P(b.map(T).concat(m.map(T))).sort()}}function O(e,s=""){let a=new URLSearchParams(String(s).replace(/^\?/,"")),t={...F};Object.keys(F).forEach(o=>{a.has(o)&&(t[o]=Array.isArray(F[o])?fe(a.get(o)):a.get(o)||F[o])}),!e.sectionOptions.includes(t.section)&&t.section!=="all"&&(t.section=L(t.section,"")),!e.sectionOptions.includes(t.section)&&t.section!=="all"&&(t.section="all"),!e.sourceTypeOptions.includes(t.sourceType)&&t.sourceType!=="all"&&(t.sourceType="all"),C.some(o=>o.key===t.metric)||(t.metric=F.metric),t.selectedSection=L(t.selectedSection,""),e.sectionOptions.includes(t.selectedSection)||(t.selectedSection=""),t.compareSections=te(t.compareSections.map(o=>L(o,"")),e.sectionOptions);let r=e.essays.map(o=>o.path);return r.includes(t.selectedEssay)||(t.selectedEssay=""),t.compareEssays=te(t.compareEssays,r),t}function W(e){let s=new URLSearchParams;return Object.entries(e).forEach(([a,t])=>{if(Array.isArray(t)){t.length&&s.set(a,t.join(","));return}t&&t!==F[a]&&s.set(a,t)}),s.toString()}function R(e,s){return s.section==="all"||v(e.section)===s.section}function M(e,s){return s.sourceType==="all"||T(e)===s.sourceType}function N(e,s){let a=j(e.series||[],s.period),t=oe(e.series||[],a);return{...e,trend:a.map(r=>r.pageviews),recent_views:f(a,"pageviews"),recent_reads:f(a,"reads"),recent_pdf_downloads:f(a,"pdf_downloads"),recent_newsletter_submits:f(a,"newsletter_submits"),recent_read_rate:$(f(a,"reads"),f(a,"pageviews")),previous_views:f(t,"pageviews")}}function $e(e){let s=new Map;return e.forEach(a=>{(a.series||[]).forEach(t=>{let r=s.get(t.date)||{date:t.date,pageviews:0,unique_visitors:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0};r.pageviews+=i(t.pageviews),r.reads+=i(t.reads),r.pdf_downloads+=i(t.pdf_downloads),r.newsletter_submits+=i(t.newsletter_submits),s.set(t.date,r)})}),V([...s.values()]).map(a=>({...a,read_rate:$(a.reads,a.pageviews)}))}function xe(e){return e.length?i(e[e.length-1])-i(e[0]):0}function ne(e,s,a,t){return P([s].concat(a).filter(Boolean)).map(r=>e.find(o=>o[t]===r)).filter(Boolean).slice(0,4)}function Se(e,s){let a=j(e.daily,s.period),t=oe(e.daily,a),r=e.overview;return C.map(o=>{let d=o.key==="read_rate"?a.length?$(f(a,"reads"),f(a,"pageviews")):i(r[o.key]):a.length?f(a,o.key):i(r[o.key]),b=o.key==="read_rate"?t.length?$(f(t,"reads"),f(t,"pageviews")):0:t.length?f(t,o.key):0;return{...o,value:d,previous:b,deltaText:ae(d,b,o),sparkline:(a.length?a:e.daily).map(c=>i(c[o.key])),summary:`${o.label}: ${D(o,d)}. ${ae(d,b,o)}.`}})}function ke(e,s){let a=_e(s.metric),r=j(e.daily,s.period).map(d=>({date:d.date,label:d.date,value:i(d[a.key])})),o=r[r.length-1]||null;return{metric:a,points:r,activePoint:o}}function Ee(e,s){let a=j(e.daily,s.period);return C.map(t=>({...t,values:a.map(r=>i(r[t.key])),total:t.key==="read_rate"?$(f(a,"reads"),f(a,"pageviews")):f(a,t.key)}))}function je(e,s){let t=e.essays.filter(d=>R(d,s)).map(d=>N(d,s)).filter(d=>d.views>0),r=t.length?[...t].sort((d,b)=>d.views-b.views)[Math.floor(t.length/2)].views:0,o=t.length?[...t].sort((d,b)=>d.read_rate-b.read_rate)[Math.floor(t.length/2)].read_rate:0;return{medianViews:r,medianRate:o,points:t.map(d=>({...d,size:Math.max(10,Math.sqrt(Math.max(d.pdf_downloads,1))*8),quadrant:d.views>=r&&d.read_rate>=o?"High traffic / high completion":d.views>=r?"High traffic / low completion":d.read_rate>=o?"Low traffic / high completion":"Developing"}))}}function G(e,s){let a=e.essays.filter(o=>R(o,s)).map(o=>N(o,s)),t={views:o=>o.views,reads:o=>o.reads,read_rate:o=>o.read_rate,pdf_downloads:o=>o.pdf_downloads,recent_views:o=>o.recent_views},r=t[s.sort]||t.views;return a.sort((o,d)=>r(d)-r(o)).slice(0,12)}function I(e,s){let a=new Map;return e.forEach(t=>{let r=t[s],o=a.get(r)||{label:t[s],views:0,reads:0,pdf_downloads:0,newsletter_submits:0};o.views+=i(t.views),o.reads+=i(t.reads),o.pdf_downloads+=i(t.pdf_downloads),o.newsletter_submits+=i(t.newsletter_submits),a.set(r,o)}),[...a.values()].map(t=>({...t,read_rate:$(t.reads,t.views),pdf_rate:$(t.pdf_downloads,t.views),newsletter_rate:$(t.newsletter_submits,t.views)}))}function ie(e,s){let a=e.journeys.filter(c=>R(c,s)&&M(c,s)),t=e.journeyBySource.filter(c=>M(c,s)),r=e.journeyByCollection.filter(c=>R(c,s)&&M(c,s)),o=e.journeyByEssay.filter(c=>R(c,s)),d=I(t,"discovery_type").sort((c,l)=>l.views-c.views).slice(0,5),b=I(a.map(c=>({...c,mode_label:c.discovery_mode})),"mode_label").sort((c,l)=>l.reads-c.reads);return{steps:[{key:"views",label:"Discovery to pageview",value:f(a,"views"),approximate:!1},{key:"reads",label:"Read events",value:f(a,"reads"),approximate:!0},{key:"pdf_downloads",label:"PDF downloads",value:f(a,"pdf_downloads"),approximate:!0},{key:"newsletter_submits",label:"Newsletter submits",value:f(a,"newsletter_submits"),approximate:!0}],paths:a.sort((c,l)=>i(l.reads)-i(c.reads)||i(l.views)-i(c.views)).slice(0,8),sourceFunnel:d,modeComparison:b,sourceLeaders:t.sort((c,l)=>s.scale==="rate"?l.read_rate-c.read_rate:l.reads-c.reads||l.views-c.views).slice(0,6),collectionLeaders:r.sort((c,l)=>s.scale==="rate"?l.read_rate-c.read_rate:l.reads-c.reads||l.views-c.views).slice(0,6),essayConversion:o.filter(c=>c.views>0).sort((c,l)=>s.scale==="rate"?l.read_rate-c.read_rate:l.views-c.views).slice(0,6)}}function de(e,s){let a=e.sources.map(r=>({...r,source_type:T(r)})).filter(r=>M(r,s)).sort((r,o)=>s.scale==="rate"?o.read_rate-r.read_rate:o.pageviews-r.pageviews).slice(0,10),t=j(e.sourceSeries,s.period).filter(r=>M(r,s)).reduce((r,o)=>{let d=`${o.date}:${o.source_type}`,b=r.get(d)||{date:o.date,source_type:o.source_type,pageviews:0,reads:0};return b.pageviews+=i(o.pageviews),b.reads+=i(o.reads),r.set(d,b),r},new Map);return{rows:a,mix:[...t.values()]}}function Te(e,s){let a=(e.sections.length?e.sections:e.sectionOptions.map(l=>({section:l}))).map(l=>({section:l.section,pageviews:i(l.pageviews),reads:i(l.reads),read_rate:i(l.read_rate),pdf_downloads:i(l.pdf_downloads),newsletter_submits:i(l.newsletter_submits),sparkline:l.sparkline_pageviews||[]})),t=s.selectedSection||(s.section!=="all"?s.section:"")||a[0]?.section||"",r=e.essays.filter(l=>l.section===t).map(l=>N(l,s)),o=j($e(r),s.period),d=a.find(l=>l.section===t)||{section:t||"Overview",pageviews:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0,sparkline:[]},b=I(e.journeys.filter(l=>l.section===t&&M(l,s)),"discovery_source").sort((l,h)=>h.views-l.views).slice(0,4),c=ne(a,t,s.compareSections,"section").map(l=>({...l,delta:xe(l.sparkline)}));return{cards:a.map(l=>({...l,isSelected:l.section===t,isCompared:s.compareSections.includes(l.section)})),selected:{...d,trend:o,topEssays:[...r].sort((l,h)=>h.views-l.views).slice(0,4),completionLeaders:[...r].filter(l=>l.views>0).sort((l,h)=>h.read_rate-l.read_rate||h.views-l.views).slice(0,4),sourceMix:b,note:o.length?"Section trend is aggregated from essay-level daily series inside the selected section.":"Section trend falls back to the committed section snapshot when no essay-level daily series is available."},compare:c}}function Le(e,s){let a=s.selectedSection||(s.section!=="all"?s.section:""),t=e.essays.filter(h=>!a||h.section===a),r=t.length?G(e,{...s,section:a||s.section}):[],o=r.find(h=>h.path===s.selectedEssay)?.path||s.selectedEssay||r[0]?.path||"",d=(t.length?t:e.essays).map(h=>N(h,s)).find(h=>h.path===o)||null,b=d?I(e.journeys.filter(h=>h.path===d.path&&M(h,s)),"discovery_source").sort((h,_)=>_.views-h.views).slice(0,4):[],c=d&&e.journeyByEssay.find(h=>h.path===d.path)||null,l=ne(e.essays.map(h=>N(h,s)),d?.path||"",s.compareEssays,"path");return{selected:d?{...d,trend:j(d.series||[],s.period),sourceMix:b,journeyRecord:c,related:r.filter(h=>h.path!==d.path).slice(0,4)}:null,compare:l}}function Me(e,s){let a=G(e,s),t=ie(e,s),r=de(e,s).rows,o=j(e.daily,s.period),d=f(o,"pageviews");if(!e.daily.length&&!a.length)return[{title:"Awaiting the first trendable refresh",body:"The committed snapshot still renders, but daily trend, section, and journey files are empty until the next analytics refresh."}];if(d>0&&d<me)return[{title:"Sample still too small for strong claims",body:`The current window has ${d} measured pageviews, so the dashboard keeps the signals conservative until the sample is less fragile.`}];let b=a.filter(n=>n.views>=K).filter(n=>n.trend.length>=4).map(n=>{let y=Math.floor(n.trend.length/2),w=n.trend.slice(0,y).reduce((S,E)=>S+E,0),k=n.trend.slice(y).reduce((S,E)=>S+E,0);return{essay:n,lift:k-w}}).sort((n,y)=>y.lift-n.lift)[0],c=a.filter(n=>n.views>=K).sort((n,y)=>y.read_rate-n.read_rate)[0],l=t.paths.filter(n=>n.views>=B).filter(n=>/internal/.test(n.discovery_type)).sort((n,y)=>y.reads-n.reads)[0],h=t.collectionLeaders.filter(n=>n.views>=B).sort((n,y)=>y.reads-n.reads||y.read_rate-n.read_rate)[0],_=t.sourceLeaders.filter(n=>n.views>=B).sort((n,y)=>y.views-n.views||n.read_rate-y.read_rate).find(n=>n.read_rate<50),m=r.find(n=>n.pageviews>=B),p=a.filter(n=>n.views>=K).sort((n,y)=>$(y.pdf_downloads,y.views)-$(n.pdf_downloads,n.views))[0];return[b&&{title:"Biggest riser",body:`${b.essay.title} gained the strongest view lift inside the selected window.`},c&&{title:"Strongest completion",body:`${c.title} leads on read rate above the minimum view threshold.`},l&&{title:"Best internal pathway",body:`${l.discovery_source} produces the strongest read-through path into ${l.title}.`},h&&{title:"Strongest discovery engine",body:`${h.label} is the strongest collection or module pathway for completed reads in the current view.`},_&&{title:"Traffic with weak completion",body:`${_.label} brings volume, but its read-through rate is lagging in the current window.`},m&&{title:"Largest traffic source",body:`${m.source} currently brings the most pageviews in the selected view.`},p&&{title:"PDF conversion leader",body:`${p.title} is converting the highest share of readers into PDF downloads.`}].filter(Boolean)}function ce(e){if(!e.length)return"";let s=Object.keys(e[0]);return`${[s.join(","),...e.map(t=>s.map(r=>`"${String(t[r]??"").replace(/"/g,'""')}"`).join(","))].join(`
`)}
`}function Y(e,s=""){let a=ge(e),t=O(a,s);return{data:a,state:t,kpis:Se(a,t),trend:ke(a,t),smallMultiples:Ee(a,t),scatter:je(a,t),leaderboard:G(a,t),sectionExplorer:Te(a,t),essayExplorer:Le(a,t),funnel:ie(a,t),sources:de(a,t),insights:Me(a,t)}}var Q=[{key:"overview",label:"Overview",description:"Key totals, the high-level trend, and a compact metric-shape summary for the current window.",controls:["period"],exportKind:null},{key:"performance",label:"Content performance",description:"Traffic versus completion, with the selected essay and leaderboard kept in one focused view.",controls:["period","section","sort"],exportKind:"leaderboard"},{key:"sections",label:"Sections",description:"Section-specific totals, top essays, and source mix without the rest of the dashboard competing for attention.",controls:["period","sourceType"],exportKind:"sections"},{key:"essays",label:"Essays",description:"A single essay detail view with comparison context and source mix for the selected piece.",controls:["period","section","sourceType"],exportKind:"essay"},{key:"journey",label:"Reader journey",description:"Discovery, reading, PDF, and newsletter pathways with measured and approximate steps kept clearly labeled.",controls:["period","section","sourceType","scale"],exportKind:"journey"},{key:"sources",label:"Traffic sources",description:"Referrers and campaigns ranked by scale or efficiency without unrelated editorial drill-downs on the page.",controls:["period","sourceType","scale"],exportKind:"sources"},{key:"insights",label:"Key insights",description:"Deterministic editorial signals only, scoped to the active filters and stripped of secondary charts.",controls:["period","section","sourceType"],exportKind:null}],U=Q[0].key,Z=new Map(Q.map(e=>[e.key,e]));function Ce(e){return String(e||"").split(/\s+/).filter(Boolean)}function X(e,s,a){if(!e)return;if(e.classList&&typeof e.classList.toggle=="function"){e.classList.toggle(s,a);return}let t=new Set(Ce(e.className));a?t.add(s):t.delete(s),e.className=[...t].join(" ")}function le(e,s,a){if(e){if(a==null||a===!1){typeof e.removeAttribute=="function"?e.removeAttribute(s):e.attributes&&delete e.attributes[s];return}if(typeof e.setAttribute=="function"){e.setAttribute(s,String(a));return}e.attributes=e.attributes||{},e.attributes[s]=String(a)}}function H(e=""){let s=String(e||"").trim().replace(/^#/,"").toLowerCase();return Z.has(s)?s:U}function ee(e){return Z.get(H(e))||Z.get(U)}function De(e){let s=ee(e);return{activeCategory:s.key,category:s,visibleControls:new Set(s.controls),visiblePanels:Object.fromEntries(Q.map(a=>[a.key,a.key===s.key]))}}function pe(e,s={}){let a=De(e);if(s.shell?.dataset&&(s.shell.dataset.dashboardCategory=a.activeCategory),s.activeTitle&&(s.activeTitle.textContent=a.category.label),s.activeDescription&&(s.activeDescription.textContent=a.category.description),(s.links||[]).forEach(t=>{let r=t?.dataset?.dashboardCategoryLink===a.activeCategory;X(t,"is-active",r),le(t,"aria-current",r?"page":null)}),(s.panels||[]).forEach(t=>{let r=t?.dataset?.dashboardCategoryPanel===a.activeCategory;(typeof t.hidden=="boolean"||"hidden"in t)&&(t.hidden=!r),X(t,"is-active",r),le(t,"aria-hidden",r?"false":"true")}),Object.entries(s.controls||{}).forEach(([t,r])=>{let o=a.visibleControls.has(t);r&&((typeof r.hidden=="boolean"||"hidden"in r)&&(r.hidden=!o),X(r,"is-hidden",!o))}),s.exportControl){let t=!!a.category.exportKind;(typeof s.exportControl.hidden=="boolean"||"hidden"in s.exportControl)&&(s.exportControl.hidden=!t)}return a}var g="&middot;",Fe=4,Ae={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function u(e){return String(e??"").replace(/[&<>"']/g,s=>Ae[s])}function qe(e){let s=document.getElementById(e);if(!s)return{};try{let a=JSON.parse(s.textContent||"{}");return typeof a=="string"?JSON.parse(a):a}catch{return{}}}function se(e,s,a){if(!e.length)return"";let t=Math.max(...e,1);return e.map((r,o)=>{let d=e.length===1?s/2:o/(e.length-1)*s,b=a-r/t*a;return`${o===0?"M":"L"} ${d.toFixed(2)} ${b.toFixed(2)}`}).join(" ")}function be(e,s,a){return e.length?`${se(e,s,a)} L ${s} ${a} L 0 ${a} Z`:""}function A(e,s="dashboard-sparkline"){return e.length?`
    <svg class="${s}" viewBox="0 0 100 28" role="img" aria-hidden="true">
      <path class="${s}__area" d="${be(e,100,28)}"></path>
      <path class="${s}__line" d="${se(e,100,28)}"></path>
    </svg>
  `:`<div class="${s} ${s}--empty">No trend data yet</div>`}function Re(e){return/^up /.test(e)?"is-up":/^down /.test(e)?"is-down":"is-flat"}function ue(e,s,a=Fe){return s?e.includes(s)?e.filter(t=>t!==s):e.concat(s).slice(-a):e}function z(e){return e.filter(Boolean).join(` ${g} `)}function ve(e,s){return e.length?`
    <div class="dashboard-compare-strip">
      ${e.map(a=>{let t=s==="essay"?a.title:a.section,r=s==="essay"?(a.trend||[]).map(d=>d.pageviews??d):a.sparkline||[],o=z(s==="essay"?[`${a.views} views`,`${a.read_rate.toFixed(1)}% read rate`,`${a.pdf_downloads} PDFs`]:[`${a.pageviews} views`,`${a.read_rate.toFixed(1)}% read rate`,`${a.reads} reads`]);return`
            <article class="dashboard-compare-card">
              <p class="dashboard-compare-card__eyebrow">${u(s==="essay"?a.section:"Section comparison")}</p>
              <h4>${u(t)}</h4>
              <p class="dashboard-compare-card__meta">${u(o)}</p>
              ${A(r,"dashboard-inline-sparkline")}
            </article>
          `}).join("")}
    </div>
  `:`<p class="dashboard-empty">Select up to four ${s==="essay"?"essays":"sections"} to compare pace, scale, and efficiency.</p>`}function Pe(e){return C.map(s=>`
      <button type="button" class="dashboard-pill${e.metric===s.key?" is-active":""}" data-metric="${s.key}" aria-pressed="${e.metric===s.key?"true":"false"}">
        ${s.label}
      </button>
    `).join("")}function Ne(e,s){e&&(e.innerHTML=s.kpis.map(a=>`
        <article class="dashboard-kpi" aria-label="${a.summary}">
          <div class="dashboard-kpi__header">
            <p class="dashboard-kpi__label">${u(a.label)}</p>
            <p class="dashboard-kpi__delta ${Re(a.deltaText)}">${u(a.deltaText)}</p>
          </div>
          <p class="dashboard-kpi__value">${D(a,a.value)}</p>
          <p class="dashboard-kpi__subtext">Selected window summary</p>
          ${A(a.sparkline)}
        </article>
      `).join(""))}function Oe(e,s,a){if(!e)return;if(!a.points.length){e.innerHTML='<p class="dashboard-empty">No daily trend data yet. The committed snapshot totals still appear above.</p>';return}let t=a.points.map(o=>o.value),r=a.activePoint;e.innerHTML=`
    <div class="dashboard-panel__header">
      <div>
        <p class="list-title">Trend</p>
        <h3>${a.metric.label}</h3>
        <p class="dashboard-panel__caption">Latest annotation is pinned by default so the chart still reads clearly without hover.</p>
      </div>
      <div class="dashboard-pill-row">${Pe(s)}</div>
    </div>
    <div class="dashboard-trend-card">
      <div class="dashboard-trend-card__summary">
        <p class="dashboard-trend-card__value">${D(a.metric,r.value)}</p>
        <p class="dashboard-trend-card__note">Latest point ${g} ${r.label}</p>
      </div>
      <div class="dashboard-trend-frame">
        <svg class="dashboard-trend-chart" viewBox="0 0 100 42" role="img" aria-label="${a.metric.label} over time">
          <path class="dashboard-trend-chart__area" d="${be(t,100,42)}"></path>
          <path class="dashboard-trend-chart__line" d="${se(t,100,42)}"></path>
        </svg>
        <div class="dashboard-trend-annotation">
          <span class="dashboard-trend-annotation__label">Visible annotation</span>
          <span class="dashboard-trend-annotation__text">${a.metric.label} closes the current window at ${D(a.metric,r.value)}.</span>
        </div>
      </div>
    </div>
  `}function He(e,s){e&&(e.innerHTML=s.map(a=>`
        <article class="dashboard-mini">
          <p class="dashboard-mini__label">${u(a.label)}</p>
          <p class="dashboard-mini__value">${D(a,a.total)}</p>
          ${A(a.values,"dashboard-mini-sparkline")}
        </article>
      `).join(""))}function Be(e,s){e&&(e.innerHTML=s.map(a=>`
        <article class="dashboard-signal">
          <p class="dashboard-signal__kicker">Signal</p>
          <h3>${u(a.title)}</h3>
          <p>${u(a.body)}</p>
        </article>
      `).join(""))}function he(e){return e?`
    <p class="dashboard-detail-card__eyebrow">Selected essay</p>
    <h3>${u(e.title)}</h3>
    <p class="dashboard-detail-card__summary">${u(e.quadrant)}</p>
    <dl class="dashboard-detail-list">
      <div><dt>Views</dt><dd>${e.views}</dd></div>
      <div><dt>Read rate</dt><dd>${e.read_rate.toFixed(1)}%</dd></div>
      <div><dt>PDF downloads</dt><dd>${e.pdf_downloads}</dd></div>
      <div><dt>Section</dt><dd>${u(e.section)}</dd></div>
    </dl>
    <div class="dashboard-inline-actions">
      <button type="button" class="dashboard-text-button" data-select-section="${u(e.section)}" data-open-category="sections">Open section</button>
      <button type="button" class="dashboard-text-button" data-compare-essay="${u(e.path)}">Compare essay</button>
    </div>
  `:'<p class="dashboard-empty">Select an essay point to inspect traffic, completion, and PDF pull.</p>'}function Ve(e,s,a,t){if(!e||!s)return;let r=t.scatter;if(!r.points.length){e.innerHTML='<p class="dashboard-empty">No content-performance points are available for this filter.</p>',s.innerHTML=he(null);return}let o=Math.max(...r.points.map(c=>c.views),1),d=Math.max(...r.points.map(c=>c.read_rate),1),b=r.points.find(c=>c.path===a.selectedEssay)||r.points[0];e.innerHTML=`
    <div class="dashboard-scatter" role="img" aria-label="Content performance scatter plot">
      <div class="dashboard-scatter__mid dashboard-scatter__mid--x" style="left:${r.medianViews/o*100}%"></div>
      <div class="dashboard-scatter__mid dashboard-scatter__mid--y" style="top:${100-r.medianRate/d*100}%"></div>
      ${r.points.map(c=>{let l=c.views/o*100,h=100-c.read_rate/d*100;return`
            <button
              type="button"
              class="dashboard-scatter__point${b.path===c.path?" is-active":""}"
              style="left:${l}%;top:${h}%;width:${c.size}px;height:${c.size}px"
              data-select-essay="${u(c.path)}"
              aria-pressed="${b.path===c.path?"true":"false"}"
              aria-label="${u(`${c.title}: ${c.views} views, ${c.read_rate.toFixed(1)} percent read rate`)}">
            </button>
          `}).join("")}
    </div>
    <div class="dashboard-scatter__legend">
      <span>Left to right: traffic</span>
      <span>Bottom to top: completion</span>
    </div>
  `,s.innerHTML=he(b)}function Ie(e){return e.leaderboard.map(s=>({title:s.title,section:s.section,views:s.views,reads:s.reads,read_rate:s.read_rate.toFixed(1),pdf_downloads:s.pdf_downloads,primary_source:s.primary_source}))}function We(e){return e.sectionExplorer.cards.map(s=>({section:s.section,pageviews:s.pageviews,reads:s.reads,read_rate:s.read_rate.toFixed(1),pdf_downloads:s.pdf_downloads,newsletter_submits:s.newsletter_submits}))}function Ue(e){let s=e.essayExplorer.selected;return s?[{title:s.title,section:s.section,views:s.views,reads:s.reads,read_rate:s.read_rate.toFixed(1),pdf_downloads:s.pdf_downloads,primary_source:s.primary_source}]:[]}function ze(e){return e.funnel.paths.map(s=>({discovery_source:s.discovery_source,discovery_type:s.discovery_type,title:s.title,views:s.views,reads:s.reads,pdf_downloads:s.pdf_downloads,newsletter_submits:s.newsletter_submits}))}function Ke(e){return e.sources.rows.map(s=>({source:s.source,visitors:s.visitors,pageviews:s.pageviews,reads:s.reads,read_rate:s.read_rate.toFixed(1)}))}function Je(e,s){switch(ee(e).exportKind){case"leaderboard":return{filename:"outside-in-print-content-performance.csv",rows:Ie(s)};case"sections":return{filename:"outside-in-print-sections.csv",rows:We(s)};case"essay":return{filename:"outside-in-print-essay-detail.csv",rows:Ue(s)};case"journey":return{filename:"outside-in-print-reader-journey.csv",rows:ze(s)};case"sources":return{filename:"outside-in-print-traffic-sources.csv",rows:Ke(s)};default:return{filename:"",rows:[]}}}function Ge(e,s){if(!e)return;if(!s.leaderboard.length){e.innerHTML='<p class="dashboard-empty">No essays match this filter yet.</p>';return}let a=Math.max(...s.leaderboard.map(t=>t.views),1);e.innerHTML=`
    <table class="dashboard-table dashboard-table--wide">
      <thead>
        <tr>
          <th>Essay</th>
          <th>Section</th>
          <th>Views</th>
          <th>Reads</th>
          <th>Read rate</th>
          <th>PDF</th>
          <th>Primary source</th>
        </tr>
      </thead>
      <tbody>
        ${s.leaderboard.map(t=>`
              <tr>
                <td>
                  <button type="button" class="dashboard-table__button" data-select-essay="${u(t.path)}">${u(t.title)}</button>
                  <span class="dashboard-table__subtext">${u(t.primary_source)}</span>
                  ${A(t.trend,"dashboard-inline-sparkline")}
                </td>
                <td>
                  <button type="button" class="dashboard-table__button dashboard-table__button--muted" data-select-section="${u(t.section)}">${u(t.section)}</button>
                </td>
                <td>
                  <span>${t.views}</span>
                  <span class="dashboard-inline-bar"><span style="width:${t.views/a*100}%"></span></span>
                </td>
                <td>${t.reads}</td>
                <td>${t.read_rate.toFixed(1)}%</td>
                <td>${t.pdf_downloads}</td>
                <td>
                  <span class="dashboard-table__muted">${u(t.primary_source)}</span>
                  <button type="button" class="dashboard-table__button dashboard-table__button--tiny" data-compare-essay="${u(t.path)}">Compare</button>
                </td>
              </tr>
            `).join("")}
      </tbody>
    </table>
  `}function Ye(e,s){if(!e)return;let a=s.sectionExplorer;if(!a.cards.length){e.innerHTML='<p class="dashboard-empty">Section drill-down appears when section snapshots are committed.</p>';return}let t=a.selected;e.innerHTML=`
    <div class="dashboard-panel__header">
      <div class="dashboard-chip-row">
        ${a.cards.map(r=>`
              <button
                type="button"
                class="dashboard-chip${r.isSelected?" is-active":""}"
                data-select-section="${u(r.section)}"
                aria-pressed="${r.isSelected?"true":"false"}">
                ${u(r.section)}
              </button>
            `).join("")}
      </div>
      <div class="dashboard-inline-actions">
        <button type="button" class="dashboard-text-button" data-reset-drilldown>Reset to overview</button>
        <button type="button" class="dashboard-text-button" data-compare-section="${u(t.section)}" aria-pressed="${s.state.compareSections.includes(t.section)?"true":"false"}">${s.state.compareSections.includes(t.section)?"Remove from compare":"Compare section"}</button>
      </div>
    </div>
    <div class="dashboard-drilldown-layout">
      <article class="dashboard-drilldown-card">
        <p class="dashboard-detail-card__eyebrow">Selected section</p>
        <h3>${u(t.section)}</h3>
        <p class="dashboard-detail-card__summary">${u(z([`${t.pageviews} views`,`${t.reads} reads`,`${t.read_rate.toFixed(1)}% read rate`]))}</p>
        ${A((t.trend||[]).map(r=>r.pageviews),"dashboard-sparkline dashboard-sparkline--framed")}
        <p class="dashboard-drilldown-card__note">${u(t.note)}</p>
      </article>
      <div class="dashboard-drilldown-stack">
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Top essays</h3>
            <p>Section leaders by views in the selected window.</p>
          </div>
          ${t.topEssays.length?t.topEssays.map(r=>`
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${u(r.path)}" data-open-category="essays">
                      <span>
                        <strong>${u(r.title)}</strong>
                        <small>${r.views} views ${g} ${r.reads} reads</small>
                      </span>
                      <span>${r.read_rate.toFixed(1)}%</span>
                    </button>
                  `).join(""):'<p class="dashboard-empty">No essays in this section yet.</p>'}
        </section>
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Best read-rate performers</h3>
            <p>Useful for spotting quieter sections or pieces that convert attention efficiently.</p>
          </div>
          ${t.completionLeaders.length?t.completionLeaders.map(r=>`
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${u(r.path)}" data-open-category="essays">
                      <span>
                        <strong>${u(r.title)}</strong>
                        <small>${r.views} views ${g} ${r.pdf_downloads} PDFs</small>
                      </span>
                      <span>${r.read_rate.toFixed(1)}%</span>
                    </button>
                  `).join(""):'<p class="dashboard-empty">No qualifying essays for this section yet.</p>'}
        </section>
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Strongest source mix</h3>
            <p>Measured pageviews grouped with approximate downstream outcomes for this section.</p>
          </div>
          ${t.sourceMix.length?t.sourceMix.map(r=>`
                    <article class="dashboard-ranked-row dashboard-ranked-row--static">
                      <span>
                        <strong>${u(r.label)}</strong>
                        <small>${r.views} views ${g} ${r.reads} reads</small>
                      </span>
                      <span>${r.read_rate.toFixed(1)}%</span>
                    </article>
                  `).join(""):'<p class="dashboard-empty">No source mix is available for this section under the current filter.</p>'}
        </section>
      </div>
    </div>
    <section class="dashboard-drilldown-compare">
      <div class="dashboard-drilldown-subpanel__header">
        <h3>Section compare</h3>
        <p>Keep a few sections side by side while you move through the rest of the dashboard.</p>
      </div>
      ${ve(a.compare,"section")}
    </section>
  `}function Xe(e,s){if(!e)return;let a=s.essayExplorer;if(!a.selected){e.innerHTML='<p class="dashboard-empty">Select an essay from the scatter plot, leaderboard, or section explorer.</p>';return}let t=a.selected,r=t.journeyRecord?.attribution_note||"Journey rates remain approximate when they rely on same-session downstream sequences.";e.innerHTML=`
    <div class="dashboard-panel__header">
      <div>
        <p class="dashboard-detail-card__eyebrow">Selected essay</p>
        <h3>${u(t.title)}</h3>
        <p class="dashboard-detail-card__summary">${u(z([t.section,`${t.views} views`,`${t.read_rate.toFixed(1)}% read rate`,`${t.pdf_downloads} PDFs`]))}</p>
      </div>
      <div class="dashboard-inline-actions">
        <button type="button" class="dashboard-text-button" data-reset-drilldown>Reset to overview</button>
        <button type="button" class="dashboard-text-button" data-select-section="${u(t.section)}" data-open-category="sections">Open section</button>
        <button type="button" class="dashboard-text-button" data-compare-essay="${u(t.path)}" aria-pressed="${s.state.compareEssays.includes(t.path)?"true":"false"}">${s.state.compareEssays.includes(t.path)?"Remove from compare":"Compare essay"}</button>
      </div>
    </div>
    <div class="dashboard-drilldown-layout">
      <article class="dashboard-drilldown-card">
        ${A((t.trend||[]).map(o=>o.pageviews),"dashboard-sparkline dashboard-sparkline--framed")}
        <dl class="dashboard-detail-list">
          <div><dt>Primary source</dt><dd>${u(t.primary_source)}</dd></div>
          <div><dt>Reads</dt><dd>${t.reads}</dd></div>
          <div><dt>PDF rate</dt><dd>${t.views?(t.pdf_downloads/t.views*100).toFixed(1):"0.0"}%</dd></div>
          <div><dt>Recent views</dt><dd>${t.recent_views}</dd></div>
        </dl>
        <p class="dashboard-callout${t.journeyRecord?.approximate_downstream?" is-approximate":""}">${u(r)}</p>
      </article>
      <div class="dashboard-drilldown-stack">
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Source mix</h3>
            <p>Discovery sources leading into this piece under the current filter.</p>
          </div>
          ${t.sourceMix.length?t.sourceMix.map(o=>`
                    <article class="dashboard-ranked-row dashboard-ranked-row--static">
                      <span>
                        <strong>${u(o.label)}</strong>
                        <small>${o.views} views ${g} ${o.reads} reads</small>
                      </span>
                      <span>${o.read_rate.toFixed(1)}%</span>
                    </article>
                  `).join(""):'<p class="dashboard-empty">No source mix is available for this essay under the current filter.</p>'}
        </section>
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Related essays</h3>
            <p>Nearby pieces in the same section so you can keep comparing without leaving context.</p>
          </div>
          ${t.related.length?t.related.map(o=>`
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${u(o.path)}">
                      <span>
                        <strong>${u(o.title)}</strong>
                        <small>${o.views} views ${g} ${o.read_rate.toFixed(1)}% read rate</small>
                      </span>
                      <span>${o.pdf_downloads} PDFs</span>
                    </button>
                  `).join(""):'<p class="dashboard-empty">No related essays are available for this section yet.</p>'}
        </section>
      </div>
    </div>
    <section class="dashboard-drilldown-compare">
      <div class="dashboard-drilldown-subpanel__header">
        <h3>Essay compare</h3>
        <p>Hold a handful of pieces side by side as you move between sections and journeys.</p>
      </div>
      ${ve(a.compare,"essay")}
    </section>
  `}function Ze(e,s){if(!e)return;let a=Math.max(...s.funnel.steps.map(o=>o.value),1),t=Math.max(...s.funnel.sourceFunnel.map(o=>o.views),1),r=(o,d)=>o.length?`
        <div class="dashboard-journey-table">
          ${o.map(b=>`
                <article class="dashboard-journey-table__row">
                  <div>
                    <h4>${u(b.label||b.title)}</h4>
                    <p>${b.views} views ${g} ${b.reads} reads ${g} ${b.read_rate.toFixed(1)}% read rate</p>
                  </div>
                  <div class="dashboard-journey-table__metric">${d==="rate"?`${b.read_rate.toFixed(1)}%`:b.reads}</div>
                </article>
              `).join("")}
        </div>
      `:'<p class="dashboard-empty">No qualifying rows for this comparison yet.</p>';e.innerHTML=`
    <div class="dashboard-funnel">
      ${s.funnel.steps.map(o=>`
            <article class="dashboard-funnel__step${o.approximate?" is-approximate":""}">
              <div class="dashboard-funnel__topline">
                <p class="dashboard-funnel__label">${o.label}</p>
                ${o.approximate?'<span class="dashboard-funnel__badge">Approx.</span>':'<span class="dashboard-funnel__badge is-measured">Measured</span>'}
              </div>
              <p class="dashboard-funnel__value">${o.value}</p>
              <div class="dashboard-funnel__bar"><span style="width:${o.value/a*100}%"></span></div>
            </article>
          `).join("")}
    </div>
    <div class="dashboard-journey-comparison">
      <div class="dashboard-journey-comparison__header">
        <h3>Source-type conversion</h3>
        <p>Compare internal, external, campaign, and direct discovery without pretending the downstream steps are directly observed attribution chains.</p>
      </div>
      <div class="dashboard-journey-bars">
        ${s.funnel.sourceFunnel.length?s.funnel.sourceFunnel.map(o=>`
                  <article class="dashboard-journey-bar">
                    <div class="dashboard-journey-bar__topline">
                      <span>${u(o.label)}</span>
                      <span>${o.read_rate.toFixed(1)}%</span>
                    </div>
                    <div class="dashboard-journey-bar__track"><span style="width:${o.views/t*100}%"></span></div>
                    <p class="dashboard-journey-bar__meta">${o.views} views ${g} ${o.reads} reads ${g} ${o.pdf_downloads} PDFs</p>
                  </article>
                `).join(""):'<p class="dashboard-empty">No source-type journey comparison is available yet.</p>'}
      </div>
    </div>
    <div class="dashboard-journey-split">
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Discovery engines</h3>
          <p>Sources ranked by ${s.state.scale==="rate"?"read-through rate":"downstream reads"}.</p>
        </div>
        ${r(s.funnel.sourceLeaders,s.state.scale)}
      </section>
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Collections and modules</h3>
          <p>Internal pathways doing useful editorial work beyond raw click count.</p>
        </div>
        ${r(s.funnel.collectionLeaders,s.state.scale)}
      </section>
    </div>
    <div class="dashboard-journey-split">
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Essay conversion leaders</h3>
          <p>Compare high-view essays with quieter pages that convert more efficiently.</p>
        </div>
        ${r(s.funnel.essayConversion,s.state.scale)}
      </section>
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Observed pathways</h3>
          <p>Measured pageviews paired with approximate same-session downstream steps.</p>
        </div>
        <div class="dashboard-journeys">
          ${s.funnel.paths.length?s.funnel.paths.map(o=>`
                    <article class="dashboard-journey">
                      <div>
                        <p class="dashboard-journey__kicker">${u(o.discovery_type.replace(/-/g," "))}</p>
                        <h3>${u(o.discovery_source)}</h3>
                        <p>${u(o.title)}</p>
                      </div>
                      <p class="dashboard-journey__meta">${o.views} views ${g} ${o.reads} reads ${g} ${o.pdf_downloads} PDFs</p>
                    </article>
                  `).join(""):'<p class="dashboard-empty">No journey paths match this filter.</p>'}
        </div>
      </section>
    </div>
  `}function Qe(e,s,a){e&&(e.innerHTML=`
    <div class="dashboard-source-list">
      ${s.sources.rows.length?s.sources.rows.map(t=>{let r=a.scale==="rate"?`${t.read_rate.toFixed(1)}% read rate`:`${t.pageviews} views`;return`
                <article class="dashboard-source">
                  <div>
                    <p class="dashboard-source__kicker">${a.scale==="rate"?"Efficiency":"Scale"}</p>
                    <h3>${u(t.source)}</h3>
                    <p>${r}</p>
                  </div>
                  <div class="dashboard-source__meta">${t.reads} reads ${g} ${t.visitors} visitors</div>
                </article>
              `}).join(""):'<p class="dashboard-empty">No source data matches this filter.</p>'}
    </div>
  `)}function es(e,s){let a=new Blob([s],{type:"text/csv;charset=utf-8"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=e,r.click(),URL.revokeObjectURL(t)}function ss(e,s,a,t){let r=new URL(window.location.href);r.search=e?`?${e}`:"",r.hash=`#${s}`;try{let o=e!==t.query||s!==t.category;a==="push"&&o?window.history.pushState({query:e,category:s},"",r.toString()):a!=="skip"&&window.history.replaceState({query:e,category:s},"",r.toString())}catch(o){if(window.location.protocol!=="file:")throw o}}function ts(){let e=document.querySelector("[data-dashboard-shell]");if(!e)return;let s=qe("dashboard-data"),a=Y(s,window.location.search).data;e.classList.add("is-enhanced");let t={activeTitle:document.querySelector("[data-dashboard-active-title]"),activeDescription:document.querySelector("[data-dashboard-active-description]"),categoryLinks:[...document.querySelectorAll("[data-dashboard-category-link]")],categoryPanels:[...document.querySelectorAll("[data-dashboard-category-panel]")],kpis:document.querySelector("[data-dashboard-kpis]"),trend:document.querySelector("[data-dashboard-trend]"),multiples:document.querySelector("[data-dashboard-multiples]"),signals:document.querySelector("[data-dashboard-signals]"),sectionExplorer:document.querySelector("[data-dashboard-section-explorer]"),essayExplorer:document.querySelector("[data-dashboard-essay-explorer]"),scatter:document.querySelector("[data-dashboard-scatter]"),scatterDetails:document.querySelector("[data-dashboard-scatter-details]"),leaderboard:document.querySelector("[data-dashboard-leaderboard]"),funnel:document.querySelector("[data-dashboard-funnel]"),sources:document.querySelector("[data-dashboard-sources]")},r={periodWrap:document.querySelector('[data-dashboard-control-wrap="period"]'),sectionWrap:document.querySelector('[data-dashboard-control-wrap="section"]'),sourceTypeWrap:document.querySelector('[data-dashboard-control-wrap="sourceType"]'),scaleWrap:document.querySelector('[data-dashboard-control-wrap="scale"]'),sortWrap:document.querySelector('[data-dashboard-control-wrap="sort"]'),exportWrap:document.querySelector('[data-dashboard-control-wrap="export"]'),period:document.querySelector("[data-dashboard-period]"),section:document.querySelector("[data-dashboard-section]"),sourceType:document.querySelector("[data-dashboard-source-type]"),scale:document.querySelector("[data-dashboard-scale]"),sort:document.querySelector("[data-dashboard-sort]"),exportCsv:document.querySelector("[data-dashboard-export]")};r.section.innerHTML=`<option value="all">All sections</option>${a.sectionOptions.map(h=>`<option value="${u(h)}">${u(h)}</option>`).join("")}`,r.sourceType.innerHTML=`<option value="all">All source types</option>${a.sourceTypeOptions.map(h=>`<option value="${u(h)}">${u(h)}</option>`).join("")}`;let o=O(a,window.location.search),d=H(window.location.hash),b={query:W(o),category:d};function c(h,_="push",m=d){o=O(a,`?${W(h)}`),d=H(m),l(_)}function l(h="replace"){let _=W(o);ss(_,d,h,b),b={query:_,category:d},[r.period.value,r.section.value,r.sourceType.value,r.scale.value,r.sort.value]=[o.period,o.section,o.sourceType,o.scale,o.sort];let m=Y(s,`?${_}`);o=m.state,d=pe(d,{shell:e,activeTitle:t.activeTitle,activeDescription:t.activeDescription,links:t.categoryLinks,panels:t.categoryPanels,controls:{period:r.periodWrap,section:r.sectionWrap,sourceType:r.sourceTypeWrap,scale:r.scaleWrap,sort:r.sortWrap},exportControl:r.exportWrap}).activeCategory,Ne(t.kpis,m),Oe(t.trend,o,m.trend),He(t.multiples,m.smallMultiples),Be(t.signals,m.insights),Ye(t.sectionExplorer,m),Xe(t.essayExplorer,m),Ve(t.scatter,t.scatterDetails,o,m),Ge(t.leaderboard,m),Ze(t.funnel,m),Qe(t.sources,m,o),document.querySelectorAll("[data-metric]").forEach(n=>{n.addEventListener("click",()=>{c({...o,metric:n.getAttribute("data-metric")||o.metric},"push")})}),document.querySelectorAll("[data-select-essay]").forEach(n=>{n.addEventListener("click",()=>{let y=n.getAttribute("data-select-essay")||"",w=m.data.essays.find(S=>S.path===y),k=n.getAttribute("data-open-category")||d;c({...o,selectedEssay:y,selectedSection:w?.section||o.selectedSection},"push",k)})}),document.querySelectorAll("[data-select-section]").forEach(n=>{n.addEventListener("click",()=>{let y=n.getAttribute("data-select-section")||"",w=n.getAttribute("data-open-category")||d,k=[...m.data.essays].filter(S=>S.section===y).sort((S,E)=>E.views-S.views)[0];c({...o,selectedSection:y,selectedEssay:k?.path||""},"push",w)})}),document.querySelectorAll("[data-compare-section]").forEach(n=>{n.addEventListener("click",()=>{c({...o,compareSections:ue(o.compareSections,n.getAttribute("data-compare-section")||"")},"push")})}),document.querySelectorAll("[data-compare-essay]").forEach(n=>{n.addEventListener("click",()=>{c({...o,compareEssays:ue(o.compareEssays,n.getAttribute("data-compare-essay")||"")},"push")})}),document.querySelectorAll("[data-reset-drilldown]").forEach(n=>{n.addEventListener("click",()=>{c({...o,selectedSection:"",selectedEssay:"",compareSections:[],compareEssays:[]},"push")})}),r.exportCsv.onclick=()=>{let n=Je(d,m);n.rows.length&&es(n.filename,ce(n.rows))}}[[r.period,"period"],[r.section,"section"],[r.sourceType,"sourceType"],[r.scale,"scale"],[r.sort,"sort"]].forEach(([h,_])=>{h.addEventListener("change",()=>{c({...o,[_]:h.value},"push")})}),t.categoryLinks.forEach(h=>{h.addEventListener("click",_=>{_.preventDefault(),c(o,"push",h.dataset.dashboardCategoryLink||U)})}),window.addEventListener("popstate",()=>{o=O(a,window.location.search),d=H(window.location.hash),l("skip")}),l("replace")}typeof document<"u"&&ts();})();
