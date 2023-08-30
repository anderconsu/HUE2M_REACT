import {Router} from "express";
import apiRouter from "./apiRouter.js";
import userRouter from "./userRouter.js";
const router = Router();


router.get("/", (req, res) => {
    res.status(200).send("Backend is running");
});
router.get("/check", (req, res) => {
    console.log("check");
    res.status(200).send("hola");
});
router.use("/user", userRouter);


router.use("/api", apiRouter)





export default router