document.addEventListener('DOMContentLoaded', function () {
  // Definir traducciones para los departamentos
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

  const departmentSelect = document.getElementById('department-select');
  const userDepartmentDiv = document.getElementById('user-department');

  function updateDepartmentUI() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    const currentDepartment = localStorage.getItem('currentDepartment');
    const authorizedDepartments = JSON.parse(localStorage.getItem('authorizedDepartments')) || [];

    // Limpiar opciones existentes
    departmentSelect.innerHTML = '';

    // Llenar el menú desplegable solo con los departamentos autorizados
    authorizedDepartments.forEach(dep => {
      const option = document.createElement('option');
      option.value = dep;
      option.textContent = departmentTranslations[currentLang][dep];
      departmentSelect.appendChild(option);
    });

    // Establecer el departamento seleccionado
    if (currentDepartment && authorizedDepartments.includes(currentDepartment)) {
      userDepartmentDiv.textContent = `${currentLang === 'es' ? 'Departamento Actual' : 'Current Department'}: ${departmentTranslations[currentLang][currentDepartment]}`;
      departmentSelect.value = currentDepartment;
    } else if (authorizedDepartments.length > 0) {
      const firstDepartment = authorizedDepartments[0];
      localStorage.setItem('currentDepartment', firstDepartment);
      userDepartmentDiv.textContent = `${currentLang === 'es' ? 'Departamento Actual' : 'Current Department'}: ${departmentTranslations[currentLang][firstDepartment]}`;
      departmentSelect.value = firstDepartment;
    }
  }

  // Manejar cambios de departamento
  departmentSelect.addEventListener('change', function () {
    const selectedDepartment = this.value;
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    const authorizedDepartments = JSON.parse(localStorage.getItem('authorizedDepartments')) || [];

    if (authorizedDepartments.includes(selectedDepartment)) {
      localStorage.setItem('currentDepartment', selectedDepartment);
      userDepartmentDiv.textContent = `${currentLang === 'es' ? 'Departamento Actual' : 'Current Department'}: ${departmentTranslations[currentLang][selectedDepartment]}`;
      // Recargar los datos para el nuevo departamento
      location.reload();
    } else {
      console.error('Intento de seleccionar un departamento no autorizado');
      this.value = localStorage.getItem('currentDepartment');
    }
  });

  // Función para cargar y aplicar el idioma español
  function loadSpanish() {
    fetch('es.json')
      .then(response => response.json())
      .then(data => {
        applyTranslations(data);
        updateDepartmentUI();
      })
      .catch(error => console.error('Error loading Spanish language:', error));
  }

  // Función para aplicar traducciones a los elementos HTML
  function applyTranslations(translations) {
    document.querySelectorAll("[data-translate]").forEach(element => {
      const key = element.getAttribute("data-translate");
      element.textContent = translations[key];
    });
  }

  // Función para restablecer al inglés (idioma predeterminado)
  function resetToEnglish() {
    document.querySelectorAll("[data-translate]").forEach(element => {
      const key = element.getAttribute("data-translate");
      element.textContent = defaultTexts[key];
    });
    updateDepartmentUI();
  }

  // Almacenar textos en inglés predeterminados antes de la traducción
  const defaultTexts = {};
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    defaultTexts[key] = element.textContent;
  });

  // Detectar idioma o usar preferencia de idioma guardada
  let savedLang = localStorage.getItem('selectedLanguage') || navigator.language || navigator.userLanguage;
  const languageSwitcher = document.getElementById('languageSwitcher');

  // Cargar el idioma correcto basado en la preferencia guardada o el idioma predeterminado del usuario
  if (savedLang.startsWith('es')) {
    languageSwitcher.value = 'es';
    loadSpanish();
  } else {
    languageSwitcher.value = 'en';
    resetToEnglish();
  }

  // Función para permitir al usuario cambiar manualmente los idiomas y guardar la preferencia
  languageSwitcher.addEventListener('change', function () {
    if (this.value === 'es') {
      loadSpanish();
      localStorage.setItem('selectedLanguage', 'es');
    } else {
      resetToEnglish();
      localStorage.setItem('selectedLanguage', 'en');
    }
  });

  // Manejar clics en las banderas de idioma
  const languageFlags = document.querySelectorAll('.language-flag, .language-flag2');
  languageFlags.forEach(flag => {
    flag.addEventListener('click', function() {
      const selectedLanguage = this.getAttribute('data-lang');
      if (selectedLanguage === 'es') {
        loadSpanish();
      } else {
        resetToEnglish();
      }
      localStorage.setItem('selectedLanguage', selectedLanguage);
    });
  });

  // Inicializar la interfaz de usuario
  updateDepartmentUI();
});