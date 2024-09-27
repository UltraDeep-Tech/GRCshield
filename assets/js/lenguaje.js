// Function to fetch and apply the Spanish language JSON
function loadSpanish() {
  fetch('es.json')
    .then(response => response.json())
    .then(data => {
      applyTranslations(data);
      updateDepartmentsLanguage('es'); // Actualizar los departamentos
    })
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
  updateDepartmentsLanguage('en'); // Actualizar los departamentos
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

// Function to update department translations based on the selected language
function updateDepartmentsLanguage(language) {
  const departmentTranslations = {
    en: {
      'Account Manager': 'Account Manager',
      'Customer Service': 'Customer Service',
      'Sales': 'Sales',
      'Operations': 'Operations',
      'Finance': 'Finance',
      'IT Support': 'IT Support',
      'Human Resources': 'Human Resources'
    },
    es: {
      'Account Manager': 'Gerente de Cuenta',
      'Customer Service': 'Servicio al Cliente',
      'Sales': 'Ventas',
      'Operations': 'Operaciones',
      'Finance': 'Finanzas',
      'IT Support': 'Soporte TI',
      'Human Resources': 'Recursos Humanos'
    }
  };

  const currentDepartment = localStorage.getItem('currentDepartment');
  const authorizedDepartments = JSON.parse(localStorage.getItem('authorizedDepartments')) || [];
  const departmentSelect = document.getElementById('department-select');
  const userDepartmentDiv = document.getElementById('user-department');

  // Limpiar el select antes de agregar las opciones traducidas
  departmentSelect.innerHTML = '';

  // Llenar el menú desplegable solo con los departamentos autorizados traducidos
  authorizedDepartments.forEach(dep => {
    const option = document.createElement('option');
    option.value = dep;
    option.textContent = departmentTranslations[language][dep];
    departmentSelect.appendChild(option);
  });

  // Establecer el departamento seleccionado con la traducción correcta
  if (currentDepartment && authorizedDepartments.includes(currentDepartment)) {
    userDepartmentDiv.textContent = `Current Department: ${departmentTranslations[language][currentDepartment]}`;
    departmentSelect.value = currentDepartment;
  } else if (authorizedDepartments.length > 0) {
    const firstDepartment = authorizedDepartments[0];
    localStorage.setItem('currentDepartment', firstDepartment);
    userDepartmentDiv.textContent = `Current Department: ${departmentTranslations[language][firstDepartment]}`;
    departmentSelect.value = firstDepartment;
  }
}
