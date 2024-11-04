
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
// notifications.js

class NotificationManager {
  constructor() {
      this.eventSource = null;
      this.notificationsList = document.querySelector('.notifications-list');
      this.notificationBadge = document.querySelector('.notification-badge');
      this.notificationContainer = document.querySelector('.notifications-container');
      this.baseUrl = 'https://backend-grcshield-934866038204.us-central1.run.app';
      this.setupEventListeners();
  }

  setupEventListeners() {
      document.addEventListener('DOMContentLoaded', () => {
          this.initializeNotifications();
      });

      // Listener para marcar como leída al hacer click
      if (this.notificationsList) {
          this.notificationsList.addEventListener('click', (e) => {
              const notificationItem = e.target.closest('.notification-item');
              if (notificationItem) {
                  const notificationId = notificationItem.dataset.id;
                  this.markAsRead(notificationId);
              }
          });
      }
  }

  initializeNotifications() {
      const department = localStorage.getItem('currentDepartment');
      if (!department) {
          console.error('No department specified');
          return;
      }

      // Cerrar conexión existente si hay alguna
      if (this.eventSource) {
          this.eventSource.close();
      }

      // Iniciar nueva conexión SSE
      const url = new URL(`${this.baseUrl}/api/notifications/stream`);
      url.searchParams.append('department', department);
      
      this.eventSource = new EventSource(url);

      this.eventSource.onopen = () => {
          console.log('Conexión SSE establecida');
      };

      this.eventSource.onmessage = (event) => {
          const notification = JSON.parse(event.data);
          this.handleNewNotification(notification);
      };

      this.eventSource.onerror = (error) => {
          console.error('Error en conexión SSE:', error);
          this.eventSource.close();
          setTimeout(() => this.initializeNotifications(), 5000);
      };

      // Cargar notificaciones existentes
      this.loadExistingNotifications(department);
  }

  async loadExistingNotifications(department) {
      try {
          const response = await fetch(`${this.baseUrl}/api/notifications?department=${department}`);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const notifications = await response.json();
          notifications.forEach(notification => {
              if (!notification.read) {
                  this.renderNotification(notification);
              }
          });
          
          this.updateNotificationCount();
      } catch (error) {
          console.error('Error al cargar notificaciones:', error);
      }
  }

  handleNewNotification(notification) {
      const existingNotification = document.querySelector(`[data-id="${notification.id}"]`);
      if (!existingNotification && !notification.read) {
          this.renderNotification(notification);
          this.showToast(notification);
          this.updateNotificationCount();
      }
  }

  renderNotification(notification) {
      if (!this.notificationsList) return;

      const notificationElement = document.createElement('div');
      notificationElement.className = `notification-item ${this.getSeverityClass(notification.severity)}`;
      notificationElement.dataset.id = notification.id;
      
      notificationElement.innerHTML = `
          <div class="notification-header">
              <span class="notification-type">${this.getIcon(notification.type)} ${this.escapeHtml(notification.type)}</span>
              <span class="notification-time">${this.formatTime(notification.timestamp)}</span>
          </div>
          <div class="notification-body">
              <p>${this.escapeHtml(notification.message)}</p>
          </div>
      `;

      this.notificationsList.insertBefore(notificationElement, this.notificationsList.firstChild);
  }

  async markAsRead(notificationId) {
      try {
          const department = localStorage.getItem('currentDepartment');
          const response = await fetch(
              `${this.baseUrl}/api/notifications/${notificationId}/read?department=${department}`,
              { method: 'PUT' }
          );

          if (response.ok) {
              const notification = document.querySelector(`[data-id="${notificationId}"]`);
              if (notification) {
                  notification.remove();
                  this.updateNotificationCount();
              }
          }
      } catch (error) {
          console.error('Error al marcar como leída:', error);
      }
  }

  updateNotificationCount() {
      const count = this.notificationsList.querySelectorAll('.notification-item').length;
      
      if (this.notificationBadge) {
          this.notificationBadge.textContent = count;
          this.notificationBadge.style.display = count > 0 ? 'block' : 'none';
      }

      // Actualizar texto del header
      const header = document.querySelector('.notifications-header');
      if (header) {
          header.textContent = count > 0 
              ? `Tienes ${count} notificación${count !== 1 ? 'es' : ''} nueva${count !== 1 ? 's' : ''}`
              : 'No hay notificaciones nuevas';
      }
  }

  showToast(notification) {
      const toastElement = document.createElement('div');
      toastElement.className = `toast ${this.getSeverityClass(notification.severity)}`;
      toastElement.setAttribute('role', 'alert');
      toastElement.setAttribute('aria-live', 'assertive');
      toastElement.setAttribute('aria-atomic', 'true');
      
      toastElement.innerHTML = `
          <div class="toast-header">
              <strong class="me-auto">${this.getIcon(notification.type)} ${this.escapeHtml(notification.type)}</strong>
              <small>${this.formatTime(notification.timestamp)}</small>
              <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
          </div>
          <div class="toast-body">
              ${this.escapeHtml(notification.message)}
          </div>
      `;

      const toastContainer = document.querySelector('.toast-container');
      if (toastContainer) {
          toastContainer.appendChild(toastElement);
          const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 5000 });
          toast.show();
      }
  }

  getSeverityClass(severity) {
      const classes = {
          'normal': 'severity-normal',
          'alta': 'severity-high',
          'crítica': 'severity-critical'
      };
      return classes[severity] || classes.normal;
  }

  getIcon(type) {
      const icons = {
          'alert': '<i class="bi bi-exclamation-triangle-fill"></i>',
          'info': '<i class="bi bi-info-circle-fill"></i>',
          'warning': '<i class="bi bi-exclamation-circle-fill"></i>',
          'success': '<i class="bi bi-check-circle-fill"></i>'
      };
      return icons[type] || icons.info;
  }

  formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString();
  }

  escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
  }
}

// Inicializar el manejador de notificaciones
const notificationManager = new NotificationManager();