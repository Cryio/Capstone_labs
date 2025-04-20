const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/Express_auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get('/signup', (req, res) => {
  res.render('signup', { message: null });
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('signup', { message: 'Please enter all fields.' });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.render('signup', { message: 'User already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  req.session.user = newUser;
  res.redirect('/protected');
});

app.get('/login', (req, res) => {
  res.render('login', { message: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render('login', { message: 'Invalid username or password.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render('login', { message: 'Invalid username or password.' });
  }
  req.session.user = user;
  res.redirect('/protected');
});

app.get('/protected', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const users = await User.find({});
  res.render('protected', { user: req.session.user, users });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
