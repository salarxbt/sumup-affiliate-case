(function(){
var d=document,de=d.documentElement;de.classList.add('js');
var RM=window.matchMedia('(prefers-reduced-motion: reduce)');
function rm(){return RM.matches}
function $(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))}
var nav=d.querySelector('.nav');
function navH(){return nav?nav.getBoundingClientRect().height:0}

// tabs with sliding indicator and arrow-key support
function placeInd(list){var ind=list.querySelector('.tab-ind'),on=list.querySelector('.tab.on');if(!ind||!on)return;
ind.style.width=on.offsetWidth+'px';ind.style.height=on.offsetHeight+'px';ind.style.transform='translate('+on.offsetLeft+'px,'+on.offsetTop+'px)'}
function selectTab(b,focus){var g=b.dataset.g,t=b.dataset.t,list=b.parentNode;
$('.tab[data-g="'+g+'"]').forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1});
$('.panel[data-g="'+g+'"]').forEach(function(p){var show=p.dataset.t===t;if(show&&p.hidden){p.hidden=false;p.classList.remove('swap');void p.offsetWidth;p.classList.add('swap');watchBars(p)}else if(!show){p.hidden=true}});
placeInd(list);if(focus)b.focus();
if(list.scrollWidth>list.clientWidth){var l=b.offsetLeft-24;list.scrollTo({left:l,behavior:rm()?'auto':'smooth'})}
if(g==='p1'){var s=d.getElementById('cp');if(s&&s.querySelector('option[value="'+t+'"]')&&s.value!==t){s.value=t;calc()}}}
$('.tabs').forEach(function(list){var tabs=$('.tab',list);
tabs.forEach(function(b,i){b.addEventListener('click',function(){selectTab(b)});
b.addEventListener('keydown',function(e){var k=e.key,j=-1;if(k==='ArrowRight')j=(i+1)%tabs.length;else if(k==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;else if(k==='Home')j=0;else if(k==='End')j=tabs.length-1;if(j>-1){e.preventDefault();selectTab(tabs[j],true)}})});
placeInd(list)});
var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){$('.tabs').forEach(placeInd);spy()},120)});
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){$('.tabs').forEach(placeInd)});

// accordion: one open at a time, scroll opened header into view
$('.acch').forEach(function(h){h.addEventListener('click',function(){var a=h.closest('.acc'),o=!a.classList.contains('open');
$('.acc').forEach(function(x){x.classList.remove('open');x.querySelector('.acch').setAttribute('aria-expanded','false')});
if(o){a.classList.add('open');h.setAttribute('aria-expanded','true');
setTimeout(function(){var r=a.getBoundingClientRect(),top=navH()+16;if(r.top<top||r.top>innerHeight*.55){scrollTo({top:scrollY+r.top-top,behavior:rm()?'auto':'smooth'})}},rm()?0:520)}})});

// checklist with progress bar
var boxes=$('.cgrid input'),cc=d.getElementById('cc'),cbar=d.getElementById('cbar'),chk=d.querySelector('.check');
function upd(){var n=boxes.filter(function(x){return x.checked}).length;cc.textContent=n===6?'All 6 ready. Good to go live.':n+' of 6 ready';if(cbar)cbar.style.transform='scaleX('+n/6+')';if(chk)chk.classList.toggle('done',n===6)}
boxes.forEach(function(b){b.addEventListener('change',upd)});upd();

// calculator with tweened output
var cp=d.getElementById('cp'),cs=d.getElementById('cs'),co=d.getElementById('co'),cm=d.getElementById('cm'),cn=d.getElementById('cn'),clab=d.getElementById('clab'),out=d.getElementById('out'),shown=null,raf=0;
function tween(to){cancelAnimationFrame(raf);if(shown===null||rm()){shown=to;co.textContent='£'+to;return}
var from=shown,t0=performance.now(),dur=420;(function step(t){var k=Math.min((t-t0)/dur,1),e=1-Math.pow(1-k,3),v=Math.round(from+(to-from)*e);co.textContent='£'+v;shown=v;if(k<1)raf=requestAnimationFrame(step)})(t0)}
function calc(){var p=cp.value,n=+cs.value,cost,txt,lab;
if(p==='hh'){cost=600/n;lab='Activations from one episode: <b id="cv">'+n+'</b>';txt=cost>50?'Above the £50 benchmark. The fixed fee only pays off from 12 activations, so negotiate a lower or hybrid fee.':'At or below the £50 benchmark. The fixed fee works at this volume.'}
else if(p==='ba'){cost=40;lab='Activations (price is fixed): <b id="cv">'+n+'</b>';txt='£40 flat, only paid on validated activations. Below the £50 benchmark whatever the volume.'}
else if(p==='st'){cost=45;lab='Activations (price is fixed): <b id="cv">'+n+'</b>';txt='£45 flat, just under the £50 benchmark. Paid on activations only.'}
else{var r=n/4;cost=3/(r/100);lab='Click to activation rate: <b id="cv">'+r.toFixed(1)+'%</b>';txt=cost>50?'Paying £3 per click gets expensive fast. It only breaks even at about 6%, and brand bidding adds few new customers.':'Looks cheap on paper, but most of these customers already searched for SumUp.'}
clab.innerHTML=lab;tween(Math.round(cost));cn.textContent=txt;
var over=cost>50;out.classList.toggle('over',over);out.classList.toggle('under',!over);
cm.style.width=Math.min(cost/100,1)*100+'%';cm.style.background=over?'#F59AF5':'#6AA6F8'}
cp.addEventListener('change',calc);cs.addEventListener('input',calc);calc();

