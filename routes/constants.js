const express = require("express");
const {
  createConstant,
  deleteConstant,
  editConstant,
  getAllConstants,
} = require("../controllers/constants");

const router = express.Router();

// Routes for constants

router.get("/all", getAllConstants);

router.post("/create", createConstant);

router.delete("/delete/:id", deleteConstant);

router.put("/edit/:id", editConstant);

module.exports = router;
