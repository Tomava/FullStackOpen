/* eslint-disable no-undef */
const BACKEND_ADDRESS = 'http://localhost:3003'
const FRONTEND_ADDRESS = 'http://127.0.0.1:3000'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${BACKEND_ADDRESS}/api/testing/reset`)
    // Create users
    const user = {
      name: 'Testi Ukko',
      username: 'testaaja',
      password: 'password'
    }
    cy.request('POST', `${BACKEND_ADDRESS}/api/users/`, user)
    const user2 = {
      name: 'Testi Mikko',
      username: 'eisallittu',
      password: 'wordpass'
    }
    cy.request('POST', `${BACKEND_ADDRESS}/api/users/`, user2)
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

  describe('When logged in',function() {
    beforeEach(function() {
      cy.login({ username: 'testaaja', password: 'password' })
    })

    it('blog can be added', function() {
      cy.get('#blog-creation-button').click()
      cy.get('#blogTitle-input').type('Test blog')
      cy.get('#blogAuthor-input').type('Test writer')
      cy.get('#blogUrl-input').type('test.com')
      cy.get('#submit-button').click()
      cy.contains('Test blog')
    })


    describe('When blog is created', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Test blog', author: 'Test writer', url: 'test.com', likes: 12345 })
      })

      it('blog details can be shown', function() {
        cy.get('#blog-toggle-details-button').click()
        cy.contains('test.com')
      })

      it('blog can be liked', function() {
        cy.get('#blog-toggle-details-button').click()
        cy.get('#blog-like-button').click()
        cy.contains(12346)
      })

      it('blog adder can remove it', function() {
        cy.get('#blog-toggle-details-button').click()
        cy.get('#blog-remove-button').click()
        cy.get('html').should('not.contain', 'Test blog')
      })

      it('other users cannot remove other users\' blogs', function() {
        cy.login({ username: 'eisallittu', password: 'wordpass' })
        cy.get('#blog-toggle-details-button').click()
        cy.contains('#blog-remove-button').should('not.exist')
      })
    })
  })

})