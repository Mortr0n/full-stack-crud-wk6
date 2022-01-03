const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: [true, "Username is required"],
    },

    email: {
        type: String,
        required: [true, "Email address is required"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters in length"]
    },
    // confirm password is not included here so that it's not in the collection
    // we only need one copy of a password if it matches

}, { timestamps: true });

// Virtual field
// Stores information from our request, but it will not be saved to the collection / DB
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

// middleware jumps in to the middle of a process... does some work 
// and then it continues with the NEXT step (function)of the process as though it 
// had never been interrupted
UserSchema.pre("validate", function(next){
    console.log("inside pre validate")
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match");
        // run the next step in the process
    }
    next();
});

UserSchema.pre("save", function(next){
    console.log("inside pre save")
    // encrypt the password before it is saved to the DB
    // we KNOW that the passwords match already
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            // update the password in this instance to use the hashed returned version
            this.password = hashedPassword;
            next();
        })
        .catch((err) => {
            console.log("Error while hashing password");
        });
});

// User will become the name of our collection mongoose will make it
// lowercase AND plural
// collection name: users
const User = mongoose.model("User", UserSchema)

module.exports = User;