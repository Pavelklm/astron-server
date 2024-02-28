const express = require('express');
const puppeteer = require('puppeteer');
const port = 5001;

const app = express();

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://astron.co.ua');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/', async (req, res) => {
  try {
    const url = '';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Ждем и кликаем на кнопку "Більше відгуків" с классом "M77dve" до тех пор, пока она не исчезнет
    let moreButton;
    while ((moreButton = await page.$('.M77dve'))) {
      await moreButton.click();
      await page.waitForTimeout(900); // Ждем немного после клика
    }

    // Используем evaluate для выполнения скрипта на странице
    const extractedData1 = await page.evaluate(() => {
      const elementsWithClass = document.querySelectorAll('.d4r55');
      return Array.from(elementsWithClass, element => element.textContent);
    });

    // Извлекаем массив с классом "rsqaWe"
    const extractedData2 = await page.evaluate(() => {
      const elementsWithClass = document.querySelectorAll('.rsqaWe');
      return Array.from(elementsWithClass, element => element.textContent);
    });

    // Извлекаем третий массив
    const extractedData3 = await page.evaluate(() => {
      const elementsWithClass = document.querySelectorAll('.MyEned');
      return Array.from(elementsWithClass, element => element.textContent);
    });

    await browser.close();

    // Отправляем все три массива данных на клиентскую сторону
    res.json({
      data1: extractedData1,
      data2: extractedData2,
      data3: extractedData3
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при выполнении запроса');
  }
});

app.listen(port, () => {
  console.log(`Прокси-сервер запущен на порту ${port}`);
});
