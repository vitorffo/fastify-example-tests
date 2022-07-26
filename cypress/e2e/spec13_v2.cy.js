it('fetches 10 fruits from the server', () => {
  // spy on the GET /fruit network call
  // and store each received fruit in a list
  // https://on.cypress.io/intercept
  const fruitList = []
  cy.intercept('GET', '/fruit', (req) => {
    req.continue((res => {
      fruitList.push(res.body.fruit)
    }))
  }).as('fruit')
  // freeze the clock before visiting the page
  // https://on.cypress.io/clock
  // confirm there is one fruit in the list after loading the page
  cy.clock()
  cy.visit('/')
  cy.wrap(fruitList)
    .should('have.length', 1)
  // advance the clock by 9 minutes
  // https://on.cypress.io/tick
  cy.tick((60000*9))
  // and confirm the list of fruits has 10 items
  // and it includes "Oranges"
  cy.wrap(fruitList)
    .should('have.length', 10)
    .and('contain', 'Oranges')
  // https://on.cypress.io/wrap
})
