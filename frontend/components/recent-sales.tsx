import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentSalesProps {
  sales: Array<{
    id: string
    name: string
    email: string
    amount: number
    avatar?: string
  }>
}

export function RecentSales({ sales }: RecentSalesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sales.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sales data</p>
          ) : (
            sales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sale.avatar || "/placeholder.svg"} alt={sale.name} />
                    <AvatarFallback>
                      {sale.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{sale.name}</p>
                    <p className="text-xs text-muted-foreground">{sale.email}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">+${sale.amount.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
