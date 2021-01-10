const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const geocode=require('./Utils/geocode')
const forecast=require('./Utils/forecast')

//Define paths for Express Config
const htmlPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
//hbs handle bars

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(htmlPath));
//render is used to render  pages
app.get("", (req, res) => {
  res.render("index", {
    title: "WEATHER APP",
    name: "Ayush Srivastava",
    age: 23,
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT",
    description: "Welcome to the about page",
    name: "Ayush Srivastava",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    description: "This is Help Page",
    name: "Ayush Srivastava",
    age: 23,
  });
});
// render is used to render hbs file
app.get("/weather",  (req, res)=> {
    if(!req.query.address){
        return res.send({
            error:'Please provide the address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{// the empty object is required becaause if address doesnt exists then it will fail
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                address:req.query.address,
                location
            })
        })
    })
});

app.get("/products", function (req, res) {
  //to see all the query string pass in url
  if (!req.query.search) {
    return res.send({
      error: "You must provide the search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
  //we can't use res.send more than once only one is allowed to get render
  //the error u will get is Cannot set headers after they are sent to the client
});
app.get("/help/*", (req, res) => {
  // res.send('Help Article Not Found')
  res.render("error", {
    errorMessage: "Help Article Not Found",
    name: "Ayush Srivastava",
  });
});
//* is wildcard which means everything is a match
app.get("*", (req, res) => {
  // res.send('My 404 page')
  res.render("error", {
    errorMessage: "My 404 Page",
    name: "Ayush Srivastava",
  });
});
app.listen(3000, () => {
  console.log("server is running on Port 3000");
});

//////PS NNOTE :====    Nodemon does not restart when there is any changes in hbs files
///because express and hbs have to load the new templates which are created for more and detailed info
// need to do RND
// to solve this issue write this cmnd nodemon filename -e js,hbs
