document.addEventListener('DOMContentLoaded', () => {
  initDownloadSetupSliders();
  initPopups();
  initFAQ();
});

function initDownloadSetupSliders() {
  document.querySelectorAll('.mobileapp-instructions .mokup-slider').forEach(slider => {
    const wrapper = slider.querySelector('.mokup-wrapper');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    if (!wrapper || !prevBtn || !nextBtn) return;

    const items = Array.from(wrapper.children);
    if (items.length === 0) return;

    // ширина карточки + margin
    const style       = getComputedStyle(items[0]);
    const marginRight = parseFloat(style.marginRight) || 0;
    const step        = items[0].getBoundingClientRect().width + marginRight;

    prevBtn.addEventListener('click', () => {
      const atStart = wrapper.scrollLeft <= 0;
      wrapper.scrollTo({
        left: atStart
          ? wrapper.scrollWidth - wrapper.clientWidth
          : wrapper.scrollLeft - step,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      const atEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 1;
      wrapper.scrollTo({
        left: atEnd ? 0 : wrapper.scrollLeft + step,
        behavior: 'smooth'
      });
    });
  });
}

function initPopups() {
  const overlay   = document.getElementById('popup-overlay');
  const openBtns  = document.querySelectorAll('[data-popup-open]');
  const closeBtns = document.querySelectorAll('[data-popup-close]');
  if (!overlay) return;

  const closeAll = () => {
    overlay.classList.remove('open');
    document.querySelectorAll('.popup.open')
            .forEach(p => p.classList.remove('open'));
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(btn.dataset.popupOpen);
      if (target) {
        overlay.classList.add('open');
        target.classList.add('open');
      }
    });
  });

  // клик по оверлею
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeAll();
  });

  // все кнопки закрытия внутри .popup
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAll);
  });
}

function initFAQ() {
  // делегируем клик на секцию
  const faqSection = document.querySelector('.faq-section');
  if (!faqSection) return;

  faqSection.addEventListener('click', e => {
    const q = e.target.closest('.faq-question');
    if (!q) return;

    const item    = q.closest('.faq-item');
    const isActive = item.classList.contains('active-state');

    // закрываем все
    faqSection.querySelectorAll('.faq-item')
              .forEach(i => i.classList.remove('active-state'));

    // открываем только текущий, если он был закрыт
    if (!isActive) {
      item.classList.add('active-state');
    }
  });
}
