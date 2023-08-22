//context import
import UserContext from "../../context/userContext";
import TokenContext from "../../context/token";
import LoggedInContext from "../../context/loggedInContext";
//React
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
//Firebase
import "../../config/firebase-config.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const gitProvider = new GithubAuthProvider();
gitProvider.addScope("repo");

const auth = getAuth();
auth.useDeviceLanguage();

const Register = () => {
    const Navigate = useNavigate();
    const { token, setToken } = useContext(TokenContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
    const { user, setUser } = useContext(UserContext);
    const [firebaseError, setFirebaseError] = useState("");

    const loginwithGoogle = (provider) => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                setUser(user);
                let idToken = await user.getIdToken();
                setToken(idToken);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .then(() => {
                Navigate("/");
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (
                    errorCode ===
                    "auth/account-exists-with-different-credential"
                ) {
                    setFirebaseError(
                        "Este correo se registró con otro proveedor"
                    );
                }else{
                    setFirebaseError(errorCode);
                }
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    return (
        <section className="register">
            <h3>Registro</h3>
            <article>
                <Link to="/register/email">Email</Link>
            </article>
            <article>
                <p
                    onClick={() => {
                        loginwithGoogle(provider);
                    }}
                >
                    Google
                </p>
            </article>
            <article>
                <p
                    onClick={() => {
                        loginwithGoogle(gitProvider);
                    }}
                >
                    Github
                </p>
            </article>
            {firebaseError && <p>{firebaseError}</p>}
        </section>
    );
};
export default Register;
