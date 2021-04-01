const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Class = require('./models/class');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');




mongoose.connect('mongodb://localhost:27017/fitness', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate)


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/classes', async (req, res) => {
    const classes = await Class.find({});
    res.render('classes/index', { classes })
});

app.get('/classes/new', (req, res) => {
    res.render('classes/new');
})

app.post('/classes', async(req, res) => {
    const cl = new Class(req.body.cl);
    await cl.save();
    res.redirect(`/classes/${cl._id}`)
})

app.get('/classes/:id', async (req, res) => {
    const cl = await Class.findById(req.params.id);
    res.render('classes/show', { cl });
});

app.get('/classes/:id/edit', async(req, res) => {
    const cl = await Class.findById(req.params.id);
    res.render('classes/edit', { cl });
})

app.put('/classes/:id', async(req, res) => {
    const { id } = req.params;
    const cl = await Class.findByIdAndUpdate(id, { ...req.body.cl });
    res.redirect(`/classes/${cl._id}`)
});

app.delete('/classes/:id', async (req, res) => {
    const { id } = req.params;
    const cl = await Class.findByIdAndDelete(id);
    res.redirect('/classes');
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
});