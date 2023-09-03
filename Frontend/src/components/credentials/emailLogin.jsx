//scss
import "./scss/email.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../config/firebase-config.js";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

// regex
const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const EmailLogin = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firebaseError, setFirebaseError] = useState("");
    const loginMail = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .then(() => {
                Navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error en el login;", errorCode);
                console.log("error message:", errorMessage);
                if (errorCode === "auth/missing-password") {
                    setFirebaseError("Es necesario ingresar la contraseña");
                }
                if (
                    errorCode === "auth/user-not-found" ||
                    errorCode === "auth/wrong-password"
                ) {
                    setFirebaseError(
                        "El usuario o la contraseña no son correctos"
                    );
                }

                if (errorCode === "auth/invalid-email")
                {
                    setFirebaseError(
                        "Por favor, intruduce un email válido."
                    )
                }
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFirebaseError("");
        loginMail();
    };

    return (
        <section className="register">
            <h3>Inicia sesión con tu email</h3>
            <form onSubmit={handleSubmit} className="loginForm">
                <label htmlFor="emailLogin">Email</label>
                <input
                    type="text"
                    name="email"
                    id="emailLogin"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="passwordLogin">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    id="passwordLogin"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <section className="errors">
                {firebaseError && <p className="errorFirebase error">{firebaseError}</p>}
            </section>
        </section>
    );
};

export default EmailLogin;
