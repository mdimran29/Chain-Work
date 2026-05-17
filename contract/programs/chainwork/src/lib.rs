#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};

pub mod errors;
pub mod events;
pub mod state;

use errors::ChainworkError;
use events::*;
use state::EscrowAccount;

declare_id!("BKrfKJSFgPP1jvAZDLxQymwQYov8ktZntVdE9TBLHrLr");

#[program]
pub mod chainwork {
    use super::*;

    // ─── [0] InitializeSol ───────────────────────────────────────────────────────
    pub fn initialize_sol(ctx: Context<InitializeSol>, amount: u64) -> Result<()> {
        require!(amount > 0, ChainworkError::InvalidAmount);

        let escrow_key;
        let initializer_key;
        let freelancer_key;
        {
            let escrow = &mut ctx.accounts.escrow;
            escrow.initializer = ctx.accounts.initializer.key();
            escrow.freelancer = ctx.accounts.freelancer.key();
            escrow.amount = amount;
            escrow.is_accepted = false;
            escrow.is_completed = false;
            escrow.deadline = None;
            escrow.token_mint = None;
            escrow.bump = ctx.bumps.escrow;
            escrow_key = escrow.key();
            initializer_key = escrow.initializer;
            freelancer_key = escrow.freelancer;
        }

        let cpi_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.initializer.to_account_info(),
                to: ctx.accounts.escrow.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_ctx, amount)?;

        emit!(EscrowCreated {
            escrow: escrow_key,
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
            token_mint: None,
            deadline: None,
        });

