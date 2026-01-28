from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Manifestacao

class ManifestacaoTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/manifestacoes/'

    def test_criar_manifestacao_anonima(self):
        """Teste: Deve criar uma manifestação anônima com sucesso"""
        data = {
            'descricao': 'Buraco na rua principal',
            'tipo': 'reclamacao',
            'anonimo': 'true'
        }
        response = self.client.post(self.url, data, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Manifestacao.objects.filter(descricao='Buraco na rua principal').exists())
        
        # Verifica se o protocolo foi gerado
        self.assertIn('protocolo', response.data)

    def test_ia_classificacao(self):
        """Teste: Verifica se a 'IA' preencheu a classificação"""
        data = {'descricao': 'Teste IA', 'tipo': 'elogio', 'anonimo': 'true'}
        self.client.post(self.url, data, format='multipart')
        
        obj = Manifestacao.objects.last()
        self.assertIsNotNone(obj.classificacao_ia) 