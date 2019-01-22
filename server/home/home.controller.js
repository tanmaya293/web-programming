const express = require('express');
const router = express.Router();
const homeService = require('./home.service');


//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');


// routes
router.get('/', getAll);
router.get('/cat',getcats);
router.get('/:id', getProductById);
router.delete('/:id', _delete);
router.post('/register', addProduct);
router.put('/:id', updateProduct);

module.exports = router;

function getAll(req, res, next) {
    homeService.getAll()
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getcats(req, res, next) {
    homeService.getAllcats()
        .then(categories => res.json(categories))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    homeService.deleteProduct(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
/////

function addProduct(req, res, next) {
    homeService.createProduct(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getProductById(req, res, next) {
    homeService.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateProduct(req, res, next) {
    homeService.updateProduct(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}




/* GET home page. */

router.get('/try', function(req, res, next) {
// render the index page, and pass data to it.
  res.render('index', { title: 'Express' });
});

//our file upload function.
router.post('/', function (req, res, next) {
     var path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path); 
  });     
})
module.exports = router;