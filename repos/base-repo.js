const bcrypt = require('bcryptjs');
//const Action = require('../models/item.model');
const Seller = require('../models/seller.model');
const Buyer = require('../models/buyer.model');
const Appointment = require('../models/appointment.model');
const Global = require('../Global');

//important for the images path


class BaseRepo {

    constructor() {
    }

    async addAppointment(appointment) {
        try {
            const newAppointment = new Appointment(appointment);
            let time = newAppointment.time.split(' to ');
            console.log('the time ', time, 'start time is ', time[0], 'end time is', time[1]);
            let seller = await this.getSeller({"userId": newAppointment.sellerId});
            let validTimeSlot = false;
            seller.timeSlots.forEach((singleTimeSlot) => {

                if (singleTimeSlot.startTime ==time[0] && singleTimeSlot.endTime == time[1])
                    validTimeSlot = true
            });
            console.log('the valid is ',validTimeSlot)
            if (validTimeSlot) {
                console.log('the seller is ', seller)

                return await newAppointment.save(async (err, addedAppointment) => {
                    if (err)
                        return console.log(err);
                    let buyer = await this.getBuyer({"userId": appointment.clientId});
                    //attach the appointment id to the buyer
                    buyer.appointments.push(addedAppointment._id);
                    return await this.updateBuyer(buyer);
                });
            } else
                return "Invalid time slot"

        } catch (err) {
            return err
        }
    }

    async updateAppointment(appointment) {
        try {
            console.log('updating appoinntment to ',appointment)
            return await Appointment.findOneAndUpdate({"_id": appointment._id}, appointment);

        } catch (err) {
            return err;
        }
    }

    async getSeller(seller) {
        try {
            return await Seller.findOne(seller);
        } catch (err) {
            return err;
        }
    }

    async getSellers() {
        try {
            return await Seller.find({});
        } catch (err) {
            return err;
        }
    }

    async getBuyers() {
        try {
            return await Buyer.find({});
        } catch (err) {
            return err;
        }
    }

    async getBuyer(buyer) {
        try {
            return await Buyer.findOne(buyer);
        } catch (err) {
            return err;
        }
    }

    async updateSeller(seller) {
        try {
            return await Seller.findOneAndUpdate({"_id": seller._id}, seller);
        } catch (err) {
            return err;
        }
    }

    async updateBuyer(buyer) {
        try {
            return await Buyer.findOneAndUpdate({"_id": buyer._id}, buyer);
        } catch (err) {
            return err;
        }
    }

    async addTimeSlot(sellerId, timeSlot) {
        try {
            //get the seller
            let seller = await this.getSeller({"_id": sellerId});
            seller.timeSlots = timeSlot;
            return await this.updateSeller(seller);
        } catch (err) {
            return err;
        }
    }

    async getTimeSlots(sellerId) {
        try {
            //get the seller
            let seller = await this.getSeller({"_id": sellerId});
            return await seller.timeSlots;
        } catch (err) {
            return err;
        }
    }

    async getAppointments(sellerId) {
        try {
            let appointments = await Appointment.find({"sellerId": sellerId}).populate('clientId');
            return await appointments;
        } catch (err) {
            return err;
        }
    }

    async removeTimeSlot(sellerId, timeSlot) {
        try {
            //get the seller
            //let seller = await this.getSeller({"_id":sellerId});
            return await this.addTimeSlot(sellerId, timeSlot)
            //let index = seller.timeSlots.findIndex((singleTimeSlot) => singleTimeSlot._id == timeSlot._id);
            // if(index != -1){
            //found it
            //    seller.timeSlots.splice(timeSlot);
            //     return await this.updateSeller(seller);
            //  }
            //  else
            //    return 'Not found';
        } catch (err) {
            return err;
        }
    }

}

module.exports = new BaseRepo();
