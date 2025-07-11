const mongoose = require("mongoose");

const uri = "mongodb+srv://sy032686:P3Bqbz5mHtgsLF5C@cluster0.4wvaubg.mongodb.net/gymBackend?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    // no need for useNewUrlParser/useUnifiedTopology now, latest mongoose defaults handle it
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });
