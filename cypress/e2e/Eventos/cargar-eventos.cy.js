import { titulo, fechaEvento, segundaFechaEvento, horarioEvento, segundoHorarioEvento, tercerHorarioEvento, duracionEvento } from '../../support/variablesGestionEventos'
describe('Gestión de Eventos', () => {
    beforeEach(() => {
        cy.loginOrganizador()
        cy.readFile('cypress/fixtures/variablesEventos.json').then((data) => {
            const contador = data.contador + 1
            data.contador = contador
        cy.writeFile('cypress/fixtures/variablesEventos.json', data)
        cy.wrap(data).as('datosEvento')
        })
    })
    it ('Crear evento con datos completos', () => {
        cy.irCargarEvento()
        cy.completarDatosEvento()
        cy.cargarDatosEntradas()
        cy.cargarImagen()
        cy.get('@datosEvento').then((evento) => {
        cy.contains(titulo + evento.contador).should('be.visible')
         })
        cy.contains(fechaEvento.dia).should('be.visible')
        cy.contains(fechaEvento.mes).should('be.visible')
        cy.contains(fechaEvento.año).should('be.visible')
        cy.contains(horarioEvento.hora).should('be.visible')
        cy.contains(horarioEvento.minuto).should('be.visible')
        cy.confirmarEvento()
        cy.logout()
        cy.verificarEvento()
    })



    it ('Crear evento con multiples fechas y horarios', () => {
        cy.irCargarEvento()
        cy.completarDatosEventoVariasFechas()
        cy.cargarDatosEntradas()
        cy.cargarImagen()
        cy.get('@datosEvento').then((evento) => {
        cy.contains(titulo + evento.contador).should('be.visible')
         })
        cy.contains(fechaEvento.dia).should('be.visible')
        cy.contains(fechaEvento.mes).should('be.visible')
        cy.contains(fechaEvento.año).should('be.visible')
        cy.contains(segundaFechaEvento.dia).should('be.visible')
        cy.contains(segundaFechaEvento.mes).should('be.visible')
        cy.contains(segundaFechaEvento.año).should('be.visible')
        cy.contains(horarioEvento.hora).should('be.visible')
        cy.contains(horarioEvento.minuto).should('be.visible')
        cy.contains(segundoHorarioEvento.hora).should('be.visible')
        cy.contains(segundoHorarioEvento.minuto).should('be.visible')
        cy.contains(tercerHorarioEvento.hora).should('be.visible')
        cy.contains(tercerHorarioEvento.minuto).should('be.visible')
        cy.confirmarEvento()
        cy.logout()
        cy.verificarEvento()

    })

        it ('Crear evento con lugar personalizado', () => {
        cy.irCargarEvento()
        cy.completarDatosEventoLugarPersonalizado()
        cy.contains('button', 'Seleccionar entrada').click()
        cy.get('[role=option]').eq(0).click()
        cy.get('[aria-label="Capacidad"]').type('100')
        cy.get('[aria-label="Precio Entrada"]').type('50236')
        cy.contains('button', 'Siguiente').click()
        cy.contains('Cargar Imagen Evento').should('be.visible')
        cy.cargarImagen()
        cy.get('@datosEvento').then((evento) => {
        cy.contains(titulo + evento.contador).should('be.visible')
         })
        cy.contains(fechaEvento.dia).should('be.visible')
        cy.contains(fechaEvento.mes).should('be.visible')
        cy.contains(fechaEvento.año).should('be.visible')
        cy.contains(horarioEvento.hora).should('be.visible')
        cy.contains(horarioEvento.minuto).should('be.visible')
        cy.confirmarEvento()
        cy.logout()
        cy.verificarEvento()
    })


    it ('Crear evento con preventa', () => {
        cy.irCargarEvento()
        cy.completarDatosEvento()
        cy.completarDatosPreventa()
        cy.cargarDatosEntradas()
        cy.cargarImagen()
        cy.get('@datosEvento').then((evento) => {
        cy.contains(titulo + evento.contador).should('be.visible')
         })
        cy.contains(fechaEvento.dia).should('be.visible')
        cy.contains(fechaEvento.mes).should('be.visible')
        cy.contains(fechaEvento.año).should('be.visible')
        cy.contains(horarioEvento.hora).should('be.visible')
        cy.contains(horarioEvento.minuto).should('be.visible')
        cy.confirmarEvento()
        cy.logout()
        cy.verificarEvento()
    })

    
    it ('Crear evento vacío', () => {
        cy.irCargarEvento()
        cy.contains('button', 'Siguiente').click()
        cy.contains('Debe seleccionar una opción de edad.').should('be.visible')
        cy.contains('Debe seleccionar un género para el evento.').should('be.visible')
        cy.contains('Debe seleccionar un lugar para el evento.').should('be.visible')
        cy.contains('Debe agregar una descripción del evento.').should('be.visible')
    })


})
