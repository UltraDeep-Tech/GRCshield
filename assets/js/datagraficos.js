// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9N5VF0vFrzc4PzgC3DnLDL51rLHltFdk",
  authDomain: "ultradeeptech.firebaseapp.com",
  databaseURL: "https://ultradeeptech-default-rtdb.firebaseio.com",
  projectId: "ultradeeptech",
  storageBucket: "ultradeeptech.appspot.com",
  messagingSenderId: "934866038204",
  appId: "1:934866038204:web:dd2b3862bf3f6ff2344fb9",
  measurementId: "G-YHX6XTML2J"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Función para obtener datos de Firebase
function obtenerDatos(ruta, callback) {
  const ref = database.ref(ruta);
  ref.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(`Datos recuperados de ${ruta}:`, data); // Añade esta línea para depuración
    callback(data);
  });
}


// Función para actualizar gráficos con los datos obtenidos
function actualizarGraficoTotalBlockedRequests(data) {
  const ctx = document.querySelector('#totalBlockedRequests').getContext('2d');
  const gradientBar = ctx.createLinearGradient(0, 0, 0, 400);
  gradientBar.addColorStop(0, 'rgba(0, 123, 255, 0.5)');
  gradientBar.addColorStop(1, 'rgba(0, 123, 255, 1)');

  const gradientLine = ctx.createLinearGradient(0, 0, 0, 400);
  gradientLine.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
  gradientLine.addColorStop(1, 'rgba(255, 99, 132, 1)');

  const dataTotalBlocked = {
    labels: data.labels,
    datasets: [{
      type: 'line',
      label: 'Block Rate',
      data: data.blockRate,
      borderColor: gradientLine,
      fill: false,
      tension: 0.4,
      borderWidth: 3,
      pointBackgroundColor: 'white',
      pointBorderColor: gradientLine,
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: 'white',
      pointHoverBorderColor: gradientLine,
      pointHoverBorderWidth: 3
    },
    {
      type: 'bar',
      label: 'Blocked Requests',
      data: data.blockedRequests,
      backgroundColor: gradientBar,
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1,
      borderRadius: 5,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }]
  };

  new Chart(ctx, {
    type: 'bar',
    data: dataTotalBlocked,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#fff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        x: {
          ticks: {
            color: '#fff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderWidth: 1,
          borderColor: '#fff',
          cornerRadius: 4
        }
      }
    }
  });
}

// Barra de progreso
document.addEventListener('DOMContentLoaded', function() {
  const card = document.getElementById('cardindexscore');
  const progressText = document.getElementById('progressText');
  const shield = document.getElementById('shield');
  const duration = 2000; // Duración de la animación en milisegundos

  function setShieldColor(score) {
    shield.classList.remove('glowing-red', 'glowing-yellow', 'glowing-green');
    if (score <= 33) {
      shield.classList.add('glowing-red');
    } else if (score <= 66) {
      shield.classList.add('glowing-yellow');
    } else {
      shield.classList.add('glowing-green');
    }
  }

  function startCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 100); // Incremento por paso

    function updateCounter() {
      start += increment;
      element.textContent = Math.ceil(start);

      if (start < target) {
        setTimeout(updateCounter, 100);
      } else {
        element.textContent = target; // Asegura que el número final sea exacto
        setShieldColor(target); // Actualiza el color del escudo basado en el score final
      }
    }

    updateCounter();
  }

  card.addEventListener('click', function(event) {
    event.stopPropagation();
    if (card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      document.body.style.overflow = 'auto';
    } else {
      card.classList.add('expanded');
      document.body.style.overflow = 'hidden';
    }
    obtenerDatos('progressScore', (targetNumber) => {
      startCounter(progressText, targetNumber, duration);
    });
  });

  document.addEventListener('click', function() {
    if (card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      document.body.style.overflow = 'auto';
    }
  });

  // Ejecutar la animación al cargar la página
  obtenerDatos('progressScore', (targetNumber) => {
    startCounter(progressText, targetNumber, duration);
  });
});

// Total Blocked Requests gráfico
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('blockedRequests', actualizarGraficoTotalBlockedRequests);
});

// Repite las funciones de obtención y actualización de datos para los demás gráficos

// Gráfico de bloqueos por categoría
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('blockedRequestsByCategory', (data) => {
    new Chart(document.querySelector('#blockedRequestsByCategory'), {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Blocked Requests',
          data: data.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 205, 86, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 205, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });
});

// Gráfico de tasa de bloqueos por categoría a lo largo del tiempo
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('blockRateOverTimeByCategory', (data) => {
    new Chart(document.querySelector('#blockRateOverTimeByCategory'), {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Violence',
            data: data.violence,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            tension: 0.4
          },
          {
            label: 'Hate',
            data: data.hate,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.7)',
            tension: 0.4
          },
          {
            label: 'Sexual',
            data: data.sexual,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 0.7)',
            tension: 0.4
          },
          {
            label: 'Self-harm',
            data: data.selfHarm,
            fill: false,
            borderColor: 'rgba(153, 102, 255, 0.7)',
            tension: 0.4
          },
          {
            label: 'Jailbreak',
            data: data.jailbreak,
            fill: false,
            borderColor: 'rgba(255, 205, 86, 0.7)',
            tension: 0.4
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });
});

