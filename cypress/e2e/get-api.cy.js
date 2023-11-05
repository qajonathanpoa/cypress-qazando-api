///<reference types="cypress"/>

describe('Chamada buscar dispositivos', () => {



    it('Buscar um dispositivo especifico', () => {

        const device_id = '7'

        cy.buscarDeviceEspecifico(device_id)
            .as('getDeviceResult')

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
