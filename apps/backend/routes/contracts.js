const express = require("express");
const router = express.Router();
const c = require("../controllers/contractController");

// Job CRUD
router.get("/", c.listJobs);
router.post("/", c.createJob);
router.get("/:id", c.getJob);
router.patch("/:id", c.updateJob);

// Escrow lifecycle actions
router.post("/:id/fund-escrow", c.fundEscrow);
router.post("/:id/accept", c.acceptJob);
router.post("/:id/deliver", c.deliverJob);
router.post("/:id/release", c.releasePayment);
router.post("/:id/cancel", c.cancelJob);

// Proposals
router.post("/:id/proposals", c.submitProposal);
router.patch("/:id/proposals/:pid", c.updateProposal);

module.exports = router;
