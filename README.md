# Simulador de Propagação Epidêmica Profissional

Uma aplicação web interativa para modelagem de espalhamento de doenças infecciosas usando o modelo epidemiológico **SEIR** (Suscetíveis-Expostos-Infetados-Recuperados).
# Link do artigo e site
https://leon-marcelino.github.io/epidemic-simulator/
https://epidemsim-6htmshml.manus.space
# Ia utilizada e prompt
Ia: Manus

prompt:Crie uma aplicação web completa chamada "Simulador de Propagação

Epidêmica Profissional".

O objetivo é replicar a lógica da Calculadora Epidêmica do IRRD,

permitindo que gestores de saúde modelem o espalhamento de doenças.

**Funcionalidades Principais:**
Motor de Simulação SEIR: Implemente o modelo matemático
Suscetíveis-Expostos-Infetados-Recuperados.

Painel de Parâmetros (Input):
População total, R0 inicial (Taxa de Transmissão), Período de
Incubação (dias), Duração da Infecciosidade.

Parâmetros de intervenção: Taxa de isolamento social e data de
início das restrições.

Capacidade Hospitalar: Número de leitos de enfermaria e UTI
disponíveis.

Visualização (Output):
Gráfico interativo (estilo Chart.js ou Recharts) mostrando as
curvas de S, E, I, R ao longo do tempo.

Linha horizontal de "Capacidade de Saúde" para visualizar o
colapso do sistema.

Quadro de resumo com "Pico de Infeção Estimado", "Data do Pico" e
"Total de Óbitos Estimados".

**Estilo Visual:**
Interface limpa, profissional, utilizando tons de azul escuro e
cinza.

Layout responsivo com barra lateral para inputs e área central para
os gráficos. Use componentes modernos (como Tailwind CSS e Lucide Icons).

**Tecnologia:**
Frontend em React.
Cálculos processados no cliente para interatividade em tempo real ao
mover os sliders

## 🎯 Objetivo

Permitir que gestores de saúde, epidemiologistas e pesquisadores modelem o comportamento de epidemias sob diferentes cenários de intervenção, capacidade hospitalar e características da doença.

## ✨ Funcionalidades Principais

### Motor de Simulação SEIR
- Implementação completa do modelo matemático SEIR
- Cálculo de R efetivo considerando intervenções
- Simulação em tempo real com feedback visual imediato
- Suporte a 365+ dias de projeção

### Painel de Parâmetros Interativo
- **População**: Total de pessoas e infectados iniciais
- **Epidemiologia**: R₀, período de incubação, duração da infecciosidade, taxa de mortalidade
- **Intervenções**: Taxa de isolamento social e data de início das restrições
- **Capacidade Hospitalar**: Leitos de enfermaria e UTI disponíveis
- **Simulação**: Duração total da projeção

### Visualizações Avançadas
- **Gráfico SEIR**: Curvas interativas mostrando evolução de S, E, I, R ao longo do tempo
- **Linhas de Referência**: Capacidade hospitalar marcada no gráfico
- **Alertas Visuais**: Indicadores de colapso do sistema de saúde

### Métricas de Resumo
- Pico de infecção estimado
- Data do pico de infecção
- Total de óbitos estimados
- Taxa de ataque (% da população afetada)
- Total de recuperados
- Pico de hospitalizados
- Pico em UTI
- Status de capacidade do sistema

## 🏗️ Arquitetura

```
epidemic-simulator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ParameterPanel.tsx      # Painel de entrada de parâmetros
│   │   │   ├── SEIRChart.tsx           # Gráfico interativo
│   │   │   └── SummaryMetrics.tsx      # Cards de métricas
│   │   ├── lib/
│   │   │   └── seir-simulator.ts       # Motor de simulação SEIR
│   │   ├── pages/
│   │   │   └── Home.tsx                # Página principal
│   │   ├── App.tsx                     # Roteamento
│   │   ├── main.tsx                    # Entry point
│   │   └── index.css                   # Estilos globais
│   ├── index.html                      # Template HTML
│   └── public/                         # Arquivos estáticos
├── server/
│   └── index.ts                        # Servidor Express (produção)
├── package.json                        # Dependências
└── README.md                           # Este arquivo
```

## 🎨 Design

**Filosofia**: Minimalismo Científico com foco em clareza e profissionalismo

