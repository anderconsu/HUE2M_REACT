//context import 
import UserContext from "../../context/userContext";
import LoggedInContext from "../../context/loggedInContext";
// Scss
import "./header.scss";

// React
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
// Firebase
import "../../config/firebase-config.js";
import { getAuth,  signOut, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const auth = getAuth();
auth.useDeviceLanguage();


const Header = () => {
    const Navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
    const { user } = useContext(UserContext);

    const toRoot = () => {
        Navigate("/");
    }
    const logOut = () => {
        try {
            localStorage.clear();
            signOut(auth).then (
                setIsLoggedIn(false)
                ).then (
                    console.log("user loged out")
                ).then (
                    Navigate("/")
                );
        } catch (error) {
            console.log("error loging out :", error);
        }
    }

    return (
        <header>
            <picture className="logo" onClick={toRoot}>
                <img
                    src="images/Green_Line_Branch_Organic_Nature_Logo.png"
                    alt="logo"
                />
            </picture>
            <h1 onClick={toRoot}>HUE2M</h1>
            {isLoggedIn === true ? (
                <nav>
                    <Link to ="/profile">{user.displayName}</Link>
                    <p onClick={logOut}>Cerrar sesión</p>
                </nav>
                
            ) : (
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registro</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
