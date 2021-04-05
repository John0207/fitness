const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { classSchema } = require('../schemas.js');
const Class = require('../models/class');

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

router.get('/new', (req, res) => {
    res.render('classes/new');
})

router.post('/', validateClass, catchAsync(async(req, res, next) => {    
    const cl = new Class(req.body.cl);
    await cl.save();
    res.redirect(`/classes/${cl._id}`) 
}))

router.get('/:id', catchAsync(async (req, res) => {
    const cl = await Class.findById(req.params.id);
    res.render('classes/show', { cl });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const cl = await Class.findById(req.params.id)
    res.render('classes/edit', { cl });
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const cl = await Class.findByIdAndUpdate(id, { ...req.body.cl });
    res.redirect(`/classes/${cl._id}`)
}));

router.delete('/:id', catchAsync( async (req, res) => {
    const { id } = req.params;
    await Class.findByIdAndDelete(id);
    res.redirect('/classes');
}));

module.exports = router;