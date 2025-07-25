
//Ingresar a la pagina con datos validos

Cypress.Commands.add('login', (email, password) => {
cy.viewport(1280, 720)
cy.visit('https://vps-3696213-x.dattaweb.com/') 
cy.get('a > .z-0').click()
cy.get('[data-cy="input-email"]').type('admin@admin.com')
cy.get('[data-cy="input-password"]').type('admin')
cy.get('[data-cy="btn-login"]').click()
})

//Secciones del menu de navegacion

Cypress.Commands.add('secciones',()=>{
cy.get('a[href="/tickets/list"]').click()
cy.get('[data-cy="titulo-mis-entradas"]').should('be.visible')
cy.get('a[href="/newEvent"]').click()
cy.get('a[href="/myEvents"]').click()
cy.get('[data-cy="perfil-imagen"]').should('be.visible')
cy.get('a[href="/editProfile"]').click()
cy.get('.overflow-inherit > .text-2xl').should('be.visible')
cy.get('.text-xl').should('be.visible')
cy.get('a[href="/stadistics"]').click()
cy.wait(3000)
cy.get('a[href="/scan"]').click()
cy.get('[data-cy="card-scan-qr"] > .p-4').should('be.visible')
cy.wait(3000)
cy.get('.p-4').should('be.visible')
cy.get('a[href="/adminClients"]').click()
cy.get('a[href="/adminTable"]').click()
cy.get('.max-w-7xl > .flex.items-center > .text-2xl').click()

})

