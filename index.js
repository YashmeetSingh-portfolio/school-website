//importing / requiring all the required components
// const express = require('express');
// const path = require('path');
import path from 'path';
// const basePath = __dirname;
// const fs = require('fs')
// const ejs = require('ejs');


const acounts = [];
import pg from "pg";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
//intitialising some variables

var link = "";
var b=0;




//intitialising all the objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var contentOfejs = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8919319784858816" crossorigin="anonymous"></script><link rel="icon" type="image/png" href="New Project.png" /><link rel="shortcut icon" type="image/x-icon" href="favicon.png"><link rel="stylesheet" href="css/utils.css"><link rel="shortcut icon" type="image/x-icon" href="favicon.png"><link rel="stylesheet" href="style_index.css"><link rel="stylesheet" href="mobile.css"><title>yashcodeblogs</title></head><body><nav class="navigation max-width-1 m-auto"><div class="nav-left"><a href="/"><span><img src="favicon.png" width="254px" alt=""></span></a><ul><li><a href="/home">Home</a></li><li><a href="#">About</a></li><li><a href="/contact">Contact</a></li><li><a href="/">Logout</a></li></ul></div><div class="nav-right"><!--hey yashmeet is the best person in this world and i am doing touch typing by standing and belief me it is full of errorsy--></div></nav><div class="max-width-1 m-auto"><hr></div><div class="m-auto content max-width-1 my-2"><div class="content-left"><h1><%=titleOf %></h1><p><%=contentOf%></h1></div><div class="content-right"><img src="img/home.svg" alt="yashcodeblogs"></div></div><hr><div class="max-width-1 m-auto last_div"></div></div><div class="footer"><p>Copyright &copy; yashcodeblogs.in </p><a href="https://www.vecteezy.com/free-vector/typewriter">Vector Credits: Vecteezy</a></div></body></html>'
let blognames = [];
let blogtitles = [];
let blogcontents = [];
app.use(express.static('views'));
let homeWork = "chemistry learn full syllabus";
let cl;
let sec;
//opening the page postblog

//opening the home page
app.get("/", (req, res) => {
    const filePath = path.join(basePath, 'views', 'index.html');
});
//initalizing database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "homework",
    password: "yASHMEET09",
    port: 5432,
  });
  db.connect();

app.get("/homework", (req, res) => {
    res.render("select_class.ejs");
});
app.post("/login",(req,res)=>{
   const username = req.body.username;
   const password = req.body.password;
   console.log(username);
   console.log(password);
   if(username==="gips123" && password==="Gips987"){
    res.redirect("/givehomework");
   }
   else{
    res.send("Wrong password you may try again by going on homepage");
   }

});
app.get("/stafflogin",(req,res)=>{
 res.render("stafflogin.ejs");      
});
app.get("/about", (req, res) => {
    res.render('about.ejs');
});
//declaring some vars & consts


//posting a blog


app.post("/showHomework", (req, res) => {
     cl = req.body["class"];
     sec = req.body["section"];
    res.redirect("/show");
    
});
app.get("/givehomework",(req,res)=>{
 res.render("givehomework.ejs");
});
app.get("/show", async (req, res) => {
    try {
        const classValue = cl; // You can set this dynamically based on your requirements
        const sectionValue = sec; // Set this dynamically as well
        var nowork = ' ';   
        const hquery = await db.query(
            "SELECT homework FROM homework WHERE class = $1 AND section = $2",
            [classValue, sectionValue] // Pass the values as an array
        );

        const homework = hquery.rows.map(row => row.homework);
        
        
        console.log(homework);
        res.render('homework.ejs', { homework });
        
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
app.post("/giveHomework", async (req, res) => {
    const cll = req.body.class;
    const sec = req.body.section;
    const homw = req.body.homework;
    try {
        
        await db.query(
            "UPDATE homework SET homework = $1 WHERE class = $2 AND section = $3",
            [homw,cll, sec] // Pass the values as an array
        );

        
        
        
        
        res.render("given.ejs")
        
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});





//opening the blogs page


//redirecting to the first blog

//redirecting to homepage
app.get('/home', (req, res) => {
    res.redirect('/');
});
// opening contacts page
app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});




//running the website
app.listen(port, () => {
    console.log("server is running on http://localhost:"+port);
});