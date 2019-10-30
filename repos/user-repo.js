const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Buyer = require('../models/buyer.model');
const Seller = require('../models/seller.model');


class UsersRepo {

    constructor() {
    }


    /*--------------Users------------------*/

    //Get account by username
    async getUser(authToken) {
        try {
            return await User.findOne(authToken);
        } catch (err) {
            return err;
        }

    }

    async getUserByID(authToken) {
        try {
            return await User.findOne({"_id": authToken});
        } catch (err) {
            return err;
        }

    }

    async addUser(user) {
        try {
            const newUser = new User(user);
            //console.log(newUser.password);
            let salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);

            //console.log(user);
            return await newUser.save();

        } catch (err) {
            return err;
        }
    }

    async handleUserType(user) {
        try {
            //success user addition
            if (user.type === 1) {
                return await this.addBuyer(user);
            } else if (user.type === 2) {
                return await this.addSeller(user);
            }
            return "Error happened";
        } catch (err) {
            return err;
        }
    }

    async addBuyer(user) {
        try {
            let newBuyer = new Buyer(user);
            newBuyer.userId = user._id;//attach userId to the buyer
            return await newBuyer.save();
        } catch (err) {
            return err;
        }

    }

    async addSeller(user) {
        try {
            let newSeller = new Seller(user);
            newSeller.userId = user._id;//attach userId to the seller
            //add seller

            console.log('the new seller is ',newSeller)
            return await newSeller.save();
        } catch (err) {
            return err;
        }
    }

    async getUsers() {
        return await User.find({});
    }

}

module.exports = new UsersRepo();
