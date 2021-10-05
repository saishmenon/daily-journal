const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");

const port = 3000;
const homeStartingContent = "Hello, my name is Saísh. I'm currently the lead UX Architect for the Design System team at American Specialty Health Inc.";
const aboutContent = "My name is Saish Menon and I’m a Product Designer living in San Diego. I’ve been in the design industry for nearly 4 years now and I currently work at American Specialty Health Inc. leading a small platform team with the goal to bridge the gaps between design and development for product teams. I consider myself to be a generalist partly because it gives me a broad sense of everything and cues me to zoom into the right pieces and become a specialist there if need be. I’m usually inclined to explore non-traditional domains.";
const contactContent = "You can find me in a few online spaces where my username is usually 'saishmenon'";

const app = express();

//Global Variables
var posts = [];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Home Page
app.get("/", function(req, res){
    res.render("home", {
        homeContent: homeStartingContent, 
        postsList: posts
    });
});

//About page
app.get("/about", function(req, res){
    res.render("about", {aboutMe: aboutContent});
});

//Contact Page
app.get("/contact", function(req, res){
    res.render("contact", {contactMe: contactContent});
});

//Compose Page
app.get("/compose", function(req, res){
    res.render("compose");
});

// Other routes
app.get("/posts/:postName", function(req, res){
    
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){
        
        const storedTitle = _.lowerCase(post.title);
        const storedContent = post.body;

        if(storedTitle === requestedTitle){
            res.render("post", {
                title: post.title,
                content: post.body
            });
        }
    });
});



//Request from the compose page
app.post("/compose", function(req, res){
    let postTitle = req.body.postTitle;
    let postBody = req.body.postBody;
    
    let post = {
        title: postTitle,
        body: postBody
    };

    posts.push(post);

    res.redirect("/");
});

app.listen(port, function(){
    console.log(`Server started at port: ${port}`);
});