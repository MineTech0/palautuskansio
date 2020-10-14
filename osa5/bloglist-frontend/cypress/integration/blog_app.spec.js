describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Nipa',
      username: 'Nipa1',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('#loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#Username').type('Nipa1')
      cy.get('#Password').type('salainen')
      cy.get('#loginBtn').click()

      cy.contains('Nipa logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#Username').type('Nipa1')
      cy.get('#Password').type('wrong')
      cy.get('#loginBtn').click()

      cy.get('.error').contains('wrong password or username')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'Nipa1', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#addBtn').click()

      cy.contains('a new blog test title by test author added')
      cy.get('#blogList').should('contain', 'test title')
    })
    it('A blog can be liked', function() {

      cy.contains('New blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#addBtn').click()

      cy.contains('View').click()
      cy.get('.blogPost:first').contains('Like').click()

      cy.get('.blogPost:first #likeText').should('contain', '1')
    })
    it('A blog can be removed by user', function() {

      cy.contains('New blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#addBtn').click()

      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.on('window:confirm', () => true)

      cy.get('.success')
      cy.get('#blogList').should('not.contain','test title')
      cy.get('.success').should('contain','Blog test title was deleted')

    })
    it('Blogs are sorted by likes', function() {
      const Blog0 = {
        author: 'Author',
        title: 'Title2',
        url: '/',
        likes: 0
      }
      const Blog1 = {
        author: 'Author',
        title: 'Title1',
        url: '/',
        likes: 1
      }
      const Blog2 = {
        author: 'Author',
        title: 'Title0',
        url: '/',
        likes: 2
      }
      const loggedUserJSON = localStorage.getItem('loggedUser')
      const user = JSON.parse(loggedUserJSON)

      cy.request({
        method: 'POST',
        url:'http://localhost:3001/api/blogs/',
        body: Blog0,
        headers :{
          Authorization: `bearer ${user.token}`
        }
      })
      cy.request({
        method: 'POST',
        url:'http://localhost:3001/api/blogs/',
        body: Blog1,
        headers :{
          Authorization: `bearer ${user.token}`
        }
      })
      cy.request({
        method: 'POST',
        url:'http://localhost:3001/api/blogs/',
        body: Blog2,
        headers :{
          Authorization: `bearer ${user.token}`
        }
      })

      cy.visit('http://localhost:3000')
      cy.wait(500)
      cy.get('.blogPost').each(($el, index, $list) => {
        cy.wrap($el).contains('Title'+index)
      })

    })

  })
})