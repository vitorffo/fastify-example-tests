/// <reference types="cypress" />

it('does not call API until 60 seconds passed', () => {
  // spy on the GET /fruit call and pass a cy.spy function
  // as the request handler. The callback function does nothing
  // but we can use it later (via an alias) to check how
  // many times it was called = how many times the network
  // call happened
  // see https://on.cypress.io/spy
  cy.intercept('GET', '/fruit', cy.spy().as('fruit'))
  // see https://on.cypress.io/stubs-spies-and-clocks
  // freeze the clock
  cy.clock()
  // visit the page
  cy.visit('/')
  // get the spy via its alias and confirm it was called once
  cy.get('@fruit')
    .its('callCount')
    .should('eq', 1)
  // then reset the history of calls
  cy.get('@fruit').invoke('resetHistory')
  // tick 59 seconds
  cy.tick(59000)
  // confirm the spy was not executed = there were no network calls
  cy.get('@fruit')
    .its('callCount')
    .should('eq', 0)
  // tick 1 second
  // confirm the spy was executed = there was a network call
  cy.tick(1000)
  cy.get('@fruit')
    .its('callCount')
    .should('eq', 1)
})

it('does not call API until 60 seconds passed bahmutov solution', () => {
  // spy on the GET /fruit call and pass a cy.spy function
  // as the request handler. The callback function does nothing
  // but we can use it later (via an alias) to check how
  // many times it was called = how many times the network
  // call happened
  // see https://on.cypress.io/spy
  cy.intercept('GET', '/fruit', cy.spy().as('fruit'))
  // see https://on.cypress.io/stubs-spies-and-clocks
  // freeze the clock
  // visit the page
  cy.clock()
  cy.visit('/')
  // get the spy via its alias and confirm it was called once
  // then reset the history of calls
  cy.get('@fruit')
    .should('have.been.calledOnce')
    .invoke('resetHistory')
  // tick 59 seconds
  cy.tick(59_000)
  cy.get('@fruit').should('not.have.been.called')
  // confirm the spy was not executed = there were no network calls
  // tick 1 second
  cy.tick(1_000)
  // confirm the spy was executed = there was a network call
  cy.get('@fruit').should('have.been.calledOnce')
})
