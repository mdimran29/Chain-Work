use anchor_lang::prelude::*;

/// Emitted when a new escrow is created (SOL or Token, with or without deadline)
#[event]
pub struct EscrowCreated {
    /// The PDA address of the escrow account
    pub escrow: Pubkey,
    /// Client who created the escrow
    pub initializer: Pubkey,
    /// Freelancer assigned to the escrow
    pub freelancer: Pubkey,
    /// Amount locked (lamports or token units)
    pub amount: u64,
    /// SPL token mint; None = SOL
    pub token_mint: Option<Pubkey>,
    /// Optional deadline Unix timestamp
    pub deadline: Option<i64>,
}

/// Emitted when the freelancer accepts the escrow
#[event]
pub struct EscrowAccepted {
    /// The PDA address of the escrow account
    pub escrow: Pubkey,
    /// Freelancer who accepted
    pub freelancer: Pubkey,
}

/// Emitted when the client releases funds to the freelancer
#[event]
pub struct EscrowReleased {
    /// The PDA address of the escrow account
    pub escrow: Pubkey,
    /// Client who released
    pub initializer: Pubkey,
    /// Freelancer who received funds
    pub freelancer: Pubkey,
    /// Amount released
    pub amount: u64,
}

/// Emitted when the client cancels the escrow and gets a refund
#[event]
pub struct EscrowCancelled {
    /// The PDA address of the escrow account
    pub escrow: Pubkey,
    /// Client who cancelled
    pub initializer: Pubkey,
    /// Freelancer who was assigned
    pub freelancer: Pubkey,
    /// Amount refunded
    pub amount: u64,
}

/// Emitted when a dispute is raised by either party
#[event]
pub struct EscrowDisputed {
    /// The PDA address of the escrow account
    pub escrow: Pubkey,
    /// The party (initializer or freelancer) who raised the dispute
    pub raised_by: Pubkey,
}
