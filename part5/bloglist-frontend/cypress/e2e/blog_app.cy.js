const BACKEND_ADDRESS = 'http://localhost:3003'
const FRONTEND_ADDRESS = 'http://127.0.0.1:3000'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${BACKEND_ADDRESS}/api/testing/reset`)
    // Create user
    const user = {
      name: 'Testi Ukko',
      username: 'testaaja',
      password: 'password'
    }
    cy.request('POST', `${BACKEND_ADDRESS}/api/users/`, user) 
    cy.visit(FRONTEND_ADDRESS)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('testaaja')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()

      cy.contains('Testi Ukko logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('testaaja')
      cy.get('#password-input').type('wordpass')
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

})