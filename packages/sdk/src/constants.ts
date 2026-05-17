import { PublicKey } from "@solana/web3.js";

/** On-chain program ID — matches Anchor.toml [programs.localnet] */
export const PROGRAM_ID = new PublicKey("CHWk111111111111111111111111111111111111111");

/** PDA seed used to derive escrow accounts */
export const ESCROW_SEED = "chainwork-escrow";
