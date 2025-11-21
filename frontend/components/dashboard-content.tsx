"use client"

import { useEffect, useState } from "react"
import { StatCard } from "./stat-card"
import { OverviewChart } from "./overview-chart"
import { RecentSales } from "./recent-sales"
import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react"
import { apiClient } from "@/lib/api-client"

interface DashboardData {
  totalRevenue: number
  revenueChange: number
  subscriptions: number
  subscriptionsChange: number
  sales: number
  salesChange: number
  activeNow: number
  activeNowChange: number
  chartData: Array<{ month: string; revenue: number }>
  recentSales: Array<{
    id: string
    name: string
    email: string
    amount: number
    avatar?: string
  }>
}

export function DashboardContent() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get("/api/dashboard/")
        setData(response)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch dashboard data")
        console.error("Dashboard data fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">Error: {error}</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="text-muted-foreground">No data available</div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${data.totalRevenue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          change={`+${data.revenueChange.toFixed(1)}% from last month`}
          icon={DollarSign}
        />
        <StatCard
          title="Subscriptions"
          value={`+${data.subscriptions.toLocaleString()}`}
          change={`+${data.subscriptionsChange.toFixed(1)}% from last month`}
          icon={Users}
        />
        <StatCard
          title="Sales"
          value={`+${data.sales.toLocaleString()}`}
          change={`+${data.salesChange.toFixed(1)}% from last month`}
          icon={ShoppingCart}
        />
        <StatCard
          title="Active Now"
          value={`+${data.activeNow.toLocaleString()}`}
          change={`+${data.activeNowChange} since last hour`}
          icon={Activity}
        />
      </div>

      {/* Chart and Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OverviewChart data={data.chartData} />
        <RecentSales sales={data.recentSales} />
      </div>
    </div>
  )
}
