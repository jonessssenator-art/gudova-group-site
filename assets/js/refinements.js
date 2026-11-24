/* Accessible web adaptation of Astra's accordion interaction; native details keep content available without JavaScript. */
(() => {
  const mobile = matchMedia('(max-width:760px)');
  const groups = ['.service-detail details', '.phase-disclosure'];
  const initializeDisclosure = () => groups.forEach(selector => {
    document.querySelectorAll(selector).forEach((item, i) => { item.open = !mobile.matches || (selector.includes("service") && i === 0); });
  });
  initializeDisclosure();
  mobile.addEventListener('change', initializeDisclosure);
  const revealAnchor = () => {
    const id = location.hash.slice(1), target = document.getElementById(id);
    if (!target) return;
    const details = target.matches('details') ? target : target.querySelector('details');
    if (details) details.open = true;
  };
  addEventListener('hashchange', revealAnchor); revealAnchor();
  document.querySelectorAll('a[href^="#service-"]').forEach(a => a.addEventListener('click', () => {
    const details = document.querySelector(a.getAttribute('href') + ' details'); if (details) details.open = true;
  }));
  document.querySelectorAll('.field-group[data-field]').forEach(group => {
    const field = group.querySelector('input,textarea,select,.option-grid'), error = group.querySelector('.field-error');
    if (!field || !error) return;
    error.id = 'error-' + group.dataset.field;
    error.setAttribute('aria-live', 'polite'); field.setAttribute('aria-describedby', error.id);
  });
  const formCard = document.querySelector('.form-card');
  if (formCard && 'IntersectionObserver' in window) new IntersectionObserver(entries => {
    document.body.classList.toggle('form-in-view', entries[0].isIntersecting);
  }, {threshold:0, rootMargin:'0px 0px -80px 0px'}).observe(formCard);
  const status = document.createElement('p'); status.className='form-step-status';status.setAttribute('aria-live','polite');
  const progress = document.querySelector('.form-progress');progress.after(status);
  const updateStatus = () => {const step=document.querySelector('.form-step.is-active h3');status.textContent=step ? step.textContent : 'Сообщение подготовлено';};
  new MutationObserver(updateStatus).observe(document.querySelector('#contact-form'),{subtree:true,attributes:true,attributeFilter:['class']});updateStatus();
})();
