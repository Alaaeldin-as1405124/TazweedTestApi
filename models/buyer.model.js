const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuyerSchema = new Schema({
    userId: { //user ID ref
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required:true
    },
    appointments: [//array of appointments ref
        {type: mongoose.Schema.Types.ObjectId, ref: 'appointment'}
    ],


});



const BuyerModel = mongoose.model('buyer', BuyerSchema);

module.exports = BuyerModel;
