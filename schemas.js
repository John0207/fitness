const Joi = require('joi');

module.exports.classSchema = Joi.object({
    cl: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        classType: Joi.string().required(),
        classDays: Joi.string().required(),
        // image: Joi.string().required(),
    }).required(),
    deleteImages: Joi.array()
});

