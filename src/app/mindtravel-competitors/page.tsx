"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Headphones,
  Music,
  MapPin,
  Users,
  TrendingUp,
  Globe,
  DollarSign,
  Target,
  Activity,
  Award,
  Calendar,
  Video,
} from "lucide-react";

// Dynamically import recharts components to avoid SSR issues
const DynamicBarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), { ssr: false });
const DynamicPieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const DynamicRadarChart = dynamic(() => import("recharts").then((mod) => mod.RadarChart), { ssr: false });

// Competitor Data
const competitors = [
  {
    id: 1,
    name: "MindTravel",
    url: "mindtravel.com",
    category: "Live Music + Meditation",
    focus: "Silent Piano + Headphone Experiences",
    eventsPerYear: 150,
    cities: 100,
    audience: "Wellness seekers, music lovers",
    pricing: "$30-75",
    differentiation: "Improvised live piano + headphones",
    strengths: ["Immersive headphones", "Nature settings", "Meditation focus"],
    keyOfferings: ["SilentWalk", "Live-to-Headphones", "Underwater Meditation"],
    socialPresence: 85000,
    primaryMarkets: ["Los Angeles", "Miami", "New York", "Austin"],
    adSpendEstimate: "Low",
  },
  {
    id: 2,
    name: "Shambhala Music Festival",
    url: "shambhalamusicfestival.com",
    category: "Electronic + Wellness",
    focus: "Music festival with wellness components",
    eventsPerYear: 1,
    cities: 1,
    audience: "EDM + wellness hybrid",
    pricing: "$300-500",
    differentiation: "Large scale EDM with mindfulness zones",
    strengths: ["Massive scale", "Wellness zones", "Community"],
    keyOfferings: ["Mainstage EDM", "Wellness zones", "Workshops"],
    socialPresence: 420000,
    primaryMarkets: ["British Columbia", "Canada"],
    adSpendEstimate: "High",
  },
  {
    id: 3,
    name: "Wanderlust Festival",
    url: "wanderlust.com",
    category: "Yoga + Music + Travel",
    focus: "Yoga festivals with live music",
    eventsPerYear: 8,
    cities: 12,
    audience: "Yoga enthusiasts",
    pricing: "$150-400",
    differentiation: "Yoga + music + outdoor adventure",
    strengths: ["Yoga community", "Outdoor events", "Lifestyle brand"],
    keyOfferings: ["Yoga classes", "5K run", "Live music", "Hiking"],
    socialPresence: 310000,
    primaryMarkets: ["North America", "Oceania"],
    adSpendEstimate: "Medium",
  },
  {
    id: 4,
    name: "Enlightened Society",
    url: "enlightenedsociety.com",
    category: "Silent Disco Events",
    focus: "Silent disco + guided experiences",
    eventsPerYear: 50,
    cities: 25,
    audience: "Young professionals",
    pricing: "$25-60",
    differentiation: "Party atmosphere with headphones",
    strengths: ["Dance focus", "Social events", "DJ sets"],
    keyOfferings: ["Silent Disco", "Guided Tours", "Sunrise Sessions"],
    socialPresence: 45000,
    primaryMarkets: ["Los Angeles", "San Francisco", "NYC"],
    adSpendEstimate: "Medium",
  },
  {
    id: 5,
    name: "Silent Adventures",
    url: "silentadventures.com",
    category: "Silent Walking Tours",
    focus: "Guided silent disco walking tours",
    eventsPerYear: 200,
    cities: 40,
    audience: "Tourists + locals",
    pricing: "$20-45",
    differentiation: "Walking tours with silent disco tech",
    strengths: ["Tourist accessible", "Urban focus", "Group bookings"],
    keyOfferings: ["Walking Tours", "Dance Classes", "Corporate Events"],
    socialPresence: 67000,
    primaryMarkets: ["Major US Cities", "Europe"],
    adSpendEstimate: "Low",
  },
  {
    id: 6,
    name: "Daybreaker",
    url: "daybreaker.com",
    category: "Morning Dance Parties",
    focus: "Early morning sober dance events",
    eventsPerYear: 120,
    cities: 28,
    audience: "Health-conscious professionals",
    pricing: "$25-55",
    differentiation: "6 AM dance parties + yoga + music",
    strengths: ["Morning niche", "Sober community", "High energy"],
    keyOfferings: ["Sunrise dance", "Yoga flow", "Breakfast social"],
    socialPresence: 128000,
    primaryMarkets: ["NYC", "LA", "London", "Sydney"],
    adSpendEstimate: "High",
  },
  {
    id: 7,
    name: "The Big Quiet",
    url: "thebigquiet.com",
    category: "Mass Meditation Events",
    focus: "Large-scale group meditation + sound",
    eventsPerYear: 25,
    cities: 8,
    audience: "Urban millennials",
    pricing: "$35-80",
    differentiation: "Mass meditation in iconic venues",
    strengths: ["Iconic venues", "Sound healing", "Community"],
    keyOfferings: ["Mass Meditation", "Sound baths", "Intimate shows"],
    socialPresence: 92000,
    primaryMarkets: ["New York", "Los Angeles"],
    adSpendEstimate: "Medium",
  },
  {
    id: 8,
    name: "One Giant Leap",
    url: "onegiantleap.com",
    category: "Transformational Festivals",
    focus: "Wellness + music + personal growth",
    eventsPerYear: 4,
    cities: 4,
    audience: "Transformational seekers",
    pricing: "$400-900",
    differentiation: "High-end retreat experiences",
    strengths: ["Luxury positioning", "Expert facilitators", "Growth focus"],
    keyOfferings: ["Retreats", "Workshops", "VIP Experiences"],
    socialPresence: 34000,
    primaryMarkets: ["California", "Costa Rica", "Bali"],
    adSpendEstimate: "Low",
  },
];

