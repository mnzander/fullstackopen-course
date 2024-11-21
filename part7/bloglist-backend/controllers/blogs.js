const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

//GET
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.get("/:id/comments", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .select("comments")
    .populate("comments");

  if (!blog) {
    return res.status(404).json({ error: "Blog no encontrado" });
  }

  res.json(blog.comments);
});

//DELETE
blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id);
  if (!blogToDelete) {
    return res.status(404).json({ error: "Blog not found" });
  }

  if (blogToDelete.user.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You cannot delete blogs you did not create" });
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

//CREATE
blogsRouter.post("/", middleware.userExtractor, async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "Title and URL are required" });
  }

  const user = await User.findById(req.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  try {
    const { comment } = req.body;
    console.log(comment);
    if (!comment) {
      return res
        .status(400)
        .json({ error: "El comentario no puede estar vacío" });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir el comentario" });
  }
});

//UPDATE
blogsRouter.put("/:id", async (req, res) => {
  const updateBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updateBlog) return res.status(404).json({ error: "Blog not found" });

  res.json(updateBlog);
});

module.exports = blogsRouter;