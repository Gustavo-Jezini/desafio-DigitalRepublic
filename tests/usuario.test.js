const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../index');

describe('Criar novo usuario', () => {

  it('Cria usuario com sucesso e retorna um objeto', async () => {
    const randomCPF = (parseInt(Math.random()*100000000000)).toString()
    const response = await chai.request(app)
      .post('/usuario')
      .send({
        nome: 'gustavo',
        cpf: randomCPF,
      });
      expect(response).to.be.a('object');
      expect(response.status).to.be.equals(200);
  });

  it('Tal objeto tem "usuario" e "token"', async () => {
    const randomCPF = (parseInt(Math.random()*100000000000)).toString()
    if (randomCPF.length === 10) {
      return randomCPF + '1';
    }

    const response = await chai.request(app)
      .post('/usuario')
      .send({
        nome: "aleatorio",
        cpf: randomCPF,
      });

      expect(response.status).to.be.equals(200);
      expect(response.body.novoUsuario).to.have.a.property('usuario');
  });

  it('Retorna mensagem de erro caso nao passe o nome', async () => {
    const response = await chai.request(app)
      .post('/usuario')
      .send({
        cpf: '76787854657',
      });

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um nome');
  });

  it('Retorna mensagem de erro caso o nome em branco', async () => {
    const response = await chai.request(app)
      .post('/usuario')
      .send({
        nome: "",
        cpf: '76787854657',
      });

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um nome');
  });

  it('Retorna mensagem de erro caso nao passe o cpf', async () => {
    const response = await chai.request(app)
      .post('/usuario')
      .send({
        nome: "gustavo"
      });

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um CPF');
  });

  it('Retorna mensagem de erro caso o cpf em branco', async () => {
    const response = await chai.request(app)
      .post('/usuario')
      .send({
        nome: "gustavo",
        cpf: '',
      })

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um CPF');
  });
});

describe('Realizar Login', () => {
  it('Retorna mensagem de erro caso o cpf em branco', async () => {
    const response = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '',
      });

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um CPF');
  });

  it('Retorna mensagem de erro caso nao passe um cpf', async () => {
    const response = await chai.request(app)
      .get('/usuario')
      .send({
      });

      expect(response.status).to.be.equals(401);
      expect(response.body.erro).to.be.equals('É necessario informar um CPF');
  });

  it('Retorna token caso login seja realizado com sucesso', async () => {
    const response = await chai.request(app)
      .get('/usuario')
      .send({
        cpf: '46476676857'
      });

      expect(response.body).to.have.a.property('token');
  });
})