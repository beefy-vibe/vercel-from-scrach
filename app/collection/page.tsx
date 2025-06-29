"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Star, Search, X } from "lucide-react"
import { AuthWrapper } from "@/components/auth-wrapper"
import { useFishData } from "@/hooks/use-fish-data"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { SearchSuggestions } from "@/components/search-suggestions"
import { useSearchHistory } from "@/hooks/use-search-history"

type FilterType = "all" | "caught" | "missing"

export default function CollectionPage() {
  return <AuthWrapper>{(user) => <CollectionContent user={user} />}</AuthWrapper>
}

function CollectionContent({ user }: { user: SupabaseUser }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { fishSpecies, catches, loading } = useFishData(user.id)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { searchHistory, addToHistory } = useSearchHistory()

  // Get caught species IDs
  const caughtSpeciesIds = new Set(catches.map((catchItem) => catchItem.species_id))

  // Calculate progress
  const caughtCount = caughtSpeciesIds.size
  const totalCount = fishSpecies.length
  const completionPercentage = totalCount > 0 ? Math.round((caughtCount / totalCount) * 100) : 0

  // Filter fish based on caught status and search query
  const filteredFish = fishSpecies.filter((fish) => {
    const isCaught = caughtSpeciesIds.has(fish.id)

    // Filter by caught status
    let statusMatch = true
    if (activeFilter === "caught") statusMatch = isCaught
    if (activeFilter === "missing") statusMatch = !isCaught

    // Filter by search query
    const searchMatch =
      searchQuery === "" ||
      fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fish.scientific_name.toLowerCase().includes(searchQuery.toLowerCase())

    return statusMatch && searchMatch
  })

  const renderStars = (rarity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rarity ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const renderFishCard = (fish: (typeof fishSpecies)[0]) => {
    const isCaught = caughtSpeciesIds.has(fish.id)
    const userCatch = catches.find((catchItem) => catchItem.species_id === fish.id)

    return (
      <Card key={fish.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
            {isCaught && userCatch?.photo_url ? (
              <>
                <img
                  src={userCatch.photo_url || "/placeholder.svg"}
                  alt={fish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Caught!
                </div>
              </>
            ) : isCaught ? (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center relative">
                <span className="text-white text-2xl">🐟</span>
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Caught!
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <HelpCircle className="w-12 h-12 mb-2" />
                <span className="text-xs">Not caught</span>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{fish.name}</h3>
            <p className="text-xs text-gray-500 italic mb-2">{fish.scientific_name}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5">{renderStars(fish.rarity)}</div>
              {isCaught && userCatch && (
                <div className="text-xs text-gray-600">
                  {userCatch.length_inches && `${userCatch.length_inches}"`}
                  {userCatch.weight_lbs && ` • ${userCatch.weight_lbs}lbs`}
                </div>
              )}
            </div>
            {isCaught && userCatch?.location && (
              <p className="text-xs text-gray-500 mt-1 truncate">📍 {userCatch.location}</p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleSelectFish = (fishName: string) => {
    setSearchQuery(fishName)
    setShowSuggestions(false)
    addToHistory(fishName)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      addToHistory(searchQuery.trim())
      setShowSuggestions(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your collection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 flex items-center justify-between border-b sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">My Collection</h1>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1 text-sm">
          {caughtCount}/{totalCount}
        </Badge>
      </div>

      {/* Collection Progress Card */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-400 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Collection Progress</h2>
                <p className="text-blue-100 text-sm">Keep catching to complete your collection!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{completionPercentage}%</div>
                <div className="text-sm text-blue-100">Complete</div>
              </div>
            </div>
            <div className="w-full bg-blue-400/30 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between text-sm text-blue-100">
              <span>{caughtCount} species caught</span>
              <span>{totalCount - caughtCount} remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-gray-900">{catches.length}</div>
              <div className="text-xs text-gray-600">Total Catches</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-gray-900">{caughtCount}</div>
              <div className="text-xs text-gray-600">Species Found</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-gray-900">
                {fishSpecies.filter((fish) => caughtSpeciesIds.has(fish.id) && fish.rarity >= 4).length}
              </div>
              <div className="text-xs text-gray-600">Rare Fish</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search fish species..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setShowSuggestions(false)
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {showSuggestions && (
            <SearchSuggestions
              fishSpecies={fishSpecies}
              searchQuery={searchQuery}
              onSelectFish={handleSelectFish}
              caughtSpeciesIds={caughtSpeciesIds}
            />
          )}
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-white rounded-lg p-1 shadow-sm">
          {[
            { key: "all", label: "All Species", count: fishSpecies.length },
            { key: "caught", label: "Caught", count: caughtCount },
            { key: "missing", label: "Missing", count: totalCount - caughtCount },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as FilterType)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeFilter === key ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div>{label}</div>
              <div className="text-xs opacity-75">({count})</div>
            </button>
          ))}
        </div>
      </div>

      {/* Fish Grid */}
      <div className="px-4 pb-8">
        {filteredFish.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">{filteredFish.map(renderFishCard)}</div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {searchQuery ? "🔍" : activeFilter === "caught" ? "🎣" : activeFilter === "missing" ? "❓" : "🐟"}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery
                ? "No fish found"
                : activeFilter === "caught"
                  ? "No catches yet!"
                  : activeFilter === "missing"
                    ? "All species caught!"
                    : "No species found"}
            </h3>
            <p className="text-gray-600 text-sm">
              {searchQuery
                ? `No fish species match "${searchQuery}"`
                : activeFilter === "caught"
                  ? "Start fishing to build your collection"
                  : activeFilter === "missing"
                    ? "Congratulations on completing your collection!"
                    : "Check back later for more species"}
            </p>
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="mt-3 text-blue-500 hover:underline text-sm">
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
