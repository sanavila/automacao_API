/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
         //TODO: 
    });

    it.only('Deve listar usuários cadastrados', () => {
         cy.request({
          method: 'GET',
          url: 'usuarios' 
         }).then((response) => {
          expect(response.body.usuarios[0].nome).to.equal('Fulano da Silva')
          expect(response.status).to.equal(200)
         })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
         //TODO: 
    });

    it('Deve validar um usuário com email inválido', () => {
         //TODO: 
    });

    it('Deve editar um usuário previamente cadastrado', () => {
         //TODO: 
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        //TODO: 
    });


});
