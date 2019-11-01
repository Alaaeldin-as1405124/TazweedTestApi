const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({

    userId: { //user ID ref
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    nameAr: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    descAr: {
        type: String,
    },
    timeSlots: [
        {
            startTime: {
                type: String,
                required: true,
            },
            endTime: {
                type: String,
                required: true,
            }
        }
    ],


});


const SellerModel = mongoose.model('seller', SellerSchema);

module.exports = SellerModel;
