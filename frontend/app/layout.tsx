"use client"
import React from 'react'
import './globals.css'
import { ReactNode } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

// Root layout where we wrap the app in Solana providers.
// Marked as a client component because wallet adapters use hooks and browser APIs.

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  // Use devnet for this hackathon project
  const network = WalletAdapterNetwork.Devnet

  // Configure wallets. We only include Phantom for now.
  const wallets = [new PhantomWalletAdapter()]

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Solpal — AI Coding Mentor</title>
      </head>
      <body className="min-h-screen bg-[#0a0a0f] text-slate-200 antialiased">
        {/* ConnectionProvider wraps the Solana connection; WalletProvider makes wallet state available */}
        <ConnectionProvider endpoint={`https://api.devnet.solana.com`}>
          <WalletProvider wallets={wallets} autoConnect={false}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  )
}
