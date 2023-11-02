const express = require('express')
const port = 8080

const app = express()

// Добавьте заголовки CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://astron.co.ua')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)

    next()
})

app.use('/', (req, res) => {
    try {
			return {hello: 'world'}
        // Ваш код без Puppeteer, например, можно заменить его на заглушку
        // res.json({ data: "Здесь был код Puppeteer, но теперь его нет" });
    } catch (error) {
        console.error(error)
        res.status(500).send('Ошибка при выполнении запроса')
    }
})

app.listen(port, () => {
    console.log(`Прокси-сервер запущен на порту ${port}`)
})
