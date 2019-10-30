const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number, // (1- Admin, 2- buyer 3- seller )
        required: true,
        default: 2

    },
    regDate: {
        type: String,
        default: new Date()
    },
    isValid:{
        type:Boolean,
        default:true
    },
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
