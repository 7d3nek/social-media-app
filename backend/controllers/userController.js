const User = require("../models/userModel");

const loginUser = async (req, res) => {
    res.send({msg: "User login"});
}


const signupUser = async (req, res) => {
    res.send({msg: "User signup"});
}

module.exports = {
    loginUser,
    signupUser
}