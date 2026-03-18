(()=>{var M=[{key:"pageviews",label:"Pageviews",kind:"number"},{key:"unique_visitors",label:"Unique visitors",kind:"number"},{key:"reads",label:"Read events",kind:"number"},{key:"read_rate",label:"Read rate",kind:"percent"},{key:"pdf_downloads",label:"PDF downloads",kind:"number"},{key:"newsletter_submits",label:"Newsletter submits",kind:"number"}],ce=10,z=10,H=5,q={period:"30d",section:"all",sourceType:"all",metric:"pageviews",scale:"absolute",sort:"views",selectedSection:"",compareSections:[],compareEssays:[],selectedEssay:""};function o(e){let a=Number(e);return Number.isFinite(a)?a:0}function v(e,a=""){return e==null||e===""?a:String(e)}function g(e){return Array.isArray(e)?e:[]}function E(e,a="Unlabeled"){let t=v(e).trim();if(!t)return a;let s=t.toLowerCase();return s==="essay"||s==="essays"?"Essays":s==="book"||s==="books"?"Books":s==="working paper"||s==="working papers"||s==="working-paper"||s==="working-papers"?"Working Papers":s==="syd and oliver"||s==="syd & oliver"?"Syd and Oliver":s==="collection"||s==="collections"?"Collections":t}function B(e){return[...e].sort((a,t)=>v(a.date).localeCompare(v(t.date)))}function _(e,a){return e.reduce((t,s)=>t+o(s[a]),0)}function $(e,a){return a>0?Math.round(e/a*1e3)/10:0}function A(e){return[...new Set(e.filter(Boolean))]}function pe(e){return e?A(String(e).split(",").map(a=>a.trim())):[]}function X(e,a,t=4){let s=new Set(a);return A(e).filter(n=>s.has(n)).slice(0,t)}function k(e){let a=v(e.discovery_type||e.source_type||e.type);if(a)return a;let t=v(e.source).toLowerCase(),s=v(e.medium).toLowerCase(),n=v(e.campaign).toLowerCase();return t==="direct"?"direct":t.startsWith("internal")?"internal":n||s==="campaign"||s==="generated"||s==="email"?"campaign":t?"external":"unknown"}function L(e,a){return e.kind==="percent"?`${o(a).toFixed(1)}%`:new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(o(a))}function Y(e,a,t){let s=o(e),n=o(a),r=s-n;if(n<=0&&s<=0)return"Flat vs previous window";if(n<=0)return`${L(t,r)} above a zero baseline`;let l=r>0?"up":r<0?"down":"flat",h=Math.abs(r/n*100);return l==="flat"?"Flat vs previous window":`${l} ${h.toFixed(1)}% vs previous window`}function S(e,a){if(a==="all")return[...e];let t=Number.parseInt(a,10);return!Number.isFinite(t)||t<=0?[...e]:e.slice(Math.max(0,e.length-t))}function G(e,a){if(!a.length)return[];let t=a[0].date,s=e.findIndex(n=>n.date===t);return s<=0?[]:e.slice(Math.max(0,s-a.length),s)}function ue(e){return M.find(a=>a.key===e)||M[0]}function Z(e){return{date:v(e.date),pageviews:o(e.pageviews||e.views),unique_visitors:o(e.unique_visitors||e.visitors),reads:o(e.reads),read_rate:o(e.read_rate),pdf_downloads:o(e.pdf_downloads),newsletter_submits:o(e.newsletter_submits)}}function W(e,a){return{label:v(e[a]),discovery_type:k(e),discovery_mode:v(e.discovery_mode),module_slot:v(e.module_slot),collection:v(e.collection),section:E(e.section),slug:v(e.slug),path:v(e.path),title:v(e.title,v(e[a],"Untitled")),views:o(e.views),reads:o(e.reads),read_rate:o(e.read_rate),pdf_downloads:o(e.pdf_downloads),pdf_rate:o(e.pdf_rate),newsletter_submits:o(e.newsletter_submits),newsletter_rate:o(e.newsletter_rate),approximate_downstream:!!e.approximate_downstream,attribution_note:v(e.attribution_note)}}function he(e,a){let t=v(e.path),s=o(e.views),n=o(e.reads);return{slug:v(e.slug),path:t,title:v(e.title,"Untitled"),section:E(e.section),views:s,reads:n,read_rate:o(e.read_rate)||$(n,s),pdf_downloads:o(e.pdf_downloads),primary_source:v(e.primary_source,"Unattributed"),series:a.get(t)||[]}}function be(e={}){let a={range_label:v(e.overview?.range_label,"Snapshot"),updated_at:v(e.overview?.updated_at),pageviews:o(e.overview?.pageviews),unique_visitors:o(e.overview?.unique_visitors),reads:o(e.overview?.reads),read_rate:o(e.overview?.read_rate),pdf_downloads:o(e.overview?.pdf_downloads),newsletter_submits:o(e.overview?.newsletter_submits)},t=B(g(e.timeseries_daily).map(Z)),s=new Map(g(e.essays_timeseries).map(i=>[v(i.path),B(g(i.series).map(Z))])),n=g(e.essays).map(i=>he(i,s)),l=[...g(e.sections).reduce((i,p)=>{let m=E(p.section),f=i.get(m)||{section:m,pageviews:0,reads:0,pdf_downloads:0,newsletter_submits:0,sparkline_pageviews:[],sparkline_reads:[]},T=Array.isArray(p.sparkline_pageviews)?p.sparkline_pageviews.map(o):[],R=Array.isArray(p.sparkline_reads)?p.sparkline_reads.map(o):[],F=Math.max(f.sparkline_pageviews.length,T.length);return f.pageviews+=o(p.pageviews||p.views),f.reads+=o(p.reads),f.pdf_downloads+=o(p.pdf_downloads),f.newsletter_submits+=o(p.newsletter_submits),f.sparkline_pageviews=Array.from({length:F},(le,C)=>o(f.sparkline_pageviews[C])+o(T[C])),f.sparkline_reads=Array.from({length:F},(le,C)=>o(f.sparkline_reads[C])+o(R[C])),i.set(m,f),i},new Map).values()].map(i=>({...i,read_rate:o(i.pageviews)>0?$(i.reads,i.pageviews):0})).sort((i,p)=>p.pageviews-i.pageviews||p.reads-i.reads),h=g(e.journeys).map(i=>({discovery_source:v(i.discovery_source,"Direct"),discovery_type:k(i),discovery_mode:v(i.discovery_mode,"article-discovery"),module_slot:v(i.module_slot),collection:v(i.collection),slug:v(i.slug),path:v(i.path),title:v(i.title,"Untitled"),section:E(i.section),views:o(i.views),reads:o(i.reads),pdf_downloads:o(i.pdf_downloads),newsletter_submits:o(i.newsletter_submits),approximate_downstream:!!i.approximate_downstream,attribution_note:v(i.attribution_note)})),c=g(e.journey_by_source).map(i=>W(i,"discovery_source")),d=g(e.journey_by_collection).map(i=>W(i,"collection_label")),b=g(e.journey_by_essay).map(i=>W(i,"title")),x=g(e.sources).map(i=>{let p=o(i.pageviews||i.views),m=o(i.reads);return{source:v(i.source,"Direct"),medium:v(i.medium),campaign:v(i.campaign),content:v(i.content),visitors:o(i.visitors),pageviews:p,reads:m,read_rate:$(m,p)}}),y=B(g(e.sources_timeseries).map(i=>({date:v(i.date),source_type:k(i),source:v(i.source,"Direct"),pageviews:o(i.pageviews||i.views),reads:o(i.reads),read_rate:o(i.read_rate),pdf_downloads:o(i.pdf_downloads),newsletter_submits:o(i.newsletter_submits)})));return{overview:a,daily:t,sections:l,essays:n,journeys:h,journeyBySource:c,journeyByCollection:d,journeyByEssay:b,sources:x,sourceSeries:y,periods:g(e.periods),sectionOptions:A(l.map(i=>i.section).concat(n.map(i=>i.section))).sort(),sourceTypeOptions:A(h.map(k).concat(y.map(k))).sort()}}function O(e,a=""){let t=new URLSearchParams(String(a).replace(/^\?/,"")),s={...q};Object.keys(q).forEach(r=>{t.has(r)&&(s[r]=Array.isArray(q[r])?pe(t.get(r)):t.get(r)||q[r])}),!e.sectionOptions.includes(s.section)&&s.section!=="all"&&(s.section=E(s.section,"")),!e.sectionOptions.includes(s.section)&&s.section!=="all"&&(s.section="all"),!e.sourceTypeOptions.includes(s.sourceType)&&s.sourceType!=="all"&&(s.sourceType="all"),M.some(r=>r.key===s.metric)||(s.metric=q.metric),s.selectedSection=E(s.selectedSection,""),e.sectionOptions.includes(s.selectedSection)||(s.selectedSection=""),s.compareSections=X(s.compareSections.map(r=>E(r,"")),e.sectionOptions);let n=e.essays.map(r=>r.path);return n.includes(s.selectedEssay)||(s.selectedEssay=""),s.compareEssays=X(s.compareEssays,n),s}function I(e){let a=new URLSearchParams;return Object.entries(e).forEach(([t,s])=>{if(Array.isArray(s)){s.length&&a.set(t,s.join(","));return}s&&s!==q[t]&&a.set(t,s)}),a.toString()}function P(e,a){return a.section==="all"||v(e.section)===a.section}function j(e,a){return a.sourceType==="all"||k(e)===a.sourceType}function N(e,a){let t=S(e.series||[],a.period),s=G(e.series||[],t);return{...e,trend:t.map(n=>n.pageviews),recent_views:_(t,"pageviews"),recent_reads:_(t,"reads"),recent_pdf_downloads:_(t,"pdf_downloads"),recent_newsletter_submits:_(t,"newsletter_submits"),recent_read_rate:$(_(t,"reads"),_(t,"pageviews")),previous_views:_(s,"pageviews")}}function ve(e){let a=new Map;return e.forEach(t=>{(t.series||[]).forEach(s=>{let n=a.get(s.date)||{date:s.date,pageviews:0,unique_visitors:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0};n.pageviews+=o(s.pageviews),n.reads+=o(s.reads),n.pdf_downloads+=o(s.pdf_downloads),n.newsletter_submits+=o(s.newsletter_submits),a.set(s.date,n)})}),B([...a.values()]).map(t=>({...t,read_rate:$(t.reads,t.pageviews)}))}function me(e){return e.length?o(e[e.length-1])-o(e[0]):0}function ee(e,a,t,s){return A([a].concat(t).filter(Boolean)).map(n=>e.find(r=>r[s]===n)).filter(Boolean).slice(0,4)}function _e(e,a){let t=S(e.daily,a.period),s=G(e.daily,t),n=e.overview;return M.map(r=>{let l=r.key==="read_rate"?t.length?$(_(t,"reads"),_(t,"pageviews")):o(n[r.key]):t.length?_(t,r.key):o(n[r.key]),h=r.key==="read_rate"?s.length?$(_(s,"reads"),_(s,"pageviews")):0:s.length?_(s,r.key):0;return{...r,value:l,previous:h,deltaText:Y(l,h,r),sparkline:(t.length?t:e.daily).map(c=>o(c[r.key])),summary:`${r.label}: ${L(r,l)}. ${Y(l,h,r)}.`}})}function ye(e,a){let t=ue(a.metric),n=S(e.daily,a.period).map(l=>({date:l.date,label:l.date,value:o(l[t.key])})),r=n[n.length-1]||null;return{metric:t,points:n,activePoint:r}}function fe(e,a){let t=S(e.daily,a.period);return M.map(s=>({...s,values:t.map(n=>o(n[s.key])),total:s.key==="read_rate"?$(_(t,"reads"),_(t,"pageviews")):_(t,s.key)}))}function we(e,a){let s=e.essays.filter(l=>P(l,a)).map(l=>N(l,a)).filter(l=>l.views>0),n=s.length?[...s].sort((l,h)=>l.views-h.views)[Math.floor(s.length/2)].views:0,r=s.length?[...s].sort((l,h)=>l.read_rate-h.read_rate)[Math.floor(s.length/2)].read_rate:0;return{medianViews:n,medianRate:r,points:s.map(l=>({...l,size:Math.max(10,Math.sqrt(Math.max(l.pdf_downloads,1))*8),quadrant:l.views>=n&&l.read_rate>=r?"High traffic / high completion":l.views>=n?"High traffic / low completion":l.read_rate>=r?"Low traffic / high completion":"Developing"}))}}function J(e,a){let t=e.essays.filter(r=>P(r,a)).map(r=>N(r,a)),s={views:r=>r.views,reads:r=>r.reads,read_rate:r=>r.read_rate,pdf_downloads:r=>r.pdf_downloads,recent_views:r=>r.recent_views},n=s[a.sort]||s.views;return t.sort((r,l)=>n(l)-n(r)).slice(0,12)}function V(e,a){let t=new Map;return e.forEach(s=>{let n=s[a],r=t.get(n)||{label:s[a],views:0,reads:0,pdf_downloads:0,newsletter_submits:0};r.views+=o(s.views),r.reads+=o(s.reads),r.pdf_downloads+=o(s.pdf_downloads),r.newsletter_submits+=o(s.newsletter_submits),t.set(n,r)}),[...t.values()].map(s=>({...s,read_rate:$(s.reads,s.views),pdf_rate:$(s.pdf_downloads,s.views),newsletter_rate:$(s.newsletter_submits,s.views)}))}function se(e,a){let t=e.journeys.filter(c=>P(c,a)&&j(c,a)),s=e.journeyBySource.filter(c=>j(c,a)),n=e.journeyByCollection.filter(c=>P(c,a)&&j(c,a)),r=e.journeyByEssay.filter(c=>P(c,a)),l=V(s,"discovery_type").sort((c,d)=>d.views-c.views).slice(0,5),h=V(t.map(c=>({...c,mode_label:c.discovery_mode})),"mode_label").sort((c,d)=>d.reads-c.reads);return{steps:[{key:"views",label:"Discovery to pageview",value:_(t,"views"),approximate:!1},{key:"reads",label:"Read events",value:_(t,"reads"),approximate:!0},{key:"pdf_downloads",label:"PDF downloads",value:_(t,"pdf_downloads"),approximate:!0},{key:"newsletter_submits",label:"Newsletter submits",value:_(t,"newsletter_submits"),approximate:!0}],paths:t.sort((c,d)=>o(d.reads)-o(c.reads)||o(d.views)-o(c.views)).slice(0,8),sourceFunnel:l,modeComparison:h,sourceLeaders:s.sort((c,d)=>a.scale==="rate"?d.read_rate-c.read_rate:d.reads-c.reads||d.views-c.views).slice(0,6),collectionLeaders:n.sort((c,d)=>a.scale==="rate"?d.read_rate-c.read_rate:d.reads-c.reads||d.views-c.views).slice(0,6),essayConversion:r.filter(c=>c.views>0).sort((c,d)=>a.scale==="rate"?d.read_rate-c.read_rate:d.views-c.views).slice(0,6)}}function ae(e,a){let t=e.sources.map(n=>({...n,source_type:k(n)})).filter(n=>j(n,a)).sort((n,r)=>a.scale==="rate"?r.read_rate-n.read_rate:r.pageviews-n.pageviews).slice(0,10),s=S(e.sourceSeries,a.period).filter(n=>j(n,a)).reduce((n,r)=>{let l=`${r.date}:${r.source_type}`,h=n.get(l)||{date:r.date,source_type:r.source_type,pageviews:0,reads:0};return h.pageviews+=o(r.pageviews),h.reads+=o(r.reads),n.set(l,h),n},new Map);return{rows:t,mix:[...s.values()]}}function $e(e,a){let t=(e.sections.length?e.sections:e.sectionOptions.map(d=>({section:d}))).map(d=>({section:d.section,pageviews:o(d.pageviews),reads:o(d.reads),read_rate:o(d.read_rate),pdf_downloads:o(d.pdf_downloads),newsletter_submits:o(d.newsletter_submits),sparkline:d.sparkline_pageviews||[]})),s=a.selectedSection||(a.section!=="all"?a.section:"")||t[0]?.section||"",n=e.essays.filter(d=>d.section===s).map(d=>N(d,a)),r=S(ve(n),a.period),l=t.find(d=>d.section===s)||{section:s||"Overview",pageviews:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0,sparkline:[]},h=V(e.journeys.filter(d=>d.section===s&&j(d,a)),"discovery_source").sort((d,b)=>b.views-d.views).slice(0,4),c=ee(t,s,a.compareSections,"section").map(d=>({...d,delta:me(d.sparkline)}));return{cards:t.map(d=>({...d,isSelected:d.section===s,isCompared:a.compareSections.includes(d.section)})),selected:{...l,trend:r,topEssays:[...n].sort((d,b)=>b.views-d.views).slice(0,4),completionLeaders:[...n].filter(d=>d.views>0).sort((d,b)=>b.read_rate-d.read_rate||b.views-d.views).slice(0,4),sourceMix:h,note:r.length?"Section trend is aggregated from essay-level daily series inside the selected section.":"Section trend falls back to the committed section snapshot when no essay-level daily series is available."},compare:c}}function ge(e,a){let t=a.selectedSection||(a.section!=="all"?a.section:""),s=e.essays.filter(b=>!t||b.section===t),n=s.length?J(e,{...a,section:t||a.section}):[],r=n.find(b=>b.path===a.selectedEssay)?.path||a.selectedEssay||n[0]?.path||"",l=(s.length?s:e.essays).map(b=>N(b,a)).find(b=>b.path===r)||null,h=l?V(e.journeys.filter(b=>b.path===l.path&&j(b,a)),"discovery_source").sort((b,x)=>x.views-b.views).slice(0,4):[],c=l&&e.journeyByEssay.find(b=>b.path===l.path)||null,d=ee(e.essays.map(b=>N(b,a)),l?.path||"",a.compareEssays,"path");return{selected:l?{...l,trend:S(l.series||[],a.period),sourceMix:h,journeyRecord:c,related:n.filter(b=>b.path!==l.path).slice(0,4)}:null,compare:d}}function xe(e,a){let t=J(e,a),s=se(e,a),n=ae(e,a).rows,r=S(e.daily,a.period),l=_(r,"pageviews");if(!e.daily.length&&!t.length)return[{title:"Awaiting the first trendable refresh",body:"The committed snapshot still renders, but daily trend, section, and journey files are empty until the next analytics refresh."}];if(l>0&&l<ce)return[{title:"Sample still too small for strong claims",body:`The current window has ${l} measured pageviews, so the dashboard keeps the signals conservative until the sample is less fragile.`}];let h=t.filter(p=>p.views>=z).filter(p=>p.trend.length>=4).map(p=>{let m=Math.floor(p.trend.length/2),f=p.trend.slice(0,m).reduce((R,F)=>R+F,0),T=p.trend.slice(m).reduce((R,F)=>R+F,0);return{essay:p,lift:T-f}}).sort((p,m)=>m.lift-p.lift)[0],c=t.filter(p=>p.views>=z).sort((p,m)=>m.read_rate-p.read_rate)[0],d=s.paths.filter(p=>p.views>=H).filter(p=>/internal/.test(p.discovery_type)).sort((p,m)=>m.reads-p.reads)[0],b=s.collectionLeaders.filter(p=>p.views>=H).sort((p,m)=>m.reads-p.reads||m.read_rate-p.read_rate)[0],x=s.sourceLeaders.filter(p=>p.views>=H).sort((p,m)=>m.views-p.views||p.read_rate-m.read_rate).find(p=>p.read_rate<50),y=n.find(p=>p.pageviews>=H),i=t.filter(p=>p.views>=z).sort((p,m)=>$(m.pdf_downloads,m.views)-$(p.pdf_downloads,p.views))[0];return[h&&{title:"Biggest riser",body:`${h.essay.title} gained the strongest view lift inside the selected window.`},c&&{title:"Strongest completion",body:`${c.title} leads on read rate above the minimum view threshold.`},d&&{title:"Best internal pathway",body:`${d.discovery_source} produces the strongest read-through path into ${d.title}.`},b&&{title:"Strongest discovery engine",body:`${b.label} is the strongest collection or module pathway for completed reads in the current view.`},x&&{title:"Traffic with weak completion",body:`${x.label} brings volume, but its read-through rate is lagging in the current window.`},y&&{title:"Largest traffic source",body:`${y.source} currently brings the most pageviews in the selected view.`},i&&{title:"PDF conversion leader",body:`${i.title} is converting the highest share of readers into PDF downloads.`}].filter(Boolean)}function te(e){if(!e.length)return"";let a=Object.keys(e[0]);return`${[a.join(","),...e.map(s=>a.map(n=>`"${String(s[n]??"").replace(/"/g,'""')}"`).join(","))].join(`
`)}
`}function K(e,a=""){let t=be(e),s=O(t,a);return{data:t,state:s,kpis:_e(t,s),trend:ye(t,s),smallMultiples:fe(t,s),scatter:we(t,s),leaderboard:J(t,s),sectionExplorer:$e(t,s),essayExplorer:ge(t,s),funnel:se(t,s),sources:ae(t,s),insights:xe(t,s)}}var w="&middot;",Se=4,ke={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function u(e){return String(e??"").replace(/[&<>"']/g,a=>ke[a])}function Ee(e){let a=document.getElementById(e);if(!a)return{};try{let t=JSON.parse(a.textContent||"{}");return typeof t=="string"?JSON.parse(t):t}catch{return{}}}function Q(e,a,t){if(!e.length)return"";let s=Math.max(...e,1);return e.map((n,r)=>{let l=e.length===1?a/2:r/(e.length-1)*a,h=t-n/s*t;return`${r===0?"M":"L"} ${l.toFixed(2)} ${h.toFixed(2)}`}).join(" ")}function oe(e,a,t){return e.length?`${Q(e,a,t)} L ${a} ${t} L 0 ${t} Z`:""}function D(e,a="dashboard-sparkline"){return e.length?`
    <svg class="${a}" viewBox="0 0 100 28" role="img" aria-hidden="true">
      <path class="${a}__area" d="${oe(e,100,28)}"></path>
      <path class="${a}__line" d="${Q(e,100,28)}"></path>
    </svg>
  `:`<div class="${a} ${a}--empty">No trend data yet</div>`}function je(e){return/^up /.test(e)?"is-up":/^down /.test(e)?"is-down":"is-flat"}function re(e,a,t=Se){return a?e.includes(a)?e.filter(s=>s!==a):e.concat(a).slice(-t):e}function U(e){return e.filter(Boolean).join(` ${w} `)}function de(e,a){return e.length?`
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
        <p class="dashboard-trend-card__note">Latest point ${w} ${n.label}</p>
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
      `).join(""))}function qe(e,a){e&&(e.innerHTML=a.map(t=>`
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
  `:'<p class="dashboard-empty">Select an essay point to inspect traffic, completion, and PDF pull.</p>'}function De(e,a,t,s){if(!e||!a)return;let n=s.scatter;if(!n.points.length){e.innerHTML='<p class="dashboard-empty">No content-performance points are available for this filter.</p>',a.innerHTML=ne(null);return}let r=Math.max(...n.points.map(c=>c.views),1),l=Math.max(...n.points.map(c=>c.read_rate),1),h=n.points.find(c=>c.path===t.selectedEssay)||n.points[0];e.innerHTML=`
    <div class="dashboard-scatter" role="img" aria-label="Content performance scatter plot">
      <div class="dashboard-scatter__mid dashboard-scatter__mid--x" style="left:${n.medianViews/r*100}%"></div>
      <div class="dashboard-scatter__mid dashboard-scatter__mid--y" style="top:${100-n.medianRate/l*100}%"></div>
      ${n.points.map(c=>{let d=c.views/r*100,b=100-c.read_rate/l*100;return`
            <button
              type="button"
              class="dashboard-scatter__point${h.path===c.path?" is-active":""}"
              style="left:${d}%;top:${b}%;width:${c.size}px;height:${c.size}px"
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
  `,a.innerHTML=ne(h)}function Re(e){return e.leaderboard.map(a=>({title:a.title,section:a.section,views:a.views,reads:a.reads,read_rate:a.read_rate.toFixed(1),pdf_downloads:a.pdf_downloads,primary_source:a.primary_source}))}function Ce(e,a){if(!e)return;if(!a.leaderboard.length){e.innerHTML='<p class="dashboard-empty">No essays match this filter yet.</p>';return}let t=Math.max(...a.leaderboard.map(s=>s.views),1);e.innerHTML=`
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
                        <small>${n.views} views ${w} ${n.reads} reads</small>
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
                        <small>${n.views} views ${w} ${n.pdf_downloads} PDFs</small>
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
                        <small>${n.views} views ${w} ${n.reads} reads</small>
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
                        <small>${r.views} views ${w} ${r.reads} reads</small>
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
                        <small>${r.views} views ${w} ${r.read_rate.toFixed(1)}% read rate</small>
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
                    <p>${h.views} views ${w} ${h.reads} reads ${w} ${h.read_rate.toFixed(1)}% read rate</p>
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
                    <p class="dashboard-journey-bar__meta">${r.views} views ${w} ${r.reads} reads ${w} ${r.pdf_downloads} PDFs</p>
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
                      <p class="dashboard-journey__meta">${r.views} views ${w} ${r.reads} reads ${w} ${r.pdf_downloads} PDFs</p>
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
                  <div class="dashboard-source__meta">${s.reads} reads ${w} ${s.visitors} visitors</div>
                </article>
              `}).join(""):'<p class="dashboard-empty">No source data matches this filter.</p>'}
    </div>
  `)}function ie(e,a){if(!e)return;let t=e.getBoundingClientRect().top<=window.innerHeight+180;if(e.dataset.dashboardVisible==="true"||t){e.dataset.dashboardVisible="true",a();return}if(!("IntersectionObserver"in window)){e.dataset.dashboardVisible="true",a();return}e._dashboardObserver&&e._dashboardObserver.disconnect();let s=new IntersectionObserver(n=>{n.some(r=>r.isIntersecting)&&(s.disconnect(),e.dataset.dashboardVisible="true",a())},{rootMargin:"180px 0px"});e._dashboardObserver=s,s.observe(e)}function He(e,a){let t=new Blob([a],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=e,n.click(),URL.revokeObjectURL(s)}function Be(){if(!document.querySelector("[data-dashboard-shell]"))return;let a=Ee("dashboard-data"),t=K(a,window.location.search).data,s={kpis:document.querySelector("[data-dashboard-kpis]"),trend:document.querySelector("[data-dashboard-trend]"),multiples:document.querySelector("[data-dashboard-multiples]"),signals:document.querySelector("[data-dashboard-signals]"),sectionExplorer:document.querySelector("[data-dashboard-section-explorer]"),essayExplorer:document.querySelector("[data-dashboard-essay-explorer]"),scatter:document.querySelector("[data-dashboard-scatter]"),scatterDetails:document.querySelector("[data-dashboard-scatter-details]"),leaderboard:document.querySelector("[data-dashboard-leaderboard]"),funnel:document.querySelector("[data-dashboard-funnel]"),sources:document.querySelector("[data-dashboard-sources]")},n={period:document.querySelector("[data-dashboard-period]"),section:document.querySelector("[data-dashboard-section]"),sourceType:document.querySelector("[data-dashboard-source-type]"),scale:document.querySelector("[data-dashboard-scale]"),sort:document.querySelector("[data-dashboard-sort]"),exportCsv:document.querySelector("[data-dashboard-export]")};n.section.innerHTML=`<option value="all">All sections</option>${t.sectionOptions.map(d=>`<option value="${u(d)}">${u(d)}</option>`).join("")}`,n.sourceType.innerHTML=`<option value="all">All source types</option>${t.sourceTypeOptions.map(d=>`<option value="${u(d)}">${u(d)}</option>`).join("")}`;let r=O(t,window.location.search),l=I(r);function h(d,b="push"){r=O(t,`?${I(d)}`),c(b)}function c(d="replace"){let b=I(r),x=`${window.location.pathname}${b?`?${b}`:""}${window.location.hash}`;d==="push"&&b!==l?window.history.pushState({query:b},"",x):d!=="skip"&&window.history.replaceState({query:b},"",x),l=b,[n.period.value,n.section.value,n.sourceType.value,n.scale.value,n.sort.value]=[r.period,r.section,r.sourceType,r.scale,r.sort];let y=K(a,`?${b}`);r=y.state,Le(s.kpis,y),Te(s.trend,r,y.trend),Fe(s.multiples,y.smallMultiples),qe(s.signals,y.insights),Pe(s.sectionExplorer,y),Ae(s.essayExplorer,y),De(s.scatter,s.scatterDetails,r,y),Ce(s.leaderboard,y),ie(s.funnel,()=>Ne(s.funnel,y)),ie(s.sources,()=>Oe(s.sources,y,r)),document.querySelectorAll("[data-metric]").forEach(i=>{i.addEventListener("click",()=>{h({...r,metric:i.getAttribute("data-metric")||r.metric},"push")})}),document.querySelectorAll("[data-select-essay]").forEach(i=>{i.addEventListener("click",()=>{let p=i.getAttribute("data-select-essay")||"",m=y.data.essays.find(f=>f.path===p);h({...r,selectedEssay:p,selectedSection:m?.section||r.selectedSection},"push")})}),document.querySelectorAll("[data-select-section]").forEach(i=>{i.addEventListener("click",()=>{let p=i.getAttribute("data-select-section")||"",m=[...y.data.essays].filter(f=>f.section===p).sort((f,T)=>T.views-f.views)[0];h({...r,selectedSection:p,selectedEssay:m?.path||""},"push")})}),document.querySelectorAll("[data-compare-section]").forEach(i=>{i.addEventListener("click",()=>{h({...r,compareSections:re(r.compareSections,i.getAttribute("data-compare-section")||"")},"push")})}),document.querySelectorAll("[data-compare-essay]").forEach(i=>{i.addEventListener("click",()=>{h({...r,compareEssays:re(r.compareEssays,i.getAttribute("data-compare-essay")||"")},"push")})}),document.querySelectorAll("[data-reset-drilldown]").forEach(i=>{i.addEventListener("click",()=>{h({...r,selectedSection:"",selectedEssay:"",compareSections:[],compareEssays:[]},"push")})}),n.exportCsv.onclick=()=>{He("outside-in-print-dashboard.csv",te(Re(y)))}}[[n.period,"period"],[n.section,"section"],[n.sourceType,"sourceType"],[n.scale,"scale"],[n.sort,"sort"]].forEach(([d,b])=>{d.addEventListener("change",()=>{h({...r,[b]:d.value},"push")})}),window.addEventListener("popstate",()=>{r=O(t,window.location.search),c("skip")}),c("replace")}Be();})();
