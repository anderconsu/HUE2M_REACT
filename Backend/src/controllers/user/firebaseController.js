import "../../config/firebase-config.js";
import { getAuth } from "firebase-admin/auth";

const deleteFirebaseUser = async (req, res) => {
    try {
        const idToken = req.headers.authorization;
        let uid = "";
        await getAuth()
            .verifyIdToken(idToken)
            .then((decodedToken) => {
                uid = decodedToken.uid;
            })
            .catch((error) => {
                return { error: "Error obtaining uid" };
            });
        const result = await getAuth()
            .deleteUser(uid)
            .then(() => {
                console.log("Successfully deleted user");
                return true
            })
            .catch((error) => {
                console.log("Error deleting user:", error);
                return { error: error}
            });
        return result
    } catch (e) {
        console.log(e);
        return {
            error: "Error deleting user. User not deleted",
        }
    }
};

export default deleteFirebaseUser;