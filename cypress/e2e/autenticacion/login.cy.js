// Login con datos validos
describe('Login con datos validos', () => {
  it('Test case 1', () => {
     cy.visit('https://vps-3696213-x.dattaweb.com/')
     cy.contains('Login').should('be.visible').click()
     cy.title('eq', 'Ticketazo')
     cy.get('[data-cy="input-email"]').type('admin@admin.com') 
     cy.get('[data-cy="input-password"]').type('admin')
     cy.contains('button', /login/i).click()
     cy.contains('Escanear QR').should('be.visible')
     cy.go(-1)
  })
})

// Login con credenciales incorrectas
describe('Login con datos no validos', () => {
  it('Test case 2', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    cy.contains('Login').should('be.visible').click()
    cy.title('eq','Ticketazo')
    cy.get('[data-cy="input-email"]').type('admin@admin.com').click()
    cy.get('[data-cy="input-password"]').type('Probando!@123').click()
    cy.contains('button', /login/i).click()
    cy.contains('Correo o contraseña incorrectos').should('be.visible')

  })
})

// Logout 
describe('Verificar la funcionalidad del Logout', () => {
  it('Test case 3', () => {
     cy.visit('https://vps-3696213-x.dattaweb.com/auth/login')
     cy.contains('Login').should('be.visible').click()
     cy.title('eq', 'Ticketazo')
     cy.get('[data-cy="input-email"]').type('admin@admin.com') 
     cy.get('[data-cy="input-password"]').type('admin')
     cy.contains('button', /login/i).click()
     cy.contains('Escanear QR').should('be.visible')
     cy.wait(3000)
     cy.contains('button','Logout').should('have.text','Logout').click()
     cy.contains('Login').should('be.visible').click()
  })
})

// Iniciar sesión mediante Google
describe('Iniciar sesion con google', () => {
  it('Test case 4', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login')
    cy.title('eq','Ticketazo')
    cy.get('[data-cy="btn-google-login"]').click()
  })
})

// Contraseña olvidada
describe('Recuperacion de contraseña', () => {
  it('Test case 5', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login')
    cy.contains('¿Olvidaste tu contraseña?').should('be.visible').click()
    cy.title('equal','Ticketazo')
    cy.get('[data-cy="input-email"]').type('admin@admin.com')
    cy.contains('button', /enviar/i).click()
    cy.contains('Se ha enviado un correo para restablecer la contraseña').should('be.visible')
  })
})

// Contraseña que no coinciden
describe('Contraseñas diferentes', () => {
  it('Test case 6', () => {
      cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerUser')
      cy.title('eq','Ticketazo')
      cy.contains('Registrar Cuenta').should('be.visible')
      cy.fixture('contraDiferentes').then((contra_diferentes) => {
      cy.get('[data-cy="input-nombres"]').type(contra_diferentes.nombres)
      cy.get('[data-cy="input-apellido"]').type(contra_diferentes.apellido)
      cy.get('[data-cy="input-telefono"]').type(contra_diferentes.telefono)
      cy.get('[data-cy="input-dni"]').type(contra_diferentes.dni)
      cy.get('[data-cy="select-provincia"]').type(contra_diferentes.provincia)
      cy.contains('.cursor-pointer', 'Buenos Aires').click()
      cy.get('[data-cy="select-localidad"]').type(contra_diferentes.localidad)
      cy.contains('.cursor-pointer', 'Ciudadela').click()
      cy.contains('dd').type('03')
      cy.contains('mm').type('05')
      cy.contains('aaaa').type('1998')
      cy.get('[data-cy="input-email"]').type(contra_diferentes.email)
      cy.get('[data-cy="input-confirmar-email"]').type(contra_diferentes.confirmar_email)
      cy.get('[data-cy="input-password"]').type(contra_diferentes.contrasena)
      cy.get('[data-cy="input-repetir-password"]').type(contra_diferentes.repetir_contrasena)
      cy.contains(/registrarse/i).click()
    })
  })
})
