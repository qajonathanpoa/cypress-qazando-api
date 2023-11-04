///<reference types="cypress"/>

describe('Chamada para buscar dispositivos', () => {



    it('Buscar dispositivos por ids', () => {

             
        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects?id=${device_id}&id=${device_id1}&id=${device_id2}`,
            failOnStatusCode: false

        }).as('getDeviceResult')
        
        cy.get('@getDeviceResult').then((response) => {

           expect(response.status).equal(200)
           expect(response.body.id).equal(device_id)
           expect(response.body.name).equal('Apple MacBook Pro 16')
           expect(response.body).not.empty
           expect(response.body.data.year).not.string
           expect(response.body.data['CPU model']).not.empty

        })
    })
})