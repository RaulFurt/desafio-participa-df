from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ManifestacaoViewSet

router = DefaultRouter()
router.register(r'manifestacoes', ManifestacaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]