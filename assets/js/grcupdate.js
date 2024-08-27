// Show notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('alert');
    notification.classList.add(type === 'error' ? 'alert-danger' : 'alert-success');
    notification.textContent = message;

    // Display notification in "Alerts" tab
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        alertsContainer.removeChild(notification);
    }, 3000);
}

// Load existing policies and handle adding new policy form
document.addEventListener('DOMContentLoaded', function () {
    const policiesTable = document.getElementById('policiesTable');

    // Fetch existing policies
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
                    <td><button class="btn btn-info btn-sm" onclick="readPolicy(${policy.id})"><i class="bi bi-eye"></i></button></td>
                    <td><button class="btn btn-primary btn-sm" onclick="editPolicy(${policy.id})"><i class="bi bi-pencil"></i></button></td>
                    <td><button class="btn btn-danger btn-sm" onclick="deletePolicy(${policy.id})"><i class="bi bi-trash"></i></button></td>
                `;
                policiesTable.appendChild(row);
            });
        });

    // Handle form submission for adding a new policy
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

// Function to read and display policy details in the modal
function readPolicy(policyId) {
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`)
        .then(response => response.json())
        .then(policy => {
            document.getElementById('modalPolicyName').value = policy.name;
            document.getElementById('modalPolicyDescription').value = policy.description;
            document.getElementById('modalPolicyRegulation').value = policy.regulation;
            document.getElementById('modalPolicyCompliance').value = policy.compliance_status;

            // Disable fields for read-only view
            document.getElementById('modalPolicyName').disabled = true;
            document.getElementById('modalPolicyDescription').disabled = true;
            document.getElementById('modalPolicyRegulation').disabled = true;
            document.getElementById('modalPolicyCompliance').disabled = true;

            // Hide the save button in read mode
            document.getElementById('editSaveBtn').hidden = true;

            // Show the modal
            const policyModal = new bootstrap.Modal(document.getElementById('policyModal'));
            policyModal.show();
        })
        .catch(error => {
            showNotification('Failed to load policy details.', 'error');
        });
}

// Function to open the modal in edit mode
function editPolicy(policyId) {
    fetch(`https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/policies/${policyId}`)
        .then(response => response.json())
        .then(policy => {
            document.getElementById('modalPolicyName').value = policy.name;
            document.getElementById('modalPolicyDescription').value = policy.description;
            document.getElementById('modalPolicyRegulation').value = policy.regulation;
            document.getElementById('modalPolicyCompliance').value = policy.compliance_status;

            // Enable fields for editing
            document.getElementById('modalPolicyName').disabled = false;
            document.getElementById('modalPolicyDescription').disabled = false;
            document.getElementById('modalPolicyRegulation').disabled = false;
            document.getElementById('modalPolicyCompliance').disabled = false;

            // Show the save button in edit mode
            document.getElementById('editSaveBtn').hidden = false;

            // Assign the save changes function to the button's onclick event
            document.getElementById('editSaveBtn').onclick = function () {
                savePolicyChanges(policyId);
            };

            // Show the modal
            const policyModal = new bootstrap.Modal(document.getElementById('policyModal'));
            policyModal.show();
        })
        .catch(error => {
            showNotification('Failed to load policy details.', 'error');
        });
}

// Function to save changes made in edit mode
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

// Function to delete a policy
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

// Import predefined policies based on regulations
document.getElementById('importPoliciesBtn').addEventListener('click', function () {
    fetch('https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/import_policies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Policies imported successfully!');
        window.location.reload();
    })
    .catch(error => {
        showNotification('Failed to import policies.', 'error');
    });
});

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

// Call compliance check on page load
document.addEventListener('DOMContentLoaded', checkCompliance);

document.getElementById('generateReportBtn').addEventListener('click', function () {
    fetch('https://backend-grcshield-dlkgkgiuwa-uc.a.run.app/api/grc/generate_report')
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'grc_report.pdf';  // Or .csv depending on the format
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        showNotification('Failed to generate the report.', 'error');
    });
});
