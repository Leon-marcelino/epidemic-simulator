# Brainstorm de Design: Simulador de Propagação Epidêmica Profissional

## Resposta 1: Minimalismo Científico Moderno
**Probabilidade: 0.08**

**Design Movement:** Bauhaus + Data Visualization Modernism

**Core Principles:**
- Clareza absoluta através da redução visual
- Hierarquia tipográfica forte para guiar leitura de dados
- Espaçamento generoso para respirabilidade
- Foco total no conteúdo (dados e gráficos)

**Color Philosophy:**
- Paleta: Azul-escuro (#1e3a5f), cinza neutro (#f5f7fa), branco puro
- Azul representa confiança científica; cinza oferece neutralidade profissional
- Acentos em laranja suave (#ff9500) para alertas/picos críticos
- Intenção: Transmitir precisão, confiabilidade e profissionalismo médico

**Layout Paradigm:**
- Sidebar esquerda com inputs (painel de controle)
- Área central dominante para gráficos (70% do espaço)
- Resumo executivo em cards horizontais acima dos gráficos
- Grid assimétrico: 1/3 inputs, 2/3 visualização

**Signature Elements:**
- Linhas finas horizontais separando seções (dividers minimalistas)
- Cards com sombra muito suave (1px blur, 5% opacity)
- Números grandes e bold para métricas críticas
- Ícones de linha (Lucide) em azul escuro

**Interaction Philosophy:**
- Sliders com feedback visual imediato
- Transições suaves (300ms) ao atualizar gráficos
- Hover states sutis (mudança de cor de fundo)
- Tooltips informativos ao passar sobre parâmetros

**Animation:**
- Gráficos animam entrada com fade-in suave (500ms)
- Linhas de capacidade hospitalar pulsam levemente quando ultrapassadas
- Números em cards animam contagem (tween) ao mudar valores

**Typography System:**
- Display: Poppins Bold 32px para títulos principais
- Heading: Poppins SemiBold 18px para seções
- Body: Inter Regular 14px para labels e descrições
- Data: IBM Plex Mono 12px para números em cards (monospace para precisão)

---

## Resposta 2: Dashboard Corporativo Elegante
**Probabilidade: 0.07**

**Design Movement:** Contemporary Corporate Design + Glassmorphism

**Core Principles:**
- Sofisticação através de profundidade visual
- Camadas de informação com efeito glass (transparência + blur)
- Gradientes sutis para movimento visual
- Elegância corporativa com toque moderno

**Color Philosophy:**
- Paleta: Azul profundo (#0f3460), cinza escuro (#2a3f5f), branco com transparência
- Gradiente sutil de azul para roxo (#0f3460 → #3d2645) no fundo
- Acentos em ciano (#00d4ff) para dados positivos, vermelho (#ff4757) para alertas
- Intenção: Transmitir sofisticação, confiança e inovação

**Layout Paradigm:**
- Header com logo e status de simulação
- Sidebar esquerda com abas (Parâmetros, Histórico, Ajuda)
- Área central com grid responsivo de cards
- Cards flutuantes com efeito glass (backdrop-filter: blur)
- Rodapé com legenda de cores

**Signature Elements:**
- Cards com borda sutil em ciano
- Efeito glass (glassmorphism) em overlays
- Gradientes lineares nos backgrounds dos cards
- Ícones com preenchimento (não apenas linhas)

**Interaction Philosophy:**
- Cliques em cards expandem detalhes
- Sliders com track colorida (gradiente)
- Hover states com elevação (sombra aumenta)
- Animações de entrada em cascata

**Animation:**
- Cards entram com fade + scale (300ms)
- Gráficos animam com easing cubic-bezier
- Hover em cards: sombra aumenta, blur intensifica
- Números contam com easing ease-out

**Typography System:**
- Display: Montserrat Bold 36px para títulos
- Heading: Montserrat SemiBold 20px para seções
- Body: Roboto Regular 15px para conteúdo
- Data: IBM Plex Mono 13px para métricas

---

## Resposta 3: Visualização Científica Imersiva
**Probabilidade: 0.06**

**Design Movement:** Scientific Data Visualization + Organic Modernism

**Core Principles:**
- Imersão através de visualizações dominantes
- Paleta de cores que reflete fenômenos biológicos
- Movimento e animação como narrativa
- Integração harmônica entre dados e design

**Color Philosophy:**
- Paleta: Verde-azulado (#0d7377), tons de verde (#14a085), vermelho biológico (#d62828)
- Verde representa população saudável, vermelho representa infecção
- Fundo escuro (#0f0f0f) para contraste máximo
- Gradientes orgânicos (não lineares) entre cores
- Intenção: Refletir realidade biológica, criar urgência visual

**Layout Paradigm:**
- Gráfico principal ocupa 60% da tela (hero section)
- Painel flutuante com inputs (translúcido) sobreposto ao gráfico
- Cards de resumo em rodapé com efeito de "flutuação"
- Sidebar colapsável para maximizar espaço do gráfico

**Signature Elements:**
- Linhas de curva SEIR com espessura variável
- Partículas animadas no background (representando propagação)
- Gradientes radiais nos cards
- Efeito de "pulso" nas métricas críticas

**Interaction Philosophy:**
- Arrastar sliders atualiza gráfico em tempo real com animação suave
- Hover sobre pontos do gráfico mostra tooltip com data/valor
- Clique em legendas ativa/desativa curvas
- Modo "play" para simular ao longo do tempo

**Animation:**
- Partículas fluem continuamente no background
- Curvas desenham-se ao carregar (stroke animation)
- Valores contam com easing elastic
- Pulsação em métricas críticas (scale + opacity)

**Typography System:**
- Display: Space Mono Bold 40px para títulos (monospace científico)
- Heading: Poppins SemiBold 18px para seções
- Body: Inter Regular 14px para descrições
- Data: IBM Plex Mono 14px para números (destaque)

---

## Design Escolhido: **Minimalismo Científico Moderno**

Optei pelo **Minimalismo Científico Moderno** porque:

1. **Clareza Profissional**: Gestores de saúde precisam entender dados rapidamente sem distrações visuais
2. **Foco em Dados**: O gráfico SEIR é o protagonista, não competindo com efeitos visuais
3. **Acessibilidade**: Paleta simples garante legibilidade e contraste adequado
4. **Confiabilidade**: Estética minimalista transmite precisão científica
5. **Escalabilidade**: Fácil de estender com novos parâmetros sem poluição visual

**Decisões de Design Aplicadas:**
- Sidebar esquerda (1/3) com inputs em cards brancos
- Área central (2/3) dominada por gráfico Recharts
- Cards de resumo (Pico, Data do Pico, Óbitos) acima do gráfico
- Paleta: Azul escuro (#1e3a5f), cinza (#f5f7fa), laranja para alertas (#ff9500)
- Tipografia: Poppins para títulos, Inter para corpo, IBM Plex Mono para dados
- Animações suaves (300-500ms) em transições
