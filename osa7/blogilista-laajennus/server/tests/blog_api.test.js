const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/Blog')
const User = require('../models/User')
let token;

beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const response = await api
        .post('/api/login')
        .send({
            username: user.username,
            password: 'password',
        })
        .expect(200)
    token = response.body.token
});
describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(helper.initialBlogs);
    });

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('blogs must be identified with id', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body[0].id).toBeDefined();
    });
});

describe('adding new blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(helper.initialBlogs);
    });
    test('succeeds with valid data', async () => {
        const newBlog = { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
            'React patterns'
        )
    });
    test('default to 0 likes when likes are not defined', async () => {
        const newBlog = { title: "React patterns 2", author: "Michael Chan", url: "https://reactpatterns.com/" }
        const blogsAtStart = await helper.blogsInDb()
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

        const blog = blogsAtEnd.find(n => n.title == 'React patterns 2')
        expect(blog.likes).toEqual(0)
    });
    test('fails when title and url are not defined', async () => {
        const newBlog = { author: "Michael Chan", likes: 7 }
        const blogsAtStart = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    });
});
describe('deletion of a blog', () => {
    let addedBlog;
    beforeEach(async () => {
        const newBlog = { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 }

        addedBlog = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)

    });
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = addedBlog.body

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        await expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length - 1
        )

        const contents = blogsAtEnd.map(r => r.id)

        expect(contents).not.toContain(blogToDelete.id)
    })
    test('fails with status code 401 if token was not provided', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = addedBlog.body

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length
        )
    })
})
describe('updating a blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(helper.initialBlogs);
    });
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        let blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = blogToUpdate.likes + 1

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd.find(blog => blog.id == blogToUpdate.id)

        expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
    })
})
afterAll(() => {
    mongoose.connection.close()
})