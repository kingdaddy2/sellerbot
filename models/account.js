const mongoose = require("mongoose");

const Accountant = new mongoose.Schema({
  ServerID: {
    type: String
  },
  Acctype: String,
  Accountdata: String
});

const MessageModel = (module.exports = mongoose.model(
  "Accountant",
  Accountant
));
