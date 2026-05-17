const Job = require("../models/Job");
const User = require("../models/User");

// ─── Helper: find or create user by walletAddress ─────────────────────────
async function findOrCreateUser(walletAddress) {
  let user = await User.findOne({ walletAddress });
  if (!user) {
    user = new User({
      username: walletAddress.slice(0, 8) + "_" + Math.random().toString(36).slice(2, 6),
      email: `${walletAddress.slice(0, 12)}@chainwork.io`,
      password: "wallet_auth_" + Math.random().toString(36).slice(2),
      role: "client",
      walletAddress,
    });
    await user.save();
  }
  return user;
}

// ─── GET /api/jobs ─────────────────────────────────────────────────────────
const listJobs = async (req, res) => {
  try {
    const { status, chain, wallet } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (chain) filter.chain = chain;

    if (wallet) {
      // Find jobs where this wallet is the client or freelancer
      const user = await User.findOne({ walletAddress: wallet });
      if (user) {
        filter.$or = [{ client: user._id }, { freelancer: user._id }];
      } else {
        return res.json([]);
      }
    }

    const jobs = await Job.find(filter)
      .populate("client", "username walletAddress avatar")
      .populate("freelancer", "username walletAddress avatar")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── POST /api/jobs ────────────────────────────────────────────────────────
// Create a job (no escrow yet — two-phase flow)
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      budget,
      timeline,
      chain,
      skills,
      walletAddress,
      escrowAddress,
      txHash,
      freelancerWallet,
    } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: "walletAddress is required" });
    }

    const user = await findOrCreateUser(walletAddress);

    // Normalise timeline
    const normalTimeline = ["2weeks", "1month", "longterm"].includes(timeline)
      ? timeline
      : "2weeks";
    // Normalise chain
    const normalChain = ["solana", "ethereum", "polygon"].includes((chain || "").toLowerCase())
      ? chain.toLowerCase()
      : "solana";

    const job = new Job({
      title,
      description,
      budget,
      timeline: normalTimeline,
      chain: normalChain,
      skills: skills || [],
      client: user._id,
      escrowAddress: escrowAddress || null,
      freelancerWallet: freelancerWallet || null,
      txHash: txHash || null,
      status: escrowAddress ? "active" : "open",
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("createJob error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ─── GET /api/jobs/:id ─────────────────────────────────────────────────────
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("client", "username walletAddress avatar")
      .populate("freelancer", "username walletAddress avatar");
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── PATCH /api/jobs/:id ───────────────────────────────────────────────────
const updateJob = async (req, res) => {
  try {
    const allowedFields = ["title", "description", "budget", "timeline", "skills", "status"];
    const update = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    }
    const job = await Job.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── POST /api/jobs/:id/fund-escrow ───────────────────────────────────────
// Client calls this after initializing the escrow on-chain
const fundEscrow = async (req, res) => {
  try {
    const { escrowAddress, freelancerWallet, txHash, walletAddress } = req.body;

    if (!escrowAddress || !freelancerWallet || !txHash) {
      return res
        .status(400)
        .json({ error: "escrowAddress, freelancerWallet, and txHash are required" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    // Find the freelancer user if they exist
    const freelancerUser = await User.findOne({ walletAddress: freelancerWallet });

    job.escrowAddress = escrowAddress;
    job.freelancerWallet = freelancerWallet;
    job.txHash = txHash;
    job.status = "active";
    if (freelancerUser) job.freelancer = freelancerUser._id;

    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── POST /api/jobs/:id/accept ────────────────────────────────────────────
// Freelancer calls this after calling sdk.accept() on-chain
const acceptJob = async (req, res) => {
  try {
    const { txHash, walletAddress } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.status !== "active") {
      return res.status(400).json({ error: "Job must be in active state to accept" });
    }

    // Register the freelancer if needed
    if (walletAddress && !job.freelancer) {
      const freelancerUser = await findOrCreateUser(walletAddress);
      freelancerUser.role = "freelancer";
      await freelancerUser.save();
      job.freelancer = freelancerUser._id;
      job.freelancerWallet = walletAddress;
    }

    if (txHash) job.txHash = txHash;

    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── POST /api/jobs/:id/deliver ───────────────────────────────────────────
// Freelancer marks work as submitted for review
const deliverJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.status !== "active") {
      return res.status(400).json({ error: "Job must be active to deliver" });
    }

    job.status = "review";
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── POST /api/jobs/:id/release ───────────────────────────────────────────
// Client calls this after sdk.releaseSol() succeeds on-chain
const releasePayment = async (req, res) => {
  try {
    const { txHash } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (!["active", "review"].includes(job.status)) {
      return res.status(400).json({ error: "Job must be active or in review to release payment" });
    }

    job.status = "completed";
    if (txHash) job.txHash = txHash;
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── POST /api/jobs/:id/cancel ────────────────────────────────────────────
// Client calls this after sdk.cancelSol() succeeds on-chain
const cancelJob = async (req, res) => {
  try {
    const { txHash } = req.body;

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.status === "completed") {
      return res.status(400).json({ error: "Cannot cancel a completed job" });
    }

    job.status = "cancelled";
    if (txHash) job.txHash = txHash;
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── POST /api/jobs/:id/proposals ─────────────────────────────────────────
const submitProposal = async (req, res) => {
  try {
    const { bid, coverLetter, walletAddress } = req.body;
    if (!bid) return res.status(400).json({ error: "bid is required" });

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.status !== "open") {
      return res.status(400).json({ error: "Job is not open for proposals" });
    }

    let freelancerUser = null;
    if (walletAddress) {
      freelancerUser = await findOrCreateUser(walletAddress);
      freelancerUser.role = "freelancer";
      await freelancerUser.save();
    }

    job.proposals.push({
      freelancer: freelancerUser ? freelancerUser._id : undefined,
      freelancerWallet: walletAddress || undefined,
      bid,
      coverLetter,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ─── PATCH /api/jobs/:id/proposals/:pid ───────────────────────────────────
const updateProposal = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const proposal = job.proposals.id(req.params.pid);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    if (req.body.status) proposal.status = req.body.status;
    if (req.body.coverLetter) proposal.coverLetter = req.body.coverLetter;

    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listJobs,
  createJob,
  getJob,
  updateJob,
  fundEscrow,
  acceptJob,
  deliverJob,
  releasePayment,
  cancelJob,
  submitProposal,
  updateProposal,
};
