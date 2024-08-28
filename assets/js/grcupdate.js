// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('alert');
    notification.classList.add(type === 'error' ? 'alert-danger' : 'alert-success');
    notification.classList.add('alert-dismissible'); // Para permitir el cierre
    notification.setAttribute('role', 'alert');
    
    // Añadir el botón de cierre (X)
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.onclick = function() {
        notification.remove();
    };

    notification.textContent = message;
    notification.appendChild(closeButton); // Agregar el botón de cierre a la alerta

    // Mostrar la notificación en la pestaña "Alerts"
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.appendChild(notification);
}


// Cargar políticas y manejar formulario de agregar política
document.addEventListener('DOMContentLoaded', function () {
    const policiesTable = document.getElementById('policiesTable');

    // Cargar políticas existentes
    fetch('https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies')
        .then(response => response.json())
        .then(data => {
            data.forEach(policy => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${policy.id}</td>
                    <td>${policy.name}</td>
                    <td>${policy.description}</td>
                    <td>${policy.regulation}</td>
                    <td>${policy.compliance_status}</td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" onclick="updatePolicy(${policy.id}, 'Compliant')"> Compliant</button>
                        <button class="btn btn-outline-primary btn-sm" style="color:red;" onclick="updatePolicy(${policy.id}, 'Non-compliant')"> Non-Compliant</button>
                    </td>
                    <td><button class="btn btn-info btn-sm" onclick="readPolicy(${policy.id})"><i class="bi bi-eye"></i></button></td>
                    <td><button class="btn btn-primary btn-sm" onclick="editPolicy(${policy.id})"><i class="bi bi-pencil"></i></button></td>
                    <td><button class="btn btn-danger btn-sm" onclick="deletePolicy(${policy.id})"><i class="bi bi-trash"></i></button></td>
                `;
                policiesTable.appendChild(row);
            });
        });

    // Manejar el envío del formulario para agregar una nueva política
    document.getElementById('addPolicyForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const newPolicy = {
            name: document.getElementById('policyName').value,
            description: document.getElementById('policyDescription').value,
            regulation: document.getElementById('policyRegulation').value,
            compliance_status: document.getElementById('policyCompliance').value
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
            window.location.reload();
        })
        .catch(error => {
            showNotification('Failed to add policy.', 'error');
        });
    });
});

// Función para actualizar el estado de cumplimiento de una política
function updatePolicy(policyId, status) {
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ compliance_status: status })
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

// Función para leer una política (usando el modal)
function readPolicy(policyId) {
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`)
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
            document.getElementById('editSaveBtn').hidden = true;

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
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`)
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
            document.getElementById('editSaveBtn').hidden = false;

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
    const updatedPolicy = {
        name: document.getElementById('modalPolicyName').value,
        description: document.getElementById('modalPolicyDescription').value,
        regulation: document.getElementById('modalPolicyRegulation').value,
        compliance_status: document.getElementById('modalPolicyCompliance').value,
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
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`, {
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

// Importar políticas predefinidas basadas en regulaciones
document.getElementById('importPoliciesBtn').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

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

// Verificar cumplimiento
function checkCompliance() {
    fetch('https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies')
        .then(response => response.json())
        .then(data => {
            data.forEach(policy => {
                if (policy.compliance_status === 'non-compliant') {
                    showNotification(`The policy ${policy.name} does not comply with regulations`, 'error');
                }
            });
        })
        .catch(error => {
            console.error('Error checking compliance:', error);
        });
}

// Llamar a la función de verificación de cumplimiento al cargar la página
document.addEventListener('DOMContentLoaded', checkCompliance);

document.getElementById('generateReportBtn').addEventListener('click', function () {
    fetch('https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/generate_report')
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'grc_report.pdf';  // O .csv dependiendo del formato
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        showNotification('Error generating report.', 'error');
    });
});

// Function to filter policies
function filterPolicies() {
    const searchTerm = document.getElementById('policySearch').value.toLowerCase();
    const complianceFilter = document.getElementById('complianceFilter').value;
    const rows = document.querySelectorAll('#policiesTable tr');

    rows.forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        const complianceStatus = row.children[4].textContent;

        const matchesSearch = name.includes(searchTerm);
        const matchesFilter = complianceFilter === 'All' || complianceStatus === complianceFilter;

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


// Pagination and display logic
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

// Initialize pagination on page load
document.addEventListener('DOMContentLoaded', function () {
    displayPoliciesForPage(1);
});
