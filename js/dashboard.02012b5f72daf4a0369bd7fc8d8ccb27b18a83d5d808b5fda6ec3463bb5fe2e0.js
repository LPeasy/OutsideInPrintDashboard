(()=>{var j=[{key:"pageviews",label:"Pageviews",kind:"number"},{key:"unique_visitors",label:"Unique visitors",kind:"number"},{key:"reads",label:"Read events",kind:"number"},{key:"read_rate",label:"Read rate",kind:"percent"},{key:"pdf_downloads",label:"PDF downloads",kind:"number"},{key:"newsletter_submits",label:"Newsletter submits",kind:"number"}],ie=10,V=10,R=5,M={period:"30d",section:"all",sourceType:"all",metric:"pageviews",scale:"absolute",sort:"views",selectedSection:"",compareSections:[],compareEssays:[],selectedEssay:""};function o(e){let a=Number(e);return Number.isFinite(a)?a:0}function b(e,a=""){return e==null||e===""?a:String(e)}function f(e){return Array.isArray(e)?e:[]}function C(e){return[...e].sort((a,t)=>b(a.date).localeCompare(b(t.date)))}function _(e,a){return e.reduce((t,s)=>t+o(s[a]),0)}function w(e,a){return a>0?Math.round(e/a*1e3)/10:0}function F(e){return[...new Set(e.filter(Boolean))]}function de(e){return e?F(String(e).split(",").map(a=>a.trim())):[]}function J(e,a,t=4){let s=new Set(a);return F(e).filter(n=>s.has(n)).slice(0,t)}function S(e){let a=b(e.discovery_type||e.source_type||e.type);if(a)return a;let t=b(e.source).toLowerCase(),s=b(e.medium).toLowerCase(),n=b(e.campaign).toLowerCase();return t==="direct"?"direct":t.startsWith("internal")?"internal":n||s==="campaign"||s==="generated"||s==="email"?"campaign":t?"external":"unknown"}function E(e,a){return e.kind==="percent"?`${o(a).toFixed(1)}%`:new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(o(a))}function K(e,a,t){let s=o(e),n=o(a),r=s-n;if(n<=0&&s<=0)return"Flat vs previous window";if(n<=0)return`${E(t,r)} above a zero baseline`;let l=r>0?"up":r<0?"down":"flat",u=Math.abs(r/n*100);return l==="flat"?"Flat vs previous window":`${l} ${u.toFixed(1)}% vs previous window`}function g(e,a){if(a==="all")return[...e];let t=Number.parseInt(a,10);return!Number.isFinite(t)||t<=0?[...e]:e.slice(Math.max(0,e.length-t))}function X(e,a){if(!a.length)return[];let t=a[0].date,s=e.findIndex(n=>n.date===t);return s<=0?[]:e.slice(Math.max(0,s-a.length),s)}function oe(e){return j.find(a=>a.key===e)||j[0]}function Q(e){return{date:b(e.date),pageviews:o(e.pageviews||e.views),unique_visitors:o(e.unique_visitors||e.visitors),reads:o(e.reads),read_rate:o(e.read_rate),pdf_downloads:o(e.pdf_downloads),newsletter_submits:o(e.newsletter_submits)}}function I(e,a){return{label:b(e[a]),discovery_type:S(e),discovery_mode:b(e.discovery_mode),module_slot:b(e.module_slot),collection:b(e.collection),section:b(e.section,"Unlabeled"),slug:b(e.slug),path:b(e.path),title:b(e.title,b(e[a],"Untitled")),views:o(e.views),reads:o(e.reads),read_rate:o(e.read_rate),pdf_downloads:o(e.pdf_downloads),pdf_rate:o(e.pdf_rate),newsletter_submits:o(e.newsletter_submits),newsletter_rate:o(e.newsletter_rate),approximate_downstream:!!e.approximate_downstream,attribution_note:b(e.attribution_note)}}function le(e,a){let t=b(e.path),s=o(e.views),n=o(e.reads);return{slug:b(e.slug),path:t,title:b(e.title,"Untitled"),section:b(e.section,"Unlabeled"),views:s,reads:n,read_rate:o(e.read_rate)||w(n,s),pdf_downloads:o(e.pdf_downloads),primary_source:b(e.primary_source,"Unattributed"),series:a.get(t)||[]}}function ce(e={}){let a={range_label:b(e.overview?.range_label,"Snapshot"),updated_at:b(e.overview?.updated_at),pageviews:o(e.overview?.pageviews),unique_visitors:o(e.overview?.unique_visitors),reads:o(e.overview?.reads),read_rate:o(e.overview?.read_rate),pdf_downloads:o(e.overview?.pdf_downloads),newsletter_submits:o(e.overview?.newsletter_submits)},t=C(f(e.timeseries_daily).map(Q)),s=new Map(f(e.essays_timeseries).map(i=>[b(i.path),C(f(i.series).map(Q))])),n=f(e.essays).map(i=>le(i,s)),r=f(e.sections).map(i=>({section:b(i.section,"Unlabeled"),pageviews:o(i.pageviews||i.views),reads:o(i.reads),read_rate:o(i.read_rate),pdf_downloads:o(i.pdf_downloads),newsletter_submits:o(i.newsletter_submits),sparkline_pageviews:Array.isArray(i.sparkline_pageviews)?i.sparkline_pageviews.map(o):[],sparkline_reads:Array.isArray(i.sparkline_reads)?i.sparkline_reads.map(o):[]})),l=f(e.journeys).map(i=>({discovery_source:b(i.discovery_source,"Direct"),discovery_type:S(i),discovery_mode:b(i.discovery_mode,"article-discovery"),module_slot:b(i.module_slot),collection:b(i.collection),slug:b(i.slug),path:b(i.path),title:b(i.title,"Untitled"),section:b(i.section,"Unlabeled"),views:o(i.views),reads:o(i.reads),pdf_downloads:o(i.pdf_downloads),newsletter_submits:o(i.newsletter_submits),approximate_downstream:!!i.approximate_downstream,attribution_note:b(i.attribution_note)})),u=f(e.journey_by_source).map(i=>I(i,"discovery_source")),c=f(e.journey_by_collection).map(i=>I(i,"collection_label")),d=f(e.journey_by_essay).map(i=>I(i,"title")),h=f(e.sources).map(i=>{let v=o(i.pageviews||i.views),p=o(i.reads);return{source:b(i.source,"Direct"),medium:b(i.medium),campaign:b(i.campaign),content:b(i.content),visitors:o(i.visitors),pageviews:v,reads:p,read_rate:w(p,v)}}),$=C(f(e.sources_timeseries).map(i=>({date:b(i.date),source_type:S(i),source:b(i.source,"Direct"),pageviews:o(i.pageviews||i.views),reads:o(i.reads),read_rate:o(i.read_rate),pdf_downloads:o(i.pdf_downloads),newsletter_submits:o(i.newsletter_submits)})));return{overview:a,daily:t,sections:r,essays:n,journeys:l,journeyBySource:u,journeyByCollection:c,journeyByEssay:d,sources:h,sourceSeries:$,periods:f(e.periods),sectionOptions:F(r.map(i=>i.section).concat(n.map(i=>i.section))).sort(),sourceTypeOptions:F(l.map(S).concat($.map(S))).sort()}}function q(e,a=""){let t=new URLSearchParams(String(a).replace(/^\?/,"")),s={...M};Object.keys(M).forEach(r=>{t.has(r)&&(s[r]=Array.isArray(M[r])?de(t.get(r)):t.get(r)||M[r])}),!e.sectionOptions.includes(s.section)&&s.section!=="all"&&(s.section="all"),!e.sourceTypeOptions.includes(s.sourceType)&&s.sourceType!=="all"&&(s.sourceType="all"),j.some(r=>r.key===s.metric)||(s.metric=M.metric),e.sectionOptions.includes(s.selectedSection)||(s.selectedSection=""),s.compareSections=J(s.compareSections,e.sectionOptions);let n=e.essays.map(r=>r.path);return n.includes(s.selectedEssay)||(s.selectedEssay=""),s.compareEssays=J(s.compareEssays,n),s}function N(e){let a=new URLSearchParams;return Object.entries(e).forEach(([t,s])=>{if(Array.isArray(s)){s.length&&a.set(t,s.join(","));return}s&&s!==M[t]&&a.set(t,s)}),a.toString()}function T(e,a){return a.section==="all"||b(e.section)===a.section}function k(e,a){return a.sourceType==="all"||S(e)===a.sourceType}function D(e,a){let t=g(e.series||[],a.period),s=X(e.series||[],t);return{...e,trend:t.map(n=>n.pageviews),recent_views:_(t,"pageviews"),recent_reads:_(t,"reads"),recent_pdf_downloads:_(t,"pdf_downloads"),recent_newsletter_submits:_(t,"newsletter_submits"),recent_read_rate:w(_(t,"reads"),_(t,"pageviews")),previous_views:_(s,"pageviews")}}function pe(e){let a=new Map;return e.forEach(t=>{(t.series||[]).forEach(s=>{let n=a.get(s.date)||{date:s.date,pageviews:0,unique_visitors:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0};n.pageviews+=o(s.pageviews),n.reads+=o(s.reads),n.pdf_downloads+=o(s.pdf_downloads),n.newsletter_submits+=o(s.newsletter_submits),a.set(s.date,n)})}),C([...a.values()]).map(t=>({...t,read_rate:w(t.reads,t.pageviews)}))}function ue(e){return e.length?o(e[e.length-1])-o(e[0]):0}function Y(e,a,t,s){return F([a].concat(t).filter(Boolean)).map(n=>e.find(r=>r[s]===n)).filter(Boolean).slice(0,4)}function he(e,a){let t=g(e.daily,a.period),s=X(e.daily,t),n=e.overview;return j.map(r=>{let l=r.key==="read_rate"?t.length?w(_(t,"reads"),_(t,"pageviews")):o(n[r.key]):t.length?_(t,r.key):o(n[r.key]),u=r.key==="read_rate"?s.length?w(_(s,"reads"),_(s,"pageviews")):0:s.length?_(s,r.key):0;return{...r,value:l,previous:u,deltaText:K(l,u,r),sparkline:(t.length?t:e.daily).map(c=>o(c[r.key])),summary:`${r.label}: ${E(r,l)}. ${K(l,u,r)}.`}})}function be(e,a){let t=oe(a.metric),n=g(e.daily,a.period).map(l=>({date:l.date,label:l.date,value:o(l[t.key])})),r=n[n.length-1]||null;return{metric:t,points:n,activePoint:r}}function ve(e,a){let t=g(e.daily,a.period);return j.map(s=>({...s,values:t.map(n=>o(n[s.key])),total:s.key==="read_rate"?w(_(t,"reads"),_(t,"pageviews")):_(t,s.key)}))}function me(e,a){let s=e.essays.filter(l=>T(l,a)).map(l=>D(l,a)).filter(l=>l.views>0),n=s.length?[...s].sort((l,u)=>l.views-u.views)[Math.floor(s.length/2)].views:0,r=s.length?[...s].sort((l,u)=>l.read_rate-u.read_rate)[Math.floor(s.length/2)].read_rate:0;return{medianViews:n,medianRate:r,points:s.map(l=>({...l,size:Math.max(10,Math.sqrt(Math.max(l.pdf_downloads,1))*8),quadrant:l.views>=n&&l.read_rate>=r?"High traffic / high completion":l.views>=n?"High traffic / low completion":l.read_rate>=r?"Low traffic / high completion":"Developing"}))}}function U(e,a){let t=e.essays.filter(r=>T(r,a)).map(r=>D(r,a)),s={views:r=>r.views,reads:r=>r.reads,read_rate:r=>r.read_rate,pdf_downloads:r=>r.pdf_downloads,recent_views:r=>r.recent_views},n=s[a.sort]||s.views;return t.sort((r,l)=>n(l)-n(r)).slice(0,12)}function P(e,a){let t=new Map;return e.forEach(s=>{let n=s[a],r=t.get(n)||{label:s[a],views:0,reads:0,pdf_downloads:0,newsletter_submits:0};r.views+=o(s.views),r.reads+=o(s.reads),r.pdf_downloads+=o(s.pdf_downloads),r.newsletter_submits+=o(s.newsletter_submits),t.set(n,r)}),[...t.values()].map(s=>({...s,read_rate:w(s.reads,s.views),pdf_rate:w(s.pdf_downloads,s.views),newsletter_rate:w(s.newsletter_submits,s.views)}))}function Z(e,a){let t=e.journeys.filter(c=>T(c,a)&&k(c,a)),s=e.journeyBySource.filter(c=>k(c,a)),n=e.journeyByCollection.filter(c=>T(c,a)&&k(c,a)),r=e.journeyByEssay.filter(c=>T(c,a)),l=P(s,"discovery_type").sort((c,d)=>d.views-c.views).slice(0,5),u=P(t.map(c=>({...c,mode_label:c.discovery_mode})),"mode_label").sort((c,d)=>d.reads-c.reads);return{steps:[{key:"views",label:"Discovery to pageview",value:_(t,"views"),approximate:!1},{key:"reads",label:"Read events",value:_(t,"reads"),approximate:!0},{key:"pdf_downloads",label:"PDF downloads",value:_(t,"pdf_downloads"),approximate:!0},{key:"newsletter_submits",label:"Newsletter submits",value:_(t,"newsletter_submits"),approximate:!0}],paths:t.sort((c,d)=>o(d.reads)-o(c.reads)||o(d.views)-o(c.views)).slice(0,8),sourceFunnel:l,modeComparison:u,sourceLeaders:s.sort((c,d)=>a.scale==="rate"?d.read_rate-c.read_rate:d.reads-c.reads||d.views-c.views).slice(0,6),collectionLeaders:n.sort((c,d)=>a.scale==="rate"?d.read_rate-c.read_rate:d.reads-c.reads||d.views-c.views).slice(0,6),essayConversion:r.filter(c=>c.views>0).sort((c,d)=>a.scale==="rate"?d.read_rate-c.read_rate:d.views-c.views).slice(0,6)}}function G(e,a){let t=e.sources.map(n=>({...n,source_type:S(n)})).filter(n=>k(n,a)).sort((n,r)=>a.scale==="rate"?r.read_rate-n.read_rate:r.pageviews-n.pageviews).slice(0,10),s=g(e.sourceSeries,a.period).filter(n=>k(n,a)).reduce((n,r)=>{let l=`${r.date}:${r.source_type}`,u=n.get(l)||{date:r.date,source_type:r.source_type,pageviews:0,reads:0};return u.pageviews+=o(r.pageviews),u.reads+=o(r.reads),n.set(l,u),n},new Map);return{rows:t,mix:[...s.values()]}}function _e(e,a){let t=(e.sections.length?e.sections:e.sectionOptions.map(d=>({section:d}))).map(d=>({section:d.section,pageviews:o(d.pageviews),reads:o(d.reads),read_rate:o(d.read_rate),pdf_downloads:o(d.pdf_downloads),newsletter_submits:o(d.newsletter_submits),sparkline:d.sparkline_pageviews||[]})),s=a.selectedSection||(a.section!=="all"?a.section:"")||t[0]?.section||"",n=e.essays.filter(d=>d.section===s).map(d=>D(d,a)),r=g(pe(n),a.period),l=t.find(d=>d.section===s)||{section:s||"Overview",pageviews:0,reads:0,read_rate:0,pdf_downloads:0,newsletter_submits:0,sparkline:[]},u=P(e.journeys.filter(d=>d.section===s&&k(d,a)),"discovery_source").sort((d,h)=>h.views-d.views).slice(0,4),c=Y(t,s,a.compareSections,"section").map(d=>({...d,delta:ue(d.sparkline)}));return{cards:t.map(d=>({...d,isSelected:d.section===s,isCompared:a.compareSections.includes(d.section)})),selected:{...l,trend:r,topEssays:[...n].sort((d,h)=>h.views-d.views).slice(0,4),completionLeaders:[...n].filter(d=>d.views>0).sort((d,h)=>h.read_rate-d.read_rate||h.views-d.views).slice(0,4),sourceMix:u,note:r.length?"Section trend is aggregated from essay-level daily series inside the selected section.":"Section trend falls back to the committed section snapshot when no essay-level daily series is available."},compare:c}}function ye(e,a){let t=a.selectedSection||(a.section!=="all"?a.section:""),s=e.essays.filter(h=>!t||h.section===t),n=s.length?U(e,{...a,section:t||a.section}):[],r=n.find(h=>h.path===a.selectedEssay)?.path||a.selectedEssay||n[0]?.path||"",l=(s.length?s:e.essays).map(h=>D(h,a)).find(h=>h.path===r)||null,u=l?P(e.journeys.filter(h=>h.path===l.path&&k(h,a)),"discovery_source").sort((h,$)=>$.views-h.views).slice(0,4):[],c=l&&e.journeyByEssay.find(h=>h.path===l.path)||null,d=Y(e.essays.map(h=>D(h,a)),l?.path||"",a.compareEssays,"path");return{selected:l?{...l,trend:g(l.series||[],a.period),sourceMix:u,journeyRecord:c,related:n.filter(h=>h.path!==l.path).slice(0,4)}:null,compare:d}}function fe(e,a){let t=U(e,a),s=Z(e,a),n=G(e,a).rows,r=g(e.daily,a.period),l=_(r,"pageviews");if(!e.daily.length&&!t.length)return[{title:"Awaiting the first trendable refresh",body:"The committed snapshot still renders, but daily trend, section, and journey files are empty until the next analytics refresh."}];if(l>0&&l<ie)return[{title:"Sample still too small for strong claims",body:`The current window has ${l} measured pageviews, so the dashboard keeps the signals conservative until the sample is less fragile.`}];let u=t.filter(p=>p.views>=V).filter(p=>p.trend.length>=4).map(p=>{let m=Math.floor(p.trend.length/2),x=p.trend.slice(0,m).reduce((H,B)=>H+B,0),O=p.trend.slice(m).reduce((H,B)=>H+B,0);return{essay:p,lift:O-x}}).sort((p,m)=>m.lift-p.lift)[0],c=t.filter(p=>p.views>=V).sort((p,m)=>m.read_rate-p.read_rate)[0],d=s.paths.filter(p=>p.views>=R).filter(p=>/internal/.test(p.discovery_type)).sort((p,m)=>m.reads-p.reads)[0],h=s.collectionLeaders.filter(p=>p.views>=R).sort((p,m)=>m.reads-p.reads||m.read_rate-p.read_rate)[0],$=s.sourceLeaders.filter(p=>p.views>=R).sort((p,m)=>m.views-p.views||p.read_rate-m.read_rate).find(p=>p.read_rate<50),i=n.find(p=>p.pageviews>=R),v=t.filter(p=>p.views>=V).sort((p,m)=>w(m.pdf_downloads,m.views)-w(p.pdf_downloads,p.views))[0];return[u&&{title:"Biggest riser",body:`${u.essay.title} gained the strongest view lift inside the selected window.`},c&&{title:"Strongest completion",body:`${c.title} leads on read rate above the minimum view threshold.`},d&&{title:"Best internal pathway",body:`${d.discovery_source} produces the strongest read-through path into ${d.title}.`},h&&{title:"Strongest discovery engine",body:`${h.label} is the strongest collection or module pathway for completed reads in the current view.`},$&&{title:"Traffic with weak completion",body:`${$.label} brings volume, but its read-through rate is lagging in the current window.`},i&&{title:"Largest traffic source",body:`${i.source} currently brings the most pageviews in the selected view.`},v&&{title:"PDF conversion leader",body:`${v.title} is converting the highest share of readers into PDF downloads.`}].filter(Boolean)}function ee(e){if(!e.length)return"";let a=Object.keys(e[0]);return`${[a.join(","),...e.map(s=>a.map(n=>`"${String(s[n]??"").replace(/"/g,'""')}"`).join(","))].join(`
`)}
`}function z(e,a=""){let t=ce(e),s=q(t,a);return{data:t,state:s,kpis:he(t,s),trend:be(t,s),smallMultiples:ve(t,s),scatter:me(t,s),leaderboard:U(t,s),sectionExplorer:_e(t,s),essayExplorer:ye(t,s),funnel:Z(t,s),sources:G(t,s),insights:fe(t,s)}}var y="&middot;",we=4;function $e(e){let a=document.getElementById(e);if(!a)return{};try{let t=JSON.parse(a.textContent||"{}");return typeof t=="string"?JSON.parse(t):t}catch{return{}}}function W(e,a,t){if(!e.length)return"";let s=Math.max(...e,1);return e.map((n,r)=>{let l=e.length===1?a/2:r/(e.length-1)*a,u=t-n/s*t;return`${r===0?"M":"L"} ${l.toFixed(2)} ${u.toFixed(2)}`}).join(" ")}function re(e,a,t){return e.length?`${W(e,a,t)} L ${a} ${t} L 0 ${t} Z`:""}function L(e,a="dashboard-sparkline"){return e.length?`
    <svg class="${a}" viewBox="0 0 100 28" role="img" aria-hidden="true">
      <path class="${a}__area" d="${re(e,100,28)}"></path>
      <path class="${a}__line" d="${W(e,100,28)}"></path>
    </svg>
  `:`<div class="${a} ${a}--empty">No trend data yet</div>`}function ge(e){return/^up /.test(e)?"is-up":/^down /.test(e)?"is-down":"is-flat"}function se(e,a,t=we){return a?e.includes(a)?e.filter(s=>s!==a):e.concat(a).slice(-t):e}function A(e){return e.filter(Boolean).join(` ${y} `)}function ne(e,a){return e.length?`
    <div class="dashboard-compare-strip">
      ${e.map(t=>{let s=a==="essay"?t.title:t.section,n=a==="essay"?(t.trend||[]).map(l=>l.pageviews??l):t.sparkline||[],r=A(a==="essay"?[`${t.views} views`,`${t.read_rate.toFixed(1)}% read rate`,`${t.pdf_downloads} PDFs`]:[`${t.pageviews} views`,`${t.read_rate.toFixed(1)}% read rate`,`${t.reads} reads`]);return`
            <article class="dashboard-compare-card">
              <p class="dashboard-compare-card__eyebrow">${a==="essay"?t.section:"Section comparison"}</p>
              <h4>${s}</h4>
              <p class="dashboard-compare-card__meta">${r}</p>
              ${L(n,"dashboard-inline-sparkline")}
            </article>
          `}).join("")}
    </div>
  `:`<p class="dashboard-empty">Select up to four ${a==="essay"?"essays":"sections"} to compare pace, scale, and efficiency.</p>`}function xe(e){return j.map(a=>`
      <button type="button" class="dashboard-pill${e.metric===a.key?" is-active":""}" data-metric="${a.key}" aria-pressed="${e.metric===a.key?"true":"false"}">
        ${a.label}
      </button>
    `).join("")}function Se(e,a){e&&(e.innerHTML=a.kpis.map(t=>`
        <article class="dashboard-kpi" aria-label="${t.summary}">
          <div class="dashboard-kpi__header">
            <p class="dashboard-kpi__label">${t.label}</p>
            <p class="dashboard-kpi__delta ${ge(t.deltaText)}">${t.deltaText}</p>
          </div>
          <p class="dashboard-kpi__value">${E(t,t.value)}</p>
          <p class="dashboard-kpi__subtext">Selected window summary</p>
          ${L(t.sparkline)}
        </article>
      `).join(""))}function ke(e,a,t){if(!e)return;if(!t.points.length){e.innerHTML='<p class="dashboard-empty">No daily trend data yet. The committed snapshot totals still appear above.</p>';return}let s=t.points.map(r=>r.value),n=t.activePoint;e.innerHTML=`
    <div class="dashboard-panel__header">
      <div>
        <p class="list-title">Trend</p>
        <h3>${t.metric.label}</h3>
        <p class="dashboard-panel__caption">Latest annotation is pinned by default so the chart still reads clearly without hover.</p>
      </div>
      <div class="dashboard-pill-row">${xe(a)}</div>
    </div>
    <div class="dashboard-trend-card">
      <div class="dashboard-trend-card__summary">
        <p class="dashboard-trend-card__value">${E(t.metric,n.value)}</p>
        <p class="dashboard-trend-card__note">Latest point ${y} ${n.label}</p>
      </div>
      <div class="dashboard-trend-frame">
        <svg class="dashboard-trend-chart" viewBox="0 0 100 42" role="img" aria-label="${t.metric.label} over time">
          <path class="dashboard-trend-chart__area" d="${re(s,100,42)}"></path>
          <path class="dashboard-trend-chart__line" d="${W(s,100,42)}"></path>
        </svg>
        <div class="dashboard-trend-annotation">
          <span class="dashboard-trend-annotation__label">Visible annotation</span>
          <span class="dashboard-trend-annotation__text">${t.metric.label} closes the current window at ${E(t.metric,n.value)}.</span>
        </div>
      </div>
    </div>
  `}function je(e,a){e&&(e.innerHTML=a.map(t=>`
        <article class="dashboard-mini">
          <p class="dashboard-mini__label">${t.label}</p>
          <p class="dashboard-mini__value">${E(t,t.total)}</p>
          ${L(t.values,"dashboard-mini-sparkline")}
        </article>
      `).join(""))}function Ee(e,a){e&&(e.innerHTML=a.map(t=>`
        <article class="dashboard-signal">
          <p class="dashboard-signal__kicker">Signal</p>
          <h3>${t.title}</h3>
          <p>${t.body}</p>
        </article>
      `).join(""))}function ae(e){return e?`
    <p class="dashboard-detail-card__eyebrow">Selected essay</p>
    <h3>${e.title}</h3>
    <p class="dashboard-detail-card__summary">${e.quadrant}</p>
    <dl class="dashboard-detail-list">
      <div><dt>Views</dt><dd>${e.views}</dd></div>
      <div><dt>Read rate</dt><dd>${e.read_rate.toFixed(1)}%</dd></div>
      <div><dt>PDF downloads</dt><dd>${e.pdf_downloads}</dd></div>
      <div><dt>Section</dt><dd>${e.section}</dd></div>
    </dl>
    <div class="dashboard-inline-actions">
      <button type="button" class="dashboard-text-button" data-select-section="${e.section}">Open section</button>
      <button type="button" class="dashboard-text-button" data-compare-essay="${e.path}">Compare essay</button>
    </div>
  `:'<p class="dashboard-empty">Select an essay point to inspect traffic, completion, and PDF pull.</p>'}function Me(e,a,t,s){if(!e||!a)return;let n=s.scatter;if(!n.points.length){e.innerHTML='<p class="dashboard-empty">No content-performance points are available for this filter.</p>',a.innerHTML=ae(null);return}let r=Math.max(...n.points.map(c=>c.views),1),l=Math.max(...n.points.map(c=>c.read_rate),1),u=n.points.find(c=>c.path===t.selectedEssay)||n.points[0];e.innerHTML=`
    <div class="dashboard-scatter" role="img" aria-label="Content performance scatter plot">
      <div class="dashboard-scatter__mid dashboard-scatter__mid--x" style="left:${n.medianViews/r*100}%"></div>
      <div class="dashboard-scatter__mid dashboard-scatter__mid--y" style="top:${100-n.medianRate/l*100}%"></div>
      ${n.points.map(c=>{let d=c.views/r*100,h=100-c.read_rate/l*100;return`
            <button
              type="button"
              class="dashboard-scatter__point${u.path===c.path?" is-active":""}"
              style="left:${d}%;top:${h}%;width:${c.size}px;height:${c.size}px"
              data-select-essay="${c.path}"
              aria-pressed="${u.path===c.path?"true":"false"}"
              aria-label="${c.title}: ${c.views} views, ${c.read_rate.toFixed(1)} percent read rate">
            </button>
          `}).join("")}
    </div>
    <div class="dashboard-scatter__legend">
      <span>Left to right: traffic</span>
      <span>Bottom to top: completion</span>
    </div>
  `,a.innerHTML=ae(u)}function Le(e){return e.leaderboard.map(a=>({title:a.title,section:a.section,views:a.views,reads:a.reads,read_rate:a.read_rate.toFixed(1),pdf_downloads:a.pdf_downloads,primary_source:a.primary_source}))}function Te(e,a){if(!e)return;if(!a.leaderboard.length){e.innerHTML='<p class="dashboard-empty">No essays match this filter yet.</p>';return}let t=Math.max(...a.leaderboard.map(s=>s.views),1);e.innerHTML=`
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
                  <button type="button" class="dashboard-table__button" data-select-essay="${s.path}">${s.title}</button>
                  <span class="dashboard-table__subtext">${s.primary_source}</span>
                  ${L(s.trend,"dashboard-inline-sparkline")}
                </td>
                <td>
                  <button type="button" class="dashboard-table__button dashboard-table__button--muted" data-select-section="${s.section}">${s.section}</button>
                </td>
                <td>
                  <span>${s.views}</span>
                  <span class="dashboard-inline-bar"><span style="width:${s.views/t*100}%"></span></span>
                </td>
                <td>${s.reads}</td>
                <td>${s.read_rate.toFixed(1)}%</td>
                <td>${s.pdf_downloads}</td>
                <td>
                  <span class="dashboard-table__muted">${s.primary_source}</span>
                  <button type="button" class="dashboard-table__button dashboard-table__button--tiny" data-compare-essay="${s.path}">Compare</button>
                </td>
              </tr>
            `).join("")}
      </tbody>
    </table>
  `}function Fe(e,a){if(!e)return;let t=a.sectionExplorer;if(!t.cards.length){e.innerHTML='<p class="dashboard-empty">Section drill-down appears when section snapshots are committed.</p>';return}let s=t.selected;e.innerHTML=`
    <div class="dashboard-panel__header">
      <div class="dashboard-chip-row">
        ${t.cards.map(n=>`
              <button
                type="button"
                class="dashboard-chip${n.isSelected?" is-active":""}"
                data-select-section="${n.section}"
                aria-pressed="${n.isSelected?"true":"false"}">
                ${n.section}
              </button>
            `).join("")}
      </div>
      <div class="dashboard-inline-actions">
        <button type="button" class="dashboard-text-button" data-reset-drilldown>Reset to overview</button>
        <button type="button" class="dashboard-text-button" data-compare-section="${s.section}" aria-pressed="${a.state.compareSections.includes(s.section)?"true":"false"}">${a.state.compareSections.includes(s.section)?"Remove from compare":"Compare section"}</button>
      </div>
    </div>
    <div class="dashboard-drilldown-layout">
      <article class="dashboard-drilldown-card">
        <p class="dashboard-detail-card__eyebrow">Selected section</p>
        <h3>${s.section}</h3>
        <p class="dashboard-detail-card__summary">${A([`${s.pageviews} views`,`${s.reads} reads`,`${s.read_rate.toFixed(1)}% read rate`])}</p>
        ${L((s.trend||[]).map(n=>n.pageviews),"dashboard-sparkline dashboard-sparkline--framed")}
        <p class="dashboard-drilldown-card__note">${s.note}</p>
      </article>
      <div class="dashboard-drilldown-stack">
        <section class="dashboard-drilldown-subpanel">
          <div class="dashboard-drilldown-subpanel__header">
            <h3>Top essays</h3>
            <p>Section leaders by views in the selected window.</p>
          </div>
          ${s.topEssays.length?s.topEssays.map(n=>`
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${n.path}">
                      <span>
                        <strong>${n.title}</strong>
                        <small>${n.views} views ${y} ${n.reads} reads</small>
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
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${n.path}">
                      <span>
                        <strong>${n.title}</strong>
                        <small>${n.views} views ${y} ${n.pdf_downloads} PDFs</small>
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
                        <strong>${n.label}</strong>
                        <small>${n.views} views ${y} ${n.reads} reads</small>
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
      ${ne(t.compare,"section")}
    </section>
  `}function De(e,a){if(!e)return;let t=a.essayExplorer;if(!t.selected){e.innerHTML='<p class="dashboard-empty">Select an essay from the scatter plot, leaderboard, or section explorer.</p>';return}let s=t.selected,n=s.journeyRecord?.attribution_note||"Journey rates remain approximate when they rely on same-session downstream sequences.";e.innerHTML=`
    <div class="dashboard-panel__header">
      <div>
        <p class="dashboard-detail-card__eyebrow">Selected essay</p>
        <h3>${s.title}</h3>
        <p class="dashboard-detail-card__summary">${A([s.section,`${s.views} views`,`${s.read_rate.toFixed(1)}% read rate`,`${s.pdf_downloads} PDFs`])}</p>
      </div>
      <div class="dashboard-inline-actions">
        <button type="button" class="dashboard-text-button" data-reset-drilldown>Reset to overview</button>
        <button type="button" class="dashboard-text-button" data-select-section="${s.section}">Open section</button>
        <button type="button" class="dashboard-text-button" data-compare-essay="${s.path}" aria-pressed="${a.state.compareEssays.includes(s.path)?"true":"false"}">${a.state.compareEssays.includes(s.path)?"Remove from compare":"Compare essay"}</button>
      </div>
    </div>
    <div class="dashboard-drilldown-layout">
      <article class="dashboard-drilldown-card">
        ${L((s.trend||[]).map(r=>r.pageviews),"dashboard-sparkline dashboard-sparkline--framed")}
        <dl class="dashboard-detail-list">
          <div><dt>Primary source</dt><dd>${s.primary_source}</dd></div>
          <div><dt>Reads</dt><dd>${s.reads}</dd></div>
          <div><dt>PDF rate</dt><dd>${s.views?(s.pdf_downloads/s.views*100).toFixed(1):"0.0"}%</dd></div>
          <div><dt>Recent views</dt><dd>${s.recent_views}</dd></div>
        </dl>
        <p class="dashboard-callout${s.journeyRecord?.approximate_downstream?" is-approximate":""}">${n}</p>
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
                        <strong>${r.label}</strong>
                        <small>${r.views} views ${y} ${r.reads} reads</small>
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
                    <button type="button" class="dashboard-ranked-row" data-select-essay="${r.path}">
                      <span>
                        <strong>${r.title}</strong>
                        <small>${r.views} views ${y} ${r.read_rate.toFixed(1)}% read rate</small>
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
      ${ne(t.compare,"essay")}
    </section>
  `}function qe(e,a){if(!e)return;let t=Math.max(...a.funnel.steps.map(r=>r.value),1),s=Math.max(...a.funnel.sourceFunnel.map(r=>r.views),1),n=(r,l)=>r.length?`
        <div class="dashboard-journey-table">
          ${r.map(u=>`
                <article class="dashboard-journey-table__row">
                  <div>
                    <h4>${u.label||u.title}</h4>
                    <p>${u.views} views ${y} ${u.reads} reads ${y} ${u.read_rate.toFixed(1)}% read rate</p>
                  </div>
                  <div class="dashboard-journey-table__metric">${l==="rate"?`${u.read_rate.toFixed(1)}%`:u.reads}</div>
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
                      <span>${r.label}</span>
                      <span>${r.read_rate.toFixed(1)}%</span>
                    </div>
                    <div class="dashboard-journey-bar__track"><span style="width:${r.views/s*100}%"></span></div>
                    <p class="dashboard-journey-bar__meta">${r.views} views ${y} ${r.reads} reads ${y} ${r.pdf_downloads} PDFs</p>
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
                        <p class="dashboard-journey__kicker">${r.discovery_type.replace(/-/g," ")}</p>
                        <h3>${r.discovery_source}</h3>
                        <p>${r.title}</p>
                      </div>
                      <p class="dashboard-journey__meta">${r.views} views ${y} ${r.reads} reads ${y} ${r.pdf_downloads} PDFs</p>
                    </article>
                  `).join(""):'<p class="dashboard-empty">No journey paths match this filter.</p>'}
        </div>
      </section>
    </div>
  `}function Re(e,a,t){e&&(e.innerHTML=`
    <div class="dashboard-source-list">
      ${a.sources.rows.length?a.sources.rows.map(s=>{let n=t.scale==="rate"?`${s.read_rate.toFixed(1)}% read rate`:`${s.pageviews} views`;return`
                <article class="dashboard-source">
                  <div>
                    <p class="dashboard-source__kicker">${t.scale==="rate"?"Efficiency":"Scale"}</p>
                    <h3>${s.source}</h3>
                    <p>${n}</p>
                  </div>
                  <div class="dashboard-source__meta">${s.reads} reads ${y} ${s.visitors} visitors</div>
                </article>
              `}).join(""):'<p class="dashboard-empty">No source data matches this filter.</p>'}
    </div>
  `)}function te(e,a){if(!e)return;let t=e.getBoundingClientRect().top<=window.innerHeight+180;if(e.dataset.dashboardVisible==="true"||t){e.dataset.dashboardVisible="true",a();return}if(!("IntersectionObserver"in window)){e.dataset.dashboardVisible="true",a();return}e._dashboardObserver&&e._dashboardObserver.disconnect();let s=new IntersectionObserver(n=>{n.some(r=>r.isIntersecting)&&(s.disconnect(),e.dataset.dashboardVisible="true",a())},{rootMargin:"180px 0px"});e._dashboardObserver=s,s.observe(e)}function Ce(e,a){let t=new Blob([a],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(t),n=document.createElement("a");n.href=s,n.download=e,n.click(),URL.revokeObjectURL(s)}function Pe(){if(!document.querySelector("[data-dashboard-shell]"))return;let a=$e("dashboard-data"),t=z(a,window.location.search).data,s={kpis:document.querySelector("[data-dashboard-kpis]"),trend:document.querySelector("[data-dashboard-trend]"),multiples:document.querySelector("[data-dashboard-multiples]"),signals:document.querySelector("[data-dashboard-signals]"),sectionExplorer:document.querySelector("[data-dashboard-section-explorer]"),essayExplorer:document.querySelector("[data-dashboard-essay-explorer]"),scatter:document.querySelector("[data-dashboard-scatter]"),scatterDetails:document.querySelector("[data-dashboard-scatter-details]"),leaderboard:document.querySelector("[data-dashboard-leaderboard]"),funnel:document.querySelector("[data-dashboard-funnel]"),sources:document.querySelector("[data-dashboard-sources]")},n={period:document.querySelector("[data-dashboard-period]"),section:document.querySelector("[data-dashboard-section]"),sourceType:document.querySelector("[data-dashboard-source-type]"),scale:document.querySelector("[data-dashboard-scale]"),sort:document.querySelector("[data-dashboard-sort]"),exportCsv:document.querySelector("[data-dashboard-export]")};n.section.innerHTML=`<option value="all">All sections</option>${t.sectionOptions.map(d=>`<option value="${d}">${d}</option>`).join("")}`,n.sourceType.innerHTML=`<option value="all">All source types</option>${t.sourceTypeOptions.map(d=>`<option value="${d}">${d}</option>`).join("")}`;let r=q(t,window.location.search),l=N(r);function u(d,h="push"){r=q(t,`?${N(d)}`),c(h)}function c(d="replace"){let h=N(r),$=`${window.location.pathname}${h?`?${h}`:""}${window.location.hash}`;d==="push"&&h!==l?window.history.pushState({query:h},"",$):d!=="skip"&&window.history.replaceState({query:h},"",$),l=h,[n.period.value,n.section.value,n.sourceType.value,n.scale.value,n.sort.value]=[r.period,r.section,r.sourceType,r.scale,r.sort];let i=z(a,`?${h}`);r=i.state,Se(s.kpis,i),ke(s.trend,r,i.trend),je(s.multiples,i.smallMultiples),Ee(s.signals,i.insights),Fe(s.sectionExplorer,i),De(s.essayExplorer,i),Me(s.scatter,s.scatterDetails,r,i),Te(s.leaderboard,i),te(s.funnel,()=>qe(s.funnel,i)),te(s.sources,()=>Re(s.sources,i,r)),document.querySelectorAll("[data-metric]").forEach(v=>{v.addEventListener("click",()=>{u({...r,metric:v.getAttribute("data-metric")||r.metric},"push")})}),document.querySelectorAll("[data-select-essay]").forEach(v=>{v.addEventListener("click",()=>{let p=v.getAttribute("data-select-essay")||"",m=i.data.essays.find(x=>x.path===p);u({...r,selectedEssay:p,selectedSection:m?.section||r.selectedSection},"push")})}),document.querySelectorAll("[data-select-section]").forEach(v=>{v.addEventListener("click",()=>{let p=v.getAttribute("data-select-section")||"",m=[...i.data.essays].filter(x=>x.section===p).sort((x,O)=>O.views-x.views)[0];u({...r,selectedSection:p,selectedEssay:m?.path||""},"push")})}),document.querySelectorAll("[data-compare-section]").forEach(v=>{v.addEventListener("click",()=>{u({...r,compareSections:se(r.compareSections,v.getAttribute("data-compare-section")||"")},"push")})}),document.querySelectorAll("[data-compare-essay]").forEach(v=>{v.addEventListener("click",()=>{u({...r,compareEssays:se(r.compareEssays,v.getAttribute("data-compare-essay")||"")},"push")})}),document.querySelectorAll("[data-reset-drilldown]").forEach(v=>{v.addEventListener("click",()=>{u({...r,selectedSection:"",selectedEssay:"",compareSections:[],compareEssays:[]},"push")})}),n.exportCsv.onclick=()=>{Ce("outside-in-print-dashboard.csv",ee(Le(i)))}}[[n.period,"period"],[n.section,"section"],[n.sourceType,"sourceType"],[n.scale,"scale"],[n.sort,"sort"]].forEach(([d,h])=>{d.addEventListener("change",()=>{u({...r,[h]:d.value},"push")})}),window.addEventListener("popstate",()=>{r=q(t,window.location.search),c("skip")}),c("replace")}Pe();})();
