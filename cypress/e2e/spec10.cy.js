/// <reference types="cypress" />

it('shows the loading element with Promise.delay', () => {
  // set up an intercept to spy on the GET /fruit endpoint
  // but delay the request by 2 seconds using
  // Cypress.Promise.delay(2000) and the response function
  // hint: see https://on.cypress.io/intercept and
  // the response callback function
  // visit the site
  // make sure the loading element is visible
  // from the request spy, get the response body
  // and confirm the fruit returned by the server is visible

  cy.intercept('GET', '/fruit', (req) => {
    return Cypress.Promise.delay(2000)
  }).as('fruit')

  cy.visit('/')

  cy.get('#fruit').should('have.text', 'loading...')

  cy.wait('@fruit').then( (interception) => {
    const fruit = interception.response.body.fruit

    cy.log(`Response: ${fruit}`)

    cy.get('#fruit').should('have.text', fruit)

  })

})

it('bahmutovs solution', () => {
  cy.intercept('GET', '/fruit', (req) => {
    return Cypress.Promise.delay(2000)
  }).as('fruit')

  cy.visit('/')

  cy.contains('#fruit', 'loading...')

  cy.wait('@fruit')
    .its('response.body.fruit')
    .then(cy.log)
    .then((fruit) => {
      cy.contains('#fruit', fruit).should('be.visible')
    })
})