// Chart Data
const marketShareData = [
  { name: "Daybreaker", value: 28, color: "#8884d8" },
  { name: "Wanderlust", value: 22, color: "#83a6ed" },
  { name: "Shambhala", value: 18, color: "#8dd1e1" },
  { name: "MindTravel", value: 12, color: "#82ca9d" },
  { name: "Big Quiet", value: 10, color: "#a4de6c" },
  { name: "Others", value: 10, color: "#d0ed57" },
];

const pricingComparison = [
  { name: "Silent Adventures", low: 20, high: 45, avg: 32 },
  { name: "Daybreaker", low: 25, high: 55, avg: 40 },
  { name: "Enlightened", low: 25, high: 60, avg: 42 },
  { name: "MindTravel", low: 30, high: 75, avg: 52 },
  { name: "Big Quiet", low: 35, high: 80, avg: 57 },
  { name: "Wanderlust", low: 150, high: 400, avg: 275 },
];

const radarData = [
  { subject: "Music Focus", A: 90, B: 70, C: 60, fullMark: 100 },
  { subject: "Meditation", A: 95, B: 50, C: 80, fullMark: 100 },
  { subject: "Social/Party", A: 30, B: 95, C: 85, fullMark: 100 },
  { subject: "Nature/Outdoor", A: 85, B: 60, C: 70, fullMark: 100 },
  { subject: "Accessibility", A: 70, B: 90, C: 85, fullMark: 100 },
  { subject: "Premium Price", A: 40, B: 30, C: 90, fullMark: 100 },
];

const eventFrequencyData = [
  { name: "MindTravel", events: 150, cities: 100 },
  { name: "Daybreaker", events: 120, cities: 28 },
  { name: "Silent Adv.", events: 200, cities: 40 },
  { name: "Wanderlust", events: 8, cities: 12 },
  { name: "Big Quiet", events: 25, cities: 8 },
  { name: "Shambhala", events: 1, cities: 1 },
];

