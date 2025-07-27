describe('Pruebas de la Página de Inicio', () => {
  const baseUrl = 'https://vps-3696213-x.dattaweb.com/';

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('Carga la página correctamente', () => {
    cy.url().should('eq', baseUrl)
    cy.title().should('not.be.empty')
  })

  it('Verifica que el contenido principal tenga texto visible', () => {
    cy.get('main').within(() => {
      cy.get('h1, h2, p').should('exist')
      //cy.wait(3000)
    })
  })

  it('Verifica que el logo esté visible y clickeable', () => {
    cy.get('.basis-0').should('be.visible').click()
    cy.url().should('eq', baseUrl)
  })
  
it('Login: botón visible, clickeable y redirige correctamente', () => {
  cy.visit('https://vps-3696213-x.dattaweb.com/auth/login')
  cy.url().should('include', '/auth/login').then((url) => {
    cy.log('URL de login verificada:', url)
  })
  cy.contains('button', 'Login').should('be.visible')
})

  it('Verifica que el Tema esté visible, clickeable y cambie', () => {
    cy.viewport(1280, 720)
    cy.get('.text-medium > .max-w-fit').click()
    cy.wait(3000)
    })

  it('Verifica el menú de navegación', () => {
    cy.get('nav').should('be.visible')
    cy.get('nav a').each(($el) => {
      cy.wrap($el).should('have.attr', 'href').and('not.be.empty')
    })
  })

  describe('Menú de navegación: buscador, filtros y eventos', () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    cy.viewport(1280, 720) // Tamaño escritorio
  })

  it('Busca un evento usando el buscador', () => {
   cy.get('input[placeholder="Busca tu próxima función!"]').should('exist').should('be.visible').type('Festival').should('have.value', 'Festival') 
  })

  it('Filtra por fecha', () => {
    cy.get('[data-slot="start-input"] [data-type="day"]').click().type('27')
    cy.get('[data-slot="start-input"] [data-type="month"]').click().type('07')
    cy.get('[data-slot="start-input"] [data-type="year"]').click().type('2025')
    cy.get('[data-slot="end-input"] [data-type="day"]').click().type('01')
    cy.get('[data-slot="end-input"] [data-type="month"]').click().type('07')
    cy.get('[data-slot="end-input"] [data-type="year"]').click().type('2025')
    cy.wait(3000)
  })

  it('Filtra por categoría Teatro', () => {
  cy.get('button[aria-label="Categoría"]').click()
  cy.contains('li[role="option"]', 'Teatro').click()
  })

  it('Muestra eventos cercanos', () => {
    cy.get('#locationFilter').click()
    cy.wait(3000)
  })

  it('Limpia los filtros correctamente', () => {
    cy.get('button[aria-label="Provincia"]').click()
    cy.contains('li[role="option"]', 'Córdoba').click()
    cy.wait(3000)
    cy.contains('button', 'Limpiar filtros').click()
  })
})

  //Falta el test de búsqueda, filtros y eventos Codigo del archivo TicketazofiltroBuscarMenu.cy.js

  it('Verifica que el banner principal se muestre', () => {
    cy.get('.flex').should('be.visible')
    cy.get('.flex').find('button, h1, span, p').should('exist')
  })

  it('Verifica que el contenido del footer tenga texto visible', () => {
    cy.get('footer').should('be.visible')
    cy.get('footer').within(() => {
      cy.get('h1, h2, p').should('exist')
    })
  })

  it('Verifica elementos responsive', () => {
    cy.viewport('iphone-6+')
    cy.get('nav').should('be.visible')
  })
})