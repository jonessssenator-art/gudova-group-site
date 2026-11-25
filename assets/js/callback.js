/* Web adaptation of Astra Expanding Card: https://astra-ui.com/animations/expanding-card */
(() => {
 const dialog=document.getElementById('callback-dialog'),form=dialog.querySelector('form'),phone=form.elements.phone,status=dialog.querySelector('[role=status]');let trigger;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('.header-callback').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();trigger=button;status.textContent='';dialog.showModal();document.body.classList.add('callback-open');if(!reduced.matches)dialog.animate([{opacity:0,transform:'translateY(16px) scale(.97)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:280,easing:'cubic-bezier(.23,1,.32,1)'});}));
 dialog.querySelector('.callback-close').onclick=()=>dialog.close();
 dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();});
 dialog.addEventListener('close',()=>{document.body.classList.remove('callback-open');trigger?.focus();});
 phone.addEventListener('input',()=>phone.setCustomValidity(''));
 form.addEventListener('submit',event=>{event.preventDefault();const digits=phone.value.replace(/\D/g,'');if(digits.length<10||digits.length>15){phone.setCustomValidity('Введите номер телефона с кодом страны.');phone.reportValidity();return;}if(!form.reportValidity())return;const name=form.elements.name.value.trim();if(!name){form.elements.name.focus();return;}const email=form.elements.email.value.trim();const text=`Здравствуйте! Прошу перезвонить.\nИмя: ${name}\nТелефон: ${phone.value.trim()}${email?'\nПочта: '+email:''}`;const url='https://wa.me/79896650707?text='+encodeURIComponent(text);const retry=dialog.querySelector('.callback-retry');retry.href=url;retry.hidden=false;window.open(url,'_blank','noopener,noreferrer');status.textContent='Сообщение подготовлено. Отправьте его в WhatsApp, чтобы передать заявку. Если чат не открылся, нажмите ссылку ниже.';});
})();
