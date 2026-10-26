(function(){
var d=document,de=d.documentElement;de.classList.add('js');
function $(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))}
// tabs
$('.tab').forEach(function(b){b.addEventListener('click',function(){var g=b.dataset.g,t=b.dataset.t;
$('.tab[data-g="'+g+'"]').forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-selected',on)});
$('.panel[data-g="'+g+'"]').forEach(function(p){p.hidden=p.dataset.t!==t});
if(g==='p1'){var s=d.getElementById('cp');if(s&&s.querySelector('option[value="'+t+'"]')){s.value=t;calc()}}})});
// accordion
$('.acch').forEach(function(h){h.addEventListener('click',function(){var a=h.parentNode,o=!a.classList.contains('open');
$('.acc').forEach(function(x){x.classList.remove('open');x.querySelector('.acch').setAttribute('aria-expanded','false')});
if(o){a.classList.add('open');h.setAttribute('aria-expanded','true')}})});
// checklist
var boxes=$('.cgrid input'),cc=d.getElementById('cc');
boxes.forEach(function(b){b.addEventListener('change',function(){var n=boxes.filter(function(x){return x.checked}).length;cc.textContent=n===6?'All 6 ready. Good to go live.':n+' of 6 ready'})});
// calculator
var cp=d.getElementById('cp'),cs=d.getElementById('cs'),co=d.getElementById('co'),cm=d.getElementById('cm'),cn=d.getElementById('cn'),clab=d.getElementById('clab');
function calc(){var p=cp.value,n=+cs.value,cost,txt,lab;
if(p==='hh'){cost=600/n;lab='Activations from one episode: <b id="cv">'+n+'</b>';txt=cost>50?'Above the £50 benchmark. The fixed fee only pays off from 12 activations, so negotiate a lower or hybrid fee.':'At or below the £50 benchmark. The fixed fee works at this volume.'}
else if(p==='ba'){cost=40;lab='Activations (price is fixed): <b id="cv">'+n+'</b>';txt='£40 flat, only paid on validated activations. Below the £50 benchmark whatever the volume.'}
else if(p==='st'){cost=45;lab='Activations (price is fixed): <b id="cv">'+n+'</b>';txt='£45 flat, just under the £50 benchmark. Paid on activations only.'}
else{var r=n/4;cost=3/(r/100);lab='Click to activation rate: <b id="cv">'+r.toFixed(1)+'%</b>';txt=cost>50?'Paying £3 per click gets expensive fast. It only breaks even at about 6%, and brand bidding adds few new customers.':'Looks cheap on paper, but most of these customers already searched for SumUp.'}
clab.innerHTML=lab;co.textContent='£'+Math.round(cost);cn.textContent=txt;
var w=Math.min(cost/100,1)*100;cm.style.width=w+'%';cm.style.background=cost>50?'#F59AF5':'#6AA6F8'}
cp.addEventListener('change',calc);cs.addEventListener('input',calc);calc();
// reveal
var t=$('.sec .kick,.sec h2,.body,.note,.verdict,.tabs,.panel,.calc,.steps,.accs,.ask,.check,.costbox,.rules,.riskbar,.rc,.stripe');
t.forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in2');io.unobserve(e.target)}})},{threshold:.06});
t.forEach(function(e){io.observe(e)});
setTimeout(function(){t.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in2')})},1000);
// nav state + progress
var links=$('.nav nav a'),secs=links.map(function(a){return d.querySelector(a.getAttribute('href'))}),bar=d.getElementById('prog'),tk=false;
function on(){var h=de.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%';var c=-1;secs.forEach(function(s,i){if(s.getBoundingClientRect().top<innerHeight*.4)c=i});links.forEach(function(a,i){a.classList.toggle('on',i===c)});tk=false}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(on)}},{passive:true});on();
})();
