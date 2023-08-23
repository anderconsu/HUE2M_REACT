import { translate } from '@vitalets/google-translate-api';


const translation = async (text, lang = 'es') => {
    try {
        const response = await translate(text, { to: 'en', from: lang });
        return response.text; 
    } catch (error) {
        console.error('Translation error:', error);
        return "error";
    }
}

export default translation