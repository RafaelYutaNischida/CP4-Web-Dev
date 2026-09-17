# CineDiário

MVP inspirado no TV Time (encerrado em julho de 2026) — um diário pessoal
de filmes e séries.

## Integrantes

- [Nome 1]
- [Nome 2]

## Problema

Sem o TV Time, não há uma forma simples de registrar o que já foi assistido,
guardar opiniões sobre cada título, saber onde assisti-lo e acompanhar
estatísticas pessoais de consumo.

## Solução

Plataforma web em React onde o usuário pode:
- buscar filmes e séries;
- marcar títulos como assistidos;
- avaliar (nota de 1 a 5 + comentário) o que assistiu;
- ver em quais serviços de streaming um título está disponível no Brasil;
- acompanhar estatísticas pessoais (total assistido, nota média, filmes x séries).

## Tecnologias

- React + Vite
- React Router
- lucide-react (ícones)
- CSS puro (sem framework de UI)
- localStorage (persistência local dos dados do usuário)

## API usada

[TMDB — The Movie Database](https://developer.themoviedb.org/docs/getting-started)
(busca, detalhes de filme/série e watch providers).

## Funcionalidades

- Busca de filmes e séries
- Página de detalhes com sinopse, gêneros e onde assistir
- Marcar/remover título como assistido
- Avaliação com nota e comentário
- Diário pessoal (lista de assistidos)
- Página de perfil com estatísticas

## Uso de IA

O Claude foi utilizado como apoio no processo de Spec Driven Development:
ajudou a estruturar o `requirements.md` e o `architecture.md` a partir do
enunciado, e a gerar o esqueleto inicial dos componentes/páginas seguindo os
padrões vistos em aula (componentização, props, hooks, rotas). Decisões de
escopo, design e conteúdo do produto foram feitas pela dupla, e o código
gerado foi revisado e é de entendimento dos integrantes.

## Como rodar o projeto

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo de variáveis de ambiente e cole sua chave do TMDB:
   ```bash
   cp .env.example .env
   ```
3. Rode o projeto em modo desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173`.

### Deploy

O projeto está publicado na Vercel: [link do site publicado aqui].