        Ok(())
    }

    // ─── [1] InitializeSolWithDeadline ───────────────────────────────────────────
    pub fn initialize_sol_with_deadline(
        ctx: Context<InitializeSol>,
        amount: u64,
        deadline: i64,
    ) -> Result<()> {
        require!(amount > 0, ChainworkError::InvalidAmount);
        let clock = Clock::get()?;
        require!(
            deadline > clock.unix_timestamp,
            ChainworkError::DeadlineInPast
        );

        let escrow_key;
        let initializer_key;
        let freelancer_key;
        {
            let escrow = &mut ctx.accounts.escrow;
            escrow.initializer = ctx.accounts.initializer.key();
            escrow.freelancer = ctx.accounts.freelancer.key();
            escrow.amount = amount;
            escrow.is_accepted = false;
            escrow.is_completed = false;
            escrow.deadline = Some(deadline);
            escrow.token_mint = None;
            escrow.bump = ctx.bumps.escrow;
            escrow_key = escrow.key();
            initializer_key = escrow.initializer;
            freelancer_key = escrow.freelancer;
        }

        let cpi_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.initializer.to_account_info(),
                to: ctx.accounts.escrow.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_ctx, amount)?;

        emit!(EscrowCreated {
            escrow: escrow_key,
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
            token_mint: None,
            deadline: Some(deadline),
        });

        Ok(())
    }

    // ─── [2] InitializeToken ─────────────────────────────────────────────────────
    pub fn initialize_token(ctx: Context<InitializeToken>, amount: u64) -> Result<()> {
        require!(amount > 0, ChainworkError::InvalidAmount);

        let escrow_key;
        let initializer_key;
        let freelancer_key;
        let token_mint_key = ctx.accounts.token_mint.key();
        {
            let escrow = &mut ctx.accounts.escrow;
            escrow.initializer = ctx.accounts.initializer.key();
            escrow.freelancer = ctx.accounts.freelancer.key();
            escrow.amount = amount;
            escrow.is_accepted = false;
            escrow.is_completed = false;
            escrow.deadline = None;
            escrow.token_mint = Some(token_mint_key);
            escrow.bump = ctx.bumps.escrow;
            escrow_key = escrow.key();
            initializer_key = escrow.initializer;
            freelancer_key = escrow.freelancer;
        }

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            SplTransfer {
                from: ctx.accounts.initializer_token_account.to_account_info(),
                to: ctx.accounts.vault_token_account.to_account_info(),
                authority: ctx.accounts.initializer.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, amount)?;

        emit!(EscrowCreated {
            escrow: escrow_key,
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
            token_mint: Some(token_mint_key),
            deadline: None,
        });

        Ok(())
    }

    // ─── [3] InitializeTokenWithDeadline ─────────────────────────────────────────
    pub fn initialize_token_with_deadline(
        ctx: Context<InitializeToken>,
        amount: u64,
        deadline: i64,
    ) -> Result<()> {
        require!(amount > 0, ChainworkError::InvalidAmount);
        let clock = Clock::get()?;
        require!(
            deadline > clock.unix_timestamp,
            ChainworkError::DeadlineInPast
        );

        let escrow_key;
        let initializer_key;
        let freelancer_key;
        let token_mint_key = ctx.accounts.token_mint.key();
        {
            let escrow = &mut ctx.accounts.escrow;
            escrow.initializer = ctx.accounts.initializer.key();
            escrow.freelancer = ctx.accounts.freelancer.key();
            escrow.amount = amount;
            escrow.is_accepted = false;
            escrow.is_completed = false;
            escrow.deadline = Some(deadline);
            escrow.token_mint = Some(token_mint_key);
            escrow.bump = ctx.bumps.escrow;
            escrow_key = escrow.key();
            initializer_key = escrow.initializer;
            freelancer_key = escrow.freelancer;
        }

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            SplTransfer {
                from: ctx.accounts.initializer_token_account.to_account_info(),
                to: ctx.accounts.vault_token_account.to_account_info(),
                authority: ctx.accounts.initializer.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, amount)?;

        emit!(EscrowCreated {
            escrow: escrow_key,
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
            token_mint: Some(token_mint_key),
            deadline: Some(deadline),
        });

        Ok(())
    }

    // ─── [4] Accept ──────────────────────────────────────────────────────────────
    pub fn accept(ctx: Context<Accept>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;

        require!(!escrow.is_accepted, ChainworkError::AlreadyAccepted);
        require!(!escrow.is_completed, ChainworkError::EscrowAlreadyCompleted);

        if let Some(dl) = escrow.deadline {
            let clock = Clock::get()?;
            require!(clock.unix_timestamp <= dl, ChainworkError::DeadlineExpired);
        }

        escrow.is_accepted = true;

        emit!(EscrowAccepted {
            escrow: ctx.accounts.escrow.key(),
            freelancer: ctx.accounts.freelancer.key(),
        });

        Ok(())
    }

    // ─── [5] ReleaseSol ──────────────────────────────────────────────────────────
    pub fn release_sol(ctx: Context<ReleaseSol>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;

        require!(escrow.is_accepted, ChainworkError::NotAccepted);
        require!(!escrow.is_completed, ChainworkError::EscrowAlreadyCompleted);

        let amount = escrow.amount;
        let initializer_key = escrow.initializer;
        let freelancer_key = escrow.freelancer;

        // Transfer lamports out of PDA to freelancer
        **ctx
            .accounts
            .escrow
            .to_account_info()
            .try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.freelancer.try_borrow_mut_lamports()? += amount;

        // Mark completed (before close releases remaining rent via `close` constraint)
        ctx.accounts.escrow.is_completed = true;

        emit!(EscrowReleased {
            escrow: ctx.accounts.escrow.key(),
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
        });

        Ok(())
    }

    // ─── [6] ReleaseToken ────────────────────────────────────────────────────────
    pub fn release_token(ctx: Context<ReleaseToken>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;

        require!(escrow.is_accepted, ChainworkError::NotAccepted);
        require!(!escrow.is_completed, ChainworkError::EscrowAlreadyCompleted);

        let amount = escrow.amount;
        let initializer_key = escrow.initializer;
        let freelancer_key = escrow.freelancer;
        let bump = escrow.bump;

        // PDA signs the token transfer
        let seeds: &[&[u8]] = &[
            b"escrow",
            initializer_key.as_ref(),
            freelancer_key.as_ref(),
            &[bump],
        ];
        let signer_seeds = &[seeds];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            SplTransfer {
                from: ctx.accounts.vault_token_account.to_account_info(),
                to: ctx.accounts.freelancer_token_account.to_account_info(),
                authority: ctx.accounts.escrow.to_account_info(),
            },
            signer_seeds,
        );
        token::transfer(cpi_ctx, amount)?;

        ctx.accounts.escrow.is_completed = true;

        emit!(EscrowReleased {
            escrow: ctx.accounts.escrow.key(),
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
        });

        Ok(())
    }

    // ─── [7] CancelSol ───────────────────────────────────────────────────────────
    pub fn cancel_sol(ctx: Context<CancelSol>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;

        require!(!escrow.is_completed, ChainworkError::EscrowAlreadyCompleted);

        // If already accepted, only allow cancel if deadline has passed
        if escrow.is_accepted {
            match escrow.deadline {
                Some(dl) => {
                    let clock = Clock::get()?;
                    require!(
                        clock.unix_timestamp > dl,
                        ChainworkError::DeadlineNotExpired
                    );
                }
                None => return Err(ChainworkError::AlreadyAccepted.into()),
            }
        }

        let amount = escrow.amount;
        let initializer_key = escrow.initializer;
        let freelancer_key = escrow.freelancer;

        **ctx
            .accounts
            .escrow
            .to_account_info()
            .try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.initializer.try_borrow_mut_lamports()? += amount;

        ctx.accounts.escrow.is_completed = true;

        emit!(EscrowCancelled {
            escrow: ctx.accounts.escrow.key(),
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
        });

        Ok(())
    }

    // ─── [8] CancelToken ─────────────────────────────────────────────────────────
    pub fn cancel_token(ctx: Context<CancelToken>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;

        require!(!escrow.is_completed, ChainworkError::EscrowAlreadyCompleted);

        if escrow.is_accepted {
            match escrow.deadline {
                Some(dl) => {
                    let clock = Clock::get()?;
                    require!(
                        clock.unix_timestamp > dl,
                        ChainworkError::DeadlineNotExpired
                    );
                }
                None => return Err(ChainworkError::AlreadyAccepted.into()),
            }
        }

        let amount = escrow.amount;
        let initializer_key = escrow.initializer;
        let freelancer_key = escrow.freelancer;
        let bump = escrow.bump;

        let seeds: &[&[u8]] = &[
            b"escrow",
            initializer_key.as_ref(),
            freelancer_key.as_ref(),
            &[bump],
        ];
        let signer_seeds = &[seeds];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            SplTransfer {
                from: ctx.accounts.vault_token_account.to_account_info(),
                to: ctx.accounts.initializer_token_account.to_account_info(),
                authority: ctx.accounts.escrow.to_account_info(),
            },
            signer_seeds,
        );
        token::transfer(cpi_ctx, amount)?;

        ctx.accounts.escrow.is_completed = true;

        emit!(EscrowCancelled {
            escrow: ctx.accounts.escrow.key(),
            initializer: initializer_key,
            freelancer: freelancer_key,
            amount,
        });

        Ok(())
    }

    // ─── [9] Dispute ─────────────────────────────────────────────────────────────
    pub fn dispute(ctx: Context<Dispute>) -> Result<()> {
        let escrow = &ctx.accounts.escrow;

        require!(escrow.is_accepted, ChainworkError::NotAccepted);
        require!(!escrow.is_completed, ChainworkError::EscrowAlreadyCompleted);

        let caller_key = ctx.accounts.caller.key();
        require!(
            caller_key == escrow.initializer || caller_key == escrow.freelancer,
            ChainworkError::Unauthorized
        );

        emit!(EscrowDisputed {
            escrow: ctx.accounts.escrow.key(),
            raised_by: caller_key,
        });

        Ok(())
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Account Context Structs
// ─────────────────────────────────────────────────────────────────────────────

/// [0] & [1]: SOL escrow initialization (with or without deadline)
#[derive(Accounts)]
pub struct InitializeSol<'info> {
    /// PDA: seeds = ["escrow", initializer, freelancer]
    #[account(
        init,
        payer = initializer,
        space = EscrowAccount::LEN,
        seeds = [b"escrow", initializer.key().as_ref(), freelancer.key().as_ref()],
        bump
    )]
    pub escrow: Account<'info, EscrowAccount>,

    #[account(mut)]
    pub initializer: Signer<'info>,

    /// CHECK: We only store this pubkey; no on-chain data validation needed here
    pub freelancer: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

