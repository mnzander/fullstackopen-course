import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    try{
        const request = axios.get(baseUrl);
        return request.then(response => response.data);
    } catch (error) {
        console.log("Failed getting persons", error);
    }
};
  
const create = newObject => {
    try{
        const request = axios.post(baseUrl, newObject);
        return request.then(response => response.data);
    } catch(error) {
        console.log("Failed creating a new person", error);
    }
};

const updatePerson = (id, newObject) => {
    try {
        const request = axios.put(`${baseUrl}/${id}`, newObject);
        return request.then(response => response.data);
    } catch(error) {
        console.log("Failed deleting person", error);
    }
};

const deletePerson = id => {
    try {
        const request = axios.delete(`${baseUrl}/${id}`);
        return request.then(response => response.data);
    } catch(error) {
        console.log("Failed deleting person", error);
    }
};

export default { getAll, create, updatePerson, deletePerson };