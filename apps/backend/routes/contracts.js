const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractController");

router.get("/", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.post("/", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.get("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.patch("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.post("/:id/proposals", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.patch("/:id/proposals/:pid", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

module.exports = router;
