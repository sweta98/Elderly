const express = require("express");
const router = express.Router();
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
    let wish = await Wish.update(req.params, req.body);
    res.status(200).json(wish);
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
