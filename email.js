const mongoose = require("mongoose");

const UserEmails = mongoose.Schema({
    userEmail: {
        type: "string",
        required: true,
    },
    date: {
        type: "string",
        required: true,
    }
});

module.exports = mongoose.model("userEmails", UserEmails);
