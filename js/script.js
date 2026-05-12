// Translation Data
const translations = {
  uk: {
    nav: {
      about: 'Про мене',
      portfolio: 'Портфоліо',
      contact: 'Контакти'
    },
    about: {
      title: 'Про',
      me: 'мене',
      text: 'Мене звати Василевський Дмитро — я викладач ІКТ, вебдизайнер та автор цифрових освітніх матеріалів. Створюю сучасні сайти, презентації, технічні інфографіки та візуальний контент, поєднуючи стильний дизайн, зручність і зрозумілу подачу інформації. Працюю з HTML та CSS, розробляю адаптивні вебсайти й оформлюю навчальні та творчі проєкти для освіти та онлайн-середовища. Особливу увагу приділяю мінімалістичному дизайну, деталям і візуальній естетиці. У своїх роботах прагну створювати не просто гарний вигляд, а проєкти, які ефективно працюють, привертають увагу та залишають хороше враження.',
      button: 'Контакти'
    },
    portfolio: {
      my: 'Мої',
      title: 'Проекти',
      filter1: 'Веб розробка',
      filter2: 'Веб дизайн',
      filter3: 'Освіта',
      project1: { title: 'Проект 1', desc: 'Цільова сторінка (HTML/CSS/JS)' },
      project2: { title: 'Проект 2', desc: 'Веб-портфоліо' },
      project3: { title: 'Проект 3', desc: 'Мобільний UI набір' },
      project4: { title: 'Проект 4', desc: 'E-commerce SPA' },
      project5: { title: 'Проект 5', desc: 'Бізнес-сайт' },
      project6: { title: 'Проект 6', desc: 'Творча концепція' },
      project7: { title: 'Навчальний проект 1', desc: 'Платформа навчання' },
      project8: { title: 'Навчальний проект 2', desc: 'Навчальна панель' },
      project9: { title: 'Навчальний проект 3', desc: 'Конструктор сертифікатів' }
    },
    footer: {
      contacts: 'Контакти',
      social: 'Я в соціальних мережах',
      copyright: '© 2025 DiWasilewskii. Усі права захищені.'
    },
    modal: {
      title: 'Зв\'язатися зі мною',
      subtitle: 'Оберіть зручний спосіб, я відповім максимально швидко.',
      telegram: 'Telegram',
      instagram: 'Instagram'
    },
    contactFab: 'Відкрити контакти',
    contactClose: 'Закрити вікно'
  },
  en: {
    nav: {
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Contacts'
    },
    about: {
      title: 'About',
      me: 'Me',
      text: 'My name is Dima Wasilewski and I am an ICT teacher, web designer, and creator of digital educational materials. I create modern websites, presentations, technical infographics, and visual content, combining stylish design, usability, and clear information delivery.\n\nI work with HTML, CSS, and JavaScript, develop responsive websites, and design educational and creative projects for digital and online environments. I pay special attention to minimalist design, details, and visual aesthetics.\n\nIn my work, I strive to create not just visually appealing projects, but solutions that work effectively, attract attention, and leave a strong impression.',
      button: 'Contacts'
    },
    portfolio: {
      my: 'My',
      title: 'Portfolio',
      filter1: 'Web developing',
      filter2: 'Web design',
      filter3: 'Education',
      project1: { title: 'Project 1', desc: 'Landing Page (HTML/CSS/JS)' },
      project2: { title: 'Project 2', desc: 'Portfolio Website' },
      project3: { title: 'Project 3', desc: 'Mobile App UI Kit' },
      project4: { title: 'Project 4', desc: 'E‑commerce SPA' },
      project5: { title: 'Project 5', desc: 'Business Website' },
      project6: { title: 'Project 6', desc: 'Creative Concept' },
      project7: { title: 'Course Project 1', desc: 'Education Platform' },
      project8: { title: 'Course Project 2', desc: 'Learning Dashboard' },
      project9: { title: 'Course Project 3', desc: 'Certificate Builder' }
    },
    footer: {
      contacts: 'Contacts',
      social: 'I\'m in Social',
      copyright: '© 2025 DiWasilewskii. All rights reserved.'
    },
    modal: {
      title: 'Contact Me',
      subtitle: 'Choose a convenient way to contact me, I will respond as quickly as possible.',
      telegram: 'Telegram',
      instagram: 'Instagram'
    },
    contactFab: 'Open contacts',
    contactClose: 'Close window'
  }
};

// Language Toggle Functionality
(function() {
  const langToggle = document.getElementById('langToggle');
  const langText = document.getElementById('langText');
  const LANG_KEY = 'site-language';
  
  // Get saved language or default to Ukrainian
  let currentLang = localStorage.getItem(LANG_KEY) || 'uk';
  
  // Set initial HTML lang attribute and text
  updateLanguage(currentLang);
  
  // Language toggle button click handler
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'uk' ? 'en' : 'uk';
      localStorage.setItem(LANG_KEY, currentLang);
      updateLanguage(currentLang);
    });
  }
  
  function updateLanguage(lang) {
    document.documentElement.lang = lang;
    langText.textContent = lang === 'uk' ? 'EN' : 'UA';
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = getNestedTranslation(key, lang);
      if (text) {
        element.textContent = text;
      }
    });
    
    // Update aria-label attributes
    document.querySelectorAll('[data-aria-label-key]').forEach(element => {
      const key = element.getAttribute('data-aria-label-key');
      const text = translations[lang][key];
      if (text) {
        element.setAttribute('aria-label', text);
      }
    });
  }
  
  function getNestedTranslation(path, lang) {
    const keys = path.split('.');
    let value = translations[lang];
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    
    return typeof value === 'string' ? value : null;
  }
})();

// Theme Toggle Functionality
(function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  const THEME_KEY = 'site-theme';

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  
  // Apply saved theme on page load
  if (savedTheme === 'light') {
    htmlElement.classList.add('light-theme');
  }

  // Theme toggle button click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = htmlElement.classList.toggle('light-theme');
      const newTheme = isLight ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, newTheme);
    });
  }
})();

// Анімація появи при скролі
window.addEventListener("scroll", function() {
  const about = document.querySelector(".about-content");
  const position = about.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;

  if (position < screenPos) {
    about.classList.add("visible");
  }
});

// Ініціалізація AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true
});

// Контактне модальне вікно
(function() {
  const fab = document.getElementById("contactFab");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("contactClose");

  if (!fab || !modal || !closeBtn) return;

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  fab.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();