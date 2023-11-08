import { UsuarioService } from "../dao/db/usuario.service.js";
import { CarritoService } from "../dao/db/carrito.service.js";
import { sendGmail } from "../utils/notifications/EmailSender.js";
import { htmlNewUserTemplate } from "../utils/notifications/htmltemplates/NewUserCreatedTemplate.js";

const usuarioService = UsuarioService.getInstance();
const carritoService = CarritoService.getInstance();

    export async function logInView(req, res) {
    if (req.session.login) {
        res.redirect("/api/usuarios");
    } else {
        res.render("login", { status: false });
    }
    }

    // Genera una vista de registro o redirecciona a /api/usuarios
    export async function signUpView(req, res) {
    if (req.session.login) {
        res.redirect("/api/usuarios");
    } else {
        res.render("signup", { status: false });
    }
    }

    // Genera una vista de la home
    export async function homeView(req, res) {
    res.render("home", { status: req.session.login });
    }

    // Elimina la session y genera una vista de logOut
    export async function logOutView(req, res) {
    if (!req.session.login) {
        res.redirect("/api/usuario");
    } else {
        req.session.destroy((err) => {
        if (err) {
            res.json(err);
        } else {
            res.render("logout", { status: false });
        }
        });
    }
    }

    export async function signUpError(req, res) {
    res.render("signup-error");
    }

    export async function signInError(req, res) {
    res.render("login-error", { status: false });
    }

    export async function datosUsuario(req, res) {
    const userData = await usuarioService.deserializeUser(
        req.session.passport.user
    );
    if (!req.session.userData) {
        req.session.user = userData;
        req.session.login = true;
    }
    if (!req.session.contador) {
        req.session.contador = 0;
    }
    const createCart = await carritoService.create();

    req.session.cartId = createCart.id;
    req.session.contador++;

    res.render("datos", {
        status: req.session,
        user: req.session.user.username,
        contador: req.session.contador,
        userId: req.session.user._id,
    });
    }

    export async function userData(req, res) {
    res.render("userData", {
        email: req.session.user.email,
        username: req.session.user.username,
        direccion: req.session.user.direccion,
        edad: req.session.user.edad,
        tel: req.session.user.numeroTelefono,
        foto: req.session.user.foto,
        status: req.session.login,
    });
    }