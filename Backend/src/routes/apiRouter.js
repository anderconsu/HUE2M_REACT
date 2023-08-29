import { Router } from "express";
import authMiddleware from "../Middleware/authMiddleware.js";


import getIngredientsData from "../controllers/api/edamam_getData.js";
import GptCall from "../controllers/api/openapi.js";
import translate from "../controllers/api/googleTranslate.js";
import GptTranslation from "../controllers/api/gptTranslateJson.js";



const apiRouter = Router();

apiRouter.get("/", (req, res) => {
    res.status(200).send("From here after there are api routes");
})



apiRouter.post("/gpt", authMiddleware, async (req, res) => {
    console.log("Gpt nutritional analisis started");
    if (req.query.message){
    let message = req.query.message;
    console.log("mensaje recibido: ", message);
    let response = await GptCall(message);
    res.json(response);
    }else{
        res.status(400).send("No query message");
    }
});
apiRouter.get("/translate", async (req, res) => {
    if (req.query.message){
    let message = req.query.message;
    if (!message){
        res.status(400).send("No query message");
    }
    let response = await translate(message);
    console.log("Google router response", response);
    if (response === "error"){
        res.status(400).send("error in google translation");
    }
    else{
        console.log("Respuesta: ", response);
        res.send(response);
    }}
});

apiRouter.get("/translategpt", async (req, res) => {
    console.log("Gpt translation selected");
    if (req.query.message){    
    let message = req.query.message;
    let response = await GptTranslation(message);
    if (response === "error"){
        res.status(400).send("error in gpt translation");
    }
    console.log("Respuesta: ", response);
    res.send(response);
    }else{
        res.status(400).send("No query message");
    }
});

apiRouter.get("/edamamdata", async (req, res) => {
    if (req.query.message){
    let message = req.query.message;
    console.log("ingredientes recividos: ", message);
    let response = await getIngredientsData(message);
    res.json(response);
    }else{
        res.status(400).send("No query message");
    }
})

export default apiRouter