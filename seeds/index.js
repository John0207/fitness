const mongoose = require('mongoose');
const classes = require('./classes');
const Class = require('../models/class');

mongoose.connect('mongodb://localhost:27017/fitness', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected42069!!!");
});

const seedDB = async () => {
    await Class.deleteMany({});
    const c = new Class({
        title: `${classes[0].title}, ${classes[0].description}`     
    })
    await c.save();
}

seedDB();