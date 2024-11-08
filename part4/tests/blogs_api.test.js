const { test, after, beforeEach, describe } = require('node:test');
const mongoose = require('mongoose');
const assert = require('node:assert');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const jwt = require ("jsonwebtoken");

const Blog = require("../models/blog");

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
  });
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
  
     assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
  
  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  });

  test('blogs have correct id field', async () => {
    const blogsAtStart = await helper.blogsInDb();
  
    blogsAtStart.forEach(blog => {
      assert.ok(blog.id !== undefined);
      assert.ok(blog._id !== undefined);
      assert.strictEqual(blog.id, blog._id.toString());
      
      assert.ok(blog.likes !== undefined);
      assert.ok(blog.likes >= 0);
    });
  });
});

describe("viewing a specific blog", () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const expectedBlog = {
      ...blogToView,
      _id: blogToView._id.toString()
    };
  
    assert.deepStrictEqual(resultBlog.body, expectedBlog)
  });

  test('the first blog is about react patterns', async () => {
    const response = await api.get('/api/blogs');
  
    const titles = response.body.map(e => e.title);
    assert(titles.includes('React patterns'));
  });
});

function getToken() {
  const userId = '672deff140a1dc23fceb32da';
  return jwt.sign({ userId }, process.env.SECRET, { expiresIn: '1h' });
}

describe("deleting a blog", () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const token = getToken();
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", `Bearer ${token}`)
      .expect(204);
  
    const blogsAtEnd = await helper.blogsInDb();
  
    const titles = blogsAtEnd.map(r => r.title);
    assert(!titles.includes(blogToDelete.title));
  
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  });
});

describe("creating blogs", () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: "Random",
      url: "http://www.randomblog.com",
      likes: 0
    };

    const token = getToken();
  
    await api
      .post('/api/blogs')
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  
    const titles = blogsAtEnd.map(r => r.title);
    assert(titles.includes('async/await simplifies making async calls'));
  });
  
  test('blog without likes will have 0 likes', async () => {
    const newBlog = {
      title: "Random Vlog",
      author: "Random",
      url: "http://www.randomblog.com",
    }
  
    const token = getToken();

    await api
      .post('/api/blogs')
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);
  
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
      const likes = blogsAtEnd.find(b => b.title === "Random Vlog").likes;
      assert.strictEqual(likes, 0);
  });
  
  test('a blog without title or url cannot be added ', async () => {
    const newBlog = {
      author: "Random",
      likes: 3
    };

    const token = getToken();
  
    await api
      .post('/api/blogs')
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  });
});

describe("updating blogs", () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "Changed Vlog",
      author: "Changed Author",
      url: "http://www.changedurl.com",
      likes: 2
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});