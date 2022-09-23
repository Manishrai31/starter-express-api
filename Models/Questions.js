const mongoose = require('mongoose');

const dailyQuestions = mongoose.Schema(
  {
    question:  String, // String is shorthand for {type: String}
    answer : String,
    type : String,
    date : Date,
  },
  { timestamps: true }
);

const QUESTIONS = mongoose.model('daily_question', dailyQuestions);
module.exports = QUESTIONS;
