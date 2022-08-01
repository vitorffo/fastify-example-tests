/// <reference types="cypress" />

it('requests all fruits', () => {
  let uniqueFruits = new Set()
  // request the fruit from the /fruit endpoint
  // using the https://on.cypress.io/request command
  // from the response get the body object, then the fruit
  // using the https://on.cypress.io/its command
  let getFruits = () => cy.request('GET', '/fruit')
    .its('body.fruit')
    .then( (fruit) => {
      if(uniqueFruits.has(fruit)) {
        cy.log(`${[...uniqueFruits]}`)
      } else {
        uniqueFruits.add(fruit)
        getFruits()
      }
    })
  // store each fruit in a Set object
  // and keep requesting until we see a fruit already in the set
  // print the collected list of fruits
  getFruits()
})

import { recurse } from 'cypress-recurse'
it('My extra: request all fruits using recurse', () => {
  let uniqueFruits = new Set()

  recurse(
    () => cy.request('GET', '/fruit')
      .its('body.fruit')
      .as('fruit'),

    (fruit) => uniqueFruits.has(fruit),

    {
      post() {
        cy.get('@fruit').then( (text) => {
          uniqueFruits.add(text)
        })
      },
      limit: 10,
      delay: 100
    }
  ).then( () => {
    cy.log(`${[...uniqueFruits]}`)
  })

})

it('requests all fruits [BAH]', () => {
  // request the fruit from the /fruit endpoint
  // using the https://on.cypress.io/request command
  const fruits = new Set()

  function getTheFruit() {
    cy.request('GET', '/fruit')
      // from the response get the body object, then the fruit
      // using the https://on.cypress.io/its command
      .its('body.fruit')
      .then(cy.log)
      .then((fruit) => {
        // and keep requesting until we see a fruit already in the set
        if (fruits.has(fruit)) {
          // print the collected list of fruits
          cy.log([...fruits].sort().join(', '))
        } else {
          // store each fruit in a Set object
          fruits.add(fruit)
          cy.wait(1000).then(getTheFruit)
        }
      })
  }
  getTheFruit()
})
