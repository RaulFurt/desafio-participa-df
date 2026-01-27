from django.db import models
import uuid

class Manifestacao(models.Model):
    protocolo = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    descricao = models.TextField(verbose_name="Relato do Cidadão")
    tipo = models.CharField(max_length=50, choices=[
        ('denuncia', 'Denúncia'),
        ('sugestao', 'Sugestão'),
        ('elogio', 'Elogio'),
        ('reclamacao', 'Reclamação')
    ])
    
    anonimo = models.BooleanField(default=False)
    nome = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    # Arquivos Multimídia (Conforme Edital)
    audio = models.FileField(upload_to='audios/', blank=True, null=True)
    imagem = models.ImageField(upload_to='imagens/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)  # <--- NOVO CAMPO

    data_criacao = models.DateTimeField(auto_now_add=True)
    
    # Campo para simular retorno da IZA (Classificação automática)
    classificacao_ia = models.CharField(max_length=100, blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.anonimo:
            self.nome = None
            self.email = None
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.protocolo)