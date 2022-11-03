/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const BACKEND_ADDRESS = 'http://localhost:3003'
const FRONTEND_ADDRESS = 'http://127.0.0.1:3000'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${BACKEND_ADDRESS}/api/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(body))
    cy.visit(FRONTEND_ADDRESS)
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${BACKEND_ADDRESS}/api/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })
  cy.visit(FRONTEND_ADDRESS)
})