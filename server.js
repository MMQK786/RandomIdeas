//our entry point

const express = require("express");
require('dotenv').config();
const port = process.env.PORT || 5000; //if it cant dind the port then just do 5000
const app = express();
const connectDB = require('./config/db');


connectDB();


//creating routes
app.get("/", (req, res) => {
  //simple route to / which will return hello world
  //   res.send("hello world");
  res.json({ message: "Welcome to randoms API" }); //does the same thing but expects a json
}); //every route, we have a request and response object

const ideasRouter = require("./routes/ideas");

app.use("/api/ideas", ideasRouter); //we are basically saying before the / in the ideas.js router, use this
//so it would be: /api/ideas/
//so it would be: /api/ideas/id

app.listen(port, () => {
  console.log("server listening on port " + port);
});
//simple express server

//think of it like this:
//you would commit the package.json but not the node module
// package.json     = recipe
// package-lock.json = shopping list
// node_modules      = cooked food
