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
            url: 'https://api.restful-api.dev/objects',
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
})