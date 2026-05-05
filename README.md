# Sistema de Gerenciamento de Macronutrientes
Este projeto tem como objetivo principal facilitar o monitoramento prático e personalizado da ingestão diária de macronutrientes.
Focado em auxiliar os usuários no alcance de metas nutricionais específicas, como o ganho de massa muscular. o sistema oferece autonomia, organização e suporte contínuo, Além de:

- Acompanhamento Individualizado: Monitoramento contínuo da ingestão diária de macronutrientes.

- Banco de Dados de Alimentos Flexível: Permite consultar alimentos preexistentes e cadastrar novos itens para maior personalização.

- Registro Subjetivo: Funcionalidade para registrar sensações e percepções após as refeições, criando uma base para futuras recomendações personalizadas baseadas em API de IA.

- Interface Intuitiva: Focada no engajamento e adaptação à rotina do usuário.

- Embasamento Científico: Cálculos estruturados com base em literaturas e diretrizes nutricionais reconhecidas.

## Tecnologias Utilizadas

Para a implementação da plataforma proposta, foram escolhidas tecnologias amplamente
consolidadas no mercado e com boa curva de aprendizado, visando facilitar o desenvolvimento,
os testes e a futura manutenção da aplicação. A arquitetura geral adotada é baseada no modelo
cliente-servidor, com uma clara separação entre front-end, back-end e banco de dados

# Back-end 

Desenvolvido com Node.js1 e Express2. A escolha dessa stack se deu por sua
leveza, grande ecossistema de bibliotecas e facilidade de construção de APIs RESTful. O Express permite criar rotas, middlewares e controladores de forma organizada, possibilitando uma
manutenção mais simples do código.<br>

Os modelos e controladores da API já estão funcionando para as entidades existentes, com
rotas REST implementadas e testadas com sucesso através da ferramenta Insomnia. As seguin-
tes operações estão disponíveis, para cada entidade presente no projeto:

- GET / lista todos elementos da entidade;
- GET / :id busca elemento da entidade através do id;
- POST / – cria um novo elemento com os dados informados.
- PUT /:id – atualiza os dados do elemento;
- DELETE /:id – exclui um determinado elemento através do Id.

# Banco de Dados

Utiliza MySQL3 para armazenamento relacional. A modelagem do banco
segue um esquema estruturado com tabelas relacionadas, garantindo integridade referencial e
eficiência em consultas. O XAMPP4 está sendo utilizado como ambiente local para facilitar o
gerenciamento do servidor MySQL durante o desenvolvimento.<br>
A estrutura do banco de dados relacional foi implementada conforme o modelo lógico previamente elaborado, com tabelas normalizadas que representam as entidades essenciais do sistema: usuários, alimentos, refeições, feedbacks e registros diários.

# Modelo Er Inicial
<div align="center">
  <img src="https://github.com/Davisond/Tcc/blob/main/erInicial.png?raw=true" width="500px" />
</div>

O relacionamento entre as entidades permite associar alimentos a refeições por meio da tabela intermediária ComposicaoRefeicao, que registra a quantidade de cada alimento em uma
refeição. As refeições estão vinculadas a dias específicos, e todos os registros são associados
a um usuário, permitindo um controle individualizado. Além disso, a resposta fornecida pelo
usuário é relacionada a uma refeição específica, possibilitando a coleta de dados sobre a experiência alimentar. Essas informações são fundamentais para o funcionamento do sistema de
recomendação inteligente, que utilizará esses dados para sugerir melhorias nas escolhas alimentares do usuário

# FrontEnd

Desenvolvido com Vue.js5, um framework JavaScript progressivo que oferece
uma abordagem reativa e modular para construção de interfaces dinâmicas. Vue foi escolhido
pela sua curva de aprendizado amigável, forte comunidade e capacidade de criar componentes
reutilizáveis.<br>

## Fluxo de uso  

A aplicação proposta visa gerenciar e processar informações nutricionais de forma personalizada para cada usuário, acompanhando suas metas diárias de macronutrientes com base em
dados pessoais e no histórico de consumo.

## Cadastro
<div align="center">
  <img src="https://github.com/Davisond/Tcc/blob/main/1cadastrar.png?raw=true" width="300px" />
</div>

