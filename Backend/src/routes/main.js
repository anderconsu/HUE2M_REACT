import {Router} from "express";
import apiRouter from "./apiRouter.js";


const router = Router();


router.get("/", (req, res) => {
    res.send("Backend is running");
});


router.use("/api", apiRouter)





export default router