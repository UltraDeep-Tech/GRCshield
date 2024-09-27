// Function to show notifications in the notifications tab
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('alert');
    notification.classList.add(type === 'error' ? 'alert-danger' : 'alert-success');
    notification.classList.add('alert-dismissible');
    notification.setAttribute('role', 'alert');
    
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.onclick = function() {
        notification.remove();
    };

    notification.textContent = message;
    notification.appendChild(closeButton);

    // Add notification to the alerts container
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.appendChild(notification);
}

// Cargar políticas y manejar formulario de agregar política
document.addEventListener('DOMContentLoaded', function () {
    loadPolicies();

    // Manejar el envío del formulario para agregar una nueva política
    document.getElementById('addPolicyForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const userDepartment = localStorage.getItem('userDepartment');

        const newPolicy = {
            name: document.getElementById('policyName').value,
            description: document.getElementById('policyDescription').value,
            regulation: document.getElementById('policyRegulation').value,
            compliance_status: document.getElementById('policyCompliance').value,
            user_department: userDepartment, // Corregido a user_department
        };

        fetch('https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPolicy)
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Policy added successfully!');
            loadPolicies(); // Recargar las políticas después de agregar una nueva
        })
        .catch(error => {
            showNotification('Failed to add policy.', 'error');
        });
    });

    // Recargar políticas cuando se cambia el departamento
    document.getElementById('department-select').addEventListener('change', function () {
        const selectedUserDepartment = this.value;
        localStorage.setItem('userDepartment', selectedUserDepartment);
        document.getElementById('user-department').textContent = ` ${selectedUserDepartment}`;
        loadPolicies();
    });
});

// Función para cargar políticas
function loadPolicies() {
    const userDepartment = encodeURIComponent(localStorage.getItem('userDepartment'));
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies?userDepartment=${userDepartment}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const policiesTable = document.getElementById('policiesTable');
            policiesTable.innerHTML = ''; // Limpiar la tabla antes de cargar

            data.forEach(policy => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${policy.id}</td>
                    <td>${policy.name}</td>
                    <td>${policy.description}</td>
                    <td>${policy.regulation}</td>
                    <td>${policy.compliance_status}</td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm compliant-btn" data-id="${policy.id}" data-status="Compliant">Compliant</button>
                        <button class="btn btn-outline-primary btn-sm non-compliant-btn" data-id="${policy.id}" data-status="Non-compliant" style="color:red;">Non-Compliant</button>
                    </td>
                    <td><button class="btn btn-info btn-sm" onclick="readPolicy(${policy.id})"><i class="bi bi-eye"></i></button></td>
                    <td><button class="btn btn-primary btn-sm" onclick="editPolicy(${policy.id})"><i class="bi bi-pencil"></i></button></td>
                    <td><button class="btn btn-danger btn-sm" onclick="deletePolicy(${policy.id})"><i class="bi bi-trash"></i></button></td>
                `;
                policiesTable.appendChild(row);
            });

            // Agregar eventos de clic para los botones "Compliant" y "Non-Compliant"
            document.querySelectorAll('.compliant-btn, .non-compliant-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const policyId = this.getAttribute('data-id');
                    const status = this.getAttribute('data-status');
                    updatePolicy(policyId, status);
                });
            });
        })
        .catch(error => {
            showNotification('Failed to load policies.', 'error');
            console.error('Error loading policies:', error.message);
        });
}

// Función para actualizar el estado de una política
function updatePolicy(policyId, status) {
    const userDepartment = localStorage.getItem('userDepartment');
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ compliance_status: status, user_department: userDepartment })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNotification('Policy updated successfully!');
            setTimeout(() => {
                location.reload(); // Recargar la página después de actualizar la política
            }, 500); // Espera medio segundo antes de recargar para mostrar la notificación
        } else {
            showNotification('Failed to update policy.', 'error');
        }
    })
    .catch(error => {
        showNotification('Failed to update policy.', 'error');
    });
}



// Función para leer una política (usando el modal)
function readPolicy(policyId) {
    const userDepartment = localStorage.getItem('userDepartment'); // Obtener el departamento del usuario
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}?userDepartment=${userDepartment}`)
        .then(response => response.json())
        .then(policy => {
            document.getElementById('modalPolicyName').value = policy.name;
            document.getElementById('modalPolicyDescription').value = policy.description;
            document.getElementById('modalPolicyRegulation').value = policy.regulation;
            document.getElementById('modalPolicyCompliance').value = policy.compliance_status;

            // Desactivar campos para solo lectura
            document.getElementById('modalPolicyName').disabled = true;
            document.getElementById('modalPolicyDescription').disabled = true;
            document.getElementById('modalPolicyRegulation').disabled = true;
            document.getElementById('modalPolicyCompliance').disabled = true;

            // Ocultar el botón de guardar en modo solo lectura
            document.getElementById('editSaveBtn').style.display = 'none';

            // Mostrar el modal
            const policyModal = new bootstrap.Modal(document.getElementById('policyModal'));
            policyModal.show();
        })
        .catch(error => {
            showNotification('Failed to load policy details.', 'error');
        });
}

