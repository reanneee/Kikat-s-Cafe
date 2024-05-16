document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.querySelector(".cart-items");
    const totalPrice = document.querySelector(".total-price");
    const cartDisplay = document.querySelector(".cart-display");
    const exitButton = document.querySelector(".exit-button");
    const navCartButton = document.querySelector(".nav-cart-button");
    const cartMessage = document.querySelector(".cart-message");
    const checkoutButton = document.querySelector(".checkout-button");

    let cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const product = this.parentElement;
            const title = product.querySelector("h3").textContent;
            let price = 0;
            let size = "";
            if (product.querySelector(".size")) {
                size = product.querySelector(".size").value;
                price = parseFloat(product.querySelector(`option[value="${size}"]`).getAttribute("data-price"));
            } else {
                price = parseFloat(product.querySelector("p").textContent.split("$")[1]);
            }
            const item = {
                title,
                price,
                size,
                quantity: 1
            };
            cartItems.push(item);
            updateCart();
            cartDisplay.style.display = "block"; // Show the cart display
            cartMessage.style.display = "none"; // Hide the cart message
        });
    });

    navCartButton.addEventListener("click", function() {
        if (cartItems.length > 0) {
            cartDisplay.style.display = "block";
            cartMessage.style.display = "none";
        } else {
            cartDisplay.style.display = "block";
            cartMessage.style.display = "block";
        }
    });

    exitButton.addEventListener("click", function() {
        cartDisplay.style.display = "none"; // Hide the cart display
        cartMessage.style.display = "none"; // Hide the cart message
    });

    checkoutButton.addEventListener("click", function() {
        alert("Your order has been confirmed.");
        cartItems = []; // Empty the cart
        updateCart(); // Update the cart display
        cartMessage.style.display = "block"; // Show the cart message
        totalPrice.textContent = "0.00 PHP"; // Set total price to 0 PHP
    });

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `${item.title} - ${item.size ? item.size + " " : ""}${item.price.toFixed(2)} x ${item.quantity} <button class="delete-item">Delete</button>`;
            li.querySelector(".delete-item").addEventListener("click", function() {
                cartItems = cartItems.filter(cartItem => cartItem !== item);
                updateCart();
            });
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });
        totalPrice.textContent = `${total.toFixed(2)}`;
    }
});

// Show all products by default
document.getElementById('productList').classList.add('showAll');
document.getElementById('allProducts').classList.add('active');

document.getElementById('allProducts').addEventListener('click', function() {
    document.getElementById('productList').classList.add('showAll');
    document.getElementById('productList').classList.remove('showInStock', 'showOutOfStock');
    document.getElementById('allProducts').classList.add('active');
    document.getElementById('inStock').classList.remove('active');
    document.getElementById('outOfStock').classList.remove('active');
});

document.getElementById('inStock').addEventListener('click', function() {
    document.getElementById('productList').classList.add('showInStock');
    document.getElementById('productList').classList.remove('showAll', 'showOutOfStock');
    document.getElementById('allProducts').classList.remove('active');
    document.getElementById('inStock').classList.add('active');
    document.getElementById('outOfStock').classList.remove('active');
});

document.getElementById('outOfStock').addEventListener('click', function() {
    document.getElementById('productList').classList.add('showOutOfStock');
    document.getElementById('productList').classList.remove('showAll', 'showInStock');
    document.getElementById('allProducts').classList.remove('active');
    document.getElementById('inStock').classList.remove('active');
    document.getElementById('outOfStock').classList.add('active');
});