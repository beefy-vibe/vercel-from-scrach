"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type FilterType = "all" | "caught" | "missing"

export default function CollectionV2() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const mockFish = [
    { id: "1", name: "Bluegill", scientific_name: "Lepomis macrochirus", rarity: 2, caught: true },
    { id: "2", name: "Bass", scientific_name: "Micropterus salmoides", rarity: 4, caught: true },
    { id: "3", name: "Trout", scientific_name: "Oncorhynchus mykiss", rarity: 3, caught: false },
    { id: "4", name: "Pike", scientific_name: "Esox lucius", rarity: 5, caught: false },
    { id: "5", name: "Walleye", scientific_name: "Sander vitreus", rarity: 4, caught: false },
    { id: "6", name: "Perch", scientific_name: "Perca flavescens", rarity: 2, caught: false },
  ]

  const caughtCount = mockFish.filter((fish) => fish.caught).length
  const totalCount = mockFish.length
  const completionPercentage = Math.round((caughtCount / totalCount) * 100)

  const filteredFish = mockFish.filter((fish) => {
    if (activeFilter === "caught") return fish.caught
    if (activeFilter === "missing") return !fish.caught
    return true
  })

  const renderStars = (rarity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rarity ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Version Banner */}
      <div className="bg-amber-100 border-b border-amber-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500">v2.1</Badge>
            <span className="text-sm text-amber-800">You're viewing an archived version</span>
          </div>
          <Link href="/versions">
            <Button size="sm" variant="outline" className="bg-white">
              Version Manager
            </Button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-4 py-6 flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold text-gray-900">Collection</h1>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
          {caughtCount}/{totalCount}
        </Badge>
      </div>

      {/* Progress Card */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-400 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Collection Progress</h2>
                <p className="text-blue-100">Keep catching to complete your collection!</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{completionPercentage}%</div>
                <div className="text-sm text-blue-100">Complete</div>
              </div>
            </div>
            <div className="w-full bg-blue-400/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-white rounded-lg p-1 shadow-sm">
          {[
            { key: "all", label: "All Species" },
            { key: "caught", label: "Caught" },
            { key: "missing", label: "Missing" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as FilterType)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeFilter === key ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Fish Grid */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {filteredFish.map((fish) => (
            <Card key={fish.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {fish.caught ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <span className="text-white text-2xl">🐟</span>
                    </div>
                  ) : (
                    <HelpCircle className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{fish.name}</h3>
                  <p className="text-xs text-gray-500 italic mb-2">{fish.scientific_name}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${fish.caught ? "text-green-600" : "text-gray-500"}`}>
                      {fish.caught ? "Caught" : "Not caught"}
                    </span>
                    <div className="flex items-center gap-0.5">{renderStars(fish.rarity)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
