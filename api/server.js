const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

// server.get("/", (req, res) => {
//   res.status(200).json({ api: "up" });
// });

// server.get("/hobbits", (req, res) => {
 
// });

// server.get("/hobbits/id", (req, res) => {

// });

server.post("/hobbits", async (req, res, next) => {
    try {
        res.status(201)
            .json(await Hobbits.insert(req.body))
    } catch (err) {
        next(err)
    }
});

server.delete("/hobbits/:id", async (req, res, next) => {
  try{
      res.status(200)
        .json(await Hobbits.remove(req.params.id))
  } catch (err) {
      next(err)
  }
});

// server.put("/hobbits/:id", (req, res) => {
  
// });

module.exports = server;
