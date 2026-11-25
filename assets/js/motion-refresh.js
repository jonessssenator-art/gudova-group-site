/* Progressive service catalogue and restrained, one-time text reveals. */
(() => {
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),desktop=matchMedia('(min-width: 901px)');
 const animate=(el,delay=0)=>{if(!reduce.matches)el.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,delay,easing:'cubic-bezier(0.23,1,0.32,1)',fill:'backwards'});};
 document.querySelectorAll('.service-detail details').forEach(details=>{
  details.open = '#'+details.closest('article').id===location.hash;
  const summary=details.querySelector('summary');let animation=null,expanded=details.open;
  summary.addEventListener('click',event=>{
   event.preventDefault();const from=details.getBoundingClientRect().height;
   if(animation){animation.cancel();animation=null;}
   expanded=!expanded;
   if(reduce.matches){details.open=expanded;details.style.height='';details.style.overflow='';return;}
   details.style.height='';details.open=true;
   const to=expanded?details.getBoundingClientRect().height:summary.getBoundingClientRect().height;
   details.style.overflow='hidden';
   animation=details.animate({height:[from+'px',to+'px']},{duration:260,easing:'cubic-bezier(0.23,1,0.32,1)'});
   animation.onfinish=()=>{details.open=expanded;details.style.height='';details.style.overflow='';animation=null;};
  });
  details.addEventListener('toggle',()=>{if(!animation)expanded=details.open;});
 });
 if(!reduce.matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;observer.unobserve(target);if(target.matches('h1,.section-head h2')){
   const text=target.textContent;target.setAttribute('aria-label',text);target.textContent='';let n=0;
   text.split(/(\s+|(?<=-))/).forEach(word=>{if(/^\s+$/.test(word)){target.append(document.createTextNode(word));return;}const group=document.createElement('span');group.className='reveal-word';group.setAttribute('aria-hidden','true');for(const letter of word){const ch=document.createElement('span');ch.textContent=letter;group.append(ch);animate(ch,Math.min(n++*12,600));}target.append(group);});
  }else animate(target);}),{threshold:.12});
  document.querySelectorAll('h1,.section-head h2,.intro-visual,.founder-photo,.tl-step,.credential-list').forEach(el=>observer.observe(el));
 }
})();
