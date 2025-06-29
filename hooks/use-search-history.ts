"use client"

import { useState, useEffect } from "react"

const SEARCH_HISTORY_KEY = "fish-search-history"
const MAX_HISTORY_ITEMS = 5

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    // Load search history from localStorage
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading search history:", error)
      }
    }
  }, [])

  const addToHistory = (query: string) => {
    if (!query.trim()) return

    setSearchHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase())
      // Add to beginning
      const updated = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS)

      // Save to localStorage
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))

      return updated
    })
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  }

  return {
    searchHistory,
    addToHistory,
    clearHistory,
  }
}
