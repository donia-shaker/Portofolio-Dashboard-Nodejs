const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const my_services = new Shema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  is_active: { type: Number, default: 1 },
});

const services = mongoose.model("services", my_services);

module.exports = services;
