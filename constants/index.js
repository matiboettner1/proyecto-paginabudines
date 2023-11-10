const LOCAL_STORAGE_USERNAME = 'usuarios';

const refreshStorageList = (usuarios = []) => {
    localStorage.setItem(LOCAL_STORAGE_USERNAME, JSON.stringify(usuarios));
}

const recoverStorageList = () => {
    const recoverUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERNAME));
    if (recoverUsers) {
        return recoverUsers.map((e) => {
            return new User(e.userName, e.password);
        });
    }
}

let usuarios = recoverStorageList() || [];

const isUserExist = (usuarios = [], identificador = '') => {
    return usuarios.some((unUsuario) => unUsuario.userName === identificador.toLowerCase());
}

const getUser = (usuarios = [], identificador = '') => {
    return usuarios.find((unUsuario) => unUsuario.userName === identificador);
}

const USER_LOGGED_KEY = 'usuarioLogeado';

const registrarLogin = (unUsuario) => {
    sessionStorage.setItem(USER_LOGGED_KEY, JSON.stringify(unUsuario));
}

const recoverLoggedUser = () => {
    return JSON.parse(sessionStorage.getItem(USER_LOGGED_KEY)) || false;
}

const USER_LOGGED = recoverLoggedUser();

const isUserLogged = () => {
    return !!USER_LOGGED;
}

const showErrorMessages = (errorMessage, message) => {
    let messageContainer = document.getElementById('errorMessage');
    messageContainer.style.display = 'flex';
    messageContainer.innerHTML = `<h2>${message}<h2>`;
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 1500);
}

const showSuccessfulMessage = (successfulMessage, message) => {
    let messageContainer = document.getElementById('successfulMessage');
    messageContainer.style.display = 'flex';
    messageContainer.innerHTML = `<h2>${message}<h2>`;
}

const getImageName = (productName) => {
    return productName.toLowerCase().split(' ').join('-') + '.jpg';
}

const clearCart = () => {
    cart = [];
    showHTMLProducts();
    updateCartAndSave();
}

const productAddAlert = () => {
    Swal.fire({
        title: 'Añadido al carrito!',
        text: 'Producto agregado correctamente.',
        icon: 'success',
        confirmButtonText: 'Seguir comprando',
        footer: '<a href="../pages/carrito.html">Ir al carrito</a>',
        buttonsStyling: false
    })
}

const buyProductsAlert = () => {
    Swal.fire({
        title: 'Compra realizada!',
        text: 'La compra se realizo con exito.',
        icon: 'success',
        confirmButtonText: 'Finalizar',
        buttonsStyling: false
    })
}