
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */

  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable, {
      perPageSelect: [5, 10, 15, ["All", -1]],
      columns: [{
          select: 2,
          sortSequence: ["desc", "asc"]
        },
        {
          select: 3,
          sortSequence: ["desc"]
        },
        {
          select: 4,
          cellClass: "green",
          headerClass: "red"
        }
      ]
    });
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();

document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.querySelector('.back-to-top');

  // Mostrar/ocultar el botón al hacer scroll
  window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
          backToTopButton.classList.add('active');
      } else {
          backToTopButton.classList.remove('active');
      }
  });

  // Desplazamiento suave hacia la parte superior al hacer clic
  backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const tabLinks = document.querySelectorAll('#grc-policies-nav a[data-bs-target]');

  tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const targetTab = document.querySelector(this.getAttribute('data-bs-target'));
      if (targetTab) {
        const tabTrigger = new bootstrap.Tab(targetTab);
        tabTrigger.show();
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const chatLink = document.getElementById("chat-link");
  const popupSound = document.getElementById("popup-sound");

  // Play sound on click (more reliable for browsers)
  chatLink.addEventListener("click", function() {
    popupSound.play();
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Función para guardar el estado del menú en localStorage
  function saveMenuState(menuId, isOpen) {
    if (isOpen) {
      localStorage.setItem(menuId, 'true');
    } else {
      localStorage.removeItem(menuId);
    }
  }

  // Función para cargar el estado del menú desde localStorage
  function loadMenuState(menuId) {
    return localStorage.getItem(menuId) === 'true';
  }

  // Función para guardar el ID del menú activo
  function saveActiveMenu(menuId) {
    localStorage.setItem('activeMenu', menuId);
  }

  // Función para cargar el ID del menú activo
  function loadActiveMenu() {
    return localStorage.getItem('activeMenu');
  }

  // Función para limpiar el estado del menú activo
  function clearActiveMenu() {
    localStorage.removeItem('activeMenu');
  }

  // Función para verificar si la URL actual coincide con el enlace
  function isCurrentPage(href) {
    return window.location.pathname === href || window.location.href === href;
  }

  // Obtener todos los menús desplegables
  var collapsibleMenus = document.querySelectorAll('.nav-content.collapse');

  // Cargar y aplicar el estado del menú activo
  var activeMenuId = loadActiveMenu();
  if (activeMenuId) {
    var activeMenu = document.getElementById(activeMenuId);
    if (activeMenu) {
      activeMenu.classList.add('show');
      var activeMenuToggle = document.querySelector('[data-bs-target="#' + activeMenuId + '"]');
      if (activeMenuToggle) {
        activeMenuToggle.classList.remove('collapsed');
      }
    }
  }

  // Para cada menú desplegable
  collapsibleMenus.forEach(function(menu) {
    var menuId = menu.id;
    var menuToggle = document.querySelector('[data-bs-target="#' + menuId + '"]');
    var menuText = menuToggle.querySelector('.nav-link-text');

    // Cargar el estado del menú si no es el activo
    if (menuId !== activeMenuId && loadMenuState(menuId)) {
      menu.classList.add('show');
      menuToggle.classList.remove('collapsed');
    }

    // Agregar evento para guardar el estado del menú cuando cambia
    menu.addEventListener('shown.bs.collapse', function() {
      saveMenuState(menuId, true);
    });
    menu.addEventListener('hidden.bs.collapse', function() {
      saveMenuState(menuId, false);
      if (menuId === loadActiveMenu()) {
        clearActiveMenu();
      }
    });

    // Manejar el clic en el span del texto para redirigir y marcar como activo
    menuText.addEventListener('click', function(e) {
      e.stopPropagation(); // Evitar que el evento se propague al enlace principal
      var href = this.getAttribute('data-href');
      if (href && !isCurrentPage(href)) {
        saveActiveMenu(menuId);
        window.location.href = href;
      }
    });

    // El clic en el resto del enlace principal solo abrirá/cerrará el menú
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir la redirección por defecto
      // El comportamiento de abrir/cerrar el menú es manejado por Bootstrap
    });
  });

  // Manejar los clics en los enlaces del submenú
  var submenuLinks = document.querySelectorAll('.nav-content a');
  submenuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      if (!isCurrentPage(href)) {
        var parentMenu = this.closest('.nav-content.collapse');
        if (parentMenu) {
          saveActiveMenu(parentMenu.id);
        }
        window.location.href = href;
      }
    });
  });
});

class NotificationManager {
  constructor() {
      this.baseUrl = 'https://backend-grcshield-934866038204.us-central1.run.app';
      this.bellIcon = document.querySelector('.bellnotification');
      this.badge = document.querySelector('.badge-number');
      this.notificationsList = document.querySelector('.notifications');
      this.notifications = new Map();
      this.init();
  }

  init() {
      this.setupEventListeners();
      this.loadInitialNotifications();
  }

  setupEventListeners() {
      if (this.notificationsList) {
          this.notificationsList.addEventListener('click', (e) => {
              const item = e.target.closest('.notification-item');
              if (item && item.dataset.id) {
                  this.markAsRead(item.dataset.id);
              }
          });
      }

      if (this.bellIcon) {
          this.bellIcon.closest('.nav-link').addEventListener('click', (e) => {
              this.loadInitialNotifications();
          });
      }
  }

