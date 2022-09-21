const mongoose = require('mongoose');

const LuckyResult = mongoose.Schema(
  {
    newsName:  String, // String is shorthand for {type: String}
    text : String
  }
  ,{ timestamps: true }
);

const LUCKYNUMBER = mongoose.model('lucky_number', LuckyResult);
module.exports = LUCKYNUMBER;