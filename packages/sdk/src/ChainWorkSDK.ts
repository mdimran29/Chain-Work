import { AnchorProvider, Program, BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { PROGRAM_ID, ESCROW_SEED } from "./constants";
import type { EscrowAccount } from "./types";
import { CHAINWORK_IDL as idl } from "./chainwork";

// Anchor v0.29+: Program(idl, provider) — program ID comes from idl.address

/**
 * ChainWorkSDK — typed wrapper around the Anchor escrow program.
 * Inject an AnchorProvider (wallet + connection) before calling any instruction.
 */
export class ChainWorkSDK {
  private provider: AnchorProvider;
  public program: Program;

  constructor(provider: AnchorProvider) {
    this.provider = provider;
    // Anchor v0.29+: 2-arg constructor — (idl, provider). Program ID is read from idl.address.
    this.program = new Program(idl as any, provider as any);
  }

  /** Derive the escrow PDA for a given client + freelancer pair */
  async findEscrowPDA(client: PublicKey, freelancer: PublicKey): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(ESCROW_SEED), client.toBuffer(), freelancer.toBuffer()],
      PROGRAM_ID,
    );
  }

  /**
   * Initialize a new SOL escrow.
   * @param amountLamports - Amount in lamports to lock in escrow
   * @param freelancer     - Freelancer's wallet public key
   */
  async initializeSol(amountLamports: number, freelancer: PublicKey): Promise<string> {
    const [escrowPDA] = await this.findEscrowPDA(this.provider.wallet.publicKey, freelancer);

    const tx = await this.program.methods
      .initializeSol(new BN(amountLamports))
      .accounts({
        escrow: escrowPDA,
        initializer: this.provider.wallet.publicKey,
        freelancer: freelancer,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  /**
   * Accept an escrow (called by freelancer).
   * @param escrowPDA - PDA of the escrow account
   */
  async accept(escrowPDA: PublicKey): Promise<string> {
    const tx = await this.program.methods
      .accept()
      .accounts({
        escrow: escrowPDA,
        freelancer: this.provider.wallet.publicKey,
      })
      .rpc();

    return tx;
  }

  /**
   * Release SOL from escrow to freelancer (called by client).
   * @param escrowPDA  - PDA of the escrow account
   * @param freelancer - Freelancer's wallet public key
   */
  async releaseSol(escrowPDA: PublicKey, freelancer: PublicKey): Promise<string> {
    const tx = await this.program.methods
      .releaseSol()
      .accounts({
        escrow: escrowPDA,
        initializer: this.provider.wallet.publicKey,
        freelancer: freelancer,
      })
      .rpc();

    return tx;
  }

  /**
   * Cancel SOL escrow and return funds to client (called by client).
   * @param escrowPDA - PDA of the escrow account
   */
  async cancelSol(escrowPDA: PublicKey): Promise<string> {
    const tx = await this.program.methods
      .cancelSol()
      .accounts({
        escrow: escrowPDA,
        initializer: this.provider.wallet.publicKey,
      })
      .rpc();

    return tx;
  }
}
