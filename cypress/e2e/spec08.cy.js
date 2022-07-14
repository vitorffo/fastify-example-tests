/// <reference types="cypress" />

// import the fixture JSON data from the file "../fixtures/apple.json"
import { fruit } from '../fixtures/apple.json'
/***
 Using { fruit } imports the value from the key right the way instead of
 the whole object so i don't have to use fruit.fruit
***/

it('imports the fixture from JSON file', () => {
  // print the imported fruit to the Command Log
  // https://on.cypress.io/log
  cy.log(fruit)
  // intercept the GET call to /fruit with fixture "apple.json"
  // https://on.cypress.io/intercept
  cy.intercept('GET', '/fruit', { fixture: 'apple.json' })
  // visit the site
  // https://on.cypress.io/visit
  cy.visit('/')
  // confirm the fruit from the fixture is shown on the page
  // https://on.cypress.io/contains
  cy.contains('#fruit', fruit).should('be.visible')
})
