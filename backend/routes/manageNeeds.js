const express = require("express");
const router = express.Router();
const ManageNeeds = require("../models/ManageNeeds");

router.get("/", async (_req, res) => {
  try {
    const needs = await ManageNeeds.getAll(true);
    res.status(200).json({ needs });
  } catch (err) {
    handleError(err, res, 500);
  }
});

router.put("/:resident/:need", async (req, res) => {
  try {
    let need = await ManageNeeds.update(req.params.username, req.body);
    res.json(need);
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
