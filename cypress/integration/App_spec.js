describe('Application', () => {
  it('should be able to see all current orders', () => {
    cy.fixture('orders.json').as('orders')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', json)
      })
    cy.visit('http://localhost:3000/')
      .get('.order').eq(1)
      .contains('Sam')
      .get('.order').eq(3)
      .should('not.exist')
  })

  it('should be able to fill out a form to create a new order', () => {
  cy.fixture('orders.json').as('orders')
    .then((json) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', json)
    })
  cy.fixture('newOrder.json').as('newOrder')
    .then((json) => {
      cy.intercept('POST', 'http://localhost:3001/api/v1/orders', json)
    })
  cy.visit('http://localhost:3000/')
    .get('button').contains('Submit Order')
    .should('be.disabled')
    .get('input').type('Phil')
    .get('button').contains('Submit Order')
    .should('be.disabled')
    .get('button[name=steak]').click()
    .get('button[name=beans]').click()
    .get('button[name=guacamole]').click()
    .get('button').contains('Submit Order').click()
    .get('.order').eq(3)
    .should('exist')
    .contains('Phil')
  })
})