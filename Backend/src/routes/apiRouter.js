import { Router } from "express";

import getIngredientsData from "../controllers/api/edamam_getData.js";
import GptCall from "../controllers/api/openapi.js";
import translate from "../controllers/api/googleTranslate.js";
import GptTranslation from "../controllers/api/gptTranslateJson.js";



const apiRouter = Router();

apiRouter.get("/", (req, res) => {
    res.status(200).send("From here after there are api routes");
})



apiRouter.get("/gpt", async (req, res) => {
    console.log("se ha llamado");
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
    console.log("mensaje a traducir recibido: ", message);
    let response = await translate(message);
    console.log("Respuesta: ", response);
    res.send(response);
    }else{
        res.status(400).send("No query message");
    }
});

apiRouter.get("/translategpt", async (req, res) => {
    if (req.query.message){    
    let message = req.query.message;
    console.log("mensaje recibido: ", message);
    let response = await GptTranslation(message);
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