  async loadInitialNotifications() {
      try {
          const department = localStorage.getItem('currentDepartment');
          if (!department) {
              console.warn('No department specified');
              return;
          }

          const response = await fetch(`${this.baseUrl}/api/notifications?department=${department}`);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const notifications = await response.json();
          console.log('Received notifications:', notifications); // Para debugging
          this.updateNotifications(notifications);
      } catch (error) {
          console.error('Error loading notifications:', error);
          this.showError('Error al cargar notificaciones');
      }
  }

  updateNotifications(notifications) {
      if (!Array.isArray(notifications)) {
          console.error('Received invalid notifications data:', notifications);
          return;
      }

      this.notifications.clear();
      if (!this.notificationsList) return;

      this.notificationsList.innerHTML = `
          <li class="dropdown-header">
              Tienes <span class="notification-count">0</span> notificaciones nuevas
          </li>
      `;

      const unreadNotifications = notifications.filter(n => !n.read && this.isValidNotification(n));
      
      if (unreadNotifications.length === 0) {
          this.showEmptyState();
      } else {
          unreadNotifications.forEach(notification => {
              this.notifications.set(notification.id, notification);
              this.renderNotification(notification);
          });
      }

      this.updateNotificationCount();
  }

  isValidNotification(notification) {
      return notification && 
             typeof notification === 'object' &&
             notification.id &&
             notification.message &&
             notification.type &&
             typeof notification.read === 'boolean';
  }

  renderNotification(notification) {
      if (!this.isValidNotification(notification)) {
          console.error('Invalid notification:', notification);
          return;
      }

      const li = document.createElement('li');
      li.className = 'notification-item';
      li.dataset.id = notification.id;
      
      // Usar valores por defecto si faltan propiedades
      const severity = notification.severity || 'normal';
      const type = notification.type || 'info';
      const timestamp = notification.timestamp || new Date().toISOString();
      
      li.innerHTML = `
          <div class="${this.getSeverityClass(severity)}">
              <div>
                  ${this.getIcon(type)}
                  <div>
                      <h4>${this.escapeHtml(type)}</h4>
                      <p>${this.escapeHtml(notification.message)}</p>
                      <p>${this.formatTime(timestamp)}</p>
                  </div>
              </div>
          </div>
          <hr class="dropdown-divider">
      `;

      this.notificationsList.appendChild(li);
  }

  async markAsRead(notificationId) {
      if (!notificationId) return;

      try {
          const department = localStorage.getItem('currentDepartment');
          if (!department) return;

          const response = await fetch(
              `${this.baseUrl}/api/notifications/${notificationId}/read?department=${department}`,
              { method: 'PUT' }
          );

          if (response.ok) {
              this.notifications.delete(notificationId);
              const element = document.querySelector(`[data-id="${notificationId}"]`);
              if (element) {
                  element.remove();
              }
              this.updateNotificationCount();

              if (this.notifications.size === 0) {
                  this.showEmptyState();
              }
          }
      } catch (error) {
          console.error('Error marking notification as read:', error);
      }
  }

  updateNotificationCount() {
      const count = this.notifications.size;
      
      if (this.badge) {
          this.badge.textContent = count;
          this.badge.style.display = count > 0 ? '' : 'none';
      }

      const countSpan = this.notificationsList?.querySelector('.notification-count');
      if (countSpan) {
          countSpan.textContent = count;
      }
  }

  showEmptyState() {
      const header = this.notificationsList?.querySelector('.dropdown-header');
      if (header) {
          header.nextElementSibling?.remove();
      }
      
      const emptyLi = document.createElement('li');
      emptyLi.innerHTML = `
          <div class="notification-item">
              <p class="text-center mb-0">No hay notificaciones nuevas</p>
          </div>
      `;
      this.notificationsList?.appendChild(emptyLi);
  }

  showError(message) {
      const header = this.notificationsList?.querySelector('.dropdown-header');
      if (header) {
          header.nextElementSibling?.remove();
      }
      
      const errorLi = document.createElement('li');
      errorLi.innerHTML = `
          <div class="notification-item text-danger">
              <p class="text-center mb-0">${this.escapeHtml(message)}</p>
          </div>
      `;
      this.notificationsList?.appendChild(errorLi);
  }

  getSeverityClass(severity = 'normal') {
      const classes = {
          'normal': 'notification-normal',
          'alta': 'notification-high',
          'crítica': 'notification-critical'
      };
      return classes[severity.toLowerCase()] || classes.normal;
  }

  getIcon(type = 'info') {
      const icons = {
          'alert': 'bi bi-exclamation-triangle-fill',
          'info': 'bi bi-info-circle-fill',
          'warning': 'bi bi-exclamation-circle-fill',
          'success': 'bi bi-check-circle-fill'
      };
      return `<i class="${icons[type.toLowerCase()] || icons.info}"></i>`;
  }

  formatTime(timestamp) {
      try {
          return new Date(timestamp).toLocaleString();
      } catch (e) {
          return new Date().toLocaleString();
      }
  }

  escapeHtml(str) {
      if (typeof str !== 'string') return '';
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.notificationManager = new NotificationManager();
});