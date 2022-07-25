/// <reference types="cypress" />

it('returns different fruits', () => {
  // stub the /fruit endpoint to return "apple" on the first visit
  // stub the /fruit endpoint to return "grapes" on the second visit
  // https://on.cypress.io/intercept with "times: *" option
  //
  // visit the site
  //
  // confirm it shows "apple"
  // reload the site
  // confirm it shows "grapes
  const fruits = ["apple", "grapes"]

  cy.intercept({
    method: 'GET',
    url: '/fruit',
    times: 1
  },
    { fruit: fruits[1] }
  )

  cy.intercept({
      method: 'GET',
      url: '/fruit',
      times: 1,
    },
    { fruit: fruits[0] }
  )

  cy.visit('/')
  cy.contains('#fruit', fruits[0]).should('be.visible')
  cy.reload()
  cy.contains('#fruit', fruits[1]).should('be.visible')
})

/// <reference types="cypress" />

it('returns different fruits [BAH]', () => {
  // stub the /fruit endpoint to return "apple" on the first visit
  // stub the /fruit endpoint to return "grapes" on the second visit
  cy.intercept(
    {
      method: 'GET',
      url: '/fruit',
      times: 1,
    },
    { fruit: 'grapes' },
  )
  cy.intercept(
    {
      method: 'GET',
      url: '/fruit',
      times: 1,
    },
    { fruit: 'apple' },
  )

  // visit the site
  cy.visit('/')
  // confirm it shows "apple"
  cy.contains('#fruit', 'apple').should('be.visible')
  // reload the site
  cy.reload()
  // confirm it shows "grapes"
  cy.contains('#fruit', 'grapes').should('be.visible')
})
