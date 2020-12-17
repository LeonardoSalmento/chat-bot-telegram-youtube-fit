import TelegramBot from 'node-telegram-bot-api';
import dialogflow from './dialogflow';
import youtube from './youtube';


const bot = new TelegramBot(process.env.TOKEN_API_BOT, { polling: true });

bot.on('message', async function (msg){
    const chatId = msg.chat.id;
    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    if (dfResponse.intent === 'Corpo'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.Corpo.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});