import booksModel from '../models/books.js';

export function displayBookList(req, res, next) {
  booksModel.find((err, booksCollection) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render('index', {
      title: 'Book List',
      page: 'books/list',
      books: booksCollection,
    });
  });
}

export function displayAddPage(req, res, next) {
  res.render('index', { title: 'Add Book', page: 'books/add', books: {} });
}

export function processAddPage(req, res, next) {
  let newBook = booksModel({
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });

  booksModel.create(newBook, (err, Book) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.redirect('/books/list');
  });
}

export function displayEditPage(req, res, next) {
  let id = req.params.id;

  booksModel.findById(id, (err, Book) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render('index', { title: 'Edit Book', page: 'books/edit', book: Book });
  });
}

export function processEditPage(req, res, next) {
  let id = req.params.id;

  let updatedBook = booksModel({
    _id: id,
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });

  booksModel.updateOne({ _id: id }, updatedBook, (err, Book) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect('/books/list');
  });
}

export function processDelete(req, res, next) {
  let id = req.params.id;

  booksModel.remove({ _id: id }, err => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect('/books/list');
  });
}
