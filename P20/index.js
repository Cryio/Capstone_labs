const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello World!' });
});

app.get('/about', (req, res) => {
  res.render('about', { message: 'About page' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
