"use client"
import React, { useState } from 'react'

type Props = {
  onSubmit: (code: string, language: string) => void
  loading: boolean
}

export default function CodeInput({ onSubmit, loading }: Props) {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('JavaScript')

  return (
    <div className="p-6 bg-[#12121a] rounded-xl">
      <label className="text-sm text-slate-300">Language</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-2 mb-4 w-full bg-[#0a0a0f] p-2 rounded-md">
        <option>Python</option>
        <option>JavaScript</option>
        <option>TypeScript</option>
        <option>Rust</option>
        <option>Other</option>
      </select>

      <label className="text-sm text-slate-300">Code</label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your buggy code here..."
        className="mt-2 w-full min-h-[240px] bg-[#0b0b12] text-sm font-mono p-4 rounded-md resize-y"
      />

      <div className="mt-4 flex items-center justify-end">
        <button
          disabled={loading || !code.trim()}
          onClick={() => onSubmit(code, language)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-cyan-400 text-black font-semibold disabled:opacity-60"
        >
          {loading ? 'Debugging...' : 'Debug My Code'}
        </button>
      </div>
    </div>
  )
}