- **Paleta de Cores**: Azul-escuro (#1e3a5f), cinza neutro (#f5f7fa), laranja para alertas (#ff9500)
- **Tipografia**: Poppins (títulos), Inter (corpo), IBM Plex Mono (dados)
- **Layout**: Sidebar esquerda (1/3) para inputs, área central (2/3) para visualizações
- **Responsividade**: Totalmente adaptável para desktop, tablet e mobile

## 🚀 Como Usar

### Instalação Local

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/calculadora-epidemica.git
cd calculadora-epidemica

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse `http://localhost:3000` no navegador.

### Usando a Aplicação

1. **Ajuste os Parâmetros** no painel esquerdo usando os sliders
2. **Visualize os Resultados** em tempo real no gráfico central
3. **Analise as Métricas** nos cards de resumo
4. **Interprete os Alertas** se a capacidade hospitalar for excedida

### Exemplos de Cenários

#### Cenário 1: Sem Intervenção
- R₀: 2.5
- Isolamento: 0%
- Resultado: Pico alto, sistema de saúde sobrecarregado

#### Cenário 2: Com Isolamento Precoce
- R₀: 2.5
- Isolamento: 50%
- Início: Dia 10
- Resultado: Pico reduzido, curva achatada

#### Cenário 3: Isolamento Tardio
- R₀: 2.5
- Isolamento: 50%
- Início: Dia 60
- Resultado: Pico menor que sem intervenção, mas ainda significativo

## 📊 Modelo SEIR

O modelo SEIR divide a população em 4 compartimentos:

- **S (Suscetíveis)**: Pessoas que podem ser infectadas
- **E (Expostos)**: Pessoas infectadas mas não infecciosas (período de incubação)
- **I (Infectados)**: Pessoas infecciosas que podem transmitir a doença
- **R (Recuperados)**: Pessoas imunizadas ou falecidas

### Equações Diferenciais

```
dS/dt = -β * S * I / N
dE/dt = β * S * I / N - σ * E
dI/dt = σ * E - γ * I
dR/dt = γ * I
```

Onde:
- **β**: Taxa de transmissão (β = R₀ / período infeccioso)
- **σ**: Taxa de progressão E→I (σ = 1 / período incubação)
- **γ**: Taxa de recuperação (γ = 1 / período infeccioso)
- **N**: População total

## ⚙️ Tecnologia

- **Frontend**: React 19 + TypeScript
- **Visualização**: Recharts
- **Estilo**: Tailwind CSS 4 + shadcn/ui
- **Ícones**: Lucide React
- **Build**: Vite
- **Servidor**: Express (produção)

## 📋 Dependências Principais

```json
{
  "react": "^19.2.1",
  "recharts": "^2.15.2",
  "tailwindcss": "^4.1.14",
  "lucide-react": "^0.453.0",
  "shadcn/ui": "^1.0.0"
}
```

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview

# Verificar tipos TypeScript
pnpm check

# Formatar código
pnpm format
```

### Estrutura de Componentes

- **ParameterPanel**: Componente de entrada com sliders
- **SEIRChart**: Gráfico Recharts com múltiplas linhas
- **SummaryMetrics**: Grid de cards com métricas principais
- **Home**: Página principal que orquestra tudo

### Estender o Projeto

Para adicionar novos parâmetros:

1. Adicione ao tipo `SEIRParameters` em `seir-simulator.ts`
2. Crie um novo slider em `ParameterPanel.tsx`
3. Use o novo parâmetro na função `simulateEpidemic()`

## ⚠️ Limitações e Avisos

Esta simulação é uma **aproximação matemática** baseada no modelo SEIR. Resultados reais dependem de múltiplos fatores não capturados:

- Comportamento humano e aderência a medidas
- Variações geográficas e demográficas
- Capacidade de teste e diagnóstico
- Efetividade de vacinas e tratamentos
- Mutações virais e novas variantes
- Fatores sociais, econômicos e políticos

**Use este simulador apenas para:**
- Fins educacionais
- Planejamento preliminar
- Compreensão de dinâmicas epidemiológicas

**Não use para:**
- Tomada de decisões críticas sem validação de especialistas
- Previsões precisas de cenários reais
- Substituição de análises epidemiológicas profissionais

## 📚 Referências

- Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics
- Anderson, R. M., & May, R. M. (1991). Infectious Diseases of Humans
- Keeling, M. J., & Rohani, P. (2008). Modeling Infectious Diseases

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

Desenvolvido como ferramenta educacional para gestores de saúde e pesquisadores em epidemiologia.

## 📧 Suporte

Para dúvidas, sugestões ou relatórios de bugs, abra uma issue no repositório GitHub.

---

**Última atualização**: Maio 2026

**Versão**: 1.0.0
