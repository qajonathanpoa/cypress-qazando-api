///<reference types="cypress"/>

describe('Alterar um dispositivo pelo patch', () => {

        
    it.only('Alterar um dispositivo pelo método patch', () => {
      
        const body1 = {

            "name": "Celular Samsung A6",
            "data": {
                "year": 2021,
                "price": 1300.05,
                "CPU model": "Samsung SNAPDRAGON 1",
                "Hard disk size": "500 MB"
            }
        }

        const body_patch = {
           
        
            "data": {
                "CPU model": "Samsung SNAPDRAGON X",
                
            }
            
            
        }
        //Chamando o método POST para criar um registro
        cy.api({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body1
        }).as('postDeviceResults')

        //validações
        cy.get('@postDeviceResults').then((response_post) => {
        
        expect(response_post.status).equal(200)
        expect(response_post.body.data['CPU model']).equal(response_post.body.data['CPU model'])
       
       
        //chamando o método PATCH para alterar apenas um campo no registro criado
        cy.api({

            method: 'PATCH',
            url: `/objects/${response_post.body.id}`,
            body: body_patch,
            failOnStatusCode: false


        }).as('putDeviceResults')

        cy.get('@putDeviceResults').then((response_patch) => {

            expect(response_patch.status).equal(200)
            expect(response_patch.body.data['CPU model']).equal(body_patch.data['CPU model'])
        })
       
    })
        
 
    })
})