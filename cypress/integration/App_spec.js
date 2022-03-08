describe('Application', () => {
  it('should be able to see all current orders', () => {
    cy.fixture('orders.json').as('orders')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', json)
      })
    cy.visit('http://localhost:3000/')
      .get('.order').eq(1)
      .contains('Sam')
  })
})