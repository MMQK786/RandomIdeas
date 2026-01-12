//our entry point

const express = require("express");
const port = 5000;
const app = express();

const ideas = [
  {
    id: 1,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "TonyStark",
    date: "2022-01-02",
  },
  {
    id: 2,
    text: "Milk cartons that turn a different color the older that your milk is getting",
    tag: "Inventions",
    username: "SteveRogers",
    date: "2022-01-02",
  },
  {
    id: 3,
    text: "ATM location app which lets you know where the closest ATM is and if it is in service",
    tag: "Software",
    username: "BruceBanner",
    date: "2022-01-02",
  },
];

//creating routes
app.get("/", (req, res) => {
  //simple route to / which will return hello world
  //   res.send("hello world");
  res.json({ message: "Welcome to randoms API" }); //does the same thing but expects a json
}); //every route, we have a request and response object

//get all ideas
app.get("/api/ideas", (req, res) => {
  //simple route to / which will return hello world
  //   res.send("hello world");
  res.json({ success: true, data: ideas });
});

//get a single idea

app.get("/api/idea/:id", (req, res) => {
  const idea = ideas.find(obj => obj.id === +req.params.id) //need to cast it because req params is a string

  if(!idea) {
    //we can change the status
    return res.status(404).json({success: false, data : {message: 'invalid data'}})
    //we return so it doesnt run the next line, otherwise we could just use else
  }
  res.json({ success: true, data: idea });
});

app.listen(port, () => {
  console.log("server listening on port " + port);
});
//simple express server



//think of it like this:
//you would commit the package.json but not the node module
// package.json     = recipe
// package-lock.json = shopping list
// node_modules      = cooked food