///<reference types="cypress"/>

describe('Alterar um dispositivo', () => {

    //Importando as massas cadastradas nos arquivos JSONS
    const body_atualizar_device = require('../fixtures/atualizarDevice.json')
    const payload_cadastro_dispositivo = require('../fixtures/cadastrarDevice.json')
        
    it.only('Alterar um dispositivo por código', () => {
      
        //Chamando o método POST pelo command para criar um registro
        cy.cadastrarDevice(payload_cadastro_dispositivo).as('postDeviceResults')
        //validações
        cy.get('@postDeviceResults').then((response_post) => {
        
        expect(response_post.status).equal(200)
        expect(response_post.body.name).equal('Celular Samsung A6')
       
        //Chamando o método PUT para alterar o registro criado
       
        cy.atualizarDevice(response_post,body_atualizar_device).as('putDeviceResults')
        cy.get('@putDeviceResults').then((response_put) => {

            expect(response_put.status).equal(200)
            expect(response_put.body.name).equal(body_atualizar_device.name)
            expect(response_put.body.data.year).equal(body_atualizar_device.data.year)
            expect(response_put.body.data.price).equal(body_atualizar_device.data.price)
            expect(response_put.body.data['Hard disk size']).equal(body_atualizar_device.data['Hard disk size'])
        })
       
    })
        
 
    })
})