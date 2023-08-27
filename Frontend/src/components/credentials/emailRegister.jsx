//scss
import "./scss/email.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../config/firebase-config.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
const auth = getAuth();

// regex
const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const EmailRegister = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [firebaseError, setFirebaseError] = useState("");
    const [submitError, setSubmitError] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);
    const registerMail = async () => {
        let user = null;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                user = userCredential.user;
                updateProfile(user, { displayName: name.toString() });
                // ...
            })
            .then(() => {
                Navigate("/profile");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error en el registro;", errorCode);
                console.log("error message:", errorMessage);
                if (errorCode === "auth/email-already-in-use") {
                    setFirebaseError("El correo electrónico ya está en uso");
                }
                if (errorCode === "auth/invalid-email") {
                    setFirebaseError("El correo electrónico no es válido");
                }
                if (errorCode === "auth/weak-password") {
                    setFirebaseError(
                        "La contraseña debe tener al menos 6 caracteres"
                    );
                }
                // ..
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let passError = [];
        if (!emailRegx.test(e.target.email.value)) {
            passError.push("El correo electrónico no es válido");
        }
        if (
            !e.target.email.value ||
            !e.target.password.value ||
            !e.target.repassword.value
        ) {
            passError.push("Todos los campos son obligatorios");
        }
        if (passError) {
            setSubmitError(passError);
        }

        if (passError.length > 0) {
            return;
        }
        let formPassword = e.target.password.value;
        let formRepassword = e.target.repassword.value;
        if (formPassword !== formRepassword) {
            return alert("Las contraseñas no coinciden");
        }
        registerMail();
    };

    useEffect(() => {
        let passError = [];
        if (password !== repassword) {
            passError.push("Las contraseñas no coinciden");
        }
        if (password.length < 6 && password) {
            passError.push("La contraseña debe tener al menos 6 caracteres");
        }
        setErrorMessage(passError);
    }, [email, password, repassword]);
    return (
        <section className="register">
            <h3>Registra tu email</h3>
            <form onSubmit={handleSubmit} className="registerForm">
                <div>
                    <label htmlFor="emailRegister">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="emailRegister"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nameRegister">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="nameRegister"
                        maxLength={30}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="passwordRegister">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="passwordRegister"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="repasswordRegister">
                        Repetir contraseña
                    </label>
                    <input
                        type="password"
                        name="repassword"
                        id="repasswordRegister"
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <section className="errors">
                {errorMessage &&
                    errorMessage.map((error, index) => (
                        <p key={index} className="error">{error}</p>
                    ))}
                {submitError &&
                    submitError.map((error, index) => (
                        <p className="error" key={index}>{error}</p>
                    ))}
                {firebaseError && <p className="errorFirebase error">{firebaseError}</p>}
            </section>
        </section>
    );
};

export default EmailRegister;
