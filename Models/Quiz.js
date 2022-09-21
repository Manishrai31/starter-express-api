const mongoose = require('mongoose');

const dailyQuiz = mongoose.Schema(
  {
    question:  String, // String is shorthand for {type: String}
    options : [String],
    rightAnswer : String,
    date : Date,
  },
  { timestamps: true }
);

const QUIZ = mongoose.model('mcq_quiz', dailyQuiz);
module.exports = QUIZ;
