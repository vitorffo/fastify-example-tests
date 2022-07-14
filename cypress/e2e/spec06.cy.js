/// <reference types="cypress" />

it('shows the loading element then fruit from a fixture', () => {
  // intercept the GET call to /fruit with fixture "apple.json"
  // https://on.cypress.io/intercept
  //
  // visit the site
  // https://on.cypress.io/visit
  //
  // confirm the "loading..." text is shown
  // confirm the "apple" text is shown
  // https://on.cypress.io/contains
  //
  // confirm there is no element with the text "loading..."
  // https://on.cypress.io/should

  cy.intercept('GET', '/fruit', {fixture: 'apple.json'}).as('fruit')

  cy.visit('/')

  cy.get('#fruit')
    .should('contain.text', 'apple')
})

it('shows the loading element then fruit from a fixture [BAH]', () => {
  // intercept the GET call to /fruit with fixture "apple.json"
  cy.intercept('GET', '/fruit', { fixture: 'apple.json' })
  // visit the site
  cy.visit('/')
  // confirm the "loading..." text is shown
  cy.contains('#fruit', 'loading...').should('be.visible')
  // confirm the "apple" text is shown
  cy.contains('#fruit', 'apple').should('be.visible')
  // confirm there is no element with the text "loading..."
  cy.contains('#fruit', 'loading...').should('not.exist')

})
