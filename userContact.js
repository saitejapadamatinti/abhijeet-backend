const mongoose = require("mongoose");

const UserContact = mongoose.Schema({
  firstname: {
    type: "string",
    required: true,
  },
  lastname: {
    type: "string",
    required: true,
  },
  mobile: {
    type: "number",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  message: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("userContact", UserContact);
