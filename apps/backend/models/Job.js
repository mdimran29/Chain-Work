const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  description: { type: String, required: true, maxlength: 5000 },
  budget: { type: Number, required: true, min: 0 },
  timeline: { type: String, enum: ["2weeks", "1month", "longterm"], required: true },
  chain: { type: String, enum: ["solana", "ethereum", "polygon"], required: true },
  skills: [{ type: String, trim: true }],
  status: {
    type: String,
    enum: ["open", "active", "review", "completed", "disputed", "cancelled"],
    default: "open",
  },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  // On-chain fields
  escrowAddress: { type: String, default: null },
  freelancerWallet: { type: String, default: null },
  txHash: { type: String, default: null },
  proposals: [
    {
      freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      freelancerWallet: { type: String },
      bid: { type: Number, required: true, min: 0 },
      coverLetter: { type: String, maxlength: 2000 },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// Indexes
JobSchema.index({ status: 1 });
JobSchema.index({ client: 1 });
JobSchema.index({ chain: 1 });
JobSchema.index({ skills: 1 });
JobSchema.index({ createdAt: -1 });
JobSchema.index({ escrowAddress: 1 });

// Virtual field for proposal count
JobSchema.virtual("proposalCount").get(function () {
  return this.proposals ? this.proposals.length : 0;
});

module.exports = mongoose.model("Job", JobSchema);
