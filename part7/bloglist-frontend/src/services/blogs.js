import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`http://localhost:3003/api/blogs/${id}`);
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(
    `http://localhost:3003/api/blogs/${id}/comments`
  );
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const newObject = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
  };

  console.log(newObject);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createComment = async (comment, id) => {
  const response = await axios.post(
    `http://localhost:3003/api/blogs/${id}/comments`,
    { comment }
  );
  return response.data;
};

const update = async (updatedData) => {
  const id = updatedData.id;
  const newObject = {
    title: updatedData.title,
    author: updatedData.author,
    url: updatedData.url,
    likes: updatedData.likes,
  };

  console.log(newObject);

  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  getOne,
  getComments,
  create,
  createComment,
  update,
  setToken,
  deleteBlog,
};
