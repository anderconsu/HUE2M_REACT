import { translate } from '@vitalets/google-translate-api';


const translation = async (text, lang = 'es') => {
    console.log("Google translation started, message: ", text);
    try {
        const response = await translate(text, { to: 'en', from: lang });
        return response.text; 
    } catch (error) {
        if(error.name === 'TooManyRequestsError'){
            console.log("!! Google: too many requests");
        }else{
            console.error('!! Translation error:', error);
        }
        return "error";
    }
}

export default translation