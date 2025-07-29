describe('Gestionar_Salas_TCpositivos', () => {

beforeEach( () => {
cy.viewport(1920, 1080)
cy.loginOrganizador()
cy.contains('Gestionar Salas').click()

})

  it('GS_01_Crear una sala con una sola sección', () => {
    cy.get('[data-cy="input-nombre-sala"]').type('Sala con una sola sección')
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
})
  cy.get('.flex.flex-col.gap-y-0').contains('Sala guardada con éxito.').should('be.visible');
  })


  it('GS_02_Crear una sala con múltiples secciones', () => {
    cy.get('[data-cy="input-nombre-sala"]').type('Sala con múltiples secciones')
    cy.get('[data-cy="btn-nueva-seccion"]').click()
    cy.get('[data-cy="select-seccion"] > .inline-flex').invoke('text').should('not.contain', 'General')
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
})
  cy.get('.flex.flex-col.gap-y-0').contains('Sala guardada con éxito.').should('be.visible');
  })



  it('GS_03_Modificar la cantidad de filas y columnas en secciones existentes', () => {

    const filas = Math.floor(Math.random() * 99) + 1;
    const columnas = Math.floor(Math.random() * 99) + 1;

    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.wait(300)
    cy.get('[data-cy="input-filas"]').clear().type(filas.toString());
    cy.get('[data-cy="input-columnas"]').clear().type(columnas.toString());
    cy.get('[data-cy="btn-generar-grilla"]').click()
    cy.get('[data-cy^="butaca-"]').should('have.length', filas * columnas);
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
    })
    cy.wait(300)
    cy.get('.flex.flex-col.gap-y-0').contains('Sala guardada con éxito.').should('be.visible');

  })



  it('GS_04_Modificar tipo de asientos', () => {
    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.get('[data-cy="butaca-0-0"]').click()
    cy.get('[data-cy="butaca-0-0"] svg').should('have.class', 'lucide-accessibility');
    cy.get('[data-cy="butaca-0-0"]').click()
    cy.get('[data-cy="butaca-0-0"] svg').should('not.exist');
    cy.get('[data-cy="butaca-0-0"]').click()
    cy.get('[data-cy="butaca-0-0"] svg').should('have.class', 'lucide-armchair');
    cy.get('[data-cy="butaca-0-0"]').click()
    cy.get('[data-cy="butaca-0-0"] svg').should('have.class', 'lucide-accessibility');
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
    })
    cy.wait(300)
    cy.get('.flex.flex-col.gap-y-0').contains('Sala guardada con éxito.').should('be.visible');
  })


  it('GS_05_Modificar nombre y tipo de secciones existentes', () => {  

    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.contains('button', 'Editar Sala').click()
    cy.get(':nth-child(1) > .p-2 > .justify-between > .flex > .border-medium').click()

    const numero = Math.floor(Math.random() * 1000); 
    const nuevoTexto = 'Editando nombre de sección' + numero;    

    cy.get('input[aria-label="Editar nombre"]').clear().type(nuevoTexto).should('have.value', nuevoTexto)
    cy.get('.max-w-fit > .font-inherit').click()
    cy.get('.gap-3 > .z-0').click()

    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
    })
    cy.wait(300)
    cy.get('.flex.flex-col.gap-y-0').contains('Sala guardada con éxito.').should('be.visible');

  })


  it('GS_07_Eliminar secciones existentes', () => {             

    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.contains('button', 'Editar Sala').click()
    cy.get(':nth-child(1) > .p-2 > .justify-between > .flex > .px-0').click()
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
    })
    cy.wait(300)
    cy.get('.flex.flex-col.gap-y-0').contains('Sala guardada con éxito.').should('be.visible');

  })

  it('GS_08_Validar que el número de filas y columnas que se muestran coincidan con la grilla que se creó y guardó para la sección', () => {
    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.wait(300)
    cy.get('[data-cy="input-filas"]').clear().type('10');
    cy.get('[data-cy="input-columnas"]').clear().type('10');
    cy.get('[data-cy="btn-generar-grilla"]').click()
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
    })
    cy.wait(300)
    cy.get('.flex.flex-col.gap-y-0').contains('Sala guardada con éxito.').should('be.visible');
    cy.reload()
    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.get('[data-cy="input-filas"]').should('have value', '10')
    cy.get('[data-cy="input-columnas"]').should('have value', '10')



  })


})