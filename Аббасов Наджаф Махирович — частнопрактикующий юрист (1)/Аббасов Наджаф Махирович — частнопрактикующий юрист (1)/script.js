/* ============================================
   АББАСОВ НАДЖАФ МАХИРОВИЧ — ЧАСТНАЯ ПРАКТИКА
   Frontend interactions
   ============================================ */

(function () {
  'use strict';

  // === Год в футере ===
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === Шапка: класс при скролле ===
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // === Бургер-меню ===
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.classList.toggle('active');
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Закрытие при клике по ссылке
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // === Маска телефона (мягкая) ===
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.startsWith('8')) value = '7' + value.slice(1);
      if (!value.startsWith('7') && value.length > 0) value = '7' + value;
      value = value.slice(0, 11);

      let formatted = '';
      if (value.length > 0) formatted = '+7';
      if (value.length > 1) formatted += ' ' + value.slice(1, 4);
      if (value.length >= 5) formatted += ' ' + value.slice(4, 7);
      if (value.length >= 8) formatted += '-' + value.slice(7, 9);
      if (value.length >= 10) formatted += '-' + value.slice(9, 11);

      e.target.value = formatted;
    });
  }

  // === Форма заявки ===
  const form = document.getElementById('leadForm');
  const submitBtn = form ? form.querySelector('.btn-submit') : null;
  const successBox = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Валидация
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
      const consent = form.consent.checked;

      if (!name || phone.length < 10 || !message || !consent) {
        if (!consent) {
          alert('Подтвердите согласие на обработку персональных данных.');
        } else {
          alert('Пожалуйста, заполните все поля.');
        }
        return;
      }

      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      // ============================================================
      // МЕСТО ДЛЯ ИНТЕГРАЦИИ С BACKEND
      // ============================================================
      // Здесь нужно подключить отправку заявки. Варианты:
      //
      // 1. Telegram Bot API (самый быстрый способ):
      //    const TG_BOT_TOKEN = 'ВАШ_ТОКЕН';
      //    const TG_CHAT_ID  = 'ВАШ_CHAT_ID';
      //    const text = `Новая заявка с сайта\n\nИмя: ${name}\nТелефон: ${phone}\nВопрос: ${message}`;
      //    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      //      method: 'POST',
      //      headers: { 'Content-Type': 'application/json' },
      //      body: JSON.stringify({ chat_id: TG_CHAT_ID, text })
      //    });
      //
      // 2. Email через Formspree / FormSubmit / SendPulse:
      //    await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //      method: 'POST',
      //      headers: { 'Accept': 'application/json' },
      //      body: new FormData(form)
      //    });
      //
      // 3. CRM (Bitrix24, amoCRM): через webhook вашего CRM.
      //
      // Сейчас реализована демо-имитация отправки.
      // ============================================================

      try {
        await new Promise((r) => setTimeout(r, 800));

        form.style.display = 'none';
        if (successBox) successBox.classList.add('is-visible');
      } catch (err) {
        alert('Произошла ошибка. Свяжитесь, пожалуйста, по телефону или в Telegram.');
      } finally {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      }
    });
  }

  // === Плавное появление при скролле ===
  if ('IntersectionObserver' in window) {
    document.body.classList.add('js-enabled');

    const revealEls = document.querySelectorAll(
      '.section-head, .audience-card, .service-card, .package-card, .process-step, .trust-card, .faq-item, .contact-info, .contact-form, .photo-frame, .hero-content > *'
    );

    revealEls.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // === FAQ: одновременно одна открытая ===
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

})();
