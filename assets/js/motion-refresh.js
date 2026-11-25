/* Progressive service catalogue and restrained, one-time text reveals. */
(() => {
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),desktop=matchMedia('(min-width: 901px)');
 const animate=(el,delay=0)=>{if(!reduce.matches)el.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,delay,easing:'cubic-bezier(0.23,1,0.32,1)',fill:'backwards'});};
 const grid=document.querySelector('.service-details-grid');
 if(grid){
  const cards=[...grid.children],nav=document.createElement('div');nav.className='service-catalog-nav';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Направления услуг');nav.setAttribute('aria-orientation','vertical');
  const shell=document.createElement('div');shell.className='service-catalog';grid.before(shell);shell.append(nav,grid);let active=0;
  const buttons=cards.map((card,i)=>{const b=document.createElement('button');b.type='button';b.textContent=card.querySelector('h3').textContent;b.id='catalog-tab-'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls',card.id);b.addEventListener('click',()=>select(i,true));nav.append(b);return b;});
  function select(i,motion){active=i;buttons.forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1;});cards.forEach((c,j)=>{c.hidden=desktop.matches&&i!==j;const d=c.querySelector('details');if(desktop.matches){d.open=true;c.setAttribute('role','tabpanel');c.setAttribute('aria-labelledby',buttons[j].id);}else{c.removeAttribute('role');c.removeAttribute('aria-labelledby');d.open=i===j;}});if(motion)animate(cards[i]);}
  nav.addEventListener('keydown',e=>{let i=active;if(e.key==='ArrowDown')i=(i+1)%cards.length;else if(e.key==='ArrowUp')i=(i+cards.length-1)%cards.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=cards.length-1;else return;e.preventDefault();select(i,false);buttons[i].focus();});
  const hash=()=>{const i=cards.findIndex(c=>'#'+c.id===location.hash);if(i>=0)select(i,true);};desktop.addEventListener('change',()=>select(active,false));addEventListener('hashchange',hash);select(0,false);hash();
  cards.forEach(c=>c.querySelector('details').addEventListener('toggle',()=>{if(!desktop.matches&&c.querySelector('details').open)animate(c.querySelector('ul'));}));
 }
 if(!reduce.matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;observer.unobserve(target);if(target.matches('h1,.section-head h2')){
   const text=target.textContent;target.setAttribute('aria-label',text);target.textContent='';let n=0;
   text.split(/(\s+)/).forEach(word=>{if(/^\s+$/.test(word)){target.append(document.createTextNode(word));return;}const group=document.createElement('span');group.className='reveal-word';group.setAttribute('aria-hidden','true');for(const letter of word){const ch=document.createElement('span');ch.textContent=letter;group.append(ch);animate(ch,Math.min(n++*12,600));}target.append(group);});
  }else animate(target);}),{threshold:.12});
  document.querySelectorAll('h1,.section-head h2,.intro-visual,.founder-photo,.tl-step,.credential-list').forEach(el=>observer.observe(el));
 }
})();
