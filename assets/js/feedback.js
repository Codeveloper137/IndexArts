// js/feedback.js - Lógica de Calificación/Feedback
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const selectedRating = document.getElementById('selected-rating');

    // Manejo visual de las estrellas al hacer clic
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            selectedRating.value = value;
            
            // Colorear estrellas
            stars.forEach(s => {
                const sValue = parseInt(s.getAttribute('data-value'));
                s.classList.toggle('fa-solid', sValue <= value);
                s.classList.toggle('fa-regular', sValue > value);
                s.classList.toggle('gold', sValue <= value);
            });
        });
    });
});

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rating = document.getElementById('selected-rating').value;
    const messageDiv = document.getElementById('feedbackMessage');
    
    if (rating === "0") {
        messageDiv.textContent = 'Por favor, selecciona al menos una estrella para calificar.';
        messageDiv.className = 'message error';
        return;
    }
    
    // 1. Simulación de envío
    messageDiv.textContent = `Enviando calificación de ${rating} estrellas...`;
    messageDiv.className = 'message';
    messageDiv.style.color = '#666';

    // 2. Simulación: El feedback se guarda y el proceso finaliza.
    setTimeout(() => {
        messageDiv.textContent = '¡Gracias por tu valioso feedback! Hemos terminado.';
        messageDiv.className = 'message success';
        this.reset();
        
        // Finaliza el flujo BPMN - Redirigir al inicio
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirección al nuevo inicio
        }, 2500);
        
    }, 1500);
});