console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const fs = require("fs");

//Mongodb chaqirish - mongodb objectini olib beradi-datbasega malumotlarni yozish va o'qish uchun
// const db = require("./server").db();


let user;
fs.readFile("database/user.json", "utf-8", (err, data) => {
    if(err) {
        console.log("ERROR:", err);
    } else {
        user = JSON.parse(data)
    }
});





// 1 bosqich - Kirish kodlar - public folder ochiq (css - imagesni bu yerga joylashtirish mumkin)
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//2 - session codes

//3 - view codes - backendni ichida html, frontend ni yasaymiz
app.set("views", "views");
app.set("view engine", "ejs");


//4 - Routing codes
/* 
app.get("/hello", function(req, res) {
    res.end(`<h1 style="background: red">HELLO WORLD<h1>`);
});


app.get("/gift", function(req, res) {
    res.end(`<h1 style="background: red">Siz sovgalar sahifasidasiz<h1>`);
});

*/
app.post("/create-item", (req, res) => {
  console.log(req.body); 
  console.log("user entered /create-item route");

  const new_Reja = req.body.reja;
  const db = require("./server").db();

  db.collection("plans").insertOne({ reja: new_Reja }, (err, data) => {
    if (err) {
      console.log(err);
      res.end("something went wrong");
    } else {
     res.end("successfully added"); }
  });
});


app.get("/", function (req, res) {
    console.log("user entered / route");
    const db = require("./server").db();
    db.collection("plans")
    .find({})
    .toArray((err, data) => {
        if(err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            console.log(data);
        res.render("reja", {items: data,}); 
        }
    });
});

app.get('/author', (req, res) => {
    res.render("author", {user: user});
});



module.exports = app;
