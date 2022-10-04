const TelegramBot = require('node-telegram-bot-api');

const token = '5633382457:AAFH8Ds-8GkGn9R-gPx-xPkpyRdWb22ofHM'
const webAppUrl = '/'

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if(text === '/start') {
        // await bot.sendMessage(chatId, "Look at the buttons and forms, dumbells", {
        //     reply_markup: {
        //         inline_keyboard: [
        //             [{text: "Заполнить форму", web_app: {url: webAppUrl}}],
        //             [{text: "Нажать на кнопку", web_app: {url: webAppUrl}}],
        //             [{text: "Просто есть", web_app: {url: webAppUrl}}]
        //         ]
        //     }
        // })

        await bot.sendMessage(chatId, "Look at the buttons and forms, dumbells", {
            reply_markup: {
                keyboard: [
                    [{text: "Заполнить форму"}],
                    [{text: "Нажать на кнопку"}],
                    [{text: "Просто есть"}]
                ]
            }
        })
    }
});



