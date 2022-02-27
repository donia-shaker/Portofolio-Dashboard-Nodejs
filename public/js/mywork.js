const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const my_work = new Shema({
  url: { type: String, required: true },
  image: { type: String, required: true },
  is_active: { type: Number, default: 1 },
});

const mywork = mongoose.model("mywork", my_work );

module.exports = mywork;
