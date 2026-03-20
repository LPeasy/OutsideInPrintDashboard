(()=>{var M=[{key:"pageviews",label:"Pageviews",kind:"number"},{key:"unique_visitors",label:"Unique visitors",kind:"number"},{key:"reads",label:"Read events",kind:"number"},{key:"read_rate",label:"Read rate",kind:"percent"},{key:"pdf_downloads",label:"PDF downloads",kind:"number"},{key:"newsletter_submits",label:"Newsletter submits",kind:"number"}],ce=10,z=10,H=5,F={period:"30d",section:"all",sourceType:"all",metric:"pageviews",scale:"absolute",sort:"views",selectedSection:"",compareSections:[],compareEssays:[],selectedEssay:""};function i(e){let a=Number(e);return Number.isFinite(a)?a:0}function v(e,a=""){return e==null||e===""?a:String(e)}function x(e){return Array.isArray(e)?e:[]}function E(e,a="Unlabeled"){let t=v(e).trim();if(!t)return a;let s=t.toLowerCase();return s==="essay"||s==="essays"?"Essays":s==="book"||s==="books"?"Books":s==="working paper"||s==="working papers"||s==="working-paper"||s==="working-papers"?"Working Papers":s==="syd and oliver"||s==="syd & oliver"?"Syd and Oliver":s==="collection"||s==="collections"?"Collections":t}function B(e){return[...e].sort((a,t)=>v(a.date).localeCompare(v(t.date)))}function f(e,a){return e.reduce((t,s)=>t+i(s[a]),0)}function g(e,a){return a>0?Math.round(e/a*1e3)/10:0}function P(e){return[...new Set(e.filter(Boolean))]}function pe(e){return e?P(String(e).split(",").map(a=>a.trim())):[]}function X(e,a,t=4){let s=new Set(a);return P(e).filter(n=>s.has(n)).slice(0,t)}function k(e){let a=v(e.discovery_type||e.source_type||e.type);if(a)return a;let t=v(e.source).toLowerCase(),s=v(e.medium).toLowerCase(),n=v(e.campaign).toLowerCase();return t==="direct"?"direct":t.startsWith("internal")?"internal":n||s==="campaign"||s==="generated"||s==="email"?"campaign":t?"external":"unknown"}function L(e,a){return e.kind==="percent"?`${i(a).toFixed(1)}%`:new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(i(a))}function Y(e,a,t){let s=i(e),n=i(a),r=s-n;if(n<=0&&s<=0)return"Flat vs previous window";if(n<=0)return`${L(t,r)} above a zero baseline`;let l=r>0?"up":r<0?"down":"flat",h=Math.abs(r/n*100);return l==="flat"?"Flat vs previous window":`${l} ${h.toFixed(1)}% vs previous window`}function S(e,a){if(a==="all")return[...e];let t=Number.parseInt(a,10);return!Number.isFinite(t)||t<=0?[...e]:e.slice(Math.max(0,e.length-t))}function G(e,a){if(!a.length)return[];let t=a[0].date,s=e.findIndex(n=>n.date===t);return s<=0?[]:e.slice(Math.max(0,s-a.length),s)}function ue(e){return M.find(a=>a.key===e)||M[0]}function Z(e){return{date:v(e.date),pageviews:i(e.pageviews||e.views),unique_visitors:i(e.unique_visitors||e.visitors),reads:i(e.reads),read_rate:i(e.read_rate),pdf_downloads:i(e.pdf_downloads),newsletter_submits:i(e.newsletter_submits)}}function W(e,a){return{label:v(e[a]),discovery_type:k(e),discovery_mode:v(e.discovery_mode),module_slot:v(e.module_slot),collection:v(e.collection),section:E(e.section),slug:v(e.slug),path:v(e.path),title:v(e.title,v(e[a],"Untitled")),views:i(e.views),reads:i(e.reads),read_rate:i(e.read_rate),pdf_downloads:i(e.pdf_downloads),pdf_rate:i(e.pdf_rate),newsletter_submits:i(e.newsletter_submits),newsletter_rate:i(e.newsletter_rate),approximate_downstream:!!e.approximate_downstream,attribution_note:v(e.attribution_note)}}function he(e,a){let t=v(e.path),s=i(e.views),n=i(e.reads);return{slug:v(e.slug),path:t,title:v(e.title,"Untitled"),section:E(e.section),views:s,reads:n,read_rate:i(e.read_rate)||g(n,s),pdf_downloads:i(e.pdf_downloads),primary_source:v(e.primary_source,"Unattributed"),series:a.get(t)||[]}}function be(e={}){let a={range_label:v(e.overview?.range_label,"Snapshot"),updated_at:v(e.overview?.updated_at),pageviews:i(e.overview?.pageviews),unique_visitors:i(e.overview?.unique_visitors),reads:i(e.overview?.reads),read_rate:i(e.overview?.read_rate),pdf_downloads:i(e.overview?.pdf_downloads),newsletter_submits:i(e.overview?.newsletter_submits)},t=B(x(e.timeseries_daily).map(Z)),s=new Map(x(e.essays_timeseries).map(d=>[v(d.path),B(x(d.series).map(Z))])),n=x(e.essays).map(d=>he(d,s)),l=[...x(e.sections).reduce((d,p)=>{let m=E(p.section),w=d.get(m)||{section:m,pageviews:0,reads:0,pdf_downloads:0,newsletter_submits:0,sparkline_pageviews:[],sparkline_reads:[]},O=Array.isArray(p.sparkline_pageviews)?p.sparkline_pageviews.map(i):[],R=Array.isArray(p.sparkline_reads)?p.sparkline_reads.map(i):[],T=Math.max(w.sparkline_pageviews.length,O.length);return w.pageviews+=i(p.pageviews||p.views),w.reads+=i(p.reads),w.pdf_downloads+=i(p.pdf_downloads),w.newsletter_submits+=i(p.newsletter_submits),w.sparkline_pageviews=Array.from({length:T},(le,q)=>i(w.sparkline_pageviews[q])+i(O[q])),w.sparkline_reads=Array.from({length:T},(le,q)=>i(w.sparkline_reads[q])+i(R[q])),d.set(m,w),d},new Map).values()].map(d=>({...d,read_rate:i(d.pageviews)>0?g(d.reads,d.pageviews):0})).sort((d,p)=>p.pageviews-d.pageviews||p.reads-d.reads),h=x(e.journeys).map(d=>({discovery_source:v(d.discovery_source,"Direct"),discovery_type:k(d),discovery_mode:v(d.discovery_mode,"article-discovery"),module_slot:v(d.module_slot),collection:v(d.collection),slug:v(d.slug),path:v(d.path),title:v(d.title,"Untitled"),section:E(d.section),views:i(d.views),reads:i(d.reads),pdf_downloads:i(d.pdf_downloads),newsletter_submits:i(d.newsletter_submits),approximate_downstream:!!d.approximate_downstream,attribution_note:v(d.attribution_note)})),c=x(e.journey_by_source).map(d=>W(d,"discovery_source")),o=x(e.journey_by_collection).map(d=>W(d,"collection_label")),b=x(e.journey_by_essay).map(d=>W(d,"title")),y=x(e.sources).map(d=>{let p=i(d.pageviews||d.views),m=i(d.reads);return{source:v(d.source,"Direct"),medium:v(d.medium),campaign:v(d.campaign),content:v(d.content),visitors:i(d.visitors),pageviews:p,reads:m,read_rate:g(m,p)}}),_=B(x(e.sources_timeseries).map(d=>({date:v(d.date),source_type:k(d),source:v(d.source,"Direct"),pageviews:i(d.pageviews||d.views),reads:i(d.reads),read_rate:i(d.read_rate),pdf_downloads:i(d.pdf_downloads),newsletter_submits:i(d.newsletter_submits)})));return{overview:a,daily:t,sections:l,essays:n,journeys:h,journeyBySource:c,journeyByCollection:o,journeyByEssay:b,sources:y,sourceSeries:_,periods:x(e.periods),sectionOptions:P(l.map(d=>d.section).concat(n.map(d=>d.section))).sort(),sourceTypeOptions:P(h.map(k).concat(_.map(k))).sort()}}function N(e,a=""){let t=new URLSearchParams(String(a).replace(/^\?/,"")),s={...F};Object.keys(F).forEach(r=>{t.has(r)&&(s[r]=Array.isArray(F[r])?pe(t.get(r)):t.get(r)||F[r])}),!e.sectionOptions.includes(s.section)&&s.section!=="all"&&(s.section=E(s.section,"")),!e.sectionOptions.includes(s.section)&&s.section!=="all"&&(s.section="all"),!e.sourceTypeOptions.includes(s.sourceType)&&s.sourceType!=="all"&&(s.sourceType="all"),M.some(r=>r.key===s.metric)||(s.metric=F.metric),s.selectedSection=E(s.selectedSection,""),e.sectionOptions.includes(s.selectedSection)||(s.selectedSection=""),s.compareSections=X(s.compareSections.map(r=>E(r,"")),e.sectionOptions);let n=e.essays.map(r=>r.path);return n.includes(s.selectedEssay)||(s.selectedEssay=""),s.compareEssays=X(s.compareEssays,n),s}function I(e){let a=new URLSearchParams;return Object.entries(e).forEach(([t,s])=>{if(Array.isArray(s)){s.length&&a.set(t,s.join(","));return}s&&s!==F[t]&&a.set(t,s)}),a.toString()}function C(e,a){return a.section==="all"||v(e.section)===a.section}function j(e,a){return a.sourceType==="all"||k(e)===a.sourceType}function A(e,a){let t=S(e.series||[],a.period),s=G(e.series||[],t);return{...e,trend:t.map(n=>n.pageviews),recent_views:f(t,"pageviews"),recent_reads:f(t,"reads"),recent_pdf_downloads:f(t,"pdf_downloads"),recent_newsletter_submits:f(t,"newsletter_submits"),recent_read_rate:g(f(t,"reads"),f(t,"pageviews")),previous_views:f(s,"pageviews")}}function ve(e){let a=new Map;return e.forEach(t=>{(t.series||[]).forEach(s=>{let n=a.get(s.date)||{date:s.date,pageviews:0,unique_visitors:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0};n.pageviews+=i(s.pageviews),n.reads+=i(s.reads),n.pdf_downloads+=i(s.pdf_downloads),n.newsletter_submits+=i(s.newsletter_submits),a.set(s.date,n)})}),B([...a.values()]).map(t=>({...t,read_rate:g(t.reads,t.pageviews)}))}function me(e){return e.length?i(e[e.length-1])-i(e[0]):0}function ee(e,a,t,s){return P([a].concat(t).filter(Boolean)).map(n=>e.find(r=>r[s]===n)).filter(Boolean).slice(0,4)}function _e(e,a){let t=S(e.daily,a.period),s=G(e.daily,t),n=e.overview;return M.map(r=>{let l=r.key==="read_rate"?t.length?g(f(t,"reads"),f(t,"pageviews")):i(n[r.key]):t.length?f(t,r.key):i(n[r.key]),h=r.key==="read_rate"?s.length?g(f(s,"reads"),f(s,"pageviews")):0:s.length?f(s,r.key):0;return{...r,value:l,previous:h,deltaText:Y(l,h,r),sparkline:(t.length?t:e.daily).map(c=>i(c[r.key])),summary:`${r.label}: ${L(r,l)}. ${Y(l,h,r)}.`}})}function ye(e,a){let t=ue(a.metric),n=S(e.daily,a.period).map(l=>({date:l.date,label:l.date,value:i(l[t.key])})),r=n[n.length-1]||null;return{metric:t,points:n,activePoint:r}}function fe(e,a){let t=S(e.daily,a.period);return M.map(s=>({...s,values:t.map(n=>i(n[s.key])),total:s.key==="read_rate"?g(f(t,"reads"),f(t,"pageviews")):f(t,s.key)}))}function we(e,a){let s=e.essays.filter(l=>C(l,a)).map(l=>A(l,a)).filter(l=>l.views>0),n=s.length?[...s].sort((l,h)=>l.views-h.views)[Math.floor(s.length/2)].views:0,r=s.length?[...s].sort((l,h)=>l.read_rate-h.read_rate)[Math.floor(s.length/2)].read_rate:0;return{medianViews:n,medianRate:r,points:s.map(l=>({...l,size:Math.max(10,Math.sqrt(Math.max(l.pdf_downloads,1))*8),quadrant:l.views>=n&&l.read_rate>=r?"High traffic / high completion":l.views>=n?"High traffic / low completion":l.read_rate>=r?"Low traffic / high completion":"Developing"}))}}function J(e,a){let t=e.essays.filter(r=>C(r,a)).map(r=>A(r,a)),s={views:r=>r.views,reads:r=>r.reads,read_rate:r=>r.read_rate,pdf_downloads:r=>r.pdf_downloads,recent_views:r=>r.recent_views},n=s[a.sort]||s.views;return t.sort((r,l)=>n(l)-n(r)).slice(0,12)}function V(e,a){let t=new Map;return e.forEach(s=>{let n=s[a],r=t.get(n)||{label:s[a],views:0,reads:0,pdf_downloads:0,newsletter_submits:0};r.views+=i(s.views),r.reads+=i(s.reads),r.pdf_downloads+=i(s.pdf_downloads),r.newsletter_submits+=i(s.newsletter_submits),t.set(n,r)}),[...t.values()].map(s=>({...s,read_rate:g(s.reads,s.views),pdf_rate:g(s.pdf_downloads,s.views),newsletter_rate:g(s.newsletter_submits,s.views)}))}function se(e,a){let t=e.journeys.filter(c=>C(c,a)&&j(c,a)),s=e.journeyBySource.filter(c=>j(c,a)),n=e.journeyByCollection.filter(c=>C(c,a)&&j(c,a)),r=e.journeyByEssay.filter(c=>C(c,a)),l=V(s,"discovery_type").sort((c,o)=>o.views-c.views).slice(0,5),h=V(t.map(c=>({...c,mode_label:c.discovery_mode})),"mode_label").sort((c,o)=>o.reads-c.reads);return{steps:[{key:"views",label:"Discovery to pageview",value:f(t,"views"),approximate:!1},{key:"reads",label:"Read events",value:f(t,"reads"),approximate:!0},{key:"pdf_downloads",label:"PDF downloads",value:f(t,"pdf_downloads"),approximate:!0},{key:"newsletter_submits",label:"Newsletter submits",value:f(t,"newsletter_submits"),approximate:!0}],paths:t.sort((c,o)=>i(o.reads)-i(c.reads)||i(o.views)-i(c.views)).slice(0,8),sourceFunnel:l,modeComparison:h,sourceLeaders:s.sort((c,o)=>a.scale==="rate"?o.read_rate-c.read_rate:o.reads-c.reads||o.views-c.views).slice(0,6),collectionLeaders:n.sort((c,o)=>a.scale==="rate"?o.read_rate-c.read_rate:o.reads-c.reads||o.views-c.views).slice(0,6),essayConversion:r.filter(c=>c.views>0).sort((c,o)=>a.scale==="rate"?o.read_rate-c.read_rate:o.views-c.views).slice(0,6)}}function ae(e,a){let t=e.sources.map(n=>({...n,source_type:k(n)})).filter(n=>j(n,a)).sort((n,r)=>a.scale==="rate"?r.read_rate-n.read_rate:r.pageviews-n.pageviews).slice(0,10),s=S(e.sourceSeries,a.period).filter(n=>j(n,a)).reduce((n,r)=>{let l=`${r.date}:${r.source_type}`,h=n.get(l)||{date:r.date,source_type:r.source_type,pageviews:0,reads:0};return h.pageviews+=i(r.pageviews),h.reads+=i(r.reads),n.set(l,h),n},new Map);return{rows:t,mix:[...s.values()]}}function $e(e,a){let t=(e.sections.length?e.sections:e.sectionOptions.map(o=>({section:o}))).map(o=>({section:o.section,pageviews:i(o.pageviews),reads:i(o.reads),read_rate:i(o.read_rate),pdf_downloads:i(o.pdf_downloads),newsletter_submits:i(o.newsletter_submits),sparkline:o.sparkline_pageviews||[]})),s=a.selectedSection||(a.section!=="all"?a.section:"")||t[0]?.section||"",n=e.essays.filter(o=>o.section===s).map(o=>A(o,a)),r=S(ve(n),a.period),l=t.find(o=>o.section===s)||{section:s||"Overview",pageviews:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0,sparkline:[]},h=V(e.journeys.filter(o=>o.section===s&&j(o,a)),"discovery_source").sort((o,b)=>b.views-o.views).slice(0,4),c=ee(t,s,a.compareSections,"section").map(o=>({...o,delta:me(o.sparkline)}));return{cards:t.map(o=>({...o,isSelected:o.section===s,isCompared:a.compareSections.includes(o.section)})),selected:{...l,trend:r,topEssays:[...n].sort((o,b)=>b.views-o.views).slice(0,4),completionLeaders:[...n].filter(o=>o.views>0).sort((o,b)=>b.read_rate-o.read_rate||b.views-o.views).slice(0,4),sourceMix:h,note:r.length?"Section trend is aggregated from essay-level daily series inside the selected section.":"Section trend falls back to the committed section snapshot when no essay-level daily series is available."},compare:c}}function ge(e,a){let t=a.selectedSection||(a.section!=="all"?a.section:""),s=e.essays.filter(b=>!t||b.section===t),n=s.length?J(e,{...a,section:t||a.section}):[],r=n.find(b=>b.path===a.selectedEssay)?.path||a.selectedEssay||n[0]?.path||"",l=(s.length?s:e.essays).map(b=>A(b,a)).find(b=>b.path===r)||null,h=l?V(e.journeys.filter(b=>b.path===l.path&&j(b,a)),"discovery_source").sort((b,y)=>y.views-b.views).slice(0,4):[],c=l&&e.journeyByEssay.find(b=>b.path===l.path)||null,o=ee(e.essays.map(b=>A(b,a)),l?.path||"",a.compareEssays,"path");return{selected:l?{...l,trend:S(l.series||[],a.period),sourceMix:h,journeyRecord:c,related:n.filter(b=>b.path!==l.path).slice(0,4)}:null,compare:o}}function xe(e,a){let t=J(e,a),s=se(e,a),n=ae(e,a).rows,r=S(e.daily,a.period),l=f(r,"pageviews");if(!e.daily.length&&!t.length)return[{title:"Awaiting the first trendable refresh",body:"The committed snapshot still renders, but daily trend, section, and journey files are empty until the next analytics refresh."}];if(l>0&&l<ce)return[{title:"Sample still too small for strong claims",body:`The current window has ${l} measured pageviews, so the dashboard keeps the signals conservative until the sample is less fragile.`}];let h=t.filter(p=>p.views>=z).filter(p=>p.trend.length>=4).map(p=>{let m=Math.floor(p.trend.length/2),w=p.trend.slice(0,m).reduce((R,T)=>R+T,0),O=p.trend.slice(m).reduce((R,T)=>R+T,0);return{essay:p,lift:O-w}}).sort((p,m)=>m.lift-p.lift)[0],c=t.filter(p=>p.views>=z).sort((p,m)=>m.read_rate-p.read_rate)[0],o=s.paths.filter(p=>p.views>=H).filter(p=>/internal/.test(p.discovery_type)).sort((p,m)=>m.reads-p.reads)[0],b=s.collectionLeaders.filter(p=>p.views>=H).sort((p,m)=>m.reads-p.reads||m.read_rate-p.read_rate)[0],y=s.sourceLeaders.filter(p=>p.views>=H).sort((p,m)=>m.views-p.views||p.read_rate-m.read_rate).find(p=>p.read_rate<50),_=n.find(p=>p.pageviews>=H),d=t.filter(p=>p.views>=z).sort((p,m)=>g(m.pdf_downloads,m.views)-g(p.pdf_downloads,p.views))[0];return[h&&{title:"Biggest riser",body:`${h.essay.title} gained the strongest view lift inside the selected window.`},c&&{title:"Strongest completion",body:`${c.title} leads on read rate above the minimum view threshold.`},o&&{title:"Best internal pathway",body:`${o.discovery_source} produces the strongest read-through path into ${o.title}.`},b&&{title:"Strongest discovery engine",body:`${b.label} is the strongest collection or module pathway for completed reads in the current view.`},y&&{title:"Traffic with weak completion",body:`${y.label} brings volume, but its read-through rate is lagging in the current window.`},_&&{title:"Largest traffic source",body:`${_.source} currently brings the most pageviews in the selected view.`},d&&{title:"PDF conversion leader",body:`${d.title} is converting the highest share of readers into PDF downloads.`}].filter(Boolean)}function te(e){if(!e.length)return"";let a=Object.keys(e[0]);return`${[a.join(","),...e.map(s=>a.map(n=>`"${String(s[n]??"").replace(/"/g,'""')}"`).join(","))].join(`
`)}
`}function K(e,a=""){let t=be(e),s=N(t,a);return{data:t,state:s,kpis:_e(t,s),trend:ye(t,s),smallMultiples:fe(t,s),scatter:we(t,s),leaderboard:J(t,s),sectionExplorer:$e(t,s),essayExplorer:ge(t,s),funnel:se(t,s),sources:ae(t,s),insights:xe(t,s)}}var $="&middot;",Se=4,ke={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function u(e){return String(e??"").replace(/[&<>"']/g,a=>ke[a])}function Ee(e){let a=document.getElementById(e);if(!a)return{};try{let t=JSON.parse(a.textContent||"{}");return typeof t=="string"?JSON.parse(t):t}catch{return{}}}function Q(e,a,t){if(!e.length)return"";let s=Math.max(...e,1);return e.map((n,r)=>{let l=e.length===1?a/2:r/(e.length-1)*a,h=t-n/s*t;return`${r===0?"M":"L"} ${l.toFixed(2)} ${h.toFixed(2)}`}).join(" ")}function oe(e,a,t){return e.length?`${Q(e,a,t)} L ${a} ${t} L 0 ${t} Z`:""}function D(e,a="dashboard-sparkline"){return e.length?`
    <svg class="${a}" viewBox="0 0 100 28" role="img" aria-hidden="true">
      <path class="${a}__area" d="${oe(e,100,28)}"></path>
      <path class="${a}__line" d="${Q(e,100,28)}"></path>
    </svg>
  `:`<div class="${a} ${a}--empty">No trend data yet</div>`}function je(e){return/^up /.test(e)?"is-up":/^down /.test(e)?"is-down":"is-flat"}function re(e,a,t=Se){return a?e.includes(a)?e.filter(s=>s!==a):e.concat(a).slice(-t):e}function U(e){return e.filter(Boolean).join(` ${$} `)}function de(e,a){return e.length?`
    <div class="dashboard-compare-strip">
      ${e.map(t=>{let s=a==="essay"?t.title:t.section,n=a==="essay"?(t.trend||[]).map(l=>l.pageviews??l):t.sparkline||[],r=U(a==="essay"?[`${t.views} views`,`${t.read_rate.toFixed(1)}% read rate`,`${t.pdf_downloads} PDFs`]:[`${t.pageviews} views`,`${t.read_rate.toFixed(1)}% read rate`,`${t.reads} reads`]);return`
            <article class="dashboard-compare-card">
              <p class="dashboard-compare-card__eyebrow">${u(a==="essay"?t.section:"Section comparison")}</p>
              <h4>${u(s)}</h4>
              <p class="dashboard-compare-card__meta">${u(r)}</p>
              ${D(n,"dashboard-inline-sparkline")}
            </article>
          `}).join("")}
    </div>
  `:`<p class="dashboard-empty">Select up to four ${a==="essay"?"essays":"sections"} to compare pace, scale, and efficiency.</p>`}function Me(e){return M.map(a=>`
      <button type="button" class="dashboard-pill${e.metric===a.key?" is-active":""}" data-metric="${a.key}" aria-pressed="${e.metric===a.key?"true":"false"}">
        ${a.label}
      </button>
    `).join("")}function Le(e,a){e&&(e.innerHTML=a.kpis.map(t=>`
        <article class="dashboard-kpi" aria-label="${t.summary}">
          <div class="dashboard-kpi__header">
            <p class="dashboard-kpi__label">${u(t.label)}</p>
            <p class="dashboard-kpi__delta ${je(t.deltaText)}">${u(t.deltaText)}</p>
          </div>
          <p class="dashboard-kpi__value">${L(t,t.value)}</p>
          <p class="dashboard-kpi__subtext">Selected window summary</p>
          ${D(t.sparkline)}
        </article>
      `).join(""))}function Te(e,a,t){if(!e)return;if(!t.points.length){e.innerHTML='<p class="dashboard-empty">No daily trend data yet. The committed snapshot totals still appear above.</p>';return}let s=t.points.map(r=>r.value),n=t.activePoint;e.innerHTML=`
    <div class="dashboard-panel__header">
      <div>
        <p class="list-title">Trend</p>
        <h3>${t.metric.label}</h3>
        <p class="dashboard-panel__caption">Latest annotation is pinned by default so the chart still reads clearly without hover.</p>
      </div>
      <div class="dashboard-pill-row">${Me(a)}</div>
    </div>
    <div class="dashboard-trend-card">
      <div class="dashboard-trend-card__summary">
        <p class="dashboard-trend-card__value">${L(t.metric,n.value)}</p>
        <p class="dashboard-trend-card__note">Latest point ${$} ${n.label}</p>
      </div>
      <div class="dashboard-trend-frame">
        <svg class="dashboard-trend-chart" viewBox="0 0 100 42" role="img" aria-label="${t.metric.label} over time">
          <path class="dashboard-trend-chart__area" d="${oe(s,100,42)}"></path>
          <path class="dashboard-trend-chart__line" d="${Q(s,100,42)}"></path>
        </svg>
        <div class="dashboard-trend-annotation">
          <span class="dashboard-trend-annotation__label">Visible annotation</span>
          <span class="dashboard-trend-annotation__text">${t.metric.label} closes the current window at ${L(t.metric,n.value)}.</span>
        </div>
      </div>
    </div>
  `}function Fe(e,a){e&&(e.innerHTML=a.map(t=>`
        <article class="dashboard-mini">
          <p class="dashboard-mini__label">${u(t.label)}</p>
          <p class="dashboard-mini__value">${L(t,t.total)}</p>
          ${D(t.values,"dashboard-mini-sparkline")}
        </article>
      `).join(""))}function De(e,a){e&&(e.innerHTML=a.map(t=>`
        <article class="dashboard-signal">
          <p class="dashboard-signal__kicker">Signal</p>
          <h3>${u(t.title)}</h3>
          <p>${u(t.body)}</p>
        </article>
      `).join(""))}function ne(e){return e?`
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
      <button type="button" class="dashboard-text-button" data-select-section="${u(e.section)}">Open section</button>
      <button type="button" class="dashboard-text-button" data-compare-essay="${u(e.path)}">Compare essay</button>
    </div>
  `:'<p class="dashboard-empty">Select an essay point to inspect traffic, completion, and PDF pull.</p>'}function Re(e,a,t,s){if(!e||!a)return;let n=s.scatter;if(!n.points.length){e.innerHTML='<p class="dashboard-empty">No content-performance points are available for this filter.</p>',a.innerHTML=ne(null);return}let r=Math.max(...n.points.map(c=>c.views),1),l=Math.max(...n.points.map(c=>c.read_rate),1),h=n.points.find(c=>c.path===t.selectedEssay)||n.points[0];e.innerHTML=`
    <div class="dashboard-scatter" role="img" aria-label="Content performance scatter plot">
      <div class="dashboard-scatter__mid dashboard-scatter__mid--x" style="left:${n.medianViews/r*100}%"></div>
      <div class="dashboard-scatter__mid dashboard-scatter__mid--y" style="top:${100-n.medianRate/l*100}%"></div>
      ${n.points.map(c=>{let o=c.views/r*100,b=100-c.read_rate/l*100;return`
            <button
              type="button"
              class="dashboard-scatter__point${h.path===c.path?" is-active":""}"
              style="left:${o}%;top:${b}%;width:${c.size}px;height:${c.size}px"
              data-select-essay="${u(c.path)}"
              aria-pressed="${h.path===c.path?"true":"false"}"
              aria-label="${u(`${c.title}: ${c.views} views, ${c.read_rate.toFixed(1)} percent read rate`)}">
            </button>
          `}).join("")}
    </div>
    <div class="dashboard-scatter__legend">
      <span>Left to right: traffic</span>
      <span>Bottom to top: completion</span>
    </div>
  `,a.innerHTML=ne(h)}function qe(e){return e.leaderboard.map(a=>({title:a.title,section:a.section,views:a.views,reads:a.reads,read_rate:a.read_rate.toFixed(1),pdf_downloads:a.pdf_downloads,primary_source:a.primary_source}))}function Ce(e,a){if(!e)return;if(!a.leaderboard.length){e.innerHTML='<p class="dashboard-empty">No essays match this filter yet.</p>';return}let t=Math.max(...a.leaderboard.map(s=>s.views),1);e.innerHTML=`
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
        ${a.leaderboard.map(s=>`
              <tr>
                <td>
                  <button type="button" class="dashboard-table__button" data-select-essay="${u(s.path)}">${u(s.title)}</button>
                  <span class="dashboard-table__subtext">${u(s.primary_source)}</span>
                  ${D(s.trend,"dashboard-inline-sparkline")}
                </td>
                <td>
                  <button type="button" class="dashboard-table__button dashboard-table__button--muted" data-select-section="${u(s.section)}">${u(s.section)}</button>
                </td>
                <td>
                  <span>${s.views}</span>
                  <span class="dashboard-inline-bar"><span style="width:${s.views/t*100}%"></span></span>
                </td>
                <td>${s.reads}</td>
                <td>${s.read_rate.toFixed(1)}%</td>
                <td>${s.pdf_downloads}</td>
                <td>
                  <span class="dashboard-table__muted">${u(s.primary_source)}</span>
                  <button type="button" class="dashboard-table__button dashboard-table__button--tiny" data-compare-essay="${u(s.path)}">Compare</button>
                </td>
              </tr>
            `).join("")}
      </tbody>
    </table>
  `}function Pe(e,a){if(!e)return;let t=a.sectionExplorer;if(!t.cards.length){e.innerHTML='<p class="dashboard-empty">Section drill-down appears when section snapshots are committed.</p>';return}let s=t.selected;e.innerHTML=`
    <div class="dashboard-panel__header">
      <div class="dashboard-chip-row">
        ${t.cards.map(n=>`
              <button
                type="button"
                class="dashboard-chip${n.isSelected?" is-active":""}"
                data-select-section="${u(n.section)}"
                aria-pressed="${n.isSelected?"true":"false"}">
                ${u(n.section)}
              </button>
            `).join("")}
      </div>
      <div class="dashboard-inline-actions">
        <button type="button" class="dashboard-text-button" data-reset-drilldown>Reset to overview</button>
        <button type="button" class="dashboard-text-button" data-compare-section="${u(s.section)}" aria-pressed="${a.state.compareSections.includes(s.section)?"true":"false"}">${a.state.compareSections.includes(s.section)?"Remove from compare":"Compare section"}</button>
      </div>
    </div>
    <div class="dashboard-drilldown-layout">
      <article class="dashboard-drilldown-card">
        <p class="dashboard-detail-card__eyebrow">Selected section</p>
        <h3>${u(s.section)}</h3>
        <p class="dashboard-detail-card__summary">${u(U([`${s.pageviews} views`,`${s.reads} reads`,`${s.read_rate.toFixed(1)}% read rate`]))}</p>
        ${D((s.trend||[]).map(n=>n.pageviews),"dashboard-sparkline dashboard-sparkline--framed")}
        <p class="dashboard-drilldown-card__note">${u(s.note)}</p>
      </article>
      <div class="dashboard-drilldown-stack">
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Top essays</h3>
            <p>Section leaders by views in the selected window.</p>
          </div>
          ${s.topEssays.length?s.topEssays.map(n=>`
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${u(n.path)}">
                      <span>
                        <strong>${u(n.title)}</strong>
                        <small>${n.views} views ${$} ${n.reads} reads</small>
                      </span>
                      <span>${n.read_rate.toFixed(1)}%</span>
                    </button>
                  `).join(""):'<p class="dashboard-empty">No essays in this section yet.</p>'}
        </section>
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Best read-rate performers</h3>
            <p>Useful for spotting quieter sections or pieces that convert attention efficiently.</p>
          </div>
          ${s.completionLeaders.length?s.completionLeaders.map(n=>`
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${u(n.path)}">
                      <span>
                        <strong>${u(n.title)}</strong>
                        <small>${n.views} views ${$} ${n.pdf_downloads} PDFs</small>
                      </span>
                      <span>${n.read_rate.toFixed(1)}%</span>
                    </button>
                  `).join(""):'<p class="dashboard-empty">No qualifying essays for this section yet.</p>'}
        </section>
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Strongest source mix</h3>
            <p>Measured pageviews grouped with approximate downstream outcomes for this section.</p>
          </div>
          ${s.sourceMix.length?s.sourceMix.map(n=>`
                    <article class="dashboard-ranked-row dashboard-ranked-row--static">
                      <span>
                        <strong>${u(n.label)}</strong>
                        <small>${n.views} views ${$} ${n.reads} reads</small>
                      </span>
                      <span>${n.read_rate.toFixed(1)}%</span>
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
      ${de(t.compare,"section")}
    </section>
  `}function Ae(e,a){if(!e)return;let t=a.essayExplorer;if(!t.selected){e.innerHTML='<p class="dashboard-empty">Select an essay from the scatter plot, leaderboard, or section explorer.</p>';return}let s=t.selected,n=s.journeyRecord?.attribution_note||"Journey rates remain approximate when they rely on same-session downstream sequences.";e.innerHTML=`
    <div class="dashboard-panel__header">
      <div>
        <p class="dashboard-detail-card__eyebrow">Selected essay</p>
        <h3>${u(s.title)}</h3>
        <p class="dashboard-detail-card__summary">${u(U([s.section,`${s.views} views`,`${s.read_rate.toFixed(1)}% read rate`,`${s.pdf_downloads} PDFs`]))}</p>
      </div>
      <div class="dashboard-inline-actions">
        <button type="button" class="dashboard-text-button" data-reset-drilldown>Reset to overview</button>
        <button type="button" class="dashboard-text-button" data-select-section="${u(s.section)}">Open section</button>
        <button type="button" class="dashboard-text-button" data-compare-essay="${u(s.path)}" aria-pressed="${a.state.compareEssays.includes(s.path)?"true":"false"}">${a.state.compareEssays.includes(s.path)?"Remove from compare":"Compare essay"}</button>
      </div>
    </div>
    <div class="dashboard-drilldown-layout">
      <article class="dashboard-drilldown-card">
        ${D((s.trend||[]).map(r=>r.pageviews),"dashboard-sparkline dashboard-sparkline--framed")}
        <dl class="dashboard-detail-list">
          <div><dt>Primary source</dt><dd>${u(s.primary_source)}</dd></div>
          <div><dt>Reads</dt><dd>${s.reads}</dd></div>
          <div><dt>PDF rate</dt><dd>${s.views?(s.pdf_downloads/s.views*100).toFixed(1):"0.0"}%</dd></div>
          <div><dt>Recent views</dt><dd>${s.recent_views}</dd></div>
        </dl>
        <p class="dashboard-callout${s.journeyRecord?.approximate_downstream?" is-approximate":""}">${u(n)}</p>
      </article>
      <div class="dashboard-drilldown-stack">
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Source mix</h3>
            <p>Discovery sources leading into this piece under the current filter.</p>
          </div>
          ${s.sourceMix.length?s.sourceMix.map(r=>`
                    <article class="dashboard-ranked-row dashboard-ranked-row--static">
                      <span>
                        <strong>${u(r.label)}</strong>
                        <small>${r.views} views ${$} ${r.reads} reads</small>
                      </span>
                      <span>${r.read_rate.toFixed(1)}%</span>
                    </article>
                  `).join(""):'<p class="dashboard-empty">No source mix is available for this essay under the current filter.</p>'}
        </section>
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Related essays</h3>
            <p>Nearby pieces in the same section so you can keep comparing without leaving context.</p>
          </div>
          ${s.related.length?s.related.map(r=>`
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${u(r.path)}">
                      <span>
                        <strong>${u(r.title)}</strong>
                        <small>${r.views} views ${$} ${r.read_rate.toFixed(1)}% read rate</small>
                      </span>
                      <span>${r.pdf_downloads} PDFs</span>
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
      ${de(t.compare,"essay")}
    </section>
  `}function Ne(e,a){if(!e)return;let t=Math.max(...a.funnel.steps.map(r=>r.value),1),s=Math.max(...a.funnel.sourceFunnel.map(r=>r.views),1),n=(r,l)=>r.length?`
        <div class="dashboard-journey-table">
          ${r.map(h=>`
                <article class="dashboard-journey-table__row">
                  <div>
                    <h4>${u(h.label||h.title)}</h4>
                    <p>${h.views} views ${$} ${h.reads} reads ${$} ${h.read_rate.toFixed(1)}% read rate</p>
                  </div>
                  <div class="dashboard-journey-table__metric">${l==="rate"?`${h.read_rate.toFixed(1)}%`:h.reads}</div>
                </article>
              `).join("")}
        </div>
      `:'<p class="dashboard-empty">No qualifying rows for this comparison yet.</p>';e.innerHTML=`
    <div class="dashboard-funnel">
      ${a.funnel.steps.map(r=>`
            <article class="dashboard-funnel__step${r.approximate?" is-approximate":""}">
              <div class="dashboard-funnel__topline">
                <p class="dashboard-funnel__label">${r.label}</p>
                ${r.approximate?'<span class="dashboard-funnel__badge">Approx.</span>':'<span class="dashboard-funnel__badge is-measured">Measured</span>'}
              </div>
              <p class="dashboard-funnel__value">${r.value}</p>
              <div class="dashboard-funnel__bar"><span style="width:${r.value/t*100}%"></span></div>
            </article>
          `).join("")}
    </div>
    <div class="dashboard-journey-comparison">
      <div class="dashboard-journey-comparison__header">
        <h3>Source-type conversion</h3>
        <p>Compare internal, external, campaign, and direct discovery without pretending the downstream steps are directly observed attribution chains.</p>
      </div>
      <div class="dashboard-journey-bars">
        ${a.funnel.sourceFunnel.length?a.funnel.sourceFunnel.map(r=>`
                  <article class="dashboard-journey-bar">
                    <div class="dashboard-journey-bar__topline">
                      <span>${u(r.label)}</span>
                      <span>${r.read_rate.toFixed(1)}%</span>
                    </div>
                    <div class="dashboard-journey-bar__track"><span style="width:${r.views/s*100}%"></span></div>
                    <p class="dashboard-journey-bar__meta">${r.views} views ${$} ${r.reads} reads ${$} ${r.pdf_downloads} PDFs</p>
                  </article>
                `).join(""):'<p class="dashboard-empty">No source-type journey comparison is available yet.</p>'}
      </div>
    </div>
    <div class="dashboard-journey-split">
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Discovery engines</h3>
          <p>Sources ranked by ${a.state.scale==="rate"?"read-through rate":"downstream reads"}.</p>
        </div>
        ${n(a.funnel.sourceLeaders,a.state.scale)}
      </section>
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Collections and modules</h3>
          <p>Internal pathways doing useful editorial work beyond raw click count.</p>
        </div>
        ${n(a.funnel.collectionLeaders,a.state.scale)}
      </section>
    </div>
    <div class="dashboard-journey-split">
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Essay conversion leaders</h3>
          <p>Compare high-view essays with quieter pages that convert more efficiently.</p>
        </div>
        ${n(a.funnel.essayConversion,a.state.scale)}
      </section>
      <section class="dashboard-journey-pane">
        <div class="dashboard-journey-pane__header">
          <h3>Observed pathways</h3>
          <p>Measured pageviews paired with approximate same-session downstream steps.</p>
        </div>
        <div class="dashboard-journeys">
          ${a.funnel.paths.length?a.funnel.paths.map(r=>`
                    <article class="dashboard-journey">
                      <div>
                        <p class="dashboard-journey__kicker">${u(r.discovery_type.replace(/-/g," "))}</p>
                        <h3>${u(r.discovery_source)}</h3>
                        <p>${u(r.title)}</p>
                      </div>
                      <p class="dashboard-journey__meta">${r.views} views ${$} ${r.reads} reads ${$} ${r.pdf_downloads} PDFs</p>
                    </article>
                  `).join(""):'<p class="dashboard-empty">No journey paths match this filter.</p>'}
        </div>
      </section>
    </div>
  `}function Oe(e,a,t){e&&(e.innerHTML=`
    <div class="dashboard-source-list">
      ${a.sources.rows.length?a.sources.rows.map(s=>{let n=t.scale==="rate"?`${s.read_rate.toFixed(1)}% read rate`:`${s.pageviews} views`;return`
                <article class="dashboard-source">
                  <div>
                    <p class="dashboard-source__kicker">${t.scale==="rate"?"Efficiency":"Scale"}</p>
                    <h3>${u(s.source)}</h3>
                    <p>${n}</p>
                  </div>
                  <div class="dashboard-source__meta">${s.reads} reads ${$} ${s.visitors} visitors</div>
                </article>
              `}).join(""):'<p class="dashboard-empty">No source data matches this filter.</p>'}
    </div>
  `)}function ie(e,a){if(!e)return;let t=e.getBoundingClientRect().top<=window.innerHeight+180;if(e.dataset.dashboardVisible==="true"||t){e.dataset.dashboardVisible="true",a();return}if(!("IntersectionObserver"in window)){e.dataset.dashboardVisible="true",a();return}e._dashboardObserver&&e._dashboardObserver.disconnect();let s=new IntersectionObserver(n=>{n.some(r=>r.isIntersecting)&&(s.disconnect(),e.dataset.dashboardVisible="true",a())},{rootMargin:"180px 0px"});e._dashboardObserver=s,s.observe(e)}function He(e,a){let t=new Blob([a],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=e,n.click(),URL.revokeObjectURL(s)}function Be(e,a,t){let s=new URL(window.location.href);s.search=e?`?${e}`:"",s.hash=window.location.hash;try{a==="push"&&e!==t?window.history.pushState({query:e},"",s.toString()):a!=="skip"&&window.history.replaceState({query:e},"",s.toString())}catch(n){if(window.location.protocol!=="file:")throw n}}function Ve(){if(!document.querySelector("[data-dashboard-shell]"))return;let a=Ee("dashboard-data"),t=K(a,window.location.search).data,s={kpis:document.querySelector("[data-dashboard-kpis]"),trend:document.querySelector("[data-dashboard-trend]"),multiples:document.querySelector("[data-dashboard-multiples]"),signals:document.querySelector("[data-dashboard-signals]"),sectionExplorer:document.querySelector("[data-dashboard-section-explorer]"),essayExplorer:document.querySelector("[data-dashboard-essay-explorer]"),scatter:document.querySelector("[data-dashboard-scatter]"),scatterDetails:document.querySelector("[data-dashboard-scatter-details]"),leaderboard:document.querySelector("[data-dashboard-leaderboard]"),funnel:document.querySelector("[data-dashboard-funnel]"),sources:document.querySelector("[data-dashboard-sources]")},n={period:document.querySelector("[data-dashboard-period]"),section:document.querySelector("[data-dashboard-section]"),sourceType:document.querySelector("[data-dashboard-source-type]"),scale:document.querySelector("[data-dashboard-scale]"),sort:document.querySelector("[data-dashboard-sort]"),exportCsv:document.querySelector("[data-dashboard-export]")};n.section.innerHTML=`<option value="all">All sections</option>${t.sectionOptions.map(o=>`<option value="${u(o)}">${u(o)}</option>`).join("")}`,n.sourceType.innerHTML=`<option value="all">All source types</option>${t.sourceTypeOptions.map(o=>`<option value="${u(o)}">${u(o)}</option>`).join("")}`;let r=N(t,window.location.search),l=I(r);function h(o,b="push"){r=N(t,`?${I(o)}`),c(b)}function c(o="replace"){let b=I(r);Be(b,o,l),l=b,[n.period.value,n.section.value,n.sourceType.value,n.scale.value,n.sort.value]=[r.period,r.section,r.sourceType,r.scale,r.sort];let y=K(a,`?${b}`);r=y.state,Le(s.kpis,y),Te(s.trend,r,y.trend),Fe(s.multiples,y.smallMultiples),De(s.signals,y.insights),Pe(s.sectionExplorer,y),Ae(s.essayExplorer,y),Re(s.scatter,s.scatterDetails,r,y),Ce(s.leaderboard,y),ie(s.funnel,()=>Ne(s.funnel,y)),ie(s.sources,()=>Oe(s.sources,y,r)),document.querySelectorAll("[data-metric]").forEach(_=>{_.addEventListener("click",()=>{h({...r,metric:_.getAttribute("data-metric")||r.metric},"push")})}),document.querySelectorAll("[data-select-essay]").forEach(_=>{_.addEventListener("click",()=>{let d=_.getAttribute("data-select-essay")||"",p=y.data.essays.find(m=>m.path===d);h({...r,selectedEssay:d,selectedSection:p?.section||r.selectedSection},"push")})}),document.querySelectorAll("[data-select-section]").forEach(_=>{_.addEventListener("click",()=>{let d=_.getAttribute("data-select-section")||"",p=[...y.data.essays].filter(m=>m.section===d).sort((m,w)=>w.views-m.views)[0];h({...r,selectedSection:d,selectedEssay:p?.path||""},"push")})}),document.querySelectorAll("[data-compare-section]").forEach(_=>{_.addEventListener("click",()=>{h({...r,compareSections:re(r.compareSections,_.getAttribute("data-compare-section")||"")},"push")})}),document.querySelectorAll("[data-compare-essay]").forEach(_=>{_.addEventListener("click",()=>{h({...r,compareEssays:re(r.compareEssays,_.getAttribute("data-compare-essay")||"")},"push")})}),document.querySelectorAll("[data-reset-drilldown]").forEach(_=>{_.addEventListener("click",()=>{h({...r,selectedSection:"",selectedEssay:"",compareSections:[],compareEssays:[]},"push")})}),n.exportCsv.onclick=()=>{He("outside-in-print-dashboard.csv",te(qe(y)))}}[[n.period,"period"],[n.section,"section"],[n.sourceType,"sourceType"],[n.scale,"scale"],[n.sort,"sort"]].forEach(([o,b])=>{o.addEventListener("change",()=>{h({...r,[b]:o.value},"push")})}),window.addEventListener("popstate",()=>{r=N(t,window.location.search),c("skip")}),c("replace")}Ve();})();
