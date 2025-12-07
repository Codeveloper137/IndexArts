// js/registro.js - Lógica de Registro con Validaciones
'use strict';

// --- FUNCIONES AUXILIARES DE USABILIDAD ---

/** Muestra un mensaje de error en el campo específico y lo resalta. */
const mostrarErrorCampo = (campoId, mensaje) => {
    const input = document.getElementById(campoId);
    const small = document.getElementById(`error-${campoId}`);

    if (input) input.classList.add('input-error');
    if (small) {
        small.textContent = mensaje;
        small.classList.add('visible');
    }
};

/** Limpia todos los errores visuales del formulario. */
const limpiarErrores = () => {
    document.querySelectorAll('input, select').forEach(i => i.classList.remove('input-error'));
    document.querySelectorAll('.error-text').forEach(s => {
        s.textContent = '';
        s.classList.remove('visible');
    });
};

// --- FUNCIÓN DE VALIDACIÓN Y REGISTRO ---

document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    limpiarErrores();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const usuario = document.getElementById('regUsuario').value.trim();
    const password = document.getElementById('regPassword').value;

    let esValido = true;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validaciones de formato y obligatoriedad
    if (nombre.length < 3) { mostrarErrorCampo('nombre', 'El nombre debe tener mín. 3 caracteres.'); esValido = false; }
    if (apellido.length < 3) { mostrarErrorCampo('apellido', 'El apellido debe tener mín. 3 caracteres.'); esValido = false; }
    if (!cedula || cedula.length !== 8 || isNaN(cedula)) { mostrarErrorCampo('cedula', 'Debe ser una cédula válida de 8 dígitos.'); esValido = false; }
    if (!fechaNacimiento) { mostrarErrorCampo('fechaNacimiento', 'La fecha de nacimiento es obligatoria.'); esValido = false; }
    
    // Validación de usuario: longitud y unicidad
    if (usuario.length < 3) {
        mostrarErrorCampo('regUsuario', 'El usuario debe tener mín. 3 caracteres.');
        esValido = false;
    } else if (usuarios.some(u => u.usuario === usuario)) {
        mostrarErrorCampo('regUsuario', 'Este usuario ya existe.');
        esValido = false;
    }

    // Validación de contraseña: complejidad
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passRegex.test(password)) {
        mostrarErrorCampo('regPassword', 'Mín. 8 caracteres: letra, número y símbolo.');
        esValido = false;
    }

    // Si no es válido, detener el registro
    if (!esValido) {
        document.getElementById('globalMessage').textContent = 'Revise los campos con errores.';
        document.getElementById('globalMessage').className = 'message error';
        return;
    }

    // Lógica de registro (Guardar en localStorage)
    const nuevoUsuario = { nombre, apellido, cedula, fechaNacimiento, usuario, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mensaje de éxito y redirección
    const globalMsg = document.getElementById('globalMessage');
    globalMsg.textContent = '¡Registro exitoso! Redirigiendo a Login...';
    globalMsg.className = 'message success';
    this.reset(); 

    setTimeout(() => { window.location.href = 'login.html'; }, 2000);
});