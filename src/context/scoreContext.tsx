"use client"

import { createContext, useContext, useState } from "react"

interface ScoreContextValue {
  score: number
  addScore: (value: number) => void
  removeScore: (value: number) => void
}

const ScoreContext = createContext<ScoreContextValue | undefined>(undefined)

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(5)

  function addScore(value: number) {
    setScore(prev => prev + value)
  }

  function removeScore(value: number) {
    setScore(prev => Math.max(0, prev - value))
  }

  return (
    <ScoreContext.Provider value={{ score, addScore, removeScore }}>
      {children}
    </ScoreContext.Provider>
  )
}

export function useScore() {
  const ctx = useContext(ScoreContext)
  if (!ctx) throw new Error("useScore must be used inside ScoreProvider")
  return ctx
}
