const Class = require('../models/class');

module.exports.index = async (req, res) => {
    const classes = await Class.find({});
    res.render('classes/index', { classes })
}

module.exports.renderNewForm = (req, res) => {    
    res.render('classes/new');
}

module.exports.createClass = async(req, res, next) => {
    const cl = new Class(req.body.cl);
    await cl.save();
    req.flash('success', 'successfully made a new class');  
    res.redirect(`/classes/${cl._id}`) 
}

module.exports.showClass = async (req, res) => {
    const cl = await Class.findById(req.params.id);
    if (!cl){
        req.flash('error', 'Cannot find that class')
        res.redirect('/classes')
    }
    res.render('classes/show', { cl });
}

module.exports.renderEditForm = async (req, res) => {
    const cl = await Class.findById(req.params.id)
    if (!cl){
        req.flash('error', 'Cannot find that class')
        res.redirect('/classes')
    }
    res.render('classes/edit', { cl });
}

module.exports.updateClass = async (req, res) => {
    const { id } = req.params;
    req.flash('success', 'successfully updated class');
    const cl = await Class.findByIdAndUpdate(id, { ...req.body.cl });
    res.redirect(`/classes/${cl._id}`)
}

module.exports.deleteClass = async (req, res) => {
    const { id } = req.params;
    await Class.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted class');
    res.redirect('/classes');
}