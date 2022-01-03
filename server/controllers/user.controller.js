const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        console.log("in register");

        // use the req data and the User model constructor to create a user object
        const user = new User(req.body);

        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log("Successfully Registered");
                res.json({
                    message: "Successfully Registered",
                    user: newUser,
                })
            })
            .catch((err) => {
                console.log("register NOT successful");
                res.status(400).json(err);
            });
    },

    // login
    login: (req, res) => {
        User.findOne({
                email: req.body.email
            })
            .then((userRecord) => {
                // check if this returned object is null
                if (userRecord === null) {
                    // email not found in the collection / DB
                    res.status(400).json({
                        message: "invalid login attempt"
                    });
                } else {
                    console.log("record found")
                    // the email address was found
                    // compare the address given to us in the request with the one stored in the DB
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                console.log("password is valid");
                                res.cookie("usertoken", // name of the cookie
                                    jwt.sign({
                                            // payload is the data I want to save
                                            user_id: userRecord._id,
                                            email: userRecord.email //not really necessary just showing it's a regular object
                                        },
                                        process.env.JWT_SECRET), // used to sign / hash the data in the cookie
                                        {
                                            // configuration settings for this cookie
                                            httpOnly: true, // can only be passed using http requests
                                            // expiring in the current time + what I added
                                            expires: new Date(Date.now() + 90000000)
                                        }
                                    ).json({
                                    message: "Successfully logged in",
                                    userLoggedIn: userRecord.userName
                                })
                            } else {
                                console.log("got in the else")
                                // passwords did not match
                                res.status(400).json({
                                    message: "invalid login attempt"
                                })
                                .catch((err) => {
                                    console.log("error with compare values")
                                    res.status(400).json({ message: "Invalid Login attempt"})
                                })
                            }
                        })
                        .catch((err) => {
                            console.log("error with findOne")
                            res.status(400).json({ message: "Invalid Login attempt"})
                        })
                }
            })
    },

    logout: "logout"

}