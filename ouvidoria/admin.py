from django.contrib import admin
from .models import Manifestacao

@admin.register(Manifestacao)
class ManifestacaoAdmin(admin.ModelAdmin):
    list_display = ('protocolo', 'tipo', 'data_criacao', 'anonimo')
    list_filter = ('tipo', 'anonimo')
    readonly_fields = ('protocolo', 'data_criacao')