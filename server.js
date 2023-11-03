const express = require('express')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const port = 3002

const app = express()

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'https://astron.co.ua');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

app.use('/', async (req, res) => {
	try {
		const url = 
			'https://www.google.com/maps/place/"АСТРОН"+ПЕЧАТКИ+ШТАМПИ/@49.0609627,33.4066144,16z/data=!4m6!3m5!1s0x40d753261b91eb75:0x9e7824fc7654ecc1!8m2!3d49.0609409!4d33.4077034!16s%2Fg%2F1vc80b9l?hl=uk&entry=ttu&callback=processData'

		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		res.json({ message: 'Привет' });
	} catch (error) {
		console.error(error)
		res.status(500).send('Ошибка при выполнении запроса')
	}
})

app.listen(port, () => {
	console.log(`Прокси-сервер запущен на порту ${port}`)
})
