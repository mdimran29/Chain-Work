const crypto = require("crypto");
const User = require("../models/User");
const Challenge = require("../models/Challenge");
const { signToken } = require("../utils/auth");
const { verifyWalletSignature } = require("../utils/solana");

const register = async (req, res) => {
  try {
    const { username, email, password, role, skills, bio, walletAddress } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(409).json({ error: "Username or email already taken" });
    }

    const user = new User({ username, email, password, role, skills, bio, walletAddress });
    await user.save();

    const token = signToken({ userId: user._id, role: user.role });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        skills: user.skills,
        bio: user.bio,
        trustScore: user.trustScore,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate field value" });
    }
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: email }],
    }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ userId: user._id, role: user.role });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        skills: user.skills,
        bio: user.bio,
        trustScore: user.trustScore,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

const challenge = async (req, res) => {
  try {
    const { publicKey } = req.body;
    if (!publicKey) {
      return res.status(400).json({ error: "Missing publicKey" });
    }

    const nonce = crypto.randomBytes(32).toString("hex");
    const message = `Sign this message to verify your wallet ownership.\nNonce: ${nonce}`;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Challenge.findOneAndUpdate(
      { publicKey },
      { nonce, message, expiresAt },
      { upsert: true, new: true },
    );

    res.status(200).json({ message, nonce });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate challenge" });
  }
};

const verify = async (req, res) => {
  try {
    const { publicKey, signature } = req.body;
    if (!publicKey || !signature) {
      return res.status(400).json({ error: "Missing publicKey or signature" });
    }

    const challenge = await Challenge.findOne({ publicKey });
    if (!challenge) {
      return res.status(401).json({ error: "No challenge found. Request a new one." });
    }

    if (challenge.expiresAt < new Date()) {
      return res.status(401).json({ error: "Challenge expired. Request a new one." });
    }

    const valid = verifyWalletSignature(publicKey, signature, challenge.message);
    if (!valid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    await Challenge.deleteOne({ publicKey });

    const user = await User.findOne({ walletAddress: publicKey });

    if (user) {
      const token = signToken({ userId: user._id, role: user.role });
      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          walletAddress: user.walletAddress,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        publicKey,
        message: "Wallet verified. Complete registration.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
};

module.exports = { register, login, challenge, verify };
