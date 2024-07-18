document.addEventListener("DOMContentLoaded", () => {
  // Total Blocked Requests gráfico
  obtenerDatos('blockedRequests', actualizarGraficoTotalBlockedRequests);

  // Gráfico de bloqueos por categoría
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

  // Gráfico de tasa de bloqueos por categoría a lo largo del tiempo
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

  // Gráfico de distribución de severidad
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

  // Gráfico de usuarios abusivos potenciales
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

  // Hallucination Detection gráfico
  obtenerDatos('hallucinationData', (data) => {
    new Chart(document.querySelector('#hallucinationDetectionChart'), {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Number of Hallucinations Detected',
          data: data.data,
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
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

  // Bias Detection gráfico de tortas
  obtenerDatos('biasData', (data) => {
    new Chart(document.querySelector('#biasTypesChart'), {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Types of Bias Detected',
          data: data.biasCount,
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

  // Bias Incidents Over Time gráfico de líneas
  obtenerDatos('biasData', (data) => {
    new Chart(document.querySelector('#biasIncidentsChart'), {
      type: 'line',
      data: {
        labels: data.biasIncidents.labels,
        datasets: [{
          label: 'Bias Incidents Over Time',
          data: data.biasIncidents.data,
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

  // Prompt Injection Detection gráfico de líneas
  obtenerDatos('promptInjectionData', (data) => {
    new Chart(document.querySelector('#promptInjectionChart'), {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Number of Prompt Injections Detected Each Day',
          data: data.data,
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

  // Data Exposure Incidents Over Time gráfico de líneas
  obtenerDatos('dataExposureData/incidentsOverTime', (data) => {
    new Chart(document.querySelector('#dataExposureIncidentsChart'), {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Data Exposure Incidents Over Time',
          data: data.data,
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

  // Types of Data Exposed gráfico de tortas
  obtenerDatos('dataExposureData/types', (data) => {
    new Chart(document.querySelector('#dataExposureTypesChart'), {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Types of Data Exposed',
          data: data.data,
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
