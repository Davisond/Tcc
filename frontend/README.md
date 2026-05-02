# Front-end do projeto de gerenciamento de macronutrientes em Vue.js 

## Tecnologias Utilizadas

- Vue.js 3: Framework progressivo para construção da interface.

- Vue Router: Gerenciamento de rotas e navegação SPA.

- Axios: Cliente HTTP para consumo da API REST (Localhost:3333).

- FontAwesome: Biblioteca de ícones para a interface.

- LocalStorage: Persistência de dados da sessão do usuário.

## Core
- main.js -> Ponto de entrada da aplicação. Configura o Vue, integra o Router e importa os estilos globais do FontAwesome.
- App.vue -> Componente raiz. Gerencia estados globais como a exibição da lista de alimentos, autenticação do usuário e a lógica de criação de refeições diárias.
- router/index.js ->Define as rotas da aplicação (/, /login, /cadastro, /about) utilizando histórico de hash.
  
## Views
- HomeView.vue -> Dashboard principal que renderiza o resumo de macros, a lista de refeições e feedbacks de IA.
- LoginView.vue -> Interface de autenticação com validação via API e persistência de sessão no auth.js.
- CadastroView.vue -> Formulário completo para novos usuários, coletando dados como peso, altura, sexo e objetivo (ganho de massa ou perda de peso).
- AboutView.vue -> (DailyView) Exibe o componente de alimentos consumidos para um usuário específico.
  
## Utils
- auth.js -> Funções auxiliares para manipular o usuarioLogado no localStorage (set, get e limpar).

## Fluxo Principal
### Autenticação e Cadastro
O sistema solicita dados biométricos no cadastro para personalizar os cálculos nutricionais:

Endpoint de Cadastro: POST /usuarios.
Endpoint de Login: GET /usuarios.

### Gestão de Refeições
No App.vue, existe uma lógica automática para garantir que o usuário tenha um "dia" registrado ao interagir com a lista de alimentos:<br>
Verifica se existe um registro para a data atual via GET /dias/${idUsuario}, Caso não exista, cria um novo dia via POST /dias. Vincula os alimentos adicionados à refeição correspondente àquele dia.

## Exemplos de Uso
### Como adicionar um alimento personalizado
Na tela principal, acesse a Navbar, clique no ícone de adicionar (disparando toggleAlimentos), se o alimento não existir na alimentos-lista, selecione Criar Personalizado. O componente criar-alimento será exibido. Após a criação, a lista é atualizada automaticamente através do evento @alimentoCriado.




