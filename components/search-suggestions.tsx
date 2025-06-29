"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface FishSpecies {
  id: string
  name: string
  scientific_name: string
  rarity: number
}

interface SearchSuggestionsProps {
  fishSpecies: FishSpecies[]
  searchQuery: string
  onSelectFish: (fishName: string) => void
  caughtSpeciesIds: Set<string>
}

export function SearchSuggestions({
  fishSpecies,
  searchQuery,
  onSelectFish,
  caughtSpeciesIds,
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<FishSpecies[]>([])

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = fishSpecies
        .filter(
          (fish) =>
            fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            fish.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5) // Limit to 5 suggestions

      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [searchQuery, fishSpecies])

  if (suggestions.length === 0) return null

  const renderStars = (rarity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rarity ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border shadow-lg">
      <CardContent className="p-2">
        <div className="space-y-1">
          {suggestions.map((fish) => {
            const isCaught = caughtSpeciesIds.has(fish.id)
            return (
              <button
                key={fish.id}
                onClick={() => onSelectFish(fish.name)}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{fish.name}</span>
                      {isCaught && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          Caught
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 italic">{fish.scientific_name}</p>
                  </div>
                  <div className="flex items-center gap-1">{renderStars(fish.rarity)}</div>
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