// Gráfico de distribución de severidad
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('severityDistribution', (data) => {
    const dataSeverityDistribution = {
      labels: data.labels,
      datasets: [
        {
          label: 'Violence',
          data: data.violence,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Hate',
          data: data.hate,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Sexual',
          data: data.sexual,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Self-harm',
          data: data.selfHarm,
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };

    new Chart(document.querySelector('#severity'), {
      type: 'bar',
      data: dataSeverityDistribution,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });
});





// Gráfico de usuarios abusivos potenciales
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('totalAbusiveUsers', (data) => {
    const ctx = document.getElementById('totalAbusiveUsersChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Total Potential Abusive Users',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });

  obtenerDatos('abusiveUsersData', (data) => {
    const tbody = document.getElementById('abusiveUsersData');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.guid}</td>
        <td>${item.score}</td>
        <td>${item.trend}</td>
        <td>${item.date}</td>
        <td>${item.total}</td>
        <td>${item.violence}</td>
        <td>${item.hate}</td>
        <td>${item.sexual}</td>
        <td>${item.selfHarm}</td>
      `;
      tbody.appendChild(row);
    });
  });

  obtenerDatos('hallucinationData', (data) => {
    const hallucinationTbody = document.getElementById('hallucinationData');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      hallucinationTbody.appendChild(row);
    });
  });

  obtenerDatos('biasData', (data) => {
    const biasTbody = document.getElementById('biasData');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      biasTbody.appendChild(row);
    });
  });

  obtenerDatos('promptInjectionData', (data) => {
    const promptInjectionTbody = document.getElementById('promptInjectionData');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      promptInjectionTbody.appendChild(row);
    });
  });

  obtenerDatos('dataExposureData', (data) => {
    const dataExposureTbody = document.getElementById('dataExposureData');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.dataType}</td>
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      dataExposureTbody.appendChild(row);
    });
  });

  // Hallucination Chart
  obtenerDatos('hallucinationData', (data) => {
    new Chart(document.querySelector('#hallucinationChart'), {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Hallucinations Detected',
          data: data.map(item => item.hallucinationsDetected),
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });

  // Bias Pie Chart
  obtenerDatos('biasData', (data) => {
    new Chart(document.querySelector('#biasPieChart'), {
      type: 'pie',
      data: {
        labels: ['Gender', 'Race', 'Age', 'Religion', 'Socioeconomic status', 'Nationality', 'Disability', 'Sexual orientation', 'Political affiliation'],
        datasets: [{
          label: 'Bias Types',
          data: data.map(item => item.biasCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });

  // Bias Line Chart
  obtenerDatos('biasData', (data) => {
    new Chart(document.querySelector('#biasLineChart'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Bias Incidents',
          data: data.map(item => item.biasIncidents),
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });

  // Prompt Injection Chart
  obtenerDatos('promptInjectionData', (data) => {
    new Chart(document.querySelector('#promptInjectionChart'), {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Prompt Injections Detected',
          data: data.map(item => item.promptInjectionsDetected),
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });

  // Data Exposure Line Chart
  obtenerDatos('dataExposureData', (data) => {
    new Chart(document.querySelector('#dataExposureLineChart'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Data Exposure Incidents',
          data: data.map(item => item.dataExposureIncidents),
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });

  // Data Exposure Pie Chart
  obtenerDatos('dataExposureData', (data) => {
    new Chart(document.querySelector('#dataExposurePieChart'), {
      type: 'pie',
      data: {
        labels: ['Personal', 'Financial', 'Health', 'Intellectual property', 'User behavior', 'Communication', 'Location'],
        datasets: [{
          label: 'Data Exposure Types',
          data: data.map(item => item.dataExposureCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      }
    });
  });
});

// Verifica el estado de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  const expiration = localStorage.getItem('expiration');
  const now = new Date().getTime();

  if (!loggedIn || now > expiration) {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('expiration');
    alert('You must login first');
    window.location.href = "pages-login.html"; // Redirigir a la página de login
  }
});

function signOut(event) {
  event.preventDefault();
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('expiration');
  alert('You have been signed out.');
  window.location.href = "pages-login.html"; // Ajusta la ruta según tu estructura
}

document.querySelectorAll('.cardindex').forEach(card => {
  card.addEventListener('click', (event) => {
    // Verifica si el clic proviene de un elemento interactivo dentro de la tarjeta
    if (event.target.closest('.cardindex-header, .cardindex-footer, .cardindex-body button, .cardindex-body a, .cardindex-body canvas')) {
      return; // Si es un elemento interactivo, no hacer nada
    }

    // Alterna la clase 'expanded' en la tarjeta
    if (!card.classList.contains('expanded')) {
      card.classList.add('expanded');
      setTimeout(() => {
        window.dispatchEvent(new Event('resize')); // Redibujar gráficos
      }, 300);
    } else {
      card.classList.remove('expanded');
      setTimeout(() => {
        window.dispatchEvent(new Event('resize')); // Redibujar gráficos
      }, 300);
    }
  });
});
