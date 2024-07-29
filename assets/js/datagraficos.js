// Función para obtener datos del backend Flask
function obtenerDatos(ruta, callback) {
  if (!ruta || ruta.trim() === "") {
    console.error('Ruta no válida:', ruta);
    return;
  }

  console.log(`Solicitando datos desde la ruta: ${ruta}`);
  fetch(`https://api-grcshield.ultradeep.tech/data/${ruta}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Datos recuperados de ${ruta}:`, data);
      callback(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Ejemplo de llamada para obtener datos de la raíz
obtenerDatos('/', function(data) {
  console.log('Datos desde la raíz:', data);
  // Aquí puedes procesar los datos y actualizar tus gráficos
});



// Barra de progreso

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.cardindexscore, .cardindex');
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

  cards.forEach(card => {
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
  });

  document.addEventListener('click', function() {
    cards.forEach(card => {
      if (card.classList.contains('expanded')) {
        card.classList.remove('expanded');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Ejecutar la animación al cargar la página
  obtenerDatos('progressScore', (targetNumber) => {
    startCounter(progressText, targetNumber, duration);
  });
});



// Función para actualizar gráficos con los datos obtenidos
function actualizarGraficoTotalBlockedRequests(data) {
  const ctx = document.querySelector('#totalBlockedRequests').getContext('2d');
  const gradientBar = ctx.createLinearGradient(0, 0, 0, 400);
  gradientBar.addColorStop(0, 'rgba(0, 123, 255, 0.5)');
  gradientBar.addColorStop(1, 'rgba(0, 123, 255, 1)');

  const gradientLine = ctx.createLinearGradient(0, 0, 0, 400);
  gradientLine.addColorStop(0, 'rgba(255, 99, 132, 0.7)');
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
      pointHoverBorderWidth: 3,
    },
    {
      type: 'bar',
      label: 'Blocked Requests',
      data: data.blockedRequests,
      backgroundColor: gradientBar,
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 3,
      borderRadius: 15,
      shadowOffsetX: 3,
      shadowOffsetY: 3,
      shadowBlur: 10,
      shadowColor: ' srgba(0, 0, 0, 1)'
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
            usePointStyle: true ,
            pointStyle: 'circle',
            borderRadius: 2,
            font: {
              size: 14
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

// Total Blocked Requests gráfico
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('totalBlockedRequests', actualizarGraficoTotalBlockedRequests);
});

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
              usePointStyle: true,
              pointStyle: 'circle',
              color: '#fff',
              font: {
                family: "'Roboto', sans-serif",
                size: 14
              }
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
            data: data.categories.violence,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            tension: 0.4
          },
          {
            label: 'Hate',
            data: data.categories.hate,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.7)',
            tension: 0.4
          },
          {
            label: 'Sexual',
            data: data.categories.sexual,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 0.7)',
            tension: 0.4
          },
          {
            label: 'Self-harm',
            data: data.categories.selfHarm,
            fill: false,
            borderColor: 'rgba(153, 102, 255, 0.7)',
            tension: 0.4
          },
          {
            label: 'Jailbreak',
            data: data.categories.jailbreak,
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
              color: '#fff',
              usePointStyle: true,
              boxWidth: 50,
              borderRadius: 20,
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
    console.log('severityDistribution data:', data);  // Verifica los datos

    const dataSeverityDistribution = {
      labels: data.labels,
      datasets: [
        {
          label: 'Violence',
          data: data.categories.violence,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          borderRadius:10
        },
        {
          label: 'Hate',
          data: data.categories.hate,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius:10     
        },
        {
          label: 'Sexual',
          data: data.categories.sexual,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          borderRadius:10
        },
        {
          label: 'Self-harm',
          data: data.categories.selfHarm,
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          borderRadius:10
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
              color: '#fff',
              usePointStyle: true ,
              pointStyle: 'circle',
              borderRadius: 2,
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

// Gráfico de severidad a lo largo del tiempo por categoría
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('severityOverTimeByCategory', (data) => {
    console.log('severityOverTimeByCategory data:', data);  // Verifica los datos

    new Chart(document.querySelector('#SeverityTime'), {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Violence',
            data: data.categories.violence,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            tension: 0.4
          },
          {
            label: 'Hate',
            data: data.categories.hate,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.7)',
            tension: 0.4
          },
          {
            label: 'Sexual',
            data: data.categories.sexual,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 0.7)',
            tension: 0.4
          },
          {
            label: 'Self-harm',
            data: data.categories.selfHarm,
            fill: false,
            borderColor: 'rgba(153, 102, 255, 0.7)',
            tension: 0.4
          },
          {
            label: 'Jailbreak',
            data: data.categories.jailbreak,
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
              usePointStyle: true ,
              pointStyle: 'circle',
              borderRadius: 2,
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



/// Gráfico de usuarios abusivos potenciales
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos('totalAbusiveUsers', (data) => {
    const ctx = document.getElementById('totalAbusiveUsersChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Total Potential Abusive Users',
          data: data.totalAbusiveUsers,
          backgroundColor: 'rgba(75, 192, 500, 0.5)',
          borderColor: 'rgba(75, 192, 500, 1)',
          borderWidth: 2,
          borderRadius: 15,
          shadowColor: 10
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
              color: '#fff',
              usePointStyle: true ,
              pointStyle: 'circle',
              borderRadius: 2
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
    if (Array.isArray(data.data)) {
      const tbody = document.getElementById('abusiveUsersData');
      tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas
      data.data.forEach(item => {
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
    } else {
      console.error('abusiveUsersData no es un array:', data.data);
    }
  });

  obtenerDatos('hallucinationData', (data) => {
    new Chart(document.querySelector('#hallucinationChart'), {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Hallucinations Detected',
          data: data.data,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3,
          borderRadius: 15
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
              color: '#fff',
              usePointStyle: true ,
              pointStyle: 'circle',
              borderRadius: 2,            }
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

    const hallucinationTbody = document.getElementById('hallucinationData');
    data.details.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.type}</td>
        <td>${item.description}</td>
        <td>${item.date}</td>
      `;
      hallucinationTbody.appendChild(row);
    });
  });

  obtenerDatos('biasData', (data) => {
    new Chart(document.querySelector('#biasPieChart'), {
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
              color: '#fff',
              usePointStyle: true ,
              pointStyle: 'circle',
              borderRadius: 2,            }
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

    new Chart(document.querySelector('#biasLineChart'), {
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
              color: '#fff',
              usePointStyle: true ,
              pointStyle: 'circle',
              borderRadius: 2,            
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

    const biasTbody = document.getElementById('biasData');
    data.details.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.incident}</td>
        <td>${item.description}</td>
        <td>${item.date}</td>
      `;
      biasTbody.appendChild(row);
    });
  });

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
              color: '#fff',
              usePointStyle: true ,
              pointStyle: 'circle',
              borderRadius: 2,            }
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

    const promptInjectionTbody = document.getElementById('promptInjectionData');
    data.details.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.incident}</td>
        <td>${item.description}</td>
        <td>${item.date}</td>
      `;
      promptInjectionTbody.appendChild(row);
    });
  });

// Código para crear el gráfico de incidentes en el tiempo
obtenerDatos('dataExposureData/incidentsOverTime', (data) => {
  new Chart(document.querySelector('#dataExposureLineChart'), {
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
            color: '#fff',
            usePointStyle: true ,
            pointStyle: 'circle',
            borderRadius: 2,          }
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

// Código para crear el gráfico de tipos de datos expuestos
obtenerDatos('dataExposureData/types', (data) => {
  new Chart(document.querySelector('#dataExposurePieChart'), {
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
            color: '#fff',
            usePointStyle: true ,
            pointStyle: 'circle',
            borderRadius: 2,          }
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

// Código para llenar la tabla con los datos expuestos
obtenerDatos('dataExposureData', (data) => {
  const dataExposureTbody = document.getElementById('dataExposureData');
  data.details.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.incident}</td>
      <td>${item.description}</td>
      <td>${item.airesponse}</td>
      <td>${item.date}</td>
    `;
    dataExposureTbody.appendChild(row);
  });
});
});


function signOut(event) {
  event.preventDefault();
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('expiration');
  alert('You have been signed out.');
  window.location.href = "/pages-login.html"; // Ajusta la ruta según tu estructura
}
