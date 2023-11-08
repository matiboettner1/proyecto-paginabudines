const miFormulario = document.getElementById('loginForm');
miFormulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let userName = document.getElementById('nombreUsuario').value;
    let password = document.getElementById('contrasenia').value;

    if(!validarFormulario(userName, password)) {
        return false;
    }
    
    const unUsuario = getUser(usuarios, userName);
    if(!unUsuario) {
        showErrorMessages(errorMessage, message = 'El usuario o contraseña ingresados no existe.');
        return false;
    }

    if (!unUsuario.isPassword(password)) {
        showErrorMessages(errorMessage, message = 'El usuario o contraseña ingresados no existe.');
        return false;
    }

    unUsuario.isLogged = true;
    registrarLogin(unUsuario);
    showSuccessfulMessage(successfulMessage, message = 'Inicio de sesion exitoso.');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1200);
});

const validarFormulario = (userName, password) => {
    
    if (userName.length == 0) {
        showErrorMessages(errorMessage, message = 'Debes completar todos los campos.');
        return false;
      }
    
      if (password.length == 0) {
        showErrorMessages(errorMessage, message = 'Debes completar todos los campos.');
        return false;
      }
    
    return true;
}

window.onload = () => {
    const panelUsuario = document.getElementById('panel-usuario');
    const nombreUsuario = document.getElementById('nombre-usuario');
    const userPassword = document.getElementById('contrasenia-usuario');

    if (isUserLogged()) {
        const loggedUser = recoverLoggedUser();
        nombreUsuario.innerText = loggedUser.userName;
        userPassword.innerText = loggedUser.password;
        panelUsuario.style.display = 'flex';
        miFormulario.style.display = 'none';
    }
};

const buttonLogOut = document.getElementById('boton-cerrar-sesion')
buttonLogOut.addEventListener('click', () => {
    cerrarSesion();
});

const cerrarSesion = () => {
    sessionStorage.removeItem(USER_LOGGED_KEY);
    location.reload();
}