const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://astron.co.ua');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/', async (req, res) => {
  try {
    const url = 'https://www.google.com/maps/place/"АСТРОН"+ПЕЧАТКИ+ШТАМПИ/@49.0609627,33.4066144,16z/data=!4m6!3m5!1s0x40d753261b91eb75:0x9e7824fc7654ecc1!8m2!3d49.0609409!4d33.4077034!16s%2Fg%2F1vc80b9l?hl=uk&entry=ttu';

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

app.listen(() => {
  console.log('Прокси-сервер запущен на порту по умолчанию');
});
