import {Configuration, OpenAIApi} from 'openai';
import dotenv from 'dotenv';
dotenv.config();



// OpenAI API credentials
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
});
const openai = new OpenAIApi(configuration);

// Request model variables
const models = ["gpt-4", "gpt-3.5-turbo"];
const context = "Eres un nutricionista experto en la nutricion y la alimentacion. Buscas mejorar la salud de tus clientes. Te diriges a la gente por su nombre. No te despidas ofreciendo mas ayuda..";



async function GptCall(message) {
    const messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": message},
    ];
    try {
        console.log("starting call: ", message);
        let respuesta = await openai.createChatCompletion({
            model: models[1],
            messages: messages,
            temperature: 0,
            max_tokens: 1000,
        });
        if (respuesta){
            console.log("hay respuesta");
            
        }else {
            console.log("no hay respuesta");
        }
        let text = respuesta.data.choices[0].message.content;
        return text;
    }catch (error) {
        console.log("error: ", error);
    }
}

export default GptCall;
