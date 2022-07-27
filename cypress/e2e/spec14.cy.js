/// <reference types="cypress" />

it('reloads the page until it shows Bananas', () => {
  // visit the page
  // if it shows the fruit "Bananas", stop
  // else
  //   wait for 1 second for clarity
  //   reload the page
  //   check again
  // Tip: use recursion
  let reloadPage = () => {
    cy.get('#fruit')
      .should('not.have.text', 'loading...')
      .invoke('text')
      .then((text) => {
        if (text === 'Bananas') {
          cy.log(`${text} finally found`)
        }else{
          cy.reload()
          cy.wait(1000)
          reloadPage()
        }
      })
  }

  cy.visit('/')
  reloadPage()
})


it('reloads the page until it shows Bananas. [Bah] solution', () => {
  // visit the page
  cy.visit('/')
  // if it shows the fruit "Bananas", stop
  // else
  //   wait for 1 second for clarity
  //   reload the page
  //   check again
  function checkFruit() {
    cy.get('#fruit')
      .should('not.have.text', 'loading...')
      .invoke('text')
      .then((fruit) => {
        if (fruit === 'Bananas') {
          cy.log('Bananas!')
        } else {
          cy.wait(1000)
          cy.reload().then(checkFruit)
        }
      })
  }
  checkFruit()
})
