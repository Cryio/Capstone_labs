const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mysecretkey',   // Used to sign the session ID cookie (ensure it's long & random for security)
    resave: false,           // Prevents session from being saved again if unmodified
    saveUninitialized: true, // Saves new sessions that have not been modified
    cookie: { maxAge: 10000 }
  }));  

app.get('/', (req, res) => {
  res.send(`
    <h1>Session Example</h1>
    <form action="/set-session" method="post">
      <label>Name: <input type="text" name="name"></label><br>
      <label>Age: <input type="text" name="age"></label><br>
      <button type="submit">Set Session</button>
    </form>`);
});

app.post('/set-session', (req, res) => {
  req.session.name = req.body.name;
  req.session.age = req.body.age;
  req.session.createdAt = Date.now();
  res.send(`Session stored! <a href="/get-session">View Session</a>`);
});

app.get('/get-session', (req, res) => {
  if (!req.session.name || !req.session.age) {
    return res.send('No session data found!');
  }

  const sessionAge = (Date.now() - req.session.createdAt) / 1000; 
  const remainingTime = req.session.cookie.maxAge / 1000 - sessionAge;

  res.send(`
    <h1>Session Data</h1>
    <p><strong>Session ID:</strong> ${req.sessionID}</p>
    <p><strong>Name:</strong> ${req.session.name}</p>
    <p><strong>Age:</strong> ${req.session.age}</p>
    <p><strong>Session Timeout:</strong> ${Math.max(0, remainingTime.toFixed(2))} seconds</p>
    <br>
    <a href="/">Go Back</a>
  `);
});

app.get('/expire-session', (req, res) => {
  req.session.destroy(err => {
    res.send('Session expired!');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
