const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    score: {
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('player',schema);