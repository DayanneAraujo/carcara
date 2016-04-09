from django.db import models

# Create your models here.

class Cidade(models.Model):
    cod_ibge = models.IntegerField(default=0, description="Código do município no IBGE")
    cod_siconv = models.IntegerField(default=0, description="Código do município no SICONV")
    nome = models.CharField(max_length=100, description="Nome do município")
    populacao = models.IntegerField(default=0, "População do município")
    idh = models.DecimalField(max_digits=1, decimal_places=3, "Índice de Desenvolvimento Humano do município")
    mortalidade = models.DecimalField(max_digits=1, decimal_places=3, "Mortalidade do município")
    uf = models.CharField(max_length=2, "UF do município")
    latitude = models.DecimalField(max_digits=3, decimal_places=5, "Latitude do município")
    longitude = models.DecimalField(max_digits=3, decimal_places=5, "Longitude do município")

class Equipamento(models.Model):
    cidade = models.ForeignKey(Cidade, blank=False, null=False, description="Cidade onde está o equipamento.")
    descricao = models.CharField(max_length=100, description="Descrição do equipamento.")
    quantidade_equipamento = models.IntegerField(default=0, description="Número de equipamentos na cidade")

class Concedente(models.Model):
    cod_concedente = models.IntegerField(unique=True, blank=False, null=False)
    nome_concedente = models.CharField(max_length=50)

class StatusConvenio(models.Model):
    id_status_convenio = models.AutoField(primary_key=True)
    nome_status_convenio = models.CharField(max_length=50)

class Convenio(models.Model):
    municipio_convenente = models.ForeignKey(Cidade, blank=False, null=False)
    concedente = models.ForeignKey(Concedente, blank=False, null=False)
    objeto_convenio = models.TextField(max_length=1000, description="Objeto do Convênio")
    valor_total = models.DecimalField(max_digits=10, decimal_places=2, description="Valor total do convênio")
    valor_repassado = models.DecimalField(max_digits=10, decimal_places=2, description="Valor repassado pelo concedente")
    valor_contrapartida = models.DecimalField(max_digits=10, decimal_places=2, description="Valor da contrapartida do convenente")
    status_convenio = models.ForeignKey(StatusConvenio, blank=False, null=False)

#class PlanoAplicacao(models.Model):
