//context import
import UserContext from "../../context/userContext";
import TokenContext from "../../context/token";
import LoggedInContext from "../../context/loggedInContext";
//React
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//Firebase
import "../../config/firebase-config.js";
import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const gitProvider = new GithubAuthProvider();
gitProvider.addScope("repo");

const auth = getAuth();
auth.useDeviceLanguage();

const Login = () => {
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
                if (errorCode === "auth/account-exists-with-different-credential") {
                    setFirebaseError("Este correo se registró con otro proveedor");
                }
                console.log("error en el login;", errorCode);
                console.log("error message:", errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    const loginWithGithub = () => {
        signInWithPopup(auth, gitProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log("github token:", token);

                // The signed-in user info.
                const user = result.user;
                console.log("github user:", user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error en el login;", errorCode);
                console.log("error message:", errorMessage);
                
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GithubAuthProvider.credentialFromError(error);
                // ...
            });
    };
    const logOut = () => {
        try {
            signOut(auth).then(console.log("user loged out"));
        } catch (error) {
            console.log("error loging out :", error);
        }
    };
    return (
        <section>
            <h2>LOGIN</h2>
            <article>
                <Link to="/login/email">Email</Link>
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

export default Login;
