const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const classes = require('../controllers/classes');
const { isLoggedIn } = require('../middleware');
const { validateClass } = require('../middleware');

router.route('/')
    .get(catchAsync(classes.index))
    .post(isLoggedIn, validateClass, catchAsync(classes.createClass))



router.get('/new', isLoggedIn, classes.renderNewForm)

router.route('/:id')
    .get(catchAsync(classes.showClass))
    .put(isLoggedIn, catchAsync(classes.updateClass))
    .delete(isLoggedIn, catchAsync(classes.deleteClass))

router.get('/:id/edit', isLoggedIn, catchAsync(classes.renderEditForm))

module.exports = router;