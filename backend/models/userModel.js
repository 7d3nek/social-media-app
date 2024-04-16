const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: false,
        default: null
    }

}, { timestamps: true });

userSchema.statics.signup = async function (firstName, lastName, email, password, avatarUrl) {
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    // validation
    if (!firstName || !lastName || !email || !password) {
        throw Error("All fields are required!");
    }
    if (firstName.length > 20 || lastName.length > 20) {
        throw Error("Enter your real name!");
    }
    if (!validator.isEmail(email)) {
        throw Error("Enter a valid email address!");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password too weak!");
    }

    // check if user exists
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already used by another user!");
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create user
    const user = await this.create({ firstName, lastName, email, password: hash, avatarUrl });
    return user;
}

userSchema.statics.login = async function (email, password) {
    // check if email and password are filled
    if (!email || !password) {
        throw Error("All fields are required!");
    }

    // find user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect credentials!");
    }
    
    // check if password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect credentials!");
    }

    return user;
}

module.exports = mongoose.model("User", userSchema);