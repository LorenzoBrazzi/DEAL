const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postcode: {
    type: Number,
    required: true,
  },
  tel: {
    type: Number,
    required: false,
  },
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: Number,
      min: 1,
      max: 5,
    },
  ],
});

UserSchema.set("versionKey", false);

module.exports = mongoose.model("User", UserSchema);
