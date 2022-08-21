/// <reference types="cypress" />

it('matches the request using a header', () => {
  // intercept any request with the request header "x-requesting: fruit"
  cy.intercept({
    headers: {
      'x-requesting': 'fruit',
    },
  }).as('fruit')
  // visit the page and confirm the network call was made
  cy.visit('/')
  // tip: https://on.cypress.io/intercept allows using request header(s)
  // note: matching by the response header is not supported in Cypress v9
  cy.wait('@fruit')
})
