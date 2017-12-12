const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    title: String,
    question: String,
    user: { default: "user", type: String }
  },
  {
    timestamps: true,
    collection: 'test',
  },
);

const questionModel = mongoose.model("Test-Question", questionSchema);

module.exports = questionModel;
