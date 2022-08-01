/// <reference types="cypress" />

// do not truncate longer objects in the assertions
chai.config.truncateThreshold = 200

it('requests the fruits N times', () => {
  let fruits = []
  let baseFruits = ['Apples', 'Bananas', 'Grapes', 'Oranges', 'Pears']
  // we know that the endpoint will return the same list of 5 fruits
  // let's request the fruits N times
  Cypress._.times(5,() => {
    cy.request('GET', '/fruit')
      .its('body.fruit')
      .then((fruit) => {
        fruits.push(fruit)
      })
  })
  // and confirm the list of fruits is the same as expected
  // ['Apples', 'Bananas', 'Grapes', 'Oranges', 'Pears']
  cy.wrap(baseFruits).each((fruit) => {
    expect(fruits).to.include(fruit)
  })
  // hint: use Cypress._.times
})

it('requests the fruits N times [BAH]', () => {
  // we know that the endpoint will return the same list of 5 fruits
  // let's request the fruits N times
  // and confirm the list of fruits is the same as expected
  // ['Apples', 'Bananas', 'Grapes', 'Oranges', 'Pears']
  // hint: use Cypress._.times
  const fruits = []
  Cypress._.times(5, () => {
    cy.request('GET', '/fruit')
      .its('body.fruit')
      .then((fruit) => {
        fruits.push(fruit)
      })
  })

  cy.wrap(fruits).then(JSON.stringify).then(cy.log)
  cy.wrap(fruits)
    .should('have.length', 5)
    .invoke('sort')
    .should('deep.equal', [
      'Apples',
      'Bananas',
      'Grapes',
      'Oranges',
      'Pears',
    ])
})
