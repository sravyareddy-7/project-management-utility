require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("CONNECTED SUCCESSFULLY");
    process.exit();
  })
  .catch((err) => {
    console.log("FAILED");
    console.log(err);
    process.exit();
  });