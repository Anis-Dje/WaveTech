"use client";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { DollarSign, ShoppingCart, UserPlus } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

function last12MonthsLabels(): string[] {
  const fmt = new Intl.DateTimeFormat(undefined, { month: "short" });
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
    return `${fmt.format(d)} ${d.getFullYear()}`;
  });
}

export default function AdminDashboard() {
  // Placeholder demo data; wire to backend later if desired
  const labels = useMemo(() => last12MonthsLabels(), []);
  const orders = useMemo(() => labels.map(() => Math.floor(Math.random() * 50) + 10), [labels]);
  const revenue = useMemo(() => labels.map(() => Math.floor(Math.random() * 4000) + 1000), [labels]);
  const newUsers = useMemo(() => labels.map(() => Math.floor(Math.random() * 30) + 5), [labels]);

  const totals = useMemo(() => ({
    orders: orders.reduce((a, b) => a + b, 0),
    revenue: revenue.reduce((a, b) => a + b, 0).toLocaleString(),
    users: newUsers.reduce((a, b) => a + b, 0),
  }), [orders, revenue, newUsers]);

  const ordersData = useMemo(() => ({
    labels,
    datasets: [{ label: "Orders", data: orders, backgroundColor: "#0d6efd" }],
  }), [labels, orders]);

  const revenueData = useMemo(() => ({
    labels,
    datasets: [{
      label: "Revenue ($)",
      data: revenue,
      borderColor: "#198754",
      backgroundColor: "rgba(25,135,84,.2)",
      fill: true,
      tension: 0.3,
    }],
  }), [labels, revenue]);

  const usersData = useMemo(() => ({
    labels,
    datasets: [{ label: "New Users", data: newUsers, backgroundColor: "#0dcaf0" }],
  }), [labels, newUsers]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white/90">Total Orders (12 mo)</CardTitle>
                <div className="mt-2 text-3xl font-bold">{totals.orders}</div>
              </div>
              <ShoppingCart className="h-8 w-8 opacity-90" />
            </CardHeader>
          </Card>

          <Card className="bg-emerald-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white/90">Revenue (12 mo)</CardTitle>
                <div className="mt-2 text-3xl font-bold">$ {totals.revenue}</div>
              </div>
              <DollarSign className="h-8 w-8 opacity-90" />
            </CardHeader>
          </Card>

          <Card className="bg-cyan-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white/90">New Users (12 mo)</CardTitle>
                <div className="mt-2 text-3xl font-bold">{totals.users}</div>
              </div>
              <UserPlus className="h-8 w-8 opacity-90" />
            </CardHeader>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Orders per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <Bar data={ordersData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue per Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Users per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={usersData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
