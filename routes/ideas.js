//to create seperate files for routes, we have to use the router
//so we need express js
const express = require("express");
const router = express.Router();

//Body parser middlewear
router.use(express.json()); //will allow us to send raw json to server
router.use(express.urlencoded({ extended: false }));
//this allows us to acccess the request.body

let ideas = [
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

//get all ideas
router.get("/", (req, res) => {
  //simple route to / which will return hello world
  //   res.send("hello world");
  res.json({ success: true, data: ideas });
});

//get a single idea
router.get("/:id", (req, res) => {
  const idea = ideas.find((obj) => obj.id === +req.params.id); //need to cast it because req params is a string

  if (!idea) {
    //we can change the status
    return res
      .status(404)
      .json({ success: false, data: { message: "invalid data" } });
    //we return so it doesnt run the next line, otherwise we could just use else
  }
  res.json({ success: true, data: idea });
});

//Add an idea

router.post("/", (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username, //you would usually have some form of authentication for this
    date: new Date().toISOString().slice(0, 10), //will give us just the date
  };

//   console.log(idea)
  ideas.push(idea)

  res.json({success: true, data: idea});
});


//update idea
router.put("/:id", (req, res) => {
  const idea = ideas.find((obj) => obj.id === +req.params.id); //need to cast it because req params is a string

  if (!idea) {
    //we can change the status
    return res
      .status(404)
      .json({ success: false, data: { message: "invalid data" } });
    //we return so it doesnt run the next line, otherwise we could just use else
  }
  //so above is still the same of getting that idea

  //updating the idea
  idea.text = req.body.text || idea.text
  idea.tag = req.body.tag || idea.tag

  res.json({ success: true, data: idea });
});


router.delete('/:id', (req, res) => {
  //   const index = ideas.findIndex((obj) => obj.id === +req.params.id);
  //   console.log(index)

  //   if (index == -1) {
  //   //we can change the status
  //   return res
  //     .status(404)
  //     .json({ success: false, data: { message: "invalid data" } });
  //   //we return so it doesnt run the next line, otherwise we could just use else
  // }

  // ideas.splice(index, 1)

  //or 
  //const id = ideas.find(idea => idea.id ===  +req.params.id)
  //const index = ideas.findIndex(id)
  //ideas.splice(index, 1)

  //or just
  const currLength = ideas.length
  ideas = ideas.filter(idea => idea.id !== +req.params.id)
  if(ideas.length === currLength) {
       return res
      .status(404)
      .json({ success: false, data: { message: "invalid delete" } });
    //we return so it doesnt run the next line, otherwise we could just use else
  
  }

  return res.status(200).json({success: true, message: 'delete successful', data: ideas})



})

module.exports = router;

//req is everything the client sent to your server
//ie will look like this: req = {
//   method: "POST",
//   url: "/",
//   headers: { ... },
//   body: { name: "Ali", age: 25 },
//   params: {},
//   query: {},
//   cookies: {},
//   ip: "127.0.0.1",
//   ...
// }

//res is what you will send back to the server
