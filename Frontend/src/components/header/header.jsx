//context import 
import UserContext from "../../context/userContext";
import TokenContext from "../../context/token";
import LoggedInContext from "../../context/loggedInContext";

import "./header.scss";
import "../../config/firebase-config.js";
import { useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";


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
        <header>
            <picture className="logo">
                <img
                    src="images/Green_Line_Branch_Organic_Nature_Logo.png"
                    alt="logo"
                />
            </picture>
            <h1>HUE2M</h1>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Registro</Link>
            </nav>
        </header>
    );
};

export default Header;
