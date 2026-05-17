#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const dotenv = require("dotenv");
const bs58 = require("bs58");
const { Keypair } = require("@solana/web3.js");
const bs58Decode = (bs58 && typeof bs58.decode === "function" ? bs58.decode : bs58.default?.decode);

const projectRoot = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(projectRoot, ".env") });

const privateKeyRaw = (process.env.SOLANA_PRIVATE_KEY || "").trim();
const cluster = (process.env.SOLANA_CLUSTER || "devnet").trim();

if (!privateKeyRaw) {
  console.error("❌ SOLANA_PRIVATE_KEY is missing in contract/.env");
  process.exit(1);
}

const parseSecretKey = (value) => {
  if (value.startsWith("[")) {
    const arr = JSON.parse(value);
    if (!Array.isArray(arr)) throw new Error("Invalid JSON array private key format.");
    return Uint8Array.from(arr);
  }

  if (value.includes(",")) {
    const arr = value
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => Number.parseInt(x, 10));

    if (arr.some((n) => Number.isNaN(n))) {
      throw new Error("Invalid comma-separated private key format.");
    }

    return Uint8Array.from(arr);
  }

  if (typeof bs58Decode !== "function") {
    throw new Error("bs58 decoder is unavailable in current runtime.");
  }

  return bs58Decode(value);
};

let keypair;
try {
  const secretKey = parseSecretKey(privateKeyRaw);
  keypair = Keypair.fromSecretKey(secretKey);
} catch (err) {
  console.error("❌ Failed to parse SOLANA_PRIVATE_KEY:", err.message);
  process.exit(1);
}

const walletPath = path.join(os.tmpdir(), `chainwork-wallet-${Date.now()}.json`);

try {
  fs.writeFileSync(walletPath, JSON.stringify(Array.from(keypair.secretKey)), { mode: 0o600 });
  console.log(`Using deploy wallet: ${keypair.publicKey.toBase58()}`);
  console.log(`Using cluster: ${cluster}`);

  const deployResult = spawnSync(
    "anchor",
    ["deploy", "--provider.cluster", cluster, "--provider.wallet", walletPath],
    {
      cwd: projectRoot,
      stdio: "inherit",
      env: {
        ...process.env,
        ANCHOR_WALLET: walletPath,
      },
    }
  );

  if (deployResult.error) {
    throw deployResult.error;
  }

  process.exit(deployResult.status ?? 1);
} finally {
  if (fs.existsSync(walletPath)) {
    fs.unlinkSync(walletPath);
  }
}
