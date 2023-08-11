// Components
import App from "../App.js";


import { useState,useRef,useEffect } from "react";
//context
import LoggedInContext from "../context/loggedInContext";
import UserContext from "../context/userContext";
import TokenContext from "../context/token";

// Firebase
import "../config/firebase-config.js";
import { getAuth} from "firebase/auth";
const auth = getAuth();
auth.useDeviceLanguage();


const Root = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            try {
                if (user !== null) {
                console.log("usuario general :", user);
                setUser(user);
                user.getIdToken().then((idToken) => {
                    setToken(idToken);
                });
                setIsLoggedIn(true);
                }
            } 
            catch (error) {
                console.log("error authstate :", error);
            }
        });
        }, []);
    return (
        <LoggedInContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        <UserContext.Provider value={{user,setUser}}>
        <TokenContext.Provider value={{token,setToken}}>
            <App/>
        </TokenContext.Provider>
        </UserContext.Provider>
        </LoggedInContext.Provider>
    )
}

export default Root;
