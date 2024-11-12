import PropTypes from "prop-types";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");

    const addBlog = (event) => {
        event.preventDefault();
        createBlog(newTitle, newAuthor, newUrl);
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
    };
    return (
        <div>
            <h2>create blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:<input type="text" data-testid='title' value={newTitle} placeholder="write blog title here" onChange={({ target }) => setNewTitle(target.value)} id="blog-title-input" />
                </div>
                <br />
                <div>
                    author:<input type="text" data-testid='author' value={newAuthor} placeholder="write blog author here" onChange={({ target }) => setNewAuthor(target.value)} id="blog-author-input" />
                </div>
                <br/>
                <div>
                    url:<input type="text" data-testid='url' value={newUrl} placeholder="write blog url here" onChange={({ target }) => setNewUrl(target.value)} id="blog-url-input" />
                </div>
                <br/>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
};
export default BlogForm;