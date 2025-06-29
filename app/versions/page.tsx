"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Code, GitBranch, Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PageVersion {
  id: string
  name: string
  version: string
  description: string
  features: string[]
  status: "current" | "development" | "archived"
  lastModified: string
  author: string
  route: string
  screenshot?: string
}

export default function VersionManager() {
  const [selectedPage, setSelectedPage] = useState<string>("collection")

  const pageVersions: Record<string, PageVersion[]> = {
    collection: [
      {
        id: "collection-v3",
        name: "Collection Page",
        version: "v3.0",
        description: "Enhanced collection with search functionality and improved stats",
        features: ["Search bar", "Filter tabs", "Progress tracking", "Stats cards", "Responsive grid"],
        status: "current",
        lastModified: "2024-01-15",
        author: "Development Team",
        route: "/collection",
        screenshot: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "collection-v2",
        name: "Collection Page",
        version: "v2.1",
        description: "Added filter system and progress visualization",
        features: ["Filter tabs", "Progress bar", "Fish grid", "Basic stats"],
        status: "archived",
        lastModified: "2024-01-10",
        author: "Development Team",
        route: "/versions/collection/v2",
        screenshot: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "collection-v1",
        name: "Collection Page",
        version: "v1.0",
        description: "Initial collection page with basic fish display",
        features: ["Fish grid", "Basic layout", "Simple navigation"],
        status: "archived",
        lastModified: "2024-01-05",
        author: "Development Team",
        route: "/versions/collection/v1",
        screenshot: "/placeholder.svg?height=200&width=300",
      },
    ],
    captain: [
      {
        id: "captain-v2",
        name: "Find a Captain",
        version: "v2.0",
        description: "Complete booking system with calendar and notes",
        features: ["Captain profiles", "Booking modal", "Calendar selection", "Notes system", "Search"],
        status: "current",
        lastModified: "2024-01-15",
        author: "Development Team",
        route: "/demo",
        screenshot: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "captain-v1",
        name: "Find a Captain",
        version: "v1.0",
        description: "Basic captain listing without booking functionality",
        features: ["Captain profiles", "Basic search", "Rating display"],
        status: "archived",
        lastModified: "2024-01-12",
        author: "Development Team",
        route: "/versions/captain/v1",
        screenshot: "/placeholder.svg?height=200&width=300",
      },
    ],
    landing: [
      {
        id: "landing-v1",
        name: "Landing Page",
        version: "v1.0",
        description: "Marketing landing page with hero section and features",
        features: ["Hero section", "Feature showcase", "Testimonials", "CTA sections"],
        status: "current",
        lastModified: "2024-01-14",
        author: "Development Team",
        route: "/landing",
        screenshot: "/placeholder.svg?height=200&width=300",
      },
    ],
    demo: [
      {
        id: "demo-v1",
        name: "Demo Application",
        version: "v1.0",
        description: "Full demo with all features and mock data",
        features: ["All tabs", "Mock data", "Interactive features", "Complete UI"],
        status: "current",
        lastModified: "2024-01-15",
        author: "Development Team",
        route: "/demo",
        screenshot: "/placeholder.svg?height=200&width=300",
      },
    ],
  }

  const getStatusColor = (status: PageVersion["status"]) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-700"
      case "development":
        return "bg-blue-100 text-blue-700"
      case "archived":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: PageVersion["status"]) => {
    switch (status) {
      case "current":
        return "✅"
      case "development":
        return "🚧"
      case "archived":
        return "📦"
      default:
        return "📄"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <GitBranch className="w-6 h-6" />
                Version Manager
              </h1>
              <p className="text-gray-600 mt-1">Manage and compare different versions of your pages</p>
            </div>
            <Link href="/demo">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Page Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Pages</h3>
                <div className="space-y-2">
                  {Object.keys(pageVersions).map((pageKey) => (
                    <button
                      key={pageKey}
                      onClick={() => setSelectedPage(pageKey)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedPage === pageKey
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium capitalize">{pageKey.replace("-", " ")}</div>
                      <div className="text-sm text-gray-500">
                        {pageVersions[pageKey].length} version{pageVersions[pageKey].length !== 1 ? "s" : ""}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Pages:</span>
                    <span className="font-medium">{Object.keys(pageVersions).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Versions:</span>
                    <span className="font-medium">
                      {Object.values(pageVersions).reduce((acc, versions) => acc + versions.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium text-green-600">
                      {Object.values(pageVersions).reduce(
                        (acc, versions) => acc + versions.filter((v) => v.status === "current").length,
                        0,
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Version List */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                {selectedPage.replace("-", " ")} Versions
              </h2>
              <p className="text-gray-600">
                View and manage different versions of the {selectedPage.replace("-", " ")} page
              </p>
            </div>

            <div className="space-y-4">
              {pageVersions[selectedPage]?.map((version) => (
                <Card key={version.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                      {/* Screenshot */}
                      <div className="md:col-span-1">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={version.screenshot || "/placeholder.svg"}
                            alt={`${version.name} ${version.version}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{version.name}</h3>
                              <Badge variant="outline" className="font-mono text-xs">
                                {version.version}
                              </Badge>
                              <Badge className={getStatusColor(version.status)}>
                                {getStatusIcon(version.status)} {version.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{version.description}</p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                          <div className="flex flex-wrap gap-1">
                            {version.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {version.lastModified}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {version.author}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Link href={version.route}>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                              <Eye className="w-4 h-4 mr-2" />
                              View Live
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Code className="w-4 h-4 mr-2" />
                            View Code
                          </Button>
                          {version.status !== "current" && (
                            <Button size="sm" variant="outline" className="bg-transparent">
                              Make Current
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
