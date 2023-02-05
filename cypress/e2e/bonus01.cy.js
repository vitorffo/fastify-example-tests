/// <reference types="cypress" />

// Bonus 1: the server implements the /fruits endpoint
// which can return zero, one, or many fruits
// The page fruits.html shows the returned fruits.
// and should handle any number of returned results.
//
// How do we test this? The chances of returning zero fruits
// are slim... but we want to make sure the page doesn't crash

// this test should check whatever the server returns
// by spying on the network call
it('shows zero or more fruits', () => {
  // spy on GET /fruits call and give it an alias
  // https://on.cypress.io/intercept
  // https://on.cypress.io/as
  cy.intercept('/fruits').as('getFruits')
  // visit the page /fruits.html
  // https://on.cypress.io/visit
  cy.visit('/fruits.html')
  // BUT
  // it might get no fruits back from the server
  // wait for the network call to finish
  // https://on.cypress.io/wait
  // from the server response, get the list of fruits
  // and depending on the number of fruits,
  // check the page to confirm
  cy.wait('@getFruits')
  .its('response.body')
  .then((fruits) => {
    if (fruits.length === 0) {
      cy.contains('#fruits', 'No fruits')
    } else {
      cy.get('#fruits>li').should(
        'have.length',
        fruits.length
      )
      fruits.forEach((fruit) => {
        cy.contains('#fruits>li', fruit)
      })
    }
  })
  // if there are no fruits, confirm that
  // the page contains the text "No fruits"
  // https://on.cypress.io/contains
  // else
  //   confirm each fruit returned by the server is shown
  // TIP: you can also verify that all fruits are unique
})

it('shows zero fruits', () => {
  // instead of reloading the page and sometimes (very rarely)
  // getting zero fruits returned
  // let's stub the response from the server
  // https://on.cypress.io/intercept
  // then visit the page /fruits.html
  // https://on.cypress.io/visit
  // confirm there are no fruits
  // https://on.cypress.io/contains
  cy.intercept('GET', '/fruits', [])

  cy.visit('/fruits.html')

  cy.contains('#fruits', 'No fruits')
})

it('shows two fruits', () => {
  // let's stub the response from the server
  // and return two fruits: apples and kiwi
  // https://on.cypress.io/intercept
  // then visit the page /fruits.html
  // https://on.cypress.io/visit
  // confirm there are two fruits
  // https://on.cypress.io/contains
  cy.intercept('GET', '/fruits', ['apples', 'kiwi'])

  cy.visit('/fruits.html')

  cy.contains('#fruits', 'apples')

  cy.contains('#fruits', 'kiwi')
})
