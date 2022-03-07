const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const my_landing = new Shema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  is_active: { type: Number, default: 1 },
});

const landing = mongoose.model("landing", my_landing);

module.exports = landing;
