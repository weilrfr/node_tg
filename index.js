const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const cors = require('cors')

const token = '5982883388:AAEytNL3Zt39xPPXFBd4tL70-PIVGN3nZOQ'
const webAppUrl = 'https://react-telegram3.netlify.app/'

const bot = new TelegramBot(token, { polling: true });
const app = express()

app.use(express.json())
app.use(cors())

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

        await bot.sendMessage(chatId, "...", {
            reply_markup: {
                keyboard: [
                    [{text: "Заполнить форму", web_app: {url: webAppUrl + "/form"}}],
                    [{text: "Нажать на кнопку"}],
                    [{text: "Просто есть"}]
                ]
            }
        })  
    } else if (text === "Тест") {
        await bot.sendMessage(chatId, "Тест пройден", {
            reply_markup: {
                remove_keyboard: true
            }
        })
    }
    if (msg?.web_app_data?.data) {
        try {
           const data = JSON.parse(msg?.web_app_data?.data)
           console.log(data)
           await bot.sendMessage(chatId, "Спасибо за ваши данные")
           await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
           await bot.sendMessage(chatId, 'Ваш город: ' + data?.city)
           await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)

       }
       catch (e) {
           console.log(e)
       }
       
   }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products, totalPrice} = req.body
    try {
        await bot.answerWebAppQuery(queryId, {
            type: "article",
            id: queryId,
            title: "Спасибо за покупку",
            input_message_content: {message_text: `Поздравляю с покупкой, вы приобрели курсов на ${totalPrice}`}
        })
        return res.status(200).json({})
    } catch(e) {
        await bot.answerWebAppQuery(queryId, {
            type: "article",
            id: queryId,
            title: "Не удалось прриобрести товар",
            input_message_content: {message_text: "Не удалось прриобрести товар"}
        })
        return res.status(500).json({})
    }
    
})

const PORT = 8000
app.listen(PORT, () => console.log("app server was started on PORT " + PORT))



