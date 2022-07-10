describe('My First Test', () => {
  it('should change your mode into dark', () => {
    cy.visit('http://localhost:3000')
    cy.contains('You are in light mode').click()
  })

  it('should attempt to login whitout credientials', () => {
    cy.contains('Login').click()
  });

  it('should login and into the homepage', () => {

    cy.get('[id="username"]').debug()
      .type('ValentaingTest')
      .should('have.value', 'ValentaingTest')

    cy.get('[id="password"]').debug()
      .type('azerty123')
      .should('have.value', 'azerty123')

    cy.contains('Login').click()

    cy.url().should('include', '/home')
  });
})