describe('Test Inteligente: Verifica y lista títulos del buscador en 3 páginas', () => {
  const titulosPorPagina = {};

  it('Inicia sesión y recorre el buscador con verificación en todas las páginas', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');

    cy.get('input[type="email"]').should('be.visible').type('admin@admin.com');
    cy.get('input[type="password"]').should('be.visible').type('admin');
    cy.contains('button', 'Login').click();

    cy.url().should('include', '/');
    cy.wait(3000);

    cy.get('input[type="search"]').type('a', { delay: 100 });
    cy.wait(3000);

    const recorrerPaginas = (numeroPagina = 1) => {
      cy.log(`Verificando página ${numeroPagina}`);
      cy.contains('li[role="button"]', numeroPagina.toString(), { timeout: 4000 }).click({ force: true });
      cy.wait(2000);

      titulosPorPagina[`Página ${numeroPagina}`] = [];

      cy.get('[data-cy="evento-titulo"]').each(($el) => {
        const texto = $el.text().trim();
        if (texto.length > 0) {
          cy.wrap($el).should('be.visible');
          titulosPorPagina[`Página ${numeroPagina}`].push(texto);
        }
      });

      if (numeroPagina < 3) {
        recorrerPaginas(numeroPagina + 1);
      } else {
        cy.then(() => {
          Object.entries(titulosPorPagina).forEach(([pagina, titulos]) => {
            cy.log(`${pagina}: ${titulos.length} eventos encontrados`);
            titulos.forEach((titulo, idx) => {
              cy.log(`- ${idx + 1}: ${titulo}`);
            });
          });
        });
      }
    };

    recorrerPaginas();
  });
});
