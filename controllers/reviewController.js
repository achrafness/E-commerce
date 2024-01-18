const Review = require("../models/Review")
const createReview = async (req, res) => {
  res.send("create review");
};
const getAllReviews = async (req, res) => {
  res.send("get all reviews");
};

const getSingleReview = async (req, res) => {
  res.send("get single review");
};

const updateReview = async (req, res) => {
  res.send("update review");
};

const deleteReview = async (req, res) => {
  res.send("delete review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
