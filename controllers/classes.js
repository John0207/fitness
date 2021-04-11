const Class = require('../models/class');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const classes = await Class.find({});
    res.render('classes/index', { classes })
}

module.exports.renderNewForm = (req, res) => {    
    res.render('classes/new');
}

module.exports.createClass = async(req, res, next) => {
    const cl = new Class(req.body.cl);
    cl.images = req.files.map(f => ({url: f.path, filename: f.filename }));
    await cl.save();
    console.log(cl);
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
    // could make this more efficient by just using find
    const { id } = req.params; 
    console.log(req.body);   
    const cl = await Class.findByIdAndUpdate(id, { ...req.body.cl });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename }));
    cl.images.push(...imgs);    
    await cl.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await cl.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages}}}})
        console.log(cl);
    }
    req.flash('success', 'successfully updated class');
    res.redirect(`/classes/${cl._id}`)
}

module.exports.deleteClass = async (req, res) => {
    const { id } = req.params;
    await Class.findByIdAndDelete(id);
    req.flash('success', 'successfully deleted class');
    res.redirect('/classes');
}