# Architecture — CineDiário

## 1. Visão Geral

Aplicação em React criada com Vite. As rotas usam o React Router no modo Data, com `createBrowserRouter` e `RouterProvider`, seguindo o padrão visto em aula. O `App.jsx` é o layout raiz: renderiza a Navbar fixa e o `<Outlet />`, onde as páginas aparecem.

As chamadas para a API do TMDB ficam separadas em `services/tmdb.js`, para que as páginas não precisem montar URL nem tratar resposta da API. Os dados do usuário (o que assistiu e as notas) ficam em um hook próprio, `useWatchedList`, que salva tudo no localStorage.

## 2. Estrutura de Pastas

```text
src/
├── components/
├── pages/
├── hooks/
├── services/
├── App.jsx
├── main.jsx
└── index.css
```

A pasta `services/` guarda as funções que conversam com a API do TMDB. A pasta `hooks/` guarda o hook que controla a lista de assistidos, usado por mais de uma página.

## 3. Páginas e Rotas

| Página | Rota | Objetivo |
|---|---|---|
| Home | `/` | Buscar filmes e séries |
| Detalhe | `/titulo/:tipo/:id` | Ver detalhes, onde assistir e avaliar |
| Diario | `/diario` | Listar tudo que foi marcado como assistido |
| Perfil | `/perfil` | Mostrar estatísticas, top 5 e avaliações recentes |
| PageNotFound | `*` | Tela para rota que não existe |

Na rota de detalhe, `:tipo` recebe `filme` ou `serie` e `:id` recebe o id do TMDB. Assim a mesma página atende os dois casos.

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| Navbar | Navegação entre as páginas | — |
| SearchBar | Campo de busca | `value`, `onChange`, `onSubmit` |
| TitleCard | Card de um filme ou série, leva para a página de detalhe | `id`, `titulo`, `poster`, `ano`, `tipo`, `assistido`, `nota` |
| TitleGrid | Grade de TitleCard | `itens` |
| RatingStars | Escolher e mostrar nota de 1 a 5 | `value`, `onChange`, `readOnly` |
| ReviewForm | Formulário de nota e comentário | `notaInicial`, `comentarioInicial`, `onSubmit` |
| WatchProvidersList | Lista dos serviços de streaming | `providers` |
| StatCard | Card com um número de estatística | `label`, `valor`, `icone` |
| Loader | Indicador de carregamento | — |
| EmptyState | Mensagem de lista vazia | `mensagem` |
| ErrorMessage | Mensagem de erro | `mensagem` |

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `watched` (lista de assistidos, notas e favoritos) | Hook `useWatchedList`, usado em Home, Detalhe, Diario e Perfil | Quatro páginas precisam do mesmo dado. Como no modo Data as páginas não recebem props pelo roteador, o hook centraliza a lógica e lê o localStorage |
| `query` | Home | Só a Home precisa saber o que foi digitado |
| `resultados`, `loading`, `erro` | Home | Controlam o que mostrar durante e depois da busca |
| `titulo`, `providers`, `loading`, `erro` | Detalhe | Dados que vêm da API para aquele título específico |
| `nota`, `comentario` | ReviewForm | São do formulário. Só sobem para o hook quando o usuário salva |

## 6. useEffect

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Buscar títulos | 400ms depois que o usuário para de digitar na Home | Chama `/search/multi` no TMDB e guarda os resultados |
| Carregar detalhes | Ao abrir a página de detalhe ou trocar de título | Busca os dados do filme/série e os serviços de streaming ao mesmo tempo |
| Salvar no localStorage | Sempre que a lista de assistidos muda | Grava a lista atualizada para não perder os dados ao recarregar |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| react | Base da aplicação | Biblioteca usada na disciplina |
| react-router | Rotas e navegação | Necessária para ter várias páginas, layout e rota dinâmica |
| lucide-react | Ícones | Biblioteca de ícones leve e com import por componente |
| vite | Build e servidor de desenvolvimento | Ferramenta usada em aula para criar o projeto React |