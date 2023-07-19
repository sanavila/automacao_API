/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe("Testes da Funcionalidade Usuários", () => {
  it("Deve validar contrato de usuários", () => {
    //TODO:
  });

  it("Deve listar usuários cadastrados", () => {
    cy.request({
      method: "GET",
      url: "usuarios",
    }).then((response) => {
      expect(response.body.usuarios[0].nome).to.equal("Fulano da Silva");
      expect(response.status).to.equal(200);
    });
  });

  it("Deve cadastrar um usuário com sucesso", () => {
    cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        nome: "Fake Name",
        email: faker.internet.email(),
        password: "teste",
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso")
    });
  });

  it("Deve validar um usuário com email inválido", () => {
    //TODO:
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    //TODO:
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    //TODO:
  });
});
