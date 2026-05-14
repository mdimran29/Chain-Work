use anchor_lang::prelude::*;

declare_id!("CHWk111111111111111111111111111111111111111");

#[program]
pub mod chainwork_escrow {
    use super::*;

    pub fn initialize_sol(ctx: Context<InitializeSol>, amount: u64, freelancer: Pubkey) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        escrow.client = *ctx.accounts.client.key;
        escrow.freelancer = freelancer;
        escrow.amount = amount;
        escrow.status = EscrowStatus::Created;

        // Transfer SOL to PDA
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.client.to_account_info(),
                to: ctx.accounts.escrow.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, amount)?;

        Ok(())
    }

    pub fn accept(ctx: Context<Accept>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        require!(escrow.status == EscrowStatus::Created, ErrorCode::InvalidStatus);
        escrow.status = EscrowStatus::Accepted;
        Ok(())
    }

    pub fn release_sol(ctx: Context<ReleaseSol>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;
        require!(escrow.status == EscrowStatus::Accepted, ErrorCode::InvalidStatus);
        
        let amount = escrow.amount;
        **escrow.to_account_info().try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.freelancer.try_borrow_mut_lamports()? += amount;
        
        escrow.status = EscrowStatus::Released;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeSol<'info> {
    #[account(init, payer = client, space = 8 + 32 + 32 + 8 + 1)]
    pub escrow: Account<'info, EscrowAccount>,
    #[account(mut)]
    pub client: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Accept<'info> {
    #[account(mut)]
    pub escrow: Account<'info, EscrowAccount>,
    pub freelancer: Signer<'info>,
}

#[derive(Accounts)]
pub struct ReleaseSol<'info> {
    #[account(mut, has_one = client, has_one = freelancer)]
    pub escrow: Account<'info, EscrowAccount>,
    pub client: Signer<'info>,
    #[account(mut)]
    /// CHECK: Recipient of funds
    pub freelancer: AccountInfo<'info>,
}

#[account]
pub struct EscrowAccount {
    pub client: Pubkey,
    pub freelancer: Pubkey,
    pub amount: u64,
    pub status: EscrowStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum EscrowStatus {
    Created,
    Accepted,
    Released,
    Cancelled,
    Disputed,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Escrow is not in the correct state for this action.")]
    InvalidStatus,
}
