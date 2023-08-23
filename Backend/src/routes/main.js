import {Router} from "express";
import apiRouter from "./apiRouter.js";
import userRouter from "./userRouter.js";
const router = Router();


router.get("/", (req, res) => {
    res.status(200).send("Backend is running");
});
router.use("/user", userRouter);


router.use("/api", apiRouter)





export default router