/// [2] & [3]: SPL-Token escrow initialization (with or without deadline)
#[derive(Accounts)]
pub struct InitializeToken<'info> {
    /// PDA: seeds = ["escrow", initializer, freelancer]
    #[account(
        init,
        payer = initializer,
        space = EscrowAccount::LEN,
        seeds = [b"escrow", initializer.key().as_ref(), freelancer.key().as_ref()],
        bump
    )]
    pub escrow: Account<'info, EscrowAccount>,

    #[account(mut)]
    pub initializer: Signer<'info>,

    /// CHECK: Stored in escrow state; no on-chain constraint needed
    pub freelancer: UncheckedAccount<'info>,

    pub token_mint: Account<'info, anchor_spl::token::Mint>,

    /// Initializer's ATA for the token mint
    #[account(
        mut,
        constraint = initializer_token_account.owner == initializer.key()
            @ ChainworkError::Unauthorized,
        constraint = initializer_token_account.mint == token_mint.key()
            @ ChainworkError::InvalidMint
    )]
    pub initializer_token_account: Box<Account<'info, TokenAccount>>,

    /// Vault ATA owned by the escrow PDA; created here
    #[account(
        init,
        payer = initializer,
        token::mint = token_mint,
        token::authority = escrow,
        seeds = [b"vault", escrow.key().as_ref()],
        bump
    )]
    pub vault_token_account: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

