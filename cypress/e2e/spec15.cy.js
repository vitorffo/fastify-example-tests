/// <reference types="cypress" />

it('finds all fruits', () => {
  let uniqueFruits = new Set()
  // visit the page
  cy.visit('/')
  // keep getting the fruit from the page
  // and storing it in a Set object
  // and reloading the page
  // until we see the fruit we have already added
  let getAllFruits = () => cy.get('#fruit')
    .should('not.have.text', 'loading...')
    .invoke('text')
    .then( (text) => {
      cy.log(text)
      if(uniqueFruits.has(text)) {
        // print the collected list of fruits
        // check its length against the expected value
        cy.log(`${[...uniqueFruits]}`)
        cy.wrap([...uniqueFruits]).should('have.length', 5)
      } else {
        uniqueFruits.add(text)
        cy.reload()
        getAllFruits()
      }
    })
  getAllFruits()
})

it('finds all fruits [BAH]', () => {
  // visit the page
  cy.visit('/')
  const fruits = new Set()

  // keep getting the fruit from the page
  // and storing it in a Set object
  // and reloading the page
  // until we see the fruit we have already added
  function getFruit() {
    cy.get('#fruit')
      .should('not.have.text', 'loading...')
      .invoke('text')
      .then((fruit) => {
        cy.log(fruit)
        if (fruits.has(fruit)) {
          // we are done
          // print the collected list of fruits
          // check its length against the expected value
          const list = [...fruits].sort()
          cy.log(list.join(', '))
          expect(list).to.have.length(5)
        } else {
          fruits.add(fruit)
          cy.wait(500)
          cy.reload().then(getFruit)
        }
      })
  }
  getFruit()
})



// Bonus 2: use cypress-recurse to find all fruits
// install the plugin cypress-recurse
// https://github.com/bahmutov/cypress-recurse
// npm i -D cypress-recurse
// and import or require it in this spec file
// import { recurse } from 'cypress-recurse'

import { recurse } from 'cypress-recurse'
it('finds all the fruit using cypress-recurse', () => {
  // let's use the "recurse" function to reload the page
  // until we see a repeated fruit. Then we can stop
  // since we have seen all the fruits.
  let fruits = new Set()
  // First, visit the page
  // https://on.cypress.io/visit
  cy.visit('/')
  // keep track of the fruits we have seen
  // using a Set object
  // call the recurse function
  // first argument is a function that gets
  // the fruit from the page
  // second argument is a predicate that returns true
  // if we have already seen the fruit
  // third argument is an options object
  // that can have "post" method that gets called
  // where we add the fruit to the Set object
  // and reload the page
  recurse(
    () => cy.get('#fruit')
      .should('not.have.text', 'loading...')
      .invoke('text')
      .as('actualFruit'),

    (fruit) => fruits.has(fruit),

    {
      post() {
        cy.get('@actualFruit')
          .then((text) => {
          fruits.add(text)
        })
        cy.reload()
      },
      limit: 10,
      delay: 500
    }
  ).then(() => {
    cy.log(`${[...fruits]}`)
    expect([...fruits]).length(5)
  })
  // the "recurse" from cypress-recurse
  // is chainable, so we can chain a ".then" callback
  // to check the length of the Set object and confirm
  // the collected fruit names
  // print the collected list of fruits
  // check its length against the expected value
})
