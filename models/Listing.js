const mongoose = require("mongoose");

const listingSchemas = new mongoose.Schema({
  title: String,
  price: String,
  locality: String,
  details: String,
});

module.exports = mongoose.model("listingSchemas", listingSchemas);
