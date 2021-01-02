/* eslint import/no-cycle: */
import { fetchWrapper } from '_helpers';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const baseUrl = `${API_URL}/customers`;

export const customerService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
