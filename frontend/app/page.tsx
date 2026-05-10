"use client"
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import CodeInput from '../components/CodeInput'
import ResultCard from '../components/ResultCard'
import { toast } from 'react-hot-toast'

// Main debugger page. Client component because it uses hooks and browser APIs.

export default function Page() {
  const [results, setResults] = useState<null | { problem: string; fixedCode: string; tip: string }>(null)
  const [loading, setLoading] = useState(false)
  const [showBadgeNotice, setShowBadgeNotice] = useState(false)

  // Called by CodeInput when user submits code
  async function handleDebug(code: string, language: string) {
    setLoading(true)
    setResults(null)
    try {
      const res = await fetch('http://localhost:8000/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })

      if (!res.ok) throw new Error('Server error while debugging')

      const data = await res.json()
      setResults({
        problem: data.explanation ?? data.problem ?? 'No explanation returned',
        fixedCode: data.corrected_code ?? data.fixedCode ?? '',
        tip: data.learning_tips ?? data.tip ?? '',
      })
      setShowBadgeNotice(true)
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to debug. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAwardBadge() {
    try {
      const res = await fetch('http://localhost:8000/api/badges/award', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badge: 'first_debug' }),
      })

      if (!res.ok) throw new Error('Badge award failed')
      toast.success('Badge awarded successfully!')
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to award badge.')
    }
  }

  return (
    <div>
      <NavBar />

      <main className="py-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
          Solpal — Your AI Coding Mentor
        </h1>
        <p className="mt-2 text-slate-400 max-w-2xl">Paste buggy code and get a beginner-friendly explanation, a fixed version, and a helpful tip.</p>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CodeInput onSubmit={handleDebug} loading={loading} />
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="p-4 bg-[#12121a] rounded-xl shadow-glow">
              <h3 className="text-lg font-semibold">Session</h3>
              <p className="text-sm text-slate-400 mt-2">Language, run time hints, and quick actions will appear here.</p>
            </div>

            {showBadgeNotice && (
              <div className="p-4 bg-gradient-to-r from-purple-800 to-cyan-800 rounded-xl text-white shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg">🎉 You earned the First Debug badge!</h4>
                    <p className="text-sm text-slate-200/80">Mint this badge to your wallet to show off your progress.</p>
                  </div>
                  <button
                    type="button"
                    className="ml-4 px-4 py-2 bg-white text-[#0a0a0f] rounded-md font-medium hover:opacity-95"
                    onClick={handleAwardBadge}
                  >
                    Mint to Wallet
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8">
          {loading && (
            <div className="p-6 bg-[#12121a] rounded-xl animate-pulse">
              <div className="h-6 bg-slate-800 rounded w-1/3 mb-4" />
              <div className="h-40 bg-slate-800 rounded" />
            </div>
          )}

          {results && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResultCard title="🔴 What Went Wrong" content={results.problem} />
              <ResultCard title="✅ Fixed Code" content={results.fixedCode} isCode />
              <ResultCard title="💡 Learning Tip" content={results.tip} />
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