/// [4]: Freelancer accepts the escrow
#[derive(Accounts)]
pub struct Accept<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.initializer.as_ref(), freelancer.key().as_ref()],
        bump = escrow.bump,
        has_one = freelancer @ ChainworkError::Unauthorized
    )]
    pub escrow: Account<'info, EscrowAccount>,

    /// Must be the freelancer stored in the escrow
    pub freelancer: Signer<'info>,
}

/// [5]: Client releases SOL to freelancer; escrow account is closed
#[derive(Accounts)]
pub struct ReleaseSol<'info> {
    #[account(
        mut,
        seeds = [b"escrow", initializer.key().as_ref(), escrow.freelancer.as_ref()],
        bump = escrow.bump,
        has_one = initializer @ ChainworkError::Unauthorized,
        close = initializer
    )]
    pub escrow: Account<'info, EscrowAccount>,

    /// Must be the initializer (client)
    #[account(mut)]
    pub initializer: Signer<'info>,

    /// CHECK: Validated via escrow.freelancer constraint below
    #[account(
        mut,
        constraint = freelancer.key() == escrow.freelancer @ ChainworkError::Unauthorized
    )]
    pub freelancer: UncheckedAccount<'info>,
}

/// [6]: Client releases SPL tokens to freelancer; escrow account is closed
#[derive(Accounts)]
pub struct ReleaseToken<'info> {
    #[account(
        mut,
        seeds = [b"escrow", initializer.key().as_ref(), escrow.freelancer.as_ref()],
        bump = escrow.bump,
        has_one = initializer @ ChainworkError::Unauthorized,
        close = initializer
    )]
    pub escrow: Account<'info, EscrowAccount>,

    #[account(mut)]
    pub initializer: Signer<'info>,

    pub token_mint: Account<'info, anchor_spl::token::Mint>,

    /// Vault ATA owned by escrow PDA
    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump,
        token::mint = token_mint,
        token::authority = escrow
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    /// Freelancer's ATA for the token mint
    #[account(
        mut,
        constraint = freelancer_token_account.owner == escrow.freelancer
            @ ChainworkError::Unauthorized,
        constraint = freelancer_token_account.mint == token_mint.key()
            @ ChainworkError::InvalidMint
    )]
    pub freelancer_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

/// [7]: Client cancels SOL escrow; escrow account is closed
#[derive(Accounts)]
pub struct CancelSol<'info> {
    #[account(
        mut,
        seeds = [b"escrow", initializer.key().as_ref(), escrow.freelancer.as_ref()],
        bump = escrow.bump,
        has_one = initializer @ ChainworkError::Unauthorized,
        close = initializer
    )]
    pub escrow: Account<'info, EscrowAccount>,

    #[account(mut)]
    pub initializer: Signer<'info>,
}

/// [8]: Client cancels SPL-Token escrow; escrow account is closed
#[derive(Accounts)]
pub struct CancelToken<'info> {
    #[account(
        mut,
        seeds = [b"escrow", initializer.key().as_ref(), escrow.freelancer.as_ref()],
        bump = escrow.bump,
        has_one = initializer @ ChainworkError::Unauthorized,
        close = initializer
    )]
    pub escrow: Account<'info, EscrowAccount>,

    #[account(mut)]
    pub initializer: Signer<'info>,

    pub token_mint: Account<'info, anchor_spl::token::Mint>,

    /// Vault ATA owned by escrow PDA
    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump,
        token::mint = token_mint,
        token::authority = escrow
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    /// Initializer's ATA for refund
    #[account(
        mut,
        constraint = initializer_token_account.owner == initializer.key()
            @ ChainworkError::Unauthorized,
        constraint = initializer_token_account.mint == token_mint.key()
            @ ChainworkError::InvalidMint
    )]
    pub initializer_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

/// [9]: Either party raises a dispute
#[derive(Accounts)]
pub struct Dispute<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.initializer.as_ref(), escrow.freelancer.as_ref()],
        bump = escrow.bump
    )]
    pub escrow: Account<'info, EscrowAccount>,

    /// CHECK: Validated in handler — must be initializer or freelancer
    pub caller: Signer<'info>,
}
