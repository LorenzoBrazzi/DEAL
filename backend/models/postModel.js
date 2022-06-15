const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  offerOrRequest: {
    type: String,
    enum: ["ask", "offer"],
    default: "ask",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Grocery Shopping",
      "Child Care",
      "Elderly Care",
      "House And Garden",
      "Pets And Animals",
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postCode: {
    type: Number,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "matched", "paid", "done", "evaluated"],
  },
  date: {
    type: Date,
    required: true,
  },
  matchedUserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  requestingUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  matchedUserComment: {
    type: String,
    required: false,
  },
  creatorComment: {
    type: String,
    required: false,
  },
});

PostSchema.set("versionKey", false);
PostSchema.set("timestamps", true);

module.exports = mongoose.model("Post", PostSchema);
