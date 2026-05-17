import { PublicKey } from "@solana/web3.js";

/** On-chain program ID — matches Anchor.toml [programs.localnet] */
export const PROGRAM_ID = new PublicKey("JBjHCEj1Vo6nJPtNULHKZb8PHGscQirsVhy7U2qExcPh");

/** PDA seed used to derive escrow accounts */
export const ESCROW_SEED = "escrow";
