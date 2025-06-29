"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Grid3X3, Plus, Users, User, HelpCircle, Star, X, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FishSpecies {
  id: string
  name: string
  scientificName: string
  caught: boolean
  rarity: number
  image?: string
}

const fishSpecies: FishSpecies[] = [
  {
    id: "1",
    name: "Bluegill",
    scientificName: "Lepomis macrochirus",
    caught: false,
    rarity: 2,
  },
  {
    id: "2",
    name: "Channel Catfish",
    scientificName: "Ictalurus punctatus",
    caught: false,
    rarity: 3,
  },
  {
    id: "3",
    name: "Largemouth Bass",
    scientificName: "Micropterus salmoides",
    caught: false,
    rarity: 4,
  },
  {
    id: "4",
    name: "Rainbow Trout",
    scientificName: "Oncorhynchus mykiss",
    caught: false,
    rarity: 3,
  },
  {
    id: "5",
    name: "Northern Pike",
    scientificName: "Esox lucius",
    caught: false,
    rarity: 5,
  },
  {
    id: "6",
    name: "Walleye",
    scientificName: "Sander vitreus",
    caught: false,
    rarity: 4,
  },
]

type FilterType = "all" | "caught" | "missing"

export default function FishingCollection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [activeTab, setActiveTab] = useState("collection")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const caughtCount = fishSpecies.filter((fish) => fish.caught).length
  const totalCount = fishSpecies.length
  const completionPercentage = Math.round((caughtCount / totalCount) * 100)

  const filteredFish = fishSpecies.filter((fish) => {
    if (activeFilter === "caught") return fish.caught
    if (activeFilter === "missing") return !fish.caught
    return true
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitCatch = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Submitting catch...")
    setShowUploadForm(false)
    setUploadedImage(null)
  }

  const renderStars = (rarity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rarity ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold text-gray-900">Collection</h1>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
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
      <div className="px-4 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {filteredFish.map((fish) => (
            <Card key={fish.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                  <p className="text-xs text-gray-500 italic mb-2">{fish.scientificName}</p>
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
        <div className="flex items-center justify-around">
          {[
            { key: "feed", icon: Home, label: "Feed" },
            { key: "collection", icon: Grid3X3, label: "Collection" },
            { key: "add", icon: Plus, label: "", isSpecial: true },
            { key: "social", icon: Users, label: "Social" },
            { key: "profile", icon: User, label: "Profile" },
          ].map(({ key, icon: Icon, label, isSpecial }) => (
            <button
              key={key}
              onClick={() => (key === "add" ? setShowUploadForm(true) : setActiveTab(key))}
              className={`flex flex-col items-center gap-1 py-2 px-3 ${
                isSpecial
                  ? "bg-blue-500 text-white rounded-full p-3 -mt-2"
                  : activeTab === key
                    ? "text-blue-500"
                    : "text-gray-500"
              }`}
            >
              <Icon className={`w-5 h-5 ${isSpecial ? "w-6 h-6" : ""}`} />
              {label && <span className="text-xs font-medium">{label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-md mx-4 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold">Add New Catch</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowUploadForm(false)
                  setUploadedImage(null)
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmitCatch} className="p-4 space-y-4">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo">Photo of your catch</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {uploadedImage ? (
                    <div className="relative">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded catch"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setUploadedImage(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload a photo of your catch</p>
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          <Upload className="w-4 h-4" />
                          Choose Photo
                        </div>
                      </Label>
                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Where did you catch this fish?" required />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} required />
                </div>
              </div>

              {/* Size & Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (inches)</Label>
                  <Input id="length" type="number" step="0.1" placeholder="12.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" type="number" step="0.1" placeholder="2.3" />
                </div>
              </div>

              {/* Bait/Lure */}
              <div className="space-y-2">
                <Label htmlFor="bait">Bait/Lure Used</Label>
                <Input id="bait" placeholder="What did you use to catch this fish?" />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Any additional details about your catch..." rows={3} />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setShowUploadForm(false)
                    setUploadedImage(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
                  Add Catch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
