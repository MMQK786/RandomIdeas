//to create seperate files for routes, we have to use the router
//so we need express js
const express = require("express");
const router = express.Router();

const idea = require("../models/Idea");
const Idea = require("../models/Idea");

//Body parser middlewear
router.use(express.json()); //will allow us to send raw json to server
router.use(express.urlencoded({ extended: false }));
//this allows us to acccess the request.body

let ideas = [
  //   {
  //     id: 1,
  //     text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
  //     tag: "Technology",
  //     username: "TonyStark",
  //     date: "2022-01-02",
  //   },
  //   {
  //     id: 2,
  //     text: "Milk cartons that turn a different color the older that your milk is getting",
  //     tag: "Inventions",
  //     username: "SteveRogers",
  //     date: "2022-01-02",
  //   },
  //   {
  //     id: 3,
  //     text: "ATM location app which lets you know where the closest ATM is and if it is in service",
  //     tag: "Software",
  //     username: "BruceBanner",
  //     date: "2022-01-02",
  //   },
];

//get all ideas
router.get("/", async (req, res) => {
  try {
    // Idea.find().then(result => res.json({ success: true, data: result }));
    //.find() is async, res.json() must happen AFTER its resolved, so doing it on the next line wont work

    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(RangeError);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }

  //we are going to use our model, then .find() to find the documents in a database, and that is an async process
});

//get a single idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, data: { message: "invalid data" } });
  }
});

//Add an idea

router.post("/", async (req, res) => {
  const idea = new Idea({
    // id: ideas.length + 1, //no longer need the idea, thats created with mongo now
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username, //you would usually have some form of authentication for this
    // date: new Date().toISOString().slice(0, 10), same with the date
  });

  try {
    const savedIdea = await idea.save(); //this will save it to database, they are all asynchronous tasks
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

//update idea
router.put("/:id", async (req, res) => {
  try {
    // const idea = await Idea.findById(req.params.id);
    // //updating the idea
    // console.log(idea)
    // idea.text = req.body.text || idea.text
    // idea.tag = req.body.tag || idea.tag
    // const updated = await idea.save()

    //even easier than that
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true } //if the id doesnt exist, then just create a new object and add it
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: "invalid data" } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Idea.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "delete successful", data: deleted });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, error: "There was an error" });
  }
});

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
