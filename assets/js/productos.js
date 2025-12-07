// js/productos.js - Lógica central del Carrito
'use strict';

/**
 * Obtiene el carrito de compras desde localStorage.
 * @returns {Array} El carrito o un array vacío si no existe.
 */
const getCart = () => {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        console.error("Error al leer el carrito de localStorage:", e);
        return [];
    }
};

/**
 * Guarda el carrito de compras en localStorage y actualiza el contador.
 * @param {Array} cart - El array del carrito a guardar.
 */
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

/**
 * Actualiza el contador de ítems en el navbar.
 */
const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
};

/**
 * Añade un producto o servicio al carrito.
 * @param {number} productId - ID único del ítem (nuevo parámetro).
 * @param {string} name - Nombre del ítem.
 * @param {number} price - Precio unitario del ítem.
 */
window.addToCart = (productId, name, price) => { // <-- ¡Añadimos productId!
    const id = parseInt(productId);
    let cart = getCart();
    
    // 1. Buscar si el producto ya existe, buscando por ID, no por nombre
    const existingItem = cart.find(item => item.id === id); 

    if (existingItem) {
        // Si existe, aumentar la cantidad
        existingItem.quantity += 1;
    } else {
        // Si no existe, añadir el nuevo ítem, incluyendo el ID
        cart.push({ 
            id: id,            // <-- ¡Añadido el ID!
            name: name, 
            price: Number(price), 
            quantity: 1 
        });
    }
    
    saveCart(cart);
    alert(`"${name}" agregado al carrito (ID: ${id}).`);
};

// Inicializa el contador del carrito al cargar cualquier página que use este script.
document.addEventListener('DOMContentLoaded', updateCartCount);

