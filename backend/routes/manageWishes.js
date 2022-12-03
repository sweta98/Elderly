const express = require("express");
const router = express.Router();
const Wish = require("../models/Wish");

router.get("/", async (_req, res) => {
  try {
    const wishes = await Wish.getAll(true);
    res.status(200).json({ wishes });
  } catch (err) {
    handleError(err, res, 500);
  }
});

router.put("/:username/:wish", async (req, res) => {
  try {
    let wish = await Wish.update(req.params, req.body);
    res.status(200).json(wish);
  } catch (err) {
    handleError(err, res, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    let wish = await Wish.save(req.body);
    res.json(wish);
  } catch (err) {
    handleError(err, res, 500);
  }
});

module.exports = router;
