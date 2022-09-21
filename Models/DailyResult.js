const mongoose = require('mongoose');

const DailyResult = mongoose.Schema(
  {
    newsName:  String, // String is shorthand for {type: String}
    todayResult : String,
    yesterdayResult : {
        type : String,
        required : [true , "result is empty"],
    },
  }
  ,{ timestamps: true }
);

const DAILYRESULT = mongoose.model('dailyResult', DailyResult);
module.exports = DAILYRESULT;