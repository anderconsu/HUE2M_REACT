//context import 
import UserContext from "../../context/userContext";
import TokenContext from "../../context/token";
import LoggedInContext from "../../context/loggedInContext";
//React
import { useEffect, useState, useContext } from "react";
//Firebase
import "../../config/firebase-config.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const auth = getAuth();
auth.useDeviceLanguage();


const Header = () => {
    const {token, setToken} = useContext(TokenContext); 
    const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
    const { user, setUser } = useContext(UserContext);
    const loginwithGoogle =  () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                setUser(user);
                let idToken = await user.getIdToken()
                setToken(idToken)
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
    return (
        <section>
            <h2>LOGIN</h2>
            <article>
                <p onClick={loginwithGoogle}>Google</p>
            </article>
            <article>
                <p onClick={logOut}>Registro</p>
            </article> 
        </section>
    );
};

export default Header;
