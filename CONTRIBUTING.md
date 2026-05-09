# Guia de Contribuição

Obrigado por considerar contribuir para o **Simulador de Propagação Epidêmica Profissional**! Este documento fornece diretrizes e instruções para contribuir.

## Como Contribuir

### Reportando Bugs

Antes de criar um relatório de bug, verifique se o problema já foi reportado. Se você encontrar um bug:

1. **Use um título descritivo** para o issue
2. **Descreva os passos exatos** para reproduzir o problema
3. **Forneça exemplos específicos** para demonstrar os passos
4. **Descreva o comportamento observado** e o que você esperava
5. **Inclua screenshots** se relevante
6. **Mencione sua versão** do navegador e sistema operacional

### Sugerindo Melhorias

Sugestões de melhorias são bem-vindas! Para sugerir uma melhoria:

1. **Use um título descritivo**
2. **Forneça uma descrição detalhada** da melhoria sugerida
3. **Liste alguns exemplos** de como a melhoria seria útil
4. **Mencione outros projetos** que implementam funcionalidades similares

### Pull Requests

- Siga os estilos de código do projeto (TypeScript, React, Tailwind CSS)
- Inclua screenshots/GIFs para mudanças visuais
- Documente novo comportamento em comments
- Termine todos os arquivos com uma newline
- Evite dependências de plataforma específica

## Processo de Desenvolvimento

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calculadora-epidemica.git
cd calculadora-epidemica

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

### Estrutura de Branches

- `main` - Branch de produção (estável)
- `develop` - Branch de desenvolvimento (integração)
- `feature/nome-da-feature` - Novas funcionalidades
- `fix/nome-do-bug` - Correções de bugs
- `docs/nome-da-doc` - Documentação

### Processo de Commit

Use mensagens de commit descritivas:

```
feat: adicionar novo parâmetro de vacinação
fix: corrigir cálculo de R efetivo
docs: atualizar README com exemplos
style: formatar código com prettier
refactor: reorganizar estrutura de componentes
test: adicionar testes para simulação SEIR
```

### Padrões de Código

#### TypeScript
- Use tipos explícitos
- Evite `any`
- Documente funções complexas

#### React
- Componentes funcionais com hooks
- Props tipadas com interfaces
- Evite lógica complexa em render

#### Tailwind CSS
- Use classes utilitárias
- Evite CSS customizado quando possível
- Mantenha consistência com design tokens

### Testes

Antes de submeter um PR:

```bash
# Verificar tipos
pnpm check

# Build de produção
pnpm build

# Formatar código
pnpm format
```

## Diretrizes de Estilo

### Nomenclatura

- **Componentes**: PascalCase (e.g., `ParameterPanel.tsx`)
- **Funções/Variáveis**: camelCase (e.g., `simulateEpidemic()`)
- **Constantes**: UPPER_SNAKE_CASE (e.g., `DEFAULT_PARAMETERS`)
- **Interfaces/Types**: PascalCase (e.g., `SEIRParameters`)

### Comentários

```typescript
/**
 * Calcula a taxa de transmissão efetiva
 * @param r0 - Taxa de transmissão básica
 * @param isolationRate - Taxa de isolamento (0-1)
 * @returns Taxa de transmissão efetiva
 */
function calculateEffectiveR(r0: number, isolationRate: number): number {
  // Implementação
}
```

### Formatação

- Indentação: 2 espaços
- Linha máxima: 100 caracteres
- Usar prettier para formatação automática

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a Licença MIT do projeto.

## Código de Conduta

### Nossa Promessa

No interesse de promover um ambiente aberto e acolhedor, nós, como contribuidores e mantenedores, nos comprometemos a tornar a participação em nosso projeto e nossa comunidade uma experiência livre de assédio para todos.

### Nossos Padrões

Exemplos de comportamento que contribuem para criar um ambiente positivo incluem:

- Usar linguagem acolhedora e inclusiva
- Ser respeitoso com pontos de vista e experiências divergentes
- Aceitar crítica construtiva graciosamente
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

### Aplicação

Instâncias de comportamento abusivo, de assédio ou inaceitável podem ser reportadas entrando em contato com a equipe do projeto. Todas as reclamações serão revisadas e investigadas.

## Perguntas?

Sinta-se livre para abrir uma issue com a tag `question` ou entrar em contato com os mantenedores do projeto.

---

Obrigado por contribuir! 🎉
