/// <reference types="cypress" />

it('clearly shows the loading element', () => {
  // stub the network call the application makes
  // and delay returning the fruit by 2 seconds
  // https://on.cypress.io/intercept
  //
  // visit the page
  // https://on.cypress.io/visit
  //
  // check if the loading element is visible
  // and then does not exist
  // https://on.cypress.io/get
  // https://on.cypress.io/should
  //
  // confirm the displayed fruit
  // https://on.cypress.io/contains
  const fruit = 'Kiwi'

  //my solution (bahmutov's solution looks better, see it bellow)
  cy.intercept('GET', '/fruit', (req) => {
    req.on('before:response', (res) => {
      res.setDelay(2000)
    })
  }).as('fruit')

  cy.visit('/')
  cy.get('#fruit')
    .should('have.text','loading...')
  cy.wait('@fruit')
  cy.get('#fruit')
    .should('not.have.text','loading...')
})

it('clearly shows the loading element [BAHMUTOV]', () => {
  const fruit = 'Kiwi'

  cy.intercept('GET', '/fruit', {
    body: { fruit },
    delay: 2000
  })

  cy.visit('/')

  cy.get('#fruit')
    .should('be.visible')
    .and('have.text', 'loading...')

  cy.get('#fruit')
    .should('not.contain', 'loading')

  cy.contains('#fruit', fruit)
    .should('be.visible')
})
