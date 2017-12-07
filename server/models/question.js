const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  title: String,
  question: String,
  user: {default: "Heyjp", type: String }
}, {
  timestamps: true,
});


const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;