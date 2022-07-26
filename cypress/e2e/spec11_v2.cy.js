it('makes GET /fruit requests every minute', () => {
  // spy on the GET /fruit endpoint
  cy.intercept('GET', '/fruit').as('fruit')
  // use the cy.clock command to freeze the timers in the app
  // https://on.cypress.io/clock
  cy.clock()
  // visit the page
  cy.visit('/')
  // wait for the first request to finish and confirm the fruit
  cy.wait('@fruit')
    .its('response.body.fruit')
    .then(cy.log)
    .then(fruit => {
      cy.contains('#fruit', fruit).should('exist')
  })
  // advance the clock by one minute using cy.tick command
  // https://on.cypress.io/tick
  cy.tick(60000)
  // wait for the second request to finish and confirm the fruit
  cy.wait('@fruit')
    .its('response.body.fruit')
    .then(cy.log)
    .then(fruit => {
      cy.contains('#fruit', fruit).should('exist')
    })
  // advance the clock by one minute one more time
  cy.tick(60000)
  // wait for the network call and confirm the fruit
  cy.wait('@fruit')
    .its('response.body.fruit')
    .then(cy.log)
    .then(fruit => {
      cy.contains('#fruit', fruit).should('exist')
    })
})
