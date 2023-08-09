import { useState,useRef,useEffect } from "react";
import LoggedInContext from "../context/loggedInContext";
import UserContext from "../context/userContext";
import App from "../App.js";

// Firebase
import "../config/firebase-config.js";
import { getAuth} from "firebase/auth";
const auth = getAuth();
auth.useDeviceLanguage();


const Root = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            try {
                if (user !== null) {
                console.log("usuario general :", user);
                setUser(user);
                user.getIdToken().then((idToken) => {
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
        <LoggedInContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        <UserContext.Provider value={{user,setUser}}>
            <App/>
        </UserContext.Provider>
        </LoggedInContext.Provider>
    )
}

export default Root;
