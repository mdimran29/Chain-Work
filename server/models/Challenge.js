const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  publicKey: { type: String, required: true, unique: true },
  nonce:     { type: String, required: true },
  message:   { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
