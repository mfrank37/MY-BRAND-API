const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, 'Title of article is missing or is invalid.']
    },
    coverImageURL:{
        type: String,
        required: true
    },
    published:{ 
        type:Date,
        required: true
    },
    updated:{
        type: Date,
        required: false
    },
    description:{
        type: Array,
        required: [true, 'The content field is required.']
    },
    comments: {
        type: Array,
        required: false
    }
});

const Article = mongoose.model('article', articleSchema)

module.exports = Article;