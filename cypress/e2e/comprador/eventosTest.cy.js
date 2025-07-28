describe('Test Ticketazo Eventos', () =>{
    beforeEach('Eventos', () =>{
        cy.clearAllCookies()
        cy.goToPage()
    })
    it('Seleccionar evento sin loguearse', ()=>{
        cy.chooseEventWithoutLog()
    })
    it('Seleccionar evento logueado', () =>{
        cy.chooseEventLog('lulencina2@hotmail.com', 'Lu123456.', [
         { fila: 13, columna: 4 }
        ])
    })
    it('Prueba de filtros', () =>{
        cy.filters()
    })
})
