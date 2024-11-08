const dummy = (blogs) => {
    return 1;
};
  
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);    
};

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr);
};

const mostBlogs = (blogs) => {
    // Inicializa un objeto vacío para contar apariciones por autor
    const authorCounts = {};
    
    // Itera sobre cada blog en la lista
    blogs.forEach(blog => {
        // Incrementa el contador del autor en el objeto
      authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1;
    });
    
    // Encuentra el autor con más apariciones
    const maxCount = Math.max(...Object.values(authorCounts));
    const mostBloggedAuthor = Object.keys(authorCounts).find(author => authorCounts[author] === maxCount);
  
    return { author: mostBloggedAuthor, blogs: maxCount };
};

const mostLikes = (blogs) => {
    // Inicializa un objeto vacío para contar likes por autor
    const likesByAuthor = {};

    // Itera sobre cada blog en la lista
    blogs.forEach(blog => {
        // Incrementa el contador del autor en el objeto
        likesByAuthor[blog.author] = (likesByAuthor[blog.author] || 0) + blog.likes;
    });

    // Encuentra el autor con más likes
    const authorWithMostLikes = Object.keys(likesByAuthor).reduce((prev, curr) => 
        likesByAuthor[curr] > likesByAuthor[prev] ? curr : prev
    );

    // Devuelve la información del autor con más likes
    return {
        author: authorWithMostLikes,
        likes: likesByAuthor[authorWithMostLikes]
    };
};


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };