from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from .admin_views import admin_dashboard
from .admin_api import AdminStatsView

def health_check(request):
    return JsonResponse({'status': 'ok', 'message': 'WaveTech API is running'})

urlpatterns = [
    path('', health_check, name='health_check'),
    path('admin/', admin.site.urls),
    path('admin/dashboard/', admin_dashboard, name='admin_dashboard'),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/products/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
]