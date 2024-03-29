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
const context = `
You only translate the word given to you from spanish to English. Respond only with the word you translated.
`



async function GptTranslation(message) {
    const messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": message},
    ];
    try {
        console.log("Gpt translation started, message: ", message);
        let respuesta = await openai.createChatCompletion({
            model: models[1],
            messages: messages,
            temperature: 0,
            max_tokens: 1000,
        });
        let text = respuesta.data.choices[0].message.content;
        return text;
    }catch (error) {
        console.log("!! GPT translation error: ", error);
        return "error";
    }
}

export default GptTranslation;
