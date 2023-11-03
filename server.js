const express = require('express');
// const cheerio = require('cheerio'); // Закомментировать эту строку
// const puppeteer = require('puppeteer'); // Закомментировать эту строку
const port = 8080;

const app = express();

// Добавьте заголовки CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://astron.co.ua');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/', async (req, res) => {
  try {
    // Весь код, связанный с Puppeteer, закомментировать
    // ...

    // Отправляем JSON с надписью "Привет"
    res.json({ message: 'Привет' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при выполнении запроса');
  }
});

app.listen(port, () => {
  console.log(`Прокси-сервер запущен на порту ${port}`);
});
