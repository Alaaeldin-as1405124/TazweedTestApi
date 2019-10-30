const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required:true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    descAr: {
        type: String,
    },
    requestDate: {
        type: String,
        default: new Date()
    },
    status:{
        type:String, //0- Pending / 1- Accepted / 2- Rejected
        default: "Pending",
        enum: ['Pending', 'Accepted', 'Rejected']
    }


});


const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;
