import { Router } from "express";
import addUser from "../controllers/user/userController.js";

const userRouter = Router();
userRouter.get("/", (req, res) => {
    res.status(200).send("From here after there are user routes");
})

userRouter.post("/create", async (req, res) => {
    try{
        addUser(req, res);
    }
    catch(error){
        res.status(400).send(error);
    }
})
export default userRouter
