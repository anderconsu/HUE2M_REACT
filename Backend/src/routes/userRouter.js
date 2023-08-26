import { Router } from "express";
import userController from "../controllers/user/userController.js";

const userRouter = Router();
userRouter.get("/", (req, res) => {
    res.status(200).send("From here after there are user routes");
})

userRouter.post("/create", async (req, res) => {
    try{
        userController.addUser(req, res);
    }
    catch(error){
        res.status(400).send(error);
    }
})
userRouter.post("/get", async (req, res) => {
    try{
        userController.getUser(req, res);
    }
    catch(error){
        res.status(400).send(error);
    }
})
userRouter.post("/update", async (req, res) => {
    try{
        userController.updateUser(req, res);
    }
    catch(error){
        res.status(400).send(error);
    }
})
userRouter.delete("/delete", async (req, res) => {
    try{
        userController.deleteUser(req, res);
    }
    catch(error){
        res.status(400).send(error);
    }
})
export default userRouter
