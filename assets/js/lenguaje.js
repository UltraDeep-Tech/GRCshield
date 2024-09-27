// Function to fetch and apply the Spanish language JSON
function loadSpanish() {
  fetch('es.json')
    .then(response => response.json())
    .then(data => applyTranslations(data))
    .catch(error => console.error('Error loading Spanish language:', error));
}

// Function to apply translations to the HTML elements
function applyTranslations(translations) {
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    element.textContent = translations[key];
  });
}

// Function to reset to English (default language)
function resetToEnglish() {
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    element.textContent = defaultTexts[key]; // Restore original text from default
  });
}

// Store default English texts before translation
const defaultTexts = {};
document.querySelectorAll("[data-translate]").forEach(element => {
  const key = element.getAttribute("data-translate");
  defaultTexts[key] = element.textContent; // Save the original English text
});

// Detect language or use saved language preference
let savedLang = localStorage.getItem('selectedLanguage') || navigator.language || navigator.userLanguage;
const languageSwitcher = document.getElementById('languageSwitcher');

// Load the correct language based on saved preference or user's default language
if (savedLang.startsWith('es')) {
  languageSwitcher.value = 'es'; // Set the dropdown to Spanish
  loadSpanish(); // Load Spanish translations if saved language or user's language is Spanish
} else {
  languageSwitcher.value = 'en'; // Set the dropdown to English
  resetToEnglish(); // Default to English
}

// Function to allow user to manually switch languages and save the preference
languageSwitcher.addEventListener('change', function () {
  if (this.value === 'es') {
    loadSpanish(); // Load Spanish translations
    localStorage.setItem('selectedLanguage', 'es'); // Save the language preference
  } else {
    resetToEnglish(); // Reset to default English
    localStorage.setItem('selectedLanguage', 'en'); // Save the language preference
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const languageFlags = document.querySelectorAll('.language-flag');

  languageFlags.forEach(flag => {
    flag.addEventListener('click', function() {
      const selectedLanguage = this.getAttribute('data-lang');
      if (selectedLanguage === 'es') {
        loadSpanish(); // Cargar el archivo de español
      } else {
        resetToEnglish(); // Volver al inglés
      }

      // Guarda la selección de idioma en localStorage
      localStorage.setItem('selectedLanguage', selectedLanguage);
    });
  });

  // Cargar el idioma previamente seleccionado desde localStorage
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage === 'es') {
    loadSpanish();
  } else {
    resetToEnglish();
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const languageFlags = document.querySelectorAll('.language-flag2');

  languageFlags.forEach(flag => {
    flag.addEventListener('click', function() {
      const selectedLanguage = this.getAttribute('data-lang');
      if (selectedLanguage === 'es') {
        loadSpanish(); // Cargar el archivo de español
      } else {
        resetToEnglish(); // Volver al inglés
      }

      // Guarda la selección de idioma en localStorage
      localStorage.setItem('selectedLanguage', selectedLanguage);
    });
  });

  // Cargar el idioma previamente seleccionado desde localStorage
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage === 'es') {
    loadSpanish();
  } else {
    resetToEnglish();
  }
});


