"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JwtSecret = process.env.JWT_SECRET || "very secret secret";
const UserModel = require("../models/userModel");
const { json } = require("express");

const login = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a password property",
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, "name"))
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a name property",
    });

  try {
    let user = await UserModel.findOne({ name: req.body.name }).exec();

    // check if the password is valid
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid)
      return res.status(404).send({
        token: null,
        error: "Bad Request",
        message: "Password invalid",
      });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        city: user.city,
        postcode: user.postcode,
        tel: user.tel,
        imageUrl: user.imageUrl,
        ratings: user.ratings,
      },
      JwtSecret,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );

    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(404).json({
      error: "User Not Found",
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a password property",
    });

  if (!Object.prototype.hasOwnProperty.call(req.body, "name"))
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a name property",
    });

  const user = Object.assign(req.body, {
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    let retUser = await UserModel.create(user);

    // if user is registered without errors
    // create a token
    const token = jwt.sign({ id: retUser._id, name: retUser.name }, JwtSecret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).json({ token: token });
  } catch (err) {
    if (err.code == 11000) {
      return res.status(400).json({
        error: "User exists",
        message: err.message,
      });
    } else {
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  }
};

const me = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });
    return res.status(200).json(user);
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
    let user = await UserModel.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
      runValidators: true,
    }).exec();

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const logout = (req, res) => {
  res.status(200).send({ token: null });
};

const name = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });

    return res.status(200).json({ id: req.params.id, name: user.name });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const image = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });

    return res.status(200).json({ id: req.params.id, imageUrl: user.imageUrl });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const calculateRating = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });
    if (user.ratings.length === 0) {
      return res.status(200).json({ id: req.params.id, avgRating: 0 });
    }
    var sum = 0;
    for (var i = 0; i < user.ratings.length; i++) {
      sum += user.ratings[i];
    }
    const avgRating = (sum / user.ratings.length).toFixed(1);
    return res.status(200).json({ id: req.params.id, avgRating: avgRating });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const other = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = {
  login,
  register,
  logout,
  me,
  update,
  name,
  calculateRating,
  other,
  image,
};
