// Components
import App from "../App.js";


import { useState,useEffect } from "react";
//context
import LoggedInContext from "../context/loggedInContext";
import UserContext from "../context/userContext";
import TokenContext from "../context/token";
import IsDataContext from "../context/isData";

// Firebase
import "../config/firebase-config.js";
import { getAuth} from "firebase/auth";
const auth = getAuth();
auth.useDeviceLanguage();


// TODO : fetch backend before anything else

const Root = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [isData, setIsData] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            try {
                if (user !== null) {
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
        <IsDataContext.Provider value={{isData,setIsData}}>
        <UserContext.Provider value={{user,setUser}}>
        <TokenContext.Provider value={{token,setToken}}>
            <App/>
        </TokenContext.Provider>
        </UserContext.Provider>
        </IsDataContext.Provider>
        </LoggedInContext.Provider>
    )
}

export default Root;
