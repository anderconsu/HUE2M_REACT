import { useEffect, useState } from "react";
import "../../config/firebase-config.js";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

// regex
const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const EmailRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [firebaseError, setFirebaseError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const registerMail = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error en el registro;", errorCode);
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
        setErrorMessage("");
        if (!emailRegx.test(e.target.email.value)) {
            // if (errorMessage) {
            //     setErrorMessage(errorMessage + ", ");
            // }
            setErrorMessage("El correo electrónico no es válido");
        } else if (
            !e.target.email.value ||
            !e.target.password.value ||
            !e.target.repassword.value
        ) {
            setErrorMessage("Todos los campos son obligatorios");
        }

        if (errorMessage) {
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
        setErrorMessage("");
        let passError = [];
        if (password !== repassword) {
            passError.push("Las contraseñas no coinciden");
        }
        if (password.length < 6 && password) {
            passError.push("La contraseña debe tener al menos 6 caracteres");
        }
        if (passError) {
            setErrorMessage(passError);
        }
    }, [email, password, repassword]);
    return (
        <section className="register">
            <h1>Email Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="repassword">Repetir contraseña</label>
                <input
                    type="password"
                    name="repassword"
                    onChange={(e) => setRePassword(e.target.value)}
                />
                <button type="submit">Registrarse</button>
            </form>
            <section className="errors">
                {errorMessage &&
                    errorMessage.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                {firebaseError && <p>{firebaseError}</p>}
            </section>
        </section>
    );
};

export default EmailRegister;