export default function MindTravelCompetitors() {
  const [selectedCompetitor, setSelectedCompetitor] = useState(competitors[0]);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                MindTravel Competitive Intelligence
              </h1>
              <p className="text-gray-600 mt-1">
                Music × Mindfulness × Live Experiences Market Analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Competitors</p>
                <p className="text-3xl font-bold text-purple-700">8</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Combined Events/Year</p>
                <p className="text-3xl font-bold text-indigo-700">628+</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Combined Social Reach</p>
                <p className="text-3xl font-bold text-pink-700">1.2M+</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-xl">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Global Cities Covered</p>
                <p className="text-3xl font-bold text-blue-700">226+</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8 p-2">
          <div className="flex flex-wrap gap-2">
            {["overview", "pricing", "market", "offerings", "strategy"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Competitor Selector */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Select Competitor
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {competitors.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompetitor(comp)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      selectedCompetitor.id === comp.id
                        ? "bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300"
                        : "bg-gray-50 hover:bg-purple-50 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-800">{comp.name}</p>
                        <p className="text-sm text-gray-500">{comp.category}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {comp.cities} cities
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Competitor Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                {selectedCompetitor.name} Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Events/Year</p>
                    <p className="text-2xl font-bold text-purple-700">{selectedCompetitor.eventsPerYear}</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Cities</p>
                    <p className="text-2xl font-bold text-indigo-700">{selectedCompetitor.cities}</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Price Range</p>
                    <p className="text-xl font-bold text-pink-700">{selectedCompetitor.pricing}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Social Following</p>
                    <p className="text-xl font-bold text-blue-700">
                      {(selectedCompetitor.socialPresence / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Key Differentiation</p>
                  <p className="text-gray-800 font-medium">{selectedCompetitor.differentiation}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompetitor.strengths.map((s) => (
                      <span key={s} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Key Offerings</p>
                  <ul className="space-y-1">
                    {selectedCompetitor.keyOfferings.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-gray-700">
                        <Music className="w-4 h-4 text-purple-600" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Primary Markets</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompetitor.primaryMarkets.map((m) => (
                      <span key={m} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Event Frequency Chart */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Event Frequency vs Geographic Reach
              </h2>
              <div className="h-80">
                {typeof window !== "undefined" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eventFrequencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="events" name="Events/Year" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="cities" name="Cities" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Pricing Comparison
            </h2>
            <div className="h-96">
              {typeof window !== "undefined" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pricingComparison} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="low" name="Low Price" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="high" name="High Price" stackId="a" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-600">Budget Tier</p>
                <p className="text-xl font-bold text-green-700">$20-60</p>
                <p className="text-xs text-gray-500">Silent Adventures, Daybreaker</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-600">Mid Tier</p>
                <p className="text-xl font-bold text-blue-700">$30-80</p>
                <p className="text-xs text-gray-500">MindTravel, Big Quiet</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-600">Premium Tier</p>
                <p className="text-xl font-bold text-purple-700">$150-900</p>
                <p className="text-xs text-gray-500">Wanderlust, One Giant Leap</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "market" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Estimated Market Share (Social Following)
              </h2>
              <div className="h-80">
              {typeof window !== "undefined" && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Competitive Positioning
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="MindTravel"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Daybreaker"
                      dataKey="B"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="One Giant Leap"
                      dataKey="C"
                      stroke="#ffc658"
                      fill="#ffc658"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "offerings" && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Video className="w-5 h-5 text-pink-600" />
              Offerings Matrix
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Competitor</th>
                    <th className="text-center py-3 px-4">Silent Headphones</th>
                    <th className="text-center py-3 px-4">Live Music</th>
                    <th className="text-center py-3 px-4">Meditation</th>
                    <th className="text-center py-3 px-4">Social/Party</th>
                    <th className="text-center py-3 px-4">Outdoor/Nature</th>
                    <th className="text-center py-3 px-4">Mobile/Travel</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp) => (
                    <tr key={comp.id} className="border-b border-gray-100 hover:bg-purple-50">
                      <td className="py-3 px-4 font-medium">{comp.name}</td>
                      <td className="text-center py-3 px-4">
                        {comp.keyOfferings.some(k => k.toLowerCase().includes("silent") || k.toLowerCase().includes("headphone")) ? "✅" : "❌"}
                      </td>
                      <td className="text-center py-3 px-4">
                        {comp.keyOfferings.some(k => k.toLowerCase().includes("music") || k.toLowerCase().includes("piano") || k.toLowerCase().includes("concert")) ? "✅" : "❌"}
                      </td>
                      <td className="text-center py-3 px-4">
                        {comp.keyOfferings.some(k => k.toLowerCase().includes("meditation") || k.toLowerCase().includes("yoga") || k.toLowerCase().includes("sound")) ? "✅" : "❌"}
                      </td>
                      <td className="text-center py-3 px-4">
                        {comp.category.includes("Party") || comp.category.includes("Disco") ? "✅" : "❌"}
                      </td>
                      <td className="text-center py-3 px-4">
                        {comp.keyOfferings.some(k => k.toLowerCase().includes("walk") || k.toLowerCase().includes("outdoor") || k.toLowerCase().includes("hike")) ? "✅" : "❌"}
                      </td>
                      <td className="text-center py-3 px-4">
                        {comp.primaryMarkets.length > 10 ? "✅" : "❌"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "strategy" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                MindTravel's Competitive Advantages
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-1 rounded">🎹</span>
                  <span><strong>Improvised Live Piano:</strong> Unique vs pre-recorded or DJ sets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-1 rounded">🎧</span>
                  <span><strong>Headphone Immersion:</strong> Creates intimate personal experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-1 rounded">🌊</span>
                  <span><strong>Underwater Meditation:</strong> Unique differentiator</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-1 rounded">🏃</span>
                  <span><strong>SilentWalk:</strong> Movement + music hybrid</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-1 rounded">🌿</span>
                  <span><strong>Nature Settings:</strong> Not urban/club focused</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-white/20 p-1 rounded">📚</span>
                  <span><strong>Edu Content:</strong> Mastery courses + Meditation instruction</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Opportunities for MindTravel
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="font-medium text-green-800">🎯 Expand International</p>
                  <p className="text-sm text-green-600 mt-1">Currently US-heavy. Daybreaker & Silent Adventures have stronger global presence.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="font-medium text-blue-800">📱 App Monetization</p>
                  <p className="text-sm text-blue-600 mt-1">App "coming soon" - competitors like Big Quiet have strong digital memberships.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="font-medium text-purple-800">🏢 Corporate/B2B</p>
                  <p className="text-sm text-purple-600 mt-1">Daybreaker does corporate wellness. Silent Adventures targets team building.</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-xl">
                  <p className="font-medium text-pink-800">🎁 Subscription Model</p>
                  <p className="text-sm text-pink-600 mt-1">One Giant Leap has premium retreats. Wanderlust has membership tiers.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Market Positioning Map
              </h2>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-purple-100 rounded-xl border-2 border-purple-300">
                  <p className="font-bold text-purple-800">MindTravel</p>
                  <p className="text-xs text-purple-600">Music × Meditation × Nature</p>
                  <p className="text-xs text-gray-500 mt-1">Mid Price, High Frequency</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-xl">
                  <p className="font-bold text-blue-800">Big Quiet</p>
                  <p className="text-xs text-blue-600">Mass Meditation × Sound</p>
                  <p className="text-xs text-gray-500 mt-1">Urban Focus</p>
                </div>
                <div className="p-4 bg-green-100 rounded-xl">
                  <p className="font-bold text-green-800">Daybreaker</p>
                  <p className="text-xs text-green-600">Morning Dance × Yoga</p>
                  <p className="text-xs text-gray-500 mt-1">High Energy, Community</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-xl">
                  <p className="font-bold text-yellow-800">Wanderlust</p>
                  <p className="text-xs text-yellow-600">Yoga Festival × Adventure</p>
                  <p className="text-xs text-gray-500 mt-1">Premium Retreat</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
