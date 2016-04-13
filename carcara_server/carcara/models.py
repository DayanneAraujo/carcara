# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class Municipio(models.Model):
    cod_ibge = models.IntegerField(default=0,
                                   help_text=_(u"Código do município no IBGE"))
    cod_siconv = models.IntegerField(default=0,
                                     help_text=_(u"Código do município no SICONV"))
    nome = models.CharField(max_length=100,
                            help_text=_(u"Nome do município"))
    populacao = models.IntegerField(default=0,
                                    help_text=_(u"População do município"))
    idh = models.DecimalField(max_digits=3, decimal_places=3,
                              help_text=_(u"Índice de Desenvolvimento Humano do município"))
    mortalidade = models.DecimalField(max_digits=3, decimal_places=3,
                                      help_text=_(u"Mortalidade do município"))
    uf = models.CharField(max_length=2, help_text=_(u"UF do município"))
    latitude = models.DecimalField(max_digits=5, decimal_places=5,
                                   help_text=_(u"Latitude do município"))
    longitude = models.DecimalField(max_digits=5, decimal_places=5,
                                    help_text=_(u"Longitude do município"))


class Equipamento(models.Model):
    municipio = models.ForeignKey(
                                Municipio,
                                blank=False,
                                null=False,
                                help_text=_(u"Cidade onde está o equipamento"))
    descricao = models.CharField(max_length=100,
                                 help_text=_(u"Descrição do equipamento"))
    quantidade_equipamento = models.IntegerField(
                                default=0,
                                help_text=_(u"Número de equipamentos no município"))


class QualificacaoProponente(models.Model):
    qualificacao = models.CharField(max_length=50,
                                    help_text=_(u"Qualificação do proponente do convênio"))


class Proponente(models.Model):
    codigo = models.CharField(max_length=20)
    nome = models.CharField(max_length=100)
    identificacao = models.CharField(max_length=100,
                                     help_text=_(u"Identificação do proponente"))
    tipo_identificacao = models.CharField(max_length=20,
                                     help_text=_(u"Tipo de identificação do proponente"))
    nome_responsavel = models.CharField(
                            max_length=100,
                            help_text=_(u"Nome do responsável pelo proponente"))
    cargo_responsavel = models.CharField(
                            max_length=50,
                            help_text=_(u"Cargo do responsável pelo proponente"))
    cep = models.CharField(max_length=10,
                           help_text=_(u"CEP do proponente"))
    municipio = models.ForeignKey(Municipio)
    qualificacao = models.ForeignKey(QualificacaoProponente)


class Concedente(models.Model):
    nome = models.CharField(max_length=50, help_text=_(u"Nome do concedente"))
    nome_responsavel = models.CharField(
                            max_length=100,
                            help_text=_(u"Nome do responsável pelo concedente"))
    codigo_responsavel = models.CharField(
                            max_length=20,
                            help_text=_(u"Código do responsável pelo concedente"))
    cargo_responsavel = models.CharField(
                            max_length=20,
                            help_text=_(u"Nome do cargo do responsável pelo concedente"))


class SituacaoConvenio(models.Model):
    nome = models.CharField(max_length=50,
                            help_text=_(u"Situação do convênio"))


class SituacaoAplicacao(models.Model):
    nome = models.CharField(max_length=25,
                            help_text=_(u"Situação da aplicação de recursos do convênio"))


class SituacaoPublicacaoConvenio(models.Model):
    nome = models.CharField(max_length=50,
                            help_text=_(u"Situação da publicação do convênio"))


class ModalidadeConvenio(models.Model):
    nome = models.CharField(max_length=25,
                            help_text=_(u"Modalidade do convênio"))


class Convenio(models.Model):
    numero = models.IntegerField(default=0,
                                 help_text=_(u"Número do Convênio"))
    numero_processo = models.CharField(max_length=20,
                                       help_text=_(u"Situação da aplicação de recursos."))
    numero_interno = models.CharField(max_length=20,
                                       help_text=_(u"Situação da aplicação de recursos."))
    modalidade = models.ForeignKey(ModalidadeConvenio)
    concedente = models.ForeignKey(Concedente, blank=False, null=False)
    proponente = models.ForeignKey(Proponente, blank=False, null=False)
    objeto = models.TextField(max_length=1000,
                              help_text=_(u"Objeto do Convênio"))
    justificativa = models.TextField(max_length=1000,
                                     help_text=_(u"Justificativa do Convênio"))
    valor_global = models.DecimalField(max_digits=10,
                                       decimal_places=2,
                                       help_text=_(u"Valor global do convênio"))
    valor_repasse = models.DecimalField(max_digits=10,
                                        decimal_places=2,
                                        help_text=_(u"Valor repassado pelo concedente"))
    valor_contrapartida_total = models.DecimalField(
                                        max_digits=10,
                                        decimal_places=2,
                                        help_text=_(u"Valor da contrapartida do convenente"))
    valor_contrapartida_financeira = models.DecimalField(
                                        max_digits=10,
                                        decimal_places=2,
                                        help_text=_(u"Valor da contrapartida financeira do convenente"))
    valor_contrapartida_bens_servicos = models.DecimalField(
                                            max_digits=10,
                                            decimal_places=2,
                                            help_text=_(u"Valor da contrapartida em bens e serviços do convenente"))
    situacao = models.ForeignKey(SituacaoConvenio,
                                 blank=False,
                                 null=False,
                                 help_text=_(u"Status do convênio."))
    data_publicacao = models.DateField(
                                help_text=_(u"Data de publicação do convênio"))
    data_assinatura = models.DateField(
                                help_text=_(u"Data assinatura do convênio"))
    data_inicio_vigencia = models.DateField(
                                help_text=_(u"Data de início do convênio"))
    data_termino_vigencia = models.DateField(
                                help_text=_(u"Data de término do convênio"))
    situacao_publicacao = models.ForeignKey(SituacaoPublicacaoConvenio)
    assinado = models.BooleanField(default=False)
    aditivo = models.BooleanField(default=False)
    publicado = models.BooleanField(default=False)
    empenhado = models.BooleanField(default=False)
    permite_ajuste_cronograma_fisico = models.BooleanField(default=False)


class TipoDespesa(models.Model):
    nome = models.CharField(max_length=25,
                                         help_text=_(u"Tipo da despesa"))


class PlanoAplicacao(models.Model):
    convenio = models.ForeignKey(Convenio, blank=False, null=False)
    tipo_despesa = models.ForeignKey(TipoDespesa, blank=False, null=False)
    situacao = models.ForeignKey(SituacaoAplicacao,
                                           blank=False, null=False)
    municipio_aplicador = models.ForeignKey(Municipio,
                                            blank=False, null=False)
    natureza = models.CharField(max_length=100,
                                          help_text=_(u"Natureza da aplicação"))


class UnidadeSaude(models.Model):
    municipio = models.ForeignKey(Municipio)
    bairro = models.CharField(max_length=100,
                              help_text=_(u"Bairro onde localiza-se a Unidade de Saúde"))
    logradouro = models.CharField(max_length=100,
                                  help_text=_(u"Logradouro onde localiza-se a Unidade de Saúde"))
    cep = models.CharField(max_length=100,
                           help_text=_(u"CEP no qual localiza-se a Unidade de Saúde"))
