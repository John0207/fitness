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
    for (let i = 0; i < classes.length; i++) {
        const cl = new Class({
            title: `${classes[i].title}`,
            description: `${classes[i].description}`,    
            startTime: `${classes[i].startTime}`,    
            endTime: `${classes[i].endTime}`,    
            classType: `${classes[i].classType}`,    
            classDays: `${classes[i].classDays}`,
            image: 'https://source.unsplash.com/collection/1781617:/1200'    
        })
        await cl.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})