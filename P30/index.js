const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' },
  { id: 3, title: 'Book Three', author: 'Author Three' }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

app.post('/books', (req, res) => {
  let title, author;

  if (req.query.data) {
    try {
      const data = JSON.parse(req.query.data);
      title = data.title;
      author = data.author;
    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON in query parameter' });
    }
  } else {
    title = req.body.title;
    author = req.body.author;
  }

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const id = books.length ? books[books.length - 1].id + 1 : 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  let title, author;

  if (req.query.data) {
    try {
      const data = JSON.parse(req.query.data);
      title = data.title;
      author = data.author;
    } catch (err) {
      return res.status(400).json({ message: 'Invalid JSON in query parameter' });
    }
  } else {
    title = req.body.title;
    author = req.body.author;
  }

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  const deletedBook = books.splice(index, 1);
  res.json(deletedBook[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
