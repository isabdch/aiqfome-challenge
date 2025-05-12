# Aiqfome Challenge

Este projeto é uma implementação do desafio técnico Aiqfome, utilizando tecnologias Next.js com Typescript e Tailwind.

## Como Executar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/isabdch/aiqfome-challenge.git
cd aiqfome-challenge
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Estrutura de Arquivos

O projeto segue uma arquitetura modular e escalável:

```
src/
├── app/             # Rotas e páginas da aplicação
├── components/      # Componentes reutilizáveis
├── contexts/        # Contextos React para gerenciamento de estado
├── data/            # JSONs modulares que simulam uma API
├── hooks/           # Hooks personalizados
├── lib/             # Bibliotecas e utilidades
├── styles/          # Estilos globais
├── types/           # Definições de tipos TypeScript
└── utils/           # Funções utilitárias
```

## Modularidade dos Dados

Os dados foram separados em múltiplos arquivos JSON para:

- **Escalabilidade**: Facilita a adição de novos dados sem afetar a estrutura existente
- **Manutenção**: Permite atualizações isoladas em partes específicas dos dados
- **Simulação de Backend**: Estrutura similar a endpoints de API, facilitando a integração futura com um backend real
- **Performance**: Carregamento seletivo de dados conforme necessário, reduzindo o tempo de carregamento inicial

## Arquitetura de Componentes e Design System

A aplicação foi desenvolvida utilizando uma abordagem granular de componentes:

- **Componentes Genéricos**: Base para a criação de um design system consistente (botões, inputs, etc.)
- **Componentização Atômica**: Componentes pequenos e específicos que podem ser combinados para criar interfaces mais complexas
- **Variáveis Tailwind Personalizadas**: Configuração de tokens de design (cores, espaçamentos, tipografia) no arquivo de configuração do Tailwind para garantir consistência visual
- **Interface Declarativa**: Componentes de UI com props tipadas e valores padrão para facilitar o uso e manutenção
- **Separação por Domínio**: Organização de componentes por domínio de negócio (/restaurant, /dish, /ticket, etc.)

## Separação da Lógica de Negócio com Hooks

Para manter os componentes limpos e focados na apresentação, a lógica de negócio foi separada em hooks personalizados:

- **Hooks Específicos**: Encapsulam a lógica complexa em funções reutilizáveis
- **Separação de Responsabilidades**: Componentes se preocupam apenas com o rendering, enquanto hooks gerenciam estado e lógica
- **Testabilidade**: Facilita a criação de testes unitários ao isolar lógica de negócio da UI
- **Reutilização**: Permite usar a mesma lógica em diferentes componentes
- **Gerenciamento de Estado**: Simplifica a manipulação de estado e efeitos colaterais

## Otimizações de Performance

1. **Lazy Loading de Imagens**: Implementado para carregar imagens apenas quando necessário
2. **Design Responsivo**: Layout adaptável a diferentes tamanhos de tela usando Tailwind com foco em mobile-first
3. **Next.js App Router**: Roteamento otimizado com carregamento sob demanda
4. **Turbopack**: Compilação mais rápida para desenvolvimento eficiente 
5. **Minificação e Code-splitting**: Automaticamente implementados pelo Next.js

---

Made with 💜 by Isabelle Brandão 👋 [See my LinkedIn](https://www.linkedin.com/in/isabdch/)