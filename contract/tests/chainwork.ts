import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js";
import { assert } from "chai";
import { TOKEN_PROGRAM_ID, createAccount, createMint, getAccount, mintTo } from "@solana/spl-token";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const workspace = anchor.workspace as Record<string, Program>;
const program = workspace.Chainwork ?? workspace.chainwork;

if (!program) {
  throw new Error("Chainwork program not found in anchor.workspace");
}

describe("chainwork-escrow", () => {
  const programId = new PublicKey("BKrfKJSFgPP1jvAZDLxQymwQYov8ktZntVdE9TBLHrLr");

  const airdrop = async (pubkey: PublicKey, sol = 5) => {
    const sig = await provider.connection.requestAirdrop(pubkey, sol * LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(sig, "confirmed");
  };

  const deriveEscrow = (initializer: PublicKey, freelancer: PublicKey) =>
    PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), initializer.toBuffer(), freelancer.toBuffer()],
      programId,
    );

  const deriveVault = (escrow: PublicKey) =>
    PublicKey.findProgramAddressSync([Buffer.from("vault"), escrow.toBuffer()], programId)[0];

  const initializeSol = async (
    initializer: Keypair,
    freelancer: Keypair,
    amount: number,
    deadline?: number,
  ) => {
    const [escrow] = deriveEscrow(initializer.publicKey, freelancer.publicKey);
    const builder = deadline
      ? program.methods.initializeSolWithDeadline(
          new anchor.BN(amount.toString()),
          new anchor.BN(deadline.toString()),
        )
      : program.methods.initializeSol(new anchor.BN(amount.toString()));

    await builder
      .accounts({
        escrow,
        initializer: initializer.publicKey,
        freelancer: freelancer.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([initializer])
      .rpc();

    return escrow;
  };

  const createTokenSetup = async (initializer: Keypair, freelancer: Keypair) => {
    const mint = await createMint(provider.connection, initializer, initializer.publicKey, null, 6);
    const initializerTokenAccount = await createAccount(
      provider.connection,
      initializer,
      mint,
      initializer.publicKey,
    );
    const freelancerTokenAccount = await createAccount(
      provider.connection,
      initializer,
      mint,
      freelancer.publicKey,
    );

    return { mint, initializerTokenAccount, freelancerTokenAccount };
  };

  const initializeToken = async (
    initializer: Keypair,
    freelancer: Keypair,
    tokenMint: PublicKey,
    initializerTokenAccount: PublicKey,
    amount: number,
    deadline?: number,
  ) => {
    const [escrow] = deriveEscrow(initializer.publicKey, freelancer.publicKey);
    const vaultTokenAccount = deriveVault(escrow);

    const builder = deadline
      ? program.methods.initializeTokenWithDeadline(
          new anchor.BN(amount.toString()),
          new anchor.BN(deadline.toString()),
        )
      : program.methods.initializeToken(new anchor.BN(amount.toString()));

    await builder
      .accounts({
        escrow,
        initializer: initializer.publicKey,
        freelancer: freelancer.publicKey,
        tokenMint,
        initializerTokenAccount,
        vaultTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([initializer])
      .rpc();

    return { escrow, vaultTokenAccount };
  };

  const fundUsers = async (...users: Keypair[]) => {
    for (const user of users) {
      await airdrop(user.publicKey);
    }
  };

  const expectRejected = async (action: Promise<unknown>, pattern: RegExp) => {
    let threw = false;
    try {
      await action;
    } catch (error) {
      threw = true;
      assert.match(String(error), pattern);
    }

    assert.isTrue(threw, "Expected transaction to be rejected");
  };

  it("derives the correct escrow PDA", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    const [escrow, bump] = deriveEscrow(initializer.publicKey, freelancer.publicKey);

    assert.ok(escrow instanceof PublicKey);
    assert.isAtLeast(bump, 0);
    assert.isAtMost(bump, 255);
    console.log("  Escrow PDA:", escrow.toBase58());
    console.log("  Bump:", bump);
  });

  it("initializes a SOL escrow and stores the expected fields", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const amount = Math.round(0.5 * LAMPORTS_PER_SOL);
    const escrow = await initializeSol(initializer, freelancer, amount);

    const account = await program.account.escrowAccount.fetch(escrow);
    const escrowBalance = await provider.connection.getBalance(escrow, "confirmed");

    assert.strictEqual(account.initializer.toBase58(), initializer.publicKey.toBase58());
    assert.strictEqual(account.freelancer.toBase58(), freelancer.publicKey.toBase58());
    assert.strictEqual(account.isAccepted, false);
    assert.strictEqual(account.isCompleted, false);
    assert.isNull(account.deadline);
    assert.isNull(account.tokenMint);
    assert.isAtLeast(escrowBalance, 0);
  });

  it("rejects zero-amount SOL initialization", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    await expectRejected(initializeSol(initializer, freelancer, 0), /InvalidAmount|0x1770/);
  });

  it("initializes a SOL escrow with a deadline", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const amount = Math.round(0.25 * LAMPORTS_PER_SOL);
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const escrow = await initializeSol(initializer, freelancer, amount, deadline);

    const account = await program.account.escrowAccount.fetch(escrow);
    assert.strictEqual(account.deadline?.toNumber(), deadline);
  });

  it("lets the freelancer accept an initialized escrow", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const escrow = await initializeSol(initializer, freelancer, Math.round(0.2 * LAMPORTS_PER_SOL));

    await program.methods
      .accept()
      .accounts({ escrow, freelancer: freelancer.publicKey })
      .signers([freelancer])
      .rpc();

    const account = await program.account.escrowAccount.fetch(escrow);
    assert.strictEqual(account.isAccepted, true);
    assert.strictEqual(account.isCompleted, false);
  });

  it("rejects accept from the wrong freelancer", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    const wrongFreelancer = Keypair.generate();
    await fundUsers(initializer, freelancer, wrongFreelancer);

    const escrow = await initializeSol(initializer, freelancer, Math.round(0.2 * LAMPORTS_PER_SOL));

    await expectRejected(
      program.methods
        .accept()
        .accounts({ escrow, freelancer: wrongFreelancer.publicKey })
        .signers([wrongFreelancer])
        .rpc(),
      /ConstraintSeeds|ConstraintHasOne|Unauthorized|AnchorError caused by account: escrow/,
    );
  });

  it("lets the initializer release SOL after acceptance", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const amount = Math.round(0.4 * LAMPORTS_PER_SOL);
    const escrow = await initializeSol(initializer, freelancer, amount);
    const freelancerBefore = await provider.connection.getBalance(
      freelancer.publicKey,
      "confirmed",
    );

    await program.methods
      .accept()
      .accounts({ escrow, freelancer: freelancer.publicKey })
      .signers([freelancer])
      .rpc();

    await program.methods
      .releaseSol()
      .accounts({
        escrow,
        initializer: initializer.publicKey,
        freelancer: freelancer.publicKey,
      })
      .signers([initializer])
      .rpc();

    const escrowInfo = await program.account.escrowAccount.fetchNullable(escrow);
    const freelancerAfter = await provider.connection.getBalance(freelancer.publicKey, "confirmed");

    assert.isNull(escrowInfo);
    assert.isAtLeast(freelancerAfter, freelancerBefore);
  });

  it("rejects release SOL before acceptance", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const escrow = await initializeSol(initializer, freelancer, Math.round(0.4 * LAMPORTS_PER_SOL));

    await expectRejected(
      program.methods
        .releaseSol()
        .accounts({
          escrow,
          initializer: initializer.publicKey,
          freelancer: freelancer.publicKey,
        })
        .signers([initializer])
        .rpc(),
      /NotAccepted|0x1772/,
    );
  });

  it("lets the initializer cancel SOL escrow before acceptance", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const amount = Math.round(0.15 * LAMPORTS_PER_SOL);
    const escrow = await initializeSol(initializer, freelancer, amount);
    const initializerBefore = await provider.connection.getBalance(
      initializer.publicKey,
      "confirmed",
    );

    await program.methods
      .cancelSol()
      .accounts({ escrow, initializer: initializer.publicKey })
      .signers([initializer])
      .rpc();

    const escrowInfo = await program.account.escrowAccount.fetchNullable(escrow);
    const initializerAfter = await provider.connection.getBalance(
      initializer.publicKey,
      "confirmed",
    );

    assert.isNull(escrowInfo);
    assert.isAtLeast(initializerAfter, 0);
  });

  it("rejects cancel after acceptance before deadline", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const escrow = await initializeSol(
      initializer,
      freelancer,
      Math.round(0.15 * LAMPORTS_PER_SOL),
      deadline,
    );

    await program.methods
      .accept()
      .accounts({ escrow, freelancer: freelancer.publicKey })
      .signers([freelancer])
      .rpc();

    await expectRejected(
      program.methods
        .cancelSol()
        .accounts({ escrow, initializer: initializer.publicKey })
        .signers([initializer])
        .rpc(),
      /DeadlineNotExpired|0x1776/,
    );
  });

  it("lets either party raise a dispute after acceptance", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const escrow = await initializeSol(initializer, freelancer, Math.round(0.3 * LAMPORTS_PER_SOL));

    await program.methods
      .accept()
      .accounts({ escrow, freelancer: freelancer.publicKey })
      .signers([freelancer])
      .rpc();

    await program.methods
      .dispute()
      .accounts({ escrow, caller: freelancer.publicKey })
      .signers([freelancer])
      .rpc();

    const account = await program.account.escrowAccount.fetch(escrow);
    assert.strictEqual(account.isAccepted, true);
    assert.strictEqual(account.isCompleted, false);
  });

  it("initializes SPL-token escrow and creates the vault account", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const { mint, initializerTokenAccount } = await createTokenSetup(initializer, freelancer);
    const amount = 1_000;
    await mintTo(
      provider.connection,
      initializer,
      mint,
      initializerTokenAccount,
      initializer,
      5_000,
    );

    const { escrow, vaultTokenAccount } = await initializeToken(
      initializer,
      freelancer,
      mint,
      initializerTokenAccount,
      amount,
    );

    const escrowAccount = await program.account.escrowAccount.fetch(escrow);
    assert.strictEqual(escrowAccount.tokenMint?.toBase58(), mint.toBase58());
  });

  it("rejects token initialization with the wrong mint on the initializer ATA", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const { mint, initializerTokenAccount } = await createTokenSetup(initializer, freelancer);
    const wrongMint = await createMint(
      provider.connection,
      initializer,
      initializer.publicKey,
      null,
      6,
    );
    await mintTo(
      provider.connection,
      initializer,
      mint,
      initializerTokenAccount,
      initializer,
      5_000,
    );

    const [escrow] = deriveEscrow(initializer.publicKey, freelancer.publicKey);
    const vaultTokenAccount = deriveVault(escrow);

    await expectRejected(
      program.methods
        .initializeToken(new anchor.BN("1000"))
        .accounts({
          escrow,
          initializer: initializer.publicKey,
          freelancer: freelancer.publicKey,
          tokenMint: wrongMint,
          initializerTokenAccount,
          vaultTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([initializer])
        .rpc(),
      /InvalidMint|0x177a/,
    );
  });

  it("initializes SPL-token escrow with a deadline", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const { mint, initializerTokenAccount } = await createTokenSetup(initializer, freelancer);
    await mintTo(
      provider.connection,
      initializer,
      mint,
      initializerTokenAccount,
      initializer,
      5_000,
    );

    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const { escrow } = await initializeToken(
      initializer,
      freelancer,
      mint,
      initializerTokenAccount,
      750,
      deadline,
    );

    const escrowAccount = await program.account.escrowAccount.fetch(escrow);
    assert.strictEqual(escrowAccount.deadline?.toNumber(), deadline);
  });

  it("releases token escrow to the freelancer after acceptance", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const { mint, initializerTokenAccount, freelancerTokenAccount } = await createTokenSetup(
      initializer,
      freelancer,
    );
    await mintTo(
      provider.connection,
      initializer,
      mint,
      initializerTokenAccount,
      initializer,
      5_000,
    );

    const amount = 1_250;
    const { escrow, vaultTokenAccount } = await initializeToken(
      initializer,
      freelancer,
      mint,
      initializerTokenAccount,
      amount,
    );

    await program.methods
      .accept()
      .accounts({ escrow, freelancer: freelancer.publicKey })
      .signers([freelancer])
      .rpc();

    await program.methods
      .releaseToken()
      .accounts({
        escrow,
        initializer: initializer.publicKey,
        tokenMint: mint,
        vaultTokenAccount,
        freelancerTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([initializer])
      .rpc();

    const escrowInfo = await program.account.escrowAccount.fetchNullable(escrow);
    const freelancerToken = await getAccount(
      provider.connection,
      freelancerTokenAccount,
      "confirmed",
    );
    const vaultInfo = await provider.connection.getAccountInfo(vaultTokenAccount, "confirmed");

    assert.isNull(escrowInfo);
    assert.isNotNull(freelancerToken);
    assert.isNotNull(vaultInfo);
  });

  it("rejects token release before acceptance", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const { mint, initializerTokenAccount, freelancerTokenAccount } = await createTokenSetup(
      initializer,
      freelancer,
    );
    await mintTo(
      provider.connection,
      initializer,
      mint,
      initializerTokenAccount,
      initializer,
      5_000,
    );

    const { escrow, vaultTokenAccount } = await initializeToken(
      initializer,
      freelancer,
      mint,
      initializerTokenAccount,
      1_250,
    );

    await expectRejected(
      program.methods
        .releaseToken()
        .accounts({
          escrow,
          initializer: initializer.publicKey,
          tokenMint: mint,
          vaultTokenAccount,
          freelancerTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([initializer])
        .rpc(),
      /NotAccepted|0x1772/,
    );
  });

  it("cancels token escrow before acceptance and refunds the initializer", async () => {
    const initializer = Keypair.generate();
    const freelancer = Keypair.generate();
    await fundUsers(initializer, freelancer);

    const { mint, initializerTokenAccount } = await createTokenSetup(initializer, freelancer);
    await mintTo(
      provider.connection,
      initializer,
      mint,
      initializerTokenAccount,
      initializer,
      5_000,
    );

    const amount = 900;
    const { escrow, vaultTokenAccount } = await initializeToken(
      initializer,
      freelancer,
      mint,
      initializerTokenAccount,
      amount,
    );

    const initializerTokenBefore = await getAccount(
      provider.connection,
      initializerTokenAccount,
      "confirmed",
    );

    await program.methods
      .cancelToken()
      .accounts({
        escrow,
        initializer: initializer.publicKey,
        tokenMint: mint,
        vaultTokenAccount,
        initializerTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([initializer])
      .rpc();

    const escrowInfo = await program.account.escrowAccount.fetchNullable(escrow);
    const initializerTokenAfter = await getAccount(
      provider.connection,
      initializerTokenAccount,
      "confirmed",
    );
    const vaultInfo = await provider.connection.getAccountInfo(vaultTokenAccount, "confirmed");

    assert.isNull(escrowInfo);
    assert.isNotNull(initializerTokenAfter);
    assert.isNotNull(vaultInfo);
  });
});
