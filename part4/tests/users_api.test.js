const { test, beforeEach, describe } = require('node:test');
const bcrypt = require('bcrypt');
const assert = require('node:assert');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const User = require('../models/user');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test.skip('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  });

  test("create a user without username or password fails", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Matti Luukkainen'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect("username and password are required")

    const usersAtEnd = await helper.blogsInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("create with usernames or passwords with lengths below 3", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "An",
      name: 'Prueba',
      password: "an",
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect({ error: "username and password need at least 3 characters..." });

    const usersAtEnd = await helper.blogsInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("create user with an existing username in the db", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(409)
    .expect('Content-Type', /application\/json/)
    .expect({ error: "username already exists..." });

    const usersAtEnd = await helper.blogsInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});