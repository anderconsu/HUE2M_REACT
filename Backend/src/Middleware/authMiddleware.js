import "../config/firebase-config.js";
import { getAuth } from "firebase-admin/auth";

const authMiddleware = async (req, res, next) => {
    try {
        console.log("auth entered");
        const idToken = req.headers.authorization;
        let uid = ""

        await getAuth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                uid = decodedToken.uid;
                console.log("token valido");
            })
            .catch((error) => {
                res.status(401).send();
                // Handle error
                console.log("error en signInWithCredential", error);
            });
        await getAuth()
            .getUser(uid)
            .then((userRecord) => {
                let user = userRecord.toJSON()
              // See the UserRecord reference doc for the contents of userRecord.
                console.log(`Successfully fetched user data`);
                if (user.email === req.body.email) {
                    console.log("Authorized email");
                    next();
                }else{
                    res.status(401).json({ error: "Unauthorized request" });
                }
                
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error | "Unauthorized request" });
    }
};

export default authMiddleware;
