const mongoose = require('mongoose');

const db = async () => {
    try {
      const conn = await mongoose.connect(
        "mongodb+srv://manish:manish31@cluster0.nqcb6x2.mongodb.net/sk_app?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      if (conn) {
        console.log(
          `MongoDB Connected:`
        );
      }
      return conn;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};
db();