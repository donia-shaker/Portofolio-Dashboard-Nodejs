var express = require('express');
var app = express();
const { default: mongoose } = require("mongoose");
app.set('view engine', 'ejs');
app.use(express.static( 'public/'));
app.use(express.urlencoded());
const multer = require("multer");
const Experiance = require("./public/js/experiance");
const Skills = require("./public/js/skills");
const Services = require("./public/js/services");
const Mywork = require("./public/js/mywork");
const Landing = require('./public/js/landing');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg")
      cb(null, "public/images/");
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
      file.mimetype == "image/jpg" ||
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

  //Add Skills
  // app.get("/landing", (req, res) => {
  //   Landing.find({ is_active: 1 }).then(reslut => {
  //     res.render("landing", { landing: reslut });
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // });
  
  // app.post("/landing/add",upload.single('image'), (req, res) => {
  //   console.log(req.body);
  //   const l = new Landing({
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     add:req.body.lastName,
  //     email:req.body.lastName,
  //     image: req.file.filename
  //   });
  //   l.save((error,result)=>{
  //     if(error)
  //    console.log(error.message);
  //     else
  //     console.log(result);
  // });

  // console.log("data inserted successful");
  //   res.redirect("/dashboard");
  // });

   // Update landing
// app.post("/landing/update/",upload.single('image'), (req, res, next) => {
//   var id = req.body.id;

//   console.log(req.body.id);

//   Skills.updateOne({ _id:id }, { firstName: req.body.firstName}, { lastName: req.body.lastName},{add:req.body.lastName},{email:req.body.lastName},{ image: req.file.filename
//   }, function (err, docs) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Updated Docs : ", docs);
//     }});
  
//   res.redirect("/dashboard");
// });


  //Add Skills
  app.get("/skills", (req, res) => {
    Skills.find({ is_active: 1 }).then(reslut => {
      res.render("skills", { skills: reslut });
    }).catch(error => {
      console.log(error);
    });
  });
  
  app.post("/skills/add",upload.single('image'), (req, res) => {
    console.log(req.body);
    const s = new Skills({
      name: req.body.name,
      image: req.file.filename
    });
    s.save((error,result)=>{
      if(error)
     console.log(error.message);
      else
      console.log(result);
  });

  console.log("data inserted successful");
    res.redirect("/skills");
  });

   // Update Skill
app.post("/skills/update/",upload.single('image'), (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Skills.updateOne({ _id:id }, { name: req.body.name},{ image: req.file.filename
  }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }});
  
  res.redirect("/skills");
});

  // delete Skill
app.post("/skills/delete/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Skills.updateOne({ _id:id }, { is_active: 0 }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }});
  res.redirect("/skills");
});

    //Add Experiance
    app.get("/experiance", (req, res) => {
      Experiance.find({ is_active: 1 }).then(reslut => {
        res.render("experiance", { experiance: reslut });
      }).catch(error => {
        console.log(error);
      });
    });
    
    app.post("/experiance/add",upload.single('image'), (req, res) => {
      console.log(req.body);
      const e = new Experiance({
        name: req.body.name,
        place: req.body.place,
        start: req.body.start,
        end: req.body.end,
        image: req.file.filename
      });
      e.save((error,result)=>{
        if(error)
       console.log(error.message);
        else
        console.log(result);
    });
  
    console.log("data inserted successful");
      res.redirect("/experiance");
    });

    // Update Experiance
  app.post("/experiance/update/",upload.single('image'), (req, res, next) => {
    var id = req.body.id;
  
    console.log(req.body.id);
  
    Experiance.updateOne({ _id:id }, { name: req.body.name},{ image: req.file.filename
    }, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }});
    res.redirect("/experiance");
  });

 // delete experiance
 app.post("/experiance/delete/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Experiance.updateOne({ _id: id }, { is_active: 0 }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }});
  res.redirect("/experiance");
});

    //Add Services
    app.get("/services", (req, res) => {
      Services.find({ is_active: 1 }).then(reslut => {
        res.render("d-services", { services: reslut });
      }).catch(error => {
        console.log(error);
      });
    });
    
    app.post("/services/add", (req, res) => {
      console.log(req.body);
      const serv = new Services({
        name: req.body.name });
        serv.save((error,result)=>{
        if(error)
       console.log(error.message);
        else
        console.log(result);
    });
  
    console.log("data inserted successful");
      res.redirect("/services");
    });

    // Update Servicess
  app.post("/services/update/", (req, res, next) => {
    var id = req.body.id;
  
    console.log(req.body.id);
  
    Services.updateOne({ _id:id }, { name: req.body.name}, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }});
    res.redirect("/services");
  });

// delete Services
app.post("/services/delete/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Services.updateOne({ _id: id }, { is_active: 0 }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }});
  res.redirect("/services");
});
    
    //Add myworks
    app.get("/mywork", (req, res) => {
      Mywork.find({ is_active: 1 }).then(reslut => {
        res.render("mywork", { mywork: reslut });
      }).catch(error => {
        console.log(error);
      });
    });
    
    app.post("/mywork/add",upload.single('image'), (req, res) => {
      console.log(req.body);
      const w = new Mywork({
        url: req.body.url,
        image: req.file.filename
      });
      w.save((error,result)=>{
        if(error)
       console.log(error.message);
        else
        console.log(result);
    });
  
    console.log("data inserted successful");
      res.redirect("/mywork");
    });

 // Update Experiance
 app.post("/mywork/update/",upload.single('image'), (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Mywork.updateOne({ _id:id }, { url: req.body.url},{ image: req.file.filename
  }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }});
  res.redirect("/mywork");
});

// delete Works
app.post("/mywork/delete/", (req, res, next) => {
  var id = req.body.id;

  console.log(req.body.id);

  Mywork.updateOne({ _id: id }, { is_active: 0 }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }});
  res.redirect("/mywork");
});


app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  app.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Express' });
  });
  app.get('/mywork', function(req, res, next) {
    res.render('mywork', { title: 'Express' });
  });
  app.get('/experiance', function(req, res, next) {
    res.render('experiance', { title: 'Express' });
  });
  app.get('/skills', function(req, res, next) {
    res.render('skills', { title: 'Express' });
  });
  app.get('/services', function(req, res, next) {
    res.render('d-services', { title: 'Express' });
  });
  app.get('/contact', function(req, res, next) {
    res.render('d-contact', { title: 'Express' });
  });

app.listen(3000);