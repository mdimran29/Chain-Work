use anchor_lang::prelude::*;

/// The on-chain state of a ChainWork escrow contract.
///
/// PDA seeds: ["escrow", initializer, freelancer]
#[account]
pub struct EscrowAccount {
    /// Client who funded the escrow
    pub initializer: Pubkey,        // 32
    /// Freelancer receiving payment
    pub freelancer: Pubkey,         // 32
    /// Locked amount (lamports or token units)
    pub amount: u64,                // 8
    /// Whether the freelancer has accepted the job
    pub is_accepted: bool,          // 1
    /// Whether the escrow has been completed (released or cancelled)
    pub is_completed: bool,         // 1
    /// Optional Unix timestamp deadline; None = no deadline
    pub deadline: Option<i64>,      // 1 + 8 = 9
    /// SPL token mint; None = SOL-based escrow
    pub token_mint: Option<Pubkey>, // 1 + 32 = 33
    /// PDA bump seed for signing
    pub bump: u8,                   // 1
}

impl EscrowAccount {
    /// Account discriminator (8) + all fields
    pub const LEN: usize = 8   // anchor discriminator
        + 32    // initializer
        + 32    // freelancer
        + 8     // amount
        + 1     // is_accepted
        + 1     // is_completed
        + 1 + 8 // deadline (Option<i64>)
        + 1 + 32 // token_mint (Option<Pubkey>)
        + 1;    // bump
}
