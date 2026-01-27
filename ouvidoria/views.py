from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Manifestacao
from .serializers import ManifestacaoSerializer
from .services import analisar_manifestacao_iza # <--- Importe o serviço

class ManifestacaoViewSet(viewsets.ModelViewSet):
    queryset = Manifestacao.objects.all().order_by('-data_criacao')
    serializer_class = ManifestacaoSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        # Salva primeiro para gerar os arquivos no disco
        instancia = serializer.save()
        
        # Chama a "IA" para classificar o relato recém-criado
        classificacao = analisar_manifestacao_iza(
            texto=instancia.descricao,
            audio_path=instancia.audio.path if instancia.audio else None
        )
        
        # Atualiza a instância com a "inteligência" da IZA
        instancia.classificacao_ia = classificacao
        instancia.save()