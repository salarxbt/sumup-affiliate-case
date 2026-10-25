(function(){
var d=document,de=d.documentElement;de.classList.add('js');
function $(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))}
var bar=d.createElement('div');bar.id='prog';d.body.appendChild(bar);
$('.kick,h2,.intro,.banner,.card,.reject,.timeline,.orow,.ask,.check,.qs,.cost,.rules,.risk,.rc').forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
$('.rv').forEach(function(e){io.observe(e)});
setTimeout(function(){$('.rv:not(.in)').forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')})},1200);
var links=$('nav a[href^="#"]:not(.btn)'),secs=links.map(function(a){return d.querySelector(a.getAttribute('href'))}),t=false;
function on(){var h=de.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%';
var c=-1;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<innerHeight*.4)c=i});
links.forEach(function(a,i){a.classList.toggle('on',i===c)});t=false}
addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(on)}},{passive:true});on();
})();
