const TelegramBot = require('node-telegram-bot-api');

const token = '5633382457:AAFH8Ds-8GkGn9R-gPx-xPkpyRdWb22ofHM'
const webAppUrl = 'https://jocular-kitten-5df275.netlify.app'

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if(text === '/start') {
        await bot.sendMessage(chatId, "Хочу ваши данные", {
            reply_markup: {
                inline_keyboard: [
                    [{text: "Заполнить форму", web_app: {url: webAppUrl + '/form'}}],
                    [{text: "В разработке...", web_app: {url: webAppUrl}}]
                ]
            }
        })

        // await bot.sendMessage(chatId, "...", {
        //     reply_markup: {
        //         keyboard: [
        //             [{text: "Заполнить форму"}],
        //             [{text: "Нажать на кнопку"}],
        //             [{text: "Просто есть"}]
        //         ]
        //     }
        // })
    }
});



