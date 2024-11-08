const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.4tf9j.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

// Si solo se proporciona la contraseña
if (process.argv.length === 3) {
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog);
    });
    mongoose.connection.close();
  });
}

// Si se proporcionan más argumentos, creamos una nueva persona
else if (process.argv.length >= 5) {
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6]
  });

  blog.save().then(() => {
    console.log(`added ${blog.title} to database.`);
    mongoose.connection.close();
  });
}

else {
  console.log("Usage: node mongo.js <password> [value1] [value2]...");
}