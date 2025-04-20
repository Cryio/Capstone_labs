const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
}));

const Users = [];

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const { id, password } = req.body;
    
    if (!id || !password) {
        return res.status(400).send("Invalid details!");
    }
    
    const existingUser = Users.find(user => user.id === id);
    if (existingUser) {
        return res.render('signup', { message: "User Already Exists! Login or choose another user id" });
    }
    
    const newUser = { id, password };
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect('/protected_page');
});

app.get('/protected_page', (req, res) => {
    if (req.session.user) {
        res.send(`Welcome ${req.session.user.id}! This is your protected page.`);
    } else {
        res.redirect('/signup');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
