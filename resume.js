const mongoose = require("mongoose");

const Resume = mongoose.Schema({
    resume: {
        type: "string",
        required: true,
    },
});

module.exports = mongoose.model("resume", Resume);
