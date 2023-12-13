///<reference types="cypress"/>

describe('Delete de um dispositivo', () => {

    const payload_cadastro_dispositivo = require('../fixtures/cadastrarDevice.json')

    it('Deletando um dispositivo por código', () => {

        cy.cadastrarDevice(payload_cadastro_dispositivo).as('postDeviceResults')
        //validações
        cy.get('@postDeviceResults').then((response_post) => {

            expect(response_post.status).equal(200)

            //chamando o método DELETE para deletar o registro criado
            cy.deletarDispositivoById(response_post.body.id).as('deleteDeviceResults')
            cy.get('@deleteDeviceResults').then((response_delete) => {

                expect(response_delete.status).equal(200)
                expect(response_delete.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
            })

        })


    })

    it('Deletando um dispositivo que não existe', () => {

       
            //chamando o método DELETE para deletar o registro que nao existe
            cy.deletarDispositivoById('999').as('deleteDeviceResults')
            cy.get('@deleteDeviceResults').then((response_delete) => {

                expect(response_delete.status).equal(404)
                expect(response_delete.body.error).equal(`Object with id = 999 doesn't exist.`)
            })

        })


        it('Deletando um dispositivo de código reservado', () => {

       
            //chamando o método DELETE para deletar o registro que existe mas é reservado e não pode ser deletado
            cy.deletarDispositivoById('7').as('deleteDeviceResults')
            cy.get('@deleteDeviceResults').then((response_delete) => {

                expect(response_delete.status).equal(405)
                expect(response_delete.body.error).equal('7 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.')
            })

        })

})