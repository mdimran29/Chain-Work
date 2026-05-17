import { AnchorProvider, Program, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { PROGRAM_ID } from "./constants";
import type { EscrowAccount } from "./types";

/**
 * ChainWorkSDK — typed wrapper around the Anchor escrow program.
 * Inject an AnchorProvider (wallet + connection) before calling any instruction.
 */
export class ChainWorkSDK {
  private provider: AnchorProvider;

  constructor(provider: AnchorProvider) {
    this.provider = provider;
  }

  /** Derive the escrow PDA for a given client + freelancer pair */
  async findEscrowPDA(client: PublicKey, freelancer: PublicKey): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("chainwork-escrow"), client.toBuffer(), freelancer.toBuffer()],
      PROGRAM_ID,
    );
  }

  /**
   * Initialize a new SOL escrow.
   * @param amountLamports - Amount in lamports to lock in escrow
   * @param freelancer     - Freelancer's wallet public key
   */
  async initializeSol(amountLamports: number, freelancer: PublicKey): Promise<string> {
    // TODO: Attach generated IDL once `anchor build` has run
    throw new Error("initializeSol: attach generated IDL from target/idl/chainwork.json");
  }

  /**
   * Accept an escrow (called by freelancer).
   * @param escrowPDA - PDA of the escrow account
   */
  async accept(escrowPDA: PublicKey): Promise<string> {
    throw new Error("accept: attach generated IDL from target/idl/chainwork.json");
  }

  /**
   * Release SOL from escrow to freelancer (called by client).
   * @param escrowPDA  - PDA of the escrow account
   * @param freelancer - Freelancer's wallet public key
   */
  async releaseSol(escrowPDA: PublicKey, freelancer: PublicKey): Promise<string> {
    throw new Error("releaseSol: attach generated IDL from target/idl/chainwork.json");
  }
}
