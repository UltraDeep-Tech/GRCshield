
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

// URL base del backend
const BASE_URL = 'https://backend-grcshield-934866038204.us-central1.run.app';

// Función para obtener notificaciones del servidor
async function fetchNotifications() {
    try {
        const response = await fetch(`${BASE_URL}/api/notifications`);
        if (response.ok) {
            const notifications = await response.json();
            updateNotificationsUI(notifications);
        } else {
            console.error('Failed to fetch notifications');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para crear una nueva notificación
async function createNotification(message, type) {
    try {
        const response = await fetch(`${BASE_URL}/api/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, type }),
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            fetchNotifications(); // Actualizar la UI después de crear la notificación
        } else {
            console.error('Failed to create notification');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Nueva función para eliminar una notificación
async function deleteNotification(id) {
    try {
        const response = await fetch(`${BASE_URL}/api/notifications/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            return true;
        } else {
            console.error('Failed to delete notification');
            return false;
        }
    } catch (error) {
        console.error('Error deleting notification:', error);
        return false;
    }
}

// Función para actualizar la UI con las notificaciones
function updateNotificationsUI(notifications) {
    const notificationsList = document.querySelector('.notifications');
    const notificationBadge = document.querySelector('.badge-number');
    const notificationHeader = document.querySelector('.dropdown-header');

    // Actualizar el número de notificaciones no leídas
    const unreadCount = notifications.length;
    updateNotificationBadge(unreadCount);

    if (notificationHeader) {
        notificationHeader.innerHTML = `
            You have ${unreadCount} new notifications
            <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        `;
    }

    if (notificationsList) {
        // Limpiar la lista de notificaciones existente
        notificationsList.innerHTML = '';

        // Añadir el encabezado
        notificationsList.innerHTML += `
            <li class="dropdown-header">
                You have ${unreadCount} new notifications
                <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
            </li>
            <li><hr class="dropdown-divider"></li>
        `;

        // Añadir cada notificación
        notifications.forEach((notification) => {
            notificationsList.innerHTML += `
                <li class="notification-item" data-id="${notification.id}">
                    <i class="${getIconClass(notification.type)}"></i>
                    <div>
                        <h4>${notification.type}</h4>
                        <p>${notification.message}</p>
                        <p>${new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                </li>
                <li><hr class="dropdown-divider"></li>
            `;
        });

        // Añadir el footer
        notificationsList.innerHTML += `
            <li class="dropdown-footer text-center">
                <a href="#">Show all notifications</a>
            </li>
        `;

        // Añadir event listeners a las notificaciones
        document.querySelectorAll('.notification-item').forEach((item) => {
            item.addEventListener('click', async function() {
                const notificationId = this.dataset.id;
                const deleted = await deleteNotification(notificationId);
                if (deleted) {
                    this.remove(); // Eliminar la notificación de la UI inmediatamente
                    updateUnreadCount();
                }
            });
        });
    }
}

// Función para actualizar el badge de notificaciones
function updateNotificationBadge(count) {
    const notificationBadge = document.querySelector('.badge-number');
    if (notificationBadge) {
        if (count > 0) {
            notificationBadge.textContent = count;
            notificationBadge.style.display = 'inline-block';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
}

// Función para actualizar el conteo de notificaciones no leídas
function updateUnreadCount() {
    const unreadCount = document.querySelectorAll('.notification-item').length;
    updateNotificationBadge(unreadCount);
    const notificationHeader = document.querySelector('.dropdown-header');
    if (notificationHeader) {
        notificationHeader.innerHTML = `
            You have ${unreadCount} new notifications
            <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        `;
    }
}

// Función para obtener la clase de icono basada en el tipo de notificación
function getIconClass(type) {
    switch(type) {
        case 'blocked_requests':
            return 'bi bi-exclamation-circle text-warning';
        case 'abusive_user':
            return 'bi bi-x-circle text-danger';
        case 'hallucination':
            return 'bi bi-check-circle text-success';
        case 'report':
            return 'bi bi-info-circle text-primary';
        default:
            return 'bi bi-bell text-secondary';
    }
}

// Inicializar las notificaciones y configurar la actualización periódica
document.addEventListener('DOMContentLoaded', function() {
    const notificationDropdown = document.querySelector('.nav-item.dropdown .nav-link.nav-icon i.bi-bell');
    const notificationBadge = document.querySelector('.badge-number');

    // Detecta cuando se abre el menú de notificaciones
    if (notificationDropdown) {
        notificationDropdown.closest('.dropdown').addEventListener('show.bs.dropdown', function() {
            if (notificationBadge) {
                notificationBadge.style.display = 'none'; // Ocultar el badge cuando se abre el menú
            }
        });
    }

    fetchNotifications();
    setInterval(fetchNotifications, 30000); // Actualizar cada 30 segundos
});
