// modules required for routing
let express = require('express');
let router = express.Router();

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render('books/details', {
    title: 'Add Book',
    books: {
      Title: '',
      Price: '',
      Author: '',
      Genre: '',
    },
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  // create an instance of book
  const newBook = new book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });
  newBook.save((err) => {
    if (err) {
      return console.error(err);
    }
    // saved
    res.redirect('/books');
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  // get the id of the book
  const id = req.params.id;

  book.findById(id, (err, docs) => {
    if (err) {
      return console.error(err);
    }
    res.render('books/details', {
      title: 'Update Book',
      books: docs,
    });
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  // get the id of the book to be updated
  const id = req.params.id;
  // prepare data to be updated
  const update = {
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  };
  book.findByIdAndUpdate(id, update, (err, docs) => {
    if (err) {
      return console.error(err);
    }
    // on success
    res.redirect('/books');
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  // get the id of the book to be deleted
  const id = req.params.id;

  book.findByIdAndDelete(id, (err, docs) => {
    if (err) {
      return console.error(err);
    }
    // on success
    res.redirect('/books');
  });
});

module.exports = router;
