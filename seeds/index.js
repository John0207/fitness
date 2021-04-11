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
// NEED TO UPDATE THIS
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
            images:  [                
                {
                  url: 'https://res.cloudinary.com/dhfwstzxj/image/upload/v1618115510/fitness/dvpxamaaqqbzr8munyje.jpg',
                  filename: 'fitness/mduorbxrruzkap6cbv5i'
                },
                {
                  url: 'https://res.cloudinary.com/dhfwstzxj/image/upload/v1618115510/fitness/gdwn0kjqzjxcppvfuz0w.jpg',
                  filename: 'fitness/gdwn0kjqzjxcppvfuz0w'
                },
                {
                    url: 'https://res.cloudinary.com/dhfwstzxj/image/upload/v1618115505/fitness/ghcj1os9bxcbj2lhkwtg.jpg',
                    filename: 'fitness/ghcj1os9bxcbj2lhkwtg'
                }
              ]    
        })
        await cl.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})