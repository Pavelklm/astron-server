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
		await page.goto(url, { waitUntil: 'domcontentloaded' })

		// Ждем и кликаем на кнопку "Більше відгуків" с классом "M77dve" до тех пор, пока она не исчезнет
		let moreButton
		while ((moreButton = await page.$('.M77dve'))) {
			await moreButton.click()
			await page.waitForTimeout(900) // Ждем немного после клика
		}

		// // Используем evaluate для выполнения скрипта на странице
		const extractedData1 = await page.evaluate(() => {
			const elementsWithClass = document.querySelectorAll('.d4r55')
			const data = []

			elementsWithClass.forEach(element => {
				data.push(element.textContent)
			})

			return data
		})

		// Извлекаем массив с классом "rsqaWe"
		const extractedData2 = await page.evaluate(() => {
			const elementsWithClass = document.querySelectorAll('.rsqaWe')
			const data = []

			elementsWithClass.forEach(element => {
				data.push(element.textContent)
			})

			return data
		})

		// Извлекаем третий массив
		const extractedData3 = await page.evaluate(() => {
			const elementsWithClass = document.querySelectorAll('.MyEned')
			const data = []

			elementsWithClass.forEach(element => {
				data.push(element.textContent)
			})

			return data
		})

		await browser.close()

		// Отправляем все три массива данных на клиентскую сторону
		res.json({
			
				"data1": [
				"Diamond DMD",
				"Светлана Бакай",
				"Олена Болгар",
				"Татьяна Кириенко",
				"Мария Марагимова",
				"Анна Куликова",
				"Роман Баранец",
				"Виктория Полибенко",
				"Serega Gaidai",
				"Степан Шевчук"
				],
				"data2": [
				"2 місяці тому",
				"тиждень тому",
				"місяць тому",
				"2 місяці тому",
				"місяць тому",
				"місяць тому",
				"3 тижні тому",
				"2 місяці тому",
				"2 місяці тому",
				"2 місяці тому"
				],
				"data3": [
				"Изготавливают печати быстро, качественно, в том числе ремонтируют оснастку печатей. Обращался не один раз, все отлично. ",
				"Замовлення виконано дуже швидко та якісно. Обслуговування на висоті. Дякуємо! ",
				"Недощодавно замавила печатку в ТОВ компанія \"АСТРОН\". Якість надзвичайна, виконано швидко, рекомендую звертатись саме до цієї компанії . ",
				"Величезна подяка за чудове обслуговування та окрема подяка Євгену Коломойцеву за гарно виконану роботу. Дякую! ",
				"Дуже дякую за Вашу роботи. Швидко і якісно! ",
				"Дякую, за швидке та якісне виконання заказу! ",
				"Дякую за розуміння, зроблено швидко і якісно ",
				"Все чудово! Швидко, якісно! Дякую ",
				"Чудове, швидке виконання замовлення. ",
				"Все чудово, швидко та якісно! "
				]
				
		})


	} catch (error) {
		console.error(error)
		res.status(500).send('Ошибка при выполнении запроса')
	}
})

app.listen(port, () => {
	console.log(`Прокси-сервер запущен на порту ${port}`)
})
