"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Simple v1 collection page
export default function CollectionV1() {
  const mockFish = [
    { id: "1", name: "Bluegill", scientific_name: "Lepomis macrochirus", rarity: 2, caught: true },
    { id: "2", name: "Bass", scientific_name: "Micropterus salmoides", rarity: 4, caught: false },
    { id: "3", name: "Trout", scientific_name: "Oncorhynchus mykiss", rarity: 3, caught: false },
    { id: "4", name: "Pike", scientific_name: "Esox lucius", rarity: 5, caught: false },
  ]

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
            <Badge className="bg-amber-500">v1.0</Badge>
            <span className="text-sm text-amber-800">You're viewing an archived version</span>
          </div>
          <Link href="/versions">
            <Button size="sm" variant="outline" className="bg-white">
              Version Manager
            </Button>
          </Link>
        </div>
      </div>

      {/* Simple Header */}
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">My Fish Collection</h1>
      </div>

      {/* Basic Fish Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {mockFish.map((fish) => (
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
