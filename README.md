# desafio-DigitalRepublic
Etapa do processo seletivo - desafio de Back-End

Desenvolvido por: Gustavo Jezini Matos.

Configurações basicas:
  - npm install
  - npx sequelize db:create
  - npx sequelize db:migrate
  - npx sequelize db:seed:all

  OBS: É preciso povoar o banco de dados com seed para que os testes funcionem.

Como funciona: 
  - É possível criar um usuario do banco. Após a criação é gerado um token de autenticação.
  - É possível logar um usuario já criado no banco. Após a criação é gerado um token de autenticação.
  - Os tokens de autenticações são necessários para realizar as transações.
  - Para realizar uma transação é necessário enviar pelo corpo da requisição o CPF do destinatário, e o valor a ser transferido.
  - Se o emissor não tiver saldo necessario para realizar a transação ela nao ocorrerá.

Utilizei a arquitetura de software MSC.