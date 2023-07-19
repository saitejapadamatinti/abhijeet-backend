const mongoose = require("mongoose");

const BlogData = mongoose.Schema({
  blogImage: {
    type: "string",
    required: true,
  },
  bloghead: {
    type: "string",
    required: true,
  },
  blogContent: {
    type: "string",
    required: true,
  },
  blogDate: {
    type: "string",
    required: true,
  },
  readTime: {
    type: "string",
    required: true,
  },
  blogLongDescription: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("projectDetails", BlogData);
