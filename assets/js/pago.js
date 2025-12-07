// js/pago.js - Lógica de Simulación de Pago
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el total al cargar la página
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const pagoTotalElement = document.getElementById('pago-total');
    
    if (pagoTotalElement) {
        pagoTotalElement.textContent = `$${total.toFixed(2)} USD`;
    }
});

/**
 * Simula el proceso de pago con diferentes métodos.
 * @param {string} metodo - Método de pago seleccionado (Tarjeta, PSE, Otros).
 */
window.simularPago = (metodo) => {
    const messageDiv = document.getElementById('payment-message');
    
    // 1. Iniciar simulación de carga
    messageDiv.textContent = `Procesando pago con ${metodo}...`;
    messageDiv.className = 'message';
    messageDiv.style.color = '#666';

    // 2. Simulación de tiempo de proceso y resultado
    setTimeout(() => {
        const pagoExitoso = Math.random() < 0.8; // 80% de éxito

        if (pagoExitoso) {
            messageDiv.textContent = '¡Pago realizado con éxito! Agendando servicio...';
            messageDiv.className = 'message success';
            localStorage.removeItem('cart'); // Limpiar carrito

            // REDIRECCIÓN AL PASO DE CALIFICACIÓN/FEEDBACK (Flujo BPMN)
            setTimeout(() => {
                alert("Servicio Agendado. Revisa tu correo para la Cita/Envío inmediata.");
                window.location.href = 'feedback.html'; 
            }, 2000);

        } else {
            // PROCESO ABORTADO (Flujo BPMN)
            messageDiv.textContent = 'Pago Abortado. Ha ocurrido un error con la pasarela. Intente de nuevo.';
            messageDiv.className = 'message error';
        }
    }, 2500);
};