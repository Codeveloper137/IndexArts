'use strict';

// 1. Función para guardar el carrito en localStorage
const saveCart = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error("Error al guardar el carrito en localStorage:", e);
    }
};

// Función para obtener el carrito de localStorage
const getCart = () => {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        console.error("Error al leer el carrito de localStorage:", e);
        return [];
    }
};

const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// 2. Función para remover un ítem por su ID
const removeItemFromCart = (productId) => {
    const id = parseInt(productId);
    let cart = getCart();

    // Filtrar el carrito: conservar solo los ítems cuyo ID no coincida con el ID a eliminar
    const updatedCart = cart.filter(item => item.id !== id);

    saveCart(updatedCart);
    renderCart(); // Volver a renderizar la interfaz con el carrito actualizado
};


const renderCart = () => {
    const cart = getCart();
    const itemsContainer = document.getElementById('cart-items');
    const summaryContainer = document.getElementById('cart-summary');
    const checkoutButton = document.getElementById('checkout-button');

    // Limpiar contenedores
    if (itemsContainer) itemsContainer.innerHTML = '';
    if (summaryContainer) summaryContainer.innerHTML = '';

    if (cart.length === 0) {
        if (itemsContainer) itemsContainer.innerHTML = '<p class="message error text-center text-muted">Tu carrito está vacío. Añade servicios o productos para continuar.</p>';
        if (checkoutButton) checkoutButton.classList.add('disabled'); // Usamos Bootstrap class para deshabilitar
        return;
    }
    
    // 1. Renderizar ítems con el botón de eliminar
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'd-flex justify-content-between align-items-center mb-3 pb-3 border-bottom cart-item';
        itemElement.setAttribute('data-id', item.id);
        
        itemElement.innerHTML = `
            <div class="item-details">
                <span class="fw-medium">${item.name} (${item.quantity})</span>
                <span class="d-block text-muted small">$${(item.price * item.quantity).toFixed(2)} USD</span>
            </div>
            <button 
                class="btn btn-sm btn-outline-danger remove-item-btn" 
                data-id="${item.id}" 
                aria-label="Eliminar ítem ${item.name}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        if (itemsContainer) itemsContainer.appendChild(itemElement);
    });

    // 2. Renderizar resumen
    const subtotal = calculateTotal(cart);
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div class="d-flex justify-content-between summary-line"><span>Subtotal:</span><span>$${subtotal.toFixed(2)} USD</span></div>
            <h4 class="d-flex justify-content-between mb-0 pt-2 border-top mt-2 total-line"><span>Total a Pagar:</span><span>$${subtotal.toFixed(2)} USD</span></h4>
        `;
    }

    // 3. Mostrar botón de pago (y habilitar si hay ítems)
    if (checkoutButton) checkoutButton.classList.remove('disabled');

    // 4. Adjuntar listener de eventos a los botones de eliminar (después de que se renderizan)
    attachRemoveListeners();
};


// 3. Función para adjuntar listeners
const attachRemoveListeners = () => {
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
        // Asegurarse de no adjuntar el listener más de una vez
        button.removeEventListener('click', handleRemoveClick);
        button.addEventListener('click', handleRemoveClick);
    });
};

// Manejador de evento
const handleRemoveClick = (event) => {
    const button = event.currentTarget; // El botón en sí
    const productId = button.getAttribute('data-id');
    
    if (productId) {
        removeItemFromCart(productId);
    }
};


document.addEventListener('DOMContentLoaded', renderCart);