// Función para abrir el modal en modo edición
function editPolicy(policyId) {
    const userDepartment = localStorage.getItem('userDepartment'); // Obtener el departamento del usuario
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}?userDepartment=${userDepartment}`)
        .then(response => response.json())
        .then(policy => {
            document.getElementById('modalPolicyName').value = policy.name;
            document.getElementById('modalPolicyDescription').value = policy.description;
            document.getElementById('modalPolicyRegulation').value = policy.regulation;
            document.getElementById('modalPolicyCompliance').value = policy.compliance_status;

            // Habilitar campos para edición
            document.getElementById('modalPolicyName').disabled = false;
            document.getElementById('modalPolicyDescription').disabled = false;
            document.getElementById('modalPolicyRegulation').disabled = false;
            document.getElementById('modalPolicyCompliance').disabled = false;

            // Mostrar el botón de guardar en modo edición
            document.getElementById('editSaveBtn').style.display = 'block';

            // Asignar la función de guardar cambios al botón de guardar
            document.getElementById('editSaveBtn').onclick = function () {
                savePolicyChanges(policyId);
            };

            // Mostrar el modal
            const policyModal = new bootstrap.Modal(document.getElementById('policyModal'));
            policyModal.show();
        })
        .catch(error => {
            showNotification('Failed to load policy details.', 'error');
        });
}

// Función para guardar cambios hechos en modo edición
function savePolicyChanges(policyId) {
    const userDepartment = localStorage.getItem('userDepartment'); // Obtener el departamento del usuario
    const updatedPolicy = {
        name: document.getElementById('modalPolicyName').value,
        description: document.getElementById('modalPolicyDescription').value,
        regulation: document.getElementById('modalPolicyRegulation').value,
        compliance_status: document.getElementById('modalPolicyCompliance').value,
        user_department: userDepartment
    };

    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPolicy)
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Policy updated successfully!');
        window.location.reload();
    })
    .catch(error => {
        showNotification('Failed to update policy.', 'error');
    });
}

// Función para eliminar una política
function deletePolicy(policyId) {
    const userDepartment = localStorage.getItem('userDepartment'); // Obtener el departamento del usuario
    const confirmation = confirm(`Are you sure you want to delete the policy? This action cannot be undone.`);
    
    if (confirmation) {
        fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}?userDepartment=${userDepartment}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Policy deleted successfully!');
            window.location.reload();
        })
        .catch(error => {
            showNotification('Failed to delete policy.', 'error');
        });
    }
}

function checkCompliance() {
    const userDepartment = localStorage.getItem('userDepartment');
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/check_compliance?userDepartment=${userDepartment}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                // Si data es un array, procesarlo como lista de políticas no conformes
                data.forEach(policy => {
                    if (policy.compliance_status === 'non-compliant') {
                        showNotification(`The policy ${policy.name} does not comply with regulations`, 'error');
                    }
                });
            } else if (data && typeof data === 'object') {
                // Si data es un objeto, manejarlo en consecuencia
                if (data.message === "All policies are compliant") {
                    showNotification('All policies are compliant.', 'success');
                } else {
                    console.error('Unexpected response structure:', data);
                    showNotification('Unexpected response structure. Please try again later.', 'error');
                }
            } else {
                console.error('Unexpected response type:', data);
                showNotification('Unexpected response format. Please try again later.', 'error');
            }
        })
        .catch(error => {
            console.error('Error checking compliance:', error.message);
            showNotification('Error checking compliance. Please try again later.', 'error');
        });
}

// Llamar a la función de verificación de cumplimiento al cargar la página
document.addEventListener('DOMContentLoaded', checkCompliance);

// Función para importar políticas predefinidas
document.getElementById('importPoliciesBtn').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        // Añadir el user_department al FormData
        const userDepartment = localStorage.getItem('userDepartment');
        formData.append('user_department', userDepartment);

        fetch('https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/import_policies', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showNotification('Policies imported successfully!');
            window.location.reload();
        })
        .catch(error => {
            showNotification('Error importing policies.', 'error');
        });
    }
});

// Función para generar reportes
document.getElementById('generateReportBtn').addEventListener('click', function () {
    // Suponiendo que el user_department está almacenado en localStorage o en el DOM
    const userDepartment = localStorage.getItem('department') || 'default_department';  // 'default_department' es un valor por defecto
    
    // Construye la URL con el parámetro user_department
    const url = `https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/generate_report?user_department=${encodeURIComponent(userDepartment)}`;
    
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error generating report.');
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `grc_report_${userDepartment}.pdf`;  // Nombre del archivo basado en el departamento
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        showNotification('Error generating report.', 'error');
        console.error(error);
    });
});

// Función para filtrar políticas
function filterPolicies() {
    const searchTerm = document.getElementById('policySearch').value.toLowerCase();
    const complianceFilter = document.getElementById('complianceFilter').value;
    const rows = document.querySelectorAll('#policiesTable tr');

    rows.forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        const description = row.children[2].textContent.toLowerCase();
        const category = row.children[3].textContent.toLowerCase();
        const complianceStatus = row.children[4].textContent;

        // Check if the search term matches any of the relevant fields
        const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm);
        
        // Check if the compliance status matches the selected filter
        const matchesFilter = complianceFilter === 'All' || complianceStatus === complianceFilter;

        // Show or hide the row based on the filtering criteria
        if (matchesSearch && matchesFilter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Add event listeners for search and filter inputs
document.getElementById('policySearch').addEventListener('input', filterPolicies);
document.getElementById('complianceFilter').addEventListener('change', filterPolicies);

// Paginación y lógica de visualización
let currentPage = 1;
const rowsPerPage = 10;

function displayPoliciesForPage(page) {
    const rows = document.querySelectorAll('#policiesTable tr');
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {
        if (index >= start && index < end) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    updatePaginationControls(page, Math.ceil(rows.length / rowsPerPage));
}

function updatePaginationControls(currentPage, totalPages) {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('btn', 'btn-secondary', 'm-1');
        if (i === currentPage) {
            pageButton.classList.add('btn-primary');
        }

        pageButton.addEventListener('click', () => {
            displayPoliciesForPage(i);
        });

        paginationControls.appendChild(pageButton);
    }
}

// Inicializar la paginación al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    displayPoliciesForPage(1);
});

const policyData = {
    complianceStatus: {
        compliant: 75,
        nonCompliant: 25
    },
    departmentDistribution: {
        'IT': 30,
        'HR': 20,
        'Finance': 25,
        'Operations': 15,
        'Legal': 10
    },
    regulationTypes: {
        'GDPR': 40,
        'HIPAA': 20,
        'SOX': 15,
        'PCI-DSS': 25
    },
    policyCreationTimeline: {
        'Jan': 5, 'Feb': 8, 'Mar': 12, 'Apr': 7, 'May': 10, 'Jun': 15
    },
    expirationReminder: {
        '30 days': 40,
        '60 days': 30,
        '90 days': 20,
        'No reminder': 10
    },
    policyComplexity: {
        'Low': 20,
        'Medium': 50,
        'High': 30
    }
};

// Compliance Status Chart
new Chart(document.getElementById('complianceStatusChart'), {
    type: 'pie',
    data: {
        labels: ['Compliant', 'Non-Compliant'],
        datasets: [{
            data: [policyData.complianceStatus.compliant, policyData.complianceStatus.nonCompliant],
            backgroundColor: ['#36a2eb', '#ff6384']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Compliance Status Distribution'
            }
        }
    }
});

// Department Distribution Chart
new Chart(document.getElementById('departmentDistributionChart'), {
    type: 'bar',
    data: {
        labels: Object.keys(policyData.departmentDistribution),
        datasets: [{
            label: 'Policies per Department',
            data: Object.values(policyData.departmentDistribution),
            backgroundColor: '#4bc0c0'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Policy Distribution by Department'
            }
        }
    }
});

// Regulation Type Chart
new Chart(document.getElementById('regulationTypeChart'), {
    type: 'doughnut',
    data: {
        labels: Object.keys(policyData.regulationTypes),
        datasets: [{
            data: Object.values(policyData.regulationTypes),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Regulation Type Distribution'
            }
        }
    }
});

// Policy Creation Timeline Chart
new Chart(document.getElementById('policyCreationTimelineChart'), {
    type: 'line',
    data: {
        labels: Object.keys(policyData.policyCreationTimeline),
        datasets: [{
            label: 'Policies Created',
            data: Object.values(policyData.policyCreationTimeline),
            borderColor: '#36a2eb',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Policy Creation Timeline'
            }
        }
    }
});

// Expiration Reminder Chart
new Chart(document.getElementById('expirationReminderChart'), {
    type: 'polarArea',
    data: {
        labels: Object.keys(policyData.expirationReminder),
        datasets: [{
            data: Object.values(policyData.expirationReminder),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Policy Expiration Reminder Distribution'
            }
        }
    }
});

// Policy Complexity Chart
new Chart(document.getElementById('policyComplexityChart'), {
    type: 'radar',
    data: {
        labels: Object.keys(policyData.policyComplexity),
        datasets: [{
            label: 'Policy Complexity',
            data: Object.values(policyData.policyComplexity),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Policy Complexity Distribution'
            }
        }
    }
});
