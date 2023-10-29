///<reference types="cypress"/>

describe('Chamada buscar dispositivos', () => {



    it('Buscar um dispositivo especifico', () => {

        const device_id = '7' 
        
        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${device_id}`,
            failOnStatusCode: false

        }).as('getDeviceResult')
        
        cy.get('@getDeviceResult').then((response) => {

           expect(response.status).equal(200)
           expect(response.body.id).equal(device_id)
        })
    })
})