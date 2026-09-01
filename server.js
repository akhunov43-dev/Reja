console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const http = require("http")

const fs = require("fs");

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
res.json({test: "success"});
});

app.get("/", function (req, res) {
    res.render('reja');
});

app.get('/author', (req, res) => {
    res.render("author", {user: user});
});




const server = http.createServer(app);
let PORT = 3000
server.listen(PORT, function(){
    console.log(`The server is running succesfully working on port: ${PORT}, http://localhost:${PORT}`);
});