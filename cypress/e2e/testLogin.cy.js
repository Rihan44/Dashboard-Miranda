
describe('Login test ', () => {

  it('Si meto los detalles correctos me lleva a /', () => {
    cy.visit('http://localhost:3000/login')
    
    cy.get('[data-cy="inputUserEmail"]').type("asmuela.dev@gmail.com");
    cy.get('[data-cy="inputPasswordUser"]').type(123456);

    cy.get('[data-cy="loginButton"]').click();
    cy.location('pathname').should("not.include", "login");
  })

  it('Si meto los detalles incorrectos me salta un error y no me redirige a /', () => {
    cy.visit('http://localhost:3000/login')
    
    cy.get('[data-cy="inputUserEmail"]').type("pepito");
    cy.get('[data-cy="inputPasswordUser"]').type(12332);
    
    cy.get('[data-cy="loginButton"]').click();
    cy.contains('p', 'El user o la pass son incorrectos');
    cy.location('pathname').should("include", "login");
  })

  it('Si intento navegar a / sin meter el login correcto me redirige a /login ', () => {
    cy.visit('http://localhost:3000/')
    cy.location('pathname').should("include", "login");
  })

  it('Si intento navegar a /dashboard u otra web sin meter el login correcto me redirige a /login ', () => {
    cy.visit('http://localhost:3000/dashboard')
    cy.location('pathname').should("include", "login");
  })

  it('Si logueado no puedo volver a /login', () => {
    cy.visit('http://localhost:3000/login')
    
    cy.get('[data-cy="inputUserEmail"]').type("asmuela.dev@gmail.com");
    cy.get('[data-cy="inputPasswordUser"]').type(123456);
    cy.get('[data-cy="loginButton"]').click();
    cy.visit('http://localhost:3000/login')
    cy.location('pathname').should("not.include", "login");
  })

})