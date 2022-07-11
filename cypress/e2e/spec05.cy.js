/// <reference types="cypress" />

it('shows a different fruit after reloading the page', () => {
  // visit the site using https://on.cypress.io/visit
  // grab the fruit name from the page
  // (make sure it is not "loading...")
  //
  // reload the page using https://on.cypress.io/reload
  // grab the fruit name from the page again
  // confirm the fruit name is different
  //
  // tip: use nested https://on.cypress.io/then callbacks
  cy.visit('/')

  cy.get('#fruit')
    .should('not.contain', 'loading')
    .then((fruit) => {
      const firstFruit = fruit.text()
      cy.log(firstFruit)

      cy.reload()

      cy.get('#fruit')
        .should('not.contain', 'loading')
        .and('not.equal', firstFruit)
    })

})

it('shows a different fruit after reloading the page [bah]', () => {
  cy.visit('/')

  cy.get('#fruit')
    .should('not.include.text', 'loading')
    .invoke('text')
    .then(cy.log)
    .then((fruit) => {
      cy.reload()

      cy.get('#fruit')
        .should('not.include.text', 'loading')
        .and('not.have.text', fruit)
    })
})
