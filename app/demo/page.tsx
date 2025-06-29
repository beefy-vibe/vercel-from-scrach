"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Grid3X3, Plus, Users, UserIcon, HelpCircle, Star, X, Camera, Upload, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FilterType = "all" | "caught" | "missing"

// Mock data for demo
const mockFishSpecies = [
  { id: "1", name: "Bluegill", scientific_name: "Lepomis macrochirus", rarity: 2 },
  { id: "2", name: "Channel Catfish", scientific_name: "Ictalurus punctatus", rarity: 3 },
  { id: "3", name: "Largemouth Bass", scientific_name: "Micropterus salmoides", rarity: 4 },
  { id: "4", name: "Rainbow Trout", scientific_name: "Oncorhynchus mykiss", rarity: 3 },
  { id: "5", name: "Northern Pike", scientific_name: "Esox lucius", rarity: 5 },
  { id: "6", name: "Walleye", scientific_name: "Sander vitreus", rarity: 4 },
  { id: "7", name: "Smallmouth Bass", scientific_name: "Micropterus dolomieu", rarity: 4 },
  { id: "8", name: "Yellow Perch", scientific_name: "Perca flavescens", rarity: 2 },
]

const mockCatches = [
  { id: "1", species_id: "1", photo_url: "/placeholder.svg?height=200&width=200", location: "Lake Michigan" },
  { id: "2", species_id: "3", photo_url: "/placeholder.svg?height=200&width=200", location: "Bass Lake" },
]

export default function DemoPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [activeTab, setActiveTab] = useState("collection")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Get caught species IDs from mock data
  const caughtSpeciesIds = new Set(mockCatches.map((catchItem) => catchItem.species_id))

  // Calculate progress
  const caughtCount = caughtSpeciesIds.size
  const totalCount = mockFishSpecies.length
  const completionPercentage = totalCount > 0 ? Math.round((caughtCount / totalCount) * 100) : 0

  // Filter fish based on caught status and search
  const filteredFish = mockFishSpecies.filter((fish) => {
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

  const renderStars = (rarity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rarity ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const renderFishCard = (fish: (typeof mockFishSpecies)[0]) => {
    const isCaught = caughtSpeciesIds.has(fish.id)
    const userCatch = mockCatches.find((catchItem) => catchItem.species_id === fish.id)

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
                <div className="text-xs text-gray-600">{userCatch.location && `📍 ${userCatch.location}`}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderContent = () => {
    if (activeTab === "search") {
      return (
        <div className="px-4 pt-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search fish species..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="pb-24">
            {searchQuery ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Results ({filteredFish.length})</h2>
                <div className="grid grid-cols-2 gap-4">{filteredFish.map(renderFishCard)}</div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Fish Species</h3>
                <p className="text-gray-600 text-sm">Type in the search bar above to find specific fish species</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (activeTab === "feed") {
      return (
        <div className="px-4 pt-4 pb-24">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Catches</h2>
          <div className="space-y-4">
            {mockCatches.map((catchItem) => {
              const fish = mockFishSpecies.find((f) => f.id === catchItem.species_id)
              return (
                <Card key={catchItem.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={catchItem.photo_url || "/placeholder.svg"}
                        alt={fish?.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{fish?.name}</h3>
                        <p className="text-sm text-gray-500 italic">{fish?.scientific_name}</p>
                        <p className="text-sm text-gray-600 mt-1">📍 {catchItem.location}</p>
                      </div>
                      <div className="flex items-center gap-0.5">{fish && renderStars(fish.rarity)}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )
    }

    if (activeTab === "captain") {
      return (
        <div className="px-4 pt-4 pb-24">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Find a Captain</h2>

          {/* Search Bar for Captains */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by location or captain name..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Featured Captains */}
          <div className="space-y-4">
            {[
              {
                id: 1,
                name: "Captain Mike Johnson",
                location: "Lake Michigan, Chicago",
                rating: 4.9,
                reviews: 127,
                specialties: ["Bass", "Walleye", "Pike"],
                price: "$350/day",
                image: "/placeholder.svg?height=80&width=80",
                verified: true,
              },
              {
                id: 2,
                name: "Captain Sarah Chen",
                location: "Gulf Coast, Florida",
                rating: 4.8,
                reviews: 89,
                specialties: ["Redfish", "Snook", "Tarpon"],
                price: "$450/day",
                image: "/placeholder.svg?height=80&width=80",
                verified: true,
              },
              {
                id: 3,
                name: "Captain Tom Rodriguez",
                location: "Pacific Coast, California",
                rating: 4.7,
                reviews: 156,
                specialties: ["Salmon", "Tuna", "Rockfish"],
                price: "$400/day",
                image: "/placeholder.svg?height=80&width=80",
                verified: false,
              },
            ].map((captain) => (
              <Card key={captain.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={captain.image || "/placeholder.svg"}
                        alt={captain.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      {captain.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {captain.name}
                            {captain.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                Verified
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">📍 {captain.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{captain.price}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(captain.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {captain.rating} ({captain.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {captain.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                          Book Trip
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Filters */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Popular Locations</h3>
            <div className="flex flex-wrap gap-2">
              {["Lake Michigan", "Gulf Coast", "Pacific Coast", "Great Lakes", "Florida Keys"].map((location) => (
                <Button key={location} variant="outline" size="sm" className="bg-transparent">
                  {location}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "social") {
      return (
        <div className="px-4 pt-4 pb-24">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Community</h2>
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600 text-sm">Connect with other anglers and share your catches</p>
          </div>
        </div>
      )
    }

    if (activeTab === "profile") {
      return (
        <div className="px-4 pt-4 pb-24">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
          <div className="text-center py-12">
            <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Profile</h3>
            <p className="text-gray-600 text-sm">Manage your account and fishing preferences</p>
          </div>
        </div>
      )
    }

    // Default to collection view
    return (
      <>
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
                <div className="text-lg font-bold text-gray-900">{mockCatches.length}</div>
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
                  {mockFishSpecies.filter((fish) => caughtSpeciesIds.has(fish.id) && fish.rarity >= 4).length}
                </div>
                <div className="text-xs text-gray-600">Rare Fish</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 mb-4">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {[
              { key: "all", label: "All Species", count: mockFishSpecies.length },
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
        <div className="px-4 pb-24">
          <div className="grid grid-cols-2 gap-4">{filteredFish.map(renderFishCard)}</div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold text-gray-900">
          {activeTab === "collection"
            ? "Collection"
            : activeTab === "search"
              ? "Search"
              : activeTab === "feed"
                ? "Feed"
                : activeTab === "captain"
                  ? "Find a Captain"
                  : "Profile"}
        </h1>
        {activeTab === "collection" && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
            {caughtCount}/{totalCount}
          </Badge>
        )}
      </div>

      {/* Main Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
        <div className="flex items-center justify-around">
          {[
            { key: "feed", icon: Home, label: "Feed" },
            { key: "search", icon: Search, label: "Search" },
            { key: "collection", icon: Grid3X3, label: "Collection" },
            { key: "add", icon: Plus, label: "", isSpecial: true },
            { key: "captain", icon: Users, label: "Find Captain" },
            { key: "profile", icon: UserIcon, label: "Profile" },
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

            <form className="p-4 space-y-4">
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
                <Input id="location" placeholder="Where did you catch this fish?" />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
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
