
import { getAuth, signInWithCredential, GoogleAuthProvider} from "firebase/auth";
import "../config/firebase-config.js"; 

const authMiddleware = async (req, res, next) => {
    try {
        console.log("auth entered");
        console.log("recieved auth:", req.headers.authorization);
        const token = req.headers.authorization;
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(token);
        await signInWithCredential(auth, credential).catch((error) => {
            // Handle Errors here.
            console.log("error en signInWithCredential", error);
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            res.status(401).send();
            });
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | "Unauthorized request" });
    }
}

export default authMiddleware