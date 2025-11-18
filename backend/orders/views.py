from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from cart.models import CartItem
from .models import Order

class OrderViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def create_order(self, request):
        items = CartItem.objects.filter(user=request.user)
        if not items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        total = sum(item.quantity * item.product_price for item in items)
        order = Order.objects.create(user=request.user, total=total)
        items.delete()  # empty cart
        return Response({"message": "Order placed!", "order_id": order.id, "total": str(total)})

    def list(self, request):
        orders = Order.objects.filter(user=request.user)
        data = [{"id": o.id, "total": str(o.total), "date": o.created_at.strftime("%Y-%m-%d %H:%M")} for o in orders]
        return Response(data)