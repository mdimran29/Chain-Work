import { PublicKey } from "@solana/web3.js";

export type EscrowStatus = "Created" | "Accepted" | "Released" | "Cancelled" | "Disputed";

/** Mirror of the on-chain EscrowAccount struct */
export interface EscrowAccount {
  client: PublicKey;
  freelancer: PublicKey;
  amount: bigint;
  status: EscrowStatus;
}
