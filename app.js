console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const fs = require("fs");

//Mongodb chaqirish - mongodb objectini olib beradi-datbasega malumotlarni yozish uchun
const db = require("./server").db();
const mongodb = require("mongodb");
//const ObjectID = require("mongodb").ObjectID;


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
// 4 Routing code

app.post("/create-item", (req, res) => {
    console.log("user entered /create-item");
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
        res.json(data.ops[0]);
    });
});

app.post("/delete-item", (req, res) => {
    const id = req.body.id;
    db.collection("plans").deleteOne(
        { _id: new mongodb.ObjectId(id) },
        function (err, data) {
            res.json({ state: "success" });
        }
    );
});

app.post("/edit-item", (req, res) => {
    const data = req.body;
    console.log(data);
    db.collection("plans").findOneAndUpdate(
        { _id: new mongodb.ObjectId(data.id) },
        { $set: { reja: data.new_input } },
        () => {
            res.json({ state: "success" });
        }
    );
});

app.post("/delete-all", (req, res) => {
    if (req.body.delete_all) {
        db.collection("plans").deleteMany({}, function (err, result) {
            if (err) {
                console.log(err);
              return res.status(500).json({ state: "error" });
            }
            res.json({ state: "hamma rejalar o'chirildi" });
        });
    }
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
