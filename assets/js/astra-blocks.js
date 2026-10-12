(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-roll]').forEach(el=>{
  const text=el.dataset.roll,box=document.createElement('span');box.className='roll';box.setAttribute('aria-label',text);
  const strips=[];
  [...text].forEach((ch,i)=>{
    if(!/\d/.test(ch)){const s=document.createElement('span');s.textContent=ch;s.setAttribute('aria-hidden','true');box.append(s);return}
    const d=document.createElement('span');d.className='roll-digit';d.setAttribute('aria-hidden','true');
    const strip=document.createElement('span');strip.className='roll-strip';
    for(let n=0;n<10;n++){const s=document.createElement('span');s.textContent=n;strip.append(s)}
    d.append(strip);box.append(d);strips.push([strip,+ch,i]);
  });
  el.textContent='';el.append(box);
  const go=()=>strips.forEach(([s,n,i])=>{s.style.transitionDelay=reduce?'0s':(i*0.09)+'s';s.style.transform=`translateY(${-n*1.2}em)`});
  if(reduce||!('IntersectionObserver' in window)){go();return}
  new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){go();o.disconnect()}},{threshold:.6}).observe(el);
});
})();
