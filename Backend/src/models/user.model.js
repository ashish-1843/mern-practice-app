const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPass: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;