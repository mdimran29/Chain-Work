/**
 * @chainwork/sdk
 * Typed client for the ChainWork on-chain escrow program (Anchor 0.29).
 *
 * Usage:
 *   import { ChainWorkSDK } from "@chainwork/sdk";
 *   const sdk = new ChainWorkSDK(provider);
 *   await sdk.initializeSol(amount, freelancerPubkey);
 */

export { ChainWorkSDK } from "./ChainWorkSDK";
export { PROGRAM_ID, ESCROW_SEED } from "./constants";
export type { EscrowAccount, EscrowStatus } from "./types";
