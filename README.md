# Sistema de Gerenciamento de Macronutrientes
Este projeto tem como objetivo principal facilitar o monitoramento prático e personalizado da ingestão diária de macronutrientes.
Focado em auxiliar os usuários no alcance de metas nutricionais específicas, como o ganho de massa muscular. o sistema oferece autonomia, organização e suporte contínuo, Além de:

- Acompanhamento Individualizado: Monitoramento contínuo da ingestão diária de macronutrientes.

- Banco de Dados de Alimentos Flexível: Permite consultar alimentos preexistentes e cadastrar novos itens para maior personalização.

- Registro Subjetivo: Funcionalidade para registrar sensações e percepções após as refeições, criando uma base para futuras recomendações personalizadas baseadas em API de IA.

- Interface Intuitiva: Focada no engajamento e adaptação à rotina do usuário.

- Embasamento Científico: Cálculos estruturados com base em literaturas e diretrizes nutricionais reconhecidas.

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

**Cálculo automático de metas nutricionais:** Após o cadastro, o sistema utiliza das informações pessoais para calcular as metas diárias de macronutrientes (carboidratos, proteínas e
gorduras). Esse cálculo baseia-se em fórmulas nutricionais validadas por estudos acadêmicos, 
considerando fatores como gasto energético basal, nível de atividade física
e objetivo definido. As metas geradas são salvas e apresentadas ao usuário como seu objetivo
diário, na tela menu presente na figura estes objetivos diários podem ser visualizados no
component com título "Macronutrientes" na parte superior do menu.

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
