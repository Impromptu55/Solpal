"use client"
import React from 'react'
import NavBar from '../../components/NavBar'
import BadgeCard from '../../components/BadgeCard'

const BADGES = [
  { id: 'first', icon: '🐛', name: 'First Debug', desc: 'Complete your first debug session' },
  { id: 'roll', icon: '🔥', name: 'On a Roll', desc: 'Debug 3 times in one session' },
  { id: 'learner', icon: '🧠', name: 'Quick Learner', desc: 'Debug 5 different error types' },
  { id: 'speed', icon: '⚡', name: 'Speed Debugger', desc: 'Get a fix in under 30 seconds' },
]

export default function BadgesPage() {
  // Placeholder: In a real app we'd fetch user-earned badges from the backend / chain
  const earned = new Set(['first'])

  return (
    <div>
      <NavBar />
      <main className="py-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">Badges</h2>
        <p className="mt-2 text-slate-400">Your achievements appear here. Connect your wallet to mint earned badges.</p>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map(b => (
            <BadgeCard key={b.id} icon={b.icon} name={b.name} description={b.desc} earned={earned.has(b.id)} />
          ))}
        </section>
      </main>
    </div>
  )
}
