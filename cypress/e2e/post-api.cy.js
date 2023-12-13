///<reference types="cypress"/>

describe('Cadastro de dispositivos', () => {

    const payload_cadastro_dispositivo = require('../fixtures/cadastrarDevice.json')
      
    it.only('Cadastrar um dispositivo', () => {
      
        //Criada constante utilizando o método slice do js para pegar
        //os 10 primeiros caracteres da data e comparar no expect
        const dataAtual = new Date().toISOString().slice(0, 10)
              
        //Chamando o command criado no e2e.js
        cy.cadastrarDevice(payload_cadastro_dispositivo).as('postDeviceResults')

        //validações
        cy.get('@postDeviceResults').then((response_post) => {
        
            expect(response_post.status).equal(200)
            expect(response_post.body.id).not.empty
            expect(response_post.body.name).equal('Celular Samsung A6')
            expect(response_post.body.data.year).equal(2021)
            expect(response_post.body.createdAt.slice(0, 10)).equal(dataAtual)
        
        })
    })
})