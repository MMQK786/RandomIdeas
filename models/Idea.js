const mongoose = require('mongoose')

//create schema first
//a schema is a set of rules defined in application that describes fields, types, required values, defaults
//mongoose is an ODM(object data modelling)

//the schema protects mongoDB from bad data

const IdeaSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: [true, 'Please add a text field'] //some minor back end validation
    },

    tag: {
        type: String
    },

    username: {
        type: String, 
    },

    date: {
        type: Date, 
        default: Date.now
    }

})

module.exports = mongoose.model('Idea', IdeaSchema) //we pass the model back, the name of and the object

