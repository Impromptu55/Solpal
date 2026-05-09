"use client"
import React from 'react'
import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'

// NavBar shows app name and wallet connect status / button.

export default function NavBar() {
  const { publicKey, connect, disconnect, connected } = useWallet()

  // Shorten wallet address for display
  const short = publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : null

  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center text-black font-bold">SP</div>
        <Link href="/" className="text-lg font-semibold">Solpal</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/badges" className="text-sm text-slate-300 hover:underline">Badges</Link>

        {connected && short ? (
          <button onClick={() => disconnect()} className="px-3 py-2 bg-[#12121a] rounded-md text-sm">
            {short}
          </button>
        ) : (
          <button onClick={() => connect()} className="px-3 py-2 bg-gradient-to-r from-purple-600 to-cyan-400 text-black rounded-md">
            Connect Phantom
          </button>
        )}
      </div>
    </nav>
  )
}
