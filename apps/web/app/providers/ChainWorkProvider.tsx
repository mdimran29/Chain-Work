"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { ChainWorkSDK } from "@chainwork/sdk";

interface ChainWorkContextState {
  sdk: ChainWorkSDK | null;
}

const ChainWorkContext = createContext<ChainWorkContextState>({ sdk: null });

export function ChainWorkProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const wallet = useWallet();

  const sdk = useMemo(() => {
    if (
      !wallet.connected ||
      !wallet.publicKey ||
      !wallet.signTransaction ||
      !wallet.signAllTransactions
    ) {
      return null;
    }

    // AnchorProvider expects a Wallet interface that matches the standard Solana wallet.
    // wallet from useWallet has a mostly compatible interface.
    const anchorWallet = {
      publicKey: wallet.publicKey,
      signTransaction: wallet.signTransaction,
      signAllTransactions: wallet.signAllTransactions,
    };

    const provider = new AnchorProvider(connection, anchorWallet, AnchorProvider.defaultOptions());
    return new ChainWorkSDK(provider);
  }, [
    connection,
    wallet.connected,
    wallet.publicKey,
    wallet.signTransaction,
    wallet.signAllTransactions,
  ]);

  return <ChainWorkContext.Provider value={{ sdk }}>{children}</ChainWorkContext.Provider>;
}

export function useChainWork() {
  return useContext(ChainWorkContext);
}
