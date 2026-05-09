# Сайт частной юридической практики — Аббасов Наджаф Махирович

Одностраничный продающий сайт для частной юридической практики.
Чистый HTML/CSS/JS без сборщиков.

## Структура файлов
```
abbasov-law/
├── index.html        — разметка
├── styles.css        — стили
├── script.js         — интерактив (меню, форма, FAQ, анимации)
├── assets/
│   ├── portrait.jpg          — оригинал фотографии
│   ├── portrait-hero.jpg     — версия для первого экрана
│   ├── portrait-mobile.jpg   — версия для мобильных
│   └── portrait-avatar.jpg   — квадрат для блока «Обо мне»
└── README.md
```

## Локальный запуск
Любой статический сервер:
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```
Откройте: http://localhost:8080

Можно просто открыть `index.html` двойным кликом — всё будет работать кроме шрифтов с CDN (если без интернета).

## Деплой
Сайт готов к деплою на любую статическую платформу:
- **Netlify** — drag-and-drop папки `abbasov-law` в [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `vercel deploy` в папке проекта
- **GitHub Pages** — push в репозиторий + Settings → Pages → main branch

## Подключение формы заявки
Форма уже работает на фронтенде с валидацией. Для реальной отправки откройте `script.js` и в блоке «МЕСТО ДЛЯ ИНТЕГРАЦИИ С BACKEND» подключите один из вариантов:

### Вариант 1. Telegram Bot (самый быстрый)
1. Создайте бота через [@BotFather](https://t.me/BotFather) — получите `BOT_TOKEN`.
2. Напишите боту, узнайте `CHAT_ID` через [@userinfobot](https://t.me/userinfobot).
3. Раскомментируйте код Telegram в `script.js`, подставьте токен и chat_id.

### Вариант 2. Formspree / FormSubmit
Зарегистрируйтесь на [formspree.io](https://formspree.io) или [formsubmit.co](https://formsubmit.co), получите endpoint, подставьте в код.

### Вариант 3. CRM (Bitrix24, amoCRM)
Используйте webhook вашей CRM.

## Что можно заменить
- Фотография — `assets/portrait*.jpg` (важно: hero — 4:5 вертикальная, avatar — квадрат)
- Контактные данные — поиск в `index.html` по `+79177248966`, `abbasov_at`, `abbasovnadjaf`
- Цены пакетов — секция `<!-- ПАКЕТЫ -->` в `index.html`
- Текст «Обо мне» — секция `<!-- ОБО МНЕ -->`

## SEO
- title, meta description, Open Graph, Twitter Card — настроены
- JSON-LD `LegalService` — для поисковых систем
- Семантические h1–h3, lang="ru"
- Favicon — встроен как data URI

После выбора домена обновите og:url и canonical в `<head>`.
