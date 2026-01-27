from rest_framework import serializers
from .models import Manifestacao

class ManifestacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manifestacao
        fields = '__all__'
        read_only_fields = ['protocolo', 'data_criacao'] # O usuário não pode editar isso

    def validate(self, data):
        """
        Validação extra: Garante que, se for anônimo, não venha nome/email,
        mesmo que o front tente enviar.
        """
        if data.get('anonimo'):
            data['nome'] = "Anônimo"
            data['email'] = ""
        return data