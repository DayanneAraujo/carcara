from django.db import models

# Create your models here.

class Municipio(models.Model):
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
	id_equipamento = models.AutoField(primary_key=True)
    municipio = models.ForeignKey(Municipio, blank=False, null=False, description="Cidade onde está o equipamento.")
    descricao = models.CharField(max_length=100, description="Descrição do equipamento.")
    quantidade_equipamento = models.IntegerField(default=0, description="Número de equipamentos na cidade")

class Convenente(models.Model):
	codigo = models.AutoField(primary_key=True)
	nome_responsavel_convenente = models.CharField(max_length=100)
	

class Concedente(models.Model):
    codigo = models.IntegerField(unique=True, blank=False, null=False)
    nome = models.CharField(max_length=50, description="Nome do Concedente")
    nome_responsavel = models.CharField(max_length=100, description="Nome do responsável pelo concedente")
    cargo_responsavel = models.CharField(max_length=20, description="Nome do cargo do responsável pelo concedente")

class SituacaoConvenio(models.Model):
    id_status_convenio = models.AutoField(primary_key=True)
    nome_status_convenio = models.CharField(max_length=50, description="Status do convênio")

class Convenio(models.Model):
	numero = models.IntegerField(default=0, description="Número do Convênio")
    municipio_convenente = models.ForeignKey(Municipio, blank=False, null=False)
    concedente = models.ForeignKey(Concedente, blank=False, null=False)
    objeto_convenio = models.TextField(max_length=1000, description="Objeto do Convênio")
    justificativa_convenio = models.TextField(max_length=1000, description="Justificativa do Convênio")
    valor_global = models.DecimalField(max_digits=10, decimal_places=2, description="Valor global do convênio")
    valor_repasse = models.DecimalField(max_digits=10, decimal_places=2, description="Valor repassado pelo concedente")
    valor_contrapartida_total = models.DecimalField(max_digits=10, decimal_places=2, description="Valor da contrapartida do convenente")
    valor_contrapartida_financeira = models.DecimalField(max_digits=10, decimal_places=2, description="Valor da contrapartida financeira do convenente")
    valor_contrapartida_bens_servicos = models.DecimalField(max_digits=10, decimal_places=2, description="Valor da contrapartida em bens e serviços do convenente")
    status_convenio = models.ForeignKey(StatusConvenio, blank=False, null=False, description="Status do convenio.")
    data_publicacao = models.DateField(description="Data de publicação do convênio")
    data_assinatura = models.DateField(description="Data assinatura do convênio")
    data_inicio_vigencia = models.DateField(description="Data de início do convênio")
    data_termino_vigencia = models.DateField(description="Data de término do convênio")

class TipoDespesa(models.Model):
	id_despesa = models.AutoField(primary_key=True)
	nome_tipo_despesa = models.CharField(max_length=25, description="Tipo da despesa")

class SituacaoAplicacao(models.Model):
	id_situacao_aplciacao = models.AutoField(primary_key=True)
	nome_situacao_aplicacao_despesa = models.CharField(max_legth=25, description="Situação da aplicação de recursos.")

class PlanoAplicacao(models.Model):
	convenio = models.ForeignKey(Convenio, blank=False, null=False)
	tipo_despesa = models.ForeignKey(TipoDespesa, blank=False, null=False)
	situacao_aplicacao = models.ForeignKey(SitucaoAplicacao, blank=False, null=False)
	municipio_aplicador = models.ForeignKey(Municipio, blank=False, null=False)
	natureza_aplicacao = models.CharField(max_length=100, description="Natureza da aplicação")

class UnidadeSaude(models.Model):
	municipio = models.ForeignKey(Municipio)
	bairro = models.CharField(max_legth=100, description="Bairro onde localiza-se a Unidade de Saúde")
	logradouro = models.CharField(max_length=100, description="Logradouro onde localiza-se a Unidade de Saúde")
	cep = models.CharField(max_length=100, description="CEP no qual localiza-se a Unidade de Saúde")
