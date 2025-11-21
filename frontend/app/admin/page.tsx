"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { API_ENDPOINTS } from "@/lib/api";
import { useAuth } from "@/store/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type StatsResponse = {
  labels: string[];
  orders: number[];
  revenue: number[];
  new_users: number[];
  totals: {
    total_orders: number;
    total_revenue: number;
    total_users: number;
  };
};

export default function AdminDashboardPage() {
  const { user, token, isLoading } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    async function load() {
      try {
        setError(null);
        // Only fetch if we have a token and an admin user
        if (!token || !user || !(user.is_staff || user.is_superuser)) return;
        const res = await fetch(API_ENDPOINTS.admin.stats, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch stats (${res.status})`);
        }
        const data: StatsResponse = await res.json();
        if (!abort) setStats(data);
      } catch (e: any) {
        if (!abort) setError(e.message ?? "Failed to load stats");
      }
    }
    load();
    return () => {
      abort = true;
    };
  }, [token, user]);

  // Simple skeleton while authorizing or loading stats
  const Skeleton = () => (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="h-7 w-56 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="mt-3 h-7 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="mt-2 h-3 w-24 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4 h-[360px]">
          <div className="h-5 w-64 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-40 bg-gray-100 rounded mb-4 animate-pulse" />
          <div className="h-[280px] bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="rounded-lg border p-4 h-[360px]">
          <div className="h-5 w-64 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-40 bg-gray-100 rounded mb-4 animate-pulse" />
          <div className="h-[280px] bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="rounded-lg border p-4 h-[360px] lg:col-span-2">
          <div className="h-5 w-80 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-48 bg-gray-100 rounded mb-4 animate-pulse" />
          <div className="h-[280px] bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <Skeleton />;
  }
  if (!user || !(user.is_staff || user.is_superuser)) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">You must be an admin to view this page.</p>
      </div>
    );
  }

  const revenueLineData = useMemo(
    () => ({
      labels: stats?.labels ?? [],
      datasets: [
        {
          label: "Revenue",
          data: stats?.revenue ?? [],
          borderColor: "rgba(99, 102, 241, 1)",
          backgroundColor: "rgba(99, 102, 241, 0.2)",
        },
      ],
    }),
    [stats]
  );

  const ordersBarData = useMemo(
    () => ({
      labels: stats?.labels ?? [],
      datasets: [
        {
          label: "Orders",
          data: stats?.orders ?? [],
          backgroundColor: "rgba(34, 197, 94, 0.5)",
        },
      ],
    }),
    [stats]
  );

  const usersLineData = useMemo(
    () => ({
      labels: stats?.labels ?? [],
      datasets: [
        {
          label: "New Users",
          data: stats?.new_users ?? [],
          borderColor: "rgba(59, 130, 246, 1)",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
        },
      ],
    }),
    [stats]
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Admin Dashboard</h1>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={stats ? `$${stats.totals.total_revenue.toLocaleString()}` : "—"}
          icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
          trend="Up 8.2% from last month"
        />
        <StatCard
          title="Orders"
          value={stats ? stats.totals.total_orders.toLocaleString() : "—"}
          icon={<ShoppingCart className="h-5 w-5 text-blue-600" />}
          trend="Up 3.1% from last month"
        />
        <StatCard
          title="New Users"
          value={stats ? stats.totals.total_users.toLocaleString() : "—"}
          icon={<Users className="h-5 w-5 text-violet-600" />}
          trend="Up 5.4% from last month"
        />
        <StatCard
          title="Growth"
          value={
            stats
              ? `${Math.round((stats.totals.total_orders + stats.totals.total_users) / 50)}%`
              : "—"
          }
          icon={<TrendingUp className="h-5 w-5 text-rose-600" />}
          trend="Stable vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue (Last 12 months)</CardTitle>
            <CardDescription>Overall revenue progression</CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <Line data={revenueLineData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
            ) : (
              <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders (Last 12 months)</CardTitle>
            <CardDescription>Number of orders per month</CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <Bar data={ordersBarData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
            ) : (
              <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>New Users (Last 12 months)</CardTitle>
            <CardDescription>User acquisition trend</CardDescription>
          </CardHeader>
          <CardContent>
            {stats ? (
              <Line data={usersLineData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
            ) : (
              <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn("text-xs text-muted-foreground mt-1")}>{trend}</p>
      </CardContent>
    </Card>
  );
}
