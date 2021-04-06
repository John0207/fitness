const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { classSchema } = require('../schemas.js');
const Class = require('../models/class');
const { isLoggedIn } = require('../middleware');


const validateClass = (req, res, next) => {    
    const { error } = classSchema.validate(req.body);
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const classes = await Class.find({});
    res.render('classes/index', { classes })
}));

router.get('/new', isLoggedIn,(req, res) => {    
    res.render('classes/new');
})

router.post('/', isLoggedIn, validateClass, catchAsync(async(req, res, next) => {
    const cl = new Class(req.body.cl);
    await cl.save();
    req.flash('success', 'successfully made a new class');  
    res.redirect(`/classes/${cl._id}`) 
}))

router.get('/:id', catchAsync(async (req, res) => {
    const cl = await Class.findById(req.params.id);
    if (!cl){
        req.flash('error', 'Cannot find that class')
        res.redirect('/classes')
    }
    res.render('classes/show', { cl });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const cl = await Class.findById(req.params.id)
    if (!cl){
        req.flash('error', 'Cannot find that class')
        res.redirect('/classes')
    }
    res.render('classes/edit', { cl });
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    req.flash('success', 'successfully updated class');
    const cl = await Class.findByIdAndUpdate(id, { ...req.body.cl });
    res.redirect(`/classes/${cl._id}`)
}));

router.delete('/:id', isLoggedIn, catchAsync( async (req, res) => {
    const { id } = req.params;
    await Class.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted class');
    res.redirect('/classes');
}));

module.exports = router;