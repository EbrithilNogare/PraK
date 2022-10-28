const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  timestamp: String,
  data: Object,
});

module.exports = mongoose.model("log", schema, "log");
