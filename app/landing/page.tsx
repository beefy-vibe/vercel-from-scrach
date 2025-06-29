"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Trophy, Users, MapPin, Star, Smartphone, Zap, Target, ChevronRight, Play, Check } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Camera,
      title: "AI Fish Recognition",
      description: "Snap a photo and our AI instantly identifies the species, size, and weight",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Trophy,
      title: "Collection Game",
      description: "Build your personal fish collection like Pokemon - gotta catch 'em all!",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Users,
      title: "Social Fishing",
      description: "Share your catches, compete with friends, and discover new fishing spots",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: MapPin,
      title: "Track Locations",
      description: "Remember where you caught each fish and discover the best fishing spots",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Anglers" },
    { number: "200+", label: "Fish Species" },
    { number: "1M+", label: "Catches Logged" },
    { number: "4.9★", label: "App Rating" },
  ]

  const testimonials = [
    {
      name: "Mike Johnson",
      role: "Weekend Angler",
      avatar: "/placeholder.svg?height=60&width=60",
      quote: "This app turned fishing into a game! I've discovered 15 new species this month.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Pro Fisher",
      avatar: "/placeholder.svg?height=60&width=60",
      quote: "The AI identification is incredibly accurate. It's like having a fish expert in your pocket.",
      rating: 5,
    },
    {
      name: "Tom Rodriguez",
      role: "Fishing Guide",
      avatar: "/placeholder.svg?height=60&width=60",
      quote: "My clients love sharing their catches. It's brought a whole new social element to fishing.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🎣</div>
              <span className="text-xl font-bold text-gray-900">FishTracker</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/collection">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/collection">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
                🆕 Now with AI Fish Recognition
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Turn Fishing Into Your
                <span className="text-blue-600"> Ultimate Collection Game</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Photograph your catches, build your collection, and compete with anglers worldwide. It's like Pokemon
                GO, but for fishing!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/collection">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                    Start Your Collection
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=600&width=400"
                  alt="FishTracker App Screenshot"
                  className="mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Camera className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Master Fishing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combine the thrill of fishing with the excitement of collecting. Our app makes every fishing trip an
              adventure.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === index ? "border-blue-500 shadow-lg bg-blue-50" : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          activeFeature === index ? "bg-blue-500 text-white" : "bg-gray-100"
                        }`}
                      >
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="relative">
              <img
                src={features[activeFeature].image || "/placeholder.svg"}
                alt={features[activeFeature].title}
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Start building your fish collection in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Camera,
                title: "Snap a Photo",
                description: "Take a picture of your catch using our camera feature",
              },
              {
                step: "2",
                icon: Zap,
                title: "AI Identifies",
                description: "Our AI instantly recognizes the species and estimates size",
              },
              {
                step: "3",
                icon: Target,
                title: "Build Collection",
                description: "Add to your collection and share with the community",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Loved by Anglers Everywhere</h2>
            <p className="text-xl text-gray-600">See what our community is saying about FishTracker</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Fishing Adventure?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of anglers building their ultimate fish collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collection">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Get Started Free
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent"
            >
              <Smartphone className="mr-2 w-5 h-5" />
              Download App
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Works offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">🎣</div>
                <span className="text-xl font-bold">FishTracker</span>
              </div>
              <p className="text-gray-400">The ultimate fishing collection app for anglers worldwide.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Download
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Reddit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FishTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
