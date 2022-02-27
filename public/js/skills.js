const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const my_skills = new Shema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  is_active: { type: Number, default: 1 },
});

const skills = mongoose.model("skills", my_skills );

module.exports = skills;
