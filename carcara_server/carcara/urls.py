from django.conf.urls import url, include
from models import Municipio
from models import Convenio
from models import Proponente
from models import QualificacaoProponente
from models import Concedente
from models import Equipamento
from models import SituacaoConvenio
from models import SituacaoPublicacaoConvenio
from models import SituacaoAplicacao
from models import ModalidadeConvenio
from models import PlanoAplicacao
from models import TipoDespesa
from models import UnidadeSaude
from rest_framework import routers, serializers, viewsets


# Serializers define the API representation.
class MunicipioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Municipio
        fields = ('cod_ibge', 'cod_siconv', 'nome',
                  'populacao', 'idh', 'mortalidade',
                  'uf', 'latitude', 'longitude')


class ConvenioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Convenio
        fields = ('numero', 'numero_processo', 'numero_interno',
                  'modalidade', 'concedente', 'proponente',
                  'objeto', 'justificativa', 'valor_global',
                  'valor_repasse', 'valor_contrapartida_total',
                  'valor_contrapartida_financeira',
                  'valor_contrapartida_bens_servicos', 'situacao',
                  'data_publicacao', 'data_assinatura',
                  'data_inicio_vigencia', 'data_termino_vigencia',
                  'situacao_publicacao', 'assinado', 'aditivo',
                  'publicado', 'empenhado', 'permite_ajuste_cronograma_fisico')


class SituacaoConvenioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SituacaoConvenio
        fields = ('nome')


class SituacaoPublicacaoConvenioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SituacaoPublicacaoConvenio
        fields = ('nome')


class SituacaoAplicacaoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SituacaoAplicacao
        fields = ('nome')


class ModalidadeConvenioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ModalidadeConvenio
        fields = ('nome')


class TipoDespesaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TipoDespesa
        fields = ('nome')


class ProponenteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proponente
        fields = ('codigo', 'nome', 'identificacao', 'tipo_identificacao',
                  'nome_responsavel', 'cargo_responsavel', 'cep',
                  'municipio', 'qualificacao')


class QualificacaoProponenteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = QualificacaoProponente
        fields = ('qualificacao')


class ConcedenteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Concedente
        fields = ('nome', 'nome_responsavel', 'codigo_responsavel',
                  'cargo_responsavel')


class EquipamentoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Equipamento
        fields = ('municipio', 'descricao', 'quantidade_equipamento')


class PlanoAplicacaoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PlanoAplicacao
        fields = ('convenio', 'tipo_despesa', 'situacao',
                  'municipio_aplicador', 'natureza')


class UnidadeSaudeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UnidadeSaude
        fields = ('municipio', 'bairro', 'logradouro',
                  'cep')


# ViewSets define the view behavior.
class MunicipioViewSet(viewsets.ModelViewSet):
    queryset = Municipio.objects.all()
    serializer_class = MunicipioSerializer


class ConvenioViewSet(viewsets.ModelViewSet):
    queryset = Convenio.objects.all()
    serializer_class = ConvenioSerializer


class SituacaoConvenioViewSet(viewsets.ModelViewSet):
    queryset = SituacaoConvenio.objects.all()
    serializer_class = SituacaoConvenioSerializer


class SituacaoPublicacaoConvenioViewSet(viewsets.ModelViewSet):
    queryset = SituacaoPublicacaoConvenio.objects.all()
    serializer_class = SituacaoPublicacaoConvenioSerializer


class SituacaoAplicacaoViewSet(viewsets.ModelViewSet):
    queryset = SituacaoAplicacao.objects.all()
    serializer_class = SituacaoAplicacaoSerializer


class ModalidadeConvenioViewSet(viewsets.ModelViewSet):
    queryset = ModalidadeConvenio.objects.all()
    serializer_class = ModalidadeConvenioSerializer


class TipoDespesaViewSet(viewsets.ModelViewSet):
    queryset = TipoDespesa.objects.all()
    serializer_class = TipoDespesaSerializer


class ProponenteViewSet(viewsets.ModelViewSet):
    queryset = Proponente.objects.all()
    serializer_class = ProponenteSerializer


class QualificacaoProponenteViewSet(viewsets.ModelViewSet):
    queryset = QualificacaoProponente.objects.all()
    serializer_class = QualificacaoProponenteSerializer


class ConcedenteViewSet(viewsets.ModelViewSet):
    queryset = Concedente.objects.all()
    serializer_class = ConcedenteSerializer


class EquipamentoViewSet(viewsets.ModelViewSet):
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoSerializer


class PlanoAplicacaoViewSet(viewsets.ModelViewSet):
    queryset = PlanoAplicacao.objects.all()
    serializer_class = PlanoAplicacaoSerializer


class UnidadeSaudeViewSet(viewsets.ModelViewSet):
    queryset = UnidadeSaude.objects.all()
    serializer_class = UnidadeSaudeSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'municipios/list', MunicipioViewSet)
router.register(r'convenios/list', ConvenioViewSet)
router.register(r'despesas/list', PlanoAplicacaoViewSet)
router.register(r'unidades_saude/list', UnidadeSaudeViewSet)
router.register(r'concedentes/list', ConcedenteViewSet)
router.register(r'proponentes/list', ProponenteViewSet)
router.register(r'equipamentos/list', EquipamentoViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
