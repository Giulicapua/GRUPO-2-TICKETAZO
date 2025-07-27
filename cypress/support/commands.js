Cypress.Commands.add('loginOrganizador', () => {
cy.visit('https://vps-3696213-x.dattaweb.com/auth/login')
cy.get('[data-cy="input-email"]').type('ms.villagra91+est@gmail.com')
cy.get('[data-cy="input-password"]').type('Y00rg1234*')
cy.get('[data-cy="btn-login"]').click()
})