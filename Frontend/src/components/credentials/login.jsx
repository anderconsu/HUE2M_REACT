import "../../config/firebase-config.js";
import { useEffect, useState, useContext } from "react";
import LoggedInContext from "../../context/loggedInContext";

import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const auth = getAuth();
auth.useDeviceLanguage();

const Login = () => {
    const [token, setToken] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
    const loginwithGoogle =  () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const resToken = credential.accessToken;

                console.log("access t ", resToken);
                // The signed-in user info.
                const user = result.user;
                // let tokenDes = await user.getIdTokenResult()
                let idToken = await user.getIdToken()
                localStorage.setItem("token", idToken)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    const logOut = () => {
        try {
            signOut(auth).then (
                console.log("user loged out")
            );
        } catch (error) {
            console.log("error loging out :", error);
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            try {
                if (user !== null) {
                console.log(user);
                user.getIdToken().then((idToken) => {
                    setToken(idToken);
                    console.log(idToken);
                });
                }
            } 
            catch (error) {
                console.log("error authstate :", error);
            }
        });
        }, []);
    return (
        <section>
            <p>Login</p>
            <div>
                <p onClick={loginwithGoogle}>Google</p>
                <p onClick={logOut}>Logout</p>
            </div>
        </section>
    );
};

export default Login;
