from datetime import datetime, timedelta
from django.db.models.functions import TruncMonth
from django.db.models import Count, Sum
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from orders.models import Order


class AdminStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        # Last 12 months window
        end = datetime.now().replace(day=1)
        start = (end - timedelta(days=365)).replace(day=1)

        # Aggregate orders and revenue per month
        orders_qs = (
            Order.objects.filter(created_at__gte=start)
            .annotate(month=TruncMonth("created_at"))
            .values("month")
            .annotate(count=Count("id"), revenue=Sum("total"))
            .order_by("month")
        )

        users_qs = (
            User.objects.filter(date_joined__gte=start)
            .annotate(month=TruncMonth("date_joined"))
            .values("month")
            .annotate(count=Count("id"))
            .order_by("month")
        )

        # Build month index for last 12 months
        months = []
        cur = start
        for _ in range(12):
            months.append(cur)
            # increment month
            year = cur.year + (cur.month // 12)
            month = 1 if cur.month == 12 else cur.month + 1
            cur = cur.replace(year=year, month=month)

        # Map to dict for quick lookup
        orders_map = {row["month"].date(): {"count": row["count"], "revenue": row["revenue"] or 0} for row in orders_qs}
        users_map = {row["month"].date(): row["count"] for row in users_qs}

        labels = [m.strftime("%b %Y") for m in months]
        orders_counts = [orders_map.get(m.date(), {"count": 0})["count"] for m in months]
        revenue = [float(orders_map.get(m.date(), {"revenue": 0})["revenue"]) for m in months]
        new_users = [users_map.get(m.date(), 0) for m in months]

        data = {
            "labels": labels,
            "orders": orders_counts,
            "revenue": revenue,
            "new_users": new_users,
            "totals": {
                "total_orders": sum(orders_counts),
                "total_revenue": round(sum(revenue), 2),
                "total_users": sum(new_users),
            },
        }
        return Response(data)
