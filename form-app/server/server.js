const express = require('express');

// подключаю express
const app = express();
const port = 3000;

// подключаю парсер xml
xmlparser = require('express-xml-bodyparser');
app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());

// прописываю заголовки для корс
app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// метод post получаю данные с форнта, 
// проверяю их, отправляю соответствующий ответ
app.post('/login', function (req, res) {
  const user = req.body.user;
  if (user.login[0] === 'user' && user.password[0] === 'user') {
    res.send('<Status>success</Status>');
  } else {
    res.send('<Status>error</Status>');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})