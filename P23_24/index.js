const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/set-cookies', (req, res) => {
  const { name, age } = req.body;
  const maxAge = 1000;

  if (name && age) {
    res.cookie('name', name, { maxAge });
    res.cookie('age', age, { maxAge });
    res.cookie('maxAge', maxAge, { maxAge });
  }

  res.redirect('/show-cookies');
});

app.get('/show-cookies', (req, res) => {
  const maxAge = req.cookies.maxAge ? `${req.cookies.maxAge / 1000} seconds` : 'Not Set';
  res.render('show', { 
    name: req.cookies.name || 'Not Set', 
    age: req.cookies.age || 'Not Set',
    maxAge 
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
