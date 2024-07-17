
 // Hide the preloader
    // Hide the preloader
 // Hide the preloader
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
      preloader.classList.add('hidden');
    });
  });
  
        // BARRA DE PROGRESO
        // BARRA DE PROGRESO
        // BARRA DE PROGRESO
        // BARRA DE PROGRESO
        document.addEventListener('DOMContentLoaded', function() {
          const card = document.getElementById('cardindexscore');
          const progressText = document.getElementById('progressText');
          const shield = document.getElementById('shield');
          const targetNumber = 70; // Ajusta esto según tu score
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
              startCounter(progressText, targetNumber, duration);
          });
      
          document.addEventListener('click', function() {
              if (card.classList.contains('expanded')) {
                  card.classList.remove('expanded');
                  document.body.style.overflow = 'auto';
              }
          });
      
          // Ejecutar la animación al cargar la página
          startCounter(progressText, targetNumber, duration);
      });
      
      
      
      

  //FIN BARRA DE PROGRESO
  //FIN BARRA DE PROGRESO
  //FIN BARRA DE PROGRESO
  //FIN BARRA DE PROGRESO


  //TOTAL BLOCKED REQUEST GRAFICO
  //TOTAL BLOCKED REQUEST GRAFICO
  //TOTAL BLOCKED REQUEST GRAFICO
  //TOTAL BLOCKED REQUEST GRAFICO
  
  document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.querySelector('#totalBlockedRequests').getContext('2d');
  
    // Crear gradientes
    const gradientBar = ctx.createLinearGradient(0, 0, 0, 400);
    gradientBar.addColorStop(0, 'rgba(0, 123, 255, 0.5)');
    gradientBar.addColorStop(1, 'rgba(0, 123, 255, 1)');
  
    const gradientLine = ctx.createLinearGradient(0, 0, 0, 400);
    gradientLine.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
    gradientLine.addColorStop(1, 'rgba(255, 99, 132, 1)');
  
    const dataTotalBlocked = {
      labels: ['Jul 10', 'Jul 11', 'Jul 12', 'Jul 13', 'Jul 14', 'Jul 15', 'Jul 16'],
      datasets: [{
        type: 'line',
        label: 'Block Rate',
        data: [1500, 10000, 8000,9000, 15000, 18000, 5000],
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
        data: [25000, 15000, 20000,13000, 30000, 35000, 10000],
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
  });

  //FIN DEL GRAFICO TOTAL BLOCKED REQUEST
  //FIN DEL GRAFICO TOTAL BLOCKED REQUEST
  //FIN DEL GRAFICO TOTAL BLOCKED REQUEST


  //COMIENZO GRAFICO REQUEST BY CATEGORY
  //COMIENZO GRAFICO REQUEST BY CATEGORY
  //COMIENZO GRAFICO REQUEST BY CATEGORY
  
  document.addEventListener("DOMContentLoaded", () => {
    new Chart(document.querySelector('#blockedRequestsByCategory'), {
      type: 'pie',
      data: {
        labels: [
          'Violence',
          'Hate',
          'Sexual',
          'Self-harm',
          'Jailbreak'
        ],
        datasets: [{
          label: 'Blocked Requests',
          data: [300, 50, 100, 20, 10],
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

    //FIN GRAFICO REQUEST BY CATEGORY
  //FIN GRAFICO REQUEST BY CATEGORY
  //FIN GRAFICO REQUEST BY CATEGORY

  //COMIENZO GRAFICO BLOCKRATEOVERTIMEBY CATEGORY
  //COMIENZO GRAFICO BLOCKRATEOVERTIMEBY CATEGORY
  //COMIENZO GRAFICO BLOCKRATEOVERTIMEBY CATEGORY
  
  document.addEventListener("DOMContentLoaded", () => {
    new Chart(document.querySelector('#blockRateOverTimeByCategory'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Violence',
            data: [45, 32, 28, 15, 27, 50, 60],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            tension: 0.4
          },
          {
            label: 'Hate',
            data: [23, 63, 36, 39, 35, 40, 27],
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.7)',
            tension: 0.4
          },
          {
            label: 'Sexual',
            data: [57, 51, 20, 25, 55, 20, 15],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 0.7)',
            tension: 0.4
          },
          {
            label: 'Self-harm',
            data: [32, 40, 10, 60, 36, 57, 35],
            fill: false,
            borderColor: 'rgba(153, 102, 255, 0.7)',
            tension: 0.4
          },
          {
            label: 'Jailbreak',
            data: [35, 20, 45, 50, 33, 44, 50],
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
  
  //FIN GRAFICO BLOCKRATEOVERTIMEBY CATEGORY
  //FIN GRAFICO BLOCKRATEOVERTIMEBY CATEGORY
  //FIN GRAFICO BLOCKRATEOVERTIMEBY CATEGORY


  document.addEventListener("DOMContentLoaded", () => {
    const dataSeverityDistribution = {
      labels: ['Low', 'Medium', 'High'],
      datasets: [
        {
          label: 'Violence',
          data: [120, 180, 100],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Hate',
          data: [90, 130, 70],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Sexual',
          data: [70, 160, 90],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Self-harm',
          data: [50, 110, 80],
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
  
  document.addEventListener("DOMContentLoaded", () => {
    new Chart(document.querySelector('#SeverityTime'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Violence',
            data: [12, 19, 15, 22, 17, 25, 20],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.7)',
            tension: 0.4
          },
          {
            label: 'Hate',
            data: [18, 22, 17, 28, 25, 30, 27],
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.7)',
            tension: 0.4
          },
          {
            label: 'Sexual',
            data: [14, 24, 21, 26, 29, 33, 31],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 0.7)',
            tension: 0.4
          },
          {
            label: 'Self-harm',
            data: [16, 28, 25, 20, 32, 36, 34],
            fill: false,
            borderColor: 'rgba(153, 102, 255, 0.7)',
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
  
  document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('totalAbusiveUsersChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Total Potential Abusive Users',
          data: [12, 19, 3, 5, 2, 3, 7],
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
  
    const data = [
      { guid: 'user1', score: 95, trend: 'up', date: '2023-07-01', total: 100, violence: 20, hate: 15, sexual: 30, selfHarm: 10 },
      { guid: 'user2', score: 85, trend: 'down', date: '2023-07-02', total: 90, violence: 25, hate: 10, sexual: 20, selfHarm: 5 },
      // Add more data as needed
    ];
  
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
  
    const hallucinationData = [
      { userInput: 'What is the weather like tomorrow?', aiResponse: 'The weather will be sunny with a chance of meatballs.', date: '2023-07-01' },
      { userInput: 'Who is the president of the United States?', aiResponse: 'The president of the United States is Mickey Mouse.', date: '2023-07-02' },
      // Añade más datos según sea necesario
    ];
  
    const hallucinationTbody = document.getElementById('hallucinationData');
    hallucinationData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      hallucinationTbody.appendChild(row);
    });
  
    const biasData = [
      { userInput: 'Tell me about the history of the United States.', aiResponse: 'The United States was founded in 1776 by Europeans who settled on unoccupied land.', date: '2023-07-01' },
      { userInput: 'Who is the best football player?', aiResponse: 'The best football player is Cristiano Ronaldo.', date: '2023-07-02' },
      { userInput: 'What are the roles of men and women in society?', aiResponse: 'Traditionally, men are breadwinners and women are homemakers.', date: '2023-07-03' },
      { userInput: 'What is the best country in the world?', aiResponse: 'The best country in the world is the United States.', date: '2023-07-04' },
      { userInput: 'What religion is the most peaceful?', aiResponse: 'Christianity is the most peaceful religion.', date: '2023-07-05' }
    ];
  
    const biasTbody = document.getElementById('biasData');
    biasData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      biasTbody.appendChild(row);
    });
  
    const promptInjectionData = [
      { userInput: 'Translate "hello" to Spanish.', aiResponse: 'The translation is "Hola".', date: '2023-07-01' },
      { userInput: 'Add a new administrator to the system.', aiResponse: 'Admin user created successfully.', date: '2023-07-02' },
      { userInput: 'What is 2 + 2?', aiResponse: '2 + 2 equals 4.', date: '2023-07-03' },
      { userInput: 'List all the users in the database.', aiResponse: 'User list: John, Jane, Doe.', date: '2023-07-04' },
      { userInput: 'Delete all files in the system.', aiResponse: 'All files have been deleted.', date: '2023-07-05' }
    ];
  
    const promptInjectionTbody = document.getElementById('promptInjectionData');
    promptInjectionData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      promptInjectionTbody.appendChild(row);
    });
  
    const dataExposureData = [
      { dataType: 'Personal', userInput: 'What is my home address?', aiResponse: 'Your home address is 123 Main St.', date: '2023-07-01' },
      { dataType: 'Financial', userInput: 'What is my bank account balance?', aiResponse: 'Your bank account balance is $5,000.', date: '2023-07-02' },
      { dataType: 'Medical', userInput: 'What are my medical records?', aiResponse: 'Your medical records show a history of asthma.', date: '2023-07-03' },
      { dataType: 'Personal', userInput: 'What is my social security number?', aiResponse: 'Your social security number is 123-45-6789.', date: '2023-07-04' },
      { dataType: 'Financial', userInput: 'What are my recent transactions?', aiResponse: 'Recent transactions: $200 at Amazon, $50 at Starbucks.', date: '2023-07-05' }
    ];
  
    const dataExposureTbody = document.getElementById('dataExposureData');
    dataExposureData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.dataType}</td>
        <td>${item.userInput}</td>
        <td>${item.aiResponse}</td>
        <td>${item.date}</td>
      `;
      dataExposureTbody.appendChild(row);
    });
  
    // Hallucination Chart
    new Chart(document.querySelector('#hallucinationChart'), {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Hallucinations Detected',
          data: [12, 19, 3, 5, 2, 3, 7],
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
  
    // Bias Pie Chart
    new Chart(document.querySelector('#biasPieChart'), {
      type: 'pie',
      data: {
        labels: ['Gender', 'Race', 'Age', 'Religion', 'Socioeconomic status', 'Nationality', 'Disability', 'Sexual orientation', 'Political affiliation'],
        datasets: [{
          label: 'Bias Types',
          data: [12, 19, 3, 5, 2, 3, 7, 8, 4],
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
  
    // Bias Line Chart
    new Chart(document.querySelector('#biasLineChart'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Bias Incidents',
          data: [12, 19, 3, 5, 2, 3, 7],
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
  
    // Prompt Injection Chart
    new Chart(document.querySelector('#promptInjectionChart'), {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Prompt Injections Detected',
          data: [12, 19, 3, 5, 2, 3, 7],
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
  
    // Data Exposure Line Chart
    new Chart(document.querySelector('#dataExposureLineChart'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Data Exposure Incidents',
          data: [12, 19, 3, 5, 2, 3, 7],
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
  
    // Data Exposure Pie Chart
    new Chart(document.querySelector('#dataExposurePieChart'), {
      type: 'pie',
      data: {
        labels: ['Personal', 'Financial', 'Health', 'Intellectual property', 'User behavior', 'Communication', 'Location'],
        datasets: [{
          label: 'Data Exposure Types',
          data: [12, 19, 3, 5, 2, 3, 7],
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
  })
  
  function signOut(event) {
    event.preventDefault();
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('expiration');
    alert('You have been signed out.');
    window.location.href = "pages-login.html"; // Ajusta la ruta según tu estructura
  };
  
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


