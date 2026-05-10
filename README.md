# Solpal — Your AI Coding Mentor 🤖

> Paste buggy code. Get beginner-friendly explanations. Earn Solana badges.

---

## 🏆 Built for Dev3Pack Hackathon

Solpal is an AI-powered coding mentor for beginner developers built on Solana.
Users paste buggy code, receive plain-English explanations and fixes, and earn
verifiable achievement badges minted permanently on the Solana blockchain.

---

## 🎯 The Problem

Beginner developers constantly hit walls with cryptic error messages. Tools like
Stack Overflow assume too much knowledge. AI tools like ChatGPT give technical
answers that confuse beginners even more. There is no tool that explains bugs the
way a patient human mentor would — and rewards you for learning.

---

## 💡 The Solution

Solpal combines AI and blockchain to create the first coding mentor that:

- Explains bugs in plain English (like you're 12 years old)
- Shows you the fixed code instantly
- Teaches you _why_ the bug happened
- Rewards your progress with verifiable on-chain badges

---

## ✨ Features

- 🤖 **AI Code Debugging** — Powered by Groq (Llama 3.3 70B). Paste any buggy code and get instant beginner-friendly analysis
- 🔴 **What Went Wrong** — Plain English explanation of the bug, zero jargon
- ✅ **Fixed Code** — Complete corrected version with one-click copy
- 💡 **Learning Tip** — One actionable lesson from every bug
- 🏅 **Solana Badge System** — Achievement badges minted as memo transactions on Solana devnet
- 👻 **Phantom Wallet Integration** — Connect your wallet and mint badges on-chain
- 🔗 **Solscan Verification** — Every badge has a verifiable transaction link on Solscan
- 🌐 **Multi-language Support** — Python, JavaScript, TypeScript, Rust, and more

---

## 🏅 Achievement Badges

| Badge             | How to Earn                       |
| ----------------- | --------------------------------- |
| 🐛 First Debug    | Complete your first debug session |
| 🔥 On a Roll      | Debug 3 times in one session      |
| 🧠 Quick Learner  | Debug 5 times in one session      |
| ⚡ Speed Debugger | Get a fix in under 30 seconds     |

All badges are minted as permanent memo transactions on Solana devnet and
verifiable on Solscan.

---

## 🛠 Tech Stack

### Frontend

- Next.js 14 (App Router)
- Tailwind CSS
- @solana/wallet-adapter-react
- @solana/web3.js
- @solana/spl-memo

### Backend

- FastAPI (Python)
- Groq API (Llama 3.3 70B)

### Blockchain

- Solana Devnet
- Memo Program (on-chain badge recording)
- Phantom Wallet

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Phantom Wallet browser extension

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
pip install fastapi uvicorn groq python-dotenv
uvicorn main:app --reload
```

### Environment Variables

Frontend `.env.local`:

Backend `.env`:
GROQ_API_KEY=your_groq_api_key

---

## 📸 Demo

1. Paste buggy code into the editor
2. Select your programming language
3. Click **Debug My Code**
4. Read the beginner-friendly explanation
5. Copy the fixed code
6. Connect your Phantom wallet
7. Mint your achievement badge on Solana devnet
8. Verify your badge on Solscan

---

## 🌍 Why This Matters

There are millions of beginner developers in Nigeria and across Africa learning
to code with limited access to mentors. Solpal democratizes access to patient,
judgment-free coding help — and uses blockchain to create verifiable proof of
learning that can be used in portfolios and job applications.

---

## 👥 Team

Built with ❤️ for Dev3Pack Hackathon

---

## 📄 License

MIT
