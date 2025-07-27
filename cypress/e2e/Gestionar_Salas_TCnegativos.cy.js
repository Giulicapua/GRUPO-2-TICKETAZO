describe('Gestionar_Salas_TCnegativos', () => {

beforeEach( () => {
cy.viewport(1920, 1080)
cy.loginOrganizador()
cy.contains('Gestionar Salas').click()

})

  it('GS_10_Crear una sala sin nombre', () => {
    cy.get('[data-cy="input-nombre-sala"]')
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.get('.flex.flex-col.gap-y-0').contains('Nombre requerido').should('be.visible');
  })


  it('GS_11_Guardar una sección sin nombre luego de editarla', () => {             
    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.contains('button', 'Editar Sala').click()
    cy.get(':nth-child(1) > .p-2 > .justify-between > .flex > .border-medium').click()
    cy.get('input[aria-label="Editar nombre"]').clear()
    cy.get('.gap-3 > .z-0').click()

    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
    })
    cy.wait(300)
    cy.get('.flex.flex-col.gap-y-0').contains('Error al guardar').should('be.visible');

  })
  

    it('GS_12_rear sección con el campo de filas y columnas vacío', () => {
    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.wait(300)
    cy.get('[data-cy="input-filas"]').clear()
    cy.get('[data-cy="input-columnas"]').clear()
    cy.get('[data-cy="btn-generar-grilla"]').click()
    cy.get('.grid-cols-3 > :nth-child(1) > .group > .hidden').contains('El valor debe ser superior o igual a 1').should('be.visible')
    cy.get(':nth-child(2) > .group > .hidden').contains('El valor debe ser superior o igual a 1').should('be.visible')
    
   
  })

    it('GS_13_Crear sección con valor "0" en el campo de filas y columnas', () => {
    cy.get('[data-cy="select-sala"]').click()
    cy.wait(300)
    cy.contains('li[role="option"]', 'Sala con múltiples secciones').click({ force: true });
    cy.wait(300)
    cy.get('[data-cy="input-filas"]').clear().type('0')
    cy.get('[data-cy="input-columnas"]').clear().type('0')
    cy.get('[data-cy="btn-generar-grilla"]').click()
    cy.get('.grid-cols-3 > :nth-child(1) > .group > .hidden').contains('El valor debe ser superior o igual a 1').should('be.visible')
    cy.get(':nth-child(2) > .group > .hidden').contains('El valor debe ser superior o igual a 1').should('be.visible')

})


  it('GS_14_Crear dos salas con el mismo nombre', () => {
    cy.get('[data-cy="input-nombre-sala"]').type('Sala con el mismo nombre')
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
      cy.contains('button', 'Guardar').click({ force: true });
  })
    cy.get('[data-cy="input-nombre-sala"]').focus().type('{selectall}{backspace}').type('Sala con el mismo nombre')
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.wait(300)
    cy.get('section[role="dialog"]').within(() => {
    cy.contains('button', 'Guardar').click({ force: true });
    })
    cy.get('[data-cy="select-sala"] > .inline-flex').click()
    cy.get('[data-slot="listbox"] li').then($options => {
      const texts = [...$options].map(el => el.innerText.trim());
      const uniqueTexts = new Set(texts);
      expect(texts.length, 'Cantidad total').to.equal(uniqueTexts.size);

    })
})

  it('GS_15_Crear dos secciones con el mismo nombre', () => {
    cy.get('[data-cy="input-nombre-sala"]').type('Sala - TEST secciones duplicadas')
    cy.get('[data-cy="btn-nueva-seccion"]').click()
    cy.contains('button', 'Editar Sala').click()
    cy.get(':nth-child(2) > .p-2 > .justify-between > .text-xl').should('have.text', 'Section 2')
    cy.get(':nth-child(2) > .p-2 > .justify-between > .flex > .border-medium').click()
    cy.get('input[aria-label="Editar nombre"]').clear().type('General')
    cy.get('.gap-3 > .z-0').click()
    cy.get('div.w-1\\/4').find('h2.text-xl.font-semibold').then($titles => {
      const names = [...$titles].map(el => el.innerText.trim());
      const unique = new Set(names);
      expect(names.length, 'Cantidad total de secciones').to.equal(unique.size);
    });



  })


  it('GS_16_Guardar sala sin ninguna sección', () => {
    cy.get('[data-cy="input-nombre-sala"]').type('Sala sin secciones')
    cy.contains('button', 'Editar Sala').click()
    cy.get(':nth-child(1) > .p-2 > .justify-between > .flex > .px-0').click()
    cy.get('[data-cy="btn-guardar-layout"]').click()
    cy.get('.flex.flex-col.gap-y-0').contains('Sin secciones').should('be.visible');

  })

})