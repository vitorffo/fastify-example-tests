it('does not call API until 60 seconds passed', () => {
  // spy on the GET /fruit call and pass a cy.spy function
  // as the request handler. The callback function does nothing
  // but we can use it later (via an alias) to check how
  // many times it was called = how many times the network
  // call happened
  // see https://on.cypress.io/spy
  // see https://on.cypress.io/stubs-spies-and-clocks
  cy.intercept('GET', '/fruit', cy.spy().as('fruit'))
  // freeze the clock
  cy.clock()
  // visit the page
  cy.visit('/')
  // get the spy via its alias and confirm it was called once
  cy.get('@fruit').should('have.been.calledOnce')
  // then reset the history of calls
  cy.get('@fruit').invoke('resetHistory')
  // tick 59 seconds
  cy.tick(59000)
  // confirm the spy was not executed = there were no network calls
  cy.get('@fruit').should('not.have.been.called')
  // tick 1 second
  cy.tick(1000)
  // confirm the spy was executed = there was a network call
  cy.get('@fruit').should('have.been.calledOnce')
})
