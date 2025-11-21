from datetime import datetime
from dateutil.relativedelta import relativedelta  # type: ignore
import json
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.models import User
from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from django.template.response import TemplateResponse
from django.utils import timezone
from orders.models import Order


@staff_member_required
def admin_dashboard(request):
    now = timezone.now()
    start = (now.replace(day=1) - relativedelta(months=11)).replace(hour=0, minute=0, second=0, microsecond=0)
    months = []
    cursor = start
    for _ in range(12):
        months.append(cursor)
        cursor = cursor + relativedelta(months=1)

    # Orders aggregated by month
    orders_qs = (
        Order.objects.filter(created_at__gte=start)
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .order_by("month")
        .annotate(count=Count("id"), revenue=Sum("total"))
    )
    orders_map = {o["month"].date(): {"count": o["count"], "revenue": float(o["revenue"] or 0)} for o in orders_qs}

    # Users aggregated by month
    users_qs = (
        User.objects.filter(date_joined__gte=start)
        .annotate(month=TruncMonth("date_joined"))
        .values("month")
        .order_by("month")
        .annotate(count=Count("id"))
    )
    users_map = {u["month"].date(): u["count"] for u in users_qs}

    labels = [m.strftime("%b %Y") for m in months]
    orders_counts = [orders_map.get(datetime(m.year, m.month, 1).date(), {"count": 0})["count"] for m in months]
    revenue = [orders_map.get(datetime(m.year, m.month, 1).date(), {"revenue": 0})["revenue"] for m in months]
    new_users = [users_map.get(datetime(m.year, m.month, 1).date(), 0) for m in months]

    totals = {
        "orders": sum(orders_counts),
        "revenue": round(sum(revenue), 2),
        "users": sum(new_users),
    }

    context = {
        "labels_json": json.dumps(labels),
        "orders_counts_json": json.dumps(orders_counts),
        "revenue_json": json.dumps(revenue),
        "new_users_json": json.dumps(new_users),
        "totals": totals,
    }
    return TemplateResponse(request, "admin/dashboard.html", context)
