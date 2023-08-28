import "../config/firebase-config.js";
import { getAuth } from "firebase-admin/auth";

const authMiddleware = async (req, res, next) => {
    try {
        console.log("auth entered");
        const idToken = req.headers.authorization;

        getAuth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                next();
            })
            .catch((error) => {
                res.status(401).send();
                // Handle error
                console.log("error en signInWithCredential", error);
            });
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | "Unauthorized request" });
    }
};

export default authMiddleware;
