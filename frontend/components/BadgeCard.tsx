"use client"
import React from 'react'

type Props = {
  icon: string
  name: string
  description: string
  earned?: boolean
}

export default function BadgeCard({ icon, name, description, earned = false }: Props) {
  return (
    <div className={`p-4 rounded-xl ${earned ? 'bg-gradient-to-br from-purple-700 to-cyan-600 shadow-glow' : 'bg-[#12121a] opacity-60'}`}>
      <div className="flex items-center space-x-3">
        <div className="text-3xl">{icon}</div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-slate-300">{description}</div>
        </div>
      </div>
    </div>
  )
}
