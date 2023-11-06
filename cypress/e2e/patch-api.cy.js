///<reference types="cypress"/>

describe('Alterar um dispositivo pelo patch', () => {

 //Importando as massas cadastradas nos arquivos JSONS
 const body_atualizar_device = require('../fixtures/atualizaDevicePorCampo.json')
 const payload_cadastro_dispositivo = require('../fixtures/cadastrarDevice.json')
        
    it.only('Alterar um dispositivo pelo método patch', () => {
      
        //Chamando o método POST para criar um registro
        cy.cadastrarDevice(payload_cadastro_dispositivo).as('postDeviceResults')

        //validações
        cy.get('@postDeviceResults').then((response_post) => {
        
        expect(response_post.status).equal(200)
        expect(response_post.body.data['CPU model']).equal(response_post.body.data['CPU model'])
       
       
        //chamando o método PATCH para alterar apenas um campo no registro criado
        cy.atualizarDeviceByCampoEspecifico(response_post,body_atualizar_device)
        }).as('putDeviceResults')

        cy.get('@putDeviceResults').then((response_patch) => {

            expect(response_patch.status).equal(200)
            expect(response_patch.body.data['CPU model']).equal(response_patch.body.data['CPU model'])
        })
       
    })
        
 
    })
