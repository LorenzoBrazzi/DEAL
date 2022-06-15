"use strict";

const postModel = require("../models/postModel");

const create = async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  try {
    let post = await postModel.create(req.body);
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const read = async (req, res) => {
  try {
    let post = await postModel.findById(req.params.id).exec();

    if (!post)
      return res.status(404).json({
        error: "Not Found",
        message: `Post not found`,
      });

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  try {
    let post = await postModel
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      .exec();

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await postModel.findByIdAndRemove(req.params.id).exec();

    return res
      .status(200)
      .json({ message: `Post with id${req.params.id} was deleted` });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};
const list = async (req, res) => {
  try {
    let posts = await postModel.find({ status: "open" }).exec();

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const filterteList = async (req, res) => {
  try {
    let posts = await postModel.find({ category: req.body.category }).exec();

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const creatorList = async (req, res) => {
  try {
    let posts = await postModel.find({ creatorID: req.params.id }).exec();
    if (!posts)
      return res.status(404).json({
        error: "Not Found",
        message: `Posts not found`,
      });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const requestingList = async (req, res) => {
  try {
    let posts = await postModel
      .find({
        $or: [
          { matchedUserID: req.params.id },
          { requestingUsers: { $in: [req.params.id] } },
        ],
      })
      .exec();

    if (!posts)
      return res.status(404).json({
        error: "Not Found",
        message: `Posts not found`,
      });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
  list,
  filterteList,
  creatorList,
  requestingList,
};
