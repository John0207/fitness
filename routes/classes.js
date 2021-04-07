const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const classes = require('../controllers/classes');
const { isLoggedIn } = require('../middleware');
const { validateClass } = require('../middleware');

router.get('/', catchAsync(classes.index));

router.get('/new', isLoggedIn, classes.renderNewForm)

router.post('/', isLoggedIn, validateClass, catchAsync(classes.createClass))

router.get('/:id', catchAsync(classes.showClass));

router.get('/:id/edit', isLoggedIn, catchAsync(classes.renderEditForm))

router.put('/:id', isLoggedIn, catchAsync(classes.updateClass));

router.delete('/:id', isLoggedIn, catchAsync(classes.deleteClass));

module.exports = router;