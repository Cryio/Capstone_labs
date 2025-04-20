const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from GET endpoint!' });
});

app.post('/', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.json({ message: `Hello, ${name}!` });
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
