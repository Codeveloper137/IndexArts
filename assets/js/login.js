// js/login.js - Lógica de Autenticación
'use strict';

const LOGIN_REDIRECT_URL = 'index.html';

/**
 * Maneja el login tradicional con usuario y contraseña.
 */
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const messageDiv = document.getElementById('loginMessage');
    const userVal = document.getElementById('usuario').value;
    const passVal = document.getElementById('password').value;
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioValido = usuarios.find(u => u.usuario === userVal && u.password === passVal);

    if (usuarioValido) {
        messageDiv.textContent = `¡Bienvenido, ${usuarioValido.nombre}! Acceso concedido.`;
        messageDiv.className = 'message success';
        
        // Redirigir a la página principal tras login
        setTimeout(() => { 
            window.location.href = LOGIN_REDIRECT_URL; 
        }, 1500);
    } else {
        messageDiv.textContent = 'Usuario o contraseña incorrectos. Inténtelo de nuevo.';
        messageDiv.className = 'message error';
    }
});

/**
 * Simula el login con redes sociales.
 * @param {string} red - Nombre de la red social.
 */
window.loginSocial = (red) => {
    const messageDiv = document.getElementById('loginMessage');
    
    messageDiv.textContent = `Conectando con ${red}...`;
    messageDiv.className = 'message';
    messageDiv.style.color = '#666';

    setTimeout(() => {
        messageDiv.textContent = `¡Has iniciado sesión con ${red}!`;
        messageDiv.className = 'message success';
        
        // Redirigir a la página principal tras login social
        setTimeout(() => { 
            window.location.href = LOGIN_REDIRECT_URL;
        }, 1500);
    }, 2000);
};