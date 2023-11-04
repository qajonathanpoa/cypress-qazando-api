///<reference types="cypress"/>

describe('Alterar um dispositivo', () => {

        
    it.only('Alterar um dispositivo por código', () => {
      
        const body1 = {

            "name": "Celular Samsung A6",
            "data": {
                "year": 2021,
                "price": 1300.05,
                "CPU model": "Samsung SNAPDRAGON 1",
                "Hard disk size": "500 MB"
            }
        }

        const body_update = {

            "name": "Celular Samsung A6 - UPDATE",
            "data": {
                "year": 2022,
                "price": 1300.08,
                "CPU model": "Samsung SNAPDRAGON 1",
                "Hard disk size": "800 MB"
            }
        }
        //Chamando o método POST para criar um registro
        cy.api({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            failOnStatusCode: false,
            body: body1
        }).as('postDeviceResults')

        //validações
        cy.get('@postDeviceResults').then((response_post) => {
        
        expect(response_post.status).equal(200)
        expect(response_post.body.name).equal('Celular Samsung A6')
       
       
        //chamando o método PUT para alterar o registro criado
        cy.api({

            method: 'PUT',
            url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
            body: body_update,
            failOnStatusCode: false


        }).as('putDeviceResults')

        cy.get('@putDeviceResults').then((response_put) => {

            expect(response_put.status).equal(200)
            expect(response_put.body.name).equal(body_update.name)
            expect(response_put.body.data.year).equal(body_update.data.year)
            expect(response_put.body.data.price).equal(body_update.data.price)
            expect(response_put.body.data['Hard disk size']).equal(body_update.data['Hard disk size'])
        })
       
    })
        
 
    })
})