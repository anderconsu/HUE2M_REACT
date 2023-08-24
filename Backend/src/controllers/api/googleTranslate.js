import { translate } from '@vitalets/google-translate-api';


const translation = async (text, lang = 'es') => {
    console.log("google translation started, message: ", text);
    try {
        const response = await translate(text, { to: 'en', from: lang });
        console.log("google translation response: ", response);
        return response.text; 
    } catch (error) {
        console.error('Translation error:', error);
        return "error";
    }
}

export default translation