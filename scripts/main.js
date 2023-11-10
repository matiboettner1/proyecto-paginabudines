const cartProducts = document.getElementById('cart-products');

let cart = [];

const totalPrice = document.getElementById('totalPrice');
const totalPriceWShipment = document.getElementById('totalPriceWShipment');
const addButton = document.querySelectorAll('.add-button');

const showHTMLProducts = () => {
    if (cartProducts) {
        cartProducts.innerHTML = '';
    }

    let total = 0;

    cart.forEach((product) => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
                <img src="../media/img/${getImageName(product.name)}">
                <div class="product-name">
                    <h4>Producto</h4>
                    <p>${product.name}</p>
                </div>
                <div class="product-quantity">
                    <h4>Cantidad</h4>
                    <div class="quantity-control">
                        <button class="decrement-button">-</button>
                        <p>${product.quantity}</p>
                        <button class="increment-button">+</button>
                    </div>
                </div>
                <div class="product-price">
                    <h4>Precio</h4>
                    <p>${product.price}</p>
                </div>
                <button class="delete-button">X</button>
            `;

        if (cartProducts) {
            cartProducts.appendChild(containerProduct);
        }

        const decreaseButton = containerProduct.querySelector('.decrement-button');
        const increaseButton = containerProduct.querySelector('.increment-button');
        const quantityDisplay = containerProduct.querySelector('.product-quantity p');

        decreaseButton.addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
                quantityDisplay.innerText = product.quantity;
                updateCartAndSave();
            }
        });

        increaseButton.addEventListener('click', () => {
            product.quantity++;
            quantityDisplay.innerText = product.quantity;
            updateCartAndSave();
        });

        total += product.quantity * parseInt(product.price.slice(1));
    });

    if (totalPrice) {
        totalPrice.innerText = `${total}`;
    }

    if (totalPriceWShipment) {
        totalPriceWShipment.innerText = `${total + 500}`;
    }
};


const productsList = document.querySelectorAll('.productos-container');
productsList.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-button')) {
            if (!isUserLogged()) {
                window.location.href = './login-usuario.html';
                return;
            }
            const product = e.target.parentElement.parentElement;
            const infoProduct = {
                name: product.querySelector('.product-info h2').textContent,
                quantity: 1,
                price: product.querySelector('.product-info p').textContent,
            };

            const isProductExist = cart.some((product) => product.name === infoProduct.name);
            if (isProductExist) {
                const products = cart.map((product) => {
                    if (product.name === infoProduct.name) {
                        product.quantity++;
                        return product;
                    } else {
                        return product;
                    }
                });
                cart = [...products];
                console.log(cart);
            } else {
                cart = [...cart, infoProduct];
                console.log(cart);
            }
        }
        productAddAlert();
        showHTMLProducts();
        updateCartAndSave();
    });
});

if (cartProducts) {
    cartProducts.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            const product = e.target.parentElement;
            const name = product.querySelector('.product-name p').textContent;

            cart = cart.filter(product => product.name !== name);
            showHTMLProducts();
            updateCartAndSave();
        }
    });
}

const saveCartToSessionStorage = () => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
};

const getCartFromSessionStorage = () => {
    const cartFromStorage = sessionStorage.getItem('cart');
    if (cartFromStorage) {
        cart = JSON.parse(cartFromStorage);
        showHTMLProducts();
    }
};

window.addEventListener('load', getCartFromSessionStorage);

const updateCartAndSave = () => {
    showHTMLProducts();
    saveCartToSessionStorage();
};

const buyButton = document.querySelector('.botoncomprar-container-carrito');
buyButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-comprar-carrito')) {
        buyProductsAlert();
        clearCart();
    }
})


