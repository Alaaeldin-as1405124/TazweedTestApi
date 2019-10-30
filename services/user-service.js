const usersRepo = require('../repos/user-repo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Globals = require('../Global');

class UserService {

    async loginUser(req, res) {
        try {
            //Get the user info sent
            const authToken = req.body;
            //Read database user
            let user = await usersRepo.getUser({"username": authToken.username});

            //if we found the user
            if (user && user._id) {
                //get the buyer information
                user = user.toObject();
                bcrypt.compare(authToken.password, user.password, (err, isMatch) => {
                    if (isMatch) {
                        //delete password from the token
                        delete user.password;
                        jwt.sign(user, Globals.jwtKey, (err, token) => {
                            res.status(200).json({token});
                        });
                    } else
                        res.sendStatus(403)
                });
            } else {
                //Forbidden
                res.sendStatus(403)
            }
        } catch (err) {
            console.log(err);
        }
    }


    async getUsers(req, res) {
        try {
            let result = await usersRepo.getUsers();
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async addUser(req, res) {
        const user = req.body;
        try {
            let userAdded = await usersRepo.addUser(user);
            if (userAdded.errmsg)
                return res.status(301).send(userAdded);

            user._id = userAdded._id;
            let result = await usersRepo.handleUserType(user);
            res.status(201).send(result);


        } catch (err) {
            console.log('my err is ', err)
            res.status(500).send(err);
        }
    }


    async getUser(req, res) {
        const userId = req.params.id;
        try {
            let result = await usersRepo.getUserByID(userId);
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }


    verifyAuthToken(req, res, next) {
        //console.log('verifying ',req.url,'\n',req)
        //get the auth header value
        const bearerHeader = req.headers['authorization'];
        //check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            //Generate JWT token using the secret key. Set the expiry to 2h(later)- will be non-expire for testing purposes
            jwt.verify(bearerToken, Globals.jwtKey, async (err, authData) => {
                if (err) {
                    //console.log(req.token);
                    res.sendStatus(403);
                }
                //forbidden
                else {
                    //check if the user is allowed to do this action

                    //console.log(bearerToken);
                    req.authData = authData;
                    req.token = bearerToken;

                    next();
                }
            })

        } else {
            res.status(403).json({
                token: null,
                message: "UNAUTHORIZED access"
            });
        }
    }

}

module.exports = new UserService();
