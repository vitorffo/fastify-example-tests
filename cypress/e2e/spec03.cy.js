/// <reference types="cypress" />

it('shows the fruit returned from the test [MY SOLUTION]', () => {
  // stub the network call the application makes
  // to the server using "GET /fruit"
  // return "Kiwi" json object
  // tip: use https://on.cypress.io/intercept
  //
  // visit the page
  // https://on.cypress.io/visit
  //
  // wait for the app to make the network call
  // to make sure the stub was used
  // https://on.cypress.io/wait
  //
  // confirm the application shows the fruit "Kiwi"
  // https://on.cypress.io/contains
  const fruit = 'Kiwi'

  cy.intercept('GET', '/fruit', { fruit })
    .as('fruit')

  cy.visit('/')

  cy.wait('@fruit')

  cy.contains('#fruit', fruit)

})
