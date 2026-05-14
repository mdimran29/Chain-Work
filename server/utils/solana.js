const nacl = require('tweetnacl');
const bs58 = require('bs58');

const verifyWalletSignature = (publicKey, signature, message) => {
  try {
    const publicKeyBytes = bs58.decode(publicKey);
    const signatureBytes = bs58.decode(signature);
    const messageBytes = new Uint8Array(Buffer.from(message));
    
    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  } catch (error) {
    return false;
  }
};

module.exports = { verifyWalletSignature };
