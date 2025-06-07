const mongoose = require('mongoose');
const { email } = require('zod/v4');

const userSchema = new mongoose.Schema({
    uid : {
        type:String,
        required: true
    },
    userMail :{
        type : String,
        required: true
    },
    name :{
        type: String,
        required: true
    },
    semester :{
        type: String,
        required : true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;