var express = require("express");
var app = express();
const { default: mongoose } = require("mongoose");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
const multer = require("multer");
const Experiance = require("./public/js/experiance");
const Skills = require("./public/js/skills");
const Services = require("./public/js/services");
const Mywork = require("./public/js/mywork");
const Landing = require("./public/js/landing");
const landing = require("./public/js/landing");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype == "image/png") cb(null, "public/images/");
    else if (file.mimetype == "image/jpeg") cb(null, "public/images/");
    else if (file.mimetype == "application/pdf") cb(null, "public/pdf/");
  },
  filename: (req, file, cb) => {
    var extension = file.originalname.split(".");
    var ext = extension[extension.length - 1];

    var uploaded_file_name =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      ext;

    cb(null, uploaded_file_name);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "application/pdf"
    ) {
      callback(null, true);
    } else callback(null, false);
  },
  limits: 1024 * 1024 * 5,
});

mongoose
  .connect("mongodb://localhost:27017/portofolio")
  .then(result => {
    // console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

// Authentication
app.post("/authentication/login", (req, res) => {
  Landing.find({ is_active: 1 })
    .then(reslut => {
      console.log(reslut);
      var email = req.body.email;
      var password = req.body.password;
      console.log(email);
      console.log(password);

      if (
        email == reslut[reslut.length - 1].email &&
        password == reslut[reslut.length - 1].password
      ) {
        res.redirect("/dashboard");
      } else res.redirect("/404");
    })
    .catch(error => {
      console.log(error);
    });
});

// Landing
app.get("/dashboard", (req, res) => {
  Landing.find({ is_active: 1 })
    .then(reslut => {
      console.log(reslut);
      res.render("dashboard", { landing: reslut });
    })
    .catch(error => {
      console.log(error);
    });
});
app.post(
  "/landing/update",
  upload.fields([{ name: "image" }, { name: "cv" }]),
  function (req, res) {
    const i = new Landing({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      password: req.body.password,
      image: req.files["image"][0].filename,
      cv: req.files["cv"][0].filename,
    });
    i.save((error, result) => {
      if (error) console.log(error);
      else console.log(result);
    });
    // console.log(req.files["cv"][0].filename);
    res.redirect("/dashboard");
    console.log("data inserted successful");
  }
);

//Add Skills
app.get("/skills", (req, res) => {
  Skills.find({ is_active: 1 })
    .then(reslut => {
      res.render("skills", { skills: reslut });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/skills/add", upload.single("image"), (req, res) => {
  console.log(req.body);
  const s = new Skills({
    name: req.body.name,
    image: req.file.filename,
  });
  s.save((error, result) => {
    if (error) console.log(error.message);
    else console.log(result);
  });

  console.log("data inserted successful");
  res.redirect("/skills");
});

// Update Skill
app.post("/skills/update/", upload.single("image"), (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Skills.updateOne(
    { _id: id },
    { name: req.body.name, image: req.file.filename },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Docs : ", docs);
      }
    }
  );

  res.redirect("/skills");
});

// delete Skill
app.post("/skills/delete/", (req, res, next) => {
  var id = req.body.id;
  console.log(req.body.id);

  Skills.updateOne({ _id: id }, { is_active: 0 }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Docs : ", docs);
    }
  });
  res.redirect("/skills");
});

//Add Experiance
app.get("/experiance", (req, res) => {
  Experiance.find({ is_active: 1 })
    .then(reslut => {
      res.render("experiance", { experiance: reslut });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/experiance/add", upload.single("image"), (req, res) => {
  console.log(req.body);
  const e = new Experiance({
    name: req.body.name,
    place: req.body.place,
    start: req.body.start,
    end: req.body.end,
    image: req.file.filename,
  });
  e.save((error, result) => {
    if (error) console.log(error.message);
    else console.log(result);
  });

  console.log("data inserted successful");
  res.redirect("/experiance");
});

// Update Experiance
app.post("/experiance/update/", upload.single("image"), (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Experiance.updateOne(
    { _id: id },
    { name: req.body.name, image: req.file.filename },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Docs : ", docs);
      }
    }
  );
  res.redirect("/experiance");
  alert("You add Successful");
});

// delete experiance
app.post("/experiance/delete/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Experiance.updateOne({ _id: id }, { is_active: 0 }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Docs : ", docs);
    }
  });
  res.redirect("/experiance");
});

//Add Services
app.get("/services", (req, res) => {
  Services.find({ is_active: 1 })
    .then(reslut => {
      res.render("d-services", { services: reslut });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/services/add", (req, res) => {
  console.log(req.body);
  const serv = new Services({
    name: req.body.name,
    description: req.body.description,
  });
  serv.save((error, result) => {
    if (error) console.log(error.message);
    else console.log(result);
  });

  console.log("data inserted successful");
  res.redirect("/services");
});

// Update Servicess
app.post("/services/update/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Services.updateOne(
    { _id: id },
    { name: req.body.name, description: req.body.description },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Docs : ", docs);
      }
    }
  );
  res.redirect("/services");
});

// delete Services
app.post("/services/delete/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Services.updateOne({ _id: id }, { is_active: 0 }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Docs : ", docs);
    }
  });
  res.redirect("/services");
});

//Add myworks
app.get("/mywork", (req, res) => {
  Mywork.find({ is_active: 1 })
    .then(reslut => {
      res.render("mywork", { mywork: reslut });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/mywork/add", upload.single("image"), (req, res) => {
  console.log(req.body);
  const w = new Mywork({
    url: req.body.url,
    image: req.file.filename,
  });
  w.save((error, result) => {
    if (error) console.log(error.message);
    else console.log(result);
  });

  console.log("data inserted successful");
  res.redirect("/mywork");
});

// Update Experiance
app.post("/mywork/update/", upload.single("image"), (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Mywork.updateOne(
    { _id: id },
    { url: req.body.url, image: req.file.filename },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Docs : ", docs);
      }
    }
  );
  res.redirect("/mywork");
});

// delete Works
app.post("/mywork/delete/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Mywork.updateOne({ _id: id }, { is_active: 0 }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Docs : ", docs);
    }
  });
  res.redirect("/mywork");
});

app.get("/", async function (req, res, next) {
  var landing;
  await Landing.find({ is_active: 1 }).then(result => {
    landing = result;
  });
  var skills;
  await Skills.find({ is_active: 1 }).then(result => {
    skills = result;
  });
  var experiance;
  await Experiance.find({ is_active: 1 }).then(result => {
    experiance = result;
  });
  var services;
  await Services.find({ is_active: 1 }).then(result => {
    services = result;
  });
  var mywork;
  await Mywork.find({ is_active: 1 }).then(result => {
    mywork = result;
  });

  res.render("index", {
    landing,
    skills,
    experiance,
    services,
    mywork,
  });
});

// app.get("/dashboard", function (req, res, next) {
//   res.render("dashboard", { title: "Express" });
// });
app.get("/404", function (req, res, next) {
  res.render("404", { title: "Express" });
});
app.get("/authentication", function (req, res, next) {
  res.render("authentication", { title: "Express" });
});
app.get("/mywork", function (req, res, next) {
  res.render("mywork", { title: "Express" });
});
app.get("/experiance", function (req, res, next) {
  res.render("experiance", { title: "Express" });
});
app.get("/skills", function (req, res, next) {
  res.render("skills", { title: "Express" });
});
app.get("/services", function (req, res, next) {
  res.render("d-services", { title: "Express" });
});
app.get("/contact", function (req, res, next) {
  res.render("d-contact", { title: "Express" });
});

app.listen(process.env.PORT || 3000);
