# Solpal — AI Coding Mentor (Next.js + Tailwind)

This is a hackathon frontend for Solpal. It includes:

- Main debugger page with OpenAI integration
- Badges page with Solana wallet connect (Phantom)
- Placeholder mintBadge helper for Solana devnet

Setup

1. Install dependencies:

```pwsh
npm install
```

2. Run the dev server:

```pwsh
npm run dev
```

Notes

- Add the OpenAI API key to `.env.local` (already included for demo).
- Smart contract minting is a placeholder in `lib/solana.ts` — other teammates should provide program details.
