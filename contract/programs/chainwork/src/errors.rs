use anchor_lang::prelude::*;

#[error_code]
pub enum ChainworkError {
    #[msg("Amount must be greater than zero.")]
    InvalidAmount,

    #[msg("Escrow has already been accepted by the freelancer.")]
    AlreadyAccepted,

    #[msg("Escrow has not been accepted by the freelancer yet.")]
    NotAccepted,

    #[msg("Escrow has already been completed (released or cancelled).")]
    EscrowAlreadyCompleted,

    #[msg("The deadline timestamp is in the past.")]
    DeadlineInPast,

    #[msg("The escrow deadline has already expired.")]
    DeadlineExpired,

    #[msg("The deadline has not yet expired; cancellation not permitted.")]
    DeadlineNotExpired,

    #[msg("Caller is not authorized to perform this action.")]
    Unauthorized,

    #[msg("The provided token mint does not match the escrow's token mint.")]
    InvalidMint,

    #[msg("Arithmetic overflow occurred.")]
    Overflow,
}
