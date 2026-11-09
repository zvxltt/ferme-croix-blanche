(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.remove('no-js');

/* Titre découpé mot par mot */
const h1=$('#h1');
const split=(node,delay)=>{let i=0;[...node.childNodes].forEach(n=>{
  if(n.nodeType===3){const frag=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){frag.append(' ');return}const w=document.createElement('span');w.className='w';w.innerHTML=`<span style="transition-delay:${delay+i++*.07}s">${t}</span>`;frag.append(w)});n.replaceWith(frag)}
  else{const w=document.createElement('span');w.className='w';const s=document.createElement('span');s.style.transitionDelay=(delay+i++*.07)+'s';n.replaceWith(w);s.append(n);w.append(s)}})};
split(h1,.45);

/* Chargement */
const loader=$('#loader'),lbar=$('#lbar');
let prog=0;const tick=setInterval(()=>{prog=Math.min(prog+Math.random()*22,90);lbar.style.width=prog+'%'},120);
const start=()=>{clearInterval(tick);lbar.style.width='100%';setTimeout(()=>{loader.classList.add('done');document.body.classList.remove('lock');setTimeout(()=>document.body.classList.add('ready'),250)},350)};
if(reduce){loader.remove();document.body.classList.remove('lock');document.body.classList.add('ready')}
else{let done=false;const go=()=>{if(!done){done=true;start()}};addEventListener('load',go);setTimeout(go,matchMedia('(max-width:820px)').matches?1400:2400)}

/* En-tête, barre mobile, lien actif */
const hd=$('#hd'),cb=$('#callbar');let lastY=0;const touch=matchMedia('(pointer:coarse)').matches;
const secs=['ferme','viandes','ventes','pension','commander'].map(id=>document.getElementById(id));
const links=$$('.nav a');

/* Menu mobile */
const burger=$('#burger');
const menu=o=>{document.body.classList.toggle('menu-open',o);document.body.classList.toggle('lock',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu')};
burger.onclick=()=>menu(!document.body.classList.contains('menu-open'));
$$('#drawer a').forEach(a=>a.addEventListener('click',()=>menu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});

/* Révélations */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15,rootMargin:'0px 0px -8% 0px'});
$$('.rv,.clip').forEach(el=>io.observe(el));

/* Manifeste : un mot = un span */
const man=$('#manifest');
const gold=['vente','directe','tradition,','circuit','court,'];
man.innerHTML=man.textContent.split(' ').map(w=>`<span class="t${gold.includes(w.toLowerCase())?' g':''}">${w}</span>`).join(' ');
const words=$$('#manifest .t');

/* Boucle de défilement : parallaxe, manifeste, frise, cartes */
const pars=$$('.par');const tl=$('#tl'),tlp=$('#tlp');
let ticking=false;
const frame=()=>{
  ticking=false;const y=scrollY,vh=innerHeight;
  hd.classList.toggle('solid',y>60);
  hd.classList.toggle('hide',y>lastY&&y>vh&&!document.body.classList.contains('menu-open'));
  lastY=y;
  document.documentElement.style.setProperty('--ht',hd.classList.contains('hide')?'0px':hd.offsetHeight+'px');
  let cur=null;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<vh*.4)cur=i});
  links.forEach((a,i)=>a.classList.toggle('on',i===cur));
  {const tr=document.getElementById('tarifs').getBoundingClientRect().top;
   const act=cur===null?0:cur===1?2:cur===2?(tr<vh*.45?3:2):cur===4?5:-1;
   $$('#callbar [data-s]').forEach(el=>el.classList.toggle('on',+el.dataset.s===act));}
  if(reduce)return;
  if(!touch)pars.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const c=r.top+r.height/2-vh/2;el.style.transform=`translate3d(0,${c*+el.dataset.speed}px,0)`+(el.closest('.hero')?'':' scale(1.12)')});
  const mr=man.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh*.85-mr.top)/(mr.height+vh*.35)));const n=Math.round(p*words.length);
  words.forEach((w,i)=>w.classList.toggle('lit',i<n));
  const tr=tl.getBoundingClientRect();tlp.style.height=Math.min(tr.height-20,Math.max(0,vh*.6-tr.top))+'px';
  $$('#tl li').forEach(li=>li.classList.toggle('in',li.getBoundingClientRect().top<vh*.6));
};
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
addEventListener('resize',frame);frame();

