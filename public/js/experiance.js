const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const my_experiance = new Shema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  end: { type: String, required: true },
  start: { type: String, required: true },
  image: { type: String, required: true },
  is_active: { type: Number, default: 1 },
});

const experiance = mongoose.model("experiance", my_experiance );

module.exports = experiance;
