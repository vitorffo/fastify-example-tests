/// <reference types="cypress" />

it('makes multiple separate requests', () => {
  // make the first request to fetch the fruit
  // using https://on.cypress.io/request
  cy.request('GET', '/fruit')
    .its('body.fruit')
    .then((fruit1) => {
      cy.request('GET', '/fruit')
        .its('body.fruit')
        .then((fruit2) => {
          expect(fruit1).not.eq(fruit2)
        })
    })
  // make the second request to fetch the fruit again
  // and compare the two responses - they should be different
  // tip: use the ".then(callback)" to have both responses
  // https://on.cypress.io/then command
  // it will look like a pyramid of Doom of callbacks
})

it('store multiple responses as aliases', () => {
  // make the first request using https://on.cypress.io/request
  // and store its "body.fruit" value as alias "fruit1"
  cy.request('GET', '/fruit').its('body.fruit').as('fruit1')
  // https://on.cypress.io/its and https://on.cypress.io/as
  // make the second request and store the fruit as alias "fruit2"
  cy.request('GET', '/fruit').its('body.fruit').as('fruit2')
  // use https://on.cypress.io/then command
  // with a "function () { ... }" callback
  // to be able to access both fruits using
    .then( function() {
  // "this.fruit1" and "this.fruit2" variables
  // and confirm they are different
      expect(this.fruit1).not.eq(this.fruit2)
    })
})
