const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Class = require('./models/class');

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

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makeclass', async (req, res) => {
    const gymClass = new Class({title: 'jiu jitzu', description: 'beginer jiu jitzu course'});
    await gymClass.save();
    res.send(gymClass);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})