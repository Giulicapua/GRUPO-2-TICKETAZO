

describe ('Acceso a la pagina web',()=>{
    
    beforeEach('Inicio sesion con perfil organizador',()=>{
      
    cy.login('admin@admin.com','admin')

    })

   it('Verificar acceso a la informacion de cada seccion',()=>{
    
    cy.secciones()

   })


})