const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema ({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
})

const ClassSchema = new Schema({
    title: String,
    description: {
        type: String,
        min: 1, 
        max: 500
    },
    startTime: String,
    endTime: String,
    classType: String,
    classDays: String,
    images: [ImageSchema]
});

module.exports = mongoose.model('Class', ClassSchema);