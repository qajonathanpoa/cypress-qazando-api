// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('buscarDeviceEspecifico', (device_id) => {
    cy.api({
        method: 'GET',
        url: `/objects/${device_id}`,
        failOnStatusCode: false

    }).then((response) => { return response })
})

Cypress.Commands.add('cadastrarDevice', (payload) => {
    cy.api({
        method: 'POST',
        url: '/objects',
        failOnStatusCode: false,
        body: payload
    }).then((response_post) => { return response_post })
})

Cypress.Commands.add('atualizarDevice', (response,body_update) => {

    cy.api({

        method: 'PUT',
        url: `/objects/${response.body.id}`,
        body: body_update,
        failOnStatusCode: false


    }).then((response) => { return response })
})

Cypress.Commands.add('atualizarDeviceByCampoEspecifico', (response,body_patch) => {
    
    cy.api({
    method: 'PATCH',
    url: `/objects/${response.body.id}`,
    body: body_patch,
    failOnStatusCode: false

    }).then((response) => { return response })
})

Cypress.Commands.add('deletarDispositivoById', (device_id) => {
    
    cy.api({

        method: 'DELETE',
        url: `/objects/${device_id}`,
        failOnStatusCode: false

 
    }).then((response) => { return response })
})



//
// -- This is a parent command --
//
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })