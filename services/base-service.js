const baseRepo = require('../repos/base-repo');
const userRepo = require('../repos/base-repo');
const jwt = require('jsonwebtoken');
const Global = require('../Global');

class BaseService {

    async getAppointments(req, res) {
        try {
            //secure the get appointments for the authenticated user(seller)
            let authData = req.authData;
            const seller = await userRepo.getSeller({"userId":authData._id});
            if(!seller._id)
                return res.status(401).send("UNAUTHORIZED ACCESS !!!!");
            let result = await baseRepo.getAppointments(seller._id);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async addAppointment(req, res) {
        try {
            let authData = req.authData;
            const buyer = await userRepo.getBuyer({"userId":authData._id});
            const appointment = req.body;
            if(!buyer._id || appointment.clientId != buyer._id)
                return res.status(401).send("UNAUTHORIZED ACCESS !!!!");

            let result = await baseRepo.addAppointment(appointment);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async updateAppointment(req, res) {
        try {
            let authData = req.authData;

            const appointment = req.body;

            const seller = await userRepo.getSeller({"userId":authData._id});
            if(appointment.sellerId != seller._id || !seller._id)
                return res.status(401).send("UNAUTHORIZED ACCESS !!!!");

            let result = await baseRepo.updateAppointment(appointment);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }


    async getSellers(req, res) {
        try {
            let result = await baseRepo.getSellers();
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    /*async updateSeller(req, res) {
        const seller = req.body;
        try {
            let result = await baseRepo.updateSeller(seller);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getBuyer(req, res) {
        try {
            const buyerId = req.params.buyerId;
            let result = await baseRepo.getBuyer(buyerId);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }   async getBuyers(req, res) {
        try {
            let result = await baseRepo.getBuyers();
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }

*/


    async addTimeSlot(req, res) {
        try {
            let authData = req.authData;

            const seller = await userRepo.getSeller({"userId":authData._id});
            if(!seller._id)
                return res.status(401).send("UNAUTHORIZED ACCESS !!!!");
            const timeSlot = req.body;
            let result = await baseRepo.addTimeSlot(seller._id,timeSlot);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getTimeSlots(req, res) {
        try {
            let authData = req.authData;

            const seller = await userRepo.getSeller({"userId":authData._id});

            if(!seller._id)
                return res.status(401).send("UNAUTHORIZED ACCESS !!!!");

            let result = await baseRepo.getTimeSlots(seller._id);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async removeTimeSlot(req, res) {
        try {
            let authData = req.authData;

            const seller = await userRepo.getSeller({"userId":authData._id});
            if(!seller._id)
                return res.status(401).send("UNAUTHORIZED ACCESS !!!!");
            const timeSlot = req.body;
            let result = await baseRepo.removeTimeSlot(seller._id,timeSlot);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }



}

module.exports = new BaseService();