No primeiro acesso, o usuário é convidado a criar seu perfil, preenchendo informações essenciais como nome, idade, sexo, altura, peso atual e objetivo
(ganho de massa muscular ou perda de peso)

## Login
<div align="center">
  <img src="https://github.com/Davisond/Tcc/blob/main/2login.png?raw=true" width="300px" />
</div>

Após o cadastro do perfil de usuário, já é possível efetuar o login utilizando email e senha
conforme figura, caso não haja cadastro, há a opção de efetuar o cadastro logo abaixo.

## Menu da Aplicação
<div align="center">
  <img src="https://github.com/Davisond/Tcc/blob/main/3menu.png?raw=true" width="300px" />
</div>

Após o cadastro, o sistema utiliza as informações pessoais para calcular as metas diárias de
macronutrientes (carboidratos, proteínas e gorduras) com base em fórmulas validadas por estudos 
acadêmicos que consideram o gasto energético basal, o nível de atividade física e o objetivo
definido, apresentando esses dados no componente Macronutrientes no topo do menu. Para interagir
com esses dados, o botão + na navbar executa um evento emit que é ouvido pelo App.vue e exibe,
através da diretiva v-if, os alimentos disponíveis no banco de dados, ao selecionar um item, 
seus valores nutricionais são automaticamente somados aos totais acumulados na interface,
permitindo comparar a ingestão diária com as metas estabelecidas.

## Lista de alimentos
<div align="center">
  <img src="https://github.com/Davisond/Tcc/blob/main/4listaAlimentos.png?raw=true" width="300px" />
</div>

**Registro diário de alimentos:** Para acompanhar o progresso em direção às metas, o usuário
deve registrar diariamente os alimentos consumidos. Isto pode ser feito selecionando alimentos
personalizados inseridos por ele mesmo, ou pré-cadastrados no banco de dados nutricional,
com informações já padronizadas sobre porções e macronutrientes, a funcionalidade pode ser
visualizada na Figura.


## Alimento Selecionado
<div align="center">
  <img src="https://github.com/Davisond/Tcc/blob/main/4alimentoSelecionado.png?raw=true" width="300px" />
</div>

Cada alimento registrado é vinculado a uma refeição de forma automática pelo sistema,
de acordo com o horário de registro (café da manhã, almoço, jantar ou lanche), possibilitando
ao usuário uma interface visualmente satisfatória do consumo ao longo do dia, ao selecionar
o alimento ’banana’ por exemplo, ocorre a atualização em tempo real do consumo diário
e é criado a refeição ’almoço’ presente na Figura juntamente a um botão com ícone de
lâmpada, que permite ao usuário registrar um feedback para a refeição. Conforme os alimentos
são registrados, o sistema soma automaticamente os macronutrientes consumidos e atualiza
em tempo real o progresso em relação à meta diária. O usuário pode acompanhar essa evolução
através da barra de progresso e do valor numérico na interface de macro-nutrientes, visualizando
claramente quanto ainda falta consumir ou se já excedeu algum macronutriente conforme Figura

## View Daily
<div align="center">
  <img src="https://github.com/Davisond/Tcc/blob/main/5viewDaily.png?raw=true" width="300px" />
</div>

**Visualização e gestão do histórico:** Todos os registros diários são salvos no banco de dados associado ao usuário e acessados através da view Daily presente na Figura, permitindo
consultar os alimentos consumidos, acompanhar tendências ou corrigir uma inserção acidental.
Esse histórico é essencial para análises futuras e para o funcionamento do sistema de recomendação inteligente.

**Personalização com aprendizado de máquina:** O diferencial da aplicação está em sua
capacidade de aprendizado contínuo. À medida que o usuário registra refeições e fornece feedback sobre o seu bem-estar, o sistema armazena estas informações e utiliza algoritmos de
aprendizado de máquina para identificar padrões e ajustar recomendações.
Isso permite que o sistema sugira combinações de alimentos mais adequadas, substituições
inteligentes para restrições alimentares ou intolerâncias, e até mesmo planos alimentares personalizados 
com base no histórico e nos objetivos do usuário, tornando o acompanhamento
nutricional progressivamente mais individualizado. mais detalhes sobre a funcionalidade no readme da pasta backend

# Convido o interessado à acessar também as pastas backend e frontend, cada uma delas possui readme a respeito
