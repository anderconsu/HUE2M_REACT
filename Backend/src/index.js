import express from "express";

import cors from "cors";
import GptCall from "./openapi.js";
import translate from "./googleTranslate.js";
import GptTranslation from "./gptTranslateJson.js";
import getIngredientsData from "./edamam_getData.js";

const app = express();
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
    console.log(req.query.message);
});

app.get("/gpt", async (req, res) => {
    let message = req.query.message;
    console.log("mensaje recibido: ", message);
    let response = await GptCall(message);
    console.log("Respuesta: ", response);
    res.send(response);
});
app.get("/translate", async (req, res) => {
    let message = req.query.message;
    console.log("mensaje a traducir recibido: ", message);
    let response = await translate(message);
    console.log("Respuesta: ", response);
    res.send(response);
});

app.get("/translategpt", async (req, res) => {
    let message = req.query.message;
    console.log("mensaje recibido: ", message);
    let response = await GptTranslation(message);
    console.log("Respuesta: ", response);
    res.send(response);
});

app.get("/edamamdata", async (req, res) => {
    let message = req.query.message;
    console.log("ingredientes recividos: ", message);
    let response = await getIngredientsData(message);
    res.json(response);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