// reveal with stagger
var groups=['.crits','.rc','.rules','.stripe','.cols3.q3','.cgrid','.nums','.verdict'];
var single=$('.shead,.body:not(.shead .body),.note,.tabs,.calc,.accs,.ask,.check,.costbox,.riskbar,.secimg,.pimg');
var t=single.slice();
groups.forEach(function(g){$(g).forEach(function(el){Array.prototype.slice.call(el.children).forEach(function(c,i){c.style.setProperty('--d',(i*0.08)+'s');t.push(c)})})});
t.forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in2');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -6% 0px'});
t.forEach(function(e){io.observe(e)});

// count-up numbers
function countUp(el){var to=+el.dataset.count,pre=el.dataset.pre||'';if(rm()){el.textContent=pre+to;return}
var t0=performance.now(),dur=to>9?1100:700;el.textContent=pre+'0';(function step(t){var k=Math.min((t-t0)/dur,1),e=1-Math.pow(1-k,3);el.textContent=pre+Math.round(to*e);if(k<1)requestAnimationFrame(step)})(t0)}
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){countUp(e.target);cio.unobserve(e.target)}})},{threshold:.6});
$('[data-count]').forEach(function(el){cio.observe(el)});

// bars and steps draw in when visible
var gio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('go');gio.unobserve(e.target)}})},{threshold:.35});
function watchBars(r){$('.bars',r).forEach(function(b){if(!b.classList.contains('go'))gio.observe(b)})}
watchBars(d);$('.steps').forEach(function(s){gio.observe(s)});

// scrollspy: nav underline, mobile part label, side dots, progress bar, back to top, hero parallax
var links=$('.nav nav a[href^="#p"]'),secs=links.map(function(a){return d.querySelector(a.getAttribute('href'))}),ind=d.querySelector('.nav-ind'),dots=$('.dots a'),dotsWrap=d.querySelector('.dots'),np=d.querySelector('.nav-part'),npn=d.getElementById('npn'),bar=d.getElementById('prog'),top=d.querySelector('.totop'),hero=d.querySelector('.hero'),hp=d.querySelector('.herophoto img'),cur=-2,tk=false;
function spy(){var c=-1;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<innerHeight*.42)c=i});
if(c!==cur){cur=c;links.forEach(function(a,i){a.classList.toggle('on',i===c);if(i===c)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});dots.forEach(function(a,i){a.classList.toggle('on',i===c)});if(npn&&c>-1)npn.textContent=c+1;if(np)np.classList.toggle('show',c>-1)}
if(ind){var a=links[c];if(a&&getComputedStyle(ind).display!=='none'){ind.style.opacity=1;ind.style.width=a.offsetWidth+'px';ind.style.transform='translateX('+a.offsetLeft+'px)'}else ind.style.opacity=0}}
function on(){var h=de.scrollHeight-innerHeight,y=scrollY;bar.style.transform='scaleX('+(h>0?y/h:0)+')';spy();
var past=hero?y>hero.offsetHeight*.7:y>400;if(dotsWrap)dotsWrap.classList.toggle('show',past);if(top)top.classList.toggle('show',y>innerHeight*1.2);
if(hp&&!rm()&&y<innerHeight*1.5){hp.style.transform='translateY('+(-Math.min(y*0.06,hp.offsetHeight*0.085))+'px)'}tk=false}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(on)}},{passive:true});on();
if(top)top.addEventListener('click',function(){scrollTo({top:0,behavior:rm()?'auto':'smooth'});var b=d.querySelector('.brand');if(b)b.focus({preventScroll:true})});

// mobile menu
var mb=d.querySelector('.menu-btn');
function closeMenu(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}
if(mb){mb.addEventListener('click',function(){var o=!nav.classList.contains('open');nav.classList.toggle('open',o);mb.setAttribute('aria-expanded',o?'true':'false');if(o){var f=d.querySelector('#menu a');if(f)f.focus()}});
$('#menu a').forEach(function(a){a.addEventListener('click',closeMenu)});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();mb.focus()}});
d.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target))closeMenu()})}
})();
