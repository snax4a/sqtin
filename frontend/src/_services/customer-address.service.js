/* eslint import/no-cycle: */
import { fetchWrapper } from '_helpers';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const baseUrl = `${API_URL}/customer-addresses`;

export const customerAddressService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllAddresses,
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(customerId, addressId) {
  return fetchWrapper.get(`${baseUrl}/customer/${customerId}/address/${addressId}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(customerId, addressId, params) {
  return fetchWrapper.put(`${baseUrl}/customer/${customerId}/address/${addressId}`, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(customerId, addressId) {
  return fetchWrapper.delete(`${baseUrl}/customer/${customerId}/address/${addressId}`);
}

function getAllAddresses() {
  return fetchWrapper.get(`${baseUrl}/address-list`);
}
