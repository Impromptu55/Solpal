"use client"
import React, { useState } from 'react'

type Props = {
  title: string
  content: string
  isCode?: boolean
}

export default function ResultCard({ title, content, isCode = false }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  return (
    <div className="p-4 bg-[#12121a] rounded-xl">
      <h4 className="font-semibold">{title}</h4>
      {isCode ? (
        <div className="mt-3 relative">
          <pre className="bg-[#0b0b12] p-4 rounded-md overflow-x-auto text-sm font-mono">
            {content}
          </pre>
          <button onClick={copy} className="absolute top-2 right-2 bg-purple-600/90 text-black px-2 py-1 rounded">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      ) : (
        <p className="mt-2 text-slate-300 text-sm whitespace-pre-wrap">{content}</p>
      )}
    </div>
  )
}
