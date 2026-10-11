const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User is required"]
    },
    title: {
        type: String,
        require: [true, "Title of ote is required."]
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    }
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;