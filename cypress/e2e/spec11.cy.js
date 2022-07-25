/// <reference types="cypress" />

it('makes GET /fruit requests every minute bah solution', () => {
  cy.intercept('GET', '/fruit').as('fruit')

  cy.clock()
  cy.visit('/')

  cy.wait('@fruit')
    .its('response.body.fruit')
    .then((fruit) => {
      cy.contains('#fruit', fruit).should('be.visible')
    })

  cy.tick(60000)
  cy.wait('@fruit')
    .its('response.body.fruit')
    .then((fruit) => {
      cy.contains('#fruit', fruit).should('be.visible')
    })

  cy.tick(60000)
  cy.wait('@fruit')
    .its('response.body.fruit')
    .then((fruit) => {
      cy.contains('#fruit', fruit).should('be.visible')
    })
})
