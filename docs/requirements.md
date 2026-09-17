# Requirements — CineDiário

## 1. Visão do Produto

### Nome
CineDiário

### Problema
O TV Time encerrou em julho de 2026 e apagou os dados de todos os usuários. Quem usava o app perdeu o registro do que já tinha assistido e as notas que tinha dado. Hoje, quem assiste bastante filme e série não tem um lugar simples para anotar o que já viu, guardar a própria opinião e lembrar em qual streaming o título está.

### Público
Pessoas que assistem filmes e séries com frequência e querem manter esse histórico organizado, sem depender da memória.

### Proposta de solução
Uma plataforma web onde a pessoa busca um filme ou série, marca como assistido, dá uma nota de 1 a 5 com um comentário e vê em quais serviços o título está disponível no Brasil. O histórico fica salvo no navegador e vira estatística na página de perfil.

## 2. Objetivo do MVP

Ao final do projeto, precisa estar funcionando:

- busca de filmes e séries pela API do TMDB;
- página de detalhes com sinopse, gênero e onde assistir;
- marcar e desmarcar um título como assistido;
- avaliar com nota e comentário;
- lista com tudo que foi assistido;
- perfil com estatísticas, top 5 favoritos e as avaliações mais recentes.

## 3. Funcionalidades

### F01 — Buscar filmes e séries

**Descrição:** O usuário digita um termo e recebe uma lista de filmes e séries vindos da API do TMDB.

**Critérios de aceitação:**
- [ ] Cada resultado mostra pôster, título, ano e se é filme ou série
- [ ] A busca acontece sozinha depois que o usuário para de digitar
- [ ] Títulos que já estão no diário aparecem com marcação de assistido

**Estados:**
- [ ] Inicial
- [ ] Carregando
- [ ] Sucesso
- [ ] Vazio
- [ ] Erro

### F02 — Ver detalhes e onde assistir

**Descrição:** Ao clicar em um resultado, o usuário vê a sinopse, o ano, os gêneros e a lista de serviços de streaming onde o título está disponível no Brasil.

**Critérios de aceitação:**
- [ ] A página funciona tanto para filme quanto para série
- [ ] Os serviços de streaming aparecem com logo e nome
- [ ] Quando a API não retorna serviços para o Brasil, aparece uma mensagem avisando

**Estados:**
- [ ] Carregando
- [ ] Sucesso
- [ ] Vazio
- [ ] Erro

### F03 — Marcar como assistido

**Descrição:** Na página de detalhes, o usuário marca o título como assistido e ele passa a fazer parte do diário.

**Critérios de aceitação:**
- [ ] O botão some e vira um selo de "Assistido" depois de clicado
- [ ] O mesmo título não pode ser adicionado duas vezes
- [ ] O título pode ser removido do diário

**Estados:**
- [ ] Não assistido
- [ ] Assistido

### F04 — Avaliar um título

**Descrição:** Depois de marcar como assistido, o usuário dá uma nota de 1 a 5 estrelas e pode escrever um comentário.

**Critérios de aceitação:**
- [ ] O formulário só aparece se o título já estiver marcado como assistido
- [ ] Não é possível salvar sem escolher uma nota
- [ ] O comentário é opcional
- [ ] Ao voltar na página, a nota e o comentário salvos aparecem preenchidos

**Estados:**
- [ ] Sem avaliação
- [ ] Avaliado

### F05 — Meu diário

**Descrição:** Página com todos os títulos marcados como assistidos, em formato de grade de pôsteres.

**Critérios de aceitação:**
- [ ] Cada card mostra a nota que o usuário deu, quando existir
- [ ] É possível remover um título direto da grade
- [ ] Quando não há nada assistido, aparece uma mensagem orientando a buscar um título

**Estados:**
- [ ] Vazio
- [ ] Sucesso

### F06 — Escolher os 5 favoritos

**Descrição:** O usuário escolhe manualmente até 5 títulos favoritos, que ficam destacados no perfil.

**Critérios de aceitação:**
- [ ] Só é possível favoritar um título que já está marcado como assistido
- [ ] O botão de favoritar fica desabilitado quando já existem 5 favoritos
- [ ] É possível remover um favorito direto do perfil
- [ ] Os favoritos continuam salvos ao recarregar a página

**Estados:**
- [ ] Sem favoritos
- [ ] Com favoritos
- [ ] Limite atingido

### F07 — Perfil com estatísticas

**Descrição:** Página que resume o consumo do usuário: total de títulos assistidos, quantos são filmes, quantas são séries e a nota média dada. Mostra também o top 5 de favoritos e os 5 últimos títulos avaliados.

**Critérios de aceitação:**
- [ ] As estatísticas mudam sozinhas quando o diário muda
- [ ] Os avaliados recentemente aparecem do mais novo para o mais antigo
- [ ] A nota média considera só os títulos que já receberam nota
- [ ] O contador mostra quantos favoritos já foram escolhidos, de 0 a 5

**Estados:**
- [ ] Vazio
- [ ] Sucesso

## 4. Fora do Escopo

- Login e conta de usuário
- Backend e banco de dados (os dados ficam no localStorage do navegador)
- Acompanhar episódio por episódio de uma série
- Parte social: seguir pessoas, comentar em avaliações de outros, feed
- Recomendações personalizadas