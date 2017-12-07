const mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
  question: String,
  user: {default: "Heyjp", type: String}
}, {
    timestamps: true
});


let questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;