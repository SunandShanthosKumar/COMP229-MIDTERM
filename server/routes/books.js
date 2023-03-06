// <!-- 
//     Name: Sunand Shanthos Kumar
//     StudentID: 301297793
//     Date: 03/05/2023 
// -->
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  
  res.render('books/details', {title: 'Add Book Details', books: {},
    displayName: req.user ? req.user.displayName : ''})   
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = book({
      "BookTitle": req.body.BookTitle,
      "BookPrice": req.body.BookPrice,
      "BookAuthor": req.body.BookAuthor,
      "BookGenre": req.body.BookGenre
  });

  book.create(newBook, (err, Contact) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the contact list
          res.redirect('book');
      }
  });


});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    router.get('/:id', function(req, res, next) {
      var id = req.params.id;
      Book.findById(id, function(err, books) {
          if (err) {
              console.log(err);
              res.end(err);
          }
          else {
              var title = "Edit Book";
              res.render('books/details', { title: title, books: books });
          }
      });
  });
  
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id

    let updatedbook = book({
        "_id": id,
        "BookTitle": req.body.BookTitle,
        "BookPrice": req.body.BookPrice,
        "BookAuthor": req.body.BookAuthor,
        "BookGenre": req.body.BookGenre
    });

    book.updateOne({_id: id}, updatedbook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('book');
        }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the contact list
             res.redirect('/book');
        }
    });
});


module.exports = router;
