// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    if (type === 'error') {
        notification.classList.add('error');
    }
    notification.textContent = message;

    document.body.appendChild(notification);

    // Mostrar la notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        // Eliminar la notificación del DOM
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
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
                        <button class="btn btn-warning btn-sm" onclick="updatePolicy(${policy.id}, 'compliant')">Mark as Compliant</button>
                        <button class="btn btn-danger btn-sm" onclick="updatePolicy(${policy.id}, 'non-compliant')">Mark as Non-Compliant</button>
                    </td>
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