/* Carrousel des viandes */
const B='https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/115601/';
const ic={
 beef:'<path d="M5 7c-2 0-3-2-2-3M19 7c2 0 3-2 2-3M6 6h12l-1 9c-.5 3.5-3 5-5 5s-4.5-1.5-5-5z"/><path d="M9.5 16.5h5"/>',
 sheep:'<circle cx="8" cy="8" r="3"/><circle cx="13" cy="6.5" r="3"/><circle cx="17" cy="10" r="3"/><circle cx="6" cy="12.5" r="3"/><path d="M9 12h7l-1 6c-.5 2-2 3-2.5 3S10.5 20 10 18z"/>',
 pig:'<ellipse cx="12" cy="13" rx="8" ry="7"/><ellipse cx="12" cy="15" rx="3" ry="2"/><path d="M6 8L4.5 4l4 1.5M18 8l1.5-4-4 1.5"/>',
 calf:'<path d="M7 8h10l-1 7c-.5 3-2.5 4.5-4 4.5S8.5 18 8 15z"/><path d="M7 8C4.5 7.5 4 5.5 4.5 4.5c1.5 0 2.5 1 3 2M17 8c2.5-.5 3-2.5 2.5-3.5-1.5 0-2.5 1-3 2"/>',
 knife:'<path d="M4 20L16 8l2 2L8 20z"/><path d="M16 8l3-3a2 2 0 0 1 2 2l-3 3"/>',
 barn:'<path d="M3 10l9-6 9 6v10H3z"/><path d="M9 20v-6h6v6M9 14l6 6M15 14l-6 6"/>',
 leaf:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
 horse:'<path d="M6 21v-6l-2-3 3-6 3-2 1-2 1 3 5 3 3 3-2 2-3-2-1 4 1 6"/>'
};
const F=[
 {label:'Génisse Parthenaise',icon:'beef',img:'Modif%2030.4.24/cow1.jpg',desc:'Une viande bovine de qualité, issue de la prestigieuse race Parthenaise.',tab:'Génisse Parthenaise'},
 {label:'Agneau label rouge',icon:'sheep',img:'AGNEAUX%20LABEL%20ROUGE.webp',desc:'La tendresse à chaque bouchée, avec nos agneaux label rouge.',tab:'Agneau'},
 {label:'Porc fermier',icon:'pig',img:'IMG_5865.webp',desc:'Bien-être animal et alimentation équilibrée pour une viande savoureuse.',tab:'Porc fermier'},
 {label:'Veau de marque',icon:'calf',img:'Modif%2030.4.24/veau.jpg',desc:'Un savoir-faire traditionnel pour une viande juteuse.',tab:'Veau'},
 {label:'Découpe sur mesure',icon:'knife',img:'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur3.png',desc:'Votre colis, découpé avec savoir-faire selon vos demandes.'},
 {label:'Vente directe',icon:'barn',img:'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur2.png',desc:'Chaque mois, la ferme vous ouvre ses portes, en circuit court.'},
 {label:'50 ha de prairies',icon:'leaf',img:'Modif%2030.4.24/viandes-savoureuses-%C3%A0-Ploemeur1.png',desc:'Des vaches au pré, nourries en partie avec nos propres cultures.'},
 {label:'Pension de chevaux',icon:'horse',img:'Modif%2030.4.24/Un-h%C3%A9bergement-de-qualit%C3%A9-pour-votre-cheval-%C3%A0-Aincourt-et-%C3%A0-Arthies-1.png',desc:'10 box, carrière et sentiers de balade, pour 350 € par mois.',href:'#pension'}
];
const N=F.length,IH=65,svg=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic[k]}</svg>`;
const arrow='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h12M9 3l5 5-5 5"/></svg>';
const chipsEl=$('#fcChips'),stage=$('#fcStage'),dotsEl=$('#fcDots'),fc=$('#fc');
chipsEl.innerHTML=F.map((f,i)=>`<div class="fc-chip"><button type="button" data-i="${i}">${svg(f.icon)}<span>${f.label}</span></button></div>`).join('');
stage.innerHTML=F.map((f,i)=>{const link=f.tab?`<a href="#ventes" data-tab="${f.tab}">Voir les tarifs ${arrow}</a>`:f.href?`<a href="${f.href}">En savoir plus ${arrow}</a>`:'';
 return `<div class="fc-card" aria-hidden="true"><img src="${B}${f.img}" alt="${f.label}" loading="lazy"><div class="fc-live"><i></i><span>Ferme de la Croix Blanche</span></div><div class="fc-cap"><span class="fc-tag">${i+1} • ${f.label}</span><p>${f.desc}</p>${link}</div></div>`}).join('');
dotsEl.innerHTML=F.map((f,i)=>`<button type="button" aria-label="${f.label}" data-i="${i}"></button>`).join('');
const chips=[...chipsEl.children],fcCards=[...stage.children],dots=[...dotsEl.children];
const wrapN=(min,max,v)=>{const r=max-min;return((((v-min)%r)+r)%r)+min};
let cur=0,paused=false,visible=false;
const render=()=>{
  chips.forEach((c,i)=>{const d=wrapN(-N/2,N/2,i-cur);c.style.transform=`translateY(${d*IH}px)`;c.style.opacity=Math.max(0,1-Math.abs(d)*.25);c.classList.toggle('on',d===0);c.firstElementChild.tabIndex=Math.abs(d)<=2?0:-1});
  fcCards.forEach((c,i)=>{let d=i-cur;if(d>N/2)d-=N;if(d<-N/2)d+=N;
    const st=d===0?'active':d===-1?'prev':d===1?'next':'hidden';
    const x=st==='prev'?-100:st==='next'?100:0,sc=st==='active'?1:st==='hidden'?.7:.85,r=st==='prev'?-3:st==='next'?3:0;
    c.style.transform=`translateX(${x}px) scale(${sc}) rotate(${r}deg)`;c.style.opacity=st==='active'?1:st==='hidden'?0:.4;c.style.zIndex=st==='active'?20:st==='hidden'?0:10;
    c.classList.toggle('active',st==='active');c.setAttribute('aria-hidden',st!=='active')});
  dots.forEach((d,i)=>d.classList.toggle('on',i===cur));
};
const go=i=>{cur=((i%N)+N)%N;render()};
chipsEl.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.i)});
dotsEl.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.i)});
fc.addEventListener('mouseenter',()=>paused=true);fc.addEventListener('mouseleave',()=>paused=false);
fc.addEventListener('focusin',()=>paused=true);fc.addEventListener('focusout',()=>paused=false);
let tx=null;stage.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;paused=true},{passive:true});
stage.addEventListener('touchend',e=>{if(tx!=null){const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1))}tx=null;setTimeout(()=>paused=false,4000)});
new IntersectionObserver(([e])=>visible=e.isIntersecting,{threshold:.3}).observe(fc);
setInterval(()=>{if(!paused&&visible&&!document.hidden&&!reduce)go(cur+1)},3000);
render();

/* Compteurs */
$$('[data-count]').forEach(el=>{const n=+el.dataset.count;if(reduce)return;el.textContent='0';
  const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();let t0;const s=t=>{t0??=t;const p=Math.min(1,(t-t0)/1800);el.textContent=Math.round(n*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(s)};requestAnimationFrame(s)},{threshold:.6});o.observe(el)});

/* Dates de vente + compte à rebours */
const V=[["6, 7, 8","Novembre 2026","2026-11-06","2026-11-08"],["18, 19, 20","Décembre 2026","2026-12-18","2026-12-20"],["8, 9, 10","Janvier 2027","2027-01-08","2027-01-10"],["5, 6, 7","Février 2027","2027-02-05","2027-02-07"],["5, 6, 7","Mars 2027","2027-03-05","2027-03-07"],["2, 3, 4","Avril 2027","2027-04-02","2027-04-04"],["30, 1er, 2","Avril – Mai 2027","2027-04-30","2027-05-02"],["4, 5, 6","Juin 2027","2027-06-04","2027-06-06"],["2, 3, 4","Juillet 2027","2027-07-02","2027-07-04"],["3, 4, 5","Septembre 2027","2027-09-03","2027-09-05"],["1er, 2, 3","Octobre 2027","2027-10-01","2027-10-03"],["5, 6, 7","Novembre 2027","2027-11-05","2027-11-07"],["17, 18, 19","Décembre 2027","2027-12-17","2027-12-19"]];
const now=new Date();let next=null;
$('#dates').innerHTML=V.map(v=>{const past=new Date(v[3]+'T13:00')<now;let c=past?'past':'';if(!past&&!next){next=v;c='now'}
  return `<div class="date ${c}"><small>${c==='now'?'Prochaine vente':v[1]}</small><b>${v[0]}</b>${c==='now'?`<small>${v[1]}</small>`:''}</div>`}).join('');
if(next){const label=next[0].replace(/, (?=[^,]*$)/,' et ')+' '+next[1].toLowerCase().replace('avril – mai','avril – mai');$$('.js-next').forEach(e=>e.textContent=label);
  const target=new Date(next[2]+'T13:30');const cd=$('#cd');
  const up=()=>{let s=Math.max(0,(target-new Date())/1000);if(s<=0){cd.innerHTML='<div style="min-width:auto"><b style="font-size:1.4rem">Vente en cours</b><span>Venez nous voir !</span></div>';return}
    const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sc=Math.floor(s%60);
    cd.innerHTML=[[d,'jours'],[h,'heures'],[m,'min'],[sc,'sec']].map(([n,l])=>`<div><b>${String(n).padStart(2,'0')}</b><span>${l}</span></div>`).join('')};
  up();setInterval(up,1000)}

const nowEl=$('.date.now');if(nowEl){const d=$('#dates');requestAnimationFrame(()=>{if(d.scrollWidth>d.clientWidth)d.scrollLeft=nowEl.offsetLeft-d.clientWidth/2+nowEl.offsetWidth/2})}

/* Tarifs */
const T={
"Génisse Parthenaise":[["Steak haché – par 4 ou en vrac (500 g)",19],["Rôti de 1 kg / Tournedos par 2 pièces",32],["Entrecôte – pièce de 300 g environ",32],["Faux-filet – pièce de 300 g environ",32],["Pièce à fondue – morceau de 1 kg",32],["Filet en rôti de 1 kg ou tournedos par 2",49],["Basse côte – pièce de 300 g",27],["Côte de bœuf – pièce de 1,5 kg environ",32],["Bourguignon – par 1 kg",20],["Kit pot-au-feu – 1,5 à 2 kg",20],["Langue",20],["Foie – par 2 tranches",19],["Cœur – par 2 tranches",17],["Rognon, queue",17],["Joue de bœuf",24],["Tripe – 400 g environ",17],["Paleron – par 1 kg",22],["Steaks – par 2 pièces",29],["Merguez – par 10 pièces",17]],
"Agneau":[["Gigot entier ou côtes de gigot par 2",32],["Côtes premières / découvertes – par 2",27],["Côtes filet par 2, épaule en rôti ou désossée",28],["Selle",30],["Souris",27],["Collier",15],["Poitrine",10],["Rognon",18],["Poitrine (ribs)",10]],
"Porc fermier":[["Tête, pieds",8],["Grillades – par 2 pièces",16],["Jarret",null],["Côtes de porc – par 2 pièces",15],["Rôti – par 1 kg",17],["Rouelle",15],["Toulouse par 4 / Chipolatas nature ou aux herbes par 10",16],["Filet mignon",21],["Poitrines tranchées par 4 / Travers",12],["Crépinettes – par 2",15],["Sauté de porc – par 1 kg",14],["Palette, chair à saucisse",15],["Joues (sur commande)",18],["Foie (sur commande)",13]],
"Veau":[["Grenadin – par 2 pièces",48],["Escalopes – par 2 pièces",31],["Côtes de veau – par 2 pièces",28],["Blanquette – par 1 kg",27],["Tendron, osso bucco",21],["Tête et pieds",18],["Rognon",33],["Foie – par 2 tranches",32],["Paupiettes – par 2",29],["Haché de veau – 500 g",21],["Ris de veau",45],["Fraise de veau",15],["Rôti – par 1 kg",30]]};
const tabs=$('#tabs'),pill=$('#pill'),pl=$('#plist'),q=$('#q'),qx=$('#qx');
const plus='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v10M3 8h10"/></svg>';
const ITEMS={};Object.entries(T).forEach(([cat,rows])=>rows.forEach(([lab,p],i)=>{
  let order=/sur commande/i.test(lab);let clean=lab.replace(/\s*\(sur commande\)/i,'');
  const k=clean.indexOf(' – ');const n=k>-1?clean.slice(0,k):clean,sub=k>-1?clean.slice(k+3):'';
  ITEMS[cat+'|'+i]={id:cat+'|'+i,cat,n,sub,p,order}}));
let cat="Génisse Parthenaise",list={};
try{list=JSON.parse(localStorage.getItem('fcb-liste')||'{}')||{};Object.keys(list).forEach(k=>{if(!ITEMS[k])delete list[k]})}catch(e){list={}}
const save=()=>{try{localStorage.setItem('fcb-liste',JSON.stringify(list))}catch(e){}};
const norm=t=>t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const movePill=b=>{pill.style.width=b.offsetWidth+'px';pill.style.transform=`translateX(${b.offsetLeft}px)`};
const qtyHTML=id=>list[id]?`<span class="step"><button type="button" data-dec="${id}" aria-label="Retirer un">−</button><b>${list[id]}</b><button type="button" data-inc="${id}" aria-label="Ajouter un">+</button></span>`:`<button class="add" type="button" data-inc="${id}">${plus}Ajouter</button>`;
const rowHTML=(it,i,showCat)=>`<div class="pr" style="animation-delay:${Math.min(i,12)*30}ms"><div class="pr-t">${showCat?`<span class="pr-c">${it.cat}</span>`:''}<span class="pr-n">${it.n}</span>${it.sub?`<span class="pr-s">${it.sub}</span>`:''}${it.order?'<span class="badge">Sur commande</span>':''}</div>${it.p==null?'<b class="pr-p ask">Nous consulter</b>':`<b class="pr-p">${it.p} €<small>/kg</small></b>`}<div class="qty" data-q="${it.id}">${qtyHTML(it.id)}</div></div>`;
const renderT=()=>{
  const term=norm(q.value.trim());qx.hidden=!term;tabs.classList.toggle('off',!!term);
  $$('.tab').forEach(b=>{const on=!term&&b.dataset.k===cat;b.setAttribute('aria-selected',on);if(on)movePill(b)});
  const rows=term?Object.values(ITEMS).filter(it=>norm(it.n+' '+it.sub+' '+it.cat).includes(term)):Object.values(ITEMS).filter(it=>it.cat===cat);
  pl.innerHTML=rows.length?rows.map((it,i)=>rowHTML(it,i,!!term)).join(''):`<p class="empty">Aucun morceau ne correspond à « ${q.value.replace(/</g,'&lt;')} ». Appelez-nous au 06 80 68 11 05, nous avons peut-être ce que vous cherchez.</p>`;
};
const show=k=>{cat=k;q.value='';renderT()};
Object.keys(T).forEach(k=>{const b=document.createElement('button');b.className='tab';b.type='button';b.setAttribute('role','tab');b.dataset.k=k;b.innerHTML=`${k}<small>${T[k].length}</small>`;b.onclick=()=>{show(k);b.scrollIntoView({inline:'nearest',block:'nearest',behavior:'smooth'})};tabs.appendChild(b)});
q.addEventListener('input',renderT);
qx.onclick=()=>{q.value='';renderT();q.focus()};
renderT();
addEventListener('resize',()=>{const s=$('.tab[aria-selected="true"]');if(s)movePill(s)});
document.fonts&&document.fonts.ready.then(()=>{const s=$('.tab[aria-selected="true"]');if(s)movePill(s)});
$$('[data-tab]').forEach(a=>a.addEventListener('click',()=>setTimeout(()=>show(a.dataset.tab),50)));

/* Message de confirmation */
const toastEl=$('#toast');let tT;
const toast=h=>{toastEl.innerHTML=h;toastEl.classList.add('on');clearTimeout(tT);tT=setTimeout(()=>toastEl.classList.remove('on'),1800)};

/* Liste de commande */
const count=()=>Object.values(list).reduce((a,b)=>a+b,0);
const dock=$('#dock'),sheet=$('#sheet'),shBody=$('#shBody'),shFoot=$('#shFoot');
const listText=()=>Object.entries(list).map(([id,n])=>{const it=ITEMS[id];return `- ${n} × ${it.n}${it.sub?' ('+it.sub+')':''} – ${it.cat}`}).join('\n');
const refresh=(bumpIt)=>{
  const n=count();
  $$('[data-q]').forEach(el=>el.innerHTML=qtyHTML(el.dataset.q));
  ['#dockCnt','#cbCnt'].forEach(s=>{const e=$(s);e.textContent=n;if(bumpIt){e.classList.remove('bump');void e.offsetWidth;e.classList.add('bump')}});
  dock.classList.toggle('show',n>0&&!document.body.classList.contains('sheet-open'));
  $('#cbList').hidden=!n;$('#cbOrder').hidden=!!n;
  shBody.innerHTML=n?Object.entries(list).map(([id,k])=>{const it=ITEMS[id];return `<div class="li"><span class="n">${it.n}</span><span class="step"><button type="button" data-dec="${id}" aria-label="Retirer un">−</button><b>${k}</b><button type="button" data-inc="${id}" aria-label="Ajouter un">+</button></span><span class="s">${it.cat}${it.sub?' · '+it.sub:''}${it.p?' · '+it.p+' €/kg':''}</span></div>`}).join(''):'<div class="sh-empty"><p>Votre liste est vide. Ajoutez des morceaux depuis les tarifs.</p></div>';
  shFoot.hidden=!n;
  const rc=$('#recap');rc.hidden=!n;
  if(n)rc.innerHTML=`<b>Votre liste (${n} article${n>1?'s':''})</b> sera jointe à votre message. <button type="button" class="linkbtn" style="padding:0" id="rcEdit">Modifier</button>`;
  save();
};
document.addEventListener('click',e=>{
  const inc=e.target.closest('[data-inc]'),dec=e.target.closest('[data-dec]');
  if(inc){const id=inc.dataset.inc;list[id]=(list[id]||0)+1;refresh(true);
    if(!inc.closest('.sheet')){toast(`<b>${ITEMS[id].n}</b> ajouté à votre liste`);try{navigator.vibrate&&navigator.vibrate(12)}catch(_){}}}
  else if(dec){const id=dec.dataset.dec;list[id]--;if(list[id]<=0)delete list[id];refresh(false)}
  else if(e.target.id==='rcEdit')openSheet(true);
});
const openSheet=o=>{document.body.classList.toggle('sheet-open',o);document.body.classList.toggle('lock',o);dock.classList.toggle('show',!o&&count()>0);if(o)$('#shClose').focus()};
$('#dockOpen').onclick=()=>openSheet(true);$('#cbList').onclick=()=>openSheet(true);
$('#shClose').onclick=()=>openSheet(false);$('#scrim').onclick=()=>openSheet(false);
addEventListener('keydown',e=>{if(e.key==='Escape')openSheet(false)});
$('#shClear').onclick=()=>{list={};refresh(false)};
$('#shSend').onclick=()=>{openSheet(false);$('#objet').value='Une commande de viande';
  const m=$('#msg');const txt='Bonjour, je souhaite commander pour la prochaine vente :\n'+listText();
  if(!m.value.trim()||m.value.startsWith('Bonjour, je souhaite commander'))m.value=txt;setTimeout(()=>m.focus({preventScroll:true}),700)};
refresh(false);

/* Villes */
const villes=["Maulette","Thoiry","Bazainville","Aincourt","Arthies","Wy-dit-Joli-Village","Jambville","Gargenville","Fontenay-Saint-Père","Mantes-la-Jolie","Mantes-la-Ville","Follainville-Dennemont","Rosny-sur-Seine","Gasny"];
const row=a=>[...a,...a].map(v=>`<span>${v}</span>`).join('');
$('#v1').innerHTML=row(villes.slice(0,7));$('#v2').innerHTML=row(villes.slice(7));

/* Boutons magnétiques (ordinateur) */
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce){
  $$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')})}

/* Formulaire */
$$('[data-subject]').forEach(a=>a.addEventListener('click',()=>{$('#objet').value=a.dataset.subject}));
$('#f').addEventListener('submit',async e=>{e.preventDefault();const f=e.target;
  const ok=$('#ok'),err=$('#err'),btn=f.querySelector('button[type="submit"]');ok.hidden=true;err.hidden=true;
  if(!f.checkValidity()){f.reportValidity();return}
  const data=new FormData(f);if(count())data.append('liste',listText());
  btn.disabled=true;btn.style.opacity=.6;
  try{
    const r=await fetch(f.action,{method:'POST',body:data,headers:{'Accept':'application/json'}});
    const j=await r.json().catch(()=>({}));
    if(!r.ok||!j.ok)throw new Error(j.message||'Envoi impossible');
    ok.hidden=false;f.reset();list={};refresh(false);
  }catch(x){err.textContent=(x.message&&x.message!=='Failed to fetch'?x.message+'. ':'L\'envoi n\'a pas fonctionné. ')+'Vous pouvez aussi appeler le 06 80 68 11 05.';err.hidden=false}
  finally{btn.disabled=false;btn.style.opacity=''}});
})();
