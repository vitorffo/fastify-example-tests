/// <reference types="cypress" />

it('sets the intercept alias from the callback', () => {
  // intercept the GET /fruit request using cy.intercept
  // and give the callback function to handle the request
  // inspect the request object and assign an alias to it
  // from the callback function: req.alias = "fruit"
  // stub the response using req.reply({ fruit: "kiwi" })
  cy.intercept('GET', '/fruit', (req) => {
    req.alias = 'fruit'
    req.reply({ fruit: 'Kiwi'})
  })
  // visit the page and confirm the intercept was used
  cy.visit('/')
  cy.wait('@fruit')
  cy.get('#fruit').should('have.text', 'Kiwi')

})

it('sets the intercept alias from the callback [BAH]', () => {
  // intercept the GET /fruit request using cy.intercept
  // and give the callback function to handle the request
  // inspect the request object and assign an alias to it
  // from the callback function: req.alias = "fruit"
  // stub the response using req.reply({ fruit: "kiwi" })
  // visit the page and confirm the intercept was used
  cy.intercept('GET', '/fruit', (req) => {
    if (req.url.includes('/fruit')) {
      req.alias = 'fruit'
    }
    req.reply({ fruit: 'kiwi' })
  })
  cy.visit('/')
  cy.wait('@fruit')
  cy.contains('#fruit', 'kiwi')
})
