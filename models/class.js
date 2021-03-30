const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    title: String,
    description: {
        type: String,
        min: 1, 
        max: 500
    },
    startTime: String,
    endTime: String,
    ageGroup: String, 

});

module.exports = mongoose.model('Class', ClassSchema);