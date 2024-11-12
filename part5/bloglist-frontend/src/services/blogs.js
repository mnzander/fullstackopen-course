import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newTitle, newAuthor, newUrl) => {
  const config = {
    headers: { Authorization: token },
  };

  const newObject = {
    title: newTitle,
    author: newAuthor,
    url: newUrl
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, title, author, url, newLikes) => {
  const newObject = {
    title: title,
    author: author,
    url: url,
    likes: newLikes
  };

  const response = await axios.put(`${ baseUrl }/${id}`, newObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, setToken, deleteBlog };