// Redirige a la pagina principal
Cypress.Commands.add('goToPage', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    cy.title().should('eq', 'Ticketazo')
    cy.viewport(1280, 720) 
})

// Prueba sin loguearse
Cypress.Commands.add('chooseEventWithoutLog', () =>{
    cy.get('[data-cy="evento-titulo"]').contains('Test Multipe Horario')
    cy.get('[data-cy="btn-ver-evento-9"]').contains('Ver evento').click()
    cy.contains('button', 'Adquirir entrada').click();
    cy.get('h2.font-tektur').should('contain', 'Selecciona una fecha y horario')
    cy.contains('span', 'domingo, 15 de junio de 2025').click()
    cy.contains('button', '19:00 hs').click()
    cy.contains('button', 'Continuar con la compra').click()
    cy.get('[data-cy="input-email"]').should('exist')
})

// Prueba logueado
Cypress.Commands.add('chooseEventLog', (username, password, seats = []) => {
    seats.forEach(({ fila, columna }) => {  
        cy.get('a > .z-0').click()
        cy.get('[data-cy="input-email"]').type(username)
        cy.get('[data-cy="input-password"]').type(password)
        cy.get('[data-cy="btn-login"]').contains('Login').click()
        cy.get('a[href="/userProfile"]').should('contain.text', 'Mi perfil')
        cy.get('[data-cy="evento-titulo"]').contains('Tesis Cervantes')
        cy.get('[data-cy="btn-ver-evento-8"]').contains('Ver evento').click()
        cy.contains('button', 'Adquirir entrada').click()
        cy.contains('button', 'Auditorio').click()
        cy.wait(3000)
        cy.get(`[title="Fila ${fila}, Columna ${columna}"]`).click()
        cy.get('button.bg-blue-500').contains('Comprar').click()
        cy.contains('h2', 'Resumen de Compra').should('exist')
        cy.contains('button', 'Generar Entrada Gratuita').click()
        cy.get('[data-cy="titulo-mis-entradas"]').contains('Mis Entradas')
    })
})

// Prueba de filtros
Cypress.Commands.add('filters', () =>{
    cy.get('button[aria-label="Categoría"]').click()
    cy.contains('li[role="option"]', 'StandUp').click()
    cy.get('button[aria-label="Calendario"]').click()
    cy.get('[role="dialog"]').should('be.visible')
    cy.wait(3000)
    cy.get('span[role="button"][aria-label*="24 de julio de 2025"]').click()
    cy.get('span[role="button"][aria-label*="31 de julio de 2025"]').click({force: true})
    cy.get('button[aria-label="Provincia"]').click()
    cy.contains('li[role="option"]', 'Córdoba').click()
    cy.wait(3000)
    cy.contains('button', 'Limpiar filtros').click()
})

// Ingresar a la pagina con datos validos
Cypress.Commands.add('login', (email, password) => {
cy.viewport(1280, 720)
cy.visit('https://vps-3696213-x.dattaweb.com/') 
cy.get('a > .z-0').click()
cy.get('[data-cy="input-email"]').type('admin@admin.com')
cy.get('[data-cy="input-password"]').type('admin')
cy.get('[data-cy="btn-login"]').click()
})

// Secciones del menu de navegacion
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
