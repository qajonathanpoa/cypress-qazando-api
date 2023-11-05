///<reference types="cypress"/>

describe('Delete de um dispositivo', () => {


    it('Deletando um dispositivo por código', () => {

        const body1 = {

            "name": "Celular Samsung A6",
            "data": {
                "year": 2021,
                "price": 1300.05,
                "CPU model": "Samsung SNAPDRAGON 1",
                "Hard disk size": "500 MB"
            }
        }
        cy.api({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body1
        }).as('postDeviceResults')

        //validações
        cy.get('@postDeviceResults').then((response_post) => {

            expect(response_post.status).equal(200)

            //chamando o método DELETE para deletar o registro criado
            cy.api({

                method: 'DELETE',
                url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                failOnStatusCode: false


            }).as('deleteDeviceResults')
            cy.get('@deleteDeviceResults').then((response_delete) => {

                expect(response_delete.status).equal(200)
                expect(response_delete.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
            })

        })


    })

    it('Deletando um dispositivo que não existe', () => {

       
            //chamando o método DELETE para deletar o registro que nao existe
            cy.api({

                method: 'DELETE',
                url: `/objects/999`,
                failOnStatusCode: false


            }).as('deleteDeviceResults')
            cy.get('@deleteDeviceResults').then((response_delete) => {

                expect(response_delete.status).equal(404)
                expect(response_delete.body.error).equal(`Object with id = 999 doesn't exist.`)
            })

        })


        it('Deletando um dispositivo de código reservado', () => {

       
            //chamando o método DELETE para deletar o registro que existe mas é reservado e não pode ser deletado
            cy.api({

                method: 'DELETE',
                url: `/objects/7`,
                failOnStatusCode: false


            }).as('deleteDeviceResults')
            cy.get('@deleteDeviceResults').then((response_delete) => {

                expect(response_delete.status).equal(405)
                expect(response_delete.body.error).equal('7 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.')
            })

        })

})