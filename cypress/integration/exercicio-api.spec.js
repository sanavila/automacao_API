/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import usuariosSchema from "../contracts/usuarios.contract";

describe("Testes da Funcionalidade Usuários", () => {

  it("Deve validar contrato de usuários", () => {
    cy.request({
      url: "usuarios",
      headers: { "cache-control": "no-cache" },
    }).then((response) => {
      return usuariosSchema.validateAsync(response.body);
    });
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
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: "teste",
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal("Cadastro realizado com sucesso");
    });
  });

  it("Deve validar um usuário com email inválido", () => {
    cy.request({
      method: "POST",
      url: "usuarios",
      body: {
        nome: "Fulano da Silva",
        email: "fulano@qa.com",
        password: "teste",
        administrador: "true",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal("Este email já está sendo usado");
    });
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    cy.request("usuarios").then((response) => {
      const id = response.body.usuarios[1]._id;
      cy.request({
        method: "PUT",
        url: `usuarios/${id}`,
        body: {
          nome: "Fulano Editado",
          email: faker.internet.email(),
          password: "teste",
          administrador: "true",
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal("Registro alterado com sucesso");
      });
    });
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    cy.request("usuarios").then((response) => {
      const id = response.body.usuarios[3];
      cy.request({
        method: "DELETE",
        url: `usuarios/${id}`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.match(
          /Registro excluído com sucesso|Nenhum registro excluído/
        );
      });
    });
  });
});
