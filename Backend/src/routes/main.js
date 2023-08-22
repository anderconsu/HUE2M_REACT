import {Router} from "express";
import apiRouter from "./apiRouter.js";
import addUser from "../controllers/user/userController.js";

const router = Router();


router.get("/", (req, res) => {
    res.send("Backend is running");
});
router.use("/user", (req, res) => {
    addUser()
    res.send("user added");
})


router.use("/api", apiRouter)





export default router