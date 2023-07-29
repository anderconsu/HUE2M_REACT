import { translate } from '@vitalets/google-translate-api';

const text = await translate('Hola, que tal?', { to: 'en', from:'es' });

console.log(text) // => 'Hello World! How are you?'