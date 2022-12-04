const express = require("express");
const router = express.Router();
const {handleError} = require('../controllers/errorHandler')
const Wish = require("../models/Wish");

/* Get all wishes from all resident */
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.username) {
      filter["username"] = req.query.username;
    }
    if (req.query.content) {
      filter["content"] = req.query.content;
    }
    const wishes = await Wish.getAll(filter);
    res.status(200).json({ wishes });
  } catch (err) {
    handleError(err, res, 500);
  }
});

/* Get all wishes from a resident */
router.get("/:username", async (req, res) => {
  try {
    const wishes = await Wish.getResidentWishes(req.params);
    res.status(200).json({ wishes });
  } catch (err) {
    handleError(err, res, 500);
  }
});

/* Change a wish from a specific resident */
router.put("/:username/:content", async (req, res) => {
  try {
    let wish = await Wish.update(req.params, req.body).then((event) => {
      //Socket
    var io = req.app.get('socketio')
    console.log(event);
    io.emit("updateWish", event)
    res.status(200).json(event);
    });
  } catch (err) {
    handleError(err, res, 500);
  }
});

/* Create a new wish */
router.post("/", async (req, res) => {
  try {
    let wish = await Wish.save(req.body);
    res.json(wish);
  } catch (err) {
    handleError(err, res, 500);
  }
});

module.exports = router;
