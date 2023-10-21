const express = require('express');
const router = express.Router();
const Movie = require('../controllers/MovieController.js');
const User = require('../controllers/UserController.js');
const upload = require('../middlewares/multer.js');
const verify = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

// Movie
router.get('/movies', verify, Movie.all);
router.get('/movies/:id', verify, Movie.findOne);
router.post('/movies', verify, Movie.create);
router.put('/movies/:id', verify, Movie.update);
router.put('/movies/:id/upload', verify, upload.single('photo'), Movie.updatePhoto);
router.delete('/movies/:id', verify, Movie.destroy);

// User
router.get('/users', verify, authorization, User.all);
router.get('/users/:id', verify, authorization, User.findOne);
router.put('/users/:id', verify, authorization, User.update);
router.delete('/users/:id', verify, authorization, User.destroy);

// Auth
router.post('/register', User.register);
router.post('/login', User.login);

module.exports = router;