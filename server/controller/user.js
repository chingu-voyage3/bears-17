const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const User = require('../models/user.js');

exports.updateProfile = async (ctx) => {
  const profile = ctx.request.body;
  const id = '5a71c19573107f511c977cbc';

  const user = await User.findOneAndUpdate({ _id: ObjectId(id) }, profile, { new: true });
  ctx.body = user;
  return ctx.body;
};
