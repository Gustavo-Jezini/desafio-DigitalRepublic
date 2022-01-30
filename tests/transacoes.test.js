const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../index');

describe('Realizar transação', () => {

  it('Realiza transaçao com sucesso, e que o status da requisição seja 200', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          cpf: '34336636798',
          valor: 1000
        },
      );

      expect(response.status).to.be.equals(200);
      expect(response.body).to.be.a('object');
  });

  it('Retorna erro caso não passe o cpf do destinatário', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          cpf: '',
          valor: 1000
        },
      );

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um CPF');
  })

  it('Retorna erro caso não passe o campo do cpf', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          valor: 1000
        },
      );

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um CPF');

  })

  it('Retorna erro caso não passe o campo do valor', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          cpf: '34336636798',
        },
      );

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um valor');

  })

  it('Retorna erro caso o valor seja 0', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          cpf: '34336636798',
          valor: 0
        },
      );

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um valor');

  })

  it('Retorna erro caso o valor seja maior que 2000', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          cpf: '34336636798',
          valor: 3000
        },
      );

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('Por questões de seguranã, é proibido enviar valor maior que 2000');

  })

  it('Retorna erro caso o valor seja negativo', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          cpf: '34336636798',
          valor: -3000
        },
      );

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('Impossível enviar valores negativos');

  })

  it('Se o emissor não tiver dinheiro suficiente na conta, surge um erro e a transação não é realizada', async () => {
    let token;
    
    const getToken = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '35364658212'
      });

      token = getToken.body.token;
    
    
    const response = await chai.request(app)
      .post('/transacoes')
      .set('Authorization', token)
      .send(
        {
          cpf: '46476676857',
          valor: 2000
        },
      );

      expect(response.status).to.be.equals(401);
      expect(response.body.mensagem).to.be.equals('Emissor não tem dinheiro suficiente para essa transação');
  });
})