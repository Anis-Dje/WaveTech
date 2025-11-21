from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
from orders.models import Order
from django.contrib.auth import get_user_model

User = get_user_model()


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Calculate date ranges
        now = timezone.now()
        last_month = now - timedelta(days=30)
        last_year = now - timedelta(days=365)

        # Total revenue
        total_revenue = Order.objects.aggregate(
            total=Sum('total')
        )['total'] or 0

        last_month_revenue = Order.objects.filter(
            created_at__gte=last_month
        ).aggregate(total=Sum('total'))['total'] or 0

        prev_month_revenue = Order.objects.filter(
            created_at__gte=now - timedelta(days=60),
            created_at__lt=last_month
        ).aggregate(total=Sum('total'))['total'] or 1

        revenue_change = ((last_month_revenue - prev_month_revenue) / prev_month_revenue * 100) if prev_month_revenue > 0 else 0

        # Subscriptions (total users)
        total_users = User.objects.count()
        last_month_users = User.objects.filter(date_joined__gte=last_month).count()
        prev_month_users = User.objects.filter(
            date_joined__gte=now - timedelta(days=60),
            date_joined__lt=last_month
        ).count() or 1
        
        subscriptions_change = ((last_month_users - prev_month_users) / prev_month_users * 100) if prev_month_users > 0 else 0

        # Sales
        total_sales = Order.objects.count()
        last_month_sales = Order.objects.filter(created_at__gte=last_month).count()
        prev_month_sales = Order.objects.filter(
            created_at__gte=now - timedelta(days=60),
            created_at__lt=last_month
        ).count() or 1
        
        sales_change = ((last_month_sales - prev_month_sales) / prev_month_sales * 100) if prev_month_sales > 0 else 0

        # Active now (orders in last 24 hours)
        active_now = Order.objects.filter(
            created_at__gte=now - timedelta(hours=24)
        ).count()

        # Chart data - last 12 months
        chart_data = []
        for i in range(11, -1, -1):
            month_start = now - timedelta(days=30 * i)
            month_end = now - timedelta(days=30 * (i - 1)) if i > 0 else now
            
            month_revenue = Order.objects.filter(
                created_at__gte=month_start,
                created_at__lt=month_end
            ).aggregate(total=Sum('total'))['total'] or 0
            
            chart_data.append({
                'month': month_start.strftime('%b'),
                'revenue': float(month_revenue)
            })

        # Recent sales
        recent_orders = Order.objects.select_related('user').order_by('-created_at')[:5]
        recent_sales = []
        for order in recent_orders:
            recent_sales.append({
                'id': str(order.id),
                'name': order.user.email.split('@')[0].title() if order.user else 'Guest',
                'email': order.user.email if order.user else 'guest@example.com',
                'amount': float(order.total),
                'avatar': None
            })

        return Response({
            'totalRevenue': float(total_revenue),
            'revenueChange': round(revenue_change, 1),
            'subscriptions': total_users,
            'subscriptionsChange': round(subscriptions_change, 1),
            'sales': total_sales,
            'salesChange': round(sales_change, 1),
            'activeNow': active_now,
            'activeNowChange': active_now,
            'chartData': chart_data,
            'recentSales': recent_sales
        })
