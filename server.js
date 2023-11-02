const express = require('express');
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

// Новый маршрут, который возвращает JSON с надписью "Привет"
app.get('/', (req, res) => {
  res.json({ message: 'Привет' });
});

app.listen(port, () => {
  console.log(`Прокси-сервер запущен на порту ${port}`);
});
