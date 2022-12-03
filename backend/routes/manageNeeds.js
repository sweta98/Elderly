const express = require("express");
const router = express.Router();
const ManageNeeds = require("../models/ManageNeeds");

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.resident) {
      filter["resident"] = req.query.resident;
    }
    if (req.query.need) {
      filter["need"] = req.query.need;
    }
    console.log("route");
    console.log(filter);
    const needs = await ManageNeeds.getAll(filter);
    res.status(200).json({ needs });
  } catch (err) {
    handleError(err, res, 500);
  }
});

router.put("/:resident/:need", async (req, res) => {
  try {
    let need = await ManageNeeds.update(req.params, req.body);
    res.status(200).json(need);
  } catch (err) {
    handleError(err, res, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    let need = await ManageNeeds.saveNeed(req.body);
    res.json(need);
  } catch (err) {
    handleError(err, res, 500);
  }
});

module.exports = router;
