// Manejo del preloader
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
    });
});

// Función para mostrar el modal y redirigir solo cuando sea necesario
function showModalAndRedirect() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            window.location.href = "/pages-login.html";
        }, 3000); // Redirige después de 3 segundos
    } else {
        // Si no se encuentra el modal, redirigir inmediatamente
        window.location.href = "/pages-login.html";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let isAuthorized = false;
    const loginModal = document.getElementById('loginModal');

    // Ocultar el modal de login inicialmente
    if (loginModal) {
        loginModal.style.display = 'none';
    }

    function loadProfile() {
        // Intentar cargar datos del caché primero
        const cachedProfile = localStorage.getItem('userProfile');
        if (cachedProfile) {
            const profileData = JSON.parse(cachedProfile);
            updateProfileUI(profileData);
        }

        // Hacer la petición al servidor para obtener datos actualizados
        fetch('https://backendaporia-safetyshield-934866038204-934866038204.us-central1.run.app/api/get-profile', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            isAuthorized = true;
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Actualizar el caché con los nuevos datos
            localStorage.setItem('userProfile', JSON.stringify(data));
            
            // Actualizar la interfaz con los datos del perfil
            updateProfileUI(data);
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === 'Unauthorized') {
                isAuthorized = false;
                showModalAndRedirect();
            } else {
                console.error('Error loading profile:', error.message);
            }
        });
    }

    function updateProfileUI(data) {
        document.querySelectorAll('#fullName').forEach(el => el.textContent = data.fullName || '');
        document.querySelectorAll('#Job, .job-title').forEach(el => el.textContent = data.job || '');
        updateElementText('#company', data.company);
        updateElementText('#Country', data.country);
        updateElementText('#Address', data.address);
        updateElementText('#Phone', data.phone);
        updateElementText('#Email', data.email);
        updateElementText('#about', data.about);

        updateInputValue('#fullNameEdit', data.fullName);
        updateInputValue('#aboutEdit', data.about);
        updateInputValue('#companyEdit', data.company);
        updateInputValue('#JobEdit', data.job);
        updateInputValue('#CountryEdit', data.country);
        updateInputValue('#AddressEdit', data.address);
        updateInputValue('#PhoneEdit', data.phone);
        updateInputValue('#EmailEdit', data.email);
        updateInputValue('#LinkedinEdit', data.linkedin);

        // Verificar si hay una imagen de perfil o mostrar la predeterminada
        const defaultProfileImage = 'assets/img/default.png'; // Ruta de la imagen predeterminada
        const profileImageUrl = data.profileImageUrl || defaultProfileImage; // Usar imagen predeterminada si no hay

        updateProfileImages(profileImageUrl);

        if (data.linkedin) {
            updateLinkedInLink(data.linkedin);
        }
    }

    // Funciones auxiliares para actualizar elementos
    function updateElementText(selector, value) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.textContent = value || '');
    }

    function updateInputValue(selector, value) {
        const element = document.querySelector(selector);
        if (element) element.value = value || '';
    }

    function updateProfileImages(imageUrl) {
        document.querySelectorAll('#profileImage, #profileImageEdit, .profile-img').forEach(img => {
            if (img.src !== imageUrl) {
                img.src = imageUrl;
            }
        });
    }

    function updateLinkedInLink(linkedinUrl) {
        const linkedinLinks = document.querySelectorAll('#linkedinProfile, .linkedin-link');
        linkedinLinks.forEach(link => link.href = linkedinUrl);
    }

    function updateProfile(event) {
        event.preventDefault();
    
        // Obtener los valores de los campos
        const fullName = document.querySelector('#fullNameEdit').value;
        const email = document.querySelector('#EmailEdit').value;
        const company = document.querySelector('#companyEdit').value;
        const job = document.querySelector('#JobEdit').value;
        const country = document.querySelector('#CountryEdit').value;
        const address = document.querySelector('#AddressEdit').value;
        const phone = document.querySelector('#PhoneEdit').value;
        const linkedin = document.querySelector('#LinkedinEdit').value;
        const about = document.querySelector('#aboutEdit').value;
    
        // Validar campos obligatorios
        if (!fullName || !email || !company || !job || !country || !address || !phone) {
            alert('All required fields must be filled.');
            return;  // No proceder si faltan campos obligatorios
        }
    
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('company', company);
        formData.append('job', job);
        formData.append('country', country);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('linkedin', linkedin);
        formData.append('about', about);
    
        const profileImage = document.querySelector('#uploadImage').files[0];
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }
    
        fetch('https://backendaporia-safetyshield-934866038204-934866038204.us-central1.run.app/api/update-profile', {
            method: 'POST',
            body: formData,
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            alert('Profile updated successfully');
            // Actualizar el caché con los nuevos datos
            localStorage.setItem('userProfile', JSON.stringify(data));
            loadProfile();  // Recargar el perfil después de la actualización
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === 'Unauthorized') {
                showModalAndRedirect();
            } else {
                alert('An error occurred while updating the profile: ' + error.message);
            }
        });
    }
    
    // Cargar el perfil cuando se carga la página
    loadProfile();

    // Agregar el evento de envío al formulario de edición de perfil
    const profileForm = document.querySelector('#profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', updateProfile);
    }

    // Previsualización de la imagen de perfil
    const uploadImage = document.querySelector('#uploadImage');
    if (uploadImage) {
        uploadImage.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.querySelectorAll('#profileImageEdit, .profile-img').forEach(img => img.src = e.target.result);
                }
                reader.readAsDataURL(file);
            }
        });
    }
});

// Función de cierre de sesión actualizada
async function signOut(event) {
    event.preventDefault();

    try {
        const response = await fetch('https://backendaporia-safetyshield-934866038204-934866038204.us-central1.run.app/logout', {
            method: 'POST',
            credentials: 'include'
        }); 

        if (response.ok) {
            // Limpiar el caché al cerrar sesión
            localStorage.removeItem('userProfile');
            showModalAndRedirect();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout. Please try again.');
    }
}
